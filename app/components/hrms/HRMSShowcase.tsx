"use client";

import React from "react";
import ReusableShowcase, { ShowcaseTab } from "../ui/ReusableShowcase";

const HRMS_TABS: ShowcaseTab[] = [
  {
    label: "Attendance",
    title: "Track Your Team's Attendance, Effortlessly",
    description:
      "Real-time punch-in/out tracking with biometric and mobile-based attendance capture. Auto-calculate work hours, overtime, and late arrivals with comprehensive daily reports.",
    img: "/hrms/attendence-center.png",
  },
  {
    label: "Payroll",
    title: "Take the Stress Out of Your Payroll",
    description:
      "Automate salary calculations, handle PF, ESI and TDS compliance with ease, and generate payslips instantly to ensure error-free payroll every time.",
    img: "/hrms/payroll.png",
  },
  {
    label: "Leave Management",
    title: "Manage Leaves with Complete Transparency",
    description:
      "Complete leave lifecycle — apply, approve, reject with multi-level workflows. Track leave balances, carry-forward policies, and holiday calendars at a glance.",
    img: "/hrms/leaveMangment.png",
  },
  {
    label: "Attendance Requests",
    title: "Approve Attendance Requests in a Tap",
    description:
      "Employees raise regularization and attendance correction requests; managers review and approve with a full audit trail — no spreadsheets, no back-and-forth.",
    img: "/hrms/attendeace-request.png",
  },
  {
    label: "Branches",
    title: "Manage Multiple Branches, One Platform",
    description:
      "Centrally manage employees across all your branches and locations. Branch-level reporting, easy inter-branch transfers, and role-based access controls.",
    img: "/hrms/branch.png",
  },
];

export default function HRMSShowcase() {
  return (
    <ReusableShowcase
      heading="Hire to retire?"
      headingHighlight="Fundflick does it all"
      subtitle="The only HR solution you'll ever need"
      tabs={HRMS_TABS}
      theme="warm"
      ctaText="Book a Demo"
    />
  );
}
