import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  brandColor: string;
  /** Background tone — "white" | "tint" (brand at 5%) | "brand" (full) */
  tone?: "white" | "tint" | "brand";
  children: ReactNode;
  trailing?: ReactNode;       // Right-aligned content next to the title (e.g. a link)
};

/**
 * Consistent wrapper for every microsite section. Provides the page rhythm
 * (alternating backgrounds), the eyebrow/title typography, and an optional
 * trailing slot next to the title.
 */
export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  brandColor,
  tone = "white",
  children,
  trailing,
}: SectionShellProps) {
  const background =
    tone === "brand"
      ? brandColor
      : tone === "tint"
        ? `${brandColor}08`
        : "white";

  const isOnBrand = tone === "brand";

  return (
    <section
      id={id}
      className="relative py-20 md:py-28"
      style={{ background }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: isOnBrand ? "var(--auf-gold)" : brandColor }}
            >
              {eyebrow}
            </p>
            <h2
              className={`font-display text-3xl font-light leading-tight md:text-4xl ${
                isOnBrand ? "text-white" : "text-[var(--auf-navy)]"
              }`}
            >
              {title}
            </h2>
            {description && (
              <p
                className={`mt-4 max-w-2xl text-sm leading-relaxed md:text-base ${
                  isOnBrand ? "text-white/65" : "text-[var(--auf-muted)]"
                }`}
              >
                {description}
              </p>
            )}
          </div>
          {trailing && <div className="shrink-0">{trailing}</div>}
        </div>

        {children}
      </div>
    </section>
  );
}
