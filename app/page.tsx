import VantaHero from "./components/landing/Hero";
import HoverGallery from "./components/landing/HoverGallery";
import LendingFocus from "./components/landing/LendingFocus";
import AnimatedPipeline from "./components/landing/AnimatedPipeline";

export default function Home() {
  return (
    <div className="flex  flex-col min-h-screen bg-white pt-20 font-sans">
      <VantaHero />
      <HoverGallery />
      <LendingFocus />
      <AnimatedPipeline />
    </div>
  );
}

