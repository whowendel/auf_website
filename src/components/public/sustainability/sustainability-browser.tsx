"use client";

import { useMemo, useState } from "react";
import { getSdg } from "@/data/sdgs";
import type { SustainabilityArticle } from "@/data/sustainability";
import { SustainabilityCard } from "./sustainability-card";

const chip = (on: boolean) =>
  `rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
    on ? "border-navy bg-navy/5 text-navy" : "border-auf-border bg-white text-navy hover:border-navy"
  }`;

const tagChip = (on: boolean) =>
  `rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-colors before:mr-px before:opacity-50 before:content-['#'] ${
    on ? "border-gold bg-gold/10 text-[#8a6800]" : "border-auf-border bg-off-white text-auf-muted hover:border-gold"
  }`;

export function SustainabilityBrowser({ articles }: { articles: SustainabilityArticle[] }) {
  const [sdg, setSdg] = useState<number | null>(null);
  const [tag, setTag] = useState<string | null>(null);

  const sdgs = useMemo(() => [...new Set(articles.flatMap((a) => a.sdgs))].sort((a, b) => a - b), [articles]);
  const tags = useMemo(() => [...new Set(articles.flatMap((a) => a.tags))].sort(), [articles]);
  const shown = articles.filter(
    (a) => (sdg === null || a.sdgs.includes(sdg)) && (tag === null || a.tags.includes(tag)),
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 pb-3">
        <button type="button" className={chip(sdg === null)} onClick={() => setSdg(null)}>
          All goals
        </button>
        {sdgs.map((n) => (
          <button key={n} type="button" className={`flex items-center gap-2 ${chip(sdg === n)}`} onClick={() => setSdg(sdg === n ? null : n)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/assets/sdgs/${n}.png`} alt="" className="h-5 w-5 rounded-full object-cover" />
            {getSdg(n)?.title ?? `SDG ${n}`}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-1.5 border-b border-auf-border pb-6">
        <span className="mr-2 text-[10px] font-bold uppercase tracking-[0.2em] text-auf-muted/60">Topics</span>
        {tags.map((t) => (
          <button key={t} type="button" className={tagChip(tag === t)} onClick={() => setTag(tag === t ? null : t)}>
            {t}
          </button>
        ))}
      </div>

      <p className="mb-5 mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-auf-muted/50">
        {sdg === null && tag === null ? "Latest" : `${shown.length} ${shown.length === 1 ? "result" : "results"}`}
      </p>

      {shown.length === 0 ? (
        <p className="py-12 text-center text-sm text-auf-muted">No articles match these filters.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((a) => (
            <SustainabilityCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
