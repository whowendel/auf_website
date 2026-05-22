import type { College } from "@/data/colleges";
import { SectionShell } from "./section-shell";

export function MicrositeAffiliations({ college }: { college: College }) {
  if (!college.affiliations?.length) return null;

  return (
    <SectionShell
      id="affiliations"
      eyebrow="Our network"
      title="Affiliations & Partnerships"
      description="Industry partners, professional bodies, and academic institutions we collaborate with to expand opportunities for our students."
      brandColor={college.brandColor}
      tone="white"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
        {college.affiliations.map((aff) => {
          const inner = (
            <div className="flex items-start gap-4">
              {/* Decorative initial badge in lieu of logo */}
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg font-display text-lg font-bold"
                style={{
                  background: `${college.brandColor}10`,
                  color: college.brandColor,
                }}
              >
                {aff.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="font-display text-base font-semibold leading-snug text-[var(--auf-navy)]">
                    {aff.name}
                  </h3>
                  {aff.type && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--auf-muted)]">
                      · {aff.type}
                    </span>
                  )}
                </div>
                {aff.description && (
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--auf-muted)] md:text-sm">
                    {aff.description}
                  </p>
                )}
              </div>
            </div>
          );

          const className =
            "group block rounded-xl border bg-white p-5 transition-shadow hover:shadow-md";
          const style = { borderColor: `${college.brandColor}20` };

          return aff.website ? (
            <a key={aff.id} href={aff.website} target="_blank" rel="noopener noreferrer" className={className} style={style}>
              {inner}
            </a>
          ) : (
            <div key={aff.id} className={className} style={style}>
              {inner}
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
