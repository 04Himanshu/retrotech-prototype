import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS_DATA } from '../data/retrotechData';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface TestimonialsSectionProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onCursorChange }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(TESTIMONIALS_DATA.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentReviews = TESTIMONIALS_DATA.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 md:py-24 bg-[#F7F7F5] border-b border-[#E8E8E8] relative overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] bg-[#353788]/[0.035] rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 -right-32 w-[450px] h-[450px] bg-[#10B981]/[0.025] rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header - Matching Live Site */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#353788]">
                Client Reviews
              </span>
              <div className="w-8 h-[1px] bg-[#353788]/60" />
              <span className="text-[9.5px] tracking-widest uppercase text-[#737373] font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span>Verified Global Feedback</span>
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tightest text-[#171717] leading-tight">
              Trusted by Businesses,{' '}
              <span className="font-serif italic font-normal text-[#353788]">
                Empowered by Results.
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#737373] max-w-2xl leading-relaxed">
              Customer experiences that speak for themselves. Discover how our digital solutions have helped ambitious companies scale globally.
            </p>
          </div>

          {/* Social Proof Metric Badge */}
          <div className="flex items-center gap-4 bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E8E8E8] shadow-xs">
            <div className="flex flex-col items-center justify-center pr-4 border-r border-[#E8E8E8]">
              <div className="flex items-center gap-1 text-amber-500 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#171717]">4.9 out of 5</span>
            </div>
            <div>
              <div className="text-xs font-bold text-[#171717]">5,000+ Happy Clients</div>
              <div className="text-[11px] text-[#737373]">Google &bull; Trustpilot &bull; Meta</div>
            </div>
          </div>
        </div>

        {/* Testimonials 3-Card Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {currentReviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-[#E8E8E8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#353788]/40 hover:shadow-[0_12px_36px_rgba(53,55,136,0.08)] transition-all duration-300"
                onMouseEnter={() => onCursorChange?.('hover')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                <div>
                  {/* Card Top: Rating Stars & Country Flag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#737373] bg-[#F7F7F5] px-2.5 py-1 rounded-full border border-[#E8E8E8]">
                      <span>{review.flag}</span>
                      <span>{review.country}</span>
                    </div>
                  </div>

                  {/* Service Tag */}
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#F4F5FB] text-[#353788] border border-[#353788]/15 mb-3">
                    {review.service}
                  </div>

                  {/* Review Content */}
                  <p className="text-sm text-[#171717] leading-relaxed italic mb-6">
                    "{review.content}"
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="pt-4 border-t border-[#F0F0EE] flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#E8E8E8]"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#171717] leading-tight flex items-center gap-1.5">
                      <span>{review.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    </h4>
                    <p className="text-xs text-[#737373] mt-0.5">
                      {review.role}, <span className="font-medium text-[#171717]">{review.company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Controls */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#E8E8E8]">
          <div className="text-xs font-mono text-[#737373]">
            Showing <span className="font-bold text-[#171717]">Page {currentPage + 1}</span> of {totalPages} ({TESTIMONIALS_DATA.length} Verified Reviews)
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              className="w-10 h-10 rounded-full bg-white border border-[#E8E8E8] hover:border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#171717] hover:text-white transition-all cursor-pointer shadow-xs"
              aria-label="Previous reviews"
              onMouseEnter={() => onCursorChange?.('hover')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPage}
              className="w-10 h-10 rounded-full bg-white border border-[#E8E8E8] hover:border-[#171717] flex items-center justify-center text-[#171717] hover:bg-[#171717] hover:text-white transition-all cursor-pointer shadow-xs"
              aria-label="Next reviews"
              onMouseEnter={() => onCursorChange?.('hover')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
