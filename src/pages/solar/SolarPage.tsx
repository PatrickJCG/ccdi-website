import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  PhoneCall,
  CheckCircle2,
  Activity,
  MapPin,
  Cpu,
  FileCheck,
  Wrench,
  Headphones,
} from 'lucide-react';
import type { Product } from '../../data/mockProducts';
import { SolutionHeroBanner } from '../../components/molecules/SolutionHeroBanner';
import { SolutionSubNav } from '../../components/molecules/SolutionSubNav';
import { SolutionEquipmentCard } from '../../components/molecules/SolutionEquipmentCard';
import { ProcessWorkflowDiagram, type WorkflowStepItem, WORKFLOW_COLOR_PRIMARY, WORKFLOW_COLOR_SECONDARY } from '../../components/organisms/ProcessWorkflowDiagram';
import { AfterSalesSection } from '../../components/organisms/AfterSalesSection';
import { ContactSection } from '../../components/organisms/ContactSection';
import { AFTER_SALES_DATA } from '../../data/afterSalesData';
import {
  SOLAR_TAB_1_ON_GRID,
  SOLAR_TAB_2_HYBRID,
  SOLAR_TAB_3_BESS,
  SOLAR_TAB_4_PV_EV,
  SOLAR_PRODUCTS_MAP,
} from '../../data/solarProducts';

export interface SolarPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

const SOLAR_DELIVERY_STEPS: WorkflowStepItem[] = [
  {
    step: '01',
    title: 'STEP 01',
    name: 'Energy Assessment',
    lines: ['Energy', 'Assessment'],
    icon: Activity,
    accentColor: WORKFLOW_COLOR_SECONDARY,
  },
  {
    step: '02',
    title: 'STEP 02',
    name: 'Site Survey & Planning',
    lines: ['Site Survey', '& Planning'],
    icon: MapPin,
    accentColor: WORKFLOW_COLOR_PRIMARY,
  },
  {
    step: '03',
    title: 'STEP 03',
    name: 'Engineering & Design',
    lines: ['Engineering', '& Design'],
    icon: Cpu,
    accentColor: WORKFLOW_COLOR_SECONDARY,
  },
  {
    step: '04',
    title: 'STEP 04',
    name: 'Permits & Coordination',
    lines: ['Permits &', 'Coordination'],
    icon: FileCheck,
    accentColor: WORKFLOW_COLOR_PRIMARY,
  },
  {
    step: '05',
    title: 'STEP 05',
    name: 'Installation & Testing',
    lines: ['Installation', '& Testing'],
    icon: Wrench,
    accentColor: WORKFLOW_COLOR_SECONDARY,
  },
  {
    step: '06',
    title: 'STEP 06',
    name: 'Monitoring & Support',
    lines: ['Monitoring', '& Support'],
    icon: Headphones,
    accentColor: WORKFLOW_COLOR_PRIMARY,
  },
];

export const SolarPage: React.FC<SolarPageProps> = ({
  inquiryItems,
  onToggleInquiry,
  onRemoveInquiryItem,
}) => {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.substring(1));
      if (el) {
        setTimeout(() => {
          const offset = 72;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }, 150);
      }
    } else {
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
      
      {/* ── SECTION 1: HERO & PRIMARY ACTION ─────────────────────────── */}
      <SolutionHeroBanner
        breadcrumbs={[
          { label: 'HOME', path: '/' },
          { label: 'OUR SOLUTIONS', path: '/solutions' },
          { label: 'SOLAR ENERGY SOLUTIONS' },
        ]}
        title="Solar Power and Storage"
        subtitle="Reliable power systems for homes, farms, commercial facilities and industrial operations."
        backgroundImage="/images/capabilities/solar-facility.jpg"
        imageAlt="Solar Power and Storage"
      >
        <a
          href="/solutions/solar/calculator"
          className="px-6 py-3.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-extrabold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2"
        >
          <Calculator className="w-4 h-4" />
          Get an Estimate
        </a>
        <button
          type="button"
          onClick={scrollToContact}
          className="px-6 py-3.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-extrabold bg-[#0B192C]/80 hover:bg-[#0B192C] text-white border border-[#1E3E66] hover:border-amber-400/80 transition-colors shadow-lg cursor-pointer flex items-center gap-2"
        >
          <PhoneCall className="w-4 h-4 text-amber-400" />
          Connect with our team today.
        </button>
      </SolutionHeroBanner>

      {/* ── STICKY SUB-NAV BAR (IN-PAGE HYPERLINKS JUST LIKE HATCHERY) ── */}
      <SolutionSubNav category="solar" />

      {/* ── SECTION 2: COMPLETE SOLAR DELIVERY & WORKFLOW ────────────── */}
      <section
        id="delivery-workflow"
        className="relative py-16 sm:py-24 bg-[#07162A] text-white border-b border-[#102A43] overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-20"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Section Header */}
          <div className="max-w-3xl space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              COMPLETE SOLAR DELIVERY
            </h2>
          </div>

          {/* 3 Delivery Pillars Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Pillar 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-[#0B192C] border border-[#1E3E66] hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-5 transition-all duration-300 shadow-xl group"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-[#1E3E66]">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight uppercase">
                  ENGINEERING &amp; DESIGN
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Load and bill analysis</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>PV and electrical design</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Energy yield and savings estimate</span>
                </li>
              </ul>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-[#0B192C] border border-[#1E3E66] hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-5 transition-all duration-300 shadow-xl group"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-[#1E3E66]">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight uppercase">
                  PROJECT DELIVERY
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Procurement and logistics</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Installation and testing</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Turnover and training</span>
                </li>
              </ul>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-[#0B192C] border border-[#1E3E66] hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-5 transition-all duration-300 shadow-xl group"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-[#1E3E66]">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight uppercase">
                  ONGOING SUPPORT
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Performance monitoring</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Maintenance and troubleshooting</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Warranty and system support</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* 6-Step Workflow Timeline using Reusable ProcessWorkflowDiagram */}
          <div className="space-y-6 pt-6">
            <ProcessWorkflowDiagram
              id="workflow-steps"
              eyebrow="STEP-BY-STEP EXECUTION"
              title="OUR DELIVERY WORKFLOW"
              steps={SOLAR_DELIVERY_STEPS}
              className="py-0 sm:py-0 bg-transparent border-none"
            />
          </div>
        </div>
      </section>

      {/* ── 3. PRODUCT CATEGORY 1: ON-GRID SOLAR (ID="on-grid") ──────── */}
      <section
        id="on-grid"
        className="relative py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden"
      >
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              {SOLAR_TAB_1_ON_GRID.categoryTitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              {SOLAR_TAB_1_ON_GRID.categorySubhead}
            </h2>
            {SOLAR_TAB_1_ON_GRID.categoryBadges && (
              <div className="pt-1">
                <span className="font-mono text-xs sm:text-sm font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-[2px] inline-block">
                  {SOLAR_TAB_1_ON_GRID.categoryBadges}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {SOLAR_TAB_1_ON_GRID.equipment.map((card) => (
              <SolutionEquipmentCard
                key={card.id}
                product={SOLAR_PRODUCTS_MAP[card.id]}
                title={card.title}
                badge={card.badge}
                description={card.description}
                imageUrl="/images/capabilities/solar-facility.jpg"
                inquiryItems={inquiryItems}
                onToggleInquiry={onToggleInquiry}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PRODUCT CATEGORY 2: HYBRID ENERGY STORAGE (ID="hybrid-storage") ── */}
      <section
        id="hybrid-storage"
        className="relative py-16 sm:py-24 bg-slate-50 border-b border-slate-200 overflow-hidden"
      >
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              {SOLAR_TAB_2_HYBRID.categoryTitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              {SOLAR_TAB_2_HYBRID.categorySubhead}
            </h2>
          </div>

          {/* Grouped Section: Hybrid Inverters with Value Callouts */}
          <div className="flex flex-col justify-between bg-white border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-8 transition-all duration-200 shadow-xs hover:shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {SOLAR_TAB_2_HYBRID.valueCallouts.map((block) => (
                <div
                  key={block.title}
                  className="bg-slate-50 border border-slate-200 rounded-[2px] p-6 space-y-3"
                >
                  <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-600 border-b border-slate-200 pb-2.5">
                    {block.title}
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {block.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 items-stretch">
              {SOLAR_TAB_2_HYBRID.hybridInverters.map((card) => (
                <SolutionEquipmentCard
                  key={card.id}
                  product={SOLAR_PRODUCTS_MAP[card.id]}
                  title={card.title}
                  badge={card.badge}
                  description={card.description}
                  imageUrl="/images/capabilities/solar-facility.jpg"
                  inquiryItems={inquiryItems}
                  onToggleInquiry={onToggleInquiry}
                />
              ))}
            </div>
          </div>

          {/* Grouped Section: Modular Battery Options */}
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-2xl sm:text-3xl font-normal text-[#0B192C] tracking-tight">
                {SOLAR_TAB_2_HYBRID.modularBatterySubhead}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {SOLAR_TAB_2_HYBRID.modularBatteries.map((card) => (
                <SolutionEquipmentCard
                  key={card.id}
                  product={SOLAR_PRODUCTS_MAP[card.id]}
                  title={card.title}
                  badge={card.badge}
                  description={card.description}
                  imageUrl="/images/capabilities/solar-facility.jpg"
                  inquiryItems={inquiryItems}
                  onToggleInquiry={onToggleInquiry}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PRODUCT CATEGORY 3: COMMERCIAL & INDUSTRIAL BESS (ID="commercial-bess") ── */}
      <section
        id="commercial-bess"
        className="relative py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden"
      >
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              {SOLAR_TAB_3_BESS.categoryTitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              {SOLAR_TAB_3_BESS.categorySubhead}
            </h2>
          </div>

          {/* BESS Systems Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {SOLAR_TAB_3_BESS.bessSystems.map((card) => (
              <SolutionEquipmentCard
                key={card.id}
                product={SOLAR_PRODUCTS_MAP[card.id]}
                title={card.title}
                badge={card.badge}
                description={card.description}
                imageUrl="/images/capabilities/solar-facility.jpg"
                inquiryItems={inquiryItems}
                onToggleInquiry={onToggleInquiry}
              />
            ))}
          </div>

          {/* Feature Callouts (Business Value, Resilience, Operations) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {SOLAR_TAB_3_BESS.featureCallouts.map((block) => (
              <div
                key={block.title}
                className="bg-slate-50 border border-slate-200 rounded-[2px] p-6 space-y-3 shadow-xs"
              >
                <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-600 border-b border-slate-200 pb-2.5">
                  {block.title}
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {block.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* System Building Blocks */}
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-2xl sm:text-3xl font-normal text-[#0B192C] tracking-tight">
                {SOLAR_TAB_3_BESS.systemBuildingBlocksHeader}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {SOLAR_TAB_3_BESS.systemBuildingBlocks.map((card) => (
                <SolutionEquipmentCard
                  key={card.id}
                  product={SOLAR_PRODUCTS_MAP[card.id]}
                  title={card.title}
                  badge={card.badge}
                  description={card.description}
                  imageUrl="/images/capabilities/solar-facility.jpg"
                  inquiryItems={inquiryItems}
                  onToggleInquiry={onToggleInquiry}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PRODUCT CATEGORY 4: SOLAR PV & EV CHARGING (ID="pv-ev-charging") ── */}
      <section
        id="pv-ev-charging"
        className="relative py-16 sm:py-24 bg-slate-50 border-b border-slate-200 overflow-hidden"
      >
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              {SOLAR_TAB_4_PV_EV.categoryTitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              {SOLAR_TAB_4_PV_EV.categorySubhead}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {SOLAR_TAB_4_PV_EV.equipment.map((card) => (
              <SolutionEquipmentCard
                key={card.id}
                product={SOLAR_PRODUCTS_MAP[card.id]}
                title={card.title}
                badge={card.badge}
                description={card.description}
                imageUrl="/images/capabilities/solar-facility.jpg"
                inquiryItems={inquiryItems}
                onToggleInquiry={onToggleInquiry}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. TRUSTED TECHNOLOGY PARTNERS & BOTTOM CTA ──────────────── */}
      <section
        id="technology-partners"
        className="relative py-16 sm:py-24 bg-[#07162A] text-white border-b border-[#102A43] overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-20"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              TRUSTED SOLAR TECHNOLOGY PARTNERS
            </h2>
          </div>

          {/* Partner Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* RENAC */}
            <div className="bg-[#0B192C] border border-[#1E3E66] hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-4 shadow-xl transition-all duration-200">
              <h3 className="text-2xl font-black text-amber-400 tracking-tight font-sans">
                RENAC
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Smart inverters, hybrid systems and energy storage.
              </p>
            </div>

            {/* GCL S.I. */}
            <div className="bg-[#0B192C] border border-[#1E3E66] hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-4 shadow-xl transition-all duration-200">
              <h3 className="text-2xl font-black text-amber-400 tracking-tight font-sans">
                GCL S.I.
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                High-efficiency photovoltaic modules.
              </p>
            </div>
          </div>

          {/* Bottom Banner / CTA */}
          <div className="bg-gradient-to-r from-[#0B192C] via-[#102A43] to-[#0B192C] border border-amber-400/40 rounded-[2px] p-8 sm:p-12 text-center space-y-6 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase">
              TAKE THE NEXT STEP TOWARD SOLAR ENERGY.
            </h3>
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={scrollToContact}
                className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-[2px] transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                Connect with our team today.
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. AFTER-SALES SERVICES (ID="after-sales") ───────────────── */}
      <AfterSalesSection
        id="after-sales"
        data={AFTER_SALES_DATA.solar}
        onCtaClick={scrollToContact}
        catalogLink={{
          label: 'Browse Solar Equipment',
          href: '#on-grid',
        }}
      />

      {/* ── 9. CONTACT SECTION (ID="contact") ────────────────────────── */}
      <div id="contact">
        <ContactSection
          inquiryItems={inquiryItems}
          onRemoveInquiryItem={onRemoveInquiryItem}
        />
      </div>

    </div>
  );
};
