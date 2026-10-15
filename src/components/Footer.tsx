import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/retrotechData';
import { ArrowUp, Globe } from 'lucide-react';

interface FooterProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC<FooterProps> = ({ onCursorChange }) => {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setLocalTime(now.toLocaleTimeString('en-US', options) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navGroups = [
    {
      title: "Who We Are",
      links: [
        { label: "Home", href: "#hero" },
        { label: "About Us", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Industries", href: "#industries" },
        { label: "Client Reviews", href: "#testimonials" },
        { label: "Why Choose Us", href: "#why-us" },
        { label: "FAQs", href: "#faqs" },
        { label: "Blog & News", href: "#blog" },
        { label: "Contact Us", href: "#contact" },
      ]
    },
    {
      title: "Our Services",
      links: [
        { label: "Web Development", href: "#services" },
        { label: "App Development", href: "#services" },
        { label: "Digital Marketing", href: "#services" },
        { label: "Software Development", href: "#services" },
        { label: "SaaS Development", href: "#services" },
        { label: "SEO Services", href: "#services" },
      ]
    },
    {
      title: "Our Industries",
      links: [
        { label: "Real Estate & Construction", href: "#industries" },
        { label: "Manufacturing", href: "#industries" },
        { label: "Ecommerce & Multivendor", href: "#industries" },
        { label: "Personal Beauty Care", href: "#industries" },
        { label: "Medical & Healthcare", href: "#industries" },
        { label: "Finance & Insurance", href: "#industries" },
      ]
    }
  ];

  return (
    <footer className="bg-white border-t border-[#E8E8E8] pt-12 md:pt-14 pb-8 text-[#171717] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#E8E8E8]">
          {/* Brand Column (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#" className="inline-block">
              <img
                src={COMPANY_INFO.logo}
                alt={COMPANY_INFO.name}
                className="h-9 w-auto object-contain"
              />
            </a>

            <p className="text-xs sm:text-sm text-[#737373] leading-relaxed max-w-sm">
              {COMPANY_INFO.shortDesc}
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#737373]">
                <Globe className="w-3.5 h-3.5 text-[#353788]" />
                <span>Gurugram HQ Time:</span>
                <span className="font-mono font-bold text-[#171717]">{localTime}</span>
              </div>
              <div className="text-xs text-[#737373]">
                {COMPANY_INFO.location}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-full border border-[#E8E8E8] text-xs font-semibold text-[#171717] hover:border-[#171717] transition-colors"
                onMouseEnter={() => onCursorChange?.('hover')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                LinkedIn
              </a>
              <a
                href={COMPANY_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-full border border-[#E8E8E8] text-xs font-semibold text-[#171717] hover:border-[#171717] transition-colors"
                onMouseEnter={() => onCursorChange?.('hover')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                Instagram
              </a>
              <a
                href={COMPANY_INFO.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-full border border-[#006a43]/30 text-xs font-semibold text-[#006a43] hover:bg-[#e6f4ea] transition-colors"
                onMouseEnter={() => onCursorChange?.('hover')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                WhatsApp Direct
              </a>
            </div>
          </div>

          {/* Navigation Links Columns (Cols 6-12) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {navGroups.map((group, idx) => (
              <div key={idx} className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#171717] block">
                  {group.title}
                </span>
                <ul className="space-y-2.5">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.href}
                        className="text-xs text-[#737373] hover:text-[#353788] transition-colors inline-block"
                        onMouseEnter={() => onCursorChange?.('hover')}
                        onMouseLeave={() => onCursorChange?.('default')}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Legal Bar & Back to Top */}
        <div className="pt-6 border-t border-[#E8E8E8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737373]">
          <div>
            &copy; {CURRENT_YEAR} RetroTech Digital (B2B Export LLC). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Verified Google Ads &amp; Meta Business Partner</span>
            <span className="hidden md:inline">&bull;</span>
            <span className="hidden md:inline">CIN / B2B Export LLC</span>
          </div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-[#E8E8E8] hover:border-[#171717] bg-[#F7F7F5] hover:bg-[#171717] hover:text-white flex items-center justify-center text-[#171717] transition-all group shrink-0 cursor-pointer shadow-sm"
            aria-label="Back to top"
            onMouseEnter={() => onCursorChange?.('hover')}
            onMouseLeave={() => onCursorChange?.('default')}
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
