import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS_DATA } from '../data/retrotechData';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data/retrotechData';

interface FAQSectionProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onCursorChange }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 md:py-36 bg-[#FFFFFF] border-b border-[#E8E8E8] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Header (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#353788]">
                06 &bull; FAQs
              </span>
              <div className="w-12 h-[1px] bg-[#353788]" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tightest text-[#171717] leading-[1.08]">
              Frequently Asked <br />
              <span className="font-serif italic font-normal text-[#353788]">Questions</span>
            </h2>

            <p className="text-sm md:text-base text-[#737373] leading-relaxed">
              Transparent answers regarding our development timelines, custom architecture, post-deployment maintenance, and collaboration methodology.
            </p>

            <div className="p-6 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E8] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171717]">
                <HelpCircle className="w-4 h-4 text-[#353788]" />
                Have a customized question?
              </div>
              <p className="text-xs text-[#737373]">
                Chat directly with our solution architects on WhatsApp or schedule an introductory discovery call.
              </p>
              <a
                href={COMPANY_INFO.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006a43] hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Instant Connect</span>
              </a>
            </div>
          </div>

          {/* Accordion List (Cols 6-12) */}
          <div className="lg:col-span-7 divide-y divide-[#E8E8E8]">
            {FAQS_DATA.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className="py-6 first:pt-0 group cursor-pointer"
                  onClick={() => toggle(idx)}
                  onMouseEnter={() => onCursorChange?.('hover')}
                  onMouseLeave={() => onCursorChange?.('default')}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base sm:text-lg font-bold text-[#171717] group-hover:text-[#353788] transition-colors">
                      {faq.question}
                    </h3>
                    <div
                      className={`w-8 h-8 rounded-full border border-[#E8E8E8] flex items-center justify-center text-[#171717] transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 bg-[#171717] text-white border-[#171717]' : 'group-hover:border-[#171717]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-xs sm:text-sm text-[#737373] leading-relaxed">
                          {faq.answer}
                        </p>
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
