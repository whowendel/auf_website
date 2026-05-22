import Image from "next/image";
import Link from "next/link";
import type { College } from "@/data/colleges";
import { formatDate } from "@/lib/utils";

type PostHeroData = {
  type: string;
  title: string;
  excerpt: string | null;
  publishedAt: Date | null;
  author: { name: string | null; image: string | null };
};

type PostHeroContext =
  | { variant: "university" }
  | { variant: "college"; college: College };

export function PostHero({
  post,
  context,
}: {
  post: PostHeroData;
  context: PostHeroContext;
}) {
  const accentColor =
    context.variant === "college" ? context.college.brandColor : "var(--auf-gold)";

  const backHref =
    context.variant === "college" ? `/c/${context.college.slug}` : "/";

  const backLabel =
    context.variant === "college"
      ? `← ${context.college.shortName}`
      : "← Home";

  return (
    <div className="relative bg-navy pt-22">
      <div className="auf-diamond-pattern pointer-events-none absolute inset-0 opacity-30" aria-hidden />

      {/* College accent strip */}
      {context.variant === "college" && (
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: accentColor }}
          aria-hidden
        />
      )}

      <div className="relative mx-auto max-w-4xl px-6 pb-12 pt-10">
        {/* Back link */}
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-white/70"
        >
          {context.variant === "college" && context.college.mascotLogoUrl && (
            <div className="relative h-4 w-4 shrink-0">
              <Image
                src={context.college.mascotLogoUrl}
                alt={context.college.shortName}
                fill
                className="object-contain"
                sizes="16px"
              />
            </div>
          )}
          {backLabel}
        </Link>

        {/* Type badge + scope + date */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{
              background: accentColor,
              color: context.variant === "university" ? "var(--auf-navy)" : "white",
            }}
          >
            {post.type}
          </span>
          <span className="text-[11px] text-white/40">
            {context.variant === "college"
              ? context.college.shortName
              : "AUF University"}
          </span>
          {post.publishedAt && (
            <>
              <span className="text-white/20">·</span>
              <span className="text-[11px] text-white/40">
                {formatDate(post.publishedAt)}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mt-3 text-base leading-relaxed text-white/70">
            {post.excerpt}
          </p>
        )}

        {/* Author */}
        <div className="mt-5 flex items-center gap-3">
          {post.author.image ? (
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/20">
              <Image
                src={post.author.image}
                alt={post.author.name ?? ""}
                fill
                className="object-cover"
                sizes="32px"
                unoptimized
              />
            </div>
          ) : (
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 font-display text-[11px] font-bold text-white"
              style={{ background: `${accentColor}50` }}
            >
              {post.author.name?.[0] ?? "A"}
            </div>
          )}
          <span className="text-[12px] text-white/60">
            By{" "}
            <span className="font-semibold text-white/80">{post.author.name}</span>
          </span>
        </div>

        {/* Accent rule */}
        <div className="mt-8 h-0.5 w-12" style={{ background: accentColor }} />
      </div>
    </div>
  );
}
