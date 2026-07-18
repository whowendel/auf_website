import type { College } from "@/data/colleges";
import { SectionShell } from "./section-shell";

export function MicrositeAdmissions({ college }: { college: College }) {
  if (!college.admissions?.groups.length) return null;
  const { intro, groups, note } = college.admissions;

  return (
    <SectionShell
      id="admissions"
      eyebrow="How to apply"
      title="Admissions"
      description={intro}
      brandColor={college.brandColor}
      tone="tint"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((group) => (
          <div
            key={group.id}
            className="rounded-2xl border bg-white p-6 md:p-7"
            style={{ borderColor: `${college.brandColor}20` }}
          >
            <p
              className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ color: college.brandColor }}
            >
              {group.title}
            </p>
            <ul className="space-y-2.5">
              {group.items.map((item, i) => (
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

      {note && (
        <p className="mt-8 text-sm leading-relaxed text-[var(--auf-muted)]">{note}</p>
      )}
    </SectionShell>
  );
}
