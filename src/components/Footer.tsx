import React, { useState } from 'react';
import { Logo } from './Header';
import { Phone, MapPin, Instagram, Facebook, Globe, Lock, ChevronDown, BookOpen, ShieldCheck, Activity, X } from 'lucide-react';

interface FooterProps {
  onAdminClick: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<{ title: string; content: string } | null>(null);
  let leaveTimeoutId: NodeJS.Timeout | null = null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseEnter = () => {
    if (leaveTimeoutId) {
      clearTimeout(leaveTimeoutId);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    leaveTimeoutId = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

  const clinicalGuides = [
    {
      title: 'Pre-Treatment Guidelines',
      short: 'Preparation for peels & lasers',
      content: 'Avoid direct UV exposure or sun tanning for at least 48 hours before any clinical peels or laser treatments. Please arrive with a clean face, free of makeup. Inform our chief dermatologist of any oral retinoids, antibiotics, or active skin infections before your session.'
    },
    {
      title: 'Post-Treatment Care Plan',
      short: 'Optimal recovery and healing',
      content: 'Ensure application of our prescribed mineral-based SPF 50+ sunscreen every 4 hours. Keep the treated area hydrated using hypoallergenic clinical creams. Avoid physical face scrubs, steam rooms, saunas, and intense exercise for 3 to 5 days following any laser or radiofrequency procedures.'
    },
    {
      title: 'Aseptic & Sterilization Protocols',
      short: 'Our 100% hygiene commitment',
      content: 'At Bonitaa, we execute rigid medical autoclave sterilization for all metal instruments. All extraction tips, micro-needling cartridges, and surgical blades are strictly single-use disposables, opened in front of the patient to guarantee zero cross-contamination.'
    },
    {
      title: 'Patient Privacy Commitment',
      short: 'Encrypted, compliant records',
      content: 'Your clinical records, high-resolution before/after progression photography, and personal history are stored in a fully secure, end-to-end encrypted medical database. We never share, sell, or publicize patient clinical images without explicit written consent.'
    }
  ];

  const handleOpenGuide = (guide: { title: string; content: string }) => {
    setActiveModal({
      title: guide.title,
      content: guide.content
    });
    setIsDropdownOpen(false);
  };

  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-gold/15 pt-16 pb-8 relative" id="clinic-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 pb-12 border-b border-gray-900" id="footer-links-grid">
          
          {/* Column 1: Brand & Contact Info (md:col-span-4) */}
          <div className="md:col-span-4 space-y-6 text-left" id="footer-col-brand">
            <Logo />
            <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed font-light max-w-sm">
              We specialize in advanced medical skin rejuvenation, clinical chemical peeling, acne scar remodeling, and autologous growth-factor hair density restoration therapies.
            </p>
            
            <div className="space-y-3 text-xs sm:text-sm font-light text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  BONITAA SKIN AND HAIR CARE <br />
                  51/31, J.G. Nagar, 60 Feet Road <br />
                  Kumar Nagar 2nd Street, Tiruppur, <br />
                  Tamil Nadu - 641602
                </p>
              </div>
              
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href="tel:09092136969" className="hover:text-gold font-bold text-gray-200 transition-colors p-1 rounded">
                  090921 36969
                </a>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold hover:bg-[#111] transition-all duration-300" id="footer-instagram-link">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold hover:bg-[#111] transition-all duration-300" id="footer-facebook-link">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://maps.google.com/?q=BONITAA+SKIN+AND+HAIR+CARE+Tiruppur" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold hover:bg-[#111] transition-all duration-300" id="footer-maps-link">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Skin & Lasers (md:col-span-2) */}
          <div className="md:col-span-2 text-left space-y-4" id="footer-col-skin-treatments">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gold border-b border-gray-900 pb-2">Skin & Lasers</h4>
            <ul className="space-y-1 text-xs sm:text-sm font-light text-gray-400">
              {[
                { name: 'Warts & Mole Removal', href: '#treatments' },
                { name: 'Clinical Chemical Peels', href: '#treatments' },
                { name: 'Hydra Facial Glow', href: '#treatments' },
                { name: 'Skin Rejuvenation', href: '#treatments' },
                { name: 'Acne Scar Remodeling', href: '#treatments' }
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="hover:text-gold transition-colors block py-2 px-1 hover:pl-2 duration-300 border-l border-transparent hover:border-gold/30 text-[13px]"
                    id={`footer-skin-link-${idx}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hair & Trichology (md:col-span-2) */}
          <div className="md:col-span-2 text-left space-y-4" id="footer-col-hair-treatments">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gold border-b border-gray-900 pb-2">Hair & Scalp</h4>
            <ul className="space-y-1 text-xs sm:text-sm font-light text-gray-400">
              {[
                { name: 'GFC Hair Therapy', href: '#treatments' },
                { name: 'Hair Loss Restoration', href: '#treatments' },
                { name: 'Follicle Stimulation', href: '#treatments' },
                { name: 'Scalp Nutrition Infusion', href: '#treatments' },
                { name: 'Advanced Hair Density', href: '#treatments' }
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="hover:text-gold transition-colors block py-2 px-1 hover:pl-2 duration-300 border-l border-transparent hover:border-gold/30 text-[13px]"
                    id={`footer-hair-link-${idx}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Navigation (md:col-span-2) */}
          <div className="md:col-span-2 text-left space-y-4" id="footer-col-quicklinks">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gold border-b border-gray-900 pb-2">Quick Links</h4>
            <ul className="space-y-1 text-xs sm:text-sm font-light text-gray-400">
              {[
                { name: 'Home Page', href: '#home' },
                { name: 'Our Treatments', href: '#treatments' },
                { name: 'Before & After Results', href: '#before-after' },
                { name: 'Why Choose Us', href: '#why-choose' },
                { name: 'Meet Specialist', href: '#specialist' },
                { name: 'Patient Reviews', href: '#reviews' },
                { name: 'Clinical FAQs', href: '#faq' }
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="hover:text-gold transition-colors block py-2 px-1 hover:pl-2 duration-300 border-l border-transparent hover:border-gold/30 text-[13px]"
                    id={`footer-quick-link-${idx}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Patient Guides & More Options (md:col-span-2) */}
          <div className="md:col-span-2 text-left space-y-4" id="footer-col-resources">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gold border-b border-gray-900 pb-2">Patient Help</h4>
            
            <ul className="space-y-1 text-xs sm:text-sm font-light text-gray-400 mb-4">
              {clinicalGuides.map((guide, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleOpenGuide(guide)}
                    className="w-full text-left hover:text-gold transition-colors block py-2 px-1 hover:pl-2 duration-300 border-l border-transparent hover:border-gold/30 text-[13px] cursor-pointer"
                    id={`footer-guide-link-${idx}`}
                  >
                    {guide.title.split(' ')[0]} Guidelines
                  </button>
                </li>
              ))}
            </ul>

            {/* Luxurious Safe-Zone Footer Dropdown */}
            <div className="pt-1" id="footer-dropdown-wrapper">
              <div 
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="w-full bg-[#111] hover:bg-[#181818] border border-gold/20 text-gray-300 hover:text-gold text-[10px] uppercase tracking-widest font-semibold px-3 py-2.5 rounded flex items-center justify-between cursor-pointer transition-all duration-300"
                  id="footer-dropdown-trigger"
                >
                  <span className="flex items-center gap-1.5 text-[10px]">
                    <BookOpen className="w-3.5 h-3.5 text-gold" />
                    All Guides
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gold transition-transform duration-300 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {/* Safe zone helper spacer */}
                {isDropdownOpen && (
                  <div className="absolute bottom-full left-0 w-full h-4 bg-transparent z-10" />
                )}

                {/* Dropdown Menu - slides up */}
                <div className={`absolute bottom-full right-0 mb-2 w-56 rounded-lg bg-[#151515] border border-gold/20 shadow-xl py-2 z-20 transition-all duration-300 origin-bottom-right ${
                  isDropdownOpen 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}>
                  {clinicalGuides.map((guide, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOpenGuide(guide)}
                      className="w-full text-left px-4 py-2 hover:bg-[#222] transition-colors cursor-pointer group"
                    >
                      <p className="text-xs font-semibold text-gray-200 group-hover:text-gold uppercase tracking-wider">{guide.title}</p>
                      <p className="text-[9px] text-gray-500 font-light mt-0.5">{guide.short}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-500 font-light" id="footer-bottom-strip">
          <p>© {currentYear} BONITAA SKIN AND HAIR CARE. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleOpenGuide({
                title: 'Patient Privacy Policy',
                content: 'We adhere to complete clinical transparency and strict patient privacy laws. All medical records, photo documentations, and telephone queries are highly encrypted. We do not use user trackers or share medical details with any third parties.'
              })}
              className="hover:text-gold transition-colors cursor-pointer text-[10px]"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => handleOpenGuide({
                title: 'Terms of Clinical Consultation',
                content: 'Free skin or hair consultations are valid for limited slot bookings only. Our chief dermatologists reserve the right to recommend specific skin testing prior to laser procedures to ensure complete diagnostic accuracy.'
              })}
              className="hover:text-gold transition-colors cursor-pointer text-[10px]"
            >
              Terms of Use
            </button>
            <span>•</span>
            <button 
              onClick={onAdminClick}
              className="text-gray-600 hover:text-gold font-semibold transition-all flex items-center gap-1 cursor-pointer py-1 px-2 rounded hover:bg-[#111]"
              id="footer-staff-portal"
            >
              <Lock className="w-3 h-3" />
              Staff Portal
            </button>
          </div>
        </div>

      </div>

      {/* Beautiful High-Fidelity Custom Patient Guideline Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#121212] border border-gold/30 rounded-xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl animate-scale-up text-left">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gold p-2 transition-colors rounded-full hover:bg-white/5 cursor-pointer"
              aria-label="Close clinical guide"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-base sm:text-lg uppercase tracking-wider text-white">
                {activeModal.title}
              </h3>
            </div>

            <div className="border-t border-gold/10 pt-4">
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light font-sans whitespace-pre-line">
                {activeModal.content}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="bg-gold hover:bg-gold/90 text-black font-bold text-xs uppercase tracking-widest py-2.5 px-6 rounded cursor-pointer transition-all duration-200"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
