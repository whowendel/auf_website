import type { ExternalAffairsVisionMission } from "@/data/external-affairs";

export function EaVisionMission({ vm }: { vm: ExternalAffairsVisionMission }) {
  return (
    <section id="vision-mission-goals" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {vm.eyebrow}
      </p>
      <h2 className="mb-10 font-display text-2xl font-light text-navy md:text-3xl">
        {vm.title}
      </h2>

      {/* Vision + Mission */}
      <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <div className="mb-4 h-0.5 w-8 bg-gold" />
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Vision</p>
          <p className="font-display text-base font-light italic leading-relaxed text-navy md:text-lg">
            &ldquo;{vm.vision}&rdquo;
          </p>
        </div>
        <div>
          <div className="mb-4 h-0.5 w-8 bg-gold" />
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Mission</p>
          <p className="text-sm leading-relaxed text-auf-muted md:text-base">{vm.mission}</p>
        </div>
      </div>

      {/* Goals */}
      <div>
        <div className="mb-5 h-0.5 w-8 bg-gold" />
        <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Goals</p>
        <ol className="space-y-5">
          {vm.goals.map((goal) => (
            <li key={goal.id} className="flex items-start gap-4">
              <span
                className="mt-0.5 shrink-0 font-display text-xl font-semibold tabular-nums leading-tight text-navy/25"
                aria-hidden
              >
                {String(goal.number).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug text-navy md:text-base">
                  {goal.heading}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-auf-muted">{goal.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
