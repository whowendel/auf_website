"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AdmissionsTesting } from "@/data/admissions";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function AdmissionsTesting({ testing }: { testing: AdmissionsTesting }) {
  const [open, setOpen] = useState<string | null>("aufcat");

  return (
    <section id="testing-dates" className="scroll-mt-32 border-b border-auf-border pb-14 pt-2">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {testing.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{testing.title}</h2>
      <p className="mb-8 text-sm leading-relaxed text-auf-muted">{testing.description}</p>

      {/* Exam type accordion */}
      <div className="mb-10 space-y-3">
        {testing.examTypes.map((exam) => {
          const isOpen = open === exam.id;
          return (
            <div key={exam.id} className="overflow-hidden rounded-2xl border border-auf-border bg-white transition-shadow hover:shadow-sm">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : exam.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 px-6 py-4 text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy text-[10px] font-bold text-gold text-center leading-tight px-1">
                  {exam.acronym}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy md:text-base">{exam.name}</p>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                  className="shrink-0 text-xl leading-none text-navy/30"
                >+</motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-auf-border px-6 pb-6 pt-5">
                      <p className="mb-5 text-sm leading-relaxed text-auf-muted">{exam.description}</p>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-navy/50">Eligibility</p>
                          <p className="text-sm text-auf-muted">{exam.eligibility}</p>
                        </div>
                        <div>
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-navy/50">Registration Steps</p>
                          <ol className="space-y-1.5">
                            {exam.registrationSteps.map((step, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs text-auf-muted">
                                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-navy/10 text-[9px] font-bold text-navy">
                                  {i + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
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

      {/* Schedule table */}
      <div>
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">
          Examination Schedule
        </p>
        <div className="overflow-hidden rounded-xl border border-auf-border">
          <table className="w-full text-sm">
            <thead className="border-b border-auf-border bg-off-white">
              <tr>
                {["Examination", "Batch", "Registration Deadline", "Exam Date", "Venue"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-navy/50">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {testing.schedule.map((s) => (
                <tr key={s.id} className="border-b border-auf-border last:border-0">
                  <td className="px-4 py-3 font-semibold text-navy">{s.examType}</td>
                  <td className="px-4 py-3 text-auf-muted">{s.batch}</td>
                  <td className="px-4 py-3 text-auf-muted">{s.registrationDeadline}</td>
                  <td className="px-4 py-3 text-auf-muted">{s.examDate}</td>
                  <td className="px-4 py-3 text-auf-muted text-xs">{s.venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-auf-muted/70 italic">{testing.note}</p>
      </div>
    </section>
  );
}
