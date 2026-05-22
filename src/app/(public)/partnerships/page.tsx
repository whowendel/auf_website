import type { Metadata } from "next";
import { InnerPageHero } from "@/components/public/page-layout/inner-page-hero";
import { InnerPageSidebar } from "@/components/public/page-layout/inner-page-sidebar";
import { InnerPageMobileNav } from "@/components/public/page-layout/inner-page-mobile-nav";
import { PartnershipsGuidelines } from "@/components/public/partnerships/partnerships-guidelines";
import { PartnershipsForms } from "@/components/public/partnerships/partnerships-forms";
import { PartnershipsCurricular } from "@/components/public/partnerships/partnerships-curricular";
import { PartnershipsIndustry } from "@/components/public/partnerships/partnerships-industry";
import { PartnershipsNetworks } from "@/components/public/partnerships/partnerships-networks";
import {
  partnershipsHero,
  partnershipsGuidelines,
  partnershipsForms,
  partnershipsCurricular,
  partnershipsIndustry,
  partnershipsNetworks,
} from "@/data/partnerships";
import type { SidebarItem } from "@/components/public/page-layout/inner-page-sidebar";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "AUF Partnerships — guidelines on establishing collaboration with AUF, partnership forms, curricular partners, industry partners, and international network memberships.",
};

const NAV_ITEMS: SidebarItem[] = [
  { id: "guidelines",         label: partnershipsGuidelines.navLabel },
  { id: "forms",              label: partnershipsForms.navLabel },
  { id: "curricular-partners",label: partnershipsCurricular.navLabel },
  { id: "industry-partners",  label: partnershipsIndustry.navLabel },
  { id: "networks",           label: partnershipsNetworks.navLabel },
];

export default function PartnershipsPage() {
  return (
    <>
      <InnerPageHero
        eyebrow={partnershipsHero.eyebrow}
        title={partnershipsHero.title}
        subtitle={partnershipsHero.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Partnerships" },
        ]}
      />

      <InnerPageMobileNav items={NAV_ITEMS} />

      <div className="px-6 py-12 md:px-12 md:py-16">
        <div className="flex items-start gap-12 xl:gap-16">
          <InnerPageSidebar items={NAV_ITEMS} />

          <div className="min-w-0 flex-1">
            <PartnershipsGuidelines guidelines={partnershipsGuidelines} />
            <PartnershipsForms forms={partnershipsForms} />
            <PartnershipsCurricular curricular={partnershipsCurricular} />
            <PartnershipsIndustry industry={partnershipsIndustry} />
            <PartnershipsNetworks networks={partnershipsNetworks} />
          </div>
        </div>
      </div>
    </>
  );
}
