import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA, type ProjectItem } from '../data/retrotechData';
import { ProjectModal } from './ProjectModal';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface PortfolioShowcaseProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
  onOpenConsultation?: () => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  onCursorChange,
  onOpenConsultation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const totalItems = PORTFOLIO_DATA.length;

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll listener for sticky 3D parabolic deck (matching fromanother.love Section 6 Awards)
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableDistance = rect.height - window.innerHeight;

      if (totalScrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.min(Math.max(currentScroll / totalScrollableDistance, 0), 1);
      setScrollProgress(rawProgress);

      const targetIndex = Math.min(
        Math.floor(rawProgress * totalItems),
        totalItems - 1
      );
      setActiveIndex(targetIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, totalItems]);

  // Jump to specific project
  const jumpToIndex = (index: number) => {
    setActiveIndex(index);
    if (!isMobile && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      const targetScrollTop =
        window.scrollY + rect.top + (index / (totalItems - 1)) * totalScrollable;
      window.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
    }
  };

  const activeProject: ProjectItem = PORTFOLIO_DATA[activeIndex] || PORTFOLIO_DATA[0];

  return (
    <>
      <section
        id="work"
        ref={containerRef}
        className={`relative bg-[#F9F9F8] text-[#171717] border-b border-[#E8E8E8] selection:bg-[#353788] selection:text-white ${
          isMobile ? 'py-12' : 'h-[290vh]'
        }`}
      >
        {/* Subtle Background Geometry */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#353788]/[0.03] rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
        </div>

        {/* Sticky 3D Deck Viewport */}
        <div
          className={`${
            isMobile
              ? 'relative max-w-7xl mx-auto px-6'
              : 'sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-8 px-6 md:px-12 lg:px-16 z-10'
          }`}
        >
          {/* Header Bar */}
          <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E8E8E8] shrink-0">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#353788]">
                  02 &bull; Selected Portfolio
                </span>
                <div className="w-8 h-[1px] bg-[#353788]/60" />
                <span className="text-[9px] tracking-widest uppercase text-[#737373] font-mono">
                  Curated Deployments
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#171717] leading-tight">
                Bespoke Work{' '}
                <span className="font-serif italic font-normal text-[#353788]">
                  &amp; Transformative Deployments
                </span>
              </h2>
            </div>

            <div className="flex flex-col md:items-end gap-1.5 max-w-sm">
              <p className="text-xs text-[#737373] leading-relaxed md:text-right">
                Flagship digital architectures, commerce platforms, and SaaS products delivered with precision.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#737373]">
                <span>SHOWCASE DECK</span>
                <span className="text-[#171717] font-semibold text-xs bg-white px-2.5 py-0.5 rounded-full border border-[#E8E8E8] shadow-sm">
                  0{activeIndex + 1} &bull; 0{totalItems}
                </span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* DESKTOP 3D PARABOLIC CARD DECK (fromanother.love Sec 6)  */}
          {/* ======================================================== */}
          {!isMobile ? (
            <div className="relative flex-1 w-full flex items-center justify-center overflow-visible min-h-0 py-2 select-none">
              {/* Central Deck Container */}
              <div className="relative w-full h-[520px] flex items-center justify-center">
                {PORTFOLIO_DATA.map((project, index) => {
                  // Mathematical physics from fromanother.love Section 6:
                  // --card-rel-pos: calc(var(--card-index) - var(--awards-progress, 0) * var(--awards-last-index, 0))
                  // --card-offset-x: calc(var(--awards-item-gap-x) * var(--card-rel-pos))
                  // --card-offset-y: calc(var(--awards-item-gap-y) * pow(abs(var(--card-rel-pos)), 1.5))
                  // transform: translate(var(--card-offset-x), var(--card-offset-y)) rotate(calc(var(--card-rel-pos) * var(--awards-rotation-per-step) * 1deg))
                  // transform-origin: 50% 150%
                  const relPos = index - scrollProgress * (totalItems - 1);
                  const gapX = 390; // px
                  const gapY = 26; // px curvature factor
                  const rotationPerStep = 4.2; // degrees

                  const offsetX = gapX * relPos;
                  const offsetY = gapY * Math.pow(Math.abs(relPos), 1.5);
                  const rotateDeg = relPos * rotationPerStep;

                  const isActive = Math.abs(relPos) < 0.55;
                  const absRel = Math.abs(relPos);
                  const scale = Math.max(0.86, 1 - absRel * 0.05);
                  const zIndex = Math.max(1, 30 - Math.round(absRel * 5));
                  const opacity = Math.max(0.4, 1 - absRel * 0.18);

                  return (
                    <motion.div
                      key={project.id}
                      onClick={() => {
                        if (isActive) {
                          setSelectedProject(project);
                        } else {
                          jumpToIndex(index);
                        }
                      }}
                      onMouseEnter={() =>
                        onCursorChange?.(
                          'project',
                          isActive ? 'VIEW CASE' : `PROJECT 0${index + 1}`
                        )
                      }
                      onMouseLeave={() => onCursorChange?.('default')}
                      style={{
                        position: 'absolute',
                        width: '350px',
                        height: '470px',
                        transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotateDeg}deg) scale(${scale})`,
                        transformOrigin: '50% 140%',
                        zIndex,
                        opacity,
                        willChange: 'transform, opacity',
                        cursor: 'pointer',
                        transition:
                          'box-shadow 0.3s ease, border-color 0.3s ease, filter 0.3s ease',
                      }}
                      className={`group rounded-2xl bg-white border overflow-hidden transition-all duration-300 ${
                        isActive
                          ? 'border-[#353788]/40 shadow-[0_24px_54px_rgba(53,55,136,0.14)] ring-1 ring-[#353788]/20'
                          : 'border-[#E8E8E8] shadow-[0_12px_32px_rgba(0,0,0,0.04)] hover:border-[#353788]/30'
                      }`}
                    >
                      {/* Top Poster Image Area */}
                      <div className="relative w-full h-[255px] overflow-hidden bg-[#F0F0EE]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                        {/* Metric Badge */}
                        <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#353788] shadow-sm flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>{project.metrics}</span>
                        </div>

                        {/* Top-Right Arrow Action */}
                        <div
                          className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white text-[#171717] flex items-center justify-center shadow-md transition-all duration-300 ${
                            isActive
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                          }`}
                        >
                          <ArrowUpRight className="w-4 h-4 text-[#353788]" />
                        </div>

                        {/* Category Label at bottom of image */}
                        <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-white/90 truncate block">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Info Section */}
                      <div className="p-4 sm:p-5 flex flex-col justify-between h-[215px] space-y-2.5">
                        <div>
                          {/* Client & Year */}
                          <div className="flex items-center justify-between text-[11px] font-mono text-[#737373] mb-1">
                            <span className="truncate max-w-[200px]">{project.client}</span>
                            <span className="font-semibold text-[#171717]">
                              0{index + 1} &bull; {project.year}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-base sm:text-lg font-bold text-[#171717] group-hover:text-[#353788] transition-colors leading-snug line-clamp-1">
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className="text-xs text-[#737373] line-clamp-2 leading-relaxed mt-1">
                            {project.description}
                          </p>
                        </div>

                        {/* Deliverables tags & Action */}
                        <div className="pt-2 border-t border-[#F0F0EE] flex items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-1 overflow-hidden max-h-5">
                            {project.deliverables.slice(0, 2).map((deliv, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-[#F7F7F5] border border-[#E8E8E8] text-[9px] font-mono text-[#737373] truncate"
                              >
                                {deliv}
                              </span>
                            ))}
                          </div>

                          <span className="text-[10px] font-bold text-[#353788] uppercase tracking-wider shrink-0 group-hover:underline flex items-center gap-0.5">
                            Details
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Parabolic Edge Shadows for Cinematic Depth */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F9F9F8] to-transparent pointer-events-none z-20" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F9F9F8] to-transparent pointer-events-none z-20" />
            </div>
          ) : (
            /* ======================================================== */
            /* MOBILE TOUCH-FRIENDLY CASE STUDY CARDS                   */
            /* ======================================================== */
            <div className="pt-8 space-y-5">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {PORTFOLIO_DATA.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      idx === activeIndex
                        ? 'bg-[#171717] text-white shadow-sm'
                        : 'bg-white text-[#737373] border border-[#E8E8E8]'
                    }`}
                  >
                    0{idx + 1} &bull; {proj.title}
                  </button>
                ))}
              </div>

              {/* Active Mobile Project */}
              <div
                onClick={() => setSelectedProject(activeProject)}
                className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden shadow-sm p-4 space-y-3 cursor-pointer"
              >
                <div className="relative h-44 rounded-xl overflow-hidden bg-[#F0F0EE]">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-white/95 px-2.5 py-1 rounded-full text-[10px] font-bold text-[#353788] shadow-sm">
                    {activeProject.metrics}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#737373]">
                    <span>{activeProject.client}</span>
                    <span>{activeProject.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#171717]">
                    {activeProject.title}
                  </h3>
                  <p className="text-xs text-[#737373] leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                <button className="w-full py-2.5 rounded-full bg-[#171717] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* BOTTOM CONTROLS & PARABOLIC STEPPERS                     */}
          {/* ======================================================== */}
          <div className="max-w-7xl w-full mx-auto flex items-center justify-between pt-3 border-t border-[#E8E8E8] shrink-0">
            {/* Project Pagination Indicator Lines (fromanother.love) */}
            <div className="flex items-center gap-2">
              {PORTFOLIO_DATA.map((_, i) => (
                <button
                  key={i}
                  onClick={() => jumpToIndex(i)}
                  aria-label={`Jump to project ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? 'w-8 h-1.5 bg-[#353788]'
                      : 'w-2 h-1.5 bg-[#D4D4D0] hover:bg-[#A3A3A0]'
                  }`}
                />
              ))}
            </div>

            {/* Stepper Buttons & Scroll Guide */}
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-[10px] font-mono text-[#737373] tracking-wider">
                SCROLL TO NAVIGATE 3D PARABOLIC DECK
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => jumpToIndex(Math.max(0, activeIndex - 1))}
                  disabled={activeIndex === 0}
                  aria-label="Previous project"
                  className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#171717] hover:bg-[#F0F0EE] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => jumpToIndex(Math.min(totalItems - 1, activeIndex + 1))}
                  disabled={activeIndex === totalItems - 1}
                  aria-label="Next project"
                  className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#171717] hover:bg-[#F0F0EE] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Architectural Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenConsultation={onOpenConsultation}
      />
    </>
  );
};
