import type { Metadata } from "next";
import SmartReportsContent from "./SmartReportsContent";

export const metadata: Metadata = {
  title: "Smart Reports & Analytics",
  description:
    "Fundflick Smart Reports — role-based dashboards across lending, collection and tasks, stage and branch analytics, agent scorecards, and one-click CSV and Excel exports.",
  openGraph: {
    title: "Smart Reports & Analytics | Fundflick",
    description:
      "Fundflick Smart Reports — role-based dashboards across lending, collection and tasks, stage and branch analytics, agent scorecards, and one-click CSV and Excel exports.",
  },
};

export default function Page() {
  return <SmartReportsContent />;
}
