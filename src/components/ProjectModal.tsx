import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type ProjectItem } from '../data/retrotechData';
import { X, CheckCircle } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenConsultation?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenConsultation,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white w-full max-w-4xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-[#E8E8E8] max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#E8E8E8] px-6 sm:px-8 py-5 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#353788]">
                Case Study
              </span>
              <span className="text-xs text-[#737373]">&bull; {project.category}</span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-[#E8E8E8] hover:border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#F7F7F5] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 md:p-10 overflow-y-auto space-y-8">
            {/* Header info */}
            <div>
              <span className="text-xs font-mono text-[#737373]">{project.year} &bull; Client: {project.client}</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] mt-1 tracking-tightest">
                {project.title}
              </h2>
            </div>

            {/* Hero Banner Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-[#F7F7F5] border border-[#E8E8E8]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#353788] shadow-sm">
                Impact: {project.metrics}
              </div>
            </div>

            {/* Project Overview & Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8 space-y-4">
                <h4 className="text-sm uppercase tracking-widest font-bold text-[#171717]">
                  The Challenge &amp; Architectural Solution
                </h4>
                <p className="text-sm sm:text-base text-[#737373] leading-relaxed">
                  {project.description}
                </p>
                <p className="text-sm text-[#737373] leading-relaxed">
                  Our engineering team deployed an iterative methodology, commencing with rigorous stakeholder discovery, UX wireframing, component-driven design systems, and distributed cloud microservices.
                </p>
              </div>

              <div className="md:col-span-4 bg-[#F7F7F5] rounded-xl p-5 border border-[#E8E8E8] space-y-4">
                <span className="text-xs uppercase font-bold tracking-widest text-[#171717] block">
                  Project Highlights
                </span>
                <div className="space-y-2">
                  {project.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#171717]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#353788] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-[#E8E8E8]">
                  <span className="text-[10px] uppercase tracking-wider text-[#737373] block mb-1">
                    Key Performance Outcome
                  </span>
                  <span className="text-base font-bold text-[#353788]">
                    {project.metrics}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA in Modal */}
            <div className="p-6 bg-[#F4F5FB] rounded-2xl border border-[#353788]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h5 className="text-sm font-bold text-[#171717]">
                  Inspired by this case study?
                </h5>
                <p className="text-xs text-[#737373]">
                  Let's engineer an equivalent competitive advantage for your company.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenConsultation?.();
                }}
                className="px-5 py-2.5 rounded-full bg-[#171717] hover:bg-[#353788] text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
              >
                Discuss Similar Project
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
