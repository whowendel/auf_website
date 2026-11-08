import raw from "./sustainability.json";

export type SustainabilityImage = { src: string; alt: string; w: number; h: number };
export type SustainabilityVideo = { src: string; poster: string; title: string };

/** Table cell: plain text, or text plus the URLs it links to (labelled by site, e.g. "Facebook post"). */
export type SustainabilityCell = string | { text: string; links: string[] };

/** Ordered rich content, used when a source mixes paragraphs, lists, tables and photos. */
export type SustainabilityBlock<I = SustainabilityImage> =
  | { type: "p"; text: string }
  | { type: "label"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; head?: string[]; rows: SustainabilityCell[][] }
  | { type: "terms"; items: { term: string; text: string }[] }
  | { type: "images"; images: I[] }
  | { type: "embed"; src: string; title: string; href?: string; preview?: I }
  | { type: "group"; heading: string; collapsible?: boolean; blocks: SustainabilityBlock<I>[] };

export type SustainabilitySection = {
  /** Empty heading renders no title (content continues the article flow). */
  heading: string;
  paragraphs: string[];
  bullets: string[];
  images: SustainabilityImage[];
  blocks: SustainabilityBlock[];
};

export type SustainabilityArticle = {
  slug: string;
  title: string;
  /** First paragraph of the source text, used for cards and meta descriptions. */
  excerpt: string;
  sdgs: number[];
  tags: string[];
  featured: boolean;
  /** Optional: articles without photos fall back to an SDG-colored placeholder. */
  cover?: SustainabilityImage;
  video?: SustainabilityVideo;
  intro: string[];
  sections: SustainabilitySection[];
  closing?: string;
  /** Unfinished article: shown only outside production, so it can be built without going live. */
  draft?: boolean;
  /** Verbatim note from the Excel map (image/embed instructions); never rendered. */
  sourceNote?: string;
};

type RawImage = { file: string; w: number; h: number };
type RawArticle = Omit<SustainabilityArticle, "excerpt" | "cover" | "video" | "sections"> & {
  cover?: RawImage;
  video?: { file: string; poster: string; title: string };
  sections: {
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
    images?: RawImage[];
    blocks?: SustainabilityBlock<RawImage & { alt?: string }>[];
  }[];
};

const asset = (slug: string, file: string) => `/assets/sustainability/${slug}/${file}`;

/** Alt text is the article title or section heading from the source, never written separately. */
const toImage = (slug: string, i: RawImage, alt: string): SustainabilityImage => ({
  src: asset(slug, `${i.file}.jpg`),
  alt,
  w: i.w,
  h: i.h,
});

const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

/** Photos inside blocks take their alt from the nearest heading (group, else section, else title). */
const toBlocks = (
  slug: string,
  blocks: SustainabilityBlock<RawImage & { alt?: string }>[],
  heading: string,
): SustainabilityBlock[] =>
  blocks.map((b) => {
    if (b.type === "images")
      return {
        type: "images",
        images: b.images.map((i, n, all) =>
          toImage(slug, i, i.alt ?? (all.length > 1 ? `${heading} (photo ${n + 1})` : heading)),
        ),
      };
    if (b.type === "embed")
      return { ...b, preview: b.preview && toImage(slug, b.preview, b.preview.alt ?? b.title) };
    if (b.type === "group") return { ...b, blocks: toBlocks(slug, b.blocks, b.heading) };
    return b;
  });

const allArticles: SustainabilityArticle[] = (raw.articles as unknown as RawArticle[]).map((a) => ({
  ...a,
  excerpt: a.intro[0] ?? "",
  cover: a.cover && toImage(a.slug, a.cover, a.title),
  video: a.video && {
    src: asset(a.slug, `${a.video.file}.mp4`),
    poster: asset(a.slug, `${a.video.poster}.jpg`),
    title: a.video.title,
  },
  sections: a.sections.map((s) => ({
    heading: s.heading,
    paragraphs: s.paragraphs ?? [],
    bullets: s.bullets ?? [],
    images: (s.images ?? []).map((i, n, all) =>
      toImage(a.slug, i, all.length > 1 ? `${s.heading} (photo ${n + 1})` : s.heading),
    ),
    blocks: toBlocks(a.slug, s.blocks ?? [], s.heading || a.title),
  })),
}));

export const sustainabilityArticles = allArticles.filter((a) => SHOW_DRAFTS || !a.draft);

export const getSustainabilityArticle = (slug: string) =>
  sustainabilityArticles.find((a) => a.slug === slug);

export const sustainabilityPath = "/news-events/sustainability-initiatives";

/** Trim to a meta-description length at a word boundary. */
export const shortText = (s: string, max = 160) =>
  s.length <= max ? s : `${s.slice(0, max).replace(/\s+\S*$/, "")}...`;
