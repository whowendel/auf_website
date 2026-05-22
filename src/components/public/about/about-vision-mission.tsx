"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { university } from "@/data/colleges";
import type { AboutVisionMission } from "@/data/about";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function AboutVisionMission({ visionMission }: { visionMission: AboutVisionMission }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="vision-mission" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Our identity</p>
      <h2 className="mb-10 font-display text-2xl font-light text-navy md:text-3xl">
        Vision, Mission &amp; Quality Policy
      </h2>

      {/* Vision + Mission */}
      <div className="mb-6 overflow-hidden rounded-2xl bg-navy">
        <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-white/10">
          <div className="p-6 md:p-8">
            <div className="mb-4 h-0.5 w-8 bg-gold" />
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Vision</p>
            <p className="font-display text-base font-light italic leading-relaxed text-white md:text-lg">
              &ldquo;{university.vision}&rdquo;
            </p>
          </div>
          <div className="border-t border-white/10 p-6 lg:border-t-0 md:p-8">
            <div className="mb-4 h-0.5 w-8 bg-gold" />
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Mission</p>
            <p className="font-display text-base font-light italic leading-relaxed text-white md:text-lg">
              {university.mission}
            </p>
          </div>
        </div>
      </div>

      {/* Quality Policy accordion */}
      <div className="rounded-2xl bg-navy p-6 md:p-8">
        <div className="mb-4 h-0.5 w-8 bg-gold" />
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Quality Policy</p>
        <p className="mb-5 text-xs leading-relaxed text-white/60">
          AUF is dedicated to becoming a leading higher education institution both locally and globally. Hence, AUF is committed to:
        </p>
        <div className="space-y-1">
          {visionMission.qualityPolicy.map((item, i) => {
            const isOpen = open === item.id;
            return (
              <div key={item.id} className="overflow-hidden rounded-lg border border-white/15">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-4 shrink-0 text-[10px] font-bold tabular-nums text-gold">0{i + 1}</span>
                    <span className="text-sm font-medium text-white/80 transition-colors group-hover:text-white">{item.heading}</span>
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
                      <p className="border-t border-white/10 px-4 pb-3 pt-3 pl-11 text-xs leading-relaxed text-white/55">
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
    </section>
  );
}
