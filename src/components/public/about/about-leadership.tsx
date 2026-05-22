import Image from "next/image";
import type { AboutLeadership } from "@/data/about";

export function AboutLeadership({ leadership }: { leadership: AboutLeadership }) {
  const { president } = leadership;

  return (
    <section id="leadership" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {leadership.eyebrow}
      </p>
      <h2 className="mb-10 font-display text-2xl font-light text-navy md:text-3xl">
        University Leadership
      </h2>

      <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
        {/* President card */}
        <div className="shrink-0">
          {/* Photo */}
          <div className="relative mb-4 aspect-[3/4] w-full max-w-[260px] overflow-hidden rounded-2xl bg-navy">
            {president.photoUrl ? (
              <Image
                src={president.photoUrl}
                alt={president.name}
                fill
                className="object-cover object-top"
                sizes="260px"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="auf-diamond-pattern absolute inset-0" />
                <div
                  className="relative flex h-20 w-20 items-center justify-center rounded-full font-display text-2xl font-bold text-navy"
                  style={{ background: "var(--auf-gold)" }}
                >
                  {president.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
              </div>
            )}
            {/* Bottom gradient for name overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/80 to-transparent pointer-events-none" />
          </div>

          {/* Name + title */}
          <div>
            <p className="font-display text-lg font-semibold text-navy">{president.name}</p>
            {president.credentials && president.credentials !== "TBA" && (
              <p className="text-xs text-auf-muted">{president.credentials}</p>
            )}
            <p
              className="mt-1 text-xs font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--auf-gold)" }}
            >
              {president.title}
            </p>
          </div>

          {/* Profile highlights */}
          {president.profileHighlights && president.profileHighlights.length > 0 && (
            <ul className="mt-5 space-y-2 border-t border-auf-border pt-4">
              {president.profileHighlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-auf-muted">
                  <span
                    aria-hidden
                    className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-gold"
                  />
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Presidential message */}
        <div>
          <div className="mb-5 h-0.5 w-8 bg-gold" />
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
            Message from the President
          </p>
          <div className="space-y-4">
            {president.message.map((para, i) => (
              <p
                key={i}
                className={`leading-relaxed ${
                  i === 0
                    ? "font-display text-base italic text-navy"
                    : "text-sm text-auf-muted md:text-base"
                }`}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
