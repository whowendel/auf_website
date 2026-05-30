import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { auth } from "@/server/auth/auth";
import { AdminShell } from "./admin-shell";

const NAV: { href: string; label: string; roles: Role[] }[] = [
  { href: "/admin/dashboard", label: "Dashboard", roles: [Role.SUPER_ADMIN, Role.COLLEGE_ADMIN, Role.COLLEGE_EDITOR] },
  { href: "/admin/posts",     label: "Posts",      roles: [Role.SUPER_ADMIN, Role.COLLEGE_ADMIN, Role.COLLEGE_EDITOR] },
  { href: "/admin/approvals", label: "Approvals",  roles: [Role.SUPER_ADMIN] },
  { href: "/admin/colleges",  label: "Colleges",   roles: [Role.SUPER_ADMIN] },
  { href: "/admin/users",     label: "Users",      roles: [Role.SUPER_ADMIN] },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const visibleNav = NAV.filter((n) => n.roles.includes(session.user.role));

  return (
    <AdminShell
      userName={session.user.name ?? "Admin"}
      userRole={session.user.role}
      navItems={visibleNav.map((n) => ({ href: n.href, label: n.label }))}
    >
      {children}
    </AdminShell>
  );
}
