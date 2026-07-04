import type { ExternalAffairsOrgChart } from "@/data/external-affairs";

export function EaOrgChart({ orgChart }: { orgChart: ExternalAffairsOrgChart }) {
  return (
    <section id="org-chart" className="scroll-mt-32 border-b border-auf-border pb-14 pt-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {orgChart.eyebrow}
      </p>
      <h2 className="mb-6 font-display text-2xl font-light text-navy md:text-3xl">
        {orgChart.title}
      </h2>

      <p className="mb-10 text-sm leading-relaxed text-auf-muted md:text-base">
        {orgChart.description}
      </p>

      {/* Responsive Visual Org Chart matching Website theme */}
      <div className="rounded-2xl border border-auf-border bg-off-white p-6 md:p-10 shadow-sm">
        <div className="flex flex-col items-center">
          
          {/* Level 1: Office of the President */}
          <div className="relative group flex flex-col items-center w-full max-w-sm">
            <div className="w-full rounded-xl border border-navy/15 bg-white p-4 text-center shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-gold/60 group-hover:shadow-md">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-gold block mb-1">
                Executive Leadership
              </span>
              <h3 className="font-display text-sm font-bold text-navy md:text-base">
                Office of the University President
              </h3>
              <p className="text-xs text-auf-muted mt-1">
                Atty. Joseph Emmanuel L. Angeles, Ph.D.
              </p>
            </div>
            
            {/* Vertical connector line */}
            <div className="h-10 w-0.5 bg-gold/30" />
          </div>

          {/* Level 2: Office of the VPEA with Staff Assistant side-branch */}
          <div className="relative flex flex-col items-center w-full max-w-md">
            
            {/* VPEA Card */}
            <div className="w-full rounded-xl border-2 border-gold bg-white p-5 text-center shadow-md transition-all duration-300 hover:shadow-lg">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold block mb-1">
                Executive Administration
              </span>
              <h3 className="font-display text-base font-bold text-navy md:text-lg">
                Office of the Vice President for External Affairs
              </h3>
            </div>

            {/* Desktop Staff Assistant: Side-branch to the right */}
            <div className="hidden lg:flex absolute left-full ml-8 items-center h-full top-0">
              {/* Horizontal connector line */}
              <div className="w-8 h-0.5 bg-gold/30" />
              <div className="rounded-xl border border-navy/15 bg-white px-5 py-3 shadow-sm min-w-[160px] text-center transition-all duration-300 hover:border-gold/40">
                <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-gold block mb-0.5">
                  Support
                </span>
                <h4 className="font-display text-xs font-bold text-navy">
                  Staff Assistant
                </h4>
              </div>
            </div>

            {/* Mobile/Tablet Staff Assistant: Stacked underneath */}
            <div className="lg:hidden flex flex-col items-center">
              <div className="h-6 w-0.5 bg-gold/30" />
              <div className="rounded-xl border border-navy/15 bg-white px-5 py-3 shadow-sm w-60 text-center">
                <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-gold block mb-0.5">
                  Support
                </span>
                <h4 className="font-display text-xs font-bold text-navy">
                  Staff Assistant
                </h4>
              </div>
            </div>

            {/* Connecting lines for the bottom 3 division units */}
            {/* Desktop: horizontal bar + 3 vertical drop-lines */}
            <div className="hidden md:flex flex-col items-center w-full">
              <div className="h-8 w-0.5 bg-gold/30" />
              <div className="w-4/5 h-0.5 bg-gold/30" />
              <div className="flex justify-between w-4/5 h-8">
                <div className="w-0.5 bg-gold/30 h-full" />
                <div className="w-0.5 bg-gold/30 h-full" />
                <div className="w-0.5 bg-gold/30 h-full" />
              </div>
            </div>

            {/* Mobile: simple vertical line */}
            <div className="h-8 w-0.5 bg-gold/30 md:hidden" />
          </div>

          {/* Level 3: Division Units */}
          {/* Desktop grid layout / Mobile vertical stacked layout */}
          <div className="grid gap-6 md:grid-cols-3 md:gap-4 lg:gap-6 w-full max-w-5xl">
            
            {/* Unit 1: University Relations */}
            <div className="group relative flex flex-col items-center">
              {/* Mobile connector line */}
              <div className="md:hidden h-2 w-0.5 bg-gold/30 absolute -top-2" />
              <div className="w-full rounded-xl border border-navy/15 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-navy">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h4 className="font-display text-sm font-bold text-navy leading-snug">
                  Office of University Relations
                </h4>
              </div>
              {/* Mobile spacer line to next unit */}
              <div className="md:hidden h-6 w-0.5 bg-gold/30" />
            </div>

            {/* Unit 2: Confucius Institute */}
            <div className="group relative flex flex-col items-center">
              {/* Mobile connector line */}
              <div className="md:hidden h-2 w-0.5 bg-gold/30 absolute -top-2" />
              <div className="w-full rounded-xl border border-navy/15 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-navy">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="font-display text-sm font-bold text-navy leading-snug">
                  Confucius Institute
                </h4>
              </div>
              {/* Mobile spacer line to next unit */}
              <div className="md:hidden h-6 w-0.5 bg-gold/30" />
            </div>

            {/* Unit 3: Alumni Affairs */}
            <div className="group relative flex flex-col items-center">
              {/* Mobile connector line */}
              <div className="md:hidden h-2 w-0.5 bg-gold/30 absolute -top-2" />
              <div className="w-full rounded-xl border border-navy/15 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-navy">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h4 className="font-display text-sm font-bold text-navy leading-snug">
                  Alumni Affairs & Placement Services
                </h4>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
