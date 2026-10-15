import React from 'react';
import { motion } from 'framer-motion';
import { BLOGS_DATA } from '../data/retrotechData';
import { Calendar, MessageSquare, ArrowUpRight } from 'lucide-react';

interface BlogSectionProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onCursorChange }) => {
  return (
    <section
      id="blog"
      className="py-16 sm:py-20 md:py-24 bg-[#FFFFFF] border-b border-[#E8E8E8] relative overflow-hidden"
    >
      {/* Background Ambient Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-[#353788]/[0.025] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header - Strictly Matching Live Website */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#353788]">
                From the Blog
              </span>
              <div className="w-8 h-[1px] bg-[#353788]/60" />
              <span className="text-[9.5px] tracking-widest uppercase text-[#737373] font-mono">
                News &amp; Technical Insights
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tightest text-[#171717] leading-tight">
              Check Out Latest{' '}
              <span className="font-serif italic font-normal text-[#353788]">
                News Update &amp; Articles
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#737373] max-w-2xl leading-relaxed">
              Explore in-depth analyses, industry best practices, and engineering guides to keep your business ahead in the digital landscape.
            </p>
          </div>

          <a
            href="https://www.retrotechdigital.com/blogs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E8E8E8] hover:border-[#171717] bg-[#F7F7F5] hover:bg-[#171717] hover:text-white text-[#171717] text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer shadow-xs"
            onMouseEnter={() => onCursorChange?.('hover')}
            onMouseLeave={() => onCursorChange?.('default')}
          >
            <span>View All Blogs</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 2 Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOGS_DATA.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col justify-between rounded-2xl bg-white border border-[#E8E8E8] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#353788]/40 hover:shadow-[0_12px_36px_rgba(53,55,136,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onMouseEnter={() => onCursorChange?.('hover')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F7F7F5]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#E8E8E8] text-center shadow-sm">
                  <span className="text-xs font-mono font-black text-[#171717] block leading-none">
                    31
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#353788] block tracking-wider">
                    JAN
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4 bg-[#171717]/85 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-semibold text-white tracking-wider uppercase">
                  {article.category}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-mono text-[#737373] mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#353788]" />
                      <span>{article.date}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#353788]" />
                      <span>{article.comments}</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#171717] group-hover:text-[#353788] transition-colors leading-snug mb-3">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                {/* Bottom Read More Action */}
                <div className="pt-5 mt-6 border-t border-[#F0F0EE] flex items-center justify-between text-xs font-semibold text-[#171717] group-hover:text-[#353788] transition-colors">
                  <span>Read Full Article</span>
                  <div className="w-7 h-7 rounded-full bg-[#F7F7F5] border border-[#E8E8E8] flex items-center justify-center group-hover:bg-[#353788] group-hover:text-white transition-all duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
