"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useAboutAnimations(
  rootRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        );
      });

      gsap.fromTo(
        ".value-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".values-grid",
            start: "top 85%",
            once: true,
          },
        },
      );

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const solutionCards = gsap.utils.toArray<HTMLElement>(".solution-card");

      if (reduceMotion) {
        gsap.set(solutionCards, { opacity: 1 });
      } else {
        // Bento entrance — depth-staggered from center
        gsap.fromTo(
          solutionCards,
          { opacity: 0, scale: 0.85, rotateX: -40, transformOrigin: "50% 100%" },
          {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1.1,
            ease: "power4.out",
            stagger: { each: 0.1, from: "center", grid: "auto" },
            scrollTrigger: {
              trigger: ".solutions-grid",
              start: "top 80%",
              once: true,
            },
          },
        );

        // Parallax — each card drifts at its own depth speed
        solutionCards.forEach((card) => {
          const speed = parseFloat(card.dataset.speed || "0");
          if (!speed) return;
          gsap.fromTo(
            card,
            { yPercent: speed * 0.5 },
            {
              yPercent: -speed * 0.5,
              ease: "none",
              scrollTrigger: {
                trigger: ".solutions-grid",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });

        // Magnetic 3D tilt on pointer (fine pointers only)
        if (window.matchMedia("(hover: hover)").matches) {
          solutionCards.forEach((card) => {
            const rotX = gsap.quickTo(card, "rotationX", {
              duration: 0.5,
              ease: "power3",
            });
            const rotY = gsap.quickTo(card, "rotationY", {
              duration: 0.5,
              ease: "power3",
            });
            const scaleTo = gsap.quickTo(card, "scale", {
              duration: 0.5,
              ease: "power3",
            });
            const onMove = (e: PointerEvent) => {
              const r = card.getBoundingClientRect();
              const px = (e.clientX - r.left) / r.width - 0.5;
              const py = (e.clientY - r.top) / r.height - 0.5;
              rotY(px * 12);
              rotX(-py * 12);
              scaleTo(1.03);
            };
            const onLeave = () => {
              rotX(0);
              rotY(0);
              scaleTo(1);
            };
            card.addEventListener("pointermove", onMove);
            card.addEventListener("pointerleave", onLeave);
            cleanups.push(() => {
              card.removeEventListener("pointermove", onMove);
              card.removeEventListener("pointerleave", onLeave);
            });
          });
        }
      }

      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = parseFloat(el.dataset.value || "0");
        const dec = el.dataset.dec === "1";
        const counter = { v: 0 };

        gsap.to(counter, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = dec
              ? counter.v.toFixed(1)
              : Math.floor(counter.v).toString();
          },
        });
      });
    }, rootRef);

    const refresh = () => ScrollTrigger.refresh();
    const timer = setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", refresh);
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [rootRef]);
}
