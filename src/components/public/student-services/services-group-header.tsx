import type { ServiceGroup } from "@/data/student-services";

/**
 * Full-width editorial divider that appears before the first office
 * of each virtue group (Becoming Mabuti / Magaling / May Malasakit).
 * Extends to the full content column width (negative margins).
 */
export function ServicesGroupHeader({ group }: { group: ServiceGroup }) {
  return (
    <div
      className="relative mb-10 -mx-6 overflow-hidden rounded-2xl px-6 py-8 md:-mx-8 md:px-8"
      style={{ background: group.brandColor }}
    >
      {/* Subtle diagonal pattern */}
      <div className="auf-diamond-pattern absolute inset-0" />

      {/* Gold accent line */}
      <div
        className="absolute left-0 top-0 h-0.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${group.accentColor}00 0%, ${group.accentColor} 50%, ${group.accentColor}00 100%)`,
        }}
      />

      <div className="relative">
        <p
          className="mb-1 text-[9px] font-bold uppercase tracking-[0.28em]"
          style={{ color: group.accentColor, opacity: 0.7 }}
        >
          Virtue
        </p>
        <h2 className="font-display text-2xl font-light text-white md:text-3xl">
          {group.groupLabel}
        </h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/60">
          {group.tagline}
        </p>
      </div>
    </div>
  );
}
