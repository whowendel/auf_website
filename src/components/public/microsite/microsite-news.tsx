import Link from "next/link";
import type { College } from "@/data/colleges";
import { formatDate } from "@/lib/utils";
import type { listPublishedPostsForCollege } from "@/server/services/posts";

type Post = Awaited<ReturnType<typeof listPublishedPostsForCollege>>[number];

export function MicrositeNews({
  college,
  posts,
}: {
  college: College;
  posts: Post[];
}) {
  return (
    <section id="news" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: college.brandColor }}
            >
              Latest
            </p>
            <h2 className="font-display text-3xl font-light text-[var(--auf-navy)] md:text-4xl">
              News &amp; Events
            </h2>
          </div>
          {posts.length > 0 && (
            <Link
              href={`/news-events?college=${college.slug}`}
              className="group flex items-center gap-2 text-sm font-medium text-[var(--auf-navy)] transition-colors hover:text-[var(--auf-gold)]"
            >
              All news
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          )}
        </div>

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
            <p className="text-sm font-medium text-[var(--auf-navy)]">
              No published posts yet
            </p>
            <p className="mt-1 text-xs text-[var(--auf-muted)]">
              Check back soon for news and events from {college.shortName}.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => {
              const href = `/c/${college.slug}/posts/${p.slug}`;
              return (
                <article
                  key={p.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--auf-border)] bg-white transition-shadow hover:shadow-md"
                >
                  {/* Color strip */}
                  <div
                    className="h-1 w-full shrink-0"
                    style={{ background: college.brandColor }}
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <span
                        className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white"
                        style={{ background: college.brandColor }}
                      >
                        {p.type}
                      </span>
                      <span className="text-[9px] text-[var(--auf-muted)]">
                        {college.shortName}
                      </span>
                    </div>
                    <Link href={href}>
                      <h3 className="font-display text-base font-semibold leading-snug text-[var(--auf-navy)] transition-colors group-hover:text-[var(--auf-navy-mid)] line-clamp-2">
                        {p.title}
                      </h3>
                    </Link>
                    {p.excerpt && (
                      <p className="mt-2 flex-1 line-clamp-3 text-xs leading-relaxed text-[var(--auf-muted)]">
                        {p.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] text-[var(--auf-muted)]/60">
                        {p.publishedAt ? formatDate(p.publishedAt) : ""}
                      </span>
                      <Link
                        href={href}
                        className="text-[10px] font-semibold transition-colors hover:opacity-80"
                        style={{ color: college.brandColor }}
                      >
                        Read →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
