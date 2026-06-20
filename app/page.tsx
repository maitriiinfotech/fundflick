import TextLoader from "./components/landing/TextLoader";
import VantaHero from "./components/landing/Hero";
import HoverGallery2 from "./components/landing/HoverGallery2";
import LendingFocus from "./components/landing/LendingFocus";
import WhyChoose from "./components/landing/WhyChoose";
import AnimatedPipeline from "./components/landing/AnimatedPipeline";
import PricingSection from "./components/landing/PricingSection";
import AIOperationsSection from "./components/landing/AIOperationsSection";
import AIWorkflowSection from "./components/landing/AIWorkflowSection";
import FAQ from "./components/landing/FAQ";
import CTASection from "./components/landing/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white pt-20 font-sans">
      <TextLoader />
      <VantaHero />

      <HoverGallery2 />
      {/* <LendingFocus /> */}
      <WhyChoose />
      <AnimatedPipeline />
      <PricingSection />
      <AIOperationsSection />
      <AIWorkflowSection />
      <FAQ />
      <CTASection />
    </div>
  );
}




