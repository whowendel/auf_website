import rawData from "./connect.json";

export type ConnectHero       = typeof rawData.hero;
export type ConnectCampuses   = typeof rawData.campuses;
export type ConnectDirectory  = typeof rawData.directory;

export type Campus            = typeof rawData.campuses.campusList[number];
export type AcademicUnit      = typeof rawData.campuses.campusList[number]["academicUnits"][number];
export type GeneralInquiry    = typeof rawData.directory.generalInquiries[number];
export type CollegeConcern    = typeof rawData.directory.collegeConcerns[number];

export const connectHero:      ConnectHero      = rawData.hero;
export const connectCampuses:  ConnectCampuses  = rawData.campuses;
export const connectDirectory: ConnectDirectory = rawData.directory;
