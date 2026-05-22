"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { College, Facility } from "@/data/colleges";
import { SectionShell } from "./section-shell";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Two-column facilities browser: a list of facility names on the left,
 * detailed view on the right. On mobile, the right view collapses below.
 */
export function MicrositeFacilities({ college }: { college: College }) {
  const facilities = college.facilities ?? [];
  const [activeId, setActiveId] = useState<string>(facilities[0]?.id ?? "");

  if (facilities.length === 0) return null;

  const active = facilities.find((f) => f.id === activeId) ?? facilities[0];

  return (
    <SectionShell
      id="facilities"
      eyebrow="On campus"
      title="Facilities"
      description="State-of-the-art learning spaces and laboratories built to support hands-on study, research, and collaboration."
      brandColor={college.brandColor}
      tone="tint"
    >
      <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
        {/* Facility list */}
        <nav className="space-y-1.5">
          {facilities.map((f, i) => {
            const isActive = f.id === active.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveId(f.id)}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all"
                style={{
                  borderColor: isActive ? college.brandColor : `${college.brandColor}20`,
                  background: isActive ? `${college.brandColor}10` : "white",
                }}
              >
                <span
                  className="font-display text-xs font-bold tabular-nums"
                  style={{ color: isActive ? college.brandColor : `${college.brandColor}60` }}
                >
                  0{i + 1}
                </span>
                <span
                  className="text-sm font-semibold leading-snug transition-colors"
                  style={{
                    color: isActive ? college.brandColor : "var(--auf-navy)",
                  }}
                >
                  {f.name}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Detail */}
        <AnimatePresence mode="wait">
          <FacilityDetail
            key={active.id}
            facility={active}
            brandColor={college.brandColor}
            accentColor={college.accentColor}
          />
        </AnimatePresence>
      </div>
    </SectionShell>
  );
}

function FacilityDetail({
  facility,
  brandColor,
  accentColor,
}: {
  facility: Facility;
  brandColor: string;
  accentColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -4 }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
      className="rounded-2xl bg-white p-6 md:p-8"
      style={{ border: `1px solid ${brandColor}20` }}
    >
      {/* Image or placeholder */}
      {facility.imageUrl ? (
        <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-xl">
          <Image
            src={facility.imageUrl}
            alt={facility.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
        </div>
      ) : (
        <div
          className="mb-6 flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}dd 100%)`,
          }}
        >
          <span
            className="font-display text-3xl font-bold opacity-30"
            style={{ color: accentColor }}
          >
            {facility.name}
          </span>
        </div>
      )}

      <h3 className="font-display text-xl font-semibold text-[var(--auf-navy)] md:text-2xl">
        {facility.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--auf-muted)] md:text-base">
        {facility.description}
      </p>

      {facility.features && facility.features.length > 0 && (
        <div className="mt-6 border-t pt-5" style={{ borderColor: `${brandColor}15` }}>
          <p
            className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color: brandColor }}
          >
            Features
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {facility.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--auf-text)]">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full"
                  style={{ background: accentColor }}
                />
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
