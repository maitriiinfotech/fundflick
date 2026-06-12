"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Project {
  title: string;
  type: string;
  img: string;
  link: string;
  bgColor: string;
  textColor: string;
  comingSoon?: boolean;
}

const DEFAULT_SERVICES: Project[] = [
  {
    title: "Loan Origination",
    type: "Automate loan application processing, credit check evaluation, and disbursals.",
    img: "/loan_origination.png",
    link: "/contactus",
    bgColor: "#fdba74", // Premium Peach/Orange
    textColor: "#131c33",
  },
  {
    title: "Task Management",
    type: "Streamline daily operations, assign tasks to resources, and monitor pipelines.",
    img: "/task_management.png",
    link: "/contactus",
    bgColor: "#a3e635", // Vibrant Lime Green
    textColor: "#131c33",
  },
  {
    title: "Collection System",
    type: "Automated payment tracking, auto-debits, and instant EMI reminders.",
    img: "/collection.png",
    link: "/contactus",
    bgColor: "#38bdf8", // Sky Blue
    textColor: "#131c33",
  },
  {
    title: "Smart Reports",
    type: "In-depth business performance metrics, data trends, and analysis dashboards.",
    img: "/reports.png",
    link: "/contactus",
    bgColor: "#c084fc", // Purple/Violet
    textColor: "#131c33",
  },
  {
    title: "Loan Management",
    type: "Comprehensive loan books, EMI schedules, accounts, and servicing tools.",
    img: "/lms_hrms.png",
    link: "/contactus",
    comingSoon: true,
    bgColor: "#fb7185", // Soft Rose/Pink
    textColor: "#131c33",
  },
  {
    title: "Bookkeeping & Accounts",
    type: "Accurate transaction logging, automated ledger entries, and audit compliance.",
    img: "/accounting.png",
    link: "/contactus",
    comingSoon: true,
    bgColor: "#fde047", // Amber Yellow
    textColor: "#131c33",
  },
];

interface SliderState {
  target: number;
  current: number;
  isDragging: boolean;
  startX: number;
  touchStart: number;
  maxScroll: number;
  cardWidth: number;
  gap: number;
  viewWidth: number;
}

export default function HoverGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  const state = useRef<SliderState>({
    target: 0,
    current: 0,
    isDragging: false,
    startX: 0,
    touchStart: 0,
    maxScroll: 0,
    cardWidth: 360,
    gap: 24,
    viewWidth: 0,
  });

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin on client-side
    gsap.registerPlugin(ScrollTrigger);

    const calculateDimensions = () => {
      const isMobile = window.innerWidth < 768;
      const s = state.current;

      s.cardWidth = isMobile ? window.innerWidth * 0.82 : 360;
      s.gap = isMobile ? 16 : 24;

      const containerWidth =
        containerRef.current?.getBoundingClientRect().width ||
        window.innerWidth;
      s.viewWidth = isMobile ? window.innerWidth : containerWidth;

      // Mathematically calculate the exact maxScroll limit:
      // total content width of all cards (including gaps between them, but no trailing gap)
      // Add generous padding so the LAST card can be fully scrolled into view
      const totalContentWidth =
        (DEFAULT_SERVICES.length - 1) * (s.cardWidth + s.gap) + s.cardWidth;
      // leftOffset (md:left-10 = 40px) + right breathing room so last card sits comfortably
      const padding = isMobile ? 60 : 200;

      s.maxScroll = Math.max(0, totalContentWidth - s.viewWidth + padding);
    };


    // --- INTRO STATE ---
    // Cards start hidden. IntersectionObserver (not ScrollTrigger) flips
    // the flag so it works reliably with Lenis smooth scroll.
    let introPlayed = false;
    state.current.target = 0;
    state.current.current = 0;

    // Hide cards initially
    cardsRef.current.forEach((card) => {
      if (card) gsap.set(card, { opacity: 0, x: 500 });
    });

    // Hide text initially
    const textEls = document.querySelectorAll(".gallery-text-content > *");
    textEls.forEach((el) => gsap.set(el, { opacity: 0, y: 35 }));

    const calculateAndUpdate = () => {
      const s = state.current;
      const lerpFactor = s.isDragging ? 0.35 : 0.08;
      s.current += (s.target - s.current) * lerpFactor;

      if (Math.abs(s.target - s.current) < 0.01) {
        s.current = s.target;
      }

      // Calculate progress index
      const scrollPercent =
        s.maxScroll > 0 ? Math.min(1, Math.max(0, s.current / s.maxScroll)) : 0;
      const centerCardIdx = Math.max(
        0,
        Math.min(
          DEFAULT_SERVICES.length - 1,
          Math.round(scrollPercent * (DEFAULT_SERVICES.length - 1)),
        ),
      );
      setActiveIdx(centerCardIdx);

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // If intro hasn't played yet, keep cards hidden
        if (!introPlayed) return;

        const itemX = index * (s.cardWidth + s.gap) - s.current;
        let displayX = itemX;
        let rotateZ = 0;
        let scale = 1;
        let zIndex = DEFAULT_SERVICES.length - index;
        let opacity = 1;

        if (itemX < 0) {
          displayX = itemX * 0.15;
          rotateZ = Math.max(itemX * 0.04, -8);
          scale = Math.max(1 + itemX * 0.0008, 0.88);
          opacity = Math.max(1 + itemX * 0.0025, 0);
        }

        gsap.set(card, {
          x: displayX,
          rotation: rotateZ,
          scale: scale,
          zIndex: zIndex,
          opacity: opacity,
          transformOrigin: "left center",
        });
      });
    };

    calculateDimensions();
    gsap.ticker.add(calculateAndUpdate);

    // Use IntersectionObserver instead of ScrollTrigger (works with Lenis)
    const sectionEl = document.querySelector(".gallery-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !introPlayed) {
            introPlayed = true;

            // Stagger-reveal each card from right
            cardsRef.current.forEach((card, i) => {
              if (!card) return;
              const targetX = i * (state.current.cardWidth + state.current.gap);
              gsap.fromTo(
                card,
                { x: 500 + i * 80, opacity: 0, scale: 0.9, rotation: 5 },
                {
                  x: targetX,
                  opacity: 1,
                  scale: 1,
                  rotation: 0,
                  duration: 0.9,
                  delay: i * 0.1,
                  ease: "power3.out",
                },
              );
            });

            // Fade-in text content
            textEls.forEach((el, i) => {
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.15,
                ease: "power2.out",
              });
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );

    if (sectionEl) observer.observe(sectionEl);

    const clampTarget = () => {
      state.current.target = Math.max(
        0,
        Math.min(state.current.target, state.current.maxScroll),
      );
    };

    const handleWheel = (e: WheelEvent) => {
      if (state.current.maxScroll <= 0) return;
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      // FIX: Check visual current position rather than raw target to prevent premature releasing of scroll lock
      const atStart = state.current.current <= 5 && delta < 0;
      const atEnd =
        state.current.current >= state.current.maxScroll - 5 && delta > 0;

      if (!atStart && !atEnd) {
        e.preventDefault();
        state.current.target += delta * 0.8;
        clampTarget();
      }
    };

    const handleStart = (clientX: number) => {
      state.current.isDragging = true;
      state.current.startX = clientX;
      state.current.touchStart = state.current.target;
      if (containerRef.current) {
        containerRef.current.style.cursor = "grabbing";
      }

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onTouchEnd);
    };

    const handleMove = (clientX: number) => {
      if (!state.current.isDragging) return;
      const diff = (state.current.startX - clientX) * 1.35;
      state.current.target = state.current.touchStart + diff;
      clampTarget();
    };

    const handleEnd = () => {
      state.current.isDragging = false;
      if (containerRef.current) {
        containerRef.current.style.cursor = "grab";
      }

      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };

    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) return;
      handleStart(e.clientX);
    };

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const onMouseUp = () => {
      handleEnd();
    };

    const onTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) return;
      handleStart(e.touches[0].clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      handleMove(e.touches[0].clientX);
    };

    const onTouchEnd = () => {
      handleEnd();
    };

    const resizeListener = () => {
      calculateDimensions();
      clampTarget();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("mousedown", onMouseDown);
      container.addEventListener("touchstart", onTouchStart, { passive: true });
    }

    window.addEventListener("resize", resizeListener);

    return () => {
      gsap.ticker.remove(calculateAndUpdate);
      observer.disconnect();
      window.removeEventListener("resize", resizeListener);
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("mousedown", onMouseDown);
        container.removeEventListener("touchstart", onTouchStart);
      }
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section className="gallery-section bg-white py-24 text-slate-800 font-sans overflow-hidden relative border-t border-slate-100">
      {/* Background design elements */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-secondaryColor/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
          {/* Left Column: Heading & Controls */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center gallery-text-content">
            <p className="text-secondaryColor font-bold uppercase tracking-widest text-xs mb-3 font-display">
              Core Capabilities
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-display">
              End-to-End <br />
              Lending Suite
            </h2>
            <p className="text-slate-500 mt-6 text-sm md:text-base leading-relaxed max-w-lg">
              Manage your entire loan operations lifecycle. From origination and
              underwriting to automated collections, servicing, and ledger
              accounting—tailored to save your time.
            </p>

            {/* Pagination & Micro-interactions */}
            <div className="mt-10 flex items-center gap-6">
              <div className="flex items-baseline gap-2 font-display text-slate-900">
                <span className="text-3xl font-extrabold">
                  {String(activeIdx + 1).padStart(2, "0")}
                </span>
                <span className="text-slate-300 text-sm">/</span>
                <span className="text-slate-400 text-sm font-semibold">
                  {String(DEFAULT_SERVICES.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex-1 max-w-[120px] h-[3px] bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondaryColor transition-all duration-300 ease-out"
                  style={{
                    width: `${((activeIdx + 1) / DEFAULT_SERVICES.length) * 100}%`,
                  }}
                />
              </div>

              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider animate-pulse hidden md:inline">
                Drag or scroll cards →
              </div>
            </div>
          </div>

          {/* Right Column: AuraStack Cards viewport */}
          <div
            ref={containerRef}
            data-lenis-prevent
            className="w-full lg:w-7/12 h-[520px] relative cursor-grab active:cursor-grabbing overflow-hidden"
          >
            <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-10 w-full h-[480px]">
              {DEFAULT_SERVICES.map((project, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="absolute top-0 left-0 w-[290px] h-[450px] md:w-[340px] md:h-[480px] border rounded-[24px] p-5 flex flex-col justify-between select-none shadow-xl will-change-transform transition-colors"
                  style={{
                    backgroundColor: project.bgColor,
                    color: project.textColor,
                    borderColor: "rgba(19, 28, 51, 0.08)",
                  }}
                >
                  {/* Card Top: Number & Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-mono font-semibold opacity-60"
                      style={{ color: project.textColor }}
                    >
                      0{index + 1}
                    </span>
                    {project.comingSoon ? (
                      <span
                        className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: "rgba(19, 28, 51, 0.05)",
                          color: project.textColor,
                          borderColor: "rgba(19, 28, 51, 0.1)",
                        }}
                      >
                        Coming Soon
                      </span>
                    ) : (
                      <span
                        className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: "rgba(19, 28, 51, 0.08)",
                          color: project.textColor,
                          borderColor: "rgba(19, 28, 51, 0.15)",
                        }}
                      >
                        Active Feature
                      </span>
                    )}
                  </div>

                  {/* Card Middle: Image (Premium presentation) */}
                  <div className="w-full h-[180px] my-4 bg-white/20 border border-black/5 rounded-xl overflow-hidden relative">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />
                  </div>

                  {/* Card Bottom: Content & Link */}
                  <div className="flex flex-col gap-2">
                    <h3
                      className="text-lg md:text-xl font-bold tracking-tight font-display"
                      style={{ color: project.textColor }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed font-medium opacity-80"
                      style={{ color: project.textColor }}
                    >
                      {project.type}
                    </p>

                    <a
                      href={project.link}
                      className="mt-3 text-xs font-semibold inline-flex items-center gap-1 group/btn hover:underline"
                      style={{ color: project.textColor }}
                    >
                      {project.comingSoon
                        ? "Request Early Access"
                        : "Learn More"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
