import React, { useState } from 'react';
import { CalendarCheck } from 'lucide-react';
import { BeforeAfterCardItem } from '../types';

const TRANSFORMATION_CARDS: BeforeAfterCardItem[] = [
  {
    id: 'hair-restore',
    title: 'Hair Restoration',
    subtitle: 'GFC / PRP Hair Therapy',
    category: 'hair',
    fullImg: '/result-hair-1.jpg',
    sessionsBadge: 'Multiple Sessions',
    treatmentTag: 'HAIR'
  },
  {
    id: 'hair-density',
    title: 'Hair Density Recovery',
    subtitle: 'GFC Hair Treatment',
    category: 'hair',
    fullImg: '/result-hair-2.jpg',
    sessionsBadge: 'Visible from Session 3',
    treatmentTag: 'HAIR'
  },
  {
    id: 'hair-crown',
    title: 'Crown & Scalp Growth',
    subtitle: 'Advanced Growth Factor Therapy',
    category: 'hair',
    fullImg: '/result-hair-ohrs.jpg',
    sessionsBadge: '4–6 Sessions',
    treatmentTag: 'HAIR'
  },
  {
    id: 'skin-rejuve',
    title: 'Facial Skin Rejuvenation',
    subtitle: 'Skin Brightening & Laser',
    category: 'skin',
    fullImg: '/result-skin-face.jpg',
    sessionsBadge: '3–4 Sessions',
    treatmentTag: 'SKIN'
  },
  {
    id: 'scar-remodel',
    title: 'Acne Scar Remodeling',
    subtitle: 'Subcision & Microneedling',
    category: 'skin',
    fullImg: '/result-acne-scar.jpg',
    sessionsBadge: '4 Sessions',
    treatmentTag: 'SKIN'
  }
];

export default function BeforeAfter() {
  const [activeTab, setActiveTab] = useState<'all' | 'hair' | 'skin'>('all');

  const filteredCards = activeTab === 'all' 
    ? TRANSFORMATION_CARDS 
    : TRANSFORMATION_CARDS.filter(c => c.category === activeTab);

  const scrollToBooking = () => {
    const target = document.querySelector('#home');
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      document.getElementById('name-input')?.focus();
    }
  };

  return (
    <section id="before-after" className="py-20 sm:py-24 bg-white text-black scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest block mb-3">
            Real Patient Results
          </span>
          <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-gray-900">
            Before & After Transformations
          </h2>
          <p className="font-sans text-gray-500 text-sm sm:text-base mt-4 font-light leading-relaxed">
            Authentic, unedited clinical results from our patients at Bonitaa Skin & Hair Care, Tiruppur.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center gap-3 mb-12" id="before-after-tabs">
          {[
            { id: 'all', label: 'ALL' },
            { id: 'hair', label: 'HAIR' },
            { id: 'skin', label: 'SKIN' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2 rounded text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-black text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Transformations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12" id="transformations-cards-grid">
          {filteredCards.map((card) => (
            <div 
              key={card.id}
              className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] bg-black overflow-hidden flex">
                {card.fullImg ? (
                  <div className="w-full h-full relative">
                    <img 
                      src={card.fullImg} 
                      alt={`${card.title} clinical result`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 right-2 bg-gold text-black text-[9px] font-bold px-2 py-0.5 rounded uppercase shadow">
                      VERIFIED RESULT
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="w-1/2 h-full relative border-r border-gold/40">
                      <img 
                        src={card.beforeImg} 
                        alt={`${card.title} before`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/80 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                        BEFORE
                      </span>
                    </div>
                    <div className="w-1/2 h-full relative">
                      <img 
                        src={card.afterImg} 
                        alt={`${card.title} after`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-2 right-2 bg-gold text-black text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                        AFTER
                      </span>
                    </div>
                  </>
                )}

                {/* Category Tag */}
                <span className="absolute top-2 left-2 bg-black/90 border border-gold/30 text-gold text-[9px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                  {card.treatmentTag}
                </span>
              </div>

              {/* Card Information */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-sans font-bold text-base text-gray-900 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 font-light">
                    {card.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-[11px]">
                  <span className="text-gray-600 font-medium">
                    {card.sessionsBadge}
                  </span>
                  <button 
                    onClick={scrollToBooking}
                    className="text-gold font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Book Now →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="bg-gradient-to-r from-black via-[#1a1a1a] to-black border border-gold/30 p-8 rounded-xl text-center shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="font-sans font-bold text-lg sm:text-xl text-white">
              Ready to see your own transformation?
            </h3>
            <p className="text-xs text-gray-400 mt-1 font-light">
              Book a ₹99 consultation today and get expert skin & hair diagnostic evaluation.
            </p>
          </div>
          <button
            onClick={scrollToBooking}
            className="bg-gold hover:bg-gold/90 text-black font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded transition-all duration-300 transform hover:scale-[1.02] shadow-lg shrink-0 cursor-pointer flex items-center gap-2"
          >
            <CalendarCheck className="w-4 h-4" />
            BOOK CONSULTATION
          </button>
        </div>

      </div>
    </section>
  );
}
