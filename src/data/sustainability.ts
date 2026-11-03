import raw from "./sustainability.json";

export type SustainabilityImage = { src: string; alt: string; w: number; h: number };
export type SustainabilityVideo = { src: string; poster: string; title: string };

export type SustainabilitySection = {
  heading: string;
  paragraphs: string[];
  bullets: string[];
  images: SustainabilityImage[];
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
};

type RawImage = { file: string; w: number; h: number };
type RawArticle = Omit<SustainabilityArticle, "excerpt" | "cover" | "video" | "sections"> & {
  cover?: RawImage;
  video?: { file: string; poster: string; title: string };
  sections: { heading: string; paragraphs: string[]; bullets?: string[]; images?: RawImage[] }[];
};

const asset = (slug: string, file: string) => `/assets/sustainability/${slug}/${file}`;

/** Alt text is the article title or section heading from the source, never written separately. */
const toImage = (slug: string, i: RawImage, alt: string): SustainabilityImage => ({
  src: asset(slug, `${i.file}.jpg`),
  alt,
  w: i.w,
  h: i.h,
});

export const sustainabilityArticles: SustainabilityArticle[] = (raw.articles as RawArticle[]).map((a) => ({
  ...a,
  excerpt: a.intro[0],
  cover: a.cover && toImage(a.slug, a.cover, a.title),
  video: a.video && {
    src: asset(a.slug, `${a.video.file}.mp4`),
    poster: asset(a.slug, `${a.video.poster}.jpg`),
    title: a.video.title,
  },
  sections: a.sections.map((s) => ({
    heading: s.heading,
    paragraphs: s.paragraphs,
    bullets: s.bullets ?? [],
    images: (s.images ?? []).map((i, n, all) =>
      toImage(a.slug, i, all.length > 1 ? `${s.heading} (photo ${n + 1})` : s.heading),
    ),
  })),
}));

export const getSustainabilityArticle = (slug: string) =>
  sustainabilityArticles.find((a) => a.slug === slug);

export const sustainabilityPath = "/news-events/sustainability-initiatives";

/** Trim to a meta-description length at a word boundary. */
export const shortText = (s: string, max = 160) =>
  s.length <= max ? s : `${s.slice(0, max).replace(/\s+\S*$/, "")}...`;
