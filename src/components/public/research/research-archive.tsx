import type { ResearchArchive } from "@/data/research";

const TYPE_COLORS: Record<string, string> = {
  "Journal Article": "bg-navy/8 text-navy",
  "Conference Paper": "bg-gold/10 text-[var(--auf-gold)]",
  "Book": "bg-off-white text-navy/60",
  "Thesis": "bg-navy/5 text-navy/60",
};

export function ResearchArchive({ archive }: { archive: ResearchArchive }) {
  return (
    <section id="archive" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        Research outputs
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{archive.description ? "Research Archive" : "Research Archive"}</h2>
      {archive.description && (
        <p className="mb-10 text-sm leading-relaxed text-auf-muted">{archive.description}</p>
      )}

      {/* A — Featured Publications */}
      <div className="mb-12">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">A</span>
          <h3 className="font-display text-lg font-semibold text-navy">Featured Publications</h3>
        </div>
        <div className="space-y-3">
          {archive.featuredPublications.map((pub) => (
            <div
              key={pub.id}
              className="rounded-xl border border-auf-border bg-off-white p-4 md:p-5"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${TYPE_COLORS[pub.type] ?? "bg-navy/8 text-navy"}`}>
                  {pub.type}
                </span>
                <span className="text-[10px] font-semibold text-auf-muted">{pub.year}</span>
              </div>
              <p className="font-display text-sm font-semibold leading-snug text-navy md:text-base">
                {pub.title}
              </p>
              <p className="mt-1 text-xs text-auf-muted">{pub.authors}</p>
              {pub.venue && (
                <p className="mt-1 text-xs italic text-auf-muted/70">{pub.venue}</p>
              )}
              {pub.url && (
                <a href={pub.url} target="_blank" rel="noopener noreferrer"
                  className="mt-2 inline-block text-[10px] font-semibold text-navy hover:text-gold transition-colors">
                  View publication →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* B — Faculty and Student Research */}
      <div className="mb-12">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">B</span>
          <h3 className="font-display text-lg font-semibold text-navy">Faculty and Student Research</h3>
        </div>
        <p className="mb-5 text-sm leading-relaxed text-auf-muted">{archive.facultyResearch.description}</p>
        <ul className="mb-6 space-y-2">
          {archive.facultyResearch.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-auf-muted">
              <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-navy/30" />
              {h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          {archive.facultyResearch.repositoryUrl && (
            <a href={archive.facultyResearch.repositoryUrl} target="_blank" rel="noopener noreferrer"
              className="rounded-full border border-auf-border bg-white px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white">
              Browse Repository →
            </a>
          )}
          {archive.facultyResearch.thesisUrl && (
            <a href={archive.facultyResearch.thesisUrl} target="_blank" rel="noopener noreferrer"
              className="rounded-full border border-auf-border bg-white px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white">
              Theses & Dissertations →
            </a>
          )}
          {!archive.facultyResearch.repositoryUrl && !archive.facultyResearch.thesisUrl && (
            <span className="rounded-full border border-dashed border-auf-border px-4 py-2 text-xs text-auf-muted/60">
              Repository links coming soon
            </span>
          )}
        </div>
      </div>

      {/* C — Institutional Journals */}
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">C</span>
          <h3 className="font-display text-lg font-semibold text-navy">Institutional Journals</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {archive.journals.map((journal) => (
            <div key={journal.id} className="rounded-2xl border border-auf-border bg-white p-5 md:p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-navy/8 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-navy">
                  {journal.status}
                </span>
                {journal.frequency && (
                  <span className="text-[10px] text-auf-muted">{journal.frequency}</span>
                )}
              </div>
              <h4 className="font-display text-base font-semibold text-navy">{journal.name}</h4>
              <p className="mt-2 text-xs leading-relaxed text-auf-muted">{journal.description}</p>
              {journal.issn && journal.issn !== "TBA" && (
                <p className="mt-2 text-[10px] text-auf-muted/70">ISSN: {journal.issn}</p>
              )}
              {journal.url ? (
                <a href={journal.url} target="_blank" rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs font-semibold text-navy hover:text-gold transition-colors">
                  Visit journal →
                </a>
              ) : (
                <span className="mt-3 inline-block text-[10px] text-auf-muted/50">Online access coming soon</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
