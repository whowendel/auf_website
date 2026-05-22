import type { ResearchGrants } from "@/data/research";
import { DownloadableFormList } from "@/components/public/page-layout/downloadable-form-list";

export function ResearchGrants({ grants }: { grants: ResearchGrants }) {
  return (
    <section id="grants-opportunities" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {grants.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{grants.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{grants.description}</p>

      {/* Funding opportunities */}
      <div className="mb-12">
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">
          External Funding Sources
        </p>
        <div className="space-y-3">
          {grants.opportunities.map((opp) => {
            const inner = (
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy/8 text-[9px] font-bold uppercase text-navy text-center leading-tight px-1">
                  {opp.agency.replace("DOST-", "").slice(0, 6)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-navy">{opp.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-auf-muted">{opp.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {opp.targetAreas.map((area, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-navy/15 px-2 py-0.5 text-[9px] font-medium text-navy/60"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                {opp.url && (
                  <span className="shrink-0 text-sm font-bold text-navy/30 transition-colors group-hover:text-navy">
                    →
                  </span>
                )}
              </div>
            );

            return (
              <div key={opp.id}>
                {opp.url ? (
                  <a
                    href={opp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-xl border border-auf-border bg-white p-4 transition-shadow hover:shadow-md md:p-5"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="rounded-xl border border-auf-border bg-white p-4 md:p-5">
                    {inner}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Application forms */}
      <div>
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">
          Application & Support Forms
        </p>
        <DownloadableFormList forms={grants.applicationForms} accentColor="var(--auf-navy)" />
      </div>
    </section>
  );
}
