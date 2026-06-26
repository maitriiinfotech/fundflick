"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

interface CardData {
  title: string;
  subtitle: string;
  img: string;
  bgColor: string;
  textColor: string;
  comingSoon?: boolean;
  badge?: string;
  details: { label: string; value: string }[];
}

const STACK_CARDS: CardData[] = [
  {
    title: "Loan Origination System",
    subtitle:
      "Automate loan application processing, credit check evaluation, and disbursals.",
    img: "/loan_origination.png",
    bgColor: "#d4f73f", // Vibrant Lime Green
    textColor: "#131c33",
    details: [
      { label: "Verification", value: "Instant eKYC & Bureau Fetch" },
      { label: "Target Segment", value: "SMEs & Retail Borrowers" },
      { label: "Disbursals", value: "Instant bank transfers" },
      { label: "Integration", value: "REST APIs & Webhooks" },
    ],
  },
  {
    title: "Loan Management System",
    subtitle:
      "Comprehensive loan books, custom EMI schedules, ledgers, and servicing tools.",
    img: "/lms_hrms.png",
    bgColor: "#fb7185", // Rose Pink
    textColor: "#131c33",
    comingSoon: true,
    details: [
      { label: "Interest Engine", value: "Simple, Reducing & Custom models" },
      { label: "Statements", value: "Instant NOC & SOA generation" },
      { label: "Foreclosure", value: "Auto pre-closure calculations" },
      { label: "Status", value: "Beta testing with select partners" },
    ],
  },
  {
    title: "Collection System",
    subtitle:
      "Automated payment tracking, auto-debits, and instant EMI reminders.",
    img: "/collection.png",
    bgColor: "#131c33", // Deep Navy
    textColor: "#ffffff",
    details: [
      { label: "Gateway", value: "UPI, Netbanking & NACH" },
      { label: "Dunning", value: "WhatsApp & SMS auto-reminders" },
      { label: "Auto-Split", value: "Dynamic penalty calculations" },
      { label: "Recovery Rate", value: "Avg. 98% success rate" },
    ],
  },
  {
    title: "Task Management",
    subtitle:
      "Streamline daily operations, assign tasks to agents, and monitor lead pipelines.",
    img: "/task_management.png",
    bgColor: "#ffffff", // Pure White
    textColor: "#131c33",
    details: [
      { label: "Visual Boards", value: "Kanban & Lead Stages" },
      { label: "Assignment", value: "Auto-allocation rules" },
      { label: "SLA Tracker", value: "Turnaround Time (TAT) alerts" },
      { label: "Collaboration", value: "Shared comments & files" },
    ],
  },
  {
    title: "Smart Reports",
    subtitle:
      "In-depth business performance metrics, collection trends, and live analytics dashboards.",
    img: "/reports.png",
    bgColor: "#38bdf8", // Sky Blue
    textColor: "#131c33",
    details: [
      { label: "Analytics", value: "Real-time NPA & Yield charts" },
      { label: "Export formats", value: "Excel, PDF, CSV & JSON" },
      { label: "Schedules", value: "Daily automated email reports" },
      { label: "Security", value: "Role-based report access" },
    ],
  },
  {
    title: "Bookkeeping & Accounts",
    subtitle:
      "Accurate transaction logging, automated ledger entries, and audit compliance.",
    img: "/accounting.png",
    bgColor: "#c084fc", // Purple/Violet
    textColor: "#131c33",
    comingSoon: true,
    details: [
      { label: "Ledger", value: "Double-entry compliance tracking" },
      { label: "Taxation", value: "GST & TDS worksheets" },
      { label: "Audits", value: "One-click trial balance export" },
      { label: "Status", value: "In active development" },
    ],
  },
  {
    title: "Unified Operations Suite",
    subtitle:
      "All 6 capabilities are integrated modules of one single, seamless ecosystem built to power your operations.",
    img: "/logo.png",
    bgColor: "#0f172a", // Premium Dark Slate
    textColor: "#ffffff",
    badge: "Fundflick Suite",
    details: [
      { label: "Integration", value: "Unified Database & SSO" },
      { label: "Sync Speed", value: "Real-time, zero lag" },
      { label: "Data Flow", value: "Cross-module automation" },
      { label: "Setup", value: "Plug & play modules" },
    ],
  },
];

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
  >
    <path
      fillRule="evenodd"
      d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function HoverGallery2() {
  const stackRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".m-stack-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        // shrink each card as the next one scrolls up to cover it
        gsap.to(card, {
          scale: 0.94,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, stackRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={stackRef}
      className="relative w-full bg-slate-50 border-t border-slate-100 py-20 px-5 sm:px-6"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      {/* background graphics */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-secondaryColor/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

      {/* header */}
      <div className="relative z-10 text-center mb-12 md:mb-16 max-w-2xl mx-auto">
        <p className="text-secondaryColor font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-1">
          Core Capabilities
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          End-to-End <span className="text-secondaryColor">Lending Suite</span>
        </h2>
        <p className="text-slate-500 mt-3 text-xs md:text-sm leading-relaxed">
          Scroll to stack through every module of your loan operations lifecycle.
        </p>
      </div>

      {/* sticky stacking rectangle cards */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {STACK_CARDS.map((card, i) => {
          const dark = card.textColor === "#ffffff";
          const isUnified = i === STACK_CARDS.length - 1;
          const pillBg = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
          const pillText = dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";
          const specBorder = dark
            ? "rgba(255,255,255,0.25)"
            : "rgba(0,0,0,0.15)";
          const imgBg = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
          return (
            <div
              key={i}
              className="sticky"
              style={{ top: `${100 + i * 14}px` }}
            >
              <div
                className="m-stack-card rounded-[28px] border border-current/10 shadow-xl overflow-hidden flex flex-col lg:flex-row mb-6"
                style={{
                  backgroundColor: card.bgColor,
                  color: card.textColor,
                  transformOrigin: "top center",
                }}
              >
                {/* LEFT — text content */}
                <div className="flex-1 p-7 sm:p-9 lg:p-11 flex flex-col">
                  {/* header pills */}
                  <div className="flex justify-between items-center mb-6 gap-3">
                    <span
                      className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider whitespace-nowrap"
                      style={{ backgroundColor: pillBg, color: pillText }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Module 0{i + 1} / 0{STACK_CARDS.length}
                    </span>
                    <span
                      className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full whitespace-nowrap"
                      style={{ backgroundColor: pillBg }}
                    >
                      {card.badge ||
                        (card.comingSoon ? "Coming Soon" : "Active Feature")}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed opacity-85 mb-6 max-w-md">
                    {card.subtitle}
                  </p>

                  {/* spec grid */}
                  {!isUnified && (
                    <div className="grid grid-cols-2 gap-x-5 gap-y-4 mb-8">
                      {card.details.map((d, di) => (
                        <div
                          key={di}
                          className="border-l-2 pl-3"
                          style={{ borderColor: specBorder }}
                        >
                          <span className="block text-[8px] md:text-[9px] font-bold uppercase tracking-wider opacity-65">
                            {d.label}
                          </span>
                          <span className="block text-xs md:text-[13px] font-semibold leading-tight">
                            {d.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* footer action */}
                  <div className="mt-auto pt-4 border-t border-current/10 flex justify-between items-center">
                    <span className="text-[9px] uppercase tracking-wider font-semibold opacity-50">
                      Fundflick Suite
                    </span>
                    <Link
                      href="/contactus"
                      className="group/btn inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:underline"
                      style={{ color: card.textColor }}
                    >
                      {card.comingSoon
                        ? "Request Early Access"
                        : "Explore Module"}
                      <ArrowIcon />
                    </Link>
                  </div>
                </div>

                {/* RIGHT — visual mockup */}
                <div className="lg:w-[42%] px-7 pb-7 sm:px-9 sm:pb-9 lg:p-9 lg:pl-0 flex items-center justify-center">
                  <div
                    className="w-full h-[190px] lg:h-full lg:min-h-[320px] rounded-2xl border border-current/10 flex items-center justify-center overflow-hidden shadow-inner p-4"
                    style={{ backgroundColor: imgBg }}
                  >
                    <img
                      src={card.img}
                      alt={card.title}
                      className={
                        card.img === "/logo.png"
                          ? `max-h-[60%] max-w-[60%] object-contain ${
                              dark ? "brightness-0 invert" : ""
                            }`
                          : "w-full h-full object-cover rounded-lg"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
