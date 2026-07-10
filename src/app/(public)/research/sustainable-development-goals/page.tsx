import type { Metadata } from "next";
import Link from "next/link";
import { InnerPageHero } from "@/components/public/page-layout/inner-page-hero";
import { InnerPageSidebar } from "@/components/public/page-layout/inner-page-sidebar";
import { InnerPageMobileNav } from "@/components/public/page-layout/inner-page-mobile-nav";
import { SDG_LIST } from "@/data/sdgs";
import { prisma } from "@/lib/prisma";
import { PostStatus } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import { getCollegeById } from "@/data/colleges";
import type { SidebarItem } from "@/components/public/page-layout/inner-page-sidebar";

export const metadata: Metadata = {
  title: "Sustainable Development Goals",
  description:
    "Explore Angeles University Foundation's initiatives, researches, and community activities mapped against the United Nations Sustainable Development Goals (SDGs).",
};

type SdgPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  type: string;
  coverImageUrl: string | null;
  publishedAt: Date | null;
  originCollegeId: string | null;
  // Stored as a JSON array of SDG numbers (nullable); coerce before use.
  sdgs: number[] | null;
};

function SdgPostCard({ post }: { post: SdgPost }) {
  const college = post.originCollegeId ? getCollegeById(post.originCollegeId) : null;
  const href = post.originCollegeId
    ? `/c/${post.originCollegeId}/posts/${post.slug}`
    : `/posts/${post.slug}`;

  return (
    <div className="group flex gap-4 rounded-xl border border-auf-border bg-white p-3 transition-shadow hover:shadow-md">
      {post.coverImageUrl ? (
        <Link href={href} className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      ) : (
        <div className="flex h-20 w-28 shrink-0 items-center justify-center rounded-lg bg-navy/5 font-display text-lg font-bold text-navy/20">
          {post.type[0]}
        </div>
      )}
      <div className="min-w-0 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-navy/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-navy">
              {post.type}
            </span>
            {college && (
              <span
                className="rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: college.brandColor }}
              >
                {college.shortName}
              </span>
            )}
          </div>
          <Link href={href} className="mt-1 block">
            <h4 className="line-clamp-2 font-display text-xs font-semibold leading-tight text-navy transition-colors group-hover:text-navy/70">
              {post.title}
            </h4>
          </Link>
        </div>
        <span className="mt-1 block text-[9px] text-auf-muted/60">
          {post.publishedAt ? formatDate(post.publishedAt) : ""}
        </span>
      </div>
    </div>
  );
}

export default async function SustainableDevelopmentGoalsPage() {
  // Fetch all published posts
  const posts = (await prisma.post.findMany({
    where: {
      status: PostStatus.PUBLISHED,
      publishedAt: { lte: new Date() },
    },
    orderBy: {
      publishedAt: "desc",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      type: true,
      coverImageUrl: true,
      publishedAt: true,
      originCollegeId: true,
      sdgs: true,
    },
  })) as SdgPost[];

  // Map SDG list to sidebar navigation items
  const sidebarItems: SidebarItem[] = SDG_LIST.map((sdg) => ({
    id: `sdg-${sdg.number}`,
    label: `SDG ${sdg.number}: ${sdg.title}`,
  }));

  return (
    <>
      <InnerPageHero
        eyebrow="Research & Initiatives"
        title="Sustainable Development Goals"
        subtitle="Exploring AUF's research outputs, community initiatives, and institutional efforts mapped against the UN 2030 Agenda."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Research", href: "/research" },
          { label: "SDGs" },
        ]}
      />

      <InnerPageMobileNav items={sidebarItems} />

      <div className="px-6 py-12 md:px-12 md:py-16 bg-off-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-start gap-12 xl:gap-16">
            
            {/* Sidebar for SDGs */}
            <InnerPageSidebar items={sidebarItems}>
              <Link
                href="/research"
                className="inline-flex w-full items-center justify-between rounded-xl bg-navy/5 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-navy transition-all hover:bg-navy hover:text-white shadow-sm"
              >
                <span>← Back to Research</span>
              </Link>
            </InnerPageSidebar>

            {/* Main Content Pane */}
            <div className="min-w-0 flex-1 bg-white rounded-2xl border border-auf-border p-6 md:p-10 shadow-sm">
              <div className="mb-10 max-w-3xl">
                <h2 className="font-display text-2xl font-light text-navy md:text-3xl mb-4">
                  Commitment to the 2030 Agenda
                </h2>
                <p className="text-sm leading-relaxed text-auf-muted mb-3">
                  Angeles University Foundation is dedicated to contributing towards the achievement of the United Nations Sustainable Development Goals (SDGs). Through groundbreaking research projects, localized community extension programs, innovative classroom learning, and university-wide actions, different colleges and units drive sustainable impact.
                </p>
                <p className="text-sm leading-relaxed text-auf-muted">
                  Below you will find the active initiatives and publications categorized under each of the 17 global goals, showing the collective contributions of our colleges and university administration.
                </p>
              </div>

              {/* SDG Sections */}
              <div className="space-y-12">
                {SDG_LIST.map((sdg) => {
                  const sdgPosts = posts.filter((p) => (p.sdgs ?? []).includes(sdg.number));
                  const count = sdgPosts.length;

                  return (
                    <section
                      key={sdg.number}
                      id={`sdg-${sdg.number}`}
                      className="scroll-mt-32 border-t border-auf-border pt-12 first:border-t-0 first:pt-0"
                    >
                      {/* Section Header */}
                      <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
                        {/* SDG Icon */}
                        <div className="relative shrink-0 h-20 w-20 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`/assets/sdgs/${sdg.number}.png`}
                            alt={`SDG ${sdg.number}: ${sdg.title}`}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Title & Description */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span
                              className="rounded px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider"
                              style={{ backgroundColor: sdg.color }}
                            >
                              Goal {sdg.number}
                            </span>
                            <span className="text-xs font-semibold text-navy/40">
                              {count} {count === 1 ? "Initiative" : "Initiatives"}
                            </span>
                          </div>
                          <h3 className="font-display text-lg font-bold text-navy mb-2">
                            {sdg.title}
                          </h3>
                          <p className="text-xs leading-relaxed text-auf-muted">
                            {sdg.description}
                          </p>
                        </div>
                      </div>

                      {/* Section Initiatives */}
                      {count > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 mt-4">
                          {sdgPosts.map((post) => (
                            <SdgPostCard key={post.id} post={post} />
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs italic text-auf-muted/50 mt-2 pl-2 border-l-2 border-auf-border/40">
                          No active initiatives published under this goal at the moment.
                        </p>
                      )}
                    </section>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
