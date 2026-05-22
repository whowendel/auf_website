import type { College } from "@/data/colleges";
import { SectionShell } from "./section-shell";

/**
 * Vertical timeline of college activities — flagship events, immersions,
 * outreach. Dates and types are optional.
 */
export function MicrositeActivities({ college }: { college: College }) {
  if (!college.activities?.length) return null;

  return (
    <SectionShell
      id="activities"
      eyebrow="Beyond the classroom"
      title="Activities & Events"
      description="Flagship events, immersions, and outreach programs that define the College experience throughout the year."
      brandColor={college.brandColor}
      tone="tint"
    >
      <ol className="relative">
        {/* Vertical timeline rail */}
        <div
          aria-hidden
          className="absolute left-[7px] top-2 bottom-2 w-px"
          style={{ background: `${college.brandColor}25` }}
        />

        {college.activities.map((act) => (
          <li key={act.id} className="relative mb-8 pl-10 last:mb-0">
            {/* Node */}
            <span
              aria-hidden
              className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full"
              style={{ background: college.brandColor }}
            >
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{ background: college.accentColor }}
              />
            </span>

            <article
              className="rounded-xl border bg-white p-5 md:p-6"
              style={{ borderColor: `${college.brandColor}20` }}
            >
              <div className="mb-2 flex flex-wrap items-center gap-3">
                {act.type && (
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]"
                    style={{
                      background: `${college.brandColor}12`,
                      color: college.brandColor,
                    }}
                  >
                    {act.type}
                  </span>
                )}
                {act.date && (
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--auf-muted)]">
                    {act.date}
                  </span>
                )}
              </div>
              <h3 className="font-display text-lg font-semibold leading-snug text-[var(--auf-navy)]">
                {act.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--auf-muted)]">
                {act.description}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
