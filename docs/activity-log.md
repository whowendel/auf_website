# Activity Log

## 2026-11-03 - Student Discipline Handbook download & Academic Scholarships copy update

- `src/data/student-services.json`:
  - Added download link for `AUF College Student Handbook` under `Our Services` > `Student Discipline` sub-section pointing to `https://bit.ly/AUFCollegeStudentHandbook` with access restriction note (@auf.edu.ph account required).
  - Updated `Scholarships and Grants` > `Academic Scholarships (College and University Scholars)` sub-section text to revised copy.
- `src/data/student-services.ts`: updated `OfficeItemSection` type to support `download` and `downloads` (`OfficeItemDownload`).
- `student-service-affairs.tsx`: rendered download button and access restriction disclaimer in section cards.

## 2026-10-04 - OSAFA content update

Source: `temp_docs/WEB CONTENT_OSAFA.xlsx` (OSAFA and ADDITIONAL SECTIONS tabs).

- `src/data/student-services.json`: renamed office to Office of Student Affairs and Financial Aid (navLabel OSAFA), new tagline and Purpose, replaced Responsibility/Authority/Inter-Relationships/Standards/Physical Facilities with Our Services, Scholarships and Grants, OSAFA Staff, Contact Us.
- `src/data/student-services.ts`: added optional `sections` to `OfficeItem`.
- `student-service-affairs.tsx`: renders `item.sections` inside the accordion.
- `nav-data.ts`: label OSAFA, fixed missing leading slash in the href.

Pending:
- Scholarships e-brochure download (file not yet available; sheet had a placeholder).
- `admissions.json` still references a "Student Affairs Office" with `sao@auf.edu.ph`; confirm if it should become OSAFA / `osafa@auf.edu.ph`.

## 2026-11-03 - Sustainability Initiatives section

Source: `C:\Users\Username\Downloads\TQM Articles\WEB CONTENT_TQM (SDG).xlsx` plus Article 1-3 folders. 3 of 15 rows had content; the other 12 are not published yet.

- New routes: `/news-events/sustainability-initiatives` (featured carousel, SDG and tag filters, card grid) and `/[slug]` (editorial article, cover shown uncropped, JSON-LD and keywords for crawlers). Cards open in a new tab.
- Data: `src/data/sustainability.json` + `sustainability.ts`. Images resized to max 1600px JPEG in `public/assets/sustainability/<slug>/`.
- `nav-data.ts`: News and Events is now a dropdown (All News & Events, Sustainability Initiatives).
- `inner-page-hero.tsx`: optional `children` slot.
- To add an article: add an entry to `sustainability.json`, drop images in `public/assets/sustainability/<slug>/`.

Pending:
- No publish dates (the Excel has none), so none are shown.
- Article 3 photo #4 is missing from the folder numbering.
- Rows 5 (AVP video) and 10 ("embed if possible") need a decision.

## 2026-11-03 - Sustainability Initiatives: articles 4-8

- Added: Non-Discrimination Commitment (with AVP video), Safe Spaces (text from Excel row 6), Maternity and Paternity Benefits, Education Outreach 2025-2026, Kapampangan Studies (IKS).
- AVP video (60s, 140 MB source) re-encoded to 720p H.264 (6.7 MB) with a poster frame in `public/assets/sustainability/non-discrimination-commitment/`.
- Model: `cover` is optional (SDG-colored placeholder when no photo), new optional `video` and section `bullets`.
- Articles 5 and 6 have no images. New articles are not featured, so the carousel still shows the first 3.
- Image-to-section pairing was inferred from file names (e.g. "ACSI Seminar on AI" under AI Automation Workshop).

## 2026-11-03 - Source grounding pass and splash fix

- Removed agent-written fields: `excerpt`, `category`, image `alt`, hero subtitle. Excerpt is now the first source paragraph; alt is the article title or section heading; tags match the Excel META DATA column exactly.
- Verified every paragraph, heading and bullet against the PDFs and Excel text (0 mismatches). Restored source wording I had changed (for example "last June 8, 9, & 16", "November 07", STAP heading with its parenthetical).
- Spelling typos fixed after review: Angeleenean, accomodation (tag), caesarian.
- `splash-screen.tsx`: seen-flag moved from sessionStorage (per tab) to a session cookie so new tabs do not replay the animation.

## 2026-11-03 - Sustainability Initiatives: scaffolding for articles 9-15

- Excel rows 10-16 added to `sustainability.json` as `draft` entries (title, SDGs, tags, Excel notes in `sourceNote`). Article 15 also has its text from Excel D16.
- Drafts show only outside production (Draft badge on cards, banner on the page); production hides them and their routes 404.
- `scripts/sustainability-image.mjs` (resize image, print JSON entry) and `scripts/verify-sustainability-text.py` (verbatim check against a source text).
- Teammate guide: `docs/sustainability-articles-guide.md` (not committed, per docs rule).

## 2026-11-03 - Typo pass

- `sustainability.json`: Angeleenean -> Angelenean (Safe Spaces), caesarian -> caesarean (Maternity and Paternity), accomodation -> accommodation (article 15 tag). Wording otherwise unchanged.

## 2026-11-03 - Revision fixes and security pass

- Source: AUF Website Content and Revisions.pdf. Plan: `docs/revision-fix-plan.md`.
- Contrast helper `readableAccent` / `textOn` in `src/lib/color.ts`, used by microsite header and contact.
- Security: found that Google SSO users were created active (schema default true) and the "set inactive" branch never ran; JWT sessions ignored deactivation. Fixed in `auth.ts` (adapter createUser, jwt callback DB check). Open item: `_mk` fallback key in `src/config/build.ts` is a hardcoded super-admin credential; needs owner decision.
- Not verified visually: horizontal-scroll audit (B3) and the footer "links stop working" report (A8).
