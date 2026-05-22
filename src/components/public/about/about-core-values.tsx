import type { CoreVirtue } from "@/data/about";

export function AboutCoreValues({ virtues }: { virtues: CoreVirtue[] }) {
  return (
    <section id="core-values" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Character formation</p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">Core Values</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">
        Three foundational virtues animate everything at AUF — from curriculum design to community extension. Every Angelenean is formed to embody all three.
      </p>

      <div className="grid gap-5 lg:grid-cols-3">
        {virtues.map((v, i) => (
          <article
            key={v.id}
            className="relative flex flex-col overflow-hidden rounded-2xl"
            style={{ background: v.color }}
          >
            <div
              className="absolute left-0 top-0 h-0.5 w-full"
              style={{ background: "linear-gradient(90deg,var(--auf-gold) 0%,var(--auf-gold-light) 50%,var(--auf-gold) 100%)" }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 bottom-0 select-none font-display text-[7rem] font-bold leading-none text-white/6"
            >
              {i + 1}
            </span>

            <div className="relative flex flex-1 flex-col p-6 md:p-7">
              <span className="mb-5 block text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{v.ordinal}</span>
              <h3
                className="font-display text-3xl font-semibold leading-tight text-white md:text-4xl"
                style={{ whiteSpace: "pre-line" }}
              >
                {v.tagalog}
              </h3>
              <p className="mt-2 font-display text-sm font-light italic text-gold">
                &ldquo;{v.english}&rdquo;
              </p>
              <p className="mt-5 flex-1 text-xs leading-relaxed text-white/60 md:text-sm">{v.description}</p>

              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="mb-2.5 text-[9px] font-bold uppercase tracking-[0.18em] text-gold/60">Expressions</p>
                <ul className="space-y-1.5">
                  {v.pillars.map((p, pi) => (
                    <li key={pi} className="flex items-start gap-2 text-xs text-white/50">
                      <span aria-hidden className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
