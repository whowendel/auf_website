import rawData from "./privacy-policy.json";

export type PrivacyHero = typeof rawData.hero;
export type PrivacyOverview = typeof rawData.overview;
export type PrivacyInformationCollect = typeof rawData.informationCollect;
export type PrivacyHowWeUse = typeof rawData.howWeUse;
export type PrivacyInformationSharing = typeof rawData.informationSharing;
export type PrivacyCookies = typeof rawData.cookies;
export type PrivacyStudentRecords = typeof rawData.studentRecords;
export type PrivacyDataSecurity = typeof rawData.dataSecurity;
export type PrivacyYourRights = typeof rawData.yourRights;
export type PrivacyPolicyChanges = typeof rawData.policyChanges;
export type PrivacyContactDPO = typeof rawData.contactDPO;

export const privacyHero: PrivacyHero = rawData.hero;
export const privacyOverview: PrivacyOverview = rawData.overview;
export const privacyInformationCollect: PrivacyInformationCollect = rawData.informationCollect;
export const privacyHowWeUse: PrivacyHowWeUse = rawData.howWeUse;
export const privacyInformationSharing: PrivacyInformationSharing = rawData.informationSharing;
export const privacyCookies: PrivacyCookies = rawData.cookies;
export const privacyStudentRecords: PrivacyStudentRecords = rawData.studentRecords;
export const privacyDataSecurity: PrivacyDataSecurity = rawData.dataSecurity;
export const privacyYourRights: PrivacyYourRights = rawData.yourRights;
export const privacyPolicyChanges: PrivacyPolicyChanges = rawData.policyChanges;
export const privacyContactDPO: PrivacyContactDPO = rawData.contactDPO;
