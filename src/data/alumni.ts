import rawData from "./alumni.json";

export type AlumniHero         = typeof rawData.hero;
export type AlumniOverview     = typeof rawData.overview;
export type AlumniAssociation  = typeof rawData.association;
export type AlumniNotable      = typeof rawData.notableAlumni;
export type AlumniBenefits     = typeof rawData.benefits;
export type AlumniEvents       = typeof rawData.events;
export type AlumniConnect      = typeof rawData.connect;

export const alumniHero:        AlumniHero        = rawData.hero;
export const alumniOverview:    AlumniOverview    = rawData.overview;
export const alumniAssociation: AlumniAssociation = rawData.association;
export const alumniNotable:     AlumniNotable     = rawData.notableAlumni;
export const alumniBenefits:    AlumniBenefits    = rawData.benefits;
export const alumniEvents:      AlumniEvents      = rawData.events;
export const alumniConnect:     AlumniConnect     = rawData.connect;
