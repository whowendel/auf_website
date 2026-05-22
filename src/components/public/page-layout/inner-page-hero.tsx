import Link from "next/link";
import Image from "next/image";

type Breadcrumb = { label: string; href?: string };

type InnerPageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
};

/**
 * Reusable full-width hero for inner pages (About, Admissions, Research, etc.).
 * Navy background with diamond pattern, gold accents, and an optional breadcrumb.
 */
export function InnerPageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
}: InnerPageHeroProps) {
  return (
    <div className="relative overflow-hidden bg-[var(--auf-navy)] pt-22">
      {/* Diamond pattern */}
      <div className="auf-diamond-pattern absolute inset-0 opacity-100" />

      {/* Gold top accent */}
      <div
        className="absolute left-0 top-0 h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--auf-gold) 0%, var(--auf-gold-light) 50%, var(--auf-gold) 100%)",
        }}
      />

      {/* AUF logo watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 h-48 w-48 opacity-[0.1] md:h-72 md:w-72"
      >
        <Image
          src="/assets/auf-logo-only.png"
          alt=""
          fill
          className="object-contain"
          sizes="288px"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-12 md:px-12 md:pb-20 md:pt-14">
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden className="text-white/30">
                    /
                  </span>
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-white"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--auf-gold)]">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
