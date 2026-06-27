"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface HoverZoomImageProps {
  src: string;
  alt: string;
  /** Extra classes on the in-place (thumbnail) frame */
  className?: string;
  /** Extra classes on the thumbnail <img> */
  imgClassName?: string;
  /** Rounded class for the thumbnail frame */
  rounded?: string;
  /** How much bigger than the thumbnail the preview grows */
  previewScale?: number;
  /** Hard cap on preview width (px) */
  maxPreviewWidth?: number;
}

/**
 * Reusable Awwwards-style hover preview.
 * The thumbnail stays exactly in place. On hover a SEPARATE, larger copy of
 * the image floats in (rendered to <body> so nothing clips it), anchored near
 * the thumbnail and capped to the viewport — never a full-page takeover.
 * GPU-only, respects prefers-reduced-motion, auto-cleans via useGSAP.
 */
export default function HoverZoomImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  rounded = "rounded-2xl",
  previewScale = 1.7,
  maxPreviewWidth = 1000,
}: HoverZoomImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Portal target only exists on the client.
  useEffect(() => setMounted(true), []);

  // Bind hover on the thumbnail frame.
  useGSAP(
    () => {
      const frame = frameRef.current;
      if (!frame) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const onEnter = () => setHovered(true);
      const onLeave = () => setHovered(false);
      frame.addEventListener("mouseenter", onEnter);
      frame.addEventListener("mouseleave", onLeave);
      return () => {
        frame.removeEventListener("mouseenter", onEnter);
        frame.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: frameRef },
  );

  // Position + animate the floating preview in / out.
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const preview = previewRef.current;
      const frame = frameRef.current;
      if (!overlay || !preview || !frame) return;

      gsap.killTweensOf([overlay, preview]);

      if (hovered) {
        const r = frame.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const m = 16; // viewport margin

        const ratio = r.height / r.width || 0.6;
        let w = Math.min(r.width * previewScale, maxPreviewWidth, vw - m * 2);
        let h = w * ratio;
        if (h > vh - m * 2) {
          h = vh - m * 2;
          w = h / ratio;
        }

        // Center on the thumbnail, then clamp fully inside the viewport.
        let cx = r.left + r.width / 2;
        let cy = r.top + r.height / 2;
        cx = Math.min(Math.max(cx, m + w / 2), vw - m - w / 2);
        cy = Math.min(Math.max(cy, m + h / 2), vh - m - h / 2);

        gsap.set(overlay, {
          display: "block",
          width: w,
          height: h,
          left: cx,
          top: cy,
          xPercent: -50,
          yPercent: -50,
        });
        gsap.to(overlay, { autoAlpha: 1, duration: 0.28, ease: "power2.out" });
        gsap.fromTo(
          preview,
          { scale: 0.9 },
          { scale: 1, duration: 0.45, ease: "power3.out" },
        );
      } else {
        gsap.to(overlay, {
          autoAlpha: 0,
          duration: 0.22,
          ease: "power2.in",
          onComplete: () => gsap.set(overlay, { display: "none" }),
        });
      }
    },
    { dependencies: [hovered] },
  );

  return (
    <>
      {/* Thumbnail — stays exactly in place */}
      <div
        ref={frameRef}
        className={`relative overflow-hidden cursor-zoom-in ${rounded} ${className}`}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className={`w-full h-auto block select-none ${imgClassName}`}
        />
      </div>

      {/* Floating enlarged preview — portaled to body, anchored + capped */}
      {mounted &&
        createPortal(
          <div
            ref={overlayRef}
            className="fixed z-100000 pointer-events-none rounded-2xl overflow-hidden bg-white p-2 shadow-[0_30px_80px_rgba(0,0,0,0.35)] ring-1 ring-black/5"
            style={{ display: "none", opacity: 0, visibility: "hidden" }}
          >
            <img
              ref={previewRef}
              src={src}
              alt={alt}
              draggable={false}
              className="w-full h-full object-contain rounded-xl select-none"
              style={{ willChange: "transform" }}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
