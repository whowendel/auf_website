import type { College } from "@/data/colleges";

/**
 * Replaces the old MicrositeAbout. Combines Vision, Mission, and (optional) Goals
 * into a single editorial section with a dean's message card below.
 */
export function MicrositeIdentity({ college }: { college: College }) {
  const hasGoals = (college.goals?.length ?? 0) > 0;

  return (
    <section id="identity" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <p
          className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: college.brandColor }}
        >
          Who we are
        </p>
        <h2 className="font-display text-3xl font-light text-[var(--auf-navy)] md:text-4xl">
          Our identity
        </h2>

        {/* Vision / Mission */}
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="mb-5 h-0.5 w-10" style={{ background: college.accentColor }} />
            <p
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: college.brandColor }}
            >
              Vision
            </p>
            <p className="font-display text-lg font-light italic leading-relaxed text-[var(--auf-navy)] md:text-xl">
              &ldquo;{college.vision}&rdquo;
            </p>
          </div>
          <div>
            <div className="mb-5 h-0.5 w-10" style={{ background: college.accentColor }} />
            <p
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: college.brandColor }}
            >
              Mission
            </p>
            <p className="font-display text-lg font-light italic leading-relaxed text-[var(--auf-navy)] md:text-xl">
              &ldquo;{college.mission}&rdquo;
            </p>
          </div>
        </div>

        {/* History — conditional */}
        {college.history && (
          <div className="mt-16 border-t border-[var(--auf-border)] pt-12">
            <p
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: college.brandColor }}
            >
              Our History
            </p>
            <h3 className="font-display text-2xl font-light text-[var(--auf-navy)] md:text-3xl">
              How we started
            </h3>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--auf-text)] md:text-base">
              {Array.isArray(college.history) ? (
                college.history.map((p, idx) => <p key={idx}>{p}</p>)
              ) : (
                <p>{college.history}</p>
              )}
            </div>
          </div>
        )}

        {/* Goals — conditional */}
        {hasGoals && (
          <div className="mt-16 border-t border-[var(--auf-border)] pt-12">
            <p
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: college.brandColor }}
            >
              Our goals
            </p>
            <h3 className="font-display text-2xl font-light text-[var(--auf-navy)] md:text-3xl">
              What we&rsquo;re working toward
            </h3>
            <ol className="mt-8 space-y-4">
              {college.goals!.map((goal, i) => (
                <li key={i} className="flex items-start gap-5">
                  <span
                    className="mt-1 shrink-0 font-display text-2xl font-semibold tabular-nums leading-none md:text-3xl"
                    style={{ color: `${college.brandColor}50` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-[var(--auf-text)] md:text-base">
                    {goal}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Dean's message */}
        <div
          className="mt-16 rounded-2xl border-l-4 p-8 md:p-10"
          style={{
            borderColor: college.brandColor,
            background: `${college.brandColor}08`,
          }}
        >
          <p
            className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: college.brandColor }}
          >
            Message from the {college.dean.title}
          </p>
          <p className="font-display text-lg font-light italic leading-relaxed text-[var(--auf-navy)]">
            &ldquo;We are committed to providing every student with a transformative educational
            experience that prepares them not only as professionals, but as individuals of
            strong character and genuine concern for others.&rdquo;
          </p>
          <div className="mt-5 flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-full"
              style={{ background: `${college.brandColor}25` }}
            />
            <div>
              <p className="text-sm font-semibold text-[var(--auf-navy)]">{college.dean.name}</p>
              <p className="text-xs text-[var(--auf-muted)]">
                {college.dean.title}, {college.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
