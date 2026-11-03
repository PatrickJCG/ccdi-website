import React, { useEffect } from 'react';
import { Boxes, Weight } from 'lucide-react';
import type { Product } from '../../data/mockProducts';
import { HatcherySubNav } from '../../components/molecules/HatcherySubNav';
import { SolutionHeroBanner } from '../../components/molecules/SolutionHeroBanner';
import { ContactSection } from '../../components/organisms/ContactSection';
import { ImagePlaceholder } from '../../components/atoms/ImagePlaceholder';
import { HATCHERY_IMAGES } from '../../data/hatcheryImages';

export interface HatcheryWasteDisposalPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

export const HatcheryWasteDisposalPage: React.FC<HatcheryWasteDisposalPageProps> = ({
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
          { label: 'WASTE DISPOSAL SYSTEM' },
        ]}
        title="Waste Disposal System"
        backgroundImage="/images/news/bulacan-hatchery-post.png"
        imageAlt="Waste Disposal System"
        ctaText="Request System Details"
        onCtaClick={scrollToContact}
      />

      {/* ── 2. STICKY SUB-NAV BAR ──────────────────────────────────── */}
      <HatcherySubNav activeTab="waste-disposal" />

      {/* ── 3. TECHNICAL SPECIFICATIONS SHOWCASE ───────────────────── */}
      <section className="relative py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              WASTE DISPOSAL SYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Waste Disposal System
            </h2>
          </div>

          <div className="bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                Waste Disposal System
              </span>
              <span className="font-mono text-[11px] text-amber-600 font-bold">
                7m³ / 5T
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6">
                <ImagePlaceholder
                  src={HATCHERY_IMAGES.wasteDisposal.siloSystem}
                  alt="Waste Disposal System"
                  label="Waste Disposal System"
                  aspectRatio="video"
                  theme="light"
                />
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Silo Capacity */}
                <div className="bg-[#0B192C] text-white border border-amber-400/50 rounded-[2px] p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1E3E66]">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                      Silo Capacity
                    </span>
                    <Boxes className="w-5 h-5 text-amber-400" />
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                      7m³
                    </div>
                  </div>
                </div>

                {/* Full Load Weight */}
                <div className="bg-[#0B192C] text-white border border-amber-400/50 rounded-[2px] p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1E3E66]">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                      Full Load Weight
                    </span>
                    <Weight className="w-5 h-5 text-amber-400" />
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                      5T
                    </div>
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
