import React from 'react';
import { Award, ShieldCheck, Microscope, HeartHandshake, CheckCircle, Activity, Smile, PiggyBank } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Award,
      title: 'Experienced Specialists',
      description: 'Our certified medical dermatologists and clinical trichologists possess over 10+ years of cumulative expertise in skin remodeling and hair restoration.'
    },
    {
      icon: Microscope,
      title: 'Modern FDA-Approved Equipment',
      description: 'We invest in advanced, medical-grade, cool-tip lasers and digital scalp analysis tech to ensure maximum safety, precision, and quick recoveries.'
    },
    {
      icon: HeartHandshake,
      title: 'Personalized Care Protocols',
      description: 'Zero generic formulas. We execute customized skin and hair therapeutic schedules designed purely to match your chemical parameters.'
    },
    {
      icon: PiggyBank,
      title: 'Affordable Pricing & Plans',
      description: 'Our world-class procedures are structured transparently without hidden operational line-items. Flexible luxury care accessible to all.'
    },
    {
      icon: ShieldCheck,
      title: 'Sterile & Hygienic Clinic',
      description: 'We execute rigorous hospital-grade sterilization checklists and maintain completely clean private therapy suites for clinical safety.'
    },
    {
      icon: Activity,
      title: 'Advanced Diagnostic Procedures',
      description: 'Utilizing next-generation trichoscopy and dermal imaging to locate root conditions before writing medical care recipes.'
    },
    {
      icon: Smile,
      title: 'Natural-Looking Outcomes',
      description: 'We focus on structural biology. Our treatments are executed to rebuild and complement your natural facial aesthetics and hair density lines.'
    },
    {
      icon: CheckCircle,
      title: '98.7% Patient Satisfaction',
      description: 'Over 12,000+ satisfied patients across Tamil Nadu. Highly trusted local reputation with stellar Google ratings and reviews.'
    }
  ];

  const stats = [
    { number: '12,000+', label: 'Happy Patients' },
    { number: '10+', label: 'Years Experience' },
    { number: '98.7%', label: 'Success Rate' },
    { number: '0', label: 'Consultation Fee' }
  ];

  return (
    <section id="why-choose" className="py-20 sm:py-24 bg-[#181818] text-white border-t border-b border-gold/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 text-left">
            <span className="text-xs font-semibold text-gold uppercase tracking-widest block mb-3">
              Why Choose Bonitaa
            </span>
            <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-white">
              Clinical Excellence Meets Luxury Care
            </h2>
            <p className="font-sans text-gray-400 text-sm sm:text-base mt-4 font-light leading-relaxed max-w-2xl">
              We combine strict medical sciences with comfortable, premium private spa treatment spaces. Explore why our Tiruppur clinic is the premier choice for skincare and hair restoration.
            </p>
          </div>
          
          <div className="lg:col-span-4 lg:text-right">
            <div className="inline-flex border border-gold/20 rounded bg-black/40 p-4 backdrop-blur-sm">
              <span className="text-[11px] text-gray-300 tracking-wider uppercase leading-snug">
                📍 Convenient Location <br />
                <span className="text-gold font-bold">60 Feet Road, Kumar Nagar</span>
              </span>
            </div>
          </div>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16" id="why-choose-grid">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-black/40 border border-gray-800 hover:border-gold/30 rounded-lg p-6 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 flex flex-col items-start"
                id={`why-choose-card-${index}`}
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-5 text-gold border border-gold/20">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-bold text-base text-white tracking-wide">
                  {item.title}
                </h3>
                <p className="font-sans text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-black border border-gold/15 p-8 rounded-lg text-center shadow-xl relative overflow-hidden" id="clinic-stats-container">
          <div className="absolute inset-0 bg-gold/[0.01] pointer-events-none"></div>
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center" id={`stat-item-${idx}`}>
              <p className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-gold tracking-tight">
                {stat.number}
              </p>
              <p className="text-[10px] sm:text-xs tracking-widest text-gray-400 uppercase mt-2 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
