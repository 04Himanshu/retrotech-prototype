import React, { useState, useRef } from 'react';
import { INDUSTRIES_DATA, type IndustryItem } from '../data/retrotechData';
import {
  Building2,
  Factory,
  ShoppingCart,
  Sparkles,
  Film,
  Stethoscope,
  ShieldCheck,
  Compass,
  Layers,
  Zap,
  Cpu,
  ArrowUpRight,
} from 'lucide-react';

interface IndustriesSectionProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
  onOpenConsultation?: () => void;
}

// Icon helper matching industry items
const getIndustryIcon = (iconName: string, className = "w-3.5 h-3.5") => {
  switch (iconName) {
    case 'Building2': return <Building2 className={className} />;
    case 'Factory': return <Factory className={className} />;
    case 'ShoppingCart': return <ShoppingCart className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Film': return <Film className={className} />;
    case 'Stethoscope': return <Stethoscope className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Compass': return <Compass className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    default: return <Building2 className={className} />;
  }
};

// 12th card for track symmetry & custom solutions
const BESPOKE_DOMAIN_CARD: IndustryItem = {
  id: "custom-solutions",
  name: "Custom Solutions",
  tagline: "Tailored IT Systems",
  description: "Custom software, specialized digital platforms, and integrations engineered to fit your specific business requirements.",
  iconName: "Cpu",
  image: "/assets/industry-custom-hd.jpg",
  badge: "Custom",
};

interface MarqueeCardProps {
  industry: IndustryItem;
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
  onClick?: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

// Crisp, Modern 3D Tilt Card Component with Full-Fitting Realistic Photography
const IndustryTiltCard: React.FC<MarqueeCardProps> = ({
  industry,
  onCursorChange,
  onClick,
  onHoverStart,
  onHoverEnd,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateX(-y * 8);
    setRotateY(x * 8);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverStart?.();
    onCursorChange?.('hover');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    onHoverEnd?.();
    onCursorChange?.('default');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className="group shrink-0 w-[285px] sm:w-[305px] md:w-[325px] h-[260px] sm:h-[275px] cursor-pointer select-none relative transition-all duration-300"
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(16px) scale(1.025)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)',
          transition: isHovered
            ? 'transform 0.12s ease-out, box-shadow 0.3s ease, border-color 0.3s ease'
            : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease',
        }}
        className={`w-full h-full flex flex-col rounded-2xl bg-white border overflow-hidden relative transition-colors ${
          isHovered
            ? 'border-[#353788]/60 shadow-[0_16px_36px_-10px_rgba(53,55,136,0.18)] z-30'
            : 'border-[#E8E8E8] shadow-[0_2px_12px_rgba(0,0,0,0.03)] z-10'
        }`}
      >
        {/* Top Image Banner: Full-Fit, Crisp 4K/HD Realistic Photography */}
        <div className="relative w-full h-[138px] sm:h-[150px] overflow-hidden bg-[#0F1420] shrink-0">
          <img
            src={industry.image}
            alt={industry.name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
          />

          {/* Vignette Gradient Overlay for Depth and Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none" />

          {/* Category Tag (Top Right) */}
          {industry.badge && (
            <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-[#171717] bg-white/95 backdrop-blur-md shadow-xs border border-white/70 tracking-wide">
              {industry.badge}
            </span>
          )}

          {/* Floating Industry Icon (Bottom Left of Image) */}
          <div className="absolute bottom-2.5 left-3 w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md text-[#353788] flex items-center justify-center shadow-md border border-white/70 group-hover:bg-[#353788] group-hover:text-white transition-all duration-300 group-hover:scale-105">
            {getIndustryIcon(industry.iconName, "w-4 h-4")}
          </div>
        </div>

        {/* Bottom Section: Snug, Clean Content */}
        <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-white min-h-0">
          <div>
            <h3 className="text-sm sm:text-[14.5px] font-semibold text-[#171717] group-hover:text-[#353788] transition-colors leading-snug line-clamp-1">
              {industry.name}
            </h3>
            <p className="mt-1 text-[11.5px] sm:text-xs text-[#6c757d] font-normal leading-relaxed line-clamp-2">
              {industry.description}
            </p>
          </div>

          {/* Bottom Link Row */}
          <div className="pt-2 sm:pt-2.5 border-t border-[#F0F0EE] flex items-center justify-between text-xs font-semibold text-[#171717] group-hover:text-[#353788] transition-colors">
            <span>Explore Solutions</span>
            <div className="w-6 h-6 rounded-full bg-[#F7F7F5] border border-[#E8E8E8] flex items-center justify-center group-hover:bg-[#353788] group-hover:text-white group-hover:border-[#353788] transition-all duration-300 group-hover:rotate-45 shadow-2xs">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  onCursorChange,
  onOpenConsultation,
}) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Split into 2 opposing rails of 6 items each
  const railOneOriginal = INDUSTRIES_DATA.slice(0, 6);
  const railTwoOriginal = [...INDUSTRIES_DATA.slice(6), BESPOKE_DOMAIN_CARD];

  // Triplicate each track to guarantee perfectly seamless CSS looping with zero jumps
  const railOneItems = [...railOneOriginal, ...railOneOriginal, ...railOneOriginal];
  const railTwoItems = [...railTwoOriginal, ...railTwoOriginal, ...railTwoOriginal];

  return (
    <section
      id="industries"
      className="py-10 sm:py-12 md:py-14 bg-[#FFFFFF] border-b border-[#E8E8E8] relative overflow-hidden"
    >
      {/* Background Subtle Gradient Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#353788]/[0.02] rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#8A8DF8]/[0.02] rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-5 sm:mb-6 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#353788]/10 text-[#353788] text-xs font-medium mb-2.5">
            <span>Industries We Serve</span>
            <span className="text-[#353788]/40">&bull;</span>
            <span className="text-[#737373]">11 Specialized Domains</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#171717] tracking-normal">
            Industries We Serve
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-[#6c757d] font-normal leading-relaxed">
            We deliver innovative IT solutions tailored to the unique challenges and goals of businesses across diverse industries.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INFINITE KINETIC STREAM CONVEYOR WITH 3D TILT POP-OUT (Tight Gap Spacing) */}
      {/* ========================================================================= */}
      <div className="relative w-full py-1.5 overflow-hidden">
        {/* Upper Rail: Moving Leftward */}
        <div className="mb-3.5 relative flex items-center">
          <div
            className={`flex items-center gap-3.5 shrink-0 kinetic-track-left ${hoveredCardId !== null ? 'paused-track' : ''
              }`}
          >
            {railOneItems.map((ind, idx) => (
              <IndustryTiltCard
                key={`rail1-${ind.id}-${idx}`}
                industry={ind}
                onCursorChange={onCursorChange}
                onClick={onOpenConsultation}
                onHoverStart={() => setHoveredCardId(`r1-${ind.id}-${idx}`)}
                onHoverEnd={() => setHoveredCardId(null)}
              />
            ))}
          </div>
        </div>

        {/* Lower Rail: Moving Rightward */}
        <div className="relative flex items-center">
          <div
            className={`flex items-center gap-3.5 shrink-0 kinetic-track-right ${hoveredCardId !== null ? 'paused-track' : ''
              }`}
          >
            {railTwoItems.map((ind, idx) => (
              <IndustryTiltCard
                key={`rail2-${ind.id}-${idx}`}
                industry={ind}
                onCursorChange={onCursorChange}
                onClick={onOpenConsultation}
                onHoverStart={() => setHoveredCardId(`r2-${ind.id}-${idx}`)}
                onHoverEnd={() => setHoveredCardId(null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Prompt (Tight Margin & Spacing) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-7 relative z-10">
        <div className="p-4 sm:p-5 rounded-xl bg-[#F8F9FA] border border-[#E8E8E8] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-[#353788]/10 text-[#353788] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-[#171717]">
                Don't see your specific industry listed?
              </h4>
              <p className="text-xs text-[#6c757d] font-normal mt-0.5">
                We develop customized IT solutions tailored to your unique business requirements.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#353788] hover:bg-[#2b2d6e] text-white text-xs font-medium transition-colors shrink-0 cursor-pointer shadow-xs"
            onMouseEnter={() => onCursorChange?.('hover')}
            onMouseLeave={() => onCursorChange?.('default')}
          >
            <span>Consult Our Team</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Kinetic CSS Keyframes for Dual-Rail Infinite Motion */}
      <style>{`
        @keyframes kineticRailLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }

        @keyframes kineticRailRight {
          0% {
            transform: translate3d(-33.3333%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .kinetic-track-left {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: kineticRailLeft 42s linear infinite;
        }

        .kinetic-track-right {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: kineticRailRight 42s linear infinite;
        }

        .paused-track {
          animation-play-state: paused !important;
        }

        @media (max-width: 640px) {
          .kinetic-track-left {
            animation-duration: 32s;
          }
          .kinetic-track-right {
            animation-duration: 32s;
          }
        }
      `}</style>
    </section>
  );
};
