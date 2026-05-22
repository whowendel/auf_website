"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

type PolicyItem = {
  id: string;
  heading: string;
  body: string;
};

type PolicyAccordionProps = {
  items: readonly PolicyItem[];
  variant: "dark" | "light";
  className?: string;
};

export function PolicyAccordion({ items, variant, className }: PolicyAccordionProps) {
  const [open, setOpen] = useState<string | null>(null);
  const isDark = variant === "dark";

  return (
    <div className={className ?? ""}>
      <div className={isDark ? "space-y-1" : "space-y-1"}>
        {items.map((item, i) => {
          const isOpen = open === item.id;
          return (
            <div
              key={item.id}
              className={
                isDark
                  ? "overflow-hidden rounded-lg border border-white/35"
                  : "overflow-hidden rounded-lg border border-auf-border"
              }
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                className={
                  isDark
                    ? "group flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-white/5"
                    : "group flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors hover:bg-off-white"
                }
              >
                <div className={isDark ? "flex items-center gap-3" : "flex items-center gap-4"}>
                  <span className="w-4 shrink-0 text-[10px] font-bold tabular-nums text-gold">
                    0{i + 1}
                  </span>
                  <span
                    className={
                      isDark
                        ? "text-sm font-medium text-white/80 transition-colors group-hover:text-white"
                        : "text-sm font-medium text-navy transition-colors group-hover:text-navy-mid"
                    }
                  >
                    {item.heading}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                  className="shrink-0 text-lg leading-none text-gold"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: EASE_OUT }}
                    className="overflow-hidden"
                  >
                    <p
                      className={
                        isDark
                          ? "border-t border-white/10 px-4 pb-3 pt-3 pl-11 text-xs leading-relaxed text-white/85"
                          : "border-t border-auf-border px-5 pb-4 pt-3 pl-13 text-sm leading-relaxed text-auf-muted"
                      }
                    >
                      {item.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
