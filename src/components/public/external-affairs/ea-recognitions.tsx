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

      {/* Grid of Accreditation Cards in HAU Format */}
      <div className="space-y-12">
        
        {/* Card 1: QS World University Rankings */}
        <div className="flex flex-col md:flex-row rounded-2xl border border-auf-border bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          {/* Left Column: Logo area */}
          <div className="md:w-60 shrink-0 border-b md:border-b-0 md:border-r border-auf-border bg-off-white/40 p-8 flex flex-col items-center justify-center text-center">
            {/* Custom Premium SVG/CSS Placeholder Logo */}
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-navy border-4 border-gold shadow-md">
              <span className="font-display text-2xl font-black text-gold tracking-tighter">QS</span>
              <div className="absolute -bottom-1 bg-gold px-2 py-0.5 rounded text-[8px] font-bold text-navy uppercase tracking-wider">
                Ranked
              </div>
            </div>
            <span className="text-[10px] font-bold text-navy/60 uppercase tracking-widest mt-4">
              Asia University
            </span>
          </div>

          {/* Right Column: Information & Results Table */}
          <div className="flex-1 p-6 md:p-8">
            <h3 className="font-display text-lg font-bold text-navy mb-3 md:text-xl">
              QS University Ranking: Asia
            </h3>
            <p className="text-xs leading-relaxed text-auf-muted mb-6">
              Angeles University Foundation (AUF) has been listed in the QS Asia University Rankings since 2025, underscoring its sustained efforts to achieve international recognition through excellence in teaching, research, and global engagement.
            </p>

            {/* Results Table */}
            <div className="overflow-hidden rounded-xl border border-auf-border">
              <table className="w-full text-left text-xs">
                <thead className="bg-navy/5 text-navy font-bold uppercase tracking-wider border-b border-auf-border">
                  <tr>
                    <th className="px-4 py-3 w-1/3">Year Implemented</th>
                    <th className="px-4 py-3">Rank / Band details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-auf-border text-auf-muted">
                  <tr className="hover:bg-off-white/40 transition-colors">
                    <td className="px-4 py-3 font-semibold text-navy">2026</td>
                    <td className="px-4 py-3 font-medium text-gold-dark">1201-1300+ band</td>
                  </tr>
                  <tr className="hover:bg-off-white/40 transition-colors">
                    <td className="px-4 py-3 font-semibold text-navy">2025</td>
                    <td className="px-4 py-3 font-medium text-gold-dark">901+ band</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Card 2: Times Higher Education (THE) Impact Rankings */}
        <div className="flex flex-col md:flex-row rounded-2xl border border-auf-border bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          {/* Left Column: Logo area */}
          <div className="md:w-60 shrink-0 border-b md:border-b-0 md:border-r border-auf-border bg-off-white/40 p-8 flex flex-col items-center justify-center text-center">
            {/* Embedded Logo Image */}
            <div className="relative w-full aspect-video md:aspect-square max-w-[160px] flex items-center justify-center bg-white p-2 rounded-xl border border-auf-border shadow-sm">
              <Image
                src="/assets/intl_recog/THE Sustainability Impact Ratings 2026 cmyk logo_COL.jpg"
                alt="Times Higher Education Impact Rankings Logo"
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 160px, 200px"
                priority
              />
            </div>
            <span className="text-[10px] font-bold text-navy/60 uppercase tracking-widest mt-4">
              THE Impact Rankings
            </span>
          </div>

          {/* Right Column: Information & Results Table */}
          <div className="flex-1 p-6 md:p-8">
            <h3 className="font-display text-lg font-bold text-navy mb-3 md:text-xl">
              Times Higher Education (THE) Impact Ranking
            </h3>
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
                  
                  {/* 2026 results */}
                  <tr className="hover:bg-off-white/40 transition-colors bg-navy/[0.01]">
                    <td className="px-4 py-4 font-semibold text-navy align-top">2026</td>
                    <td className="px-4 py-4 text-auf-muted">
                      <div className="grid gap-2 sm:grid-cols-2">
                        <div className="p-2.5 rounded-lg border border-gold/15 bg-gold/[0.02]">
                          <span className="font-semibold text-navy block text-[11px]">SDG 3: Good Health & Well-being</span>
                          <span className="text-gold-dark font-medium mt-0.5 block">Rank 301–400 (Score 63.7)</span>
                          <span className="text-[9px] text-auf-muted/70 mt-0.5 block">Up from 401–600 (Score 57.2)</span>
                        </div>
                        <div className="p-2.5 rounded-lg border border-navy/5 bg-navy/[0.01]">
                          <span className="font-semibold text-navy block text-[11px]">SDG 4: Quality Education</span>
                          <span className="text-navy/80 font-medium mt-0.5 block">Rank 401–600 (Score 55.8)</span>
                          <span className="text-[9px] text-auf-muted/70 mt-0.5 block">Up from 801–1000 (Score 46.6)</span>
                        </div>
                        <div className="p-2.5 rounded-lg border border-navy/5 bg-navy/[0.01]">
                          <span className="font-semibold text-navy block text-[11px]">SDG 5: Gender Equality</span>
                          <span className="text-navy/80 font-medium mt-0.5 block">Rank 401–600 (Score 52.6)</span>
                          <span className="text-[9px] text-auf-muted/70 mt-0.5 block">Up from 801–1000 (Score 42.5)</span>
                        </div>
                        <div className="p-2.5 rounded-lg border border-gold/15 bg-gold/[0.02]">
                          <span className="font-semibold text-navy block text-[11px]">SDG 11: Sustainable Cities & Communities</span>
                          <span className="text-gold-dark font-medium mt-0.5 block">Rank 401–600 (Score 38.7)</span>
                          <span className="text-[9px] text-auf-muted/70 mt-0.5 block">Up from 601–800 (Score 34.8)</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  {/* 2025 results */}
                  <tr className="hover:bg-off-white/40 transition-colors">
                    <td className="px-4 py-4 font-semibold text-navy align-top">2025</td>
                    <td className="px-4 py-4 text-auf-muted">
                      <ul className="space-y-1 pl-4 list-disc text-xs leading-normal">
                        <li><span className="font-semibold text-navy">SDG 3 (Good Health and Well-being)</span> – 401–600</li>
                        <li><span className="font-semibold text-navy">SDG 11 (Sustainable Cities and Communities)</span> – 601–800</li>
                        <li><span className="font-semibold text-navy">SDG 4 (Quality Education)</span> – 801–1000</li>
                        <li><span className="font-semibold text-navy">SDG 5 (Gender Equality)</span> – 801–1000</li>
                      </ul>
                    </td>
                  </tr>

                  {/* 2024 results */}
                  <tr className="hover:bg-off-white/40 transition-colors">
                    <td className="px-4 py-4 font-semibold text-navy align-top">2024</td>
                    <td className="px-4 py-4 text-auf-muted">
                      <ul className="space-y-1 pl-4 list-disc text-xs leading-normal">
                        <li><span className="font-semibold text-navy">SDG 1 (No Poverty)</span> – 1001+</li>
                        <li><span className="font-semibold text-navy">SDG 3 (Good Health and Well-being)</span> – 401–600</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Card 3: ISO 21001:2018 Certification */}
        <div className="flex flex-col md:flex-row rounded-2xl border border-auf-border bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          {/* Left Column: Logo area */}
          <div className="md:w-60 shrink-0 border-b md:border-b-0 md:border-r border-auf-border bg-off-white/40 p-8 flex flex-col items-center justify-center text-center">
            {/* Custom ISO Medallion Logo */}
            <div className="relative flex h-24 w-24 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-deep border-4 border-gold shadow-md">
              <span className="font-display text-base font-black text-white text-center leading-tight">
                ISO<br/>
                <span className="text-[10px] text-gold font-bold">21001</span>
              </span>
            </div>
            <span className="text-[9px] font-bold text-navy/60 uppercase tracking-widest mt-4">
              TÜV SÜD Certified
            </span>
          </div>

          {/* Right Column: Information & Details */}
          <div className="flex-1 p-6 md:p-8">
            <h3 className="font-display text-lg font-bold text-navy mb-3 md:text-xl">
              ISO 21001:2018
            </h3>
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
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
