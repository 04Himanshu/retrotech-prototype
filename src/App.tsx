import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { IndustriesSection } from './components/IndustriesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { SuccessStoryCta } from './components/SuccessStoryCta';
import { WhyUsPillars } from './components/WhyUsPillars';
import { FAQSection } from './components/FAQSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  const [preselectedService, setPreselectedService] = useState<string>('Web Development');

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08, // Signature silky smooth linear interpolation (gliding inertia)
      duration: 1.2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      autoRaf: true,
      anchors: {
        offset: -80,
        duration: 1.2,
      },
      respectReducedMotion: false, // Ensures smooth scroll is active across all browser & OS animation preferences
    });

    // Expose lenis globally for seamless scroll coordination across components
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);

  const handleCursorChange = () => { };

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
  };

  const handleOpenConsultation = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      if (lenis) {
        lenis.scrollTo(contactElement, { offset: -80, duration: 1.2 });
      } else {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative bg-[#FFFFFF] min-h-screen text-[#171717] selection:bg-[#353788] selection:text-white">
      {/* 1. Header & Navigation Dropdown System */}
      <Navbar
        onCursorChange={handleCursorChange}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* 2. Hero: Business Made Easy with Retrotech */}
      <div id="hero">
        <Hero onCursorChange={handleCursorChange} />
      </div>

      {/* 3. Editorial Ticker Marquee */}
      <MarqueeStrip />

      {/* Main Content Sections - In Strict Live Website Sequence */}
      <main>
        {/* 4. About Us: Smart IT, AI and Marketing Solutions for Every Business */}
        <AboutSection onCursorChange={handleCursorChange} />

        {/* 5. Core Services: Your Business Growth Through with IT Solutions */}
        <ServicesSection
          onCursorChange={handleCursorChange}
          onSelectServiceForContact={handleSelectServiceForContact}
        />

        {/* 6. Industries: Industries We Serve (11 Verified Domains) */}
        <IndustriesSection
          onCursorChange={handleCursorChange}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 7. Client Reviews: Trusted by Businesses, Empowered by Results */}
        <TestimonialsSection onCursorChange={handleCursorChange} />

        {/* 8. Mid-Page CTA: Let's Build Your Next Digital Success Story */}
        <SuccessStoryCta
          onCursorChange={handleCursorChange}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 9. Top Six Reasons to Trust Our IT Expertise */}
        <WhyUsPillars onCursorChange={handleCursorChange} />

        {/* 10. Frequently Asked Questions */}
        <FAQSection
          onCursorChange={handleCursorChange}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 11. Latest News & Articles */}
        <BlogSection onCursorChange={handleCursorChange} />

        {/* 12. Contact: Let's Do Great Work Together */}
        <ContactSection
          onCursorChange={handleCursorChange}
          preselectedService={preselectedService}
        />
      </main>

      {/* 13. Comprehensive Live Site Footer */}
      <Footer onCursorChange={handleCursorChange} />
    </div>
  );
}

export default App;
