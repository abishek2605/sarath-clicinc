import React, { useState, useEffect } from 'react';
import { X, Phone, Gift, Calendar, AlertCircle } from 'lucide-react';
import { LeadSubmission } from '../types';
import { TREATMENTS_LIST } from './Hero';

interface PopupsProps {
  onBookClick: () => void;
  onSuccess: (submission: LeadSubmission) => void;
}

export default function Popups({ onBookClick, onSuccess }: PopupsProps) {
  // Exit Intent state
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentDismissed, setExitIntentDismissed] = useState(false);

  // Scroll Popup state
  const [showScrollPopup, setShowScrollPopup] = useState(false);
  const [scrollPopupDismissed, setScrollPopupDismissed] = useState(false);

  // Exit intent form state
  const [exitForm, setExitForm] = useState({ name: '', phone: '', treatment: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Detect Exit Intent
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // clientY < 20 indicates mouse moving out of viewport (towards address bar/back buttons)
      if (e.clientY < 20 && !exitIntentDismissed && !showExitIntent) {
        setShowExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitIntentDismissed, showExitIntent]);

  // 2. Detect Scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      if (scrollPopupDismissed || showScrollPopup) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight > 0) {
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (scrollPercent >= 40) {
          setShowScrollPopup(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPopupDismissed, showScrollPopup]);

  // Handle Exit Form Submit
  const handleExitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!exitForm.name.trim()) newErrors.name = 'Name is required';
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!exitForm.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!phoneRegex.test(exitForm.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    
    if (!exitForm.treatment) newErrors.treatment = 'Select treatment';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const submission: LeadSubmission = {
        name: exitForm.name.trim(),
        phone: exitForm.phone.trim(),
        treatment: exitForm.treatment,
        submittedAt: new Date().toISOString()
      };

      const existingLeads = JSON.parse(localStorage.getItem('bonitaa_leads') || '[]');
      existingLeads.unshift(submission);
      localStorage.setItem('bonitaa_leads', JSON.stringify(existingLeads));

      setIsSubmitting(false);
      setShowExitIntent(false);
      setExitIntentDismissed(true);
      onSuccess(submission);
    }, 1000);
  };

  const dismissExitIntent = () => {
    setShowExitIntent(false);
    setExitIntentDismissed(true);
  };

  const dismissScrollPopup = () => {
    setShowScrollPopup(false);
    setScrollPopupDismissed(true);
  };

  // WhatsApp helper link
  const whatsAppLink = 'https://wa.me/919092136969?text=Hi%20I%2520am%2520interested%2520in%2520booking%2520a%2520Free%2520Skin%2520or%2520Hair%2520Consultation%2520at%2520Bonitaa%2520Tiruppur.';

  return (
    <>
      {/* A. EXIT INTENT POPUP */}
      {showExitIntent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" id="exit-intent-overlay">
          <div className="relative w-full max-w-md bg-[#181818] border border-gold/40 rounded-lg p-6 sm:p-8 text-white shadow-2xl text-left">
            <button 
              onClick={dismissExitIntent}
              className="absolute top-4 right-4 text-gray-400 hover:text-gold transition-colors"
              id="close-exit-popup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header copy */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mx-auto mb-3 animate-bounce">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-sans font-bold text-xl text-white tracking-wide">
                Wait! Don't Miss Out
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                Secure your <span className="text-gold font-bold">FREE Doctor Consultation</span> slot before leaving. No obligation.
              </p>
            </div>

            {/* Quick lead capture form inside popup */}
            <form onSubmit={handleExitSubmit} className="space-y-4" id="exit-intent-form">
              <div>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={exitForm.name}
                  onChange={(e) => {
                    setExitForm({ ...exitForm, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  className={`w-full bg-[#202020] border text-white rounded px-3 py-2.5 text-sm focus:outline-none focus:border-gold ${
                    errors.name ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-[10px] mt-0.5">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Enter 10-Digit Mobile"
                  value={exitForm.phone}
                  onChange={(e) => {
                    setExitForm({ ...exitForm, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  className={`w-full bg-[#202020] border text-white rounded px-3 py-2.5 text-sm focus:outline-none focus:border-gold ${
                    errors.phone ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-[10px] mt-0.5">{errors.phone}</p>}
              </div>

              <div>
                <select
                  value={exitForm.treatment}
                  onChange={(e) => {
                    setExitForm({ ...exitForm, treatment: e.target.value });
                    if (errors.treatment) setErrors({ ...errors, treatment: '' });
                  }}
                  className={`w-full bg-[#202020] border text-white rounded px-3 py-2.5 text-sm focus:outline-none focus:border-gold cursor-pointer ${
                    errors.treatment ? 'border-red-500' : 'border-gray-700'
                  }`}
                >
                  <option value="" disabled>Select Desired Treatment</option>
                  {TREATMENTS_LIST.map((t, idx) => (
                    <option key={idx} value={t} className="bg-[#181818]">{t}</option>
                  ))}
                </select>
                {errors.treatment && <p className="text-red-500 text-[10px] mt-0.5">{errors.treatment}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-black font-bold text-xs uppercase tracking-widest py-3 px-4 rounded hover:bg-gold/90 transition-all shadow-lg shadow-gold/10 mt-2 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Securing Slot...' : 'Claim Free consultation'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* B. SCROLL TRIGGERED CORNER POPUP */}
      {showScrollPopup && (
        <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 max-w-sm w-[90%] bg-black/95 border border-gold/30 rounded-lg p-5 shadow-2xl animate-slide-up text-left text-white" id="scroll-popup-container">
          <button 
            onClick={dismissScrollPopup}
            className="absolute top-3 right-3 text-gray-400 hover:text-gold transition-colors"
            id="close-scroll-popup"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mt-0.5 shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="font-sans font-bold text-xs uppercase tracking-widest text-gold">Limited Slots Left</p>
              <p className="font-sans font-semibold text-sm text-white mt-1 leading-tight">
                Zero Consultation Fee Active Today
              </p>
              <p className="text-[11px] text-gray-400 mt-1 font-light leading-relaxed">
                Secure a free evaluation by Dr. Priya for advanced skin and hair restorations.
              </p>
              <button
                onClick={() => {
                  dismissScrollPopup();
                  onBookClick();
                }}
                className="mt-3 bg-gold hover:bg-gold/90 text-black font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded transition-all cursor-pointer shadow shadow-gold/10"
                id="scroll-popup-action"
              >
                Book Consultation Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* C. STICKY MOBILE BOTTOM CTA BAR */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-[#0E0E0E]/95 backdrop-blur shadow-lg border-t border-gold/20 grid grid-cols-3 sm:hidden" id="mobile-sticky-cta">
        {/* Call Now Button */}
        <a 
          href="tel:09092136969"
          className="flex flex-col items-center justify-center gap-1 py-3 border-r border-gray-900 hover:bg-black transition-colors"
          id="mobile-sticky-call"
        >
          <Phone className="w-4 h-4 text-gold" />
          <span className="text-[9px] uppercase tracking-widest text-gray-300 font-bold">Call Now</span>
        </a>

        {/* WhatsApp Button */}
        <a 
          href={whatsAppLink}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 border-r border-gray-900 hover:bg-black transition-colors"
          id="mobile-sticky-whatsapp"
        >
          {/* Custom green/gold WhatsApp Icon */}
          <svg className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.558 1.875 14.09 .845 11.458.845c-5.441 0-9.866 4.423-9.87 9.868-.002 1.798.487 3.554 1.417 5.11L1.956 22.01l6.234-1.636z" />
          </svg>
          <span className="text-[9px] uppercase tracking-widest text-gray-300 font-bold">WhatsApp</span>
        </a>

        {/* Book Appointment Button */}
        <button 
          onClick={onBookClick}
          className="flex flex-col items-center justify-center gap-1 py-3 bg-gold text-black hover:bg-gold/90 transition-all cursor-pointer"
          id="mobile-sticky-book"
        >
          <Calendar className="w-4 h-4 text-black" />
          <span className="text-[9px] uppercase tracking-widest text-black font-extrabold">Book Now</span>
        </button>
      </div>
    </>
  );
}
