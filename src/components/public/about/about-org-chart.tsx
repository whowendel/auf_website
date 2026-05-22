import Image from "next/image";
import Link from "next/link";
import type { AboutOrgChart } from "@/data/about";

export function AboutOrgChart({ orgChart }: { orgChart: AboutOrgChart }) {
  return (
    <section id="org-chart" className="scroll-mt-32 py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {orgChart.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">
        Organizational Charts
      </h2>

      {orgChart.description && (
        <p className="mb-10 text-sm leading-relaxed text-auf-muted md:text-base">
          {orgChart.description}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {orgChart.charts.map((chart) => (
          <div
            key={chart.id}
            className="group overflow-hidden rounded-2xl border border-auf-border bg-off-white"
          >
            {/* Image or placeholder */}
            {chart.imageUrl ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy">
                <Image
                  src={chart.imageUrl}
                  alt={chart.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              /* Placeholder when no image is provided */
              <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center bg-navy">
                <div className="auf-diamond-pattern absolute inset-0" />
                <div className="relative flex flex-col items-center gap-3 px-6 text-center">
                  {/* Stylised org chart icon */}
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    aria-hidden
                    className="opacity-25"
                  >
                    <rect x="16" y="2" width="16" height="10" rx="2" stroke="var(--auf-gold)" strokeWidth="2" />
                    <rect x="2" y="36" width="16" height="10" rx="2" stroke="var(--auf-gold)" strokeWidth="2" />
                    <rect x="30" y="36" width="16" height="10" rx="2" stroke="var(--auf-gold)" strokeWidth="2" />
                    <path d="M24 12V24M24 24H10V36M24 24H38V36" stroke="var(--auf-gold)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
                    Chart image coming soon
                  </p>
                </div>
              </div>
            )}

            {/* Card body */}
            <div className="p-5 md:p-6">
              <h3 className="font-display text-base font-semibold text-navy md:text-lg">
                {chart.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-auf-muted">{chart.description}</p>

              {chart.downloadUrl && (
                <Link
                  href={chart.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-auf-border bg-white px-4 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
                >
                  ↓ Download PDF
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      {orgChart.noteText && (
        <p className="mt-8 rounded-xl border border-auf-border bg-white px-5 py-3.5 text-xs leading-relaxed text-auf-muted">
          <span className="font-semibold text-navy">Note: </span>
          {orgChart.noteText}
        </p>
      )}
    </section>
  );
}
