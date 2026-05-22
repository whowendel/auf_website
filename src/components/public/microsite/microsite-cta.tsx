import Link from "next/link";
import type { College } from "@/data/colleges";

export function MicrositeCta({ college }: { college: College }) {
  if (!college.cta) return null;
  const cta = college.cta;

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-14 md:px-16 md:py-20"
          style={{ background: college.brandColor }}
        >
          {/* Gold gradient top */}
          <div
            className="absolute left-0 top-0 h-1 w-full"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${college.accentColor} 50%, transparent 100%)`,
            }}
          />

          {/* Decorative watermark */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-6 bottom-0 select-none font-display text-[clamp(6rem,16vw,12rem)] font-bold leading-none opacity-[0.05]"
            style={{ color: college.accentColor }}
          >
            {college.shortName}
          </span>

          <div className="relative flex flex-col items-start gap-6 md:gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              {cta.eyebrow && (
                <p
                  className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: college.accentColor }}
                >
                  {cta.eyebrow}
                </p>
              )}
              <h2 className="font-display text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl">
                {cta.headline}
              </h2>
              {cta.description && (
                <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-base">
                  {cta.description}
                </p>
              )}
            </div>

            {(cta.primaryLabel || cta.secondaryLabel) && (
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                {cta.primaryLabel && cta.primaryHref && (
                  <Link
                    href={cta.primaryHref}
                    className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all hover:opacity-90"
                    style={{
                      background: college.accentColor,
                      color: "var(--auf-navy)",
                    }}
                  >
                    {cta.primaryLabel}
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                )}
                {cta.secondaryLabel && cta.secondaryHref && (
                  <Link
                    href={cta.secondaryHref}
                    className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-medium text-white/90 transition-all hover:border-white/50 hover:bg-white/5"
                  >
                    {cta.secondaryLabel}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
