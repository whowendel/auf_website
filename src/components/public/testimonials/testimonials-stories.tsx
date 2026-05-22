"use client";

import { useState } from "react";
import Image from "next/image";
import type { TestimonialsStories } from "@/data/testimonials";

const CATEGORIES = ["All", "Graduate", "Current Student"] as const;
type Category = (typeof CATEGORIES)[number];

export function TestimonialsStories({ stories }: { stories: TestimonialsStories }) {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All"
      ? stories.items
      : stories.items.filter((s) => s.category === active);

  return (
    <section id="student-stories" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {stories.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{stories.title}</h2>
      <p className="mb-8 text-sm leading-relaxed text-auf-muted">{stories.description}</p>

      {/* Category tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-1.5 text-[11px] font-semibold transition-colors ${
              active === cat
                ? "bg-navy text-white"
                : "border border-auf-border bg-white text-navy/60 hover:border-navy/30 hover:text-navy"
            }`}
          >
            {cat}
            {cat !== "All" && (
              <span className="ml-1.5 opacity-60">
                ({stories.items.filter((s) => s.category === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Quote grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="flex flex-col rounded-2xl border border-auf-border bg-white p-5"
          >
            {/* Category + college */}
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-navy/8 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-navy/60">
                {item.category}
              </span>
              <span className="flex h-6 w-9 items-center justify-center rounded bg-navy text-[9px] font-bold text-gold">
                {item.college}
              </span>
            </div>

            {/* Quote */}
            <div className="relative mb-5 flex-1">
              <span
                aria-hidden
                className="pointer-events-none absolute -top-1 -left-1 select-none font-display text-4xl font-bold leading-none text-gold/20"
              >
                &ldquo;
              </span>
              <p className="pt-3 text-sm leading-relaxed text-auf-muted italic">{item.quote}</p>
            </div>

            {/* Attribution */}
            <div className="flex items-center gap-3 border-t border-auf-border pt-4">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-navy">
                {item.photoUrl ? (
                  <Image src={item.photoUrl} alt={item.name} fill className="object-cover" sizes="36px" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-display text-[10px] font-bold text-gold">
                    {item.name === "TBA" ? "?" : item.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold text-navy">{item.name}</p>
                <p className="truncate text-[10px] text-auf-muted">{item.program} · {item.batch}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
