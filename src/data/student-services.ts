import rawData from "./student-services.json";
import type { SidebarItem } from "@/components/public/page-layout/inner-page-sidebar";

// ─── Shared base for every office ─────────────────────────────────────

export type OfficeBase = {
  id: string;
  slug: string;
  label: string;
  navLabel: string;
  tagline: string;
  imageUrl: string | null;
};

// ─── Explicit per-office types ─────────────────────────────────────────

export type OfficeItem = {
  id: string;
  heading: string;
  body: string | null;
  bullets: string[];
};

export type StudentAffairsOffice = OfficeBase & {
  intro: string | null;
  items: OfficeItem[];
};

export type CoreService = {
  id: string;
  title: string;
  description: string;
};

export type AppointmentStep = {
  number: number;
  heading: string;
  body: string;
  qrCodeUrl?: string;
};

export type OfficeContact = {
  email: string;
  hours: string;
  location: string;
};

export type GuidanceLocation = {
  id: string;
  label: string;
  room: string;
  building: string;
  hours: string;
};

export type GuidancePhoneExtension = {
  label: string;
  local: string;
};

export type GuidanceContact = {
  emails: string[];
  phone: {
    base: string;
    extensions: GuidancePhoneExtension[];
  };
};

export type GccStaffMember = {
  id: string;
  name: string;
  role: string;
};

export type GuidanceOffice = OfficeBase & {
  intro: string;
  mainOffice: GuidanceLocation;
  satelliteOffices: GuidanceLocation[];
  philosophy: string;
  objectives: string[];
  staff: GccStaffMember[];
  coreServices: CoreService[];
  appointmentSteps: AppointmentStep[];
  confidentiality: string;
  contact: GuidanceContact;
};

export type HealthOffice = OfficeBase & {
  vision: string;
  aims: string[];
};

export type SportsOffice = OfficeBase & {
  intro: string;
  varsitySports: string[];
  intramural: string;
  scholarships: string;
  facilities: string[];
  contact: OfficeContact;
};

export type PerformingArtsGroup = {
  id: string;
  name: string;
  description: string | null;
  photoUrl: string | null;
  gifUrl: string | null;
};

export type CultureOffice = OfficeBase & {
  intro: string[];
  performingArtsGroups: PerformingArtsGroup[];
  contact: OfficeContact;
};

export type CCFPProgram = {
  id: string;
  body: string;
};

export type CCFPOffice = OfficeBase & {
  intro: string;
  programs: CCFPProgram[];
  closing: string;
};

// ─── Group type ────────────────────────────────────────────────────────

export type ServiceGroup = {
  id: string;
  slug: string;
  groupLabel: string;
  tagline: string;
  brandColor: string;
  accentColor: string;
  offices: (StudentAffairsOffice | GuidanceOffice | HealthOffice | SportsOffice | CultureOffice | CCFPOffice)[];
};

// ─── Hero ──────────────────────────────────────────────────────────────

export type StudentServicesHero = typeof rawData.hero;
export const servicesHero: StudentServicesHero = rawData.hero;

// ─── Typed group/office exports ────────────────────────────────────────

export const serviceGroups: ServiceGroup[] = rawData.groups as unknown as ServiceGroup[];

const [mabuti, magaling, malasakit] = serviceGroups;

// Offices typed explicitly — components import these directly
export const studentAffairsOffice = mabuti.offices[0] as StudentAffairsOffice;
export const guidanceOffice = mabuti.offices[1] as GuidanceOffice;
export const healthOffice = magaling.offices[0] as HealthOffice;
export const sportsOffice = magaling.offices[1] as SportsOffice;
export const cultureOffice = magaling.offices[2] as CultureOffice;
export const ccfpOffice = malasakit.offices[0] as CCFPOffice;

// Groups
export const mabutiGroup = mabuti;
export const magalingGroup = magaling;
export const malasakitGroup = malasakit;

// ─── Navigation helpers ────────────────────────────────────────────────

export const officeNavItems: SidebarItem[] = serviceGroups.flatMap((g) =>
  g.offices.map((o) => ({ id: o.id, label: o.navLabel })),
);

export const groupedNavItems = serviceGroups.map((g) => ({
  groupLabel: g.groupLabel,
  brandColor: g.brandColor,
  items: g.offices.map((o) => ({ id: o.id, label: o.navLabel })),
}));
