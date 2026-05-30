"use client";

import { useRouter } from "next/navigation";
import { Button, Textarea } from "@/components/ui/primitives";
import { useWorkflow, type PostStatus } from "./use-workflow";

export function WorkflowBar({
  postId,
  status,
  allowedNext,
  canReview,
}: {
  postId: string;
  status: PostStatus;
  allowedNext: PostStatus[];
  canReview: boolean;
}) {
  const router = useRouter();

  const wf = useWorkflow({
    postId,
    status,
    allowedNext,
    canReview,
    onSuccess: () => router.refresh(),
  });

  // Nothing to show — keep the DOM clean
  if (!wf.hasAnyAction && !wf.reviewMode) return null;

  return (
    <div className="rounded-lg border border-auf-border border-l-4 border-l-navy bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        {wf.showSubmit && (
          <Button onClick={wf.submitForReview} disabled={wf.isPending}>
            Submit for review
          </Button>
        )}

        {wf.showReviewPanel && (
          <>
            <Button onClick={() => wf.setReviewMode("APPROVE")} disabled={wf.isPending}>
              Approve
            </Button>
            <Button
              variant="secondary"
              onClick={() => wf.setReviewMode("REQUEST_CHANGES")}
              disabled={wf.isPending}
            >
              Request changes
            </Button>
            <Button variant="danger" onClick={() => wf.setReviewMode("REJECT")} disabled={wf.isPending}>
              Reject
            </Button>
          </>
        )}

        {wf.showPublishNow && (
          <Button onClick={wf.publishNow} disabled={wf.isPending}>
            Publish now
          </Button>
        )}

        {wf.showArchive && (
          <Button variant="danger" onClick={wf.archive} disabled={wf.isPending}>
            Archive
          </Button>
        )}
      </div>

      {wf.reviewMode && (
        <div className="mt-4 space-y-2">
          <Textarea
            rows={3}
            value={wf.comment}
            onChange={(e) => wf.setComment(e.target.value)}
            placeholder={
              wf.reviewMode === "APPROVE"
                ? "Optional approval note"
                : "Comments for the author (recommended)"
            }
          />
          <div className="flex gap-2">
            <Button
              disabled={wf.isPending}
              onClick={() => {
                wf.confirmReview();
                wf.setReviewMode(null);
                wf.setComment("");
              }}
            >
              Confirm {wf.reviewMode.replace("_", " ").toLowerCase()}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                wf.setReviewMode(null);
                wf.setComment("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
