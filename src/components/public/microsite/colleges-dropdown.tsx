"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { activeColleges } from "@/data/colleges";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Props = {
  currentCollegeId: string;
  accentColor: string;
  brandColor: string;
};

/**
 * A "More colleges" button rendered in the microsite nav strip.
 * Opens a floating panel listing all other AUF college microsites.
 */
export function CollegesDropdown({ currentCollegeId, accentColor, brandColor }: Props) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const others = activeColleges.filter((c) => c.id !== currentCollegeId);

  const close = useCallback(() => setOpen(false), []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, close]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  return (
    <div className="relative ml-auto shrink-0">
      {/* Trigger button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Browse all colleges"
        className="flex items-center gap-1.5 border-b-2 border-transparent px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-white"
        style={{
          borderBottomColor: open ? accentColor : "transparent",
          color: open ? "white" : undefined,
        }}
      >
        <LayoutGrid size={13} />
        <span className="hidden sm:inline">All Colleges</span>
      </button>

      {/* Floating panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            aria-label="All college microsites"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: EASE_OUT } }}
            exit={{ opacity: 0, y: 4, scale: 0.98, transition: { duration: 0.16 } }}
            className="absolute right-0 top-full z-50 mt-2 w-[min(400px,90vw)] overflow-hidden rounded-2xl border border-[var(--auf-border)] bg-white shadow-2xl shadow-[var(--auf-navy)]/20"
          >
            {/* Panel header */}
            <div
              className="flex items-center justify-between border-b border-[var(--auf-border)] px-4 py-3"
              style={{ background: brandColor }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                AUF Colleges &amp; Schools
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="rounded-full p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={13} />
              </button>
            </div>

            {/* College list */}
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
              <ul className="grid grid-cols-2 gap-px bg-[var(--auf-border)]">
                {others.map((c) => {
                  const logo = c.mascotLogoWithTextUrl ?? c.mascotLogoUrl;
                  return (
                    <li key={c.id}>
                      <Link
                        href={`/c/${c.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={close}
                        className="group flex items-center gap-3 bg-white px-4 py-3 transition-colors hover:bg-[var(--auf-off-white)]"
                      >
                        {/* Color dot / mini logo */}
                        <div
                          className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg"
                          style={{ background: c.brandColor }}
                        >
                          {logo ? (
                            <Image
                              src={logo}
                              alt={c.shortName}
                              fill
                              className="object-contain p-0.5"
                              sizes="32px"
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center font-display text-[9px] font-bold text-white">
                              {c.shortName}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className="text-[10px] font-bold uppercase tracking-[0.14em] transition-colors"
                            style={{ color: c.brandColor }}
                          >
                            {c.shortName}
                          </p>
                          <p className="truncate text-[11px] font-medium leading-tight text-[var(--auf-navy)] group-hover:text-[var(--auf-navy-mid)] transition-colors">
                            {c.name}
                          </p>
                        </div>

                        <span
                          className="shrink-0 text-xs opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5"
                          style={{ color: c.brandColor }}
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
