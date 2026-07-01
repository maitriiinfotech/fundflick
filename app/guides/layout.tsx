import type { Metadata } from "next";

// Route-segment layout supplies the SEO metadata + canonical for /guides.
export const metadata: Metadata = {
  title: "Video Tutorials",
  description:
    "Step-by-step video tutorials for Fundflick — mark daily HRMS attendance and create and manage tasks across every task type.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Video Tutorials | Fundflick",
    description:
      "Step-by-step video tutorials for Fundflick — mark daily HRMS attendance and create and manage tasks across every task type.",
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
