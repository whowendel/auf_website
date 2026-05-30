import Link from "next/link";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { requireAdminPage } from "@/server/auth/session";
import { colleges } from "@/data/colleges";
import { PageHeader, Card } from "@/components/ui/primitives";

export const metadata = { title: "Colleges" };

export default async function CollegesPage() {
  const actor = await requireAdminPage();
  if (actor.role !== Role.SUPER_ADMIN) redirect("/admin/dashboard");

  return (
    <>
      <PageHeader
        title="Colleges"
        description="College data is managed in src/data/site.json. This is a read-only view."
      />
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-auf-border bg-navy/5 text-left text-xs uppercase tracking-wide text-navy/60">
            <tr>
              <th className="px-4 py-2">College</th>
              <th className="px-4 py-2">ID / Slug</th>
              <th className="px-4 py-2">Brand</th>
              <th className="px-4 py-2">Programs</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Microsite</th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((c) => (
              <tr key={c.id} className="border-b border-neutral-100 last:border-0">
                <td className="px-4 py-3">
                  <div className="font-medium text-neutral-900">{c.shortName}</div>
                  <div className="text-xs text-neutral-500">{c.name}</div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-600">{c.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="h-4 w-4 rounded"
                      style={{ background: c.brandColor }}
                    />
                    <span className="font-mono text-xs text-neutral-500">{c.brandColor}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-neutral-600">{c.programs.length}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium ${c.isActive ? "text-emerald-700" : "text-neutral-500"}`}
                  >
                    {c.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/c/${c.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-navy hover:text-navy-deep hover:underline"
                  >
                    /c/{c.slug} ↗
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </Card>
      <p className="mt-4 text-xs text-neutral-500">
        To add or edit colleges, update{" "}
        <code className="rounded bg-neutral-100 px-1">src/data/site.json</code> and redeploy.
        No schema migration required.
      </p>
    </>
  );
}
