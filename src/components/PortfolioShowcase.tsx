import React, { useState, useRef } from 'react';
import { PORTFOLIO_DATA, type ProjectItem } from '../data/retrotechData';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal } from 'lucide-react';

interface PortfolioShowcaseProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
  onOpenConsultation?: () => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  onCursorChange,
  onOpenConsultation,
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [viewMode, setViewMode] = useState<'horizontal' | 'grid'>('horizontal');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollHorizontal = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 600;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="work" className="py-24 md:py-36 bg-[#F7F7F5] border-b border-[#E8E8E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-20 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#353788]">
                02 &bull; Selected Portfolio
              </span>
              <div className="w-12 h-[1px] bg-[#353788]" />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-[#171717] leading-[1.05]">
              Bespoke Work <br />
              <span className="font-serif italic font-normal text-[#353788]">&amp; Transformative Deployments</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* View Mode Toggle */}
            <div className="inline-flex p-1 bg-white rounded-full border border-[#E8E8E8] self-start sm:self-auto">
              <button
                onClick={() => setViewMode('horizontal')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  viewMode === 'horizontal'
                    ? 'bg-[#171717] text-white shadow-sm'
                    : 'text-[#737373] hover:text-[#171717]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Story Strip</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#171717] text-white shadow-sm'
                    : 'text-[#737373] hover:text-[#171717]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Editorial Grid</span>
              </button>
            </div>

            {/* Navigation Arrows for Horizontal Strip */}
            {viewMode === 'horizontal' && (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => scrollHorizontal('left')}
                  className="w-10 h-10 rounded-full bg-white border border-[#E8E8E8] hover:border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#F0F0EE] transition-colors"
                  aria-label="Scroll work left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollHorizontal('right')}
                  className="w-10 h-10 rounded-full bg-white border border-[#E8E8E8] hover:border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#F0F0EE] transition-colors"
                  aria-label="Scroll work right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* View 1: Horizontal Storytelling Carousel */}
        {viewMode === 'horizontal' ? (
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto no-scrollbar pb-8 pt-2 scroll-smooth cursor-grab active:cursor-grabbing -mx-6 px-6 md:-mx-12 md:px-12"
          >
            {PORTFOLIO_DATA.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => onCursorChange?.('project', 'VIEW CASE')}
                onMouseLeave={() => onCursorChange?.('default')}
                className="shrink-0 w-[85vw] sm:w-[480px] md:w-[560px] group cursor-pointer"
              >
                {/* Project Card */}
                <div className="bg-white rounded-2xl md:rounded-3xl border border-[#E8E8E8] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500">
                  {/* Image Container with Zoom & Crop */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-[#F0F0EE]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Metric Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[#353788] shadow-sm">
                      {project.metrics}
                    </div>

                    {/* Arrow Pin */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-[#171717] flex items-center justify-center shadow-md transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-white/90 block">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-xl md:text-2xl font-extrabold text-[#171717] group-hover:text-[#353788] transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono text-[#737373]">
                        0{idx + 1} &bull; {project.year}
                      </span>
                    </div>

                    <p className="text-xs md:text-sm text-[#737373] leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {project.deliverables.slice(0, 3).map((item, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded bg-[#F7F7F5] border border-[#E8E8E8] text-[11px] font-medium text-[#171717]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* View 2: Asymmetric Editorial Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
            {PORTFOLIO_DATA.map((project, idx) => {
              const isLarge = idx === 0 || idx === 3;
              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  onMouseEnter={() => onCursorChange?.('project', 'VIEW CASE')}
                  onMouseLeave={() => onCursorChange?.('default')}
                  className={`cursor-pointer group ${
                    isLarge ? 'lg:col-span-7' : 'lg:col-span-5'
                  }`}
                >
                  <div className="bg-white rounded-2xl md:rounded-3xl border border-[#E8E8E8] overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500">
                    <div className={`relative overflow-hidden bg-[#F0F0EE] ${isLarge ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[#353788] shadow-sm">
                        {project.metrics}
                      </div>
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-[#171717] flex items-center justify-center shadow-md transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-[#737373]">
                        <span>0{idx + 1} &bull; {project.category}</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-[#171717] group-hover:text-[#353788] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs md:text-sm text-[#737373] leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Callout */}
        <div className="mt-16 text-center">
          <p className="text-xs text-[#737373] uppercase tracking-widest font-bold mb-3">
            Over 250+ Custom Enterprise Solutions Built
          </p>
          <button
            onClick={onOpenConsultation || (() => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            })}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#353788] hover:text-[#171717] transition-colors group"
          >
            <span>Have an ambitious project in mind? Let's engineer it together</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenConsultation={onOpenConsultation}
      />
    </section>
  );
};
