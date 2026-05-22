import type { CareersOverview } from "@/data/careers";

export function CareersOverview({ overview }: { overview: CareersOverview }) {
  return (
    <section id="overview" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {overview.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{overview.title}</h2>
      <p className="mb-10 max-w-2xl text-sm leading-relaxed text-auf-muted">{overview.description}</p>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-auf-border bg-auf-border sm:grid-cols-4">
        {overview.stats.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center bg-white px-4 py-6 text-center">
            <span className="font-display text-3xl font-light text-navy md:text-4xl">{stat.value}</span>
            <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-auf-muted">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Mission statement */}
      <div className="relative overflow-hidden rounded-2xl border border-auf-border bg-white px-6 py-5">
        <div className="absolute left-0 top-0 h-full w-1 bg-gold" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">Our Mission</p>
        <p className="mt-2 font-display text-base font-light italic leading-relaxed text-navy md:text-lg">
          &ldquo;{overview.mission}&rdquo;
        </p>
      </div>
    </section>
  );
}
