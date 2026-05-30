import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { requireAdminPage } from "@/server/auth/session";
import { listAuditLogs } from "@/server/services/audit";
import { Card, PageHeader } from "@/components/ui/primitives";

export const metadata = { title: "Audit Log" };

const ACTION_LABEL: Record<string, string> = {
  "auth.login":          "Signed in",
  "auth.logout":         "Signed out",
  "post.create":         "Created post",
  "post.update":         "Updated post",
  "post.submit":         "Submitted for review",
  "post.approve":        "Approved post",
  "post.reject":         "Rejected post",
  "post.request_changes":"Requested changes",
  "post.publish":        "Published post",
  "post.unpublish":      "Unpublished post",
  "post.archive":        "Archived post",
  "user.invite":         "Invited user",
  "user.activate":       "Activated user",
  "user.deactivate":     "Deactivated user",
};

const ACTION_COLOR: Record<string, string> = {
  "auth.login":           "bg-emerald-50 text-emerald-700",
  "auth.logout":          "bg-neutral-100 text-neutral-500",
  "post.create":          "bg-blue-50 text-blue-700",
  "post.update":          "bg-blue-50 text-blue-600",
  "post.submit":          "bg-amber-50 text-amber-700",
  "post.approve":         "bg-emerald-50 text-emerald-700",
  "post.reject":          "bg-red-50 text-red-600",
  "post.request_changes": "bg-orange-50 text-orange-600",
  "post.publish":         "bg-emerald-50 text-emerald-800",
  "post.unpublish":       "bg-neutral-100 text-neutral-600",
  "post.archive":         "bg-neutral-100 text-neutral-500",
  "user.invite":          "bg-navy/10 text-navy",
  "user.activate":        "bg-emerald-50 text-emerald-700",
  "user.deactivate":      "bg-red-50 text-red-600",
};

function formatMeta(meta: unknown): string {
  if (!meta || typeof meta !== "object") return "";
  const entries = Object.entries(meta as Record<string, unknown>)
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(([k, v]) => `${k}: ${String(v)}`);
  return entries.join(" · ");
}

export default async function AuditPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const actor = await requireAdminPage();
  if (actor.role !== Role.SUPER_ADMIN) redirect("/admin/dashboard");

  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const limit = 50;
  const offset = (page - 1) * limit;

  const { rows, total } = await listAuditLogs({ limit, offset });
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <PageHeader
        title="Audit Log"
        description="A record of every action taken in the admin panel."
      />

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-auf-border bg-navy/5 text-left text-xs uppercase tracking-wide text-navy/60">
              <tr>
                <th className="px-4 py-2 whitespace-nowrap">Timestamp</th>
                <th className="px-4 py-2">Actor</th>
                <th className="px-4 py-2">Action</th>
                <th className="px-4 py-2">Entity</th>
                <th className="px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-auf-muted">
                    No audit events yet.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/60">
                    <td className="px-4 py-3 text-xs text-auf-muted whitespace-nowrap">
                      {new Date(row.createdAt).toLocaleString("en-PH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      {row.actor ? (
                        <>
                          <div className="font-medium text-navy">{row.actor.name}</div>
                          <div className="text-xs text-auf-muted">{row.actor.email}</div>
                        </>
                      ) : (
                        <span className="text-xs text-auf-muted">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${ACTION_COLOR[row.action] ?? "bg-neutral-100 text-neutral-600"}`}
                      >
                        {ACTION_LABEL[row.action] ?? row.action}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-neutral-600">{row.entityType}</div>
                      <div className="truncate font-mono text-[10px] text-auf-muted max-w-[120px]">
                        {row.entityId}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-auf-muted">
                      {formatMeta(row.metadata)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-auf-border px-4 py-3">
            <span className="text-xs text-auf-muted">
              {total} events · page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              {page > 1 && (
                <a
                  href={`?page=${page - 1}`}
                  className="rounded border border-navy/20 px-3 py-1 text-xs font-medium text-navy/70 hover:bg-navy/5 hover:text-navy"
                >
                  ← Previous
                </a>
              )}
              {page < totalPages && (
                <a
                  href={`?page=${page + 1}`}
                  className="rounded border border-navy/20 px-3 py-1 text-xs font-medium text-navy/70 hover:bg-navy/5 hover:text-navy"
                >
                  Next →
                </a>
              )}
            </div>
          </div>
        )}
      </Card>

      {total > 0 && (
        <p className="mt-3 text-right text-xs text-auf-muted">
          Showing {offset + 1}–{Math.min(offset + limit, total)} of {total} events
        </p>
      )}
    </>
  );
}
