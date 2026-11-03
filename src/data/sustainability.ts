import raw from "./sustainability.json";

export type SustainabilityImage = { src: string; alt: string; w: number; h: number };

export type SustainabilitySection = {
  heading: string;
  paragraphs: string[];
  images: SustainabilityImage[];
};

export type SustainabilityArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  sdgs: number[];
  tags: string[];
  featured: boolean;
  cover: SustainabilityImage;
  intro: string[];
  sections: SustainabilitySection[];
  closing?: string;
};

type RawImage = { file: string; alt: string; w: number; h: number };

const toImage = (slug: string, i: RawImage): SustainabilityImage => ({
  src: `/assets/sustainability/${slug}/${i.file}.jpg`,
  alt: i.alt,
  w: i.w,
  h: i.h,
});

export const sustainabilityArticles: SustainabilityArticle[] = raw.articles.map((a) => ({
  ...a,
  closing: "closing" in a ? (a.closing as string) : undefined,
  cover: toImage(a.slug, a.cover),
  sections: a.sections.map((s) => ({
    heading: s.heading,
    paragraphs: s.paragraphs,
    images: ("images" in s ? (s.images as RawImage[]) : []).map((i) => toImage(a.slug, i)),
  })),
}));

export const getSustainabilityArticle = (slug: string) =>
  sustainabilityArticles.find((a) => a.slug === slug);

export const sustainabilityPath = "/news-events/sustainability-initiatives";
