"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
    name: "Basant Goyal",
    role: "MD, Mentor Finmart Private Limited",
    initials: "BG",
  },
  {
    quote:
      "Our recovery teams log every visit with PTP and proof. Broken commitments dropped the moment we switched to Fundflick.",
    name: "Arjun Singh",
    role: "CEO, Shree Krishna Associate Private Limited",
    initials: "AS",
  },
  {
    quote:
      "Eight-step applications with OCR KYC and CIBIL checks built in. Our underwriting is faster and far more consistent.",
    name: "Girrish Gupta",
    role: "Director, GreenFin Private Limited",
    initials: "GG",
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
    name: "Radhika Meenakar",
    role: "Company Secretary",
    initials: "RM",
  },
];

const DELAY = 5000;
const COUNT = TESTIMONIALS.length;

export default function AboutTestimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [gen, setGen] = useState(0);          // bumped on every manual interaction
  const touchX = useRef<number | null>(null);

  const goTo = useCallback((i: number) => {
    setActive(((i % COUNT) + COUNT) % COUNT);
    setGen((g) => g + 1);                     // reset auto-advance timer
  }, []);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  // Auto-advance — restarts whenever `gen` changes (manual click) or pause toggles.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % COUNT);
    }, DELAY);
    return () => clearInterval(id);
  }, [paused, gen]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (dx > 40) prev();
      else if (dx < -40) next();
    }
    touchX.current = null;
    setPaused(false);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#131c33] py-16 md:py-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="pointer-events-none absolute -top-20 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-secondaryColor/15 blur-[90px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondaryColor mb-3">
          Testimonials
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-10 md:mb-14"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          Trusted by lenders who move fast
        </h2>

        {/* Viewport */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="overflow-hidden">
            {/* Track — translateX by active index */}
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="w-full shrink-0 px-1">
                  <svg
                    className="mx-auto mb-6 h-10 w-10 text-secondaryColor/40"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M9.5 7C6.46 7 4 9.46 4 12.5V19h6.5v-6.5H7.5C7.5 11.12 8.62 10 10 10V7h-.5Zm10 0C16.46 7 14 9.46 14 12.5V19h6.5v-6.5h-3C17.5 11.12 18.62 10 20 10V7h-.5Z" />
                  </svg>
                  <blockquote
                    className="mx-auto max-w-2xl text-xl sm:text-2xl md:text-[28px] font-semibold leading-snug tracking-tight text-white"
                    style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                  >
                    {t.quote}
                  </blockquote>
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondaryColor/20 text-sm font-bold text-white ring-1 ring-secondaryColor/30">
                      {t.initials}
                    </div>
                    <div className="text-left">
                      <div className="text-base font-bold text-white">
                        {t.name}
                      </div>
                      <div className="text-sm text-slate-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 sm:-left-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 sm:-right-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="mt-10 flex items-center justify-center gap-2.5">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-7 bg-secondaryColor"
                  : "w-2 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
