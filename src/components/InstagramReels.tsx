import React, { useState, useRef } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, Maximize2, Grid, Calendar, X, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';

const InstagramIcon = FaInstagram as unknown as React.FC<{ className?: string }>;

interface ReelItem {
  id: string;
  reelId: string;
  url: string;
  title: string;
  category: string;
}

const INSTAGRAM_REELS: ReelItem[] = [
  {
    id: 'reel-1',
    reelId: 'DaWlxFqvXJ7',
    url: 'https://www.instagram.com/reel/DaWlxFqvXJ7/',
    title: 'Clinical Skin Rejuvenation & Glowing Skin Results',
    category: 'Skin Care'
  },
  {
    id: 'reel-2',
    reelId: 'DYZpfmhvDtG',
    url: 'https://www.instagram.com/reel/DYZpfmhvDtG/',
    title: 'Advanced Hair Density Growth Factor Session',
    category: 'Hair Care'
  },
  {
    id: 'reel-3',
    reelId: 'DVLiiYXEpdF',
    url: 'https://www.instagram.com/reel/DVLiiYXEpdF/',
    title: 'Acne Scar Remodeling & Smooth Texture Treatment',
    category: 'Scar Care'
  },
  {
    id: 'reel-4',
    reelId: 'DasgfFrtLsu',
    url: 'https://www.instagram.com/reel/DasgfFrtLsu/',
    title: 'Luxury Clinic Tour & Patient Experience at Tiruppur',
    category: 'Clinic Tour'
  },
  {
    id: 'reel-5',
    reelId: 'Dac5JpihM_z',
    url: 'https://www.instagram.com/reel/Dac5JpihM_z/',
    title: 'Laser Hair Reduction & Pigmentation Correction',
    category: 'Skin Care'
  },
  {
    id: 'reel-6',
    reelId: 'Da7EpJvAgPF',
    url: 'https://www.instagram.com/reel/Da7EpJvAgPF/',
    title: 'Expert Doctor Consultation & Customized Care',
    category: 'Consultation'
  }
];

interface InstagramReelsProps {
  onBookClick?: () => void;
}

export default function InstagramReels({ onBookClick }: InstagramReelsProps) {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [loadedIframes, setLoadedIframes] = useState<Record<string, boolean>>({});
  const [activeModalReelIndex, setActiveModalReelIndex] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Skin Care', 'Hair Care', 'Scar Care', 'Clinic Tour'];

  const filteredReels = activeTab === 'All' 
    ? INSTAGRAM_REELS 
    : INSTAGRAM_REELS.filter(r => r.category === activeTab);

  const handleIframeLoad = (reelId: string) => {
    setLoadedIframes(prev => ({ ...prev, [reelId]: true }));
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const openFullscreenPlayer = (index: number) => {
    setActiveModalReelIndex(index);
  };

  const closeFullscreenPlayer = () => {
    setActiveModalReelIndex(null);
  };

  const nextModalReel = () => {
    if (activeModalReelIndex !== null) {
      setActiveModalReelIndex((prev) => 
        prev !== null && prev < filteredReels.length - 1 ? prev + 1 : 0
      );
    }
  };

  const prevModalReel = () => {
    if (activeModalReelIndex !== null) {
      setActiveModalReelIndex((prev) => 
        prev !== null && prev > 0 ? prev - 1 : filteredReels.length - 1
      );
    }
  };

  return (
    <section id="instagram-reels" className="py-20 bg-[#0E0E0E] text-white border-t border-gold/15 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-widest mb-4">
            <InstagramIcon className="w-4 h-4 text-pink-400" />
            <span>Official Instagram Reels Gallery</span>
          </div>
          <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-white">
            Watch & Scroll Real Clinical Videos
          </h2>
          <p className="font-sans text-gray-400 text-sm sm:text-base mt-3 font-light leading-relaxed">
            Scroll through live clinical transformations, patient experiences, and treatment walkthroughs from <span className="text-gold font-medium">@bonitaa_tiruppur</span>.
          </p>
        </div>

        {/* Controls Row: Category Tabs + Layout Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-800/80">
          
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none" id="reels-category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === cat
                    ? 'bg-gold text-black shadow-lg shadow-gold/20'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-gray-800 hover:border-gold/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Mode Switcher + Scroll Nav Arrows */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {viewMode === 'carousel' && (
              <div className="flex items-center gap-1.5 bg-black/60 border border-gray-800 p-1 rounded-lg">
                <button
                  onClick={scrollLeft}
                  className="p-2 rounded hover:bg-gold/20 text-gray-300 hover:text-gold transition-colors cursor-pointer"
                  title="Scroll Left"
                  aria-label="Scroll Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-bold text-gray-400 px-1 uppercase tracking-wider hidden md:inline">
                  Scroll Reels
                </span>
                <button
                  onClick={scrollRight}
                  className="p-2 rounded hover:bg-gold/20 text-gray-300 hover:text-gold transition-colors cursor-pointer"
                  title="Scroll Right"
                  aria-label="Scroll Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-1 bg-black/60 border border-gray-800 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('carousel')}
                className={`px-2.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'carousel' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'
                }`}
                title="Horizontal Scroll Feed"
              >
                <ChevronRight className="w-3.5 h-3.5" />
                <span>Scroll Feed</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel / Scrollable View */}
        {viewMode === 'carousel' ? (
          <div className="relative group">
            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-gray-900 scroll-smooth"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {filteredReels.map((reel, index) => (
                <div
                  key={reel.id}
                  className="snap-center shrink-0 w-[290px] sm:w-[320px] bg-[#161616] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col hover:border-gold/40 transition-all duration-300"
                >
                  {/* Header Bar */}
                  <div className="p-3 bg-[#1a1a1a] border-b border-gray-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                        <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                          <InstagramIcon className="w-3.5 h-3.5 text-gold" />
                        </div>
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-white block leading-tight">
                          bonitaa_tiruppur
                        </span>
                        <span className="text-[9px] text-gray-400 block leading-tight font-light">
                          Tiruppur
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => openFullscreenPlayer(index)}
                      className="text-gray-400 hover:text-gold transition-colors p-1"
                      title="Expand Video Player"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Embedded Reel Iframe Box */}
                  <div className="relative w-full aspect-[9/16] bg-black overflow-hidden flex items-center justify-center">
                    {!loadedIframes[reel.id] && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-gray-400 p-4 text-center">
                        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin mb-2" />
                        <span className="text-[11px] text-gray-300 font-medium">Loading Reel...</span>
                      </div>
                    )}
                    <iframe
                      src={`https://www.instagram.com/reel/${reel.reelId}/embed/`}
                      title={reel.title}
                      className="w-full h-full border-0"
                      allowFullScreen
                      scrolling="no"
                      onLoad={() => handleIframeLoad(reel.id)}
                    />
                  </div>

                  {/* Footer Bar */}
                  <div className="p-3.5 bg-[#141414] border-t border-gray-800 flex flex-col justify-between flex-grow">
                    <h3 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                      {reel.title}
                    </h3>

                    <div className="mt-3 pt-2.5 border-t border-gray-800/80 flex items-center justify-between gap-2">
                      <a
                        href={reel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-pink-400 hover:text-pink-300 font-bold flex items-center gap-1"
                      >
                        <span>Instagram</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>

                      <button
                        onClick={() => openFullscreenPlayer(index)}
                        className="bg-gold/15 hover:bg-gold text-gold hover:text-black border border-gold/30 text-[10px] font-bold py-1 px-2.5 rounded uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Watch Full</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Grid View Mode */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="instagram-reels-grid">
            {filteredReels.map((reel, index) => (
              <div
                key={reel.id}
                className="bg-[#161616] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col hover:border-gold/40 transition-all duration-300 group"
              >
                {/* Header Bar */}
                <div className="p-3.5 bg-[#1a1a1a] border-b border-gray-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                        <InstagramIcon className="w-4 h-4 text-gold" />
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">
                        bonitaa_tiruppur
                      </span>
                      <span className="text-[10px] text-gray-400 block leading-tight font-light">
                        Tiruppur, Tamil Nadu
                      </span>
                    </div>
                  </div>
                  <span className="bg-gold/15 text-gold text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-gold/30">
                    {reel.category}
                  </span>
                </div>

                {/* Embedded Reel Box */}
                <div className="relative w-full aspect-[9/16] bg-black overflow-hidden flex items-center justify-center">
                  {!loadedIframes[reel.id] && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-gray-400 p-4 text-center">
                      <div className="w-10 h-10 rounded-full border-2 border-gold border-t-transparent animate-spin mb-3" />
                      <span className="text-xs text-gray-300 font-medium">Loading Instagram Reel...</span>
                    </div>
                  )}
                  <iframe
                    src={`https://www.instagram.com/reel/${reel.reelId}/embed/`}
                    title={reel.title}
                    className="w-full h-full border-0"
                    allowFullScreen
                    scrolling="no"
                    onLoad={() => handleIframeLoad(reel.id)}
                  />
                </div>

                {/* Title & Actions */}
                <div className="p-4 bg-[#141414] border-t border-gray-800 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                      {reel.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between gap-2">
                    <a
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-pink-400 hover:text-pink-300 font-bold flex items-center gap-1 transition-colors"
                    >
                      <span>View on Instagram</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => openFullscreenPlayer(index)}
                      className="bg-gold hover:bg-gold/90 text-black text-[10px] font-bold py-1.5 px-3 rounded uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Focus Mode</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Social CTA Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#181818] via-[#222222] to-[#181818] border border-gold/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5 shrink-0 shadow-lg">
              <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
                <InstagramIcon className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-sans font-bold text-base sm:text-lg text-white">
                Follow @bonitaa_tiruppur on Instagram
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-light mt-0.5">
                Join our 15,000+ local community for daily skin tips, live treatment videos & patient stories.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="https://www.instagram.com/bonitaa_tiruppur/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-widest py-3 px-5 rounded-lg text-center transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Follow Profile</span>
            </a>
            
            <button
              onClick={onBookClick}
              className="flex-1 md:flex-none bg-gold hover:bg-gold/90 text-black font-bold text-xs uppercase tracking-widest py-3 px-5 rounded-lg text-center transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>
          </div>
        </div>

      </div>

      {/* FULLSCREEN INSTAGRAM REEL SCROLL PLAYER MODAL */}
      {activeModalReelIndex !== null && filteredReels[activeModalReelIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in">
          
          {/* Close button */}
          <button
            onClick={closeFullscreenPlayer}
            className="absolute top-4 right-4 z-50 p-2.5 bg-gray-900/90 border border-gray-700 text-white rounded-full hover:bg-gold hover:text-black transition-colors"
            title="Close Reel Player"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div className="relative w-full max-w-md h-[90vh] bg-black border border-gold/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
            
            {/* Top Modal Header */}
            <div className="p-3 bg-gradient-to-b from-black via-black/80 to-transparent z-10 flex items-center justify-between border-b border-gray-800/60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                  <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                    <InstagramIcon className="w-4 h-4 text-gold" />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">bonitaa_tiruppur</span>
                  <span className="text-[10px] text-gold font-medium block">
                    Reel {activeModalReelIndex + 1} of {filteredReels.length}
                  </span>
                </div>
              </div>

              {/* Navigation Up / Down */}
              <div className="flex items-center gap-1 bg-white/10 rounded-full p-1 border border-white/20">
                <button
                  onClick={prevModalReel}
                  className="p-1 text-white hover:text-gold transition-colors"
                  title="Previous Video"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button
                  onClick={nextModalReel}
                  className="p-1 text-white hover:text-gold transition-colors"
                  title="Next Video"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video Player Box */}
            <div className="relative flex-grow bg-black flex items-center justify-center overflow-hidden">
              <iframe
                src={`https://www.instagram.com/reel/${filteredReels[activeModalReelIndex].reelId}/embed/`}
                title={filteredReels[activeModalReelIndex].title}
                className="w-full h-full border-0"
                allowFullScreen
                scrolling="no"
              />
            </div>

            {/* Bottom Modal Bar */}
            <div className="p-4 bg-gradient-to-t from-black via-black/95 to-transparent border-t border-gray-800 z-10">
              <h3 className="text-sm font-bold text-white leading-snug mb-3">
                {filteredReels[activeModalReelIndex].title}
              </h3>

              <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-800">
                <a
                  href={filteredReels[activeModalReelIndex].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2.5 px-3.5 rounded-lg transition-all flex items-center gap-1.5"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-400" />
                  <span>Open App</span>
                </a>

                {onBookClick ? (
                  <button
                    onClick={() => {
                      closeFullscreenPlayer();
                      onBookClick();
                    }}
                    className="flex-1 bg-gold hover:bg-gold/90 text-black text-xs font-bold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Consultation</span>
                  </button>
                ) : (
                  <a
                    href="tel:9092136969"
                    className="flex-1 bg-gold hover:bg-gold/90 text-black text-xs font-bold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider"
                  >
                    <span>Call Clinic</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
