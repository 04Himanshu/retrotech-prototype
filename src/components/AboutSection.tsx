import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { STATS_DATA } from '../data/retrotechData';
import {
  CheckCircle2,
  Compass,
  Layers,
  Zap,
  Sparkles,
  Cpu,
  Radio,
  Eye,
  Scan,
} from 'lucide-react';
export type PhilosophyMode = 'clarity' | 'speed' | 'confidence';

interface AboutSectionProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}

// =========================================================================
// 1. DIRECT DOM 3D TILT CONTAINER (Smooth 60-120 FPS, 0 React Re-renders)
// =========================================================================
const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}> = ({ children, className = '', glowColor = 'rgba(53, 55, 136, 0.35)', onCursorChange }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !innerRef.current) return;
    const rect = rectRef.current || cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    innerRef.current.style.transform = `perspective(900px) rotateX(${-yPct * 6}deg) rotateY(${xPct * 6}deg) translateZ(4px)`;

    if (glareRef.current) {
      glareRef.current.style.opacity = '0.28';
      glareRef.current.style.background = `radial-gradient(circle 260px at ${(xPct + 0.5) * 100}% ${(yPct + 0.5) * 100}%, ${glowColor}, transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    if (innerRef.current) {
      innerRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
    onCursorChange?.('default');
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ${className}`}
      style={{ perspective: '900px' }}
    >
      <div
        ref={innerRef}
        className="w-full h-full transition-transform duration-100 ease-out preserve-3d"
        style={{ willChange: 'transform' }}
      >
        {children}
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{ willChange: 'opacity, background' }}
        />
      </div>
    </div>
  );
};

// =========================================================================
// 2. LIVE EQUALIZER FREQUENCY WAVEFORM (Unique Audio-Visual Telemetry)
// =========================================================================
const EqualizerWaveform: React.FC<{ active: boolean; color?: string }> = ({
  active,
  color = '#353788',
}) => {
  return (
    <div className="flex items-end gap-1 h-5 select-none pointer-events-none">
      {[0.4, 0.8, 0.5, 1.0, 0.6, 0.9, 0.3].map((height, i) => (
        <motion.div
          key={i}
          animate={
            active
              ? {
                  scaleY: [height, 1.2 * height, 0.3 * height, height],
                  opacity: [0.6, 1, 0.5, 0.8],
                }
              : { scaleY: 0.3, opacity: 0.4 }
          }
          transition={{
            duration: 0.8 + i * 0.15,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="w-1 rounded-full origin-bottom"
          style={{ height: '100%', backgroundColor: color }}
        />
      ))}
    </div>
  );
};

// =========================================================================
// 3. STATS IN-VIEW COUNTER
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

    const duration = 1400; // ms
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
    <div ref={ref} className="space-y-2 group">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-[#737373] uppercase tracking-widest">
          METRIC 0{index + 1}
        </span>
        <EqualizerWaveform active={isInView} color="#353788" />
      </div>

      <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171717] font-mono leading-none">
        {displayNumber}
        {suffix}
      </div>

      <div className="text-xs font-semibold text-[#737373] uppercase tracking-wider group-hover:text-[#353788] transition-colors">
        {label}
      </div>
    </div>
  );
};

export const AboutSection: React.FC<AboutSectionProps> = ({ onCursorChange }) => {
  const [activePhilosophy, setActivePhilosophy] = useState<PhilosophyMode>('clarity');
  const [visionMode, setVisionMode] = useState<'optical' | 'blueprint'>('optical');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  // Scroll Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxOrb1 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const parallaxOrb2 = useTransform(scrollYProgress, [0, 1], [35, -35]);

  const pillars: {
    id: PhilosophyMode;
    icon: typeof Compass;
    number: string;
    title: string;
    desc: string;
    accent: string;
    badge: string;
  }[] = [
    {
      id: 'clarity',
      icon: Compass,
      number: '01',
      title: 'Business-First Architecture',
      desc: 'We diagnose your operating model, unit economics, and client journeys before writing a single line of architecture. Technology is our craft; enterprise growth is the objective.',
      accent: '#353788',
      badge: 'ARCHITECTURAL PRISM',
    },
    {
      id: 'speed',
      icon: Zap,
      number: '02',
      title: 'Reliable High-Velocity Tech',
      desc: 'Architected with rigorous security protocols, maintainable component patterns, sub-second latency, and dependable high-availability cloud infrastructure.',
      accent: '#06B6D4',
      badge: 'HYPER-VELOCITY STREAM',
    },
    {
      id: 'confidence',
      icon: Layers,
      number: '03',
      title: 'Built for Long-Term Growth',
      desc: 'Every system we deploy is modular and future-proofed, designed to adapt seamlessly as transaction volumes surge, teams expand, and new capabilities arise.',
      accent: '#F59E0B',
      badge: 'ENTERPRISE VAULT',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-[#FFFFFF] border-b border-[#E8E8E8] relative overflow-hidden"
    >
      {/* 1. VISUAL EFFECTS ATMOSPHERE: Ambient Orbs & Technical Blueprint Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: parallaxOrb1 }}
          className="absolute -top-32 -left-32 w-[460px] h-[460px] bg-gradient-to-br from-[#353788]/10 via-[#8A8DF8]/8 to-transparent rounded-full blur-[100px] animate-float-orb-1"
        />
        <motion.div
          style={{ y: parallaxOrb2 }}
          className="absolute top-1/2 -right-36 w-[520px] h-[520px] bg-gradient-to-tl from-[#06B6D4]/8 via-[#353788]/10 to-transparent rounded-full blur-[110px] animate-float-orb-2"
        />

        {/* Blueprint Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(232,232,232,0.45)_1px,transparent_1px),linear-gradient(to_bottom,rgba(232,232,232,0.45)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_85%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Entrance Scanline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#353788] to-transparent origin-left mb-6 opacity-30"
        />

        {/* Section Header Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-[#353788]">
              03 &bull; Agency Philosophy
            </span>
            <div className="w-10 h-[1px] bg-[#353788]/60" />
            <span className="text-[9.5px] tracking-widest uppercase text-[#737373] font-mono flex items-center gap-1.5">
              <span>Interactive Strategic Engine</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-[#737373]">
            <Radio className="w-3 h-3 text-[#353788] animate-pulse" />
            <span>ACTIVE FREQUENCY: BESPOKE ARCHITECTURE FRAMEWORK</span>
          </div>
        </div>

        {/* Oversized Headline Statement with Iridescent Animated Flow */}
        <div className="max-w-5xl mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-[#171717] leading-[1.06]">
            We make technology work with <br />
            <span className="font-serif italic font-normal bg-gradient-to-r from-[#171717] via-[#353788] via-[#8A8DF8] to-[#171717] bg-clip-text text-transparent animate-gradient-flow">
              uncompromising clarity, speed,
            </span>{' '}
            and measurable business confidence.
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-[#737373] max-w-2xl leading-relaxed">
            We fuse deep technological mastery with high-impact visual aesthetics, engineering software and marketing engines that command market respect.
          </p>
        </div>

        {/* 2. TWO-COLUMN STORYTELLING GRID: Interactive Pillars & Architectural Lab */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-10">
          {/* Left Column: Interactive Connected Pillars (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#F0F0EE]">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717]">
                Architectural Core Pillars
              </span>
              <span className="text-[10px] font-mono text-[#737373]">
                Select a pillar to explore strategic framework
              </span>
            </div>

            <div className="space-y-3 pt-1">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                const isSelected = activePhilosophy === pillar.id;

                return (
                  <div
                    key={pillar.id}
                    onMouseEnter={() => {
                      setActivePhilosophy(pillar.id);
                      onCursorChange?.('hover');
                    }}
                    onMouseLeave={() => onCursorChange?.('default')}
                    onClick={() => setActivePhilosophy(pillar.id)}
                    className={`p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-pointer relative overflow-hidden border ${
                      isSelected
                        ? 'bg-[#FFFFFF] border-[#353788] shadow-lg shadow-[#353788]/5 ring-2 ring-[#353788]/20'
                        : 'bg-[#F7F7F5] border-[#E8E8E8] hover:border-[#353788]/40 hover:bg-white'
                    }`}
                  >
                    {/* Active Accent Border Indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="activePillarAccent"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-[#353788]"
                      />
                    )}

                    <div className="flex items-start gap-4">
                      {/* Icon with Specular Glow */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#353788] text-white shadow-md shadow-[#353788]/20'
                            : 'bg-white border border-[#E8E8E8] text-[#353788]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-[#353788]">
                              {pillar.number}
                            </span>
                            <h3 className="text-sm sm:text-base font-bold text-[#171717]">
                              {pillar.title}
                            </h3>
                          </div>

                          <span
                            className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                              isSelected
                                ? 'bg-[#353788]/10 text-[#353788] border-[#353788]/30 font-bold'
                                : 'bg-[#E8E8E8]/50 text-[#737373] border-transparent'
                            }`}
                          >
                            {pillar.badge}
                          </span>
                        </div>

                        <p className="text-xs text-[#737373] leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Blueprint X-Ray Lab Asset (Cols 8-12) */}
          <div className="lg:col-span-5 space-y-4">
            <TiltCard
              glowColor="rgba(53, 55, 136, 0.35)"
              onCursorChange={onCursorChange}
              className="rounded-3xl overflow-hidden shadow-sm"
            >
              <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#E8E8E8] shadow-sm space-y-4 relative overflow-hidden">
                {/* Lab Card Header with Optical/Blueprint Scanner Mode Switch */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F0F0EE]">
                  <div className="flex items-center gap-2">
                    <Scan className="w-4 h-4 text-[#353788]" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#171717]">
                      Gurugram HQ Lab View
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-[#F7F7F5] p-0.5 rounded-full border border-[#E8E8E8]">
                    <button
                      onClick={() => setVisionMode('optical')}
                      className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold transition-all cursor-pointer ${
                        visionMode === 'optical'
                          ? 'bg-[#171717] text-white shadow-xs'
                          : 'text-[#737373] hover:text-[#171717]'
                      }`}
                    >
                      <Eye className="w-2.5 h-2.5 inline mr-1" />
                      Optical
                    </button>
                    <button
                      onClick={() => setVisionMode('blueprint')}
                      className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold transition-all cursor-pointer ${
                        visionMode === 'blueprint'
                          ? 'bg-[#353788] text-white shadow-xs'
                          : 'text-[#737373] hover:text-[#171717]'
                      }`}
                    >
                      <Cpu className="w-2.5 h-2.5 inline mr-1" />
                      X-Ray
                    </button>
                  </div>
                </div>

                {/* The Interactive Visual Viewport */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0A0C11] border border-[#E8E8E8] shadow-inner group">
                  <img
                    src="/assets/software-development-retrotech.jpg"
                    alt="RetroTech Digital Engineering Lab"
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      visionMode === 'blueprint'
                        ? 'filter invert hue-rotate-180 brightness-75 contrast-150 saturate-150'
                        : 'group-hover:scale-105'
                    }`}
                  />

                  {/* Blueprint HUD Overlay */}
                  {visionMode === 'blueprint' && (
                    <>
                      {/* Vertical Scanning Laser Beam Animation */}
                      <motion.div
                        animate={{ y: ['-100%', '300%'] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-[#06B6D4]/40 to-transparent pointer-events-none"
                      />

                      {/* HUD Grid & Crosshairs */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[9px] font-mono text-[#06B6D4] border border-[#06B6D4]/30">
                        LAT: 28.4595&deg;N &bull; LNG: 77.0266&deg;E
                      </div>

                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[9px] font-mono text-emerald-400 border border-emerald-500/30">
                        SYS: 99.99% ONLINE
                      </div>
                    </>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono">
                    <span className="font-bold">DLF Phase 1, Arjun Marg &bull; Strategy Lab</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#8A8DF8]" />
                  </div>
                </div>

                {/* Bottom Assurance Card */}
                <div className="p-3 rounded-xl bg-[#F4F5FB] border border-[#353788]/20 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#353788] shrink-0" />
                    <span className="text-[#171717] font-medium text-[11.5px]">
                      Direct architectural access throughout lifecycle.
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#353788] font-bold shrink-0">
                    SLA BACKED
                  </span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* 4. HIGH-DENSITY METRIC BENCHMARKS STRIP */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-[#E8E8E8]">
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
