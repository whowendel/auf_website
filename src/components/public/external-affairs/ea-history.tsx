import type { ExternalAffairsHistory } from "@/data/external-affairs";
import { Timeline } from "@/components/public/page-layout/timeline";

export function EaHistory({ history }: { history: ExternalAffairsHistory }) {
  return (
    <section id="history" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {history.eyebrow}
      </p>
      <h2 className="mb-10 font-display text-2xl font-light text-navy md:text-3xl">
        {history.title}
      </h2>
      <Timeline items={history.milestones} />
    </section>
  );
}
