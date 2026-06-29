import React from 'react';
import { Star, CheckCircle, Video, Play, ExternalLink } from 'lucide-react';
import { Review } from '../types';

const TESTIMONIALS_DATA: Review[] = [
  {
    id: 'rev-1',
    name: 'Karthikeyan Ramasamy',
    date: '2 weeks ago',
    rating: 5,
    text: 'I was suffering from severe hair loss and bald patches for 2 years. After starting GFC Hair Treatment at Bonitaa Tiruppur, my hair fall has completely stopped and I can see visible new hair growth on my crown. Highly recommended!',
    treatment: 'GFC Hair Treatment',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'rev-2',
    name: 'Suhasini Krishnan',
    date: '3 weeks ago',
    rating: 5,
    text: 'Wonderful experience with Dr. Priya for my melasma and face pigmentation. She diagnosed my skin very carefully and recommended specific sessions. My skin is now very even, bright, and glowing. The zero consultation fee offer was also genuine!',
    treatment: 'Pigmentation Treatment',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'rev-3',
    name: 'Arun Kumar Sellamuthu',
    date: '1 month ago',
    rating: 5,
    text: 'Best clinic for acne scars in Tiruppur. I had very deep pitted scars since college. I did 4 sessions of scar remodeling and subcision here. The results are amazing. My skin feels so smooth and my confidence is back. Hygienic and clean rooms.',
    treatment: 'Scar Treatment',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
  }
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-20 sm:py-24 bg-white text-black scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest block mb-3">
            Patient Stories
          </span>
          <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-gray-900">
            Real Reviews, Real Outcomes
          </h2>
          <p className="font-sans text-gray-500 text-sm sm:text-base mt-4 font-light leading-relaxed">
            Discover verified reviews from patients who achieved healthy, beautiful transformations at our Tiruppur clinic.
          </p>
        </div>

        {/* Google Reviews Style Header Bar */}
        <div className="bg-gray-50 border border-gray-150 rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-12" id="google-reviews-trust-badge">
          <div className="flex items-center gap-4">
            {/* Google Icon Representation */}
            <div className="w-12 h-12 bg-white shadow border border-gray-200 rounded-full flex items-center justify-center font-bold text-2xl text-blue-600">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-sans font-bold text-lg text-gray-900">Google Rating</span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                  Verified Reviews
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="font-sans font-bold text-base text-gray-900">4.8</span>
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-gray-500 font-light">(842 Patient Reviews)</span>
              </div>
            </div>
          </div>

          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector('#home');
              if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                document.getElementById('name-input')?.focus();
              }
            }}
            className="bg-black hover:bg-black/90 text-white font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded transition-all duration-300 flex items-center gap-2 cursor-pointer border border-black shadow"
            id="leave-review-trigger"
          >
            Schedule Free Consult
          </a>
        </div>

        {/* Testimonials Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" id="testimonials-grid">
          {TESTIMONIALS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-gray-50 border border-gray-150 p-6 rounded-lg text-left shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
              id={`review-card-${rev.id}`}
            >
              <div>
                {/* Star rating and checkmark */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < rev.rating ? 'fill-current' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-gray-400 text-xs font-light">{rev.date}</span>
                </div>

                {/* Review Text */}
                <p className="font-sans text-gray-600 text-xs sm:text-sm leading-relaxed font-light mb-6">
                  "{rev.text}"
                </p>
              </div>

              {/* Patient Details */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200/50">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  loading="lazy"
                />
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold text-gray-900 leading-none">{rev.name}</p>
                    <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
                  </div>
                  <span className="text-[10px] bg-gold/10 text-gold font-bold px-2 py-0.5 rounded uppercase tracking-wider block w-fit mt-1">
                    {rev.treatment}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonial Placeholder Block */}
        <div className="max-w-4xl mx-auto" id="video-testimonial-section">
          <div className="text-center mb-8">
            <h3 className="font-sans font-bold text-lg sm:text-xl text-gray-900 flex items-center justify-center gap-2">
              <Video className="w-5 h-5 text-gold" />
              Watch Video Testimonials
            </h3>
            <p className="text-xs text-gray-500 mt-1">Listen to raw video records of our patients detailing their recoveries</p>
          </div>

          {/* Luxury Video Thumbnail Frame */}
          <div 
            className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-100 group cursor-pointer bg-black"
            onClick={() => {
              const target = document.querySelector('#home');
              if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                document.getElementById('name-input')?.focus();
              }
            }}
            id="video-placeholder-frame"
          >
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
              alt="Clinical Video Interview Backdrop"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-50 group-hover:scale-102 transition-all duration-500"
              loading="lazy"
            />
            {/* Absolute Luxury Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

            {/* Play Overlay Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold hover:bg-gold/90 text-black flex items-center justify-center shadow-2xl transition-all transform group-hover:scale-110 relative">
                {/* Animated surrounding ripples */}
                <div className="absolute inset-0 rounded-full bg-gold/30 animate-ping"></div>
                <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
              </div>
              <div className="text-center">
                <p className="font-sans font-bold text-sm sm:text-base tracking-wider uppercase text-white drop-shadow-md">
                  Mrs. Abirami - Scar Remodeling Testimonial
                </p>
                <p className="text-[10px] sm:text-xs text-gold font-medium mt-1 uppercase tracking-widest drop-shadow-md">
                  Duration: 3m 42s | Clinical Outcome Verified
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
