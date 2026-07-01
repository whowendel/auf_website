import type { ExternalAffairsHistory } from "@/data/external-affairs";

export function EaHistory({ history }: { history: ExternalAffairsHistory }) {
  return (
    <section id="history" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {history.eyebrow}
      </p>
      <h2 className="mb-10 font-display text-2xl font-light text-navy md:text-3xl">
        {history.title}
      </h2>

      <ol className="relative">
        {/* Vertical rail */}
        <div
          aria-hidden
          className="absolute left-18 top-2 bottom-2 hidden w-px sm:block"
          style={{ background: "var(--auf-border)" }}
        />

        {history.milestones.map((m, i) => (
          <li
            key={i}
            className="relative mb-8 last:mb-0 grid sm:grid-cols-[5rem_1rem_1fr] sm:gap-x-5 sm:items-start"
          >
            {/* Year */}
            <div className="mb-1.5 sm:mb-0 sm:pt-1 sm:text-right">
              <span className="font-display text-xs font-bold text-navy sm:text-sm">
                {m.year}
              </span>
            </div>

            {/* Node */}
            <div className="relative hidden sm:flex flex-col items-center pt-2">
              <span
                className="z-10 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-white"
                style={{
                  background: i % 2 === 0 ? "var(--auf-navy)" : "var(--auf-gold)",
                }}
              />
            </div>

            {/* Content card */}
            <div className="rounded-xl border border-auf-border bg-off-white p-4 md:p-6 shadow-sm">
              <h3 className="font-display text-sm font-semibold text-navy md:text-base mb-3">
                {m.title}
              </h3>
              <p className="text-xs leading-relaxed text-auf-muted md:text-sm whitespace-pre-line">
                {m.body}
              </p>
              {"objectives" in m && m.objectives && (m.objectives as string[]).length > 0 && (
                <ul className="mt-4 space-y-2 pl-5 list-disc text-xs text-auf-muted md:text-sm">
                  {(m.objectives as string[]).map((obj, oi) => (
                    <li key={oi} className="leading-relaxed">
                      {obj}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
