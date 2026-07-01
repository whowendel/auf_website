import type { ExternalAffairsFactsFigures } from "@/data/external-affairs";

export function EaFacts({ factsFigures }: { factsFigures: ExternalAffairsFactsFigures }) {
  return (
    <section id="facts-figures" className="scroll-mt-32 border-b border-auf-border pb-14 pt-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {factsFigures.eyebrow}
      </p>
      <h2 className="mb-6 font-display text-2xl font-light text-navy md:text-3xl">
        {factsFigures.title}
      </h2>

      <p className="mb-8 text-sm leading-relaxed text-auf-muted md:text-base">
        {factsFigures.description}
      </p>

      {/* Facts & Figures content card */}
      <div className="rounded-2xl border border-dashed border-auf-border bg-auf-bg/40 p-10 text-center">
        <p className="text-sm font-medium text-auf-muted">
          Registry data, enrollment trends, and partnership metrics will be displayed here once finalized.
        </p>
      </div>
    </section>
  );
}
