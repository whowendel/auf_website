import type { Metadata } from "next";
import { InnerPageHero } from "@/components/public/page-layout/inner-page-hero";
import { InnerPageSidebar } from "@/components/public/page-layout/inner-page-sidebar";
import { InnerPageMobileNav } from "@/components/public/page-layout/inner-page-mobile-nav";
import { ConnectCampuses } from "@/components/public/connect/connect-campuses";
import { ConnectDirectory } from "@/components/public/connect/connect-directory";
import {
  connectHero,
  connectCampuses,
  connectDirectory,
} from "@/data/connect";
import type { SidebarItem } from "@/components/public/page-layout/inner-page-sidebar";

export const metadata: Metadata = {
  title: "Connect@AUF",
  description:
    "AUF Campuses and University Directory — find campus locations, offices, academic units, and the right contact for your inquiry.",
};

const NAV_ITEMS: SidebarItem[] = [
  { id: "campuses",  label: connectCampuses.navLabel },
  { id: "directory", label: connectDirectory.navLabel },
];

export default function ConnectPage() {
  return (
    <>
      <InnerPageHero
        eyebrow={connectHero.eyebrow}
        title={connectHero.title}
        subtitle={connectHero.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Connect@AUF" },
        ]}
      />

      <InnerPageMobileNav items={NAV_ITEMS} />

      <div className="px-6 py-12 md:px-12 md:py-16">
        <div className="flex items-start gap-12 xl:gap-16">
          <InnerPageSidebar items={NAV_ITEMS} />

          <div className="min-w-0 flex-1">
            <ConnectCampuses campuses={connectCampuses} />
            <ConnectDirectory directory={connectDirectory} />
          </div>
        </div>
      </div>
    </>
  );
}
