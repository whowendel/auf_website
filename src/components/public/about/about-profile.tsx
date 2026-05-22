import type { AboutProfile } from "@/data/about";

export function AboutProfile({ profile }: { profile: AboutProfile }) {
  return (
    <section id="profile" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {/* eyebrow from JSON */}
        At a glance
      </p>
      <h2 className="mb-6 font-display text-2xl font-light text-navy md:text-3xl">
        University Profile
      </h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted md:text-base">
        {profile.intro}
      </p>

      {/* Highlight stats */}
      <div className="mb-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-auf-border sm:grid-cols-3">
        {profile.highlights.map((h) => (
          <div key={h.label} className="bg-navy px-4 py-5 text-center">
            <div className="font-display text-lg font-semibold text-gold-light sm:text-xl">{h.value}</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/50">{h.label}</div>
          </div>
        ))}
      </div>

      {/* Opening paragraphs */}
      <div className="mb-8 space-y-4">
        {profile.paragraphs.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed text-auf-muted md:text-base">{p}</p>
        ))}
      </div>

      {/* Numbered recognitions */}
      <div className="space-y-5">
        {profile.recognitions.map((rec) => (
          <div key={rec.id} className="flex items-start gap-4">
            <span
              className="mt-0.5 shrink-0 font-display text-xl font-semibold tabular-nums leading-tight opacity-40 text-navy"
              aria-hidden
            >
              {String(rec.number).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-snug text-navy md:text-base">{rec.heading}</p>
              {rec.body && (
                <p className="mt-1.5 text-sm leading-relaxed text-auf-muted">{rec.body}</p>
              )}
              {rec.bullets && rec.bullets.length > 0 && (
                <ul className="mt-2 space-y-1.5">
                  {rec.bullets.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-auf-muted">
                      <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-navy/40" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
