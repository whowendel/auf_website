import rawData from "./careers.json";

export type CareersHero      = typeof rawData.hero;
export type CareersOverview  = typeof rawData.overview;
export type CareersServices  = typeof rawData.services;
export type CareersResources = typeof rawData.resources;
export type CareersPartners  = typeof rawData.partners;
export type CareersOpenings  = typeof rawData.openings;
export type CareersEvents    = typeof rawData.events;
export type CareersContact   = typeof rawData.contact;

export const careersHero:      CareersHero      = rawData.hero;
export const careersOverview:  CareersOverview  = rawData.overview;
export const careersServices:  CareersServices  = rawData.services;
export const careersResources: CareersResources = rawData.resources;
export const careersPartners:  CareersPartners  = rawData.partners;
export const careersOpenings:  CareersOpenings  = rawData.openings;
export const careersEvents:    CareersEvents    = rawData.events;
export const careersContact:   CareersContact   = rawData.contact;
