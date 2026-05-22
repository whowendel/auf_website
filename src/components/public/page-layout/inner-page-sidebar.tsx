"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import { GoBackButton } from "./back";


export type SidebarItem = {
  id: string;
  label: string;
};

/**
 * Sticky sidebar navigation for inner pages.
 * Highlights the currently visible section using IntersectionObserver.
 * Hidden on mobile — the InnerPageMobileNav handles small screens.
 */
export function InnerPageSidebar({ items }: { items: SidebarItem[] }) {
  const active = useActiveSection(items.map((i) => i.id));

  return (
    <aside className="hidden lg:block shrink-0 w-56 xl:w-64 self-stretch">
      <div className="sticky top-28">
        <GoBackButton />
      <nav className="space-y-0.5" aria-label="Page sections">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
          On this page
        </p>
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "true" : undefined}
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all"
              style={{
                background: isActive ? "var(--auf-navy)" : "transparent",
                color: isActive ? "var(--auf-gold-light)" : "var(--auf-muted)",
              }}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full transition-all"
                style={{
                  background: isActive ? "var(--auf-gold)" : "var(--auf-border)",
                  transform: isActive ? "scale(1.3)" : "scale(1)",
                }}
              />
              <span
                className={`font-medium leading-snug transition-colors ${
                  isActive ? "" : "group-hover:text-[var(--auf-navy)]"
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
      </div>
    </aside>
  );
}
