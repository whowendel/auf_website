import type { Metadata } from "next";
import { InnerPageHero } from "@/components/public/page-layout/inner-page-hero";
import { InnerPageSidebar } from "@/components/public/page-layout/inner-page-sidebar";
import { InnerPageMobileNav } from "@/components/public/page-layout/inner-page-mobile-nav";
import { AlumniOverview } from "@/components/public/alumni/alumni-overview";
import { AlumniAssociation } from "@/components/public/alumni/alumni-association";
import { AlumniNotable } from "@/components/public/alumni/alumni-notable";
import { AlumniBenefits } from "@/components/public/alumni/alumni-benefits";
import { AlumniEvents } from "@/components/public/alumni/alumni-events";
import { AlumniConnect } from "@/components/public/alumni/alumni-connect";
import {
  alumniHero,
  alumniOverview,
  alumniAssociation,
  alumniNotable,
  alumniBenefits,
  alumniEvents,
  alumniConnect,
} from "@/data/alumni";
import type { SidebarItem } from "@/components/public/page-layout/inner-page-sidebar";

export const metadata: Metadata = {
  title: "Alumni",
  description:
    "AUF Alumni — stay connected with your alma mater, explore alumni benefits, meet distinguished graduates, and get involved with the AUFAA.",
};

const NAV_ITEMS: SidebarItem[] = [
  { id: "overview",           label: alumniOverview.navLabel },
  { id: "alumni-association", label: alumniAssociation.navLabel },
  { id: "distinguished-alumni", label: alumniNotable.navLabel },
  { id: "alumni-benefits",    label: alumniBenefits.navLabel },
  { id: "alumni-events",      label: alumniEvents.navLabel },
  { id: "stay-connected",     label: alumniConnect.navLabel },
];

export default function AlumniPage() {
  return (
    <>
      <InnerPageHero
        eyebrow={alumniHero.eyebrow}
        title={alumniHero.title}
        subtitle={alumniHero.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni" },
        ]}
      />

      <InnerPageMobileNav items={NAV_ITEMS} />

      <div className="px-6 py-12 md:px-12 md:py-16">
        <div className="flex items-start gap-12 xl:gap-16">
          <InnerPageSidebar items={NAV_ITEMS} />

          <div className="min-w-0 flex-1">
            <AlumniOverview overview={alumniOverview} />
            <AlumniAssociation association={alumniAssociation} />
            <AlumniNotable notable={alumniNotable} />
            <AlumniBenefits benefits={alumniBenefits} />
            <AlumniEvents events={alumniEvents} />
            <AlumniConnect connect={alumniConnect} />
          </div>
        </div>
      </div>
    </>
  );
}
