import React from 'react';

interface Pillar {
  number: string;
  title: string;
  category: string;
  description: string;
}

const PILLARS: Pillar[] = [
  {
    number: '01',
    title: 'Uncompromising Reliability',
    category: 'CERTIFIED GLOBAL PARTNERS',
    description: 'We source strictly from certified international manufacturers to ensure structural integrity, biosecurity compliance, and long-term climate durability.',
  },
  {
    number: '02',
    title: 'Strategic Cost Efficiency',
    category: 'VALUE ENGINEERING',
    description: 'Through value engineering and modular planning, we minimize upfront capital expenditure while maximizing lifetime thermal, energy, and operational efficiency.',
  },
  {
    number: '03',
    title: 'Direct Global Sourcing',
    category: 'TIER-1 OEM WARRANTIES',
    description: 'By bypassing middle-layer distribution channels, CCDI secures direct factory warranties and transparent pricing on heavy agricultural equipment.',
  },
  {
    number: '04',
    title: 'Technical Engineering Competency',
    category: 'CROSS-DISCIPLINARY TEAMS',
    description: 'Our in-house team unites civil engineers, electrical designers, agricultural specialists, and solar PV technicians to deliver unified project execution.',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="values" className="relative py-24 sm:py-32 bg-white border-b border-slate-200 text-left font-sans text-slate-900 overflow-hidden">
      {/* Architectural Top-Right Corner Accent */}
      <img
        src="/images/accents/card-corner-accent.png"
        alt=""
        className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header: Plus Jakarta Sans, Navy + Gold */}
        <div className="space-y-4 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold">
            CCDI / OPERATIONAL ADVANTAGES
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B192C] leading-tight">
            Built on engineering integrity & proven execution.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We combine international material standards, direct supply chains, and specialized engineering knowledge to deliver agro-industrial infrastructure projects on time, within budget, and built to endure.
          </p>
        </div>

        {/* ── 4 PILLARS: 1PX GRID / WHITE CARDS / GOLD ACCENTS / SHARP 2PX ── */}
        <div className="border-t border-slate-200 pt-10">
          <div className="mb-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              FOUR OPERATIONAL PILLARS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
            {PILLARS.map(({ number, title, category, description }) => (
              <div
                key={number}
                className="bg-white p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:bg-slate-50 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
                    <span className="font-mono text-xl font-extrabold text-amber-600 tabular-nums">
                      {number}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                      PILLAR
                    </span>
                  </div>

                  <p className="font-mono text-[10px] uppercase tracking-wider text-amber-600 font-bold">
                    {category}
                  </p>

                  <h3 className="text-base font-bold text-[#0B192C] tracking-tight leading-snug">
                    {title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-2 font-normal">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
