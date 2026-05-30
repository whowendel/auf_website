"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  submitPostForReviewAction,
  reviewPostAction,
  publishPostAction,
  archivePostAction,
} from "@/server/actions/posts";
import { Alert, Button, Textarea } from "@/components/ui/primitives";

const POST_STATUSES = {
  DRAFT: "DRAFT",
  PENDING_REVIEW: "PENDING_REVIEW",
  CHANGES_REQUESTED: "CHANGES_REQUESTED",
  APPROVED: "APPROVED",
  PUBLISHED: "PUBLISHED",
  REJECTED: "REJECTED",
  ARCHIVED: "ARCHIVED",
} as const;

type PostStatusValue = (typeof POST_STATUSES)[keyof typeof POST_STATUSES];

export function WorkflowBar({
  postId,
  status,
  allowedNext,
  canReview,
}: {
  postId: string;
  status: PostStatusValue;
  allowedNext: PostStatusValue[];
  canReview: boolean;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showReview, setShowReview] = useState<"APPROVE" | "REJECT" | "REQUEST_CHANGES" | null>(null);
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();

  const run = (fn: () => Promise<unknown>) => {
    setError(null);
    startTransition(async () => {
      try {
        await fn();
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      }
    });
  };

  const can = (s: PostStatusValue) => allowedNext.includes(s);

  // Pre-compute button visibility so we can hide the whole bar when empty.
  const showSubmit       = !canReview && can(POST_STATUSES.PENDING_REVIEW) && status !== POST_STATUSES.PENDING_REVIEW;
  const showReviewPanel  = canReview && status === POST_STATUSES.PENDING_REVIEW;
  const showPublishNow   = canReview && can(POST_STATUSES.PUBLISHED) && status !== POST_STATUSES.PENDING_REVIEW;
  const showArchive      = can(POST_STATUSES.ARCHIVED);

  const hasAnyAction = showSubmit || showReviewPanel || showPublishNow || showArchive;

  // Don't render the container at all when there's nothing to show and no
  // active inline state (open review form or error message).
  if (!hasAnyAction && !showReview && !error) return null;

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        {/* Submit for review — college admins only; OUR publishes directly */}
        {showSubmit ? (
          <Button onClick={() => run(() => submitPostForReviewAction(postId))} disabled={isPending}>
            Submit for review
          </Button>
        ) : null}

        {/* Review actions (super admin only, when pending) */}
        {showReviewPanel ? (
          <>
            <Button onClick={() => setShowReview("APPROVE")} disabled={isPending}>
              Approve
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowReview("REQUEST_CHANGES")}
              disabled={isPending}
            >
              Request changes
            </Button>
            <Button variant="danger" onClick={() => setShowReview("REJECT")} disabled={isPending}>
              Reject
            </Button>
          </>
        ) : null}

        {/* Direct publish (super admin) */}
        {showPublishNow ? (
          <Button onClick={() => run(() => publishPostAction(postId))} disabled={isPending}>
            Publish now
          </Button>
        ) : null}

        {/* Archive */}
        {showArchive ? (
          <Button
            variant="danger"
            onClick={() => run(() => archivePostAction(postId))}
            disabled={isPending}
          >
            Archive
          </Button>
        ) : null}
      </div>

      {showReview ? (
        <div className="mt-4 space-y-2">
          <Textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={
              showReview === "APPROVE"
                ? "Optional approval note"
                : "Comments for the author (recommended)"
            }
          />
          <div className="flex gap-2">
            <Button
              disabled={isPending}
              onClick={() =>
                run(async () => {
                  await reviewPostAction({
                    postId,
                    action: showReview,
                    comment: comment.trim() === "" ? null : comment.trim(),
                  });
                  setShowReview(null);
                  setComment("");
                })
              }
            >
              Confirm {showReview.replace("_", " ").toLowerCase()}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setShowReview(null);
                setComment("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="mt-3">
          <Alert tone="error">{error}</Alert>
        </div>
      ) : null}
    </div>
  );
}
