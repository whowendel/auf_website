"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import { GoBackButton } from "./back";

export type GroupedSidebarGroup = {
  groupLabel: string;
  brandColor: string;
  items: { id: string; label: string }[];
};

/**
 * Sidebar variant for pages whose sections are organized into named groups
 * (e.g. "Becoming Mabuti" → Student Affairs + Guidance).
 *
 * Groups are shown as non-clickable colour-coded dividers; offices/sections
 * are the actual anchor links. The active item is highlighted via
 * IntersectionObserver (same as InnerPageSidebar).
 */
export function InnerPageGroupedSidebar({
  groups,
  children,
}: {
  groups: GroupedSidebarGroup[];
  children?: React.ReactNode;
}) {
  const allIds = groups.flatMap((g) => g.items.map((i) => i.id));
  const active = useActiveSection(allIds);

  return (
    <aside className="hidden lg:block shrink-0 w-56 xl:w-64 self-stretch">
      <div className="sticky top-28">
        <GoBackButton />
        <nav aria-label="Page sections">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
            On this page
          </p>

          {groups.map((group, gi) => (
            <div key={gi} className="mb-5">
              {/* Group label — decorative, not a link */}
              <div className="mb-1.5 flex items-center gap-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: group.brandColor }}
                />
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: group.brandColor }}
                >
                  {group.groupLabel}
                </span>
              </div>

              {/* Office nav items */}
              <div className="space-y-0.5 pl-4">
                {group.items.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all"
                      style={{
                        background: isActive ? group.brandColor : "transparent",
                        color: isActive ? "white" : "var(--auf-muted)",
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
                        className="font-medium leading-snug transition-colors"
                        style={{
                          color: isActive
                            ? "white"
                            : undefined,
                        }}
                      >
                        {item.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        {children && <div className="mt-8 pt-8 border-t border-auf-border">{children}</div>}
      </div>
    </aside>
  );
}
