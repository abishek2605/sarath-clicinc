import React, { useState } from 'react';
import { Phone, Calendar, Shield, Award, Users, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { LeadSubmission } from '../types';

interface HeroProps {
  onSuccess: (submission: LeadSubmission) => void;
}

export const TREATMENTS_LIST = [
  'Hair Fall Treatment',
  'PRP Hair Therapy',
  'GFC Hair Treatment',
  'Acne Treatment',
  'Pigmentation Treatment',
  'Skin Brightening',
  'Laser Hair Removal',
  'Anti Aging Treatment',
  'Chemical Peel',
  'Hydra Facial',
  'Skin Rejuvenation',
  'Warts & Mole Removal',
  'Scar Treatment'
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
    treatment: '',
    preferredTime: ''
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

    if (!formData.treatment) {
      newErrors.treatment = 'Please select a treatment';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select your preferred time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate real API / Webhook submission
    setTimeout(() => {
      const submission: LeadSubmission = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        treatment: formData.treatment,
        preferredTime: formData.preferredTime,
        submittedAt: new Date().toISOString()
      };

      // Persistence
      const existingLeads = JSON.parse(localStorage.getItem('bonitaa_leads') || '[]');
      existingLeads.unshift(submission);
      localStorage.setItem('bonitaa_leads', JSON.stringify(existingLeads));

      setIsSubmitting(false);
      onSuccess(submission);
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        treatment: '',
        preferredTime: ''
      });
    }, 1200);
  };

  const scrollToTreatments = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#treatments');
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-24 lg:pt-32 pb-16 flex items-center justify-center bg-[#111111] overflow-hidden">
      {/* Background with luxury black overlay, clinical blue-grey glows, and golden particle grids */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1920&q=80')" }}></div>
        {/* Subtle Golden Glow Circle */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px] pointer-events-none"></div>
        {/* Clinical Teal-Blue Glow */}
        <div className="absolute -bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-cyan-900/5 blur-[100px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 flex flex-col text-left space-y-6" id="hero-left-content">
            {/* Zero Fee Consultation Badge + Google Rating */}
            <div className="flex flex-wrap items-center gap-3" id="hero-trust-badges-wrapper">
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 w-fit" id="zero-fee-badge">
                <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
                <span className="text-[10px] sm:text-xs font-semibold text-gold tracking-widest uppercase">
                  Zero Consultation Fee (Limited Offer)
                </span>
              </div>
              
              <div className="inline-flex items-center gap-1.5 bg-[#1C1C1C] border border-gray-800 rounded-full px-3.5 py-1.5 text-xs text-gray-300 font-medium" id="google-rating-badge">
                <span className="text-gold font-bold">4.9 ★★★★★</span>
                <span className="text-gray-500 font-light text-[11px]">(1,200+ Reviews in Tiruppur)</span>
              </div>
            </div>

            {/* Headline H1 with highly optimized Google Ads keyword triggers */}
            <h1 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-white leading-tight tracking-tight" id="hero-heading">
              Best Skin & Hair <br className="hidden md:inline" />
              Care Clinic in <span className="text-gold relative inline-block">
                Tiruppur
                <span className="absolute left-0 bottom-1 w-full h-[2px] bg-gold/30"></span>
              </span>
            </h1>

            {/* Subheadline packed with high-intent keywords (Warts & Mole, PRP, GFC, Acne Scars) to score perfect Ad Relevance */}
            <p className="font-sans text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed" id="hero-subheading">
              Advanced, FDA-approved clinical solutions for <span className="text-white font-medium">Warts & Mole Removal</span>, <span className="text-white font-medium">PRP & GFC Hair Growth</span>, and <span className="text-white font-medium">Acne Scar treatments</span>. Get treated by senior dermatologists in Tiruppur. Pay <span className="text-gold font-bold">₹0 consultation fee</span> today.
            </p>

            {/* High intent keyword chips for search crawlers (Ad Relevance optimization) */}
            <div className="flex flex-wrap gap-2 text-[10px] text-gray-400 font-mono tracking-wide" id="search-intent-keywords">
              <span className="bg-black/40 border border-gray-800/80 px-2.5 py-1 rounded">#SkinSpecialistTiruppur</span>
              <span className="bg-black/40 border border-gray-800/80 px-2.5 py-1 rounded">#WartsTreatment</span>
              <span className="bg-black/40 border border-gray-800/80 px-2.5 py-1 rounded">#GFCHairTherapy</span>
              <span className="bg-black/40 border border-gray-800/80 px-2.5 py-1 rounded">#AcneScarRemodeling</span>
            </div>

            {/* CTAs with friction-reducers */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-wrap gap-4">
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
                  Book Free Consultation
                </a>
                
                <a
                  href="tel:09092136969"
                  className="bg-transparent border border-gray-600 hover:border-gold hover:text-gold text-white font-bold text-xs sm:text-sm uppercase tracking-widest py-4 px-8 rounded transition-all duration-300 flex items-center gap-2"
                  id="hero-call-btn"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </div>
              
              {/* Frictionless booking cues */}
              <p className="text-[11px] text-gray-500 font-light flex items-center gap-1.5" id="frictionless-booking-cue">
                <span>⏱️ Average booking time: <span className="text-gold font-medium">24 seconds</span></span>
                <span className="text-gray-800">•</span>
                <span>⚡ Clinical call callback: <span className="text-gold font-medium">Within 15 mins</span></span>
              </p>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-800" id="hero-trust-indicators">
              <div className="flex items-center gap-2" id="indicator-doctors">
                <Users className="w-5 h-5 text-gold shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 leading-none">Experience</p>
                  <p className="text-xs font-semibold text-white mt-1">Expert Specialists</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2" id="indicator-tech">
                <Shield className="w-5 h-5 text-gold shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 leading-none">Technology</p>
                  <p className="text-xs font-semibold text-white mt-1">FDA Approved Tech</p>
                </div>
              </div>

              <div className="flex items-center gap-2" id="indicator-care">
                <Award className="w-5 h-5 text-gold shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 leading-none">Approach</p>
                  <p className="text-xs font-semibold text-white mt-1">Personalized Care</p>
                </div>
              </div>

              <div className="flex items-center gap-2" id="indicator-safety">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 leading-none">Safety</p>
                  <p className="text-xs font-semibold text-white mt-1">100% Sterile</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Form Right - Above the Fold */}
          <div className="lg:col-span-5 w-full" id="booking-form-container">
            <div className="bg-[#181818] border border-gold/25 rounded-lg p-6 sm:p-8 shadow-2xl relative" id="booking-form">
              {/* Dynamic decorative golden corner borders to emphasize custom premium layout */}
              <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-gold rounded-tl"></div>
              <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-gold rounded-tr"></div>
              <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-gold rounded-bl"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-gold rounded-br"></div>

              <div className="text-center mb-6">
                <h3 className="font-sans font-bold text-lg sm:text-xl text-white tracking-wide">
                  Schedule Appointment
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Secure your limited free consultation slot
                </p>
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

                {/* Treatment Interested */}
                <div>
                  <label htmlFor="treatment-input" className="block text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-1.5">
                    Treatment Interested In
                  </label>
                  <select
                    id="treatment-input"
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleChange}
                    className={`w-full bg-[#202020] text-white border rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 appearance-none transition-all cursor-pointer ${
                      errors.treatment ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-gold focus:ring-gold'
                    }`}
                    style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"%23C9A227\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/></svg>')", backgroundPosition: "right 12px center", backgroundRepeat: "no-repeat" }}
                  >
                    <option value="" disabled>Select Clinical Treatment</option>
                    {TREATMENTS_LIST.map((t, idx) => (
                      <option key={idx} value={t} className="bg-[#181818]">{t}</option>
                    ))}
                  </select>
                  {errors.treatment && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.treatment}</span>
                    </div>
                  )}
                </div>

                {/* Preferred Time */}
                <div>
                  <label htmlFor="time-input" className="block text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    id="time-input"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className={`w-full bg-[#202020] text-white border rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 appearance-none transition-all cursor-pointer ${
                      errors.preferredTime ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-gold focus:ring-gold'
                    }`}
                    style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"%23C9A227\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/></svg>')", backgroundPosition: "right 12px center", backgroundRepeat: "no-repeat" }}
                  >
                    <option value="" disabled>Select Time Window</option>
                    {PREFERRED_TIMES.map((t, idx) => (
                      <option key={idx} value={t} className="bg-[#181818]">{t}</option>
                    ))}
                  </select>
                  {errors.preferredTime && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.preferredTime}</span>
                    </div>
                  )}
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
                      Book My Free Consultation
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-gray-500 mt-3 leading-normal">
                  🔒 Your information is fully confidential under medical privacy.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
