import rawData from "./international-students.json";

export type IntlHero       = typeof rawData.hero;
export type IntlOverview   = typeof rawData.overview;
export type IntlPhilippines = typeof rawData.whyPhilippines;
export type IntlAdmissions = typeof rawData.admissions;
export type IntlVisa       = typeof rawData.visa;
export type IntlSupport    = typeof rawData.support;
export type IntlApply      = typeof rawData.apply;

export const intlHero:        IntlHero        = rawData.hero;
export const intlOverview:    IntlOverview    = rawData.overview;
export const intlPhilippines: IntlPhilippines = rawData.whyPhilippines;
export const intlAdmissions:  IntlAdmissions  = rawData.admissions;
export const intlVisa:        IntlVisa        = rawData.visa;
export const intlSupport:     IntlSupport     = rawData.support;
export const intlApply:       IntlApply       = rawData.apply;
