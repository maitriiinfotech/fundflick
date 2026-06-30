import type { Metadata } from "next";

// guides/page.tsx is a Client Component and can't export metadata —
// this route-segment layout supplies the SEO metadata + canonical.
export const metadata: Metadata = {
  title: "Resource Library",
  description:
    "Guides, templates, reports and ebooks on digital lending, loan origination, collections and lending automation.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Resource Library | Fundflick",
    description:
      "Guides, templates, reports and ebooks on digital lending, loan origination, collections and lending automation.",
    url: "/guides",
  },
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
