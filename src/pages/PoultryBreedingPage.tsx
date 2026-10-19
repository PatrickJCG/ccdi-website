import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  PhoneCall,
  Maximize2,
  Images,
  Play,
  Egg,
  Wind,
  Flame,
  Utensils,
  Droplets,
  Activity,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Parallax, Scrollbar, Mousewheel, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/parallax';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

import type { Product } from '../data/mockProducts';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { PoultrySubNav } from '../components/molecules/PoultrySubNav';
import { PoultryLocalEngineers } from '../components/molecules/PoultryLocalEngineers';
import { DesignOptionsHeroCarousel, type HeroDesignOption } from '../components/molecules';
import { ContactSection } from '../components/organisms/ContactSection';
import { PrefabricatedMaterialsSection } from '../components/organisms/PrefabricatedMaterialsSection';
import { PoultryRetrofitCallout } from '../components/molecules/PoultryRetrofitCallout';

export interface PoultryBreedingPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

export const PoultryBreedingPage: React.FC<PoultryBreedingPageProps> = ({
  inquiryItems,
  onToggleInquiry,
  onRemoveInquiryItem,
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [americanViewMode, setAmericanViewMode] = useState<'interior' | 'video'>('interior');
  const [europeanViewMode, setEuropeanViewMode] = useState<'interior' | 'video'>('interior');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; caption?: string; badge?: string; isVideo?: boolean } | null>(null);

  const breederDesignTabs = [
    { id: 'american', label: '1. American Type Design', shortLabel: '1. American Type' },
    { id: 'european', label: '2. European Type Design', shortLabel: '2. European Type' },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Find products in mock catalog for inquiry toggle
  const americanProduct = MOCK_PRODUCTS.find((p) => p.id === 'pf-breeder-01');
  const europeanProduct = MOCK_PRODUCTS.find((p) => p.id === 'pf-breeder-02');

  const isAmericanAdded = americanProduct ? inquiryItems.some((item) => item.id === americanProduct.id) : false;
  const isEuropeanAdded = europeanProduct ? inquiryItems.some((item) => item.id === europeanProduct.id) : false;

  const currentBreederProduct = activeSlideIndex === 1 ? europeanProduct : americanProduct;
  const isCurrentBreederAdded = activeSlideIndex === 1 ? isEuropeanAdded : isAmericanAdded;
  const currentBreederTitle = activeSlideIndex === 1 ? 'European Type' : 'American Type';
  const currentBreederCapacity = activeSlideIndex === 1 ? '12,500 Birds' : '10,890 Birds';

  const heroBreederOptions: HeroDesignOption[] = [
    {
      id: 'american',
      optionNumber: 'Option 01',
      badge: '1/3 Slat Layout',
      title: 'American Type Breeder House',
      caption: 'Turnkey parent stock facility engineered for natural mating, separate-sex feeding, and dual lateral sidewall community nests.',
      imageUrl: '/images/breeder/american-type-interior.jpg',
      targetSectionId: 'breeder-designs',
      slideIndex: 0,
      metrics: [
        { label: 'FLOCK CAPACITY', value: '10,890 Birds' },
        { label: 'DIMENSIONS', value: '14m × 134m × 2.9m' },
      ],
    },
    {
      id: 'european',
      optionNumber: 'Option 02',
      badge: '2/3 Slat Layout',
      title: 'European Type Breeder House',
      caption: 'High-efficiency parent stock house featuring central community nest line, automated variable egg belts, and optimized litter foraging.',
      imageUrl: '/images/breeder/euro-style-interior.png',
      targetSectionId: 'breeder-designs',
      slideIndex: 1,
      metrics: [
        { label: 'FLOCK CAPACITY', value: '12,500 Birds' },
        { label: 'DIMENSIONS', value: '16m × 140m × 3.0m' },
      ],
    },
  ];

  const handleSelectBreederDesign = (option: HeroDesignOption) => {
    swiperInstance?.slideTo(option.slideIndex);
    setActiveSlideIndex(option.slideIndex);
    const el = document.getElementById(option.targetSectionId);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      window.scrollTo({ top: elementRect - bodyRect - offset, behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const offset = 72;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      window.scrollTo({ top: elementRect - bodyRect - offset, behavior: 'smooth' });
    }
  };

  const breederSubSystems = [
    {
      title: 'Nesting & Automated Egg Collection System',
      image: '/images/breeder/euro-style-interior.png',
      icon: Egg,
      description:
        'An egg-laying system for clean, efficient, and reliable hatching egg collection, with configurations from lateral double-row nest boxes to fully automated central community nests with variable-speed collection belts.',
      components: ['Group Community Nests', 'Lateral Double-Row Layout', 'Central Single-Row Conveyor', 'Variable-Speed Packing Tables'],
      badge: 'COLLECTION EFFICIENCY >99.2% · FLOOR EGGS <0.8%',
    },
    {
      title: 'Controlled Climate & Tunnel Ventilation System',
      image: '/images/broiler/climate-system.jpg',
      icon: Wind,
      description:
        'An integrated climate regulation system that ensures stable internal housing conditions with precise static pressure balance, variable-speed cone exhaust fans, and evaporative wet pad cooling walls.',
      components: ['EI-6000PLUS & EI-1000C Units', 'F50 Butterfly Cone Fans', 'EI-50 Louvered Fans', 'Direct-Drive Inverter EC Fans'],
      badge: 'PRESSURE BALANCE ±2 PA · AIR SPEED 2.5–3.2 M/S',
    },
    {
      title: 'Controlled Heating & Brooding System',
      image: '/images/layer/heating-system.jpg',
      icon: Flame,
      description:
        'A controlled heat distribution system to maintain optimal temperatures for bird comfort, growth, and survival during brooding cycles with infrared radiant brooders and forced-air space heaters.',
      components: ['DAMLY Infrared Radiant Brooders', 'Forced-Air Space Heaters', 'Electronic Spark Ignition', 'Emergency Auto Gas Cut-Off'],
      badge: 'THERMAL EFFICIENCY 98.5% · 1,500 BIRDS/UNIT',
    },
    {
      title: 'Automated Separate-Sex Feeding System',
      image: '/images/breeder/american-type-interior.jpg',
      icon: Utensils,
      description:
        'Automated feeding system that stores, meters, and uniformly distributes feed using bulk outdoor galvanized silos, flex augers, and breeder pan/chain networks engineered with male exclusion grills.',
      components: ['Female Anti-Spill Pan Feeders', 'Adjustable Male Exclusion Grills', 'High-Speed Chain Loop (36 m/min)', 'Bulk Outdoor Zinc Silos'],
      badge: 'TRAVEL SPEED 36 M/MIN · UNIFORMITY ±1.2%',
    },
    {
      title: 'Closed-Loop Nipple Drinking System',
      image: '/images/layer/drinking-system.jpg',
      icon: Droplets,
      description:
        'Automated water delivery system ensuring clean supply, uniform access, and regulated flow via 360° stainless steel nipple lines, anti-roost shock wires, drip cups, and pressure regulator stations.',
      components: ['360° Stainless Nipple Drinkers', 'Single-Arm Drip Cups', 'Auto-Flush Biofilm Solenoids', 'Anti-Roost Shock Wire System'],
      badge: 'FLOW RATE 45–90 ML/MIN · LITTER DRYNESS >95%',
    },
    {
      title: 'Precision Water Medication & Dosing System',
      image: '/images/layer/medication-system.jpg',
      icon: Activity,
      description:
        'A system for delivering medications, vaccines, and nutritional supplements through water for accurate dosing and uniform flock treatment using non-electric water-powered proportional pumps.',
      components: ['Dosatron Proportional Pumps', 'Three-Valve Bypass Assembly', 'Digital Flow Pulse Meters', 'Dual 130-Micron Mesh Filters'],
      badge: 'DOSING ACCURACY ±0.5% · RATIO 0.2%–2.0%',
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-900 font-sans text-left min-h-screen">

      {/* ── 1. BREADCRUMB & HERO BANNER ────────────────────────────────────────── */}
      <section className="relative bg-[#07162A] text-white pt-10 pb-20 sm:pb-24 border-b border-[#102A43] overflow-hidden">
        {/* Glow & Industrial Grid Background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Architectural Accent 2 - Top Left Anchored (Fades in downwards on view) */}
        <motion.div
          initial={{ opacity: 0, y: -45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-12 -left-16 sm:-top-8 sm:left-0 w-80 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <img
            src="/images/accents/accent2.png"
            alt=""
            className="w-full h-auto object-contain opacity-30"
          />
        </motion.div>

        {/* Architectural Dynamic Accent Graphic - Bottom Right Anchored (Fades in upwards on view) */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -right-20 -bottom-16 sm:-right-8 sm:bottom-0 w-80 sm:w-96 lg:w-[500px] pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <img
            src="/images/accents/dark-accent-graphic.png"
            alt=""
            className="w-full h-auto object-contain opacity-30"
          />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
            <Link to="/" className="hover:text-amber-400 transition-colors">CCDI</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link to="/products" className="hover:text-amber-400 transition-colors">Solutions</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link to="/solutions/poultry" className="hover:text-amber-400 transition-colors">Poultry</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-400 font-medium">Broiler Breeder Operations</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] uppercase">
                <span className="text-white block">
                  Poultry Breeding<br />Operations
                </span>
                <span className="text-amber-400 block text-lg sm:text-xl lg:text-2xl font-extrabold tracking-wider mt-2.5">
                  Industrial Solutions
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                Clarkbase Construction Dev't Inc. delivers end-to-end turnkey broiler breeder parent stock facilities designed to maximize egg collection efficiency, biosecurity zoning, and stable microclimate control. Engineered with heavy-gauge Q355B H-steel rated for 200–280 kph typhoon winds.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="px-6 py-3.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-extrabold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  Request Breeder Consultation
                </button>

                {currentBreederProduct && (
                  <button
                    type="button"
                    onClick={() => onToggleInquiry(currentBreederProduct)}
                    className={`px-5 py-3.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold border transition-colors cursor-pointer flex items-center gap-2 ${
                      isCurrentBreederAdded
                        ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 hover:bg-emerald-500/30'
                        : 'bg-[#102A43] border-[#1E3E66] text-white hover:border-amber-400/60'
                    }`}
                  >
                    {isCurrentBreederAdded ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        Inquiry Added [{currentBreederCapacity}]
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-amber-400" />
                        Add {currentBreederTitle} to Inquiry
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Right Design Options Carousel */}
            <div className="lg:col-span-5">
              <DesignOptionsHeroCarousel
                options={heroBreederOptions}
                activeIndex={activeSlideIndex}
                onActiveIndexChange={(idx) => {
                  setActiveSlideIndex(idx);
                  swiperInstance?.slideTo(idx);
                }}
                onSelectOption={handleSelectBreederDesign}
                categoryLabel="BREEDER DESIGN FORMATS"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Contextual Sticky Sub-Nav ── */}
      <PoultrySubNav activeTab="broiler-breeder" />

      {/* ── 2. HOUSING SYSTEM ARCHITECTURE (AMERICAN VS EUROPEAN TYPE) ──────────── */}
      <section id="breeder-designs" className="relative py-20 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
        {/* Architectural Top-Right Corner Accent */}
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              BREEDER HOUSING DESIGN OPTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Two Proven Breeder Housing Systems
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              CCDI fabricates two globally validated breeder housing layouts. Select your operational configuration to review architectural blueprints, slatted floor distribution, and bird flow dynamics.
            </p>
          </div>

          {/* Interactive Toggle Switcher */}
          <div className="inline-flex flex-wrap p-1.5 bg-slate-100/90 rounded-xl border border-slate-200/80 gap-1.5 shadow-inner">
            {breederDesignTabs.map((tab, idx) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  swiperInstance?.slideTo(idx);
                  setActiveSlideIndex(idx);
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer ${
                  activeSlideIndex === idx
                    ? 'bg-[#0B192C] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Swiper Slider with Parallax, Scrollbar, Mousewheel & Side Navigation Arrows */}
          <div className="relative">
            {/* Side Navigation Arrow - Previous */}
            <button
              type="button"
              className="breeder-side-prev absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 border border-slate-300 text-[#0B192C] hover:bg-[#0B192C] hover:text-white hover:border-[#0B192C] transition-all shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer group disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Previous housing option"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5] transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Side Navigation Arrow - Next */}
            <button
              type="button"
              className="breeder-side-next absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 border border-slate-300 text-[#0B192C] hover:bg-[#0B192C] hover:text-white hover:border-[#0B192C] transition-all shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer group disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Next housing option"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
            </button>

            <Swiper
              modules={[Parallax, Scrollbar, Mousewheel, Navigation]}
              speed={600}
              parallax={true}
              watchSlidesProgress={true}
              rewind={true}
              centeredSlides={true}
              spaceBetween={20}
              slidesPerView={1}
              initialSlide={0}
              mousewheel={{
                forceToAxis: true,
                releaseOnEdges: true,
              }}
              scrollbar={{
                draggable: true,
                el: '.breeder-swiper-scrollbar',
              }}
              navigation={{
                prevEl: '.breeder-side-prev, .breeder-swiper-prev',
                nextEl: '.breeder-side-next, .breeder-swiper-next',
              }}
              onSwiper={(swiper) => {
                setSwiperInstance(swiper);
              }}
              onSlideChange={(swiper) => {
                setActiveSlideIndex(swiper.activeIndex);
              }}
              className="w-full !pb-2 overflow-hidden rounded-2xl relative"
            >
              {/* Continuous Container Parallax Background Layer - Highly Visible */}
              <div
                slot="container-start"
                className="parallax-bg pointer-events-none select-none z-0 overflow-hidden"
                data-swiper-parallax="-35%"
                data-swiper-parallax-duration="600"
              >
                {/* Visible architectural grid */}
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage: 'linear-gradient(#94a3b8 1.5px, transparent 1.5px), linear-gradient(90deg, #94a3b8 1.5px, transparent 1.5px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                {/* Soft ambient glow */}
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* SLIDE 1: AMERICAN TYPE DESIGN (1/3 SLAT) */}
              <SwiperSlide key="american" className="h-auto">
                <div className="relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-50/60 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm h-full">
                  {/* Visual Graphic Representation */}
                  <div
                    data-swiper-parallax="-260"
                    className="relative z-10 lg:col-span-5 flex flex-col justify-between"
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-[#1D3A63] bg-gradient-to-b from-[#0B192C] via-[#0F213A] to-[#14294A] p-5 sm:p-6 text-white shadow-xl shadow-[#0B192C]/25 h-full flex flex-col justify-between gap-5">
                      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300" />
                      <div className="space-y-4">
                        {/* Option Micro-Badge Header */}
                        <div
                          data-swiper-parallax="-120"
                          data-swiper-parallax-opacity="0.4"
                          className="flex items-center justify-between gap-2 pb-3 border-b border-white/10"
                        >
                          <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ring-4 ring-amber-400/20" />
                            <span>Design Option 01</span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-[#0B192C] border border-amber-300 font-sans">
                            Dual Lateral Nesting
                          </span>
                        </div>

                        {/* Product Title in Camel Casing */}
                        <div>
                          <h3
                            data-swiper-parallax="-280"
                            data-swiper-parallax-opacity="0"
                            className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-white leading-tight"
                          >
                            American Type Breeder House
                          </h3>
                          <p className="text-[13px] text-slate-300 mt-1.5 font-normal leading-relaxed">
                            Turnkey broiler parent stock facility engineered for natural mating and sidewall group nesting.
                          </p>
                        </div>

                        {/* Real American Type Images (Barn Photo & Video) */}
                        <div className="space-y-2.5 text-left">
                          {/* Media Display Container */}
                          <div
                            data-swiper-parallax="-380"
                            data-swiper-parallax-scale="0.9"
                            data-swiper-parallax-opacity="0.2"
                            className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-slate-950 border border-white/10 ring-1 ring-amber-400/20 shadow-lg shadow-black/30 group"
                          >
                            {americanViewMode === 'video' ? (
                              <div className="w-full h-full bg-black relative">
                                <video
                                  src="/videos/poultry-breeding-american.mp4"
                                  controls
                                  autoPlay
                                  loop
                                  playsInline
                                  className="w-full h-full object-contain bg-black"
                                />
                              </div>
                            ) : (
                              <AnimatePresence mode="wait">
                                <motion.img
                                  key="american-interior"
                                  src="/images/breeder/american-type-interior.jpg"
                                  alt="American Type Breeder House Barn Interior"
                                  initial={{ opacity: 0, scale: 1.02 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.98 }}
                                  transition={{ duration: 0.25 }}
                                  className="w-full h-full object-cover brightness-[0.98]"
                                />
                              </AnimatePresence>
                            )}

                            {/* Expand / Lightbox Button */}
                            <button
                              type="button"
                              onClick={() =>
                                setLightboxImage({
                                  url:
                                    americanViewMode === 'video'
                                      ? '/videos/poultry-breeding-american.mp4'
                                      : '/images/breeder/american-type-interior.jpg',
                                  title:
                                    americanViewMode === 'video'
                                      ? 'American Type Breeder House - 3D Facility Video Tour'
                                      : 'American Type Breeder House - Facility Barn Interior',
                                  caption:
                                    americanViewMode === 'video'
                                      ? 'Complete 3D facility simulation showing building aerodynamics, feeding loops, and internal bird flow.'
                                      : 'Lateral nest boxes along sidewalls with suspended automated red feeder pans and ceiling fans.',
                                  badge: 'American Type Breeder',
                                  isVideo: americanViewMode === 'video',
                                })
                              }
                              className="absolute top-2.5 right-2.5 w-8 h-8 rounded-lg bg-white/90 hover:bg-amber-400 hover:text-slate-950 text-slate-800 border border-slate-200/80 transition-all backdrop-blur-md flex items-center justify-center cursor-pointer shadow-sm z-20 hover:scale-105 active:scale-95"
                              title="Inspect Full Resolution"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Media View Toggle Segmented Tabs */}
                          <div className="p-1 bg-white/5 rounded-lg grid grid-cols-2 gap-1 border border-white/10">
                            <button
                              type="button"
                              onClick={() => setAmericanViewMode('interior')}
                              className={`py-2 px-3 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                americanViewMode === 'interior'
                                  ? 'bg-amber-400 text-[#0B192C] shadow-sm font-bold'
                                  : 'text-slate-300 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <Images className={`w-3.5 h-3.5 ${americanViewMode === 'interior' ? 'text-[#0B192C]' : 'text-slate-400'}`} />
                              <span>Barn Photo</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setAmericanViewMode('video')}
                              className={`py-2 px-3 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                americanViewMode === 'video'
                                  ? 'bg-amber-400 text-[#0B192C] shadow-sm font-bold'
                                  : 'text-slate-300 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <Play className={`w-3.5 h-3.5 fill-current ${americanViewMode === 'video' ? 'text-[#0B192C]' : 'text-slate-400'}`} />
                              <span>Video Tour</span>
                            </button>
                          </div>

                          {/* Floor Plan Schematic Summary Panel */}
                          <div
                            data-swiper-parallax="-180"
                            data-swiper-parallax-opacity="0.2"
                            className="p-3.5 bg-white/[0.04] border border-white/10 rounded-xl space-y-2 text-xs"
                          >
                            <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                              <Layers className="w-3.5 h-3.5 text-amber-400" />
                              <span>Floor Layout Dynamics</span>
                            </div>
                            <div className="divide-y divide-white/10">
                              <div className="flex items-baseline justify-between py-1.5 text-xs">
                                <span className="font-semibold text-white">Roosting Slats</span>
                                <span className="text-slate-300 text-right">Lateral rows along sidewalls (1/3)</span>
                              </div>
                              <div className="flex items-baseline justify-between py-1.5 text-xs">
                                <span className="font-semibold text-white">Central Scratch Arena</span>
                                <span className="text-slate-300 text-right">Free bird movement & mating (2/3)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Inquiry Action */}
                      <div data-swiper-parallax="-100" className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (americanProduct) onToggleInquiry(americanProduct);
                          }}
                          className={`w-full py-3.5 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md active:scale-[0.99] ${
                            isAmericanAdded
                              ? 'bg-white text-[#0B192C] hover:bg-slate-100'
                              : 'bg-amber-400 text-[#0B192C] hover:bg-amber-300 shadow-amber-500/30'
                          }`}
                        >
                          {isAmericanAdded ? (
                            <>
                              <Check className="w-4 h-4 stroke-[2.5]" />
                              <span>Attached to Inquiry Drawer</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 stroke-[2.5]" />
                              <span>Attach Building Package to Inquiry</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Technical Parameters & Specifications */}
                  <div
                    data-swiper-parallax="-420"
                    className="relative z-10 lg:col-span-7 flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-6">
                      {/* Section 1: Technical Metrics & Capacities */}
                      <div className="space-y-3">
                        <div
                          data-swiper-parallax="-160"
                          data-swiper-parallax-opacity="0.3"
                          className="flex items-center gap-2"
                        >
                          <span className="w-1.5 h-3.5 bg-amber-500 rounded-full" />
                          <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold">
                            Technical Metrics & Capacities
                          </span>
                        </div>

                        <div
                          data-swiper-parallax="-300"
                          data-swiper-parallax-opacity="0.2"
                          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        >
                          {/* Card 1: Total Bird Capacity */}
                          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all group">
                            <div className="flex items-center justify-between text-slate-400 mb-1">
                              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-500">Total Bird Capacity</span>
                            </div>
                            <div className="text-xl font-extrabold text-[#0B192C] tracking-tight">
                              10,890 Birds
                            </div>
                            <span className="text-[11px] text-slate-500 block mt-1 font-normal">
                              9,900 Female + 990 Male (10:1 Ratio)
                            </span>
                          </div>

                          {/* Card 2: Building Dimensions */}
                          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all group">
                            <div className="flex items-center justify-between text-slate-400 mb-1">
                              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-500">Building Dimensions</span>
                            </div>
                            <div className="text-xl font-extrabold text-[#0B192C] tracking-tight">
                              14m × 134m × 2.9m
                            </div>
                            <span className="text-[11px] text-slate-500 block mt-1 font-normal">
                              Width × Length × Eave Height
                            </span>
                          </div>

                          {/* Card 3: Building Type */}
                          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all group">
                            <div className="flex items-center justify-between text-slate-400 mb-1">
                              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-500">Building Type</span>
                            </div>
                            <div className="text-lg font-bold text-slate-900 tracking-tight">
                              Pre-Fabricated House
                            </div>
                            <span className="text-[11px] text-slate-500 block mt-1 font-normal">
                              Thermal insulated PU sandwich panels
                            </span>
                          </div>

                          {/* Card 4: Floor Architecture */}
                          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all group">
                            <div className="flex items-center justify-between text-slate-400 mb-1">
                              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-500">Floor Architecture</span>
                            </div>
                            <div className="text-lg font-bold text-slate-900 tracking-tight">
                              Raised Lateral Slats
                            </div>
                            <span className="text-[11px] text-slate-500 block mt-1 font-normal">
                              Outer roost lines with central scratch arena
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Engineering Advantages */}
                      <div
                        data-swiper-parallax="-480"
                        data-swiper-parallax-opacity="0.1"
                        className="space-y-3"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-3.5 bg-amber-500 rounded-full" />
                          <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold">
                            Engineering Advantages
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs text-slate-900 leading-tight">
                                Natural Mating Behavior
                              </h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-normal">
                                Generous central scratch area allows optimal male-to-female interaction.
                              </p>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs text-slate-900 leading-tight">
                                Flock Distribution
                              </h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-normal">
                                Prevents crowding by balancing bird density across two lateral slat zones.
                              </p>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs text-slate-900 leading-tight">
                                Perimeter Access
                              </h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-normal">
                                Maintenance and egg inspection along outer aisles without disturbing center flock.
                              </p>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs text-slate-900 leading-tight">
                                Clean Slat Elevation
                              </h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-normal">
                                1/3 elevated floor ensures efficient manure drainage beneath slats.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Compressed Local Professional Engineering Team */}
                      <div
                        data-swiper-parallax="-500"
                        data-swiper-parallax-opacity="0.1"
                        className="space-y-2.5 pt-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-3.5 bg-amber-500 rounded-full" />
                          <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold">
                            Local Professional Engineering Team
                          </span>
                        </div>
                        <PoultryLocalEngineers
                          solutionType="breeder"
                          solutionName="American (1/3 Slat) Layout"
                          compact
                        />
                      </div>
                    </div>

                    {/* Section 4: Brand Footer Strip */}
                    <div
                      data-swiper-parallax="-520"
                      data-swiper-parallax-opacity="0.2"
                      className="flex items-center justify-between pt-3 border-t border-slate-200/60"
                    >
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 font-medium">
                        <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>Turnkey CCDI Engineering & Biosecurity Certified</span>
                      </div>
                      <img
                        src="/images/branding/CCDI%20logo.svg"
                        alt="CCDI - Clark Base Construction & Dev't Inc."
                        className="w-20 sm:w-24 h-auto object-contain select-none pointer-events-none drop-shadow-xs opacity-90"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              {/* SLIDE 2: EUROPEAN TYPE DESIGN (2/3 SLAT) */}
              <SwiperSlide key="european" className="h-auto">
                <div className="relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-50/60 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm h-full">
                  {/* Visual Graphic Representation */}
                  <div
                    data-swiper-parallax="-260"
                    className="relative z-10 lg:col-span-5 flex flex-col justify-between"
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-[#1D3A63] bg-gradient-to-b from-[#0B192C] via-[#0F213A] to-[#14294A] p-5 sm:p-6 text-white shadow-xl shadow-[#0B192C]/25 h-full flex flex-col justify-between gap-5">
                      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300" />
                      <div className="space-y-4">
                        {/* Option Micro-Badge Header */}
                        <div
                          data-swiper-parallax="-120"
                          data-swiper-parallax-opacity="0.4"
                          className="flex items-center justify-between gap-2 pb-3 border-b border-white/10"
                        >
                          <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ring-4 ring-amber-400/20" />
                            <span>Design Option 02</span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-[#0B192C] border border-amber-300 font-sans">
                            Central Community Nesting
                          </span>
                        </div>

                        {/* Product Title in Camel Casing */}
                        <div>
                          <h3
                            data-swiper-parallax="-280"
                            data-swiper-parallax-opacity="0"
                            className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-white leading-tight"
                          >
                            European Type Breeder House
                          </h3>
                          <p className="text-[13px] text-slate-300 mt-1.5 font-normal leading-relaxed">
                            Turnkey broiler parent stock facility engineered for central community nesting and high space efficiency.
                          </p>
                        </div>

                        {/* Real European / EURO Type Images (Barn Photo & Video) */}
                        <div className="space-y-2.5 text-left">
                          {/* Media Display Container */}
                          <div
                            data-swiper-parallax="-380"
                            data-swiper-parallax-scale="0.9"
                            data-swiper-parallax-opacity="0.2"
                            className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-slate-950 border border-white/10 ring-1 ring-amber-400/20 shadow-lg shadow-black/30 group"
                          >
                            {europeanViewMode === 'video' ? (
                              <div className="w-full h-full bg-black relative">
                                <video
                                  src="/images/breeder/Poultry_breeding_house_EURO.mp4"
                                  controls
                                  autoPlay
                                  loop
                                  playsInline
                                  className="w-full h-full object-contain bg-black"
                                />
                              </div>
                            ) : (
                              <AnimatePresence mode="wait">
                                <motion.img
                                  key="european-interior"
                                  src="/images/breeder/euro-style-interior.png"
                                  alt="European Type Breeder House Barn Interior"
                                  initial={{ opacity: 0, scale: 1.02 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.98 }}
                                  transition={{ duration: 0.25 }}
                                  className="w-full h-full object-cover brightness-[0.98]"
                                />
                              </AnimatePresence>
                            )}

                            {/* Architectural Top-Right Corner Accent */}
                            {europeanViewMode !== 'video' && (
                              <img
                                src="/images/accents/card-corner-accent.png"
                                alt=""
                                data-swiper-parallax="-480"
                                className="absolute top-0 right-0 w-28 sm:w-36 h-auto object-contain object-right-top pointer-events-none select-none z-10 drop-shadow-sm opacity-80"
                                aria-hidden="true"
                              />
                            )}

                            {/* Expand / Lightbox Button */}
                            <button
                              type="button"
                              onClick={() =>
                                setLightboxImage({
                                  url:
                                    europeanViewMode === 'video'
                                      ? '/images/breeder/Poultry_breeding_house_EURO.mp4'
                                      : '/images/breeder/euro-style-interior.png',
                                  title:
                                    europeanViewMode === 'video'
                                      ? 'European Type Breeder House - 3D Facility Video Tour'
                                      : 'European Type Breeder House - Facility Barn Interior',
                                  caption:
                                    europeanViewMode === 'video'
                                      ? 'Complete 3D facility simulation showing European 2/3 slat layout, central community nesting, and longitudinal ventilation.'
                                      : 'European type breeder house interior featuring central community nest boxes, elevated slatted floor deck, and hanging feed lines.',
                                  badge: 'European Type Breeder',
                                  isVideo: europeanViewMode === 'video',
                                })
                              }
                              className="absolute top-2.5 right-2.5 w-8 h-8 rounded-lg bg-white/90 hover:bg-amber-400 hover:text-slate-950 text-slate-800 border border-slate-200/80 transition-all backdrop-blur-md flex items-center justify-center cursor-pointer shadow-sm z-20 hover:scale-105 active:scale-95"
                              title="Inspect Full Resolution"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Media View Toggle Segmented Tabs */}
                          <div className="p-1 bg-white/5 rounded-lg grid grid-cols-2 gap-1 border border-white/10">
                            <button
                              type="button"
                              onClick={() => setEuropeanViewMode('interior')}
                              className={`py-2 px-3 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                europeanViewMode === 'interior'
                                  ? 'bg-amber-400 text-[#0B192C] shadow-sm font-bold'
                                  : 'text-slate-300 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <Images className={`w-3.5 h-3.5 ${europeanViewMode === 'interior' ? 'text-[#0B192C]' : 'text-slate-400'}`} />
                              <span>Barn Photo</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setEuropeanViewMode('video')}
                              className={`py-2 px-3 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                europeanViewMode === 'video'
                                  ? 'bg-amber-400 text-[#0B192C] shadow-sm font-bold'
                                  : 'text-slate-300 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <Play className={`w-3.5 h-3.5 fill-current ${europeanViewMode === 'video' ? 'text-[#0B192C]' : 'text-slate-400'}`} />
                              <span>Video Tour</span>
                            </button>
                          </div>

                          {/* Floor Plan Schematic Summary Panel */}
                          <div
                            data-swiper-parallax="-180"
                            data-swiper-parallax-opacity="0.2"
                            className="p-3.5 bg-white/[0.04] border border-white/10 rounded-xl space-y-2 text-xs"
                          >
                            <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                              <Layers className="w-3.5 h-3.5 text-amber-400" />
                              <span>Floor Layout Dynamics</span>
                            </div>
                            <div className="divide-y divide-white/10">
                              <div className="flex items-baseline justify-between py-1.5 text-xs">
                                <span className="font-semibold text-white">Slatted Deck Coverage</span>
                                <span className="text-slate-300 text-right">Elevated plastic slats over 2/3 floor</span>
                              </div>
                              <div className="flex items-baseline justify-between py-1.5 text-xs">
                                <span className="font-semibold text-white">Center Nest Line</span>
                                <span className="text-slate-300 text-right">Automated community egg gathering</span>
                              </div>
                              <div className="flex items-baseline justify-between py-1.5 text-xs">
                                <span className="font-semibold text-white">End Scratch Arenas</span>
                                <span className="text-slate-300 text-right">Dedicated mating areas at both ends</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Inquiry Action */}
                      <div data-swiper-parallax="-100" className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (europeanProduct) onToggleInquiry(europeanProduct);
                          }}
                          className={`w-full py-3.5 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md active:scale-[0.99] ${
                            isEuropeanAdded
                              ? 'bg-white text-[#0B192C] hover:bg-slate-100'
                              : 'bg-amber-400 text-[#0B192C] hover:bg-amber-300 shadow-amber-500/30'
                          }`}
                        >
                          {isEuropeanAdded ? (
                            <>
                              <Check className="w-4 h-4 stroke-[2.5]" />
                              <span>Attached to Inquiry Drawer</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 stroke-[2.5]" />
                              <span>Attach Building Package to Inquiry</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Technical Parameters & Specifications */}
                  <div
                    data-swiper-parallax="-420"
                    className="relative z-10 lg:col-span-7 flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-6">
                      {/* Section 1: Technical Metrics & Capacities */}
                      <div className="space-y-3">
                        <div
                          data-swiper-parallax="-160"
                          data-swiper-parallax-opacity="0.3"
                          className="flex items-center gap-2"
                        >
                          <span className="w-1.5 h-3.5 bg-amber-500 rounded-full" />
                          <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold">
                            Technical Metrics & Capacities
                          </span>
                        </div>

                        <div
                          data-swiper-parallax="-300"
                          data-swiper-parallax-opacity="0.2"
                          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        >
                          {/* Card 1: Total Bird Capacity */}
                          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all group">
                            <div className="flex items-center justify-between text-slate-400 mb-1">
                              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-500">Total Bird Capacity</span>
                            </div>
                            <div className="text-xl font-extrabold text-[#0B192C] tracking-tight">
                              10,890 Birds
                            </div>
                            <span className="text-[11px] text-slate-500 block mt-1 font-normal">
                              9,900 Female + 990 Male (10:1 Ratio)
                            </span>
                          </div>

                          {/* Card 2: Building Dimensions */}
                          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all group">
                            <div className="flex items-center justify-between text-slate-400 mb-1">
                              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-500">Building Dimensions</span>
                            </div>
                            <div className="text-xl font-extrabold text-[#0B192C] tracking-tight">
                              14m × 134m × 2.9m
                            </div>
                            <span className="text-[11px] text-slate-500 block mt-1 font-normal">
                              Width × Length × Eave Height
                            </span>
                          </div>

                          {/* Card 3: Building Type */}
                          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all group">
                            <div className="flex items-center justify-between text-slate-400 mb-1">
                              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-500">Building Type</span>
                            </div>
                            <div className="text-lg font-bold text-slate-900 tracking-tight">
                              Pre-Fabricated House
                            </div>
                            <span className="text-[11px] text-slate-500 block mt-1 font-normal">
                              Thermal insulated PU sandwich panels
                            </span>
                          </div>

                          {/* Card 4: Floor Architecture */}
                          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all group">
                            <div className="flex items-center justify-between text-slate-400 mb-1">
                              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-500">Floor Architecture</span>
                            </div>
                            <div className="text-lg font-bold text-slate-900 tracking-tight">
                              Elevated Slatted Deck
                            </div>
                            <span className="text-[11px] text-slate-500 block mt-1 font-normal">
                              High-density plastic slats with end mating zones
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Engineering Advantages */}
                      <div
                        data-swiper-parallax="-480"
                        data-swiper-parallax-opacity="0.1"
                        className="space-y-3"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-3.5 bg-amber-500 rounded-full" />
                          <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold">
                            Engineering Advantages
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs text-slate-900 leading-tight">
                                High Floor Space Efficiency
                              </h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-normal">
                                2/3 slat ratio minimizes manure contact across the dominant house area.
                              </p>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs text-slate-900 leading-tight">
                                Centralized Egg Collection
                              </h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-normal">
                                High-speed single central egg collection belt delivers to egg room.
                              </p>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs text-slate-900 leading-tight">
                                Community Group Nests
                              </h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-normal">
                                Enhanced comfort and darker laying environment for reduced floor eggs.
                              </p>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs text-slate-900 leading-tight">
                                Dedicated Mating Zones
                              </h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-normal">
                                Concentrated end zones facilitate structured mating and flock observation.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Compressed Local Professional Engineering Team */}
                      <div
                        data-swiper-parallax="-500"
                        data-swiper-parallax-opacity="0.1"
                        className="space-y-2.5 pt-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-3.5 bg-amber-500 rounded-full" />
                          <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold">
                            Local Professional Engineering Team
                          </span>
                        </div>
                        <PoultryLocalEngineers
                          solutionType="breeder"
                          solutionName="European (2/3 Slat) Layout"
                          compact
                        />
                      </div>
                    </div>

                    {/* Section 4: Brand Footer Strip */}
                    <div
                      data-swiper-parallax="-520"
                      data-swiper-parallax-opacity="0.2"
                      className="flex items-center justify-between pt-3 border-t border-slate-200/60"
                    >
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 font-medium">
                        <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>Turnkey CCDI Engineering & Biosecurity Certified</span>
                      </div>
                      <img
                        src="/images/branding/CCDI%20logo.svg"
                        alt="CCDI - Clark Base Construction & Dev't Inc."
                        className="w-20 sm:w-24 h-auto object-contain select-none pointer-events-none drop-shadow-xs opacity-90"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>

            {/* Bottom Controls Bar: Centered Page Indicator & Scrollbar */}
            <div className="mt-4 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-slate-200/80 p-3 sm:px-5 rounded-xl shadow-xs">
              {/* Draggable Scrollbar Track - Centered */}
              <div className="w-full max-w-md flex flex-col gap-1.5">
                <div className="breeder-swiper-scrollbar !relative !h-2 !bg-slate-200/70 rounded-full overflow-hidden cursor-pointer" />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  <span className={activeSlideIndex === 0 ? 'text-[#0B192C] font-bold' : ''}>1. American Type</span>
                  <span className={activeSlideIndex === 1 ? 'text-[#0B192C] font-bold' : ''}>2. European Type</span>
                </div>
              </div>
            </div>

            <style>{`
              .parallax-bg {
                position: absolute;
                left: 0;
                top: 0;
                width: 140%;
                height: 100%;
              }
              .breeder-swiper-scrollbar .swiper-scrollbar-drag {
                background: #0B192C !important;
                border-radius: 9999px !important;
                cursor: grab;
                transition: background-color 0.2s ease;
              }
              .breeder-swiper-scrollbar .swiper-scrollbar-drag:hover,
              .breeder-swiper-scrollbar .swiper-scrollbar-drag:active {
                background: #d97706 !important;
                cursor: grabbing;
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* ── 3. PRE-FABRICATED HOUSE MATERIALS & SPECIFICATIONS TABLE ───────────── */}
      <PrefabricatedMaterialsSection
        id="materials-specifications"
        sourceBrochure="CCDI Poultry Breeding Operations engineering brochure"
      />

      {/* ── 4. INTEGRATED BREEDER SUB-SYSTEMS (DARK THEME) ───────────── */}
      <section id="operational-systems" className="py-20 sm:py-24 bg-[#0B192C] border-b border-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-80 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-15"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 block font-normal">
              BREEDER AUTOMATION & CONTROL
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Integrated Breeder Sub-Systems
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Every CCDI poultry breeding house is equipped with factory-calibrated mechanical and electrical systems engineered to uphold parent stock welfare, feed conversion, and hatchability:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {breederSubSystems.map((sys, idx) => {
              const Icon = sys.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#0F223D] border border-slate-700/60 rounded-[2px] overflow-hidden flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-amber-500/5"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      <img
                        src={sys.image}
                        alt={sys.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D] via-transparent to-transparent opacity-90" />
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-[2px] bg-[#0B192C]/85 backdrop-blur-xs border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {sys.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {sys.description}
                      </p>

                      <div className="pt-2">
                        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5 font-normal">
                          Key Equipment & Features
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {sys.components.map((comp, cIdx) => (
                            <span
                              key={cIdx}
                              className="text-[10px] bg-[#07162A] text-slate-300 border border-slate-700/80 px-2 py-0.5 rounded-[2px] font-normal"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-700/60 flex items-start justify-between text-[11px] font-mono text-slate-400 gap-3">
                      <span className="shrink-0 pt-0.5">SPECIFICATION</span>
                      <div className="flex flex-col items-end text-right space-y-1">
                        {sys.badge.includes(' · ') ? (
                          sys.badge.split(' · ').map((part, pIdx) => (
                            <span key={pIdx} className="text-amber-400 font-normal">
                              {part}
                            </span>
                          ))
                        ) : (
                          <span className="text-amber-400 font-normal">{sys.badge}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5.5. RETROFITTING & MODERNIZATION CALLOUT ────────────── */}
      <PoultryRetrofitCallout currentCategory="Breeder Farm" />

      {/* ── 6. CONTACT & CONSULTATION SECTION ──────────────────────────────────── */}
      <ContactSection
        inquiryItems={inquiryItems}
        onRemoveInquiryItem={onRemoveInquiryItem}
      />

      {/* ── 7. FULL-RESOLUTION LIGHTBOX MODAL ─────────────────────────────────── */}
      <AnimatePresence>
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 text-left"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#07162A] border border-[#1E3E66] rounded-[2px] overflow-hidden shadow-2xl"
            >
              <div className="relative w-full h-[65vh] bg-black flex items-center justify-center">
                {lightboxImage.isVideo ? (
                  <video
                    src={lightboxImage.url}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={lightboxImage.url}
                    alt={lightboxImage.title}
                    className="w-full h-full object-contain p-2"
                  />
                )}
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-4 right-4 px-3 py-1.5 bg-black/80 hover:bg-amber-400 hover:text-slate-950 text-white font-mono text-xs font-bold rounded-[2px] border border-white/20 cursor-pointer transition-colors"
                >
                  ✕ CLOSE [ESC]
                </button>
              </div>
              <div className="p-4 bg-[#0B192C] border-t border-[#1E3E66] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-white">
                    {lightboxImage.title}
                  </h4>
                  {lightboxImage.caption && (
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {lightboxImage.caption}
                    </p>
                  )}
                </div>
                <span className="font-mono text-xs text-amber-400 font-bold bg-[#07162A] px-2.5 py-1 rounded-[2px] border border-amber-400/30 shrink-0">
                  {lightboxImage.badge || 'BREEDER OPERATION'}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
