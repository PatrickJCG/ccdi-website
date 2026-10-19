import React from 'react';
import { Check, Plus, Layers, ShieldCheck } from 'lucide-react';
import { PoultryLocalEngineers, type PoultrySolutionType } from './PoultryLocalEngineers';

export interface HousingMetric {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  /** Primary metrics render larger (e.g. capacity, dimensions) */
  primary?: boolean;
}

export interface HousingAdvantage {
  title?: string;
  description: string;
}

export interface HousingDesignSlideProps {
  optionLabel: string;
  badge: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  imageAlt?: string;
  /** Rendered in the "System Overview" panel below the media */
  overview?: React.ReactNode;
  overviewTitle?: string;
  metrics: HousingMetric[];
  advantages: (string | HousingAdvantage)[];
  solutionType: PoultrySolutionType;
  solutionName: string;
  isAdded: boolean;
  onToggleInquiry: () => void;
}

/** Amber pill accent used for right-column section headings */
const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-2">
    <span className="w-1.5 h-3.5 bg-amber-500 rounded-full" />
    <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold">{children}</span>
  </div>
);

/**
 * Shared housing-design slide body (dark navy product card + light spec column).
 * Render inside a <SwiperSlide>; keeps the swiper parallax data attributes.
 */
export const HousingDesignSlide: React.FC<HousingDesignSlideProps> = ({
  optionLabel,
  badge,
  title,
  subtitle,
  imageUrl,
  imageAlt,
  overview,
  overviewTitle = 'System Overview',
  metrics,
  advantages,
  solutionType,
  solutionName,
  isAdded,
  onToggleInquiry,
}) => (
  <div className="relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-50/60 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm h-full">
    {/* ── Product Card (dark hero) ── */}
    <div data-swiper-parallax="-260" className="relative z-10 lg:col-span-5 flex flex-col justify-between">
      <div className="relative overflow-hidden rounded-2xl border border-[#1D3A63] bg-gradient-to-b from-[#0B192C] via-[#0F213A] to-[#14294A] p-5 sm:p-6 text-white shadow-xl shadow-[#0B192C]/25 h-full flex flex-col justify-between gap-5">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300" />
        <div className="space-y-4">
          {/* Option Micro-Badge Header */}
          <div
            data-swiper-parallax="-120"
            data-swiper-parallax-opacity="0.4"
            className="flex items-center justify-between gap-2 pb-3 border-b border-white/10"
          >
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ring-4 ring-amber-400/20" />
              <span>{optionLabel}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-[#0B192C] border border-amber-300 font-sans">
              {badge}
            </span>
          </div>

          {/* Product Title */}
          <div>
            <h3
              data-swiper-parallax="-280"
              data-swiper-parallax-opacity="0"
              className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-white leading-tight"
            >
              {title}
            </h3>
            {subtitle && (
              <p className="text-[13px] text-slate-300 mt-1.5 font-normal leading-relaxed">{subtitle}</p>
            )}
          </div>

          {/* Media */}
          <div
            data-swiper-parallax="-380"
            data-swiper-parallax-scale="0.9"
            data-swiper-parallax-opacity="0.2"
            className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-slate-950 border border-white/10 ring-1 ring-amber-400/20 shadow-lg shadow-black/30"
          >
            <img src={imageUrl} alt={imageAlt ?? title} className="w-full h-full object-cover brightness-[0.98]" />
            <img
              src="/images/accents/card-corner-accent.png"
              alt=""
              data-swiper-parallax="-480"
              className="absolute top-0 right-0 w-28 sm:w-36 h-auto object-contain object-right-top pointer-events-none select-none z-10 drop-shadow-sm opacity-80"
              aria-hidden="true"
            />
          </div>

          {/* Overview Panel */}
          {overview && (
            <div
              data-swiper-parallax="-180"
              data-swiper-parallax-opacity="0.2"
              className="p-3.5 bg-white/[0.04] border border-white/10 rounded-xl space-y-2 text-xs"
            >
              <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>{overviewTitle}</span>
              </div>
              <div className="text-slate-300 text-xs leading-relaxed">{overview}</div>
            </div>
          )}
        </div>

        {/* Inquiry Action */}
        <div data-swiper-parallax="-100" className="pt-2">
          <button
            type="button"
            onClick={onToggleInquiry}
            className={`w-full py-3.5 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md active:scale-[0.99] ${
              isAdded
                ? 'bg-white text-[#0B192C] hover:bg-slate-100'
                : 'bg-amber-400 text-[#0B192C] hover:bg-amber-300 shadow-amber-500/30'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Attached to Inquiry Drawer</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Attach Building Package to Inquiry</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>

    {/* ── Spec Column ── */}
    <div data-swiper-parallax="-420" className="relative z-10 lg:col-span-7 flex flex-col justify-between space-y-6">
      <div className="space-y-6">
        {/* Technical Metrics */}
        <div className="space-y-3">
          <div data-swiper-parallax="-160" data-swiper-parallax-opacity="0.3">
            <SectionHeading>Technical Metrics &amp; Capacities</SectionHeading>
          </div>
          <div
            data-swiper-parallax="-300"
            data-swiper-parallax-opacity="0.2"
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {metrics.map((m) => (
              <div
                key={m.label}
                className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all"
              >
                <span className="block text-[10px] font-mono uppercase font-bold tracking-wider text-slate-500 mb-1">
                  {m.label}
                </span>
                <div
                  className={
                    m.primary
                      ? 'text-xl font-extrabold text-[#0B192C] tracking-tight'
                      : 'text-lg font-bold text-slate-900 tracking-tight'
                  }
                >
                  {m.value}
                </div>
                {m.sub && <span className="text-[11px] text-slate-500 block mt-1 font-normal">{m.sub}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Advantages */}
        <div data-swiper-parallax="-480" data-swiper-parallax-opacity="0.1" className="space-y-3">
          <SectionHeading>Engineering Advantages</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {advantages.map((adv, idx) => {
              const item = typeof adv === 'string' ? { description: adv } : adv;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs hover:border-amber-400/60 hover:shadow-sm transition-all flex items-start gap-3"
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    {item.title && (
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">{item.title}</h4>
                    )}
                    <p
                      className={`text-[11px] leading-relaxed font-normal ${
                        item.title ? 'text-slate-500 mt-1' : 'text-slate-700'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Local Engineering Team */}
        <div data-swiper-parallax="-500" data-swiper-parallax-opacity="0.1" className="space-y-2.5 pt-1">
          <SectionHeading>Local Professional Engineering Team</SectionHeading>
          <PoultryLocalEngineers solutionType={solutionType} solutionName={solutionName} compact />
        </div>
      </div>

      {/* Brand Footer Strip */}
      <div
        data-swiper-parallax="-520"
        data-swiper-parallax-opacity="0.2"
        className="flex items-center justify-between pt-3 border-t border-slate-200/60"
      >
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Turnkey CCDI Engineering &amp; Biosecurity Certified</span>
        </div>
        <img
          src="/images/branding/CCDI%20logo.svg"
          alt="CCDI - Clark Base Construction & Dev't Inc."
          className="w-20 sm:w-24 h-auto object-contain select-none pointer-events-none drop-shadow-xs opacity-90"
        />
      </div>
    </div>
  </div>
);
