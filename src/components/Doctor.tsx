import React, { useState, useEffect } from 'react';
import { Award, GraduationCap, ShieldCheck, CalendarCheck, CheckCircle } from 'lucide-react';
import Skeleton from './Skeleton';

export default function Doctor() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const specializations = [
    'Aesthetic Dermatology & Scar Remodeling',
    'Clinical Trichology & Follicle Rejuvenation',
    'Advanced Medical Lasers & Toning',
    'Anti-Aging Non-Surgical Enhancements',
    'Chemical Peeling & Deep Hydration'
  ];

  const credentials = [
    { icon: GraduationCap, text: 'MD - Dermatology, Venereology & Leprosy (Gold Medalist)' },
    { icon: Award, text: 'Fellowship in Aesthetic Medicine & Laser Surgery (Germany)' },
    { icon: ShieldCheck, text: 'Active Member - Indian Association of Dermatologists (IADVL)' }
  ];

  // Smooth perception filter transitions
  useEffect(() => {
    if (imageLoaded) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);

  return (
    <section id="specialist" className="py-20 sm:py-24 bg-[#181818] text-white border-t border-b border-gold/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest block mb-3">
            Clinical Leadership
          </span>
          <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-white">
            Meet Our Senior Specialist
          </h2>
          <p className="font-sans text-gray-400 text-sm sm:text-base mt-4 font-light leading-relaxed">
            Dermatological care should always be directed by certified medical professionals. Meet our chief consultant dedicated to your skin and hair goals.
          </p>
        </div>

        {/* Doctor Showcase Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Doctor Portrait Image Left */}
          <div className="lg:col-span-5 relative flex justify-center" id="doctor-portrait-box">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-lg overflow-hidden border border-gold/20 shadow-2xl bg-black">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
                alt="Chief Dermatologist at Bonitaa Skin and Hair Care Tiruppur"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500 ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
              />
              
              {/* Luxury gold corner overlays */}
              {!isTransitioning && (
                <>
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold/60"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold/60"></div>
                  
                  {/* Floating Experience Badge */}
                  <div className="absolute bottom-6 left-6 bg-black/90 backdrop-blur-sm border border-gold/30 rounded px-4 py-2 text-left shadow-lg">
                    <p className="text-gold font-bold text-lg leading-none">12+ Years</p>
                    <p className="text-[10px] text-gray-300 uppercase tracking-widest mt-1">Clinical Practice</p>
                  </div>
                </>
              )}

              {/* Shimmering Skeleton Loader for Image */}
              {isTransitioning && (
                <Skeleton className="absolute inset-0 bg-[#222222] !animate-none flex flex-col justify-end p-6">
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold/30"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold/30"></div>
                  <Skeleton className="h-10 w-28 bg-[#2d2d2d]" />
                </Skeleton>
              )}
            </div>
          </div>

          {/* Doctor Biography Details Right */}
          <div className="lg:col-span-7 text-left space-y-6" id="doctor-bio-box">
            {isTransitioning ? (
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-4 w-40 bg-[#2d2d2d]" />
                  <Skeleton className="h-8 w-3/4 bg-[#2d2d2d] mt-3" />
                  <Skeleton className="h-4 w-56 bg-[#242424] mt-2" />
                </div>

                {/* Quote block skeleton */}
                <div className="pl-6 border-l-2 border-gold/30 py-1 space-y-2">
                  <Skeleton className="h-4 w-full bg-[#242424]" />
                  <Skeleton className="h-4 w-11/12 bg-[#242424]" />
                  <Skeleton className="h-4 w-4/5 bg-[#242424]" />
                </div>

                {/* Credentials list skeleton */}
                <div className="space-y-3">
                  <Skeleton className="h-3 w-48 bg-[#2d2d2d]" />
                  <div className="space-y-2.5">
                    <div className="flex gap-3">
                      <Skeleton variant="circle" className="w-6 h-6 bg-[#242424] shrink-0" />
                      <Skeleton className="h-5 w-4/5 bg-[#242424]" />
                    </div>
                    <div className="flex gap-3">
                      <Skeleton variant="circle" className="w-6 h-6 bg-[#242424] shrink-0" />
                      <Skeleton className="h-5 w-5/6 bg-[#242424]" />
                    </div>
                  </div>
                </div>

                {/* Specializations list skeleton */}
                <div className="space-y-3">
                  <Skeleton className="h-3 w-32 bg-[#2d2d2d]" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Skeleton className="h-4 bg-[#242424]" />
                    <Skeleton className="h-4 bg-[#242424]" />
                    <Skeleton className="h-4 bg-[#242424]" />
                    <Skeleton className="h-4 bg-[#242424]" />
                  </div>
                </div>

                {/* Button skeleton */}
                <div className="pt-4">
                  <Skeleton className="h-12 w-64 bg-[#2d2d2d]" />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <span className="text-xs text-gold uppercase tracking-widest font-semibold">Chief Consultant Dermatologist</span>
                  <h3 className="font-sans font-bold text-2xl sm:text-3xl text-white mt-1.5 tracking-wide">
                    Dr. Priya Soundararajan, MD (DVL)
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-medium">
                    Reg No. 89452 | Bonitaa Skin & Hair Care - Tiruppur
                  </p>
                </div>

                {/* Quote block */}
                <div className="relative pl-6 border-l-2 border-gold py-1">
                  <p className="font-sans text-gray-300 text-sm sm:text-base italic font-light leading-relaxed">
                    "Healthy skin and dense, strong hair are more than aesthetics; they are expressions of biological vitality. We combine safe, gold-standard technologies with clinical precision to yield results that feel entirely natural."
                  </p>
                </div>

                {/* Credentials List */}
                <div className="space-y-3" id="doctor-credentials-list">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gold">Educational & Board Achievements</p>
                  {credentials.map((cred, idx) => {
                    const Icon = cred.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3" id={`cred-${idx}`}>
                        <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold mt-0.5 border border-gold/15 shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                          {cred.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Specializations list */}
                <div className="space-y-3" id="doctor-specializations-list">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gold">Core Specializations</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {specializations.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 font-light" id={`spec-${idx}`}>
                        <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Trigger */}
                <div className="pt-4 flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      const target = document.querySelector('#home');
                      if (target) {
                        const offset = 80;
                        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                        document.getElementById('name-input')?.focus();
                      }
                    }}
                    className="bg-gold hover:bg-gold/90 text-black font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded transition-all duration-300 transform hover:scale-[1.01] flex items-center gap-2 cursor-pointer"
                    id="doctor-book-trigger"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    Book Appointment With Dr. Priya
                  </button>
                </div>
              </>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
