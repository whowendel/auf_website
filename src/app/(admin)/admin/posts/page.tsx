import Link from "next/link";
import { requireAdminPage } from "@/server/auth/session";
import { listPostsForAdmin } from "@/server/services/posts";
import { collegeLabel, getCollegeById } from "@/data/colleges";
import { Badge, Card, EmptyState, LinkButton, PageHeader } from "@/components/ui/primitives";
import { PostStatus, Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

export const metadata = { title: "Posts" };

const STATUS_DOT: Record<PostStatus, string> = {
  DRAFT:            "bg-neutral-300",
  PENDING_REVIEW:   "bg-amber-400",
  CHANGES_REQUESTED:"bg-orange-400",
  APPROVED:         "bg-blue-400",
  PUBLISHED:        "bg-emerald-500",
  REJECTED:         "bg-red-400",
  ARCHIVED:         "bg-neutral-400",
};

const TYPE_COLOR: Record<string, string> = {
  NEWS:         "bg-blue-50 text-blue-700 border-blue-200",
  BLOG:         "bg-violet-50 text-violet-700 border-violet-200",
  ANNOUNCEMENT: "bg-amber-50 text-amber-700 border-amber-200",
  EVENT:        "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const FILTER_TABS: { label: string; value: PostStatus | "" }[] = [
  { label: "All",       value: ""                            },
  { label: "Draft",     value: PostStatus.DRAFT              },
  { label: "Pending",   value: PostStatus.PENDING_REVIEW     },
  { label: "Changes",   value: PostStatus.CHANGES_REQUESTED  },
  { label: "Approved",  value: PostStatus.APPROVED           },
  { label: "Published", value: PostStatus.PUBLISHED          },
  { label: "Rejected",  value: PostStatus.REJECTED           },
  { label: "Archived",  value: PostStatus.ARCHIVED           },
];

const VALID_STATUSES = new Set<string>(Object.values(PostStatus));

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const actor = await requireAdminPage();
  const { status: statusParam } = await searchParams;

  const activeStatus: PostStatus | undefined =
    statusParam && VALID_STATUSES.has(statusParam)
      ? (statusParam as PostStatus)
      : undefined;

  const scope =
    actor.role === Role.SUPER_ADMIN ? {} : { originCollegeId: actor.collegeId ?? undefined };

  const [posts, rawCounts] = await Promise.all([
    listPostsForAdmin(actor, { status: activeStatus }),
    prisma.post.groupBy({ by: ["status"], where: scope, _count: { id: true } }),
  ]);

  const counts = Object.fromEntries(
    rawCounts.map((r) => [r.status, r._count.id]),
  ) as Partial<Record<PostStatus, number>>;

  const totalNonArchived = Object.entries(counts)
    .filter(([s]) => s !== PostStatus.ARCHIVED)
    .reduce((sum, [, n]) => sum + (n ?? 0), 0);

  return (
    <>
      <PageHeader
        title="Posts"
        description="News, blogs, and announcements."
        actions={<LinkButton href="/admin/posts/new">New post</LinkButton>}
      />

      {/* Filter tabs */}
      <div className="mb-4 -mx-1 flex flex-wrap gap-1 overflow-x-auto px-1 pb-1">
        {FILTER_TABS.map(({ label, value }) => {
          const isActive = (value === "" && !activeStatus) || value === activeStatus;
          const count = value === ""
            ? totalNonArchived
            : (counts[value as PostStatus] ?? 0);
          return (
            <Link
              key={value}
              href={value ? `/admin/posts?status=${value}` : "/admin/posts"}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "border-navy bg-navy text-white"
                  : "border-auf-border bg-white text-auf-muted hover:border-navy/30 hover:text-navy",
              )}
            >
              {label}
              <span
                className={cn(
                  "inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold",
                  isActive ? "bg-white/20 text-white" : "bg-navy/8 text-navy/70",
                )}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Summary strip — always reflects global counts, not the active filter */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(
          [
            ["Active",    totalNonArchived,                        "bg-navy/10 text-navy"],
            ["Published", counts[PostStatus.PUBLISHED]  ?? 0,     "bg-emerald-50 text-emerald-700"],
            ["Pending",   counts[PostStatus.PENDING_REVIEW] ?? 0, "bg-amber-50 text-amber-700"],
            ["Drafts",    counts[PostStatus.DRAFT]      ?? 0,     "bg-neutral-100 text-neutral-600"],
          ] as const
        ).map(([label, count, cls]) => (
          <div key={label} className={`rounded-xl px-4 py-3 ${cls}`}>
            <p className="text-2xl font-semibold">{count}</p>
            <p className="mt-0.5 text-xs font-medium">{label}</p>
          </div>
        ))}
      </div>

      {posts.length === 0 ? (
        <EmptyState
          title={activeStatus ? `No ${activeStatus.replace(/_/g, " ").toLowerCase()} posts` : "No posts yet"}
          action={!activeStatus ? <LinkButton href="/admin/posts/new">New post</LinkButton> : undefined}
        />
      ) : (
        <>
          {/* Posts table */}
          <Card className="overflow-hidden p-0">
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-sm">
                <thead className="border-b border-auf-border bg-navy/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-navy/60">
                      Post
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-navy/60">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-navy/60">
                      Scope
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-navy/60">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-navy/60">
                      Updated
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((p) => {
                    const college = p.originCollegeId
                      ? getCollegeById(p.originCollegeId)
                      : null;

                    return (
                      <tr
                        key={p.id}
                        className="group border-b border-neutral-100 last:border-0 hover:bg-neutral-50/70"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-start gap-3">
                            {p.isFeatured && (
                              <span
                                title="Featured"
                                className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"
                                aria-label="Featured"
                              />
                            )}
                            <div className="min-w-0">
                              <Link
                                href={`/admin/posts/${p.id}`}
                                className="block truncate font-semibold text-navy hover:text-navy-deep hover:underline"
                              >
                                {p.title}
                              </Link>
                              <p className="mt-0.5 text-xs text-neutral-400">
                                {p.author.name}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <span
                            className={`inline-block rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${TYPE_COLOR[p.type] ?? "bg-neutral-100 text-neutral-600 border-neutral-200"}`}
                          >
                            {p.type}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          {college ? (
                            <div className="flex items-center gap-2">
                              <span
                                className="flex h-5 w-8 shrink-0 items-center justify-center rounded text-[9px] font-bold text-white"
                                style={{ background: college.brandColor }}
                              >
                                {college.shortName}
                              </span>
                              <span className="truncate text-xs text-neutral-600">
                                {college.name}
                              </span>
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-neutral-400" />
                              University
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`inline-block h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[p.status] ?? "bg-neutral-300"}`}
                            />
                            <Badge tone={p.status}>{p.status.replace(/_/g, " ")}</Badge>
                          </div>
                        </td>

                        <td className="px-4 py-3 text-xs text-neutral-400">
                          {new Date(p.updatedAt).toLocaleDateString("en-PH", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="divide-y divide-neutral-100 md:hidden">
              {posts.map((p) => {
                const college = p.originCollegeId
                  ? getCollegeById(p.originCollegeId)
                  : null;

                return (
                  <div key={p.id} className="px-4 py-4">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <Link
                        href={`/admin/posts/${p.id}`}
                        className="flex-1 font-semibold leading-snug text-navy hover:underline"
                      >
                        {p.title}
                      </Link>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`inline-block h-2 w-2 rounded-full ${STATUS_DOT[p.status] ?? "bg-neutral-300"}`}
                        />
                        <Badge tone={p.status}>{p.status.replace(/_/g, " ")}</Badge>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                      <span
                        className={`rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${TYPE_COLOR[p.type] ?? "bg-neutral-100 text-neutral-600 border-neutral-200"}`}
                      >
                        {p.type}
                      </span>

                      {college ? (
                        <span
                          className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white"
                          style={{ background: college.brandColor }}
                        >
                          {college.shortName}
                        </span>
                      ) : (
                        <span className="text-neutral-400">University</span>
                      )}

                      <span className="text-neutral-300">·</span>
                      <span>{p.author.name}</span>
                      <span className="text-neutral-300">·</span>
                      <span>
                        {new Date(p.updatedAt).toLocaleDateString("en-PH", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <p className="mt-3 text-right text-xs text-neutral-400">
            {posts.length} post{posts.length !== 1 ? "s" : ""}
            {activeStatus && ` · ${activeStatus.replace(/_/g, " ").toLowerCase()}`}
          </p>
        </>
      )}
    </>
  );
}
