import React from 'react';
import { Tag, Calendar, Sparkles, UserCheck } from 'lucide-react';

export default function TrustBar() {
  const trustItems = [
    {
      icon: <Tag className="w-4 h-4 text-gold shrink-0" />,
      text: 'Free Doctor Consultation',
      highlight: true
    },
    {
      icon: <Calendar className="w-4 h-4 text-gold shrink-0" />,
      text: 'Online & In-Clinic Care',
      highlight: false
    },
    {
      icon: <Sparkles className="w-4 h-4 text-gold shrink-0" />,
      text: 'Advanced Treatments',
      highlight: false
    },
    {
      icon: <UserCheck className="w-4 h-4 text-gold shrink-0" />,
      text: 'Experienced Specialists',
      highlight: false
    },
  ];

  return (
    <div className="bg-[#181818] border-b border-gold/25 py-3 px-4 text-white text-xs relative z-30 shadow-md" id="trust-bar">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {trustItems.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-center gap-2 py-2 px-3 rounded bg-black/60 border border-gold/15 hover:border-gold/40 transition-all shadow-sm"
            >
              {item.icon}
              <span className={`font-semibold text-[11px] sm:text-xs tracking-wide whitespace-nowrap ${item.highlight ? 'text-gold font-bold' : 'text-gray-200'}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
