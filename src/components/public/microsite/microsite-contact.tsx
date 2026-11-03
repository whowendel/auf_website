import type { College } from "@/data/colleges";
import { university } from "@/data/colleges";
import { textOn, readableAccent } from "@/lib/color";

// Official campus map (Google Maps short link).
const CAMPUS_MAP_URL = "https://maps.app.goo.gl/jFqGd8x7yiLYiDXWA";

export function MicrositeContact({ college }: { college: College }) {
  const fg = textOn(college.brandColor);
  const accent = readableAccent(college.accentColor, college.brandColor);
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
              className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] opacity-90"
              style={{ color: accent }}
            >
              Reach us
            </p>
            <h2 className="font-display text-3xl font-light md:text-4xl" style={{ color: fg }}>
              Contact the {college.shortName}
            </h2>

            <ul className="mt-8 space-y-4">
              {college.contact.email && (
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] opacity-90"
                    style={{ color: accent }}
                  >
                    Email
                  </span>
                  <div className="flex flex-col gap-1">
                    <a
                      href={`mailto:${college.contact.email}`}
                      className="text-sm underline-offset-2 hover:underline" style={{ color: fg }}
                    >
                      {college.contact.email}
                    </a>
                    {college.contact.emailAlt && (
                      <a
                        href={`mailto:${college.contact.emailAlt}`}
                        className="text-sm underline-offset-2 hover:underline" style={{ color: fg }}
                      >
                        {college.contact.emailAlt}
                      </a>
                    )}
                  </div>
                </li>
              )}
              {college.contact.phone && (
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] opacity-90"
                    style={{ color: accent }}
                  >
                    Phone
                  </span>
                  <span className="text-sm" style={{ color: fg }}>{college.contact.phone}</span>
                </li>
              )}
              {college.contact.address && (
                <li className="flex items-start gap-3">
                  <span
                    className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] opacity-90"
                    style={{ color: accent }}
                  >
                    Location
                  </span>
                  <span className="text-sm" style={{ color: fg }}>{college.contact.address}</span>
                </li>
              )}
            </ul>
          </div>

          {/* University contact */}
          <div
            className="rounded-2xl border p-8 backdrop-blur-sm"
            style={{ borderColor: `${fg}33`, background: `${fg}12`, color: fg }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
              University contact
            </p>
            <p className="font-display text-lg font-light">{university.name}</p>
            <ul className="mt-4 space-y-2 text-sm opacity-90">
              <li>{university.address}</li>
              <li>
                <a href={`tel:${university.phone}`} className="underline-offset-2 hover:underline">
                  {university.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${university.email}`}
                  className="underline-offset-2 hover:underline"
                >
                  {university.email}
                </a>
              </li>
            </ul>
            <a
              href={CAMPUS_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-70"
              style={{ borderColor: `${fg}66` }}
            >
              View campus map →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
