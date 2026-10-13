import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { FAQS_DATA, COMPANY_INFO } from '../data/retrotechData';
import {
  ChevronDown,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Activity,
  Layers,
  Send,
} from 'lucide-react';

interface FAQSectionProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
  onOpenConsultation?: () => void;
}

interface EnrichedFAQItem {
  id: string;
  category: 'Architecture' | 'Delivery' | 'Support' | 'Onboarding';
  question: string;
  answer: string;
  tag: string;
  spec: string;
}

const ENRICHED_FAQS: EnrichedFAQItem[] = [
  {
    id: 'faq-1',
    category: 'Architecture',
    question: FAQS_DATA[0]?.question || 'What IT and digital services does RetroTech Digital provide?',
    answer: FAQS_DATA[0]?.answer || 'RetroTech Digital delivers complete end-to-end IT and marketing solutions including bespoke web development, native and hybrid mobile applications, custom SaaS platforms, CRM and ERPNext integrations, UI/UX design, technical SEO, performance advertising, and round-the-clock managed cloud support.',
    tag: 'Full-Stack Ecosystem',
    spec: 'NEXT.JS 15 • REACT NATIVE • PYTHON AI • ERPNEXT • AWS',
  },
  {
    id: 'faq-2',
    category: 'Architecture',
    question: FAQS_DATA[1]?.question || 'Do you build custom solutions or use off-the-shelf templates?',
    answer: FAQS_DATA[1]?.answer || 'Every digital flagship and application we craft is 100% custom-built to match your unique brand identity, technical requirements, and operational workflows. We avoid generic templates to guarantee optimal performance, security, and scalability.',
    tag: 'Bespoke Engineering',
    spec: 'CUSTOM CODEBASE • ZERO BLOAT • 100/100 LIGHTHOUSE',
  },
  {
    id: 'faq-3',
    category: 'Delivery',
    question: FAQS_DATA[2]?.question || 'How long does it typically take to complete an enterprise project?',
    answer: FAQS_DATA[2]?.answer || 'Timelines depend on scope and complexity. A bespoke corporate web application typically spans 4 to 8 weeks, while comprehensive mobile apps or enterprise SaaS platforms require 10 to 16 weeks, delivered through structured two-week agile milestones.',
    tag: 'Agile Milestones',
    spec: '2-WEEK SPRINTS • CI/CD AUTOMATION • SPRINT DEMOS',
  },
  {
    id: 'faq-4',
    category: 'Support',
    question: FAQS_DATA[3]?.question || 'Do you provide dedicated maintenance and support after launch?',
    answer: FAQS_DATA[3]?.answer || 'Yes, we offer comprehensive SLA-backed post-launch support programs covering automated backups, continuous security updates, infrastructure monitoring, and feature iteration so your software scales effortlessly as your business grows.',
    tag: 'Enterprise SLA',
    spec: '24/7 SRE MONITORING • 99.99% UPTIME • DEDICATED POD',
  },
  {
    id: 'faq-5',
    category: 'Onboarding',
    question: FAQS_DATA[4]?.question || 'How do we kick off a collaboration with RetroTech Digital?',
    answer: FAQS_DATA[4]?.answer || 'Simply submit your brief through our consultation form or reach out via WhatsApp (+91-9910836538). Our lead technical consultants will schedule an introductory discovery session within 24 hours to review your requirements and outline a structured project roadmap.',
    tag: 'Discovery Protocol',
    spec: 'MUTUAL NDA • 24H ARCHITECT REVIEW • FIXED SCOPE ROADMAP',
  },
];

// =========================================================================
// 1. COMPACT ANIMATED COUNTER (Zero-Waste Vertical Height)
// =========================================================================
const AnimatedCounter: React.FC<{
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
}> = ({ target, prefix = '', suffix = '', label, sub, icon }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200; // ms
    const startTime = performance.now();

    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeProgress * target);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(target);
      }
    };

    const rafId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target]);

  return (
    <div
      ref={ref}
      className="p-3 sm:p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E8E8E8] shadow-sm hover:border-[#353788]/40 transition-all duration-200 relative overflow-hidden group"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9.5px] font-mono font-bold tracking-widest uppercase text-[#737373]">
          {label}
        </span>
        <div className="w-5 h-5 rounded-full bg-[#F7F7F5] border border-[#E8E8E8] flex items-center justify-center text-[#353788]">
          {icon}
        </div>
      </div>

      <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#171717] font-mono leading-tight">
        {prefix}
        {count}
        {suffix}
      </div>

      <p className="text-[10.5px] text-[#737373] leading-tight font-sans truncate mt-0.5">{sub}</p>
    </div>
  );
};

// =========================================================================
// 2. 3D HARDWARE-ACCELERATED TILT CARD (0 React re-renders on mousemove)
// =========================================================================
const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}> = ({ children, className = '', glowColor = 'rgba(53, 55, 136, 0.4)', onCursorChange }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !innerRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    innerRef.current.style.transform = `perspective(800px) rotateX(${-yPct * 5}deg) rotateY(${xPct * 5}deg) translateZ(3px)`;

    if (glareRef.current) {
      glareRef.current.style.opacity = '0.25';
      glareRef.current.style.background = `radial-gradient(circle 220px at ${(xPct + 0.5) * 100}% ${(yPct + 0.5) * 100}%, ${glowColor}, transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    if (innerRef.current) {
      innerRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
    onCursorChange?.('default');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ${className}`}
      style={{ perspective: '800px' }}
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
// 3. 3D FLOATING SHAPE
// =========================================================================
const Floating3DCube: React.FC = () => {
  return (
    <div className="w-12 h-12 perspective-800 pointer-events-none select-none">
      <div className="w-full h-full preserve-3d animate-float-cube relative">
        <div className="absolute inset-0 bg-[#353788]/10 border border-[#353788]/30 backdrop-blur-sm transform translate-z-6 rounded-md flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-[#353788]/60" />
        </div>
        <div className="absolute inset-0 bg-[#8A8DF8]/10 border border-[#8A8DF8]/20 transform -translate-z-6 rotate-y-180 rounded-md" />
        <div className="absolute inset-0 bg-[#06B6D4]/10 border border-[#06B6D4]/20 transform -translate-x-6 rotate-y-90 rounded-md" />
        <div className="absolute inset-0 bg-[#353788]/10 border border-[#353788]/20 transform translate-x-6 -rotate-y-90 rounded-md" />
        <div className="absolute inset-0 bg-[#8A8DF8]/10 border border-[#8A8DF8]/20 transform -translate-y-6 rotate-x-90 rounded-md" />
        <div className="absolute inset-0 bg-[#171717]/10 border border-[#171717]/15 transform translate-y-6 -rotate-x-90 rounded-md" />
      </div>
    </div>
  );
};

// =========================================================================
// 4. MAIN FAQ SECTION: Balanced 2-Column Grid (Zero Left Voids, Zero Gap Waste)
// =========================================================================
export const FAQSection: React.FC<FAQSectionProps> = ({ onCursorChange, onOpenConsultation }) => {
  const [openId, setOpenId] = useState<string>('faq-1');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-40px' });

  // Scroll Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxOrb1 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const parallaxOrb2 = useTransform(scrollYProgress, [0, 1], [25, -25]);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  // Divide into balanced columns so both left and right have equal height
  const col1Faqs = ENRICHED_FAQS.slice(0, 3); // 3 items: faq-1, faq-2, faq-3
  const col2Faqs = ENRICHED_FAQS.slice(3, 5); // 2 items: faq-4, faq-5 + 1 Contact Card = 3 items total!

  const renderFaqCard = (faq: EnrichedFAQItem, originalIdx: number) => {
    const isOpen = openId === faq.id;

    return (
      <motion.div
        key={faq.id}
        id={faq.id}
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: originalIdx * 0.03 }}
        style={{ perspective: '800px' }}
        className={`rounded-2xl transition-all duration-200 overflow-hidden border ${
          isOpen
            ? 'bg-[#FFFFFF] border-[#353788] shadow-md shadow-[#353788]/5 ring-1 ring-[#353788]/20'
            : 'bg-[#FFFFFF] border-[#E8E8E8] hover:border-[#171717]/40 shadow-sm'
        }`}
      >
        {/* Question Header Bar */}
        <div
          onClick={() => toggleFAQ(faq.id)}
          onMouseEnter={() => onCursorChange?.('hover')}
          onMouseLeave={() => onCursorChange?.('default')}
          className="p-3.5 sm:p-4 cursor-pointer select-none flex items-start justify-between gap-3 group"
        >
          <div className="flex items-start gap-2.5">
            <span
              className={`font-mono text-xs font-bold pt-0.5 transition-colors ${
                isOpen ? 'text-[#353788]' : 'text-[#A3A3A3] group-hover:text-[#171717]'
              }`}
            >
              0{originalIdx + 1}
            </span>

            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded-full bg-[#F7F7F5] border border-[#E8E8E8] text-[8.5px] font-mono uppercase font-bold text-[#737373]">
                {faq.tag}
              </span>

              <h3
                className={`text-xs sm:text-sm font-bold transition-colors leading-snug ${
                  isOpen ? 'text-[#353788]' : 'text-[#171717] group-hover:text-[#353788]'
                }`}
              >
                {faq.question}
              </h3>
            </div>
          </div>

          <div
            className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
              isOpen
                ? 'rotate-180 bg-[#353788] text-white border-[#353788] shadow-sm shadow-[#353788]/20'
                : 'border-[#E8E8E8] text-[#171717] group-hover:border-[#171717] bg-[#FAFAF8]'
            }`}
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Smooth 3D Entrance Animated Accordion Body */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, rotateX: -3 }}
              animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
              exit={{ opacity: 0, height: 0, rotateX: -3 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden origin-top"
            >
              <div className="px-3.5 pb-4 sm:px-4 sm:pb-4 pt-0.5 border-t border-[#F0F0EE]">
                <p className="text-xs text-[#4A4A4A] leading-relaxed mb-2.5">
                  {faq.answer}
                </p>

                <div className="p-2 rounded-lg bg-[#F7F7F5] border border-[#E8E8E8] flex items-center justify-between gap-2 text-[9.5px] font-mono text-[#737373]">
                  <div className="flex items-center gap-1.5 truncate">
                    <Sparkles className="w-3 h-3 text-[#353788] shrink-0" />
                    <span className="truncate">{faq.spec}</span>
                  </div>
                  <span className="shrink-0 text-[#10B981] font-bold">VERIFIED</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-[#FAFAF8] border-b border-[#E8E8E8] relative"
    >
      {/* 1. BACKGROUND: Floating Ambient Orbs & Subtle Grid (Contained inside absolute layer) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: parallaxOrb1 }}
          className="absolute -top-20 -left-20 w-[360px] h-[360px] bg-gradient-to-br from-[#353788]/10 via-[#8A8DF8]/6 to-transparent rounded-full blur-[90px] animate-float-orb-1"
        />
        <motion.div
          style={{ y: parallaxOrb2 }}
          className="absolute top-1/2 -right-24 w-[400px] h-[400px] bg-gradient-to-tl from-[#06B6D4]/6 via-[#353788]/8 to-transparent rounded-full blur-[100px] animate-float-orb-2"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(232,232,232,0.45)_1px,transparent_1px),linear-gradient(to_bottom,rgba(232,232,232,0.45)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_85%)]" />
      </div>

      {/* Floating 3D Geometric Decor */}
      <div className="hidden xl:block absolute top-20 right-10 z-0 pointer-events-none">
        <Floating3DCube />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Subtle Scanline Reveal */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#353788] to-transparent origin-left mb-6 opacity-30"
        />

        {/* Section Header: Compact & Elegant */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-[#353788]">
                06 &bull; FAQs
              </span>
              <div className="w-8 h-[1px] bg-[#353788]/60" />
              <span className="text-[9.5px] tracking-widest uppercase text-[#737373] font-mono flex items-center gap-1">
                <span>Enterprise Knowledge Base</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tightest leading-[1.1]">
              <span className="text-[#171717]">Frequently Asked </span>
              <span className="font-serif italic font-normal bg-gradient-to-r from-[#171717] via-[#353788] via-[#8A8DF8] to-[#171717] bg-clip-text text-transparent animate-gradient-flow">
                Questions &amp; Protocols
              </span>
            </h2>
          </div>

          <p className="text-xs text-[#737373] leading-relaxed max-w-sm md:text-right">
            Transparent answers regarding development timelines, bespoke architecture, dedicated post-deployment SLAs, and collaboration kickoff.
          </p>
        </div>

        {/* 2. COMPACT STATS STRIP: Horizontal Metric Bar (Minimal Height) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6 sm:mb-8">
          <AnimatedCounter
            target={150}
            suffix="+"
            label="Deployments"
            sub="Enterprise flagships in production"
            icon={<ShieldCheck className="w-3 h-3" />}
          />
          <AnimatedCounter
            target={98}
            suffix="%"
            label="Satisfaction"
            sub="Client retention & renewal rate"
            icon={<Activity className="w-3 h-3" />}
          />
          <AnimatedCounter
            target={24}
            suffix="/7"
            label="SRE Monitoring"
            sub="Continuous infrastructure guard"
            icon={<Clock className="w-3 h-3" />}
          />
          <AnimatedCounter
            target={2}
            prefix="<"
            suffix="hr"
            label="Architect SLA"
            sub="Emergency first-response protocol"
            icon={<Sparkles className="w-3 h-3" />}
          />
        </div>

        {/* 3. BALANCED 2-COLUMN GRID (Equal Heights, Zero Empty Voids!) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 items-start">
          {/* COLUMN 1: Questions 01, 02, 03 */}
          <div className="space-y-3">
            {col1Faqs.map((faq, idx) => renderFaqCard(faq, idx))}
          </div>

          {/* COLUMN 2: Questions 04, 05 + High-Impact 3D Tilt Contact Card (Exactly 3 Items!) */}
          <div className="space-y-3">
            {col2Faqs.map((faq, idx) => renderFaqCard(faq, idx + 3))}

            {/* 3rd Item in Column 2: Compact 3D Tilt Contact & Architecture Discovery Card */}
            <TiltCard
              glowColor="rgba(53, 55, 136, 0.35)"
              onCursorChange={onCursorChange}
              className="rounded-2xl overflow-hidden"
            >
              <div className="p-4 sm:p-4.5 rounded-2xl bg-gradient-to-br from-[#171717] to-[#1E212D] text-white border border-[#2B2E3D] shadow-md space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#353788]/25 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                    <div className="w-6 h-6 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    <span>Direct Architect Line</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#25D366]/15 text-[9px] font-mono text-[#25D366] font-bold">
                    ONLINE NOW
                  </span>
                </div>

                <p className="text-xs text-white/70 leading-relaxed">
                  Have an unlisted requirement or niche stack? Chat directly with our solutions architects on WhatsApp or schedule a free discovery review.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <a
                    href={COMPANY_INFO.socials.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => onCursorChange?.('hover')}
                    onMouseLeave={() => onCursorChange?.('default')}
                    className="py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1 shadow-sm"
                  >
                    <Send className="w-3 h-3" />
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>

                  <button
                    onClick={
                      onOpenConsultation ||
                      (() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      })
                    }
                    onMouseEnter={() => onCursorChange?.('hover')}
                    onMouseLeave={() => onCursorChange?.('default')}
                    className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Layers className="w-3 h-3 text-[#8A8DF8]" />
                    <span>Book Review</span>
                  </button>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
