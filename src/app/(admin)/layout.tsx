import Link from "next/link";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { auth } from "@/server/auth/auth";
import { signOutAction } from "@/server/actions/auth";
import { Badge } from "@/components/ui/primitives";
import { Toaster } from "@/components/ui/sonner";

const NAV: { href: string; label: string; roles: Role[] }[] = [
  { href: "/admin/dashboard", label: "Dashboard",  roles: [Role.SUPER_ADMIN, Role.COLLEGE_ADMIN, Role.COLLEGE_EDITOR] },
  { href: "/admin/posts",     label: "Posts",       roles: [Role.SUPER_ADMIN, Role.COLLEGE_ADMIN, Role.COLLEGE_EDITOR] },
  { href: "/admin/approvals", label: "Approvals",   roles: [Role.SUPER_ADMIN] },
  { href: "/admin/colleges",  label: "Colleges",    roles: [Role.SUPER_ADMIN] },
  { href: "/admin/users",     label: "Users",       roles: [Role.SUPER_ADMIN] },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const visibleNav = NAV.filter((n) => n.roles.includes(session.user.role));

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <aside className="hidden w-60 shrink-0 border-r border-neutral-200 bg-white sm:block">
        <div className="border-b border-neutral-200 p-4">
          <Link href="/" className="block text-sm font-semibold text-neutral-900">
            AUF Admin
          </Link>
          <p className="mt-0.5 text-xs text-neutral-500">Wireframe build</p>
        </div>
        <nav className="p-2">
          {visibleNav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="block rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-6">
          <div className="text-sm text-neutral-600">
            Signed in as <span className="font-medium text-neutral-900">{session.user.name}</span>
            <span className="ml-2">
              <Badge tone={session.user.role}>{session.user.role}</Badge>
            </span>
          </div>
          <form action={signOutAction}>
            <button
              type="submit"
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Sign out
            </button>
          </form>
        </header>

        <main className="flex-1 p-6">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>

      <Toaster richColors position="bottom-right" />
    </div>
  );
}
