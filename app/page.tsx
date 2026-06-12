import VantaHero from "./components/landing/Hero";
import HoverGallery from "./components/landing/HoverGallery";
import LendingFocus from "./components/landing/LendingFocus";
import WhyChoose from "./components/landing/WhyChoose";
import AnimatedPipeline from "./components/landing/AnimatedPipeline";
import PricingSection from "./components/landing/PricingSection";
import FAQ from "./components/landing/FAQ";

export default function Home() {
  return (
    <div className="flex  flex-col min-h-screen bg-white pt-20 font-sans">
      <VantaHero />
      <HoverGallery />
      <LendingFocus />
      <WhyChoose />
      <AnimatedPipeline />
      <PricingSection />
      <FAQ />
    </div>
  );
}




