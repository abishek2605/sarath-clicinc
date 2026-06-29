import React from 'react';
import { MapPin, Phone, Clock, Compass, ExternalLink } from 'lucide-react';

export default function MapSection() {
  const addressLines = [
    'BONITAA SKIN AND HAIR CARE',
    '51/31, J.G. Nagar',
    '60 Feet Road, Kumar Nagar 2nd Street',
    'Tiruppur, Tamil Nadu - 641602'
  ];

  // Official direct navigation link for Google Maps to easily route local users
  const googleMapsRouteUrl = 'https://maps.google.com/?q=BONITAA+SKIN+AND+HAIR+CARE+Tiruppur';

  return (
    <section id="contact" className="py-20 sm:py-24 bg-white text-black scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest block mb-3">
            Clinic Direction
          </span>
          <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-gray-900">
            Visit Our Tiruppur Clinic
          </h2>
          <p className="font-sans text-gray-500 text-sm sm:text-base mt-4 font-light leading-relaxed">
            We are located in the heart of Tiruppur, featuring an ultra-modern luxury infrastructure, absolute hygiene, and private parking.
          </p>
        </div>

        {/* Map and Info Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="maps-grid-container">
          
          {/* Info Card Left */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-gray-50 border border-gray-150 p-6 sm:p-8 rounded-lg shadow-sm" id="map-info-card">
            <div className="space-y-6">
              <h3 className="font-sans font-bold text-xl text-gray-900 tracking-wide flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold shrink-0" />
                Clinic Location
              </h3>

              {/* Address details */}
              <div className="space-y-2 text-left text-sm text-gray-700 font-light" id="clinic-full-address">
                {addressLines.map((line, idx) => (
                  <p 
                    key={idx} 
                    className={`${idx === 0 ? 'font-bold text-black text-base' : ''}`}
                    id={`addr-line-${idx}`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Contact numbers */}
              <div className="pt-4 border-t border-gray-200 space-y-3 text-left">
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  <div>
                    <p className="text-gray-400 uppercase tracking-widest text-[9px] font-bold">Call Coordinator</p>
                    <a href="tel:09092136969" className="text-black font-bold hover:text-gold transition-colors">
                      090921 36969
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-center gap-3 text-xs sm:text-sm pt-2">
                  <Clock className="w-4 h-4 text-gold shrink-0" />
                  <div>
                    <p className="text-gray-400 uppercase tracking-widest text-[9px] font-bold">Working Hours</p>
                    <p className="text-black font-semibold">10:00 AM - 07:00 PM <span className="text-gray-500 font-light text-xs">(All Days Open)</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct navigation trigger */}
            <div className="pt-8">
              <a
                href={googleMapsRouteUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-black hover:bg-black/90 text-white font-bold text-xs uppercase tracking-widest py-4 px-4 rounded transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow cursor-pointer border border-black"
                id="google-maps-navigator"
              >
                <Compass className="w-4 h-4 text-gold animate-spin-slow" />
                Open In Google Maps
                <ExternalLink className="w-3.5 h-3.5 opacity-55" />
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed Frame Right */}
          <div className="lg:col-span-7 rounded-lg overflow-hidden border border-gray-200 shadow-lg min-h-[350px] bg-gray-50" id="map-iframe-container">
            <iframe
              title="Bonitaa Skin and Hair Care Location Map Tiruppur"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.8878931103525!2d77.33618331533513!3d11.121853892087541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba907cdcb355555%3A0xcb1b5e55cdbc55a9!2sBONITAA+SKIN+AND+HAIR+CARE!5e0!3m2!1sen!2sin!4v1719600000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '350px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              id="clinic-google-map-embed"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}
