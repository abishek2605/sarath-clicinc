import React from 'react';
import { Gift, CalendarCheck, ShieldCheck, Award } from 'lucide-react';

export default function TrustBar() {
  const trusts = [
    { icon: Gift, text: '0 Consultation Fee' },
    { icon: CalendarCheck, text: 'Same Day Appointment' },
    { icon: ShieldCheck, text: 'Advanced Treatments' },
    { icon: Award, text: 'Experienced Specialists' }
  ];

  return (
    <div className="bg-[#0A0A0A] border-b border-gold/10 py-2.5 relative z-50 mt-[80px] lg:mt-0" id="google-ads-trust-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4 items-center justify-center">
          {trusts.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="flex items-center justify-center gap-2 px-1 text-center"
                id={`trust-item-${index}`}
              >
                <Icon className="w-3.5 h-3.5 text-gold shrink-0 animate-pulse" />
                <span className="text-[10px] sm:text-xs tracking-wider uppercase font-medium text-gray-300">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
