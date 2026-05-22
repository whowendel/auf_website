import type { AdmissionsScholarships } from "@/data/admissions";

const TYPE_STYLES: Record<string, string> = {
  "Institutional":      "bg-navy/8 text-navy",
  "Government — UNIFAST": "bg-gold/10 text-[#8a6800]",
  "Government — CHED":  "bg-gold/8 text-[#8a6800]",
  "External Partners":  "bg-off-white text-navy/60",
};

export function AdmissionsScholarships({ scholarships }: { scholarships: AdmissionsScholarships }) {
  return (
    <section id="scholarships-grants" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {scholarships.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{scholarships.title}</h2>
      <p className="mb-8 text-sm leading-relaxed text-auf-muted">{scholarships.description}</p>

      <div className="space-y-5">
        {scholarships.categories.map((cat) => (
          <div key={cat.id} className="overflow-hidden rounded-2xl border border-auf-border bg-white">
            {/* Header */}
            <div className="border-b border-auf-border px-6 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-base font-semibold text-navy">{cat.name}</h3>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${TYPE_STYLES[cat.type] ?? "bg-off-white text-navy/60"}`}>
                  {cat.type}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-auf-muted">{cat.description}</p>
            </div>

            {/* Body */}
            <div className="grid gap-5 px-6 py-5 md:grid-cols-2">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-navy/50">Benefits</p>
                <ul className="space-y-1.5">
                  {cat.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-auf-muted">
                      <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-navy/50">Eligibility</p>
                <ul className="space-y-1.5">
                  {cat.eligibility.map((e, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-auf-muted">
                      <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-navy/30" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 rounded-xl border border-auf-border bg-off-white px-5 py-3.5 text-xs leading-relaxed text-auf-muted">
        <span className="font-semibold text-navy">Contact: </span>
        {scholarships.contactNote}
      </p>
    </section>
  );
}
