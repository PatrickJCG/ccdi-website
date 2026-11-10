import React from 'react';
import { Check, Plus, Layers, ShieldCheck } from 'lucide-react';
import { PoultryLocalEngineers, type PoultrySolutionType } from './PoultryLocalEngineers';

export interface HousingMetric {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  /** Primary metrics flag (maintained for interface compatibility) */
  primary?: boolean;
}

export interface HousingAdvantage {
  title?: string;
  description: string;
}

export interface HousingDesignSlideProps {
  optionLabel: string;
  badge?: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  imageAlt?: string;
  /** Custom media node (e.g. video / photo tab toggle), replaces imageUrl */
  mediaContent?: React.ReactNode;
  /** Rendered in the "System Overview" panel below the media */
  overview?: React.ReactNode;
  overviewTitle?: string;
  metrics: HousingMetric[];
  extraContent?: React.ReactNode;
  advantages: (string | HousingAdvantage)[];
  solutionType: PoultrySolutionType;
  solutionName: string;
  isAdded: boolean;
  onToggleInquiry: () => void;
  showLocalEngineers?: boolean;
}

/** Amber pill accent used for section headings with uniform font size */
const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-2">
    <span className="w-1.5 h-3.5 bg-amber-500 rounded-full shrink-0" />
    <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold">
      {children}
    </span>
  </div>
);

/**
 * Redesigned clean, minimalistic, content-adaptive housing design slide.
 * - Uniform typography across all titles, spec titles, values, details, and advantages.
 * - Dynamically adapts height to content without artificial stretching or dead whitespace.
 * - Balanced 2-column layout (Visual & CTA on left, Specs & Advantages on right).
 */
export const HousingDesignSlide: React.FC<HousingDesignSlideProps> = ({
  optionLabel,
  badge,
  title,
  subtitle,
  imageUrl,
  imageAlt,
  mediaContent,
  overview,
  overviewTitle = 'System Overview',
  metrics,
  extraContent,
  advantages,
  solutionType,
  solutionName,
  isAdded,
  onToggleInquiry,
  showLocalEngineers = false,
}) => (
  <div className="relative overflow-hidden bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
    {/* Amber Top Accent Bar */}
    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300" />

    {/* ── Slide Header: Option Badge + Product Title + Subtitle ── */}
    <div
      data-swiper-parallax="-180"
      className="p-5 sm:p-6 lg:p-7 pb-4 sm:pb-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-amber-600 uppercase">
          <span className="w-2 h-2 rounded-full bg-amber-500 ring-4 ring-amber-400/20" />
          <span>{optionLabel}</span>
          {badge && (
            <>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 font-medium">{badge}</span>
            </>
          )}
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B192C]">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>

    {/* ── Main Body: Dynamic 2-Column Responsive Layout ── */}
    <div className="p-5 sm:p-6 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* ── Left Column: Media Showcase + System Overview + Inquiry Action ── */}
      <div data-swiper-parallax="-260" className="lg:col-span-5 space-y-4">
        {/* Media (Custom Media Node or Default Image) */}
        {mediaContent ? (
          mediaContent
        ) : imageUrl ? (
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-200/90 shadow-xs group">
            <img
              src={imageUrl}
              alt={imageAlt ?? title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <img
              src="/images/accents/card-corner-accent.png"
              alt=""
              className="absolute top-0 right-0 w-24 h-auto object-contain object-right-top pointer-events-none select-none z-10 opacity-70"
              aria-hidden="true"
            />
          </div>
        ) : null}

        {/* System Overview Panel */}
        {overview && (
          <div
            data-swiper-parallax="-220"
            className="p-4 bg-slate-50/80 border border-slate-200/70 rounded-xl space-y-1.5"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>{overviewTitle}</span>
            </div>
            <div className="text-xs text-slate-600 leading-relaxed font-normal">
              {overview}
            </div>
          </div>
        )}

        {/* Extra Interactive Content (e.g. Configurable Harvest Method) */}
        {extraContent && (
          <div data-swiper-parallax="-200">
            {extraContent}
          </div>
        )}

        {/* Primary Inquiry Action */}
        <div data-swiper-parallax="-140" className="pt-0.5">
          <button
            type="button"
            onClick={onToggleInquiry}
            className={`w-full py-3 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md active:scale-[0.99] ${isAdded
                ? 'bg-[#0B192C] text-white hover:bg-slate-800'
                : 'bg-amber-400 text-[#0B192C] hover:bg-amber-300 shadow-amber-500/25'
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

      {/* ── Right Column: Specs Matrix + Extra Content + Advantages + Certified ── */}
      <div data-swiper-parallax="-340" className="lg:col-span-7 space-y-5">
        {/* Technical Specifications Grid */}
        <div className="space-y-2.5">
          <SectionHeading>Technical Specifications</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="bg-slate-50/70 rounded-xl p-3 sm:p-3.5 border border-slate-200/70 hover:border-amber-400/50 hover:bg-white transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    {m.label}
                  </span>
                  <div className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                    {m.value}
                  </div>
                </div>
                {m.sub && (
                  <span className="text-xs text-slate-500 block mt-1.5 pt-1.5 border-t border-slate-200/60 font-normal leading-normal">
                    {m.sub}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Engineering Advantages */}
        <div data-swiper-parallax="-440" className="space-y-2.5 pt-0.5">
          <SectionHeading>Engineering Advantages</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {advantages.map((adv, idx) => {
              const item = typeof adv === 'string' ? { description: adv } : adv;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-xs flex items-start gap-2.5 hover:border-amber-400/50 transition-colors"
                >
                  <div className="w-5 h-5 rounded-md bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    {item.title && (
                      <h4 className="font-bold text-xs text-slate-900 leading-tight mb-0.5">
                        {item.title}
                      </h4>
                    )}
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Optional Local Engineers */}
        {showLocalEngineers && (
          <div data-swiper-parallax="-480" className="space-y-2 pt-1">
            <SectionHeading>Local Professional Engineering Team</SectionHeading>
            <PoultryLocalEngineers solutionType={solutionType} solutionName={solutionName} compact />
          </div>
        )}

        {/* Brand Certification Footer */}
        <div
          data-swiper-parallax="-520"
          className="flex items-center justify-between pt-3.5 border-t border-slate-200/70"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Turnkey CCDI Engineering &amp; Biosecurity Certified</span>
          </div>
          <img
            src="/images/branding/CCDI%20logo.svg"
            alt="CCDI - Clark Base Construction & Dev't Inc."
            className="w-20 sm:w-22 h-auto object-contain select-none pointer-events-none drop-shadow-xs opacity-90"
          />
        </div>
      </div>
    </div>
  </div>
);
