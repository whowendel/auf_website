import { Mail, ExternalLink, Phone } from "lucide-react";
import type { ConnectDirectory } from "@/data/connect";

export function ConnectDirectory({ directory }: { directory: ConnectDirectory }) {
  return (
    <section id="directory" className="scroll-mt-32 py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {directory.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{directory.title}</h2>
      <p className="mb-4 text-sm leading-relaxed text-auf-muted">{directory.description}</p>

      {/* Trunk line callout */}
      <div className="relative mb-10 overflow-hidden rounded-xl bg-navy px-5 py-4">
        <div className="auf-diamond-pattern absolute inset-0 pointer-events-none" aria-hidden />
        <div className="relative flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold/70">
            Main Trunk Line
          </span>
          <a
            href={`tel:${directory.trunkline}`}
            className="font-display text-xl font-light text-white transition-colors hover:text-gold"
          >
            {directory.trunkline}
          </a>
          <span className="text-xs text-white/50">{directory.trunklineNote}</span>
        </div>
      </div>

      {/* ── A: General Inquiries ── */}
      <div className="mb-12">
        <div className="mb-5 flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
            A
          </span>
          <h3 className="font-display text-base font-semibold text-navy">General Inquiries</h3>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-xl border border-auf-border md:block">
          <table className="w-full text-sm">
            <thead className="border-b border-auf-border bg-off-white">
              <tr>
                {[
                  "Nature of Inquiry",
                  "Office to Contact",
                  "Email Address",
                  "Facebook",
                  "Telephone",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-navy/50"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {directory.generalInquiries.map((row) => (
                <tr key={row.id} className="border-b border-auf-border last:border-0 hover:bg-off-white/60">
                  <td className="px-4 py-3 text-sm font-medium text-navy">{row.inquiry}</td>
                  <td className="px-4 py-3 text-sm text-auf-muted">{row.office}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`mailto:${row.email}`}
                      className="flex items-center gap-1.5 text-sm text-auf-muted transition-colors hover:text-navy"
                    >
                      <Mail className="h-3 w-3 shrink-0 text-gold" strokeWidth={2} />
                      {row.email}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    {row.facebook ? (
                      <a
                        href={`https://facebook.com/${row.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-auf-muted transition-colors hover:text-navy"
                      >
                        <ExternalLink className="h-3 w-3 shrink-0 text-[#1877F2]" strokeWidth={2} />
                        {row.facebook}
                      </a>
                    ) : (
                      <span className="text-sm text-auf-muted/40">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`tel:${row.telephone}`}
                      className="flex items-center gap-1.5 text-sm text-auf-muted transition-colors hover:text-navy"
                    >
                      <Phone className="h-3 w-3 shrink-0 text-gold" strokeWidth={2} />
                      {row.telephone}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 md:hidden">
          {directory.generalInquiries.map((row) => (
            <div
              key={row.id}
              className="overflow-hidden rounded-xl border border-auf-border bg-white"
            >
              <div className="border-b border-auf-border bg-off-white px-4 py-3">
                <p className="text-sm font-semibold text-navy">{row.inquiry}</p>
                <p className="text-[11px] text-auf-muted">{row.office}</p>
              </div>
              <div className="space-y-2 px-4 py-3">
                <a
                  href={`mailto:${row.email}`}
                  className="flex items-center gap-2 text-xs text-auf-muted"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2} />
                  {row.email}
                </a>
                {row.facebook && (
                  <a
                    href={`https://facebook.com/${row.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-auf-muted"
                  >
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#1877F2]" strokeWidth={2} />
                    {row.facebook}
                  </a>
                )}
                <a
                  href={`tel:${row.telephone}`}
                  className="flex items-center gap-2 text-xs text-auf-muted"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2} />
                  {row.telephone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── B: College & School Concerns ── */}
      <div>
        <div className="mb-5 flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
            B
          </span>
          <h3 className="font-display text-base font-semibold text-navy">College & School Concerns</h3>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-xl border border-auf-border md:block">
          <table className="w-full text-sm">
            <thead className="border-b border-auf-border bg-off-white">
              <tr>
                {["College / School", "Email Address", "Telephone", "Mobile"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-navy/50"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {directory.collegeConcerns.map((row) => (
                <tr key={row.id} className="border-b border-auf-border last:border-0 hover:bg-off-white/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-9 shrink-0 items-center justify-center rounded bg-navy text-[9px] font-bold text-gold">
                        {row.acronym}
                      </span>
                      <span className="text-sm text-navy">{row.college}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`mailto:${row.email}`}
                      className="flex items-center gap-1.5 text-sm text-auf-muted transition-colors hover:text-navy"
                    >
                      <Mail className="h-3 w-3 shrink-0 text-gold" strokeWidth={2} />
                      {row.email}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`tel:${row.telephone}`}
                      className="flex items-center gap-1.5 text-sm text-auf-muted transition-colors hover:text-navy"
                    >
                      <Phone className="h-3 w-3 shrink-0 text-gold" strokeWidth={2} />
                      {row.telephone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm text-auf-muted">
                    {row.mobile === "TBA" ? (
                      <span className="text-auf-muted/40">TBA</span>
                    ) : (
                      <a
                        href={`tel:${row.mobile}`}
                        className="transition-colors hover:text-navy"
                      >
                        {row.mobile}
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 md:hidden">
          {directory.collegeConcerns.map((row) => (
            <div
              key={row.id}
              className="overflow-hidden rounded-xl border border-auf-border bg-white"
            >
              <div className="flex items-center gap-3 border-b border-auf-border bg-off-white px-4 py-3">
                <span className="flex h-6 w-9 shrink-0 items-center justify-center rounded bg-navy text-[9px] font-bold text-gold">
                  {row.acronym}
                </span>
                <p className="text-sm font-semibold text-navy">{row.college}</p>
              </div>
              <div className="space-y-2 px-4 py-3">
                <a
                  href={`mailto:${row.email}`}
                  className="flex items-center gap-2 text-xs text-auf-muted"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2} />
                  {row.email}
                </a>
                <a
                  href={`tel:${row.telephone}`}
                  className="flex items-center gap-2 text-xs text-auf-muted"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2} />
                  {row.telephone}
                </a>
                <div className="flex items-center gap-2 text-xs text-auf-muted/50">
                  <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                  {row.mobile === "TBA" ? "Mobile — TBA" : row.mobile}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
