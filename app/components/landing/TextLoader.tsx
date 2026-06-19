"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const WORD = "FundFlick".split("");

export default function TextLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        setDone(true);
        return;
      }

      const letters = gsap.utils.toArray<HTMLElement>(".tl-text span");
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setDone(true);
        },
      });

      // 1 — letters rise into view
      tl.to(letters, {
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
      })
        // 2 — accent colour fills each letter bottom→top
        .to(
          letters,
          {
            "--clipPath": "inset(0% 0 0 0)",
            duration: 0.8,
            delay: 0.3,
            ease: "power1.inOut",
          },
        )
        // 3 — whole loader slides up, revealing the page
        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.9,
          delay: 0.4,
          ease: "power4.inOut",
        });
    },
    { scope: rootRef },
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-white"
    >
      <div
        className="tl-text flex overflow-hidden text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tight"
        style={{ fontFamily: "var(--font-outfit), sans-serif" }}
      >
        {WORD.map((ch, i) => (
          <span key={i} data-text={ch}>
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
}
