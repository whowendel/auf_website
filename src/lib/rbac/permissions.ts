import { Role, type PostStatus } from "@prisma/client";
import { isValidCollegeId } from "@/data/colleges";

export type Actor = {
  id: string;
  role: Role;
  collegeId: string | null;
};

export function canManageUsers(actor: Actor) {
  return actor.role === Role.SUPER_ADMIN;
}

export function canApprovePosts(actor: Actor) {
  return actor.role === Role.SUPER_ADMIN;
}

export function canCreateUniversityPost(actor: Actor) {
  return actor.role === Role.SUPER_ADMIN;
}

export function canEditPostInCollege(actor: Actor, originCollegeId: string | null) {
  if (actor.role === Role.SUPER_ADMIN) return true;
  // University-wide post — only SUPER_ADMIN can edit.
  if (originCollegeId === null) return false;
  // Validate the college ID is known (guards against stale/garbage strings).
  if (!isValidCollegeId(originCollegeId)) return false;
  return actor.collegeId === originCollegeId;
}

export function canSubmitForReview(actor: Actor) {
  return actor.role === Role.SUPER_ADMIN || actor.role === Role.COLLEGE_ADMIN;
}

// Returns the set of statuses an actor may move a post to *from* `current`.
export function allowedNextStatuses(
  actor: Actor,
  current: PostStatus,
  originCollegeId: string | null,
): PostStatus[] {
  const owns = canEditPostInCollege(actor, originCollegeId);
  if (!owns) return [];

  const isSuper = actor.role === Role.SUPER_ADMIN;

  switch (current) {
    case "DRAFT":
      return isSuper
        ? ["PENDING_REVIEW", "PUBLISHED", "ARCHIVED"]
        : actor.role === Role.COLLEGE_ADMIN
          ? ["PENDING_REVIEW", "ARCHIVED"]
          : [];
    case "PENDING_REVIEW":
      if (isSuper) return ["APPROVED", "PUBLISHED", "REJECTED", "CHANGES_REQUESTED"];
      if (actor.role === Role.COLLEGE_ADMIN) return ["DRAFT"];
      return [];
    case "CHANGES_REQUESTED":
      return ["DRAFT", "PENDING_REVIEW"];
    case "APPROVED":
      return isSuper ? ["PUBLISHED", "ARCHIVED"] : [];
    case "PUBLISHED":
      return isSuper ? ["ARCHIVED"] : [];
    case "REJECTED":
    case "ARCHIVED":
      return isSuper ? ["DRAFT"] : [];
    default:
      return [];
  }
}
