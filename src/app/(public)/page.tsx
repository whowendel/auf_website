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
  const posts = await listPublishedUniversityPosts({ limit: 7 });

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
