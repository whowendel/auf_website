import type { Metadata } from "next";
import { Suspense } from "react";
import { activeColleges } from "@/data/colleges";
import { listPublishedPostsFiltered } from "@/server/services/posts";
import { NewsEventsFilter } from "@/components/public/news-events/news-events-filter";
import { NewsEventsCard } from "@/components/public/news-events/news-events-card";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "The latest news, announcements, and blog posts from Angeles University Foundation and its colleges.",
};

type PageProps = {
  searchParams: Promise<{ college?: string; type?: string }>;
};

const colleges = activeColleges.map((c) => ({
  id: c.id,
  shortName: c.shortName,
  name: c.name,
  brandColor: c.brandColor,
}));

export default async function NewsEventsPage({ searchParams }: PageProps) {
  const { college, type } = await searchParams;

  const posts = await listPublishedPostsFiltered({
    collegeId: college || undefined,
    type: type || undefined,
    limit: 24,
  });

  const featured = posts.find((p) => p.isFeatured) ?? null;
  const rest = featured ? posts.filter((p) => p.id !== featured.id) : posts;

  const selectedCollege = college ? colleges.find((c) => c.id === college) : null;

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="relative bg-navy pt-22">
        <div className="auf-diamond-pattern pointer-events-none absolute inset-0 opacity-30" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-12 md:px-12">
          <div className="max-w-2xl">
            {selectedCollege ? (
              <div className="mb-4 flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ background: selectedCollege.brandColor }}
                />
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
                  {selectedCollege.shortName}
                </p>
              </div>
            ) : (
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                AUF University
              </p>
            )}

            <h1 className="font-display text-4xl font-light text-white md:text-5xl">
              News &amp; Events
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60">
              Stay current with the latest stories, announcements, and milestones
              from Angeles University Foundation and its twelve colleges.
            </p>

            {/* Gold rule */}
            <div className="mt-8 h-0.5 w-12 bg-gold" />
          </div>
        </div>
      </div>

      {/* ── Filter bar (client island) ── */}
      <Suspense>
        <NewsEventsFilter
          colleges={colleges}
          totalCount={posts.length}
        />
      </Suspense>

      {/* ── Content ── */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">

        {posts.length === 0 ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy/6">
              <span className="font-display text-2xl font-light text-navy/30">?</span>
            </div>
            <h2 className="mb-2 font-display text-xl font-light text-navy">No posts found</h2>
            <p className="mb-6 max-w-sm text-sm text-auf-muted">
              There are no published posts matching the current filter. Try adjusting
              the college or post type.
            </p>
            <a
              href="/news-events"
              className="rounded-full border border-auf-border px-5 py-2 text-[12px] font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Clear all filters
            </a>
          </div>
        ) : (
          <>
            {/* ── Featured post ── */}
            {featured && (
              <div className="mb-8">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-auf-muted/50">
                  Featured
                </p>
                <div className="max-w-2xl">
                  <NewsEventsCard post={featured} featured />
                </div>
              </div>
            )}

            {/* ── Remaining posts grid ── */}
            {rest.length > 0 && (
              <>
                {featured && (
                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-auf-muted/50">
                    Latest
                  </p>
                )}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <NewsEventsCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            )}

            {/* ── Bottom note if at limit ── */}
            {posts.length === 24 && (
              <p className="mt-10 text-center text-xs text-auf-muted/50">
                Showing the 24 most recent posts.
                {college || type
                  ? " Adjust the filters to narrow your results."
                  : " Use the filters above to find posts by college or type."}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
