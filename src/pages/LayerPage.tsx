import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  CheckCircle2,
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
import type { Product } from '../data/mockProducts';
import { LAYER_CATALOG_PRODUCTS } from '../data/layerCatalogProducts';
import { PoultrySubNav } from '../components/molecules/PoultrySubNav';
import { PrefabricatedMaterialsSection } from '../components/organisms/PrefabricatedMaterialsSection';
import { CategoryAccessoriesCatalog } from '../components/organisms/CategoryAccessoriesCatalog';
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
  const [selectedDesign, setSelectedDesign] = useState<'h-frame' | 'a-frame'>('h-frame');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const hFrameProduct = LAYER_CATALOG_PRODUCTS.find((p) => p.id === 'pf-layer-hframe');
  const aFrameProduct = LAYER_CATALOG_PRODUCTS.find((p) => p.id === 'pf-layer-aframe');

  const isHFrameAdded = hFrameProduct ? inquiryItems.some((item) => item.id === hFrameProduct.id) : false;
  const isAFrameAdded = aFrameProduct ? inquiryItems.some((item) => item.id === aFrameProduct.id) : false;

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const offset = 72;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      window.scrollTo({ top: elementRect - bodyRect - offset, behavior: 'smooth' });
    }
  };

  const layerDesigns = {
    'h-frame': {
      optionNumber: 'DESIGN OPTION 01',
      badge: 'HIGH-DENSITY H-FRAME',
      title: 'H-Frame Layer Cage',
      description:
        'A high-density, multi-tier poultry housing system with cages vertically stacked on a rigid H-shaped structure. It typically integrates automated feeding, nipple drinking, egg collection, manure-belt removal, and ventilation systems for efficient, hygienic, and large-scale layer production.',
      buildingType: 'Pre-fabricated House',
      dimensions: '97m length × 10m width × 4.3m height',
      birdCapacity: '45,000 Birds',
      cageDetails: '36 birds per cage',
      stockingDensity: '450 sq cm bird density',
      manureHandling: 'Manure-Belt Removal',
      manureHandlingSub: 'Continuous automated PP belts under tiers for biosecure removal',
      eggCollection: 'Belt-Type Egg Collection',
      eggCollectionSub: 'Capacity up to 12,000 pcs/hr with egg buffer deceleration',
      imageUrl: '/images/layer/h-frame-layer.jpg',
      product: hFrameProduct,
      isAdded: isHFrameAdded,
      advantages: [
        'Vertically stacked cages on rigid H-shaped structure for high-density, large-scale commercial egg output',
        'Turnkey pre-fabricated house dimensions: 97m length × 10m width × 4.3m height for 45,000 bird capacity',
        'Cage allocation of 36 birds per cage calibrated to 450 sq cm bird density',
        'Full integration of automated feeding, nipple drinking, egg collection, manure-belt removal, and ventilation',
      ],
    },
    'a-frame': {
      optionNumber: 'DESIGN OPTION 02',
      badge: 'OPEN SLOPED A-FRAME',
      title: 'A-Frame Layer Cage',
      description:
        'A multi-tier poultry housing system with cages arranged in a sloped "A" configuration. It provides individual compartments for laying hens, with integrated feed troughs, nipple drinkers, egg-collection channels, and manual-disposal space beneath each tier. The open design supports ventilation, easy inspection, efficient egg collection, and straightforward operation and maintenance.',
      buildingType: 'Pre-fabricated House',
      dimensions: '133m length × 13m width × 3.5m height',
      birdCapacity: '30,000 Birds',
      cageDetails: '20 birds per cage',
      stockingDensity: '450 sq cm bird density',
      manureHandling: 'Manual-Disposal Space',
      manureHandlingSub: 'Dedicated open space beneath each tier for straightforward cleanout',
      eggCollection: 'Egg-Collection Channels',
      eggCollectionSub: 'Integrated frontal roll-out collection channels for easy inspection',
      imageUrl: '/images/layer/a-frame-layer.jpg',
      product: aFrameProduct,
      isAdded: isAFrameAdded,
      advantages: [
        'Sloped "A" configuration provides open visibility, superior airflow, and effortless flock inspection',
        'Turnkey pre-fabricated house dimensions: 133m length × 13m width × 3.5m height for 30,000 bird capacity',
        'Cage allocation of 20 birds per cage calibrated to 450 sq cm bird density',
        'Integrated individual compartments with feed troughs, nipple drinkers, egg-collection channels, and sub-tier disposal',
      ],
    },
  };

  const currentDesign = layerDesigns[selectedDesign];

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
                Industrial commercial egg production and high-density layer housing engineering. From 45,000-capacity vertical H-frame cages to 30,000-capacity open A-frame systems, CCDI delivers turnkey prefabricated facilities built with automated egg collection, regulated feeding, controlled climate, and biosecure manure handling.
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
                        Add Standard Module to Inquiry
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Right Quick Metric Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#0B192C] border-2 border-amber-400/40 rounded-[2px] p-6 sm:p-8 shadow-2xl space-y-6 relative">
                <div className="absolute -top-3 right-4 bg-amber-400 text-slate-950 font-mono text-[10px] uppercase font-normal px-2 py-0.5 rounded-[2px] tracking-wider">
                  STANDARD MODULE
                </div>

                <div className="border-b border-[#1E3E66] pb-4">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block mb-1 font-normal">
                    ENGINEERING MODULE BENCHMARK
                  </span>
                  <div className="text-3xl font-black text-white font-mono">
                    {currentDesign.dimensions.split(' ')[0]} × {currentDesign.dimensions.split(' × ')[1] || '10m × 4.3m'}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-normal">
                    Pre-fabricated commercial layer envelope engineered for high-density table egg production.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#07162A] p-3.5 rounded-[2px] border border-[#1E3E66]">
                    <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider block font-normal">
                      FLOCK CAPACITY
                    </span>
                    <span className="text-xl font-black text-white font-mono mt-1 block">
                      {currentDesign.birdCapacity}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5 font-normal">
                      {currentDesign.title}
                    </span>
                  </div>

                  <div className="bg-[#07162A] p-3.5 rounded-[2px] border border-[#1E3E66]">
                    <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider block font-normal">
                      STOCKING DENSITY
                    </span>
                    <span className="text-xl font-black text-white font-mono mt-1 block">
                      450 <span className="text-xs font-normal text-slate-400">sq cm</span>
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5 font-normal">
                      Bird Density Standard
                    </span>
                  </div>

                  <div className="bg-[#07162A] p-3.5 rounded-[2px] border border-[#1E3E66]">
                    <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider block font-normal">
                      CAGE OCCUPANCY
                    </span>
                    <span className="text-sm font-black text-white mt-1 block">
                      {currentDesign.cageDetails}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5 font-normal">
                      Per Cage Cell
                    </span>
                  </div>

                  <div className="bg-[#07162A] p-3.5 rounded-[2px] border border-[#1E3E66]">
                    <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider block font-normal">
                      BUILDING TYPE
                    </span>
                    <span className="text-sm font-black text-white mt-1 block">
                      {currentDesign.buildingType}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5 font-normal">
                      Engineered Steel
                    </span>
                  </div>
                </div>
              </div>
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
              Two Proven Commercial Layer Housing Configurations
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Select your preferred commercial layer production layout to review architectural blueprints, bird capacities,
              cage stocking density, and industrial materials.
            </p>
          </div>

          {/* Interactive Toggle Switcher */}
          <div className="inline-flex flex-wrap p-1 bg-slate-100 rounded-[2px] border border-slate-200 gap-1">
            <button
              type="button"
              onClick={() => setSelectedDesign('h-frame')}
              className={`px-4 sm:px-5 py-2.5 rounded-[2px] text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                selectedDesign === 'h-frame'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              1. H-Frame Layer Cage (45,000 Birds)
            </button>
            <button
              type="button"
              onClick={() => setSelectedDesign('a-frame')}
              className={`px-4 sm:px-5 py-2.5 rounded-[2px] text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                selectedDesign === 'a-frame'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              2. A-Frame Layer Cage (30,000 Birds)
            </button>
          </div>

          {/* Selected Design Card */}
          <motion.div
            key={selectedDesign}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-50 border border-slate-200 rounded-[2px] p-6 sm:p-10 shadow-xs"
          >
            {/* Dark Accent Graphic - Lower Right Anchored */}
            <img
              src="/images/accents/dark-accent-graphic.png"
              alt=""
              className="absolute -bottom-10 -right-10 w-72 sm:w-96 lg:w-[460px] h-auto object-contain object-right-bottom pointer-events-none select-none z-0 opacity-25"
              aria-hidden="true"
            />

            {/* Visual Media Showcase */}
            <div className="relative z-10 lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="relative rounded-[2px] overflow-hidden border border-slate-200 bg-white p-5 sm:p-6 text-slate-900 text-center space-y-4 shadow-xs">
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3 font-sans text-xs uppercase tracking-wider">
                  <span className="text-slate-500 font-bold">
                    {currentDesign.optionNumber}
                  </span>
                  <span className="text-amber-800 font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-[2px]">
                    {currentDesign.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#0B192C] uppercase text-left">
                  {currentDesign.title}
                </h3>

                <div className="relative w-full h-64 sm:h-72 rounded-[2px] overflow-hidden bg-slate-900 border border-slate-200 group shadow-inner">
                  <img
                    src={currentDesign.imageUrl}
                    alt={currentDesign.title}
                    className="w-full h-full object-cover brightness-95"
                  />
                  <img
                    src="/images/accents/card-corner-accent.png"
                    alt=""
                    className="absolute top-0 right-0 w-28 sm:w-36 h-auto object-contain object-right-top pointer-events-none select-none z-10 drop-shadow-sm"
                    aria-hidden="true"
                  />
                </div>

                <p className="text-slate-600 text-xs text-left leading-relaxed">
                  {currentDesign.description}
                </p>

                {/* Inquiry Action */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (currentDesign.product) onToggleInquiry(currentDesign.product);
                    }}
                    className={`w-full py-3 px-4 rounded-[2px] font-sans text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                      currentDesign.isAdded
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'bg-[#0B192C] text-white hover:bg-slate-800 shadow-xs'
                    }`}
                  >
                    {currentDesign.isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Attached to Inquiry Drawer</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Attach Building Package to Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Technical Parameters & Specifications */}
            <div className="relative z-10 lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold block">
                  TECHNICAL METRICS & CAPACITIES
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 uppercase block font-bold">Total Bird Capacity</span>
                    <span className="text-xl font-normal text-[#0B192C] font-mono">
                      {currentDesign.birdCapacity}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      {currentDesign.cageDetails} ({currentDesign.stockingDensity})
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 uppercase block font-bold">Building Dimensions</span>
                    <span className="text-xl font-normal text-[#0B192C] font-mono">
                      {currentDesign.dimensions}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1">Length × Width × Height</span>
                  </div>

                  <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 uppercase block font-bold">Building Type</span>
                    <span className="text-lg font-normal text-amber-700 font-mono">
                      {currentDesign.buildingType}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      Industrial pre-engineered steel structure
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 uppercase block font-bold">Manure Removal System</span>
                    <span className="text-lg font-normal text-slate-900 font-mono">
                      {currentDesign.manureHandling}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1">{currentDesign.manureHandlingSub}</span>
                  </div>
                </div>

                {/* Key Advantage Highlights */}
                <div className="space-y-2 pt-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold block">
                    ENGINEERING ADVANTAGES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                    {currentDesign.advantages.map((adv, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-white p-3 border border-slate-200 rounded-[2px]">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="font-sans text-xs text-slate-700">{adv}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

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

      {/* ── 5. ACCESSORIES, SPARE PARTS & EQUIPMENT LISTING CATALOG ─ */}
      <CategoryAccessoriesCatalog
        businessUnit="Poultry Farm Equipment"
        eyebrow="ACCESSORIES, SPARE PARTS & EQUIPMENT LISTING"
        title="Commercial Layer Equipment & Automation Catalog"
        subtitle="Explore CCDI's complete line of traveling hopper cages, chain feeding systems, gentle belt egg collectors, buffers, PVC shielders, and maintenance hardware."
        inquiryItems={inquiryItems}
        onToggleInquiry={onToggleInquiry}
        accentTheme="amber"
        customProducts={LAYER_CATALOG_PRODUCTS}
      />

      {/* ── 6. CONTACT & INQUIRY SECTION ───────────────────────────── */}
      <ContactSection
        inquiryItems={inquiryItems}
        onRemoveInquiryItem={onRemoveInquiryItem}
      />

    </div>
  );
};
