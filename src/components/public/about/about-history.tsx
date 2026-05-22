import type { HistoryMilestone } from "@/data/about";
import { Timeline } from "@/components/public/page-layout/timeline";

export function AboutHistory({ milestones }: { milestones: HistoryMilestone[] }) {
  return (
    <section id="history" className="scroll-mt-32 border-b border-auf-border pb-14 pt-2">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        Our story
      </p>
      <h2 className="mb-10 font-display text-2xl font-light text-navy md:text-3xl">
        History
      </h2>
      <Timeline items={milestones} />
    </section>
  );
}
