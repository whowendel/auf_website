import type { Metadata } from "next";
import { InnerPageHero } from "@/components/public/page-layout/inner-page-hero";
import { InnerPageSidebar } from "@/components/public/page-layout/inner-page-sidebar";
import { InnerPageMobileNav } from "@/components/public/page-layout/inner-page-mobile-nav";
import { AdmissionsTesting } from "@/components/public/admissions/admissions-testing";
import { AdmissionsGuide } from "@/components/public/admissions/admissions-guide";
import { AdmissionsPrograms } from "@/components/public/admissions/admissions-programs";
import { AdmissionsCalendar } from "@/components/public/admissions/admissions-calendar";
import { AdmissionsScholarships } from "@/components/public/admissions/admissions-scholarships";
import { AdmissionsRegistrar } from "@/components/public/admissions/admissions-registrar";
import {
  admissionsHero,
  admissionsTesting,
  admissionsGuide,
  admissionsPrograms,
  admissionsCalendar,
  admissionsScholarships,
  admissionsRegistrar,
} from "@/data/admissions";
import type { SidebarItem } from "@/components/public/page-layout/inner-page-sidebar";

export const metadata: Metadata = {
  title: "Admissions",
  description: "AUF Admissions — testing dates, application guide, academic programs, scholarships, academic calendar, and registrar services.",
};

const NAV_ITEMS: SidebarItem[] = [
  { id: "testing-dates",      label: admissionsTesting.navLabel },
  { id: "application-guide",  label: admissionsGuide.navLabel },
  { id: "academic-programs",  label: admissionsPrograms.navLabel },
  { id: "academic-calendar",  label: admissionsCalendar.navLabel },
  { id: "scholarships-grants", label: admissionsScholarships.navLabel },
  { id: "university-registrar", label: admissionsRegistrar.navLabel },
];

export default function AdmissionsPage() {
  return (
    <>
      <InnerPageHero
        eyebrow={admissionsHero.eyebrow}
        title={admissionsHero.title}
        subtitle={admissionsHero.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Admissions" },
        ]}
      />

      <InnerPageMobileNav items={NAV_ITEMS} />

      <div className="px-6 py-12 md:px-12 md:py-16">
        <div className="flex items-start gap-12 xl:gap-16">
          <InnerPageSidebar items={NAV_ITEMS} />

          <div className="min-w-0 flex-1">
            <AdmissionsTesting testing={admissionsTesting} />
            <AdmissionsGuide guide={admissionsGuide} />
            <AdmissionsPrograms programs={admissionsPrograms} />
            <AdmissionsCalendar calendar={admissionsCalendar} />
            <AdmissionsScholarships scholarships={admissionsScholarships} />
            <AdmissionsRegistrar registrar={admissionsRegistrar} />
          </div>
        </div>
      </div>
    </>
  );
}
