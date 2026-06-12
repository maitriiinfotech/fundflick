"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  heading: string;
  description: string;
  color: string;
  borderColor: string;
  glowColor: string;
  features: string[];
}

const PILLARS: Pillar[] = [
  {
    id: "simplify",
    title: "Simplify Lending",
    subtitle: "Automate friction out of origination",
    heading: "Zero-Friction Decisioning",
    description: "Convert application forms to approvals in seconds. Integrate credit reporting, document scanning, and custom rule assessment without opening a spreadsheet.",
    color: "#f97316", // Orange
    borderColor: "rgba(249, 115, 22, 0.2)",
    glowColor: "rgba(249, 115, 22, 0.15)",
    features: [
      "15-second KYC & Bureau pull",
      "Custom underwriting rules engine",
      "Interactive borrower portal"
    ]
  },
  {
    id: "standardize",
    title: "Standardize Workflows",
    subtitle: "Scale operations without headcount",
    heading: "Visual Pipeline Orchestration",
    description: "Keep compliance uniform and processing speeds high. Map loan stages, automate checklist validation, and delegate task queues to agents effortlessly.",
    color: "#a3e635", // Lime Green
    borderColor: "rgba(163, 230, 53, 0.2)",
    glowColor: "rgba(163, 230, 53, 0.15)",
    features: [
      "Visual Kanban progress boards",
      "SLA alarms & automated escalation",
      "Audit trail tracking & logging"
    ]
  },
  {
    id: "scale",
    title: "Scale Volume",
    subtitle: "Accelerate recovery & ledger growth",
    heading: "High-Performance Collections",
    description: "Sustain growth without ballooning bad debts. Deploy automatic EMI reminders, auto-debit triggers, and real-time ledger accounting with full bank reconciliation.",
    color: "#38bdf8", // Sky Blue
    borderColor: "rgba(56, 189, 248, 0.2)",
    glowColor: "rgba(56, 189, 248, 0.15)",
    features: [
      "Auto-debit with failover routing",
      "WhatsApp & Email instant updates",
      "Real-time ledgering & reports"
    ]
  }
];

export default function LendingFocus() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // References for GSAP animations
  const contentTextRef = useRef<HTMLDivElement>(null);
  const graphicContainerRef = useRef<HTMLDivElement>(null);

  // 1. Core pillar switcher animation
  useGSAP(
    () => {
      // Animate text info switch
      gsap.fromTo(
        ".pillar-info-element",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
      );

      // Animate graphic cards stack change
      gsap.fromTo(
        ".graphic-card-active",
        { scale: 0.95, opacity: 0, filter: "blur(4px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.2)" }
      );
    },
    { dependencies: [activeIdx], scope: containerRef }
  );

  // 2. Specific animations inside cards depending on active index
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      if (activeIdx === 0) {
        // --- SIMPLIFY LENDING ANIMATIONS ---
        const tl = gsap.timeline();
        
        // Reset and animate checkpoints
        gsap.set(".simplify-check", { scale: 0, opacity: 0 });
        gsap.set(".simplify-meter-needle", { rotation: -90 });
        gsap.set(".simplify-approved-stamp", { scale: 3, opacity: 0 });

        tl.to(".simplify-check-0", { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" })
          .to(".simplify-check-1", { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, "+=0.15")
          .to(".simplify-check-2", { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, "+=0.15")
          .to(".simplify-meter-needle", { rotation: 55, duration: 0.9, ease: "back.out(1.8)" })
          .to(".simplify-approved-stamp", { scale: 1, opacity: 1, duration: 0.5, ease: "bounce.out" }, "+=0.1");

      } else if (activeIdx === 1) {
        // --- STANDARDIZE WORKFLOWS ANIMATIONS ---
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        
        gsap.set(".workflow-card-1", { x: 0, y: 0 });
        gsap.set(".workflow-card-2", { x: 0, y: 0 });

        tl.to(".workflow-card-1", {
          x: 180,
          duration: 1.2,
          ease: "power2.inOut",
        })
        .to(".workflow-card-2", {
          x: 180,
          duration: 1.2,
          ease: "power2.inOut",
        }, "-=0.8")
        .to(".workflow-badge-approved", {
          backgroundColor: "#10b981",
          color: "#ffffff",
          duration: 0.3,
        }, "-=0.3");

      } else if (activeIdx === 2) {
        // --- SCALE VOLUME ANIMATIONS ---
        // Animate counter
        const counterVal = { value: 1250000 };
        const counterEl = document.getElementById("volume-counter");
        
        gsap.to(counterVal, {
          value: 54892100,
          duration: 2.2,
          ease: "power3.out",
          onUpdate: () => {
            if (counterEl) {
              counterEl.innerText = "$" + Math.floor(counterVal.value).toLocaleString();
            }
          }
        });

        // Animate line chart path drawing
        const chartPath = document.querySelector(".scale-chart-line") as SVGPathElement;
        if (chartPath) {
          const pathLength = chartPath.getTotalLength();
          gsap.set(chartPath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
          gsap.to(chartPath, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" });
        }

        // Animate floating growth dots
        gsap.fromTo(".scale-growth-dot", 
          { y: 20, opacity: 0 }, 
          { y: -20, opacity: 1, duration: 1, stagger: 0.2, repeat: -1, ease: "power1.out" }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [activeIdx]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-slate-950 py-24 px-6 sm:px-12 lg:px-20 text-white font-sans border-t border-slate-900"
    >
      {/* Dynamic Background Glow - moves and colors based on active option */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] rounded-full blur-[140px] pointer-events-none opacity-40 transition-all duration-1000 ease-in-out"
        style={{
          background: `radial-gradient(circle, ${PILLARS[activeIdx].glowColor} 0%, rgba(15, 23, 41, 0) 70%)`
        }}
      />

      {/* Decorative fine-line grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <p 
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 font-display transition-colors duration-500"
            style={{ color: PILLARS[activeIdx].color }}
          >
            Fundflick Architecture
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display leading-[1.15] text-white">
            Transforming Lending — <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              Empowering Growth
            </span>
          </h2>
          <p className="text-slate-400 mt-5 text-sm sm:text-base leading-relaxed font-normal max-w-xl mx-auto">
            Experience seamless financial solutions that accelerate your business success
          </p>
        </div>

        {/* Tab selection grid (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {PILLARS.map((pillar, index) => {
            const isActive = index === activeIdx;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveIdx(index)}
                className={`relative flex flex-col items-start p-6 text-left rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden group select-none ${
                  isActive 
                    ? "bg-slate-900/90 border-slate-700 shadow-2xl" 
                    : "bg-slate-950/40 border-slate-900/60 hover:bg-slate-900/40 hover:border-slate-800"
                }`}
              >
                {/* Selected Top highlight bar */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 ${
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-75 group-hover:opacity-40 group-hover:scale-95"
                  }`}
                  style={{ backgroundColor: pillar.color }}
                />

                <span 
                  className="text-xs font-bold uppercase tracking-wider mb-2 font-display transition-colors duration-500"
                  style={{ color: isActive ? pillar.color : "#64748b" }}
                >
                  0{index + 1}
                </span>
                
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {pillar.title}
                </h3>
                
                <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">
                  {pillar.subtitle}
                </p>

                {/* Subtle bottom-right glow inside cards */}
                <div 
                  className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-30 pointer-events-none"
                  style={{ backgroundColor: pillar.color }}
                />
              </button>
            );
          })}
        </div>

        {/* Bottom Panel: Details Left, Interactive GSAP visual Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center bg-slate-900/30 border border-slate-900/60 rounded-3xl p-6 sm:p-10 lg:p-14 backdrop-blur-xl">
          
          {/* Details Column */}
          <div ref={contentTextRef} className="lg:col-span-5 flex flex-col justify-center">
            <h4 
              className="pillar-info-element text-2xl sm:text-3xl font-extrabold tracking-tight font-display mb-4 text-white leading-tight"
            >
              {PILLARS[activeIdx].heading}
            </h4>
            
            <p className="pillar-info-element text-slate-400 text-sm sm:text-base leading-relaxed mb-8 font-light">
              {PILLARS[activeIdx].description}
            </p>

            {/* Micro bullet list */}
            <ul className="space-y-4">
              {PILLARS[activeIdx].features.map((feature, i) => (
                <li key={i} className="pillar-info-element flex items-center gap-3">
                  <div 
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-slate-900 border"
                    style={{ borderColor: PILLARS[activeIdx].color }}
                  >
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" style={{ stroke: PILLARS[activeIdx].color }} />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-200">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Screen Preview Column */}
          <div ref={graphicContainerRef} className="lg:col-span-7 flex justify-center items-center w-full">
            <div className="relative w-full max-w-[520px] aspect-[4/3] rounded-2xl bg-slate-950 border border-slate-900 p-5 sm:p-6 overflow-hidden shadow-2xl graphic-card-active">
              
              {/* Outer top bar simulation */}
              <div className="flex items-center gap-2 border-b border-slate-900 pb-3 mb-5 text-[10px] text-slate-500 font-mono">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-2">lending-engine://{PILLARS[activeIdx].id}-module.sh</span>
              </div>

              {/* CARD CONTENT 0: SIMPLIFY */}
              {activeIdx === 0 && (
                <div className="h-full flex flex-col justify-between select-none">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Simulator Inputs */}
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800/40 space-y-3 font-mono text-[10px] text-slate-400">
                      <div>
                        <div className="text-slate-500">BORROWER ID</div>
                        <div className="text-slate-200 font-bold">FF-USR-9842</div>
                      </div>
                      <div>
                        <div className="text-slate-500">REQUESTED LOAN</div>
                        <div className="text-slate-200 font-bold">$15,000.00</div>
                      </div>
                      <div>
                        <div className="text-slate-500">LOAN-TO-VALUE (LTV)</div>
                        <div className="text-slate-200 font-bold">62.5%</div>
                      </div>
                    </div>

                    {/* Verification Checklist */}
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800/40 flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">Security Logs</span>
                      <div className="space-y-2.5 mt-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-400">KYC Status</span>
                          <span className="simplify-check simplify-check-0 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-900 text-emerald-400 font-bold font-mono">VERIFIED</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-400">Income Check</span>
                          <span className="simplify-check simplify-check-1 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-900 text-emerald-400 font-bold font-mono">APPROVED</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-400">Fraud Engine</span>
                          <span className="simplify-check simplify-check-2 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-900 text-emerald-400 font-bold font-mono">PASS</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Meter & Stamp Row */}
                  <div className="flex items-center justify-between mt-auto bg-slate-900/30 rounded-xl border border-slate-900/80 p-4">
                    {/* Gauge meter */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-8 bg-slate-900 rounded-t-full border border-slate-800 overflow-hidden flex justify-center">
                        {/* Dial coloring */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 opacity-20" />
                        {/* Needle */}
                        <div className="simplify-meter-needle absolute bottom-0 w-[2px] h-7 bg-white origin-bottom rounded-full" />
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-slate-500">CREDIT ENGINE</div>
                        <div className="text-xs font-bold text-white font-mono">SCORE: 810</div>
                      </div>
                    </div>

                    {/* Stamp */}
                    <div className="simplify-approved-stamp flex items-center justify-center border-2 border-orange-500/80 text-orange-500 font-bold italic tracking-wider text-[11px] px-3.5 py-1.5 rounded-lg rotate-[-12deg] shadow-lg font-mono">
                      APPROVED
                    </div>
                  </div>
                </div>
              )}

              {/* CARD CONTENT 1: STANDARDIZE */}
              {activeIdx === 1 && (
                <div className="h-full flex flex-col justify-between font-mono text-[10px] text-slate-400 select-none">
                  {/* Kanban Columns */}
                  <div className="grid grid-cols-3 gap-3 flex-grow">
                    
                    {/* Column 1 */}
                    <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-900 flex flex-col gap-2.5">
                      <div className="text-[9px] text-slate-500 border-b border-slate-900 pb-1.5 font-bold uppercase tracking-wider">Origination</div>
                      
                      {/* Workflow Card 1 */}
                      <div className="workflow-card-1 bg-slate-900 border border-slate-800/80 rounded-lg p-2.5 flex flex-col gap-1 shadow-md">
                        <div className="font-bold text-white text-[9px]">S. Jenkins</div>
                        <div className="text-[8px] text-slate-500 font-mono">$45,000 (Commercial)</div>
                        <div className="mt-1 flex items-center justify-between text-[7px] text-amber-400">
                          <span>SLA 4h</span>
                          <span className="px-1 py-0.2 rounded bg-amber-950/40 border border-amber-900/60 font-bold uppercase text-[6px]">Review</span>
                        </div>
                      </div>
                    </div>

                    {/* Column 2 */}
                    <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-900 flex flex-col gap-2.5">
                      <div className="text-[9px] text-slate-500 border-b border-slate-900 pb-1.5 font-bold uppercase tracking-wider">Underwriting</div>
                      
                      {/* Workflow Card 2 */}
                      <div className="workflow-card-2 bg-slate-900 border border-slate-800/80 rounded-lg p-2.5 flex flex-col gap-1 shadow-md">
                        <div className="font-bold text-white text-[9px]">David Kim</div>
                        <div className="text-[8px] text-slate-500 font-mono">$120,000 (SME Loan)</div>
                        <div className="mt-1 flex items-center justify-between text-[7px] text-blue-400">
                          <span>SLA 12h</span>
                          <span className="workflow-badge-approved px-1 py-0.2 rounded bg-blue-950/40 border border-blue-900/60 font-bold uppercase text-[6px]">Analyze</span>
                        </div>
                      </div>
                    </div>

                    {/* Column 3 */}
                    <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-900 flex flex-col gap-2.5">
                      <div className="text-[9px] text-slate-500 border-b border-slate-900 pb-1.5 font-bold uppercase tracking-wider">Approved</div>
                      
                      {/* Placeholder drop points */}
                      <div className="border border-dashed border-slate-900 rounded-lg h-16 flex items-center justify-center text-[8px] text-slate-600">
                        Drop items here
                      </div>
                    </div>
                  </div>

                  {/* Flow footer stats */}
                  <div className="mt-4 flex items-center justify-between border-t border-slate-900 pt-3 text-[9px] text-slate-500">
                    <div>ACTIVE TASKS: <span className="text-white font-bold">14</span></div>
                    <div>AVG SLA TIME: <span className="text-lime-400 font-bold">18m 42s</span></div>
                  </div>
                </div>
              )}

              {/* CARD CONTENT 2: SCALE */}
              {activeIdx === 2 && (
                <div className="h-full flex flex-col justify-between select-none">
                  {/* Live Counter Display */}
                  <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800/40 flex justify-between items-center">
                    <div>
                      <div className="text-[9px] font-mono text-slate-500">AGGREGATE DISBURSED VOLUME</div>
                      <div id="volume-counter" className="text-lg sm:text-2xl font-bold font-mono text-sky-400 tracking-tight mt-1">
                        $1,250,000
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950 border border-emerald-900 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      +42% MoM
                    </div>
                  </div>

                  {/* Live Growth Line Chart */}
                  <div className="relative flex-grow flex items-end justify-center py-4">
                    {/* SVG Chart */}
                    <svg className="w-full h-24 overflow-visible" viewBox="0 0 400 100" fill="none">
                      {/* Chart Grid Lines */}
                      <line x1="0" y1="99" x2="400" y2="99" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                      <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="2" x2="400" y2="2" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      
                      {/* Area under the line */}
                      <path 
                        d="M0,99 Q70,75 140,80 T280,30 T400,5 L400,99 L0,99 Z" 
                        fill="url(#scale-chart-gradient)" 
                        opacity="0.1"
                      />
                      
                      {/* Line */}
                      <path
                        className="scale-chart-line"
                        d="M0,99 Q70,75 140,80 T280,30 T400,5"
                        stroke="#38bdf8"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Spark Gradient */}
                      <defs>
                        <linearGradient id="scale-chart-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Rising growth particles */}
                    <div className="absolute top-10 right-10 flex flex-col gap-1.5 items-end pointer-events-none">
                      <span className="scale-growth-dot px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-[8px] font-mono text-emerald-400 rounded">RECOVERY 99.1%</span>
                      <span className="scale-growth-dot px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-[8px] font-mono text-sky-400 rounded">DELINQUENCY 0.3%</span>
                    </div>
                  </div>

                  {/* Footer status logs */}
                  <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 pt-2 border-t border-slate-900">
                    <span>LEDGER: CONNECTED (API v4)</span>
                    <span>LAST SYNC: SECONDS AGO</span>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
