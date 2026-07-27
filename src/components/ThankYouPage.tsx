import React, { useEffect } from 'react';
import { CheckCircle2, Calendar, Phone, MessageSquare, MapPin, ArrowLeft, Clock, Sparkles, ShieldCheck } from 'lucide-react';
import { LeadSubmission } from '../types';

interface ThankYouPageProps {
  lead?: LeadSubmission | null;
  onReturnHome: () => void;
}

export default function ThankYouPage({ lead, onReturnHome }: ThankYouPageProps) {
  useEffect(() => {
    // Scroll to top on load
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger Google Tag conversion event if gtag exists
    if (typeof window !== 'undefined' && (window as any).gtag) {
      try {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-18337435110',
          'value': 99.0,
          'currency': 'INR'
        });
        console.log('gtag conversion fired for AW-18337435110');
      } catch (err) {
        console.error('Error firing gtag conversion:', err);
      }
    }
  }, []);

  const patientName = lead?.name || 'Valued Patient';
  const treatmentName = lead?.treatment || 'Skin & Hair Consultation';
  const phone = lead?.phone || '';
  const preferredTime = lead?.preferredTime || 'Today / Earliest Available';

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Brand Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between border-b border-gray-800 pb-6 mb-8">
        <button
          onClick={onReturnHome}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-gold transition-colors cursor-pointer"
          id="thank-you-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Clinic Home
        </button>

        <div className="flex items-center gap-2">
          <img 
            src="/bonitaa-logo.png" 
            alt="Bonitaa Skin and Hair Care" 
            className="h-10 md:h-12 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Main Thank You Card */}
      <div className="max-w-2xl mx-auto w-full bg-[#181818] border-2 border-gold/40 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden my-auto">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-gold/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-gold/5 blur-3xl pointer-events-none"></div>

        {/* Success Icon */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gold/15 border border-gold/50 flex items-center justify-center text-gold mx-auto relative">
            <CheckCircle2 className="w-12 h-12" />
            <div className="absolute -inset-1.5 rounded-full border border-gold/30 animate-ping"></div>
          </div>

          <span className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Appointment Request Received
          </span>

          <h1 className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-wide">
            Thank You, {patientName}!
          </h1>

          <p className="font-sans text-gray-300 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
            Your clinical consultation booking request at <span className="text-gold font-semibold">Bonitaa Skin & Hair Care, Tiruppur</span> has been successfully logged.
          </p>
        </div>

        {/* Booking Summary Box */}
        <div className="bg-black/60 border border-gray-800 rounded-xl p-5 my-8 space-y-3.5 text-left">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              Selected Treatment
            </span>
            <span className="text-xs text-gold font-bold">{treatmentName}</span>
          </div>

          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold" />
              Preferred Time Slot
            </span>
            <span className="text-xs text-white font-semibold">{preferredTime}</span>
          </div>

          {phone && (
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gold" />
                Contact Phone
              </span>
              <span className="text-xs text-gray-200 font-mono">{phone}</span>
            </div>
          )}

          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              Consultation Fee
            </span>
            <div className="text-right">
              <span className="text-xs text-gold font-bold">₹99</span>
              <span className="text-[10px] text-gray-400 block font-light">(Payable at clinic)</span>
            </div>
          </div>

          <div className="flex items-start justify-between pt-1">
            <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
              Clinic Address
            </span>
            <span className="text-[11px] text-gray-300 font-light text-right max-w-[220px]">
              Kumaran Road, Near Railway Station, Tiruppur, Tamil Nadu 641601
            </span>
          </div>
        </div>

        {/* What Happens Next Steps */}
        <div className="space-y-3 text-left my-6 bg-gold/5 border border-gold/20 p-4 rounded-lg">
          <h4 className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            What happens next?
          </h4>
          <ul className="space-y-2 text-xs text-gray-300 font-light leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-gold font-bold">1.</span>
              <span>Our medical care coordinator will call you within <strong className="text-white">15 minutes</strong> to confirm doctor availability.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold font-bold">2.</span>
              <span>You will receive an SMS / WhatsApp message with exact token time & direction link.</span>
            </li>
          </ul>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <a
            href={`https://wa.me/919092136969?text=${encodeURIComponent(`Hi Bonitaa Clinic! My name is ${patientName}. I just booked an online appointment for ${treatmentName}. Please confirm my slot.`)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-gold hover:bg-gold/90 text-black font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            id="thankyou-whatsapp-btn"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            Instant WhatsApp Confirmation
          </a>

          <a
            href="tel:09092136969"
            className="w-full bg-black/60 border border-gray-700 hover:border-gold hover:text-gold text-white font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded transition-all duration-300 flex items-center justify-center gap-2"
            id="thankyou-call-btn"
          >
            <Phone className="w-4 h-4 text-gold" />
            Call Clinic Directly
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <button
            onClick={onReturnHome}
            className="text-xs font-semibold text-gray-400 hover:text-white underline transition-colors cursor-pointer"
            id="thankyou-home-link"
          >
            Return to Bonitaa Main Website
          </button>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="max-w-4xl mx-auto w-full text-center text-[11px] text-gray-500 pt-8 border-t border-gray-900 mt-8">
        © {new Date().getFullYear()} Bonitaa Skin and Hair Care Clinic, Tiruppur. All Rights Reserved.
      </div>
    </div>
  );
}
