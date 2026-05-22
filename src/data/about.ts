import rawData from "./about.json";

// ─── Re-export inferred types straight from JSON ───────────────────────

export type AboutHero = typeof rawData.hero;

export type HistoryMilestone = typeof rawData.history.milestones[number];
export type AboutHistory = typeof rawData.history;

export type ProfileHighlight = typeof rawData.profile.highlights[number];
export type ProfileRecognition = typeof rawData.profile.recognitions[number];
export type AboutProfile = typeof rawData.profile;

export type Accreditation = typeof rawData.rankings.accreditations[number];
export type InternationalRanking = typeof rawData.rankings.international[number];
export type AboutRankings = typeof rawData.rankings;

export type AboutFounder = typeof rawData.founder;

export type GovernancePerson = typeof rawData.governance.boardOfTrustees[number];
export type AboutGovernance = typeof rawData.governance;

export type PolicyItem = typeof rawData.visionMission.qualityPolicy[number];
export type AboutVisionMission = typeof rawData.visionMission;

export type CoreVirtue = typeof rawData.coreValues.virtues[number];
export type AboutCoreValues = typeof rawData.coreValues;

export type GraduateAttribute = typeof rawData.attributes.items[number];
export type AboutAttributes = typeof rawData.attributes;

export type AboutLeadership = typeof rawData.leadership;
export type AboutPresident = typeof rawData.leadership.president;

export type OrgChart = typeof rawData.orgChart.charts[number];
export type AboutOrgChart = typeof rawData.orgChart;

// ─── Typed exports ────────────────────────────────────────────────────

export const aboutHero: AboutHero = rawData.hero;
export const aboutHistory: AboutHistory = rawData.history;
export const aboutProfile: AboutProfile = rawData.profile;
export const aboutRankings: AboutRankings = rawData.rankings;
export const aboutFounder: AboutFounder = rawData.founder;
export const aboutGovernance: AboutGovernance = rawData.governance;
export const aboutVisionMission: AboutVisionMission = rawData.visionMission;
export const aboutCoreValues: AboutCoreValues = rawData.coreValues;
export const aboutAttributes: AboutAttributes = rawData.attributes;
export const aboutLeadership: AboutLeadership = rawData.leadership;
export const aboutOrgChart: AboutOrgChart = rawData.orgChart;
