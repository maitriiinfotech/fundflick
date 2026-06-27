"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealHero from "../../components/ui/RevealHero";
import ReusableFAQ from "../../components/ui/ReusableFAQ";
import ReusableFeatures from "../../components/ui/ReusableFeatures";
import ReusableShowcase from "../../components/ui/ReusableShowcase";
import Button from "../../components/ui/Button";

const REPORTS_FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    title: "Role-Based Multi-Module Dashboards",
    description:
      "Three dedicated dashboards — LOS (customers, employees, branches, promises, today's collections, due cases), Collection (KPI strip: total cases, pending, collected, today's total, efficiency), and Task (individual & team views). Every KPI card is permission-controlled so each role sees only their data.",
    color: "bg-blue-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
    title: "Collection Stage & Branch Analytics",
    description:
      "Stage-wise case breakdown across Pending PTP, Partially Paid, Expired (broken PTP), and Completed — with percentage and count for each. Branch-wise collection bar chart, loan-type distribution pie chart, PTP count vs Broken PTP count and amount. All powered by MongoDB aggregation pipelines.",
    color: "bg-emerald-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
    title: "Un-Followup Chart (Branch-Wise)",
    description:
      "Visual bar chart showing exactly which branches have cases with no follow-up logged this month — broken down by case count per branch. Managers can spot neglected branches at a glance. Export button downloads the full un-followup case list with customer name, overdue amount, address, and due EMI to Excel.",
    color: "bg-amber-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="23 21 23 19 19 19 19 21" />
        <line x1="19" y1="15" x2="23" y2="15" />
      </svg>
    ),
    title: "Agent-Level Performance Analytics",
    description:
      "Per-agent report: total cases assigned, cases worked, total follow-ups logged, total payments collected, attitude breakdown (Polite / Rude / Medium / No Reply), visit type split (Telecall vs Field Visit), and a daily activity bar chart for the last 15 days. Case efficiency score (manual and branch performance) calculated per agent.",
    color: "bg-violet-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    title: "CSV & Excel Export Across Modules",
    description:
      "Every key report has a download button: Stock Report (CSV, branch-filtered), Collection payment receipts (CSV), Daily follow-ups (Excel with area, case, customer, overdue, EMI), Client Ledger (XLSX with two sheets — Ledger and Timeline), and Un-followup report (Excel). Bulk case upload via CSV/XLSX is also supported.",
    color: "bg-red-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "Cross-Module Reports Hub",
    description:
      "A central Reports page lists all generated reports by module — Monthly Loan Disbursement (LOS), Collection Recovery Summary, Branch Performance Overview (Organisation), Employee Activity Log (Admin), and Task Completion Rate (Task). Each report shows its category, period, and a Ready or Generating status badge.",
    color: "bg-sky-50",
  },
];

const REPORTS_FAQ = [
  {
    question: "What dashboards are included?",
    answer:
      "There are three role-based dashboards: LOS (customers, employees, branches, promises, today's collections, due cases), Collection (total cases, pending, collected, today's total, efficiency), and Task (individual and team views). Each KPI card is permission-controlled so every role sees only their data.",
  },
  {
    question: "What collection analytics can I see?",
    answer:
      "Collection reporting covers stage-wise case breakdown across Pending PTP, Partially Paid, Expired (broken PTP), and Completed, plus a branch-wise collection bar chart, loan-type distribution pie chart, and PTP versus broken-PTP counts and amounts.",
  },
  {
    question: "How does the un-followup chart work?",
    answer:
      "A branch-wise bar chart shows which branches have cases with no follow-up logged this month, broken down by case count per branch. You can export the full un-followup list with customer name, overdue amount, address, and due EMI to Excel.",
  },
  {
    question: "What does the agent performance report show?",
    answer:
      "Each agent gets a scorecard with cases assigned and worked, follow-ups logged, payments collected, attitude and visit-type splits, a 15-day daily activity chart, and a case efficiency score.",
  },
  {
    question: "Which formats can I export reports to?",
    answer:
      "Exports are CSV and Excel only. Stock reports and collection receipts export to CSV, daily follow-ups and the un-followup list export to Excel, and the Client Ledger exports to XLSX with separate Ledger and Timeline sheets.",
  },
  {
    question: "Where do I find all reports in one place?",
    answer:
      "The Cross-Module Reports Hub lists every generated report by module, including Loan Disbursement, Collection Recovery, Branch Performance, Employee Activity, and Task Completion, each with its category, period, and a Ready or Generating status badge.",
  },
];

export default function SmartReportsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white text-slate-900 pb-20 relative overflow-hidden"
      style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}
    >
      {/* Hero Section — cinematic image-reveal */}
      <RevealHero
        images={[
          "/reveal/1.jpg",
          "/reveal/2.jpg",
          "/reveal/8.jpg",
          "/reveal/4.jpg",
          "/reveal/5.jpg",
        ]}
        heroIndex={2}
        heading={
          <>
            See the whole operation in one place — role-based LOS, Collection
            &amp; Task dashboards, stage and branch analytics, agent scorecards,
            and one-click CSV/Excel exports across every module.
          </>
        }
        socialLabel="Get started"
        links={[
          { label: "Request a demo", href: "/contactus" },
          { label: "Talk to sales", href: "/contactus" },
        ]}
      />

      {/* Feature Grid */}
      <ReusableFeatures
        items={REPORTS_FEATURES}
        eyebrow="Analytics Suite"
        heading={
          <>
            Everything you need to{" "}
            <span className="text-secondaryColor">decide on data</span>
          </>
        }
        className="mt-20 mb-24"
      />

      {/* Product Showcase — tabbed, hover to enlarge */}
      <ReusableShowcase
        heading="Numbers don't lie."
        headingHighlight="We make them speak."
        subtitle="Cross-module reporting — collection, LMS, LOS, tasks and agents, all in one place"
        theme="cool"
        ctaText="Book a Demo"
        tabs={[
          {
            label: "Reports Hub",
            title: "Every Report, Across Every Module, in One Place",
            description:
              "The Central Reports Hub gives managers and admins a single destination for all generated reports — spanning LOS, Collection, Task Management, Admin, and Organisation — with live status and one-click download.",
            img: "/reports.png",
          },
          {
            label: "Collection Reports",
            title: "Branch-Wise Collection Analytics with Full Stage Breakdown",
            description:
              "Deep-dive into your collection portfolio with PTP tracking, broken commitment analysis, stage-wise case breakdown, loan-type distribution, and un-followup charts — all exportable with one click.",
            img: "/collection.png",
          },
          {
            label: "Agent Performance",
            title: "Individual Agent Scorecards with 15-Day Activity Charts",
            description:
              "Every field agent gets a detailed performance report — total cases assigned, cases worked, follow-up and payment counts, efficiency score, and a rolling 15-day activity chart showing daily follow-ups and collections.",
            img: "/pipeline_overview.png",
          },
          {
            label: "LMS Payment Reports",
            title: "Daily & Monthly Collection Reports with Method Breakdown",
            description:
              "Track every rupee collected through the LMS — with daily collection summaries, monthly trend charts, and full payment-type breakdowns. Borrower health scoring categorises your entire portfolio at a glance.",
            img: "/lending_overview_minimal.png",
          },
          {
            label: "Stock & Legal",
            title: "Outstanding Stock Reports and Instant Legal Notice Generation",
            description:
              "Generate a complete stock report of outstanding principal, accrued and unaccrued interest per branch — filterable and exportable as CSV. For difficult cases, generate Legal Notices and Company Notices as PDF with one click.",
            img: "/accounting.png",
          },
        ]}
      />

      {/* FAQ Section */}
      <ReusableFAQ
        title="Got a Question?"
        subtitle="Everything you need to know about Smart Reports and Analytics."
        items={REPORTS_FAQ}
      />

      {/* CTA Section */}
      <div ref={ctaRef} className="max-w-3xl mx-auto px-6 mt-24 relative z-10">
        <div className="bg-gradient-to-r from-[#131c33] to-[#1e3a75] rounded-[28px] px-8 py-14 md:px-16 md:py-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-secondaryColor/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 relative z-10"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            Run your book on real numbers
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-8 relative z-10 font-light">
            See live NPA, yield, and collection analytics for your portfolio in
            a working dashboard.
          </p>
          <Button
            href="/contactus"
            variant="brand"
            className="px-8 py-3.5 text-sm relative z-10"
          >
            Request a demo
          </Button>
        </div>
      </div>
    </div>
  );
}
