"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealHero from "../../components/ui/RevealHero";
import ReusableFAQ from "../../components/ui/ReusableFAQ";
import ReusableFeatures from "../../components/ui/ReusableFeatures";
import Button from "../../components/ui/Button";
import {
  FEATURE_ICON_SET,
  FEATURE_COLOR_SET,
} from "../../components/ui/featureIconSet";

const REPORTS_FEATURES = [
  {
    title: "Live Dashboards",
    description:
      "Track disbursements, collections, NPA, and yield on dashboards that update in real time, so you act on today's numbers, not last week's.",
  },
  {
    title: "NPA & Yield Charts",
    description:
      "Watch portfolio health move with real-time NPA and yield charts that flag slippage early across products, branches, and buckets.",
  },
  {
    title: "Collection Trends",
    description:
      "Break down collection efficiency by bucket, geography, and officer to see exactly where recovery is strong and where it is slipping.",
  },
  {
    title: "Custom Dashboards",
    description:
      "Build dashboards for credit, collections, and management teams with drill-downs that move from portfolio view to a single loan account.",
  },
  {
    title: "Flexible Exports",
    description:
      "Export any report to Excel, PDF, CSV, or JSON for board decks, audits, and downstream systems without manual reformatting.",
  },
  {
    title: "Scheduled Delivery",
    description:
      "Send daily automated email reports and scheduled deliveries to the right roles, with access controlled per team and per report.",
  },
].map((f, i) => ({
  ...f,
  icon: FEATURE_ICON_SET[i],
  color: FEATURE_COLOR_SET[i],
}));

const REPORTS_FAQ = [
  {
    question: "How current is the data on the dashboards?",
    answer:
      "Dashboards and NPA, yield, and collection charts update in real time against your live lending data, so you are always looking at the current state of the book.",
  },
  {
    question: "Which formats can I export reports to?",
    answer:
      "Every report exports to Excel, PDF, CSV, and JSON, so you can use the same numbers for board decks, regulatory filings, and downstream systems.",
  },
  {
    question: "Can I control who sees which reports?",
    answer:
      "Yes. Role-based access lets you decide which teams and individuals can view each report and dashboard, keeping sensitive portfolio data with the right people.",
  },
  {
    question: "How do automated and scheduled reports work?",
    answer:
      "You set the report, recipients, and frequency, and Fundflick delivers daily automated email reports and scheduled exports without anyone running them manually.",
  },
  {
    question: "Can I build dashboards for specific teams?",
    answer:
      "You can create custom dashboards for credit, collections, finance, and management, each with drill-downs from portfolio level down to an individual loan account.",
  },
  {
    question: "Does it help with RBI and NBFC reporting?",
    answer:
      "The platform surfaces NPA classification, yield, and collection metrics in exportable formats that support your internal MIS and regulatory reporting workflows.",
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
            See your book the moment it moves — live NPA, yield, and collection
            trends in dashboards your whole team can act on.
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
