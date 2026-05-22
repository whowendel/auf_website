/**
 * Reusable vertical timeline component.
 *
 * Used by: About > History, External Affairs > History,
 * and any future inner page with a milestone/event list.
 *
 * Accepts a generic item shape so callers can pass their own typed array
 * without needing an adapter — as long as the shape has `year`, `title`, `body`.
 */

export type TimelineItem = {
  /** Display label shown in the left column (year, date, "Present", etc.). */
  year: string;
  title: string;
  body: string;
};

type TimelineProps = {
  items: TimelineItem[];
  /**
   * Primary accent color for alternating node dots.
   * Defaults to AUF navy; the alternate dot uses the gold CSS variable.
   */
  primaryColor?: string;
};

export function Timeline({ items, primaryColor = "var(--auf-navy)" }: TimelineProps) {
  return (
    <ol className="relative">
      {/* Vertical rail */}
      <div
        aria-hidden
        className="absolute left-18 top-2 bottom-2 hidden w-px sm:block"
        style={{ background: "var(--auf-border)" }}
      />

      {items.map((m, i) => (
        <li
          key={i}
          className="relative mb-6 last:mb-0 grid sm:grid-cols-[5rem_1rem_1fr] sm:gap-x-5 sm:items-start"
        >
          {/* Year */}
          <div className="mb-1.5 sm:mb-0 sm:pt-1 sm:text-right">
            <span className="font-display text-xs font-bold text-navy sm:text-sm">
              {m.year}
            </span>
          </div>

          {/* Node */}
          <div className="relative hidden sm:flex flex-col items-center pt-2">
            <span
              className="z-10 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-white"
              style={{
                background: i % 2 === 0 ? primaryColor : "var(--auf-gold)",
              }}
            />
          </div>

          {/* Content card */}
          <div className="rounded-xl border border-auf-border bg-off-white p-4 md:p-5">
            <h3 className="font-display text-sm font-semibold text-navy md:text-base">
              {m.title}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-auf-muted md:text-sm">
              {m.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
