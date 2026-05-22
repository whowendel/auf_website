import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import type { ConnectCampuses } from "@/data/connect";

export function ConnectCampuses({ campuses }: { campuses: ConnectCampuses }) {
  return (
    <section id="campuses" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {campuses.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{campuses.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{campuses.description}</p>

      <div className="space-y-10">
        {campuses.campusList.map((campus) => (
          <div key={campus.id} className="grid gap-6 lg:grid-cols-2">
            {/* Left: Campus card */}
            <div className="overflow-hidden rounded-2xl border border-auf-border bg-white">
              <div className="relative h-52 w-full bg-navy/8 md:h-64">
                {campus.photoUrl ? (
                  <Image
                    src={campus.photoUrl}
                    alt={campus.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 900px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <p className="font-display text-sm font-light text-navy/25">
                      Photo coming soon — {campus.name}
                    </p>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-navy/80 to-transparent px-6 py-5">
                  <h3 className="font-display text-lg font-semibold text-white md:text-xl">
                    {campus.name}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-auf-border bg-off-white px-5 py-3">
                <span className="flex items-center gap-1.5 text-[11px] text-auf-muted">
                  <MapPin className="h-3 w-3 shrink-0 text-gold" strokeWidth={2} />
                  {campus.address}
                </span>
                <a
                  href={`tel:${campus.phone}`}
                  className="flex items-center gap-1.5 text-[11px] text-auf-muted transition-colors hover:text-navy"
                >
                  <Phone className="h-3 w-3 shrink-0 text-gold" strokeWidth={2} />
                  {campus.phone}
                </a>
                <a
                  href={`mailto:${campus.email}`}
                  className="flex items-center gap-1.5 text-[11px] text-auf-muted transition-colors hover:text-navy"
                >
                  <Mail className="h-3 w-3 shrink-0 text-gold" strokeWidth={2} />
                  {campus.email}
                </a>
              </div>

              <div className="px-5 py-6">
                <p className="mb-6 text-sm leading-relaxed text-auf-muted">{campus.description}</p>

                <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                  <div>
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">
                      Administrative Offices
                    </p>
                    <ul className="space-y-1.5">
                      {campus.offices.map((office, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-auf-muted">
                          <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          {office}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">
                      Academic Units
                    </p>
                    <div className="space-y-2">
                      {campus.academicUnits.map((unit) => (
                        <div
                          key={unit.acronym}
                          className="flex items-center gap-3 rounded-lg border border-auf-border bg-off-white px-3 py-2.5"
                        >
                          <span className="flex h-7 w-10 shrink-0 items-center justify-center rounded bg-navy text-[9px] font-bold text-gold">
                            {unit.acronym}
                          </span>
                          <span className="text-[12px] leading-snug text-navy/70">{unit.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Map column */}
            <div className="order-first lg:order-last">
              {campus.mapEmbedUrl ? (
                <div className="h-52 w-full overflow-hidden rounded-2xl border border-auf-border md:h-full">
                  <iframe
                    src={campus.mapEmbedUrl}
                    title={`${campus.name} map`}
                    className="h-full w-full border-0"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="flex h-52 items-center justify-center rounded-2xl border border-auf-border bg-navy/4 md:h-64">
                  <p className="text-sm text-auf-muted">Map not available</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
