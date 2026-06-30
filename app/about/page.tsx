import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Us",
  description:
    "Fundflick is the AI-powered operating system for modern NBFCs — built by Maitrii Infotech to run lending, collections, HR, tasks and reporting on one platform.",
  openGraph: {
    title: "About Us | Fundflick",
    description:
      "Fundflick is the AI-powered operating system for modern NBFCs — built by Maitrii Infotech to run lending, collections, HR, tasks and reporting on one platform.",
  },
};

export default function Page() {
  return <AboutContent />;
}
