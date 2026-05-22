"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import type { SidebarItem } from "./inner-page-sidebar";

/**
 * Horizontal scrollable pill nav for mobile/tablet — mirrors the sidebar.
 * Shown on screens below `lg`. Sticks just below the fixed SiteHeader (top-22).
 */
export function InnerPageMobileNav({ items }: { items: SidebarItem[] }) {
  const active = useActiveSection(items.map((i) => i.id));

  return (
    <div className="sticky top-22 z-30 border-b border-[var(--auf-border)] bg-white/95 backdrop-blur-sm lg:hidden">
      <div className="mx-auto flex max-w-7xl overflow-x-auto px-6">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "true" : undefined}
              className="shrink-0 border-b-2 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors"
              style={{
                borderBottomColor: isActive ? "var(--auf-navy)" : "transparent",
                color: isActive ? "var(--auf-navy)" : "var(--auf-muted)",
              }}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
