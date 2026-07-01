import type { Metadata } from "next";
import { InnerPageHero } from "@/components/public/page-layout/inner-page-hero";
import { InnerPageGroupedSidebar } from "@/components/public/page-layout/inner-page-grouped-sidebar";
import { InnerPageMobileNav } from "@/components/public/page-layout/inner-page-mobile-nav";
import { EaOverview } from "@/components/public/external-affairs/ea-overview";
import { EaVisionMission } from "@/components/public/external-affairs/ea-vision-mission";
import { EaHistory } from "@/components/public/external-affairs/ea-history";
import { EaLeadership } from "@/components/public/external-affairs/ea-leadership";
import { EaOrgChart } from "@/components/public/external-affairs/ea-org-chart";
import { EaFacts } from "@/components/public/external-affairs/ea-facts";
import { EaRecognitions } from "@/components/public/external-affairs/ea-recognitions";
import { EaNews } from "@/components/public/external-affairs/ea-news";
import {
  eaHero,
  eaOverview,
  eaVisionMission,
  eaHistory,
  eaNews,
  eaLeadership,
  eaOrgChart,
  eaFactsFigures,
  eaRecognitions,
} from "@/data/external-affairs";
import type { GroupedSidebarGroup } from "@/components/public/page-layout/inner-page-grouped-sidebar";

export const metadata: Metadata = {
  title: "External Affairs",
  description:
    "AUF Office of External Affairs — managing government relations, industry partnerships, international linkages, and alumni relations.",
};

const NAV_ITEMS = [
  { id: "overview",            label: eaOverview.navLabel },
  { id: "vision-mission-goals", label: eaVisionMission.navLabel },
  { id: "history",             label: eaHistory.navLabel },
  { id: "leadership",          label: eaLeadership.navLabel },
  { id: "org-chart",           label: eaOrgChart.navLabel },
  { id: "facts-figures",       label: eaFactsFigures.navLabel },
  { id: "recognitions",        label: eaRecognitions.navLabel },
  { id: "news-events",         label: eaNews.navLabel },
];

const GROUPED_NAV_ITEMS: GroupedSidebarGroup[] = [
  {
    groupLabel: "About",
    brandColor: "var(--auf-navy)",
    items: [
      { id: "overview",            label: eaOverview.navLabel },
      { id: "vision-mission-goals", label: eaVisionMission.navLabel },
      { id: "history",             label: eaHistory.navLabel },
      { id: "leadership",          label: eaLeadership.navLabel },
      { id: "org-chart",           label: eaOrgChart.navLabel },
      { id: "facts-figures",       label: eaFactsFigures.navLabel },
      { id: "recognitions",        label: eaRecognitions.navLabel },
    ],
  },
  {
    groupLabel: "Updates",
    brandColor: "var(--auf-gold)",
    items: [
      { id: "news-events",         label: eaNews.navLabel },
    ],
  },
];

const EXTERNAL_LINKS = [
  { label: "Connect@AUF", href: "/external-affairs/connect" },
  { label: "Partnerships", href: "/external-affairs/partnerships" },
  { label: "International Students", href: "/external-affairs/international-students" },
  { label: "Testimonials", href: "/external-affairs/testimonials" },
];

export default function ExternalAffairsPage() {
  return (
    <>
      <InnerPageHero
        eyebrow={eaHero.eyebrow}
        title={eaHero.title}
        subtitle={eaHero.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "External Affairs" },
        ]}
      />

      <InnerPageMobileNav items={NAV_ITEMS} />

      {/* Mobile sub-page navigation buttons */}
      <div className="lg:hidden px-6 pt-4 flex flex-wrap gap-2">
        {EXTERNAL_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex items-center gap-1.5 rounded-full border border-navy/10 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-navy bg-white/70 backdrop-blur-sm hover:bg-navy hover:text-white transition-all shadow-sm group"
          >
            {link.label}
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        ))}
      </div>

      <div className="px-6 py-12 md:px-12 md:py-16">
        <div className="flex items-start gap-12 xl:gap-16">
          <InnerPageGroupedSidebar groups={GROUPED_NAV_ITEMS}>
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                Related Pages
              </p>
              <div className="flex flex-col gap-2">
                {EXTERNAL_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between rounded-lg border border-navy/10 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-navy transition-all hover:bg-navy hover:text-white hover:border-navy shadow-sm bg-white/50 backdrop-blur-sm group"
                  >
                    {link.label}
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </a>
                ))}
              </div>
            </div>
          </InnerPageGroupedSidebar>

          <div className="min-w-0 flex-1">
            <EaOverview overview={eaOverview} />
            <EaVisionMission vm={eaVisionMission} />
            <EaHistory history={eaHistory} />
            <EaLeadership leadership={eaLeadership} />
            <EaOrgChart orgChart={eaOrgChart} />
            <EaFacts factsFigures={eaFactsFigures} />
            <EaRecognitions recognitions={eaRecognitions} />
            <EaNews news={eaNews} />
          </div>
        </div>
      </div>
    </>
  );
}
