"use client";

import { useRef } from "react";
import AboutCTA from "../components/about/AboutCTA";
import AboutHero from "../components/about/AboutHero";
import AboutSolutions from "../components/about/AboutSolutions";
import AboutStory from "../components/about/AboutStory";
import AboutValues from "../components/about/AboutValues";
import AboutJourney from "../components/about/AboutJourney";
import AboutCompany from "../components/about/AboutCompany";
import AboutTestimonials from "../components/about/AboutTestimonials";
// import BrandMarquee from "../components/ui/BrandMarquee";
import useAboutAnimations from "../components/about/useAboutAnimations";

export default function AboutPage() {
  const rootRef = useRef<HTMLElement>(null);
  useAboutAnimations(rootRef);

  return (
    <main
      ref={rootRef}
      className="min-h-screen bg-white text-slate-900"
      style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}
    >
      <AboutHero />
      <AboutStory />
      {/* <BrandMarquee /> */}
      <AboutValues />
      <AboutSolutions />
      <AboutTestimonials />
      <AboutJourney />
      <AboutCompany />
      <AboutCTA />
    </main>
  );
}
