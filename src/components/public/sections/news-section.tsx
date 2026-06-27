import Link from "next/link";
import { activeColleges, collegeLabel } from "@/data/colleges";
import { formatDate } from "@/lib/utils";
import type { listPublishedUniversityPosts } from "@/server/services/posts";
import { getSdg } from "@/data/sdgs";

type Post = Awaited<ReturnType<typeof listPublishedUniversityPosts>>[number];

const FALLBACK_COVER = "/assets/auf-logo-only.png";

const TYPE_BADGE: Record<string, string> = {
  NEWS:         "bg-blue-50/80 text-blue-700",
  BLOG:         "bg-violet-50/80 text-violet-700",
  ANNOUNCEMENT: "bg-amber-50/80 text-amber-700",
};

function getAccentColor(originCollegeId: string | null): string {
  return (
    activeColleges.find((c) => c.id === originCollegeId)?.brandColor ??
    "var(--auf-gold)"
  );
}

function getHref(post: Post): string {
  return post.originCollegeId
    ? `/c/${post.originCollegeId}/posts/${post.slug}`
    : `/posts/${post.slug}`;
}

// ── Cover image helper ────────────────────────────────────────────────────────

function CoverImage({
  src,
  alt,
  className,
  isFallback,
}: {
  src: string | null;
  alt: string;
  className: string;
  isFallback: boolean;
}) {
  if (src && !isFallback) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`${className} object-cover`}
      />
    );
  }
  return (
    <div className={`${className} flex items-center justify-center bg-navy`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FALLBACK_COVER}
        alt="AUF"
        className="h-16 w-16 object-contain opacity-30"
      />
    </div>
  );
}

// ── Featured card (navy editorial treatment) ──────────────────────────────────

function FeaturedCard({ post }: { post: Post }) {
  const href        = getHref(post);
  const accentColor = getAccentColor(post.originCollegeId);
  const hasCover    = !!post.coverImageUrl;

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-navy shadow-lg">
      <div className="auf-diamond-pattern pointer-events-none absolute inset-0 opacity-20" aria-hidden />

      {/* Brand-color accent strip */}
      <div className="absolute inset-x-0 top-0 z-10 h-1" style={{ background: accentColor }} />

      <div className="relative flex flex-col sm:flex-row">
        {/* Cover image — full height on desktop, fixed height on mobile */}
        <div className="relative h-52 w-full shrink-0 overflow-hidden sm:h-auto sm:w-[42%]">
          <CoverImage
            src={post.coverImageUrl}
            alt={post.title}
            className="h-full w-full"
            isFallback={!hasCover}
          />
          {/* Navy gradient so content side blends in on small screens */}
          <div
            className="pointer-events-none absolute inset-0 sm:hidden"
            style={{ background: "linear-gradient(to bottom, transparent 40%, var(--auf-navy) 100%)" }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col px-6 pb-8 pt-6 md:px-8 md:pt-8">
          {/* Featured badge */}
          <span className="mb-4 self-start rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-navy">
            ★ Featured
          </span>

          {/* Type + scope */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white"
              style={{ background: accentColor }}
            >
              {post.type}
            </span>
            <span className="text-[11px] text-white/40">
              {collegeLabel(post.originCollegeId)}
            </span>
          </div>

          {/* Title */}
          <Link href={href}>
            <h3 className="line-clamp-3 font-display text-xl font-semibold leading-snug text-white transition-colors group-hover:text-gold md:text-2xl">
              {post.title}
            </h3>
          </Link>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-white/55">
              {post.excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-[10px] text-white/40">
              {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
              <span className="text-white/20">·</span>
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {post.sdgs && post.sdgs.length > 0 && (
                <div className="flex flex-wrap items-center gap-1">
                  {post.sdgs.map((num) => {
                    const sdg = getSdg(num);
                    return (
                      <span
                        key={num}
                        className="inline-block rounded px-1.5 py-0.5 text-[9px] font-bold text-white shrink-0"
                        style={{ backgroundColor: sdg?.color ?? "var(--auf-gold)" }}
                        title={sdg?.title ?? `SDG ${num}`}
                      >
                        SDG {num}
                      </span>
                    );
                  })}
                </div>
              )}
              <Link
                href={href}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 px-4 py-1.5 text-[11px] font-semibold text-white/80 transition-all hover:border-gold hover:text-gold"
              >
                Read <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ── Regular grid card ─────────────────────────────────────────────────────────

function GridCard({ post }: { post: Post }) {
  const href        = getHref(post);
  const accentColor = getAccentColor(post.originCollegeId);
  const hasCover    = !!post.coverImageUrl;
  const badgeClass  = TYPE_BADGE[post.type] ?? "bg-neutral-100 text-neutral-600";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-auf-border bg-white transition-shadow hover:shadow-md">
      {/* Cover image */}
      <div className="relative h-44 overflow-hidden">
        <CoverImage
          src={post.coverImageUrl}
          alt={post.title}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
          isFallback={!hasCover}
        />
        {/* Brand accent strip */}
        <div className="absolute inset-x-0 top-0 h-1" style={{ background: accentColor }} />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        {/* Type + scope */}
        <div className="mb-2.5 flex flex-wrap items-center gap-1.5">
          <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${badgeClass}`}>
            {post.type}
          </span>
          <span className="text-[9px] text-auf-muted/60">
            {collegeLabel(post.originCollegeId)}
          </span>
        </div>

        {/* Title */}
        <Link href={href}>
          <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug text-navy transition-colors group-hover:text-navy/70 md:text-base">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-auf-muted">
            {post.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between border-t border-auf-border pt-3">
          <span className="text-[10px] text-auf-muted/60">
            {post.publishedAt ? formatDate(post.publishedAt) : ""}
          </span>
          <div className="flex items-center gap-2">
            {post.sdgs && post.sdgs.length > 0 && (
              <div className="flex flex-wrap items-center gap-1">
                {post.sdgs.map((num) => {
                  const sdg = getSdg(num);
                  return (
                    <span
                      key={num}
                      className="inline-block rounded px-1.5 py-0.5 text-[9px] font-bold text-white shrink-0"
                      style={{ backgroundColor: sdg?.color ?? "var(--auf-gold)" }}
                      title={sdg?.title ?? `SDG ${num}`}
                    >
                      SDG {num}
                    </span>
                  );
                })}
              </div>
            )}
            <Link
              href={href}
              className="text-[10px] font-semibold transition-colors hover:opacity-70 shrink-0"
              style={{ color: accentColor }}
            >
              Read →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function NewsSection({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  // isFeatured posts come first (guaranteed by service ordering).
  // Separate the first featured post for the special treatment.
  const featuredPost = posts.find((p) => p.isFeatured) ?? null;
  const gridPosts    = posts.filter((p) => !p.isFeatured).slice(0, 6);

  // If no featured post, show up to 6 in the grid.
  const displayPosts = featuredPost ? gridPosts : posts.slice(0, 6);

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Latest
            </p>
            <h2 className="font-display text-3xl font-light text-navy md:text-5xl">
              News &amp; Events
            </h2>
          </div>
          <Link
            href="/news-events"
            className="group flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-gold"
          >
            All news
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Featured post — full-width editorial card */}
        {featuredPost && (
          <div className="mb-8">
            <FeaturedCard post={featuredPost} />
          </div>
        )}

        {/* Regular posts — 3-column grid */}
        {displayPosts.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayPosts.map((post) => (
              <GridCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
