import type {
  SustainabilityArticle,
  SustainabilityBlock,
  SustainabilityCell,
  SustainabilityImage,
  SustainabilityVideo,
} from "@/data/sustainability";
import { ArticleEmbed } from "./sustainability-embed";

const text = "text-base leading-8 text-gray-700";

/** Link label from its site, e.g. "Facebook post"; numbered only when a cell has several. */
function linkLabel(href: string, i: number, total: number) {
  const host = new URL(href).hostname.replace(/^(www|m)\./, "").split(".")[0];
  const site = host.charAt(0).toUpperCase() + host.slice(1);
  return total > 1 ? `${site} post ${i + 1}` : `${site} post`;
}

/** In the title column, a multi-line cell shows its first line bold and the rest as details. */
function Cell({ cell, titled }: { cell: SustainabilityCell; titled: boolean }) {
  if (typeof cell === "string") {
    const [first, ...rest] = cell.split("\n");
    if (!titled || !rest.length) return <span className="whitespace-pre-line">{cell}</span>;
    return (
      <span className="flex min-w-60 flex-col gap-1 md:min-w-72">
        <span className="font-semibold text-navy">{first}</span>
        <span className="whitespace-pre-line text-xs leading-5 text-auf-muted">{rest.join("\n")}</span>
      </span>
    );
  }
  return (
    <span className="flex flex-col items-start gap-1.5">
      {cell.text && <span className="whitespace-pre-line">{cell.text}</span>}
      {cell.links.map((href, i) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap rounded-full border border-auf-border bg-white px-3 py-1 text-xs font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
        >
          {linkLabel(href, i, cell.links.length)} &#8599;
        </a>
      ))}
    </span>
  );
}

function Table({ head, rows }: { head?: string[]; rows: SustainabilityCell[][] }) {
  const titleCol = head?.[0] === "#" ? 1 : 0;
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-auf-border">
      <table className={`w-full border-collapse text-left text-sm leading-6 ${(rows[0]?.length ?? 0) > 3 ? "min-w-[720px]" : ""}`}>
        {head && (
          <thead>
            <tr className="bg-navy text-white">
              {head.map((h, i) => (
                <th key={i} className={`px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider ${h === "#" ? "w-12" : ""}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-t border-auf-border align-top odd:bg-off-white first:border-t-0">
              {row.map((c, i) => (
                <td key={i} className={`px-5 py-4 text-gray-700 ${i === 0 && !head ? "font-semibold text-navy" : ""}`}>
                  <Cell cell={c} titled={i === titleCol} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const gridCols: Record<number, string> = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" };

/** Single photo keeps its shape; a group shares one crop ratio so rows line up. */
function Images({ images }: { images: SustainabilityImage[] }) {
  if (images.length === 1) {
    const [img] = images;
    return (
      <a href={img.src} target="_blank" rel="noopener noreferrer" className="mt-8 block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.src}
          alt={img.alt}
          width={img.w}
          height={img.h}
          loading="lazy"
          className="mx-auto h-auto max-h-144 w-auto max-w-full rounded-xl shadow-sm"
        />
      </a>
    );
  }
  const ratio = Math.min(1.6, Math.max(0.67, images.reduce((s, i) => s + i.w / i.h, 0) / images.length));
  return (
    <div className={`mt-8 grid gap-3 ${gridCols[images.length] ?? "sm:grid-cols-2"}`}>
      {images.map((img) => (
        <a key={img.src} href={img.src} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            width={img.w}
            height={img.h}
            loading="lazy"
            style={{ aspectRatio: ratio }}
            className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </a>
      ))}
    </div>
  );
}

function Blocks({ blocks }: { blocks: SustainabilityBlock[] }) {
  return blocks.map((b, i) => {
    switch (b.type) {
      case "p":
        return <p key={i} className={`mt-4 ${text}`}>{b.text}</p>;
      case "label":
        return <h4 key={i} className="mt-5 text-xs font-bold uppercase tracking-wider text-gold">{b.text}</h4>;
      case "list": {
        const List = b.ordered ? "ol" : "ul";
        return (
          <List key={i} className={`mt-3 space-y-2 pl-6 ${text} ${b.ordered ? "list-decimal" : "list-disc"} marker:text-gold`}>
            {b.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </List>
        );
      }
      case "table":
        return <Table key={i} head={b.head} rows={b.rows} />;
      case "terms":
        return (
          <dl key={i} className="mt-6 grid gap-3 sm:grid-cols-2">
            {b.items.map((t) => (
              <div key={t.term} className="rounded-xl border border-auf-border bg-off-white p-4">
                <dt className="font-display text-base font-semibold text-navy">{t.term}</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700">{t.text}</dd>
              </div>
            ))}
          </dl>
        );
      case "images":
        return <Images key={i} images={b.images} />;
      case "embed":
        return <ArticleEmbed key={i} src={b.src} title={b.title} inline={b.inline} preview={b.preview} />;
      case "group": {
        const title = <h3 className="font-display text-xl font-semibold leading-snug text-navy">{b.heading}</h3>;
        return b.collapsible ? (
          <details key={i} className="group mt-3 rounded-xl border border-auf-border px-5 py-3 open:pb-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              {title}
              <span aria-hidden className="text-gold transition-transform group-open:rotate-45">+</span>
            </summary>
            <Blocks blocks={b.blocks} />
          </details>
        ) : (
          <div key={i} className="mt-8">
            {title}
            <Blocks blocks={b.blocks} />
          </div>
        );
      }
    }
  });
}

/** Cover shows the whole image: contained, over a blurred copy of itself. */
export function ArticleCover({ img }: { img: SustainabilityImage }) {
  return (
    <div className="relative mx-auto -mt-10 max-w-5xl px-6">
      <div className="relative overflow-hidden rounded-2xl bg-navy-deep shadow-xl">
        <div
          aria-hidden
          className="absolute -inset-8 scale-110 bg-cover bg-center blur-2xl brightness-50"
          style={{ backgroundImage: `url(${img.src})` }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.src}
          alt={img.alt}
          width={img.w}
          height={img.h}
          className="relative mx-auto h-auto max-h-136 w-auto max-w-full object-contain"
        />
      </div>
    </div>
  );
}

/** Video in the cover slot; poster loads first, file only on play. */
export function ArticleVideo({ video }: { video: SustainabilityVideo }) {
  return (
    <div className="relative mx-auto -mt-10 max-w-5xl px-6">
      <video
        controls
        preload="none"
        poster={video.poster}
        aria-label={video.title}
        className="aspect-video w-full rounded-2xl bg-black shadow-xl"
      >
        <source src={video.src} type="video/mp4" />
      </video>
    </div>
  );
}

export function ArticleBody({ article }: { article: SustainabilityArticle }) {
  return (
    <>
      <div className="space-y-5 text-base leading-8 text-gray-700">
        {article.intro.map((p, i) => (
          <p key={i} className={i === 0 ? "text-lg leading-9 text-gray-800" : undefined}>
            {p}
          </p>
        ))}
      </div>

      {article.sections.map((s, si) => (
        <section key={s.heading || si} className={s.heading ? "mt-12" : "mt-6"}>
          {s.heading && <h2 className="font-display text-2xl font-semibold leading-snug text-navy">{s.heading}</h2>}
          {s.paragraphs.map((p, i) => (
            <p key={i} className={`mt-4 ${text}`}>
              {p}
            </p>
          ))}
          {s.bullets.length > 0 && (
            <ul className={`mt-4 list-disc space-y-2 pl-6 ${text} marker:text-gold`}>
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {s.images.length > 0 && <Images images={s.images} />}
          <Blocks blocks={s.blocks} />
        </section>
      ))}

      {article.closing && (
        <p className="mt-12 border-t border-auf-border pt-8 text-base leading-8 text-gray-700">{article.closing}</p>
      )}
    </>
  );
}
