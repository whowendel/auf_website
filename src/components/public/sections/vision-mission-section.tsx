"use client";

import { university } from "@/data/colleges";
import { PolicyAccordion } from "@/components/public/about/policy-accordion";

const POLICY_ITEMS = [
  {
    id: "quality",
    heading: "Quality Education",
    body: "Promoting quality education that generates knowledge, hones skills, inculcates sound values, and fosters love of God, country, and fellowmen.",
  },
  {
    id: "faculty",
    heading: "Competent Faculty & Facilities",
    body: "Providing competent and committed faculty, suitable facilities, and relevant curricular programs responsive to the dynamically changing local and international environment.",
  },
  {
    id: "graduates",
    heading: "Well-Rounded Graduates",
    body: "Producing graduates who are values-oriented, socially and ethically responsible, professionally competent, critical and creative thinkers, lifelong learners, and globally oriented.",
  },
  {
    id: "research",
    heading: "Research & Community Extension",
    body: "Initiating research and community extension projects that are geared toward societal transformation and the upliftment of communities.",
  },
  {
    id: "improvement",
    heading: "Continuous Improvement",
    body: "Continually improving all its programs, structures, systems, and processes to meet the needs and requirements of all its interested parties, both internal and external, to ensure that its services result in total customer care and satisfaction.",
  },
] as const;


export function VisionMissionSection() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">

          {/* Vision */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Our Vision
            </p>
            <h2 className="font-display text-2xl font-light leading-relaxed text-navy md:text-3xl">
              &ldquo;{university.vision}&rdquo;
            </h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {university.coreValues.map((v) => (
                <span
                  key={v}
                  className="rounded-full border border-(--auf-navy)/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-(--auf-navy)/60"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Mission + Quality Policy */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Our Mission
            </p>
            <p className="text-sm leading-relaxed text-auf-muted md:text-base">
              {university.mission}
            </p>

            <div className="mt-10">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                Quality Policy
              </p>
              <p className="text-xs leading-relaxed text-auf-muted">
                AUF is dedicated to becoming a leading higher education institution both
                locally and globally. Hence, AUF is committed to:
              </p>
              <PolicyAccordion items={POLICY_ITEMS} variant="light" className="mt-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
