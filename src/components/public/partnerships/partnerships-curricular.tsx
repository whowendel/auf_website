import type { PartnershipsCurricular } from "@/data/partnerships";

const TYPE_STYLES: Record<string, string> = {
  "Tertiary Hospital":            "bg-navy/8 text-navy",
  "Government Hospital":          "bg-navy/8 text-navy",
  "Specialty Hospital":           "bg-navy/8 text-navy",
  "Local University":             "bg-gold/10 text-[#8a6800]",
  "State University":             "bg-gold/10 text-[#8a6800]",
  "International University":     "bg-gold/10 text-[#8a6800]",
  "Professional Organization":    "bg-off-white text-navy/60",
};

export function PartnershipsCurricular({ curricular }: { curricular: PartnershipsCurricular }) {
  return (
    <section id="curricular-partners" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {curricular.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{curricular.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{curricular.description}</p>

      <div className="space-y-10">
        {curricular.categories.map((cat) => (
          <div key={cat.id}>
            {/* Category header */}
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-auf-border" />
              <span className="rounded-full border border-auf-border bg-off-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-navy/50">
                {cat.label}
              </span>
              <div className="h-px flex-1 bg-auf-border" />
            </div>

            {/* Partner cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.partners.map((partner) => (
                <div
                  key={partner.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-auf-border bg-white"
                >
                  {/* Logo placeholder */}
                  <div className="flex h-20 items-center justify-center border-b border-auf-border bg-off-white/60">
                    <span className="font-display text-[10px] font-light italic text-navy/25">
                      {partner.name === "TBA" ? "Logo — To be announced" : partner.name}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-2 flex flex-wrap items-start gap-2">
                      <h3 className="font-display text-sm font-semibold text-navy">{partner.name}</h3>
                    </div>

                    {/* Type badge + location */}
                    <div className="mb-3 flex flex-wrap items-center gap-1.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${TYPE_STYLES[partner.type] ?? "bg-off-white text-navy/60"}`}
                      >
                        {partner.type}
                      </span>
                      <span className="text-[11px] text-auf-muted">{partner.location}</span>
                    </div>

                    <p className="mb-3 flex-1 text-xs leading-relaxed text-auf-muted">{partner.description}</p>

                    {/* Focus areas */}
                    {partner.focus.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {partner.focus.map((tag) => (
                          <span
                            key={tag}
                            className="rounded border border-auf-border bg-off-white px-2 py-0.5 text-[9px] font-medium text-navy/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Since footer */}
                  {partner.since && partner.since !== "TBA" && (
                    <div className="border-t border-auf-border bg-off-white px-4 py-2">
                      <p className="text-[10px] text-auf-muted">
                        <span className="font-semibold text-navy">Partner since </span>{partner.since}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
