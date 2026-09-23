import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { BesHighlightSection } from "@/components/sections/BesHighlightSection";
import { AdvisorProfile } from "@/components/sections/AdvisorProfile";
import { QuickQuoteSection } from "@/components/sections/QuickQuoteSection";
import { AnnouncementsSection } from "@/components/sections/AnnouncementsSection";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { LocalContactSection } from "@/components/sections/LocalContactSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. 4 Main Services */}
      <ServicesGrid />

      {/* 4. Why Hepsen Sigorta */}
      <WhyChooseUs />

      {/* 5. How It Works (4 Steps) */}
      <HowItWorks />

      {/* 6. BES Special Highlight */}
      <BesHighlightSection />

      {/* 7. Merve Doğan / Advisor Profile */}
      <AdvisorProfile />

      {/* 8. Interactive Quick Quote Wizard */}
      <QuickQuoteSection />

      {/* 9. Announcements & News */}
      <AnnouncementsSection />

      {/* 10. Blog & Guides */}
      <BlogPreviewSection />

      {/* 11. FAQ Section */}
      <FaqSection />

      {/* 12. Local Contact & Map */}
      <LocalContactSection />

      {/* 13. High-Impact Final CTA */}
      <FinalCtaSection />
    </>
  );
}
