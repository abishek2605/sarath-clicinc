import React, { useState, useRef, useEffect } from 'react';
import { Eye, Calendar, Sparkles } from 'lucide-react';
import Skeleton from './Skeleton';

interface BeforeAfterCase {
  id: string;
  title: string;
  treatmentName: string;
  details: string;
  sessions: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
}

const CASES_DATA: BeforeAfterCase[] = [
  {
    id: 'pigmentation',
    title: 'Advanced Melasma & Hyperpigmentation Clearance',
    treatmentName: 'Chemical Peels & Laser Rejuvenation',
    details: 'Clinical dermal peeling and advanced laser therapy targeting stubborn hyperpigmentation, deep melasma patches on the cheeks and nose, and sun damage. Restores a perfectly balanced skin tone.',
    sessions: '3-4 Sessions (Visible Clearance)',
    beforeImg: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    beforeLabel: 'Severe Melasma & Hyperpigmentation',
    afterLabel: '90%+ Pigment Clearance & Luminous Tone'
  },
  {
    id: 'hair-gfc',
    title: 'GFC Hair Growth & Crown Density Restoration',
    treatmentName: 'GFC Hair Therapy',
    details: 'Autologous Growth Factor Concentrate (GFC) therapy targeting severe male pattern baldness, crown hair thinning, and scalp follicle miniaturization. Stimulates dormant root activity for thick growth.',
    sessions: '5 Sessions (Dense Volumized Growth)',
    beforeImg: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1620122303020-43ec4b6cf7f8?auto=format&fit=crop&w=800&q=80',
    beforeLabel: 'Severe Crown Baldness & Thinning',
    afterLabel: 'Thick, Dense & Healthy Full Coverage'
  },
  {
    id: 'warts',
    title: 'Warts & Mole Clinical Removal',
    treatmentName: 'Warts & Mole Treatment',
    details: 'Precise clinical electrocautery and RF micro-precision removals for facial warts and benign moles. Fast, highly safe, virtually painless, and structured to prevent scarring.',
    sessions: '1 Session (Instant Result)',
    beforeImg: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    beforeLabel: 'Multiple Facial Warts & Moles',
    afterLabel: '100% Clear, Smooth & Flawless Skin'
  },
  {
    id: 'acne-scars',
    title: 'Deep Acne Scar Subcision & Microneedling',
    treatmentName: 'Acne Scar Remodeling',
    details: 'Clinical dermal remodeling for deep, rolling, and boxed acne scars. Combines mechanical subcision of tethered scars with collagen induction therapy for a beautifully smooth surface.',
    sessions: '4 Sessions (Deep Remodeling)',
    beforeImg: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80',
    beforeLabel: 'Pitted Acne Scars & Rough Texture',
    afterLabel: 'Smooth, Regenerated Skin Texture'
  }
];

export default function BeforeAfter() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const [afterLoaded, setAfterLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = CASES_DATA[activeCaseIndex];

  // Reset loaded states when activeCaseIndex changes
  useEffect(() => {
    setBeforeLoaded(false);
    setAfterLoaded(false);
    setIsTransitioning(true);
  }, [activeCaseIndex]);

  // Minimum transition shimmer duration for perceived smooth load
  useEffect(() => {
    if (beforeLoaded && afterLoaded) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [beforeLoaded, afterLoaded]);

  // Handle slider movement calculations
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleStartDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    if ('touches' in e) {
      handleMove(e.touches[0].clientX);
    } else {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="before-after" className="py-20 sm:py-24 bg-white text-black scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest block mb-3">
            Real Transformations
          </span>
          <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-gray-900">
            Dermal & Trichology Evidence
          </h2>
          <p className="font-sans text-gray-500 text-sm sm:text-base mt-4 font-light leading-relaxed">
            Drag the divider to view raw, unedited clinical comparisons demonstrating our patient progress and recovery quality.
          </p>
        </div>

        {/* Case Toggle Buttons */}
        {CASES_DATA.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12" id="before-after-selector">
            {CASES_DATA.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveCaseIndex(index);
                  setSliderPosition(50); // reset position
                }}
                className={`px-5 py-2.5 rounded text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer ${
                  activeCaseIndex === index
                    ? 'bg-black text-white shadow-md shadow-black/10 border border-black'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
                id={`case-btn-${item.id}`}
              >
                {item.title.split(' Recovery')[0].split(' Restoration')[0]}
              </button>
            ))}
          </div>
        )}

        {/* Comparison Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Case Details Card Left */}
          <div className="lg:col-span-4 text-left space-y-6" id="case-details-card">
            {isTransitioning ? (
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-8 w-full mt-4" />
                  <Skeleton className="h-6 w-3/4 mt-2" />
                </div>
                
                <div className="space-y-2">
                  <Skeleton variant="text" className="h-4 w-full" />
                  <Skeleton variant="text" className="h-4 w-5/6" />
                  <Skeleton variant="text" className="h-4 w-2/3" />
                </div>

                <div className="bg-gray-50 border border-gray-100 p-5 rounded-lg space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>

                <Skeleton className="h-12 w-full pt-2" />
              </div>
            ) : (
              <>
                <div>
                  <span className="text-[10px] bg-gold/10 border border-gold/30 text-gold rounded font-bold px-3 py-1 uppercase tracking-widest">
                    Verified Progress Case
                  </span>
                  <h3 className="font-sans font-bold text-xl sm:text-2xl text-gray-900 mt-4 leading-tight">
                    {activeCase.title}
                  </h3>
                </div>
                
                <p className="font-sans text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                  {activeCase.details}
                </p>

                <div className="bg-gray-50 border border-gray-100 p-5 rounded-lg space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-gray-200 pb-2.5">
                    <span className="text-gray-500 uppercase tracking-wider font-semibold">Treatment</span>
                    <span className="text-gray-900 font-bold">{activeCase.treatmentName}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs border-b border-gray-200 pb-2.5">
                    <span className="text-gray-500 uppercase tracking-wider font-semibold">Timeline</span>
                    <span className="text-gray-900 font-bold">{activeCase.sessions}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 uppercase tracking-wider font-semibold">Diagnosis</span>
                    <span className="text-red-600 font-bold">{activeCase.beforeLabel.split(' & ')[0]}</span>
                  </div>
                </div>

                <div className="pt-2">
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
                    className="w-full bg-black hover:bg-black/90 text-white font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                    id="case-book-trigger"
                  >
                    Book Similar Treatment
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Drag Slider Box Right */}
          <div className="lg:col-span-8 flex flex-col items-center" id="slider-box">
            <div 
              ref={containerRef}
              onMouseDown={handleStartDrag}
              onTouchStart={handleStartDrag}
              className="relative w-full aspect-[4/3] max-w-2xl rounded-lg overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 select-none cursor-ew-resize"
              id="compare-slider-container"
            >
              {/* After Image (Full Background) */}
              <img
                src={activeCase.afterImg}
                alt="Clinical Progress After treatment"
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
                loading="lazy"
                onLoad={() => setAfterLoaded(true)}
              />
              {!isTransitioning && (
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm border border-gold/30 text-gold text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded pointer-events-none shadow-md">
                  After: {activeCase.afterLabel}
                </div>
              )}

              {/* Before Image (Left Clipping Overlay) */}
              <div 
                className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-300 ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeCase.beforeImg}
                  alt="Clinical Progress Before treatment"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: containerRef.current?.getBoundingClientRect()?.width || '100%' }}
                  loading="lazy"
                  onLoad={() => setBeforeLoaded(true)}
                />
                {!isTransitioning && (
                  <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-sm border border-gray-700 text-gray-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded shadow-md whitespace-nowrap">
                    Before: {activeCase.beforeLabel}
                  </div>
                )}
              </div>

              {/* Sliding Bar Divider */}
              {!isTransitioning && (
                <div 
                  className="absolute top-0 bottom-0 w-[3px] bg-gold shadow-lg cursor-ew-resize pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  {/* Visual Handle Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gold border-2 border-white flex items-center justify-center shadow-2xl pointer-events-auto">
                    <Eye className="w-4 h-4 text-black animate-pulse" />
                  </div>
                </div>
              )}

              {/* Shimmering Skeleton Loader Overlay */}
              {isTransitioning && (
                <Skeleton className="absolute inset-0 flex flex-col justify-between p-6 rounded-lg !animate-none bg-gray-100">
                  {/* Top shimmer details */}
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-4 w-28 bg-gray-200" />
                    <Skeleton className="h-4 w-16 bg-gray-200" />
                  </div>
                  
                  {/* Center slider handle icon simulation */}
                  <div className="flex justify-center items-center">
                    <Skeleton variant="circle" className="w-10 h-10 bg-gray-200 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-gray-400" />
                    </Skeleton>
                  </div>

                  {/* Bottom labels simulation */}
                  <div className="flex justify-between items-end">
                    <Skeleton className="h-8 w-1/3 bg-gray-200" />
                    <Skeleton className="h-8 w-1/3 bg-gray-200" />
                  </div>
                </Skeleton>
              )}
            </div>

            <p className="text-xs text-gray-400 mt-4 flex items-center gap-1.5 leading-none">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-bounce" />
              Use your finger or mouse to slide back and forth
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
