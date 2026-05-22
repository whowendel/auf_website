import type { College } from "@/data/colleges";
import { SectionShell } from "./section-shell";

export function MicrositeOrgs({ college }: { college: College }) {
  if (!college.studentOrganizations?.length) return null;

  return (
    <SectionShell
      id="organizations"
      eyebrow="Campus life"
      title="Student Organizations"
      description="Student-led communities where Angeleneans pursue shared passions — academic, athletic, and service-oriented."
      brandColor={college.brandColor}
      tone="white"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {college.studentOrganizations.map((org) => (
          <div
            key={org.id}
            className="group relative flex flex-col rounded-2xl border bg-white p-6 transition-shadow hover:shadow-md"
            style={{ borderColor: `${college.brandColor}20` }}
          >
            {/* Hover left bar */}
            <div
              className="absolute left-0 top-6 h-12 w-0.5 origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
              style={{ background: college.brandColor }}
            />

            <div className="pl-1.5">
              {org.type && (
                <span
                  className="mb-3 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]"
                  style={{
                    background: `${college.brandColor}12`,
                    color: college.brandColor,
                  }}
                >
                  {org.type}
                </span>
              )}
              <h3 className="font-display text-base font-semibold leading-snug text-[var(--auf-navy)]">
                {org.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--auf-muted)]">
                {org.description}
              </p>
              {org.advisor && (
                <p className="mt-4 text-xs text-[var(--auf-muted)]/70">
                  Advisor: <span className="text-[var(--auf-text)]">{org.advisor}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
