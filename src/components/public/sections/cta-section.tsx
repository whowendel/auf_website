import Link from "next/link";
import Image from "next/image";

export function CtaSection() {
  return (
    // Full-bleed navy — flows directly into VisionMissionSection (white below)
    <section className="relative overflow-visible bg-[var(--auf-navy)]">
      {/* Background pattern */}
      <div className="auf-diamond-pattern absolute inset-0" />

      {/* Gold top accent */}
      <div
        className="absolute left-0 top-0 h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--auf-gold) 0%, var(--auf-gold-light) 50%, var(--auf-gold) 100%)",
        }}
      />

      {/* AUF logo watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-6 bottom-0 h-40 w-40 opacity-[0.06] md:h-56 md:w-56 lg:h-72 lg:w-72"
      >
        <Image
          src="/assets/auf-logo-only.png"
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 768px) 160px, (max-width: 1024px) 224px, 288px"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* ── Copy + actions ─────────────────────────────────────── */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--auf-gold)]">
              Begin your journey
            </p>
            <h2 className="font-display text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl">
              Your future starts{" "}
              <em className="italic text-[var(--auf-gold-light)]">here.</em>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
              Whether you&rsquo;re a prospective student, a parent, or a partner
              institution — explore our programs and take the first step toward
              excellence.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--auf-gold)] px-8 py-4 text-sm font-semibold text-[var(--auf-navy)] transition-all hover:bg-[var(--auf-gold-light)] hover:shadow-lg hover:shadow-[var(--auf-gold)]/25"
              >
                Apply now
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="#"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/25 px-8 py-4 text-sm font-medium text-white/90 transition-all hover:border-white/50 hover:bg-white/5"
              >
                Contact us
              </Link>
            </div>
          </div>

          {/* ── Great Dane illustration ─────────────────────────── */}
          <div className="relative flex items-end justify-center lg:justify-end min-h-[18rem] md:min-h-[24rem] lg:min-h-[28rem]">
            {/* Soft glow behind the mascot */}
            <div
              className="absolute bottom-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-20 blur-3xl lg:left-auto lg:right-8 lg:translate-x-0"
              style={{ background: "var(--auf-gold)" }}
            />
            <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 md:h-[26rem] md:w-[26rem] lg:left-auto lg:right-0 lg:translate-x-0 lg:h-[32rem] lg:w-[32rem]">
              <Image
                src="/assets/great-dane.png"
                alt="AUF Great Dane mascot"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 320px, (max-width: 1024px) 416px, 512px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
