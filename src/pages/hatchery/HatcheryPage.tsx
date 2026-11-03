import React, { useEffect } from 'react';
import {
  Egg,
  Scan,
  Activity,
  Wind,
  LayoutDashboard,
  Trash2,
} from 'lucide-react';
import type { Product } from '../../data/mockProducts';
import { HatcherySubNav } from '../../components/molecules/HatcherySubNav';
import { SolutionHeroBanner } from '../../components/molecules/SolutionHeroBanner';
import { SolutionPillarCard } from '../../components/molecules/SolutionPillarCard';
import { CategoryEndToEndApproach } from '../../components/organisms/CategoryEndToEndApproach';
import { ContactSection } from '../../components/organisms/ContactSection';
import { ImagePlaceholder } from '../../components/atoms/ImagePlaceholder';
import { HATCHERY_IMAGES } from '../../data/hatcheryImages';

export interface HatcheryPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

// ── 1. Facility Blueprint Layout (15 Rooms) ──────────────────────────────────
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

// ── 6 Core Hatchery Systems Pillars (Modeled after Poultry Overview Pillars) ─
const HATCHERY_SYSTEMS_PILLARS = [
  {
    id: 'incubation',
    title: 'Incubation System',
    path: '/solutions/hatchery/incubation',
    icon: Egg,
    tagline: 'Configurable incubation solutions for varying capacities, production programs, and hatchery requirements.',
    capacity: '15,120 to 120,960 eggs',
    features: [
      'Single-stage Large Box Type Incubation & Hatcher',
      'Air Circulation Hatcher with Pressure Synergy Technology',
      'Multi-Stage Tunnel Incubator (90,720 eggs)',
      'Honor 115200 Series Incubator & Honor 19200 Series Hatcher',
    ],
    image: HATCHERY_IMAGES.incubation.singleStageIncubation,
  },
  {
    id: 'egg-handling',
    title: 'Automated Egg Handling & AI Candling',
    path: '/solutions/hatchery/egg-handling',
    icon: Scan,
    tagline: 'Enables fast, gentle egg handling with AI identification, non-contact weighing, flexible grading, and remote diagnostics.',
    capacity: '50,000 to 70,000 eggs/hour',
    features: [
      'Egg Handling System (60,000 eggs/hour)',
      'AI-based Egg Identification & Auto Traying',
      'Single Line Configuration (50,000 egg position/hour)',
      'Double Line Configuration (70,000 egg position/hour)',
    ],
    image: HATCHERY_IMAGES.eggHandling.systemOverview,
  },
  {
    id: 'chick-handling',
    title: 'Automated Chick Handling System',
    path: '/solutions/hatchery/chick-handling',
    icon: Activity,
    tagline: 'Improves hatchery efficiency through automated chick handling, basket management, and waste control.',
    capacity: '70,000 egg position/hour',
    features: [
      'For White Feather Broiler Line',
      'For Layer Production Line',
      'Linear Rotary Immunization Platform',
      'Chick and Shell Separation & Automatic Washing',
    ],
    image: HATCHERY_IMAGES.chickHandling.broilerLineOverview,
  },
  {
    id: 'hvac',
    title: 'Hatchery HVAC System',
    path: '/solutions/hatchery/hvac',
    icon: Wind,
    tagline: 'Integrates heat recovery, intelligent pumping, and precise process-water control for energy-efficient and reliable operation.',
    capacity: '4 Operating Modes',
    features: [
      'Mechanical Room System',
      'Air Conditioning System',
      'Embryo Heat Recovery System',
      'Cooling, Heating, Dehumidification & Ventilation',
    ],
    image: HATCHERY_IMAGES.hvac.mechanicalRoomSystem,
  },
  {
    id: 'management',
    title: 'Intelligent Hatchery Management',
    path: '/solutions/hatchery/management',
    icon: LayoutDashboard,
    tagline: 'Our digital platform can connect incubation, automation, HVAC, maintenance, and energy, and production information to monitor operations from a more centralized management environment.',
    capacity: 'Up to 50% Efficiency Boost',
    features: [
      'Centralized Alarm Dashboard (Small & Medium Hatcheries)',
      'Intelligent Management Center (Large Hatcheries)',
      'Equipment, Energy, Maintenance & Production Modules',
      'Central Nodes: Center, Local Server, Intelligent Gateway',
    ],
    image: HATCHERY_IMAGES.management.intelligentManagementCenter,
  },
  {
    id: 'waste-disposal',
    title: 'Waste Disposal System',
    path: '/solutions/hatchery/waste-disposal',
    icon: Trash2,
    tagline: 'Silo Capacity: 7m³ | Full Load Weight: 5T',
    capacity: '7m³ Silo / 5T Full Load',
    features: [
      'Silo Capacity: 7m³',
      'Full Load Weight: 5T',
    ],
    image: HATCHERY_IMAGES.wasteDisposal.siloSystem,
  },
];

export const HatcheryPage: React.FC<HatcheryPageProps> = ({
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
      
      {/* ── 1. HERO BANNER (IDENTICAL ARCHITECTURE TO POULTRY) ─────── */}
      <SolutionHeroBanner
        breadcrumbs={[
          { label: 'HOME', path: '/' },
          { label: 'OUR SOLUTIONS', path: '/solutions' },
          { label: 'INTEGRATED HATCHERY SOLUTION' },
        ]}
        title="INTEGRATED HATCHERY SOLUTION"
        subtitle="CCDI brings together incubation, automation, HVAC, supporting systems, and digital management into one coordinated hatchery operation."
        backgroundImage="/images/hatchery/hatchery-hero.jpg"
        imageAlt="CCDI Hatchery Solution"
        ctaText="Request Hatchery Consultation"
        onCtaClick={scrollToContact}
      />

      {/* ── 2. STICKY SUB-NAV BAR (IDENTICAL TO POULTRY SUBNAV) ─────── */}
      <HatcherySubNav activeTab="overview" />

      {/* ── 3. FACILITY BLUEPRINT LAYOUT (SECTION 1) ───────────────── */}
      <section className="relative py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
        {/* Architectural Top-Right Corner Accent */}
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
              Facility Blueprint Layout
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              CCDI brings together incubation, automation, HVAC, supporting systems, and digital management into one coordinated hatchery operation.
            </p>
          </div>

          {/* 3D Facility Blueprint Diagram with Lightbox & Zoom */}
          <div className="bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-4 sm:p-6 shadow-sm transition-all">
            <ImagePlaceholder
              src={HATCHERY_IMAGES.blueprint}
              alt="Facility Blueprint Layout 3D Architectural Model"
              label="15-Zone Coordinated Hatchery Facility Blueprint"
              aspectRatio="wide"
              theme="light"
              objectFit="contain"
            />
          </div>

          {/* Blueprint Layout Grid */}
          <div className="bg-[#07162A] border border-[#102A43] rounded-[2px] p-6 sm:p-8 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1E3E66]">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                Facility Blueprint Layout
              </span>
              <span className="font-mono text-[11px] text-slate-400 font-bold">
                15 Rooms
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BLUEPRINT_ROOMS.map((room, idx) => (
                <div
                  key={room.id}
                  className="bg-[#0B192C] border border-[#1E3E66] p-4 rounded-[2px] flex items-center justify-between hover:border-amber-400/80 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-[2px] bg-[#07162A] border border-[#1E3E66] font-mono text-xs font-bold text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                      {room.name}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider px-2 py-0.5 bg-[#07162A] border border-[#1E3E66] rounded-[2px] shrink-0">
                    {room.zone}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SIX HATCHERY SYSTEMS PILLARS SHOWCASE ───────────────── */}
      <section className="relative py-20 sm:py-28 bg-white border-b border-slate-200 overflow-hidden">
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
              HATCHERY SOLUTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Integrated Hatchery Systems
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              CCDI brings together incubation, automation, HVAC, supporting systems, and digital management into one coordinated hatchery operation.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                Integrated Hatchery Systems
              </span>
              <span className="font-mono text-[11px] text-amber-600 font-bold">
                6 Core System Disciplines
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {HATCHERY_SYSTEMS_PILLARS.map((pillar) => (
                <SolutionPillarCard
                  key={pillar.id}
                  title={pillar.title}
                  tagline={pillar.tagline}
                  badge={pillar.capacity}
                  icon={pillar.icon}
                  image={pillar.image}
                  imageFit="contain"
                  featuresLabel="KEY FEATURES"
                  features={pillar.features}
                  path={pillar.path}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. OUR END-TO-END TURNKEY APPROACH ─────────────────────── */}
      <CategoryEndToEndApproach category="hatchery" variant="timeline" />

      {/* ── 6. CONTACT & INQUIRY SECTION (IDENTICAL TO POULTRY) ───── */}
      <ContactSection
        inquiryItems={inquiryItems}
        onRemoveInquiryItem={onRemoveInquiryItem}
      />

    </div>
  );
};
