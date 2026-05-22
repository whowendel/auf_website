import type { ResearchOverview } from "@/data/research";

export function ResearchOverview({ overview }: { overview: ResearchOverview }) {
  return (
    <section id="overview" className="scroll-mt-32 border-b border-auf-border pb-14 pt-2">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {overview.eyebrow}
      </p>
      <h2 className="mb-8 font-display text-2xl font-light text-navy md:text-3xl">
        {overview.title}
      </h2>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-auf-border sm:grid-cols-4">
        {overview.highlights.map((h) => (
          <div key={h.label} className="bg-navy px-4 py-5 text-center">
            <div className="font-display text-xl font-semibold text-gold-light sm:text-2xl">{h.value}</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/50">{h.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {overview.paragraphs.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed text-auf-muted md:text-base">{p}</p>
        ))}
      </div>
    </section>
  );
}
