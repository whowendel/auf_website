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

/** Cover photo, or an SDG-colored block with the goal icon when the article has no photo. */
export function CoverOrSdg({ article, className }: { article: SustainabilityArticle; className: string }) {
  if (article.cover) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={article.cover.src} alt={article.cover.alt} loading="lazy" className={className} />;
  }
  const n = article.sdgs[0];
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ background: getSdg(n)?.color }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/assets/sdgs/${n}.png`} alt="" className="h-24 w-24 rounded-xl shadow-lg" />
    </div>
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
      <div className="overflow-hidden">
        <CoverOrSdg
          article={article}
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
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
