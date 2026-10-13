import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { COMPANY_INFO } from '../data/retrotechData';
import { MagneticButton } from './MagneticButton';
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
  Copy,
  Check,
  Globe,
  Lock,
  Zap,
} from 'lucide-react';

interface ContactSectionProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
  preselectedService?: string;
}

// =========================================================================
// 1. HARDWARE-ACCELERATED 3D TILT CONTAINER (0 React Re-renders on Move)
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !innerRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    innerRef.current.style.transform = `perspective(900px) rotateX(${-yPct * 6}deg) rotateY(${xPct * 6}deg) translateZ(4px)`;

    if (glareRef.current) {
      glareRef.current.style.opacity = '0.28';
      glareRef.current.style.background = `radial-gradient(circle 260px at ${(xPct + 0.5) * 100}% ${(yPct + 0.5) * 100}%, ${glowColor}, transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
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

export const ContactSection: React.FC<ContactSectionProps> = ({
  onCursorChange,
  preselectedService = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: preselectedService || 'Bespoke Web Development',
    budget: '$10k - $25k',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [istTime, setIstTime] = useState<string>('');

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  // Parallax background depth hooks
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxOrb1 = useTransform(scrollYProgress, [0, 1], [-35, 35]);
  const parallaxOrb2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Live IST Clock for Gurugram Corporate HQ
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setIstTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    { name: 'Bespoke Web Development', tag: 'Next.js / React' },
    { name: 'Mobile App Development', tag: 'iOS & Android' },
    { name: 'Custom Software & SaaS', tag: 'Cloud Architecture' },
    { name: 'CRM & ERPNext Integration', tag: 'Enterprise Ops' },
    { name: 'Performance Marketing & SEO', tag: 'Growth Engine' },
  ];

  const budgets = [
    { label: 'Under $10k', desc: 'Sprint Pilot' },
    { label: '$10k - $25k', desc: 'Core MVP' },
    { label: '$25k - $50k', desc: 'Scale Suite' },
    { label: '$50k+', desc: 'Enterprise Flagship' },
  ];

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please specify your name and primary business email.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'Bespoke Web Development',
      budget: '$10k - $25k',
      message: '',
    });
  };

  // Completion calculation for live visual progress bar
  const filledFieldsCount = [
    formData.name.trim(),
    formData.email.trim(),
    formData.phone.trim(),
    formData.company.trim(),
    formData.message.trim(),
  ].filter(Boolean).length;
  const progressPercent = Math.round((filledFieldsCount / 5) * 100);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-[#F7F7F5] relative overflow-hidden border-b border-[#E8E8E8]"
    >
      {/* 1. VISUAL EFFECTS ATMOSPHERE: Floating Ambient Orbs & Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: parallaxOrb1 }}
          className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-gradient-to-br from-[#353788]/12 via-[#8A8DF8]/8 to-transparent rounded-full blur-[110px] animate-float-orb-1"
        />
        <motion.div
          style={{ y: parallaxOrb2 }}
          className="absolute top-1/2 -right-40 w-[580px] h-[580px] bg-gradient-to-tl from-[#006A43]/10 via-[#353788]/10 to-transparent rounded-full blur-[120px] animate-float-orb-2"
        />

        {/* Blueprint Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(232,232,232,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(232,232,232,0.6)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]" />

        {/* Ambient Rising Particles */}
        <div className="absolute inset-0">
          {[
            { top: '80%', left: '12%', delay: '0s', dur: '7s' },
            { top: '70%', left: '28%', delay: '2s', dur: '9s' },
            { top: '88%', left: '55%', delay: '1s', dur: '8s' },
            { top: '76%', left: '78%', delay: '3s', dur: '10s' },
            { top: '65%', left: '90%', delay: '4s', dur: '6s' },
          ].map((pt, idx) => (
            <div
              key={idx}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#353788]/25 animate-pulse"
              style={{
                top: pt.top,
                left: pt.left,
                animationDuration: pt.dur,
                animationDelay: pt.delay,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Entrance Scanline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#353788] to-transparent origin-left mb-5 opacity-30"
        />

        {/* Section Tag & Telemetry Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-[#353788]">
              07 &bull; Initiate Engagement
            </span>
            <div className="w-10 h-[1px] bg-[#353788]/60" />
            <span className="text-[9.5px] tracking-widest uppercase text-[#737373] font-mono flex items-center gap-1.5">
              <span>Enterprise Discovery Portal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-[#737373] bg-white/70 backdrop-blur-md px-3 py-1 rounded-full border border-[#E8E8E8]">
            <Globe className="w-3 h-3 text-[#353788]" />
            <span>GURUGRAM HQ: {istTime || '12:00:00 PM'} IST</span>
            <span className="text-[#10B981] font-bold">&bull; ONLINE</span>
          </div>
        </div>

        {/* Dramatic Headline with Iridescent Gradient Shift */}
        <div className="max-w-4xl mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-[#171717] leading-[1.04]">
            Let's Engineer Your Next <br />
            <span className="font-serif italic font-normal bg-gradient-to-r from-[#171717] via-[#353788] via-[#8A8DF8] to-[#171717] bg-clip-text text-transparent animate-gradient-flow">
              Digital Success Story.
            </span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-[#737373] max-w-2xl leading-relaxed">
            Whether you require an enterprise web application, high-concurrency mobile ecosystem, custom CRM/ERP, or technical performance marketing engine, our solution architects are ready to guide you.
          </p>
        </div>

        {/* Two-Column Grid: Contact Information & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Authentic Contact Details & 3D Tilt Presence (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            {/* 3D Tilt Card: Corporate Headquarters */}
            <TiltCard
              glowColor="rgba(53, 55, 136, 0.35)"
              onCursorChange={onCursorChange}
              className="rounded-3xl overflow-hidden shadow-sm"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E8E8] shadow-sm space-y-5 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0F0EE]">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#737373] block">
                      Corporate Headquarters
                    </span>
                    <h4 className="text-sm font-bold text-[#171717] mt-0.5">
                      RetroTech Digital LLP
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#10B981]/10 text-[9.5px] font-mono text-[#006A43] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                    DISCOVERY ACTIVE
                  </span>
                </div>

                <div className="space-y-3.5">
                  {/* Location Row */}
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-[#F7F7F5] border border-[#E8E8E8] flex items-center justify-center text-[#353788] shrink-0 mt-0.5 group-hover:scale-105 group-hover:bg-[#353788] group-hover:text-white transition-all">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#737373]">
                          Location
                        </span>
                        <span className="text-[9.5px] font-mono text-[#353788]">Gurugram, HR</span>
                      </div>
                      <p className="text-xs text-[#171717] leading-relaxed font-medium mt-0.5">
                        {COMPANY_INFO.location}
                      </p>
                    </div>
                  </div>

                  {/* Email Row with 1-Click Copy */}
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-[#F7F7F5] border border-[#E8E8E8] flex items-center justify-center text-[#353788] shrink-0 mt-0.5 group-hover:scale-105 group-hover:bg-[#353788] group-hover:text-white transition-all">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#737373]">
                          Direct Inquiries
                        </span>
                        <button
                          onClick={() => copyToClipboard(COMPANY_INFO.email, 'email')}
                          className="text-[9.5px] font-mono text-[#353788] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === 'email' ? (
                            <>
                              <Check className="w-2.5 h-2.5 text-[#10B981]" />
                              <span className="text-[#10B981]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-2.5 h-2.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        onMouseEnter={() => onCursorChange?.('hover')}
                        onMouseLeave={() => onCursorChange?.('default')}
                        className="text-xs font-bold text-[#171717] hover:text-[#353788] transition-colors mt-0.5 block"
                      >
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone Row */}
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-[#F7F7F5] border border-[#E8E8E8] flex items-center justify-center text-[#353788] shrink-0 mt-0.5 group-hover:scale-105 group-hover:bg-[#353788] group-hover:text-white transition-all">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#737373]">
                          Voice Line
                        </span>
                        <button
                          onClick={() => copyToClipboard(COMPANY_INFO.phone, 'phone')}
                          className="text-[9.5px] font-mono text-[#353788] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === 'phone' ? (
                            <>
                              <Check className="w-2.5 h-2.5 text-[#10B981]" />
                              <span className="text-[#10B981]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-2.5 h-2.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <a
                        href={`tel:${COMPANY_INFO.phoneClean}`}
                        onMouseEnter={() => onCursorChange?.('hover')}
                        onMouseLeave={() => onCursorChange?.('default')}
                        className="text-xs font-bold text-[#171717] hover:text-[#353788] transition-colors mt-0.5 block"
                      >
                        {COMPANY_INFO.phone}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp Direct Highlight Row */}
                  <div className="p-3.5 rounded-2xl bg-[#006A43]/5 border border-[#006A43]/20 flex items-center justify-between gap-3 transition-colors hover:bg-[#006A43]/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#006A43]">
                          Instant WhatsApp Channel
                        </div>
                        <div className="text-[10px] text-[#737373]">
                          Speak directly with Lead Architects
                        </div>
                      </div>
                    </div>
                    <a
                      href={COMPANY_INFO.socials.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => onCursorChange?.('hover')}
                      onMouseLeave={() => onCursorChange?.('default')}
                      className="px-3 py-1.5 rounded-full bg-[#006A43] hover:bg-[#004f32] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors shadow-sm"
                    >
                      <span>Connect</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Response SLA Benchmarks */}
                <div className="pt-3 border-t border-[#F0F0EE] flex items-center justify-between text-[11px] text-[#737373]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#353788]" />
                    <span>Avg First Response: &lt; 2 Hours</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#353788] font-bold">
                    SLA GUARANTEED
                  </span>
                </div>
              </div>
            </TiltCard>

            {/* Quick Assurance Security Pill */}
            <TiltCard
              glowColor="rgba(217, 119, 6, 0.25)"
              onCursorChange={onCursorChange}
              className="rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E8E8] flex items-start gap-3 shadow-sm">
                <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#171717] flex items-center gap-2">
                    <span>Mutual Non-Disclosure Agreement (NDA)</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                  </div>
                  <p className="text-[11px] text-[#737373] leading-relaxed">
                    Prior to reviewing proprietary codebases or business models, our team executes bilateral NDAs to safeguard your intellectual property.
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Interactive Frontend Discovery Portal (Cols 6-12) */}
          <div className="lg:col-span-7">
            <TiltCard
              glowColor="rgba(53, 55, 136, 0.3)"
              onCursorChange={onCursorChange}
              className="rounded-3xl overflow-hidden shadow-md"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-9 border border-[#E8E8E8] shadow-md relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="py-10 text-center space-y-5"
                    >
                      <div className="relative mx-auto w-16 h-16">
                        <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping" />
                        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto relative z-10 shadow-lg">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#006A43] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          TRANSMISSION CONFIRMED
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                          Consultation Request Dispatched
                        </h3>
                        <p className="text-xs sm:text-sm text-[#737373] max-w-md mx-auto leading-relaxed">
                          Thank you, <strong className="text-[#171717]">{formData.name}</strong>. Our senior solutions architect has been assigned to evaluate your requirements for <em className="text-[#353788] font-semibold">{formData.service}</em> within 2 business hours.
                        </p>
                      </div>

                      {/* Summary Specs Pill */}
                      <div className="max-w-xs mx-auto p-3 rounded-xl bg-[#F7F7F5] border border-[#E8E8E8] text-[10px] font-mono text-[#737373] space-y-1">
                        <div className="flex justify-between">
                          <span>Service:</span>
                          <span className="font-bold text-[#171717]">{formData.service}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Budget Tier:</span>
                          <span className="font-bold text-[#171717]">{formData.budget}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>SLA Dispatch:</span>
                          <span className="font-bold text-[#10B981]">Immediate Queue</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={handleReset}
                          className="px-6 py-2.5 rounded-full border border-[#E8E8E8] text-xs font-bold uppercase tracking-wider text-[#171717] hover:bg-[#171717] hover:text-white transition-all cursor-pointer shadow-sm"
                        >
                          Submit Another Inquiry
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      {/* Top Header & Dynamic Progress Indicator */}
                      <div className="pb-4 border-b border-[#F0F0EE] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-[#171717]">
                            Request Project Discovery Review
                          </h3>
                          <span className="text-[11px] text-[#737373]">
                            Architect-reviewed within 2 hours &bull; Fixed-price scope
                          </span>
                        </div>

                        {/* Visual Progress Pill */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[#737373]">
                            {progressPercent}% Complete
                          </span>
                          <div className="w-16 h-1.5 bg-[#E8E8E8] rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-[#353788] rounded-full"
                              style={{ width: `${progressPercent}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </div>
                      </div>

                      {errorMsg && (
                        <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium border border-red-200 flex items-center gap-2">
                          <Zap className="w-4 h-4 shrink-0" />
                          <span>{errorMsg}</span>
                        </div>
                      )}

                      {/* 1. Service Selection Pills with Morphing LayoutId */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717] flex items-center justify-between">
                          <span>Primary Architectural Focus *</span>
                          <span className="text-[10px] text-[#737373] font-normal">Select one</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {services.map((srv) => {
                            const isSelected = formData.service === srv.name;
                            return (
                              <button
                                type="button"
                                key={srv.name}
                                onClick={() => setFormData({ ...formData, service: srv.name })}
                                onMouseEnter={() => onCursorChange?.('hover')}
                                onMouseLeave={() => onCursorChange?.('default')}
                                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#353788] text-white shadow-sm ring-2 ring-[#353788]/20'
                                    : 'bg-[#F7F7F5] text-[#737373] hover:text-[#171717] hover:bg-[#EAEAEA] border border-[#E8E8E8]'
                                }`}
                              >
                                <span>{srv.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2. Name & Work Email with Focus Highlights */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717]">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Vikram Malhotra"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] bg-[#F7F7F5] focus:bg-white focus:border-[#353788] focus:ring-2 focus:ring-[#353788]/10 focus:outline-none text-xs text-[#171717] transition-all"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717]">
                            Business Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="vikram@enterprise.com"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] bg-[#F7F7F5] focus:bg-white focus:border-[#353788] focus:ring-2 focus:ring-[#353788]/10 focus:outline-none text-xs text-[#171717] transition-all"
                          />
                        </div>
                      </div>

                      {/* 3. Phone & Company */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717]">
                            Phone / WhatsApp (Optional)
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 99000 00000"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] bg-[#F7F7F5] focus:bg-white focus:border-[#353788] focus:ring-2 focus:ring-[#353788]/10 focus:outline-none text-xs text-[#171717] transition-all"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717]">
                            Company / Organization
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Malhotra Retail Group"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] bg-[#F7F7F5] focus:bg-white focus:border-[#353788] focus:ring-2 focus:ring-[#353788]/10 focus:outline-none text-xs text-[#171717] transition-all"
                          />
                        </div>
                      </div>

                      {/* 4. Budget Range Selector */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717] flex items-center justify-between">
                          <span>Anticipated Capital Allocation</span>
                          <span className="text-[10px] text-[#737373] font-normal">Approximate range</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {budgets.map((b) => {
                            const isSelected = formData.budget === b.label;
                            return (
                              <button
                                type="button"
                                key={b.label}
                                onClick={() => setFormData({ ...formData, budget: b.label })}
                                onMouseEnter={() => onCursorChange?.('hover')}
                                onMouseLeave={() => onCursorChange?.('default')}
                                className={`py-2 px-2.5 rounded-xl text-center transition-all duration-200 cursor-pointer border ${
                                  isSelected
                                    ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                                    : 'bg-[#F7F7F5] border-[#E8E8E8] text-[#737373] hover:text-[#171717] hover:border-[#171717]/40'
                                }`}
                              >
                                <div className="text-xs font-bold leading-tight">{b.label}</div>
                                <div className="text-[9px] font-mono opacity-70 mt-0.5">{b.desc}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 5. Project Brief */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717]">
                            Project Scope &amp; Target Launch
                          </label>
                          <span className="text-[10px] font-mono text-[#737373]">
                            {formData.message.length}/500
                          </span>
                        </div>
                        <textarea
                          rows={3}
                          maxLength={500}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Outline your technical goals, existing stack or ERP, and target milestone date..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] bg-[#F7F7F5] focus:bg-white focus:border-[#353788] focus:ring-2 focus:ring-[#353788]/10 focus:outline-none text-xs text-[#171717] transition-all resize-none"
                        />
                      </div>

                      {/* Submit Magnetic CTA Button */}
                      <div className="pt-2">
                        <MagneticButton className="w-full">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 rounded-full bg-[#171717] hover:bg-[#353788] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-70 cursor-pointer"
                            onMouseEnter={() => onCursorChange?.('hover')}
                            onMouseLeave={() => onCursorChange?.('default')}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                                <span>Dispatching Discovery Request...</span>
                              </span>
                            ) : (
                              <>
                                <span>Initiate Discovery Review</span>
                                <Send className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>
                        </MagneticButton>
                      </div>

                      {/* Security Protocol Sign-off */}
                      <div className="flex items-center justify-center gap-2 text-[10.5px] font-mono text-[#737373]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>Protected by 256-bit encryption &bull; Strict Mutual NDA Guaranteed</span>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
