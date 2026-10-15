import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { COMPANY_INFO } from '../data/retrotechData';
import {
  ShieldCheck,
  Check,
  Layers,
  GitBranch,
  Zap,
  Server,
  Award,
  Sparkles,
  Activity,
  RotateCw,
} from 'lucide-react';

interface WhyUsPillarsProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}

// Top Six Reasons to Trust Our IT Expertise directly matching https://www.retrotechdigital.com/
const PILLARS_CONFIG = [
  {
    number: '01',
    title: 'Experienced IT Professionals',
    desc: 'Our skilled developers, designers, and technology experts deliver reliable solutions using proven industry practices and modern standards.',
    footerLeftType: 'dot',
    footerLeftText: '100% Senior Squads',
    footerRightText: 'Proven Practices',
    iconType: 'terminal',
    // Back Face Details
    backSubtitle: 'Technical Rigor & Staffing',
    backPoints: [
      'Senior engineers with 8+ years avg tenure',
      'Dual-architect peer reviews on all pull requests',
      'Strict TypeScript, ESLint & SOC-2 compliance',
      'Zero outsourced contractors or junior handoffs',
    ],
    backBadge: '100% In-House Engineers',
    backMetric: 'Production-Grade SLA',
  },
  {
    number: '02',
    title: 'Customised Business Solutions',
    desc: 'We create tailored websites, applications, software, and digital solutions that match your unique business processes and objectives.',
    footerLeftType: 'git',
    footerLeftText: 'Tailored Solutions',
    footerRightText: 'Zero Bloat',
    iconType: 'check',
    // Back Face Details
    backSubtitle: 'Custom Business Fit',
    backPoints: [
      'Custom architecture tailored to your workflows',
      'Live sprint demos & working code every 7 days',
      'Full GitHub repository access from sprint 1',
      'Uncensored burn rates & clear timesheets',
    ],
    backBadge: '100% Custom Engineering',
    backMetric: 'Tailored Workflows',
  },
  {
    number: '03',
    title: 'On-Time Project Delivery',
    desc: 'We use the latest tools, frameworks, and technologies to build secure, high-performing, and future-ready digital products on schedule.',
    footerLeftType: 'layers',
    footerLeftText: 'Modern Stack',
    footerRightText: 'On-Time Delivery',
    iconType: 'layers',
    // Back Face Details
    backSubtitle: 'Future-Ready Tech Stack',
    backPoints: [
      'Sub-second Core Web Vitals optimization',
      'Strict milestone tracking and release dates',
      'Architected for 10x traffic concurrency bursts',
      'Full telemetry & attribution data modeling',
    ],
    backBadge: 'Modern Frameworks',
    backMetric: '99.4% On-Schedule',
  },
  {
    number: '04',
    title: 'Transparent Communication',
    desc: 'We maintain clear communication, transparent sprint processes, and timely milestone demos throughout every stage of your project.',
    footerLeftType: 'zap',
    footerLeftText: 'Open Governance',
    footerRightText: 'Regular Demos',
    iconType: 'zap',
    // Back Face Details
    backSubtitle: 'Predictable Sprint Velocity',
    backPoints: [
      'Direct Slack & WhatsApp sync with lead devs',
      'Automated CI/CD pipelines & staging sandboxes',
      'Blue/green zero-downtime production rollouts',
      'Automated regression & end-to-end testing',
    ],
    backBadge: 'Transparent Reporting',
    backMetric: 'Weekly Milestones',
  },
  {
    number: '05',
    title: 'Scalable & Secure Technologies',
    desc: 'Every solution is carefully designed, developed, tested, and optimized to provide an excellent user experience and enterprise stability.',
    footerLeftType: 'sparkles',
    footerLeftText: 'Enterprise Security',
    footerRightText: 'Optimal UX',
    iconType: 'award',
    // Back Face Details
    backSubtitle: 'Single-Squad Execution',
    backPoints: [
      'UI/UX wireframes, design systems & micro-interactions',
      'Full-stack Next.js, mobile apps & custom SaaS',
      'Cloud DevOps, Kubernetes clusters & security',
      'Technical SEO, Google Ads & Meta conversion campaigns',
    ],
    backBadge: 'Enterprise Stability',
    backMetric: '99.98% Core Uptime',
  },
  {
    number: '06',
    title: 'Dedicated Post-Launch Support',
    desc: 'We provide cost-effective IT services and SLA-backed maintenance that can easily scale and adapt as your business continues to grow.',
    footerLeftType: 'dot',
    footerLeftText: 'Continuous Care',
    footerRightText: 'Scalable Support',
    iconType: 'server',
    // Back Face Details
    backSubtitle: 'Enterprise SLA & Active Care',
    backPoints: [
      'Guaranteed <15 minute critical incident response',
      'Automated daily encrypted database backups',
      '24/7 Datadog/CloudWatch uptime alerts & telemetry',
      'Monthly security patching & framework dependency upgrades',
    ],
    backBadge: '24/7 Proactive Care',
    backMetric: '<15m Incident SLA',
  },
];

interface PillarFeatureCardProps {
  pillar: (typeof PILLARS_CONFIG)[0];
  index: number;
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}

const PillarFeatureCard: React.FC<PillarFeatureCardProps> = ({ pillar, index, onCursorChange }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Active / Featured state specifically for Card 01
  const isActive = index === 0;

  // The card flips on hover (or click for touch devices/permanent view)
  const isCardFlipped = isHovered || isFlipped;

  const handleCardMouseEnter = () => {
    setIsHovered(true);
    onCursorChange?.('hover', 'FLIP');
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
    setIsFlipped(false);
    onCursorChange?.('default');
  };

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  // Render top right circular icon
  const renderTopIcon = () => {
    switch (pillar.iconType) {
      case 'terminal':
        return <span className="font-mono text-xs font-bold text-[#353788]">&gt;_</span>;
      case 'check':
        return <Check className="w-3.5 h-3.5 text-[#353788]" />;
      case 'layers':
        return <Layers className="w-3.5 h-3.5 text-[#353788]" />;
      case 'zap':
        return <Zap className="w-3.5 h-3.5 text-[#353788]" />;
      case 'award':
        return <Award className="w-3.5 h-3.5 text-[#353788]" />;
      case 'server':
        return <Server className="w-3.5 h-3.5 text-[#353788]" />;
      default:
        return <Check className="w-3.5 h-3.5 text-[#353788]" />;
    }
  };

  // Render footer left icon
  const renderFooterLeftIcon = () => {
    switch (pillar.footerLeftType) {
      case 'dot':
        return <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />;
      case 'git':
        return <GitBranch className="w-3.5 h-3.5 text-[#353788]" />;
      case 'layers':
        return <Layers className="w-3.5 h-3.5 text-[#353788]" />;
      case 'zap':
        return <Zap className="w-3.5 h-3.5 text-amber-500" />;
      case 'sparkles':
        return <Sparkles className="w-3.5 h-3.5 text-[#353788]" />;
      default:
        return <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
      onClick={handleCardClick}
      className={`pillar-card-wrapper relative h-[400px] sm:h-[420px] rounded-3xl cursor-pointer select-none transition-shadow duration-300 ${
        isActive
          ? 'z-20 scale-105 shadow-[0_20px_40px_-10px_rgba(59,130,246,0.22)]'
          : 'z-10 hover:shadow-[0_20px_35px_-10px_rgba(53,55,136,0.18)] shadow-xs'
      }`}
      style={{ perspective: 1200 }}
    >
      {/* Active Card 01: Rotating Conic Gradient Border Frame on the Outer Card */}
      {isActive && (
        <div className="absolute -inset-[2px] rounded-[26px] overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-[120%] bg-[conic-gradient(from_0deg,#353788,#60a5fa,#818cf8,#353788)] opacity-85"
          />
        </div>
      )}

      {/* The 3D Rotating Flipper: Bounded strictly between 0deg (Front) and 180deg (Back) */}
      <div
        ref={cardRef}
        style={{
          transformStyle: 'preserve-3d',
          transform: isCardFlipped ? 'rotateY(180deg) translateY(-6px)' : 'rotateY(0deg) translateY(0px)',
          transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative w-full h-full rounded-3xl pointer-events-none"
      >

        {/* ============================================================== */}
        {/* FRONT FACE OF CARD (Exact Blueprint Layout from Reference Image) */}
        {/* ============================================================== */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          className={`absolute inset-0 z-10 w-full h-full p-7 sm:p-8 rounded-[23px] bg-white border border-[#E8E8E8] flex flex-col justify-between overflow-hidden group ${
            isActive ? 'border-transparent' : 'hover:border-[#353788]/30'
          }`}
        >
          {/* Faint Large Background Watermark Number */}
          <div
            className={`pointer-events-none absolute -bottom-5 -right-2 text-8xl sm:text-9xl font-mono font-black select-none tracking-tighter ${
              isActive
                ? 'text-[#353788]/[0.08]'
                : 'text-[#171717]/[0.035] group-hover:text-[#353788]/[0.06] transition-colors'
            }`}
          >
            {pillar.number}
          </div>

          {/* Top Section */}
          <div className="relative z-10">
            {/* Top Row: Number, MONOSPACE PILLAR Tag & Floating Icon */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span
                  className={`text-2xl sm:text-3xl font-mono font-black ${
                    isActive ? 'text-[#212457]' : 'text-[#353788]'
                  }`}
                >
                  {pillar.number}
                </span>

                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#737373] bg-[#F7F7F5] border border-[#E8E8E8] px-2.5 py-0.5 rounded-full shadow-xs">
                  PILLAR
                </span>
              </div>

              {/* Floating Top-Right Icon */}
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{
                  duration: 3 + index * 0.35,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-9 h-9 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center shadow-xs group-hover:border-[#353788]/50 group-hover:shadow-sm transition-colors"
              >
                {renderTopIcon()}
              </motion.div>
            </div>

            {/* Title & Description */}
            <h3
              className={`text-xl font-bold mb-3 tracking-tight ${
                isActive ? 'text-[#212457]' : 'text-[#171717] group-hover:text-[#353788]'
              } transition-colors`}
            >
              {pillar.title}
            </h3>

            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isActive ? 'text-[#353788]/85 font-medium' : 'text-[#737373]'
              }`}
            >
              {pillar.desc}
            </p>
          </div>

          {/* Footer Stats Row with Separator & Flip Hint */}
          <div className="relative z-10 mt-6 pt-5 border-t border-[#E8E8E8] flex items-center justify-between text-[11px] font-mono text-[#737373]">
            <div className="flex items-center gap-2">
              {renderFooterLeftIcon()}
              <span
                className={`font-semibold ${
                  isActive ? 'text-[#212457]' : 'text-[#171717]'
                }`}
              >
                {pillar.footerLeftText}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#353788] font-bold">
                {pillar.footerRightText}
              </span>
              <RotateCw className="w-3 h-3 text-[#737373] group-hover:text-[#353788] group-hover:rotate-180 transition-all duration-500" />
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BACK FACE OF CARD (Aligned with Clean Light Website Theme)       */}
        {/* ============================================================== */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className={`absolute inset-0 z-10 w-full h-full p-7 sm:p-8 rounded-[23px] bg-white border border-[#E8E8E8] shadow-[0_12px_36px_rgba(53,55,136,0.08)] flex flex-col justify-between overflow-hidden ${
            isActive ? 'border-transparent' : 'border-[#353788]/25'
          }`}
        >
          {/* Subtle Ambient Top Border Highlight */}
          <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#353788] to-transparent opacity-80" />

          {/* Faint Large Background Watermark Number */}
          <div className="pointer-events-none absolute -bottom-5 -right-2 text-8xl sm:text-9xl font-mono font-black select-none tracking-tighter text-[#353788]/[0.05]">
            {pillar.number}
          </div>

          {/* Top Row: Spec Tag & Flip Back Indicator */}
          <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl sm:text-3xl font-mono font-black text-[#353788]">
                {pillar.number}
              </span>
              <span className="text-[9.5px] font-mono font-bold tracking-wider uppercase text-[#353788] bg-[#F4F5FB] border border-[#353788]/15 px-2.5 py-0.5 rounded-full">
                VERIFIED SPEC
              </span>
            </div>

            <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#737373] bg-[#F7F7F5] border border-[#E8E8E8] px-2.5 py-1 rounded-full">
              <RotateCw className="w-2.5 h-2.5 text-[#353788]" />
              <span>Flip</span>
            </span>
          </div>

          {/* Center Content: Detailed Technical Points */}
          <div className="relative z-10 flex-1 flex flex-col justify-center my-1">
            <h4 className="text-base sm:text-lg font-bold text-[#171717] mb-3 tracking-tight">
              {pillar.backSubtitle}
            </h4>

            <ul className="space-y-2 text-xs sm:text-[13px] text-[#525252] leading-snug">
              {pillar.backPoints.map((point, ptIdx) => (
                <li key={ptIdx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#353788] mt-1.5 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Footer: SLA & Proof Badge */}
          <div className="relative z-10 pt-4 border-t border-[#F0F0EE] flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-2 text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{pillar.backBadge}</span>
            </div>

            <span className="text-[#353788] font-bold">
              {pillar.backMetric}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper to get tailored brand styling per partner
const getPartnerTheme = (name: string) => {
  if (name.includes('Google Ads')) {
    return {
      gradient: 'from-[#4285F4]/[0.08] via-white to-white',
      border: 'border-[#4285F4]/30 hover:border-[#4285F4]',
      text: 'text-[#1a73e8]',
      accentBar: 'linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853)',
    };
  }
  if (name.includes('Meta')) {
    return {
      gradient: 'from-[#0668E1]/[0.08] via-white to-white',
      border: 'border-[#0668E1]/30 hover:border-[#0668E1]',
      text: 'text-[#0668E1]',
      accentBar: '#0668E1',
    };
  }
  if (name.includes('Microsoft')) {
    return {
      gradient: 'from-[#00A4EF]/[0.08] via-white to-white',
      border: 'border-[#00A4EF]/30 hover:border-[#00A4EF]',
      text: 'text-[#0078d4]',
      accentBar: 'linear-gradient(90deg, #F25022, #7FBA00, #00A4EF, #FFB900)',
    };
  }
  // Google 4.9★ Rating
  return {
    gradient: 'from-[#FBBC05]/[0.12] via-white to-white',
    border: 'border-[#FBBC05]/45 hover:border-[#FBBC05]',
    text: 'text-[#b45309]',
    accentBar: 'linear-gradient(90deg, #FBBC05, #EA4335, #4285F4)',
  };
};

// Interactive 3D Holographic Partner Badge Component for Infinite Marquee
interface PartnerCardProps {
  acc: (typeof COMPANY_INFO.accreditations)[0];
  index?: number;
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}

const Partner3DCard: React.FC<PartnerCardProps> = ({ acc, onCursorChange }) => {
  const theme = getPartnerTheme(acc.name);

  return (
    <div
      className={`relative bg-gradient-to-b ${theme.gradient} p-4 sm:p-5 rounded-2xl border ${theme.border} flex flex-col items-center justify-between w-[160px] sm:w-[175px] h-[120px] sm:h-[125px] shrink-0 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden select-none cursor-pointer`}
      onMouseEnter={() => onCursorChange?.('hover')}
      onMouseLeave={() => onCursorChange?.('default')}
    >
      {/* Top Authentic Brand Accent Line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] opacity-85 group-hover:opacity-100 transition-opacity"
        style={{ background: theme.accentBar }}
      />

      {/* Holographic Iridescent Sheen on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Diagonal Light Glint */}
      <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/60 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

      {/* Full Vibrant Color Logo (Grayscale Removed) */}
      <div className="flex flex-col items-center justify-center flex-1 w-full relative z-10 py-1">
        <img
          src={acc.logo}
          alt={acc.name}
          className="max-h-9 sm:max-h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Subtitle in Brand Specific Color */}
      <span className={`text-[10px] font-mono ${theme.text} text-center font-bold leading-tight w-full relative z-10 pt-1.5 border-t border-black/[0.05]`}>
        {acc.name}
      </span>
    </div>
  );
};

export const WhyUsPillars: React.FC<WhyUsPillarsProps> = ({ onCursorChange }) => {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const mousePendingRef = useRef(false);

  // Mouse-tracking spotlight coordinates across the grid container with RAF throttling
  const handleGridMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridContainerRef.current || mousePendingRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    mousePendingRef.current = true;

    requestAnimationFrame(() => {
      mousePendingRef.current = false;
      if (!gridContainerRef.current) return;
      const cards = gridContainerRef.current.querySelectorAll<HTMLDivElement>('.pillar-card-wrapper');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  };

  return (
    <section id="why-us" className="py-10 sm:py-12 md:py-14 bg-[#FFFFFF] border-b border-[#E8E8E8] relative overflow-hidden">
      {/* Clean Technical Blueprint Aesthetic with Subtle Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Subtle Luminous Radial Depth behind section */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-[#353788]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section 05 Top Showcase: Narrative Headline & Verification Highlights */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-7 sm:mb-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-3.5"
            >
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#353788]">
                Why Choose Us
              </span>
              <div className="w-10 h-[1px] bg-[#353788]/60" />
              <span className="text-[10px] font-mono text-[#737373]">
                Verified Trust Architecture
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tightest text-[#171717] leading-[1.1] mb-4"
            >
              Top Six Reasons to <br />
              <span className="font-serif italic font-normal text-[#353788]">
                Trust Our IT Expertise
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base text-[#737373] leading-relaxed"
            >
              Empower your business with reliable, secure, and scalable IT solutions tailored to your unique goals and requirements.
            </motion.p>
          </div>

          {/* Technical Verification Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full lg:w-auto shrink-0"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E8] shadow-xs min-w-[150px]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-base font-mono font-bold text-[#171717]">99.4%</span>
              </div>
              <span className="text-xs text-[#737373] block leading-tight font-medium">
                Client Retention
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E8] shadow-xs min-w-[150px]">
              <div className="flex items-center gap-2 mb-1.5">
                <Activity className="w-3.5 h-3.5 text-[#353788]" />
                <span className="text-base font-mono font-bold text-[#171717]">99.98%</span>
              </div>
              <span className="text-xs text-[#737373] block leading-tight font-medium">
                Uptime &amp; SLA
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E8] shadow-xs min-w-[150px]">
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-base font-mono font-bold text-[#171717]">Zero-Debt</span>
              </div>
              <span className="text-xs text-[#737373] block leading-tight font-medium">
                Audited Codebases
              </span>
            </div>
          </motion.div>
        </div>

        {/* 3x2 Grid of 3D Flippable Feature Cards (Linktree Style) */}
        <div
          ref={gridContainerRef}
          onMouseMove={handleGridMouseMove}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12 items-stretch"
        >
          {PILLARS_CONFIG.map((pillar, idx) => (
            <PillarFeatureCard
              key={pillar.number}
              pillar={pillar}
              index={idx}
              onCursorChange={onCursorChange}
            />
          ))}
        </div>

        {/* Accreditations & Verified Partnerships Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#F7F7F5] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E8E8E8] overflow-hidden"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#353788]/[0.03] rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left Content: Fully Static & Stationary */}
            <div className="space-y-3 text-center lg:text-left max-w-md lg:max-w-lg shrink-0">
              <span className="text-xs font-bold uppercase tracking-widest text-[#353788] flex items-center justify-center lg:justify-start gap-2">
                <ShieldCheck className="w-4 h-4" />
                Verified Ecosystem Partners
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-[#171717] tracking-tight">
                Industry Recognition &amp; Platform Certifications
              </h3>
              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                Direct access to top-tier algorithmic support, beta features, and enterprise partner frameworks across major global cloud and advertising platforms.
              </p>
            </div>

            {/* Right: Only Cards Scroll From Right to Left (Continuous Infinite Loop) */}
            <div className="w-full lg:w-[500px] xl:w-[580px] overflow-hidden relative select-none [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] py-2">
              <div className="flex whitespace-nowrap animate-partner-marquee hover:[animation-play-state:paused] cursor-pointer">
                {/* Track Loop 1 */}
                <div className="flex items-center gap-4 shrink-0 pr-4">
                  {COMPANY_INFO.accreditations.map((acc, idx) => (
                    <Partner3DCard
                      key={`p1-${idx}`}
                      acc={acc}
                      onCursorChange={onCursorChange}
                    />
                  ))}
                </div>
                {/* Track Loop 2 */}
                <div className="flex items-center gap-4 shrink-0 pr-4" aria-hidden="true">
                  {COMPANY_INFO.accreditations.map((acc, idx) => (
                    <Partner3DCard
                      key={`p2-${idx}`}
                      acc={acc}
                      onCursorChange={onCursorChange}
                    />
                  ))}
                </div>
                {/* Track Loop 3 */}
                <div className="flex items-center gap-4 shrink-0 pr-4" aria-hidden="true">
                  {COMPANY_INFO.accreditations.map((acc, idx) => (
                    <Partner3DCard
                      key={`p3-${idx}`}
                      acc={acc}
                      onCursorChange={onCursorChange}
                    />
                  ))}
                </div>
                {/* Track Loop 4 */}
                <div className="flex items-center gap-4 shrink-0 pr-4" aria-hidden="true">
                  {COMPANY_INFO.accreditations.map((acc, idx) => (
                    <Partner3DCard
                      key={`p4-${idx}`}
                      acc={acc}
                      onCursorChange={onCursorChange}
                    />
                  ))}
                </div>
              </div>

              <style>{`
                @keyframes partnerMarquee {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-50%); }
                }
                .animate-partner-marquee {
                  display: flex;
                  width: max-content;
                  animation: partnerMarquee 24s linear infinite;
                }
              `}</style>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
