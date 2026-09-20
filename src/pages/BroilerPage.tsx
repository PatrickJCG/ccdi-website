import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  CheckCircle2,
  Plus,
  Check,
  PhoneCall,
  Wind,
  Utensils,
  Layers,
  Truck,
} from 'lucide-react';
import type { Product } from '../data/mockProducts';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { PoultrySubNav } from '../components/molecules/PoultrySubNav';
import { PrefabricatedMaterialsSection } from '../components/organisms/PrefabricatedMaterialsSection';
import { CategoryAccessoriesCatalog } from '../components/organisms/CategoryAccessoriesCatalog';
import { ContactSection } from '../components/organisms/ContactSection';
import { BROILER_CATALOG_PRODUCTS } from '../data/broilerCatalogProducts';

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
  const [selectedDesign, setSelectedDesign] = useState<'cage' | 'elevated' | 'floor'>('cage');

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

  const housingDesigns = {
    cage: {
      optionNumber: 'DESIGN OPTION 01',
      badge: 'MULTI-TIER CAGE SYSTEM',
      title: 'Multi-Tier Cage System',
      description:
        'An intensive poultry housing solution designed to maximize vertical space through the use of multi-tier cages. It features integrated systems for feeding, drinking, ventilation, and manure removal, with options for manual or automatic harvesting systems.',
      buildingType: 'Prefabricated House',
      dimensions: '16m x 110m x 4m–4.2m',
      birdCapacity: '80,000 @ 1.8kg',
      floorArchitecture: 'Multi-Tier Vertical Battery',
      floorArchSub: 'Maximized vertical space utilization',
      ventilationSystem: 'Integrated Negative Pressure Tunnel',
      ventilationSub: 'Balanced multi-tier longitudinal air velocity',
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
    elevated: {
      optionNumber: 'DESIGN OPTION 02',
      badge: 'ELEVATED-FLOOR BROILER HOUSE',
      title: 'Elevated-Floor Broiler House',
      description:
        'A broiler housing system utilizing a raised floor design that improves bird manure management, environmental airflow, and internal hygiene.',
      buildingType: 'Prefabricated House',
      dimensions: '18m x 156m x 2.4m',
      birdCapacity: '55,000 @ 1.8kg',
      floorArchitecture: 'Raised Slatted Deck',
      floorArchSub: 'Sub-floor manure clearance & natural separation',
      ventilationSystem: 'Negative Pressure Tunnel',
      ventilationSub: '2.5–3.2 m/s wind-chill microclimate cooling',
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
    floor: {
      optionNumber: 'DESIGN OPTION 03',
      badge: 'FLOOR-TYPE BROILER HOUSE',
      title: 'Floor-Type Broiler House',
      description:
        'A ground-level broiler housing system where birds are raised on solid or slatted floors within a controlled environment, utilizing horizontal space structure.',
      buildingType: 'Prefabricated House',
      dimensions: '16m x 138m x 2.4m',
      birdCapacity: '36,000 @ 1.8kg',
      floorArchitecture: 'Solid or Slatted Floors',
      floorArchSub: 'Horizontal ground-level bed distribution',
      ventilationSystem: 'Negative Pressure Tunnel',
      ventilationSub: '50" & 54" butterfly cone fan exhaust banks',
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
  };

  const currentDesign = housingDesigns[selectedDesign];


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
                Industrial meat bird housing and automated climate engineering. From 80,000-bird multi-tier cage batteries and elevated slatted floors to ground-level tunnel houses, CCDI delivers turnkey prefabricated facilities built for tropical climate resilience.
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
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block mb-1">
                    ENGINEERING MODULE BENCHMARK
                  </span>
                  <div className="text-3xl font-black text-white font-mono">
                    18m × 156m × 2.4m
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Pre-fabricated elevated broiler envelope engineered for rapid turnaround and biosecurity.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#07162A] p-3.5 rounded-[2px] border border-[#1E3E66]">
                    <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                      FLOCK CAPACITY
                    </span>
                    <span className="text-xl font-black text-white font-mono mt-1 block">
                      55,000
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Elevated Slat Layout
                    </span>
                  </div>

                  <div className="bg-[#07162A] p-3.5 rounded-[2px] border border-[#1E3E66]">
                    <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                      WIND RESISTANCE
                    </span>
                    <span className="text-xl font-black text-white font-mono mt-1 block">
                      200–280 <span className="text-xs font-normal text-slate-400">kph</span>
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Typhoon load standard
                    </span>
                  </div>

                  <div className="bg-[#07162A] p-3.5 rounded-[2px] border border-[#1E3E66]">
                    <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                      TUNNEL AIR SPEED
                    </span>
                    <span className="text-sm font-black text-white mt-1 block">
                      2.5–3.2 m/s
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Wind-Chill Microclimate
                    </span>
                  </div>

                  <div className="bg-[#07162A] p-3.5 rounded-[2px] border border-[#1E3E66]">
                    <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                      FLOCK CLEANOUT
                    </span>
                    <span className="text-sm font-black text-white mt-1 block">
                      10–14 Days
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Rapid Turnaround Cycle
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CONTEXTUAL STICKY SUB-NAV ──────────────────────────── */}
      <PoultrySubNav activeTab="broiler" />

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
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              BROILER HOUSING DESIGN OPTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Three Proven Broiler Housing Systems
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Select your preferred broiler production format to review architectural blueprints, capacity ratios,
              air handling characteristics, and turnkey materials.
            </p>
          </div>

          {/* Interactive Toggle Switcher */}
          <div className="inline-flex flex-wrap p-1 bg-slate-100 rounded-[2px] border border-slate-200 gap-1">
            <button
              type="button"
              onClick={() => setSelectedDesign('cage')}
              className={`px-4 sm:px-5 py-2.5 rounded-[2px] text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                selectedDesign === 'cage'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              1. Multi-Tier Cage System (80k Birds)
            </button>
            <button
              type="button"
              onClick={() => setSelectedDesign('elevated')}
              className={`px-4 sm:px-5 py-2.5 rounded-[2px] text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                selectedDesign === 'elevated'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              2. Elevated-Floor Broiler House (55k Birds)
            </button>
            <button
              type="button"
              onClick={() => setSelectedDesign('floor')}
              className={`px-4 sm:px-5 py-2.5 rounded-[2px] text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                selectedDesign === 'floor'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              3. Floor-Type Broiler House (36k Birds)
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
                    <span className="text-[11px] font-mono text-slate-500 uppercase block">Total Bird Capacity</span>
                    <span className="text-xl font-normal text-[#0B192C] font-mono">
                      {currentDesign.birdCapacity}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1">Commercial stocking benchmark</span>
                  </div>

                  <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 uppercase block">Building Dimensions</span>
                    <span className="text-xl font-normal text-[#0B192C] font-mono">
                      {currentDesign.dimensions}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1">Width x Length x Eave Height</span>
                  </div>

                  <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 uppercase block">Building Type</span>
                    <span className="text-lg font-normal text-amber-700 font-mono">
                      {currentDesign.buildingType}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      {currentDesign.floorArchSub}
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 uppercase block">Ventilation System</span>
                    <span className="text-lg font-normal text-slate-900 font-mono">
                      {currentDesign.ventilationSystem}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1">{currentDesign.ventilationSub}</span>
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
                        <span>{adv}</span>
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
              CORE OPERATIONAL SUB-SYSTEMS
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Integrated Support Systems
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              These housing environments are supported by a suite of core operational sub-systems engineered for seamless automation, biosecurity, and peak flock performance:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sub-system 1: Controlled Climate & Heating */}
            <div className="bg-[#0F223D] border border-slate-700/60 rounded-[2px] overflow-hidden flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-amber-500/5">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src="/images/broiler/climate-system.jpg"
                    alt="Controlled Climate System and Heating System"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D] via-transparent to-transparent opacity-90" />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-[2px] bg-[#0B192C]/85 backdrop-blur-xs border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
                    <Wind className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    Controlled Climate System and Heating System
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Integrated negative pressure tunnel ventilation, high-efficiency butterfly cone fans, evaporative cellulose wet cooling pads, and radiant heating brooders for precise brooding climate control.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>TUNNEL & HEATING</span>
                  <span className="text-amber-400 font-semibold">2.5–3.2 m/s</span>
                </div>
              </div>
            </div>

            {/* Sub-system 2: Feeding & Drinking */}
            <div className="bg-[#0F223D] border border-slate-700/60 rounded-[2px] overflow-hidden flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-amber-500/5">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src="/images/broiler/feeding-drinking-system.jpg"
                    alt="Feeding System and Drinking System"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D] via-transparent to-transparent opacity-90" />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-[2px] bg-[#0B192C]/85 backdrop-blur-xs border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
                    <Utensils className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    Feeding System and Drinking System
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Automated flex-auger feed delivery with 330mm anti-spill broiler pans, bulk outdoor galvanized silos, and enclosed stainless steel 360° nipple drinking lines with single-arm drip cups.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>FEED & HYDRATION</span>
                  <span className="text-amber-400 font-semibold">360° Nipples</span>
                </div>
              </div>
            </div>

            {/* Sub-system 3: Manure Removal */}
            <div className="bg-[#0F223D] border border-slate-700/60 rounded-[2px] overflow-hidden flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-amber-500/5">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src="/images/broiler/manure-removal-system.jpg"
                    alt="Manure Removal System"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D] via-transparent to-transparent opacity-90" />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-[2px] bg-[#0B192C]/85 backdrop-blur-xs border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    Manure Removal System
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Automated continuous multi-tier polypropylene (PP) manure belts for cage systems or raised slatted floor clearing zones for elevated houses, eliminating ammonia accumulation and maintaining internal hygiene.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>HYGIENE & REMOVAL</span>
                  <span className="text-amber-400 font-semibold">Daily Cleanout</span>
                </div>
              </div>
            </div>

            {/* Sub-system 4: Automated / Manual Harvest */}
            <div className="bg-[#0F223D] border border-slate-700/60 rounded-[2px] overflow-hidden flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-amber-500/5">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src="/images/broiler/harvest-system.jpg"
                    alt="Fully Automated Harvest or Manual Harvest setups"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D] via-transparent to-transparent opacity-90" />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-[2px] bg-[#0B192C]/85 backdrop-blur-xs border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
                    <Truck className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    Fully Automated Harvest or Manual Harvest setups
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Tailored harvesting setups with fully automated catching conveyor options or clear-span manual harvest corridors with winch-to-ceiling line clearance, ensuring rapid 10–14 day flock turnaround.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>FLOCK HARVEST</span>
                  <span className="text-amber-400 font-semibold">10–14 Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. BROILER EQUIPMENT & ACCESSORIES CATALOG ─────────────── */}
      <CategoryAccessoriesCatalog
        businessUnit="Poultry Farm Equipment"
        eyebrow="BROILER EQUIPMENT INQUIRY"
        title="Broiler Farm Equipment & Automation Catalog"
        subtitle="Explore CCDI's complete line of broiler cages, feeding pans, nipple drinking manifolds, climate computers, fans, and prefabricated houses."
        inquiryItems={inquiryItems}
        onToggleInquiry={onToggleInquiry}
        accentTheme="amber"
        customProducts={BROILER_CATALOG_PRODUCTS}
      />

      {/* ── 7. CONTACT & INQUIRY SECTION ───────────────────────────── */}
      <ContactSection
        inquiryItems={inquiryItems}
        onRemoveInquiryItem={onRemoveInquiryItem}
      />

    </div>
  );
};
