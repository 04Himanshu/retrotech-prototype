import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { AboutSection } from './components/AboutSection';
import { IndustriesSection } from './components/IndustriesSection';
import { WhyUsPillars } from './components/WhyUsPillars';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  const [preselectedService, setPreselectedService] = useState<string>('Bespoke Web Development');

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Expose lenis globally for seamless scroll coordination
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);

  const handleCursorChange = () => {};

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
  };

  const handleOpenConsultation = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      if (lenis) {
        lenis.scrollTo(contactElement, { duration: 1.2 });
      } else {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative bg-[#FFFFFF] min-h-screen text-[#171717] selection:bg-[#353788] selection:text-white">
      {/* Navigation */}
      <Navbar
        onCursorChange={handleCursorChange}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Hero Viewport */}
      <Hero onCursorChange={handleCursorChange} />

      {/* Editorial Ticker */}
      <MarqueeStrip />

      {/* Main Content Sections */}
      <main>
        {/* Core Services */}
        <ServicesSection
          onCursorChange={handleCursorChange}
          onSelectServiceForContact={handleSelectServiceForContact}
        />

        {/* Selected Work Portfolio Showcase */}
        <PortfolioShowcase
          onCursorChange={handleCursorChange}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* About & Agency Philosophy */}
        <AboutSection onCursorChange={handleCursorChange} />

        {/* Industries We Serve */}
        <IndustriesSection
          onCursorChange={handleCursorChange}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* Why Us Pillars & Accreditations */}
        <WhyUsPillars onCursorChange={handleCursorChange} />

        {/* FAQs */}
        <FAQSection onCursorChange={handleCursorChange} />

        {/* Contact Discovery & Engagement */}
        <ContactSection
          onCursorChange={handleCursorChange}
          preselectedService={preselectedService}
        />
      </main>

      {/* Editorial Footer */}
      <Footer onCursorChange={handleCursorChange} />
    </div>
  );
}

export default App;
