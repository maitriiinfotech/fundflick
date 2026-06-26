"use client";

import React from "react";
import RevealHero from "../components/ui/RevealHero";
import HRMSAIShowcard from "../components/hrms/HRMSAIShowcard";
import HRMSFeatures from "../components/hrms/HRMSFeatures";
import HRMSShowcase from "../components/hrms/HRMSShowcase";
import HRMSCTA from "../components/hrms/HRMSCTA";
import ReusableFAQ from "../components/ui/ReusableFAQ";

const HRMS_FAQ = [
  {
    question: "How does the attendance tracking work?",
    answer:
      "Fundflick HRMS supports multiple attendance methods — biometric, mobile punch-in/out with geo-fencing, and web check-in. Work hours, overtime, and late arrivals are auto-calculated in real time.",
  },
  {
    question: "Can I manage multiple branches from one dashboard?",
    answer:
      "Yes! You can centrally manage employees across all branches. Each branch gets its own reporting, and you can handle inter-branch transfers, role-based access controls, and branch-level analytics from a single unified dashboard.",
  },
  {
    question: "How does payroll processing work?",
    answer:
      "Payroll is fully automated — salary computation, tax deductions (PF, ESI, TDS), and compliance are handled automatically. Generate payslips, process bulk payments, and export reports seamlessly every month.",
  },
  {
    question: "What is geo-fencing for attendance?",
    answer:
      "Geo-fencing lets you define location boundaries around your office. Employees can only mark attendance when physically inside the designated zone — eliminating proxy attendance entirely.",
  },
  {
    question: "How does the leave management system work?",
    answer:
      "Employees can apply for leave through the app or web. Managers approve or reject with multi-level workflows. The system tracks leave balances, carry-forward policies, holiday calendars, and compensatory off automatically.",
  },
  {
    question: "Is there a daily attendance reminder feature?",
    answer:
      "Yes — automated email reminders are sent every morning to employees who haven't marked attendance. You can configure schedules, escalation rules, and manager notifications.",
  },
  {
    question: "Is a free trial available?",
    answer:
      "Absolutely! We offer a 14-day free trial with full access to all HRMS features. No credit card required — just sign up and start managing your team.",
  },
];

export default function HRMSPage() {
  return (
    <div
      className="min-h-screen bg-white text-slate-900 pb-20 relative overflow-hidden"
      style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}
    >
      {/* Hero Section — cinematic image-reveal */}
      <RevealHero
        heroIndex={2}
        heading={
          <>
            AI-first HR software that runs attendance, payroll, leave and
            people ops on autopilot — so your team focuses on people, not
            paperwork.
          </>
        }
        socialLabel="Get started"
        links={[
          { label: "Start free trial", href: "/contactus" },
          { label: "Book a demo", href: "/contactus" },
        ]}
      />

      {/* AI Showcard — overlaps hero bottom */}
      <HRMSAIShowcard />

      {/* Feature Grid */}
      <div className="mt-20">
        <HRMSFeatures />
      </div>

      {/* Tabbed Showcase Section */}
      <HRMSShowcase />

      {/* FAQ Section */}
      <ReusableFAQ
        title="Got a Question?"
        subtitle="Everything you need to know about Fundflick HRMS."
        items={HRMS_FAQ}
      />

      {/* CTA Section */}
      <HRMSCTA />
    </div>
  );
}
