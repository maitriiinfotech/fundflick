"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Feature {
  id: string;
  num: string;
  title: string;
  desc: string;
  visual: React.ReactNode;
}

export default function WhyChoose() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const header = headerRef.current;
    const rows = rowsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!container) return;

    // 1. Initial Page Load Scroll-Trigger Animations
    gsap.set(header, { opacity: 0, y: 50 });
    gsap.set(rows, { opacity: 0, y: 60 });

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
      duration: 0.9,
      ease: "power3.out",
    }).to(
      rows,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.5"
    );

    // 2. Mouse-Follower (Magnetic hover preview) for each accordion row
    rows.forEach((row, index) => {
      const previewCard = row.querySelector(".hover-preview-card") as HTMLDivElement;
      if (!previewCard) return;

      // Reset preview card positioning to absolute center
      gsap.set(previewCard, { xPercent: -50, yPercent: -50, scale: 0.7, opacity: 0 });

      const onMouseMove = (e: MouseEvent) => {
        const rect = row.getBoundingClientRect();
        // Calculate mouse coordinate relative to the current row
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;

        // Smoothly move the card to cursor position
        gsap.to(previewCard, {
          x: relX,
          y: relY,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const onMouseEnter = () => {
        setHoveredIdx(index);
        gsap.to(previewCard, {
          scale: 1,
          opacity: 1,
          rotation: index % 2 === 0 ? 3 : -3, // subtle random rotation tilt like Awwwards
          duration: 0.4,
          ease: "back.out(1.5)",
        });
      };

      const onMouseLeave = () => {
        setHoveredIdx(null);
        gsap.to(previewCard, {
          scale: 0.7,
          opacity: 0,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      row.addEventListener("mousemove", onMouseMove);
      row.addEventListener("mouseenter", onMouseEnter);
      row.addEventListener("mouseleave", onMouseLeave);

      // Save listeners for cleanup
      (row as any)._cleanupMouseMove = onMouseMove;
      (row as any)._cleanupMouseEnter = onMouseEnter;
      (row as any)._cleanupMouseLeave = onMouseLeave;
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      rows.forEach((row) => {
        if ((row as any)._cleanupMouseMove) {
          row.removeEventListener("mousemove", (row as any)._cleanupMouseMove);
          row.removeEventListener("mouseenter", (row as any)._cleanupMouseEnter);
          row.removeEventListener("mouseleave", (row as any)._cleanupMouseLeave);
        }
      });
    };
  }, []);

  const features: Feature[] = [
    {
      id: "speed",
      num: "01",
      title: "Lightning Fast",
      desc: "Deploy instantly and run operations with sub-second computation latency and real-time state updates.",
      visual: (
        <div className="flex flex-col justify-between h-full font-mono text-white text-[11px]">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span>PERFORMANCE METRIC</span>
            <span className="text-[#a3e635] font-bold">100/100</span>
          </div>
          <div className="my-4">
            <div className="text-[10px] text-slate-400">LATENCY SPEED</div>
            <div className="text-xl font-bold mt-1 text-[#2b7fff]">0.02s</div>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="w-full h-full bg-[#2b7fff] origin-left animate-[gradientShift_2s_infinite]" />
          </div>
        </div>
      ),
    },
    {
      id: "security",
      num: "02",
      title: "Secure & Compliant",
      desc: "Bank-grade data isolation, encrypted channels, and built-in audit trails that satisfy enterprise compliance.",
      visual: (
        <div className="flex flex-col justify-between h-full font-mono text-white text-[11px]">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span>COMPLIANCE STATUS</span>
            <span className="text-emerald-400 font-bold">PASSED</span>
          </div>
          <div className="flex items-center gap-3 my-4">
            <div className="w-8 h-8 rounded-full bg-[#2b7fff]/20 flex items-center justify-center text-[#2b7fff]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9" />
              </svg>
            </div>
            <div>
              <div className="text-white font-bold">AES-256 Enabled</div>
              <div className="text-[9px] text-slate-400">Audit Trail: Logged</div>
            </div>
          </div>
          <div className="text-[9px] text-slate-500 text-right">SECURE CHANNEL</div>
        </div>
      ),
    },
    {
      id: "analytics",
      num: "03",
      title: "Smart Analytics",
      desc: "Make decisions with accurate business performance metrics, data trends, and clear interactive dashboards.",
      visual: (
        <div className="flex flex-col justify-between h-full font-mono text-white text-[11px]">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span>LIVE LEDGER DATA</span>
            <span className="text-sky-400 font-bold">ACTIVE</span>
          </div>
          <div className="flex items-end justify-between gap-1 h-14 mt-3">
            <div className="w-1/5 bg-[#2b7fff]/40 h-8 rounded-sm" />
            <div className="w-1/5 bg-[#2b7fff]/60 h-10 rounded-sm" />
            <div className="w-1/5 bg-[#2b7fff]/80 h-6 rounded-sm" />
            <div className="w-1/5 bg-[#2b7fff] h-12 rounded-sm" />
            <div className="w-1/5 bg-emerald-400 h-14 rounded-sm animate-pulse" />
          </div>
          <div className="text-[9px] text-slate-400 mt-2">VOLUME PROJECTION</div>
        </div>
      ),
    },
    {
      id: "collab",
      num: "04",
      title: "Collaborative",
      desc: "Work seamlessly across resources, assign tasks directly, and streamline standard team pipelines.",
      visual: (
        <div className="flex flex-col justify-between h-full font-mono text-white text-[11px]">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span>TEAM PIPELINES</span>
            <span className="text-purple-400 font-bold">SYNCED</span>
          </div>
          <div className="my-3 flex -space-x-2 overflow-hidden">
            <div className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 bg-blue-600 flex items-center justify-center font-bold text-[8px]">JD</div>
            <div className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 bg-emerald-600 flex items-center justify-center font-bold text-[8px]">SK</div>
            <div className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 bg-purple-600 flex items-center justify-center font-bold text-[8px]">AM</div>
          </div>
          <div className="flex items-center justify-between text-[9px] text-slate-400">
            <span>Active Members</span>
            <span className="text-white">5 online</span>
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

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-24">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2b7fff] mb-4 font-display">
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

        {/* Accordion Rows */}
        <div className="border-t border-slate-200">
          {features.map((feature, index) => {
            const isHovered = hoveredIdx === index;
            return (
              <div
                key={feature.id}
                ref={(el) => {
                  rowsRef.current[index] = el;
                }}
                className="relative flex flex-col md:flex-row justify-between items-start md:items-center py-12 border-b border-slate-200 cursor-pointer group select-none transition-colors duration-500"
              >
                {/* Background overlay on hover */}
                <div 
                  className={`absolute inset-0 bg-slate-50/50 -z-10 transition-opacity duration-500 pointer-events-none ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`} 
                />

                {/* Left Side: Number and Title */}
                <div className="flex items-center gap-8 md:gap-14 relative z-10 pointer-events-none">
                  <span className="text-sm font-mono font-bold text-slate-400 group-hover:text-[#2b7fff] transition-colors duration-300">
                    {feature.num}
                  </span>
                  <h3 
                    className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-slate-900 group-hover:translate-x-4 transition-transform duration-500 ease-out"
                  >
                    {feature.title}
                  </h3>
                </div>

                {/* Right Side: Description */}
                <div className="mt-4 md:mt-0 md:max-w-md relative z-10 pointer-events-none">
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light group-hover:text-slate-900 transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-[#2b7fff]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>

                {/* Awwwards Mouse-Follower Hover Preview Card */}
                <div 
                  className="hover-preview-card absolute pointer-events-none w-56 h-40 rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-2xl z-50 overflow-hidden flex flex-col justify-between"
                  style={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  {/* Subtle inner card gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#2b7fff]/10 to-transparent opacity-40" />
                  <div className="relative z-10 h-full">
                    {feature.visual}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
