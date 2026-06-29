import React, { useState } from 'react';
import { Calendar, ShieldAlert, Sparkles, Zap, ArrowRight, HeartPulse } from 'lucide-react';
import { Treatment } from '../types';

interface TreatmentsProps {
  onSelectTreatment: (treatmentName: string) => void;
}

const TREATMENTS_DATA: (Treatment & { category: 'skin' | 'hair' | 'advanced' })[] = [
  {
    id: 'hair-fall',
    category: 'hair',
    title: 'Hair Fall Treatment',
    description: 'Comprehensive evaluation of hair loss causes coupled with clinical, medical-grade solutions to arrest fall and trigger follicle health.',
    duration: '45 mins',
    tag: 'Follicle Stimulating',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prp-hair',
    category: 'hair',
    title: 'PRP Hair Therapy',
    description: 'Platelet-Rich Plasma therapy utilizing your own growth factors to naturally activate and density-enhance miniaturizing hair follicles.',
    duration: '60 mins',
    tag: 'Premium Hair Growth',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gfc-hair',
    category: 'hair',
    title: 'GFC Hair Treatment',
    description: 'Advanced Growth Factor Concentrate therapy. A next-gen, highly stable and cell-free treatment offering faster and superior follicle recovery.',
    duration: '50 mins',
    tag: 'Clinical Growth Cell',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'acne-tx',
    category: 'skin',
    title: 'Acne Treatment',
    description: 'Specialized dermatological care targeting acne roots, regulating sebum, and clearing active pustules to restore structural skin harmony.',
    duration: '45 mins',
    tag: 'Dermatologist Standard',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pigmentation',
    category: 'skin',
    title: 'Pigmentation Treatment',
    description: 'Advanced clinical treatments for melasma, freckles, and sun spots. Evens out skin tone by targeting overactive deep melanocytes.',
    duration: '40 mins',
    tag: 'Melanocyte Regulation',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'brightening',
    category: 'skin',
    title: 'Skin Brightening',
    description: 'Premium glutathione and vitamin infusions designed to combat oxidative stress, improve luminosity, and reveal natural, flawless radiance.',
    duration: '45 mins',
    tag: 'Deep Luminosity Boost',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'laser-hair',
    category: 'advanced',
    title: 'Laser Hair Removal',
    description: 'Pain-free, US-FDA approved cool-tip laser technology to achieve permanently smooth, hair-free skin across all skin types safely.',
    duration: '30-90 mins',
    tag: 'US-FDA Approved',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'anti-aging',
    category: 'advanced',
    title: 'Anti Aging Treatment',
    description: 'Non-surgical collagen-boosting therapies, targeted fine-line correction, and skin laxity restoration for natural youthfulness.',
    duration: '60 mins',
    tag: 'Collagen Stimulating',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'chemical-peel',
    category: 'skin',
    title: 'Chemical Peel',
    description: 'Controlled medical-grade skin exfoliation utilizing specialized organic plant acids to sweep dead cells and surface imperfections.',
    duration: '30 mins',
    tag: 'Cellular Turnover',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hydra-facial',
    category: 'skin',
    title: 'Hydra Facial',
    description: 'Multi-step vortex deep extraction, luxury serum infusion, and intense hydration treatment that delivers immediate, red-carpet ready skin glow.',
    duration: '45 mins',
    tag: 'Instant Red-Carpet Glow',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rejuvenation',
    category: 'skin',
    title: 'Skin Rejuvenation',
    description: 'Advanced medical microneedling and peptide serums combined to boost elastin production, minimize pores, and revive tired skin.',
    duration: '50 mins',
    tag: 'Elasticity & Pore Rescue',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mole-removal',
    category: 'advanced',
    title: 'Warts & Mole Removal',
    description: 'Advanced clinical electrocautery and RF micro-precision removals for facial warts and moles. Quick 15-minute procedures with zero downtime and lasting results.',
    duration: '15 mins',
    tag: 'RF Micro-Precision',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'scar-treatment',
    category: 'advanced',
    title: 'Scar Treatment',
    description: 'Specialized clinical remodeling for deep ice-pick, boxcar, and rolling scars using advanced subcision and collagen induction.',
    duration: '45 mins',
    tag: 'Scar Tissue Remodeling',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'
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
              {/* Image & Tag */}
              <div className="relative h-48 overflow-hidden bg-gray-50">
                <img
                  src={treatment.image}
                  alt={`${treatment.title} at Bonitaa Clinic Tiruppur`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {treatment.tag && (
                  <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-gold/40 text-gold text-[9px] font-semibold uppercase tracking-widest px-3 py-1 rounded">
                    {treatment.tag}
                  </span>
                )}
                
                <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-black text-[10px] font-semibold px-2.5 py-1 rounded">
                  {treatment.duration}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
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
                    Doctor Consultation ₹0
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
