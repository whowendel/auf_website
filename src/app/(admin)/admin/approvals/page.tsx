import Link from "next/link";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { requireAdminPage } from "@/server/auth/session";
import { listPendingReviews } from "@/server/services/posts";
import { collegeLabel } from "@/data/colleges";
import { Card, EmptyState, PageHeader } from "@/components/ui/primitives";

export const metadata = { title: "Approvals" };

export default async function ApprovalsPage() {
  const actor = await requireAdminPage();
  if (actor.role !== Role.SUPER_ADMIN) redirect("/admin/dashboard");

  const queue = await listPendingReviews(actor);

  return (
    <>
      <PageHeader
        title="Approvals queue"
        description="Posts submitted by college admins awaiting your review."
      />
      {queue.length === 0 ? (
        <EmptyState
          title="All caught up"
          description="There are no posts pending review right now."
        />
      ) : (
        <Card className="p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">College</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((p) => (
                <tr key={p.id} className="border-b border-neutral-100 last:border-0">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/posts/${p.id}`}
                      className="font-medium text-neutral-900 hover:underline"
                    >
                      {p.title}
                    </Link>
                    <div className="text-xs text-neutral-500">{p.type}</div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {collegeLabel(p.originCollegeId)}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {p.author.name}
                    <div className="text-xs text-neutral-500">{p.author.email}</div>
                  </td>
                  <td className="px-4 py-3 text-neutral-500">
                    {p.submittedAt ? new Date(p.submittedAt).toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </>
  );
}
