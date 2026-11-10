import React, { useEffect } from 'react';
import {
  CheckCircle2,
  Cpu,
  ArrowRight,
  Snowflake,
  Droplets,
  Fan,
} from 'lucide-react';
import type { Product } from '../../data/mockProducts';
import { SolutionSubNav } from '../../components/molecules/SolutionSubNav';
import { SolutionHeroBanner } from '../../components/molecules/SolutionHeroBanner';
import { SolutionEquipmentCard } from '../../components/molecules/SolutionEquipmentCard';
import { ContactSection } from '../../components/organisms/ContactSection';
import { CategoryAccessoriesCatalog } from '../../components/organisms/CategoryAccessoriesCatalog';
import { AfterSalesSection } from '../../components/organisms/AfterSalesSection';
import { AddToInquiryButton } from '../../components/atoms/AddToInquiryButton';
import { ImagePlaceholder } from '../../components/atoms/ImagePlaceholder';
import { HATCHERY_IMAGES } from '../../data/hatcheryImages';
import { HATCHERY_PRODUCTS_MAP } from '../../data/hatcheryProducts';
import { AFTER_SALES_DATA } from '../../data/afterSalesData';

export interface HatcheryPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

// ── 1. Integrated Hatchery Model (15 Zones) ──────────────────────────────────
const BLUEPRINT_ROOMS = [
  { id: '1', name: 'Chick Basket Washing Room', zone: 'Sanitation' },
  { id: '2', name: 'Chick Basket Storage Room', zone: 'Sanitation' },
  { id: '3', name: 'Chick Handling Room', zone: 'Processing' },
  { id: '4', name: 'Hatcher Basket/Trolley Wash Room', zone: 'Sanitation' },
  { id: '5', name: 'Hatcher Basket/Trolley Storage Room', zone: 'Sanitation' },
  { id: '6', name: 'Hatcher Room', zone: 'Hatching' },
  { id: '7', name: 'Automatic Candling & Transferring', zone: 'Automation' },
  { id: '8', name: 'Setter Room', zone: 'Incubation' },
  { id: '9', name: 'Setter Trolley and Tray Washing Room', zone: 'Sanitation' },
  { id: '10', name: 'Setter Trolley and Tray Room', zone: 'Incubation' },
  { id: '11', name: 'Information Center', zone: 'Operations' },
  { id: '12', name: 'HVAC Room', zone: 'Utilities' },
  { id: '13', name: 'Egg Storage Room', zone: 'Receiving' },
  { id: '14', name: 'Fumigation Room', zone: 'Receiving' },
  { id: '15', name: 'Egg Handling Room', zone: 'Receiving' },
];

interface HatcheryGroupSubCardProps {
  productId: string;
  title: string;
  capacityBadge: string;
  imageSrc: string;
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
}

const HatcheryGroupSubCard: React.FC<HatcheryGroupSubCardProps> = React.memo(({
  productId,
  title,
  capacityBadge,
  imageSrc,
  inquiryItems,
  onToggleInquiry,
}) => (
  <SolutionEquipmentCard
    product={HATCHERY_PRODUCTS_MAP[productId]}
    title={title}
    badge={capacityBadge}
    imageUrl={imageSrc}
    inquiryItems={inquiryItems}
    onToggleInquiry={onToggleInquiry}
  />
));
HatcheryGroupSubCard.displayName = 'HatcheryGroupSubCard';

const KeyFeaturesList: React.FC<{ features: string[] }> = React.memo(({ features }) => (
  <div className="space-y-2 pt-3 pb-2 border-t border-slate-200">
    <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
      KEY FEATURES
    </span>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <span>{feature}</span>
        </div>
      ))}
    </div>
  </div>
));
KeyFeaturesList.displayName = 'KeyFeaturesList';

export const HatcheryPage: React.FC<HatcheryPageProps> = ({
  inquiryItems,
  onToggleInquiry,
  onRemoveInquiryItem,
}) => {
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
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

      {/* ── 1. HERO BANNER ─────────────────────────────────────────── */}
      <SolutionHeroBanner
        breadcrumbs={[
          { label: 'HOME', path: '/' },
          { label: 'OUR SOLUTIONS', path: '/solutions' },
          { label: 'INTEGRATED HATCHERY SOLUTION' },
        ]}
        title="Integrated Hatchery Solution"
        subtitle="CCDI brings together incubation, egg handling and AI candling, chick handling, hatchery HVAC, and digital management in one coordinated operation."
        backgroundImage="/images/hatchery/hatchery-hero.jpg"
        imageAlt="CCDI Hatchery Solution"
        ctaText="Request Hatchery Consultation"
        onCtaClick={scrollToContact}
      />

      {/* ── 2. STICKY SUB-NAV BAR (IN-PAGE HYPERLINKS) ─────────────── */}
      <SolutionSubNav category="hatchery" />

      {/* ── 3. OVERVIEW: BENCHMARK & BLUEPRINT (ID="overview") ─────── */}
      <div id="overview">
        {/* Capability Benchmark: Honor 115200 Spotlight */}
        <section className="relative py-14 sm:py-20 bg-[#07162A] text-white border-b border-[#102A43] overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0B192C] border-2 border-amber-400/40 rounded-[2px] p-6 sm:p-10 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5" />
                        CAPABILITY BENCHMARK &bull; FEATURED INCUBATOR SPOTLIGHT
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                      Honor 115200 Series Incubator
                    </h2>
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-amber-400/10 border border-amber-400/30 rounded-[2px]">
                      <span className="font-mono text-xs uppercase tracking-wider text-slate-300">Capacity:</span>
                      <span className="font-mono text-sm font-normal text-amber-400">Up to 115,200 eggs</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider block border-b border-[#1E3E66] pb-2">
                      System Highlights & Smart Diagnostics
                    </span>
                    <ul className="space-y-2.5">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-200">
                          <strong className="text-white font-medium">Incubation options:</strong> Single-stage or multi-stage
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-200">
                          <strong className="text-white font-medium">Integrated controls:</strong> CO₂, UPS, VFD, and water cooling
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-200">
                          <strong className="text-white font-medium">Temperature control:</strong> Egg-surface temperature control
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-200">
                          <strong className="text-white font-medium">Smart monitoring:</strong> Intelligent sensing, IoT connectivity, and equipment diagnostics
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {HATCHERY_PRODUCTS_MAP['ht-honor'] && (
                      <AddToInquiryButton
                        product={HATCHERY_PRODUCTS_MAP['ht-honor']}
                        inquiryItems={inquiryItems}
                        onToggleInquiry={onToggleInquiry}
                        label="Add to Inquiry"
                      />
                    )}
                    <a
                      href="#incubation"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#07162A] hover:bg-[#102A43] text-white border border-[#1E3E66] hover:border-amber-400 font-medium font-sans text-xs uppercase tracking-wider rounded-[2px] transition-colors"
                    >
                      <span>Explore Hatchery Equipment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-[#07162A] border border-[#1E3E66] rounded-[2px] p-4 group overflow-hidden">
                    <ImagePlaceholder
                      src={HATCHERY_IMAGES.incubation.honorIncubator}
                      alt="Honor 115200 Series Incubator"
                      label="Honor 115200 Series Incubator"
                      aspectRatio="video"
                      theme="dark"
                      objectFit="contain"
                    />
                    <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-400 border-t border-[#1E3E66] pt-2">
                      <span className="text-slate-300">Flagship High-Volume Incubator</span>
                      <span className="text-amber-400 font-normal">115,200 Eggs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 15-Zone Integrated Hatchery Model Blueprint */}
        <section className="relative py-16 sm:py-24 bg-slate-50 border-b border-slate-200 overflow-hidden">
          <img
            src="/images/accents/card-corner-accent.png"
            alt=""
            className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
                FACILITY BLUEPRINT LAYOUT
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
                Integrated Hatchery Model
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                CCDI brings together incubation, egg handling and AI candling, chick handling, hatchery HVAC, and digital management in one coordinated operation across 15 biosecure facility zones.
              </p>
            </div>

            {/* 3D Facility Blueprint Diagram */}
            <div className="bg-white border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-4 sm:p-6 shadow-xs transition-all">
              <ImagePlaceholder
                src={HATCHERY_IMAGES.blueprint}
                alt="Integrated Hatchery Model 15-Zone Blueprint"
                label="15-Zone Integrated Hatchery Model Blueprint Layout"
                aspectRatio="wide"
                theme="light"
                objectFit="contain"
              />
            </div>

            {/* Blueprint Layout Grid */}
            <div className="bg-[#07162A] border border-[#102A43] rounded-[2px] p-6 sm:p-8 text-white shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#1E3E66]">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                  Integrated Hatchery Model Zones
                </span>
                <span className="font-mono text-[11px] text-slate-400 font-normal">
                  15 Biosecure Rooms
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {BLUEPRINT_ROOMS.map((room, idx) => (
                  <div
                    key={room.id}
                    className="bg-[#0B192C] border border-[#1E3E66] p-4 rounded-[2px] flex items-center gap-3 hover:border-amber-400/80 transition-colors group"
                  >
                    <span className="w-7 h-7 rounded-[2px] bg-[#07162A] border border-[#1E3E66] font-mono text-xs font-bold text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium text-white group-hover:text-amber-400 transition-colors">
                      {room.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── 4. CONSOLIDATED PRODUCTS: INCUBATION (ID="incubation") ──── */}
      <section id="incubation" className="relative py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              INCUBATION SYSTEMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Incubation Systems
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Configurable incubation solutions for varying capacities, production programs, and hatchery requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

            {/* Grouped Section: Single-stage Large Box Type Incubation & Hatcher */}
            <div className="lg:col-span-2 flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg">
              <div className="space-y-6">
                {/* Header & Key Features */}
                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-normal text-[#0B192C] tracking-tight">
                    Single-stage Large Box Type Incubation & Hatcher
                  </h3>

                  <KeyFeaturesList
                    features={[
                      'All-in/all-out batch incubation process',
                      'Intelligent sensing, IoT connectivity, and equipment diagnostics',
                      'Intelligent egg-turning detection monitors trolley status in real time',
                      'Functions can include incubation, drying, egg storage, and embryo thermal activation',
                    ]}
                  />
                </div>

                {/* Individual Machine Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <HatcheryGroupSubCard
                    productId="ht-single-box"
                    title="Single-stage Large Box Type Incubation"
                    capacityBadge="Capacity: 30,240 to 60,480 eggs"
                    imageSrc={HATCHERY_IMAGES.incubation.singleStageIncubation}
                    inquiryItems={inquiryItems}
                    onToggleInquiry={onToggleInquiry}
                  />
                  <HatcheryGroupSubCard
                    productId="ht-single-hatcher"
                    title="Single-stage Large Box Type Hatcher"
                    capacityBadge="Capacity: 40,320 to 120,960 eggs"
                    imageSrc={HATCHERY_IMAGES.incubation.singleStageHatcher}
                    inquiryItems={inquiryItems}
                    onToggleInquiry={onToggleInquiry}
                  />
                </div>
              </div>
            </div>

            {/* Grouped Section: Air Circulation Hatcher & Multi-Stage Tunnel Incubator */}
            <div className="lg:col-span-2 flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg">
              <div className="space-y-6">
                {/* Header & Key Features */}
                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-normal text-[#0B192C] tracking-tight">
                    Air Circulation Hatcher & Multi-Stage Tunnel Incubator
                  </h3>

                  <KeyFeaturesList
                    features={[
                      'Multi-stage progressive batch loading provides continuous heat transfer and energy savings',
                      'Pressure synergy technology improves healthy chick rate and shortens the hatch window',
                      'Optimized air tunnel distribution ensures uniform temperature and CO₂ gradients',
                      'Intelligent egg-turning detection monitors trolley status and identifies faults in real time',
                      'Intelligent sensing, IoT connectivity, and remote equipment diagnostics',
                      'Heavy-duty insulated panel walls with biosecure smooth interior surfaces',
                    ]}
                  />
                </div>

                {/* Individual Machine Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <HatcheryGroupSubCard
                    productId="ht-air-circ"
                    title="Air Circulation Hatcher"
                    capacityBadge="Capacity: 15,120 eggs"
                    imageSrc={HATCHERY_IMAGES.incubation.airCirculationHatcher}
                    inquiryItems={inquiryItems}
                    onToggleInquiry={onToggleInquiry}
                  />
                  <HatcheryGroupSubCard
                    productId="ht-tunnel"
                    title="Multi-Stage Tunnel Incubator"
                    capacityBadge="Capacity: 90,720 eggs"
                    imageSrc={HATCHERY_IMAGES.incubation.tunnelIncubator}
                    inquiryItems={inquiryItems}
                    onToggleInquiry={onToggleInquiry}
                  />
                </div>
              </div>
            </div>

            {/* Grouped Section: Honor 115200 Series Incubator & Honor 19200 Series Hatcher */}
            <div className="lg:col-span-2 flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg">
              <div className="space-y-6">
                {/* Header & Key Features */}
                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-normal text-[#0B192C] tracking-tight">
                    Honor 115200 Series Incubator & Honor 19200 Series Hatcher
                  </h3>

                  <KeyFeaturesList
                    features={[
                      'Supports single-stage or multi-stage incubation for consistent performance',
                      'Multi-functional operation: incubation, drying, egg storage, embryo activation',
                      'Integrates CO₂ control, UPS, VFD, water cooling, and egg surface sensing',
                      'Consistent egg-turning angle supports hatchability in large-capacity models',
                      'High-density tray options provide compatibility with international systems',
                      'Intelligent sensing, IoT, and data interaction enable integrated diagnostics',
                    ]}
                  />
                </div>

                {/* Individual Machine Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <HatcheryGroupSubCard
                    productId="ht-honor"
                    title="Honor 115200 Series Incubator"
                    capacityBadge="Capacity: 115,200 eggs"
                    imageSrc={HATCHERY_IMAGES.incubation.honorIncubator}
                    inquiryItems={inquiryItems}
                    onToggleInquiry={onToggleInquiry}
                  />
                  <HatcheryGroupSubCard
                    productId="ht-honor-hatcher"
                    title="Honor 19200 Series Hatcher"
                    capacityBadge="Capacity: 19,200 to 38,400 eggs"
                    imageSrc={HATCHERY_IMAGES.incubation.honorHatcher}
                    inquiryItems={inquiryItems}
                    onToggleInquiry={onToggleInquiry}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. CONSOLIDATED PRODUCTS: EGG HANDLING (ID="egg-handling") ── */}
      <section id="egg-handling" className="relative py-16 sm:py-24 bg-slate-50 border-b border-slate-200 overflow-hidden">
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              EGG HANDLING & AI CANDLING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Egg Handling & AI Candling Systems
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Automated high-capacity sorting, vision inspection, and gentle robotic handling engineered to maximize embryo viability and optimize hatchery setting efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

            {/* Card 1: Automated Egg Handling System (Full Width / Span 2) */}
            <div className="lg:col-span-2 flex flex-col justify-between bg-white border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
              <div className="space-y-4">
                <div className="space-y-2.5">
                  <h3 className="text-2xl sm:text-3xl font-normal text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                    Egg Handling System
                  </h3>
                  <div className="pt-2.5 border-t border-slate-200">
                    <p className="font-mono text-sm sm:text-base font-bold text-amber-600 tracking-wide">
                      60,000 eggs/hour
                    </p>
                  </div>
                </div>

                <ImagePlaceholder
                  src={HATCHERY_IMAGES.eggHandling.systemOverview}
                  alt="Egg Handling System"
                  label="Egg Handling System"
                  aspectRatio="wide"
                  theme="light"
                  objectFit="contain"
                />
              </div>

              {HATCHERY_PRODUCTS_MAP['ht-egg-handling'] && (
                <div className="pt-4 border-t border-slate-200 mt-auto">
                  <AddToInquiryButton
                    product={HATCHERY_PRODUCTS_MAP['ht-egg-handling']}
                    inquiryItems={inquiryItems}
                    onToggleInquiry={onToggleInquiry}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Grouped Section: Single Line & Double Line Egg Candling & Transferring System */}
            <div className="lg:col-span-2 flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg">
              <div className="space-y-6">
                {/* Header & Key Features */}
                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-normal text-[#0B192C] tracking-tight">
                    Single Line & Double Line Egg Candling & Transferring System
                  </h3>

                  <KeyFeaturesList
                    features={[
                      'Fast, gentle egg handling with AI identification',
                      'Non-contact weighing',
                      'Flexible grading',
                      'Remote diagnostics',
                    ]}
                  />
                </div>

                {/* Individual Machine Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <HatcheryGroupSubCard
                    productId="ht-egg-single"
                    title="Single Line Egg Candling & Transferring System"
                    capacityBadge="Capacity: 50,000 egg position/hour"
                    imageSrc={HATCHERY_IMAGES.eggHandling.singleLineOverview}
                    inquiryItems={inquiryItems}
                    onToggleInquiry={onToggleInquiry}
                  />
                  <HatcheryGroupSubCard
                    productId="ht-egg-double"
                    title="Double Line Egg Candling & Transferring System"
                    capacityBadge="Capacity: 70,000 egg position/hour"
                    imageSrc={HATCHERY_IMAGES.eggHandling.doubleLineOverview}
                    inquiryItems={inquiryItems}
                    onToggleInquiry={onToggleInquiry}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6. CONSOLIDATED PRODUCTS: CHICK HANDLING (ID="chick-handling") */}
      <section id="chick-handling" className="relative py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              AUTOMATED CHICK HANDLING SYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Automated Chick Handling System
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              High-throughput sorting, gentle bird transfer, and automated basket sanitation engineered to safeguard chick welfare and maximize processing productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

            {/* Grouped Section: Automated Chick Handling System */}
            <div className="lg:col-span-2 flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg">
              <div className="space-y-6">
                {/* Header & Key Features */}
                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-normal text-[#0B192C] tracking-tight">
                    Day-Old Chick Handling Systems
                  </h3>

                  <KeyFeaturesList
                    features={[
                      'Automated chick handling and gentle transport',
                      'Basket destacking, washing, and return loops',
                      'Chick and shell separation with waste control',
                      'High-speed processing at 70,000 egg position/hour',
                    ]}
                  />
                </div>

                {/* Individual Machine Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <HatcheryGroupSubCard
                    productId="ht-chick-handling"
                    title="For White Feather Broiler"
                    capacityBadge="Capacity: 70,000 egg position/hour"
                    imageSrc={HATCHERY_IMAGES.chickHandling.broilerLineOverview}
                    inquiryItems={inquiryItems}
                    onToggleInquiry={onToggleInquiry}
                  />
                  <HatcheryGroupSubCard
                    productId="ht-chick-layer"
                    title="For Layer"
                    capacityBadge="Capacity: 70,000 egg position/hour"
                    imageSrc={HATCHERY_IMAGES.chickHandling.layerLineOverview}
                    inquiryItems={inquiryItems}
                    onToggleInquiry={onToggleInquiry}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 7. CONSOLIDATED PRODUCTS: HVAC (ID="hvac") ──────────────── */}
      <section id="hvac" className="relative py-16 sm:py-24 bg-slate-50 border-b border-slate-200 overflow-hidden">
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              HATCHERY HVAC
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Hatchery HVAC Systems
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Integrates heat recovery, intelligent pumping, and precise process-water control for energy-efficient and reliable operation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

            {/* 1. Mechanical Room System */}
            <div className="flex flex-col justify-between bg-white border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
              <div className="space-y-4">
                <div className="space-y-2.5">
                  <h3 className="text-2xl sm:text-3xl font-normal text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                    Mechanical Room System
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed">
                    Integrates heat recovery, intelligent pumping, and precise process-water control for energy-efficient and reliable operation.
                  </p>
                </div>

                <ImagePlaceholder
                  src={HATCHERY_IMAGES.hvac.mechanicalRoomSystem}
                  alt="Mechanical Room System"
                  label="Mechanical Room System"
                  aspectRatio="video"
                  theme="light"
                />
              </div>

              {HATCHERY_PRODUCTS_MAP['ht-hvac-mech'] && (
                <div className="pt-4 border-t border-slate-200 mt-auto">
                  <AddToInquiryButton
                    product={HATCHERY_PRODUCTS_MAP['ht-hvac-mech']}
                    inquiryItems={inquiryItems}
                    onToggleInquiry={onToggleInquiry}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* 2. Air Conditioning System */}
            <div className="flex flex-col justify-between bg-white border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
              <div className="space-y-4">
                <div className="space-y-2.5">
                  <h3 className="text-2xl sm:text-3xl font-normal text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                    Air Conditioning System
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Intelligently links with incubation equipment to regulate fresh air, pressure, filtration, and airflow for stable, energy-efficient hatchery conditions.
                  </p>

                </div>

                <ImagePlaceholder
                  src={HATCHERY_IMAGES.hvac.airConditioningController}
                  alt="Air Conditioning System"
                  label="Air Conditioning System"
                  aspectRatio="video"
                  theme="light"
                />

                {/* Supports 4 operating modes visual block */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <span className="text-sm font-semibold text-slate-800 block">
                    Supports 4 operating modes:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                    <div className="flex flex-col items-center justify-start p-3 bg-slate-50 border border-slate-200/80 rounded-[2px] space-y-2">
                      <Snowflake className="w-6 h-6 text-sky-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-700 leading-tight">
                        Cooling
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-start p-3 bg-slate-50 border border-slate-200/80 rounded-[2px] space-y-2">
                      <svg className="w-6 h-6 text-sky-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 5c0 3 2 4 2 7s-2 4-2 7" />
                        <path d="M12 3c0 3 2 4 2 7s-2 4-2 7" />
                        <path d="M16 5c0 3 2 4 2 7s-2 4-2 7" />
                      </svg>
                      <span className="text-xs font-medium text-slate-700 leading-tight">
                        Heating
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-start p-3 bg-slate-50 border border-slate-200/80 rounded-[2px] space-y-2">
                      <Droplets className="w-6 h-6 text-sky-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-700 leading-tight">
                        Constant Temperature Dehumidification
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-start p-3 bg-slate-50 border border-slate-200/80 rounded-[2px] space-y-2">
                      <Fan className="w-6 h-6 text-sky-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-700 leading-tight">
                        Ventilation
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {HATCHERY_PRODUCTS_MAP['ht-hvac-ac'] && (
                <div className="pt-4 border-t border-slate-200 mt-auto">
                  <AddToInquiryButton
                    product={HATCHERY_PRODUCTS_MAP['ht-hvac-ac']}
                    inquiryItems={inquiryItems}
                    onToggleInquiry={onToggleInquiry}
                    className="w-full"
                  />
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── 8. CONSOLIDATED PRODUCTS: MANAGEMENT (ID="management") ──── */}
      <section id="management" className="relative py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              INTELLIGENT MANAGEMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Intelligent Hatchery Management Systems
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Our digital platform can connect incubation, automation, HVAC, maintenance, energy, and production information to monitor operations from a centralized management environment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

            {/* Centralized Alarm Dashboard */}
            <div className="flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
              <div className="space-y-4">
                <div className="space-y-2.5">
                  <h3 className="text-2xl sm:text-3xl font-normal text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                    Centralized Alarm Dashboard
                  </h3>
                  <div className="pt-2.5 border-t border-slate-200">
                    <p className="font-mono text-sm sm:text-base font-bold text-amber-600 tracking-wide">
                      (Target: Small and Medium Hatcheries)
                    </p>
                  </div>
                </div>

                <ImagePlaceholder
                  src={HATCHERY_IMAGES.management.centralizedAlarmDashboard}
                  alt="Centralized Alarm Dashboard"
                  label="Centralized Alarm Dashboard"
                  aspectRatio="video"
                  theme="light"
                />

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                    KEY FEATURES
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {[
                      'Centralized monitoring for up to 20 machines',
                      '21.5-inch visual alarm dashboard',
                      'Remote alarm muting and fault identification',
                      'Multi-device monitoring by a single operator',
                      'Up to 60% faster fault response',
                      'Real-time alerts help reduce losses from delayed response',
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {HATCHERY_PRODUCTS_MAP['ht-mgmt-alarm'] && (
                <div className="pt-4 border-t border-slate-200 mt-auto">
                  <AddToInquiryButton
                    product={HATCHERY_PRODUCTS_MAP['ht-mgmt-alarm']}
                    inquiryItems={inquiryItems}
                    onToggleInquiry={onToggleInquiry}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Intelligent Management Center */}
            <div className="flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
              <div className="space-y-4">
                <div className="space-y-2.5">
                  <h3 className="text-2xl sm:text-3xl font-normal text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                    Intelligent Management Center
                  </h3>
                  <div className="pt-2.5 border-t border-slate-200">
                    <p className="font-mono text-sm sm:text-base font-bold text-amber-600 tracking-wide">
                      (Target: Large Hatcheries)
                    </p>
                  </div>
                </div>

                <ImagePlaceholder
                  src={HATCHERY_IMAGES.management.intelligentManagementCenter}
                  alt="Intelligent Management Center"
                  label="Intelligent Management Center"
                  aspectRatio="video"
                  theme="light"
                />

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                    KEY FEATURES
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {[
                      'Centralized digital management for large-scale hatcheries',
                      'Compatible with both new and legacy equipment',
                      'Integrates equipment monitoring, maintenance, energy, and production',
                      'Connects incubation, automation, logistics, HVAC, and auxiliary systems',
                      'Supports end-to-end production data and traceability',
                      'Improves management efficiency by up to 50%',
                      'Reduces operational costs by up to 30%',
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {HATCHERY_PRODUCTS_MAP['ht-mgmt-center'] && (
                <div className="pt-4 border-t border-slate-200 mt-auto">
                  <AddToInquiryButton
                    product={HATCHERY_PRODUCTS_MAP['ht-mgmt-center']}
                    inquiryItems={inquiryItems}
                    onToggleInquiry={onToggleInquiry}
                    className="w-full"
                  />
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── 9. CONSOLIDATED PRODUCTS: WASTE DISPOSAL (ID="waste-disposal") */}
      <section id="waste-disposal" className="relative py-16 sm:py-24 bg-slate-50 border-b border-slate-200 overflow-hidden">
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
            <p className="text-slate-600 text-base leading-relaxed">
              Biosecure enclosed waste handling with pneumatic vacuum transport and high-capacity storage.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col justify-between bg-white border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
              <div className="space-y-4">
                <div className="space-y-2.5">
                  <h3 className="text-2xl sm:text-3xl font-normal text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                    Waste Disposal System
                  </h3>
                  <div className="pt-2.5 border-t border-slate-200">
                    <p className="font-mono text-sm sm:text-base font-bold text-amber-600 tracking-wide">
                      Silo Capacity: 7m³
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-sm sm:text-base font-bold text-amber-600 tracking-wide">
                      Full Load Weight: 5T
                    </p>
                  </div>
                </div>

                <ImagePlaceholder
                  src={HATCHERY_IMAGES.wasteDisposal.siloSystem}
                  alt="Waste Disposal System"
                  label="Waste Disposal System"
                  aspectRatio="video"
                  theme="light"
                />


              </div>

              {HATCHERY_PRODUCTS_MAP['ht-waste'] && (
                <div className="pt-4 border-t border-slate-200 mt-auto">
                  <AddToInquiryButton
                    product={HATCHERY_PRODUCTS_MAP['ht-waste']}
                    inquiryItems={inquiryItems}
                    onToggleInquiry={onToggleInquiry}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. HATCHERY MACHINERY, ACCESSORIES & SPARE PARTS INQUIRY CATALOG ── */}
      <div id="accessories-inquiry">
        <CategoryAccessoriesCatalog
          businessUnit="Hatchery"
          eyebrow="HATCHERY MACHINERY, ACCESSORIES & SPARE PARTS INQUIRY"
          title="Hatchery Equipment, Accessories & Spare Parts Catalog"
          subtitle="Select incubation setters, hatchers, egg candling lines, HVAC microclimate systems, setter trays, hatcher baskets, and OEM replacement spare parts to configure your project inquiry."
          inquiryItems={inquiryItems}
          onToggleInquiry={onToggleInquiry}
          accentTheme="amber"
        />
      </div>

      {/* ── 11. AFTER-SALES SERVICES & PARTS SUPPORT (ID="after-sales") ── */}
      <AfterSalesSection
        data={AFTER_SALES_DATA.hatchery}
        onCtaClick={scrollToContact}
        catalogLink={{
          label: 'Browse Spare Parts Catalog',
          href: '#accessories-inquiry',
        }}
      />

      {/* ── 12. CONTACT & INQUIRY SECTION (ID="contact") ───────────── */}
      <div id="contact">
        <ContactSection
          inquiryItems={inquiryItems}
          onRemoveInquiryItem={onRemoveInquiryItem}
        />
      </div>

    </div>
  );
};
