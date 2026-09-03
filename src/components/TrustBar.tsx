import React from 'react';
import { Star, Users, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export default function TrustBar() {
  const trustItems = [
    {
      icon: <Star className="w-4 h-4 text-gold shrink-0 fill-gold/30" />,
      primary: '4.9',
      secondary: 'PATIENT RATING',
      highlight: false
    },
    {
      icon: <Users className="w-4 h-4 text-gold shrink-0" />,
      primary: '10,000+',
      secondary: 'HAPPY PATIENTS',
      highlight: true
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-gold shrink-0" />,
      primary: '15+ Yrs',
      secondary: 'EXPERT DOCTORS',
      highlight: false
    },
    {
      icon: <Sparkles className="w-4 h-4 text-gold shrink-0" />,
      primary: 'FDA Appr.',
      secondary: 'ADVANCED TECH',
      highlight: false
    },
    {
      icon: <MapPin className="w-4 h-4 text-gold shrink-0" />,
      primary: 'Tiruppur',
      secondary: 'CLINIC',
      highlight: false
    },
  ];

  return (
    <div className="bg-[#181818] border-b border-gold/25 py-2.5 px-4 text-white text-xs relative z-30 shadow-md" id="trust-bar">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
          {trustItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded bg-black/60 border border-gold/15 hover:border-gold/40 transition-all shadow-sm ${idx === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
            >
              {item.icon}
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className={`font-bold text-xs tracking-tight ${item.highlight ? 'text-gold' : 'text-white'}`}>
                  {item.primary}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">
                  {item.secondary}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
