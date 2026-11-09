import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Warehouse,
  ChevronDown,
  ArrowRight,
  Phone,
} from 'lucide-react';
import type { CategoryAfterSalesInfo } from '../../data/afterSalesData';

export interface AfterSalesSectionProps {
  id?: string;
  data: CategoryAfterSalesInfo;
  onCtaClick?: () => void;
  catalogLink?: {
    label: string;
    href: string;
  };
  className?: string;
}

export const AfterSalesSection: React.FC<AfterSalesSectionProps> = ({
  id = 'after-sales',
  data,
  onCtaClick,
  catalogLink,
  className = '',
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section
      id={id}
      className={`relative py-16 sm:py-24 bg-[#07162A] text-white border-b border-[#102A43] overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold block">
            {data.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {data.title}
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        {/* KPI Strip */}
        {data.kpis && data.kpis.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {data.kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-[#0B192C] border border-[#1E3E66] p-5 rounded-[2px] space-y-1"
              >
                <span className="font-mono text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  {kpi.label}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {kpi.value}
                </div>
                <p className="text-xs text-slate-400">{kpi.subtext}</p>
              </div>
            ))}
          </div>
        )}

        {/* 4 Service Pillars */}
        {data.pillars && data.pillars.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E3E66]">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                Core Service Capabilities
              </span>
              <span className="font-mono text-[11px] text-amber-400 font-bold">
                Field Engineering SLA
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.pillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="bg-[#0B192C] border border-[#1E3E66] hover:border-amber-400/80 p-6 rounded-[2px] flex flex-col justify-between space-y-4 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-widest px-2.5 py-1 rounded-[2px] bg-amber-400/10 border border-amber-400/30">
                        {pillar.tag}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-amber-300 font-mono mt-0.5">
                        {pillar.subtitle}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>

                  {pillar.deliverables && pillar.deliverables.length > 0 && (
                    <div className="pt-3 border-t border-[#1E3E66]">
                      <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Key Deliverables
                      </span>
                      <ul className="space-y-1.5">
                        {pillar.deliverables.map((deliv, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scheduled Maintenance Protocol */}
        {data.checklist && data.checklist.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E3E66]">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                Scheduled Preventive Maintenance Protocol
              </span>
              <span className="font-mono text-[11px] text-amber-400 font-bold">
                Routine Diagnostics
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {data.checklist.map((block, idx) => (
                <div
                  key={idx}
                  className="bg-[#0B192C] border border-[#1E3E66] p-5 rounded-[2px] flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded-[2px] bg-slate-800 text-slate-300 border border-slate-700">
                        {block.interval}
                      </span>
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {block.category}
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {block.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLA Tiers & Central Parts Depot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* SLA Matrix */}
          {data.slaTiers && data.slaTiers.length > 0 && (
            <div className="lg:col-span-7 bg-[#0B192C] border border-[#1E3E66] p-6 sm:p-7 rounded-[2px] space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Service Level Agreement (SLA) Matrix
                </span>
                <h3 className="text-xl font-bold text-white">
                  Guaranteed Dispatch &amp; Technical Triage
                </h3>
              </div>
              <div className="space-y-3 pt-2">
                {data.slaTiers.map((tier, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-3.5 rounded-[2px] bg-[#07162A] border border-[#1E3E66] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{tier.severity}</span>
                      <span
                        className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-[2px] ${
                          tier.level === 'Critical'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : tier.level === 'Elevated'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                        }`}
                      >
                        {tier.responseTime}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{tier.scope}</p>
                    <p className="text-xs text-amber-300/90 font-medium leading-relaxed">
                      Action: {tier.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Central Spares Hub */}
          <div className={`${data.slaTiers && data.slaTiers.length > 0 ? 'lg:col-span-5' : 'lg:col-span-12'} bg-[#0B192C] border border-[#1E3E66] p-6 sm:p-7 rounded-[2px] flex flex-col justify-between space-y-4`}>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-[2px] bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Warehouse className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  Central Spares Hub &middot; Clark / Angeles
                </span>
                <h3 className="text-xl font-bold text-white">
                  Emergency Spares Always In-Stock
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Avoid costly downtime waiting for international air freight. CCDI maintains an in-stock inventory of genuine components, wear parts, and critical accessories in Pampanga for rapid dispatch.
              </p>
              {data.sparePartsHub && data.sparePartsHub.length > 0 && (
                <ul className="space-y-2 pt-2 border-t border-[#1E3E66] text-xs text-slate-300">
                  {data.sparePartsHub.map((hubItem, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{hubItem}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {catalogLink && (
              <div className="pt-4 border-t border-[#1E3E66] flex flex-col gap-2">
                <a
                  href={catalogLink.href}
                  className="w-full text-center px-4 py-2.5 bg-[#07162A] hover:bg-[#102A43] text-white border border-[#1E3E66] hover:border-amber-400 text-xs font-bold uppercase tracking-wider rounded-[2px] transition-colors"
                >
                  {catalogLink.label}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Interactive FAQs Accordion */}
        {data.faqs && data.faqs.length > 0 && (
          <div className="bg-[#0B192C] border border-[#1E3E66] p-6 sm:p-8 rounded-[2px] space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Frequently Answered Questions
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Service, Maintenance &amp; Technical Support Protocols
              </h3>
            </div>

            <div className="space-y-3 pt-2">
              {data.faqs.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div
                    key={fIdx}
                    className="border border-[#1E3E66] rounded-[2px] overflow-hidden bg-[#07162A]/60 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                    >
                      <span className="text-sm font-semibold text-white">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#1E3E66]/60">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action CTA Bar */}
        <div className="p-6 sm:p-8 rounded-[2px] bg-gradient-to-r from-[#0B192C] to-[#102A43] border border-[#1E3E66] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Require Emergency Technical Triage or Preventative Audit?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Connect directly with our senior field engineering team for fast diagnostic support and maintenance scheduling.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onCtaClick && (
              <button
                type="button"
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-sans text-xs uppercase tracking-wider rounded-[2px] transition-colors cursor-pointer shadow-sm"
              >
                <span>Request Service Support</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <a
              href="tel:+639257588458"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#07162A] hover:bg-[#1E3E66] text-white border border-slate-700 hover:border-amber-400 font-semibold font-sans text-xs uppercase tracking-wider rounded-[2px] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>24/7 Hotline</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

