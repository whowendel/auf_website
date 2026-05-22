import type { Metadata } from "next";
import { InnerPageHero } from "@/components/public/page-layout/inner-page-hero";
import { InnerPageSidebar } from "@/components/public/page-layout/inner-page-sidebar";
import { InnerPageMobileNav } from "@/components/public/page-layout/inner-page-mobile-nav";
import { IntlOverview } from "@/components/public/international-students/intl-overview";
import { IntlWhyPhilippines } from "@/components/public/international-students/intl-why-philippines";
import { IntlAdmissions } from "@/components/public/international-students/intl-admissions";
import { IntlApply } from "@/components/public/international-students/intl-apply";
import { IntlVisa } from "@/components/public/international-students/intl-visa";
import { IntlSupport } from "@/components/public/international-students/intl-support";
import {
    intlHero,
    intlOverview,
    intlPhilippines,
    intlAdmissions,
    intlApply,
    intlVisa,
    intlSupport,
} from "@/data/international-students";
import type { SidebarItem } from "@/components/public/page-layout/inner-page-sidebar";

export const metadata: Metadata = {
    title: "International Students",
    description: "AUF International Students — learn why to choose AUF, review admission requirements, understand the visa process, and get support as an international student.",
};

const NAV_ITEMS: SidebarItem[] = [
    { id: "why-auf",                label: intlOverview.navLabel },
    { id: "why-philippines",        label: intlPhilippines.navLabel },
    { id: "admission-requirements", label: intlAdmissions.navLabel },
    { id: "how-to-apply",           label: intlApply.navLabel },
    { id: "visa-immigration",       label: intlVisa.navLabel },
    { id: "student-support",        label: intlSupport.navLabel },
];

export default function InternationalStudentsPage() {
    return (
        <>
            <InnerPageHero
                eyebrow={intlHero.eyebrow}
                title={intlHero.title}
                subtitle={intlHero.subtitle}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "International Students" },
                ]}
            />

            <InnerPageMobileNav items={NAV_ITEMS} />

            <div className="px-6 py-12 md:px-12 md:py-16">
                <div className="flex items-start gap-12 xl:gap-16">
                    <InnerPageSidebar items={NAV_ITEMS} />

                    <div className="min-w-0 flex-1">
                        <IntlOverview overview={intlOverview} />
                        <IntlWhyPhilippines philippines={intlPhilippines} />
                        <IntlAdmissions admissions={intlAdmissions} />
                        <IntlApply apply={intlApply} />
                        <IntlVisa visa={intlVisa} />
                        <IntlSupport support={intlSupport} />
                    </div>
                </div>
            </div>
        </>
    );
}
