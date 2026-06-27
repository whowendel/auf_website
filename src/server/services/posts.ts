import { prisma } from "@/lib/prisma";
import {
  ApprovalAction,
  PostStatus,
  PostType,
  Role,
  type Prisma,
} from "@prisma/client";
import {
  allowedNextStatuses,
  canApprovePosts,
  canCreateUniversityPost,
  canEditPostInCollege,
  canSubmitForReview,
  type Actor,
} from "@/lib/rbac/permissions";
import { isValidCollegeId } from "@/data/colleges";
import { ForbiddenError } from "@/server/auth/session";
import { toSlug } from "@/lib/utils";
import {
  postCreateSchema,
  postUpdateSchema,
  reviewActionSchema,
  type PostCreateInput,
  type PostUpdateInput,
  type ReviewActionInput,
} from "@/server/validators/post";
import { audit } from "./audit";

// ─── Public-side queries ───────────────────────────────────────────────

export async function listPublishedPostsForCollege(
  collegeId: string,
  opts: { limit?: number; cursor?: string } = {},
) {
  return prisma.post.findMany({
    where: {
      status: PostStatus.PUBLISHED,
      publishedAt: { lte: new Date() },
      OR: [
        { originCollegeId: collegeId },
        { collegeTags: { some: { collegeId } } },
      ],
    },
    orderBy: { publishedAt: "desc" },
    take: opts.limit ?? 20,
    ...(opts.cursor ? { cursor: { id: opts.cursor }, skip: 1 } : {}),
    include: { author: { select: { name: true } } },
  });
}

/**
 * Flexible public post query used by the News & Events page.
 *
 * - No collegeId  → all published posts (university + all colleges)
 * - collegeId     → posts that originated from OR are tagged to that college
 * - type          → filter by PostType enum value
 * - isFeatured posts always sort first, then newest-first.
 */
export async function listPublishedPostsFiltered(opts: {
  collegeId?: string;
  type?: string;
  limit?: number;
}) {
  const collegeWhere: Prisma.PostWhereInput = opts.collegeId
    ? {
        OR: [
          { originCollegeId: opts.collegeId },
          { collegeTags: { some: { collegeId: opts.collegeId } } },
        ],
      }
    : {};

  return prisma.post.findMany({
    where: {
      status: PostStatus.PUBLISHED,
      publishedAt: { lte: new Date() },
      ...(opts.type ? { type: opts.type as PostType } : {}),
      ...collegeWhere,
    },
    orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
    take: opts.limit ?? 24,
    include: {
      author: { select: { name: true } },
      collegeTags: { select: { collegeId: true } },
    },
  });
}

export async function listPublishedUniversityPosts(opts: { limit?: number } = {}) {
  return prisma.post.findMany({
    where: {
      status: PostStatus.PUBLISHED,
      publishedAt: { lte: new Date() },
      originCollegeId: null,
    },
    orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
    take: opts.limit ?? 20,
    include: { author: { select: { name: true } } },
  });
}

export async function getPostForView(args: {
  slug: string;
  collegeId: string | null; // null = university scope
}) {
  return prisma.post.findFirst({
    where: {
      slug: args.slug,
      status: PostStatus.PUBLISHED,
      // When viewing from a college context, accept posts that either
      // originated from that college OR are tagged to it (e.g. a university
      // post that OUR tagged to a college).
      // When viewing from the university scope (null), require origin = null.
      ...(args.collegeId !== null
        ? {
            OR: [
              { originCollegeId: args.collegeId },
              { collegeTags: { some: { collegeId: args.collegeId } } },
            ],
          }
        : { originCollegeId: null }),
    },
    include: {
      author: { select: { name: true, image: true } },
      collegeTags: { select: { collegeId: true } },
    },
  });
}

// ─── Admin-side queries ────────────────────────────────────────────────

export async function listPostsForAdmin(
  actor: Actor,
  filters: {
    status?: PostStatus;
    type?: Prisma.PostWhereInput["type"];
    collegeId?: string | null;
    search?: string;
  },
) {
  const scope: Prisma.PostWhereInput =
    actor.role === Role.SUPER_ADMIN ? {} : { originCollegeId: actor.collegeId };

  return prisma.post.findMany({
    where: {
      ...scope,
      ...(filters.status
        ? { status: filters.status }
        : { status: { not: PostStatus.ARCHIVED } }),
      ...(filters.type ? { type: filters.type } : {}),
      ...(filters.collegeId !== undefined
        ? { originCollegeId: filters.collegeId }
        : {}),
      ...(filters.search
        ? { title: { contains: filters.search, mode: "insensitive" } }
        : {}),
    },
    orderBy: { updatedAt: "desc" },
    take: 100,
    include: { author: { select: { name: true } } },
  });
}

export async function listPendingReviews(actor: Actor) {
  if (!canApprovePosts(actor)) throw new ForbiddenError();
  return prisma.post.findMany({
    where: { status: PostStatus.PENDING_REVIEW },
    orderBy: { submittedAt: "asc" },
    include: { author: { select: { name: true, email: true } } },
  });
}

// ─── Mutations ─────────────────────────────────────────────────────────

async function ensureUniqueSlug(
  baseSlug: string,
  originCollegeId: string | null,
  ignorePostId?: string,
): Promise<string> {
  let slug = baseSlug;
  let n = 1;
  while (n <= 50) {
    const conflict = await prisma.post.findFirst({
      where: {
        slug,
        originCollegeId,
        ...(ignorePostId ? { NOT: { id: ignorePostId } } : {}),
      },
      select: { id: true },
    });
    if (!conflict) return slug;
    n += 1;
    slug = `${baseSlug}-${n}`;
  }
  throw new Error("Could not generate a unique slug after 50 attempts");
}

export async function createPost(actor: Actor, input: PostCreateInput) {
  const data = postCreateSchema.parse(input);

  if (data.originCollegeId === null && !canCreateUniversityPost(actor)) {
    throw new ForbiddenError("Only the University Admin may create university-wide posts");
  }
  if (data.originCollegeId !== null) {
    if (!isValidCollegeId(data.originCollegeId)) {
      throw new Error(`Unknown college id: ${data.originCollegeId}`);
    }
    if (!canEditPostInCollege(actor, data.originCollegeId)) {
      throw new ForbiddenError("You cannot create posts for this college");
    }
  }

  const baseSlug = data.slug ?? toSlug(data.title);
  const slug = await ensureUniqueSlug(baseSlug, data.originCollegeId);

  // Always self-tag origin college so the college feed query stays simple.
  const tagIds = new Set(data.collegeTagIds);
  if (data.originCollegeId) tagIds.add(data.originCollegeId);

  const post = await prisma.post.create({
    data: {
      type: data.type,
      title: data.title,
      slug,
      excerpt: data.excerpt ?? null,
      content: data.content as Prisma.InputJsonValue,
      contentText: data.contentText ?? null,
      coverImageUrl: data.coverImageUrl ?? null,
      coverImageAlt: data.coverImageAlt ?? null,
      isFeatured: data.isFeatured,
      scheduledFor: data.scheduledFor ?? null,
      status: PostStatus.DRAFT,
      authorId: actor.id,
      originCollegeId: data.originCollegeId,
      sdgs: data.sdgs,
      collegeTags: {
        create: Array.from(tagIds).map((collegeId) => ({ collegeId })),
      },
    },
  });

  await audit({
    actorId: actor.id,
    action: "post.create",
    entityType: "Post",
    entityId: post.id,
    metadata: { originCollegeId: post.originCollegeId, type: post.type },
  });

  return post;
}

export async function updatePost(actor: Actor, input: PostUpdateInput) {
  const { id, ...rest } = postUpdateSchema.parse(input);

  const existing = await prisma.post.findUnique({
    where: { id },
    include: { collegeTags: true },
  });
  if (!existing) throw new Error("Post not found");
  if (!canEditPostInCollege(actor, existing.originCollegeId)) {
    throw new ForbiddenError();
  }

  const data: Prisma.PostUpdateInput = {};

  // Editing a published post takes it out of the published state so it
  // must be explicitly re-published. SUPER_ADMIN goes to DRAFT (can
  // re-publish immediately); college admins go to PENDING_REVIEW (needs
  // OUR re-approval before going live again).
  if (existing.status === PostStatus.PUBLISHED) {
    data.status = actor.role === Role.SUPER_ADMIN
      ? PostStatus.DRAFT
      : PostStatus.PENDING_REVIEW;
  }
  if (rest.title !== undefined) data.title = rest.title;
  if (rest.excerpt !== undefined) data.excerpt = rest.excerpt;
  if (rest.content !== undefined) data.content = rest.content as Prisma.InputJsonValue;
  if (rest.contentText !== undefined) data.contentText = rest.contentText;
  if (rest.coverImageUrl !== undefined) data.coverImageUrl = rest.coverImageUrl;
  if (rest.coverImageAlt !== undefined) data.coverImageAlt = rest.coverImageAlt;
  if (rest.isFeatured !== undefined) data.isFeatured = rest.isFeatured;
  if (rest.scheduledFor !== undefined) data.scheduledFor = rest.scheduledFor;
  if (rest.type !== undefined) data.type = rest.type;
  if (rest.sdgs !== undefined) data.sdgs = rest.sdgs;

  if (rest.slug !== undefined) {
    data.slug = await ensureUniqueSlug(rest.slug, existing.originCollegeId, id);
  }

  // Snapshot before a content change.
  if (rest.content !== undefined || rest.title !== undefined) {
    await prisma.postRevision.create({
      data: {
        postId: id,
        title: existing.title,
        content: existing.content as Prisma.InputJsonValue,
        editorId: actor.id,
      },
    });
  }

  const updated = await prisma.$transaction(async (tx) => {
    const u = await tx.post.update({ where: { id }, data });

    if (rest.collegeTagIds !== undefined) {
      const tagIds = new Set(rest.collegeTagIds);
      if (existing.originCollegeId) tagIds.add(existing.originCollegeId);
      await tx.postCollegeTag.deleteMany({ where: { postId: id } });
      await tx.postCollegeTag.createMany({
        data: Array.from(tagIds).map((collegeId) => ({ postId: id, collegeId })),
      });
    }
    return u;
  });

  await audit({
    actorId: actor.id,
    action: "post.update",
    entityType: "Post",
    entityId: id,
  });

  return updated;
}

// ─── Status transitions ────────────────────────────────────────────────

async function transitionStatus(args: {
  actor: Actor;
  postId: string;
  to: PostStatus;
  approvalAction: ApprovalAction;
  comment?: string | null;
  publishedAtOverride?: Date | null;
}) {
  const { actor, postId, to, approvalAction, comment } = args;

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error("Post not found");

  const allowed = allowedNextStatuses(actor, post.status, post.originCollegeId);
  if (!allowed.includes(to)) {
    throw new ForbiddenError(
      `Cannot move post from ${post.status} to ${to} as ${actor.role}`,
    );
  }

  const now = new Date();
  const updates: Prisma.PostUpdateInput = { status: to };

  if (to === PostStatus.PENDING_REVIEW) updates.submittedAt = now;
  if (
    to === PostStatus.APPROVED ||
    to === PostStatus.REJECTED ||
    to === PostStatus.CHANGES_REQUESTED ||
    to === PostStatus.PUBLISHED
  ) {
    updates.reviewedBy = { connect: { id: actor.id } };
    updates.reviewedAt = now;
  }
  if (to === PostStatus.PUBLISHED) {
    updates.publishedAt = args.publishedAtOverride ?? post.publishedAt ?? now;
  }

  await prisma.$transaction([
    prisma.post.update({ where: { id: postId }, data: updates }),
    prisma.approval.create({
      data: {
        postId,
        actorId: actor.id,
        action: approvalAction,
        comment: comment ?? null,
      },
    }),
  ]);

  await audit({
    actorId: actor.id,
    action: `post.${approvalAction.toLowerCase()}`,
    entityType: "Post",
    entityId: postId,
    metadata: { from: post.status, to },
  });
}

export async function submitForReview(actor: Actor, postId: string) {
  if (!canSubmitForReview(actor)) throw new ForbiddenError();
  await transitionStatus({
    actor,
    postId,
    to: PostStatus.PENDING_REVIEW,
    approvalAction: ApprovalAction.SUBMIT,
  });
}

export async function reviewPost(actor: Actor, input: ReviewActionInput) {
  if (!canApprovePosts(actor)) throw new ForbiddenError();
  const { postId, action, comment } = reviewActionSchema.parse(input);

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error("Post not found");

  switch (action) {
    case "APPROVE": {
      const isFuture = post.scheduledFor && post.scheduledFor > new Date();
      const to = isFuture ? PostStatus.APPROVED : PostStatus.PUBLISHED;
      await transitionStatus({
        actor, postId, to,
        approvalAction: ApprovalAction.APPROVE,
        comment,
      });
      return;
    }
    case "REJECT":
      await transitionStatus({
        actor, postId,
        to: PostStatus.REJECTED,
        approvalAction: ApprovalAction.REJECT,
        comment,
      });
      return;
    case "REQUEST_CHANGES":
      await transitionStatus({
        actor, postId,
        to: PostStatus.CHANGES_REQUESTED,
        approvalAction: ApprovalAction.REQUEST_CHANGES,
        comment,
      });
      return;
  }
}

export async function publishDirectly(actor: Actor, postId: string) {
  if (!canApprovePosts(actor)) throw new ForbiddenError();
  await transitionStatus({
    actor, postId,
    to: PostStatus.PUBLISHED,
    approvalAction: ApprovalAction.PUBLISH,
  });
}

export async function archivePost(actor: Actor, postId: string) {
  await transitionStatus({
    actor, postId,
    to: PostStatus.ARCHIVED,
    approvalAction: ApprovalAction.ARCHIVE,
  });
}
