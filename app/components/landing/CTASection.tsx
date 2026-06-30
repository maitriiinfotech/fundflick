"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const grid = gridRef.current;
    if (!grid) return;

    // Staggered entrance animation for Bento Grid items
    const cards = grid.querySelectorAll(".bento-card");
    
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 40,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === grid) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 bg-white flex flex-col items-center justify-center overflow-hidden border-t border-slate-100"
      style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}
    >
      {/* Background soft, light-themed ambient glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-r from-blue-100 to-indigo-50 rounded-full blur-[80px] pointer-events-none opacity-80" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-100 to-blue-50 rounded-full blur-[80px] pointer-events-none opacity-60" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-50 pointer-events-none" />

      {/* Bento Grid Layout Wrapper */}
      <div ref={gridRef} className="max-w-5xl w-full px-6 flex flex-col gap-5 relative z-10">
        
        {/* Top Section: Split Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          
          {/* Left Side: Logo & Workspace Image (Grid 6/12 cols) */}
          <div className="md:col-span-6 flex flex-col gap-5">
            {/* Logo Card */}
            <div className="bento-card bg-white border border-slate-200/80 rounded-[24px] p-6 flex items-center gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-slate-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)] group">
              <img
                src="/logo.png"
                alt="Fundflick Logo"
                className="h-8 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <span
                className="text-xl font-extrabold text-slate-900 tracking-tight"
                style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              >
                Fundflick
              </span>
            </div>

            {/* Workplace / Interface Mockup Image Card */}
            <div className="bento-card flex-grow bg-white border border-slate-200/80 rounded-[24px] overflow-hidden relative group min-h-[300px] md:min-h-[340px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-slate-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
              <img
                src="/bank_loan_handshake.png"
                alt="Transforming lending"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              {/* Subtle dark overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Side: Copywriting Call-to-Action Card (Grid 6/12 cols) */}
          <div className="bento-card md:col-span-6 bg-white border border-slate-200/80 rounded-[24px] px-8 py-16 md:px-12 md:py-20 flex flex-col justify-center items-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-slate-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)] group relative overflow-hidden">
            
            {/* Inner background aura glow */}
            <div className="absolute -right-20 -top-20 w-44 h-44 bg-blue-100/50 rounded-full blur-[60px] pointer-events-none group-hover:bg-blue-200/50 transition-all duration-500" />
            <div className="absolute -left-20 -bottom-20 w-44 h-44 bg-purple-100/50 rounded-full blur-[60px] pointer-events-none group-hover:bg-purple-200/50 transition-all duration-500" />

            <h3
              className="text-2xl sm:text-3xl md:text-[36px] font-extrabold text-slate-900 mb-6 leading-tight relative z-10"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              Ready to Transform Your <br />
              <span className="text-secondaryColor">Lending Operations?</span>
            </h3>

            <p className="text-slate-500 text-sm md:text-[15px] leading-relaxed mb-10 max-w-md relative z-10 font-normal">
              Join thousands of financial institutions already using Fundflick to streamline their loan processes, reduce operational costs, and improve customer satisfaction.
            </p>

            <Button href="/contactus" variant="primary" className="relative z-10 px-8 py-3.5 text-sm">
              Start Your Free Trial
            </Button>
          </div>

        </div>

        {/* Bottom Section: Socials Grid Row */}
        <div className="grid grid-cols-3 gap-5">
          {/* Facebook: Transitions to Facebook Brand Blue on Hover */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card bg-white border border-slate-200/80 rounded-[24px] py-4 md:py-5 flex justify-center items-center text-slate-400 shadow-[0_8px_30px_rgba(0,0,0,0.01)] transition-all duration-300 hover:bg-[#1877f2]/10 hover:border-[#1877f2]/30 hover:text-[#1877f2] hover:shadow-[0_12px_24px_rgba(24,119,242,0.08)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
            </svg>
          </a>

          {/* Instagram: Transitions to Instagram Brand Pink/Rose on Hover */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card bg-white border border-slate-200/80 rounded-[24px] py-4 md:py-5 flex justify-center items-center text-slate-400 shadow-[0_8px_30px_rgba(0,0,0,0.01)] transition-all duration-300 hover:bg-[#e1306c]/10 hover:border-[#e1306c]/30 hover:text-[#e1306c] hover:shadow-[0_12px_24px_rgba(225,48,108,0.08)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* Twitter / X.com: Transitions to X Brand Black/Dark Slate on Hover */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card bg-white border border-slate-200/80 rounded-[24px] py-4 md:py-5 flex justify-center items-center text-slate-400 shadow-[0_8px_30px_rgba(0,0,0,0.01)] transition-all duration-300 hover:bg-[#0f1419]/10 hover:border-[#0f1419]/30 hover:text-[#0f1419] hover:shadow-[0_12px_24px_rgba(15,20,25,0.08)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-4 h-4"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
