import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle, CalendarCheck } from 'lucide-react';
import { FAQItem } from '../types';

const FAQS_DATA: FAQItem[] = [
  {
    question: 'Why choose Bonitaa Skin and Hair Care in Tiruppur?',
    answer: 'Bonitaa Skin and Hair Care is the premier choice in Tiruppur because we combine gold-standard medical diagnostics, US-FDA approved laser technologies, and highly qualified senior dermatologists under one luxury roof. Our treatment plans are 100% personalized, backed by a clinical track record of 12,000+ satisfied patients.'
  },
  {
    question: 'Is the doctor consultation really free?',
    answer: 'Yes, absolutely. For a limited time, we offer zero consultation fee (₹0) for new appointments. Your clinical evaluation, scalp analysis, or skin analysis is conducted by Dr. Priya or our senior specialists with no hidden medical charges.'
  },
  {
    question: 'How many sessions are required for hair treatments?',
    answer: 'Typically, hair restoration therapies like PRP or GFC require 4 to 6 sessions spaced 3 to 4 weeks apart to achieve optimal density. Early hair-loss stages show faster responses, while advanced stages are customized with a longer cumulative protocol.'
  },
  {
    question: 'Do PRP treatments hurt?',
    answer: 'PRP treatments involve micro-infusions which cause minimal discomfort. To ensure a 100% pain-free clinical experience, we apply a high-potency topical numbing cream to the scalp 40 minutes prior to the procedure.'
  },
  {
    question: 'What is the best treatment for active hair fall?',
    answer: 'For active hair fall, we start with a microscopic Trichoscopy scalp analysis. Based on whether it is Telogen Effluvium or Androgenetic Alopecia, we combine our advanced Growth Factor Concentrate (GFC) therapy, medical scalp infusions, and clinical nutritional protocols to stop hair fall within 15 to 30 days.'
  },
  {
    question: 'How long does acne treatment take to show results?',
    answer: 'Active acne begins to dry up and calm down within 1 to 2 sessions of our dermatologist-administered chemical peels or salicylic treatments (about 14 days). Complete acne resolution and skin remodeling usually take 4 to 8 weeks depending on systemic factors.'
  },
  {
    question: 'Is laser hair removal permanent and safe?',
    answer: 'Yes, laser hair removal using our US-FDA approved triple-wavelength cool-tip laser reduces hair density by 85% to 95% permanently. The procedure is extremely safe, comfortable, and has zero downtime, targeting only the hair melanin without heating surrounding skin.'
  },
  {
    question: 'What is the consultation process at Bonitaa?',
    answer: 'Our clinical process is highly professional: 1) You book a slot online. 2) You undergo a thorough 1-on-1 skin or digital scalp analysis with our senior dermatologist. 3) We identify the root condition. 4) We draft your custom treatment plan, timelines, and pricing options. 5) You start your clinical session.'
  },
  {
    question: 'Which skin treatment is best for face brightening and glow?',
    answer: 'Our Hydra Facial combined with luxury Glutathione/Vitamin C infusions is the absolute standard for immediate, red-carpet ready brightening. For long-term pigment corrections, we recommend Melas-peels or Q-Switched laser tonings.'
  },
  {
    question: 'How can I book an appointment?',
    answer: 'Booking is simple: you can fill out our lead form above the fold, call us directly at 090921 36969, or click the WhatsApp floating button to coordinate slots instantly with our patient coordinators.'
  },
  {
    question: 'Are your skin procedures safe for sensitive Indian skin types?',
    answer: 'Yes, our dermatologists specialize in Fitzpatrick Skin Types III to VI (typical Indian skin). All chemical peels, lasers, and active ingredients are scientifically chosen and concentration-regulated to prevent hyperpigmentation or irritation.'
  },
  {
    question: 'Is there any downtime after a chemical peel?',
    answer: 'Most of our peels are "lunchtime procedures" with zero downtime. You might experience minor flaking or redness for 24 to 48 hours, which is completely natural and easily managed with our clinical moisturizers and sunscreens.'
  },
  {
    question: 'What is the difference between PRP and GFC Hair Treatments?',
    answer: 'While both use your blood plasma, PRP (Platelet-Rich Plasma) extracts platelets which release growth factors after injection. GFC (Growth Factor Concentrate) activates platelets in a specialized tube beforehand, extracting only pure, highly concentrated, cell-free growth factors, offering faster results and less scalp inflammation.'
  },
  {
    question: 'Can laser hair removal be performed on facial hair?',
    answer: 'Yes, facial hair removal (upper lip, chin, sidelocks, or full beard shaping for men) is one of our most popular procedures. It utilizes micro-precise facial tips and cooling mechanisms to achieve smooth skin comfortably.'
  },
  {
    question: 'Do you offer treatments for deep acne scars and craters?',
    answer: 'Yes, we are scar remodeling specialists. We utilize advanced dermatological subcision, TCA cross, microneedling, and collagen booster serums to break fibrous scar bands and lift pitted craters back to skin level.'
  },
  {
    question: 'Where is the Bonitaa clinic located in Tiruppur?',
    answer: 'Our luxury clinic is centrally located at 51/31, J.G. Nagar, 60 Feet Road, Kumar Nagar 2nd Street, Tiruppur, Tamil Nadu 641602. It is easily accessible with ample private parking space.'
  }
];

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Inject FAQ Schema (JSON-LD) for SEO
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQS_DATA.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-json-ld-schema';
    script.innerHTML = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('faq-json-ld-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section id="faq" className="py-20 sm:py-24 bg-[#111111] text-white border-t border-b border-gold/10 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/30 rounded-full px-3 py-1 mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">Common Inquiries</span>
          </div>
          <h2 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-gray-400 text-sm sm:text-base mt-4 font-light leading-relaxed">
            Have questions about clinical hair growth or skin peel therapies? Explore certified answers below.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4" id="faq-accordion-list">
          {FAQS_DATA.map((item, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-800 rounded-lg overflow-hidden bg-black/40 transition-colors"
                id={`faq-item-${index}`}
              >
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <span className="font-sans font-semibold text-sm sm:text-base text-gray-100 hover:text-gold transition-colors duration-200">
                    {item.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gold transition-transform duration-300 shrink-0 ${
                    isExpanded ? 'rotate-180' : ''
                  }`} />
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-[500px] border-t border-gray-900/50' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 sm:p-6 text-gray-400 text-xs sm:text-sm leading-relaxed font-light bg-black/60">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner at the end of FAQ */}
        <div className="bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 border border-gold/25 p-8 rounded-lg text-center mt-16 shadow-lg">
          <h3 className="font-sans font-bold text-lg sm:text-xl text-white tracking-wide">
            Still Have Questions?
          </h3>
          <p className="text-xs text-gray-400 mt-2 max-w-lg mx-auto font-light leading-relaxed">
            Schedule your risk-free zero-consultation appointment and get answers directly from Dr. Priya Soundararajan.
          </p>
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
            className="bg-gold hover:bg-gold/90 text-black font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded transition-all duration-300 transform hover:scale-[1.01] mt-5 flex items-center gap-2 mx-auto cursor-pointer"
            id="faq-cta-btn"
          >
            <CalendarCheck className="w-4 h-4" />
            Book Free Consultation Now
          </button>
        </div>

      </div>
    </section>
  );
}
