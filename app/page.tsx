import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import AIPipelineSection from '@/components/landing/AIPipelineSection';
import PricingSection from '@/components/landing/PricingSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';
import { Navbar } from '@/components/layout/Navbar';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-primary">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <AIPipelineSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <footer className="border-t border-white/5 py-12 text-center text-sm text-text-secondary bg-[#1a0b2e]">
        <p>© {new Date().getFullYear()} EchoVerse AI Studio. All rights reserved.</p>
      </footer>
    </div>
  );
}
