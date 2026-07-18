import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollegeBySlug } from "@/data/colleges";
import { listPublishedPostsForCollege } from "@/server/services/posts";
import { MicrositeHeader } from "@/components/public/microsite/microsite-header";
import { MicrositeIdentity } from "@/components/public/microsite/microsite-identity";
import { MicrositeCoreValues } from "@/components/public/microsite/microsite-core-values";
import { MicrositeLearningOutcomes } from "@/components/public/microsite/microsite-learning-outcomes";
import { MicrositeNews } from "@/components/public/microsite/microsite-news";
import { MicrositePrograms } from "@/components/public/microsite/microsite-programs";
import { MicrositeCurriculum } from "@/components/public/microsite/microsite-curriculum";
import { MicrositeAdmissions } from "@/components/public/microsite/microsite-admissions";
import { MicrositeOrgs } from "@/components/public/microsite/microsite-orgs";
import { MicrositeFaculty } from "@/components/public/microsite/microsite-faculty";
import { MicrositeActivities } from "@/components/public/microsite/microsite-activities";
import { MicrositeAffiliations } from "@/components/public/microsite/microsite-affiliations";
import { MicrositeAccreditations } from "@/components/public/microsite/microsite-accreditations";
import { MicrositeFacilities } from "@/components/public/microsite/microsite-facilities";
import { MicrositeTopnotches } from "@/components/public/microsite/microsite-topnotches";
import { MicrositeCta } from "@/components/public/microsite/microsite-cta";
import { MicrositeContact } from "@/components/public/microsite/microsite-contact";
import { MicrositeFooter } from "@/components/public/microsite/microsite-footer";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college) return {};
  return {
    title: college.name,
    description: college.description,
    themeColor: college.brandColor,
  };
}

export default async function CollegeMicrositePage({ params }: Params) {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college || !college.isActive) notFound();

  const posts = await listPublishedPostsForCollege(college.id, { limit: 6 });

  return (
    <>
      {/* College-branded header (sits below the fixed SiteHeader) */}
      <MicrositeHeader college={college} />

      {/*
        Every section below is independently conditional — components return
        null when their JSON data is missing for this college. The order below
        defines the page flow.
      */}
      <MicrositeIdentity college={college} />
      <MicrositeCoreValues college={college} />
      <MicrositeLearningOutcomes college={college} />
      <MicrositeNews college={college} posts={posts} />
      <MicrositePrograms college={college} />
      <MicrositeCurriculum college={college} />
      <MicrositeAdmissions college={college} />
      <MicrositeOrgs college={college} />
      <MicrositeFaculty college={college} />
      <MicrositeActivities college={college} />
      <MicrositeAffiliations college={college} />
      <MicrositeAccreditations college={college} />
      <MicrositeFacilities college={college} />
      <MicrositeTopnotches college={college} />
      <MicrositeCta college={college} />
      <MicrositeContact college={college} />

      {/* College-branded footer (the public SiteFooter is auto-hidden on /c/*) */}
      {/* <MicrositeFooter college={college} /> */}
    </>
  );
}
