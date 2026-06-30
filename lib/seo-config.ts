// Single source of truth for SEO constants + route map.
// Imported by metadata, sitemap, robots, llms.txt, agents.json — keep DRY.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.fundflick.in"
).replace(/\/$/, "");
export const SITE_HOST =
  process.env.NEXT_PUBLIC_SITE_HOST || SITE_URL.replace(/^https?:\/\//, "");

export const SITE_NAME = "Fundflick";
export const LEGAL_NAME = "Maitrii Infotech";
export const SITE_TAGLINE = "The Operating System for Modern NBFCs";
export const SITE_DESCRIPTION =
  "Fundflick is the AI-powered operating system for modern NBFCs — run loan origination, loan management, collections, HRMS, tasks, reporting and bookkeeping on one platform.";

export const TWITTER_HANDLE = "@fundflick";
export const DEFAULT_OG_IMAGE = "/logo.png";

export const CONTACT = {
  email: "info@fundflick.in",
  phones: ["+91 8946 808080", "+91 8946 888888"],
  address: {
    street: "11/70 Madhyam Marg, Mansarovar",
    city: "Jaipur",
    region: "Rajasthan",
    postalCode: "302021",
    country: "IN",
  },
  hours: "Mo-Fr 09:30-19:00",
};

export const SOCIAL_LINKS: string[] = [
  // Add verified brand profiles here — critical for E-E-A-T / sameAs.
  // "https://www.linkedin.com/company/fundflick",
  // "https://x.com/fundflick",
];

export interface SeoPage {
  path: string;
  title: string;
  description: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}

// Every public, indexable route. Drives sitemap + llms.txt + llms-full.txt.
export const PAGES: SeoPage[] = [
  {
    path: "/",
    title: "Fundflick — The Operating System for Modern NBFCs",
    description: SITE_DESCRIPTION,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/about",
    title: "About Fundflick",
    description:
      "Fundflick is the AI-powered operating system for modern NBFCs, built by Maitrii Infotech to run lending, collections, HR, tasks and reporting on one platform.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/features/loan-origination",
    title: "Loan Origination System (LOS)",
    description:
      "Capture, verify and approve loans on one platform — digital KYC, CIBIL checks, tele-verification and a clean salesman-to-manager approval flow.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/features/loan-management",
    title: "Loan Management System (LMS)",
    description:
      "Service every loan from one ledger — EMI schedules, overdue penalties, prepayments and reversible payments, tracked to the paisa.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/features/collection",
    title: "Collection Management Software",
    description:
      "Run recovery end to end — case assignment, telecall and field-visit logging, notifications, legal notices and a full per-case timeline.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/features/hrms",
    title: "HRMS — HR, Payroll & Attendance",
    description:
      "HR software that runs attendance, payroll and leave on autopilot — so your team focuses on people, not paperwork.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/features/task-management",
    title: "Task Management",
    description:
      "Run your whole task operation — real-time team dashboards, recurring tasks and a client ledger that bills completed work.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/features/smart-reports",
    title: "Smart Reports & Analytics",
    description:
      "See the whole operation in one place — live role-based dashboards, branch analytics and one-click exports across every module.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/features/bookkeeping",
    title: "Bookkeeping & Accounts",
    description:
      "Auto-post double-entry ledgers and tie out GST, TDS, trial balance and bank reconciliation in one set of books.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/guides",
    title: "Resource Library",
    description:
      "Guides, templates, reports and ebooks on digital lending, loan origination, collections and lending automation.",
    changeFrequency: "weekly",
    priority: 0.6,
  },
  {
    path: "/contactus",
    title: "Contact Us — Request a Demo",
    description:
      "Talk to the Fundflick team about integrations, pricing or custom lending workflows. Request a demo and get a 15-minute callback.",
    changeFrequency: "yearly",
    priority: 0.6,
  },
];

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path === "/" ? "" : path}`;
