import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InnerPageHero } from "@/components/public/page-layout/inner-page-hero";
import { ArticleBody, ArticleCover, ArticleVideo } from "@/components/public/sustainability/sustainability-article-body";
import { SdgChip, TagPill, articleHref } from "@/components/public/sustainability/sustainability-card";
import { getSdg } from "@/data/sdgs";
import { getSustainabilityArticle, shortText, sustainabilityArticles, sustainabilityPath } from "@/data/sustainability";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return sustainabilityArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = getSustainabilityArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: shortText(a.excerpt),
    keywords: [...a.tags, ...a.sdgs.map((n) => `SDG ${n} ${getSdg(n)?.title ?? ""}`.trim())],
    openGraph: { title: a.title, description: shortText(a.excerpt), images: a.cover ? [a.cover.src] : undefined },
  };
}

export default async function SustainabilityArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getSustainabilityArticle(slug);
  if (!article) notFound();

  const index = sustainabilityArticles.indexOf(article);
  const next = sustainabilityArticles[(index + 1) % sustainabilityArticles.length];
  const sdgLabels = article.sdgs.map((n) => `SDG ${n} ${getSdg(n)?.title ?? ""}`.trim());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: shortText(article.excerpt),
    image: article.cover?.src,
    video: article.video && {
      "@type": "VideoObject",
      name: article.video.title,
      thumbnailUrl: article.video.poster,
      contentUrl: article.video.src,
    },
    keywords: [...sdgLabels, ...article.tags].join(", "),
    publisher: { "@type": "CollegeOrUniversity", name: "Angeles University Foundation" },
    mainEntityOfPage: `${sustainabilityPath}/${article.slug}`,
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <InnerPageHero
        eyebrow="Sustainability Initiatives"
        title={article.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News and Events", href: "/news-events" },
          { label: "Sustainability Initiatives", href: sustainabilityPath },
        ]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3 pb-6 md:pb-8">
          {article.sdgs.map((n) => (
            <SdgChip key={n} num={n} large />
          ))}
        </div>
      </InnerPageHero>

      {article.draft && (
        <p className="bg-amber-100 px-6 py-2 text-center text-xs font-semibold text-amber-900">
          Draft: hidden in production. Remove &quot;draft&quot; in sustainability.json to publish.
          {article.sourceNote && <> Source note: {article.sourceNote}</>}
        </p>
      )}

      {article.video ? (
        <ArticleVideo video={article.video} />
      ) : (
        article.cover && <ArticleCover img={article.cover} />
      )}

      <article className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <ArticleBody article={article} />

        <div className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
          {sdgLabels.map((l) => (
            <TagPill key={l}>{l}</TagPill>
          ))}
          {article.tags.map((t) => (
            <TagPill key={t}>{t}</TagPill>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-auf-border pt-6">
          <Link
            href={sustainabilityPath}
            className="rounded-full border border-auf-border px-4 py-2 text-xs font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            &larr; All initiatives
          </Link>
          {next.slug !== article.slug && (
            <Link href={articleHref(next)} className="text-xs font-semibold text-navy hover:text-gold">
              Next: {next.title} &rarr;
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
