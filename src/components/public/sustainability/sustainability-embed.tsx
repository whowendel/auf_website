"use client";

import { useState } from "react";
import type { SustainabilityImage } from "@/data/sustainability";

/** Loads the embedded page only on request, since it may require a sign-in the visitor lacks. */
export function ArticleEmbed({
  src,
  title,
  inline,
  preview,
}: {
  src: string;
  title: string;
  /** Show the embed straight away, with no buttons (for public players such as video). */
  inline?: boolean;
  preview?: SustainabilityImage;
}) {
  const [open, setOpen] = useState(false);
  const button =
    "rounded-full px-4 py-2 text-xs font-semibold transition-colors";

  if (inline)
    return (
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        className="mb-10 aspect-video w-full rounded-xl border-0 bg-black"
      />
    );

  return (
    <div className="mt-6">
      {open ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          className="h-[70vh] w-full rounded-xl border border-auf-border bg-off-white"
        />
      ) : (
        preview && (
          <a href={src} target="_blank" rel="noopener noreferrer" className="block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview.src}
              alt={preview.alt}
              width={preview.w}
              height={preview.h}
              loading="lazy"
              className="h-auto w-full rounded-xl border border-auf-border"
            />
          </a>
        )
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className={`${button} bg-navy text-white hover:bg-gold`}
        >
          Open {title} &#8599;
        </a>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`${button} border border-auf-border text-navy hover:bg-navy hover:text-white`}
        >
          {open ? "Hide embedded view" : "View embedded here"}
        </button>
      </div>
    </div>
  );
}
