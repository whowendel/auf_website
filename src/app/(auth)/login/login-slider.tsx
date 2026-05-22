"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SLIDES = [
  { src: "/slider/7.jpg",  caption: "Shaping Leaders" },
  { src: "/slider/9.jpg", caption: "Advancing Knowledge" },
  { src: "/slider/11.jpg",  caption: "Serving Humanity" },
  { src: "/slider/12.jpg",  caption: "Be An Angelenean" },
];

export function LoginSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-navy">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.caption}
            fill
            className="object-cover"
            sizes="50vw"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-navy/10" />

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-10 lg:p-12">
        <div className="mb-6 border-l-2 border-gold pl-5">
          <p className="font-display text-xl font-light italic leading-snug text-white lg:text-2xl">
            &ldquo;Virtus. Veritas. Caritas.&rdquo;
          </p>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/70">
            Angeles University Foundation
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-gold" : "w-2 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
