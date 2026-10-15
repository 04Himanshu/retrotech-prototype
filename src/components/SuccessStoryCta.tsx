import React from 'react';
import { COMPANY_INFO } from '../data/retrotechData';
import { MessageSquare, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';

interface SuccessStoryCtaProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
  onOpenConsultation?: () => void;
}

export const SuccessStoryCta: React.FC<SuccessStoryCtaProps> = ({
  onCursorChange,
  onOpenConsultation,
}) => {
  const highlights = [
    'Website Development',
    'Digital Marketing',
    'SEO Optimization',
    'Custom Software',
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#171717] text-white relative overflow-hidden">
      {/* Background Subtle Mesh and Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#353788]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#10B981]/15 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-6">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#A5B4FC]" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/90">
              Ready to Accelerate Growth?
            </span>
          </div>

          {/* Heading - Strictly Matching Live Site Copy */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest leading-[1.08]">
            Let's Build Your Next{' '}
            <span className="font-serif italic font-normal text-[#A5B4FC]">
              Digital Success Story.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
            Whether you need a professional website, SEO, digital marketing, branding, or custom software development, our experts are ready to help your business grow.
          </p>

          {/* Action Highlights Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {highlights.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                <span>{item}</span>
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#contact"
              onClick={onOpenConsultation}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#353788] hover:bg-[#4346A8] text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 cursor-pointer"
              onMouseEnter={() => onCursorChange?.('hover')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              <span>Request A Call</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </div>
            </a>

            <a
              href={COMPANY_INFO.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 cursor-pointer"
              onMouseEnter={() => onCursorChange?.('hover')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
