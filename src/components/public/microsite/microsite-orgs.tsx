"use client";

import { useState } from "react";
import type { College } from "@/data/colleges";
import { SectionShell } from "./section-shell";

function OrgCard({
  org,
  brandColor,
}: {
  org: NonNullable<College["studentOrganizations"]>[number];
  brandColor: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-md"
      style={{ borderColor: `${brandColor}20` }}
    >
      {/* Header / trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-start gap-3 p-5 text-left"
      >
        {/* Coloured left bar */}
        <span
          className="mt-1 inline-block h-4 w-0.5 shrink-0 rounded-full"
          style={{ background: brandColor }}
          aria-hidden
        />

        <div className="flex flex-1 flex-col gap-1 min-w-0">
          {org.type && (
            <span
              className="inline-block w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{
                background: `${brandColor}12`,
                color: brandColor,
              }}
            >
              {org.type}
            </span>
          )}
          <h3 className="font-display text-base font-semibold leading-snug text-[var(--auf-navy)]">
            {org.name}
          </h3>
        </div>

        {/* Chevron */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--auf-muted)] transition-transform duration-200"
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

      {/* Expandable body */}
      {open && (org.description || org.advisor) && (
        <div
          className="border-t px-5 pb-5 pt-4"
          style={{ borderColor: `${brandColor}15` }}
        >
          {org.description && (
            <p className="text-sm leading-relaxed text-[var(--auf-muted)]">
              {org.description}
            </p>
          )}
          {org.advisor && (
            <p className="mt-3 text-xs text-[var(--auf-muted)]/70">
              Advisor:{" "}
              <span className="text-[var(--auf-text)]">{org.advisor}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function MicrositeOrgs({ college }: { college: College }) {
  if (!college.studentOrganizations?.length) return null;

  return (
    <SectionShell
      id="organizations"
      eyebrow="Campus life"
      title="Student Organizations"
      description="Student-led communities where Angeleneans pursue shared passions — academic, athletic, and service-oriented."
      brandColor={college.brandColor}
      tone="white"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {college.studentOrganizations.map((org) => (
          <OrgCard key={org.id} org={org} brandColor={college.brandColor} />
        ))}
      </div>
    </SectionShell>
  );
}
