export type SdgInfo = {
  number: number;
  title: string;
  color: string;
  description: string;
};

export const SDG_LIST: SdgInfo[] = [
  {
    number: 1,
    title: "No Poverty",
    color: "#E5243B",
    description: "End poverty in all its forms everywhere.",
  },
  {
    number: 2,
    title: "Zero Hunger",
    color: "#DDA63A",
    description: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture.",
  },
  {
    number: 3,
    title: "Good Health and Well-being",
    color: "#4C9F38",
    description: "Ensure healthy lives and promote well-being for all at all ages.",
  },
  {
    number: 4,
    title: "Quality Education",
    color: "#C5192D",
    description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
  },
  {
    number: 5,
    title: "Gender Equality",
    color: "#FF3A21",
    description: "Achieve gender equality and empower all women and girls.",
  },
  {
    number: 6,
    title: "Clean Water and Sanitation",
    color: "#26BDE2",
    description: "Ensure availability and sustainable management of water and sanitation for all.",
  },
  {
    number: 7,
    title: "Affordable and Clean Energy",
    color: "#FCC30B",
    description: "Ensure access to affordable, reliable, sustainable and modern energy for all.",
  },
  {
    number: 8,
    title: "Decent Work and Economic Growth",
    color: "#A21942",
    description: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.",
  },
  {
    number: 9,
    title: "Industry, Innovation and Infrastructure",
    color: "#FD6925",
    description: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.",
  },
  {
    number: 10,
    title: "Reduced Inequalities",
    color: "#DD1367",
    description: "Reduce inequality within and among countries.",
  },
  {
    number: 11,
    title: "Sustainable Cities and Communities",
    color: "#FD9D24",
    description: "Make cities and human settlements inclusive, safe, resilient and sustainable.",
  },
  {
    number: 12,
    title: "Responsible Consumption and Production",
    color: "#C28F2F",
    description: "Ensure sustainable consumption and production patterns.",
  },
  {
    number: 13,
    title: "Climate Action",
    color: "#3F7E44",
    description: "Take urgent action to combat climate change and its impacts.",
  },
  {
    number: 14,
    title: "Life Below Water",
    color: "#0A97D9",
    description: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development.",
  },
  {
    number: 15,
    title: "Life on Land",
    color: "#56C02B",
    description: "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.",
  },
  {
    number: 16,
    title: "Peace, Justice and Strong Institutions",
    color: "#00689D",
    description: "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.",
  },
  {
    number: 17,
    title: "Partnerships for the Goals",
    color: "#19486A",
    description: "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development.",
  },
];

export function getSdg(num: number): SdgInfo | undefined {
  return SDG_LIST.find((sdg) => sdg.number === num);
}
