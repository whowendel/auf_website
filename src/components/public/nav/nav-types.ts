export type NavLeaf = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  heading?: string;
  items: NavLeaf[];
};

export type NavSection = {
  id: string;
  label: string;
  href?: string;
  /** One or two column groups shown in the centre panel */
  groups?: NavGroup[];
  /** Optional featured card shown in the right panel */
  featured?: {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
  };
};

export type QuickLink = { label: string; href: string };
