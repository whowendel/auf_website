import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSlug(input: string): string {
  return slugify(input, { lower: true, strict: true, trim: true });
}

// The `Post.sdgs` column is stored as JSON (an array of SDG numbers) on MySQL,
// so Prisma types it as JsonValue. Coerce it back to a plain number[] for the UI.
export function asSdgNumbers(value: unknown): number[] {
  return Array.isArray(value)
    ? value.filter((n): n is number => typeof n === "number")
    : [];
}

export function formatDate(d: Date | string, locale = "en-PH") {
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
