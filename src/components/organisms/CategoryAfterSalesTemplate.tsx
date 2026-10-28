import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Phone,
  CheckCircle2,
  Wrench,
  Clock,
  ChevronDown,
  Warehouse,
  Egg,
  Factory,
  Sun,
  Calculator,
} from 'lucide-react';
import type { Product } from '../../data/mockProducts';
import { ContactSection } from './ContactSection';
import { PoultrySubNav } from '../molecules/PoultrySubNav';
import { CategorySubNav } from '../molecules/CategorySubNav';
import { BenchmarkStatStrip } from '../molecules/BenchmarkStatStrip';
import type { CategoryAfterSalesInfo } from '../../data/afterSalesData';

export interface CategoryAfterSalesTemplateProps {
  data: CategoryAfterSalesInfo;
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

export const CategoryAfterSalesTemplate: React.FC<CategoryAfterSalesTemplateProps> = ({
  data,
  inquiryItems,
  onRemoveInquiryItem,
}) => {
  const [activeChecklistIndex, setActiveChecklistIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const offset = 72;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      window.scrollTo({ top: elementRect - bodyRect - offset, behavior: 'smooth' });
    }
  };

  const getSubNav = () => {
    switch (data.slug) {
      case 'poultry':
        return <PoultrySubNav activeTab="after-sales" />;
      case 'hatchery':
        return (
          <CategorySubNav
            categoryName="Hatchery Solutions"
            basePath="/solutions/hatchery"
            activeTab="after-sales"
            systemLabel="Incubation & Systems"
            accentColor="sky"
            systemIcon={Egg}
          />
        );
      case 'feedmill':
        return (
          <CategorySubNav
            categoryName="Feedmill Systems"
            basePath="/solutions/feedmill"
            activeTab="after-sales"
            systemLabel="Milling & Processing"
            accentColor="amber"
            systemIcon={Factory}
          />
        );
      case 'solar':
        return (
          <CategorySubNav
            categoryName="Solar Systems"
            basePath="/solutions/solar"
            activeTab="after-sales"
            systemLabel="Solar Power Systems"
            accentColor="amber"
            systemIcon={Sun}
            extraTabs={[
              {
                id: 'calculator',
                label: 'Price Calculator',
                path: '/solutions/solar/calculator',
                icon: Calculator,
              },
            ]}
          />
        );
      default:
        return null;
    }
  };

  const accentText = data.accentColor === 'sky' ? 'text-sky-600' : 'text-amber-600';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans text-left">
      {/* ── 1. Sub-Nav Bar ── */}
      {getSubNav()}

      {/* ── 2. Breadcrumb ── */}
      <div className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs font-mono text-slate-500 flex-wrap">
          <Link to="/" className="hover:text-amber-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/solutions" className="hover:text-amber-600 transition-colors">
            Solutions
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to={`/solutions/${data.slug}`} className="hover:text-amber-600 transition-colors">
            {data.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className={`${accentText} font-bold`}>After-Sales Services</span>
        </div>
      </div>

      {/* ── 3. Hero Section ── */}
      <section className="relative bg-white border-b border-slate-200 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        {/* Corner architectural graphic */}
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-80 sm:w-[460px] h-auto object-contain object-right-top pointer-events-none select-none opacity-20"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl space-y-4"
          >
            <div className="flex items-center gap-3">
              <img
                src="/images/branding/ccdi-logo.png"
                alt="CCDI"
                className="h-8 sm:h-9 w-auto object-contain"
              />
              <span className={`font-mono text-xs uppercase tracking-widest ${accentText} font-bold block`}>
                {data.badge}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {data.title}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              {data.subtitle}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={scrollToContact}
                className="flex items-center gap-2 px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-[2px] transition-all shadow-sm cursor-pointer"
              >
                Schedule Service / Inspection
                <ChevronRight className="w-4 h-4" />
              </button>
              <a
                href="tel:+639257588458"
                className="flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                Emergency Hotline: +63 925 7588 458
              </a>
            </div>
          </motion.div>

          {/* ── Service Benchmarks Bar ── */}
          <div className="pt-8 border-t border-slate-200">
            <BenchmarkStatStrip
              eyebrow="SERVICE BENCHMARKS"
              items={data.kpis.map((kpi) => ({
                value: kpi.value,
                label: kpi.label,
                sublabel: kpi.subtext,
              }))}
              theme="light"
            />
          </div>
        </div>
      </section>

      {/* ── 4. Core Service Pillars ── */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className={`font-mono text-xs uppercase tracking-widest ${accentText} font-bold block`}>
              Complete Support Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Four Ways We Keep Your Farm Running Smoothly
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              We help you prevent breakdowns, fix urgent problems quickly, deliver spare parts without delays, and upgrade your equipment over time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-white border border-slate-200 rounded-[2px] p-6 sm:p-7 space-y-5 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-normal uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-700 border border-slate-200">
                      {pillar.tag}
                    </span>
                    <Wrench className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className={`text-xs font-semibold ${accentText} mt-0.5`}>
                      {pillar.subtitle}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                {/* Deliverables checklist */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Included Field Scope:
                  </span>
                  <ul className="space-y-1.5">
                    {pillar.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Detailed Maintenance Checklist ── */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className={`font-mono text-xs uppercase tracking-widest ${accentText} font-bold block`}>
                PREVENTIVE MAINTENANCE SPECIFICATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Systematic multi-point inspection protocol.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Every maintenance visit adheres to rigorous standard operating procedures (SOPs)
                documented with before-and-after diagnostic reports.
              </p>
            </div>

            {/* Checklist category switchers */}
            <div className="flex flex-wrap gap-2">
              {data.checklist.map((group, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveChecklistIndex(idx)}
                  className={`px-3 py-1.5 rounded-[2px] font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    activeChecklistIndex === idx
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {group.category}
                </button>
              ))}
            </div>
          </div>

          {/* Active Checklist Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-[2px] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {data.checklist[activeChecklistIndex].category}
                </h3>
                <span className="text-xs text-slate-500 font-normal">
                  Recommended service cycle: Every {data.checklist[activeChecklistIndex].interval.toLowerCase()}
                </span>
              </div>
              <span className="font-mono text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-[2px] shrink-0 self-start sm:self-auto">
                Interval: {data.checklist[activeChecklistIndex].interval}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.checklist[activeChecklistIndex].items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 bg-white border border-slate-200 rounded-[2px] shadow-2xs"
                >
                  <span className="font-mono text-xs font-bold text-amber-600 shrink-0 w-6 h-6 rounded-[2px] bg-amber-50 flex items-center justify-center border border-amber-200">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Service Level Agreement (SLA) & Response Tiers ── */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className={`font-mono text-xs uppercase tracking-widest ${accentText} font-bold block`}>
              SERVICE LEVEL AGREEMENTS (SLA)
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Guaranteed response tiers when you need support.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              We classify every service ticket into clearly defined severity tiers to prioritize
              emergency interventions and protect operational continuity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.slaTiers.map((tier, idx) => {
              const isCrit = tier.level === 'Critical';
              return (
                <div
                  key={idx}
                  className={`rounded-[2px] p-6 space-y-5 flex flex-col justify-between border ${
                    isCrit
                      ? 'bg-white border-red-300 ring-1 ring-red-200 shadow-sm'
                      : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] ${
                          isCrit
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {tier.level}
                      </span>
                      <Clock className="w-4 h-4 text-slate-400" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{tier.severity}</h3>
                    <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-[2px]">
                      <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                        Response Target:
                      </span>
                      <p className={`text-xs font-bold ${isCrit ? 'text-red-700' : 'text-slate-900'}`}>
                        {tier.responseTime}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Incident Scope:
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {tier.scope}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      CCDI Engineering Action:
                    </span>
                    <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                      {tier.action}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. Strategic Spare Parts Hub in Pampanga ── */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-[#0B1E36] to-slate-950 text-white rounded-[2px] p-8 sm:p-12 border border-[#1E3E66] shadow-xl space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                  <Warehouse className="w-4 h-4" />
                  CENTRAL LOGISTICS &amp; WAREHOUSE ADVANTAGE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Stocked spare parts hub located in Pampanga.
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  Our central depot in Clark Freeport Zone and Angeles City maintains critical
                  mechanical, electrical, and consumable components ready for same-day dispatch,
                  eliminating months of overseas shipping delays.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-[2px] transition-all shadow-md cursor-pointer text-center"
                >
                  Inquire Spare Parts Availability
                </button>
                <Link
                  to={`/solutions/${data.slug}`}
                  className="px-5 py-3.5 bg-transparent border border-slate-600 hover:border-amber-400/60 text-slate-200 hover:text-white font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors text-center"
                >
                  View {data.categoryName} Equipment
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-slate-700/60">
              {data.sparePartsHub.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/60 border border-slate-700/80 rounded-[2px] p-4 text-xs text-slate-300 space-y-2 leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 block" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Category-Specific FAQs ── */}
      <section className="py-16 sm:py-20 bg-[#E6F0F5] border-b border-slate-300/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className={`font-mono text-xs uppercase tracking-widest ${accentText} font-bold`}>
              COMMON INQUIRIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently asked questions about after-sales &amp; warranties.
            </h2>
          </div>

          <div className="space-y-3">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`bg-white border rounded-[2px] transition-all shadow-2xs overflow-hidden ${
                    isOpen ? 'border-amber-400/80 ring-1 ring-amber-400/20' : 'border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <span className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {faq.q}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-[2px] flex items-center justify-center shrink-0 border transition-all ${
                        isOpen
                          ? 'bg-amber-400 border-amber-400 text-slate-950 rotate-180'
                          : 'bg-slate-50 border-slate-200 text-slate-500'
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. Contact & Consultation Section ── */}
      <ContactSection
        inquiryItems={inquiryItems}
        onRemoveInquiryItem={onRemoveInquiryItem}
      />
    </div>
  );
};
