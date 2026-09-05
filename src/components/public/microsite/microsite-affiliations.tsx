"use client";

import { useState } from "react";
import type { College } from "@/data/colleges";
import { SectionShell } from "./section-shell";

function AffiliationGroup({
  label,
  affiliations,
  brandColor,
  accentColor,
}: {
  label: string;
  affiliations: NonNullable<College["affiliations"]>;
  brandColor: string;
  accentColor: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-sm"
      style={{ borderColor: `${brandColor}25` }}
    >
      {/* Header / trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-bold uppercase tracking-wide text-white"
            style={{ background: brandColor }}
          >
            {label.charAt(0)}
          </span>
          <span className="font-display text-base font-semibold text-[var(--auf-navy)]">
            {label}
          </span>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums"
            style={{ background: `${brandColor}12`, color: brandColor }}
          >
            {affiliations.length}
          </span>
        </div>

        {/* Chevron */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 shrink-0 text-[var(--auf-muted)] transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Expandable list */}
      {open && (
        <ul className="divide-y px-5 pb-4" style={{ borderColor: `${brandColor}12` }}>
          {affiliations.map((aff) => {
            const inner = (
              <div className="flex items-start gap-3 py-3">
                <span
                  aria-hidden
                  className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: accentColor }}
                />
                <span className="text-sm leading-snug text-[var(--auf-text)]">
                  {aff.name}
                </span>
              </div>
            );

            return aff.website ? (
              <li key={aff.id}>
                <a
                  href={aff.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-opacity hover:opacity-75"
                >
                  {inner}
                </a>
              </li>
            ) : (
              <li key={aff.id}>{inner}</li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function MicrositeAffiliations({ college }: { college: College }) {
  if (!college.affiliations?.length) return null;

  // Group by type; ungrouped items fall under "General"
  const grouped = college.affiliations.reduce<
    Record<string, NonNullable<College["affiliations"]>>
  >((acc, aff) => {
    const key = aff.type ?? "General";
    if (!acc[key]) acc[key] = [];
    acc[key].push(aff);
    return acc;
  }, {});

  const groups = Object.entries(grouped);

  return (
    <SectionShell
      id="affiliations"
      eyebrow="Our network"
      title="Affiliations & Partnerships"
      description="Industry partners, professional bodies, and academic institutions we collaborate with to expand opportunities for our students."
      brandColor={college.brandColor}
      tone="white"
    >
      <div className="flex flex-col gap-3">
        {groups.map(([label, affs]) => (
          <AffiliationGroup
            key={label}
            label={label}
            affiliations={affs}
            brandColor={college.brandColor}
            accentColor={college.accentColor}
          />
        ))}
      </div>
    </SectionShell>
  );
}
