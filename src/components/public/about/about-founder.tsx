import type { AboutFounder } from "@/data/about";

export function AboutFounder({ founder }: { founder: AboutFounder }) {
  const initials = founder.name.split(" ").map((n) => n[0]).join("").slice(0, 3);

  return (
    <section id="founder" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Our roots</p>
      <h2 className="mb-10 font-display text-2xl font-light text-navy md:text-3xl">The Founder</h2>

      {/* Float container */}
      <div className="after:table after:clear-both after:content-['']">
        {/* Portrait — floated left */}
        <div className="mb-4 mr-8 float-left w-45 lg:w-55 shrink-0">
          <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-navy">
            {founder.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={founder.photoUrl} alt={founder.name} className="h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="auf-diamond-pattern absolute inset-0 opacity-100" />
                <div
                  className="relative flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold text-navy"
                  style={{ background: "var(--auf-gold)" }}
                >
                  {initials}
                </div>
              </div>
            )}
          </div>
          <p className="mt-4 font-display text-base font-semibold text-navy">{founder.name}</p>
          <p className="mt-0.5 text-sm text-auf-muted">{founder.role}</p>
        </div>

        {/* Bio */}
        <div>
          {founder.subheading && (
            <h3 className="mb-4 font-display text-base font-semibold text-navy md:text-lg">
              {founder.subheading}
            </h3>
          )}
          <div className="space-y-4">
            {founder.bio.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-auf-muted md:text-base">
                {paragraph}
              </p>
            ))}
          </div>

          <blockquote
            className="mt-8 rounded-2xl border-l-4 border-gold p-6 md:p-8"
            style={{ background: "var(--auf-navy)" }}
          >
            <p className="font-display text-base font-light italic leading-relaxed text-white md:text-lg">
              &ldquo;{founder.quote}&rdquo;
            </p>
            <footer className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
              — {founder.quoteAttribution}
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
