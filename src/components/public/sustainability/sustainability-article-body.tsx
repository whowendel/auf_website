import type { SustainabilityArticle, SustainabilityImage } from "@/data/sustainability";

function Figure({ img }: { img: SustainabilityImage }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={img.src}
      alt={img.alt}
      width={img.w}
      height={img.h}
      loading="lazy"
      className="h-auto w-full rounded-xl bg-off-white object-contain"
    />
  );
}

/** Cover shows the whole image: contained, over a blurred copy of itself. */
export function ArticleCover({ img }: { img: SustainabilityImage }) {
  return (
    <div className="relative mx-auto -mt-10 max-w-5xl px-6">
      <div className="relative overflow-hidden rounded-2xl bg-navy-deep shadow-xl">
        <div
          aria-hidden
          className="absolute -inset-8 scale-110 bg-cover bg-center blur-2xl brightness-50"
          style={{ backgroundImage: `url(${img.src})` }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.src}
          alt={img.alt}
          width={img.w}
          height={img.h}
          className="relative mx-auto h-auto max-h-136 w-auto max-w-full object-contain"
        />
      </div>
    </div>
  );
}

export function ArticleBody({ article }: { article: SustainabilityArticle }) {
  return (
    <>
      <div className="space-y-5 text-base leading-8 text-gray-700">
        {article.intro.map((p, i) => (
          <p key={i} className={i === 0 ? "text-lg leading-9 text-gray-800" : undefined}>
            {p}
          </p>
        ))}
      </div>

      {article.sections.map((s) => (
        <section key={s.heading} className="mt-12">
          <h2 className="font-display text-2xl font-semibold leading-snug text-navy">{s.heading}</h2>
          {s.paragraphs.map((p, i) => (
            <p key={i} className="mt-4 text-base leading-8 text-gray-700">
              {p}
            </p>
          ))}
          {s.images.length > 0 && (
            <div className={`mt-6 grid items-start gap-3 ${s.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {s.images.map((img) => (
                <Figure key={img.src} img={img} />
              ))}
            </div>
          )}
        </section>
      ))}

      {article.closing && (
        <p className="mt-12 border-t border-auf-border pt-8 text-base leading-8 text-gray-700">{article.closing}</p>
      )}
    </>
  );
}
