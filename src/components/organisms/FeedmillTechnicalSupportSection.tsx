import React from 'react';
import { Wrench, GraduationCap, Package, RefreshCw, ChevronRight, PhoneCall, ShieldCheck } from 'lucide-react';

export interface FeedmillTechnicalSupportSectionProps {
  onCtaClick?: () => void;
}

const SUPPORT_SCOPE = [
  {
    icon: Wrench,
    title: 'Installation and Commissioning',
    desc: 'Precision mechanical alignment, motor control center integration, sensor validation, and no-load & full-load trial runs by certified engineers.',
  },
  {
    icon: GraduationCap,
    title: 'Operator and Maintenance Training',
    desc: 'Comprehensive hands-on training for plant technicians covering formulation software, die and roller adjustments, safety procedures, and routine maintenance.',
  },
  {
    icon: Package,
    title: 'Spare and Wear Parts Supply',
    desc: 'Ready inventory of ring dies, roller shells, tungsten beaters, screen meshes, and critical consumables to guarantee continuous plant uptime.',
  },
  {
    icon: RefreshCw,
    title: 'Troubleshooting and System Upgrades',
    desc: 'Rapid-response troubleshooting, vibration diagnostics, capacity debottlenecking, and retrofit upgrades for existing milling installations.',
  },
];

export const FeedmillTechnicalSupportSection: React.FC<FeedmillTechnicalSupportSectionProps> = ({ onCtaClick }) => {
  return (
    <section className="relative py-20 sm:py-24 bg-slate-50 border-b border-slate-200 overflow-hidden font-sans text-left">
      {/* TODO: Confirm feedmill machinery spare parts stock and maintenance SLA with technical team */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold">
                AFTER-SALES & ENGINEERING SUPPORT
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Feedmill After-Sales & Technical Support
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              CCDI provides full lifecycle assurance to protect your capital investment. From factory-guided installation to long-term spare parts supply and plant optimization across the Philippines.
            </p>
          </div>

          <a
            href="/solutions/feedmill/after-sales"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold bg-white text-[#0B192C] border border-slate-300 hover:border-amber-400 hover:text-amber-600 transition-colors shadow-2xs self-start md:self-end shrink-0"
          >
            <span>View Full Service SLA</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUPPORT_SCOPE.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-amber-400 rounded-[2px] p-6 space-y-4 transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-[2px] bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B192C] group-hover:text-amber-600 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-amber-700 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>CCDI Certified Scope</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#0B192C] text-white rounded-[2px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-[#1E3E66]">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-black text-white">
              Need technical support or replacement wear parts?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Our engineering team responds to urgent milling inquiries, die reconditioning requests, and maintenance visits nationwide.
            </p>
          </div>
          <button
            type="button"
            onClick={onCtaClick}
            className="shrink-0 px-6 py-3.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-extrabold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            Request Technical Service
          </button>
        </div>

      </div>
    </section>
  );
};

