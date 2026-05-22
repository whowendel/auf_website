"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ResearchCenters } from "@/data/research";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ResearchCenters({ centers }: { centers: ResearchCenters }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="research-centers" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {centers.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{centers.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{centers.description}</p>

      <div className="space-y-4">
        {centers.items.map((center, i) => {
          const isOpen = open === center.id;
          return (
            <div
              key={center.id}
              className="overflow-hidden rounded-2xl border border-auf-border bg-white transition-shadow hover:shadow-md"
            >
              {/* Header (always visible) */}
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : center.id)}
                aria-expanded={isOpen}
                className="group flex w-full items-start gap-5 p-6 text-left md:p-7"
              >
                {/* Acronym badge */}
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold text-white"
                  style={{ background: ["#0E2247", "#1B3A6B", "#14306E"][i % 3] }}
                >
                  {center.acronym}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-auf-muted">
                    {center.acronym}
                  </p>
                  <h3 className="mt-0.5 font-display text-base font-semibold leading-snug text-navy md:text-lg">
                    {center.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-auf-muted line-clamp-2">
                    {center.description}
                  </p>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.22, ease: EASE_OUT }}
                  className="mt-1 shrink-0 text-2xl leading-none text-navy/30"
                >
                  +
                </motion.span>
              </button>

              {/* Expanded body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-auf-border px-6 pb-7 pt-6 md:px-7">
                      <div className="grid gap-8 md:grid-cols-2">
                        {/* Research focus */}
                        <div>
                          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-navy/50">
                            Research Focus Areas
                          </p>
                          <ul className="space-y-1.5">
                            {center.focus.map((f, fi) => (
                              <li key={fi} className="flex items-start gap-2.5 text-sm text-auf-muted">
                                <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Director & contact */}
                        <div className="rounded-xl border border-auf-border bg-off-white p-4">
                          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-navy/50">
                            Center Contact
                          </p>
                          <p className="text-sm text-navy font-semibold">{center.headName}</p>
                          <p className="text-xs text-auf-muted">{center.headTitle}</p>
                          <a
                            href={`mailto:${center.email}`}
                            className="mt-2 block text-xs text-navy hover:text-gold transition-colors"
                          >
                            {center.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
