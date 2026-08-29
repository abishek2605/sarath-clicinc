import React, { useState } from 'react';
import { Calendar, ShieldAlert, Sparkles, Zap, ArrowRight, HeartPulse } from 'lucide-react';
import { Treatment } from '../types';

interface TreatmentsProps {
  onSelectTreatment: (treatmentName: string) => void;
}

const TREATMENTS_DATA: (Treatment & { category: 'skin' | 'hair' | 'advanced' })[] = [
  {
    id: 'hair-transplant',
    category: 'hair',
    title: 'Hair Transplant',
    description: 'Advanced FUE/FUT follicular unit hair restoration for permanent density, natural hairline reconstruction, and maximum graft survival.',
    duration: '3–6 hrs',
    tag: 'Permanent Density',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'excell-gfc',
    category: 'hair',
    title: 'Excell Gfc',
    description: 'Next-generation high-concentration cell-free Growth Factor Concentrate therapy for rapid follicle revival, zero downtime, and accelerated hair regrowth.',
    duration: '45 mins',
    tag: 'Next-Gen Growth Factor',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prp-gfc',
    category: 'hair',
    title: 'Prp,Gfc',
    description: 'Synergistic Platelet-Rich Plasma & Growth Factor Concentrate therapy to arrest follicle miniaturization, activate dormant roots, and boost hair volume.',
    duration: '50 mins',
    tag: 'Dual-Action Regrowth',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'anti-dandruff',
    category: 'hair',
    title: 'Anti dandruff treatment',
    description: 'Clinical scalp detox, antifungal clarifying therapy, and deep micro-exfoliation to eliminate stubborn flakes, soothe itchiness, and balance scalp health.',
    duration: '40 mins',
    tag: 'Scalp Detox & Clarity',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'micro-needling',
    category: 'skin',
    title: 'Micro needling',
    description: 'Precision medical collagen induction therapy with peptide serums to minimize open pores, smoothen textured skin, and fade fine acne indentations.',
    duration: '45 mins',
    tag: 'Collagen Induction',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'low-level-laser-hair',
    category: 'hair',
    title: 'Low level laser hair therapy',
    description: 'US-FDA cleared cold laser photo-biomodulation stimulating cellular ATP, enhancing scalp micro-circulation, and thickening weak hair shafts.',
    duration: '30 mins',
    tag: 'Photo-Biomodulation',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hair-fall-control',
    category: 'hair',
    title: 'Hair fall controll',
    description: 'Targeted clinical trichology protocol assessing nutritional, hormonal, and scalp triggers to arrest severe shedding and fortify hair roots.',
    duration: '45 mins',
    tag: 'Root Fortification',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'anti-acne',
    category: 'skin',
    title: 'Anti acne',
    description: 'Specialized dermatological protocols clearing active cystic acne, regulating overactive sebaceous glands, and preventing recurring inflammatory breakouts.',
    duration: '45 mins',
    tag: 'Dermatologist Standard',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'botox-fillers',
    category: 'advanced',
    title: 'Botox&fillers',
    description: 'US-FDA approved precision neuromodulators and hyaluronic acid dermal fillers for softening dynamic wrinkles, restoring facial volume, and contouring.',
    duration: '30–45 mins',
    tag: 'Facial Aesthetics',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mnrf-meso-glow',
    category: 'advanced',
    title: 'Mnrf&meso glow',
    description: 'Micro-Needling Fractional Radiofrequency combined with targeted meso glow cocktail infusions for deep dermal remodeling, skin tightening, and instant radiance.',
    duration: '60 mins',
    tag: 'Deep Remodeling',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'glutathione-skin',
    category: 'skin',
    title: 'Glutathione treatment for skin',
    description: 'Medical-grade master antioxidant and vitamin infusions targeting stubborn hyperpigmentation, uneven tone, and dullness for luminous skin glow.',
    duration: '45 mins',
    tag: 'Luminosity Infusion',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'excell-gfc-skin',
    category: 'skin',
    title: 'Excell Gfc skin',
    description: 'Autologous cell-free Growth Factor Concentrate skin therapy designed to accelerate collagen regeneration, reduce fine lines, and restore natural firmness.',
    duration: '50 mins',
    tag: 'Cellular Rejuvenation',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'carbon-laser',
    category: 'advanced',
    title: 'Carbon laser therapy',
    description: 'Hollywood carbon peel laser therapy delivering instant deep pore cleansing, oil reduction, blackhead extraction, and visible textural brightening.',
    duration: '40 mins',
    tag: 'Instant Laser Glow',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'full-body-laser',
    category: 'advanced',
    title: 'Full body laser hair removal',
    description: 'Pain-free, US-FDA approved cool-tip laser technology for permanent, smooth, ingrown-free hair reduction across all skin tones and body areas.',
    duration: '60–120 mins',
    tag: 'Permanent Smoothness',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80'
  }
];

export default function Treatments({ onSelectTreatment }: TreatmentsProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'skin' | 'hair' | 'advanced'>('all');

  const filteredTreatments = activeCategory === 'all'
    ? TREATMENTS_DATA
    : TREATMENTS_DATA.filter(t => t.category === activeCategory);

  const handleBookTreatment = (title: string) => {
    // Check if matching in dropdown, if so pre-fill
    onSelectTreatment(title);
    
    // Smooth scroll to form
    const target = document.querySelector('#home');
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="treatments" className="py-20 sm:py-24 bg-white text-black scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/30 rounded-full px-3 py-1 mb-4">
            <HeartPulse className="w-3.5 h-3.5 text-gold" />
            <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">Clinical Solutions</span>
          </div>
          <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-gray-900">
            Dermatologist-Backed Treatments
          </h2>
          <p className="font-sans text-gray-500 text-sm sm:text-base mt-4 font-light leading-relaxed">
            Our state-of-the-art clinic offers non-surgical, science-based skin and hair restorations configured to match your unique biochemistry.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" id="treatment-category-filters">
          {[
            { id: 'all', label: 'All Treatments' },
            { id: 'skin', label: 'Skin Excellence' },
            { id: 'hair', label: 'Hair Restoration' },
            { id: 'advanced', label: 'Advanced & Laser' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-black text-white shadow-md shadow-black/10 border border-black'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-black border border-gray-200'
              }`}
              id={`filter-btn-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="treatments-grid">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              className="group bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              id={`treatment-card-${treatment.id}`}
            >
              {/* Content */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  {/* Top Tag & Duration Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    {treatment.tag ? (
                      <span className="bg-gold/10 border border-gold/30 text-gold text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded">
                        {treatment.tag}
                      </span>
                    ) : <div />}
                    <span className="text-gray-500 text-[11px] font-medium bg-gray-50 border border-gray-200 px-2.5 py-1 rounded">
                      ⏱️ {treatment.duration}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-lg text-gray-900 group-hover:text-gold transition-colors duration-200">
                    {treatment.title}
                  </h3>
                  <p className="font-sans text-gray-500 text-xs sm:text-sm mt-2.5 leading-relaxed font-light line-clamp-3">
                    {treatment.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gold uppercase tracking-widest font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3 text-gold shrink-0" />
                    Doctor Consultation
                  </span>
                  
                  <button
                    onClick={() => handleBookTreatment(treatment.title)}
                    className="text-gray-900 group-hover:text-gold text-xs uppercase tracking-widest font-bold flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
                    id={`book-treatment-${treatment.id}`}
                  >
                    Book Now
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
