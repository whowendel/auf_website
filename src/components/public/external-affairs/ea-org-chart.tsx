import Image from "next/image";
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

      <p className="mb-8 text-sm leading-relaxed text-auf-muted md:text-base">
        {orgChart.description}
      </p>

      {/* Org Chart Container with seamless background color */}
      <div className="relative rounded-2xl border border-auf-border bg-[#181E2C] p-4 sm:p-6 shadow-sm overflow-hidden flex justify-center items-center">
        <div className="relative w-full max-w-4xl aspect-[1189/800]">
          <Image
            src={orgChart.image}
            alt="Office of the Vice President for External Affairs Organizational Chart"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 1000px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
