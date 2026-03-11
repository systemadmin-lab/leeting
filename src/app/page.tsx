import BentoSection from "./components/BentoSection";
import CTASection from "./components/CTASection";
import FooterSection from "./components/FooterSection";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import PipelineSection from "./components/PipelineSection";
import ResultsSection from "./components/ResultsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import VideoSection from "./components/VideoSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <VideoSection />
      <BentoSection />
      <PipelineSection />
      <ResultsSection />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
    </>
  );
}
