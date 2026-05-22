import Link from "next/link";
import { getCollegeById } from "@/data/colleges";

type CollegeTag = { collegeId: string };

export function PostArticleFooter({
  collegeTags,
  currentCollegeId,
  backHref,
  backLabel,
}: {
  collegeTags: CollegeTag[];
  /** Filter this college out of the "Also featured in" list. */
  currentCollegeId?: string;
  backHref: string;
  backLabel: string;
}) {
  const visibleTags = currentCollegeId
    ? collegeTags.filter((t) => t.collegeId !== currentCollegeId)
    : collegeTags;

  return (
    <>
      {visibleTags.length > 0 && (
        <div className="mt-10 border-t border-auf-border pt-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-auf-muted/60">
            Also featured in
          </p>
          <div className="flex flex-wrap gap-2">
            {visibleTags.map((t) => {
              const c = getCollegeById(t.collegeId);
              return (
                <Link
                  key={t.collegeId}
                  href={`/c/${t.collegeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-auf-border px-3 py-1 text-[11px] font-medium text-navy transition-colors hover:bg-navy hover:text-white"
                >
                  {c?.shortName ?? t.collegeId}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-10">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 rounded-full border border-auf-border px-4 py-2 text-[11px] font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
        >
          ← {backLabel}
        </Link>
      </div>
    </>
  );
}
