import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TrustBar from './components/TrustBar';
import Hero from './components/Hero';
import Treatments from './components/Treatments';
import WhyChooseUs from './components/WhyChooseUs';
import BeforeAfter from './components/BeforeAfter';
import Doctor from './components/Doctor';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import Popups from './components/Popups';
import LeadPortal from './components/LeadPortal';
import { LeadSubmission } from './types';
import { Calendar, CheckCircle2, Phone, MessageSquare, Sparkles, X, Heart } from 'lucide-react';

export default function App() {
  // Coordinate treatment pre-fill from treatments section
  const [selectedTreatment, setSelectedTreatment] = useState<string>('');
  
  // Staff Admin portal toggle state
  const [showAdminPortal, setShowAdminPortal] = useState(false);

  // Conversion Success Screen overlay state
  const [successLead, setSuccessLead] = useState<LeadSubmission | null>(null);

  // Handle treatment card click (flows back to Hero input)
  const handleSelectTreatment = (treatmentName: string) => {
    setSelectedTreatment(treatmentName);
    
    // Focus the form and pre-fill the value
    setTimeout(() => {
      const treatmentSelect = document.getElementById('treatment-input') as HTMLSelectElement;
      if (treatmentSelect) {
        treatmentSelect.value = treatmentName;
        // Trigger a synthetic change event to update Hero React state
        const event = new Event('change', { bubbles: true });
        treatmentSelect.dispatchEvent(event);
      }
      
      const nameInput = document.getElementById('name-input');
      if (nameInput) {
        nameInput.focus();
      }
    }, 150);
  };

  // Global Scroll-to-Form Trigger
  const handleGlobalBookClick = () => {
    const target = document.querySelector('#home');
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      
      setTimeout(() => {
        const nameInput = document.getElementById('name-input');
        if (nameInput) {
          nameInput.focus();
        }
      }, 350);
    }
  };

  const handleLeadSuccess = (submission: LeadSubmission) => {
    setSuccessLead(submission);
    
    // Inject custom GTM or GA4 conversion mock triggers
    console.log('Google Ads Conversion Triggered successfully:', submission);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans antialiased overflow-x-hidden" id="bonitaa-root">
      
      {/* 1. Google Ads Trust Bar above fold */}
      <TrustBar />

      {/* 2. Navigation Header */}
      <Header onBookClick={handleGlobalBookClick} />

      {/* 3. Main content sections */}
      <main id="main-content">
        <Hero onSuccess={handleLeadSuccess} />
        
        <Treatments onSelectTreatment={handleSelectTreatment} />
        
        <WhyChooseUs />
        
        <BeforeAfter />
        
        <Doctor />
        
        <Testimonials />
        
        <FAQ />
        
        <MapSection />
      </main>

      {/* 4. Elegant footer */}
      <Footer onAdminClick={() => setShowAdminPortal(true)} />

      {/* 5. Smart popups for conversion optimization */}
      <Popups onBookClick={handleGlobalBookClick} onSuccess={handleLeadSuccess} />

      {/* 6. STAFF ADMIN PORTAL INJECTED IN DOM */}
      {showAdminPortal && (
        <LeadPortal onClose={() => setShowAdminPortal(false)} />
      )}

      {/* 7. HIGH-CONVERSION SUCCESS SCREEN MODAL */}
      {successLead && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 text-white animate-fade-in" id="success-screen-overlay">
          <div className="relative w-full max-w-lg bg-[#181818] border-2 border-gold rounded-lg p-6 sm:p-10 text-center shadow-2xl overflow-hidden">
            {/* Visual background sparkles */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gold/5 blur-3xl"></div>
            
            <button
              onClick={() => setSuccessLead(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gold transition-colors"
              id="close-success-screen"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success icon */}
            <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold mx-auto mb-6 relative">
              <CheckCircle2 className="w-10 h-10 animate-scale-up" />
              <div className="absolute -inset-1 rounded-full border border-gold/20 animate-ping"></div>
            </div>

            {/* Content headings */}
            <h3 className="font-sans font-bold text-2xl text-white tracking-wide">
              Appointment Requested!
            </h3>
            
            <div className="bg-black/40 border border-gray-900 rounded-lg p-5 my-6 text-left space-y-3">
              <p className="text-xs text-gray-400 border-b border-gray-900 pb-2.5">
                Dear <span className="text-white font-bold">{successLead.name}</span>, thank you for choosing Bonitaa.
              </p>
              
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 font-medium">Selected Treatment</span>
                <span className="text-gold font-bold">{successLead.treatment}</span>
              </div>

              {successLead.preferredTime && (
                <div className="flex justify-between text-xs pt-1">
                  <span className="text-gray-500 font-medium">Preferred Schedule</span>
                  <span className="text-white font-bold">{successLead.preferredTime}</span>
                </div>
              )}

              <div className="flex justify-between text-xs pt-1">
                <span className="text-gray-500 font-medium">Dermatologist Fee</span>
                <span className="text-green-500 font-bold">₹0.00 (Zero Fee)</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              <p>
                📞 Our clinical care coordinator will call you at <span className="text-gold font-bold">{successLead.phone}</span> within <span className="font-bold">15 minutes</span> to finalize your appointment time.
              </p>
              <p className="text-[11px] text-gray-500 leading-normal">
                Please keep your phone active. We look forward to welcoming you to Bonitaa Skin & Hair Care in Tiruppur.
              </p>
            </div>

            {/* Direct Instant Action Buttons */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:09092136969"
                className="w-full bg-transparent border border-gray-700 hover:border-gold hover:text-gold text-white font-bold text-xs uppercase tracking-widest py-3 px-4 rounded transition-all duration-300 flex items-center justify-center gap-1.5"
                id="success-call-btn"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Coordinator
              </a>
              
              <a
                href={`https://wa.me/919092136969?text=Hi%20my%20name%20is%20${encodeURIComponent(successLead.name)}.%20I%20just%20submitted%20a%20request%20for%20${encodeURIComponent(successLead.treatment)}%20online.%20Please%20confirm%20my%20slot.`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-gold text-black font-bold text-xs uppercase tracking-widest py-3 px-4 rounded hover:bg-gold/90 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                id="success-whatsapp-btn"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                Confirm on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
