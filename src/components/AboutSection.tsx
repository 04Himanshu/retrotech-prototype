import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { STATS_DATA } from '../data/retrotechData';
import {
  Compass,
  Zap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export type PhilosophyMode = 'clarity' | 'speed' | 'confidence';

interface AboutSectionProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}

// =========================================================================
// 1. STATS IN-VIEW ANIMATED COUNTER (Clean & Professional)
// =========================================================================
const StatCounter: React.FC<{
  targetValue: string;
  label: string;
  index: number;
}> = ({ targetValue, label, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [displayNumber, setDisplayNumber] = useState(0);

  // Parse numerical part from string (e.g. "250+", "99.4%", "10+", "360°")
  const numericMatch = targetValue.match(/[\d.]+/);
  const numericTarget = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const suffix = targetValue.replace(/[\d.]+/, '');
  const isFloat = targetValue.includes('.');

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = isFloat
        ? parseFloat((ease * numericTarget).toFixed(1))
        : Math.floor(ease * numericTarget);

      setDisplayNumber(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayNumber(numericTarget);
      }
    };

    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, numericTarget, isFloat]);

  return (
    <div ref={ref} className="space-y-2">
      <span className="text-[10px] font-mono text-[#8C8C8C] uppercase tracking-widest block">
        0{index + 1}
      </span>

      <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#171717] font-mono leading-none">
        {displayNumber}
        {suffix}
      </div>

      <div className="text-xs font-medium text-[#737373] uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

// =========================================================================
// 2. MAIN PHILOSOPHY & ABOUT SECTION
// =========================================================================
export const AboutSection: React.FC<AboutSectionProps> = ({ onCursorChange }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  // Subtle Scroll Parallax Background Orbs
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxOrb1 = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const parallaxOrb2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const livePillars = [
    {
      id: 'end-to-end',
      icon: Compass,
      number: '01',
      title: 'End-to-End Solutions',
      desc: 'Comprehensive IT services from discovery and UI/UX design to robust web engineering, native mobile apps, and scalable cloud systems.',
      deliverables: ['Web & App Engineering', 'Cloud Architecture'],
    },
    {
      id: 'ai-automation',
      icon: Zap,
      number: '02',
      title: 'AI & Automation Excellence',
      desc: 'Modern AI workflows, conversational bots, automated WhatsApp pipelines, and intelligent CRM integrations that eliminate operational drag.',
      deliverables: ['Conversational Bots', 'Automated Pipelines'],
    },
    {
      id: 'business-growth',
      icon: Sparkles,
      number: '03',
      title: 'Business Growth Focus',
      desc: 'Data-driven digital marketing, technical SEO authority, and high-ROAS paid search campaigns engineered to drive sustainable revenue growth.',
      deliverables: ['Targeted ROAS Scaling', 'Technical SEO Dominance'],
    },
    {
      id: 'client-success',
      icon: ShieldCheck,
      number: '04',
      title: 'Client Success Strategy',
      desc: 'Dedicated technical squads, milestone transparency, SLA-backed maintenance, and clear communication every step of the development journey.',
      deliverables: ['Dedicated Squads', 'Proactive SLA Support'],
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-14 sm:py-20 md:py-24 bg-[#FFFFFF] border-b border-[#E8E8E8] relative overflow-hidden"
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: parallaxOrb1 }}
          className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-gradient-to-br from-[#353788]/4 via-[#8A8DF8]/3 to-transparent rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: parallaxOrb2 }}
          className="absolute top-1/2 -right-36 w-[460px] h-[460px] bg-gradient-to-tl from-[#353788]/4 via-[#8A8DF8]/3 to-transparent rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Subtle Section Entrance Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#353788]/30 to-transparent origin-left mb-6"
        />

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#353788]">
            About RetroTech Digital
          </span>
          <div className="w-8 h-[1px] bg-[#353788]/60" />
          <span className="text-[9.5px] tracking-widest uppercase text-[#737373] font-mono">
            360° IT &amp; Digital Solutions
          </span>
        </div>

        {/* Headline & Exact Live Website Value Proposition */}
        <div className="max-w-4xl mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tightest text-[#171717] leading-tight">
            Smart IT, AI and Marketing Solutions{' '}
            <span className="font-serif italic font-normal text-[#353788]">
              for Every Business.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-[#737373] max-w-3xl leading-relaxed">
            We are a 360° IT and Digital Solutions Company dedicated to empowering businesses in the digital era. We provide innovative services that help organizations streamline operations, enhance performance, and drive measurable results.
          </p>

          {/* Live Trust Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F5FB] border border-[#353788]/20 text-xs font-semibold text-[#353788]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Expertise
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F4EA] border border-[#10B981]/30 text-xs font-semibold text-[#006A43]">
              <Zap className="w-3.5 h-3.5" />
              Always Honest
            </span>
          </div>
        </div>

        {/* 4-Column Core Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {livePillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.id}
                onMouseEnter={() => onCursorChange?.('hover')}
                onMouseLeave={() => onCursorChange?.('default')}
                className="group p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8E8E8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#353788]/40 hover:shadow-[0_12px_36px_rgba(53,55,136,0.07)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Top Row */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono font-bold text-[#353788] bg-[#F4F5FB] px-2.5 py-0.5 rounded-full border border-[#353788]/15">
                      {pillar.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F7F7F5] border border-[#E8E8E8] text-[#353788] group-hover:bg-[#353788] group-hover:text-white transition-colors flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#171717] group-hover:text-[#353788] transition-colors leading-snug">
                    {pillar.title}
                  </h3>

                  {/* Body Description */}
                  <p className="mt-3 text-xs sm:text-[13px] text-[#737373] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                {/* Deliverables Footer */}
                <div className="pt-4 mt-5 border-t border-[#F0F0EE] flex flex-wrap gap-1.5 items-center">
                  {pillar.deliverables.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-[#F7F7F5] border border-[#E8E8E8] text-[9px] font-mono text-[#737373]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Metrics Benchmarks Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8 border-t border-[#E8E8E8]">
          {STATS_DATA.map((stat, idx) => (
            <StatCounter
              key={idx}
              targetValue={stat.value}
              label={stat.label}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
