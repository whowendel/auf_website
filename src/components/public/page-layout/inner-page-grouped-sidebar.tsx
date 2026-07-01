"use client";

import { useState, useEffect } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { GoBackButton } from "./back";

export type GroupedSidebarGroup = {
  groupLabel: string;
  brandColor: string;
  items: { id: string; label: string }[];
};

/**
 * Sidebar variant for pages whose sections are organized into named groups
 * (e.g. "About" → Overview, Vision & Mission, History, etc.).
 *
 * Groups can be toggled (expanded/collapsed) by clicking the group headers,
 * making the sidebar more compact and preventing related links from getting pushed too far down.
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

  // Keep track of which groups are expanded (expanded by default)
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    groups.forEach((g) => {
      initial[g.groupLabel] = true;
    });
    return initial;
  });

  // Auto-expand a group if one of its items becomes active via scrolling
  useEffect(() => {
    if (!active) return;
    const activeGroup = groups.find((g) => g.items.some((item) => item.id === active));
    if (activeGroup) {
      setExpanded((prev) => {
        if (prev[activeGroup.groupLabel]) return prev;
        return {
          ...prev,
          [activeGroup.groupLabel]: true,
        };
      });
    }
  }, [active, groups]);

  const toggleGroup = (groupLabel: string) => {
    setExpanded((prev) => ({
      ...prev,
      [groupLabel]: !prev[groupLabel],
    }));
  };

  return (
    <aside className="hidden lg:block shrink-0 w-56 xl:w-64 self-stretch">
      <div className="sticky top-28">
        <GoBackButton />
        <nav aria-label="Page sections">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
            On this page
          </p>

          {groups.map((group, gi) => {
            const isExpanded = !!expanded[group.groupLabel];
            return (
              <div key={gi} className="mb-4">
                {/* Clickable Header for Collapsing/Expanding */}
                <button
                  onClick={() => toggleGroup(group.groupLabel)}
                  className="mb-2 flex items-center justify-between w-full text-left group hover:opacity-80 transition-all"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-2">
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
                  <span
                    className="text-[8px] font-bold transition-transform text-auf-muted/60"
                    style={{
                      transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                      color: group.brandColor,
                    }}
                  >
                    ▶
                  </span>
                </button>

                {/* Office Nav Items list (animated transitions) */}
                <div
                  className="space-y-0.5 pl-4 transition-all duration-300 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isExpanded ? `${group.items.length * 42}px` : "0px",
                    opacity: isExpanded ? 1 : 0,
                    pointerEvents: isExpanded ? "auto" : "none",
                  }}
                >
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
                            color: isActive ? "white" : undefined,
                          }}
                        >
                          {item.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
        {children && <div className="mt-6 pt-6 border-t border-auf-border">{children}</div>}
      </div>
    </aside>
  );
}
