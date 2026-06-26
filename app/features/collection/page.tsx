"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealHero from "../../components/ui/RevealHero";
import ReusableFAQ from "../../components/ui/ReusableFAQ";
import ReusableFeatures from "../../components/ui/ReusableFeatures";
import Button from "../../components/ui/Button";

const COLLECTION_FEATURES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
    title: "Automated EMI Reminders",
    description: "Send automated payment reminders via SMS, Email, and WhatsApp before and after due dates. Configurable frequency and escalation templates.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
    title: "Payment Link Generation",
    description: "Generate secure, one-click payment links for borrowers. Support UPI, net banking, cards, and wallet payments with instant confirmation.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    title: "Collection Agent Tracking",
    description: "Assign collection agents to overdue accounts. Track field visits with GPS, record call logs, and monitor real-time agent performance.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: "Overdue & NPA Dashboards",
    description: "Visual dashboards for DPD buckets, NPA classification, and portfolio-at-risk metrics. Drill-down views by branch, product, and agent.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    title: "Payment Reconciliation",
    description: "Automatic matching of incoming payments with loan accounts. Handle partial payments, bounce entries, and settlement discrepancies effortlessly.",
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
      </svg>
    ),
    title: "Recovery Workflow Management",
    description: "Define multi-stage recovery workflows — soft reminders, field visits, legal notices, and settlement offers. Automate escalation triggers based on DPD.",
    color: "bg-rose-50 text-rose-600",
  },
];

const COLLECTION_FAQ = [
  {
    question: "How do automated EMI reminders work?",
    answer:
      "Reminders are sent automatically via SMS, Email, and WhatsApp before and after due dates. You can configure the frequency, templates, and escalation rules per product or DPD bucket.",
  },
  {
    question: "Can borrowers pay through a link?",
    answer:
      "Yes — generate secure one-click payment links supporting UPI, net banking, cards, and wallets. Payments are confirmed instantly and reconciled against the loan account automatically.",
  },
  {
    question: "How is field collection tracked?",
    answer:
      "Assign collection agents to overdue accounts and track field visits with GPS, call logs, and real-time performance dashboards — full visibility into every recovery action.",
  },
  {
    question: "What NPA and overdue reporting is available?",
    answer:
      "Visual dashboards cover DPD buckets, NPA classification, and portfolio-at-risk metrics, with drill-down by branch, product, and agent for precise monitoring.",
  },
  {
    question: "How does payment reconciliation work?",
    answer:
      "Incoming payments are auto-matched to loan accounts, including partial payments, bounce entries, and settlement discrepancies — no manual matching required.",
  },
  {
    question: "Is a free trial available?",
    answer:
      "Absolutely! We offer a 14-day free trial with full access to all Collection Management features. No credit card required.",
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
            EMI collection on autopilot — automated reminders, payment links,
            field tracking and recovery workflows in one platform.
          </>
        }
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

      {/* FAQ Section — reusable (same as HRMS) */}
      <ReusableFAQ
        title="Got a Question?"
        subtitle="Everything you need to know about Fundflick Collection Management."
        items={COLLECTION_FAQ}
      />

      {/* CTA Section */}
      <div ref={ctaRef} className="max-w-3xl mx-auto px-6 mt-24 relative z-10">
        <div className="bg-gradient-to-r from-[#131c33] to-[#1e3a75] rounded-[28px] px-8 py-14 md:px-16 md:py-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
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
