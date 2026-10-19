import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import type { Product } from '../data/mockProducts';
import { ContactSection } from '../components/organisms/ContactSection';
import { CategoryEndToEndApproach } from '../components/organisms/CategoryEndToEndApproach';
import { PoultrySubNav } from '../components/molecules/PoultrySubNav';

export interface PoultryOverviewPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

const POULTRY_PILLARS = [
  {
    id: 'broiler',
    title: 'Broiler Farm Operations',
    category: 'Commercial Meat Production',
    tagline: 'High-Density Climate-Controlled Meat Bird Envelopes',
    description:
      'Engineered for maximum bird density, exceptional Feed Conversion Ratios (FCR), and rapid flock turnaround. Supports both elevated-floor and floor-type prefabricated structures with negative-pressure tunnel cooling.',
    path: '/solutions/poultry/broiler',
    capacity: '36,000 – 55,000 Birds / House',
    dimensions: '18m x 156m x 2.4m (Elevated)',
    automation: 'Automated Pan Feeding & Nipple Lines',
    image: '/images/broiler/feeding-drinking-system.jpg',
    specs: [
      'Elevated slatted floor or solid floor layouts',
      'High-velocity 2.5–3.2 m/s tunnel ventilation',
      'Automated flex-auger pan feeding lines',
      'Rapid 10-day flock cleanout & turnaround',
    ],
    accentColor: 'amber',
  },
  {
    id: 'broiler-breeder',
    title: 'Poultry Breeding Operations',
    category: 'Parent Stock & Hatching Eggs',
    tagline: 'Precision Housing for Fertile Egg Productivity',
    description:
      'Turnkey facilities engineered specifically for parent stock management. Features globally validated American (1/3 slat) and European (2/3 slat) layouts, separate-sex feeding, community nesting, and zero-crack automated egg transport.',
    path: '/solutions/poultry/broiler-breeder',
    capacity: '10,890 Birds (9,900 F / 990 M)',
    dimensions: '14m x 134m x 2.9m Pre-Fab',
    automation: 'Community Nests & Sex-Separate Feeding',
    image: '/images/breeder/american-type-interior.jpg',
    hasVideo: true,
    specs: [
      'American (1/3 slat) vs European (2/3 slat) layout options',
      'Separate male & female feed delivery systems',
      'Automated community nests with variable collection belts',
      '3D architectural facility walkthrough available',
    ],
    accentColor: 'sky',
  },
  {
    id: 'layer',
    title: 'Layer Farm Operations',
    category: 'Table Egg Production',
    tagline: 'Multi-Tier Vertical Battery Cage Envelopes',
    description:
      'Intensive vertical battery cage systems (3 to 8 tiers) maximizing cubic barn footprint. Fully automated with multi-level egg collection elevators, longitudinal PP manure drying belts, and precision traveling feed hoppers.',
    path: '/solutions/poultry/layer',
    capacity: 'Customizable Multi-Tier Capacity',
    dimensions: 'Scalable by Tier & Length',
    automation: 'Multi-Tier Lift Elevators & Manure Belts',
    image: '/images/layer/h-frame-layer.jpg',
    specs: [
      'Hot-dip galvanized vertical H-frame cages (SA2.5)',
      'Automated longitudinal egg collection & lift elevators',
      'In-barn PP manure belts with perforated air-drying tubes',
      'Dimmable 2700K ovulation photoperiod automation',
    ],
    accentColor: 'amber',
  },
  {
    id: 'retrofitting',
    title: 'Farm Retrofitting & Modernization',
    category: 'Turnkey Conversion Engineering',
    tagline: 'Up to 50% Capital Cost Savings vs Greenfield Construction',
    description:
      'Transform open-sided curtain sheds or aging tunnel houses into high-performance, climate-controlled facilities. Reutilize existing foundation slabs and structural steel, cut summer mortality to <2.5%, and boost flock density in just 3–4 weeks.',
    path: '/solutions/poultry/retrofitting',
    capacity: '40%–50% Capex Savings',
    dimensions: '3–4 Weeks Turnaround',
    automation: 'Full Negative-Pressure Conversion',
    image: '/images/broiler/climate-system.jpg',
    specs: [
      'Open-to-closed tunnel conversion with PIR insulated sandwich panels',
      '50"/54" high-velocity cone fans & 150mm evaporative wet pad walls',
      'Automated pan feeding, 360° nipple drinkers & Agro-logic climate telemetry',
      'Interactive farm audit module to calculate custom upgrade requirements',
    ],
    accentColor: 'emerald',
  },
  {
    id: 'accessories',
    title: 'Accessories & Spare Parts',
    category: 'OEM Replacement Hardware',
    tagline: 'Precision Replacement Components & Consumables',
    description:
      'Direct-from-factory OEM replacement components and consumables for Broiler, Breeder, and Layer facilities. In-stock inventory for feeding systems, drinking lines, ventilation, and structural maintenance.',
    path: '/solutions/poultry/accessories',
    capacity: '100% OEM Compatibility',
    dimensions: 'Clark & Angeles Hub Inventory',
    automation: 'Direct Factory Warranties',
    image: '/images/layer/feeding-system.jpg',
    specs: [
      'Galvanized silos, flex-augers & feeder pan assemblies',
      'Stainless steel 360° nipple drinkers & pressure regulators',
      'Fiberglass cone fans, IP55 motors & cooling pads',
      'Anti-skid PP plastic slats, winches & cage hardware',
    ],
    accentColor: 'amber',
  },
  {
    id: 'after-sales',
    title: 'Poultry After-Sales Services',
    category: 'Lifecycle Support & Maintenance',
    tagline: '24/7 Field Engineering, Preventive Contracts & Emergency SLA',
    description:
      'Comprehensive field engineering support, scheduled pre-placement audits, 24/7 emergency repair hotline, and warranty maintenance contracts to guarantee uninterrupted flock performance and biosecurity.',
    path: '/solutions/poultry/after-sales',
    capacity: '24/7 Emergency Support',
    dimensions: '< 24h Critical Dispatch SLA',
    automation: 'Quarterly Diagnostic Audits',
    image: '/images/broiler/climate-system.jpg',
    specs: [
      'Scheduled Preventive Maintenance Contracts (PMC)',
      '24/7 emergency response & sub-24h technician dispatch',
      'Ventilation static pressure & sensor recalibration audits',
      'Dedicated central spare parts warehouse in Pampanga',
    ],
    accentColor: 'sky',
  },
];

export const PoultryOverviewPage: React.FC<PoultryOverviewPageProps> = ({
  inquiryItems,
  onRemoveInquiryItem,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 font-sans text-left min-h-screen">
      
      {/* ── 1. HERO BANNER ────────────────────────────────────────── */}
      <section className="relative bg-[#07162A] text-white pt-10 pb-20 sm:pb-24 border-b border-[#102A43] overflow-hidden">
        {/* Background Hero Image with Scrim */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/images/broiler/feeding-drinking-system.jpg"
            alt="CCDI Poultry Infrastructure"
            className="w-full h-full object-cover object-center opacity-85 sm:opacity-95 lg:opacity-100 brightness-[1.02] contrast-[1.06]"
          />
          {/* Dual-zone dark navy gradient: solid dark background on left for 100% text legibility, transparent on right for full image clarity */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07162A] via-[#07162A]/90 to-[#07162A]/60 md:from-[#07162A] md:from-20% md:via-[#07162A]/95 md:via-48% md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07162A]/85 via-transparent to-transparent" />
        </div>

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
          className="absolute -bottom-16 -right-16 sm:-right-8 sm:bottom-0 w-80 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <img
            src="/images/accents/dark-accent-graphic.png"
            alt=""
            className="w-full h-auto object-contain opacity-30"
          />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
            <Link to="/" className="hover:text-amber-400 transition-colors">HOME</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/solutions" className="hover:text-amber-400 transition-colors">OUR SOLUTIONS</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-amber-400 font-bold">THE POULTRY SOLUTION</span>
          </nav>

          <div className="max-w-4xl space-y-5">
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-white leading-[1.2]">
              The Poultry Solution
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-3xl">
              Clarkbase Construction Dev't Inc. (CCDI) delivers high-performance turnkey infrastructure
              tailored to every tier of modern poultry production. From high-density climate-controlled
              <strong className="text-white font-semibold"> Broiler</strong> facilities and specialized <strong className="text-white font-semibold">Broiler Breeder</strong> parent stock housing
              to massive multi-tier vertical <strong className="text-white font-semibold">Commercial Layer</strong> battery cage envelopes, we provide
              single-source engineering accountability across the Philippines.
            </p>

          </div>
        </div>
      </section>

      {/* ── 2. POULTRY SUB-NAV BAR ─────────────────────────────────── */}
      <PoultrySubNav activeTab="overview" />

      {/* ── 3. FIVE PILLARS COMPARISON SHOWCASE ───────────────────── */}
      <section id="pillars" className="relative py-20 sm:py-28 bg-white border-b border-slate-200 overflow-hidden">
        {/* Architectural Top-Right Corner Accent */}
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              POULTRY SUB-CATEGORIES & SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Six Specialized Poultry Pillars, One Turnkey Standard
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Whether you are scaling commercial broiler meat bird output, safeguarding parent stock fertility,
              installing high-density vertical layer cages, modernizing existing open or aging farm sheds, sourcing
              genuine replacement parts, or securing 24/7 after-sales maintenance, select your target category below.
            </p>
          </div>

          <div className="space-y-12">
            {/* 1. Production Facilities (Broiler, Breeder, Layer) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                  Turnkey Production Facilities
                </span>
                <span className="font-mono text-[11px] text-amber-600 font-bold">
                  3 Core Housing Disciplines
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {POULTRY_PILLARS.slice(0, 3).map((pillar) => (
                  <div
                    key={pillar.id}
                    className="flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] overflow-hidden transition-all duration-200 hover:shadow-lg group"
                  >
                    {/* Card Header Media */}
                    <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900 shrink-0">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07162A] via-[#07162A]/40 to-transparent" />
                      
                      {/* Top Right Corner Accent */}
                      <img
                        src="/images/accents/card-corner-accent.png"
                        alt=""
                        className="absolute top-0 right-0 w-24 sm:w-28 h-auto object-contain object-right-top pointer-events-none select-none z-10 drop-shadow-sm opacity-80"
                        aria-hidden="true"
                      />

                      {/* Title in Media Overlay */}
                      <div className="absolute bottom-3 left-4 right-4 z-10">
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-amber-400 transition-colors">
                          {pillar.title}
                        </h3>
                        <p className="text-slate-300 text-xs mt-1 font-medium line-clamp-1">
                          {pillar.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow space-y-6">
                      {/* Core Features List */}
                      <div className="space-y-2">
                        <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                          KEY ENGINEERING ATTRIBUTES
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {pillar.specs.map((spec, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                              <span className="leading-snug">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Navigation Button */}
                      <Link
                        to={pillar.path}
                        className="inline-flex items-center justify-between w-full px-4 py-3 rounded-[2px] bg-[#0B192C] text-white hover:bg-amber-400 hover:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-150 shadow-xs group-hover:shadow-md cursor-pointer"
                      >
                        <span>Explore {pillar.title}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Farm Modernization & Retrofitting (Featured Pillar) */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                  Farm Retrofitting & Upgrades
                </span>
                <span className="font-mono text-[11px] text-slate-600 font-bold">
                  Save 40%–50% vs Building New
                </span>
              </div>

              <div className="bg-[#07162A] border border-[#102A43] rounded-md overflow-hidden text-white shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  <div className="lg:col-span-5 relative h-64 lg:h-auto overflow-hidden bg-slate-900">
                    <img
                      src="/images/broiler/climate-system.jpg"
                      alt="CCDI Retrofitting & Modernization"
                      className="w-full h-full object-cover brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#07162A] via-transparent to-transparent opacity-90" />
                  </div>

                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <span className="text-xs text-slate-400 font-medium block">
                        Farm Modernization & Retrofitting
                      </span>
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        Retrofit Your Existing Farm at Half the Cost
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Keep your concrete floor and steel frames while upgrading your whole farm with new cages, fans, cooling pads, and automated feeding. We finish the complete upgrade in just 3 to 4 weeks during your normal flock break.
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                        <div className="bg-[#0B192C] border border-slate-700/80 p-2.5 rounded-md text-center">
                          <span className="text-[10px] text-slate-400 uppercase block">Cost Savings</span>
                          <span className="text-base font-bold text-white font-mono">40%–50%</span>
                        </div>
                        <div className="bg-[#0B192C] border border-slate-700/80 p-2.5 rounded-md text-center">
                          <span className="text-[10px] text-slate-400 uppercase block">Upgrade Time</span>
                          <span className="text-base font-bold text-white font-mono">3–4 Weeks</span>
                        </div>
                        <div className="bg-[#0B192C] border border-slate-700/80 p-2.5 rounded-md text-center">
                          <span className="text-[10px] text-slate-400 uppercase block">Bird Capacity</span>
                          <span className="text-base font-bold text-white font-mono">Up to 180%</span>
                        </div>
                        <div className="bg-[#0B192C] border border-slate-700/80 p-2.5 rounded-md text-center">
                          <span className="text-[10px] text-slate-400 uppercase block">What We Upgrade</span>
                          <span className="text-base font-bold text-white font-mono">Full Setup</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Link
                        to="/solutions/poultry/retrofitting"
                        className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <span>Submit Upgrade Specs</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        to="/solutions/poultry/retrofitting#retrofit-audit-form"
                        className="inline-flex items-center gap-2 bg-[#102A43] hover:bg-[#1E3E66] text-white px-5 py-3 rounded-md font-semibold text-xs uppercase tracking-wider transition-colors border border-slate-700 cursor-pointer"
                      >
                        <span>Request Farm Visit</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Accessories & Spare Parts + After-Sales Services */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                  OEM Hardware, Spare Parts & Lifecycle Support
                </span>
                <span className="font-mono text-[11px] text-amber-600 font-bold">
                  Continuous Operational Uptime
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {POULTRY_PILLARS.slice(4, 6).map((pillar) => (
                  <div
                    key={pillar.id}
                    className="flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] overflow-hidden transition-all duration-200 hover:shadow-lg group"
                  >
                    {/* Card Header Media */}
                    <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900 shrink-0">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07162A] via-[#07162A]/40 to-transparent" />
                      
                      {/* Top Right Corner Accent */}
                      <img
                        src="/images/accents/card-corner-accent.png"
                        alt=""
                        className="absolute top-0 right-0 w-24 sm:w-28 h-auto object-contain object-right-top pointer-events-none select-none z-10 drop-shadow-sm opacity-80"
                        aria-hidden="true"
                      />

                      {/* Title in Media Overlay */}
                      <div className="absolute bottom-3 left-4 right-4 z-10">
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-amber-400 transition-colors">
                          {pillar.title}
                        </h3>
                        <p className="text-slate-300 text-xs mt-1 font-medium line-clamp-1">
                          {pillar.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow space-y-6">
                      {/* Core Features List */}
                      <div className="space-y-2">
                        <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                          KEY ENGINEERING ATTRIBUTES
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {pillar.specs.map((spec, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                              <span className="leading-snug">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Navigation Button */}
                      <Link
                        to={pillar.path}
                        className="inline-flex items-center justify-between w-full px-4 py-3 rounded-[2px] bg-[#0B192C] text-white hover:bg-amber-400 hover:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-150 shadow-xs group-hover:shadow-md cursor-pointer"
                      >
                        <span>Explore {pillar.title}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* ── 4. TURNKEY END-TO-END METHODOLOGY ──────────────────────── */}
      <CategoryEndToEndApproach category="poultry" />



      {/* ── 6. CONTACT & INQUIRY SECTION ───────────────────────────── */}
      <ContactSection
        inquiryItems={inquiryItems}
        onRemoveInquiryItem={onRemoveInquiryItem}
      />

    </div>
  );
};
