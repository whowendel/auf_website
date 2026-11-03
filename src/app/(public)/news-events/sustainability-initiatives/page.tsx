import type { Metadata } from "next";
import { InnerPageHero } from "@/components/public/page-layout/inner-page-hero";
import { SustainabilityBrowser } from "@/components/public/sustainability/sustainability-browser";
import { SustainabilityCarousel } from "@/components/public/sustainability/sustainability-carousel";
import { sustainabilityArticles, sustainabilityPath } from "@/data/sustainability";

const description =
  "Stories of how Angeles University Foundation advances the UN Sustainable Development Goals on campus and beyond.";

export const metadata: Metadata = {
  title: "Sustainability Initiatives",
  description,
  keywords: ["AUF", "Angeles University Foundation", "sustainability", "Sustainable Development Goals", "SDG"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Sustainability Initiatives",
  description,
  publisher: { "@type": "CollegeOrUniversity", name: "Angeles University Foundation" },
  hasPart: sustainabilityArticles.map((a) => ({
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    url: `${sustainabilityPath}/${a.slug}`,
    keywords: a.tags.join(", "),
  })),
};

export default function SustainabilityInitiativesPage() {
  const featured = sustainabilityArticles.filter((a) => a.featured);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <InnerPageHero
        eyebrow="News and Events"
        title="Sustainability Initiatives"
        subtitle={description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News and Events", href: "/news-events" },
          { label: "Sustainability Initiatives" },
        ]}
      />
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
        {featured.length > 0 && (
          <>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-auf-muted/50">Featured</p>
            <SustainabilityCarousel articles={featured} />
          </>
        )}
        <SustainabilityBrowser articles={sustainabilityArticles} />
      </div>
    </div>
  );
}
