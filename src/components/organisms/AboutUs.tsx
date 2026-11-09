import React, { useState } from 'react';
import { BenchmarkStatStrip } from '../molecules/BenchmarkStatStrip';

const STATS = [
  { value: '2019',    label: 'YEAR ESTABLISHED' },
  { value: '100%',    label: 'BIO-SECURITY' },
  { value: 'TURNKEY', label: 'FACILITY EPC' },
  { value: 'TIER-1',  label: 'GLOBAL SOURCING' },
];

export interface CoreValueItem {
  index: string;
  id: string;
  title: string;
  description: string;
}

const CORE_VALUES: CoreValueItem[] = [
  {
    index: '01',
    id: 'integrity',
    title: 'Integrity',
    description: 'We place the highest standard of honesty at the center of our work, ensuring every project is grounded in ethical and transparent practices.',
  },
  {
    index: '02',
    id: 'excellence',
    title: 'Strive for Excellence',
    description: 'We relentlessly exceed expectations through our competitive, professional, and technically skilled team to deliver quality workmanship and agro-industrial success.',
  },
  {
    index: '03',
    id: 'innovation',
    title: 'Power for Innovation',
    description: 'We embrace bold thinking and innovation, turning concepts into efficient and scalable outputs.',
  },
  {
    index: '04',
    id: 'customer',
    title: 'Customer Focus',
    description: 'We are committed to forging long-term partnerships, standing beside our clients to meet their needs in all stages and initiatives.',
  },
  {
    index: '05',
    id: 'sustainability',
    title: 'Sustainability',
    description: 'We build responsibly, providing sustainable systems and facilities that balance performance with environmental stewardship.',
  },
];

export const AboutUs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision'>('mission');

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
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
          <div className="space-y-4 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold">
              CCDI / OUR COMPANY
            </p>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B192C] leading-[1.08]">
              Integrated Solutions for Agribusiness
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Founded in 2019, Clarkbase Construction Dev’t Inc. (CCDI) provides integrated agribusiness solutions in the Philippines. Services include facility design and construction, equipment installation, and solar energy integration for poultry, livestock, and related industries.
            </p>
          </div>

          <div className="shrink-0 self-start lg:self-center">
            <img
              src="/images/branding/ccdi-logo.svg"
              alt="CCDI"
              className="h-28 sm:h-36 lg:h-44 w-auto object-contain"
            />
          </div>
        </div>

        {/* ── 2. NUMBERS ARE THE HERO: HIGH-CONTRAST GOLD MONUMENTAL METRICS ── */}
        <div className="border-t border-slate-200 pt-12">
          <BenchmarkStatStrip
            eyebrow="OPERATIONAL BENCHMARKS"
            items={STATS}
            theme="light"
          />
        </div>

        {/* ── 3. STRATEGIC PURPOSE: MISSION & VISION (SHARP 2PX CORNERS, WHITE PANEL) ── */}
        <div className="border-t border-slate-200 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber-600 font-bold">
              OUR PURPOSE
            </span>
            <h3 className="text-xl font-bold text-[#0B192C]">
              Supporting Agribusiness
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Practical, cost-efficient, and sustainable solutions for farming operations.
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
                Mission
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
                Vision
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 p-6 sm:p-8 bg-white border border-slate-200 rounded-[2px] relative overflow-hidden">
            {/* Ambient Logo Watermark */}
            <img
              src="/images/branding/ccdi-logo.svg"
              alt=""
              aria-hidden="true"
              className="absolute -right-4 -bottom-6 h-40 sm:h-48 w-auto object-contain opacity-[0.05] pointer-events-none select-none"
            />
            {activeTab === 'mission' ? (
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-600 font-bold">
                  Mission
                </span>
                <p className="text-lg sm:text-xl font-medium text-slate-900 leading-relaxed font-sans">
                  "To strengthen the agribusiness sector while supporting progress in infrastructure and solar energy through integrated, innovative solutions that enable sustainable, cost-efficient, and high-performing farming operations."
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-600 font-bold">
                  Vision
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
                OUR CORE VALUES
              </h3>
            </div>
          </div>

          {/* High-Density Horizontal Gridlines (Light Mode) */}
          <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
            {CORE_VALUES.map((val) => (
              <div
                key={val.id}
                className="py-4 px-2 hover:bg-white transition-colors"
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

                  <div className="sm:w-2/3 text-left">
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
