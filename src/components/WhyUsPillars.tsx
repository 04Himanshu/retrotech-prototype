import React from 'react';
import { PILLARS_DATA, COMPANY_INFO } from '../data/retrotechData';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

interface WhyUsPillarsProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}

export const WhyUsPillars: React.FC<WhyUsPillarsProps> = ({ onCursorChange }) => {
  return (
    <section id="why-us" className="py-24 md:py-36 bg-[#FFFFFF] border-b border-[#E8E8E8] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#353788]">
                05 &bull; The RetroTech Standard
              </span>
              <div className="w-12 h-[1px] bg-[#353788]" />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-[#171717] leading-[1.05]">
              Reasons to Trust <br />
              <span className="font-serif italic font-normal text-[#353788]">Our Technical Expertise</span>
            </h2>
          </div>

          <p className="max-w-md text-sm md:text-base text-[#737373] leading-relaxed">
            We operate with the speed of an agile product squad and the governance of an enterprise consultancy. No bureaucracy, no fluff.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
          {PILLARS_DATA.map((pillar) => (
            <div
              key={pillar.number}
              onMouseEnter={() => onCursorChange?.('hover')}
              onMouseLeave={() => onCursorChange?.('default')}
              className="p-8 rounded-2xl md:rounded-3xl bg-[#F7F7F5] border border-[#E8E8E8] hover:border-[#353788]/40 hover:bg-white hover:shadow-lg transition-all duration-300 space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-mono font-extrabold text-[#353788] group-hover:scale-110 transition-transform">
                  {pillar.number}
                </span>
                <div className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#737373] group-hover:text-[#353788] group-hover:border-[#353788] transition-colors">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#171717] group-hover:text-[#353788] transition-colors">
                {pillar.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Accreditations & Verified Partnerships Showcase */}
        <div className="bg-[#F7F7F5] rounded-3xl p-8 md:p-12 border border-[#E8E8E8]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#353788] flex items-center justify-center lg:justify-start gap-2">
                <ShieldCheck className="w-4 h-4" />
                Verified Ecosystem Partners
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-[#171717]">
                Industry Recognition &amp; Platform Certifications
              </h3>
              <p className="text-xs sm:text-sm text-[#737373] max-w-lg">
                Direct access to top-tier algorithmic support, beta features, and enterprise partner frameworks across major global platforms.
              </p>
            </div>

            {/* Partner Logos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
              {COMPANY_INFO.accreditations.map((acc, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-[#E8E8E8] flex items-center justify-center h-20 shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={acc.logo}
                    alt={acc.name}
                    className="max-h-12 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
