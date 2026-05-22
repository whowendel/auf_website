import type { Metadata } from "next";
import { InnerPageHero } from "@/components/public/page-layout/inner-page-hero";
import { InnerPageSidebar } from "@/components/public/page-layout/inner-page-sidebar";
import { InnerPageMobileNav } from "@/components/public/page-layout/inner-page-mobile-nav";
import { TestimonialsFeatured } from "@/components/public/testimonials/testimonials-featured";
import { TestimonialsStories } from "@/components/public/testimonials/testimonials-stories";
import { TestimonialsInternational } from "@/components/public/testimonials/testimonials-international";
import { TestimonialsParents } from "@/components/public/testimonials/testimonials-parents";
import { TestimonialsStats } from "@/components/public/testimonials/testimonials-stats";
import {
	testimonialsHero,
	testimonialsFeatured,
	testimonialsStories,
	testimonialsInternational,
	testimonialsParents,
	testimonialsStats,
} from "@/data/testimonials";
import type { SidebarItem } from "@/components/public/page-layout/inner-page-sidebar";

export const metadata: Metadata = {
	title: "Testimonials",
	description: "Read stories from AUF students, international learners, parents, and graduates, along with university highlights and results.",
};

const NAV_ITEMS: SidebarItem[] = [
	{ id: "featured-story", label: testimonialsFeatured.navLabel },
	{ id: "student-stories", label: testimonialsStories.navLabel },
	{ id: "international-voices", label: testimonialsInternational.navLabel },
	{ id: "parent-voices", label: testimonialsParents.navLabel },
	{ id: "by-the-numbers", label: testimonialsStats.navLabel },
];

export default function TestimonialsPage() {
	return (
		<>
			<InnerPageHero
				eyebrow={testimonialsHero.eyebrow}
				title={testimonialsHero.title}
				subtitle={testimonialsHero.subtitle}
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Testimonials" },
				]}
			/>

			<InnerPageMobileNav items={NAV_ITEMS} />

			<div className="px-6 py-12 md:px-12 md:py-16">
				<div className="flex items-start gap-12 xl:gap-16">
					<InnerPageSidebar items={NAV_ITEMS} />

					<div className="min-w-0 flex-1">
						<TestimonialsFeatured featured={testimonialsFeatured} />
						<TestimonialsStories stories={testimonialsStories} />
						<TestimonialsInternational international={testimonialsInternational} />
						<TestimonialsParents parents={testimonialsParents} />
						<TestimonialsStats stats={testimonialsStats} />
					</div>
				</div>
			</div>
		</>
	);
}
