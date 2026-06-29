import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar } from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
}

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* Beautiful High-Fidelity Custom SVG Logo representing the uploaded brand */}
      <div className="relative flex items-center justify-center w-12 h-12 border border-gold/30 rounded p-1 bg-black/40 backdrop-blur-sm">
        <svg className="w-10 h-10" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer elegant frame */}
          <rect x="6" y="6" width="108" height="108" rx="3" stroke="#C9A227" strokeWidth="1.5" />
          {/* Stylized curve B */}
          <path d="M35 30H65C80 30 90 38 90 48C90 56 82 62 70 62C85 62 95 68 95 80C95 92 82 100 65 100H35V30Z" stroke="#C9A227" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M35 62H70" stroke="#C9A227" strokeWidth="4" />
          {/* Love/Leaf gold accent overlaying the B */}
          <path d="M25 45C20 30 40 20 48 35C55 20 75 30 70 45" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          {/* Registered trademark symbol R */}
          <circle cx="102" cy="18" r="6" stroke="#C9A227" strokeWidth="1" />
          <text x="99.5" y="21.5" fill="#C9A227" fontSize="8" fontFamily="sans-serif" fontWeight="bold">R</text>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-sans font-bold tracking-[0.25em] text-lg md:text-xl text-white leading-none">BONITAA</span>
        <span className="font-sans text-[7px] md:text-[8px] tracking-[0.35em] text-gold uppercase font-semibold mt-1">Skin and Hair Care</span>
      </div>
    </div>
  );
}

export default function Header({ onBookClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let leaveTimeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Treatments', href: '#treatments' },
    { name: 'Before & After', href: '#before-after' },
    { name: 'Specialist', href: '#specialist' }
  ];

  const moreLinks = [
    { name: 'Why Choose Us', href: '#why-choose' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' }
  ];

  const allLinks = [...primaryLinks, ...moreLinks];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    setIsDropdownOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // height of header
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
    // Wait 150ms before closing the dropdown to allow for smooth cursor navigation over diagonal or empty areas (Safe Zone)
    leaveTimeoutId = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#111111]/95 backdrop-blur-md shadow-lg border-b border-gold/10 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center py-2" id="header-logo-link">
            <Logo />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5" id="desktop-nav">
            {primaryLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-gray-300 hover:text-gold text-xs uppercase tracking-widest font-semibold transition-colors duration-200 px-3 py-4 rounded-md"
                id={`nav-${link.name.toLowerCase().replace(/ & /g, '-')}`}
              >
                {link.name}
              </a>
            ))}

            {/* Luxurious "More" Dropdown with safe hover zones */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`text-gray-300 hover:text-gold text-xs uppercase tracking-widest font-semibold transition-colors duration-200 px-3 py-4 rounded-md flex items-center gap-1 cursor-pointer ${isDropdownOpen ? 'text-gold' : ''}`}
                id="nav-more-trigger"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                More
                <svg 
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${isDropdownOpen ? 'transform rotate-180 text-gold' : 'text-gray-400'}`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* Invisible Bridge/Safe Zone to connect trigger and menu physically */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-full h-4 bg-transparent -mt-2 z-10" />
              )}

              {/* Dropdown Menu */}
              <div className={`absolute left-0 mt-2 w-52 rounded-lg bg-[#151515] border border-gold/15 shadow-xl py-2 z-20 transition-all duration-300 origin-top-left ${
                isDropdownOpen 
                  ? 'opacity-100 scale-100 pointer-events-auto' 
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}>
                {moreLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="block px-4 py-2.5 text-xs text-gray-300 hover:text-gold hover:bg-[#222] uppercase tracking-widest font-medium transition-colors duration-200 border-l-2 border-transparent hover:border-gold/60"
                    id={`nav-more-${link.name.toLowerCase().replace(/ & /g, '-')}`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* Contact & Book Button */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:09092136969"
              className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors duration-200 px-2 py-1 rounded"
              id="header-call-cta"
            >
              <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center bg-black/30">
                <Phone className="w-3.5 h-3.5 text-gold" />
              </div>
              <div className="text-left">
                <p className="text-[9px] uppercase tracking-wider text-gray-400">Call Specialist</p>
                <p className="text-xs font-semibold text-white font-mono">090921 36969</p>
              </div>
            </a>
            
            <button
              onClick={onBookClick}
              className="bg-gold hover:bg-gold/90 text-black font-bold text-xs uppercase tracking-widest py-3 px-5 rounded transition-all duration-300 transform hover:scale-[1.02] shadow-md shadow-gold/10 flex items-center gap-2 cursor-pointer"
              id="header-book-cta"
            >
              <Calendar className="w-4 h-4" />
              Book Free Consult
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="tel:09092136969"
              className="sm:hidden w-10 h-10 rounded border border-gold/20 flex items-center justify-center bg-black/30 text-gold"
              id="mobile-header-call-icon"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-gold p-3 rounded"
              id="mobile-menu-toggle"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[72px] bg-black/95 z-40 lg:hidden flex flex-col justify-between py-6 px-6 animate-fade-in border-t border-gold/10 overflow-y-auto">
          <nav className="flex flex-col gap-4" id="mobile-nav">
            {allLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-gray-300 hover:text-gold text-xs uppercase tracking-widest font-semibold border-b border-gray-900 pb-3 block pt-2"
                id={`mobile-nav-${link.name.toLowerCase().replace(/ & /g, '-')}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4 mt-8">
            <a
              href="tel:09092136969"
              className="flex items-center justify-center gap-3 border border-gold/30 text-gold font-bold py-3 px-4 rounded text-center text-xs uppercase tracking-widest"
              id="mobile-drawer-call"
            >
              <Phone className="w-4 h-4" />
              Call Specialist (090921 36969)
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                onBookClick();
              }}
              className="bg-gold text-black font-bold py-3 px-4 rounded text-center text-xs uppercase tracking-widest hover:bg-gold/90 transition-colors shadow-md shadow-gold/10 cursor-pointer"
              id="mobile-drawer-book"
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
