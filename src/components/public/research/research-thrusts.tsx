"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ResearchThrusts } from "@/data/research";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ResearchThrusts({ thrusts }: { thrusts: ResearchThrusts }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="research-thrusts" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {thrusts.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{thrusts.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{thrusts.description}</p>

      <div className="space-y-2">
        {thrusts.items.map((thrust) => {
          const isOpen = open === thrust.id;
          return (
            <div
              key={thrust.id}
              className="overflow-hidden rounded-xl border border-auf-border bg-white"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : thrust.id)}
                aria-expanded={isOpen}
                className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-off-white"
              >
                <span className="shrink-0 font-display text-2xl font-semibold tabular-nums text-navy/20">
                  {String(thrust.number).padStart(2, "0")}
                </span>
                <span className="flex-1 text-sm font-semibold text-navy md:text-base">{thrust.title}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                  className="shrink-0 text-xl leading-none text-navy/30"
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
                    <div className="border-t border-auf-border px-5 pb-5 pt-4 pl-[4.25rem]">
                      <p className="mb-3 text-sm leading-relaxed text-auf-muted">{thrust.description}</p>
                      {thrust.subtopics && thrust.subtopics.length > 0 && (
                        <ul className="space-y-1.5">
                          {thrust.subtopics.map((sub, si) => (
                            <li key={si} className="flex items-start gap-2.5 text-xs text-auf-muted">
                              <span aria-hidden className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-gold" />
                              {sub}
                            </li>
                          ))}
                        </ul>
                      )}
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
