import type { AboutAttributes } from "@/data/about";

export function AboutAttributes({ attributes }: { attributes: AboutAttributes }) {
  return (
    <section id="graduate-attributes" className="scroll-mt-32 py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">What we produce</p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">AUF Graduate Attributes</h2>

      <div className="mb-10 space-y-4 text-sm leading-relaxed text-auf-muted">
        {attributes.intro.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {attributes.items.map((attr) => (
          <div
            key={attr.id}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-auf-border bg-off-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-navy transition-transform duration-300 group-hover:scale-y-100" />

            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-2xl font-semibold text-navy/10">
                {String(attr.id).padStart(2, "0")}
              </span>
              <span className="h-2 w-2 rounded-full bg-gold" />
            </div>

            <h3 className="font-display text-sm font-semibold leading-snug text-navy md:text-base">
              {attr.title}
            </h3>

            {attr.bullets && attr.bullets.length > 0 ? (
              <ul className="mt-3 flex-1 space-y-1.5 text-xs text-auf-muted">
                {attr.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
