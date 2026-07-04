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

      {/* Responsive Visual Org Chart */}
      <div className="rounded-2xl border border-auf-border bg-off-white p-6 md:p-10 shadow-sm">
        <div className="flex flex-col items-center">
          
          {/* Level 1: Office of the President */}
          <div className="relative group flex flex-col items-center w-full max-w-sm">
            <div className="w-full rounded-xl border border-gold/40 bg-navy p-4 text-center shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:border-gold group-hover:shadow-lg">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-gold/80 block mb-1">
                Executive Leadership
              </span>
              <h3 className="font-display text-sm font-semibold text-white md:text-base">
                Office of the University President
              </h3>
              <p className="text-xs text-white/75 mt-1 font-medium">
                Atty. Joseph Emmanuel L. Angeles, Ph.D.
              </p>
            </div>
            
            {/* Vertical connector line */}
            <div className="h-10 w-0.5 bg-gold/30" />
          </div>

          {/* Level 2: Office of the VPEA */}
          <div className="relative group flex flex-col items-center w-full max-w-md">
            <div className="w-full rounded-xl border-2 border-gold bg-[#181E2C] p-5 text-center shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold block mb-1">
                Executive Administration
              </span>
              <h3 className="font-display text-base font-bold text-white md:text-lg">
                Office of the Vice President for External Affairs
              </h3>
              <p className="text-xs text-white/70 mt-1.5 leading-relaxed max-w-xs mx-auto">
                Direct oversight and strategic direction of the University's external relations, partnerships, and global networks.
              </p>
            </div>

            {/* Connecting line pattern for divisions */}
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
              <div className="w-full rounded-xl border border-navy/10 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-md">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-navy">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h4 className="font-display text-sm font-bold text-navy leading-snug">
                  Office of University Relations
                </h4>
                <p className="text-[11px] text-auf-muted mt-2 leading-relaxed">
                  Manages institutional marketing, public relations, brand identity, campus visits, and museum affairs.
                </p>
              </div>
              {/* Mobile spacer line to next unit */}
              <div className="md:hidden h-6 w-0.5 bg-gold/30" />
            </div>

            {/* Unit 2: Confucius Institute */}
            <div className="group relative flex flex-col items-center">
              {/* Mobile connector line */}
              <div className="md:hidden h-2 w-0.5 bg-gold/30 absolute -top-2" />
              <div className="w-full rounded-xl border border-navy/10 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-md">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-navy">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="font-display text-sm font-bold text-navy leading-snug">
                  Confucius Institute
                </h4>
                <p className="text-[11px] text-auf-muted mt-2 leading-relaxed">
                  Facilitates Chinese language instruction, cultural exchanges, educational programs, and local-global integrations.
                </p>
              </div>
              {/* Mobile spacer line to next unit */}
              <div className="md:hidden h-6 w-0.5 bg-gold/30" />
            </div>

            {/* Unit 3: Alumni Affairs */}
            <div className="group relative flex flex-col items-center">
              {/* Mobile connector line */}
              <div className="md:hidden h-2 w-0.5 bg-gold/30 absolute -top-2" />
              <div className="w-full rounded-xl border border-navy/10 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-md">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-navy">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h4 className="font-display text-sm font-bold text-navy leading-snug">
                  Alumni Affairs & Placement Services
                </h4>
                <p className="text-[11px] text-auf-muted mt-2 leading-relaxed">
                  Sustains lifelong connections with the global alumni network, drives placement services, and strengthens career programs.
                </p>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
