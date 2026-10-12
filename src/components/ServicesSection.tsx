import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES_DATA, type ServiceItem } from '../data/retrotechData';
import { ArrowUpRight, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
  onSelectServiceForContact?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onCursorChange,
  onSelectServiceForContact,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredService, setHoveredService] = useState<ServiceItem | null>(SERVICES_DATA[0]);
  const [activeExpandedId, setActiveExpandedId] = useState<string | null>(SERVICES_DATA[0].id);

  const categories = ['All', 'Tech Development', 'Marketing Platform'];

  const filteredServices = selectedCategory === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === selectedCategory);

  return (
    <section id="services" className="py-24 md:py-36 bg-[#FFFFFF] border-b border-[#E8E8E8] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#353788]">
                01 &bull; Core Capabilities
              </span>
              <div className="w-12 h-[1px] bg-[#353788]" />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-[#171717] leading-[1.05]">
              Full-Spectrum Engineering <br />
              <span className="font-serif italic font-normal text-[#353788]">&amp; Digital Performance</span>
            </h2>
          </div>

          <p className="max-w-md text-sm md:text-base text-[#737373] leading-relaxed">
            Every service is tailored to your business model. From initial architectural discovery to high-concurrency cloud deployments and market penetration.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pb-8 mb-8 border-b border-[#E8E8E8]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#171717] text-white shadow-sm'
                  : 'bg-[#F7F7F5] text-[#737373] hover:text-[#171717] hover:bg-[#E8E8E8]'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-xs font-mono text-[#737373] hidden sm:inline">
            Showing {filteredServices.length} Solutions
          </span>
        </div>

        {/* Interactive Editorial Services Layout (Two-Column with Live Floating Preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Services Rows List (Cols 1-7) */}
          <div className="lg:col-span-7 divide-y divide-[#E8E8E8]">
            {filteredServices.map((service, index) => {
              const isExpanded = activeExpandedId === service.id;

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => {
                    setHoveredService(service);
                    onCursorChange?.('hover');
                  }}
                  onMouseLeave={() => onCursorChange?.('default')}
                  className={`py-8 transition-colors duration-300 group cursor-pointer ${
                    isExpanded ? 'bg-[#F7F7F5]/50 px-4 -mx-4 rounded-xl' : ''
                  }`}
                  onClick={() => setActiveExpandedId(isExpanded ? null : service.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-[#353788]">
                          0{index + 1}
                        </span>
                        <span className="text-[11px] font-bold tracking-widest uppercase text-[#737373]">
                          {service.category}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#171717] group-hover:text-[#353788] transition-colors flex items-center gap-3">
                        {service.title}
                      </h3>
                      
                      <p className="text-sm text-[#737373] max-w-xl line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-2">
                      <div className={`w-10 h-10 rounded-full border border-[#E8E8E8] flex items-center justify-center transition-all duration-300 ${
                        isExpanded ? 'bg-[#353788] border-[#353788] text-white rotate-90' : 'group-hover:border-[#171717] text-[#171717]'
                      }`}>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail Tray */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden pt-6 mt-4 border-t border-[#E8E8E8]/70"
                      >
                        <div className="space-y-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                            Key Deliverables &amp; Architectural Highlights:
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {service.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2 text-xs text-[#737373] leading-relaxed">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#353788] shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Technology Badges */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 rounded bg-white border border-[#E8E8E8] text-[11px] font-medium text-[#171717]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Action Button */}
                          <div className="pt-3 flex items-center gap-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectServiceForContact?.(service.title);
                                const el = document.getElementById('contact');
                                el?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#353788] hover:text-[#171717] transition-colors py-1 group/btn"
                            >
                              <span>Book consultation for {service.title}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Sticky Visual Showcase & Image Preview (Cols 8-12) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-[#F7F7F5] rounded-2xl p-6 border border-[#E8E8E8] overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E8] mb-6">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#737373]">
                  Service Focus Preview
                </span>
                <span className="text-xs font-mono text-[#353788] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Live Architecture
                </span>
              </div>

              {hoveredService && (
                <div className="space-y-6">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-white border border-[#E8E8E8]">
                    <img
                      src={hoveredService.image}
                      alt={hoveredService.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="text-[10px] uppercase font-bold tracking-widest text-white/80">
                        {hoveredService.category}
                      </div>
                      <div className="text-sm font-bold">
                        {hoveredService.subtitle}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-[#171717] mb-2">
                      {hoveredService.title}
                    </h4>
                    <p className="text-xs text-[#737373] leading-relaxed">
                      {hoveredService.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8E8E8] flex items-center justify-between">
                    <span className="text-[11px] text-[#737373]">
                      Continuous Maintenance &bull; SLA Backed
                    </span>
                    <button
                      onClick={() => {
                        onSelectServiceForContact?.(hoveredService.title);
                        const el = document.getElementById('contact');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded-full bg-[#171717] hover:bg-[#353788] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
