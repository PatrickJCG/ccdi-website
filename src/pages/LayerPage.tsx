import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  PhoneCall,
  Egg,
  Wind,
  Flame,
  Utensils,
  Droplets,
  Activity,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Parallax, Scrollbar, Mousewheel, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/parallax';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

import type { Product } from '../data/mockProducts';
import { LAYER_CATALOG_PRODUCTS } from '../data/layerCatalogProducts';
import { PoultrySubNav } from '../components/molecules/PoultrySubNav';
import { HousingDesignSlide } from '../components/molecules/HousingDesignSlide';
import { DesignOptionsHeroCarousel, type HeroDesignOption } from '../components/molecules';
import { PrefabricatedMaterialsSection } from '../components/organisms/PrefabricatedMaterialsSection';
import { PoultryRetrofitCallout } from '../components/molecules/PoultryRetrofitCallout';
import { ContactSection } from '../components/organisms/ContactSection';

export interface LayerPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

export const LayerPage: React.FC<LayerPageProps> = ({
  inquiryItems,
  onToggleInquiry,
  onRemoveInquiryItem,
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const hFrameProduct = LAYER_CATALOG_PRODUCTS.find((p) => p.id === 'pf-layer-hframe');
  const aFrameProduct = LAYER_CATALOG_PRODUCTS.find((p) => p.id === 'pf-layer-aframe');
  const rearingProduct = LAYER_CATALOG_PRODUCTS.find((p) => p.id === 'pf-layer-rearing');

  const isHFrameAdded = hFrameProduct ? inquiryItems.some((item) => item.id === hFrameProduct.id) : false;
  const isAFrameAdded = aFrameProduct ? inquiryItems.some((item) => item.id === aFrameProduct.id) : false;
  const isRearingAdded = rearingProduct ? inquiryItems.some((item) => item.id === rearingProduct.id) : false;

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const offset = 72;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      window.scrollTo({ top: elementRect - bodyRect - offset, behavior: 'smooth' });
    }
  };

  const heroLayerOptions: HeroDesignOption[] = [
    {
      id: 'h-frame',
      optionNumber: 'Option 01',
      badge: 'Vertical Multi-Tier',
      title: 'H-Frame Layer Cage',
      caption: 'High-density vertical battery cages with automated longitudinal egg collection and continuous PP manure drying belts.',
      imageUrl: '/images/layer/h-frame-layer.jpg',
      targetSectionId: 'cage-architecture',
      slideIndex: 0,
      metrics: [
        { label: 'FLOCK CAPACITY', value: 'Customizable Multi-Tier' },
        { label: 'DIMENSIONS', value: '97m × 10m × 4.3m' },
      ],
    },
    {
      id: 'a-frame',
      optionNumber: 'Option 02',
      badge: 'Open-Sloped Structure',
      title: 'A-Frame Layer Cage',
      caption: 'Sloped A-frame cage configuration providing open visibility, effortless inspection, and natural cross-ventilation.',
      imageUrl: '/images/layer/a-frame-layer.jpg',
      targetSectionId: 'cage-architecture',
      slideIndex: 1,
      metrics: [
        { label: 'FLOCK CAPACITY', value: 'Scalable by Length' },
        { label: 'DIMENSIONS', value: '133m × 13m × 3.5m' },
      ],
    },
    {
      id: 'pullet-rearing',
      optionNumber: 'Option 03',
      badge: 'Pullet Growing Stage',
      title: 'H-Frame Pullet Rearing Cage',
      caption: 'High-density vertical battery cages customized for young growing chicks with tighter mesh spacing and streamlined zero-egg infrastructure.',
      imageUrl: '/images/layer/pullet-rearing-cage.jpg',
      targetSectionId: 'cage-architecture',
      slideIndex: 2,
      metrics: [
        { label: 'FLOCK CAPACITY', value: 'Customizable Multi-Tier' },
        { label: 'DIMENSIONS', value: '97m × 10m × 4.3m' },
      ],
    },
  ];

  const handleSelectLayerDesign = (option: HeroDesignOption) => {
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

  const layerDesignsList = [
    {
      id: 'h-frame',
      optionNumber: 'Design Option 01',
      badge: 'Vertical Multi-Tier',
      tabLabel: '1. H-Frame System',
      shortLabel: '1. H-Frame',
      title: 'H-Frame Layer Cage',
      description:
        'A high-density, multi-tier poultry housing system with cages vertically stacked on a rigid H-shaped structure. It typically integrates automated feeding, nipple drinking, egg collection, manure-belt removal, and ventilation systems for efficient, hygienic, and large-scale layer production.',
      buildingType: 'Pre-fabricated House',
      dimensions: '97m length × 10m width × 4.3m height',
      birdCapacity: 'Customizable',
      cageDetails: 'Scalable by Tier & House Length',
      stockingDensity: '450 sq cm / bird standard',
      manureHandling: 'Manure-Belt Removal',
      manureHandlingSub: 'Continuous automated PP belts under tiers for biosecure removal',
      eggCollection: 'Belt-Type Egg Collection',
      eggCollectionSub: 'Capacity up to 12,000 pcs/hr with egg buffer deceleration',
      imageUrl: '/images/layer/h-frame-layer.jpg',
      product: hFrameProduct,
      isAdded: isHFrameAdded,
      advantages: [
        'Vertically stacked cages on rigid H-shaped structure for high-density, large-scale commercial egg output',
        'Turnkey pre-fabricated house dimensions: 97m length × 10m width × 4.3m height scalable to client footprint',
        'High-efficiency multi-tier cage allocation engineered to 450 sq cm bird welfare density standards',
        'Full integration of automated feeding, nipple drinking, egg collection, manure-belt removal, and ventilation',
      ],
    },
    {
      id: 'a-frame',
      optionNumber: 'Design Option 02',
      badge: 'Open-Sloped Structure',
      tabLabel: '2. A-Frame System',
      shortLabel: '2. A-Frame',
      title: 'A-Frame Layer Cage',
      description:
        'A multi-tier poultry housing system with cages arranged in a sloped "A" configuration. It provides individual compartments for laying hens, with integrated feed troughs, nipple drinkers, egg-collection channels, and manual-disposal space beneath each tier. The open design supports ventilation, easy inspection, efficient egg collection, and straightforward operation and maintenance.',
      buildingType: 'Pre-fabricated House',
      dimensions: '133m length × 13m width × 3.5m height',
      birdCapacity: 'Customizable',
      cageDetails: 'Scalable by Tier & House Length',
      stockingDensity: '450 sq cm / bird standard',
      manureHandling: 'Manual-Disposal Space',
      manureHandlingSub: 'Dedicated open space beneath each tier for straightforward cleanout',
      eggCollection: 'Egg-Collection Channels',
      eggCollectionSub: 'Integrated frontal roll-out collection channels for easy inspection',
      imageUrl: '/images/layer/a-frame-layer.jpg',
      product: aFrameProduct,
      isAdded: isAFrameAdded,
      advantages: [
        'Sloped "A" configuration provides open visibility, superior airflow, and effortless flock inspection',
        'Turnkey pre-fabricated house dimensions: 133m length × 13m width × 3.5m height scalable to client footprint',
        'Open A-frame cage allocation engineered to 450 sq cm bird welfare density standards',
        'Integrated individual compartments with feed troughs, nipple drinkers, egg-collection channels, and sub-tier disposal',
      ],
    },
    {
      id: 'pullet-rearing',
      optionNumber: 'Design Option 03',
      badge: 'Pullet Growing Stage',
      tabLabel: '3. Pullet Rearing System',
      shortLabel: '3. Pullet Rearing',
      title: 'H-Frame Pullet Rearing Cage',
      description:
        'A specialized multi-tier vertical cage housing system engineered specifically for the pullet growing phase (day-old chicks up to pre-laying maturity). Built on an H-frame structure featuring customized cage dimensions and tighter wire mesh for young chicks. Unlike egg-laying setups, the rearing system does not include egg collection machinery while integrating precision nipple drinking, automated feeding, and continuous manure-belt evacuation.',
      buildingType: 'Pre-fabricated House',
      dimensions: '97m length × 10m width × 4.3m height',
      birdCapacity: 'Customizable',
      cageDetails: 'Scalable by Tier & House Length',
      stockingDensity: 'Specialized Chick-to-Pullet Density',
      manureHandling: 'Manure-Belt Removal',
      manureHandlingSub: 'Continuous automated PP belts under tiers for biosecure removal',
      eggCollection: 'None (Growing Phase)',
      eggCollectionSub: 'Dedicated growing stage for young chicks prior to egg-laying age',
      imageUrl: '/images/layer/pullet-rearing-cage.jpg',
      product: rearingProduct,
      isAdded: isRearingAdded,
      advantages: [
        'Operational Purpose: Purpose-built for the growing phase (pullet period) for young chicks before they reach egg-laying age',
        'Absence of Egg Collection: Birds in rearing do not lay eggs; system omits egg collection machinery, reducing cost and maintenance',
        'Cage Dimensions & Mesh Sizing: Visually similar to H-Frame, with cage heights and mesh sizes customized specifically for smaller chicks',
        'Automated Infrastructure: Integrated traveling hopper feeding, adjustable nipple lines with drip cups, and PP manure belts',
      ],
    },
  ];

  const currentDesign = layerDesignsList[activeSlideIndex] ?? layerDesignsList[0];

  const subSystems = [
    {
      title: 'Egg Handling & Centralized Cart Systems',
      image: '/images/layer/egg-handling.jpg',
      icon: Egg,
      description:
        'Specialized gentle egg handling infrastructure featuring automated Egg Collection System, cross-facility Egg Conveyor lines, and Centralized Feeding - Feed Cart integration ensuring minimal breakage and streamlined packing.',
      components: ['Egg Collection System', 'Egg Conveyor', 'Centralized Feeding - Feed Cart'],
      badge: '12,000 PCS/HR · BREAKAGE < 5‰',
    },
    {
      title: 'Controlled Climate System',
      image: '/images/layer/climate-control.jpg',
      icon: Wind,
      description:
        'An integrated climate regulation system that ensures stable internal housing conditions. Managed by EI Environmental Controllers (EI-8000PLUS and EI-1000C) and comprehensive ventilation equipment including F50 Butterfly Cone Fan, EI-50 Louvered Cone Fan, 50 Inverter Fan, 50 Shutter Direct-drive EC Fan, FRP Fans, and 55 Direct-drive EC fans.',
      components: ['EI-8000PLUS & EI-1000C Controllers', 'F50 Butterfly & Louvered Cone Fans', 'Inverter & Direct-Drive EC Fans', 'FRP Industrial Exhaust Fans'],
      badge: 'STABLE INTERNAL REGULATION',
    },
    {
      title: 'Heating System',
      image: '/images/layer/heating-system.jpg',
      icon: Flame,
      description:
        'A controlled heat distribution system to maintain optimal temperatures for bird comfort, growth, and survival throughout seasonal weather variations and critical pullet-to-layer transition phases.',
      components: ['Controlled Heat Distribution', 'Zone Temperature Regulators', 'Thermal Comfort Safeguards'],
      badge: 'COMFORT & SURVIVAL',
    },
    {
      title: 'Feeding System',
      image: '/images/layer/feeding-system.jpg',
      icon: Utensils,
      description:
        'Automated or semi-automated system that stores, meters, and uniformly distributes feed using controlled and integrated systems, preventing nutrient loss, feed degradation, and selective bird feeding.',
      components: ['Traveling Hopper (90L / 60kg)', 'H-Type Chain Feeding Option', 'Seamless Butt-Joint Troughs', 'Automatic Feed Recycle Unit'],
      badge: 'HIGH-PRECISION DISTRIBUTION',
    },
    {
      title: 'Drinking System',
      image: '/images/layer/drinking-system.jpg',
      icon: Droplets,
      description:
        'Automated water delivery system ensuring clean supply, uniform access, and regulated flow via integrated networks and controls. Equipped centrally with a V-shaped water tank to prevent spilled water from falling down onto the manure belt.',
      components: ['Central Drinking Lines', 'Stainless Nipple Drinkers', 'V-Shaped Spillage Catch Tank', 'Pressure Regulators & Filters'],
      badge: 'REGULATED CLEAN SUPPLY',
    },
    {
      title: 'Medication System',
      image: '/images/layer/medication-system.jpg',
      icon: Activity,
      description:
        'A system for delivering medications, vaccines, and supplements through water for accurate dosing and uniform flock treatment, powered by water-driven proportional dispensers and filtration manifolds.',
      components: ['Proportional Dosing Pumps', 'Accurate In-Line Delivery', 'Water-Borne Vaccine Dosing', 'Dual Manifold Filtration'],
      badge: 'ACCURATE DOSING · UNIFORM TREATMENT',
    },
  ];

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
            <span className="text-amber-400 font-medium">Layer Farm Operations</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] uppercase">
                <span className="text-white block">
                  Layer Farm<br />Operations
                </span>
                <span className="text-amber-400 block text-lg sm:text-xl lg:text-2xl font-extrabold tracking-wider mt-2.5">
                  Industrial Solutions
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Industrial commercial egg production and high-density layer housing engineering. From high-density vertical H-frame cages and open A-frame systems to dedicated pullet rearing houses, CCDI delivers turnkey prefabricated facilities built with automated egg collection, regulated feeding, controlled climate, and biosecure manure handling.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3.5 rounded-[2px] font-sans text-xs font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-slate-950" />
                  Inquire Layer Facility
                </button>

                {currentDesign.product && (
                  <button
                    type="button"
                    onClick={() => onToggleInquiry(currentDesign.product!)}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[2px] font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      currentDesign.isAdded
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
                options={heroLayerOptions}
                activeIndex={activeSlideIndex}
                onActiveIndexChange={(idx) => {
                  setActiveSlideIndex(idx);
                  swiperInstance?.slideTo(idx);
                }}
                onSelectOption={handleSelectLayerDesign}
                categoryLabel="LAYER DESIGN FORMATS"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CONTEXTUAL STICKY SUB-NAV ──────────────────────────── */}
      <PoultrySubNav activeTab="layer" />

      {/* ── 3. CAGE SYSTEM ARCHITECTURE: H-FRAME VS A-FRAME ──────── */}
      <section id="cage-architecture" className="relative py-20 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              LAYER HOUSING DESIGN OPTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Three Proven Commercial Layer &amp; Pullet Housing Configurations
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Select your preferred commercial production layout to review architectural blueprints, bird capacities,
              specialized cage dimensions, and industrial turnkey materials.
            </p>
          </div>

          {/* Interactive Toggle Switcher */}
          <div className="inline-flex flex-wrap p-1.5 bg-slate-100/90 rounded-xl border border-slate-200/80 gap-1.5 shadow-inner">
            {layerDesignsList.map((design, idx) => (
              <button
                key={design.id}
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
                {design.tabLabel}
              </button>
            ))}
          </div>

          {/* Swiper Slider with Parallax, Scrollbar, Mousewheel & Side Navigation Arrows */}
          <div className="relative">
            {/* Side Navigation Arrow - Previous */}
            <button
              type="button"
              className="layer-side-prev absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 border border-slate-300 text-[#0B192C] hover:bg-[#0B192C] hover:text-white hover:border-[#0B192C] transition-all shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer group disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Previous housing option"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5] transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Side Navigation Arrow - Next */}
            <button
              type="button"
              className="layer-side-next absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 border border-slate-300 text-[#0B192C] hover:bg-[#0B192C] hover:text-white hover:border-[#0B192C] transition-all shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer group disabled:opacity-30 disabled:pointer-events-none"
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
                el: '.layer-swiper-scrollbar',
              }}
              navigation={{
                prevEl: '.layer-side-prev, .layer-swiper-prev',
                nextEl: '.layer-side-next, .layer-swiper-next',
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

              {layerDesignsList.map((design) => (
                <SwiperSlide key={design.id} className="h-auto">
                  <HousingDesignSlide
                    optionLabel={design.optionNumber}
                    badge={design.badge}
                    title={design.title}
                    imageUrl={design.imageUrl}
                    overview={design.description}
                    metrics={[
                      { label: 'Total Bird Capacity', value: design.birdCapacity, sub: `${design.cageDetails} (${design.stockingDensity})`, primary: true },
                      { label: 'Building Dimensions', value: design.dimensions, sub: 'Length × Width × Height', primary: true },
                      { label: 'Building Type', value: design.buildingType, sub: 'Industrial pre-engineered steel structure' },
                      { label: 'Manure Removal System', value: design.manureHandling, sub: design.manureHandlingSub },
                    ]}
                    advantages={design.advantages}
                    solutionType="layer"
                    solutionName={design.title}
                    isAdded={design.isAdded}
                    onToggleInquiry={() => {
                      if (design.product) onToggleInquiry(design.product);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Bottom Controls Bar: Centered Page Indicator & Scrollbar */}
            <div className="mt-4 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-slate-200/80 p-3 sm:px-5 rounded-xl shadow-xs">
              {/* Draggable Scrollbar Track - Centered */}
              <div className="w-full max-w-md flex flex-col gap-1.5">
                <div className="layer-swiper-scrollbar !relative !h-2 !bg-slate-200/70 rounded-full overflow-hidden cursor-pointer" />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  <span className={activeSlideIndex === 0 ? 'text-[#0B192C] font-bold' : ''}>1. H-Frame</span>
                  <span className={activeSlideIndex === 1 ? 'text-[#0B192C] font-bold' : ''}>2. A-Frame</span>
                  <span className={activeSlideIndex === 2 ? 'text-[#0B192C] font-bold' : ''}>3. Pullet Rearing</span>
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
              .layer-swiper-scrollbar .swiper-scrollbar-drag {
                background: #0B192C !important;
                border-radius: 9999px !important;
                cursor: grab;
                transition: background-color 0.2s ease;
              }
              .layer-swiper-scrollbar .swiper-scrollbar-drag:hover,
              .layer-swiper-scrollbar .swiper-scrollbar-drag:active {
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
        sourceBrochure="CCDI Commercial Layer Operations engineering brochure"
      />

      {/* ── 4. INTEGRATED LAYER SUB-SYSTEMS (DARK THEME) ───────────── */}
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
              LAYER AUTOMATION & CONTROL
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Integrated Layer Sub-Systems
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Our pre-fabricated layer housing integrates six critical sub-systems engineered for seamless automated operations, flock welfare, gentle egg handling, and bio-hygienic environment regulation:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subSystems.map((sys, idx) => {
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
      <PoultryRetrofitCallout currentCategory="Layer Farm" />

      {/* ── 6. CONTACT & INQUIRY SECTION */}
      <ContactSection
        inquiryItems={inquiryItems}
        onRemoveInquiryItem={onRemoveInquiryItem}
      />

    </div>
  );
};
