import React, { useState } from 'react';
import { INDUSTRIES_DATA, type IndustryItem } from '../data/retrotechData';
import { ArrowUpRight, Building2, Factory, Film, ShieldCheck, ShoppingCart, Stethoscope } from 'lucide-react';

interface IndustriesSectionProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
  onOpenConsultation?: () => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  onCursorChange,
  onOpenConsultation,
}) => {
  const [activeIndustry, setActiveIndustry] = useState<IndustryItem>(INDUSTRIES_DATA[0]);

  const iconMap: Record<string, React.ElementType> = {
    ShoppingCart,
    Building2,
    Factory,
    Stethoscope,
    Film,
    ShieldCheck,
  };

  return (
    <section id="industries" className="py-24 md:py-36 bg-[#F7F7F5] border-b border-[#E8E8E8] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#353788]">
                04 &bull; Specialized Domains
              </span>
              <div className="w-12 h-[1px] bg-[#353788]" />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-[#171717] leading-[1.05]">
              Industries We <br />
              <span className="font-serif italic font-normal text-[#353788]">Power &amp; Transform</span>
            </h2>
          </div>

          <p className="max-w-md text-sm md:text-base text-[#737373] leading-relaxed">
            Tailored engineering blueprints addressing regulatory nuances, customer buying cycles, and workflow demands across specialized verticals.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {INDUSTRIES_DATA.map((ind, idx) => {
            const Icon = iconMap[ind.iconName] || Building2;
            const isHovered = activeIndustry.id === ind.id;

            return (
              <div
                key={ind.id}
                onMouseEnter={() => {
                  setActiveIndustry(ind);
                  onCursorChange?.('hover');
                }}
                onMouseLeave={() => onCursorChange?.('default')}
                className={`bg-white rounded-2xl md:rounded-3xl border border-[#E8E8E8] overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between ${
                  isHovered ? 'border-[#353788]/30 shadow-md' : ''
                }`}
              >
                <div>
                  {/* Image Aspect Box */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F0F0EE]">
                    <img
                      src={ind.image}
                      alt={ind.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#353788] shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-white/90 block">
                        Vertical 0{idx + 1}
                      </span>
                      <h4 className="text-base font-bold text-white">
                        {ind.name}
                      </h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-7 space-y-3">
                    <div className="text-xs font-bold text-[#353788] uppercase tracking-wider">
                      {ind.tagline}
                    </div>
                    <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                      {ind.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 md:px-7 pb-6 pt-2 border-t border-[#E8E8E8]/70 flex items-center justify-between">
                  <span className="text-[11px] text-[#737373] font-mono">
                    Custom Vertical Stack
                  </span>
                  <button
                    onClick={onOpenConsultation}
                    className="w-8 h-8 rounded-full border border-[#E8E8E8] group-hover:border-[#171717] group-hover:bg-[#171717] group-hover:text-white flex items-center justify-center text-[#171717] transition-all"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
