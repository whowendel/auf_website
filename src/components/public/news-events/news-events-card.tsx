import Link from "next/link";
import { getCollegeById } from "@/data/colleges";
import { formatDate } from "@/lib/utils";

const TYPE_STYLES: Record<string, { badge: string; placeholder: string }> = {
  NEWS:         { badge: "bg-blue-50 text-blue-700",    placeholder: "bg-blue-100" },
  BLOG:         { badge: "bg-violet-50 text-violet-700", placeholder: "bg-violet-100" },
  ANNOUNCEMENT: { badge: "bg-amber-50 text-amber-700",  placeholder: "bg-amber-100" },
};

type PostCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  type: string;
  coverImageUrl: string | null;
  publishedAt: Date | null;
  isFeatured: boolean;
  originCollegeId: string | null;
  author: { name: string | null };
  collegeTags: { collegeId: string }[];
};

export function NewsEventsCard({ post, featured = false }: { post: PostCard; featured?: boolean }) {
  const college = post.originCollegeId ? getCollegeById(post.originCollegeId) : null;
  const typeStyle = TYPE_STYLES[post.type] ?? { badge: "bg-neutral-100 text-neutral-600", placeholder: "bg-neutral-100" };

  const href = post.originCollegeId
    ? `/c/${post.originCollegeId}/posts/${post.slug}`
    : `/posts/${post.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-auf-border bg-white transition-shadow hover:shadow-md">

      {/* College brand-color strip */}
      <div
        className="h-1 w-full shrink-0"
        style={{ background: college?.brandColor ?? "var(--auf-gold)" }}
      />

      {/* Cover image or placeholder */}
      <Link href={href} className="block">
        {post.coverImageUrl ? (
          <div className={`overflow-hidden ${featured ? "h-60" : "h-44"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div
            className={`flex items-center justify-center ${typeStyle.placeholder} ${featured ? "h-60" : "h-44"}`}
          >
            <span className="font-display text-4xl font-bold text-white/40">
              {post.type[0]}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Badges row */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${typeStyle.badge}`}>
            {post.type}
          </span>
          {college && (
            <span
              className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white"
              style={{ background: college.brandColor }}
            >
              {college.shortName}
            </span>
          )}
          {post.isFeatured && (
            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#8a6800]">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={href}>
          <h3
            className={`font-display font-semibold leading-snug text-navy transition-colors group-hover:text-navy/70 ${featured ? "line-clamp-3 text-xl" : "line-clamp-2 text-base"}`}
          >
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p className={`mt-2 flex-1 text-xs leading-relaxed text-auf-muted ${featured ? "line-clamp-3" : "line-clamp-2"}`}>
            {post.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] text-auf-muted/60">
            {post.author.name}
            {post.publishedAt && (
              <> · {formatDate(post.publishedAt)}</>
            )}
          </span>
          <Link
            href={href}
            className="text-[10px] font-semibold transition-colors hover:opacity-70"
            style={{ color: college?.brandColor ?? "var(--auf-gold)" }}
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}
