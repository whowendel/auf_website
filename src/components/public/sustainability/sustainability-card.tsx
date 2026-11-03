import Link from "next/link";
import { getSdg } from "@/data/sdgs";
import { sustainabilityPath, type SustainabilityArticle } from "@/data/sustainability";

export function SdgChip({ num }: { num: number }) {
  const sdg = getSdg(num);
  return (
    <span
      className="inline-block shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold text-white"
      style={{ backgroundColor: sdg?.color ?? "var(--auf-gold)" }}
      title={sdg?.title}
    >
      SDG {num}
    </span>
  );
}

export function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-auf-border bg-off-white px-2 py-px text-[9px] font-semibold text-auf-muted before:mr-px before:opacity-50 before:content-['#']">
      {children}
    </span>
  );
}

export function articleHref(a: SustainabilityArticle) {
  return `${sustainabilityPath}/${a.slug}`;
}

export function SustainabilityCard({ article }: { article: SustainabilityArticle }) {
  const color = getSdg(article.sdgs[0])?.color ?? "var(--auf-gold)";
  return (
    <Link
      href={articleHref(article)}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-auf-border bg-white transition-shadow hover:shadow-md"
    >
      <div className="h-1 w-full shrink-0" style={{ background: color }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={article.cover.src}
        alt={article.cover.alt}
        loading="lazy"
        className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-navy/8 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-navy">
            {article.category}
          </span>
          {article.sdgs.map((n) => (
            <SdgChip key={n} num={n} />
          ))}
        </div>
        <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug text-navy transition-colors group-hover:text-navy/70">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-auf-muted">{article.excerpt}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {article.tags.map((t) => (
            <TagPill key={t}>{t}</TagPill>
          ))}
        </div>
      </div>
    </Link>
  );
}
