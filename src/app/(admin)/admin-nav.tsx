"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AdminNav({
  items,
  onNavigate,
}: {
  items: { href: string; label: string }[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="space-y-0.5 p-2">
      {items.map((n) => {
        const active =
          pathname === n.href || pathname.startsWith(n.href + "/");
        return (
          <Link
            key={n.href}
            href={n.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "border-l-2 border-gold bg-white/15 pl-[10px] text-white"
                : "text-white/65 hover:bg-white/10 hover:text-white",
            )}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
