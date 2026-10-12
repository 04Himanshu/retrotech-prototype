import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_INFO } from '../data/retrotechData';
import { MagneticButton } from './MagneticButton';
import { 
  CheckCircle2, 
  Clock, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Send, 
  Sparkles 
} from 'lucide-react';

interface ContactSectionProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onCursorChange,
  preselectedService = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: preselectedService || 'Bespoke Web Development',
    budget: '$10k - $25k',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const services = [
    'Bespoke Web Development',
    'Mobile App Development',
    'Custom Software & SaaS',
    'CRM & ERPNext Integration',
    'Performance Marketing & SEO',
  ];

  const budgets = ['Under $10k', '$10k - $25k', '$25k - $50k', '$50k+'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please complete your name and business email.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    // Simulated frontend submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'Bespoke Web Development',
      budget: '$10k - $25k',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-[#F7F7F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#353788]">
            07 &bull; Initiate Engagement
          </span>
          <div className="w-12 h-[1px] bg-[#353788]" />
        </div>

        {/* Dramatic Headline */}
        <div className="max-w-4xl mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tightest text-[#171717] leading-[1.02]">
            Let's Engineer Your Next <br />
            <span className="font-serif italic font-normal text-[#353788]">
              Digital Success Story.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#737373] max-w-xl leading-relaxed">
            Whether you require a flagship enterprise web application, high-scale mobile ecosystem, custom CRM, or performance marketing engine, our solution architects are ready to guide you.
          </p>
        </div>

        {/* Two-Column Grid: Contact Information & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Authentic Contact Details & Presence (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-2xl md:rounded-3xl p-8 border border-[#E8E8E8] shadow-sm space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#737373] block">
                Corporate Headquarters
              </span>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#F7F7F5] border border-[#E8E8E8] flex items-center justify-center text-[#353788] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-1">
                      Gurugram Office
                    </h4>
                    <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                      {COMPANY_INFO.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#F7F7F5] border border-[#E8E8E8] flex items-center justify-center text-[#353788] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-1">
                      Direct Inquiries
                    </h4>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-xs sm:text-sm font-semibold text-[#171717] hover:text-[#353788] transition-colors"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#F7F7F5] border border-[#E8E8E8] flex items-center justify-center text-[#353788] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-1">
                      Voice Support
                    </h4>
                    <a
                      href={`tel:${COMPANY_INFO.phoneClean}`}
                      className="text-xs sm:text-sm font-semibold text-[#171717] hover:text-[#353788] transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#e6f4ea] border border-[#ceead6] flex items-center justify-center text-[#006a43] shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-1">
                      Instant WhatsApp Channel
                    </h4>
                    <a
                      href={COMPANY_INFO.socials.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs sm:text-sm font-semibold text-[#006a43] hover:underline"
                    >
                      Connect with Solution Engineers &rarr;
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E8E8] flex items-center gap-2 text-xs text-[#737373]">
                <Clock className="w-3.5 h-3.5 text-[#353788]" />
                <span>Response Time: Typically under 4 business hours</span>
              </div>
            </div>

            {/* Quick Assurance Pill */}
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E8E8] flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#D97706] shrink-0" />
              <p className="text-xs text-[#737373] leading-relaxed">
                Strict Non-Disclosure Agreement (NDA) provided prior to any proprietary architecture discussion.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Frontend Form (Cols 6-12) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-10 border border-[#E8E8E8] shadow-md relative">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-[#171717]">
                        Consultation Request Dispatched
                      </h3>
                      <p className="text-sm text-[#737373] max-w-md mx-auto leading-relaxed">
                        Thank you, <strong className="text-[#171717]">{formData.name}</strong>. Our senior solutions architect has been notified and will review your requirements for <em>{formData.service}</em> within 24 hours.
                      </p>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleReset}
                        className="px-6 py-2.5 rounded-full border border-[#E8E8E8] text-xs font-bold uppercase tracking-wider text-[#171717] hover:bg-[#F7F7F5] transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E8]">
                      <h3 className="text-lg font-bold text-[#171717]">
                        Request Project Discovery Call
                      </h3>
                      <span className="text-xs font-mono text-[#737373]">
                        Step 1 of 1
                      </span>
                    </div>

                    {errorMsg && (
                      <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium border border-red-200">
                        {errorMsg}
                      </div>
                    )}

                    {/* Service Selection Pills */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#171717] block">
                        Service of Primary Interest
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {services.map((srv) => (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => setFormData({ ...formData, service: srv })}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                              formData.service === srv
                                ? 'bg-[#353788] text-white shadow-sm'
                                : 'bg-[#F7F7F5] text-[#737373] hover:text-[#171717] hover:bg-[#E8E8E8]'
                            }`}
                          >
                            {srv}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name & Work Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Vikram Malhotra"
                          className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] bg-[#F7F7F5] focus:bg-white focus:border-[#353788] focus:outline-none text-xs sm:text-sm text-[#171717] transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="vikram@enterprise.com"
                          className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] bg-[#F7F7F5] focus:bg-white focus:border-[#353788] focus:outline-none text-xs sm:text-sm text-[#171717] transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 99000 00000"
                          className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] bg-[#F7F7F5] focus:bg-white focus:border-[#353788] focus:outline-none text-xs sm:text-sm text-[#171717] transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Malhotra Retail Group"
                          className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] bg-[#F7F7F5] focus:bg-white focus:border-[#353788] focus:outline-none text-xs sm:text-sm text-[#171717] transition-all"
                        />
                      </div>
                    </div>

                    {/* Budget Range */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#171717] block">
                        Anticipated Project Budget
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {budgets.map((b) => (
                          <button
                            type="button"
                            key={b}
                            onClick={() => setFormData({ ...formData, budget: b })}
                            className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                              formData.budget === b
                                ? 'bg-[#171717] text-white border-[#171717]'
                                : 'bg-[#F7F7F5] border-[#E8E8E8] text-[#737373] hover:text-[#171717]'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Project Brief */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                        Project Goals &amp; Scope Overview
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your objectives, current technical stack, and target launch window..."
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] bg-[#F7F7F5] focus:bg-white focus:border-[#353788] focus:outline-none text-xs sm:text-sm text-[#171717] transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <MagneticButton className="w-full">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 rounded-full bg-[#171717] hover:bg-[#353788] text-white text-xs md:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-70"
                          onMouseEnter={() => onCursorChange?.('hover')}
                          onMouseLeave={() => onCursorChange?.('default')}
                        >
                          {isSubmitting ? (
                            <span>Preparing Technical Discovery...</span>
                          ) : (
                            <>
                              <span>Submit Project Inquiry</span>
                              <Send className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </MagneticButton>
                    </div>

                    <div className="text-[11px] text-[#737373] text-center">
                      Frontend demonstration prototype. No actual data will be transmitted off-device.
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
