# Revision Fix Plan

Source: "AUF Website Content and Revisions.pdf" (8 pages, 16 screenshots reviewed).
Status: DRAFT, awaiting approval. No code changed yet.

## A. Broken links (root cause: wrong hrefs / hash ids)

| # | Item | Cause | Fix |
|---|------|-------|-----|
| A1 | College navbar "Apply now" 404 | `microsite-header.tsx:85` and `microsite-footer.tsx:33` link `/admissions/how-to-apply` (no such route) | Point to `/admissions#application-guide` |
| A2 | "View campus map" 404 | `microsite-contact.tsx:101` links `/contact` (no such route) | Link to Google Maps URL for `university.address` (new tab), or add `mapUrl` to site data. Needs decision |
| A3 | Academic Programs / Calendar 404 | `nav-data.ts:18-19` use `/academics#...` (no route) | `/admissions#academic-programs`, `/admissions#academic-calendar` |
| A4 | Admissions nav hashes do not scroll | `nav-data.ts:17,20,21` use `#how-to-apply`, `#scholarships`, `#registrar`; real ids are `application-guide`, `scholarships-grants`, `university-registrar` | Fix three ids in `nav-data.ts` |
| A5 | Footer Admissions links dead | `site-footer.tsx:75-81` all `href="#"` | Map each label to its real hash |
| A6 | Footer About links all go to `/about` top | `site-footer.tsx:57-65` single href for all | Per-label hash: history, vision-mission, governance, rankings |
| A7 | Alumni buttons all go to section top | Alumni ids match nav; verify the in-page buttons/sidebar | Check `alumni/page.tsx` and sidebar, fix mismatched ids |
| A8 | Footer links stop working on 2nd visit | Likely same-route hash `Link` after client nav, plus `href="#"` items | Verify in browser after A5/A6; if still broken, scroll-to-hash on `hashchange` in the page layout |
| A9 | Learning Resources open in same tab | `nav-data.ts:94-97` external links, overlay renders `<Link>` without target | Detect `http` hrefs in `overlay-menu.tsx` and add `target="_blank" rel="noopener noreferrer"` |
| A10 | Featured "Find your college" | `nav-data.ts:57` `href: "#"` (not in PDF, same class of bug) | Point to `/#colleges` |

## B. Mobile responsiveness

| # | Item | Cause | Fix |
|---|------|-------|-----|
| B1 | Admissions tables cut off | `admissions-testing.tsx:89` and `admissions-calendar.tsx:~40` wrap table in `overflow-hidden` | Change to `overflow-x-auto`, add `min-w-[640px]` on table |
| B2 | College tab strip cannot scroll left past "Organizations" | `microsite-header.tsx:195` uses `justify-center` + `overflow-x-auto`; centered overflow clips the left side | Inner wrapper `mx-auto flex w-max` inside the scroller (centers when it fits, scrolls from left when not) |
| B3 | Pages needing horizontal scroll | Unknown offender(s) | Audit at 360/390px with devtools: find element wider than viewport per page; likely tables, fixed-width cards, org chart |
| B4 | SDG text cutoff | Candidates: `line-clamp-2` at SDG page line 70, fixed `h-20 w-20` tiles | Remove clamp / allow wrap; confirm against screenshot |

## C. College microsite content and visibility

| # | Item | Plan |
|---|------|------|
| C1 | CBA statistics text not visible | Likely color contrast on the stat tiles (`bg-white/25` over brand gradient, `microsite-header.tsx:171`, or CBA brand color). Check CBA `brandColor` / `accentColor` in `colleges.json`; fix contrast |
| C2 | CEA topnotcher formatting | CEA has more than 6 entries so it uses the accordion; `name` + rank pill layout wraps badly. Add `min-w-0`, `break-words`, let pill wrap under name on mobile |
| C3 | CED text visibility | Same contrast check as C1 using CED colors |
| C4 | Placeholder facilities | Content gap: facilities with no `imageUrl` render a gradient placeholder. Need real photos/descriptions from client; code stays |
| C5 | Dropdown card interaction | Single-open accordions (`microsite-programs.tsx`, topnotches): closing the previous card shifts layout so the new card jumps. Fix: scroll the opened card into view after the collapse animation, or keep multiple open. Needs your preference |
| C6 | "Weird card interaction?" | Ambiguous in PDF. Need clarification (which page/card) |
| C7 | Leadership / Org Charts missing | Components exist and are rendered on `/about`. Not in the main nav, so likely a nav gap: add "Leadership" and "Organizational Chart" under About in `nav-data.ts` (`#leadership`, `#org-chart`) |

## Screenshot findings (supersede the guesses above)

- C1/C3 root cause: on CBA, `accentColor #F2C300` sits on `brandColor #EAB308` (gold on gold), so the "The Tigers" eyebrow, "Reach us" labels, stat numbers and the Apply now / Home pills are invisible. CED: gold labels on cyan `#06B6D4` and the faint "University contact" card are low contrast. Fix once: a readable-accent helper in `src/lib/color.ts` (pick white or navy by luminance vs brand) used by microsite header, contact and stats, instead of per-college data edits.
- C2: topnotcher cards (accordion body) squeeze the name into a narrow column and the rank pill overflows off-card. Fix: stack name over pill on mobile, `min-w-0 break-words`, pill `whitespace-normal`.
- B1 extra: Registrar card "Certificate of Registration" validity pill overflows the card (`microsite`-style `whitespace-nowrap`); allow wrap.
- B4 corrected: the SDG ranking table (research SDG page) clips its right columns on mobile; not a line-clamp issue. Fix: stack year/SDG/rank, or `overflow-x-auto`, titles wrap.
- B5 (new): translucent fixed header on mobile lets page text show through the logo/navbar (seen on CBA, CEA, CED, SDG pages). Give the header an opaque background once scrolled.
- C6 resolved ("weird card interaction"): organization cards (`microsite-orgs.tsx:103`) sit in a grid with default stretch, so expanding one card stretches its row neighbors into tall empty boxes. Fix: `items-start`. C5: lift open state to the grid so one card is open at a time.
- A7 resolved: Alumni "Stay Connected" buttons (Update Records, Find a Chapter, Sign Up to Mentor, Give Back) have placeholder hrefs in `alumni-connect.tsx`/data. Need real destinations (forms or emails) from the client; until then link to `mailto:` of the alumni office.
- C7 confirmed: About page sidebar lists Leadership and Organizational Charts, but the overlay menu About list does not. Add both to `nav-data.ts`; also reorder sidebar to match page order.
- A9 extra: header quick links (MYAU, MYCLASS, GMAIL) are external too; same `target="_blank"` rule.

## Execution order
1. A (all link fixes, mostly data and one-line edits), one commit.
2. B1, B2 (two small edits), then B3 audit, then B4. One commit.
3. C1-C3, C7, then C2. One commit.
4. C5 after you choose behavior. C4 and C6 blocked on input.
5. After each group: `npm run lint && npm run typecheck`, manual check in `npm run dev` at 390px and desktop; update `docs/CHANGELOGS.md` and `docs/activity-log.md`.

## Open questions
- A2: Google Maps link acceptable, or is a Contact page wanted?
- C5: keep one-at-a-time and fix the jump, or allow several open?
- C6 and B3/B4/C1-C3: the PDF text has no screenshots; exact pages/cards to be confirmed during the dev-server audit.
