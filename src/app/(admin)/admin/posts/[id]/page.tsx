import { notFound } from "next/navigation";
import Link from "next/link";
import { PostStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdminPage, ForbiddenError } from "@/server/auth/session";
import {
  allowedNextStatuses,
  canApprovePosts,
  canEditPostInCollege,
} from "@/lib/rbac/permissions";
import { activeColleges, getCollegeById, collegeLabel } from "@/data/colleges";
import { Badge, Card, PageHeader } from "@/components/ui/primitives";
import { PostForm } from "../post-form";
import { WorkflowBar } from "./workflow-bar";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Edit post" };

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const actor = await requireAdminPage();
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      collegeTags: { select: { collegeId: true } },
      approvals: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { actor: { select: { name: true } } },
      },
    },
  });
  if (!post) notFound();
  if (!canEditPostInCollege(actor, post.originCollegeId)) throw new ForbiddenError();

  const colleges = activeColleges.map((c) => ({
    id: c.id,
    shortName: c.shortName,
    name: c.name,
  }));

  const nextStatuses = allowedNextStatuses(actor, post.status, post.originCollegeId);
  const originCollege = post.originCollegeId
    ? getCollegeById(post.originCollegeId)
    : null;

  return (
    <>
      <PageHeader
        title={post.title}
        description={
          <span>
            <Badge tone={post.status}>{post.status}</Badge>
            {post.publishedAt ? (
              <span className="ml-2 text-xs text-neutral-500">
                Published {formatDate(post.publishedAt)}
              </span>
            ) : null}
          </span>
        }
      />

      <WorkflowBar
        postId={post.id}
        status={post.status}
        allowedNext={nextStatuses}
        canReview={canApprovePosts(actor)}
      />

      <Card className="mt-6">
        <PostForm
          mode="edit"
          role={actor.role}
          actorCollegeId={actor.collegeId}
          colleges={colleges}
          initial={{
            id: post.id,
            type: post.type,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            body: post.contentText ?? "",
            originCollegeId: post.originCollegeId,
            collegeTagIds: post.collegeTags.map((t) => t.collegeId),
            isFeatured: post.isFeatured,
            coverImageUrl: post.coverImageUrl,
            coverImageAlt: post.coverImageAlt,
          }}
        />
      </Card>

      <h2 className="mt-8 mb-3 text-lg font-semibold text-navy">Approval history</h2>
      <Card className="p-0">
        {post.approvals.length === 0 ? (
          <p className="px-4 py-6 text-sm text-auf-muted">No history yet.</p>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {post.approvals.map((a) => (
              <li key={a.id} className="px-4 py-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-navy">{a.action}</span>
                  <span className="text-xs text-neutral-500">
                    {new Date(a.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-neutral-500">by {a.actor.name}</div>
                {a.comment ? (
                  <p className="mt-1 text-neutral-700">{a.comment}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </Card>

      {post.status === PostStatus.PUBLISHED ? (
        <p className="mt-4 text-xs text-neutral-500">
          Live at{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy underline hover:text-navy-deep"
            href={
              originCollege
                ? `/c/${originCollege.slug}/posts/${post.slug}`
                : `/posts/${post.slug}`
            }
          >
            {collegeLabel(post.originCollegeId)} → {post.slug} ↗
          </Link>
        </p>
      ) : null}
    </>
  );
}
