import type { Metadata } from "next";
import CollectionContent from "./CollectionContent";

export const metadata: Metadata = {
  title: "Collection Management Software",
  description:
    "Fundflick Collection Management — assign cases, log field visits with PTP and proof, trigger SMS and email alerts, generate legal notices, and track every recovery on one timeline.",
  openGraph: {
    title: "Collection Management Software | Fundflick",
    description:
      "Fundflick Collection Management — assign cases, log field visits with PTP and proof, trigger SMS and email alerts, generate legal notices, and track every recovery on one timeline.",
  },
};

export default function Page() {
  return <CollectionContent />;
}
