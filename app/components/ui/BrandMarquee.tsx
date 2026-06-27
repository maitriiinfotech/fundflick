"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface BrandMarqueeProps {
  /** Names / brands to scroll */
  items?: string[];
  /** Seconds for one full loop (lower = faster) */
  speed?: number;
  /** Extra classes on the <section> */
  className?: string;
}

const DEFAULT_ITEMS = ["Maitriilons", "Shree Krishna Associates"];

/**
 * Awwwards-style brand marquee. Seamless infinite GSAP scroll; the direction
 * flips with the user's scroll wheel and the arrows rotate to match — the
 * gsap-ui "marque-scroll" technique, ported to React + the project theme.
 * GPU-only, respects prefers-reduced-motion, auto-cleans via useGSAP.
 */
export default function BrandMarquee({
  items = DEFAULT_ITEMS,
  speed = 18,
  className = "",
}: BrandMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // One "half" wide enough to fill the viewport; rendered twice for a seamless -50% loop.
  const half = [...items, ...items, ...items, ...items];
  const sequence = [...half, ...half];

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const loop = gsap.to(track, {
        xPercent: -50,
        duration: speed,
        ease: "none",
        repeat: -1,
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        loop.pause();
        return;
      }

      const arrows = track.querySelectorAll<SVGElement>(".bm-arrow");
      let dir = 1;

      const onWheel = (e: WheelEvent) => {
        const nd = e.deltaY > 0 ? 1 : -1;
        if (nd === dir) return;
        dir = nd;
        gsap.to(loop, { timeScale: dir, duration: 0.4, ease: "power2.out" });
        gsap.to(arrows, {
          rotate: dir === 1 ? 0 : 180,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("wheel", onWheel, { passive: true });
      return () => window.removeEventListener("wheel", onWheel);
    },
    { scope: trackRef },
  );

  return (
    <section
      className={`w-full overflow-hidden bg-[#131c33] py-6 sm:py-9 ${className}`}
    >
      <div
        ref={trackRef}
        className="flex w-max flex-nowrap will-change-transform"
        style={{ willChange: "transform" }}
      >
        {sequence.map((name, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10"
          >
            <span
              className="whitespace-nowrap text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              {name}
            </span>
            <svg
              className="bm-arrow h-7 w-7 shrink-0 text-secondaryColor sm:h-9 sm:w-9"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
}
