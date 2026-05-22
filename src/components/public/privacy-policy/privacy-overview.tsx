import type { PrivacyOverview } from "@/data/privacy-policy";

export function PrivacyOverviewSection({ overview }: { overview: PrivacyOverview }) {
  return (
    <section id="overview" className="scroll-mt-32 border-b border-auf-border py-14">
      <div className="mb-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{overview.eyebrow}</p>
        <h2 id="overview" className="font-display text-2xl font-light text-navy md:text-3xl">{overview.title}</h2>
      </div>

      <div className="mb-6 flex items-center gap-4 rounded-xl border border-auf-border bg-white px-5 py-3.5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-navy/40">Last Updated</p>
          <p className="text-sm font-semibold text-navy">{overview.lastUpdated}</p>
        </div>
        <div className="h-8 w-px bg-auf-border" />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-navy/40">Governing Law</p>
          <p className="text-sm font-semibold text-navy">{overview.governingLaw}</p>
        </div>
      </div>

      <div className="space-y-3 text-sm leading-relaxed text-auf-muted">
        {overview.intro.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-auf-border bg-off-white px-5 py-4 text-xs leading-relaxed text-auf-muted">
        <span className="font-semibold text-navy">Regulatory Framework: </span>
        {overview.frameworkNote}
      </div>
    </section>
  );
}
