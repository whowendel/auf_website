import Image from "next/image";
import type { ResearchDirectory } from "@/data/research";
import { DownloadableFormList } from "@/components/public/page-layout/downloadable-form-list";

export function ResearchDirectory({ directory }: { directory: ResearchDirectory }) {
  return (
    <section id="faculty-directory" className="scroll-mt-32 py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {directory.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{directory.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{directory.description}</p>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* A — Downloadable Forms */}
        <div>
          <div className="mb-5 flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">A</span>
            <h3 className="font-display text-base font-semibold text-navy">Downloadable Forms</h3>
          </div>
          <DownloadableFormList forms={directory.downloadableForms} accentColor="var(--auf-navy)" />
        </div>

        {/* B — Featured Researchers */}
        <div>
          <div className="mb-5 flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">B</span>
            <h3 className="font-display text-base font-semibold text-navy">Featured Researchers</h3>
          </div>
          <div className="space-y-4">
            {directory.featuredResearchers.map((researcher) => (
              <div
                key={researcher.id}
                className="flex items-start gap-4 rounded-xl border border-auf-border bg-white p-4"
              >
                {/* Avatar */}
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-navy">
                  {researcher.photoUrl ? (
                    <Image
                      src={researcher.photoUrl}
                      alt={researcher.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-xs font-bold text-gold">
                      {researcher.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-navy">
                    {researcher.name}
                    {researcher.title && researcher.title !== "TBA" && (
                      <span className="ml-1 text-[10px] font-normal text-auf-muted">{researcher.title}</span>
                    )}
                  </p>
                  <p className="text-[10px] text-auf-muted">{researcher.college}</p>
                  <p
                    className="mt-1 text-xs font-medium"
                    style={{ color: "var(--auf-gold)" }}
                  >
                    {researcher.specialization}
                  </p>
                  {researcher.researchHighlights && researcher.researchHighlights.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {researcher.researchHighlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[10px] text-auf-muted">
                          <span aria-hidden className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full bg-navy/30" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
