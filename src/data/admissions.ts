import rawData from "./admissions.json";

export type AdmissionsHero = typeof rawData.hero;

export type ExamType = typeof rawData.testing.examTypes[number];
export type ExamSchedule = typeof rawData.testing.schedule[number];
export type AdmissionsTesting = typeof rawData.testing;

export type ApplicationStep = typeof rawData.applicationGuide.steps[number];
export type AdmissionsGuide = typeof rawData.applicationGuide;

export type AdmissionsPrograms = typeof rawData.programs;

export type CalendarEvent = typeof rawData.calendar.semesters[number]["events"][number];
export type Semester = typeof rawData.calendar.semesters[number];
export type AdmissionsCalendar = typeof rawData.calendar;

export type ScholarshipCategory = typeof rawData.scholarships.categories[number];
export type AdmissionsScholarships = typeof rawData.scholarships;

export type RegistrarService = typeof rawData.registrar.services[number];
export type AdmissionsRegistrar = typeof rawData.registrar;

export const admissionsHero: AdmissionsHero = rawData.hero;
export const admissionsTesting: AdmissionsTesting = rawData.testing;
export const admissionsGuide: AdmissionsGuide = rawData.applicationGuide;
export const admissionsPrograms: AdmissionsPrograms = rawData.programs;
export const admissionsCalendar: AdmissionsCalendar = rawData.calendar;
export const admissionsScholarships: AdmissionsScholarships = rawData.scholarships;
export const admissionsRegistrar: AdmissionsRegistrar = rawData.registrar;
