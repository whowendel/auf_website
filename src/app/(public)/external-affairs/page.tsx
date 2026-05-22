import type { Metadata } from "next";
import { InnerPageHero } from "@/components/public/page-layout/inner-page-hero";
import { InnerPageSidebar } from "@/components/public/page-layout/inner-page-sidebar";
import { InnerPageMobileNav } from "@/components/public/page-layout/inner-page-mobile-nav";
import { EaOverview } from "@/components/public/external-affairs/ea-overview";
import { EaVisionMission } from "@/components/public/external-affairs/ea-vision-mission";
import { EaHistory } from "@/components/public/external-affairs/ea-history";
import { EaNews } from "@/components/public/external-affairs/ea-news";
import {
  eaHero,
  eaOverview,
  eaVisionMission,
  eaHistory,
  eaNews,
} from "@/data/external-affairs";
import type { SidebarItem } from "@/components/public/page-layout/inner-page-sidebar";

export const metadata: Metadata = {
  title: "External Affairs",
  description:
    "AUF Office of External Affairs — managing government relations, industry partnerships, international linkages, and alumni relations.",
};

const NAV_ITEMS: SidebarItem[] = [
  { id: "overview",            label: eaOverview.navLabel },
  { id: "vision-mission-goals", label: eaVisionMission.navLabel },
  { id: "news-events",         label: eaNews.navLabel },
  { id: "history",             label: eaHistory.navLabel },
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

      <div className="px-6 py-12 md:px-12 md:py-16">
        <div className="flex items-start gap-12 xl:gap-16">
          <InnerPageSidebar items={NAV_ITEMS} />

          <div className="min-w-0 flex-1">
            <EaOverview overview={eaOverview} />
            <EaVisionMission vm={eaVisionMission} />
            {/* EaNews is async (server-fetches posts) */}
            <EaNews news={eaNews} />
            <EaHistory history={eaHistory} />
          </div>
        </div>
      </div>
    </>
  );
}
