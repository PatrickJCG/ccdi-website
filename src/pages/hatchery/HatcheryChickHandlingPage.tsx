import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { Product } from '../../data/mockProducts';
import { HatcherySubNav } from '../../components/molecules/HatcherySubNav';
import { SolutionHeroBanner } from '../../components/molecules/SolutionHeroBanner';
import { ContactSection } from '../../components/organisms/ContactSection';
import { ImagePlaceholder } from '../../components/atoms/ImagePlaceholder';
import { HATCHERY_IMAGES } from '../../data/hatcheryImages';

export interface HatcheryChickHandlingPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

export const HatcheryChickHandlingPage: React.FC<HatcheryChickHandlingPageProps> = ({
  inquiryItems,
  onRemoveInquiryItem,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const offset = 72;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      window.scrollTo({ top: elementRect - bodyRect - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans text-left min-h-screen">
      {/* ── 1. HERO BANNER ────────────────────────────────────────── */}
      <SolutionHeroBanner
        breadcrumbs={[
          { label: 'HOME', path: '/' },
          { label: 'OUR SOLUTIONS', path: '/solutions' },
          { label: 'INTEGRATED HATCHERY SOLUTION', path: '/solutions/hatchery' },
          { label: 'AUTOMATED CHICK HANDLING SYSTEM' },
        ]}
        title="Automated Chick Handling System"
        subtitle="Improves hatchery efficiency through automated chick handling, basket management, and waste control."
        backgroundImage="/images/news/bulacan-hatcher.jpg"
        imageAlt="Automated Chick Handling System"
        ctaText="Request System Details"
        onCtaClick={scrollToContact}
      />

      {/* ── 2. STICKY SUB-NAV BAR ──────────────────────────────────── */}
      <HatcherySubNav activeTab="chick-handling" />

      {/* ── 3. SYSTEMS SHOWCASE ────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              DAY-OLD CHICK HANDLING SYSTEMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Day-old Chick Handling Systems
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Improves hatchery efficiency through automated chick handling, basket management, and waste control.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* For White Feather Broiler */}
            <div className="flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                    For White Feather Broiler
                  </span>
                  <span className="font-mono text-[11px] text-amber-600 font-bold">
                    70,000 egg position/hour
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                  For White Feather Broiler:
                </h3>

                <div className="bg-[#0B192C] text-white p-4 rounded-[2px] border border-[#1E3E66]">
                  <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    Handling Rate
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-white font-mono mt-1 block">
                    70,000 egg position/hour
                  </span>
                </div>

                {/* Broiler 3D Line Diagram */}
                <ImagePlaceholder
                  src={HATCHERY_IMAGES.chickHandling.broilerLineOverview}
                  alt="For White Feather Broiler"
                  label="For White Feather Broiler"
                  aspectRatio="video"
                  theme="light"
                />

                <div className="space-y-3 pt-2">
                  <span className="font-mono text-xs font-bold text-slate-700 uppercase tracking-widest block">
                    Components:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { name: 'Chick Basket Destacking Equipment', img: HATCHERY_IMAGES.chickHandling.broilerBasketDestacking },
                      { name: 'Chick Basket Stacking Equipment', img: HATCHERY_IMAGES.chickHandling.broilerBasketStacking },
                      { name: 'Linear Rotary Immunization Platform', img: HATCHERY_IMAGES.chickHandling.broilerImmunizationPlatform },
                      { name: 'Identification Carousel', img: HATCHERY_IMAGES.chickHandling.broilerIdentificationCarousel },
                      { name: 'Hatcher Basket Stacking', img: HATCHERY_IMAGES.chickHandling.broilerHatcherBasketStacking },
                      { name: 'Cleaned Basket Rolling Over', img: HATCHERY_IMAGES.chickHandling.broilerBasketRollingOver },
                      { name: 'Setter Tray Transferring', img: HATCHERY_IMAGES.chickHandling.broilerSetterTrayTransfer },
                    ].map((comp, idx) => (
                      <div key={idx} className="p-2 bg-white border border-slate-200 rounded-[2px] flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-[11px] font-medium text-slate-700 leading-tight block">{comp.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* For Layer */}
            <div className="flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                    For Layer
                  </span>
                  <span className="font-mono text-[11px] text-amber-600 font-bold">
                    70,000 egg position/hour
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                  For Layer:
                </h3>

                <div className="bg-[#0B192C] text-white p-4 rounded-[2px] border border-[#1E3E66]">
                  <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    Handling Rate
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-white font-mono mt-1 block">
                    70,000 egg position/hour
                  </span>
                </div>

                {/* Layer 3D Line Diagram */}
                <ImagePlaceholder
                  src={HATCHERY_IMAGES.chickHandling.layerLineOverview}
                  alt="For Layer"
                  label="For Layer"
                  aspectRatio="video"
                  theme="light"
                />

                <div className="space-y-3 pt-2">
                  <span className="font-mono text-xs font-bold text-slate-700 uppercase tracking-widest block">
                    Components:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { name: 'Cleaned Basket Rolling Over', img: HATCHERY_IMAGES.chickHandling.layerBasketRollingOver },
                      { name: 'Hatcher Basket Destacking', img: HATCHERY_IMAGES.chickHandling.layerHatcherBasketDestacking },
                      { name: 'Manual Chick Pickup Bench', img: HATCHERY_IMAGES.chickHandling.layerManualPickupBench },
                      { name: 'Weak Chick Selection Bench', img: HATCHERY_IMAGES.chickHandling.layerWeakChickSelection },
                      { name: 'Hatcher Basket Stacking', img: HATCHERY_IMAGES.chickHandling.layerHatcherBasketStacking },
                      { name: 'Hatcher Basket Washer', img: HATCHERY_IMAGES.chickHandling.layerHatcherBasketWasher },
                      { name: 'Hatcher Basket Rolling Over & Chick and Shell Separation', img: HATCHERY_IMAGES.chickHandling.layerChickShellSeparation },
                    ].map((comp, idx) => (
                      <div key={idx} className="p-2 bg-white border border-slate-200 rounded-[2px] flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-[11px] font-medium text-slate-700 leading-tight block">{comp.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. CONTACT SECTION ────────────────────────────────────── */}
      <ContactSection
        inquiryItems={inquiryItems}
        onRemoveInquiryItem={onRemoveInquiryItem}
      />
    </div>
  );
};
