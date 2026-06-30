"use client";

import { ReactNode, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useLenis } from "../../providers/SmoothScrollProvider";

gsap.registerPlugin(CustomEase, SplitText);

export interface RevealHeroLink {
  label: string;
  href: string;
}

interface RevealHeroProps {
  /** 5 image URLs (shared set). Defaults to the shared /reveal images. */
  images?: string[];
  /** Which image (0-based) expands to the fullscreen hero. The rest fly off. */
  heroIndex?: number;
  heading: ReactNode;
  /** Small label above the links (e.g. "Get started"). */
  socialLabel?: string;
  links?: RevealHeroLink[];
  /** Preloader / backdrop color. */
  overlayColor?: string;
  /** Big word shown in the page preloader (e.g. "HRMS"). Defaults to "FundFlick". */
  loaderLabel?: string;
}

const ROTATIONS = [-15, 5, -7.5, 10, -2.5];

// One shared image set across pages — each page just picks a different heroIndex.
const SHARED_IMAGES = [
  "/reveal/1.jpg",
  "/reveal/2.jpg",
  "/reveal/3.jpg",
  "/reveal/4.jpg",
  "/reveal/5.jpg",
];

export default function RevealHero({
  images = SHARED_IMAGES,
  heroIndex = 2,
  heading,
  socialLabel = "Get started",
  links = [],
  overlayColor = "#0f0f0f",
  loaderLabel = "FundFlick",
}: RevealHeroProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  // Lenis is created by the provider AFTER child effects run, so keep a live
  // ref and a lock flag to drive it whenever it actually becomes available.
  const lenisRef = useRef<ReturnType<typeof useLenis>>(null);
  const lockedRef = useRef(false);

  // Keep the ref fresh and, if Lenis mounts while the loader is still up,
  // stop it immediately so it can't scroll behind the overlay.
  useEffect(() => {
    lenisRef.current = lenis;
    if (lenis && lockedRef.current) {
      lenis.stop();
      lenis.scrollTo(0, { immediate: true, force: true });
    }
  }, [lenis]);

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

    // scroll lock (html + body) held for the whole reveal, restored on
    // unlock or unmount so a mid-animation route change can't leave it stuck.
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const prevHtmlOverflow = htmlEl.style.overflow;
    const prevBodyOverflow = bodyEl.style.overflow;
    const prevScrollRestoration = window.history.scrollRestoration;
    let locked = false;
    const lockScroll = () => {
      locked = true;
      lockedRef.current = true;
      htmlEl.style.overflow = "hidden";
      bodyEl.style.overflow = "hidden";
      // Native overflow can't stop Lenis (virtual scroll) — pause it directly.
      const l = lenisRef.current;
      if (l) {
        l.stop();
        l.scrollTo(0, { immediate: true, force: true });
      }
    };
    const unlockScroll = () => {
      if (!locked) return;
      locked = false;
      lockedRef.current = false;
      htmlEl.style.overflow = prevHtmlOverflow;
      bodyEl.style.overflow = prevBodyOverflow;
      try {
        window.history.scrollRestoration = prevScrollRestoration;
      } catch {}
      lenisRef.current?.start();
    };

    // Pin to the very top and lock BEFORE the timeline runs, so a browser
    // scroll-restore on reload (or any scroll during the load) can't leave the
    // user mid-page when the loader finally lifts — they always land on the hero.
    if (!reduce) {
      try {
        window.history.scrollRestoration = "manual";
      } catch {}
      window.scrollTo(0, 0);
      lockScroll();
    }

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
        gsap.set(
          introImages.filter((_, i) => i !== heroIndex),
          { autoAlpha: 0 },
        );
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

      // ---------- cinematic reveal timeline ----------
      const tl = gsap.timeline({
        delay: 0.4,
        onComplete: () => {
          lenisRef.current?.scrollTo(0, { immediate: true, force: true });
          window.scrollTo(0, 0);
          unlockScroll();
        },
      });

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
        },
        "<0.3",
      );

      // 5 — images before heroIndex fly left, those after fly right,
      //     the hero image expands to fullscreen
      const leftImgs = introImages.filter((_, i) => i < heroIndex);
      const rightImgs = introImages.filter((_, i) => i > heroIndex);
      if (leftImgs.length) {
        tl.to(leftImgs, { x: "-100vw", duration: 1.5, ease: "glide" }, "spread");
      }
      if (rightImgs.length) {
        tl.to(rightImgs, { x: "100vw", duration: 1.5, ease: "glide" }, "spread");
      }
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
        "spread",
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

      // free GPU layers once the reveal has settled
      tl.set(introImages, { willChange: "auto" }, ">");
    }, scopeRef);

    return () => {
      unlockScroll();
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={scopeRef} className="relative w-full">
      {/* Loader — full-viewport overlay lifted OUT of the hero section so it's
          never clipped by the section's overflow / containing block. */}
      <div className="reveal-loader fixed inset-0 z-[99999] flex items-center justify-center bg-white">
        <div
          className="tl-text flex flex-col items-center gap-1 sm:gap-2 px-4 text-center leading-[1.02] text-[2.2rem] sm:text-6xl md:text-8xl font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          {loaderLabel.split(" ").map((word, wi) => (
            <div key={wi} className="flex overflow-hidden">
              {word.split("").map((ch, i) => (
                <span key={`${wi}-${i}`} className="rl-letter" data-text={ch}>
                  {ch}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section
        className="relative w-full h-[100svh] overflow-hidden"
        style={{ backgroundColor: overlayColor }}
      >
      {/* Intro images — index 2 is the hero */}
      {images.slice(0, 5).map((src, i) => (
        <div
          key={i}
          className={`intro-img absolute inset-0 w-full h-full overflow-hidden ${
            i === heroIndex ? "hero-img" : ""
          }`}
          style={{
            transformOrigin: "center center",
            backfaceVisibility: "hidden",
            willChange: "transform",
            contain: "layout style",
          }}
        >
          <img
            src={src}
            alt=""
            aria-hidden="true"
            decoding="async"
            className="w-full h-full object-cover select-none"
          />
        </div>
      ))}

      {/* Legibility scrim */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-black/15 to-black/20 pointer-events-none" />

      {/* Hero content */}
      <div className="hero-content absolute inset-0 z-[2] h-[100svh] flex flex-col justify-between px-8 pt-[18svh] pb-[16svh] sm:pt-[14svh] lg:pt-[15svh]">
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
    </div>
  );
}
