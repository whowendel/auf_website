import type { TestimonialsStats } from "@/data/testimonials";

export function TestimonialsStats({ stats }: { stats: TestimonialsStats }) {
  return (
    <section id="by-the-numbers" className="scroll-mt-32 py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {stats.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{stats.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{stats.description}</p>

      {/* Metrics grid */}
      <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3">
        {stats.metrics.map((m) => (
          <div
            key={m.id}
            className="flex flex-col rounded-2xl border border-auf-border bg-white p-5 text-center"
          >
            <span className="mb-1 font-display text-2xl font-light text-navy md:text-3xl">{m.value}</span>
            <span className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/70">
              {m.label}
            </span>
            <span className="text-[10px] italic text-auf-muted/60">{m.note}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="relative overflow-hidden rounded-2xl bg-navy">
        <div className="auf-diamond-pattern absolute inset-0 pointer-events-none" aria-hidden />
        <div className="relative flex flex-col items-center gap-4 px-8 py-10 text-center md:flex-row md:justify-between md:px-10 md:text-left">
          <div>
            <h3 className="mb-1.5 font-display text-xl font-light text-white md:text-2xl">
              {stats.cta.heading}
            </h3>
            <p className="text-sm text-white/60">{stats.cta.body}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <a
              href={stats.cta.primaryHref}
              className="rounded-full bg-gold px-6 py-2.5 text-[12px] font-bold text-navy transition-opacity hover:opacity-90"
            >
              {stats.cta.primaryLabel}
            </a>
            <a
              href={stats.cta.secondaryHref}
              className="rounded-full border border-white/20 px-6 py-2.5 text-[12px] font-semibold text-white transition-colors hover:border-white/50"
            >
              {stats.cta.secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
