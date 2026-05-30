"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  submitPostForReviewAction,
  reviewPostAction,
  publishPostAction,
  archivePostAction,
} from "@/server/actions/posts";

// ─── Status constants (mirrors the Prisma enum, safe to use in client code) ──

export const POST_STATUSES = {
  DRAFT:             "DRAFT",
  PENDING_REVIEW:    "PENDING_REVIEW",
  CHANGES_REQUESTED: "CHANGES_REQUESTED",
  APPROVED:          "APPROVED",
  PUBLISHED:         "PUBLISHED",
  REJECTED:          "REJECTED",
  ARCHIVED:          "ARCHIVED",
} as const;

export type PostStatus = (typeof POST_STATUSES)[keyof typeof POST_STATUSES];
export type ReviewAction = "APPROVE" | "REJECT" | "REQUEST_CHANGES";

const REVIEW_SUCCESS: Record<ReviewAction, string> = {
  APPROVE:          "Post approved",
  REJECT:           "Post rejected",
  REQUEST_CHANGES:  "Changes requested",
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useWorkflow({
  postId,
  status,
  allowedNext,
  canReview,
  onSuccess,
}: {
  postId: string;
  status: PostStatus;
  allowedNext: PostStatus[];
  canReview: boolean;
  onSuccess: () => void;
}) {
  const [reviewMode, setReviewMode]   = useState<ReviewAction | null>(null);
  const [comment,    setComment]      = useState("");
  const [isPending,  startTransition] = useTransition();

  const can = (s: PostStatus) => allowedNext.includes(s);

  /** Run an async action, show a success or error toast, then call onSuccess. */
  const exec = (fn: () => Promise<unknown>, successMsg: string) => {
    startTransition(async () => {
      try {
        await fn();
        toast.success(successMsg);
        onSuccess();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Something went wrong");
      }
    });
  };

  // ── Visibility flags ───────────────────────────────────────────────────────
  const showSubmit      = !canReview && can(POST_STATUSES.PENDING_REVIEW) && status !== POST_STATUSES.PENDING_REVIEW;
  const showReviewPanel = canReview  && status === POST_STATUSES.PENDING_REVIEW;
  const showPublishNow  = canReview  && can(POST_STATUSES.PUBLISHED) && status !== POST_STATUSES.PENDING_REVIEW;
  const showArchive     = can(POST_STATUSES.ARCHIVED);
  const hasAnyAction    = showSubmit || showReviewPanel || showPublishNow || showArchive;

  // ── Action handlers ────────────────────────────────────────────────────────
  const submitForReview = () =>
    exec(() => submitPostForReviewAction(postId), "Submitted for review");

  const publishNow = () =>
    exec(() => publishPostAction(postId), "Post published");

  const archive = () =>
    exec(() => archivePostAction(postId), "Post archived");

  const confirmReview = () => {
    if (!reviewMode) return;
    exec(
      () => reviewPostAction({
        postId,
        action: reviewMode,
        comment: comment.trim() || null,
      }),
      REVIEW_SUCCESS[reviewMode],
    );
  };

  return {
    // Inline review state
    reviewMode,  setReviewMode,
    comment,     setComment,
    isPending,
    // Visibility
    hasAnyAction,
    showSubmit,
    showReviewPanel,
    showPublishNow,
    showArchive,
    // Actions
    submitForReview,
    publishNow,
    archive,
    confirmReview,
  };
}
