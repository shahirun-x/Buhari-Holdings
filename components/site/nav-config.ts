import {
  Aperture,
  Briefcase,
  Building2,
  Cog,
  Factory,
  HardHat,
  Play,
  Ship,
  Sparkles,
  Watch,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

/** Primary navigation — shared by the desktop nav and the mobile sheet. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Businesses", href: "/businesses" },
  { label: "Community", href: "/community" },
  { label: "Heritage", href: "/about/heritage" },
  { label: "Newsroom", href: "/newsroom" },
  { label: "Careers", href: "/careers" },
];

export type BusinessVertical = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
};

/**
 * The eight verticals — the single source of truth. Consumed by the
 * desktop mega-menu, the mobile nav accordion, and the footer's
 * "Businesses" column. Do not duplicate this list elsewhere.
 */
export const BUSINESS_VERTICALS: BusinessVertical[] = [
  {
    slug: "properties",
    name: "Properties",
    description: "Real estate consulting",
    icon: Building2,
  },
  {
    slug: "construction",
    name: "Construction",
    description: "Civic building since 1989",
    icon: HardHat,
  },
  {
    slug: "engineering",
    name: "Engineering",
    description: "Automotive & industrial systems",
    icon: Cog,
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    description: "Steel & composites",
    icon: Factory,
  },
  {
    slug: "energy",
    name: "Energy",
    description: "Power, oil & gas",
    icon: Zap,
  },
  {
    slug: "agency",
    name: "Agency",
    description: "Retail, watches & jewellery",
    icon: Watch,
  },
  {
    slug: "shipping-trading",
    name: "Shipping & Trading",
    description: "Global bulk & liquid cargo",
    icon: Ship,
  },
  {
    slug: "services",
    name: "Services",
    description: "Facility & institutional care",
    icon: Sparkles,
  },
];

export type FooterLink = {
  label: string;
  href: string;
};

export const FOOTER_ABOUT_LINKS: FooterLink[] = [
  { label: "Heritage", href: "/about/heritage" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "Founder", href: "/about/founder" },
  { label: "Community", href: "/community" },
];

export const FOOTER_COMPANY_LINKS: FooterLink[] = [
  { label: "Newsroom", href: "/newsroom" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Gallery", href: "/gallery" },
];

/**
 * Head office details — the single source for the footer and the contact
 * page. Phone and email are placeholders; see content/contact.json.
 */
export const HEAD_OFFICE = {
  lines: ["No. 4, Moores Road", "Nungambakkam, Chennai 600006", "Tamil Nadu, India"],
  phone: "+91 44 XXXX XXXX",
  email: "hello@buhariholding.com",
} as const;

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

/**
 * lucide-react no longer ships brand/social logos (LinkedIn, X, Instagram
 * and YouTube marks were removed upstream). These are neutral stand-ins
 * that read as their platform without reproducing a trademarked glyph —
 * swap for real brand marks if the project later adds an icon set that
 * carries them.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", href: "#", icon: Briefcase },
  { label: "X (Twitter)", href: "#", icon: X },
  { label: "Instagram", href: "#", icon: Aperture },
  { label: "YouTube", href: "#", icon: Play },
];
