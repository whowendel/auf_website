# Sustainability articles guide

Section: News and Events > Sustainability Initiatives (`/news-events/sustainability-initiatives`).
Articles 9-15 (Excel rows 10-16) already exist as drafts. Fill them in; do not edit components.

## Where things live

| What | Path |
|---|---|
| Article content (all articles) | `src/data/sustainability.json` |
| Loader, types, draft filter | `src/data/sustainability.ts` |
| List page, article page | `src/app/(public)/news-events/sustainability-initiatives/` |
| Cards, carousel, filters, article body | `src/components/public/sustainability/` |
| Images and video | `public/assets/sustainability/<slug>/` |

## Draft workflow

1. Open the article's entry in `sustainability.json` (`"draft": true`). Drafts show in `npm run dev` with a Draft badge and are hidden and 404 in production builds.
2. Fill the content (below). `sourceNote` holds the Excel instruction for that row (for example "To add pictures of AUF BYD Vehicles"); it is never shown to visitors.
3. Delete `"draft": true` and `"sourceNote"` to publish. Set `"featured": true` to add it to the carousel.

## Entry shape

```json
{
  "slug": "url-friendly-name",
  "title": "Title from the Excel",
  "sdgs": [3],
  "tags": ["Exactly as in the Excel META DATA column"],
  "featured": false,
  "cover": { "file": "cover", "w": 1600, "h": 1066 },
  "video": { "file": "name", "poster": "poster-name", "title": "..." },
  "intro": ["First paragraph (also the card summary)", "..."],
  "sections": [
    { "heading": "...", "paragraphs": ["..."], "bullets": ["..."], "images": [{ "file": "photo-1", "w": 1600, "h": 1066 }] }
  ],
  "closing": "Final paragraph"
}
```

`cover`, `video`, `bullets`, `images`, `closing` are optional. No cover means an SDG-colored card.

## Rules (content must come from the source)

- Text is copied from the PDF or Excel as written. Do not rewrite, summarize, or add anything. Summaries, alt text, and meta descriptions are derived in code from the source text.
- Tags and titles come from the Excel (`WEB CONTENT_TQM (SDG).xlsx`). Fix plain spelling typos only (the verify script will then flag those words; that is expected); leave wording as is.
- Put each photo under the section it belongs to; the cover is the first or main image.

## Helper scripts

- Resize an image and get its JSON entry:
  `node scripts/sustainability-image.mjs "<input.jpg>" <slug> <name>`
- Check text is verbatim from its source (extract the PDF first with `pdftotext -enc UTF-8 "file.pdf" source.txt`):
  `python -I scripts/verify-sustainability-text.py <slug> source.txt`
- Video: re-encode large files first, for example
  `ffmpeg -i in.mp4 -vf scale=-2:720 -c:v libx264 -crf 28 -c:a aac -b:a 96k -movflags +faststart out.mp4`

## Status of articles 9-15

| # | Slug | SDG | State |
|---|---|---|---|
| 9 | auf-initiatives-towards-the-sdgs | 17 | needs text; Excel says "Embed if possible" |
| 10 | education-for-the-sdgs | 17 | needs text |
| 11 | free-employee-shuttle-electric-vehicles | 11 | needs text and BYD vehicle pictures |
| 12 | after-school-program-for-auf-families | 5 | needs text |
| 13 | magnus-h-hub-health-technology-innovation | 3 | needs text and images |
| 14 | center-for-culture-and-the-arts | 11 | needs text |
| 15 | temporary-accommodation-employee-support | 11 | text done (from Excel); needs images, then remove draft |

