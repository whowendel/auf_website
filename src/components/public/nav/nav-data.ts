import type { NavSection, QuickLink } from "./nav-types";

export const navSections: NavSection[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
  },
  {
    id: "admissions",
    label: "Admissions",
    groups: [
      {
        heading: "Admissions",
        items: [
          { label: "Testing Dates", href: "/admissions#testing-dates" },
          { label: "Application Guide", href: "/admissions#how-to-apply" },
          { label: "Academic Programs", href: "/academics#colleges" },
          { label: "Academic Calendar", href: "/academics#calendar" },
          { label: "Scholarships and Grants", href: "/admissions#scholarships" },
          { label: "University Registrar", href: "/admissions#registrar" },
        ],
      },
    ],
  },
  {
    id: "academics-colleges",
    label: "Academics",
    groups: [
      {
        heading: "Colleges",
        items: [
          { label: "CAMP", href: "/c/camp", description: "Allied and Medical Professions" },
          { label: "CAS",  href: "/c/cas",  description: "Arts and Science" },
          { label: "CBA",  href: "/c/cba",  description: "Business Administration" },
          { label: "CCJE", href: "/c/ccje", description: "Criminal Justice Education" },
          { label: "CCS",  href: "/c/ccs",  description: "Computer Studies" },
          { label: "CEA",  href: "/c/cea",  description: "Engineering and Architecture" },
          { label: "CED",  href: "/c/ced",  description: "Education" },
          { label: "CON",  href: "/c/con",  description: "Nursing" },
        ],
      },
      {
        heading: "Schools & Programs",
        items: [
          { label: "SOL", href: "/c/sol", description: "School of Law" },
          { label: "SOM", href: "/c/som", description: "School of Medicine" },
          { label: "GS",  href: "/c/gs",  description: "Graduate School" },
          { label: "IS",  href: "/c/is",  description: "Integrated School" },
        ],
      },
    ],
    featured: {
      eyebrow: "Explore all programs",
      title: "Find your college at AUF",
      description: "Browse all 12 colleges and schools offering undergraduate, graduate, and professional programs.",
      href: "#",
    },
  },
  {
    id: "student-services",
    label: "Student Services",
    groups: [
      {
        heading: "Becoming Mabuti",
        items: [
          { label: "Student Affairs", href: "student-services#student-affairs" },
          { label: "Guidance", href: "/student-services#guidance" },
        ],
      },
      {
        heading: "Becoming Magaling",
        items: [
          { label: "Health", href: "/student-services#health" },
          { label: "Sports", href: "/student-services#sports" },
          { label: "Culture", href: "/student-services#culture" },
        ],
      },
      {
        heading: "Becoming May Malasakit",
        items: [
          { label: "CCFP", href: "/student-services#ccfp" },
        ],
      },
    ],
  },
  {
    id: "learning-resources",
    label: "Learning Resources",
    groups: [
      {
        heading: "Library",
        items: [
          { label: "Library", href: "https://library.auf.edu.ph/" },
          { label: "AUF MyClass", href: "https://auf.instructure.com/login/canvas" },
          { label: "MyAU", href: "https://sblive.auf.edu.ph/index.jsp" },
          { label: "AUF Mail", href: "https://mail.google.com/mail/u/0/#inbox" },
        ],
      },
    ],
  },
  {
    id: "external-affairs",
    label: "External Affairs",
    groups: [
      {
        heading: "About",
        items: [
          { label: "Overview", href: "/external-affairs#overview" },
          { label: "Vision, Mission & Goals", href: "/external-affairs#vision-mission-goals" },
          { label: "History", href: "/external-affairs#history" },
          { label: "Leadership", href: "/external-affairs#leadership" },
          { label: "Organizational Chart", href: "/external-affairs#org-chart" },
          { label: "Facts & Figures", href: "/external-affairs#facts-figures" },
          { label: "International Recognitions", href: "/external-affairs#recognitions" },
        ],
      },
      {
        heading: "Services & Linkages",
        items: [
          { label: "Connect@AUF", href: "/external-affairs/connect" },
          { label: "Partnerships", href: "/external-affairs/partnerships" },
          { label: "International Students", href: "/external-affairs/international-students" },
          { label: "Testimonials", href: "/external-affairs/testimonials" },
        ],
      },
    ],
  },
  {
    id: "research",
    label: "Research",
    groups: [
      {
        heading: "Research",
        items: [
          { label: "Overview", href: "/research#overview" },
          { label: "About OVPRI", href: "/research#about-ovpri" },
          { label: "Vision & Mission", href: "/research#vision-mission" },
          { label: "Research Centers", href: "/research#research-centers" },
          { label: "Research Thrusts", href: "/research#research-thrusts" },
          { label: "Services & Support", href: "/research#services-support" },
          { label: "Grants & Opportunities", href: "/research#grants-opportunities" },
          { label: "Research Archive", href: "/research#archive" },
          { label: "News & Events", href: "/research#news-events" },
          { label: "Faculty Directory", href: "/research#faculty-directory" },
          { label: "Sustainable Development Goals", href: "/research/sustainable-development-goals" },
        ],
      },
    ],
  },
  {
    id: "alumni",
    label: "Alumni",
    groups: [
      {
        heading: "Alumni",
        items: [
          { label: "Overview",             href: "/alumni#overview" },
          { label: "Alumni Association",   href: "/alumni#alumni-association" },
          { label: "Distinguished Alumni", href: "/alumni#distinguished-alumni" },
          { label: "Alumni Benefits",      href: "/alumni#alumni-benefits" },
          { label: "News & Events",        href: "/alumni#alumni-events" },
          { label: "Stay Connected",       href: "/alumni#stay-connected" },
        ],
      },
    ],
  },
  {
    id: "careers",
    label: "Careers",
    groups: [
      {
        heading: "Career Development Center",
        items: [
          { label: "Overview",           href: "/careers#overview" },
          { label: "Career Services",    href: "/careers#career-services" },
          { label: "Career Resources",   href: "/careers#career-resources" },
          { label: "Industry Partners",  href: "/careers#industry-partners" },
          { label: "Job Openings",       href: "/careers#job-openings" },
          { label: "Career Events",      href: "/careers#career-events" },
          { label: "Contact CDC",        href: "/careers#contact-cdc" },
        ],
      },
    ],
  },

  {
    id: "about",
    label: "About",
    groups: [
      {
        heading: "About",
        items: [
          { label: "Overview", href: "/about" },
          { label: "History", href: "/about#history" },
          { label: "University Profile", href: "/about#profile" },
          { label: "Rankings & Accreditations", href: "/about#rankings" },
          { label: "The Founder", href: "/about#founder" },
          { label: "Governance", href: "/about#governance" },
          { label: "Vision & Mission", href: "/about#vision-mission" },
          { label: "Core Values", href: "/about#core-values" },
          { label: "Graduate Attributes", href: "/about#graduate-attributes" },
        ],
      },
    ],
  },

  {
    id: "news-events",
    label: "News and Events",
    href: "/news-events",
  },

  {
    id: "privacy-policy",
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
];

export const quickLinks: QuickLink[] = [
  { label: "AUF MyClass", href: "https://auf.instructure.com/login/canvas" },
  { label: "MyAU", href: "https://sblive.auf.edu.ph/index.jsp" },
  { label: "AUF Mail", href: "https://mail.google.com/" },
  { label: "Library", href: "/resources/library" },
  { label: "Campus Directory", href: "/connect/directory" },
];
