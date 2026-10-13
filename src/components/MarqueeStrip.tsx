import React from 'react';

export const MarqueeStrip: React.FC = () => {
  const items = [
    "BESPOKE WEB DEVELOPMENT",
    "ENTERPRISE CRM ARCHITECTURE",
    "NATIVE MOBILE APPS",
    "PERFORMANCE MARKETING",
    "TECHNICAL SEO",
    "AI SOLUTIONS & AUTOMATION",
    "CLOUD & DEVOPS",
    "UI/UX DIGITAL FLAGSHIPS",
  ];

  return (
    <section className="py-8 sm:py-10 md:py-14 bg-[#FFFFFF] relative z-10 overflow-hidden">
      {/* Editorial Ticker Strip */}
      <div className="relative py-6 md:py-7 bg-[#F7F7F5] border-y border-[#E8E8E8] overflow-hidden select-none shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-8 shrink-0 pr-8">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-8">
                <span className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-[#171717]">
                  {item}
                </span>
                <span className="text-[#353788] text-xs">✦</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-8 shrink-0 pr-8" aria-hidden="true">
            {items.map((item, idx) => (
              <div key={`dup-${idx}`} className="flex items-center gap-8">
                <span className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-[#171717]">
                  {item}
                </span>
                <span className="text-[#353788] text-xs">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
