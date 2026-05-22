import type { Metadata } from "next";
import { InnerPageHero } from "@/components/public/page-layout/inner-page-hero";
import { InnerPageSidebar } from "@/components/public/page-layout/inner-page-sidebar";
import { InnerPageMobileNav } from "@/components/public/page-layout/inner-page-mobile-nav";
import { ResearchOverview } from "@/components/public/research/research-overview";
import { ResearchAbout } from "@/components/public/research/research-about";
import { ResearchVisionMission } from "@/components/public/research/research-vision-mission";
import { ResearchCenters } from "@/components/public/research/research-centers";
import { ResearchThrusts } from "@/components/public/research/research-thrusts";
import { ResearchServices } from "@/components/public/research/research-services";
import { ResearchGrants } from "@/components/public/research/research-grants";
import { ResearchArchive } from "@/components/public/research/research-archive";
import { ResearchNews } from "@/components/public/research/research-news";
import { ResearchDirectory } from "@/components/public/research/research-directory";
import {
  researchHero,
  researchOverview,
  researchAbout,
  researchVisionMission,
  researchCenters,
  researchThrusts,
  researchServices,
  researchGrants,
  researchArchive,
  researchNews,
  researchDirectory,
} from "@/data/research";
import type { SidebarItem } from "@/components/public/page-layout/inner-page-sidebar";

export const metadata: Metadata = {
  title: "Research",
  description:
    "AUF Research and Innovation — research centers, thrusts, grants, publications, and faculty directory.",
};

const NAV_ITEMS: SidebarItem[] = [
  { id: "overview",            label: researchOverview.navLabel },
  { id: "about-ovpri",         label: researchAbout.navLabel },
  { id: "vision-mission",      label: researchVisionMission.navLabel },
  { id: "research-centers",    label: researchCenters.navLabel },
  { id: "research-thrusts",    label: researchThrusts.navLabel },
  { id: "services-support",    label: researchServices.navLabel },
  { id: "grants-opportunities", label: researchGrants.navLabel },
  { id: "archive",             label: researchArchive.navLabel },
  { id: "news-events",         label: researchNews.navLabel },
  { id: "faculty-directory",   label: researchDirectory.navLabel },
];

export default function ResearchPage() {
  return (
    <>
      <InnerPageHero
        eyebrow={researchHero.eyebrow}
        title={researchHero.title}
        subtitle={researchHero.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Research" },
        ]}
      />

      <InnerPageMobileNav items={NAV_ITEMS} />

      <div className="px-6 py-12 md:px-12 md:py-16">
        <div className="flex items-start gap-12 xl:gap-16">
          <InnerPageSidebar items={NAV_ITEMS} />

          <div className="min-w-0 flex-1">
            <ResearchOverview overview={researchOverview} />
            <ResearchAbout about={researchAbout} />
            <ResearchVisionMission vm={researchVisionMission} />
            <ResearchCenters centers={researchCenters} />
            <ResearchThrusts thrusts={researchThrusts} />
            <ResearchServices services={researchServices} />
            <ResearchGrants grants={researchGrants} />
            <ResearchArchive archive={researchArchive} />
            {/* ResearchNews is async — fetches recent posts from DB */}
            <ResearchNews news={researchNews} />
            <ResearchDirectory directory={researchDirectory} />
          </div>
        </div>
      </div>
    </>
  );
}
