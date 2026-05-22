import type { Metadata } from "next";
import { InnerPageHero } from "@/components/public/page-layout/inner-page-hero";
import { InnerPageSidebar } from "@/components/public/page-layout/inner-page-sidebar";
import { InnerPageMobileNav } from "@/components/public/page-layout/inner-page-mobile-nav";
import { CareersOverview } from "@/components/public/careers/careers-overview";
import { CareersServices } from "@/components/public/careers/careers-services";
import { CareersResources } from "@/components/public/careers/careers-resources";
import { CareersPartners } from "@/components/public/careers/careers-partners";
import { CareersOpenings } from "@/components/public/careers/careers-openings";
import { CareersEvents } from "@/components/public/careers/careers-events";
import { CareersContact } from "@/components/public/careers/careers-contact";
import {
  careersHero,
  careersOverview,
  careersServices,
  careersResources,
  careersPartners,
  careersOpenings,
  careersEvents,
  careersContact,
} from "@/data/careers";
import type { SidebarItem } from "@/components/public/page-layout/inner-page-sidebar";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "AUF Career Development Center — job placement, career counseling, OJT assistance, industry partners, job openings, and career events for students and graduates.",
};

const NAV_ITEMS: SidebarItem[] = [
  { id: "overview",          label: careersOverview.navLabel },
  { id: "career-services",   label: careersServices.navLabel },
  { id: "career-resources",  label: careersResources.navLabel },
  { id: "industry-partners", label: careersPartners.navLabel },
  { id: "job-openings",      label: careersOpenings.navLabel },
  { id: "career-events",     label: careersEvents.navLabel },
  { id: "contact-cdc",       label: careersContact.navLabel },
];

export default function CareersPage() {
  return (
    <>
      <InnerPageHero
        eyebrow={careersHero.eyebrow}
        title={careersHero.title}
        subtitle={careersHero.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers" },
        ]}
      />

      <InnerPageMobileNav items={NAV_ITEMS} />

      <div className="px-6 py-12 md:px-12 md:py-16">
        <div className="flex items-start gap-12 xl:gap-16">
          <InnerPageSidebar items={NAV_ITEMS} />

          <div className="min-w-0 flex-1">
            <CareersOverview overview={careersOverview} />
            <CareersServices services={careersServices} />
            <CareersResources resources={careersResources} />
            <CareersPartners partners={careersPartners} />
            <CareersOpenings openings={careersOpenings} />
            <CareersEvents events={careersEvents} />
            <CareersContact contact={careersContact} />
          </div>
        </div>
      </div>
    </>
  );
}
