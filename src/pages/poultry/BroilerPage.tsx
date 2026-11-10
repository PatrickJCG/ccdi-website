import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  PhoneCall,
  Wind,
  Flame,
  Utensils,
  Droplets,
  Activity,
  Truck,
  Users,
  Cpu,
  HandMetal,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Parallax, Scrollbar, Mousewheel, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/parallax';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

import type { Product } from '../../data/mockProducts';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { SolutionSubNav } from '../../components/molecules/SolutionSubNav';
import { HousingDesignSlide } from '../../components/molecules/HousingDesignSlide';
import { DesignOptionsHeroCarousel, type HeroDesignOption } from '../../components/molecules';
import { PrefabricatedMaterialsSection } from '../../components/organisms/PrefabricatedMaterialsSection';
import { PoultryRetrofitCallout } from '../../components/molecules/PoultryRetrofitCallout';
import { ContactSection } from '../../components/organisms/ContactSection';

export interface BroilerPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

export const BroilerPage: React.FC<BroilerPageProps> = ({
  inquiryItems,
  onToggleInquiry,
  onRemoveInquiryItem,
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(1);
  const [selectedHarvestMethod, setSelectedHarvestMethod] = useState<'automated' | 'manual'>('automated');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const cageProduct = MOCK_PRODUCTS.find((p) => p.id === 'pf-01');
  const elevatedProduct = MOCK_PRODUCTS.find((p) => p.id === 'pf-02');
  const floorProduct = MOCK_PRODUCTS.find((p) => p.id === 'pf-03');

  const isCageAdded = cageProduct ? inquiryItems.some((item) => item.id === cageProduct.id) : false;
  const isElevatedAdded = elevatedProduct ? inquiryItems.some((item) => item.id === elevatedProduct.id) : false;
  const isFloorAdded = floorProduct ? inquiryItems.some((item) => item.id === floorProduct.id) : false;

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const offset = 72;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      window.scrollTo({ top: elementRect - bodyRect - offset, behavior: 'smooth' });
    }
  };

  const heroBroilerOptions: HeroDesignOption[] = [
    {
      id: 'cage',
      optionNumber: 'Broiler House',
      badge: '',
      title: 'Multi-Tier Cage System',
      caption: '',
      imageUrl: '/images/broiler/multi-tier-broiler.jpg',
      targetSectionId: 'housing-designs',
      slideIndex: 0,
      metrics: [
        { label: 'FLOCK CAPACITY', value: '80,000 @ 1.8kg' },
        { label: 'DIMENSIONS', value: '16m × 110m × 4m–4.2m' },
      ],
    },
    {
      id: 'elevated',
      optionNumber: 'Broiler House',
      badge: 'Raised Slatted Deck',
      title: 'Elevated-Floor',
      caption: '',
      imageUrl: '/images/broiler/elevated-floor-broiler.jpg',
      targetSectionId: 'housing-designs',
      slideIndex: 1,
      metrics: [
        { label: 'FLOCK CAPACITY', value: '55,000 @ 1.8kg' },
        { label: 'DIMENSIONS', value: '18m × 156m × 2.4m' },
      ],
    },
    {
      id: 'floor',
      optionNumber: 'Broiler House',
      badge: 'Deep Litter Bedding',
      title: 'Floor-Type',
      caption: '',
      imageUrl: '/images/broiler/floor-type-broiler.jpg',
      targetSectionId: 'housing-designs',
      slideIndex: 2,
      metrics: [
        { label: 'FLOCK CAPACITY', value: '36,000 @ 1.8kg' },
        { label: 'DIMENSIONS', value: '16m × 138m × 2.4m' },
      ],
    },
  ];

  const handleSelectDesignOption = (option: HeroDesignOption) => {
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

  const housingDesignList = [
    {
      id: 'cage',
      optionNumber: 'Broiler House',
      badge: '',
      tabLabel: '1. Multi-Tier System',
      title: 'Multi-Tier Cage System',
      description:
        'An intensive poultry housing solution that maximizes vertical space through multi-tier cages, featuring integrated feeding, drinking, ventilation, manure removal, and manual or automatic harvesting systems',
      buildingType: 'Prefabricated House',
      dimensions: '16m × 110m × 4m–4.2m',
      birdCapacity: '80,000 @ 1.8kg',
      floorArchitecture: 'Multi-Tier Vertical Battery',
      ventilationSystem: 'Integrated Negative Pressure Tunnel',
      imageUrl: '/images/broiler/multi-tier-broiler.jpg',
      product: cageProduct,
      isAdded: isCageAdded,
      advantages: [
        'Maximizes vertical space with intensive high-density housing',
        'Integrated systems for feeding, drinking, ventilation & manure removal',
        'Flexible options for manual or fully automated harvesting systems',
        'Daily automated manure belt removal ensuring high internal hygiene',
      ],
    },
    {
      id: 'elevated',
      optionNumber: 'Broiler House',
      badge: 'Raised Slatted Deck',
      tabLabel: '2. Elevated-Floor System',
      title: 'Elevated-Floor',
      description:
        'A broiler housing system with a raised floor design that improves bird manure management, environmental airflow, and internal hygiene.',
      buildingType: 'Prefabricated House',
      dimensions: '18m x 156m x 2.4m',
      birdCapacity: '55,000 @ 1.8kg',
      floorArchitecture: 'Raised Slatted Deck',
      ventilationSystem: 'Negative Pressure Tunnel',
      imageUrl: '/images/broiler/elevated-floor-broiler.jpg',
      product: elevatedProduct,
      isAdded: isElevatedAdded,
      advantages: [
        'Raised floor design improves bird manure management',
        'Enhanced environmental airflow and internal hygiene',
        'Zero ammonia accumulation around bird breathing zone',
        'Winchable suspended feeding and drinking lines for rapid cleanout',
      ],
    },
    {
      id: 'floor',
      optionNumber: 'Broiler House',
      badge: 'Deep Litter Bedding',
      tabLabel: '3. Floor-Type System',
      title: 'Floor-Type',
      description:
        'A ground-level broiler housing system where birds are raised on litter or slatted floors within a controlled environment, utilizing horizontal space structure.',
      buildingType: 'Prefabricated House',
      dimensions: '16m x 138m x 2.4m',
      birdCapacity: '36,000 @ 1.8kg',
      floorArchitecture: 'Solid or Slatted Floors',
      ventilationSystem: 'Negative Pressure Tunnel',
      imageUrl: '/images/broiler/floor-type-broiler.jpg',
      product: floorProduct,
      isAdded: isFloorAdded,
      advantages: [
        'Ground-level controlled environment utilizing horizontal space',
        'Flexible configuration on solid concrete or slatted floors',
        'Winch-to-ceiling feeding and drinking line suspension clearance',
        'Automated 10–14 day flock turnaround and thorough disinfection',
      ],
    },
  ];

  const currentDesign = housingDesignList[activeSlideIndex] ?? housingDesignList[0];

  return (
    <div className="bg-slate-50 text-slate-900 font-sans text-left min-h-screen">

      {/* ── 1. HERO BANNER ────────────────────────────────────────── */}
      <section className="relative bg-[#07162A] text-white pt-10 pb-20 sm:pb-24 border-b border-[#102A43] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Architectural Accent 2 - Top Left Anchored */}
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

        {/* Architectural Dynamic Accent Graphic - Bottom Right Anchored */}
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
            <span className="text-amber-400 font-medium">Broiler Farm Operations</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] uppercase">
                <span className="text-white block">
                  Broiler Farm<br />Operations
                </span>
                <span className="text-amber-400 block text-lg sm:text-xl lg:text-2xl font-extrabold tracking-wider mt-2.5">
                  Industrial Solutions
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                CCDI delivers turnkey broiler facilities with automated climate control, including multi-tier systems, elevated floor houses, and ground-level houses.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3.5 rounded-[2px] font-sans text-xs font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-slate-950" />
                  Inquire Broiler Facility
                </button>

                {currentDesign.product && (
                  <button
                    type="button"
                    onClick={() => onToggleInquiry(currentDesign.product!)}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[2px] font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${currentDesign.isAdded
                      ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                      : 'bg-[#102A43] text-white hover:bg-[#1E3E66] border border-[#1E3E66]'
                      }`}
                  >
                    {currentDesign.isAdded ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        Inquiry Added [{currentDesign.birdCapacity}]
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-amber-400" />
                        Add {currentDesign.title} to Inquiry
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Right Design Options Carousel */}
            <div className="lg:col-span-5">
              <DesignOptionsHeroCarousel
                options={heroBroilerOptions}
                activeIndex={activeSlideIndex}
                onActiveIndexChange={(idx) => {
                  setActiveSlideIndex(idx);
                  swiperInstance?.slideTo(idx);
                }}
                onSelectOption={handleSelectDesignOption}
                categoryLabel="Broiler House Specifications"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CONTEXTUAL STICKY SUB-NAV ──────────────────────────── */}
      <SolutionSubNav category="poultry" activeTab="broiler" />

      {/* ── 3. HOUSING ARCHITECTURE: THREE PROVEN CONFIGURATIONS ──── */}
      <section id="housing-designs" className="relative py-20 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              BROILER HOUSING SYSTEM
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Explore CCDI’s three broiler housing systems. Review each option’s bird capacity, building dimensions, ventilation, and key equipment features.
            </p>
          </div>

          {/* Interactive Toggle Switcher */}
          <div className="inline-flex flex-wrap p-1.5 bg-slate-100/90 rounded-xl border border-slate-200/80 gap-1.5 shadow-inner">
            {housingDesignList.map((design, idx) => (
              <button
                key={design.id}
                type="button"
                onClick={() => {
                  swiperInstance?.slideTo(idx);
                  setActiveSlideIndex(idx);
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer ${activeSlideIndex === idx
                  ? 'bg-[#0B192C] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/50'
                  }`}
              >
                {design.tabLabel}
              </button>
            ))}
          </div>

          {/* Swiper Slider with Parallax, Scrollbar, Mousewheel & Side Navigation Arrows */}
          <div className="relative">
            {/* Side Navigation Arrow - Previous */}
            <button
              type="button"
              className="broiler-side-prev absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 border border-slate-300 text-[#0B192C] hover:bg-[#0B192C] hover:text-white hover:border-[#0B192C] transition-all shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer group disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Previous housing option"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5] transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Side Navigation Arrow - Next */}
            <button
              type="button"
              className="broiler-side-next absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 border border-slate-300 text-[#0B192C] hover:bg-[#0B192C] hover:text-white hover:border-[#0B192C] transition-all shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer group disabled:opacity-30 disabled:pointer-events-none"
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
              initialSlide={1}
              autoHeight={true}
              mousewheel={{
                forceToAxis: true,
                releaseOnEdges: true,
              }}
              scrollbar={{
                draggable: true,
                el: '.broiler-swiper-scrollbar',
              }}
              navigation={{
                prevEl: '.broiler-side-prev, .broiler-swiper-prev',
                nextEl: '.broiler-side-next, .broiler-swiper-next',
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

              {housingDesignList.map((design) => (
                <SwiperSlide key={design.id} className="h-auto">
                  <HousingDesignSlide
                    optionLabel={design.optionNumber}
                    badge={design.badge}
                    title={design.title}
                    imageUrl={design.imageUrl}
                    overview={design.description}
                    metrics={
                      design.id === 'cage'
                        ? [
                          {
                            label: 'Number of Houses',
                            value: '1 House Unit',
                            sub: 'Tunnel-ventilated prefabricated structure',
                          },
                          {
                            label: 'Design Capacity',
                            value: design.birdCapacity,
                            sub: 'Calculated at 1.8 kg target harvest weight',
                            primary: true,
                          },
                          {
                            label: 'House Dimensions',
                            value: design.dimensions,
                            sub: 'Clearance ceiling height · Pre-engineered',
                            primary: true,
                          },
                          {
                            label: 'Power Supply',
                            value: '3-Phase, 220V / 230V, 60Hz',
                            sub: 'Industrial rating for climate controls & augers',
                          },
                          {
                            label: 'Harvest Method',
                            value:
                              selectedHarvestMethod === 'automated'
                                ? 'Automatic Transfer'
                                : 'Manual Catch & Crate',
                            sub:
                              selectedHarvestMethod === 'automated'
                                ? 'Cage-to-carousel mechanical conveyor transfer'
                                : 'Aisle corridors & manual crating transfer',
                          },
                          {
                            label: 'Delivery Basis',
                            value: 'Delivered, Installed & Commissioned',
                            sub: 'Full turnkey execution directly at the farm',
                          },
                        ]
                        : [
                          {
                            label: 'Total Bird Capacity',
                            value: design.birdCapacity,
                            sub: 'Calculated at 1.8 kg target harvest weight',
                          },
                          {
                            label: 'Building Dimensions',
                            value: design.dimensions,
                            sub: 'Clearance ceiling height · Pre-engineered',
                          },
                          {
                            label: 'Building Type',
                            value: design.buildingType,
                            sub: 'Pre-fabricated steel house with insulated sandwich panels',
                          },
                          {
                            label: 'Ventilation System',
                            value: design.ventilationSystem,
                            sub: 'Negative pressure tunnel ventilation with cooling pads',
                          },
                        ]
                    }
                    extraContent={
                      design.id === 'cage' ? (
                        <div className="space-y-2.5 pt-1">
                          {/* Section Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-3.5 bg-amber-500 rounded-full shrink-0" />
                              <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold">
                                Configurable Harvest Method
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider hidden sm:inline">
                              Project Options
                            </span>
                          </div>

                          {/* Interactive Toggle Buttons */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 bg-slate-100/80 rounded-xl border border-slate-200/80">
                            <button
                              type="button"
                              onClick={() => setSelectedHarvestMethod('automated')}
                              className={`flex items-start gap-2 p-2.5 rounded-lg text-left transition-all cursor-pointer ${selectedHarvestMethod === 'automated'
                                  ? 'bg-[#0B192C] text-white shadow-sm ring-1 ring-amber-400/50'
                                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/60'
                                }`}
                            >
                              <div
                                className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${selectedHarvestMethod === 'automated'
                                    ? 'bg-amber-400 text-slate-950 font-bold'
                                    : 'bg-slate-100 text-slate-600'
                                  }`}
                              >
                                <Cpu className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold leading-tight block">
                                    Automated Carousel
                                  </span>
                                  {selectedHarvestMethod === 'automated' && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                  )}
                                </div>
                                <span
                                  className={`text-[11px] block leading-snug mt-0.5 ${selectedHarvestMethod === 'automated' ? 'text-slate-300' : 'text-slate-500'
                                    }`}
                                >
                                  Cage-to-carousel system
                                </span>
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => setSelectedHarvestMethod('manual')}
                              className={`flex items-start gap-2 p-2.5 rounded-lg text-left transition-all cursor-pointer ${selectedHarvestMethod === 'manual'
                                  ? 'bg-[#0B192C] text-white shadow-sm ring-1 ring-amber-400/50'
                                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/60'
                                }`}
                            >
                              <div
                                className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${selectedHarvestMethod === 'manual'
                                    ? 'bg-amber-400 text-slate-950 font-bold'
                                    : 'bg-slate-100 text-slate-600'
                                  }`}
                              >
                                <HandMetal className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold leading-tight block">
                                    Manual Catch &amp; Crate
                                  </span>
                                  {selectedHarvestMethod === 'manual' && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                  )}
                                </div>
                                <span
                                  className={`text-[11px] block leading-snug mt-0.5 ${selectedHarvestMethod === 'manual' ? 'text-slate-300' : 'text-slate-500'
                                    }`}
                                >
                                  Aisle corridor crating
                                </span>
                              </div>
                            </button>
                          </div>

                          {/* Dynamic Specification Detail Box based on Harvest Selection */}
                          <div className="bg-amber-50/70 border border-amber-300/60 rounded-xl p-3 text-xs flex flex-col gap-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono text-[11px] text-amber-800 font-bold uppercase tracking-wider block">
                                Active Harvest Spec ({selectedHarvestMethod === 'automated' ? 'Automated' : 'Manual'})
                              </span>
                              <span className="text-[10px] font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                                Delivered &amp; Installed
                              </span>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed font-normal">
                              {selectedHarvestMethod === 'automated'
                                ? 'Automatic cage-to-carousel mechanical transfer system delivering birds directly to crating stations with minimal bruising.'
                                : 'Manual catching and crating with clear-span access aisles, dimmable LED catching lights, and transport trolley corridors.'}
                            </p>
                          </div>
                        </div>
                      ) : undefined
                    }
                    advantages={design.advantages}
                    solutionType="broiler"
                    solutionName={design.title}
                    isAdded={design.isAdded}
                    onToggleInquiry={() => {
                      if (design.product) onToggleInquiry(design.product);
                    }}
                    showLocalEngineers={false}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Bottom Controls Bar: Centered Page Indicator & Scrollbar */}
            <div className="mt-4 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-slate-200/80 p-3 sm:px-5 rounded-xl shadow-xs">
              {/* Draggable Scrollbar Track - Centered */}
              <div className="w-full max-w-md flex flex-col gap-1.5">
                <div className="broiler-swiper-scrollbar !relative !h-2 !bg-slate-200/70 rounded-full overflow-hidden cursor-pointer" />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  <span className={activeSlideIndex === 0 ? 'text-[#0B192C] font-bold' : ''}>1. Multi-Tier</span>
                  <span className={activeSlideIndex === 1 ? 'text-[#0B192C] font-bold' : ''}>2. Elevated-Floor</span>
                  <span className={activeSlideIndex === 2 ? 'text-[#0B192C] font-bold' : ''}>3. Floor-Type</span>
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
              .broiler-swiper-scrollbar .swiper-scrollbar-drag {
                background: #0B192C !important;
                border-radius: 9999px !important;
                cursor: grab;
                transition: background-color 0.2s ease;
              }
              .broiler-swiper-scrollbar .swiper-scrollbar-drag:hover,
              .broiler-swiper-scrollbar .swiper-scrollbar-drag:active {
                background: #d97706 !important;
                cursor: grabbing;
              }
            `}</style>
          </div>

        </div>
      </section>

      {/* ── 4. PRE-FABRICATED HOUSE MATERIALS & SPECIFICATIONS TABLE ───────────── */}
      <PrefabricatedMaterialsSection
        id="materials-specifications"
        sourceBrochure="CCDI Broiler Operations engineering brochure"
      />

      {/* ── 5. CORE OPERATIONAL SUB-SYSTEMS (DARK THEME) ─────────── */}
      <section id="operational-subsystems" className="py-20 bg-[#0B192C] text-white border-b border-slate-800 relative overflow-hidden">
        {/* Subtle background glow & technical grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
        <div className="absolute -top-24 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-normal block">
              POULTRY HOUSE SYSTEMS & EQUIPMENT
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Equipment for Broiler House Operations
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore the key systems used in CCDI broiler houses that support seamless automation, biosecurity, and peak flock performance.
            </p>
          </div>

          <div className="space-y-6">
            {/* ── FEATURED HERO: AUTOMATED FEEDING SYSTEM (Highlighted Flagship) ── */}
            <div className="bg-[#0F223D] border border-slate-700/60 rounded-[2px] overflow-hidden group hover:border-amber-500/50 transition-all duration-300 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left Media & Description */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[400px] bg-slate-900 overflow-hidden flex flex-col justify-between p-6 sm:p-8">
                  <img
                    src="/images/broiler/feeding-system.jpg"
                    alt="Automated Feeding System - Broiler House Pan Lines"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D] via-[#0F223D]/80 to-[#0F223D]/40" />

                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <div className="w-9 h-9 rounded-[2px] bg-[#0B192C]/90 backdrop-blur-xs border border-amber-500/50 flex items-center justify-center text-amber-400 shadow-md">
                      <Utensils className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="relative z-10 space-y-2 pt-10">
                    <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight">
                      Feeding System
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      Automated or semi-automated system that stores, meters, and uniformly distributes feed using controlled and integrated systems.
                    </p>
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">FEED DISTRIBUTION</span>
                      <span className="text-amber-400 font-bold">Anti-Spill Radial Pans</span>
                    </div>
                  </div>
                </div>

                {/* Right Specification & Equipment Grid from Brochure */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-[#0F223D] to-[#0B192C]">
                  {/* Bulk Storage & Conveyance Infrastructure */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-3 bg-amber-400 rounded-full" />
                      <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-400">
                        Bulk Storage & Conveyance Infrastructure
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="bg-[#07162A]/80 border border-slate-700/80 p-3 rounded-[2px]">
                        <span className="text-xs font-bold text-white block">Hot-Dip Galvanized Silos</span>
                        <span className="text-[11px] text-slate-400 block mt-0.5 font-normal">1.5T to 32T capacity, 250g/m² zinc coating & 60° discharge cone</span>
                      </div>
                      <div className="bg-[#07162A]/80 border border-slate-700/80 p-3 rounded-[2px]">
                        <span className="text-xs font-bold text-white block">Flex-Auger Drive Units</span>
                        <span className="text-[11px] text-slate-400 block mt-0.5 font-normal">High-tensile delivery auger with bottom electronic weighing module</span>
                      </div>
                    </div>
                  </div>

                  {/* Feeding Line Components */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-3 bg-amber-400 rounded-full" />
                      <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-400">
                        Pan Feeding & Sensing Components
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'EI-WL2/14 Feed Pan',
                        '14 Radial Positions',
                        'Anti-Spill Rim Design',
                        'Pan Level Micro-Sensors',
                        'Ceiling Winch Line Hoist',
                        'Adjustable Feed Collar',
                      ].map((item, fIdx) => (
                        <div
                          key={fIdx}
                          className="bg-[#07162A]/60 border border-slate-700/60 p-2.5 rounded-[2px] text-left hover:border-amber-400/40 transition-colors"
                        >
                          <span className="text-xs font-medium text-slate-200 block">{item}</span>
                          <span className="text-[10px] text-amber-400/80 font-mono block mt-0.5">Commercial Grade</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Pipeline Spec */}
                  <div className="pt-2 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="text-slate-400">
                      <span className="text-slate-200 font-medium">Conveyance Line:</span> 45mm Galvanized Auger Pipe (3–4 Pans/3m)
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400">Zero Overflow · Multi-Stage Brooding</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 6 SUPPORTING SYSTEMS GRID (Brochure Definitions + Operational Handling) ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* System 1: Heating System */}
              <div className="bg-[#0F223D] border border-slate-700/60 rounded-[2px] overflow-hidden flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-amber-500/5">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src="/images/broiler/heating-system.jpg"
                      alt="Heating System"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D] via-transparent to-transparent opacity-90" />
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-[2px] bg-[#0B192C]/85 backdrop-blur-xs border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
                      <Flame className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      Heating System
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      A controlled heat distribution system to maintain optimal temperatures for bird comfort, growth, and survival.
                    </p>

                    <div className="pt-2">
                      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5 font-normal">
                        Key Equipment
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {['Space Heater', 'Gas Radiant Brooders', 'Infrared Heat Emitters', 'Zone Regulators'].map((comp, cIdx) => (
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
                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>BROODING TEMPERATURE</span>
                    <span className="text-amber-400 font-semibold">32–35°C</span>
                  </div>
                </div>
              </div>

              {/* System 2: Controlled Climate System */}
              <div className="bg-[#0F223D] border border-slate-700/60 rounded-[2px] overflow-hidden flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-amber-500/5">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src="/images/broiler/ventilation-fans.jpg"
                      alt="Controlled Climate System"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D] via-transparent to-transparent opacity-90" />
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-[2px] bg-[#0B192C]/85 backdrop-blur-xs border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
                      <Wind className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      Controlled Climate System
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      An integrated climate regulation system that ensures stable internal housing conditions.
                    </p>

                    <div className="pt-2">
                      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5 font-normal">
                        Key Equipment
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {['EI-6000PLUS Controller', 'EI-1000C Unit', 'F50 Butterfly Cone Fans', 'Cellulose Wet Pads'].map((comp, cIdx) => (
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
                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>TUNNEL AIR VELOCITY</span>
                    <span className="text-amber-400 font-semibold">2.5–3.2 m/s</span>
                  </div>
                </div>
              </div>

              {/* System 3: Drinking System */}
              <div className="bg-[#0F223D] border border-slate-700/60 rounded-[2px] overflow-hidden flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-amber-500/5">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src="/images/broiler/drinking-system.jpg"
                      alt="Drinking System"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D] via-transparent to-transparent opacity-90" />
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-[2px] bg-[#0B192C]/85 backdrop-blur-xs border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
                      <Droplets className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      Drinking System
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      Automated water delivery system ensuring clean supply, uniform access, and regulated flow via integrated networks and controls.
                    </p>

                    <div className="pt-2">
                      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5 font-normal">
                        Key Equipment
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {['360° Stainless Nipples', 'Single-Arm Drip Cups', 'Water Pressure Regulator', 'Dual Filter Manifold'].map((comp, cIdx) => (
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
                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>WATER DELIVERY</span>
                    <span className="text-amber-400 font-semibold">360° Flow</span>
                  </div>
                </div>
              </div>

              {/* System 4: Medication System */}
              <div className="bg-[#0F223D] border border-slate-700/60 rounded-[2px] overflow-hidden flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-amber-500/5">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src="/images/broiler/medication-system.jpg"
                      alt="Medication System"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D] via-transparent to-transparent opacity-90" />
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-[2px] bg-[#0B192C]/85 backdrop-blur-xs border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
                      <Activity className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      Medication System
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      A system for delivering medications, vaccines, and supplements through water for accurate dosing and uniform flock treatment.
                    </p>

                    <div className="pt-2">
                      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5 font-normal">
                        Key Equipment
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {['Dosatron Dosing Pumps', 'Water-Line Injection', 'Vaccine & Vitamin Dosing', 'Bypass Manifold'].map((comp, cIdx) => (
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
                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>DOSING METHOD</span>
                    <span className="text-amber-400 font-semibold">Proportional Dosing</span>
                  </div>
                </div>
              </div>

              {/* System 5: Automated Harvesting System */}
              <div className="bg-[#0F223D] border border-slate-700/60 rounded-[2px] overflow-hidden flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-amber-500/5">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src="/images/broiler/harvest-system.jpg"
                      alt="Automated Harvesting System"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D] via-transparent to-transparent opacity-90" />
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-[2px] bg-[#0B192C]/85 backdrop-blur-xs border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
                      <Truck className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-[2px] bg-amber-400/10 text-amber-400 border border-amber-400/30">
                        Multi-Tier Cage / Mechanized
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      Automated Harvesting System
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      High-throughput mechanized bird collection featuring integrated cage conveyors or motorized harvesting lines, reducing labor demand and minimizing bird bruising during crate loading.
                    </p>

                    <div className="pt-2">
                      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5 font-normal">
                        Key Equipment
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {['Catching Conveyors', 'Cage Discharge Belts', 'Crate Loading Lifters', 'Variable Speed Drive'].map((comp, cIdx) => (
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
                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>HARVEST METHOD</span>
                    <span className="text-amber-400 font-semibold">Continuous Conveyor</span>
                  </div>
                </div>
              </div>

              {/* System 6: Manual Harvesting System */}
              <div className="bg-[#0F223D] border border-slate-700/60 rounded-[2px] overflow-hidden flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-amber-500/5">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src="/images/broiler/floor-type-broiler.jpg"
                      alt="Manual Harvesting System"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D] via-transparent to-transparent opacity-90" />
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-[2px] bg-[#0B192C]/85 backdrop-blur-xs border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-[2px] bg-sky-400/10 text-sky-400 border border-sky-400/30">
                        Floor / Elevated-Floor Houses
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      Manual Harvesting System
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      Optimized manual catch corridors engineered with winch-to-ceiling line hoists that elevate all feeder and drinker lines, clearing floor space for safe, stress-free bird handling and rapid crate transport.
                    </p>

                    <div className="pt-2">
                      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5 font-normal">
                        Key Equipment
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {['Winch-to-Ceiling Hoists', 'Clear-Span Corridors', 'Transport Crate Carts', 'Dim-Light Catching Lamps'].map((comp, cIdx) => (
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
                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>CLEARANCE TIME</span>
                    <span className="text-amber-400 font-semibold">&lt; 15 Mins Hoisting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5.5. RETROFITTING & MODERNIZATION CALLOUT ────────────── */}
      <PoultryRetrofitCallout currentCategory="Broiler Farm" />

      {/* ── 6. CONTACT & INQUIRY SECTION */}
      <ContactSection
        inquiryItems={inquiryItems}
        onRemoveInquiryItem={onRemoveInquiryItem}
      />

    </div>
  );
};
