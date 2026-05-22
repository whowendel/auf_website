import rawData from "./partnerships.json";

export type PartnershipsHero              = typeof rawData.hero;
export type PartnershipsGuidelines        = typeof rawData.guidelines;
export type PartnershipsForms             = typeof rawData.forms;
export type PartnershipsCurricular        = typeof rawData.curricularPartners;
export type PartnershipsIndustry          = typeof rawData.industryPartners;
export type PartnershipsNetworks          = typeof rawData.networks;

export type GuidelineFlowStep             = typeof rawData.guidelines.flow[number];
export type CurricularCategory           = typeof rawData.curricularPartners.categories[number];
export type CurricularPartner            = typeof rawData.curricularPartners.categories[number]["partners"][number];
export type IndustrySector               = typeof rawData.industryPartners.sectors[number];
export type NetworkMembership            = typeof rawData.networks.memberships[number];

export const partnershipsHero:       PartnershipsHero       = rawData.hero;
export const partnershipsGuidelines: PartnershipsGuidelines = rawData.guidelines;
export const partnershipsForms:      PartnershipsForms      = rawData.forms;
export const partnershipsCurricular: PartnershipsCurricular = rawData.curricularPartners;
export const partnershipsIndustry:   PartnershipsIndustry   = rawData.industryPartners;
export const partnershipsNetworks:   PartnershipsNetworks   = rawData.networks;
