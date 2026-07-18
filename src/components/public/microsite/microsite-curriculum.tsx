import type { College } from "@/data/colleges";
import { SectionShell } from "./section-shell";

export function MicrositeCurriculum({ college }: { college: College }) {
  if (!college.curriculum?.levels.length) return null;
  const { intro, levels } = college.curriculum;

  return (
    <SectionShell
      id="curriculum"
      eyebrow="Basic education"
      title="Curriculum"
      description={intro}
      brandColor={college.brandColor}
      tone="white"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {levels.map((lvl) => (
          <div
            key={lvl.id}
            className="rounded-2xl border bg-white p-6"
            style={{ borderColor: `${college.brandColor}20` }}
          >
            <p
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{ color: college.brandColor }}
            >
              {lvl.level}
            </p>
            <ul className="space-y-2">
              {lvl.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--auf-text)]">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full"
                    style={{ background: college.accentColor }}
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
