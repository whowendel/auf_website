import type { AboutRankings } from "@/data/about";

export function AboutRankings({ rankings }: { rankings: AboutRankings }) {
  return (
    <section id="rankings" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{rankings.eyebrow ?? "Recognition"}</p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">
        Accreditations &amp; International Rankings
      </h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{rankings.intro}</p>

      {/* Accreditations */}
      <div className="mb-10">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">
          National accreditations &amp; certifications
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {rankings.accreditations.map((a) => (
            <div key={a.id} className="flex flex-col rounded-xl border border-auf-border bg-off-white p-4 md:p-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-navy/8 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-navy">{a.body}</span>
                <span className="text-[10px] font-semibold text-auf-muted">{a.year}</span>
              </div>
              <p className="font-display text-sm font-semibold text-navy md:text-base">{a.level}</p>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-auf-muted">{a.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mb-8 flex items-center gap-4">
        <span className="h-px flex-1 bg-auf-border" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-auf-muted">International rankings</span>
        <span className="h-px flex-1 bg-auf-border" />
      </div>

      {/* International rankings */}
      <div className="grid gap-4 md:grid-cols-3">
        {rankings.international.map((r) => (
          <div key={r.id} className="relative overflow-hidden rounded-2xl bg-navy p-6">
            <div className="auf-diamond-pattern absolute inset-0" />
            <div
              className="absolute left-0 top-0 h-0.5 w-full"
              style={{ background: "linear-gradient(90deg,var(--auf-gold) 0%,var(--auf-gold-light) 50%,var(--auf-gold) 100%)" }}
            />
            <div className="relative">
              <span className="mb-3 inline-block rounded-full border border-gold/40 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-gold">{r.tag}</span>
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">{r.org}</p>
              <h3 className="mt-1 font-display text-base font-semibold text-white">{r.name}</h3>
              <p className="mt-3 text-xs leading-relaxed text-white/55">{r.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
