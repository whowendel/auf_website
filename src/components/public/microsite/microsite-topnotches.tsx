"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { College, Topnotcher } from "@/data/colleges";
import { SectionShell } from "./section-shell";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function MicrositeTopnotches({ college }: { college: College }) {
  const [openYear, setOpenYear] = useState<string | null>(null);

  if (!college.topnotches?.length) return null;

  // Group topnotchers by year
  const grouped = college.topnotches.reduce((acc, t) => {
    if (!acc[t.year]) acc[t.year] = [];
    acc[t.year].push(t);
    return acc;
  }, {} as Record<string, Topnotcher[]>);

  // Sort years descending so recent graduates are at the top
  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const isNursing = college.id === "con";

  // If there are few topnotchers, just render the standard grid
  if (college.topnotches.length <= 6 && !isNursing) {
    return (
      <SectionShell
        id="topnotches"
        eyebrow="Hall of fame"
        title="Our Topnotchers"
        description="Graduates whose achievements in licensure exams, competitions, and certifications bring honor to the College."
        brandColor={college.brandColor}
        tone="white"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {college.topnotches.map((t) => (
            <article
              key={t.id}
              className="relative overflow-hidden rounded-2xl p-6 md:p-7"
              style={{ background: college.brandColor }}
            >
              <div
                aria-hidden
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-30 blur-3xl"
                style={{ background: college.accentColor }}
              />
              <span
                aria-hidden
                className="absolute -bottom-2 -right-2 select-none font-display text-7xl font-bold leading-none opacity-10"
                style={{ color: college.accentColor }}
              >
                ★
              </span>
              <div className="relative">
                <span
                  className="mb-3 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]"
                  style={{
                    borderColor: `${college.accentColor}50`,
                    color: college.accentColor,
                  }}
                >
                  {t.year}
                </span>
                <p
                  className="font-display text-xl font-semibold leading-tight"
                  style={{ color: college.accentColor }}
                >
                  {t.rank}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/55">
                  {t.exam}
                </p>
                <div className="mt-4 border-t border-white/15 pt-4">
                  <p className="font-display text-base font-semibold text-white">{t.name}</p>
                  {t.program && (
                    <p className="mt-0.5 text-xs text-white/55">{t.program}</p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>
    );
  }

  // Render expandable sections by year
  return (
    <SectionShell
      id="topnotches"
      eyebrow="Hall of fame"
      title="Our Topnotchers"
      description="Graduates whose achievements in licensure exams, competitions, and certifications bring honor to the College."
      brandColor={college.brandColor}
      tone="white"
    >
      <div className="space-y-4">
        {years.map((year) => {
          const list = grouped[year];
          const isOpen = openYear === year;

          // Helper to get top ranks for preview (e.g. "2nd, 8th")
          const rankPreview = list
            .map((t) => t.rank.replace(" Place", ""))
            .slice(0, 3)
            .join(", ") + (list.length > 3 ? "..." : "");

          return (
            <div
              key={year}
              className="overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-md"
              style={{ borderColor: `${college.brandColor}20` }}
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => setOpenYear(isOpen ? null : year)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-neutral-50 md:p-8"
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3
                    className="font-display text-2xl font-bold tracking-tight"
                    style={{ color: college.brandColor }}
                  >
                    Class of {year}
                  </h3>
                  <span className="text-sm font-medium text-[var(--auf-muted)]">
                    {list.length} Topnotcher{list.length !== 1 ? "s" : ""}
                  </span>
                  <span
                    className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider"
                    style={{
                      background: `${college.accentColor}15`,
                      color: college.brandColor,
                    }}
                  >
                    Ranks: {rankPreview}
                  </span>
                </div>
                
                {/* Expand / collapse chevron */}
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                  className="text-lg leading-none"
                  style={{ color: college.brandColor }}
                >
                  ▼
                </motion.span>
              </button>

              {/* Accordion Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: EASE_OUT }}
                    className="overflow-hidden"
                  >
                    <div
                      className="border-t px-6 py-6 bg-neutral-50/50 md:px-8 md:py-8"
                      style={{ borderColor: `${college.brandColor}15` }}
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        {list.map((t) => (
                          <div
                            key={t.id}
                            className="relative overflow-hidden rounded-xl border bg-white p-5 transition-transform hover:-translate-y-0.5"
                            style={{ borderColor: `${college.brandColor}15` }}
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <h4 className="font-display text-base font-bold text-[var(--auf-navy)]">
                                  {t.name}
                                </h4>
                                <p className="text-xs text-[var(--auf-muted)] mt-0.5">
                                  {t.exam}
                                </p>
                              </div>
                              <span
                                className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold whitespace-nowrap"
                                style={{
                                  background: `${college.brandColor}12`,
                                  color: college.brandColor,
                                }}
                              >
                                {t.rank}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
