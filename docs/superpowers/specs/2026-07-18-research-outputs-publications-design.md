# Research Outputs and Publications — Design

## Context

Source content dropped in `public/assets/research/`:
- `5. Research Outputs and Publications.docx.md` — narrative content for three areas: Featured Publications, Faculty and Student Research, Research Metrics and Impact.
- `featured_pub_1.jpg` .. `featured_pub_4.jpg` — OVPRI "International Publication Awardee" graphics (real, publicly-published institutional announcements) naming four actual publications, their authors/roles/colleges, journal/venue, and SDG tags.

The public Research page (`src/app/(public)/research/page.tsx`) already has a Research Archive section (`src/components/public/research/research-archive.tsx`) with 3 placeholder/fictional featured publications, and no "Research Metrics and Impact" section exists yet.

## Goals

1. Replace the fictional Featured Publications with the 4 real ones from the graphics.
2. Refresh the Faculty and Student Research description to match the source content.
3. Add a new "Research Metrics and Impact" section: rankings narrative, faculty-publications-by-college table, internal/external funding tables.
4. Update the Overview section's `Publications`/`Active Grants` placeholder stats with real figures.

## 1. Featured Publications data

In `src/data/research.json`, replace `archive.featuredPublications` (currently 3 fictional entries) with 4 real entries derived from the graphics:

| id | title | venue | college(s) | sdgs |
|---|---|---|---|---|
| pub-1 | Diagnostic efficiency of fecal lactoferrin in detecting bacterial gastroenteritis: a systematic review and meta-analysis | The Egyptian Journal of Internal Medicine | CAMP, CARI | [3] |
| pub-2 | Research on construction schedule optimization model based on particle swarm optimization algorithm | 2024 8th Intl. Conference on Electrical, Mechanical and Computer Engineering (ICEMCE 2024) | CCS, Graduate School | [9, 11] |
| pub-3 | Trust-Aware Hybrid Collaborative Recommendation with Locality-Sensitive Hashing | Tsinghua Science and Technology | CCS, Graduate School | [9] |
| pub-4 | When Health Behavior Meets Technology: Artificial Neural Network–Based Prediction of Breast Self-Examination Intentions Among Filipino Female College Students | Journal of Cancer Education | CAMP, CED, OVPRI | [3] |

Note: `featured_pub_2.jpg` contains two publications by the same co-author (PSO paper + Whale Optimization paper). Only the PSO / ICEMCE 2024 paper (explicitly titled with venue+date) is added as `pub-2`; the second title in that image ("Construction Scheduling Optimization of Prefabricated Buildings...", International Journal of Computational Intelligence Systems) is added as a 5th entry `pub-5` since it's a distinct, fully-attributed publication.

Each entry shape changes from a flat `authors: string`:

```json
{
  "id": "pub-1",
  "title": "...",
  "authors": [
    { "name": "Tiongco, Raphael Enrique", "role": "Main Author", "college": "College of Allied Medical Professions" },
    { "name": "Flores, John Ashley", "role": "Co-author", "college": "College of Allied Medical Professions" },
    { "name": "Lacson, Mona Lisa", "role": "Co-author", "college": "Center for Advanced Research & Innovation" }
  ],
  "year": "2025",
  "venue": "The Egyptian Journal of Internal Medicine",
  "type": "Journal Article",
  "sdgs": [3],
  "url": null
}
```

(Year: graphics are labeled "A.Y. 2025-2026"; use `"2025"` for all four/five since no more precise date is given except pub-2's ICEMCE 2024 which uses `"2024"`.)

`FeaturedPublication` type in `src/data/research.ts` is inferred automatically from the JSON shape (`typeof rawData.archive.featuredPublications[number]`) — no manual type edits needed.

## 2. Featured Publications component changes

`src/components/public/research/research-archive.tsx`, section A:
- Render `pub.authors.map(a => a.name).join(", ")` instead of the old plain string, with role/college as a smaller secondary line (e.g. "Main Author, College of Allied Medical Professions" for the first author only, or all listed compactly — keep to one secondary line summarizing lead author + college to avoid clutter).
- Add small SDG badges: reuse `SDG_LIST` from `src/data/sdgs.ts` and the existing `/assets/sdgs/{number}.png` icons (already used on the SDG page) — render one small icon+number chip per `pub.sdgs` entry next to the existing type/year chips.
- No author photos (text-only, per user decision).

## 3. Faculty and Student Research text update

`archive.facultyResearch` in `research.json`:
- `description`: "Discover ongoing and completed research projects led by AUF faculty and graduate students."
- `highlights`: replace current 4 bullets with the source's 4 entry-fields: "Title and abstract", "Author(s) and affiliation", "Publication venue or status", "Downloadable links (if available)".

No component code changes needed here — `research-archive.tsx` already renders `description` + `highlights` generically.

## 4. New "Research Metrics and Impact" section

**Data** — new top-level key `researchMetrics` in `research.json`:

```json
{
  "researchMetrics": {
    "navLabel": "Metrics & Impact",
    "eyebrow": "Tracking our progress",
    "title": "Research Metrics and Impact",
    "rankings": {
      "theQs": "paragraph text (THE Impact Rankings SDG 3/4/5/11 2023-2025, QS 2025)...",
      "wuri": "paragraph text (WURI 2025, AUFlex Academy, 52nd in B6, 616 faculty, 73% completion)..."
    },
    "facultyPublications": {
      "description": "Full-time faculty members with publications in SCOPUS, Web of Science, or ASEAN citation-indexed journal",
      "columns": ["College", "Total FT Faculty (2nd sem 24-25)", "Scopus", "WoS", "Scopus or WoS", "Proportion"],
      "rows": [
        { "college": "CAMP", "totalFaculty": 60, "scopus": 7, "wos": 7, "scopusOrWos": 8, "proportion": "13.33%" },
        { "college": "CBA", "totalFaculty": 18, "scopus": 1, "wos": 0, "scopusOrWos": 1, "proportion": "5.56%" },
        { "college": "CCS", "totalFaculty": 12, "scopus": 4, "wos": 2, "scopusOrWos": 4, "proportion": "33.33%" },
        { "college": "CCFP", "totalFaculty": 19, "scopus": 1, "wos": 1, "scopusOrWos": 1, "proportion": "5.26%" },
        { "college": "CON", "totalFaculty": 58, "scopus": 9, "wos": 2, "scopusOrWos": 9, "proportion": "15.52%" },
        { "college": "GS", "totalFaculty": 2, "scopus": 1, "wos": 0, "scopusOrWos": 1, "proportion": "50.00%" },
        { "college": "Concurrent FT", "totalFaculty": 13, "scopus": 4, "wos": 4, "scopusOrWos": 5, "proportion": "41.67%" }
      ],
      "totalLabel": "Total FT faculty with publication in Scopus or WoS (2nd Sem 24-25, out of 386)",
      "totalCount": 29,
      "totalProportion": "7.51%"
    },
    "funding": {
      "internal": {
        "title": "Internally Funded Research Projects",
        "rows": [
          { "title": "No true or false, real or distorted: Familiarity, knowledge, and constructs of teachers and students on gender identity and sexual orientation in a private university", "leader": "Dame B. Avelino", "unit": "Department of Mass Communication, College of Arts and Sciences" },
          { "title": "Quality of Work Life (QWL) among Senior High School Teachers", "leader": "Dr. Bernadette M. Dalusung", "unit": "Department of Social Sciences, College of Arts and Sciences" }
        ]
      },
      "external": {
        "title": "Externally Funded Research Projects",
        "rows": [
          {
            "title": "Accelerated R&D Program for Capacity Building of Research and Development Institutions and Industrial Competitiveness: Niche Centers in the Regions for R&D (NICER) Program — Biomaterials for Diagnostics and Therapeutics Research and Development Center",
            "approvalDate": "Feb. 1, 2022",
            "duration": "36 months (completed Jan. 31, 2025)",
            "leader": "Program Leader: Dr. Reynaldo DL. Bundalian Jr. Project leaders: Dr. Reynaldo DL. Bundalian Jr., Mr. Raphael Enrique G. Tiongco, Engr. Carolyn A. Arbotante",
            "amount": "Php 24,328,690.03",
            "source": "DOST-GIA",
            "status": "ON-GOING",
            "remark": "Preparation of the terminal report for three projects under the program is underway."
          },
          {
            "title": "AUF-MAGNUS H-Hub (Mobilizing & Accelerating Growth of Nascent, Useful, and Sustainable Health Technologies)",
            "approvalDate": "June 2025",
            "duration": "12 months (target completion May 2026)",
            "leader": "Project leader: Mona Lisa B. Lacson",
            "amount": "Php 4,556,044.00",
            "source": "PCHRD",
            "status": "ON-GOING",
            "remark": "Field-level data collection activities, including courtesy visits, key informant interviews, and focused group discussions with institutional research leaders and stakeholders, are currently in progress."
          }
        ]
      }
    }
  }
}
```

**Component** — new `src/components/public/research/research-metrics.tsx`, following the visual language of `research-archive.tsx` (lettered A/B/C subsection badges, rounded-xl bordered cards, navy/gold palette):
- A — Rankings & Recognition: two paragraphs (THE/QS, WURI).
- B — Faculty Publications by College: responsive table (scrolls horizontally on mobile via `overflow-x-auto`), bolded total row.
- C — Funding Secured: internal projects as a simple 3-column table/list; external projects as cards (title, leader(s), amount, source, status badge, remark) — external has more fields per row than fits a clean table.

**Page wiring** (`src/app/(public)/research/page.tsx`):
- Import `ResearchMetrics` component and `researchMetrics` data.
- Add nav item `{ id: "metrics-impact", label: researchMetrics.navLabel }` between `archive` and `news-events`.
- Render `<ResearchMetrics metrics={researchMetrics} />` between `<ResearchArchive .../>` and `<ResearchNews .../>`.

**Types** (`src/data/research.ts`): add
```ts
export type ResearchMetrics = typeof rawData.researchMetrics;
export const researchMetrics: ResearchMetrics = rawData.researchMetrics;
```

## 5. Overview stats update

`overview.highlights` in `research.json`:
- `{ "label": "Faculty w/ Scopus/WoS Pubs", "value": "29" }` (was `"Publications": "TBA"`)
- `{ "label": "Active Grants", "value": "2" }` (was `"TBA"`) — the two ongoing externally-funded projects.
- `"Research Centers": "3+"` and `"Partner Agencies": "TBA"` unchanged (out of scope).

## Out of scope

- Faculty Directory `featuredResearchers` (still `"TBA"` placeholders) — not addressed by this source content.
- Author headshot photos — explicitly excluded per user decision (text-only cards).
- `featured_pub_2.jpg`'s second author (Dr. Joey Aviles) is captured via `pub-2`/`pub-5`'s author list; no separate researcher-directory entry is added.

## Testing

No test runner in this repo. Verification: `npm run lint`, `npm run typecheck`, and manual check via `npm run dev` (Research page renders new section, nav scroll-to works, table is responsive, existing sections unaffected).
