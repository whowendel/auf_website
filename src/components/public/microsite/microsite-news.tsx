import Link from "next/link";
import type { College } from "@/data/colleges";
import { formatDate } from "@/lib/utils";
import type { listPublishedPostsForCollege } from "@/server/services/posts";
import { getSdg } from "@/data/sdgs";

type Post = Awaited<ReturnType<typeof listPublishedPostsForCollege>>[number];

// ── Featured card — college brand color as the canvas ────────────────────────
//
// Intentionally different from the university's navy editorial card:
//   • Full card background = college.brandColor (vibrant, owner-identified)
//   • Cover image bleeds into the brand color via a right-fading gradient
//   • Badges are glassy-white (bg-white/15) rather than gold
//   • Fallback for no cover = large college shortname watermark in the same hue
//   • White thin strip at top (university has a brand-color strip on navy)

function FeaturedCard({
  post,
  college,
}: {
  post: Post;
  college: College;
}) {
  const href = `/c/${college.slug}/posts/${post.slug}`;

  return (
    <article
      className="group relative overflow-hidden rounded-2xl shadow-xl"
      style={{ background: college.brandColor }}
    >
      {/* Texture layer */}
      <div className="auf-diamond-pattern pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden />

      {/* Thin white top line — distinguishes from the navy university card */}
      <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-white/30" />

      <div className="relative flex flex-col sm:flex-row">

        {/* ── Cover image side ── */}
        <div className="relative h-56 w-full shrink-0 overflow-hidden sm:h-auto sm:w-[45%]">
          {post.coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          ) : (
            /* Branded placeholder — large college monogram as watermark */
            <div
              className="flex h-full min-h-56 w-full items-center justify-center"
              style={{ background: `${college.brandColor}55` }}
            >
              <span
                className="select-none font-display font-extrabold text-white/10"
                style={{ fontSize: "clamp(5rem, 14vw, 10rem)", lineHeight: 1 }}
              >
                {college.shortName}
              </span>
            </div>
          )}

          {/* Blend gradient: image → brand color (desktop: rightward; mobile: downward) */}
          <div
            className="pointer-events-none absolute inset-0 hidden sm:block"
            style={{
              background: `linear-gradient(to right, transparent 50%, ${college.brandColor} 100%)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 sm:hidden"
            style={{
              background: `linear-gradient(to bottom, transparent 45%, ${college.brandColor} 100%)`,
            }}
          />
        </div>

        {/* ── Content side ── */}
        <div className="flex flex-1 flex-col px-6 pb-8 pt-5 md:px-8 md:pt-7">

          {/* Featured + type badges */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              ★ Featured
            </span>
            <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
              {post.type}
            </span>
          </div>

          {/* Title */}
          <Link href={href}>
            <h3 className="line-clamp-3 font-display text-xl font-semibold leading-snug text-white transition-opacity group-hover:opacity-80 md:text-2xl">
              {post.title}
            </h3>
          </Link>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-white/65">
              {post.excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-[10px] text-white/45">
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
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
              >
                Read{" "}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ── Regular grid card ─────────────────────────────────────────────────────────

function GridCard({
  post,
  college,
}: {
  post: Post;
  college: College;
}) {
  const href = `/c/${college.slug}/posts/${post.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-auf-border bg-white transition-shadow hover:shadow-md">
      {/* College color strip */}
      <div className="h-1 w-full shrink-0" style={{ background: college.brandColor }} />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2">
          <span
            className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white"
            style={{ background: college.brandColor }}
          >
            {post.type}
          </span>
          <span className="text-[9px] text-auf-muted">
            {college.shortName}
          </span>
        </div>
        <Link href={href}>
          <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug text-navy transition-colors group-hover:text-navy-mid">
            {post.title}
          </h3>
        </Link>
        {post.excerpt && (
          <p className="mt-2 flex-1 line-clamp-3 text-xs leading-relaxed text-auf-muted">
            {post.excerpt}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] text-(--auf-muted)/60">
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
              className="text-[10px] font-semibold transition-colors hover:opacity-80 shrink-0"
              style={{ color: college.brandColor }}
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

export function MicrositeNews({
  college,
  posts,
}: {
  college: College;
  posts: Post[];
}) {
  const featuredPost = posts.find((p) => p.isFeatured) ?? null;
  const gridPosts    = featuredPost ? posts.filter((p) => !p.isFeatured) : posts;

  return (
    <section id="news" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: college.brandColor }}
            >
              Latest
            </p>
            <h2 className="font-display text-3xl font-light text-navy md:text-4xl">
              News &amp; Events
            </h2>
          </div>
          {posts.length > 0 && (
            <Link
              href={`/news-events?college=${college.slug}`}
              className="group flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-gold"
            >
              All news
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          )}
        </div>

        {/* Empty state */}
        {posts.length === 0 ? (
          <div
            className="rounded-2xl border-2 border-dashed p-12 text-center"
            style={{ borderColor: `${college.brandColor}20` }}
          >
            <div
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: `${college.brandColor}10` }}
            >
              <span
                className="font-display text-2xl font-bold"
                style={{ color: college.brandColor }}
              >
                {college.shortName[0]}
              </span>
            </div>
            <p className="text-sm font-medium text-navy">
              No published posts yet
            </p>
            <p className="mt-1 text-xs text-auf-muted">
              Check back soon for news and events from {college.shortName}.
            </p>
          </div>
        ) : (
          <>
            {/* Featured — full-width brand-color editorial card */}
            {featuredPost && (
              <div className="mb-8">
                <FeaturedCard post={featuredPost} college={college} />
              </div>
            )}

            {/* Grid */}
            {gridPosts.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((p) => (
                  <GridCard key={p.id} post={p} college={college} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
