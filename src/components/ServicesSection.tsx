import React, { useState, useEffect, useRef } from 'react';
import { SERVICES_DATA, type ServiceItem } from '../data/retrotechData';
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface ServicesSectionProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
  onSelectServiceForContact?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onCursorChange,
  onSelectServiceForContact,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAutoScrollingRef = useRef(false);
  const autoScrollTimeoutRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const totalItems = SERVICES_DATA.length;

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cleanup auto-scroll timeout on unmount
  useEffect(() => {
    return () => {
      if (autoScrollTimeoutRef.current) {
        window.clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, []);

  // Zero-lag requestAnimationFrame scroll synchronization
  useEffect(() => {
    if (isMobile) return;

    let rafId: number;
    let sectionTop = 0;
    let sectionHeight = 0;
    let lastScrollY = -1;
    let lastActiveIndex = -1;

    const measure = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      sectionTop = window.scrollY + rect.top;
      sectionHeight = rect.height;
    };

    measure();
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('load', measure, { passive: true });

    const tick = () => {
      const scrollY = window.scrollY;
      if (scrollY !== lastScrollY) {
        lastScrollY = scrollY;

        if (!isAutoScrollingRef.current && sectionHeight > 0) {
          const totalScrollableDistance = sectionHeight - window.innerHeight;
          if (totalScrollableDistance > 0) {
            const currentScroll = scrollY - sectionTop;

            if (currentScroll >= 0 && currentScroll <= totalScrollableDistance) {
              const progress = currentScroll / totalScrollableDistance;
              // Uniform 1/totalItems step per capability - zero dead zone at boundaries
              const targetIndex = Math.min(
                Math.floor(progress * totalItems),
                totalItems - 1
              );

              if (targetIndex !== lastActiveIndex) {
                lastActiveIndex = targetIndex;
                setActiveIndex(targetIndex);
              }
            } else if (currentScroll < 0 && lastActiveIndex !== 0) {
              lastActiveIndex = 0;
              setActiveIndex(0);
            } else if (currentScroll > totalScrollableDistance && lastActiveIndex !== totalItems - 1) {
              lastActiveIndex = totalItems - 1;
              setActiveIndex(totalItems - 1);
            }
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, [isMobile, totalItems]);

  // Jump to specific capability by index with auto-scroll lock
  const jumpToIndex = (index: number) => {
    setActiveIndex(index);
    isAutoScrollingRef.current = true;

    if (autoScrollTimeoutRef.current) {
      window.clearTimeout(autoScrollTimeoutRef.current);
    }

    if (!isMobile && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      const targetScrollTop = window.scrollY + rect.top + ((index + 0.4) / totalItems) * totalScrollable;
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(targetScrollTop, { duration: 0.5 });
      } else {
        window.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
      }
    }

    // Release auto-scrolling lock
    autoScrollTimeoutRef.current = window.setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 550);
  };

  // Immediate hover mapping: preview capability instantly with smooth hardware acceleration
  const handleItemHover = (index: number) => {
    setActiveIndex(index);
    onCursorChange?.('hover', `0${index + 1}`);
  };

  const activeService: ServiceItem = SERVICES_DATA[activeIndex] || SERVICES_DATA[0];

  return (
    <section
      id="services"
      ref={containerRef}
      className={`relative bg-[#FFFFFF] text-[#171717] border-b border-[#E8E8E8] selection:bg-[#353788] selection:text-white ${isMobile ? 'py-12' : 'h-[165vh]'
        }`}
    >
      {/* Clean Pure White Canvas */}

      {/* Sticky Viewport Container */}
      <div
        className={`${isMobile
          ? 'relative max-w-7xl mx-auto px-6'
          : 'sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-8 px-6 md:px-12 lg:px-16 xl:px-20 z-10'
          }`}
      >
        {/* Clean, Structured Header */}
        <div className="max-w-7xl w-full mx-auto pb-4 border-b border-[#E8E8E8] shrink-0">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#353788]">
                Our Services
              </span>
              <div className="w-8 h-[1px] bg-[#353788]/60" />
              <span className="text-[9.5px] tracking-widest uppercase text-[#737373] font-mono flex items-center gap-1.5">
                <span>360° IT Solutions</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#171717] leading-snug">
              Your Business Growth{' '}
              <span className="font-serif italic font-normal text-[#353788] whitespace-nowrap">
                Through 360° IT Solutions
              </span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#737373] leading-relaxed max-w-2xl">
              End-to-end digital engineering and marketing platforms built for scale — spanning responsive web, native mobile apps, custom software, and cloud SaaS.
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP 3D CYLINDER ARC VIEWPORT                          */}
        {/* ======================================================== */}
        {!isMobile ? (
          <div className="relative flex-1 w-full max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center min-h-0 py-2">
            {/* Left Arc Stage (Cols 1-7) - Positioned closer to center */}
            <div className="col-span-7 relative h-full flex items-center overflow-visible select-none pr-2">
              {/* 3D Cylindrical Arc Items Container */}
              <div className="relative w-full h-[460px]">
                {SERVICES_DATA.map((service, index) => {
                  const relIndex = index - activeIndex;
                  const thetaDeg = relIndex * 11;
                  const thetaRad = (thetaDeg * Math.PI) / 180;
                  const radius = 460; // px - tuned for refined curvature
                  const x = radius * (1 - Math.cos(thetaRad));
                  const y = radius * Math.sin(thetaRad);

                  const isActive = index === activeIndex;
                  const absRel = Math.abs(relIndex);
                  const opacity = isActive ? 1 : Math.max(0.2, 0.7 - absRel * 0.22);
                  const scale = isActive ? 1.05 : Math.max(0.8, 1 - absRel * 0.07);

                  return (
                    <div
                      key={service.id}
                      onClick={() => jumpToIndex(index)}
                      onMouseEnter={() => handleItemHover(index)}
                      onMouseLeave={() => onCursorChange?.('default')}
                      style={{
                        position: 'absolute',
                        left: '10%',
                        top: '50%',
                        transform: `translate3d(${-x}px, calc(-50% + ${y}px), 0) rotate(${thetaDeg}deg) scale(${scale})`,
                        transformOrigin: 'center left',
                        opacity,
                        transition: 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                        willChange: 'transform, opacity',
                        cursor: 'pointer',
                        maxWidth: '92%',
                      }}
                      className="group relative flex items-center gap-3.5 py-2.5 whitespace-nowrap"
                    >
                      {/* Number Tag */}
                      <span
                        className={`text-xs font-mono tracking-wider transition-colors duration-200 ${isActive
                          ? 'text-[#353788] font-bold'
                          : 'text-[#A3A3A3] group-hover:text-[#353788]'
                          }`}
                      >
                        0{index + 1}
                      </span>

                      {/* Title - Refined Professional Size */}
                      <span
                        className={`text-lg sm:text-xl xl:text-2xl font-bold tracking-tight transition-colors duration-200 truncate ${isActive
                          ? 'text-[#171717] font-extrabold drop-shadow-[0_2px_12px_rgba(53,55,136,0.12)]'
                          : 'text-[#737373]/65 group-hover:text-[#171717]'
                          }`}
                      >
                        {service.title}
                      </span>

                      {/* Clean GPU-accelerated Active Underline Accent */}
                      <div
                        className={`absolute -bottom-1 left-0 right-4 h-[2px] bg-gradient-to-r from-[#353788] via-[#353788]/60 to-transparent rounded-full transition-all duration-200 pointer-events-none ${isActive ? 'opacity-100 scale-x-100 origin-left' : 'opacity-0 scale-x-50 pointer-events-none'
                          }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Cylindrical Depth Gradient Vignette */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
            </div>

            {/* Right Synchronized 3D Showcase Card (Cols 8-12) */}
            <div className="col-span-5 relative flex items-center justify-start z-20">
              {/* Clean, Clear Showcase Card */}
              <div className="w-full max-w-[420px] xl:max-w-[450px] rounded-2xl bg-white border border-[#EAEAEA] p-5 sm:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.05)] relative overflow-hidden">
                {/* Clean Image Showcase - Exact 16:9 Aspect for 100% Full Fit */}
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-[#F5F5F3] border border-[#EBEBEB]">
                  {SERVICES_DATA.map((srv, idx) => (
                    <img
                      key={srv.id}
                      src={srv.image}
                      alt={srv.title}
                      loading="eager"
                      decoding="async"
                      style={{
                        opacity: idx === activeIndex ? 1 : 0,
                        transform: idx === activeIndex ? 'scale(1)' : 'scale(1.03)',
                        transition: 'opacity 0.18s ease-out, transform 0.2s ease-out',
                        willChange: 'opacity, transform',
                      }}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                  ))}

                  {/* Clean Category Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-semibold text-[#353788] shadow-xs border border-[#EAEAEA]">
                      <Sparkles className="w-3 h-3 text-[#353788]" />
                      <span>{activeService.category}</span>
                    </span>
                  </div>
                </div>

                {/* Clean Content Area */}
                <div className="space-y-3">
                  <div>
                    <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#353788]">
                      {activeService.subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#171717] tracking-tight mt-0.5">
                      {activeService.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#666666] leading-relaxed line-clamp-2">
                    {activeService.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 pt-0.5">
                    {activeService.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#444444]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#353788] shrink-0 mt-0.5" />
                        <span className="leading-snug truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {activeService.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-[#F7F7F6] text-[10.5px] font-medium text-[#666666] border border-[#EAEAEA]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Clean Action Button */}
                  <div className="pt-1.5">
                    <button
                      onClick={() => {
                        onSelectServiceForContact?.(activeService.title);
                        const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: object) => void } }).__lenis;
                        if (lenis) {
                          lenis.scrollTo('#contact', { offset: -80, duration: 1.2 });
                        } else {
                          const el = document.getElementById('contact');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full py-2.5 sm:py-3 rounded-xl bg-[#171717] hover:bg-[#353788] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow"
                    >
                      <span>Inquire About {activeService.title}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* MOBILE RESPONSIVE 3D ROTATION WHEEL & CARDS               */
          /* ======================================================== */
          <div className="pt-8 space-y-5">
            {/* Capability Selector Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {SERVICES_DATA.map((srv, idx) => (
                <button
                  key={srv.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${idx === activeIndex
                    ? 'bg-[#353788] text-white font-bold shadow-xs'
                    : 'bg-[#F7F7F5] text-[#737373] border border-[#E8E8E8] hover:text-[#171717]'
                    }`}
                >
                  0{idx + 1} &bull; {srv.title}
                </button>
              ))}
            </div>

            {/* Active Card (Mobile) */}
            <div className="rounded-2xl bg-white border border-[#EAEAEA] p-5 shadow-[0_12px_32px_rgba(0,0,0,0.05)]">
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-3.5 bg-[#F5F5F3] border border-[#EBEBEB]">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-semibold text-[#353788] shadow-xs border border-[#EAEAEA]">
                    <Sparkles className="w-2.5 h-2.5 text-[#353788]" />
                    <span>{activeService.category}</span>
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#353788]">
                    {activeService.subtitle}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#171717] tracking-tight mt-0.5">
                    {activeService.title}
                  </h3>
                </div>

                <p className="text-xs text-[#666666] leading-relaxed">
                  {activeService.description}
                </p>

                <div className="space-y-1.5 pt-0.5">
                  {activeService.features.slice(0, 2).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#444444]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#353788] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {activeService.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md bg-[#F7F7F6] text-[10px] font-medium text-[#666666] border border-[#EAEAEA]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      onSelectServiceForContact?.(activeService.title);
                      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: object) => void } }).__lenis;
                      if (lenis) {
                        lenis.scrollTo('#contact', { offset: -80, duration: 1.2 });
                      } else {
                        const el = document.getElementById('contact');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#171717] hover:bg-[#353788] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Inquire About Solution</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* COMPACT BOTTOM PROGRESS INDICATORS                       */}
        {/* ======================================================== */}
        <div className="max-w-7xl w-full mx-auto flex items-center justify-start pt-2 shrink-0">
          {/* Scroll progress dots */}
          <div className="flex items-center gap-1.5">
            {SERVICES_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpToIndex(i)}
                aria-label={`Jump to capability ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${i === activeIndex
                  ? 'w-7 h-1.5 bg-[#353788]'
                  : 'w-1.5 h-1.5 bg-[#D4D4D4] hover:bg-[#353788]/60'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
