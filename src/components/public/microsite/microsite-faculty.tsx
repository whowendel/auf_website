import type { College } from "@/data/colleges";
import { SectionShell } from "./section-shell";

export function MicrositeFaculty({ college }: { college: College }) {
  if (!college.faculty || (!college.faculty.leads.length && !college.faculty.roster.length)) {
    return null;
  }
  const { leads, rosterLabel, roster } = college.faculty;

  return (
    <SectionShell
      id="faculty"
      eyebrow="Our people"
      title="Faculty"
      brandColor={college.brandColor}
      tone="white"
    >
      {leads.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border bg-white p-6"
              style={{ borderColor: `${college.brandColor}20` }}
            >
              <p className="font-display text-lg font-semibold text-[var(--auf-navy)]">
                {lead.name}
              </p>
              <p
                className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{ color: college.brandColor }}
              >
                {lead.title}
              </p>
            </div>
          ))}
        </div>
      )}

      {roster.length > 0 && (
        <div className={leads.length > 0 ? "mt-10 border-t pt-10" : ""} style={leads.length > 0 ? { borderColor: `${college.brandColor}15` } : undefined}>
          {rosterLabel && (
            <p
              className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ color: college.brandColor }}
            >
              {rosterLabel}
            </p>
          )}
          <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {roster.map((name, i) => (
              <li key={i} className="text-sm leading-relaxed text-[var(--auf-text)]">
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </SectionShell>
  );
}
