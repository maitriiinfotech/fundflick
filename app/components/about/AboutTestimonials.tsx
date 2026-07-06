"use client";

import { useEffect, useState } from "react";

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

const DURATION = 5000; // ms per slide

export default function AboutTestimonials() {
  const [active, setActive] = useState(0);
  const count = TESTIMONIALS.length;

  // Independent interval — always fires, reliable on mobile.
  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, DURATION);
    return () => clearInterval(id);
  }, [count]);

  const go = (i: number) => setActive(((i % count) + count) % count);
  const t = TESTIMONIALS[active];

  return (
    <section className="relative w-full overflow-hidden bg-[#131c33] py-16 md:py-24 text-white">
      {/* dot grid + glow */}
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

        {/* Quote card */}
        <div className="relative min-h-[240px] sm:min-h-[220px]">
          <svg
            className="mx-auto mb-6 h-10 w-10 text-secondaryColor/40"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M9.5 7C6.46 7 4 9.46 4 12.5V19h6.5v-6.5H7.5C7.5 11.12 8.62 10 10 10V7h-.5Zm10 0C16.46 7 14 9.46 14 12.5V19h6.5v-6.5h-3C17.5 11.12 18.62 10 20 10V7h-.5Z" />
          </svg>

          <div key={active} className="tm-slide">
            <blockquote
              className="text-xl sm:text-2xl md:text-[28px] font-semibold leading-snug tracking-tight text-white"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              {t.quote}
            </blockquote>

            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondaryColor/20 text-sm font-bold text-white ring-1 ring-secondaryColor/30">
                {t.initials}
              </div>
              <div className="text-left">
                <div className="text-base font-bold text-white">{t.name}</div>
                <div className="text-sm text-slate-400">{t.role}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-10 flex items-center justify-center gap-2.5">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.name}
              onClick={() => go(i)}
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

      <style jsx>{`
        .tm-slide {
          animation: tmIn 0.5s ease-out both;
        }
        @keyframes tmIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .tm-slide {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
