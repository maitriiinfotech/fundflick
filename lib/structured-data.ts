// JSON-LD builders. Rendered as inline <script type="application/ld+json">
// so JS-less crawlers (Bing, Yandex, GPTBot, PerplexityBot, ClaudeBot) see them.

import {
  SITE_URL,
  SITE_NAME,
  LEGAL_NAME,
  SITE_DESCRIPTION,
  CONTACT,
  SOCIAL_LINKS,
  absoluteUrl,
} from "./seo-config";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
  },
  description: SITE_DESCRIPTION,
  email: CONTACT.email,
  telephone: CONTACT.phones[0],
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.address.street,
    addressLocality: CONTACT.address.city,
    addressRegion: CONTACT.address.region,
    postalCode: CONTACT.address.postalCode,
    addressCountry: CONTACT.address.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: CONTACT.phones[0],
    contactType: "customer support",
    email: CONTACT.email,
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
  ...(SOCIAL_LINKS.length ? { sameAs: SOCIAL_LINKS } : {}),
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-IN",
};

// The product itself — helps Google/Bing show a rich app entity and gives
// AI engines a structured description of what Fundflick is.
export const softwareApplicationLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Lending / NBFC Operations Software",
  operatingSystem: "Web",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: { "@id": ORG_ID },
  featureList: [
    "Loan Origination System",
    "Loan Management System",
    "Collection Management",
    "HRMS",
    "Task Management",
    "Smart Reports & Analytics",
    "Bookkeeping & Accounts",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    description: "Free demo and trial available.",
  },
};

export function breadcrumbLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageLd(
  faqs: { question: string; answer: string }[],
  canonicalPath = "/",
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(canonicalPath)}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".faq-question", ".faq-answer"],
    },
  };
}

// Helper to render any LD object as a script tag prop.
export const jsonLdScript = (data: unknown) => ({
  __html: JSON.stringify(data),
});
