import { Role, PostStatus } from "@prisma/client";
import { requireAdminPage } from "@/server/auth/session";
import { prisma } from "@/lib/prisma";
import { activeColleges, collegeLabel } from "@/data/colleges";
import { PageHeader, Card, LinkButton, Badge } from "@/components/ui/primitives";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const actor = await requireAdminPage();
  const isSuper = actor.role === Role.SUPER_ADMIN;

  const scope = isSuper ? {} : { originCollegeId: actor.collegeId ?? "" };

  const [draftCount, pendingCount, publishedCount, recentPosts] = await Promise.all([
    prisma.post.count({ where: { ...scope, status: PostStatus.DRAFT } }),
    prisma.post.count({ where: { ...scope, status: PostStatus.PENDING_REVIEW } }),
    prisma.post.count({ where: { ...scope, status: PostStatus.PUBLISHED } }),
    prisma.post.findMany({
      where: scope,
      orderBy: { updatedAt: "desc" },
      take: 5,
      include: { author: { select: { name: true } } },
    }),
  ]);

  const stats = [
    { label: "Drafts", value: draftCount },
    { label: "Pending review", value: pendingCount },
    { label: "Published", value: publishedCount },
    ...(isSuper ? [{ label: "Colleges", value: activeColleges.length }] : []),
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description={
          isSuper
            ? "Office of University Relations — university-wide overview."
            : "Your college overview."
        }
        actions={<LinkButton href="/admin/posts/new">New post</LinkButton>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">{s.label}</div>
            <div className="mt-2 text-3xl font-semibold text-neutral-900">{s.value}</div>
          </Card>
        ))}
      </div>

      <h2 className="mt-8 mb-3 text-lg font-semibold text-neutral-900">Recent posts</h2>
      <Card className="p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Scope</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Updated</th>
            </tr>
          </thead>
          <tbody>
            {recentPosts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-neutral-500">
                  No posts yet.
                </td>
              </tr>
            ) : (
              recentPosts.map((p) => (
                <tr key={p.id} className="border-b border-neutral-100 last:border-0">
                  <td className="px-4 py-3">
                    <a
                      href={`/admin/posts/${p.id}`}
                      className="font-medium text-neutral-900 hover:underline"
                    >
                      {p.title}
                    </a>
                    <div className="text-xs text-neutral-500">{p.author.name}</div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {collegeLabel(p.originCollegeId)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={p.status}>{p.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-neutral-500">
                    {new Date(p.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
}
