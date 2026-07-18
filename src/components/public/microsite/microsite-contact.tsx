import type { College } from "@/data/colleges";
import { university } from "@/data/colleges";

export function MicrositeContact({ college }: { college: College }) {
  return (
    <section
      id="contact"
      className="py-20 md:py-28"
      style={{ background: college.brandColor }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

          {/* College contact */}
          <div>
            <p
              className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] opacity-60"
              style={{ color: college.accentColor }}
            >
              Reach us
            </p>
            <h2 className="font-display text-3xl font-light text-white md:text-4xl">
              Contact the {college.shortName}
            </h2>

            <ul className="mt-8 space-y-4">
              {college.contact.email && (
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] opacity-60"
                    style={{ color: college.accentColor }}
                  >
                    Email
                  </span>
                  <a
                    href={`mailto:${college.contact.email}`}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {college.contact.email}
                  </a>
                </li>
              )}
              {college.contact.phone && (
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] opacity-60"
                    style={{ color: college.accentColor }}
                  >
                    Phone
                  </span>
                  <span className="text-sm text-white/80">{college.contact.phone}</span>
                </li>
              )}
              {college.contact.address && (
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] opacity-60"
                    style={{ color: college.accentColor }}
                  >
                    Location
                  </span>
                  <span className="text-sm text-white/80">{college.contact.address}</span>
                </li>
              )}
            </ul>
          </div>

          {/* University contact */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              University contact
            </p>
            <p className="font-display text-lg font-light text-white">{university.name}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>{university.address}</li>
              <li>
                <a href={`tel:${university.phone}`} className="hover:text-white transition-colors">
                  {university.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${university.email}`}
                  className="hover:text-white transition-colors"
                >
                  {university.email}
                </a>
              </li>
            </ul>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/70 transition-all hover:border-white/50 hover:text-white"
            >
              View campus map →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
