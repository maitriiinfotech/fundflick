"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Feature {
  num: string;
  title: string;
  desc: string;
  bgGlow: string;
  visual: React.ReactNode;
}

export default function WhyChoose() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const columnsContainerRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const header = headerRef.current;
    const columns = columnsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!container) return;

    // 1. Scroll-triggered entry animations
    gsap.set(header, { opacity: 0, y: 40 });
    gsap.set(columns, { scaleX: 0, opacity: 0, transformOrigin: "left center" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    tl.to(header, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }).to(
      columns,
      {
        opacity: 1,
        scaleX: 1,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.inOut",
      },
      "-=0.4"
    );

    // 2. Expand columns on hover using GSAP
    columns.forEach((col, index) => {
      const details = col.querySelector(".col-details");
      const num = col.querySelector(".col-num");
      const title = col.querySelector(".col-title");

      const onMouseEnter = () => {
        setActiveIdx(index);

        // Animate flex-grow using GSAP for desktop (md screens and up)
        if (window.innerWidth >= 768) {
          columns.forEach((otherCol, otherIdx) => {
            if (otherCol === col) {
              gsap.to(otherCol, {
                flexGrow: 2.2,
                backgroundColor: "rgba(43, 127, 255, 0.04)", // Light electric blue tint
                borderColor: "rgba(43, 127, 255, 0.3)",
                duration: 0.6,
                ease: "power3.out",
              });
            } else {
              gsap.to(otherCol, {
                flexGrow: 0.6,
                backgroundColor: "#ffffff",
                borderColor: "rgba(226, 232, 240, 0.6)",
                duration: 0.6,
                ease: "power3.out",
              });
            }
          });
        }

        // Reveal inner content
        if (details) {
          gsap.to(details, {
            opacity: 1,
            y: 0,
            height: "auto",
            duration: 0.5,
            ease: "power2.out",
          });
        }

        // Highlight text elements
        if (num) gsap.to(num, { color: "#2b7fff", duration: 0.3 });
        if (title) gsap.to(title, { y: -5, duration: 0.3, ease: "power2.out" });
      };

      const onMouseLeave = () => {
        setActiveIdx(null);

        // Reset all columns to equal flex-grow
        if (window.innerWidth >= 768) {
          columns.forEach((otherCol) => {
            gsap.to(otherCol, {
              flexGrow: 1,
              backgroundColor: "#ffffff",
              borderColor: "rgba(226, 232, 240, 0.8)",
              duration: 0.6,
              ease: "power3.out",
            });
          });
        }

        // Hide inner content
        if (details) {
          gsap.to(details, {
            opacity: 0,
            y: 15,
            height: window.innerWidth >= 768 ? 0 : "auto",
            duration: 0.5,
            ease: "power2.out",
          });
        }

        // Reset texts
        if (num) gsap.to(num, { color: "#94a3b8", duration: 0.3 });
        if (title) gsap.to(title, { y: 0, duration: 0.3, ease: "power2.out" });
      };

      col.addEventListener("mouseenter", onMouseEnter);
      col.addEventListener("mouseleave", onMouseLeave);

      // Save listeners for clean up
      (col as any)._cleanupMouseEnter = onMouseEnter;
      (col as any)._cleanupMouseLeave = onMouseLeave;
    });

    const handleResize = () => {
      // If mobile, make sure heights and details are reset to full auto
      if (window.innerWidth < 768) {
        columns.forEach((col) => {
          gsap.set(col, { flexGrow: 1 });
          const details = col.querySelector(".col-details");
          if (details) gsap.set(details, { opacity: 1, y: 0, height: "auto" });
        });
      } else {
        // Reset columns back to baseline on transition to desktop
        columns.forEach((col) => {
          gsap.set(col, { flexGrow: 1 });
          const details = col.querySelector(".col-details");
          if (details) gsap.set(details, { opacity: 0, y: 15, height: 0 });
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", handleResize);
      columns.forEach((col) => {
        if ((col as any)._cleanupMouseEnter) {
          col.removeEventListener("mouseenter", (col as any)._cleanupMouseEnter);
          col.removeEventListener("mouseleave", (col as any)._cleanupMouseLeave);
        }
      });
    };
  }, []);

  const features: Feature[] = [
    {
      num: "01",
      title: "Anywhere, Everywhere",
      desc: "Run your entire operation from any device — desktop, tablet or mobile. Fully responsive and always in sync, wherever your team works.",
      bgGlow: "rgba(43, 127, 255, 0.06)",
      visual: (
        <div className="w-full bg-[#131c33] border border-white/10 rounded-xl p-4 font-mono text-[10px] text-white">
          <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
            <span className="text-slate-400">DEVICE SYNC</span>
            <span className="text-emerald-400 font-bold">LIVE</span>
          </div>
          <div className="flex items-stretch gap-2 py-1">
            {[
              {
                label: "Desktop",
                d: "M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a.75.75 0 0 1-.75.75H3.75A.75.75 0 0 1 3 12V5.25",
              },
              {
                label: "Tablet",
                d: "M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-15a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 4.5v15a2.25 2.25 0 0 0 2.25 2.25Z",
              },
              {
                label: "Mobile",
                d: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3",
              },
            ].map((dvc) => (
              <div
                key={dvc.label}
                className="flex flex-1 flex-col items-center gap-1.5 rounded-lg bg-white/5 py-2.5"
              >
                <svg
                  className="w-5 h-5 text-[#2b7fff]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.6}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={dvc.d} />
                </svg>
                <span className="text-[8px] text-slate-400">{dvc.label}</span>
              </div>
            ))}
          </div>
          <div className="text-slate-500 mt-3">Synced across all your devices</div>
        </div>
      ),
    },
    {
      num: "02",
      title: "Secure & Compliant",
      desc: "Bank-grade data isolation, encrypted channels, and built-in audit trails that satisfy enterprise compliance.",
      bgGlow: "rgba(16, 185, 129, 0.06)",
      visual: (
        <div className="w-full bg-[#131c33] border border-white/10 rounded-xl p-4 font-mono text-[10px] text-white">
          <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
            <span className="text-slate-400">CIPHER STATUS</span>
            <span className="text-[#2b7fff] font-bold">AES-256</span>
          </div>
          <div className="flex items-center gap-3 py-2">
            <div className="w-8 h-8 rounded-full bg-[#2b7fff]/15 flex items-center justify-center text-[#2b7fff] shrink-0">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-white">TLS 1.3 Secure</div>
              <div className="text-[8px] text-slate-500">ISO-27001 Compliant</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: "03",
      title: "Smart Analytics",
      desc: "Make decisions with accurate business performance metrics, data trends, and clear interactive dashboards.",
      bgGlow: "rgba(139, 92, 246, 0.06)",
      visual: (
        <div className="w-full bg-[#131c33] border border-white/10 rounded-xl p-4 font-mono text-[10px] text-white">
          <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
            <span className="text-slate-400">LEDGER LOGS</span>
            <span className="text-amber-400 font-bold">SYNCED</span>
          </div>
          <div className="flex items-end justify-between gap-1 h-12 mt-2">
            <div className="w-1/5 bg-[#2b7fff]/30 h-6 rounded" />
            <div className="w-1/5 bg-[#2b7fff]/50 h-9 rounded" />
            <div className="w-1/5 bg-[#2b7fff]/70 h-5 rounded" />
            <div className="w-1/5 bg-[#2b7fff] h-10 rounded" />
            <div className="w-1/5 bg-emerald-400 h-12 rounded animate-pulse" />
          </div>
        </div>
      ),
    },
    {
      num: "04",
      title: "Collaborative",
      desc: "Work seamlessly across resources, assign tasks directly, and streamline standard team pipelines.",
      bgGlow: "rgba(245, 158, 11, 0.06)",
      visual: (
        <div className="w-full bg-[#131c33] border border-white/10 rounded-xl p-4 font-mono text-[10px] text-white">
          <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
            <span className="text-slate-400">TEAM PIPELINES</span>
            <span className="text-purple-400 font-bold">5 ACTIVE</span>
          </div>
          <div className="flex -space-x-1.5 overflow-hidden my-3">
            <div className="h-6.5 w-6.5 rounded-full ring-2 ring-[#131c33] bg-[#2b7fff] flex items-center justify-center font-bold text-[8px]">AM</div>
            <div className="h-6.5 w-6.5 rounded-full ring-2 ring-[#131c33] bg-emerald-500 flex items-center justify-center font-bold text-[8px]">JD</div>
            <div className="h-6.5 w-6.5 rounded-full ring-2 ring-[#131c33] bg-purple-500 flex items-center justify-center font-bold text-[8px]">SK</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 px-6 sm:px-12 lg:px-20 bg-white text-slate-900 font-sans overflow-hidden border-t border-slate-100"
    >
      {/* Light Theme Background matching VantaHero */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 via-white to-indigo-50/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 max-w-6xl">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#2b7fff] mb-4 font-display">
              Platform Strengths
            </p>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-slate-900 font-display leading-[0.95] uppercase">
              Why Choose <br />Fundflick
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light max-w-sm">
            Experience next-generation lending architecture built for speed, compliance, and growth.
          </p>
        </div>

        {/* Awwwards Curtain Grid Columns Container */}
        <div 
          ref={columnsContainerRef}
          className="flex flex-col md:flex-row w-full h-auto md:h-[520px] border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm"
        >
          {features.map((feature, index) => {
            return (
              <div
                key={feature.num}
                ref={(el) => {
                  columnsRef.current[index] = el;
                }}
                className="flex-1 min-w-0 h-full border-b md:border-b-0 md:border-r border-slate-200/80 p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 bg-white cursor-pointer relative overflow-hidden select-none"
              >
                {/* Number Indicator */}
                <div className="col-num text-sm font-mono font-bold text-slate-400 mb-8 transition-colors duration-300">
                  {feature.num}
                </div>

                {/* Main Content Area */}
                <div>
                  <h3 className="col-title text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900 mb-4 transform transition-all duration-300">
                    {feature.title}
                  </h3>

                  {/* Expandable Details Block */}
                  <div className="col-details opacity-100 md:opacity-0 md:h-0 overflow-hidden space-y-6">
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light">
                      {feature.desc}
                    </p>

                    {/* Interactive Mock Graphic */}
                    <div className="w-full max-w-[280px] mt-4 shadow-xl rounded-xl overflow-hidden transform transition-all">
                      {feature.visual}
                    </div>
                  </div>
                </div>

                {/* Subtitle tag visible when collapsed */}
                <div className="mt-8 text-[10px] font-mono tracking-widest text-slate-400 uppercase md:block hidden">
                  EXPLORE {feature.num}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
