import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { Product } from '../../data/mockProducts';
import { HatcherySubNav } from '../../components/molecules/HatcherySubNav';
import { SolutionHeroBanner } from '../../components/molecules/SolutionHeroBanner';
import { ContactSection } from '../../components/organisms/ContactSection';
import { ImagePlaceholder } from '../../components/atoms/ImagePlaceholder';
import { HATCHERY_IMAGES } from '../../data/hatcheryImages';

export interface HatcheryHvacPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

export const HatcheryHvacPage: React.FC<HatcheryHvacPageProps> = ({
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
          { label: 'HATCHERY HVAC SYSTEM' },
        ]}
        title="Hatchery HVAC System"
        subtitle="Integrates heat recovery, intelligent pumping, and precise process-water control for energy-efficient and reliable operation."
        backgroundImage="/images/broiler/climate-system.jpg"
        imageAlt="Hatchery HVAC System"
        ctaText="Request HVAC Specs"
        onCtaClick={scrollToContact}
      />

      {/* ── 2. STICKY SUB-NAV BAR ──────────────────────────────────── */}
      <HatcherySubNav activeTab="hvac" />

      {/* ── 3. HVAC SYSTEMS SHOWCASE ───────────────────────────────── */}
      <section className="relative py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* 1. Mechanical Room System */}
          <div className="bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                Mechanical Room System
              </span>
              <span className="font-mono text-[11px] text-amber-600 font-bold">
                HATCHERY HVAC SYSTEM
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                  Mechanical Room System
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Description: Integrates heat recovery, intelligent pumping, and precise process-water control for energy-efficient and reliable operation.
                </p>
              </div>

              <div className="lg:col-span-7">
                <ImagePlaceholder
                  src={HATCHERY_IMAGES.hvac.mechanicalRoomSystem}
                  alt="Mechanical Room System"
                  label="Mechanical Room System"
                  aspectRatio="video"
                  theme="light"
                />
              </div>
            </div>
          </div>

          {/* 2. Air Conditioning System (Includes System Equipment & 4 Operating Modes) */}
          <div className="bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-8 transition-all duration-200 shadow-xs hover:shadow-lg group">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                Air Conditioning System
              </span>
              <span className="font-mono text-[11px] text-amber-600 font-bold">
                Supports 4 Operating Modes
              </span>
            </div>

            <div className="space-y-3 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                Air Conditioning System
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Description: Intelligently links with incubation equipment to regulate fresh air, pressure, filtration, and airflow for stable, energy-efficient hatchery conditions.
              </p>
            </div>

            {/* Air Conditioning System Diagram */}
            <ImagePlaceholder
              src={HATCHERY_IMAGES.hvac.airConditioningController}
              alt="Air Conditioning System"
              label="Air Conditioning System"
              aspectRatio="wide"
              theme="light"
            />

            {/* System Equipment & Supports 4 Operating Modes inside Air Conditioning System */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
              
              {/* System Equipment */}
              <div className="lg:col-span-7 bg-[#07162A] text-white border border-[#102A43] rounded-[2px] p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="border-b border-[#1E3E66] pb-3">
                  <span className="font-mono text-xs text-amber-400 uppercase tracking-widest block font-bold">
                    AIR CONDITIONING SYSTEM
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                    System Equipment:
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Embryo Heat Recovery System', img: HATCHERY_IMAGES.hvac.embryoHeatRecovery },
                    { name: 'Fresh Air System', img: HATCHERY_IMAGES.hvac.freshAirSystem },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#0B192C] border border-[#1E3E66] hover:border-amber-400/80 rounded-[2px] space-y-2.5 flex flex-col justify-between transition-colors"
                    >
                      <ImagePlaceholder
                        src={item.img}
                        alt={item.name}
                        label={item.name}
                        aspectRatio="video"
                        theme="light"
                        objectFit="cover"
                      />
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-white leading-snug">{item.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { name: 'Air Supply Inverter', img: HATCHERY_IMAGES.hvac.airSupplyInverter },
                    { name: 'Humidifier', img: HATCHERY_IMAGES.hvac.humidifier },
                    { name: 'EC Fan', img: HATCHERY_IMAGES.hvac.ecFan },
                    { name: 'Humidification Solenoid Valve', img: HATCHERY_IMAGES.hvac.humidificationValve },
                    { name: 'Proportional Control Valve', img: HATCHERY_IMAGES.hvac.proportionalControlValve },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#0B192C] border border-[#1E3E66] hover:border-amber-400/80 rounded-[2px] flex items-center gap-2.5 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-xs font-semibold text-slate-200 leading-snug">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supports 4 Operating Modes */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-[2px] p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="border-b border-slate-200 pb-3">
                    <span className="font-mono text-xs text-amber-600 uppercase tracking-widest block font-bold">
                      AIR CONDITIONING SYSTEM
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0B192C] tracking-tight mt-1">
                      Supports 4 Operating Modes:
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Cooling',
                      'Heating',
                      'Constant Temperature Dehumidification',
                      'Ventilation',
                    ].map((mode, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] flex items-center justify-between transition-colors"
                      >
                        <span className="text-sm font-bold text-slate-900">{mode}</span>
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
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
