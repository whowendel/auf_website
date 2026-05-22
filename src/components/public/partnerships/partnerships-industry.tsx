import type { PartnershipsIndustry } from "@/data/partnerships";

export function PartnershipsIndustry({ industry }: { industry: PartnershipsIndustry }) {
  return (
    <section id="industry-partners" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {industry.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{industry.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{industry.description}</p>

      <div className="space-y-3">
        {industry.sectors.map((sector) => (
          <details
            key={sector.id}
            className="group overflow-hidden rounded-2xl border border-auf-border bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 hover:bg-off-white">
              <h3 className="font-display text-sm font-semibold text-navy">{sector.name}</h3>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-navy/8 px-2.5 py-0.5 text-[10px] font-semibold text-navy/60">
                  {sector.count} partner{sector.count !== 1 ? "s" : ""}
                </span>
                <span className="text-[10px] font-bold text-navy/30 transition-transform group-open:rotate-180">↓</span>
              </div>
            </summary>

            <div className="border-t border-auf-border px-5 py-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {sector.partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="rounded-xl border border-auf-border bg-off-white/50 p-4"
                  >
                    <div className="mb-1.5 flex items-start justify-between gap-2">
                      <p className="font-display text-sm font-semibold text-navy">{partner.name}</p>
                      <span className="shrink-0 rounded-full bg-white border border-auf-border px-2 py-0.5 text-[9px] font-medium text-navy/50">
                        {partner.type}
                      </span>
                    </div>
                    <p className="mb-1 text-xs leading-relaxed text-auf-muted">{partner.description}</p>
                    <p className="text-[10px] text-auf-muted/60">{partner.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>

      <p className="mt-8 rounded-xl border border-auf-border bg-off-white px-5 py-3.5 text-xs leading-relaxed text-auf-muted">
        <span className="font-semibold text-navy">Become a partner: </span>{industry.partnershipNote}
      </p>
    </section>
  );
}
