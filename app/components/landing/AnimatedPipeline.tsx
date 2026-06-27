"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LoanProduct {
  id: string;
  num: string;
  title: string;
  tag: string;
  children?: string[];
}

const PRODUCTS: LoanProduct[] = [
  { id: "lap", num: "01", title: "Loan Against Property (LAP)", tag: "Secured" },
  { id: "msme", num: "02", title: "MSME Loan", tag: "Business" },
  { id: "vehicle", num: "03", title: "Vehicle Loan", tag: "Asset-backed" },
  { id: "personal", num: "04", title: "Business & Personal Loan", tag: "Unsecured" },
 {id: "gold", num: "05", title: "Gold Loan", tag: "Secured"},
  {
    id: "icd",
    num: "05",
    title: "Inter Corporate Deposit (ICD)",
    tag: "Corporate",
    children: ["Co-Lending", "Direct Assignment (DA)"],
  },
];

export default function AnimatedPipeline() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-row",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".products", start: "top 80%", once: true },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={containerRef}
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-white text-slate-900 overflow-hidden border-t border-slate-100 font-sans"
    >
      {/* background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-50 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16 md:mb-24">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter font-display leading-[0.95] uppercase max-w-xl text-slate-900">
            <span className="text-secondaryColor">Tailored Services</span> <br />
            for Specialized <br />
            Loan Products
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light max-w-sm">
            Our platform adapts to your specific needs and can be customized to
            suit your lending operations end to end.
          </p>
        </div>

        {/* Editorial product list */}
        <div className="products border-t border-slate-200">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="product-row border-b border-slate-200 py-6 md:py-8"
            >
              {/* main row */}
              <div className="group/main relative flex items-center justify-between gap-6 cursor-pointer">
                <div className="flex items-baseline gap-5 md:gap-8 min-w-0">
                  <span className="font-mono text-xs sm:text-sm text-slate-400 shrink-0">
                    {p.num}
                  </span>
                  <h3
                    className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 transition-all duration-500 group-hover/main:text-secondaryColor group-hover/main:translate-x-2 md:group-hover/main:translate-x-4 truncate"
                    style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                  >
                    {p.title}
                  </h3>
                </div>

                <div className="hidden">
                  <span className="hidden sm:block text-[0.7rem] uppercase tracking-[0.18em] text-slate-400">
                    {p.tag}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 text-slate-300 transition-all duration-500 group-hover/main:text-secondaryColor group-hover/main:translate-x-1 group-hover/main:-translate-y-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>

              {/* children (sub-products) */}
              {p.children && (
                <div className="mt-5 ml-9 sm:ml-14 md:ml-[5.5rem] flex flex-col gap-3 border-l border-slate-200 pl-6">
                  {p.children.map((c, ci) => (
                    <div
                      key={c}
                      className="group/child flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-baseline gap-4 min-w-0">
                        <span className="font-mono text-[0.65rem] text-slate-300 shrink-0">
                          {p.num}.{ci + 1}
                        </span>
                        <h4
                          className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-slate-600 transition-all duration-400 group-hover/child:text-secondaryColor group-hover/child:translate-x-2 truncate"
                          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                        >
                          {c}
                        </h4>
                      </div>
                      <span className="hidden sm:block text-[0.6rem] uppercase tracking-[0.18em] text-slate-300">
                        Sub-product
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
