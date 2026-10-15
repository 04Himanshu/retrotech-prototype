import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS_DATA } from '../data/retrotechData';
import {
  ChevronDown,
  HelpCircle,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

interface FAQSectionProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
  onOpenConsultation?: () => void;
}

interface FAQItemData {
  id: string;
  question: string;
  answer: string;
  badge?: string;
}

const EXTENDED_FAQS: FAQItemData[] = [
  {
    id: 'faq-1',
    question: FAQS_DATA[0]?.question || 'What IT services does your company provide?',
    answer: FAQS_DATA[0]?.answer || 'We provide website development, mobile app development, custom software solutions, UI/UX design, cloud services, digital marketing, SEO, and ongoing IT support.',
    badge: 'Services',
  },
  {
    id: 'faq-2',
    question: FAQS_DATA[1]?.question || 'Do you provide customized solutions for businesses?',
    answer: FAQS_DATA[1]?.answer || 'Yes, we develop customized IT solutions based on your business requirements, target audience, workflow, budget, and long-term goals.',
    badge: 'Customization',
  },
  {
    id: 'faq-3',
    question: FAQS_DATA[2]?.question || 'How long does it take to complete an IT project?',
    answer: FAQS_DATA[2]?.answer || 'The project timeline depends on its scope, features, and complexity. After reviewing your requirements, our team provides a clear development plan and estimated delivery timeline.',
    badge: 'Timeline',
  },
  {
    id: 'faq-4',
    question: FAQS_DATA[3]?.question || 'Do you provide support after the project is completed?',
    answer: FAQS_DATA[3]?.answer || 'Yes, we provide post-launch maintenance, technical support, security updates, performance monitoring, bug fixes, and future enhancements to keep your solution running smoothly.',
    badge: 'Support',
  },
  {
    id: 'faq-5',
    question: 'How do we begin our engagement with Retrotech?',
    answer: 'Getting started is straightforward. We begin with a discovery conversation to understand your goals, technical requirements, and target timeline, followed by a detailed scope of work and transparent milestone roadmap.',
    badge: 'Process',
  },
];

export const FAQSection: React.FC<FAQSectionProps> = ({
  onCursorChange,
  onOpenConsultation,
}) => {
  const [openId, setOpenId] = useState<string>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="faq"
      className="py-10 sm:py-12 md:py-14 bg-[#FFFFFF] border-b border-[#E8E8E8] relative overflow-hidden"
    >
      {/* Background Subtle Gradient Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#353788]/[0.025] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#8A8DF8]/[0.025] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-7 sm:mb-8">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#353788]">
              FAQs
            </span>
            <div className="w-8 h-[1px] bg-[#353788]/60" />
            <span className="text-[9.5px] tracking-widest uppercase text-[#737373] font-mono">
              Knowledge Base
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tightest text-[#171717] leading-tight">
            Frequently Asked{' '}
            <span className="font-serif italic font-normal text-[#353788]">
              Questions
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#737373] leading-relaxed">
            Get clear answers to common questions about our development scope, custom solutions, delivery timelines, and post-launch IT support.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Clean Helpful Consultation Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="p-7 sm:p-8 rounded-3xl bg-[#F7F7F5] border border-[#E8E8E8] shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative overflow-hidden">
              {/* Subtle Ambient Radial Highlight */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#353788]/[0.035] rounded-full blur-2xl pointer-events-none" />

              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E8E8] text-[#353788] flex items-center justify-center shadow-xs mb-6">
                <HelpCircle className="w-6 h-6" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#171717] tracking-tight mb-3">
                Have a question that isn't answered here?
              </h3>

              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed mb-6">
                Our technology consultants are ready to discuss your specific project requirements, architectural options, and delivery milestones.
              </p>

              {/* Verified Trust Commitments */}
              <div className="space-y-2.5 mb-8 pt-4 border-t border-[#E8E8E8]">
                {[
                  'Direct consultation with senior developers',
                  'Clear milestones and transparent delivery plan',
                  'Confidential NDA & free initial evaluation',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#525252]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Call to Action Button */}
              <button
                onClick={
                  onOpenConsultation ||
                  (() => {
                    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: object) => void } }).__lenis;
                    if (lenis) {
                      lenis.scrollTo('#contact', { offset: -80, duration: 1.2 });
                    } else {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  })
                }
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#171717] hover:bg-[#353788] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
                onMouseEnter={() => onCursorChange?.('hover')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                <span>Ask Our Team</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Clean Accordion Stack */}
          <div className="lg:col-span-7 space-y-4">
            {EXTENDED_FAQS.map((faq, index) => {
              const isOpen = openId === faq.id;
              const itemNumber = String(index + 1).padStart(2, '0');

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 bg-white relative overflow-hidden ${isOpen
                      ? 'border-[#353788]/50 shadow-[0_12px_32px_rgba(53,55,136,0.06)]'
                      : 'border-[#E8E8E8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#353788]/30'
                    }`}
                >
                  {/* Subtle Ambient Top Border Highlight on Active */}
                  <div
                    className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#353788] to-transparent transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                      }`}
                  />

                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer select-none group"
                    onMouseEnter={() => onCursorChange?.('hover')}
                    onMouseLeave={() => onCursorChange?.('default')}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="font-mono text-xs font-bold text-[#353788] bg-[#F4F5FB] px-2 py-0.5 rounded border border-[#353788]/15 shrink-0 mt-0.5">
                        {itemNumber}
                      </span>

                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          {faq.badge && (
                            <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#737373] font-medium">
                              {faq.badge}
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-[#171717] group-hover:text-[#353788] transition-colors leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen
                          ? 'rotate-180 bg-[#353788] text-white border-[#353788] shadow-xs'
                          : 'bg-[#F7F7F5] text-[#171717] border-[#E8E8E8] group-hover:bg-[#353788] group-hover:text-white group-hover:border-[#353788]'
                        }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Expandable Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-[13px] text-[#525252] leading-relaxed border-t border-[#F0F0EE]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

