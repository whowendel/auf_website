import Image from "next/image";
import type { TestimonialsFeatured } from "@/data/testimonials";

export function TestimonialsFeatured({ featured }: { featured: TestimonialsFeatured }) {
  return (
    <section id="featured-story" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {featured.eyebrow}
      </p>

      {/* Hero quote card */}
      <div className="relative overflow-hidden rounded-2xl bg-navy">
        <div className="auf-diamond-pattern absolute inset-0 pointer-events-none opacity-40" aria-hidden />

        {/* Decorative quote mark */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-8 left-6 select-none font-display text-[180px] font-bold leading-none text-white/5"
        >
          &ldquo;
        </div>

        <div className="relative flex flex-col gap-8 px-8 py-10 md:flex-row md:items-center md:gap-10 md:px-10 md:py-12">
          {/* Quote */}
          <div className="flex-1">
            <p className="mb-6 font-display text-lg font-light italic leading-relaxed text-white md:text-xl lg:text-2xl">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-gold/40 bg-navy/60">
                {featured.photoUrl ? (
                  <Image
                    src={featured.photoUrl}
                    alt={featured.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-display text-sm font-bold text-gold">
                    {featured.name === "TBA" ? "?" : featured.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-white">{featured.name}</p>
                <p className="text-[11px] text-gold/80">{featured.program} · {featured.batch}</p>
                {featured.currentRole && featured.currentRole !== "TBA" && (
                  <p className="text-[11px] text-white/50">{featured.currentRole}</p>
                )}
              </div>
            </div>
          </div>

          {/* College badge — desktop side panel */}
          {featured.college && featured.college !== "TBA" && (
            <div className="hidden shrink-0 md:flex md:flex-col md:items-center md:justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/6">
                <span className="font-display text-lg font-bold text-gold">{featured.college}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
