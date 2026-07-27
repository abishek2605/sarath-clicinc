import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Treatments from './components/Treatments';
import WhyChooseUs from './components/WhyChooseUs';
import BeforeAfter from './components/BeforeAfter';
import Testimonials from './components/Testimonials';
import InstagramReels from './components/InstagramReels';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import Popups from './components/Popups';
import LeadPortal from './components/LeadPortal';
import ThankYouPage from './components/ThankYouPage';
import { LeadSubmission } from './types';

export default function App() {
  // Navigation view route: 'main' or 'thank-you'
  const [currentView, setCurrentView] = useState<'main' | 'thank-you'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/thank-you' || path.endsWith('/thank-you') || hash === '#thank-you') {
        return 'thank-you';
      }
    }
    return 'main';
  });

  // Coordinate treatment pre-fill from treatments section
  const [selectedTreatment, setSelectedTreatment] = useState<string>('');
  
  // Staff Admin portal toggle state
  const [showAdminPortal, setShowAdminPortal] = useState(false);

  // Conversion Success Lead state
  const [successLead, setSuccessLead] = useState<LeadSubmission | null>(null);

  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/thank-you' || path.endsWith('/thank-you') || hash === '#thank-you') {
        setCurrentView('thank-you');
      } else {
        setCurrentView('main');
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

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
    if (currentView === 'thank-you') {
      setCurrentView('main');
      if (window.history.pushState) {
        window.history.pushState(null, '', window.location.pathname.replace(/#thank-you$/, ''));
      }
    }

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
    setCurrentView('thank-you');
    
    if (window.history.pushState) {
      window.history.pushState(null, '', '#thank-you');
    }

    // Fire conversion event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      try {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-18337435110',
          'value': 99.0,
          'currency': 'INR'
        });
      } catch (e) {
        console.error('gtag conversion error:', e);
      }
    }
  };

  const handleReturnHome = () => {
    setCurrentView('main');
    if (window.history.pushState) {
      window.history.pushState(null, '', window.location.pathname.replace(/#thank-you$/, ''));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'thank-you') {
    return <ThankYouPage lead={successLead} onReturnHome={handleReturnHome} />;
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans antialiased overflow-x-hidden" id="bonitaa-root">
      
      {/* 1. Navigation Header */}
      <Header onBookClick={handleGlobalBookClick} />

      {/* 3. Main content sections */}
      <main id="main-content">
        <Hero onSuccess={handleLeadSuccess} />
        
        <Treatments onSelectTreatment={handleSelectTreatment} />
        
        <WhyChooseUs />
        
        <BeforeAfter />
        
        <InstagramReels onBookClick={handleGlobalBookClick} />

        <Testimonials />
        
        <MapSection />
      </main>

      {/* 4. Elegant footer */}
      <Footer />

      {/* 5. Smart popups for conversion optimization */}
      <Popups onBookClick={handleGlobalBookClick} onSuccess={handleLeadSuccess} />

      {/* 6. STAFF ADMIN PORTAL INJECTED IN DOM */}
      {showAdminPortal && (
        <LeadPortal onClose={() => setShowAdminPortal(false)} />
      )}

    </div>
  );
}
