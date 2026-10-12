import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { ArrowDown, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onCursorChange }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const headlineLines = [
    { text: "ENGINEERING DIGITAL", isItalic: false },
    { text: "EXCELLENCE & SMART AI", isItalic: true },
    { text: "FOR ENTERPRISES.", isItalic: false },
  ];

  return (
    <section className="relative min-h-screen pt-32 md:pt-40 pb-20 flex flex-col justify-between overflow-hidden bg-[#FFFFFF]">
      {/* Subtle Background Radial Depth */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#353788]/[0.025] rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex-1 flex flex-col justify-center">
        {/* Editorial Subtitle / Category Label */}
        <div className="flex items-center gap-3 mb-6 md:mb-8 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1.5px] bg-[#353788]"
          />
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] md:text-xs uppercase font-bold tracking-[0.25em] text-[#737373]"
          >
            RetroTech Digital &bull; 360° IT, Software &amp; Marketing Solutions
          </motion.span>
        </div>

        {/* Oversized Editorial Typography Reveal */}
        <div className="space-y-1 md:space-y-2 mb-8 md:mb-12">
          {headlineLines.map((line, idx) => (
            <div key={idx} className="overflow-hidden">
              <motion.h1
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.1,
                  delay: 0.25 + idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tightest leading-[0.95] text-[#171717] ${
                  line.isItalic ? 'font-serif italic font-normal tracking-normal text-[#353788]' : ''
                }`}
              >
                {line.text}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Two-Column Supporting Narrative & Visual Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end mt-4">
          {/* Narrative & Action Buttons (Cols 1-6) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <p className="text-base md:text-lg text-[#737373] font-normal leading-relaxed max-w-xl">
              We translate enterprise ambition into bespoke digital flagships, high-velocity mobile applications, custom CRM architectures, and high-yield performance marketing systems.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <MagneticButton>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#171717] hover:bg-[#353788] text-white text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl"
                  onMouseEnter={() => onCursorChange?.('hover')}
                  onMouseLeave={() => onCursorChange?.('default')}
                >
                  <span>Explore Selected Work</span>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2.5 px-6 py-4 rounded-full border border-[#E8E8E8] hover:border-[#171717] bg-white text-[#171717] text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300"
                  onMouseEnter={() => onCursorChange?.('hover')}
                  onMouseLeave={() => onCursorChange?.('default')}
                >
                  <span>Request Consultation</span>
                </a>
              </MagneticButton>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-[#E8E8E8] flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#353788]" />
                <span className="text-xs font-semibold text-[#171717]">Google &amp; Meta Certified</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-[#D4D4D4]" />
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#171717]">4.9★</span>
                <span className="text-xs text-[#737373]">Verified Rating</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-[#D4D4D4]" />
              <div className="text-xs text-[#737373]">Gurugram &bull; Serving Global Markets</div>
            </div>
          </motion.div>

          {/* Cinematic Composition Asset with Parallax (Cols 7-12) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
            style={{
              transform: `translate(${mouseOffset.x * -0.5}px, ${mouseOffset.y * -0.5}px)`,
              transition: 'transform 0.4s ease-out',
            }}
          >
            {/* Primary Framed Editorial Visual */}
            <div className="relative rounded-2xl overflow-hidden bg-[#F7F7F5] border border-[#E8E8E8] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] aspect-[16/11]">
              <img
                src="/assets/web-development-retrotech.jpg"
                alt="RetroTech Digital Engineering"
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/80 block mb-1">
                    Enterprise Capability
                  </span>
                  <p className="text-sm font-semibold tracking-wide">
                    Full-Lifecycle Web, Cloud &amp; Mobile Ecosystems
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-medium">
                  360° Delivery
                </div>
              </div>
            </div>

            {/* Floating Accreditations Card (Parallax Layer) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 sm:-left-8 bg-white rounded-xl p-4 shadow-[0_12px_36px_rgba(0,0,0,0.08)] border border-[#E8E8E8] max-w-[240px] hidden sm:block"
              style={{
                transform: `translate(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px)`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#171717]">
                  Partner Ecosystem
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/assets/google-ads-partner.png"
                  alt="Google Ads Partner"
                  className="h-6 w-auto object-contain"
                />
                <img
                  src="/assets/meta-partner-retrotech.webp"
                  alt="Meta Partner"
                  className="h-6 w-auto object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-12 flex items-center justify-between text-xs text-[#737373]"
      >
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-[#171717]">Accepting Select Projects for Q2/Q3</span>
        </div>

        <a
          href="#services"
          className="flex items-center gap-2 hover:text-[#171717] transition-colors group cursor-pointer"
        >
          <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Scroll Down</span>
          <div className="w-7 h-7 rounded-full border border-[#E8E8E8] group-hover:border-[#171717] flex items-center justify-center transition-colors">
            <ArrowDown className="w-3 h-3 text-[#171717] group-hover:translate-y-0.5 transition-transform" />
          </div>
        </a>
      </motion.div>
    </section>
  );
};
