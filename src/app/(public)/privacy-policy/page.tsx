import type { Metadata } from "next";
import { InnerPageHero } from "@/components/public/page-layout/inner-page-hero";
import { InnerPageSidebar } from "@/components/public/page-layout/inner-page-sidebar";
import { InnerPageMobileNav } from "@/components/public/page-layout/inner-page-mobile-nav";
import { PrivacyOverviewSection } from "@/components/public/privacy-policy/privacy-overview";
import { PrivacyInformationCollectSection } from "@/components/public/privacy-policy/privacy-information-collect";
import { PrivacyHowWeUseSection } from "@/components/public/privacy-policy/privacy-how-we-use";
import { PrivacyInformationSharingSection } from "@/components/public/privacy-policy/privacy-information-sharing";
import { PrivacyCookiesSection } from "@/components/public/privacy-policy/privacy-cookies";
import { PrivacyStudentRecordsSection } from "@/components/public/privacy-policy/privacy-student-records";
import { PrivacyDataSecuritySection } from "@/components/public/privacy-policy/privacy-data-security";
import { PrivacyYourRightsSection } from "@/components/public/privacy-policy/privacy-your-rights";
import { PrivacyPolicyChangesSection } from "@/components/public/privacy-policy/privacy-policy-changes";
import { PrivacyContactDPOSection } from "@/components/public/privacy-policy/privacy-contact-dpo";
import {
  privacyHero,
  privacyOverview,
  privacyInformationCollect,
  privacyHowWeUse,
  privacyInformationSharing,
  privacyCookies,
  privacyStudentRecords,
  privacyDataSecurity,
  privacyYourRights,
  privacyPolicyChanges,
  privacyContactDPO,
} from "@/data/privacy-policy";
import type { SidebarItem } from "@/components/public/page-layout/inner-page-sidebar";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "AUF Privacy Policy — how Angeles University Foundation collects, uses, and protects your personal information in compliance with the Philippine Data Privacy Act (RA 10173).",
};

const NAV_ITEMS: SidebarItem[] = [
  { id: "overview", label: privacyOverview.navLabel },
  { id: "information-collect", label: privacyInformationCollect.navLabel },
  { id: "how-we-use", label: privacyHowWeUse.navLabel },
  { id: "information-sharing", label: privacyInformationSharing.navLabel },
  { id: "cookies", label: privacyCookies.navLabel },
  { id: "student-records", label: privacyStudentRecords.navLabel },
  { id: "data-security", label: privacyDataSecurity.navLabel },
  { id: "your-rights", label: privacyYourRights.navLabel },
  { id: "policy-changes", label: privacyPolicyChanges.navLabel },
  { id: "contact-dpo", label: privacyContactDPO.navLabel },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <InnerPageHero
        eyebrow={privacyHero.eyebrow}
        title={privacyHero.title}
        subtitle={privacyHero.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <InnerPageMobileNav items={NAV_ITEMS} />

      <div className="px-6 py-12 md:px-12 md:py-16">
        <div className="flex items-start gap-12 xl:gap-16">
          <InnerPageSidebar items={NAV_ITEMS} />

          <div className="min-w-0 flex-1">
            <PrivacyOverviewSection overview={privacyOverview} />
            <PrivacyInformationCollectSection data={privacyInformationCollect} />
            <PrivacyHowWeUseSection data={privacyHowWeUse} />
            <PrivacyInformationSharingSection data={privacyInformationSharing} />
            <PrivacyCookiesSection data={privacyCookies} />
            <PrivacyStudentRecordsSection data={privacyStudentRecords} />
            <PrivacyDataSecuritySection data={privacyDataSecurity} />
            <PrivacyYourRightsSection data={privacyYourRights} />
            <PrivacyPolicyChangesSection data={privacyPolicyChanges} />
            <PrivacyContactDPOSection data={privacyContactDPO} />
          </div>
        </div>
      </div>
    </>
  );
}
