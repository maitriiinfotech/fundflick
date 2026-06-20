"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Stage "stickers" placed along the journey (like the city labels in the ref)
const STAGES = [
  { label: "APPLY", top: "20%", left: "8%", rot: -8 },
  { label: "VERIFY", top: "46%", left: "70%", rot: 6 },
  { label: "DISBURSE", top: "74%", left: "16%", rot: -5 },
];

// Scattered sticker photos
const PHOTOS = [
  { src: "/loan_origination.png", top: "26%", left: "62%", rot: 7, w: "w-44" },
  { src: "/reports.png", top: "58%", left: "10%", rot: -6, w: "w-40" },
  { src: "/hrms_ai_phone.png", top: "80%", left: "64%", rot: 9, w: "w-44" },
];

export default function PlaneJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      // Reveal headings + stickers as they enter
      gsap.utils.toArray<HTMLElement>(".pj-rise").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      if (reduce || !planeRef.current) return;

      // Plane flies along the dashed flight path, tied to scroll
      gsap.to(planeRef.current, {
        motionPath: {
          path: "#pj-path",
          align: "#pj-path",
          alignOrigin: [0.5, 0.5],
          autoRotate: 90,
        },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[220vh] overflow-hidden bg-white"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      {/* dashed flight path (fills the whole section) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 2000"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          id="pj-path"
          d="M -80 220 C 360 80, 560 520, 860 470 S 1180 760, 700 1020 S 180 1320, 760 1500 S 1320 1680, 1560 1900"
          stroke="#b91c1c"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="2 26"
          opacity="0.85"
        />
      </svg>

      {/* the plane */}
      <div ref={planeRef} className="absolute top-0 left-0 z-20 w-24 sm:w-28">
        <img
          src="/plan/plane.webp"
          alt="Plane"
          className="w-full h-auto drop-shadow-xl select-none pointer-events-none"
          style={{ transform: "scaleX(-1)" }}
        />
      </div>

      {/* ===== Intro copy (top) ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-32">
        <span className="pj-rise inline-block rounded-full bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#b91c1c] shadow-md -rotate-3">
          Operations without limits
        </span>
        <h2
          className="pj-rise mt-7 text-5xl sm:text-7xl md:text-8xl font-black uppercase leading-[0.9] tracking-tight"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px #ffffff",
          }}
        >
          We take your <br />
          lending further
        </h2>
        <p className="pj-rise mt-7 max-w-md text-base sm:text-lg font-semibold leading-relaxed text-[#1f1300]">
          From application to disbursal, Fundflick carries your entire operation
          — wherever your business flies.
        </p>
      </div>

      {/* ===== Stage stickers ===== */}
      {STAGES.map((s) => (
        <div
          key={s.label}
          className="pj-rise absolute z-10"
          style={{ top: s.top, left: s.left, transform: `rotate(${s.rot}deg)` }}
        >
          <span
            className="text-3xl sm:text-5xl font-black uppercase italic text-[#e11d48]"
            style={{
              textShadow:
                "2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff",
            }}
          >
            {s.label}&rdquo;
          </span>
        </div>
      ))}

      {/* ===== Scattered sticker photos ===== */}
      {PHOTOS.map((p, i) => (
        <div
          key={i}
          className={`pj-rise absolute z-10 ${p.w} hidden sm:block`}
          style={{ top: p.top, left: p.left, transform: `rotate(${p.rot}deg)` }}
        >
          <div className="rounded-2xl border-4 border-white bg-white shadow-2xl overflow-hidden">
            <img
              src={p.src}
              alt=""
              className="w-full h-44 object-cover select-none pointer-events-none"
            />
          </div>
        </div>
      ))}

      {/* ===== Outro (bottom) ===== */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 text-center px-6">
        <h3 className="pj-rise text-4xl sm:text-6xl font-black uppercase leading-none text-[#1f1300]">
          Anywhere. Anytime.
        </h3>
        <p className="pj-rise mt-4 text-sm font-bold uppercase tracking-widest text-[#b91c1c]">
          One platform, full operations ↓
        </p>
      </div>
    </section>
  );
}
