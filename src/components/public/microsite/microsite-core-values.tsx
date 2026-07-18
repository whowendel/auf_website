import type { College } from "@/data/colleges";
import { SectionShell } from "./section-shell";

export function MicrositeCoreValues({ college }: { college: College }) {
  if (!college.coreValues?.items.length) return null;
  const { intro, items } = college.coreValues;

  return (
    <SectionShell
      id="core-values"
      eyebrow="What we stand for"
      title="Core Values"
      description={intro}
      brandColor={college.brandColor}
      tone="white"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((value) => (
          <div
            key={value.id}
            className="rounded-2xl border bg-white p-6 md:p-7"
            style={{ borderColor: `${college.brandColor}20` }}
          >
            <div className="mb-4 h-0.5 w-10" style={{ background: college.accentColor }} />
            <h3 className="font-display text-base font-semibold leading-snug text-[var(--auf-navy)]">
              {value.name}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {value.bullets.map((bullet, i) => (
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
