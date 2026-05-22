"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { activeColleges } from "@/data/colleges";
import type { AdmissionsPrograms } from "@/data/admissions";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function AdmissionsPrograms({ programs }: { programs: AdmissionsPrograms }) {
  const [openCollege, setOpenCollege] = useState<string | null>(null);

  return (
    <section id="academic-programs" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {programs.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{programs.title}</h2>
      <p className="mb-2 text-sm leading-relaxed text-auf-muted">{programs.description}</p>
      <p className="mb-8 text-xs italic text-auf-muted/70">{programs.note}</p>

      <div className="space-y-2">
        {activeColleges.map((college) => {
          const isOpen = openCollege === college.id;
          const logo = college.mascotLogoUrl;
          return (
            <div
              key={college.id}
              className="overflow-hidden rounded-xl border border-auf-border bg-white"
            >
              {/* College header */}
              <button
                type="button"
                onClick={() => setOpenCollege(isOpen ? null : college.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-off-white"
              >
                {/* Mascot / color indicator */}
                <div
                  className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg"
                  style={{ background: college.brandColor }}
                >
                  {logo ? (
                    <Image src={logo} alt={college.shortName} fill className="object-contain p-0.5" sizes="40px" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-[9px] font-bold text-white">
                      {college.shortName}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: college.brandColor }}>
                    {college.shortName}
                  </p>
                  <p className="text-sm font-semibold text-navy">{college.name}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden rounded-full bg-navy/8 px-2 py-0.5 text-[10px] font-medium text-navy/60 sm:inline">
                    {college.programs.length} {college.programs.length === 1 ? "program" : "programs"}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    className="text-xl leading-none text-navy/25"
                  >+</motion.span>
                </div>
              </button>

              {/* Program list */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: EASE_OUT }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-auf-border px-5 pb-4 pt-4">
                      <ul className="space-y-1.5">
                        {college.programs.map((program) => (
                          <li key={program.id} className="flex items-start gap-2.5 text-sm text-auf-muted">
                            <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: college.brandColor }} />
                            <span>{program.name}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/c/${college.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:opacity-80"
                        style={{ color: college.brandColor }}
                      >
                        Visit {college.shortName} microsite ↗
                      </Link>
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
