import Image from "next/image";
import type { TestimonialsInternational } from "@/data/testimonials";

export function TestimonialsInternational({ international }: { international: TestimonialsInternational }) {
  return (
    <section id="international-voices" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {international.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{international.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{international.description}</p>

      <div className="grid gap-5 sm:grid-cols-2">
        {international.items.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-2xl border border-auf-border bg-white"
          >
            {/* Gold left accent */}
            <div className="absolute inset-y-0 left-0 w-1 bg-gold" />

            <div className="py-5 pl-6 pr-5">
              {/* Country + college header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg leading-none" aria-label={item.country}>
                    {item.flagEmoji}
                  </span>
                  <span className="text-[11px] font-semibold text-navy">{item.country}</span>
                </div>
                <span className="flex h-6 w-9 items-center justify-center rounded bg-navy text-[9px] font-bold text-gold">
                  {item.college}
                </span>
              </div>

              {/* Quote */}
              <p className="mb-5 text-sm leading-relaxed italic text-auf-muted">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-navy">
                  {item.photoUrl ? (
                    <Image src={item.photoUrl} alt={item.name} fill className="object-cover" sizes="36px" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-[10px] font-bold text-gold">
                      {item.name === "TBA" ? "?" : item.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-navy">{item.name}</p>
                  <p className="text-[10px] text-auf-muted">{item.program}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
