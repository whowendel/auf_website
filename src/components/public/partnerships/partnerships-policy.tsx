import type { PartnershipsGuidelines } from "@/data/partnerships";

export function PartnershipsPolicy({ policy }: { policy: PartnershipsGuidelines["policy"] }) {
  return (
    <section id="policy" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        Policy Overview
      </p>
      <h2 className="mb-6 font-display text-2xl font-light text-navy md:text-3xl">
        {policy.title}
      </h2>

      <div className="overflow-hidden rounded-2xl border border-auf-border bg-white shadow-sm">
        <div className="bg-navy px-6 py-5 text-white">
          <p className="text-sm leading-relaxed text-white/90">
            {policy.summary}
          </p>
        </div>
        <div className="px-6 py-6 bg-off-white/20">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-navy/50">
            Key Policy Principles
          </p>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {policy.principles.map((principle, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-auf-border bg-white p-4 shadow-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold-dark">
                  {i + 1}
                </span>
                <span className="text-xs leading-relaxed text-auf-muted">
                  {principle}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
