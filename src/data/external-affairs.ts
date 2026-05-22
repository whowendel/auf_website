import rawData from "./external-affairs.json";

// ─── Types (inferred from JSON) ────────────────────────────────────────

export type ExternalAffairsHero = typeof rawData.hero;
export type ExternalAffairsOverview = typeof rawData.overview;
export type ExternalAffairsVisionMission = typeof rawData.visionMission;
export type ExternalAffairsHistory = typeof rawData.history;
export type ExternalAffairsNews = typeof rawData.news;

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
