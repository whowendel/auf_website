// ─── Block types ──────────────────────────────────────────────────────

/** Plain paragraph of prose. */
export type BlockParagraph = {
  type: "paragraph";
  text: string;
};

/**
 * Inline image. `position` controls text-wrap behaviour:
 *  - "left"   — floated left, text wraps around the right
 *  - "right"  — floated right (default), text wraps around the left
 *  - "center" — full-width, breaks out of prose flow
 */
export type BlockImage = {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
  position?: "left" | "right" | "center";
  /** Optional max-width hint (Tailwind class e.g. "w-64" or "w-1/3") */
  widthClass?: string;
};

/**
 * Numbered item — can carry a prose body (Type 1), a bullet sub-list
 * (Type 2), or both. `number` is display-only (e.g. 1, 2, "a", "i").
 */
export type BlockNumbered = {
  type: "numbered";
  number: number | string;
  heading: string;
  body?: string;
  bullets?: string[];
};

/** Standalone bullet list (no heading, no numbering). */
export type BlockBullets = {
  type: "bullets";
  items: string[];
};

/**
 * An in-content sub-heading — smaller than the section H2, useful for
 * dividing a long profile section into labelled groups.
 */
export type BlockSubheading = {
  type: "subheading";
  text: string;
};

export type Block =
  | BlockParagraph
  | BlockNumbered
  | BlockBullets
  | BlockSubheading
  | BlockImage;

// ─── Renderers ────────────────────────────────────────────────────────

type ContentBlockProps = {
  /**
   * Rich heterogeneous block list. Preferred over the legacy flat arrays.
   * When provided, `paragraphs` and `bullets` are ignored.
   */
  blocks: Block[];

  // ── Legacy flat-array props (kept for backward compatibility) ────────
  paragraphs?: string[];
  bullets?: { text: string; sub?: string }[];

  /** CSS color value used for bullet dots and numbered index tint. */
  accentColor?: string;
};

export function ContentBlock({
  blocks,
  accentColor = "var(--auf-navy)",
}: ContentBlockProps) {
    return (
      <div className="space-y-5">
        {blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} accentColor={accentColor} />
        ))}
      </div>
    );
}

// ─── Individual block renderer ─────────────────────────────────────────

function BlockRenderer({
  block,
  accentColor,
}: {
  block: Block;
  accentColor: string;
}) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-sm leading-relaxed text-(--auf-text) md:text-base">
          {block.text}
        </p>
      );

    case "subheading":
      return (
        <h4 className="pt-2 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: accentColor }}>
          {block.text}
        </h4>
      );

    case "bullets":
      return (
        <ul className="space-y-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: accentColor }}
              />
              <span className="text-sm leading-relaxed text-(--auf-text)">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "numbered": {
      const num = String(block.number).padStart(2, "0");
      return (
        <div className="flex items-start gap-4">
          {/* Index */}
          <span
            className="mt-0.5 shrink-0 font-display text-xl font-semibold tabular-nums leading-tight"
            style={{ color: `${accentColor}50` }}
            aria-hidden
          >
            {num}
          </span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-snug text-navy md:text-base">
              {block.heading}
            </p>

            {block.body && (
              <p className="mt-1.5 text-sm leading-relaxed text-auf-muted">
                {block.body}
              </p>
            )}

            {block.bullets && block.bullets.length > 0 && (
              <ul className="mt-2 space-y-1.5">
                {block.bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      aria-hidden
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: accentColor }}
                    />
                    <span className="text-sm leading-relaxed text-auf-muted">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
    }

    case "image": {
      const pos = block.position ?? "right";
      const widthCls = block.widthClass ?? "w-48 md:w-64";

      if (pos === "center") {
        return (
          <figure className="my-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.src}
              alt={block.alt}
              className="w-full rounded-xl object-cover"
            />
            {block.caption && (
              <figcaption className="mt-2 text-center text-xs text-auf-muted italic">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      }

      const floatCls = pos === "left"
        ? "float-left mr-5 mb-3"
        : "float-right ml-5 mb-3";

      return (
        <figure className={`${floatCls} ${widthCls} overflow-hidden rounded-xl`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} className="w-full object-cover" />
          {block.caption && (
            <figcaption className="mt-1.5 text-xs text-auf-muted italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    default:
      return null;
  }
}
