import rawData from "./research.json";

// ─── Types inferred from JSON ──────────────────────────────────────────

export type ResearchHero = typeof rawData.hero;

export type ResearchOverview = typeof rawData.overview;
export type ResearchOverviewHighlight = typeof rawData.overview.highlights[number];

export type ResearchAbout = typeof rawData.about;

export type ResearchVisionMission = typeof rawData.visionMission;

export type ResearchCenter = typeof rawData.centers.items[number];
export type ResearchCenters = typeof rawData.centers;

export type ResearchThrust = typeof rawData.thrusts.items[number];
export type ResearchThrusts = typeof rawData.thrusts;

export type ServiceCategory = typeof rawData.services.categories[number];
export type ResearchServices = typeof rawData.services;

export type GrantOpportunity = typeof rawData.grants.opportunities[number];
export type ResearchGrants = typeof rawData.grants;

export type FeaturedPublication = typeof rawData.archive.featuredPublications[number];
export type ResearchJournal = typeof rawData.archive.journals[number];
export type ResearchArchive = typeof rawData.archive;

export type FacultyPublicationRow = typeof rawData.researchMetrics.facultyPublications.rows[number];
export type InternalFundingRow = typeof rawData.researchMetrics.funding.internal.rows[number];
export type ExternalFundingRow = typeof rawData.researchMetrics.funding.external.rows[number];
export type ResearchMetrics = typeof rawData.researchMetrics;

export type UpcomingEvent = typeof rawData.news.upcomingEvents[number];
export type Announcement = typeof rawData.news.announcements[number];
export type ResearchNews = typeof rawData.news;

export type FeaturedResearcher = typeof rawData.directory.featuredResearchers[number];
export type ResearchDirectory = typeof rawData.directory;

// ─── Typed exports ────────────────────────────────────────────────────

export const researchHero: ResearchHero = rawData.hero;
export const researchOverview: ResearchOverview = rawData.overview;
export const researchAbout: ResearchAbout = rawData.about;
export const researchVisionMission: ResearchVisionMission = rawData.visionMission;
export const researchCenters: ResearchCenters = rawData.centers;
export const researchThrusts: ResearchThrusts = rawData.thrusts;
export const researchServices: ResearchServices = rawData.services;
export const researchGrants: ResearchGrants = rawData.grants;
export const researchArchive: ResearchArchive = rawData.archive;
export const researchMetrics: ResearchMetrics = rawData.researchMetrics;
export const researchNews: ResearchNews = rawData.news;
export const researchDirectory: ResearchDirectory = rawData.directory;
