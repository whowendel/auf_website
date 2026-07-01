import rawData from "./external-affairs.json";

// ─── Types (inferred from JSON) ────────────────────────────────────────

export type ExternalAffairsHero = typeof rawData.hero;
export type ExternalAffairsOverview = typeof rawData.overview;
export type ExternalAffairsVisionMission = typeof rawData.visionMission;
export type ExternalAffairsHistory = typeof rawData.history;
export type ExternalAffairsNews = typeof rawData.news;
export type ExternalAffairsLeadership = typeof rawData.leadership;
export type ExternalAffairsOrgChart = typeof rawData.orgChart;
export type ExternalAffairsFactsFigures = typeof rawData.factsFigures;
export type ExternalAffairsRecognitions = typeof rawData.recognitions;

/** Milestone shape compatible with the reusable Timeline component. */
export type ExternalAffairsMilestone = typeof rawData.history.milestones[number];

/** Single goal item. */
export type ExternalAffairsGoal = typeof rawData.visionMission.goals[number];

// ─── Typed exports ────────────────────────────────────────────────────

export const eaHero: ExternalAffairsHero = rawData.hero;
export const eaOverview: ExternalAffairsOverview = rawData.overview;
export const eaVisionMission: ExternalAffairsVisionMission = rawData.visionMission;
export const eaHistory: ExternalAffairsHistory = rawData.history;
export const eaNews: ExternalAffairsNews = rawData.news;
export const eaLeadership: ExternalAffairsLeadership = rawData.leadership;
export const eaOrgChart: ExternalAffairsOrgChart = rawData.orgChart;
export const eaFactsFigures: ExternalAffairsFactsFigures = rawData.factsFigures;
export const eaRecognitions: ExternalAffairsRecognitions = rawData.recognitions;
