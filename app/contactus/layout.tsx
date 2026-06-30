import type { Metadata } from "next";

// contactus/page.tsx is a Client Component and can't export metadata —
// this route-segment layout supplies the SEO metadata + canonical.
export const metadata: Metadata = {
  title: "Contact Us — Request a Demo",
  description:
    "Talk to the Fundflick team about integrations, pricing or custom lending workflows. Request a demo and get a 15-minute callback.",
  alternates: { canonical: "/contactus" },
  openGraph: {
    title: "Contact Fundflick — Request a Demo",
    description:
      "Talk to the Fundflick team about integrations, pricing or custom lending workflows.",
    url: "/contactus",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
