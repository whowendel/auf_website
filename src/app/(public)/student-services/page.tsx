import type { Metadata } from "next";
import { InnerPageHero } from "@/components/public/page-layout/inner-page-hero";
import { InnerPageMobileNav } from "@/components/public/page-layout/inner-page-mobile-nav";
import { InnerPageGroupedSidebar } from "@/components/public/page-layout/inner-page-grouped-sidebar";
import { ServicesGroupHeader } from "@/components/public/student-services/services-group-header";
import { StudentAffairsSection } from "@/components/public/student-services/student-service-affairs";
import { GuidanceSection } from "@/components/public/student-services/student-service-guidance";
import { HealthSection } from "@/components/public/student-services/student-service-health";
import { SportsSection } from "@/components/public/student-services/student-service-sports";
import { CultureSection } from "@/components/public/student-services/student-service-culture";
import { CCFPSection } from "@/components/public/student-services/student-service-ccfp";
import {
  servicesHero,
  officeNavItems,
  groupedNavItems,
  mabutiGroup,
  magalingGroup,
  malasakitGroup,
  studentAffairsOffice,
  guidanceOffice,
  healthOffice,
  sportsOffice,
  cultureOffice,
  ccfpOffice,
} from "@/data/student-services";

export const metadata: Metadata = {
  title: "Student Services",
  description: "AUF Student Services — supporting every Angelenean's academic, personal, and spiritual journey.",
};

export default function StudentServicesPage() {
  return (
    <>
      <InnerPageHero
        eyebrow={servicesHero.eyebrow}
        title={servicesHero.title}
        subtitle={servicesHero.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Student Services" },
        ]}
      />

      {/* Mobile nav — flat office list from student-services.ts */}
      <InnerPageMobileNav items={officeNavItems} />

      <div className="px-6 py-12 md:px-8 md:py-16">
        <div className="flex items-start gap-12 xl:gap-16">

          {/* Grouped sidebar — group labels as dividers */}
          <InnerPageGroupedSidebar groups={groupedNavItems} />

          <div className="min-w-0 flex-1">
            {/* ── Becoming Mabuti ──────────────────────────────── */}
            <ServicesGroupHeader group={mabutiGroup} />
            <StudentAffairsSection office={studentAffairsOffice} group={mabutiGroup} isFirst />
            <GuidanceSection office={guidanceOffice} group={mabutiGroup} isFirst={false} />

            {/* ── Becoming Magaling ────────────────────────────── */}
            <ServicesGroupHeader group={magalingGroup} />
            <HealthSection office={healthOffice} group={magalingGroup} isFirst />
            <SportsSection office={sportsOffice} group={magalingGroup} isFirst={false} />
            <CultureSection office={cultureOffice} group={magalingGroup} isFirst={false} />

            {/* ── Becoming May Malasakit ───────────────────────── */}
            <ServicesGroupHeader group={malasakitGroup} />
            <CCFPSection office={ccfpOffice} group={malasakitGroup} isFirst />
          </div>
        </div>
      </div>
    </>
  );
}
