import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_INFO } from '../data/retrotechData';
import { MagneticButton } from './MagneticButton';
import { Menu, X, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
  onOpenConsultation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onCursorChange,
  onOpenConsultation 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Industries', href: '#industries' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3.5 bg-white/90 backdrop-blur-md border-b border-[#E8E8E8] shadow-[0_4px_24px_rgba(0,0,0,0.03)]'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo with genuine asset */}
          <a
            href="#"
            className="flex items-center gap-3 group relative z-50"
            onMouseEnter={() => onCursorChange?.('hover')}
            onMouseLeave={() => onCursorChange?.('default')}
          >
            <div className="relative overflow-hidden flex items-center">
              <img
                src={COMPANY_INFO.logo}
                alt={COMPANY_INFO.name}
                className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:flex flex-col border-l border-[#E8E8E8] pl-3 ml-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#171717]">
                Digital Agency
              </span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-[#737373]">
                Gurugram &bull; Global
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 text-[#171717] hover:text-[#353788] transition-colors duration-200 group text-[13px] tracking-wide"
                onMouseEnter={() => onCursorChange?.('hover')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#353788] transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.phoneClean}`}
              className="flex items-center gap-2 text-xs font-semibold text-[#171717] hover:text-[#353788] transition-colors px-3 py-2"
              onMouseEnter={() => onCursorChange?.('hover')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              <Phone className="w-3.5 h-3.5 text-[#353788]" />
              <span className="hidden xl:inline">{COMPANY_INFO.phone}</span>
            </a>

            <MagneticButton>
              <button
                onClick={onOpenConsultation || (() => {
                  const el = document.getElementById('contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                })}
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#171717] hover:bg-[#353788] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md"
                onMouseEnter={() => onCursorChange?.('hover')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-[#171717] hover:text-[#353788] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl pt-24 px-8 pb-10 flex flex-col justify-between md:hidden"
          >
            <div className="space-y-6 pt-4">
              <span className="text-[11px] uppercase font-bold tracking-widest text-[#737373]">
                Navigation Index
              </span>
              <div className="space-y-4">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * idx, duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-2xl font-bold text-[#171717] hover:text-[#353788] transition-colors"
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-[#E8E8E8]">
              <div className="text-xs text-[#737373] leading-relaxed">
                {COMPANY_INFO.location}
              </div>
              <div className="flex flex-col gap-2.5">
                <a
                  href={`tel:${COMPANY_INFO.phoneClean}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#171717]"
                >
                  <Phone className="w-4 h-4 text-[#353788]" />
                  {COMPANY_INFO.phone}
                </a>
                <a
                  href={COMPANY_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#006a43]"
                >
                  <MessageSquare className="w-4 h-4" />
                  Connect on WhatsApp
                </a>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById('contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3.5 rounded-full bg-[#171717] text-white text-xs font-bold uppercase tracking-widest text-center"
              >
                Start a Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
