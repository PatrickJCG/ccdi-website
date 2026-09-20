import React, { useState } from 'react';

const STATS = [
  { value: '2019',    label: 'YEAR ESTABLISHED', sublabel: 'Philippine engineering origin' },
  { value: '100%',    label: 'BIO-SECURITY',     sublabel: 'Pathogen defense compliance' },
  { value: 'TURNKEY', label: 'FACILITY EPC',     sublabel: 'Integrated design & build' },
  { value: 'TIER-1',  label: 'GLOBAL SOURCING',  sublabel: 'Direct factory warranties' },
];

export interface CoreValueItem {
  index: string;
  id: string;
  title: string;
  summary: string;
  details: string;
}

const CORE_VALUES: CoreValueItem[] = [
  {
    index: '01',
    id: 'integrity',
    title: 'INTEGRITY',
    summary: 'Unwavering transparency, pricing honesty, and strict accountability.',
    details: 'We conduct every project with uncompromised ethics, transparent pricing, and dependable commitments. Trust is the cornerstone of every client partnership and vendor relationship.',
  },
  {
    index: '02',
    id: 'excellence',
    title: 'STRIVE FOR EXCELLENCE',
    summary: 'Rigorous international quality benchmarks across all builds.',
    details: 'We hold our design standards, construction craftsmanship, and equipment installations to strict international benchmarks. Settling for "good enough" is never an option.',
  },
  {
    index: '03',
    id: 'innovation',
    title: 'POWER FOR INNOVATION',
    summary: 'Smart climate automation and clean solar microgrid integration.',
    details: 'We actively introduce state-of-the-art agricultural technology, automation systems, and renewable energy models to elevate traditional farming into high-efficiency industrial assets.',
  },
  {
    index: '04',
    id: 'customer',
    title: 'CUSTOMER FOCUS',
    summary: 'Engineering solutions tailored to unique geographical and operational goals.',
    details: 'Every agricultural facility presents unique environmental and operational challenges. We listen closely, tailor our engineering plans to client goals, and provide ongoing technical support.',
  },
  {
    index: '05',
    id: 'sustainability',
    title: 'SUSTAINABILITY',
    summary: 'Eco-efficient infrastructure protecting natural resources and lowering energy overhead.',
    details: 'We are deeply committed to protecting natural resources. Through energy-efficient building envelopes, low-emissions feedmill designs, and solar energy integration, we help build a resilient future.',
  },
];

export const AboutUs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision'>('mission');
  const [expandedValue, setExpandedValue] = useState<string>('integrity');

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 bg-slate-50 text-slate-900 border-b border-slate-200 font-sans overflow-hidden"
    >
      {/* Architectural Top-Right Corner Accent */}
      <img
        src="/images/accents/card-corner-accent.png"
        alt=""
        className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 text-left">

        {/* ── 1. SECTION HEADER (LIGHT SLATE SECTION, NAVY TYPOGRAPHY, GOLD ACCENT) ── */}
        <div className="space-y-6 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold">
            CCDI / CORPORATE FOUNDATION
          </p>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B192C] leading-[1.08]">
            Pioneering agro-industrial engineering standards since 2019.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Clarkbase Construction Dev't Inc. (CCDI) transforms agricultural production through integrated structural engineering, bio-secure poultry housing, turnkey feedmilling plants, and industrial solar integration across the Philippines.
          </p>
        </div>

        {/* ── 2. NUMBERS ARE THE HERO: HIGH-CONTRAST GOLD MONUMENTAL METRICS ── */}
        <div className="border-t border-slate-200 pt-12">
          <div className="mb-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              OPERATIONAL BENCHMARKS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label, sublabel }) => (
              <div
                key={label}
                className="border-l-2 border-amber-500 pl-5 flex flex-col justify-start text-left"
              >
                {/* Hero Number: Plus Jakarta Sans, Bold, Gold */}
                <div className="text-4xl sm:text-5xl font-extrabold font-sans tracking-tight text-amber-600 leading-none mb-3">
                  {value}
                </div>
                <p className="font-sans text-xs font-bold uppercase tracking-wider text-[#0B192C] mb-1">
                  {label}
                </p>
                <p className="text-xs text-slate-500 leading-normal font-sans">
                  {sublabel}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. STRATEGIC PURPOSE: MISSION & VISION (SHARP 2PX CORNERS, WHITE PANEL) ── */}
        <div className="border-t border-slate-200 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber-600 font-bold">
              STRATEGIC DIRECTIVE
            </span>
            <h3 className="text-xl font-bold text-[#0B192C]">
              Guiding Institutional Purpose
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our engineering thesis aligns operational profitability with ecological longevity.
            </p>

            {/* Flat Tabs (Navy & Gold, 2px Corners) */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('mission')}
                className={`px-3.5 py-1.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold transition-colors ${
                  activeTab === 'mission'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                [01 MISSION]
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('vision')}
                className={`px-3.5 py-1.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold transition-colors ${
                  activeTab === 'vision'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                [02 VISION]
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 p-6 sm:p-8 bg-white border border-slate-200 rounded-[2px]">
            {activeTab === 'mission' ? (
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-600 font-bold">
                  STATEMENT OF MISSION
                </span>
                <p className="text-lg sm:text-xl font-medium text-slate-900 leading-relaxed font-sans">
                  "To strengthen the agribusiness sector while supporting progress in infrastructure and solar energy through integrated, innovative solutions that enable sustainable, cost-efficient, and high-performing farming operations."
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-600 font-bold">
                  STATEMENT OF VISION
                </span>
                <p className="text-lg sm:text-xl font-medium text-slate-900 leading-relaxed font-sans">
                  "To be a competitive global leader in agro-industrial development through bold innovation, sustainable impact, and enduring engineering excellence."
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── 4. CORE VALUES: HIGH-DENSITY FAINT HORIZONTAL GRIDLINES ── */}
        <div className="border-t border-slate-200 pt-16">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 gap-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber-600 font-bold">
                OPERATING ETHOS
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B192C] mt-1">
                Five Core Principles
              </h3>
            </div>
            <span className="font-mono text-xs text-slate-500 font-medium">
              CLICK ITEM TO EXPAND DETAILS
            </span>
          </div>

          {/* High-Density Horizontal Gridlines (Light Mode) */}
          <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
            {CORE_VALUES.map((val) => {
              const isOpen = expandedValue === val.id;
              return (
                <div
                  key={val.id}
                  onClick={() => setExpandedValue(isOpen ? '' : val.id)}
                  className="py-4 px-2 hover:bg-white transition-colors cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-4 sm:w-1/3">
                      <span className="font-mono text-xs text-amber-600 font-bold">
                        {val.index}
                      </span>
                      <h4 className="font-sans text-sm font-bold text-[#0B192C] tracking-tight">
                        {val.title}
                      </h4>
                    </div>

                    <div className="sm:w-1/2 text-left">
                      <p className="text-xs sm:text-sm text-slate-600 font-normal">
                        {val.summary}
                      </p>
                    </div>

                    <div className="sm:w-16 text-right shrink-0">
                      <span className="font-mono text-xs text-amber-600 hover:text-amber-700 font-bold">
                        {isOpen ? '[-]' : '[+]'}
                      </span>
                    </div>
                  </div>

                  {/* Progressive Disclosure Details */}
                  {isOpen && (
                    <div className="pt-3 pb-1 pl-8 sm:pl-12 text-xs text-slate-600 leading-relaxed max-w-3xl">
                      {val.details}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
