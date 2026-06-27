import Link from "next/link";
import type { ResearchNews } from "@/data/research";
import { listPublishedUniversityPosts } from "@/server/services/posts";
import { collegeLabel } from "@/data/colleges";
import { formatDate } from "@/lib/utils";
import { getSdg } from "@/data/sdgs";

const EVENT_TYPE_COLORS: Record<string, string> = {
  Conference: "bg-navy/8 text-navy",
  Workshop:   "bg-gold/10 text-[var(--auf-gold)]",
  Training:   "bg-off-white text-navy/60",
};

export async function ResearchNews({ news }: { news: ResearchNews }) {
  const recentPosts = await listPublishedUniversityPosts({ limit: 3 });

  return (
    <section id="news-events" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {news.eyebrow}
      </p>
      <h2 className="mb-10 font-display text-2xl font-light text-navy md:text-3xl">{news.title}</h2>

      <div className="grid gap-10 lg:grid-cols-3">

        {/* A — Upcoming Events */}
        <div>
          <div className="mb-5 flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">A</span>
            <h3 className="font-display text-base font-semibold text-navy">Upcoming Events</h3>
          </div>
          <div className="space-y-3">
            {news.upcomingEvents.map((evt) => (
              <div key={evt.id} className="rounded-xl border border-auf-border bg-white p-4">
                <span className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${EVENT_TYPE_COLORS[evt.type] ?? "bg-off-white text-navy/60"}`}>
                  {evt.type}
                </span>
                <p className="text-sm font-semibold text-navy leading-snug">{evt.title}</p>
                <p className="mt-1 text-[10px] font-medium text-auf-muted">{evt.date}</p>
                {evt.location && (
                  <p className="mt-0.5 text-[10px] text-auf-muted/70">{evt.location}</p>
                )}
                <p className="mt-2 text-xs leading-relaxed text-auf-muted line-clamp-2">{evt.description}</p>
              </div>
            ))}
            {news.upcomingEvents.length === 0 && (
              <p className="text-xs text-auf-muted/60 italic">No upcoming events at this time.</p>
            )}
          </div>
        </div>

        {/* B — Recent Highlights (from DB) */}
        <div>
          <div className="mb-5 flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">B</span>
            <h3 className="font-display text-base font-semibold text-navy">Recent Highlights</h3>
          </div>
          <div className="space-y-3">
            {recentPosts.length === 0 ? (
              <p className="text-xs text-auf-muted/60 italic">No published news yet.</p>
            ) : (
              recentPosts.map((p) => {
                const href = p.originCollegeId
                  ? `/c/${p.originCollegeId}/posts/${p.slug}`
                  : `/posts/${p.slug}`;
                return (
                  <article key={p.id} className="rounded-xl border border-auf-border bg-white p-4">
                    <div className="mb-2 flex flex-wrap items-center gap-1.5">
                      <span className="inline-block rounded-full bg-navy/8 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-navy">
                        {p.type}
                      </span>
                      {p.sdgs && p.sdgs.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1">
                          {p.sdgs.map((num) => {
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
                    </div>
                    <Link href={href}>
                      <h4 className="text-sm font-semibold text-navy hover:text-navy-mid transition-colors leading-snug line-clamp-2">
                        {p.title}
                      </h4>
                    </Link>
                    <p className="mt-1 text-[10px] text-auf-muted/60">
                      {p.publishedAt ? formatDate(p.publishedAt) : ""} · {collegeLabel(p.originCollegeId)}
                    </p>
                  </article>
                );
              })
            )}
          </div>
          {recentPosts.length > 0 && (
            <Link href="/news-events" className="mt-3 inline-block text-xs font-semibold text-navy hover:text-gold transition-colors">
              All news →
            </Link>
          )}
        </div>

        {/* C — Announcements */}
        <div>
          <div className="mb-5 flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">C</span>
            <h3 className="font-display text-base font-semibold text-navy">Announcements</h3>
          </div>
          <div className="space-y-3">
            {news.announcements.map((ann) => (
              <div key={ann.id} className="rounded-xl border border-auf-border bg-off-white p-4">
                <p className="text-[10px] font-medium text-auf-muted">{ann.date}</p>
                <p className="mt-1 text-sm font-semibold text-navy leading-snug">{ann.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-auf-muted">{ann.description}</p>
              </div>
            ))}
            {news.announcements.length === 0 && (
              <p className="text-xs text-auf-muted/60 italic">No announcements at this time.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
