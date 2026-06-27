import type { Metadata } from "next";
import HRMSContent from "./HRMSContent";

export const metadata: Metadata = {
  title: "HRMS Software",
  description:
    "Run attendance, payroll, leave and people ops on autopilot with Fundflick HRMS — biometric and geo-fenced attendance, automated payroll, and multi-branch management.",
  openGraph: {
    title: "HRMS Software | Fundflick",
    description:
      "Run attendance, payroll, leave and people ops on autopilot with Fundflick HRMS — biometric and geo-fenced attendance, automated payroll, and multi-branch management.",
  },
};

export default function Page() {
  return <HRMSContent />;
}
