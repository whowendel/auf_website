import Link from "next/link";

const ACCREDITATIONS = [
  {
    body: "CHED",
    title: "Autonomous Status",
    description:
      "Granted by the Commission on Higher Education (CHED) since 2003 — one of the highest recognitions a Philippine university can receive, reflecting sustained academic quality and institutional integrity.",
  },
  {
    body: "FAAP",
    title: "Institutional Accreditation",
    description:
      "Accredited by the Federation of Accrediting Associations of the Philippines (FAAP), affirming that AUF meets rigorous national standards for higher education institutions.",
  },
  {
    body: "TÜV SÜD",
    title: "ISO 21001:2015 Certification",
    description:
      "Certified by TÜV SÜD for Educational Organizations Management Systems — demonstrating AUF's commitment to delivering high-quality educational services and continuous improvement.",
  },
  {
    body: "PAASCU",
    title: "Program Accreditations",
    description:
      "Multiple academic programs accredited through the Philippine Accrediting Association of Schools, Colleges and Universities (PAASCU), assuring quality instruction and student outcomes.",
  },
  {
    body: "CHED",
    title: "Program Distinctions",
    description:
      "Several programs have been recognized by the Commission on Higher Education as Centers of Excellence (COE) and Centers of Development (COD), placing AUF among the nation's top institutions.",
  },
] as const;

const RANKINGS = [
  {
    org: "Times Higher Education",
    name: "THE Impact Rankings",
    description:
      "AUF is recognized for its measurable contributions to the United Nations Sustainable Development Goals (SDGs), demonstrating that academic excellence and social responsibility go hand in hand.",
    tag: "SDG Impact",
  },
  {
    org: "Quacquarelli Symonds",
    name: "QS Asian University Rankings",
    description:
      "Acknowledged among the top universities in Asia, highlighting AUF's growing international presence, research output, and academic excellence across disciplines.",
    tag: "Top Asian University",
  },
  {
    org: "WURI",
    name: "World University Rankings for Innovation",
    description:
      "Recognized for its innovative approaches to education and research, demonstrating AUF's commitment to producing graduates who drive positive change in industry and society.",
    tag: "Innovation Leader",
  },
] as const;

export function AccreditationsSection() {
  return (
    <section className="bg-[var(--auf-off-white)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">

        {/* ── Section header ──────────────────────────────────────────── */}
        <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--auf-gold)]">
              Recognition
            </p>
            <h2 className="font-display text-3xl font-light text-[var(--auf-navy)] md:text-5xl">
              Accreditations &amp;{" "}
              <span className="italic text-[var(--auf-navy-mid)]">Rankings</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--auf-muted)]">
              Decades of consistent recognition by national and international bodies confirm
              AUF&rsquo;s standing as one of the Philippines&rsquo; leading universities.
            </p>
          </div>
          <Link
            href="/about#rankings"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--auf-navy)]/20 px-5 py-2.5 text-sm font-medium text-[var(--auf-navy)] transition-all hover:border-[var(--auf-navy)] hover:bg-[var(--auf-navy)] hover:text-white"
          >
            Learn more
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        {/* ── National Accreditations ─────────────────────────────────── */}
        <div className="mb-16">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--auf-navy)]/40">
            National Accreditations &amp; Certifications
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ACCREDITATIONS.map((a) => (
              <div
                key={a.title}
                className="group flex flex-col rounded-xl border border-[var(--auf-border)] bg-white p-6 transition-shadow hover:shadow-md"
              >
                {/* Body chip */}
                <span className="mb-4 inline-block self-start rounded-full bg-[var(--auf-navy)]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--auf-navy)]">
                  {a.body}
                </span>
                <h3 className="font-display text-lg font-semibold leading-snug text-[var(--auf-navy)]">
                  {a.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--auf-muted)]">
                  {a.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ─────────────────────────────────────────────────── */}
        <div className="mb-16 flex items-center gap-4">
          <span className="h-px flex-1 bg-[var(--auf-border)]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--auf-muted)]">
            International Rankings
          </span>
          <span className="h-px flex-1 bg-[var(--auf-border)]" />
        </div>

        {/* ── International Rankings ──────────────────────────────────── */}
        <div className="grid gap-6 md:grid-cols-3">
          {RANKINGS.map((r, i) => (
            <div
              key={r.name}
              className="group relative overflow-hidden rounded-2xl bg-[var(--auf-navy)] p-8 md:p-9"
            >
              {/* Subtle pattern */}
              <div className="auf-diamond-pattern absolute inset-0 opacity-100" />

              {/* Gold top accent line */}
              <div
                className="absolute left-0 top-0 h-[3px] w-full"
                style={{
                  background: i === 0
                    ? "var(--auf-gold)"
                    : i === 1
                      ? "var(--auf-gold-light)"
                      : "linear-gradient(90deg, var(--auf-gold), var(--auf-gold-light))",
                }}
              />

              <div className="relative">
                {/* Ranking tag */}
                <span className="mb-5 inline-block rounded-full border border-white/15 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--auf-gold)]">
                  {r.tag}
                </span>

                {/* Org name */}
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                  {r.org}
                </p>

                {/* Ranking name */}
                <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-white md:text-xl">
                  {r.name}
                </h3>

                {/* Description */}
                <p className="mt-4 text-sm leading-relaxed text-white/55">
                  {r.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA footer ─────────────────────────────────────────────── */}
        <div className="mt-14 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:text-left">
          <p className="text-sm text-[var(--auf-muted)]">
            Want the full picture of AUF&rsquo;s achievements and recognitions?
          </p>
          <Link
            href="/about#rankings"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--auf-navy)] underline underline-offset-4 transition-colors hover:text-[var(--auf-gold)]"
          >
            View all accreditations
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
