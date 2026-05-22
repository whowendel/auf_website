import Image from "next/image";
import type { TestimonialsParents } from "@/data/testimonials";

export function TestimonialsParents({ parents }: { parents: TestimonialsParents }) {
  return (
    <section id="parent-voices" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {parents.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{parents.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{parents.description}</p>

      <div className="space-y-5">
        {parents.items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-auf-border bg-white p-6"
          >
            {/* Large quote */}
            <div className="relative mb-5">
              <span
                aria-hidden
                className="pointer-events-none absolute -top-2 -left-1 select-none font-display text-5xl font-bold leading-none text-gold/15"
              >
                &ldquo;
              </span>
              <p className="pt-4 font-display text-base font-light italic leading-relaxed text-navy/80 md:text-lg">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            {/* Attribution */}
            <div className="flex items-center gap-3 border-t border-auf-border pt-4">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-navy/10">
                {item.photoUrl ? (
                  <Image src={item.photoUrl} alt={item.name} fill className="object-cover" sizes="40px" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-display text-xs font-bold text-navy/40">
                    {item.name === "TBA" ? "?" : item.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">{item.name}</p>
                <p className="text-[11px] text-auf-muted">{item.relation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
