import type { AboutGovernance } from "@/data/about";

export function AboutGovernance({ governance }: { governance: AboutGovernance }) {
  return (
    <section id="governance" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Leadership</p>
      <h2 className="mb-10 font-display text-2xl font-light text-navy md:text-3xl">Governance</h2>

      <div className="mb-10 space-y-4 text-sm leading-relaxed text-auf-muted">
        {governance.intro.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Board of Trustees */}
        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">Board of Trustees</p>
          <ul className="divide-y divide-auf-border overflow-hidden rounded-xl border border-auf-border bg-off-white">
            {governance.boardOfTrustees.map((p) => (
              <li key={p.id} className="flex items-center gap-3 bg-white px-4 py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-gold bg-navy">
                  {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">{p.name}</p>
                  <p className="text-xs text-auf-muted">{p.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Administration */}
        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">University Administration</p>
          <ul className="divide-y divide-auf-border overflow-hidden rounded-xl border border-auf-border bg-off-white">
            {governance.administration.map((p, i) => (
              <li key={p.id} className="flex items-center gap-3 bg-white px-4 py-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{
                    background: i === 0 ? "var(--auf-gold)" : "var(--auf-off-white)",
                    color: i === 0 ? "var(--auf-navy)" : "var(--auf-muted)",
                    border: i === 0 ? "none" : "1px solid var(--auf-border)",
                  }}
                >
                  {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">{p.name}</p>
                  <p className="text-xs text-auf-muted">{p.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
