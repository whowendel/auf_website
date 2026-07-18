import type { College } from "@/data/colleges";
import { SectionShell } from "./section-shell";

export function MicrositeLearningOutcomes({ college }: { college: College }) {
  if (!college.learningOutcomes?.items.length) return null;
  const { intro, items } = college.learningOutcomes;

  return (
    <SectionShell
      id="learning-outcomes"
      eyebrow="Graduate outcomes"
      title="Learning Outcomes"
      description={intro}
      brandColor={college.brandColor}
      tone="tint"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((outcome) => (
          <div
            key={outcome.id}
            className="rounded-2xl border bg-white p-6 md:p-7"
            style={{ borderColor: `${college.brandColor}20` }}
          >
            <h3 className="font-display text-base font-semibold leading-snug text-[var(--auf-navy)]">
              {outcome.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {outcome.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--auf-text)]">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full"
                    style={{ background: college.accentColor }}
                  />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
