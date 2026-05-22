import Link from "next/link";
import type { ExternalAffairsNews } from "@/data/external-affairs";
import { listPublishedUniversityPosts } from "@/server/services/posts";
import { collegeLabel } from "@/data/colleges";
import { formatDate } from "@/lib/utils";

export async function EaNews({ news }: { news: ExternalAffairsNews }) {
  const posts = await listPublishedUniversityPosts({ limit: 6 });

  return (
    <section id="news-events" className="scroll-mt-32 py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {news.eyebrow}
      </p>
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display text-2xl font-light text-navy md:text-3xl">{news.title}</h2>
        <Link
          href="/news-events"
          className="group flex shrink-0 items-center gap-1.5 text-sm font-medium text-navy transition-colors hover:text-[var(--auf-gold)]"
        >
          All news
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>

      {news.description && (
        <p className="mb-8 text-sm leading-relaxed text-auf-muted">{news.description}</p>
      )}

      {posts.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-auf-border p-10 text-center">
          <p className="text-sm font-medium text-navy">No published news yet.</p>
          <p className="mt-1 text-xs text-auf-muted">Check back soon for updates from the Office of External Affairs.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => {
            const href = p.originCollegeId
              ? `/c/${p.originCollegeId}/posts/${p.slug}`
              : `/posts/${p.slug}`;
            return (
              <article
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-auf-border bg-white transition-shadow hover:shadow-md"
              >
                {/* Top accent */}
                <div className="h-0.5 shrink-0 bg-navy" />
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-navy px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
                      {p.type}
                    </span>
                    <span className="text-[9px] text-auf-muted">
                      {collegeLabel(p.originCollegeId)}
                    </span>
                  </div>
                  <Link href={href}>
                    <h3 className="font-display text-base font-semibold leading-snug text-navy transition-colors group-hover:text-navy-mid line-clamp-2">
                      {p.title}
                    </h3>
                  </Link>
                  {p.excerpt && (
                    <p className="mt-2 flex-1 line-clamp-3 text-xs leading-relaxed text-auf-muted">
                      {p.excerpt}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] text-auf-muted/60">
                      {p.publishedAt ? formatDate(p.publishedAt) : ""}
                    </span>
                    <Link
                      href={href}
                      className="text-[10px] font-semibold text-navy/50 transition-colors hover:text-navy"
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
    </section>
  );
}
