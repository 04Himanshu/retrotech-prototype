import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_INFO } from '../data/retrotechData';
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  Clock,
  ArrowRight,
  Navigation,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';

interface ContactSectionProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
  preselectedService?: string;
}

const SERVICE_OPTIONS = [
  'SEO',
  'Digital Marketing',
  'Web Development',
  'Mobile App Development',
  'Custom Application',
  'CRM Development',
  'Social Media Marketing',
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  onCursorChange,
  preselectedService = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    service: '',
    message: '',
    agree: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sync preselectedService
  useEffect(() => {
    if (preselectedService) {
      const matched =
        SERVICE_OPTIONS.find((s) => s.toLowerCase() === preselectedService.toLowerCase()) ||
        (preselectedService.toLowerCase().includes('web') ? 'Web Development' : preselectedService);
      setFormData((prev) => ({ ...prev, service: matched }));
    }
  }, [preselectedService]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.mobile.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Email, Mobile).');
      return;
    }
    if (!formData.agree) {
      setErrorMsg('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMsg('');
    setFormData({
      name: '',
      email: '',
      mobile: '',
      service: '',
      message: '',
      agree: true,
    });
  };

  return (
    <section id="contact" className="py-10 sm:py-12 md:py-14 bg-[#F8F9FA] border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-5 sm:mb-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#353788]/10 text-[#353788] text-xs font-medium mb-2.5">
            <span>Contact Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#171717] tracking-normal">
            Let's Do Great Work Together
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-[#6c757d] font-normal">
            Get in touch with our experts today
          </p>
        </div>

        {/* 2-Column Responsive Layout matching the original website */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left: Address & Info (col-lg-4) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8E8E8] shadow-xs">
              {/* Info Header */}
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#F0F0F0]">
                <div className="w-8 h-8 rounded-lg bg-[#353788]/10 text-[#353788] flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-base font-semibold text-[#171717]">Delhi NCR</span>
                <span className="ml-auto text-xs font-normal text-[#6c757d] bg-[#F8F9FA] border border-[#E8E8E8] px-2.5 py-0.5 rounded-full">
                  Corporate Office
                </span>
              </div>

              {/* Info Body */}
              <div className="space-y-3">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8F9FA] text-[#353788] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-xs text-[#495057] font-normal leading-relaxed">
                    {COMPANY_INFO.location}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8F9FA] text-[#353788] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      onMouseEnter={() => onCursorChange?.('hover')}
                      onMouseLeave={() => onCursorChange?.('default')}
                      className="text-xs text-[#171717] hover:text-[#353788] transition-colors font-medium truncate"
                    >
                      {COMPANY_INFO.email}
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(COMPANY_INFO.email, 'email')}
                      className="text-[11px] text-[#6c757d] hover:text-[#353788] transition-colors cursor-pointer shrink-0 ml-2"
                    >
                      {copiedKey === 'email' ? (
                        <span className="flex items-center gap-1 text-emerald-600">
                          <Check className="w-3 h-3" /> Copied
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="w-3 h-3" /> Copy
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8F9FA] text-[#353788] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <a
                      href={`tel:${COMPANY_INFO.phoneClean}`}
                      onMouseEnter={() => onCursorChange?.('hover')}
                      onMouseLeave={() => onCursorChange?.('default')}
                      className="text-xs text-[#171717] hover:text-[#353788] transition-colors font-medium"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(COMPANY_INFO.phone, 'phone')}
                      className="text-[11px] text-[#6c757d] hover:text-[#353788] transition-colors cursor-pointer shrink-0 ml-2"
                    >
                      {copiedKey === 'phone' ? (
                        <span className="flex items-center gap-1 text-emerald-600">
                          <Check className="w-3 h-3" /> Copied
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="w-3 h-3" /> Copy
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8F9FA] text-[#353788] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-xs text-[#6c757d] font-normal leading-relaxed">
                    Mon - Fri : 9:30 AM - 6:30 PM
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap gap-2.5">
                  <a
                    href="https://www.google.com/maps/place/The+Shopping+Mall,+Arjun+marg/@28.4661344,77.0971297,17z/data=!3m2!4b1!5s0x390d18da6e70a55b:0x76ca8d7afa8c56c7!4m6!3m5!1s0x390d196d2adb3641:0xe1a329a2ab8249fb!8m2!3d28.4661344!4d77.0997046!16s%2Fg%2F11bzq30sfs?entry=ttu"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => onCursorChange?.('hover')}
                    onMouseLeave={() => onCursorChange?.('default')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#353788] text-white text-xs font-medium hover:bg-[#2b2d6e] transition-colors shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Direction</span>
                  </a>

                  <a
                    href={COMPANY_INFO.socials.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => onCursorChange?.('hover')}
                    onMouseLeave={() => onCursorChange?.('default')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#006A43] text-white text-xs font-medium hover:bg-[#005234] transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form (col-lg-8) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8E8E8] shadow-xs">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="thankyou"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 space-y-3.5"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#171717]">
                      Thank You!
                    </h3>
                    <p className="text-sm text-[#6c757d] font-normal max-w-md mx-auto">
                      Your enquiry has been successfully submitted. Our team will get back to you shortly.
                    </p>
                    <div className="pt-1.5">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2 rounded-lg border border-[#E8E8E8] text-xs font-medium text-[#171717] hover:bg-[#F8F9FA] transition-colors cursor-pointer"
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3.5"
                  >
                    <div className="mb-1.5">
                      <h3 className="text-xl font-semibold text-[#171717]">
                        Let's Do Great Work Together
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6c757d] font-normal mt-0.5">
                        Get in touch with our experts today
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="p-2.5 rounded-lg bg-red-50 text-red-600 text-xs font-normal border border-red-200 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Name */}
                      <div>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Name *"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#DEE2E6] bg-white text-xs text-[#212529] font-normal placeholder-[#6c757d] focus:outline-none focus:border-[#353788] focus:ring-1 focus:ring-[#353788] transition-colors"
                        />
                      </div>

                      {/* Email Id */}
                      <div>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Email Id *"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#DEE2E6] bg-white text-xs text-[#212529] font-normal placeholder-[#6c757d] focus:outline-none focus:border-[#353788] focus:ring-1 focus:ring-[#353788] transition-colors"
                        />
                      </div>

                      {/* Mobile No */}
                      <div>
                        <input
                          type="tel"
                          required
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          placeholder="Mobile No *"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#DEE2E6] bg-white text-xs text-[#212529] font-normal placeholder-[#6c757d] focus:outline-none focus:border-[#353788] focus:ring-1 focus:ring-[#353788] transition-colors"
                        />
                      </div>

                      {/* Choose Services */}
                      <div>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#DEE2E6] bg-white text-xs text-[#212529] font-normal focus:outline-none focus:border-[#353788] focus:ring-1 focus:ring-[#353788] transition-colors cursor-pointer"
                        >
                          <option value="" disabled>Choose Services</option>
                          {SERVICE_OPTIONS.map((srv) => (
                            <option key={srv} value={srv}>
                              {srv}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Type Your Message"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DEE2E6] bg-white text-xs text-[#212529] font-normal placeholder-[#6c757d] focus:outline-none focus:border-[#353788] focus:ring-1 focus:ring-[#353788] transition-colors resize-none"
                      />
                    </div>

                    {/* Agreement Checkbox */}
                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="agree"
                        checked={formData.agree}
                        onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                        className="mt-0.5 rounded border-[#DEE2E6] text-[#353788] focus:ring-[#353788] cursor-pointer"
                        required
                      />
                      <label htmlFor="agree" className="text-xs text-[#6c757d] font-normal leading-relaxed cursor-pointer select-none">
                        By registering here, I agree to{' '}
                        <a href="#" className="text-[#353788] hover:underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-[#353788] hover:underline">Privacy Policy</a>.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        onMouseEnter={() => onCursorChange?.('hover')}
                        onMouseLeave={() => onCursorChange?.('default')}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#353788] hover:bg-[#2b2d6e] text-white text-xs sm:text-sm font-medium transition-colors shadow-xs disabled:opacity-70 cursor-pointer"
                      >
                        <span>{isSubmitting ? 'Sending...' : 'Submit Now'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
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
