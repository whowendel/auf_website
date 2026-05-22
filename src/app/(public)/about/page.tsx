import type { Metadata } from "next";
import { InnerPageHero } from "@/components/public/page-layout/inner-page-hero";
import { InnerPageSidebar } from "@/components/public/page-layout/inner-page-sidebar";
import { InnerPageMobileNav } from "@/components/public/page-layout/inner-page-mobile-nav";
import { AboutHistory } from "@/components/public/about/about-history";
import { AboutProfile } from "@/components/public/about/about-profile";
import { AboutRankings } from "@/components/public/about/about-rankings";
import { AboutFounder } from "@/components/public/about/about-founder";
import { AboutGovernance } from "@/components/public/about/about-governance";
import { AboutVisionMission } from "@/components/public/about/about-vision-mission";
import { AboutCoreValues } from "@/components/public/about/about-core-values";
import { AboutAttributes } from "@/components/public/about/about-attributes";
import { AboutLeadership } from "@/components/public/about/about-leadership";
import { AboutOrgChart } from "@/components/public/about/about-org-chart";
import {
  aboutHero,
  aboutHistory,
  aboutProfile,
  aboutRankings,
  aboutFounder,
  aboutGovernance,
  aboutVisionMission,
  aboutCoreValues,
  aboutAttributes,
  aboutLeadership,
  aboutOrgChart,
} from "@/data/about";
import type { SidebarItem } from "@/components/public/page-layout/inner-page-sidebar";

export const metadata: Metadata = {
  title: "About AUF",
  description: "Learn about Angeles University Foundation — our history, vision, mission, values, and leadership.",
};

// Sidebar + mobile nav items — derived from the section navLabels in about.json
const NAV_ITEMS: SidebarItem[] = [
  { id: "history",             label: aboutHistory.navLabel },
  { id: "profile",             label: aboutProfile.navLabel },
  { id: "rankings",            label: aboutRankings.navLabel },
  { id: "founder",             label: aboutFounder.navLabel },
  { id: "leadership",          label: aboutLeadership.navLabel },
  { id: "governance",          label: aboutGovernance.navLabel },
  { id: "vision-mission",      label: aboutVisionMission.navLabel },
  { id: "core-values",         label: aboutCoreValues.navLabel },
  { id: "graduate-attributes", label: aboutAttributes.navLabel },
  { id: "org-chart",           label: aboutOrgChart.navLabel }
];

export default function AboutPage() {
  return (
    <>
      <InnerPageHero
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        subtitle={aboutHero.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About AUF" }]}
      />

      <InnerPageMobileNav items={NAV_ITEMS} />

      <div className="px-6 py-12 md:px-12 md:py-16">
        <div className="flex items-start gap-12 xl:gap-16">
          <InnerPageSidebar items={NAV_ITEMS} />

          <div className="min-w-0 flex-1">
            <AboutHistory milestones={aboutHistory.milestones} />
            <AboutProfile profile={aboutProfile} />
            <AboutRankings rankings={aboutRankings} />
            <AboutFounder founder={aboutFounder} />
            <AboutLeadership leadership={aboutLeadership} />
            <AboutGovernance governance={aboutGovernance} />
            <AboutVisionMission visionMission={aboutVisionMission} />
            <AboutCoreValues virtues={aboutCoreValues.virtues} />
            <AboutAttributes attributes={aboutAttributes} />
            <AboutOrgChart orgChart={aboutOrgChart} />
          </div>
        </div>
      </div>
    </>
  );
}
