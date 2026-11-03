"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SustainabilityArticle } from "@/data/sustainability";
import { CoverOrSdg, SdgChip, TagPill, articleHref } from "./sustainability-card";

const GAP = 16;
const AUTOPLAY_MS = 6000;

export function SustainabilityCarousel({ articles }: { articles: SustainabilityArticle[] }) {
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [active, setActive] = useState(0);
  const count = articles.length;

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: i * (el.clientWidth + GAP), behavior: "smooth" });
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => goTo((active + dir + count) % count),
    [active, count, goTo],
  );

  useEffect(() => {
    if (count < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!paused.current) step(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count, step]);

  if (count === 0) return null;

  return (
    <div
      className="mb-10"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <div className="relative">
        {count > 1 && (
          <>
            <ArrowButton side="left" label="Previous story" onClick={() => step(-1)} />
            <ArrowButton side="right" label="Next story" onClick={() => step(1)} />
          </>
        )}
        <div
          ref={track}
          onScroll={(e) => {
            const el = e.currentTarget;
            setActive(Math.round(el.scrollLeft / (el.clientWidth + GAP)));
          }}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {articles.map((a) => (
            <Slide key={a.slug} article={a} />
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-4 flex justify-center gap-1.5">
          {articles.map((a, i) => (
            <button
              key={a.slug}
              type="button"
              aria-label={`Go to story ${i + 1}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-gold" : "w-2 bg-auf-border"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Slide({ article }: { article: SustainabilityArticle }) {
  return (
    <Link
      href={articleHref(article)}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid w-full shrink-0 snap-start overflow-hidden rounded-2xl border border-auf-border bg-white md:grid-cols-[1.2fr_1fr]"
    >
      <div className="flex h-72 items-center justify-center overflow-hidden bg-navy-deep md:h-80">
        {/* contain keeps posters uncropped */}
        <CoverOrSdg
          article={article}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-col justify-center gap-3 p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-navy/8 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-navy">
            {article.category}
          </span>
          {article.sdgs.map((n) => (
            <SdgChip key={n} num={n} />
          ))}
        </div>
        <h2 className="font-display text-xl font-semibold leading-snug text-navy md:text-2xl">
          {article.title}
        </h2>
        <p className="text-sm leading-relaxed text-auf-muted">{article.excerpt}</p>
        <div className="flex flex-wrap gap-1.5">
          {article.tags.map((t) => (
            <TagPill key={t}>{t}</TagPill>
          ))}
        </div>
        <span className="text-xs font-semibold text-navy group-hover:text-gold">Read the story &#8599;</span>
      </div>
    </Link>
  );
}

function ArrowButton({ side, label, onClick }: { side: "left" | "right"; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-auf-border bg-white text-navy shadow-md transition-colors hover:bg-navy hover:text-white ${side === "left" ? "-left-5" : "-right-5"}`}
    >
      {side === "left" ? "←" : "→"}
    </button>
  );
}
