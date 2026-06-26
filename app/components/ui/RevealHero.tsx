"use client";

import { ReactNode, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(CustomEase, SplitText);

export interface RevealHeroLink {
  label: string;
  href: string;
}

interface RevealHeroProps {
  /** Exactly 5 image URLs — index 2 (the middle one) becomes the fullscreen hero. */
  images: string[];
  heading: ReactNode;
  /** Small label above the links (e.g. "Get started"). */
  socialLabel?: string;
  links?: RevealHeroLink[];
  /** Preloader / backdrop color. */
  overlayColor?: string;
}

const ROTATIONS = [-15, 5, -7.5, 10, -2.5];

export default function RevealHero({
  images,
  heading,
  socialLabel = "Get started",
  links = [],
  overlayColor = "#0f0f0f",
}: RevealHeroProps) {
  const scopeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Custom eases from the source design
    CustomEase.create("hop", "0.9, 0, 0.1, 1");
    CustomEase.create("glide", "0.8, 0, 0.2, 1");

    let split: SplitText | null = null;

    const ctx = gsap.context(() => {
      const introImages = gsap.utils.toArray<HTMLElement>(".intro-img");

      // mask:"lines" wraps each line in an overflow-hidden div (no manual DOM)
      split = SplitText.create(
        ".hero-header h1, .hero-social p, .hero-social a",
        { type: "lines", mask: "lines", linesClass: "line" },
      );
      gsap.set(".line", { yPercent: 125 });

      // --- layout math: a centered row of 5 scaled thumbnails ---
      const introImgScale = 0.2;
      const introImgGap = 40;
      const scaledW = window.innerWidth * introImgScale;
      const rowW = scaledW * 5 + introImgGap * 4;
      const centeredStartX = (window.innerWidth - rowW) / 2;
      const offScreenStartX = centeredStartX - window.innerWidth * 1.3;

      introImages.forEach((img, i) => {
        const centeredX =
          centeredStartX +
          i * (scaledW + introImgGap) +
          scaledW / 2 -
          window.innerWidth / 2;
        const offScreenX =
          offScreenStartX +
          i * (scaledW + introImgGap) +
          scaledW / 2 -
          window.innerWidth / 2;

        img.dataset.centeredX = String(centeredX);

        gsap.set(img, {
          scale: introImgScale,
          x: offScreenX,
          rotation: ROTATIONS[i] ?? 0,
          borderRadius: "2.5rem",
        });
      });

      // ---------- reduced motion: jump straight to the final frame ----------
      if (reduce) {
        gsap.set([introImages[0], introImages[1], introImages[3], introImages[4]], {
          autoAlpha: 0,
        });
        gsap.set(".hero-img", {
          scale: 1,
          x: 0,
          rotation: 0,
          borderRadius: 0,
        });
        gsap.set(".line", { yPercent: 0 });
        gsap.set(".reveal-loader", { autoAlpha: 0 });
        return;
      }

      // body scroll lock while the loader is up (restored when it lifts)
      document.body.style.overflow = "hidden";

      // ---------- cinematic reveal timeline ----------
      const tl = gsap.timeline({ delay: 0.4 });

      // 1 — "FundFlick" letters rise into view
      tl.to(".rl-letter", {
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
      });
      // 2 — navy accent fills each letter bottom→top
      tl.to(
        ".rl-letter",
        { "--clipPath": "inset(0% 0 0 0)", duration: 0.8, ease: "power1.inOut" },
        "+=0.2",
      );

      // 3 — thumbnails gather into a centered row behind the loader
      tl.to(
        introImages,
        {
          x: (_i, el) => parseFloat((el as HTMLElement).dataset.centeredX || "0"),
          duration: 1.5,
          ease: "glide",
          stagger: 0.025,
        },
        "+=0.1",
      );
      // 4 — loader slides up, revealing the row
      tl.to(
        ".reveal-loader",
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: () => {
            document.body.style.overflow = "";
          },
        },
        "<0.3",
      );

      // 5 — outer pairs fly off, the middle image expands to fullscreen
      tl.to(
        [introImages[0], introImages[1]],
        { x: "-100vw", duration: 1.5, ease: "glide" },
        "spread",
      );
      tl.to(
        [introImages[3], introImages[4]],
        { x: "100vw", duration: 1.5, ease: "glide" },
        "spread",
      );
      tl.to(
        ".hero-img",
        {
          scale: 1,
          x: 0,
          rotation: 0,
          borderRadius: 0,
          duration: 1.5,
          ease: "glide",
        },
        "<",
      );

      // 4 — masked text lines rise into place
      tl.to(
        ".hero-header .line",
        { yPercent: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
        "spread+=1",
      );
      tl.to(
        ".hero-social .line",
        { yPercent: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
        "spread+=1.25",
      );
    }, scopeRef);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={scopeRef}
      className="relative w-full h-[100svh] overflow-hidden"
      style={{ backgroundColor: overlayColor }}
    >
      {/* "FundFlick" loader (covers everything incl. navbar during load) */}
      <div className="reveal-loader fixed inset-0 z-[99999] flex items-center justify-center bg-white">
        <div
          className="tl-text flex overflow-hidden px-4 leading-none text-[2.6rem] sm:text-7xl md:text-9xl font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          {"FundFlick".split("").map((ch, i) => (
            <span key={i} className="rl-letter" data-text={ch}>
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* Intro images — index 2 is the hero */}
      {images.slice(0, 5).map((src, i) => (
        <div
          key={i}
          className={`intro-img absolute inset-0 w-full h-full overflow-hidden ${
            i === 2 ? "hero-img" : ""
          }`}
          style={{
            transformOrigin: "center center",
            backfaceVisibility: "hidden",
            contain: "layout style",
          }}
        >
          <img
            src={src}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover select-none"
          />
        </div>
      ))}

      {/* Legibility scrim */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-black/15 to-black/20 pointer-events-none" />

      {/* Hero content */}
      <div className="hero-content absolute inset-0 z-[2] h-[100svh] flex flex-col justify-between px-8 pt-[10svh] pb-[16svh] sm:pt-[12svh] lg:pt-[15svh]">
        <div className="hero-header w-full lg:w-3/5">
          <h1
            className="text-[2rem] sm:text-4xl md:text-5xl font-normal leading-[1.1] tracking-tight text-white"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            {heading}
          </h1>
        </div>

        {(socialLabel || links.length > 0) && (
          <div className="hero-social space-y-1.5">
            {socialLabel && (
              <p className="text-white/60 text-xs uppercase tracking-[0.2em] font-semibold">
                {socialLabel}
              </p>
            )}
            {links.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className="block w-fit text-white text-lg sm:text-xl font-medium hover:text-white/70 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
