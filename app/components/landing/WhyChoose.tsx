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

type AppTile = {
  label: string;
  d?: string;
  fill?: boolean;
  /** Solid brand colour for a single-path icon (else inherits blue). */
  color?: string;
  /** Multi-colour brand paths (e.g. original Google Play). Overrides d/fill. */
  colors?: { d: string; fill: string }[];
};

const APP_TILES: AppTile[] = [
  {
    label: "Play Store",
    // Original 4-colour Google Play mark
    colors: [
      {
        d: "M1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924z",
        fill: "#00A0FF",
      },
      {
        d: "M13.544 10.989l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973z",
        fill: "#00E676",
      },
      {
        d: "M13.544 13.056l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z",
        fill: "#FF3D00",
      },
      {
        d: "M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594z",
        fill: "#FFC400",
      },
    ],
  },
  {
    label: "App Store",
    fill: true,
    color: "#0B0B0B",
    d: "M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z",
  },
  {
    label: "Web App",
    fill: false,
    color: "#0EA5E9",
    d: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 0c3 3 3 17 0 20m0-20c-3 3-3 17 0 20M2 12h20",
  },
];

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
      desc: "Run your entire operation from anywhere — native Android and iOS apps plus a full web app, always in sync wherever your team works.",
      bgGlow: "rgba(43, 127, 255, 0.06)",
      visual: (
        <div className="w-full bg-white border border-slate-200 rounded-xl p-4 font-mono text-[10px] text-slate-800 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-3">
            <span className="text-slate-500">AVAILABLE ON</span>
            <span className="text-emerald-600 font-bold">LIVE</span>
          </div>
          <div className="flex items-stretch gap-2 py-1">
            {APP_TILES.map((p) => (
              <div
                key={p.label}
                className="relative flex flex-1 flex-col items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-100 py-2.5"
              >
                {p.label === "App Store" && (
                  <span
                    aria-label="Coming soon"
                    className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-yellow-400 ring-2 ring-white"
                  />
                )}
                <svg
                  className="w-5 h-5 text-[#2b7fff]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  {p.colors ? (
                    p.colors.map((c, ci) => (
                      <path key={ci} d={c.d} fill={c.fill} />
                    ))
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={p.d}
                      fill={p.fill ? p.color || "currentColor" : "none"}
                      stroke={p.fill ? "none" : p.color || "currentColor"}
                      strokeWidth={1.6}
                    />
                  )}
                </svg>
                <span className="text-[8px] text-slate-500">{p.label}</span>
              </div>
            ))}
          </div>
          <div className="text-slate-400 mt-3">On Android, iOS &amp; the web</div>
        </div>
      ),
    },
    {
      num: "02",
      title: "Secure & Compliant",
      desc: "Bank-grade data isolation, encrypted channels, and built-in audit trails that satisfy enterprise compliance.",
      bgGlow: "rgba(16, 185, 129, 0.06)",
      visual: (
        <div className="w-full bg-white border border-slate-200 rounded-xl p-4 font-mono text-[10px] text-slate-800 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-3">
            <span className="text-slate-500">CIPHER STATUS</span>
            <span className="text-[#2b7fff] font-bold">AES-256</span>
          </div>
          <div className="flex items-center gap-3 py-2">
            <div className="w-8 h-8 rounded-full bg-[#2b7fff]/15 flex items-center justify-center text-[#2b7fff] shrink-0">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-slate-800">TLS 1.3 Secure</div>
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
        <div className="w-full bg-white border border-slate-200 rounded-xl p-4 font-mono text-[10px] text-slate-800 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-3">
            <span className="text-slate-500">LEDGER LOGS</span>
            <span className="text-amber-600 font-bold">SYNCED</span>
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
        <div className="w-full bg-white border border-slate-200 rounded-xl p-4 font-mono text-[10px] text-slate-800 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-3">
            <span className="text-slate-500">TEAM PIPELINES</span>
            <span className="text-purple-600 font-bold">5 ACTIVE</span>
          </div>
          <div className="flex -space-x-1.5 overflow-hidden my-3">
            <div className="h-6.5 w-6.5 rounded-full ring-2 ring-white bg-[#2b7fff] flex items-center justify-center font-bold text-[8px]">AM</div>
            <div className="h-6.5 w-6.5 rounded-full ring-2 ring-white bg-emerald-500 flex items-center justify-center font-bold text-[8px]">JD</div>
            <div className="h-6.5 w-6.5 rounded-full ring-2 ring-white bg-purple-500 flex items-center justify-center font-bold text-[8px]">SK</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-12 md:py-32 px-6 sm:px-12 lg:px-20 bg-white text-slate-900 font-sans overflow-hidden border-t border-slate-100"
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
