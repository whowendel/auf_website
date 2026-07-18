# Research Outputs and Publications Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace fictional Featured Publications with 5 real ones, refresh the Faculty and Student Research blurb, add a new "Research Metrics and Impact" section (rankings, faculty publication table, funding tables), and update Overview stats — all sourced from `public/assets/research/5. Research Outputs and Publications.docx.md` and the 4 OVPRI award graphics.

**Architecture:** Pure data + presentational-component change in the existing static-JSON-driven public Research page. `src/data/research.json` gains/changes fields; `src/data/research.ts` re-exports new inferred types; `research-archive.tsx` is edited in place for the new author/SDG shape; a new `research-metrics.tsx` component is added and wired into `page.tsx` with a new sidebar nav entry. No database, no server actions, no API changes.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind 4. No test runner in this repo — verification is `npm run lint`, `npm run typecheck`, and manual check via `npm run dev`.

**Reference spec:** `docs/superpowers/specs/2026-07-18-research-outputs-publications-design.md`

---

## File Structure

- Modify: `src/data/research.json` — featured publications, faculty research blurb, new `researchMetrics` key, overview highlights
- Modify: `src/data/research.ts` — add `ResearchMetrics` type + export, extend `FeaturedPublication`-adjacent types (auto-inferred, no manual work needed)
- Modify: `src/components/public/research/research-archive.tsx` — render multi-author + SDG badges
- Create: `src/components/public/research/research-metrics.tsx` — new section component
- Modify: `src/app/(public)/research/page.tsx` — import + wire new component and nav item

---

### Task 1: Replace Featured Publications data

**Files:**
- Modify: `src/data/research.json:322-350`

- [ ] **Step 1: Replace the `featuredPublications` array**

Find this exact block in `src/data/research.json`:

```json
    "featuredPublications": [
      {
        "id": "pub-1",
        "title": "Machine Learning Approaches to Early Detection of Dengue Fever in Central Luzon",
        "authors": "Santos, M.C., Reyes, J.A., and Cruz, A.L.",
        "year": "2024",
        "venue": "Journal of Health Informatics in Developing Countries",
        "type": "Journal Article",
        "url": null
      },
      {
        "id": "pub-2",
        "title": "Flipped Classroom Pedagogy and its Effects on Academic Performance in Philippine Higher Education",
        "authors": "Dela Pena, R.S., and Manaloto, G.T.",
        "year": "2024",
        "venue": "Asia-Pacific Journal of Education",
        "type": "Journal Article",
        "url": null
      },
      {
        "id": "pub-3",
        "title": "Community-Based Disaster Risk Reduction in Pampanga: A Participatory Action Research Approach",
        "authors": "Torres, L.M., Bautista, E.F., and Villanueva, C.J.",
        "year": "2023",
        "venue": "Philippine Journal of Social Development",
        "type": "Journal Article",
        "url": null
      }
    ],
```

Replace it with:

```json
    "featuredPublications": [
      {
        "id": "pub-1",
        "title": "Diagnostic efficiency of fecal lactoferrin in detecting bacterial gastroenteritis: a systematic review and meta-analysis",
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
      },
      {
        "id": "pub-2",
        "title": "Research on construction schedule optimization model based on particle swarm optimization algorithm",
        "authors": [
          { "name": "Dr. Joey Aviles", "role": "Co-author", "college": "College of Computer Studies, Graduate School" }
        ],
        "year": "2024",
        "venue": "2024 8th International Conference on Electrical, Mechanical and Computer Engineering (ICEMCE 2024)",
        "type": "Conference Paper",
        "sdgs": [9, 11],
        "url": null
      },
      {
        "id": "pub-3",
        "title": "Construction Scheduling Optimization of Prefabricated Buildings Under Resource Constraints Based on an Improved Whale Optimization Algorithm",
        "authors": [
          { "name": "Dr. Joey Aviles", "role": "Co-author", "college": "College of Computer Studies, Graduate School" }
        ],
        "year": "2024",
        "venue": "International Journal of Computational Intelligence Systems",
        "type": "Journal Article",
        "sdgs": [9, 11],
        "url": null
      },
      {
        "id": "pub-4",
        "title": "Trust-Aware Hybrid Collaborative Recommendation with Locality-Sensitive Hashing",
        "authors": [
          { "name": "Dr. James Esquivel", "role": "Co-author", "college": "College of Computer Studies, Graduate School" }
        ],
        "year": "2025",
        "venue": "Tsinghua Science and Technology",
        "type": "Journal Article",
        "sdgs": [9],
        "url": null
      },
      {
        "id": "pub-5",
        "title": "When Health Behavior Meets Technology: Artificial Neural Network–Based Prediction of Breast Self-Examination Intentions Among Filipino Female College Students",
        "authors": [
          { "name": "Tiongco, Raphael Enrique", "role": "Main Author", "college": "College of Allied Medical Professions" },
          { "name": "Navarro, Annalyn T.", "role": "Co-author", "college": "Office of the VP for R & I, College of Allied Medical Professions" },
          { "name": "Santillan, Jennifer P.", "role": "Co-author", "college": "College of Education" },
          { "name": "Dayrit, Sofia Alexis", "role": "Co-author", "college": "College of Allied Medical Profession" },
          { "name": "Mañalac, Arch Raphael", "role": "Co-author", "college": "College of Allied Medical Profession" }
        ],
        "year": "2025",
        "venue": "Journal of Cancer Education",
        "type": "Journal Article",
        "sdgs": [3],
        "url": null
      }
    ],
```

- [ ] **Step 2: Validate JSON syntax**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/data/research.json','utf8')); console.log('valid')"`
Expected: `valid`

- [ ] **Step 3: Commit**

```bash
git add src/data/research.json
git commit -m "data: replace fictional featured publications with real OVPRI award entries"
```

---

### Task 2: Refresh Faculty and Student Research blurb

**Files:**
- Modify: `src/data/research.json` (`archive.facultyResearch`, immediately after the block edited in Task 1)

- [ ] **Step 1: Replace the `facultyResearch` block**

Find:

```json
    "facultyResearch": {
      "description": "AUF faculty actively engage in funded and unfunded research across all disciplines. Browse the faculty research repository for working papers, completed studies, and ongoing projects.",
      "highlights": [
        "Browse by department, research thrust, or year",
        "Access pre-publication manuscripts and working papers",
        "Download theses and dissertations from the AUF Graduate School",
        "Track citations and research impact metrics"
      ],
      "repositoryUrl": null,
      "thesisUrl": null
    },
```

Replace with:

```json
    "facultyResearch": {
      "description": "Discover ongoing and completed research projects led by AUF faculty and graduate students. Each entry includes:",
      "highlights": [
        "Title and abstract",
        "Author(s) and affiliation",
        "Publication venue or status",
        "Downloadable links (if available)"
      ],
      "repositoryUrl": null,
      "thesisUrl": null
    },
```

- [ ] **Step 2: Validate JSON syntax**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/data/research.json','utf8')); console.log('valid')"`
Expected: `valid`

- [ ] **Step 3: Commit**

```bash
git add src/data/research.json
git commit -m "data: refresh faculty and student research blurb from source content"
```

---

### Task 3: Add `researchMetrics` data block

**Files:**
- Modify: `src/data/research.json` (insert a new top-level key between `archive` and `news`)

- [ ] **Step 1: Insert `researchMetrics` between `archive` and `news`**

Find this exact transition (the end of the `archive` object and the start of `news`):

```json
    ]
  },

  "news": {
```

Replace with (note: this keeps the `]`/`},` that closes `archive.journals`/`archive`, and adds the new key before `"news"`):

```json
    ]
  },

  "researchMetrics": {
    "navLabel": "Metrics & Impact",
    "eyebrow": "Tracking our progress",
    "title": "Research Metrics and Impact",
    "description": "AUF's research output and funding performance, tracked against national and international benchmarks.",
    "rankings": {
      "theQs": "The university has also achieved sustained visibility in international rankings, consistently appearing in multiple Times Higher Education (THE) Impact Rankings categories such as SDG 3, SDG 4, SDG 5, and SDG 11 between 2023 and 2025, as well as maintaining a QS World University Ranking position in 2025. Compared to regional peers, AUF's publication volume remains competitive and has shown steady year-on-year growth, enabling it to sustain its presence in global ranking tables. To maintain and improve its international standing, AUF must continue increasing high-quality indexed publications, expand participation across colleges, and strengthen research visibility initiatives to ensure higher impact and recognition in future THE and QS rankings.",
      "wuri": "In the 2025 WURI Rankings, AUF earned two significant recognitions that underscore its commitment to innovation and transformative education. AUF placed 52nd in the Infrastructure/Technology (B6) category for its AUFlex Academy, a flagship faculty development program offering flexible, technology-driven micro-courses through the MyCLASS platform. Designed to enhance teaching effectiveness and promote student-centered learning, the AUFlex Academy engaged 616 faculty members across all colleges, achieving a 73% average completion rate. The initiative incorporated Project Zero Thinking Routines and received highly favorable feedback for its practical design and impact on classroom practices. Its success was made possible through the collaborative efforts of CARE, OVPAA, HRDC, CQICs, and AB Communication students."
    },
    "facultyPublications": {
      "title": "Full-time Faculty with Publications in Scopus, Web of Science, or ASEAN Citation-Indexed Journals",
      "columns": ["College", "Total FT Faculty (2nd Sem 24-25)", "Scopus", "WoS", "Scopus or WoS", "Proportion"],
      "rows": [
        { "college": "CAMP", "totalFaculty": 60, "scopus": 7, "wos": 7, "scopusOrWos": 8, "proportion": "13.33%" },
        { "college": "CBA", "totalFaculty": 18, "scopus": 1, "wos": 0, "scopusOrWos": 1, "proportion": "5.56%" },
        { "college": "CCS", "totalFaculty": 12, "scopus": 4, "wos": 2, "scopusOrWos": 4, "proportion": "33.33%" },
        { "college": "CCFP", "totalFaculty": 19, "scopus": 1, "wos": 1, "scopusOrWos": 1, "proportion": "5.26%" },
        { "college": "CON", "totalFaculty": 58, "scopus": 9, "wos": 2, "scopusOrWos": 9, "proportion": "15.52%" },
        { "college": "GS", "totalFaculty": 2, "scopus": 1, "wos": 0, "scopusOrWos": 1, "proportion": "50.00%" },
        { "college": "Concurrent FT", "totalFaculty": 13, "scopus": 4, "wos": 4, "scopusOrWos": 5, "proportion": "41.67%" }
      ],
      "totalLabel": "Total FT faculty with publication in Scopus or WoS, 2nd Sem 24-25 (out of 386 total FT faculty)",
      "totalCount": 29,
      "totalProportion": "7.51%"
    },
    "funding": {
      "internal": {
        "title": "Internally Funded Research Projects",
        "rows": [
          {
            "title": "No true or false, real or distorted: Familiarity, knowledge, and constructs of teachers and students on gender identity and sexual orientation in a private university",
            "leader": "Dame B. Avelino",
            "unit": "Department of Mass Communication, College of Arts and Sciences"
          },
          {
            "title": "Quality of Work Life (QWL) among Senior High School Teachers",
            "leader": "Dr. Bernadette M. Dalusung",
            "unit": "Department of Social Sciences, College of Arts and Sciences"
          }
        ]
      },
      "external": {
        "title": "Externally Funded Research Projects",
        "rows": [
          {
            "id": "ext-nicer",
            "title": "Accelerated R&D Program for Capacity Building of Research and Development Institutions and Industrial Competitiveness: Niche Centers in the Regions for R&D (NICER) Program — Biomaterials for Diagnostics and Therapeutics Research and Development Center",
            "approvalDate": "February 1, 2022",
            "duration": "36 months (completed January 31, 2025)",
            "leader": "Program Leader: Dr. Reynaldo DL. Bundalian Jr. Project leaders: Dr. Reynaldo DL. Bundalian Jr., Mr. Raphael Enrique G. Tiongco, Engr. Carolyn A. Arbotante",
            "amount": "Php 24,328,690.03",
            "source": "DOST-GIA",
            "status": "ON-GOING",
            "remark": "Preparation of the terminal report for three projects under the program is underway."
          },
          {
            "id": "ext-magnus",
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
  },

  "news": {
```

- [ ] **Step 2: Validate JSON syntax**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/data/research.json','utf8')); console.log('valid')"`
Expected: `valid`

- [ ] **Step 3: Commit**

```bash
git add src/data/research.json
git commit -m "data: add research metrics and impact section (rankings, faculty pubs, funding)"
```

---

### Task 4: Add `ResearchMetrics` type and export

**Files:**
- Modify: `src/data/research.ts:26-35` (add alongside the existing `archive`-related types)

- [ ] **Step 1: Add the type and typed export**

Find:

```ts
export type FeaturedPublication = typeof rawData.archive.featuredPublications[number];
export type ResearchJournal = typeof rawData.archive.journals[number];
export type ResearchArchive = typeof rawData.archive;

export type UpcomingEvent = typeof rawData.news.upcomingEvents[number];
```

Replace with:

```ts
export type FeaturedPublication = typeof rawData.archive.featuredPublications[number];
export type ResearchJournal = typeof rawData.archive.journals[number];
export type ResearchArchive = typeof rawData.archive;

export type FacultyPublicationRow = typeof rawData.researchMetrics.facultyPublications.rows[number];
export type InternalFundingRow = typeof rawData.researchMetrics.funding.internal.rows[number];
export type ExternalFundingRow = typeof rawData.researchMetrics.funding.external.rows[number];
export type ResearchMetrics = typeof rawData.researchMetrics;

export type UpcomingEvent = typeof rawData.news.upcomingEvents[number];
```

Find:

```ts
export const researchArchive: ResearchArchive = rawData.archive;
export const researchNews: ResearchNews = rawData.news;
```

Replace with:

```ts
export const researchArchive: ResearchArchive = rawData.archive;
export const researchMetrics: ResearchMetrics = rawData.researchMetrics;
export const researchNews: ResearchNews = rawData.news;
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: no errors (this only adds exports; nothing consumes them yet)

- [ ] **Step 3: Commit**

```bash
git add src/data/research.ts
git commit -m "data: export ResearchMetrics types from research data loader"
```

---

### Task 5: Update `research-archive.tsx` for multi-author + SDG badges

**Files:**
- Modify: `src/components/public/research/research-archive.tsx`

- [ ] **Step 1: Add the SDG import**

Find:

```tsx
import type { ResearchArchive } from "@/data/research";
```

Replace with:

```tsx
import type { ResearchArchive } from "@/data/research";
import { SDG_LIST } from "@/data/sdgs";
```

- [ ] **Step 2: Replace the author line and add SDG badges in the Featured Publications card**

Find:

```tsx
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${TYPE_COLORS[pub.type] ?? "bg-navy/8 text-navy"}`}>
                  {pub.type}
                </span>
                <span className="text-[10px] font-semibold text-auf-muted">{pub.year}</span>
              </div>
              <p className="font-display text-sm font-semibold leading-snug text-navy md:text-base">
                {pub.title}
              </p>
              <p className="mt-1 text-xs text-auf-muted">{pub.authors}</p>
              {pub.venue && (
                <p className="mt-1 text-xs italic text-auf-muted/70">{pub.venue}</p>
              )}
```

Replace with:

```tsx
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${TYPE_COLORS[pub.type] ?? "bg-navy/8 text-navy"}`}>
                  {pub.type}
                </span>
                <span className="text-[10px] font-semibold text-auf-muted">{pub.year}</span>
                {pub.sdgs?.map((num) => {
                  const sdg = SDG_LIST.find((s) => s.number === num);
                  if (!sdg) return null;
                  return (
                    <span
                      key={num}
                      title={`SDG ${num}: ${sdg.title}`}
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold text-white"
                      style={{ backgroundColor: sdg.color }}
                    >
                      SDG {num}
                    </span>
                  );
                })}
              </div>
              <p className="font-display text-sm font-semibold leading-snug text-navy md:text-base">
                {pub.title}
              </p>
              <p className="mt-1 text-xs text-auf-muted">
                {pub.authors.map((a) => a.name).join(", ")}
              </p>
              <p className="mt-0.5 text-[11px] text-auf-muted/70">
                {pub.authors[0]?.role}, {pub.authors[0]?.college}
              </p>
              {pub.venue && (
                <p className="mt-1 text-xs italic text-auf-muted/70">{pub.venue}</p>
              )}
```

- [ ] **Step 3: Typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/components/public/research/research-archive.tsx
git commit -m "feat: render multi-author list and SDG badges on featured publication cards"
```

---

### Task 6: Create the `ResearchMetrics` component

**Files:**
- Create: `src/components/public/research/research-metrics.tsx`

- [ ] **Step 1: Write the component**

```tsx
import type { ResearchMetrics } from "@/data/research";

const STATUS_COLORS: Record<string, string> = {
  "ON-GOING": "bg-gold/15 text-[var(--auf-gold)]",
  "COMPLETED": "bg-navy/8 text-navy",
};

export function ResearchMetrics({ metrics }: { metrics: ResearchMetrics }) {
  const { facultyPublications, funding, rankings } = metrics;

  return (
    <section id="metrics-impact" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {metrics.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{metrics.title}</h2>
      {metrics.description && (
        <p className="mb-10 text-sm leading-relaxed text-auf-muted">{metrics.description}</p>
      )}

      {/* A — Rankings & Recognition */}
      <div className="mb-12">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">A</span>
          <h3 className="font-display text-lg font-semibold text-navy">Rankings & Recognition</h3>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-auf-border bg-off-white p-4 md:p-5">
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-navy">
              Publications and University Rankings
            </p>
            <p className="text-sm leading-relaxed text-auf-muted">{rankings.theQs}</p>
          </div>
          <div className="rounded-xl border border-auf-border bg-off-white p-4 md:p-5">
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-navy">
              University Rankings for Innovation (WURI)
            </p>
            <p className="text-sm leading-relaxed text-auf-muted">{rankings.wuri}</p>
          </div>
        </div>
      </div>

      {/* B — Faculty Publications by College */}
      <div className="mb-12">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">B</span>
          <h3 className="font-display text-lg font-semibold text-navy">Faculty Publications by College</h3>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-auf-muted">{facultyPublications.title}</p>
        <div className="overflow-x-auto rounded-xl border border-auf-border">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-navy text-white">
                {facultyPublications.columns.map((col) => (
                  <th key={col} className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {facultyPublications.rows.map((row) => (
                <tr key={row.college} className="border-t border-auf-border odd:bg-off-white">
                  <td className="px-4 py-2.5 font-semibold text-navy">{row.college}</td>
                  <td className="px-4 py-2.5 text-auf-muted">{row.totalFaculty}</td>
                  <td className="px-4 py-2.5 text-auf-muted">{row.scopus}</td>
                  <td className="px-4 py-2.5 text-auf-muted">{row.wos}</td>
                  <td className="px-4 py-2.5 text-auf-muted">{row.scopusOrWos}</td>
                  <td className="px-4 py-2.5 text-auf-muted">{row.proportion}</td>
                </tr>
              ))}
              <tr className="border-t border-auf-border bg-navy/8 font-bold text-navy">
                <td className="px-4 py-3" colSpan={4}>{facultyPublications.totalLabel}</td>
                <td className="px-4 py-3">{facultyPublications.totalCount}</td>
                <td className="px-4 py-3">{facultyPublications.totalProportion}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* C — Funding Secured */}
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">C</span>
          <h3 className="font-display text-lg font-semibold text-navy">Internal and External Funding Secured</h3>
        </div>

        <p className="mb-3 text-sm font-semibold text-navy">{funding.internal.title}</p>
        <div className="mb-8 space-y-3">
          {funding.internal.rows.map((row, i) => (
            <div key={i} className="rounded-xl border border-auf-border bg-off-white p-4 md:p-5">
              <p className="font-display text-sm font-semibold leading-snug text-navy">{row.title}</p>
              <p className="mt-1 text-xs text-auf-muted">{row.leader}</p>
              <p className="mt-0.5 text-[11px] italic text-auf-muted/70">{row.unit}</p>
            </div>
          ))}
        </div>

        <p className="mb-3 text-sm font-semibold text-navy">{funding.external.title}</p>
        <div className="space-y-3">
          {funding.external.rows.map((row) => (
            <div key={row.id} className="rounded-xl border border-auf-border bg-white p-4 md:p-5">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${STATUS_COLORS[row.status] ?? "bg-navy/8 text-navy"}`}>
                  {row.status}
                </span>
                <span className="text-[10px] font-semibold text-auf-muted">{row.source}</span>
              </div>
              <p className="font-display text-sm font-semibold leading-snug text-navy">{row.title}</p>
              <p className="mt-1 text-xs text-auf-muted">{row.leader}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-auf-muted/80">
                <span>Approved: {row.approvalDate}</span>
                <span>Duration: {row.duration}</span>
                <span className="font-semibold text-navy">{row.amount}</span>
              </div>
              <p className="mt-2 text-[11px] italic text-auf-muted/70">{row.remark}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/public/research/research-metrics.tsx
git commit -m "feat: add ResearchMetrics section component"
```

---

### Task 7: Wire the new section into the Research page

**Files:**
- Modify: `src/app/(public)/research/page.tsx`

- [ ] **Step 1: Add the import**

Find:

```tsx
import { ResearchArchive } from "@/components/public/research/research-archive";
import { ResearchNews } from "@/components/public/research/research-news";
```

Replace with:

```tsx
import { ResearchArchive } from "@/components/public/research/research-archive";
import { ResearchMetrics } from "@/components/public/research/research-metrics";
import { ResearchNews } from "@/components/public/research/research-news";
```

- [ ] **Step 2: Add the data import**

Find:

```tsx
  researchArchive,
  researchNews,
  researchDirectory,
} from "@/data/research";
```

Replace with:

```tsx
  researchArchive,
  researchMetrics,
  researchNews,
  researchDirectory,
} from "@/data/research";
```

- [ ] **Step 3: Add the nav item**

Find:

```tsx
  { id: "archive",             label: researchArchive.navLabel },
  { id: "news-events",         label: researchNews.navLabel },
```

Replace with:

```tsx
  { id: "archive",             label: researchArchive.navLabel },
  { id: "metrics-impact",      label: researchMetrics.navLabel },
  { id: "news-events",         label: researchNews.navLabel },
```

- [ ] **Step 4: Render the component**

Find:

```tsx
            <ResearchArchive archive={researchArchive} />
            {/* ResearchNews is async — fetches recent posts from DB */}
            <ResearchNews news={researchNews} />
```

Replace with:

```tsx
            <ResearchArchive archive={researchArchive} />
            <ResearchMetrics metrics={researchMetrics} />
            {/* ResearchNews is async — fetches recent posts from DB */}
            <ResearchNews news={researchNews} />
```

- [ ] **Step 5: Typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add "src/app/(public)/research/page.tsx"
git commit -m "feat: wire ResearchMetrics section into the Research page"
```

---

### Task 8: Update Overview stats with real figures

**Files:**
- Modify: `src/data/research.json:17-22`

- [ ] **Step 1: Replace the `highlights` array**

Find:

```json
    "highlights": [
      { "label": "Research Centers", "value": "3+" },
      { "label": "Active Grants", "value": "TBA" },
      { "label": "Publications", "value": "TBA" },
      { "label": "Partner Agencies", "value": "TBA" }
    ]
```

Replace with:

```json
    "highlights": [
      { "label": "Research Centers", "value": "3+" },
      { "label": "Active Grants", "value": "2" },
      { "label": "Faculty w/ Scopus/WoS Pubs", "value": "29" },
      { "label": "Partner Agencies", "value": "TBA" }
    ]
```

- [ ] **Step 2: Validate JSON syntax**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/data/research.json','utf8')); console.log('valid')"`
Expected: `valid`

- [ ] **Step 3: Commit**

```bash
git add src/data/research.json
git commit -m "data: update overview stats with real active-grants and faculty-publication figures"
```

---

### Task 9: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Full typecheck**

Run: `npm run typecheck`
Expected: no errors

- [ ] **Step 2: Full lint**

Run: `npm run lint`
Expected: no errors (or only pre-existing warnings unrelated to touched files)

- [ ] **Step 3: Manual check via dev server**

Run: `npm run dev`, open `http://localhost:3000/research`, and confirm:
- Sidebar/mobile nav shows "Metrics & Impact" between "Archive" and "News & Events", and clicking it scrolls to the new section
- Featured Publications (section A of Archive) shows 5 real entries with author names, roles/colleges, and colored SDG badges
- Faculty and Student Research (section B of Archive) shows the updated description/highlights
- New Research Metrics and Impact section renders: two rankings paragraphs, a faculty-publications-by-college table (7 rows + bold total row) that scrolls horizontally on narrow viewports, and internal (2) + external (2) funding entries with status badges
- Overview highlights show "Active Grants: 2" and "Faculty w/ Scopus/WoS Pubs: 29"
- No visual regressions in other Research page sections

Stop the dev server after checking (Ctrl+C).

- [ ] **Step 4: Final commit if any manual fixes were needed**

```bash
git add -A
git commit -m "fix: address issues found in manual verification"
```

(Skip this step if no fixes were needed.)

---

## Self-Review Notes

- **Spec coverage:** Featured Publications (Task 1) ✓, Faculty and Student Research blurb (Task 2) ✓, Research Metrics and Impact — rankings/WURI (Task 3, 6) ✓, faculty publications table (Task 3, 6) ✓, funding tables (Task 3, 6) ✓, Overview stats (Task 8) ✓, nav wiring (Task 7) ✓, type exports (Task 4) ✓.
- **Placeholder scan:** none — all steps contain full, exact code/content sourced from the spec and .md file.
- **Type consistency:** `ResearchMetrics`/`FacultyPublicationRow`/`InternalFundingRow`/`ExternalFundingRow` types (Task 4) match the JSON shape from Task 3; `metrics.rankings.theQs`/`metrics.rankings.wuri`/`facultyPublications.*`/`funding.internal.*`/`funding.external.*` field names used in the Task 6 component match Task 3's JSON exactly; `pub.authors[]`/`pub.sdgs[]` used in Task 5 match Task 1's JSON exactly.
