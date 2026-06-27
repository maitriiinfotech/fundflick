"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Fundflick cut our loan approval from days to minutes. Origination, verification and disbursal finally live in one place.",
    name: "Rajesh Verma",
    role: "CEO, Shree Krishna Associates",
    initials: "RV",
  },
  {
    quote:
      "Our recovery teams log every visit with PTP and proof. Broken commitments dropped the moment we switched to Fundflick.",
    name: "Anita Sharma",
    role: "Head of Collections, Maitriilons Finance",
    initials: "AS",
  },
  {
    quote:
      "Eight-step applications with OCR KYC and CIBIL checks built in. Our underwriting is faster and far more consistent.",
    name: "Kavita Rao",
    role: "Director, NBFC",
    initials: "KR",
  },
  {
    quote:
      "Reducing-balance schedules, auto penalties, rescheduling — the entire loan lifecycle is one clean ledger now.",
    name: "Arjun Patel",
    role: "Credit Head",
    initials: "AP",
  },
  {
    quote:
      "Double-entry books that reconcile themselves. Month-end went from a week of spreadsheets to a single afternoon.",
    name: "Suresh Nair",
    role: "Finance Controller",
    initials: "SN",
  },
  {
    quote:
      "Role-based dashboards mean each team sees only what matters — one source of truth across lending, collection and tasks.",
    name: "Meera Iyer",
    role: "CFO",
    initials: "MI",
  },
];

const DURATION = 6; // seconds per slide

export default function AboutTestimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const progTween = useRef<gsap.core.Tween | null>(null);

  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // glow drifts to follow the active person
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          yPercent: (active / (TESTIMONIALS.length - 1)) * 80 - 40,
          duration: 1.1,
          ease: "power2.out",
        });
      }

      // meta (avatar + name) fades up
      if (metaRef.current) {
        gsap.fromTo(
          metaRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 },
        );
      }

      // quote: masked word-by-word rise
      let split: SplitText | null = null;
      const quoteEl = quoteRef.current;
      if (quoteEl) {
        if (reduce) {
          gsap.set(quoteEl, { opacity: 1 });
        } else {
          split = SplitText.create(quoteEl, { type: "words", mask: "words" });
          gsap.set(split.words, { yPercent: 110 });
          gsap.to(split.words, {
            yPercent: 0,
            duration: 0.7,
            stagger: 0.022,
            ease: "power3.out",
          });
        }
      }

      // progress bar drives the auto-advance
      if (!reduce && progressRef.current) {
        gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });
        progTween.current = gsap.to(progressRef.current, {
          scaleX: 1,
          duration: DURATION,
          ease: "none",
          onComplete: () =>
            setActive((i) => (i + 1) % TESTIMONIALS.length),
        });
      }

      return () => {
        split?.revert();
        progTween.current?.kill();
      };
    },
    { scope: sectionRef, dependencies: [active] },
  );

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => progTween.current?.pause()}
      onMouseLeave={() => progTween.current?.resume()}
      className="relative w-full overflow-hidden bg-[#131c33] py-20 md:py-28 text-white"
    >
      {/* dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:26px_26px] pointer-events-none" />
      {/* drifting glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-1/2 right-[8%] h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-secondaryColor/15 blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <p className="reveal text-xs font-bold uppercase tracking-[0.18em] text-secondaryColor mb-3">
          Testimonials
        </p>
        <h2
          className="reveal text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-12 md:mb-16"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          Trusted by lenders who move fast
        </h2>

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
          {/* Left — featured quote */}
          <div>
            <svg
              className="mb-6 h-12 w-12 text-secondaryColor/30"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M9.5 7C6.46 7 4 9.46 4 12.5V19h6.5v-6.5H7.5C7.5 11.12 8.62 10 10 10V7h-.5Zm10 0C16.46 7 14 9.46 14 12.5V19h6.5v-6.5h-3C17.5 11.12 18.62 10 20 10V7h-.5Z" />
            </svg>

            <blockquote
              key={active}
              ref={quoteRef}
              className="text-2xl sm:text-3xl md:text-[34px] font-semibold leading-snug tracking-tight text-white"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              {t.quote}
            </blockquote>

            <div ref={metaRef} className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondaryColor/20 text-sm font-bold text-white ring-1 ring-secondaryColor/30">
                {t.initials}
              </div>
              <div>
                <div className="text-base font-bold text-white">{t.name}</div>
                <div className="text-sm text-slate-400">{t.role}</div>
              </div>
            </div>

            {/* progress */}
            <div className="mt-8 h-[3px] w-full max-w-xs overflow-hidden rounded-full bg-white/10">
              <div
                ref={progressRef}
                className="h-full w-full origin-left rounded-full bg-secondaryColor"
              />
            </div>
          </div>

          {/* Right — client rail */}
          <div className="flex flex-col gap-1.5">
            {TESTIMONIALS.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={item.name}
                  onClick={() => setActive(i)}
                  className={`group flex items-center gap-3 rounded-xl border-l-2 px-3 py-2.5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-secondaryColor bg-white/[0.06]"
                      : "border-transparent opacity-55 hover:opacity-100 hover:bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-secondaryColor/20 text-white ring-1 ring-secondaryColor/40"
                        : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {item.initials}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block truncate text-sm font-semibold ${
                        isActive ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="block truncate text-xs text-slate-500">
                      {item.role}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
