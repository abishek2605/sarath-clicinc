import React, { useState } from 'react';
import { Phone, Calendar, Shield, Award, Users, CheckCircle2, Sparkles, AlertCircle, Star, ShieldCheck, MapPin } from 'lucide-react';
import { LeadSubmission } from '../types';
import { sendLeadToFormspree } from '../services/formspree';

interface HeroProps {
  onSuccess: (submission: LeadSubmission) => void;
}

export const TREATMENTS_LIST = [
  'Hair Transplant',
  'Excell Gfc',
  'Prp,Gfc',
  'Anti dandruff treatment',
  'Micro needling',
  'Low level laser hair therapy',
  'Hair fall controll',
  'Anti acne',
  'Botox&fillers',
  'Mnrf&meso glow',
  'Glutathione treatment for skin',
  'Excell Gfc skin',
  'Carbon laser therapy',
  'Full body laser hair removal'
];

export const PREFERRED_TIMES = [
  'Morning (10:00 AM - 1:00 PM)',
  'Afternoon (1:00 PM - 4:00 PM)',
  'Evening (4:00 PM - 7:00 PM)'
];

export default function Hero({ onSuccess }: HeroProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    consultationType: 'IN-CLINIC' as 'ONLINE' | 'IN-CLINIC'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const submission: LeadSubmission = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      consultationType: formData.consultationType,
      submittedAt: new Date().toISOString()
    };

    // 1. Post to Formspree endpoint (https://formspree.io/f/xykqbvjk)
    await sendLeadToFormspree(submission);

    // 2. Persistence in local storage
    const existingLeads = JSON.parse(localStorage.getItem('bonitaa_leads') || '[]');
    existingLeads.unshift(submission);
    localStorage.setItem('bonitaa_leads', JSON.stringify(existingLeads));

    setIsSubmitting(false);
    onSuccess(submission);
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      consultationType: 'IN-CLINIC'
    });
  };

  return (
    <section id="home" className="relative min-h-[calc(100vh-120px)] pt-8 sm:pt-12 lg:pt-16 pb-16 flex items-center justify-center bg-[#111111] overflow-hidden">
      {/* Background with luxury black overlay, clinical blue-grey glows, and golden particle grids */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" id="hero-background-grid">
        {/* Modern Crisp Grid Box Structure */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(201, 162, 39, 0.25) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(201, 162, 39, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 35%, #000 40%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 35%, #000 40%, transparent 95%)'
          }}
        />

        {/* Grid Box Corner Nodes / Tech Dots */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201, 162, 39, 0.6) 1.5px, transparent 0)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 75% 65% at 50% 30%, #000 35%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 30%, #000 35%, transparent 90%)'
          }}
        />

        {/* Ambient Warm Golden Glow Center */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[550px] rounded-full bg-gold/10 blur-[130px]" />
        {/* Top Corner Amber Accent */}
        <div className="absolute -top-16 right-10 w-[350px] h-[350px] rounded-full bg-gold/5 blur-[100px]" />
        {/* Clinical Deep Cyan/Slate Accent */}
        <div className="absolute -bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-cyan-950/20 blur-[110px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 flex flex-col text-left space-y-6" id="hero-left-content">
            {/* Consultation Fee Badge & Rating */}
            <div className="flex flex-wrap items-center gap-2" id="hero-badges">
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/40 rounded-full px-4 py-1.5 w-fit" id="fee-badge">
                <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
                <span className="text-[11px] sm:text-xs font-bold text-gold tracking-widest uppercase">
                  FREE DOCTOR CONSULTATION
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 w-fit text-[11px] text-gray-300">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                💻 Online & 🏥 In-Clinic Available
              </div>
              <div className="inline-flex items-center gap-1.5 bg-black/60 border border-gold/20 rounded-full px-3 py-1.5 w-fit text-[11px] text-gold font-semibold">
                <span>4.9 ★★★★★</span>
                <span className="text-gray-400 font-normal">(10,000+ Happy Patients)</span>
              </div>
            </div>

            {/* Headline H1 */}
            <h1 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-white leading-tight tracking-tight" id="hero-heading">
              Best Skin & Hair <br className="hidden md:inline" />
              Care Clinic in <span className="text-gold relative inline-block">
                Tiruppur
                <span className="absolute left-0 bottom-1 w-full h-[2px] bg-gold/30"></span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="font-sans text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed" id="hero-subheading">
              Advanced, FDA-approved clinical solutions for Hair Transplant, Excell GFC, PRP & GFC Hair Growth, Hair Fall Control, Anti-Dandruff, Microneedling, Laser Hair Therapy, Anti-Acne, Botox & Fillers, MNRF, Meso Glow, Glutathione, Carbon Laser Therapy & Full-Body Laser Hair Removal. Get treated by senior dermatologists in Tiruppur. Consultation is <span className="text-gold font-bold">100% Free</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#booking-form"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('name-input')?.focus();
                }}
                className="bg-gold hover:bg-gold/90 text-black font-bold text-xs sm:text-sm uppercase tracking-widest py-4 px-8 rounded transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-gold/20 flex items-center gap-2 cursor-pointer"
                id="hero-book-btn"
              >
                <Calendar className="w-4 h-4" />
                Book Consultation
              </a>
              
              <a
                href="tel:9092136969"
                className="bg-transparent border border-gray-600 hover:border-gold hover:text-gold text-white font-bold text-xs sm:text-sm uppercase tracking-widest py-4 px-8 rounded transition-all duration-300 flex items-center gap-2"
                id="hero-call-btn"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            {/* Micro stats banner */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 font-light pt-1">
              <span>⏱️ Average booking time: 24 seconds</span>
              <span>•</span>
              <span>⚡ Clinical call callback: Within 15 mins</span>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 pt-6 border-t border-gray-800" id="hero-trust-indicators">
              <div className="flex items-center gap-2" id="indicator-rating">
                <Star className="w-5 h-5 text-gold shrink-0 fill-gold/20" />
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-bold text-white leading-none">4.9</p>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mt-1">PATIENT RATING</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2" id="indicator-patients">
                <Users className="w-5 h-5 text-gold shrink-0" />
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-bold text-white leading-none">10,000+</p>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mt-1">HAPPY PATIENTS</p>
                </div>
              </div>

              <div className="flex items-center gap-2" id="indicator-doctors">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-bold text-white leading-none">15+ Yrs</p>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mt-1">EXPERT DOCTORS</p>
                </div>
              </div>

              <div className="flex items-center gap-2" id="indicator-tech">
                <Sparkles className="w-5 h-5 text-gold shrink-0" />
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-bold text-white leading-none">FDA Appr.</p>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mt-1">ADVANCED TECH</p>
                </div>
              </div>

              <div className="flex items-center gap-2 col-span-2 sm:col-span-1" id="indicator-location">
                <MapPin className="w-5 h-5 text-gold shrink-0" />
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-bold text-white leading-none">Tiruppur</p>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mt-1">CLINIC</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Form Right - Above the Fold */}
          <div className="lg:col-span-5 w-full" id="booking-form-container">
            <div className="bg-[#181818] border border-gold/25 rounded-lg p-6 sm:p-8 shadow-2xl relative" id="booking-form">
              {/* Dynamic decorative golden corner borders */}
              <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-gold rounded-tl"></div>
              <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-gold rounded-tr"></div>
              <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-gold rounded-bl"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-gold rounded-br"></div>

              <div className="text-center mb-6">
                <span className="text-xs font-bold text-gold uppercase tracking-wider block mb-1">
                  ⚡ Schedule Doctor Appointment
                </span>
                <h3 className="font-sans font-bold text-lg sm:text-xl text-white tracking-wide">
                  Book Consultation
                </h3>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">Senior Dermatologist Evaluation</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" id="lead-capture-form">
                {/* Full Name Field */}
                <div>
                  <label htmlFor="name-input" className="block text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    id="name-input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter first and last name"
                    className={`w-full bg-[#202020] text-white border rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-gold focus:ring-gold'
                    }`}
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone-input" className="block text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone-input"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit mobile number"
                    className={`w-full bg-[#202020] text-white border rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-gold focus:ring-gold'
                    }`}
                  />
                  {errors.phone && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email-input" className="block text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email-input"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className={`w-full bg-[#202020] text-white border rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-gold focus:ring-gold'
                    }`}
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Consultation Type Toggle */}
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-1.5">
                    Consultation Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, consultationType: 'ONLINE' }))}
                      className={`py-2.5 px-3 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                        formData.consultationType === 'ONLINE'
                          ? 'bg-gold text-black border-gold'
                          : 'bg-[#202020] text-gray-400 border-gray-700 hover:text-white'
                      }`}
                    >
                      ONLINE
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, consultationType: 'IN-CLINIC' }))}
                      className={`py-2.5 px-3 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                        formData.consultationType === 'IN-CLINIC'
                          ? 'bg-gold text-black border-gold'
                          : 'bg-[#202020] text-gray-400 border-gray-700 hover:text-white'
                      }`}
                    >
                      IN-CLINIC
                    </button>
                  </div>
                </div>

                {/* CTA Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold/90 text-black font-bold text-xs uppercase tracking-widest py-4 px-4 rounded transition-all duration-300 transform hover:scale-[1.01] shadow-lg shadow-gold/10 mt-6 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-wait"
                  id="submit-lead-btn"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Validating Securely...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      RESERVE CONSULTATION
                    </>
                  )}
                </button>

                <div className="text-[11px] text-center text-gray-400 mt-3 space-y-1.5 font-light">
                  <p className="text-gray-300">100% Free Consultation. No hidden charges or commitments.</p>
                  <p className="text-gold font-semibold">🔥 Only 4 slots left for today</p>
                  <p>🔒 Medical Privacy Guaranteed. Callback within 15 mins.</p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
