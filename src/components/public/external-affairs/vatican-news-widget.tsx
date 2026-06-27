"use client";

import Script from "next/script";
import { createElement } from "react";

export function VaticanNewsWidget() {
  return (
    <>
      <div className="min-h-72 overflow-hidden rounded-lg border border-auf-border bg-white p-4 shadow-sm">
        {createElement("vaticannews-widget", {
          lang: "en",
          fontSize: "14",
          carouselVideoAuto: "true",
          carouselVideoTime: "medium",
        })}
      </div>
      <Script
        id="vatican-news-widget"
        src="https://www.vaticannews.va/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
