"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { College } from "@/data/colleges";

const POST_TYPES = [
  { value: "",             label: "All Types" },
  { value: "NEWS",         label: "News" },
  { value: "BLOG",         label: "Blog" },
  { value: "ANNOUNCEMENT", label: "Announcements" },
] as const;

const TYPE_ACTIVE = "bg-navy text-white";
const TYPE_INACTIVE = "border border-auf-border bg-white text-navy/60 hover:border-navy/30 hover:text-navy";

export function NewsEventsFilter({
  colleges,
  totalCount,
}: {
  colleges: Pick<College, "id" | "shortName" | "name" | "brandColor">[];
  totalCount: number;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const currentCollege = params.get("college") ?? "";
  const currentType    = params.get("type") ?? "";

  const push = useCallback(
    (college: string, type: string) => {
      const sp = new URLSearchParams();
      if (college) sp.set("college", college);
      if (type)    sp.set("type", type);
      const qs = sp.toString();
      router.push(qs ? `/news-events?${qs}` : "/news-events", { scroll: false });
    },
    [router],
  );

  const selectedCollege = colleges.find((c) => c.id === currentCollege);

  return (
    <div className="sticky top-22 z-20 border-b border-auf-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">

          {/* Left: college selector */}
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* Color swatch for selected college */}
              {selectedCollege && (
                <span
                  className="pointer-events-none absolute left-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full"
                  style={{ background: selectedCollege.brandColor }}
                />
              )}
              <select
                value={currentCollege}
                onChange={(e) => push(e.target.value, currentType)}
                className={`h-9 cursor-pointer appearance-none rounded-lg border border-auf-border bg-white pr-8 text-[12px] font-semibold text-navy transition-colors focus:border-navy focus:outline-none ${selectedCollege ? "pl-7" : "pl-3"}`}
              >
                <option value="">All Colleges</option>
                {colleges.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.shortName} — {c.name}
                  </option>
                ))}
              </select>
              {/* Chevron */}
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-navy/40">
                ▾
              </span>
            </div>

            {/* Clear all filters */}
            {(currentCollege || currentType) && (
              <button
                type="button"
                onClick={() => push("", "")}
                className="text-[10px] font-semibold uppercase tracking-[0.12em] text-auf-muted/60 transition-colors hover:text-navy"
              >
                Clear
              </button>
            )}
          </div>

          {/* Center: type pills */}
          <div className="flex flex-wrap gap-1.5">
            {POST_TYPES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => push(currentCollege, value)}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${currentType === value ? TYPE_ACTIVE : TYPE_INACTIVE}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right: count */}
          <p className="shrink-0 text-[11px] text-auf-muted/60">
            <span className="font-semibold text-navy">{totalCount}</span>{" "}
            {totalCount === 1 ? "post" : "posts"}
          </p>
        </div>
      </div>
    </div>
  );
}
