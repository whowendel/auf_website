import Link from "next/link";
import { university } from "@/data/colleges";
import { aboutCoreValues } from "@/data/about";

export function VirtuesSection() {
  return (
    <section className="relative overflow-hidden bg-off-white py-24 md:py-36">
      {/* Decorative background text */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none font-display text-[clamp(8rem,20vw,18rem)] font-bold leading-none text-white/2.5"
      >
        AUF
      </span>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            The Angelenean
          </p>
          <h2 className="font-display text-4xl font-light leading-tight text-navy md:text-5xl">
            Three virtues,{" "}
            <em className="italic text-gold-light">one vision</em>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-auf-muted md:text-base">
            Everything at AUF is shaped by a single aspiration: to form Angeleneans who are
            good, excellent, and genuinely caring — professionals the world can trust.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-xl bg-auf-border sm:grid-cols-3">
          {aboutCoreValues.virtues.map((v, i) => (
            <div
              key={v.ordinal}
              className="group relative flex flex-col bg-white p-8 transition-colors hover:bg-off-white md:p-10 lg:p-12"
            >
              <span className="mb-6 block font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-(--auf-gold)/70">
                {v.ordinal}
              </span>
              <span className="mb-6 block h-px w-10 bg-gold" />
              <h3
                className="font-display text-3xl font-semibold leading-tight text-navy md:text-4xl lg:text-[2.6rem]"
                style={{ whiteSpace: "pre-line" }}
              >
                {v.tagalog}
              </h3>
              <p className="mt-2 font-display text-sm font-light italic text-gold md:text-base">
                &ldquo;{v.english}&rdquo;
              </p>
              <p className="mt-6 flex-1 text-sm leading-relaxed text-auf-muted md:text-[0.9rem]">
                {v.description}
              </p>
              <Link
                href="/about#core-values"
                className="mt-6 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-(--auf-navy)/70 transition-colors hover:text-navy"
              >
                Learn more
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              {/* Decorative index number */}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-4 right-6 select-none font-display text-[5rem] font-bold leading-none text-(--auf-navy)/5 transition-all group-hover:text-(--auf-navy)/8"
              >
                {i + 1}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-4">
          <span className="h-px flex-1 bg-auf-border" />
          <p className="text-xs uppercase tracking-[0.22em] text-auf-muted">
            {university.tagline}
          </p>
          <span className="h-px flex-1 bg-auf-border" />
        </div>
      </div>
    </section>
  );
}
