import type { CareersPartners } from "@/data/careers";

export function CareersPartners({ partners }: { partners: CareersPartners }) {
  return (
    <section id="industry-partners" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {partners.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{partners.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{partners.description}</p>

      <div className="space-y-3">
        {partners.sectors.map((sector) => (
          <details
            key={sector.id}
            className="group overflow-hidden rounded-xl border border-auf-border bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 transition-colors hover:bg-off-white">
              <h3 className="font-display text-sm font-semibold text-navy">{sector.name}</h3>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-navy/8 px-2.5 py-0.5 text-[10px] font-medium text-navy/60">
                  {sector.companies.length} partners
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-navy/40 transition-transform group-open:rotate-180">
                  ↓
                </span>
              </div>
            </summary>
            <div className="border-t border-auf-border px-5 py-4">
              <div className="flex flex-wrap gap-2">
                {sector.companies.map((company, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-auf-border bg-off-white px-3 py-1 text-[11px] font-medium text-navy/70"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>

      <p className="mt-8 rounded-xl border border-auf-border bg-off-white px-5 py-3.5 text-xs leading-relaxed text-auf-muted">
        <span className="font-semibold text-navy">For employers: </span>
        {partners.partnershipNote}
      </p>
    </section>
  );
}
