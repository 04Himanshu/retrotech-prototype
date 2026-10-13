import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES_DATA, type ServiceItem } from '../data/retrotechData';
import { ArrowUpRight, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';

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
  const [scrollProgress, setScrollProgress] = useState(0);
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

  // Scroll listener for sticky 3D cylinder arc
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!containerRef.current || isAutoScrollingRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableDistance = rect.height - window.innerHeight;

      if (totalScrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.min(Math.max(currentScroll / totalScrollableDistance, 0), 1);
      setScrollProgress(rawProgress);

      // Exact mathematical synchronization: item closest to horizontal center is active
      const targetIndex = Math.min(
        Math.max(Math.round(rawProgress * (totalItems - 1)), 0),
        totalItems - 1
      );
      setActiveIndex(targetIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, totalItems]);

  // Jump to specific capability by index with auto-scroll lock
  const jumpToIndex = (index: number) => {
    setActiveIndex(index);
    setScrollProgress(index / (totalItems - 1));
    isAutoScrollingRef.current = true;

    if (autoScrollTimeoutRef.current) {
      window.clearTimeout(autoScrollTimeoutRef.current);
    }

    if (!isMobile && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      const targetScrollTop = window.scrollY + rect.top + (index / (totalItems - 1)) * totalScrollable;
      window.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
    }

    // Release auto-scrolling lock after smooth scroll animation settles
    autoScrollTimeoutRef.current = window.setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 700);
  };

  // Immediate hover mapping: preview capability instantly without displacing cylinder
  const handleItemHover = (index: number) => {
    setActiveIndex(index);
    onCursorChange?.('hover', `0${index + 1}`);
  };

  const activeService: ServiceItem = SERVICES_DATA[activeIndex] || SERVICES_DATA[0];

  return (
    <section
      id="services"
      ref={containerRef}
      className={`relative bg-[#FFFFFF] text-[#171717] border-b border-[#E8E8E8] selection:bg-[#353788] selection:text-white ${
        isMobile ? 'py-12' : 'h-[270vh]'
      }`}
    >
      {/* Subtle Atmospheric Gradient Aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#353788]/[0.035] rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#0096C7]/[0.025] rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      </div>

      {/* Sticky Viewport Container */}
      <div
        className={`${
          isMobile
            ? 'relative max-w-7xl mx-auto px-6'
            : 'sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-8 px-6 md:px-12 lg:px-16 xl:px-20 z-10'
        }`}
      >
        {/* Compact, Professional Header */}
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E8E8E8] shrink-0">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#353788]">
                01 &bull; Core Capabilities
              </span>
              <div className="w-8 h-[1px] bg-[#353788]/60" />
              <span className="text-[9.5px] tracking-widest uppercase text-[#737373] font-mono flex items-center gap-1.5">
                <span>They Trust Us</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#171717] leading-tight">
              Full-Spectrum Engineering{' '}
              <span className="font-serif italic font-normal text-[#353788]">
                &amp; Digital Performance
              </span>
            </h2>
          </div>

          <div className="flex flex-col md:items-end gap-1.5 max-w-sm">
            <p className="text-xs sm:text-sm text-[#737373] leading-relaxed md:text-right">
              Scalable digital flagships, bespoke software platforms, and high-impact marketing systems built for enterprise growth.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#737373]">
              <span>ACTIVE CAPABILITY</span>
              <span className="text-[#353788] font-bold text-xs bg-[#F4F5FB] px-2.5 py-0.5 rounded-full border border-[#353788]/20 shadow-xs">
                0{activeIndex + 1} OF 0{totalItems}
              </span>
            </div>
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
                  const relIndex = index - scrollProgress * (totalItems - 1);
                  const thetaDeg = relIndex * 11;
                  const thetaRad = (thetaDeg * Math.PI) / 180;
                  const radius = 460; // px - tuned for refined curvature
                  const x = radius * (1 - Math.cos(thetaRad));
                  const y = radius * Math.sin(thetaRad);

                  const isActive = index === activeIndex;
                  const absRel = Math.abs(relIndex);
                  const opacity = Math.max(0.18, 1 - absRel * 0.32);
                  const scale = Math.max(0.78, 1 - absRel * 0.07);

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
                        transform: `translate(${-x}px, calc(-50% + ${y}px)) rotate(${thetaDeg}deg) scale(${scale})`,
                        transformOrigin: 'center left',
                        opacity,
                        transition: 'opacity 0.25s ease-out, color 0.3s ease-out, transform 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
                        willChange: 'transform, opacity',
                        cursor: 'pointer',
                        maxWidth: '92%',
                      }}
                      className="group flex items-center gap-3.5 py-2.5 whitespace-nowrap"
                    >
                      {/* Number Tag */}
                      <span
                        className={`text-xs font-mono tracking-wider transition-colors duration-300 ${
                          isActive
                            ? 'text-[#353788] font-bold'
                            : 'text-[#A3A3A3] group-hover:text-[#353788]'
                        }`}
                      >
                        0{index + 1}
                      </span>

                      {/* Title - Refined Professional Size */}
                      <span
                        className={`text-lg sm:text-xl xl:text-2xl font-bold tracking-tight transition-all duration-300 truncate ${
                          isActive
                            ? 'text-[#171717] font-extrabold drop-shadow-[0_2px_12px_rgba(53,55,136,0.12)]'
                            : 'text-[#737373]/65 group-hover:text-[#171717]'
                        }`}
                      >
                        {service.title}
                      </span>

                      {/* Active indicator dot and connector pointer */}
                      {isActive && (
                        <div className="flex items-center gap-1.5 ml-1 shrink-0">
                          <motion.div
                            layoutId="activeBullet"
                            className="w-2.5 h-2.5 rounded-full bg-[#353788] shadow-[0_0_10px_rgba(53,55,136,0.5)] ring-4 ring-[#353788]/15"
                          />
                          <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 28, opacity: 1 }}
                            className="h-[1.5px] bg-gradient-to-r from-[#353788] via-[#353788]/60 to-transparent hidden md:block"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Cylindrical Depth Gradient Vignette */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
            </div>

            {/* Right Synchronized 3D Showcase Card (Cols 8-12) */}
            <div className="col-span-5 relative flex items-center justify-start">
              {/* Visual Connector Dock on left border pointing to active capability */}
              <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 z-20 pointer-events-none hidden lg:flex">
                <div className="w-2.5 h-2.5 rounded-full bg-[#353788] shadow-[0_0_8px_rgba(53,55,136,0.6)] border-2 border-white ring-2 ring-[#353788]/20 animate-pulse" />
                <div className="w-2 h-[1.5px] bg-[#353788]/40" />
              </div>

              {/* Stable Card Frame: Persistent, Generously Proportioned Showcase */}
              <div
                className="w-full max-w-[430px] xl:max-w-[465px] 2xl:max-w-[490px] rounded-3xl bg-white border border-[#E8E8E8] p-6 sm:p-7 backdrop-blur-xl shadow-[0_24px_54px_rgba(0,0,0,0.07)] relative overflow-hidden group"
                style={{
                  perspective: 1000,
                }}
              >
                {/* Subtle Glowing Top Edge Accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#353788]/70 to-transparent" />

                {/* Thumbnail Banner with Increased Height & Fast Crossfade */}
                <div className="relative w-full h-40 sm:h-44 md:h-48 xl:h-52 rounded-2xl overflow-hidden mb-4 border border-[#E8E8E8] bg-[#F7F7F5]">
                  <AnimatePresence initial={false} mode="sync">
                    <motion.img
                      key={activeService.image}
                      src={activeService.image}
                      alt={activeService.title}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none z-10" />
                  
                  {/* Synchronized Header Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E8E8E8] text-[10.5px] font-semibold text-[#353788] shadow-xs">
                      <Sparkles className="w-3 h-3 text-[#353788]" />
                      <span>{activeService.category}</span>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-[10.5px] font-mono font-bold text-white shadow-xs">
                      0{activeIndex + 1} OF 0{totalItems}
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-20">
                    <span className="text-[11px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 truncate block">
                      {activeService.subtitle}
                    </span>
                  </div>
                </div>

                {/* Capability Details with Snappy Synchronous Fade */}
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="space-y-3"
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-[#171717] tracking-tight">
                      {activeService.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#737373] leading-relaxed line-clamp-2">
                      {activeService.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-1.5 pt-2 border-t border-[#F0F0EE]">
                      {activeService.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-[12.5px] text-[#404040]">
                          <CheckCircle2 className="w-4 h-4 text-[#353788] shrink-0 mt-0.5" />
                          <span className="leading-snug truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeService.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-[#F7F7F5] border border-[#E8E8E8] text-[10px] sm:text-[10.5px] font-mono text-[#737373]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          onSelectServiceForContact?.(activeService.title);
                          const el = document.getElementById('contact');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full py-3 sm:py-3.5 rounded-full bg-[#171717] hover:bg-[#353788] text-white text-xs sm:text-[12.5px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                      >
                        <span>Consult On This Capability</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
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
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    idx === activeIndex
                      ? 'bg-[#353788] text-white font-bold shadow-xs'
                      : 'bg-[#F7F7F5] text-[#737373] border border-[#E8E8E8] hover:text-[#171717]'
                  }`}
                >
                  0{idx + 1} &bull; {srv.title}
                </button>
              ))}
            </div>

            {/* Active Card */}
            <div className="rounded-2xl bg-white border border-[#E8E8E8] p-5 sm:p-6 shadow-md">
              <div className="relative h-44 sm:h-52 rounded-xl overflow-hidden mb-3.5 border border-[#E8E8E8]">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Synchronized Header Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E8E8E8] text-[10px] font-semibold text-[#353788] shadow-xs">
                    <Sparkles className="w-3 h-3 text-[#353788]" />
                    <span>{activeService.category}</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white shadow-xs">
                    0{activeIndex + 1} OF 0{totalItems}
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs font-bold text-white truncate block">
                    {activeService.subtitle}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#171717] mb-1.5">
                {activeService.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed mb-3">
                {activeService.description}
              </p>

              <div className="space-y-1.5 mb-3.5">
                {activeService.features.slice(0, 2).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#404040]">
                    <CheckCircle2 className="w-4 h-4 text-[#353788] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  onSelectServiceForContact?.(activeService.title);
                  const el = document.getElementById('contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 rounded-full bg-[#171717] hover:bg-[#353788] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Select Solution</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* COMPACT BOTTOM PROGRESS & CONTROLS                       */}
        {/* ======================================================== */}
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between pt-3 border-t border-[#E8E8E8] shrink-0">
          {/* Scroll progress dots */}
          <div className="flex items-center gap-1.5">
            {SERVICES_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpToIndex(i)}
                aria-label={`Jump to capability ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === activeIndex
                    ? 'w-7 h-1.5 bg-[#353788]'
                    : 'w-1.5 h-1.5 bg-[#D4D4D4] hover:bg-[#353788]/60'
                }`}
              />
            ))}
          </div>

          {/* Stepper Buttons & Scroll Notice */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[10px] font-mono text-[#737373] tracking-wider">
              SCROLL OR CLICK TO ROTATE 3D ARC
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => jumpToIndex(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                aria-label="Previous capability"
                className="w-7 h-7 rounded-full border border-[#E8E8E8] flex items-center justify-center text-[#171717] hover:text-white hover:bg-[#171717] hover:border-[#171717] bg-white shadow-xs disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => jumpToIndex(Math.min(totalItems - 1, activeIndex + 1))}
                disabled={activeIndex === totalItems - 1}
                aria-label="Next capability"
                className="w-7 h-7 rounded-full border border-[#E8E8E8] flex items-center justify-center text-[#171717] hover:text-white hover:bg-[#171717] hover:border-[#171717] bg-white shadow-xs disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
