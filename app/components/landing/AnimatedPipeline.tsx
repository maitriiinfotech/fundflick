"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoanProduct {
  id: string;
  num: string;
  title: string;
  tag: string;
  image: string;
}

const PRODUCTS: LoanProduct[] = [
  { id: "morgage", num: "01", title: "Mortgage Loan", tag: "Secured", image: "/loan_origination.png" },
  { id: "msme", num: "02", title: "MSME Loan", tag: "Business", image: "/task_management.png" },
  { id: "home", num: "03", title: "Home Loan", tag: "Secured", image: "/lms_hrms.png" },
  { id: "vehicle", num: "04", title: "Vehicle Loan", tag: "Asset-backed", image: "/collection.png" },
  { id: "personal", num: "05", title: "Business & Personal Loan", tag: "Unsecured", image: "/reports.png" },
  { id: "icd", num: "06", title: "Inter Corporate Deposit (ICD)", tag: "Corporate", image: "/loan_origination.png" },
];

export default function AnimatedPipeline() {
  const containerRef = useRef<HTMLElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hoverable = window.matchMedia("(hover: hover)").matches;
    if (!hoverable) return;

    const thumb = thumbRef.current;
    const list = containerRef.current?.querySelector(".projects") as HTMLElement | null;
    if (!thumb || !list) return;

    const rows = gsap.utils.toArray<HTMLElement>(".project", list);
    const slides = gsap.utils.toArray<HTMLElement>(".thumb-slide", thumb);

    gsap.set(thumb, { scale: 0, xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(thumb, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(thumb, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const onLeave = () => {
      gsap.to(thumb, { scale: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    };

    list.addEventListener("mousemove", onMove);
    list.addEventListener("mouseleave", onLeave);

    const cleanups: Array<() => void> = [];
    rows.forEach((row, index) => {
      const onEnter = () => {
        gsap.to(thumb, { scale: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
        gsap.to(slides, {
          yPercent: -100 * index,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
      };
      row.addEventListener("mouseenter", onEnter);
      cleanups.push(() => row.removeEventListener("mouseenter", onEnter));
    });

    return () => {
      list.removeEventListener("mousemove", onMove);
      list.removeEventListener("mouseleave", onLeave);
      cleanups.forEach((fn) => fn());
    };
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
            suit your preferences. Hover a product to preview.
          </p>
        </div>

        {/* Editorial product list — hover reveals a cursor-tracked image */}
        <div className="projects border-t border-slate-200">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="project group relative flex items-center justify-between gap-6 border-b border-slate-200 py-6 md:py-8 cursor-pointer"
            >
              <div className="flex items-baseline gap-5 md:gap-8 min-w-0">
                <span className="font-mono text-xs sm:text-sm text-slate-400 shrink-0">
                  {p.num}
                </span>
                <h3
                  className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900 transition-all duration-500 group-hover:text-secondaryColor group-hover:translate-x-2 md:group-hover:translate-x-4 truncate"
                  style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                >
                  {p.title}
                </h3>
              </div>

              <div className="flex items-center gap-5 shrink-0">
                <span className="hidden sm:block text-[0.7rem] uppercase tracking-[0.18em] text-slate-400">
                  {p.tag}
                </span>
                {/* mobile inline preview (no cursor on touch) */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="lg:hidden h-12 w-16 object-cover rounded-md border border-slate-200"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="hidden lg:block w-6 h-6 text-slate-300 transition-all duration-500 group-hover:text-secondaryColor group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating cursor-tracked thumbnail (desktop / hover devices) */}
      <div
        ref={thumbRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:block w-[240px] h-[320px] overflow-hidden rounded-2xl shadow-2xl shadow-slate-900/20 border border-white/40 will-change-transform"
      >
        {PRODUCTS.map((p) => (
          <div key={p.id} className="thumb-slide w-full h-[320px]">
            <img src={p.image} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
