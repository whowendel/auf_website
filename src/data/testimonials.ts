import rawData from "./testimonials.json";

export type TestimonialsHero        = typeof rawData.hero;
export type TestimonialsFeatured    = typeof rawData.featured;
export type TestimonialsStories     = typeof rawData.stories;
export type TestimonialsInternational = typeof rawData.international;
export type TestimonialsParents     = typeof rawData.parents;
export type TestimonialsStats       = typeof rawData.stats;

export type StoryItem        = typeof rawData.stories.items[number];
export type InternationalItem = typeof rawData.international.items[number];
export type ParentItem       = typeof rawData.parents.items[number];

export const testimonialsHero:         TestimonialsHero         = rawData.hero;
export const testimonialsFeatured:     TestimonialsFeatured     = rawData.featured;
export const testimonialsStories:      TestimonialsStories      = rawData.stories;
export const testimonialsInternational: TestimonialsInternational = rawData.international;
export const testimonialsParents:      TestimonialsParents      = rawData.parents;
export const testimonialsStats:        TestimonialsStats        = rawData.stats;
