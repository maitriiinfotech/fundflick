"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealHero from "../../components/ui/RevealHero";
import ReusableFAQ from "../../components/ui/ReusableFAQ";
import ReusableFeatures from "../../components/ui/ReusableFeatures";
import ReusableShowcase from "../../components/ui/ReusableShowcase";
import Button from "../../components/ui/Button";

const COLLECTION_FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Case Assignment & Field Visit Logging",
    description:
      "Assign or unassign collection cases to any active agent instantly. Agents log every telecall and field visit with PTP commit date, customer attitude (Polite / Rude / Medium), no-reply flag, GPS coordinates, and selfie proof — all stored against the case for full auditability.",
    color: "bg-blue-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: "SMS Notifications on Payment Events",
    description:
      "When a payment is collected, an SMS notification is sent to the assigned agent confirming receipt. SMS is delivered via a configurable provider (Twilio, MSG91, or TextLocal) set through environment variables — no hardcoded dependency on any single vendor.",
    color: "bg-emerald-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Event-Based Email Templates via AWS SES",
    description:
      "Create HTML email templates with dynamic variables, sync them to AWS SES, and trigger them automatically on system events — task created, accepted, completed, and more. Templates are grouped by module and sub-module, can be enabled or disabled per event, and maintain a full edit history.",
    color: "bg-violet-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Collection Dashboard with PTP & Stage Analytics",
    description:
      "Live KPIs: Total Cases, Pending, Completed, Total Due Amount, Collected Amount, and Today's Total. Stage-wise breakdown across Pending (active PTP), Partially Paid, Expired (broken PTP), and Completed — with branch-wise and loan-type charts and a one-click export.",
    color: "bg-amber-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Action Request Workflow with PDF Notice Generation",
    description:
      "Agents raise action requests — Company Notice, Legal Notice, One Time Settlement, or Legal Procedure — with remarks. Managers approve or cancel from the Actions dashboard. Legal Notice and Company Notice PDFs are auto-generated on approval and every action is logged to the case timeline.",
    color: "bg-red-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
    title: "Case Flags, Custom Tags & Full Timeline",
    description:
      "Flag any case with a custom remark to mark it for escalation or special attention. Add custom tags per case for filtering and grouping. Every event — payment received, follow-up logged, flag added, notice raised, status changed — is recorded in the case timeline with the agent name, timestamp, and action type.",
    color: "bg-sky-50",
  },
];

const COLLECTION_FAQ = [
  {
    question: "How are collection cases assigned to agents?",
    answer:
      "You can assign or unassign any case to an active agent instantly, and the Daily View shows what each agent did today so supervisors can hand unworked cases to the right field agent in seconds.",
  },
  {
    question: "What gets captured during a telecall or field visit?",
    answer:
      "Agents log each telecall and field visit against the case with a PTP commit date, customer attitude (Polite, Rude, or Medium), a no-reply flag, GPS coordinates, and selfie proof, all stored for full auditability.",
  },
  {
    question: "How are payments recorded and confirmed?",
    answer:
      "Field agents record payments on the spot via Cash, UPI, Net Banking, or QR Code with extra charges, remarks, and selfie proof, and an SMS notification is sent to the assigned agent confirming receipt.",
  },
  {
    question: "Which notification channels does the system use?",
    answer:
      "SMS is delivered through a configurable provider (Twilio, MSG91, or TextLocal) set via environment variables, and HTML email templates are synced to AWS SES and triggered automatically on system events such as task created, accepted, or completed.",
  },
  {
    question: "How do action requests and legal notices work?",
    answer:
      "Agents raise action requests (Company Notice, Legal Notice, One Time Settlement, or Legal Procedure) with remarks, managers approve or cancel them, and Legal Notice and Company Notice PDFs are auto-generated on approval.",
  },
  {
    question: "What visibility do I get into each case over time?",
    answer:
      "Every case carries flags and custom tags for filtering, plus a full timeline recording each event (payment received, follow-up logged, notice raised, status changed) with the agent name, timestamp, and action type. The dashboard rolls these up into PTP and stage-wise analytics.",
  },
];

export default function CollectionPage() {
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
      {/* Hero Section — cinematic image-reveal (same as HRMS) */}
      <RevealHero
        heroIndex={1}
        heading={
          <>
            Run recovery end to end — case assignment, telecall &amp; field-visit
            logging, notifications, legal notices, and a full per-case timeline.
          </>
        }
        loaderLabel="Collection"
        socialLabel="Get started"
        links={[
          { label: "Request a demo", href: "/contactus" },
          { label: "Talk to sales", href: "/contactus" },
        ]}
      />

      {/* Feature Grid — reusable */}
      <ReusableFeatures
        items={COLLECTION_FEATURES}
        eyebrow="Collection Suite"
        heading={
          <>
            Everything you need to{" "}
            <span className="text-secondaryColor">recover faster</span>
          </>
        }
        className="mt-20 mb-24"
      />

      {/* Product Showcase — tabbed, hover to enlarge */}
      <ReusableShowcase
        heading="Due today?"
        headingHighlight="Collected by evening."
        subtitle="End-to-end collection management — from case assignment to payment receipt"
        theme="warm"
        ctaText="Book a Demo"
        tabs={[
          {
            label: "Collection Dashboard",
            title: "Your Entire Recovery Portfolio at a Glance",
            description:
              "Monitor every dimension of your collection operation from one command centre. Track case health, recovery efficiency, today's collections, and follow-up status — with role-based KPI visibility built in.",
            img: "/collection/dashbord.png",
          },
          {
            label: "Cases & Follow-ups",
            title: "Log Every Customer Interaction with Full Context",
            description:
              "Record telecalls and field visits against each case — with PTP commitment dates, attitude logging, selfie proof, and GPS coordinates. Full follow-up history is always one tap away.",
            img: "/collection/case-and-follow.png",
          },
          {
            label: "Payment Collection",
            title: "Collect & Record Payments on the Spot",
            description:
              "Field agents can record payments instantly — with support for Cash, UPI, Net Banking, and QR Code. Extra charges, selfie proof, and remarks make every receipt audit-ready from day one.",
            img: "/collection/payment.png",
          },
          {
            label: "Reports & Analytics",
            title: "Branch-Wise Insights That Drive Recovery Decisions",
            description:
              "Drill into your portfolio with powerful reports — PTP tracking, broken commitment analysis, stage-wise case breakdown, and loan-type distribution. Export everything with one click.",
            img: "/collection/report.png",
          },
          {
            label: "Daily View & Assign",
            title: "See What Every Agent Did Today — and Assign What's Next",
            description:
              "The Daily View gives supervisors a live feed of today's follow-ups and receipts per agent. Assign unworked cases to the right field agent in seconds, and track daily completion rates by branch.",
            img: "/collection/assgincase.png",
          },
        ]}
      />

      {/* FAQ Section — reusable (same as HRMS) */}
      <ReusableFAQ
        title="Got a Question?"
        subtitle="Everything you need to know about Fundflick Collection Management."
        items={COLLECTION_FAQ}
      />

      {/* CTA Section */}
      <div ref={ctaRef} className="max-w-3xl mx-auto px-6 mt-24 relative z-10">
        <div className="bg-gradient-to-r from-[#131c33] to-[#1e3a75] rounded-[28px] px-8 py-14 md:px-16 md:py-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 relative z-10"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            Maximize your collection efficiency
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-8 relative z-10 font-light">
            Reduce NPAs, automate follow-ups, and track every rupee with
            Fundflick&apos;s intelligent collection management platform.
          </p>
          <Button href="/contactus" variant="brand" className="px-8 py-3.5 text-sm relative z-10">
            Start Managing Collections
          </Button>
        </div>
      </div>
    </div>
  );
}
