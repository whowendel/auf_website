import siteData from "./site.json";
import collegesData from "./colleges.json";

// ─── Optional enriched-program details (expandable cards) ─────────────
export type Program = {
  id: string;
  slug: string;
  name: string;
  headName: string | null;
  headTitle: string | null;
  contactEmail: string | null;
  // Optional — only shown when present
  description?: string;
  duration?: string;          // e.g. "4 years", "5 years"
  curriculum?: string[];      // key courses / curriculum highlights
  careers?: string[];         // career opportunities
  admissionRequirements?: string[];
  specializations?: {
    name: string;
    description?: string;
    bullets?: string[];
  }[];
};

// ─── Optional microsite section data ──────────────────────────────────
export type StudentOrganization = {
  id: string;
  name: string;
  description: string;
  advisor?: string | null;
  type?: string | null;       // "Academic" | "Service" | "Religious" | ...
};

export type Activity = {
  id: string;
  name: string;
  description: string;
  date?: string | null;       // "September 2025" or "2024–2025"
  type?: string | null;       // "Event" | "Competition" | "Outreach" | ...
};

export type Affiliation = {
  id: string;
  name: string;
  description?: string | null;
  type?: string | null;       // "Partner Industry" | "Academic Partner" | ...
  website?: string | null;
};

export type CollegeAccreditation = {
  id: string;
  body: string;               // e.g. "PAASCU"
  level?: string | null;      // "Level III" | "Candidate" | ...
  program?: string | null;    // which program (or null = institutional)
  year?: string | null;
  description?: string | null;
};

export type Recognition = {
  id: string;
  title: string;
  description?: string | null;
  by?: string | null;         // awarding body
  year?: string | null;
};

export type Facility = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  features?: string[];        // bulleted features
};

export type Topnotcher = {
  id: string;
  name: string;
  exam: string;               // "Civil Service Exam", "Nursing Board", ...
  rank: string;               // "1st Place", "Top 5", ...
  year: string;
  program?: string | null;    // graduate's program
  photoUrl?: string | null;
};

export type CollegeCta = {
  eyebrow?: string;
  headline: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

// ─── Main College record ──────────────────────────────────────────────
export type College = {
  id: string;
  slug: string;
  shortName: string;
  name: string;
  description: string;
  brandColor: string;
  cardColor: string;
  accentColor: string;
  sortOrder: number;
  isActive: boolean;
  mascotName: string | null;
  mascotLogoUrl: string | null;
  mascotLogoWithTextUrl: string | null;
  dean: { name: string; title: string; photoUrl: string | null };
  contact: { email: string | null; phone: string | null; address: string | null };
  vision: string;
  mission: string;
  programs: Program[];
  history?: string | string[];
  // ─── Optional microsite sections (conditional rendering) ──────────
  goals?: string[];
  studentOrganizations?: StudentOrganization[];
  activities?: Activity[];
  affiliations?: Affiliation[];
  collegeAccreditations?: CollegeAccreditation[];
  recognitions?: Recognition[];
  facilities?: Facility[];
  topnotches?: Topnotcher[];
  cta?: CollegeCta;
};

export type University = typeof siteData.university;

export const university: University = siteData.university;

export const colleges: College[] = (collegesData as College[]).sort(
  (a, b) => a.sortOrder - b.sortOrder,
);

export const activeColleges: College[] = colleges.filter((c) => c.isActive);

export function getCollegeById(id: string): College | undefined {
  return colleges.find((c) => c.id === id);
}

export function getCollegeBySlug(slug: string): College | undefined {
  return colleges.find((c) => c.slug === slug);
}

export function isValidCollegeId(id: string): boolean {
  return colleges.some((c) => c.id === id);
}

export function collegeLabel(id: string | null): string {
  if (!id) return "University";
  return getCollegeById(id)?.shortName ?? id;
}
