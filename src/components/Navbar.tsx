import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_INFO } from '../data/retrotechData';
import { NAVIGATION_DATA } from '../data/navigationData';
import { MagneticButton } from './MagneticButton';
import {
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  Phone,
  MessageSquare,
  ChevronDown,
  Search,
  Share2,
  DollarSign,
  Mail,
  Video,
  FileText,
  ThumbsUp,
  Code2,
  Smartphone,
  Cpu,
  Layers,
  Cloud,
  Workflow,
  MonitorCheck,
  ShoppingCart,
  Building2,
  Factory,
  Film,
  Activity,
  Sparkles,
  GraduationCap,
  Plane,
  Truck,
  Flame,
  ShieldCheck,
  Users,
  BookOpen,
  Briefcase,
  HelpCircle,
} from 'lucide-react';

interface NavbarProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
  onOpenConsultation?: () => void;
}

// Icon helper mapping
const getNavIcon = (name: string, className = "w-4 h-4") => {
  switch (name) {
    case 'Search': return <Search className={className} />;
    case 'Share2': return <Share2 className={className} />;
    case 'DollarSign': return <DollarSign className={className} />;
    case 'Mail': return <Mail className={className} />;
    case 'Video': return <Video className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'ThumbsUp': return <ThumbsUp className={className} />;
    case 'Code2': return <Code2 className={className} />;
    case 'Smartphone': return <Smartphone className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'Cloud': return <Cloud className={className} />;
    case 'Workflow': return <Workflow className={className} />;
    case 'MonitorCheck': return <MonitorCheck className={className} />;
    case 'MessageSquare': return <MessageSquare className={className} />;
    case 'ShoppingCart': return <ShoppingCart className={className} />;
    case 'Building2': return <Building2 className={className} />;
    case 'Factory': return <Factory className={className} />;
    case 'Film': return <Film className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'GraduationCap': return <GraduationCap className={className} />;
    case 'Plane': return <Plane className={className} />;
    case 'Truck': return <Truck className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Users': return <Users className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'HelpCircle': return <HelpCircle className={className} />;
    default: return <ArrowRight className={className} />;
  }
};

export const Navbar: React.FC<NavbarProps> = ({ 
  onCursorChange,
  onOpenConsultation 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'services' | 'industries' | 'insight' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedTab, setMobileExpandedTab] = useState<'services' | 'industries' | 'insight' | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menu: 'services' | 'industries' | 'insight') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveMenu(null);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || activeMenu !== null
            ? 'py-3 bg-white/95 backdrop-blur-md border-b border-[#E8E8E8] shadow-[0_4px_24px_rgba(0,0,0,0.04)]'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
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
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4 text-sm font-medium">
            {/* 1. Home */}
            <a
              href="/"
              className="px-3 py-2 text-[#171717] hover:text-[#353788] transition-colors text-[13px] tracking-wide font-semibold"
              onMouseEnter={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                setActiveMenu(null);
                onCursorChange?.('hover');
              }}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              Home
            </a>

            {/* 2. Services Tab Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
            >
              <button
                onClick={() => scrollToSection('services')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] tracking-wide font-semibold transition-colors duration-200 ${
                  activeMenu === 'services'
                    ? 'text-[#353788] bg-[#F7F7F5]'
                    : 'text-[#171717] hover:text-[#353788]'
                }`}
                onMouseEnter={() => onCursorChange?.('hover')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'services' ? 'rotate-180 text-[#353788]' : 'text-[#737373]'
                  }`}
                />
              </button>
            </div>

            {/* 3. Industries Tab Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('industries')}
            >
              <button
                onClick={() => scrollToSection('industries')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] tracking-wide font-semibold transition-colors duration-200 ${
                  activeMenu === 'industries'
                    ? 'text-[#353788] bg-[#F7F7F5]'
                    : 'text-[#171717] hover:text-[#353788]'
                }`}
                onMouseEnter={() => onCursorChange?.('hover')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                <span>Industries</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'industries' ? 'rotate-180 text-[#353788]' : 'text-[#737373]'
                  }`}
                />
              </button>
            </div>

            {/* 4. Insight Dropdown Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('insight')}
            >
              <button
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] tracking-wide font-semibold transition-colors duration-200 ${
                  activeMenu === 'insight'
                    ? 'text-[#353788] bg-[#F7F7F5]'
                    : 'text-[#171717] hover:text-[#353788]'
                }`}
                onMouseEnter={() => onCursorChange?.('hover')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                <span>Insight</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'insight' ? 'rotate-180 text-[#353788]' : 'text-[#737373]'
                  }`}
                />
              </button>
            </div>

            {/* 5. Contact Us */}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-3 py-2 text-[#171717] hover:text-[#353788] transition-colors text-[13px] tracking-wide font-semibold"
              onMouseEnter={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                setActiveMenu(null);
                onCursorChange?.('hover');
              }}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">

            {/* WhatsApp Link from Live Site */}
            <a
              href={COMPANY_INFO.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#006a43]/30 hover:border-[#006a43] text-[#006a43] text-xs font-semibold hover:bg-[#006a43]/5 transition-all"
              onMouseEnter={() => onCursorChange?.('hover')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Request A Call / Let's Talk CTA */}
            <MagneticButton>
              <button
                onClick={onOpenConsultation || (() => scrollToSection('contact'))}
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#171717] hover:bg-[#353788] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md"
                onMouseEnter={() => onCursorChange?.('hover')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                <span>Request A Call</span>
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

        {/* ======================================================== */}
        {/* DESKTOP MEGA MENU DROPDOWNS                              */}
        {/* ======================================================== */}
        <AnimatePresence>
          {/* SERVICES MEGA MENU */}
          {activeMenu === 'services' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 bg-white border-b border-[#E8E8E8] shadow-[0_20px_48px_rgba(0,0,0,0.08)] py-8 px-6 md:px-12"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
                {/* Column 1: Marketing Platform */}
                <div className="col-span-3 border-r border-[#E8E8E8]/70 pr-6">
                  <a
                    href={NAVIGATION_DATA.services.marketingPlatform.href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#171717] hover:text-[#353788] transition-colors group mb-1.5"
                  >
                    <span>{NAVIGATION_DATA.services.marketingPlatform.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#353788] transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                  <p className="text-xs text-[#737373] mb-4 leading-relaxed">
                    {NAVIGATION_DATA.services.marketingPlatform.description}
                  </p>
                  <div className="space-y-1">
                    {NAVIGATION_DATA.services.marketingPlatform.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#171717] hover:text-[#353788] hover:bg-[#F7F7F5] transition-all group"
                      >
                        <span className="text-[#353788] p-1 rounded bg-[#353788]/5 group-hover:bg-[#353788]/10 transition-colors">
                          {getNavIcon(link.iconName, "w-3.5 h-3.5")}
                        </span>
                        <span className="truncate">{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Column 2: Tech Development */}
                <div className="col-span-3 border-r border-[#E8E8E8]/70 pr-6">
                  <a
                    href={NAVIGATION_DATA.services.techDevelopment.href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#171717] hover:text-[#353788] transition-colors group mb-1.5"
                  >
                    <span>{NAVIGATION_DATA.services.techDevelopment.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#353788] transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                  <p className="text-xs text-[#737373] mb-4 leading-relaxed">
                    {NAVIGATION_DATA.services.techDevelopment.description}
                  </p>
                  <div className="space-y-1">
                    {NAVIGATION_DATA.services.techDevelopment.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#171717] hover:text-[#353788] hover:bg-[#F7F7F5] transition-all group"
                      >
                        <span className="text-[#353788] p-1 rounded bg-[#353788]/5 group-hover:bg-[#353788]/10 transition-colors">
                          {getNavIcon(link.iconName, "w-3.5 h-3.5")}
                        </span>
                        <span className="truncate">{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Column 3: Platform Overview & Solutions */}
                <div className="col-span-3 border-r border-[#E8E8E8]/70 pr-6 space-y-5">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#737373] block mb-2">
                    Solutions & Platforms
                  </span>
                  {NAVIGATION_DATA.services.platformSolutions.map((sol) => (
                    <div key={sol.title} className="group">
                      <a
                        href={sol.href}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#171717] hover:text-[#353788] transition-colors"
                      >
                        <span>{sol.title}</span>
                        <ArrowRight className="w-3 h-3 text-[#353788] transition-transform duration-200 group-hover:translate-x-1" />
                      </a>
                      <p className="text-[11px] text-[#737373] mt-1 leading-normal">
                        {sol.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Column 4: Featured IT & Marketing Cards */}
                <div className="col-span-3 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#737373] block mb-2">
                    Featured Capabilities
                  </span>
                  {NAVIGATION_DATA.services.featuredCards.map((card) => (
                    <div
                      key={card.title}
                      className="p-3 rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] hover:bg-white hover:border-[#353788]/30 transition-all flex items-start gap-3 group"
                    >
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-[#171717] group-hover:text-[#353788] transition-colors">
                          {card.title}
                        </h4>
                        <p className="text-[11px] text-[#737373] line-clamp-2 mt-1 leading-normal">
                          {card.description}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-white border border-[#E8E8E8] flex items-center justify-center p-1">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* INDUSTRIES MEGA MENU */}
          {activeMenu === 'industries' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 bg-white border-b border-[#E8E8E8] shadow-[0_20px_48px_rgba(0,0,0,0.08)] py-8 px-6 md:px-12"
              onMouseEnter={() => handleMouseEnter('industries')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
                {/* Column 1 (6 Industries) */}
                <div className="col-span-4 border-r border-[#E8E8E8]/70 pr-6 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#737373] block mb-3">
                    Who We Serve (01 - 06)
                  </span>
                  {NAVIGATION_DATA.industries.column1.map((ind) => (
                    <a
                      key={ind.name}
                      href={ind.href}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F7F7F5] transition-all group"
                    >
                      <span className="text-[#353788] p-2 rounded-lg bg-[#353788]/5 group-hover:bg-[#353788]/10 transition-colors">
                        {getNavIcon(ind.iconName, "w-4 h-4")}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#171717] group-hover:text-[#353788] transition-colors truncate">
                          {ind.name}
                        </div>
                        <div className="text-[11px] text-[#737373] truncate">
                          {ind.tagline}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Column 2 (6 Industries) */}
                <div className="col-span-4 border-r border-[#E8E8E8]/70 pr-6 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#737373] block mb-3">
                    Who We Serve (07 - 12)
                  </span>
                  {NAVIGATION_DATA.industries.column2.map((ind) => (
                    <a
                      key={ind.name}
                      href={ind.href}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F7F7F5] transition-all group"
                    >
                      <span className="text-[#353788] p-2 rounded-lg bg-[#353788]/5 group-hover:bg-[#353788]/10 transition-colors">
                        {getNavIcon(ind.iconName, "w-4 h-4")}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#171717] group-hover:text-[#353788] transition-colors truncate">
                          {ind.name}
                        </div>
                        <div className="text-[11px] text-[#737373] truncate">
                          {ind.tagline}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Column 3: Platform Overview */}
                <div className="col-span-4 space-y-6 pl-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#737373] block mb-3">
                    Enterprise Platform
                  </span>
                  {NAVIGATION_DATA.industries.platformSolutions.map((sol) => (
                    <div key={sol.title} className="p-4 rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] group">
                      <a
                        href={sol.href}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#171717] group-hover:text-[#353788] transition-colors"
                      >
                        <span>{sol.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#353788] transition-transform duration-200 group-hover:translate-x-1" />
                      </a>
                      <p className="text-xs text-[#737373] mt-1.5 leading-relaxed">
                        {sol.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* INSIGHT DROPDOWN MENU */}
          {activeMenu === 'insight' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-1/2 -translate-x-14 w-80 bg-white border border-[#E8E8E8] rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.08)] p-3"
              onMouseEnter={() => handleMouseEnter('insight')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="space-y-1">
                {NAVIGATION_DATA.insight.map((item) => (
                  <a
                    key={item.title}
                    href={item.internalId ? `#${item.internalId}` : item.href}
                    onClick={(e) => {
                      if (item.internalId) {
                        e.preventDefault();
                        scrollToSection(item.internalId);
                      }
                    }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F7F7F5] transition-all group"
                  >
                    <span className="text-[#353788] p-2 rounded-lg bg-[#353788]/5 group-hover:bg-[#353788]/10 transition-colors mt-0.5">
                      {getNavIcon(item.iconName, "w-4 h-4")}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-[#171717] group-hover:text-[#353788] transition-colors flex items-center gap-1">
                        <span>{item.title}</span>
                        <ArrowUpRight className="w-3 h-3 text-[#737373] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[11px] text-[#737373] mt-0.5 leading-normal">
                        {item.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ======================================================== */}
      {/* FULLSCREEN MOBILE MENU DRAWER                            */}
      {/* ======================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 pb-8 flex flex-col justify-between overflow-y-auto md:hidden"
          >
            <div className="space-y-4">
              <span className="text-[11px] uppercase font-bold tracking-widest text-[#737373] block">
                Menu Index
              </span>

              {/* Home */}
              <div className="border-b border-[#E8E8E8] pb-3">
                <a
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xl font-bold text-[#171717] hover:text-[#353788]"
                >
                  Home
                </a>
              </div>

              {/* Services Accordion */}
              <div className="border-b border-[#E8E8E8] pb-3">
                <button
                  onClick={() =>
                    setMobileExpandedTab(
                      mobileExpandedTab === 'services' ? null : 'services'
                    )
                  }
                  className="w-full flex items-center justify-between text-xl font-bold text-[#171717] hover:text-[#353788]"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      mobileExpandedTab === 'services' ? 'rotate-180 text-[#353788]' : 'text-[#737373]'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileExpandedTab === 'services' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-4 space-y-4 pl-2"
                    >
                      {/* Marketing Platform */}
                      <div>
                        <span className="text-xs font-bold text-[#353788] uppercase tracking-wider block mb-2">
                          Marketing Platform
                        </span>
                        <div className="space-y-2 pl-2">
                          {NAVIGATION_DATA.services.marketingPlatform.links.map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2 text-xs font-medium text-[#171717] hover:text-[#353788]"
                            >
                              {getNavIcon(link.iconName, "w-3.5 h-3.5 text-[#353788]")}
                              <span>{link.label}</span>
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Tech Development */}
                      <div>
                        <span className="text-xs font-bold text-[#353788] uppercase tracking-wider block mb-2">
                          Tech Development
                        </span>
                        <div className="space-y-2 pl-2">
                          {NAVIGATION_DATA.services.techDevelopment.links.map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2 text-xs font-medium text-[#171717] hover:text-[#353788]"
                            >
                              {getNavIcon(link.iconName, "w-3.5 h-3.5 text-[#353788]")}
                              <span>{link.label}</span>
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Platforms */}
                      <div>
                        <span className="text-xs font-bold text-[#353788] uppercase tracking-wider block mb-2">
                          Platforms & Solutions
                        </span>
                        <div className="space-y-2 pl-2">
                          {NAVIGATION_DATA.services.platformSolutions.map((sol) => (
                            <a
                              key={sol.title}
                              href={sol.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block text-xs font-medium text-[#171717] hover:text-[#353788]"
                            >
                              {sol.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Industries Accordion */}
              <div className="border-b border-[#E8E8E8] pb-3">
                <button
                  onClick={() =>
                    setMobileExpandedTab(
                      mobileExpandedTab === 'industries' ? null : 'industries'
                    )
                  }
                  className="w-full flex items-center justify-between text-xl font-bold text-[#171717] hover:text-[#353788]"
                >
                  <span>Industries</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      mobileExpandedTab === 'industries' ? 'rotate-180 text-[#353788]' : 'text-[#737373]'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileExpandedTab === 'industries' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-4 space-y-2.5 pl-2"
                    >
                      {[...NAVIGATION_DATA.industries.column1, ...NAVIGATION_DATA.industries.column2].map((ind) => (
                        <a
                          key={ind.name}
                          href={ind.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 text-xs font-medium text-[#171717] hover:text-[#353788]"
                        >
                          {getNavIcon(ind.iconName, "w-3.5 h-3.5 text-[#353788]")}
                          <span>{ind.name}</span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Insight Accordion */}
              <div className="border-b border-[#E8E8E8] pb-3">
                <button
                  onClick={() =>
                    setMobileExpandedTab(
                      mobileExpandedTab === 'insight' ? null : 'insight'
                    )
                  }
                  className="w-full flex items-center justify-between text-xl font-bold text-[#171717] hover:text-[#353788]"
                >
                  <span>Insight</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      mobileExpandedTab === 'insight' ? 'rotate-180 text-[#353788]' : 'text-[#737373]'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileExpandedTab === 'insight' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-4 space-y-2.5 pl-2"
                    >
                      {NAVIGATION_DATA.insight.map((item) => (
                        <a
                          key={item.title}
                          href={item.internalId ? `#${item.internalId}` : item.href}
                          onClick={(e) => {
                            if (item.internalId) {
                              e.preventDefault();
                              scrollToSection(item.internalId);
                            } else {
                              setMobileMenuOpen(false);
                            }
                          }}
                          className="flex items-center gap-2.5 text-xs font-medium text-[#171717] hover:text-[#353788]"
                        >
                          {getNavIcon(item.iconName, "w-3.5 h-3.5 text-[#353788]")}
                          <span>{item.title}</span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact Us */}
              <div className="border-b border-[#E8E8E8] pb-3">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block text-xl font-bold text-[#171717] hover:text-[#353788] text-left"
                >
                  Contact Us
                </button>
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="space-y-4 pt-6 border-t border-[#E8E8E8] mt-6">
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
                  if (onOpenConsultation) {
                    onOpenConsultation();
                  } else {
                    scrollToSection('contact');
                  }
                }}
                className="w-full py-3.5 rounded-full bg-[#171717] hover:bg-[#353788] text-white text-xs font-bold uppercase tracking-widest text-center transition-colors"
              >
                Request A Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
