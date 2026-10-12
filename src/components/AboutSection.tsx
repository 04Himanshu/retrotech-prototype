import React from 'react';
import { STATS_DATA } from '../data/retrotechData';
import { CheckCircle2, Compass, Layers, Zap } from 'lucide-react';

interface AboutSectionProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onCursorChange }) => {
  const pillars = [
    {
      icon: Compass,
      title: "Business-First Thinking",
      desc: "We diagnose your operating model, unit economics, and client journeys before writing a single line of architecture. Technology is our craft; your enterprise growth is the objective."
    },
    {
      icon: Layers,
      title: "Reliable Technology",
      desc: "Architected with rigorous security protocols, maintainable component patterns, sub-second latency, and dependable high-availability cloud infrastructure."
    },
    {
      icon: Zap,
      title: "Built for Long-Term Growth",
      desc: "Every system we deploy is modular and future-proofed, designed to adapt seamlessly as transaction volumes surge, teams expand, and new capabilities arise."
    }
  ];

  return (
    <section id="about" className="py-24 md:py-36 bg-[#FFFFFF] border-b border-[#E8E8E8] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#353788]">
            03 &bull; Agency Philosophy
          </span>
          <div className="w-12 h-[1px] bg-[#353788]" />
        </div>

        {/* Oversized Headline Statement */}
        <div className="max-w-5xl mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-[#171717] leading-[1.08]">
            We make technology work with <br />
            <span className="font-serif italic font-normal text-[#353788]">uncompromising clarity</span>,{' '}
            speed, and measurable business confidence.
          </h2>
        </div>

        {/* Two-Column Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left: Narrative text & Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-base sm:text-lg text-[#737373] leading-relaxed font-normal">
              At <strong className="text-[#171717] font-semibold">RetroTech Digital</strong>, we are a 360° IT and digital solutions company dedicated to empowering enterprises in an era of rapid disruption. We fuse deep technological mastery with high-impact visual aesthetics, engineering software and marketing engines that command market respect.
            </p>

            <div className="space-y-6 pt-4">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => onCursorChange?.('hover')}
                    onMouseLeave={() => onCursorChange?.('default')}
                    className="p-6 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E8] hover:border-[#353788]/40 transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E8E8] flex items-center justify-center text-[#353788] group-hover:bg-[#353788] group-hover:text-white transition-colors shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#171717] mb-2 group-hover:text-[#353788] transition-colors">
                          {pillar.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Authentic Office / Team Composition Asset */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl md:rounded-3xl overflow-hidden bg-[#F7F7F5] border border-[#E8E8E8] shadow-sm">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="/assets/software-development-retrotech.jpg"
                  alt="RetroTech Digital Engineering Lab"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/80 block mb-1">
                    Gurugram Headquarters
                  </span>
                  <p className="text-sm font-semibold">
                    DLF Phase 1, Arjun Marg &bull; Engineering &amp; Strategy Hub
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4F5FB] border border-[#353788]/20 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#353788] shrink-0" />
              <p className="text-xs text-[#171717] font-medium leading-relaxed">
                Direct access to senior architects and project leads throughout the entire lifecycle.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-[#E8E8E8]">
          {STATS_DATA.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171717]">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-[#737373] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
