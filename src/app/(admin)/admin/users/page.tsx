import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { requireAdminPage } from "@/server/auth/session";
import { listUsers } from "@/server/services/users";
import { activeColleges, getCollegeById } from "@/data/colleges";
import { Badge, Card, PageHeader } from "@/components/ui/primitives";
import { InviteUserForm } from "./invite-user-form";
import { UserActivateToggle } from "./user-activate-toggle";

export const metadata = { title: "Users" };

export default async function UsersPage() {
  const actor = await requireAdminPage();
  if (actor.role !== Role.SUPER_ADMIN) redirect("/admin/dashboard");

  const users = await listUsers(actor);
  const colleges = activeColleges.map((c) => ({
    id: c.id,
    shortName: c.shortName,
    name: c.name,
  }));

  return (
    <>
      <PageHeader title="Users" description="Manage who can sign in to the admin panel." />

      <Card className="mb-8">
        <h2 className="mb-3 text-base font-semibold text-neutral-900">Invite a user</h2>
        <InviteUserForm colleges={colleges} />
      </Card>

      <Card className="p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">College</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const college = u.collegeId ? getCollegeById(u.collegeId) : null;
              return (
                <tr key={u.id} className="border-b border-neutral-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-neutral-900">{u.name}</td>
                  <td className="px-4 py-3 text-neutral-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <Badge tone={u.role}>{u.role}</Badge>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {college?.shortName ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={u.isActive ? "PUBLISHED" : "ARCHIVED"}>
                      {u.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {u.id === actor.id ? (
                      <span className="text-xs text-neutral-400">(you)</span>
                    ) : (
                      <UserActivateToggle userId={u.id} isActive={u.isActive} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}
