"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const heroFeatures = [
  {
    url: "/accounting.png",
    label: "Accounting",
    desc: "Invoices, taxation & digital ledgers",
  },
  {
    url: "/lms_hrms.png",
    label: "LMS & HRMS",
    desc: "Employee training & profiles",
  },
  {
    url: "/collection.png",
    label: "EMI Collection",
    desc: "Automated recovery & secure links",
  },
  {
    url: "/reports.png",
    label: "Reports & Analytics",
    desc: "Performance tracking charts",
  },
  {
    url: "/task_management.png",
    label: "Task Workflows",
    desc: "Kanban boards & task checklists",
  },
];

export default function VantaHero() {
  const containerRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const counterWrapRef = useRef<HTMLDivElement>(null);
  const counterNumberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();
    document.body.style.overflow = "hidden";
    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "auto";
          window.removeEventListener("wheel", preventDefault);
          window.removeEventListener("touchmove", preventDefault);
        },
      });

      gsap.set(".img-card", { scale: 0, opacity: 0 });
      gsap.set(".hero-text", { y: 50, opacity: 0 });
      gsap.set(".divider-h", { scaleX: 0 });
      gsap.set(".divider-v", { scaleY: 0 });

      const counterVal = { value: 1 };
      tl.to(counterVal, {
        value: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterNumberRef.current) {
            counterNumberRef.current.innerText = Math.floor(counterVal.value)
              .toString()
              .padStart(3, "0");
          }
        },
      });

      tl.to(counterWrapRef.current, {
        x: "110vw",
        duration: 1.2,
        ease: "power4.inOut",
      })
        .to(
          curtainRef.current,
          { yPercent: -100, duration: 1.2, ease: "power4.inOut" },
          "-=1",
        )
        .to(
          ".img-card",
          {
            scale: 1,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(1.5)",
          },
          "-=0.2",
        )
        .add(() => {
          const state = Flip.getState(".img-card");
          document
            .querySelector(".images-container")
            ?.classList.add("animated-grid");
          Flip.from(state, {
            duration: 1.4,
            stagger: 0.05,
            ease: "power4.inOut",
          });
        })
        .to(".divider-v", { scaleY: 1, duration: 1, stagger: 0.2 }, "-=0.5")
        .to(".divider-h", { scaleX: 1, duration: 1, stagger: 0.2 }, "-=1")
        .to(
          ".hero-text",
          { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power4.out" },
          "-=0.8",
        );
    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative w-full h-screen  bg-white overflow-hidden font-sans text-slate-800"
    >
      {/* Curtain */}
      <div
        ref={curtainRef}
        className="fixed inset-0 bg-white z-[99999] pointer-events-none overflow-hidden"
      >
        {/* Centered Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Fundflick Logo"
            className="h-16 md:h-24 object-contain"
          />
        </div>

        <div
          ref={counterWrapRef}
          className="absolute bottom-6 right-6 md:bottom-15 md:right-10 flex h-16 md:h-24 overflow-hidden text-6xl md:text-9xl font-bold italic leading-none text-slate-900"
        >
          <div ref={counterNumberRef}>001</div>
        </div>
      </div>

      {/* Premium background grid & gradients */}
      <div className="absolute inset-0 bg-white z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/20 via-white to-indigo-50/20" />
      </div>

      {/* Nav is now in layout.tsx */}

      {/* Hero Header */}
      <header className="absolute top-1/4 md:top-1/3 left-6 md:left-12 z-10 w-full pr-12 pointer-events-none">
        <h1 className="hero-text text-6xl sm:text-7xl md:text-9xl lg:text-[10vw] font-extrabold leading-[0.85] tracking-tighter uppercase text-slate-900 drop-shadow-sm">
          Fundflick
        </h1>
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row gap-8 md:gap-24">
          <div className="max-w-[280px] md:max-w-xs">
            <div className="divider-h h-[1px] bg-slate-200 origin-left mb-4" />
            <p className="hero-text text-[9px] md:text-xs uppercase tracking-widest text-blue-600 font-bold">
              Platform Features
            </p>
            <p className="hero-text mt-3 text-sm md:text-base leading-relaxed text-slate-600 font-normal">
              Simplify operations, manage tasks, track payments, and streamline
              accounting in one platform.
            </p>
          </div>
        </div>
      </header>

      {/* Images */}
      <div className="images-container absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        {heroFeatures.map((feature, i) => (
          <div
            key={i}
            className="img-card absolute w-32 h-44 sm:w-48 sm:h-64 md:w-64 md:h-80 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl border border-slate-200 bg-white p-2.5 group pointer-events-auto cursor-pointer transition-shadow duration-300"
          >
            <div className="relative w-full h-full flex flex-col justify-between">
              <div className="w-full h-[73%] overflow-hidden rounded-xl bg-slate-900 border border-slate-100 shadow-inner">
                <img
                  src={feature.url}
                  alt={feature.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="pt-2.5 pb-0.5 px-1 flex flex-col flex-grow justify-center">
                <span className="text-xs sm:text-sm font-extrabold tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.label}
                </span>
                <span className="text-[8px] sm:text-[10px] leading-snug text-slate-500 font-medium mt-0.5 hidden sm:block truncate">
                  {feature.desc}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-8 left-6 md:left-12 z-20 pointer-events-none">
        <div className="hero-text text-[9px] md:text-xs uppercase tracking-widest text-slate-400 mb-1 md:mb-2">
          Scroll to explore
        </div>
        <div className="hero-text text-sm md:text-lg font-semibold text-slate-800">
          All-in-One Operations Suite
        </div>
      </footer>
    </main>
  );
}
