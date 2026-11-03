import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { Product } from '../../data/mockProducts';
import { HatcherySubNav } from '../../components/molecules/HatcherySubNav';
import { SolutionHeroBanner } from '../../components/molecules/SolutionHeroBanner';
import { ContactSection } from '../../components/organisms/ContactSection';
import { ImagePlaceholder } from '../../components/atoms/ImagePlaceholder';
import { HATCHERY_IMAGES } from '../../data/hatcheryImages';

export interface HatcheryIncubationPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

export const HatcheryIncubationPage: React.FC<HatcheryIncubationPageProps> = ({
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
          { label: 'INCUBATION SYSTEM' },
        ]}
        title="Incubation System"
        subtitle="Configurable incubation solutions for varying capacities, production programs, and hatchery requirements."
        backgroundImage="/images/news/bulacan-single-stage-setter.png"
        imageAlt="Incubation System"
        ctaText="Request Incubation Specs"
        onCtaClick={scrollToContact}
      />

      {/* ── 2. STICKY SUB-NAV BAR ──────────────────────────────────── */}
      <HatcherySubNav activeTab="incubation" />

      {/* ── 3. INCUBATION SYSTEMS SHOWCASE ─────────────────────────── */}
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
              INCUBATION SYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Incubation System
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Configurable incubation solutions for varying capacities, production programs, and hatchery requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* 1. Single-stage Large Box Type Incubation & Hatcher */}
            <div className="flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                    Single-stage Large Box Type Incubation
                  </span>
                  <span className="font-mono text-[11px] text-amber-600 font-bold">
                    30,240 to 120,960 eggs
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                  Single-stage Large Box Type Incubation
                </h3>

                {/* Image Placeholders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <ImagePlaceholder
                      src={HATCHERY_IMAGES.incubation.singleStageIncubation}
                      alt="Single-stage Large Box Type Incubation"
                      label="Single-stage Large Box Type Incubation"
                      aspectRatio="video"
                      theme="light"
                    />
                    <div className="bg-[#0B192C] text-white p-3 rounded-[2px] border border-[#1E3E66]">
                      <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                        Single-stage Large Box Type Incubation
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">
                        Capacity: 30,240 to 60,480 eggs
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <ImagePlaceholder
                      src={HATCHERY_IMAGES.incubation.singleStageHatcher}
                      alt="Single-stage Large Box Type Hatcher"
                      label="Single-stage Large Box Type Hatcher"
                      aspectRatio="video"
                      theme="light"
                    />
                    <div className="bg-[#0B192C] text-white p-3 rounded-[2px] border border-[#1E3E66]">
                      <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                        Single-stage Large Box Type Hatcher
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">
                        Capacity: 40,320 to 120,960 eggs
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                    KEY FEATURES
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>All-in/all-out incubation process</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Intelligent sensing, IoT connectivity, and equipment diagnostics</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Intelligent egg-turning detection</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Functions can include incubation, drying, egg storage, and embryo activation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Air Circulation Hatcher */}
            <div className="flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                    Air Circulation Hatcher
                  </span>
                  <span className="font-mono text-[11px] text-amber-600 font-bold">
                    Capacity: 15,120 eggs
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                  Air Circulation Hatcher
                </h3>

                <ImagePlaceholder
                  src={HATCHERY_IMAGES.incubation.airCirculationHatcher}
                  alt="Air Circulation Hatcher"
                  label="Air Circulation Hatcher"
                  aspectRatio="video"
                  theme="light"
                />

                <div className="bg-[#0B192C] text-white p-3.5 rounded-[2px] border border-[#1E3E66]">
                  <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    Air Circulation Hatcher
                  </span>
                  <span className="text-base sm:text-lg font-bold text-white mt-1 block">
                    Capacity: 15,120 eggs
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                    KEY FEATURES
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Multi-stage batch loading provides energy savings and simplified operation.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Pressure synergy technology improves healthy chick rate and shortens the hatch window.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Intelligent egg-turning detection monitors trolley status and identifies faults in real time.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Intelligent sensing, IoT connectivity, and data interaction support equipment control and diagnostics.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Circulating hatcher design provides strong ventilation and cooling for high-quality chicks.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Multi-Stage Tunnel Incubator */}
            <div className="flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                    Multi-Stage Tunnel Incubator
                  </span>
                  <span className="font-mono text-[11px] text-amber-600 font-bold">
                    Capacity: 90,720 eggs
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                  Multi-Stage Tunnel Incubator
                </h3>

                <ImagePlaceholder
                  src={HATCHERY_IMAGES.incubation.tunnelIncubator}
                  alt="Multi-Stage Tunnel Incubator"
                  label="Multi-Stage Tunnel Incubator"
                  aspectRatio="video"
                  theme="light"
                />

                <div className="bg-[#0B192C] text-white p-4 rounded-[2px] border border-[#1E3E66]">
                  <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    Multi-Stage Tunnel Incubator
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-white font-mono mt-1 block">
                    Capacity: 90,720 eggs
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Honor Series Incubator & Hatcher */}
            <div className="flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                    Honor 115200 Series Incubator
                  </span>
                  <span className="font-mono text-[11px] text-amber-600 font-bold">
                    19,200 to 115,200 eggs
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                  Honor 115200 Series Incubator & Honor19200 Series Hatcher
                </h3>

                {/* Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <ImagePlaceholder
                      src={HATCHERY_IMAGES.incubation.honorIncubator}
                      alt="Honor 115200 Series Incubator"
                      label="Honor 115200 Series Incubator"
                      aspectRatio="video"
                      theme="light"
                    />
                    <div className="bg-[#0B192C] text-white p-3 rounded-[2px] border border-[#1E3E66]">
                      <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                        Honor 115200 Series Incubator
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">
                        Capacity: 19,200 to 115,200 eggs
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <ImagePlaceholder
                      src={HATCHERY_IMAGES.incubation.honorHatcher}
                      alt="Honor19200 Series Hatcher"
                      label="Honor19200 Series Hatcher"
                      aspectRatio="video"
                      theme="light"
                    />
                    <div className="bg-[#0B192C] text-white p-3 rounded-[2px] border border-[#1E3E66]">
                      <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                        Honor19200 Series Hatcher
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">
                        Capacity: 19,200 to 38,400 eggs
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                    KEY FEATURES
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Supports single-stage or multi-stage incubation for consistent hatching performance.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Multi-functional operation supports incubation, drying, egg storage, and embryo activation.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Integrates CO2 control, UPS, VFD, water cooling, and egg surface temperature control.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Consistent egg-turning angle supports hatchability in large-capacity models.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>High-density tray options provide compatibility with mainstream international systems.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Intelligent sensing, IoT, and data interaction enable integrated control and diagnostics.</span>
                    </li>
                  </ul>
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
