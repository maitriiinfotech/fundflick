"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface Step {
  id: string;
  num: string;
  label: string;
  desc: string;
  color: string;
  accentBg: string;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
  {
    id: "apply",
    num: "01",
    label: "Application",
    desc: "Borrower submits loan request digitally with docs & KYC",
    color: "#2b7fff", // Electric Blue
    accentBg: "rgba(43, 127, 255, 0.05)",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
  },
  {
    id: "verify",
    num: "02",
    label: "Verification",
    desc: "Automated credit scoring, bureau checks & risk engine",
    color: "#8b5cf6", // Purple
    accentBg: "rgba(139, 92, 246, 0.05)",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    ),
  },
  {
    id: "approve",
    num: "03",
    label: "Approval",
    desc: "AI-powered underwriting decision in minutes, not days",
    color: "#10b981", // Green
    accentBg: "rgba(16, 185, 129, 0.05)",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    ),
  },
  {
    id: "disburse",
    num: "04",
    label: "Disbursal",
    desc: "Instant fund transfer directly into borrower's account",
    color: "#f59e0b", // Amber
    accentBg: "rgba(245, 158, 11, 0.05)",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
      />
    ),
  },
  {
    id: "collect",
    num: "05",
    label: "Collection",
    desc: "Smart EMI tracking, automated reminders & recovery workflows",
    color: "#ef4444", // Red
    accentBg: "rgba(239, 68, 68, 0.05)",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
];

interface Stat {
  end: number;
  suffix: string;
  prefix: string;
  label: string;
  color: string;
}

const STATS: Stat[] = [
  { end: 98, suffix: "%", prefix: "", label: "Approval Rate", color: "#2b7fff" },
  { end: 45, suffix: "s", prefix: "", label: "Avg. Decision Time", color: "#8b5cf6" },
  { end: 5, suffix: "L+", prefix: "₹", label: "Disbursed Monthly", color: "#10b981" },
  { end: 99, suffix: "%", prefix: "", label: "Collection Efficiency", color: "#f59e0b" },
];

export default function AnimatedPipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const track = trackRef.current;
      const sticky = stickyRef.current;
      const container = containerRef.current;

      if (!track || !sticky || !container) return;

      // Calculate the width of the horizontal scrolling track
      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth;
      };

      // 1. Horizontal Pin Scrolling Timeline
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      pinTimeline.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      // 2. Laser connector line drawing animation linked to scroll progress
      const laser = laserRef.current;
      if (laser) {
        const pathLength = laser.getTotalLength();
        gsap.set(laser, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        // Bind drawing to the horizontal scroll trigger progress
        gsap.to(laser, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            scrub: 1.2,
          },
        });
      }

      // 3. Stagger-reveal step cards when scrolling through them
      const cards = gsap.utils.toArray(".step-card");
      cards.forEach((card: any) => {
        gsap.fromTo(
          card,
          { scale: 0.9, opacity: 0.5, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              containerAnimation: pinTimeline,
              start: "left 90%",
              end: "left 50%",
              scrub: true,
            },
          }
        );
      });

      // 4. Stagger reveal stat cards inside the final slide
      const statCards = gsap.utils.toArray(".stat-item-card");
      statCards.forEach((statCard: any) => {
        gsap.fromTo(
          statCard,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statCard,
              containerAnimation: pinTimeline,
              start: "left 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 5. Stat Counter numbers count-up animation when final slide scrolls in
      STATS.forEach((stat, idx) => {
        const counterEl = document.getElementById(`stat-counter-${idx}`);
        if (!counterEl) return;

        const countVal = { value: 0 };
        gsap.to(countVal, {
          value: stat.end,
          scrollTrigger: {
            trigger: counterEl,
            containerAnimation: pinTimeline,
            start: "left 80%",
            toggleActions: "play none none none",
          },
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            counterEl.innerText = `${stat.prefix}${Math.round(countVal.value)}${stat.suffix}`;
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full bg-white">
      {/* Scroll Trigger height block defining scroll distance */}
      <div ref={stickyRef} className="sticky top-0 h-screen w-full flex flex-col justify-between py-16 overflow-hidden">
        
        {/* Background Subtle Gradient Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-60 pointer-events-none -z-20" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 via-white to-indigo-50/10 pointer-events-none -z-20" />

        {/* Section Header */}
        <div className="px-6 sm:px-12 lg:px-20 max-w-4xl shrink-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2b7fff] mb-3 font-display">
            Operational Lifecycle
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-slate-900 font-display uppercase leading-[0.95]">
            Lending Pipeline
          </h2>
        </div>

        {/* Horizontal Track Container */}
        <div className="relative flex-grow flex items-center h-full my-auto z-10">
          
          {/* Connecting Laser Line SVG */}
          <div className="absolute left-0 right-0 w-full overflow-visible pointer-events-none -z-10">
            <svg className="w-full h-1" viewBox="0 0 100 1" preserveAspectRatio="none">
              <path
                ref={laserRef}
                d="M 0 0.5 L 3000 0.5"
                stroke="rgba(43, 127, 255, 0.15)"
                strokeWidth="0.8"
                fill="none"
              />
              <path
                ref={laserRef}
                d="M 0 0.5 L 3000 0.5"
                stroke="url(#laser-gradient)"
                strokeWidth="1.2"
                fill="none"
              />
              <defs>
                <linearGradient id="laser-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2b7fff" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div
            ref={trackRef}
            className="flex flex-row items-center gap-14 md:gap-20 pl-6 sm:pl-12 lg:pl-20 pr-[35vw] h-[360px] md:h-[400px] will-change-transform"
          >
            {/* Steps Map */}
            {STEPS.map((step) => (
              <div
                key={step.id}
                className="step-card w-[290px] md:w-[360px] shrink-0 h-full relative flex flex-col justify-between p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-slate-200/80 transition-all duration-500 group cursor-pointer"
              >
                {/* Outlined Watermark Number */}
                <div className="text-[10vw] font-extrabold text-slate-100/50 font-display select-none pointer-events-none -z-10 absolute -top-10 -left-6 tracking-tighter">
                  {step.num}
                </div>

                {/* Card Header: Icon & Color Dot */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 text-[#2b7fff]"
                    style={{
                      backgroundColor: step.accentBg,
                      color: step.color,
                    }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {step.icon}
                    </svg>
                  </div>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: step.color }}
                  />
                </div>

                {/* Card Description & Info */}
                <div className="mt-8">
                  <h3
                    className="text-xl font-bold font-display tracking-tight text-slate-900 mb-2 transition-colors duration-300"
                    style={{ groupHover: { color: step.color } }}
                  >
                    {step.label}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>

                {/* Subtitle bottom tag */}
                <div className="text-[9px] font-mono tracking-widest text-slate-400 uppercase mt-4">
                  STAGE {step.num}
                </div>
              </div>
            ))}

            {/* Final Slide: Interactive Stats Showcase Panel */}
            <div className="w-[480px] md:w-[560px] shrink-0 h-full bg-[#131c33] border border-slate-900 rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              {/* Subtle visual glow ornament */}
              <div className="absolute -bottom-20 -right-20 w-44 h-44 rounded-full bg-[#2b7fff]/20 blur-3xl pointer-events-none" />
              
              <div>
                <p className="text-[#2b7fff] text-[10px] font-mono tracking-widest uppercase mb-1">
                  System Stats
                </p>
                <h3 className="text-2xl font-extrabold font-display tracking-tight text-white mb-2">
                  High-Performance Lending
                </h3>
                <p className="text-slate-400 text-xs font-light max-w-sm leading-relaxed">
                  Engineered to scale transaction volume while protecting portfolio yields.
                </p>
              </div>

              {/* Grid of stats */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 my-6">
                {STATS.map((stat, idx) => (
                  <div
                    key={idx}
                    className="stat-item-card bg-slate-950/60 border border-slate-800/60 p-4 rounded-2xl flex flex-col justify-center"
                  >
                    <span
                      id={`stat-counter-${idx}`}
                      className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight"
                      style={{ color: stat.color }}
                    >
                      {stat.prefix}0{stat.suffix}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer status logs */}
              <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 pt-2 border-t border-slate-800">
                <span>SYSTEM STATUS: COMPLIANT</span>
                <span>SECURE INTEGRATION v4</span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer text guide */}
        <div className="px-6 sm:px-12 lg:px-20 shrink-0 flex items-center justify-between text-slate-400 text-xs">
          <span>Explore Pipeline</span>
          <span className="animate-pulse flex items-center gap-2">
            Scroll down to advance timeline <span>→</span>
          </span>
        </div>

      </div>
    </div>
  );
}
