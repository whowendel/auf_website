import Image from "next/image";
import type { ExternalAffairsLeadership } from "@/data/external-affairs";

export function EaLeadership({ leadership }: { leadership: ExternalAffairsLeadership }) {
  return (
    <section id="leadership" className="scroll-mt-32 border-b border-auf-border pb-14 pt-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {leadership.eyebrow}
      </p>
      <h2 className="mb-6 font-display text-2xl font-light text-navy md:text-3xl">
        {leadership.title}
      </h2>

      <p className="mb-10 text-sm leading-relaxed text-auf-muted md:text-base">
        {leadership.intro}
      </p>

      {/* Presidential Message Section */}
      <div className="rounded-2xl border border-auf-border bg-white p-6 shadow-sm md:p-10 after:table after:clear-both after:content-['']">
        <h3 className="mb-6 font-display text-xl font-semibold italic text-navy md:text-2xl">
          "{leadership.president.messageTitle}"
        </h3>

        {/* Portrait Card — floated left */}
        <div className="mb-6 mr-8 float-left w-full sm:w-64 shrink-0 text-center sm:text-left">
          <div className="relative mx-auto mb-4 aspect-[3/4] w-full max-w-[240px] sm:max-w-none overflow-hidden rounded-xl border-4 border-gold shadow-md">
            <Image
              src={leadership.president.image}
              alt={leadership.president.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 240px, 256px"
              priority
            />
          </div>
          <h4 className="font-display text-base font-bold text-navy leading-snug">
            {leadership.president.name}
          </h4>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gold mt-1">
            {leadership.president.title}
          </p>
        </div>

        {/* Presidential Message text */}
        <div className="space-y-4 text-sm leading-relaxed text-auf-muted md:text-base">
          {leadership.president.paragraphs.map((p, i) => (
            <p key={i}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
