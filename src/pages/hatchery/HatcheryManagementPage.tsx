import React, { useEffect } from 'react';
import { CheckCircle2, Server } from 'lucide-react';
import type { Product } from '../../data/mockProducts';
import { HatcherySubNav } from '../../components/molecules/HatcherySubNav';
import { SolutionHeroBanner } from '../../components/molecules/SolutionHeroBanner';
import { ContactSection } from '../../components/organisms/ContactSection';
import { ImagePlaceholder } from '../../components/atoms/ImagePlaceholder';
import { HATCHERY_IMAGES } from '../../data/hatcheryImages';

export interface HatcheryManagementPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

export const HatcheryManagementPage: React.FC<HatcheryManagementPageProps> = ({
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
      {/* ── 1. HERO BANNER ────────────────────────────────────────── */}
      <SolutionHeroBanner
        breadcrumbs={[
          { label: 'HOME', path: '/' },
          { label: 'OUR SOLUTIONS', path: '/solutions' },
          { label: 'INTEGRATED HATCHERY SOLUTION', path: '/solutions/hatchery' },
          { label: 'INTELLIGENT HATCHERY MANAGEMENT' },
        ]}
        title="Intelligent Hatchery Management"
        subtitle="Our digital platform can connect incubation, automation, HVAC, maintenance, and energy, and production information to monitor operations from a more centralized management environment."
        backgroundImage="/images/capabilities/hatchery-facility.jpg"
        imageAlt="Intelligent Hatchery Management"
        ctaText="Request Management Platform Details"
        onCtaClick={scrollToContact}
      />

      {/* ── 2. STICKY SUB-NAV BAR ──────────────────────────────────── */}
      <HatcherySubNav activeTab="management" />

      {/* ── 3. MANAGEMENT SYSTEMS SHOWCASE ─────────────────────────── */}
      <section className="relative py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Centralized Alarm Dashboard */}
            <div className="flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                    Centralized Alarm Dashboard
                  </span>
                  <span className="font-mono text-[11px] text-amber-600 font-bold">
                    (Target: Small and Medium Hatcheries)
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                  Centralized Alarm Dashboard
                </h2>

                {/* Alarm Dashboard Display */}
                <ImagePlaceholder
                  src={HATCHERY_IMAGES.management.centralizedAlarmDashboard}
                  alt="Centralized Alarm Dashboard"
                  label="Centralized Alarm Dashboard"
                  aspectRatio="video"
                  theme="light"
                />

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                    KEY FEATURES
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {[
                      'Centralized monitoring for up to 20 machines',
                      '21.5-inch visual alarm dashboard',
                      'Remote alarm muting and fault identification',
                      'Multi-device monitoring by a single operator',
                      'Up to 60% faster fault response',
                      'Real-time alerts help reduce losses from delayed response',
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Intelligent Management Center */}
            <div className="flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xs hover:shadow-lg group">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                    Intelligent Management Center
                  </span>
                  <span className="font-mono text-[11px] text-amber-600 font-bold">
                    (Target: Large Hatcheries)
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
                  Intelligent Management Center
                </h2>

                {/* Central Console Display */}
                <ImagePlaceholder
                  src={HATCHERY_IMAGES.management.intelligentManagementCenter}
                  alt="Intelligent Management Center"
                  label="Intelligent Management Center"
                  aspectRatio="video"
                  theme="light"
                />

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                    KEY FEATURES
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {[
                      'Centralized digital management for large-scale hatcheries',
                      'Compatible with both new and legacy equipment',
                      'Integrates equipment monitoring, maintenance, energy, and production management',
                      'Connects incubation, automation, logistics, HVAC, and auxiliary systems',
                      'Supports end-to-end production data and traceability',
                      'Improves management efficiency by up to 50%',
                      'Reduces operational costs by up to 30%',
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* System Modules, Architecture, Perception & Central Nodes */}
          <div className="bg-[#07162A] text-white border border-[#102A43] rounded-[2px] p-6 sm:p-8 space-y-8 shadow-xl">
            
            {/* System Modules & Architecture */}
            <div className="space-y-4">
              <div className="border-b border-[#1E3E66] pb-3">
                <span className="font-mono text-xs text-amber-400 uppercase tracking-widest block font-bold">
                  INTELLIGENT HATCHERY MANAGEMENT
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                  System Modules & Architecture:
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Equipment Monitoring Module', img: HATCHERY_IMAGES.management.equipmentMonitoringModule },
                  { name: 'Energy Management Module', img: HATCHERY_IMAGES.management.energyManagementModule },
                  { name: 'Equipment Operation and Maintenance Module', img: HATCHERY_IMAGES.management.operationMaintenanceModule },
                  { name: 'Production Management Module', img: HATCHERY_IMAGES.management.productionManagementModule },
                ].map((mod, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#0B192C] border border-[#1E3E66] hover:border-amber-400/80 rounded-[2px] flex items-center gap-2.5 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-slate-200">{mod.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment Monitoring & Intelligent Perception */}
            <div className="space-y-4">
              <div className="border-b border-[#1E3E66] pb-3">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Equipment Monitoring & Intelligent Perception:
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { name: 'Incubation Equipment', img: HATCHERY_IMAGES.management.perceptionIncubation },
                  { name: 'Automation Equipment', img: HATCHERY_IMAGES.management.perceptionAutomation },
                  { name: 'Intelligent Logistics', img: HATCHERY_IMAGES.management.perceptionLogistics },
                  { name: 'HVAC Equipment', img: HATCHERY_IMAGES.management.perceptionHvac },
                  { name: 'Auxiliary Equipment', img: HATCHERY_IMAGES.management.perceptionAuxiliary },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#0B192C] border border-[#1E3E66] hover:border-amber-400/80 rounded-[2px] flex items-center justify-center transition-colors"
                  >
                    <span className="text-xs font-semibold text-slate-200 text-center">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Central Nodes */}
            <div className="space-y-4">
              <div className="border-b border-[#1E3E66] pb-3">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Central Nodes:
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  'Intelligent Management Center',
                  'Local Server',
                  'Intelligent Gateway',
                ].map((node, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gradient-to-r from-[#0B192C] to-[#0E243F] border border-amber-400/40 rounded-[2px] flex items-center justify-between"
                  >
                    <span className="text-sm font-bold text-white">{node}</span>
                    <Server className="w-4 h-4 text-amber-400" />
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 4. CONTACT SECTION ────────────────────────────────────── */}
      <ContactSection
        inquiryItems={inquiryItems}
        onRemoveInquiryItem={onRemoveInquiryItem}
      />
    </div>
  );
};
