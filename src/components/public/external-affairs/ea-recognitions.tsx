import Image from "next/image";
import type { ExternalAffairsRecognitions } from "@/data/external-affairs";

export function EaRecognitions({ recognitions }: { recognitions: ExternalAffairsRecognitions }) {
  return (
    <section id="recognitions" className="scroll-mt-32 pb-14 pt-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {recognitions.eyebrow}
      </p>
      <h2 className="mb-6 font-display text-2xl font-light text-navy md:text-3xl">
        {recognitions.title}
      </h2>

      <p className="mb-10 text-sm leading-relaxed text-auf-muted md:text-base">
        {recognitions.intro}
      </p>

      {/* Grid of Accreditation Cards with Headers at Same Level */}
      <div className="space-y-10">
        
        {/* Card 1: QS World University Rankings */}
        <div className="rounded-2xl border border-auf-border bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
          {/* Header Area: Logo same level as reward heading (Enlarged QS Logo) */}
          <div className="flex items-center gap-4 md:gap-6 mb-6">
            <div className="relative h-20 w-32 md:h-24 md:w-44 shrink-0 flex items-center justify-center bg-white p-1.5 rounded-lg border border-auf-border shadow-sm">
              <Image
                src="/assets/intl_recog/qs-logo.svg"
                alt="QS World University Rankings Logo"
                fill
                className="object-contain p-1"
                sizes="(max-width: 768px) 128px, 176px"
                priority
              />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-navy md:text-2xl leading-tight">
                QS University Ranking: Asia
              </h3>
              <p className="text-[10px] md:text-[11px] font-bold text-gold uppercase tracking-wider mt-1">
                QS World University Rankings
              </p>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-auf-muted mb-8">
            Angeles University Foundation (AUF) has been listed in the QS Asia University Rankings since 2025, underscoring its sustained efforts to achieve international recognition through excellence in teaching, research, and global engagement.
          </p>

          {/* Results Lists organized by Year Heading */}
          <div className="space-y-8">
            
            {/* Year 2026 */}
            <div>
              <h4 className="font-display text-base font-bold text-navy border-b border-auf-border/60 pb-2 mb-4 tracking-wide uppercase">
                2026 Rankings
              </h4>
              <div className="grid gap-4 sm:grid-cols-2">
                
                {/* Asia Ranking Block */}
                <div className="flex flex-col md:flex-row items-center gap-5 p-4 rounded-xl border border-auf-border bg-off-white/30 hover:bg-off-white/50 transition-colors">
                  <div className="relative h-56 w-40 shrink-0 rounded-lg border-2 border-navy overflow-hidden shadow-sm">
                    <Image
                      src="/assets/intl_recog/QS WUR Asia 2026 badge-1.png"
                      alt="QS WUR Asia 2026 Badge"
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark block mb-1">
                      QS Asia University Rankings
                    </span>
                    <span className="font-display text-lg font-bold text-navy block">
                      1201-1300+ band
                    </span>
                  </div>
                </div>

                {/* SEA Ranking Block */}
                <div className="flex flex-col md:flex-row items-center gap-5 p-4 rounded-xl border border-auf-border bg-off-white/30 hover:bg-off-white/50 transition-colors">
                  <div className="relative h-56 w-40 shrink-0 rounded-lg border-2 border-navy overflow-hidden shadow-sm">
                    <Image
                      src="/assets/intl_recog/QS WUR SEA 2026 badge-1.png"
                      alt="QS WUR SEA 2026 Badge"
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark block mb-1">
                      QS South East Asia Rankings
                    </span>
                    <span className="font-display text-lg font-bold text-navy block">
                      #185
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Year 2025 */}
            <div>
              <h4 className="font-display text-base font-bold text-navy border-b border-auf-border/60 pb-2 mb-4 tracking-wide uppercase">
                2025 Rankings
              </h4>
              <div className="flex flex-col md:flex-row items-center gap-5 p-4 rounded-xl border border-auf-border bg-off-white/30">
                <div className="flex h-20 w-32 md:h-24 md:w-40 shrink-0 items-center justify-center rounded-lg bg-navy/5 border border-auf-border/40">
                  <span className="font-display text-xs font-black text-navy/40 uppercase tracking-wider">
                    QS Asia 2025
                  </span>
                </div>
                <div className="text-center md:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark block mb-1">
                    QS Asia University Rankings
                  </span>
                  <span className="font-display text-base font-bold text-navy">
                    901+ band
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Card 2: Times Higher Education (THE) Impact Rankings */}
        <div className="rounded-2xl border border-auf-border bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
          {/* Header Area: Logo same level as reward heading (Enlarged) */}
          <div className="flex items-center gap-4 md:gap-6 mb-6">
            <div className="relative h-20 w-32 md:h-24 md:w-44 shrink-0 flex items-center justify-center bg-white p-1.5 rounded-lg border border-auf-border shadow-sm">
              <Image
                src="/assets/intl_recog/THE Sustainability Impact Ratings 2026 cmyk logo_COL.jpg"
                alt="Times Higher Education Impact Rankings Logo"
                fill
                className="object-contain p-1"
                sizes="(max-width: 768px) 128px, 176px"
                priority
              />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-navy md:text-2xl leading-tight">
                Times Higher Education (THE) Impact Ranking
              </h3>
              <p className="text-[10px] md:text-[11px] font-bold text-gold uppercase tracking-wider mt-1">
                THE Impact Rankings
              </p>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-auf-muted mb-6">
            Angeles University Foundation (AUF) has participated in and been recognized by the Times Higher Education (THE) Impact Rankings since 2024, demonstrating its sustained commitment to excellence in teaching, research, community engagement, and the achievement of the United Nations Sustainable Development Goals (SDGs).
          </p>

          {/* Results Table */}
          <div className="overflow-hidden rounded-xl border border-auf-border">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy/5 text-navy font-bold uppercase tracking-wider border-b border-auf-border">
                <tr>
                  <th className="px-4 py-3 w-1/4">Year</th>
                  <th className="px-4 py-3">SDG & Ranking Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-auf-border text-auf-muted">
                
                {/* 2026 results with individual SDG icons */}
                <tr className="hover:bg-off-white/40 transition-colors bg-navy/[0.01]">
                  <td className="px-4 py-4 font-semibold text-navy align-top">2026</td>
                  <td className="px-4 py-4 text-auf-muted">
                    <div className="grid gap-3 sm:grid-cols-2">
                      
                      {/* SDG 3 */}
                      <div className="p-3 rounded-lg border border-gold/15 bg-gold/[0.02] flex items-center gap-3.5">
                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-md border border-auf-border bg-white shadow-sm">
                          <Image
                            src="/assets/sdgs/3.png"
                            alt="SDG 3 Logo"
                            fill
                            className="object-contain p-0.5"
                            sizes="64px"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-navy block text-[11px] sm:text-xs leading-tight truncate">SDG 3: Good Health & Well-being</span>
                          <span className="text-gold-dark font-bold text-xs sm:text-sm mt-1 block">Rank 301–400 (Score 63.7)</span>
                        </div>
                      </div>

                      {/* SDG 4 */}
                      <div className="p-3 rounded-lg border border-navy/5 bg-navy/[0.01] flex items-center gap-3.5">
                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-md border border-auf-border bg-white shadow-sm">
                          <Image
                            src="/assets/sdgs/4.png"
                            alt="SDG 4 Logo"
                            fill
                            className="object-contain p-0.5"
                            sizes="64px"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-navy block text-[11px] sm:text-xs leading-tight truncate">SDG 4: Quality Education</span>
                          <span className="text-navy/80 font-bold text-xs sm:text-sm mt-1 block">Rank 401–600 (Score 55.8)</span>
                        </div>
                      </div>

                      {/* SDG 5 */}
                      <div className="p-3 rounded-lg border border-navy/5 bg-navy/[0.01] flex items-center gap-3.5">
                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-md border border-auf-border bg-white shadow-sm">
                          <Image
                            src="/assets/sdgs/5.png"
                            alt="SDG 5 Logo"
                            fill
                            className="object-contain p-0.5"
                            sizes="64px"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-navy block text-[11px] sm:text-xs leading-tight truncate">SDG 5: Gender Equality</span>
                          <span className="text-navy/80 font-bold text-xs sm:text-sm mt-1 block">Rank 401–600 (Score 52.6)</span>
                        </div>
                      </div>

                      {/* SDG 11 */}
                      <div className="p-3 rounded-lg border border-gold/15 bg-gold/[0.02] flex items-center gap-3.5">
                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-md border border-auf-border bg-white shadow-sm">
                          <Image
                            src="/assets/sdgs/11.png"
                            alt="SDG 11 Logo"
                            fill
                            className="object-contain p-0.5"
                            sizes="64px"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-navy block text-[11px] sm:text-xs leading-tight truncate">SDG 11: Sustainable Cities & Communities</span>
                          <span className="text-gold-dark font-bold text-xs sm:text-sm mt-1 block">Rank 401–600 (Score 38.7)</span>
                        </div>
                      </div>

                    </div>
                  </td>
                </tr>
                
                {/* 2025 results with individual SDG icons */}
                <tr className="hover:bg-off-white/40 transition-colors">
                  <td className="px-4 py-4 font-semibold text-navy align-top">2025</td>
                  <td className="px-4 py-4 text-auf-muted">
                    <div className="grid gap-3 sm:grid-cols-2">
                      
                      {/* SDG 3 */}
                      <div className="p-3 rounded-lg border border-gold/15 bg-gold/[0.02] flex items-center gap-3.5">
                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-md border border-auf-border bg-white shadow-sm">
                          <Image
                            src="/assets/sdgs/3.png"
                            alt="SDG 3 Logo"
                            fill
                            className="object-contain p-0.5"
                            sizes="64px"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-navy block text-[11px] sm:text-xs leading-tight truncate">SDG 3: Good Health & Well-being</span>
                          <span className="text-gold-dark font-bold text-xs sm:text-sm mt-1 block">Rank 401–600</span>
                        </div>
                      </div>

                      {/* SDG 11 */}
                      <div className="p-3 rounded-lg border border-gold/15 bg-gold/[0.02] flex items-center gap-3.5">
                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-md border border-auf-border bg-white shadow-sm">
                          <Image
                            src="/assets/sdgs/11.png"
                            alt="SDG 11 Logo"
                            fill
                            className="object-contain p-0.5"
                            sizes="64px"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-navy block text-[11px] sm:text-xs leading-tight truncate">SDG 11: Sustainable Cities & Communities</span>
                          <span className="text-gold-dark font-bold text-xs sm:text-sm mt-1 block">Rank 601–800</span>
                        </div>
                      </div>

                      {/* SDG 4 */}
                      <div className="p-3 rounded-lg border border-navy/5 bg-navy/[0.01] flex items-center gap-3.5">
                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-md border border-auf-border bg-white shadow-sm">
                          <Image
                            src="/assets/sdgs/4.png"
                            alt="SDG 4 Logo"
                            fill
                            className="object-contain p-0.5"
                            sizes="64px"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-navy block text-[11px] sm:text-xs leading-tight truncate">SDG 4: Quality Education</span>
                          <span className="text-navy/80 font-bold text-xs sm:text-sm mt-1 block">Rank 801–1000</span>
                        </div>
                      </div>

                      {/* SDG 5 */}
                      <div className="p-3 rounded-lg border border-navy/5 bg-navy/[0.01] flex items-center gap-3.5">
                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-md border border-auf-border bg-white shadow-sm">
                          <Image
                            src="/assets/sdgs/5.png"
                            alt="SDG 5 Logo"
                            fill
                            className="object-contain p-0.5"
                            sizes="64px"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-navy block text-[11px] sm:text-xs leading-tight truncate">SDG 5: Gender Equality</span>
                          <span className="text-navy/80 font-bold text-xs sm:text-sm mt-1 block">Rank 801–1000</span>
                        </div>
                      </div>

                    </div>
                  </td>
                </tr>

                {/* 2024 results with individual SDG icons */}
                <tr className="hover:bg-off-white/40 transition-colors">
                  <td className="px-4 py-4 font-semibold text-navy align-top">2024</td>
                  <td className="px-4 py-4 text-auf-muted">
                    <div className="grid gap-3 sm:grid-cols-2">
                      
                      {/* SDG 3 */}
                      <div className="p-3 rounded-lg border border-gold/15 bg-gold/[0.02] flex items-center gap-3.5">
                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-md border border-auf-border bg-white shadow-sm">
                          <Image
                            src="/assets/sdgs/3.png"
                            alt="SDG 3 Logo"
                            fill
                            className="object-contain p-0.5"
                            sizes="64px"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-navy block text-[11px] sm:text-xs leading-tight truncate">SDG 3: Good Health & Well-being</span>
                          <span className="text-gold-dark font-bold text-xs sm:text-sm mt-1 block">Rank 401–600</span>
                        </div>
                      </div>

                      {/* SDG 1 */}
                      <div className="p-3 rounded-lg border border-navy/5 bg-navy/[0.01] flex items-center gap-3.5">
                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-md border border-auf-border bg-white shadow-sm">
                          <Image
                            src="/assets/sdgs/1.png"
                            alt="SDG 1 Logo"
                            fill
                            className="object-contain p-0.5"
                            sizes="64px"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-navy block text-[11px] sm:text-xs leading-tight truncate">SDG 1: No Poverty</span>
                          <span className="text-navy/80 font-bold text-xs sm:text-sm mt-1 block">Rank 1001+</span>
                        </div>
                      </div>

                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Card 3: ISO 21001:2018 Certification */}
        <div className="rounded-2xl border border-auf-border bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
          {/* Header Area: Logo same level as reward heading */}
          <div className="flex items-center gap-4 md:gap-6 mb-6">
            <div className="relative flex h-20 w-20 md:h-24 md:w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-deep border-4 border-gold shadow-md">
              <span className="font-display text-base md:text-xl font-black text-white text-center leading-tight">
                ISO<br/>
                <span className="text-[10px] md:text-[12px] text-gold font-bold">21001</span>
              </span>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-navy md:text-2xl leading-tight">
                ISO 21001:2018 Certification
              </h3>
              <p className="text-[10px] md:text-[11px] font-bold text-gold uppercase tracking-wider mt-1">
                TÜV SÜD Certified
              </p>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-auf-muted mb-6">
            Angeles University Foundation (AUF) has been officially certified with ISO 21001:2018, an international standard established by the International Organization for Standardization (ISO) for educational organizations.
          </p>

          <div className="rounded-xl border border-auf-border bg-off-white/40 p-4">
            <span className="font-bold uppercase tracking-wider text-[9px] block mb-1.5 text-navy/55">
              Accreditation Authority
            </span>
            <p className="text-xs font-semibold text-navy leading-normal">
              TÜV SÜD Philippines
            </p>
            <p className="text-xs text-auf-muted mt-1 leading-normal">
              Validity: 2025 onwards (ISO 21001:2018 Certification)
              {recognitions.items.find(i => i.no === 6)?.band && (
                <span className="block mt-1 font-bold text-navy/70">
                  · {recognitions.items.find(i => i.no === 6)?.band}
                </span>
              )}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
