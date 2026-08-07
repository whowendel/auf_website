import { HeroSlider } from "@/components/public/hero/hero-slider";
import { StatsBar } from "@/components/public/sections/stats-bar";
import { VirtuesSection } from "@/components/public/sections/virtues-section";
import { CollegesSection } from "@/components/public/sections/colleges-section";
import { NewsSection } from "@/components/public/sections/news-section";
import { AccreditationsSection } from "@/components/public/sections/accreditations-section";
import { CtaSection } from "@/components/public/sections/cta-section";
import { VisionMissionSection } from "@/components/public/sections/vision-mission-section";
import { listPublishedUniversityPosts } from "@/server/services/posts";

export default async function HomePage() {
  let posts: Awaited<ReturnType<typeof listPublishedUniversityPosts>> = [];
  try {
    posts = await listPublishedUniversityPosts({ limit: 7 });
  } catch (err) {
    console.error("Failed to load university posts for home page:", err);
  }

  return (
    <>
      <HeroSlider />
      <StatsBar />
      <VirtuesSection />
      <CollegesSection />
      <NewsSection posts={posts} />
      <AccreditationsSection />
      <CtaSection />
      <VisionMissionSection />
    </>
  );
}
