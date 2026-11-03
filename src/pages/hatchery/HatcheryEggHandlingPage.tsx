import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { Product } from '../../data/mockProducts';
import { HatcherySubNav } from '../../components/molecules/HatcherySubNav';
import { SolutionHeroBanner } from '../../components/molecules/SolutionHeroBanner';
import { ContactSection } from '../../components/organisms/ContactSection';
import { ImagePlaceholder } from '../../components/atoms/ImagePlaceholder';
import { HATCHERY_IMAGES } from '../../data/hatcheryImages';

export interface HatcheryEggHandlingPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

export const HatcheryEggHandlingPage: React.FC<HatcheryEggHandlingPageProps> = ({
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
          { label: 'AUTOMATED EGG HANDLING & AI CANDLING' },
        ]}
        title="Automated Egg Handling & AI Candling"
        subtitle="Enables fast, gentle egg handling with AI identification, non-contact weighing, flexible grading, and remote diagnostics."
        backgroundImage="/images/hatchery/egg-handling-hero.jpg"
        imageAlt="Automated Egg Handling & AI Candling"
        ctaText="Request System Details"
        onCtaClick={scrollToContact}
      />

      {/* ── 2. STICKY SUB-NAV BAR ──────────────────────────────────── */}
      <HatcherySubNav activeTab="egg-handling" />

      {/* ── 3. SYSTEMS SHOWCASE ────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Egg Handling System */}
          <div className="bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                Egg Handling System
              </span>
              <span className="font-mono text-[11px] text-amber-600 font-bold">
                60,000 eggs/hour
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                Egg Handling System
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Enables fast, gentle egg handling with AI identification, non-contact weighing, flexible grading, and remote diagnostics.
              </p>
            </div>

            <div className="bg-[#0B192C] text-white p-4 rounded-[2px] border border-[#1E3E66]">
              <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                Handling Rate
              </span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono mt-1 block">
                60,000 eggs/hour
              </span>
            </div>

            {/* Main 3D System Overview Image Placeholder */}
            <div className="space-y-2">
              <ImagePlaceholder
                src={HATCHERY_IMAGES.eggHandling.systemOverview}
                alt="Egg Handling System"
                label="Egg Handling System"
                aspectRatio="wide"
                theme="light"
              />
            </div>

            {/* 5 Process Components */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-xs font-bold text-slate-700 uppercase tracking-widest block">
                System Callouts & Process Components:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  {
                    name: 'Egg Big-ends-up Positioning and Auto Traying',
                    image: HATCHERY_IMAGES.eggHandling.bigEndsUpPositioning,
                  },
                  {
                    name: 'Weighing and Grading',
                    image: HATCHERY_IMAGES.eggHandling.weighingAndGrading,
                  },
                  {
                    name: 'AI-based Egg Identification',
                    image: HATCHERY_IMAGES.eggHandling.aiIdentification,
                  },
                  {
                    name: 'Auto Egg Load Onto Trolley',
                    image: HATCHERY_IMAGES.eggHandling.autoLoadOntoTrolley,
                  },
                  {
                    name: 'Egg Automatic Loading Equipment',
                    image: HATCHERY_IMAGES.eggHandling.eggAutomaticLoading,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-slate-200 hover:border-amber-400/80 rounded-[2px] flex flex-col justify-between space-y-2.5 transition-colors"
                  >
                    {item.image && (
                      <ImagePlaceholder
                        src={item.image}
                        alt={item.name}
                        label={item.name}
                        aspectRatio="square"
                        theme="light"
                      />
                    )}
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-slate-800 leading-snug">{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Egg Candling & Transferring System */}
          <div className="bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                Egg Candling & Transferring System
              </span>
              <span className="font-mono text-[11px] text-amber-600 font-bold">
                50,000 – 70,000 egg position/hour
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                Egg Candling & Transferring System
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Enables fast, gentle egg handling with AI identification, non-contact weighing, flexible grading, and remote diagnostics.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-2">
              
              {/* Single Line Configuration */}
              <div className="bg-white border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-5 sm:p-6 space-y-5 flex flex-col justify-between transition-colors">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B192C]">
                      Single Line Configuration:
                    </span>
                    <span className="font-mono text-[10px] text-amber-600 font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-50 rounded-[2px]">
                      Single Line
                    </span>
                  </div>

                  <div className="bg-[#0B192C] text-white p-3.5 rounded-[2px] border border-[#1E3E66]">
                    <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                      Handling Rate
                    </span>
                    <span className="text-lg font-bold text-white font-mono mt-0.5 block">
                      50,000 egg position/hour
                    </span>
                  </div>

                  {/* Single Line Overview Image */}
                  <ImagePlaceholder
                    src={HATCHERY_IMAGES.eggHandling.singleLineOverview}
                    alt="Single Line Configuration"
                    label="Single Line Configuration"
                    aspectRatio="video"
                    theme="light"
                  />

                  <div className="space-y-2">
                    <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                      Components:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        { name: 'Robot Egg Transferring', img: HATCHERY_IMAGES.eggHandling.singleLineRobotTransfer },
                        { name: 'Setter Tray Washing Machine', img: HATCHERY_IMAGES.eggHandling.singleLineTrayWasher },
                        { name: 'Setter Tray Stacking', img: HATCHERY_IMAGES.eggHandling.singleLineTrayStacking },
                        { name: 'Setter Tray Transferring', img: HATCHERY_IMAGES.eggHandling.singleLineTrayTransfer },
                        { name: 'AI Visual Egg Candling', img: HATCHERY_IMAGES.eggHandling.singleLineAiCandling },
                        { name: 'Infertile Egg Removal', img: HATCHERY_IMAGES.eggHandling.singleLineInfertileRemoval },
                      ].map((comp, idx) => (
                        <div key={idx} className="p-2 bg-slate-50 border border-slate-200 rounded-[2px] space-y-1.5 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span className="text-[11px] font-medium text-slate-700 leading-tight block">{comp.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Double Line Configuration */}
              <div className="bg-white border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-5 sm:p-6 space-y-5 flex flex-col justify-between transition-colors">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B192C]">
                      Double Line Configuration:
                    </span>
                    <span className="font-mono text-[10px] text-amber-600 font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-50 rounded-[2px]">
                      Double Line
                    </span>
                  </div>

                  <div className="bg-[#0B192C] text-white p-3.5 rounded-[2px] border border-[#1E3E66]">
                    <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                      Handling Rate
                    </span>
                    <span className="text-lg font-bold text-white font-mono mt-0.5 block">
                      70,000 egg position/hour
                    </span>
                  </div>

                  {/* Double Line Overview Image */}
                  <ImagePlaceholder
                    src={HATCHERY_IMAGES.eggHandling.doubleLineOverview}
                    alt="Double Line Configuration"
                    label="Double Line Configuration"
                    aspectRatio="video"
                    theme="light"
                  />

                  <div className="space-y-2">
                    <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                      Components:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        { name: 'Setter Tray Transferring', img: HATCHERY_IMAGES.eggHandling.doubleLineTrayTransfer },
                        { name: 'Robot Egg Transferring', img: HATCHERY_IMAGES.eggHandling.doubleLineRobotTransfer },
                        { name: 'Setter Tray Washing and Stacking', img: HATCHERY_IMAGES.eggHandling.doubleLineTrayWashingStacking },
                        { name: 'AI Visual Egg Candling', img: HATCHERY_IMAGES.eggHandling.doubleLineAiCandling },
                        { name: 'Infertile Egg Removal', img: HATCHERY_IMAGES.eggHandling.doubleLineInfertileRemoval },
                      ].map((comp, idx) => (
                        <div key={idx} className="p-2 bg-slate-50 border border-slate-200 rounded-[2px] space-y-1.5 flex items-start gap-1.5">
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
