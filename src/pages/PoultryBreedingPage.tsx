import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Plus,
  Check,
  ChevronRight,
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
} from 'lucide-react';
import type { Product } from '../data/mockProducts';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { PoultrySubNav } from '../components/molecules/PoultrySubNav';
import { ContactSection } from '../components/organisms/ContactSection';
import { PrefabricatedMaterialsSection } from '../components/organisms/PrefabricatedMaterialsSection';
import { CategoryAccessoriesCatalog } from '../components/organisms/CategoryAccessoriesCatalog';
import { POULTRY_BREEDER_ACCESSORIES } from '../data/poultryBreederAccessories';

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
  const [selectedDesign, setSelectedDesign] = useState<'american' | 'european'>('american');
  const [americanViewMode, setAmericanViewMode] = useState<'3d' | 'interior' | 'video'>('3d');
  const [europeanViewMode, setEuropeanViewMode] = useState<'3d' | 'interior' | 'video'>('3d');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; caption?: string; isVideo?: boolean } | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Find products in mock catalog for inquiry toggle
  const americanProduct = MOCK_PRODUCTS.find((p) => p.id === 'pf-breeder-01');
  const europeanProduct = MOCK_PRODUCTS.find((p) => p.id === 'pf-breeder-02');

  const isAmericanAdded = americanProduct ? inquiryItems.some((item) => item.id === americanProduct.id) : false;
  const isEuropeanAdded = europeanProduct ? inquiryItems.some((item) => item.id === europeanProduct.id) : false;

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
      image: '/images/breeder/american-type-3d.png',
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

                {americanProduct && (
                  <button
                    type="button"
                    onClick={() => onToggleInquiry(americanProduct)}
                    className={`px-5 py-3.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold border transition-colors cursor-pointer flex items-center gap-2 ${
                      isAmericanAdded
                        ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 hover:bg-emerald-500/30'
                        : 'bg-[#102A43] border-[#1E3E66] text-white hover:border-amber-400/60'
                    }`}
                  >
                    {isAmericanAdded ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        Inquiry Added [10,890 Birds]
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
                    14m × 134m × 2.9m
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Pre-fabricated broiler breeder structure engineered for tropical climate resilience.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#07162A] p-3.5 rounded-[2px] border border-[#1E3E66]">
                    <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                      FLOCK CAPACITY
                    </span>
                    <span className="text-xl font-black text-white font-mono mt-1 block">
                      10,890
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      9,900 Female + 990 Male
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
                      FLOOR CONFIGURATIONS
                    </span>
                    <span className="text-sm font-black text-white mt-1 block">
                      1/3 or 2/3 Slat
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      American vs. European
                    </span>
                  </div>

                  <div className="bg-[#07162A] p-3.5 rounded-[2px] border border-[#1E3E66]">
                    <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                      WALL INSULATION
                    </span>
                    <span className="text-sm font-black text-white mt-1 block">
                      PU Sandwich 50mm
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Density 40 ±2 kg/m³
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contextual Sticky Sub-Nav ── */}
      <PoultrySubNav activeTab="broiler-breeder" />

      {/* ── 2. HOUSING SYSTEM ARCHITECTURE (AMERICAN VS EUROPEAN TYPE) ──────────── */}
      <section className="relative py-20 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
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
          <div className="inline-flex flex-wrap p-1 bg-slate-100 rounded-[2px] border border-slate-200 gap-1">
            <button
              type="button"
              onClick={() => setSelectedDesign('american')}
              className={`px-4 sm:px-5 py-2.5 rounded-[2px] text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                selectedDesign === 'american'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              1. American Type Design (1/3 Slat)
            </button>
            <button
              type="button"
              onClick={() => setSelectedDesign('european')}
              className={`px-4 sm:px-5 py-2.5 rounded-[2px] text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                selectedDesign === 'european'
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              2. European Type Design (2/3 Slat)
            </button>
          </div>

          {/* Selected Design Feature Card */}
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

            {/* Visual Graphic Representation */}
            <div className="relative z-10 lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="relative rounded-[2px] overflow-hidden border border-slate-200 bg-white p-5 sm:p-6 text-slate-900 text-center space-y-4 shadow-xs">
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3 font-sans text-xs uppercase tracking-wider">
                  <span className="text-slate-500 font-bold">
                    {selectedDesign === 'american' ? 'DESIGN OPTION 01' : 'DESIGN OPTION 02'}
                  </span>
                  <span className="text-amber-800 font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-[2px]">
                    {selectedDesign === 'american' ? '1/3 SLAT LAYOUT' : '2/3 SLAT LAYOUT'}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#0B192C] uppercase text-left">
                  {selectedDesign === 'american' ? 'American Type Breeder House' : 'European Type Breeder House'}
                </h3>

                {selectedDesign === 'american' ? (
                  /* ── Real American Type Images (3D Cutaway & Farm Interior) ── */
                  <div className="space-y-3 text-left">
                    {/* Media Display Container */}
                    <div className="relative w-full h-64 sm:h-72 rounded-[2px] overflow-hidden bg-slate-900 border border-slate-200 group shadow-inner">
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
                            key={americanViewMode}
                            src={
                              americanViewMode === '3d'
                                ? '/images/breeder/american-type-3d.png'
                                : '/images/breeder/american-type-interior.jpg'
                            }
                            alt={
                              americanViewMode === '3d'
                                ? 'American Type 3D Cutaway Architectural Model'
                                : 'American Type Actual Barn Interior'
                            }
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.25 }}
                            className={`w-full h-full ${
                              americanViewMode === '3d'
                                ? 'object-contain p-2 bg-gradient-to-b from-[#0B1E36] to-[#040D18]'
                                : 'object-cover brightness-[0.95]'
                            }`}
                          />
                        </AnimatePresence>
                      )}

                      {/* Architectural Top-Right Corner Accent */}
                      {americanViewMode !== 'video' && (
                        <img
                          src="/images/accents/card-corner-accent.png"
                          alt=""
                          className="absolute top-0 right-0 w-28 sm:w-36 h-auto object-contain object-right-top pointer-events-none select-none z-10 drop-shadow-sm"
                          aria-hidden="true"
                        />
                      )}

                      {/* Expand / Lightbox Button */}
                      <button
                        type="button"
                        onClick={() =>
                          setLightboxImage({
                            url:
                              americanViewMode === 'video'
                                ? '/videos/poultry-breeding-american.mp4'
                                : americanViewMode === '3d'
                                ? '/images/breeder/american-type-3d.png'
                                : '/images/breeder/american-type-interior.jpg',
                            title:
                              americanViewMode === 'video'
                                ? 'American Type Breeder House - 3D Facility Video Tour'
                                : americanViewMode === '3d'
                                ? 'American Type Breeder House (1/3 Slat) - 3D Architectural Model'
                                : 'American Type Breeder House - Facility Barn Interior',
                            caption:
                              americanViewMode === 'video'
                                ? 'Complete 3D facility simulation showing building aerodynamics, feeding loops, and internal bird flow.'
                                : americanViewMode === '3d'
                                ? 'Pre-fabricated broiler breeder structure (14m x 134m x 2.9m) showing dual lateral nest rows along sidewalls and central scratch area.'
                                : 'Lateral nest boxes along sidewalls with suspended automated red feeder pans and ceiling fans.',
                            isVideo: americanViewMode === 'video',
                          })
                        }
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-[2px] bg-white/90 hover:bg-amber-400 hover:text-slate-950 text-slate-800 border border-slate-200 transition-colors backdrop-blur-md cursor-pointer shadow-md z-20"
                        title="Inspect Full Resolution"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Media View Toggle Buttons (3-Tab: 3D, Interior, Video) */}
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setAmericanViewMode('3d')}
                        className={`px-2 py-1.5 rounded-[2px] text-xs font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                          americanViewMode === '3d'
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-xs'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-950'
                        }`}
                      >
                        <Images className="w-3.5 h-3.5" />
                        <span>3D Model</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAmericanViewMode('interior')}
                        className={`px-2 py-1.5 rounded-[2px] text-xs font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                          americanViewMode === 'interior'
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-xs'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-950'
                        }`}
                      >
                        <Images className="w-3.5 h-3.5" />
                        <span>Barn Photo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAmericanViewMode('video')}
                        className={`px-2 py-1.5 rounded-[2px] text-xs font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                          americanViewMode === 'video'
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-xs'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-950'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Video Tour</span>
                      </button>
                    </div>

                    {/* Floor Plan Schematic Summary */}
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-[2px] space-y-2 font-sans text-xs">
                      <div className="text-amber-800 font-bold border-b border-slate-200 pb-1.5 text-xs uppercase tracking-wider">
                        FLOOR LAYOUT DYNAMICS:
                      </div>
                      <div className="text-slate-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                        <span><strong>1/3 Slat Ratio:</strong> Lateral rows along sidewalls</span>
                      </div>
                      <div className="text-slate-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                        <span><strong>Center Arena:</strong> Free bird movement & natural mating</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── Real European / EURO Type Images (3D Cutaway, Barn Photo & Video) ── */
                  <div className="space-y-3 text-left">
                    {/* Media Display Container */}
                    <div className="relative w-full h-64 sm:h-72 rounded-[2px] overflow-hidden bg-slate-900 border border-slate-200 group shadow-inner">
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
                            key={europeanViewMode}
                            src={
                              europeanViewMode === '3d'
                                ? '/images/breeder/euro-style-3d.png'
                                : '/images/breeder/euro-style-interior.png'
                            }
                            alt={
                              europeanViewMode === '3d'
                                ? 'European Type 3D Cutaway Architectural Model'
                                : 'European Type Actual Barn Interior'
                            }
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.25 }}
                            className={`w-full h-full ${
                              europeanViewMode === '3d'
                                ? 'object-contain p-2 bg-gradient-to-b from-[#0B1E36] to-[#040D18]'
                                : 'object-cover brightness-[0.95]'
                            }`}
                          />
                        </AnimatePresence>
                      )}

                      {/* Architectural Top-Right Corner Accent */}
                      {europeanViewMode !== 'video' && (
                        <img
                          src="/images/accents/card-corner-accent.png"
                          alt=""
                          className="absolute top-0 right-0 w-28 sm:w-36 h-auto object-contain object-right-top pointer-events-none select-none z-10 drop-shadow-sm"
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
                                : europeanViewMode === '3d'
                                ? '/images/breeder/euro-style-3d.png'
                                : '/images/breeder/euro-style-interior.png',
                            title:
                              europeanViewMode === 'video'
                                ? 'European Type Breeder House - 3D Facility Video Tour'
                                : europeanViewMode === '3d'
                                ? 'European Type Breeder House (2/3 Slat) - 3D Architectural Model'
                                : 'European Type Breeder House - Facility Barn Interior',
                            caption:
                              europeanViewMode === 'video'
                                ? 'Complete 3D facility simulation showing European 2/3 slat layout, central community nesting, and longitudinal ventilation.'
                                : europeanViewMode === '3d'
                                ? 'Pre-fabricated broiler breeder structure (14m x 134m x 2.9m) showing central single-row group community nest boxes with 2/3 slatted deck.'
                                : 'European type breeder house interior featuring central community nest boxes, elevated slatted floor deck, and hanging feed lines.',
                            isVideo: europeanViewMode === 'video',
                          })
                        }
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-[2px] bg-white/90 hover:bg-amber-400 hover:text-slate-950 text-slate-800 border border-slate-200 transition-colors backdrop-blur-md cursor-pointer shadow-md z-20"
                        title="Inspect Full Resolution"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Media View Toggle Buttons (3-Tab: 3D, Interior, Video) */}
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setEuropeanViewMode('3d')}
                        className={`px-2 py-1.5 rounded-[2px] text-xs font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                          europeanViewMode === '3d'
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-xs'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-950'
                        }`}
                      >
                        <Images className="w-3.5 h-3.5" />
                        <span>3D Model</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setEuropeanViewMode('interior')}
                        className={`px-2 py-1.5 rounded-[2px] text-xs font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                          europeanViewMode === 'interior'
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-xs'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-950'
                        }`}
                      >
                        <Images className="w-3.5 h-3.5" />
                        <span>Barn Photo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setEuropeanViewMode('video')}
                        className={`px-2 py-1.5 rounded-[2px] text-xs font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                          europeanViewMode === 'video'
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-xs'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-950'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Video Tour</span>
                      </button>
                    </div>

                    {/* Floor Plan Schematic Summary */}
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-[2px] space-y-2 font-sans text-xs">
                      <div className="text-amber-800 font-bold border-b border-slate-200 pb-1.5 text-xs uppercase tracking-wider">
                        FLOOR LAYOUT DYNAMICS (EURO STYLE):
                      </div>
                      <div className="text-slate-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                        <span><strong>2/3 Slat Ratio:</strong> Maximized elevated slatted deck for superior hygiene</span>
                      </div>
                      <div className="text-slate-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                        <span><strong>Center Nest Line:</strong> Automated community egg gathering conveyor</span>
                      </div>
                      <div className="text-slate-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                        <span><strong>End Mating Areas:</strong> Open ground arena at both building ends</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Inquiry Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const prod = selectedDesign === 'american' ? americanProduct : europeanProduct;
                    if (prod) onToggleInquiry(prod);
                  }}
                  className={`w-full py-3 px-4 rounded-[2px] font-sans text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    (selectedDesign === 'american' ? isAmericanAdded : isEuropeanAdded)
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'bg-[#0B192C] text-white hover:bg-slate-800 shadow-xs'
                  }`}
                >
                  {(selectedDesign === 'american' ? isAmericanAdded : isEuropeanAdded) ? (
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

            {/* Technical Parameters & Specifications */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold block">
                  TECHNICAL METRICS & CAPACITIES
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 uppercase block font-bold">Total Bird Capacity</span>
                    <span className="text-xl font-normal text-[#0B192C] font-mono">
                      10,890 Birds
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1 font-normal">
                      9,900 Female + 990 Male (10:1 Ratio)
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 uppercase block font-bold">Building Dimensions</span>
                    <span className="text-xl font-normal text-[#0B192C] font-mono">
                      14m × 134m × 2.9m
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1 font-normal">Width × Length × Eave Height</span>
                  </div>

                  <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 uppercase block font-bold">Building Type</span>
                    <span className="text-lg font-normal text-amber-700 font-mono">
                      Pre-Fabricated House
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1 font-normal">
                      {selectedDesign === 'american'
                        ? '1/3 Slat Dual Lateral Nesting'
                        : '2/3 Slat Central Community Nesting'}
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-[2px] border border-slate-200 shadow-xs">
                    <span className="text-[11px] font-mono text-slate-500 uppercase block font-bold">Floor Architecture</span>
                    <span className="text-lg font-normal text-slate-900 font-mono">
                      {selectedDesign === 'american' ? '1/3 Slatted Deck' : '2/3 Slatted Deck'}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1 font-normal">
                      {selectedDesign === 'american'
                        ? 'Lateral rows with central scratch arena'
                        : 'Maximized slat deck with end mating areas'}
                    </span>
                  </div>
                </div>

                {/* Key Advantage Highlights */}
                <div className="space-y-2 pt-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold block">
                    ENGINEERING ADVANTAGES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                    {selectedDesign === 'american' ? (
                      <>
                        <div className="flex items-start gap-2 bg-white p-3 border border-slate-200 rounded-[2px]">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span className="font-sans text-xs text-slate-700"><strong>Natural Mating Behavior:</strong> Generous central scratch area allows optimal male-to-female interaction.</span>
                        </div>
                        <div className="flex items-start gap-2 bg-white p-3 border border-slate-200 rounded-[2px]">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span className="font-sans text-xs text-slate-700"><strong>Flock Distribution:</strong> Prevents crowding by balancing bird density across two lateral slat zones.</span>
                        </div>
                        <div className="flex items-start gap-2 bg-white p-3 border border-slate-200 rounded-[2px]">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span className="font-sans text-xs text-slate-700"><strong>Perimeter Access:</strong> Maintenance and egg inspection along outer aisles without disturbing center flock.</span>
                        </div>
                        <div className="flex items-start gap-2 bg-white p-3 border border-slate-200 rounded-[2px]">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span className="font-sans text-xs text-slate-700"><strong>Clean Slat Elevation:</strong> 1/3 elevated floor ensures efficient manure drainage beneath slats.</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-start gap-2 bg-white p-3 border border-slate-200 rounded-[2px]">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span className="font-sans text-xs text-slate-700"><strong>High Floor Space Efficiency:</strong> 2/3 slat ratio minimizes manure contact across the dominant house area.</span>
                        </div>
                        <div className="flex items-start gap-2 bg-white p-3 border border-slate-200 rounded-[2px]">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span className="font-sans text-xs text-slate-700"><strong>Centralized Egg Collection:</strong> High-speed single central egg collection belt delivers to egg room.</span>
                        </div>
                        <div className="flex items-start gap-2 bg-white p-3 border border-slate-200 rounded-[2px]">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span className="font-sans text-xs text-slate-700"><strong>Community Group Nests:</strong> Enhanced comfort and darker laying environment for reduced floor eggs.</span>
                        </div>
                        <div className="flex items-start gap-2 bg-white p-3 border border-slate-200 rounded-[2px]">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span className="font-sans text-xs text-slate-700"><strong>Dedicated Mating Zones:</strong> Concentrated end zones facilitate structured mating and flock observation.</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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

      {/* ── 5. EQUIPMENT & ACCESSORIES INQUIRY CATALOG ── */}
      <CategoryAccessoriesCatalog
        businessUnit="Poultry Farm Equipment"
        customProducts={POULTRY_BREEDER_ACCESSORIES}
        eyebrow="POULTRY BREEDER ACCESSORIES INQUIRY"
        title="Poultry Breeder Equipment & Accessories Catalog"
        subtitle="Select and add breeder pan & chain feeding lines, nipple drinking systems, anti-skid floor slats, automated nest boxes, EI-6000 controllers, and radiant brooders to your inquiry."
        inquiryItems={inquiryItems}
        onToggleInquiry={onToggleInquiry}
        accentTheme="amber"
      />

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
                  AMERICAN TYPE (1/3 SLAT)
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
