"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { College, Program } from "@/data/colleges";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Single expandable program card ───────────────────────────────────
function ProgramCard({
  program,
  brandColor,
  accentColor,
  index,
  isOpen,
  onToggle,
}: {
  program: Program;
  brandColor: string;
  accentColor: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const hasDetails = !!(
    program.description ||
    program.curriculum?.length ||
    program.careers?.length ||
    program.admissionRequirements?.length ||
    program.specializations?.length
  );

  return (
    <div
      className="overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-md"
      style={{ borderColor: `${brandColor}20` }}
    >
      {/* Card header — always visible */}
      <button
        type="button"
        onClick={hasDetails ? onToggle : undefined}
        aria-expanded={isOpen}
        disabled={!hasDetails}
        className="group flex w-full items-start gap-5 p-6 text-left disabled:cursor-default md:p-8"
      >
        {/* Index */}
        <span
          className="mt-1 shrink-0 font-display text-3xl font-semibold tabular-nums leading-none md:text-4xl"
          style={{ color: `${brandColor}40` }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Title block */}
        <div className="flex-1 min-w-0">
          {program.duration && (
            <p
              className="mb-1.5 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{
                background: `${brandColor}12`,
                color: brandColor,
              }}
            >
              {program.duration}
            </p>
          )}
          <h3 className="font-display text-lg font-semibold leading-snug text-[var(--auf-navy)] md:text-xl">
            {program.name}
          </h3>
          {program.headName && (
            <p className="mt-1.5 text-xs text-[var(--auf-muted)]">
              {program.headTitle ? `${program.headTitle}: ` : ""}
              {program.headName}
            </p>
          )}
        </div>

        {/* Expand chevron */}
        {hasDetails && (
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="mt-1.5 shrink-0 text-2xl leading-none"
            style={{ color: brandColor }}
          >
            +
          </motion.span>
        )}
      </button>

      {/* Expanded body */}
      <AnimatePresence initial={false}>
        {isOpen && hasDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div
              className="space-y-8 border-t px-6 py-7 md:px-8 md:py-8"
              style={{ borderColor: `${brandColor}15` }}
            >
              {program.description && (
                <p className="text-sm leading-relaxed text-[var(--auf-text)] md:text-base">
                  {program.description}
                </p>
              )}

              {((program.curriculum && program.curriculum.length > 0) ||
                (program.careers && program.careers.length > 0)) && (
                <div className="grid gap-8 md:grid-cols-2">
                  {program.curriculum && program.curriculum.length > 0 && (
                    <ProgramSubList
                      label="Curriculum highlights"
                      items={program.curriculum}
                      brandColor={brandColor}
                      accentColor={accentColor}
                    />
                  )}
                  {program.careers && program.careers.length > 0 && (
                    <ProgramChipList
                      label="Career opportunities"
                      items={program.careers}
                      brandColor={brandColor}
                    />
                  )}
                </div>
              )}

              {program.specializations && program.specializations.length > 0 && (
                <div>
                  <p
                    className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: brandColor }}
                  >
                    Areas of specialization
                  </p>
                  <div className="space-y-5">
                    {program.specializations.map((specialization) => (
                      <div
                        key={specialization.name}
                        className="rounded-xl border bg-white px-4 py-4 md:px-5"
                        style={{ borderColor: `${brandColor}15` }}
                      >
                        <p
                          className="text-sm font-semibold text-[var(--auf-navy)]"
                          style={{ color: brandColor }}
                        >
                          {specialization.name}
                        </p>
                        {specialization.description && (
                          <p className="mt-2 text-sm leading-relaxed text-[var(--auf-text)]">
                            {specialization.description}
                          </p>
                        )}
                        {specialization.bullets && specialization.bullets.length > 0 && (
                          <ul className="mt-3 space-y-2">
                            {specialization.bullets.map((item, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--auf-text)]">
                                <span
                                  aria-hidden
                                  className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full"
                                  style={{ background: accentColor }}
                                />
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {program.admissionRequirements && program.admissionRequirements.length > 0 && (
                <div className="border-t pt-6" style={{ borderColor: `${brandColor}15` }}>
                  <ProgramSubList
                    label="Admission requirements"
                    items={program.admissionRequirements}
                    brandColor={brandColor}
                    accentColor={accentColor}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Sub-list renderers ────────────────────────────────────────────────
function ProgramSubList({
  label,
  items,
  brandColor,
  accentColor,
}: {
  label: string;
  items: string[];
  brandColor: string;
  accentColor: string;
}) {
  return (
    <div>
      <p
        className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{ color: brandColor }}
      >
        {label}
      </p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--auf-text)]">
            <span
              aria-hidden
              className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full"
              style={{ background: accentColor }}
            />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProgramChipList({
  label,
  items,
  brandColor,
}: {
  label: string;
  items: string[];
  brandColor: string;
}) {
  return (
    <div>
      <p
        className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{ color: brandColor }}
      >
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={i}
            className="rounded-full border px-3 py-1 text-xs font-medium"
            style={{
              borderColor: `${brandColor}30`,
              color: brandColor,
              background: `${brandColor}06`,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Category grouping ─────────────────────────────────────────────────
function groupByCategory(programs: Program[]): { category: string | null; programs: Program[] }[] {
  const groups: { category: string | null; programs: Program[] }[] = [];
  for (const p of programs) {
    const category = p.category ?? null;
    const last = groups[groups.length - 1];
    if (last && last.category === category) {
      last.programs.push(p);
    } else {
      groups.push({ category, programs: [p] });
    }
  }
  return groups;
}

// ─── Main section ─────────────────────────────────────────────────────
export function MicrositePrograms({ college }: { college: College }) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (college.programs.length === 0) return null;

  const groups = groupByCategory(college.programs);

  return (
    <section
      id="programs"
      className="py-20 md:py-28"
      style={{ background: `${college.brandColor}06` }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <p
          className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: college.brandColor }}
        >
          Academics
        </p>
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-3xl font-light text-[var(--auf-navy)] md:text-4xl">
            Academic Programs
          </h2>
          <p className="text-sm text-[var(--auf-muted)]">
            {college.programs.length} program{college.programs.length !== 1 ? "s" : ""}{" "}
            offered — click any card to expand.
          </p>
        </div>

        <div className="space-y-12">
          {groups.map((group, gi) => (
            <div key={group.category ?? `ungrouped-${gi}`}>
              {group.category && (
                <p
                  className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: college.brandColor }}
                >
                  {group.category}
                </p>
              )}
              <div className="space-y-4">
                {group.programs.map((p, i) => (
                  <ProgramCard
                    key={p.id}
                    program={p}
                    brandColor={college.brandColor}
                    accentColor={college.accentColor}
                    index={i}
                    isOpen={openId === p.id}
                    onToggle={() => setOpenId((cur) => (cur === p.id ? null : p.id))}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
