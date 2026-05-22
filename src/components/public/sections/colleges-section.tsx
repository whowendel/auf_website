import Link from "next/link";
import Image from "next/image";
import { activeColleges } from "@/data/colleges";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import Grainient from "@/components/ui/grainient";

export function CollegesSection() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 md:py-32" id="colleges">
      <div
        className="absolute left-0 top-0 z-20 h-0.75 w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--auf-gold) 0%, var(--auf-gold-light) 50%, var(--auf-gold) 100%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
        <Grainient
          timeSpeed={3}
          colorBalance={0.25}
          warpStrength={0.6}
          warpFrequency={3.5}
          warpSpeed={0.6}
          warpAmplitude={50}
          blendAngle={35}
          blendSoftness={0.25}
          rotationAmount={500}
          noiseScale={1.6}
          grainAmount={0.20}
          grainScale={2.2}
          grainAnimated={false}
          contrast={1.2}
          gamma={1.05}
          saturation={0.9}
          zoom={1.1}
          color1="#F7F7F5"
          className="h-full w-full"
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-navy/55" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-light">
              Academics
            </p>
            <h2 className="font-display text-3xl font-light text-white md:text-5xl">
              Colleges &amp; Schools
            </h2>
          </div>
        </div>

        {/* Grid — 3 cols on sm, 4 on lg, 6 on xl */}
        <div className="grid grid-cols-3 gap-4 sm:gap-5 lg:grid-cols-4 xl:grid-cols-6">
          {activeColleges.map((c) => {
            const logo = c.mascotLogoWithTextUrl ?? c.mascotLogoUrl;
            const baseColor = c.cardColor;
            const cardColor = baseColor
            return (
              <Link
                key={c.id}
                href={`/c/${c.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3"
              >
                {/* ── Card (logo + animated bg) ───────────────────── */}
                <div
                  className="relative w-full overflow-hidden rounded-2xl transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl"
                  style={{
                    aspectRatio: "1 / 1",
                    background: cardColor,
                  }}
                >
                  {/* Animated dot bg */}
                  <div className="absolute inset-0 z-1">
                    <DottedGlowBackground
                      gap={12}
                      radius={1.3}
                      color="rgba(255,255,255,0.2)"
                      glowColor="rgba(242,195,0,0.55)"
                      opacity={0.65}
                      speedMin={0.25}
                      speedMax={0.75}
                      speedScale={0.7}
                    />
                  </div>

                  {/* Gold top shimmer line */}
                  <div
                    className="absolute left-0 top-0 h-0.5 w-full z-3"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${c.accentColor} 50%, transparent 100%)`,
                    }}
                  />

                  {/* Logo — centered, large */}
                  <div className="absolute inset-0 z-4 flex items-center justify-center p-3 sm:p-4">
                    {logo ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={logo}
                          alt={`${c.shortName} ${c.mascotName ?? "logo"}`}
                          fill
                          className="bg-white rounded-md object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 640px) 30vw, (max-width: 1024px) 22vw, 15vw"
                        />
                      </div>
                    ) : (
                      <span className="font-display text-4xl font-bold text-white/60 drop-shadow-lg sm:text-5xl">
                        {c.shortName}
                      </span>
                    )}
                  </div>

                  {/* Hover: visit microsite indicator */}
                  <div className="absolute bottom-2.5 right-2.5 z-4 flex h-6 w-6 items-center justify-center rounded-full bg-white/0 opacity-0 transition-all duration-200 group-hover:bg-white/15 group-hover:opacity-100">
                    <span className="text-[10px] text-white">↗</span>
                  </div>
                </div>

                {/* ── Text below card ─────────────────────────────── */}
                <div className="w-full text-center">
                  <div className="text-sm font-bold uppercase tracking-[0.18em] transition-colors group-hover:opacity-90">
                    <span
                      className="relative inline-block overflow-hidden rounded-xs px-2 py-0.5 border"
                      style={{
                        background: cardColor,
                        borderColor: cardColor,
                        color: 'white',
                      }}
                    >
                      {/* Shimmer line at top of badge */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute left-0 top-0 h-px w-full"
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)`,
                        }}
                      />
                      {c.shortName}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm font-medium leading-snug text-white/80 transition-colors group-hover:text-white sm:text-base">
                    {c.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
