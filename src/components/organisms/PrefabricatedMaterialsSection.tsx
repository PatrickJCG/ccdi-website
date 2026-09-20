import React, { useState } from 'react';

export interface PrefabricatedMaterialsSectionProps {
  id?: string;
  sourceBrochure?: string;
}

export interface MaterialSpecItem {
  id: string;
  category: string;
  name: string;
  specification: string;
  standard: string;
  image: string;
  description: string;
  keyMetrics: { label: string; value: string }[];
}

export const POULTRY_MATERIALS_SPECS: MaterialSpecItem[] = [
  {
    id: 'main-structure',
    category: 'PRIMARY FRAME',
    name: 'Main Structure (Q355B H-Steel)',
    specification: 'Q355B Welding and hot rolling H steel',
    standard: 'Shot blasting (SA2.5) • Antirusting paint (Grey)',
    image: '/images/materials/main-structure.jpg',
    description: 'High-tensile rigid portal frame columns and rafters engineered for wide spans without interior obstructions.',
    keyMetrics: [
      { label: 'Steel Grade', value: 'Q355B Hot-Rolled' },
      { label: 'Surface Prep', value: 'SA2.5 Shot Blasting' },
      { label: 'Finish', value: 'Anti-rust Grey Coat' },
    ],
  },
  {
    id: 'secondary-structure',
    category: 'LATERAL STABILITY',
    name: 'Secondary Structure & Wind Stand',
    specification: 'Q235B round steel / circular tube / angle iron',
    standard: 'Wind Stand: 200–280kph (includes ceiling joist framework)',
    image: '/images/materials/secondary-structure.jpg',
    description: 'Diagonal cross-bracings, horizontal tie rods, and ceiling joist framework providing typhoon-grade lateral stability.',
    keyMetrics: [
      { label: 'Steel Grade', value: 'Q235B Structural' },
      { label: 'Wind Load', value: '200–280 kph' },
      { label: 'Components', value: 'Bracing & Joists' },
    ],
  },
  {
    id: 'c-purlins',
    category: 'STRUCTURAL FRAMING',
    name: 'Galvanized C-Purlins (Roof & Wall)',
    specification: 'Galvanized cold-rolled steel',
    standard: 'High-tensile C-purlins for roof and wall cladding support',
    image: '/images/materials/c-purlins.jpg',
    description: 'Cold-formed continuous galvanized C-channels engineered to transfer wind and dead loads directly into primary portal frames.',
    keyMetrics: [
      { label: 'Material', value: 'Cold-Rolled Steel' },
      { label: 'Coating', value: 'Hot-Dip Galvanized' },
      { label: 'Profile', value: 'High-Tensile C' },
    ],
  },
  {
    id: 'roof-sheet',
    category: 'WEATHERPROOF ROOF',
    name: 'V840 Color Steel Roof Sheet',
    specification: 'V840 color single steel sheet',
    standard: 'T = 0.4mm, 0.5mm, 0.6mm thickness options',
    image: '/images/materials/v840-roof-sheet.jpg',
    description: 'Trapezoidal high-ribbed single sheet profile designed for rapid rainwater runoff, superior wind load uplift resistance, and UV longevity.',
    keyMetrics: [
      { label: 'Profile', value: 'V840 Trapezoidal' },
      { label: 'Thickness', value: '0.4 – 0.6mm' },
      { label: 'Coating', value: 'Pre-painted Galv.' },
    ],
  },
  {
    id: 'ceiling-sheet',
    category: 'INTERIOR CEILING',
    name: 'V900 Color Steel Ceiling Sheet',
    specification: 'V900 color single steel sheet',
    standard: 'T = 0.37mm gauge',
    image: '/images/materials/v900-ceiling-sheet.jpg',
    description: 'Sanitary interior corrugated ceiling panel that delivers uniform light reflection and withstands periodic chemical washdowns.',
    keyMetrics: [
      { label: 'Profile', value: 'V900 Fine-Ribbed' },
      { label: 'Thickness', value: '0.37mm' },
      { label: 'Surface', value: 'Washable White' },
    ],
  },
  {
    id: 'ceiling-insulation',
    category: 'THERMAL BARRIER',
    name: 'Ceiling Fiberglass Insulation Roll',
    specification: 'Fiberglass roll + Polyethylene Sheet',
    standard: 'W = 1.15m • Thickness = 100mm • Density = 16kg/m³',
    image: '/images/materials/fiberglass-insulation.jpg',
    description: 'High-performance fiberglass blanket with aluminum vapor barrier installed over ceilings to block tropical radiant solar heat.',
    keyMetrics: [
      { label: 'Thickness', value: '100mm Blanket' },
      { label: 'Density', value: '16 kg/m³' },
      { label: 'Roll Width', value: '1.15m With Vapor Foil' },
    ],
  },
  {
    id: 'wall-panel',
    category: 'INSULATED ENVELOPE',
    name: 'PPGI V1000 PU Sandwich Wall Panel',
    specification: 'PPGI V1000 PU sandwich panel',
    standard: 'T = 0.4mm + 50mm + 0.4mm • Density = 40 ±2 kg/m³',
    image: '/images/materials/pu-wall-panel.jpg',
    description: 'Factory-bonded polyurethane insulated wall system delivering airtight negative-pressure sealing, structural rigidity, and biosecure sanitation.',
    keyMetrics: [
      { label: 'Core / Facing', value: '50mm PU + 0.4/0.4mm' },
      { label: 'Core Density', value: '40 ±2 kg/m³' },
      { label: 'Joint Profile', value: 'Airtight T&G System' },
    ],
  },
];

// Backward-compatible export for any consumers
export const POULTRY_MATERIALS_SCHEDULE = POULTRY_MATERIALS_SPECS.map(item => ({
  component: item.name.toUpperCase(),
  specification: item.specification,
  standard: item.standard,
}));

export const PrefabricatedMaterialsSection: React.FC<PrefabricatedMaterialsSectionProps> = ({
  id = 'materials-specifications',
  sourceBrochure = 'CCDI Poultry Operations engineering brochure',
}) => {
  const [activeView, setActiveView] = useState<'cards' | 'table'>('cards');
  const [selectedImage, setSelectedImage] = useState<MaterialSpecItem | null>(null);

  return (
    <section id={id} className="relative py-20 sm:py-24 bg-white border-b border-slate-200 overflow-hidden text-left font-sans">
      {/* Architectural Top-Right Corner Accent */}
      <img
        src="/images/accents/card-corner-accent.png"
        alt=""
        className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header with View Mode Toggles */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 block font-normal">
              ENGINEERING MATERIALS & SPECIFICATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Pre-Fabricated House Materials & Specifications
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Every structural portal frame, purlin, thermal insulation roll, and composite sandwich panel is precision-engineered to withstand tropical agro-climatic conditions and high typhoon wind loads.
            </p>
          </div>

          {/* View Mode Switcher & Wind Stand Badge */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <span className="font-mono text-xs text-amber-800 font-normal bg-amber-50 px-3 py-1.5 rounded-[2px] border border-amber-200 tracking-wider">
              WIND STAND: 200–280 KPH
            </span>
            <div className="inline-flex items-center p-1 bg-slate-100 rounded-[2px] border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setActiveView('cards')}
                className={`px-3 py-1 rounded-[2px] transition-colors font-medium flex items-center gap-1.5 ${
                  activeView === 'cards'
                    ? 'bg-white text-[#0B192C] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Visual Specs
              </button>
              <button
                type="button"
                onClick={() => setActiveView('table')}
                className={`px-3 py-1 rounded-[2px] transition-colors font-medium flex items-center gap-1.5 ${
                  activeView === 'table'
                    ? 'bg-white text-[#0B192C] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Schedule Table
              </button>
            </div>
          </div>
        </div>

        {/* VIEW 1: Rich Visual Cards Grid */}
        {activeView === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {POULTRY_MATERIALS_SPECS.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col bg-white border border-slate-200 rounded-[2px] overflow-hidden hover:border-slate-300 hover:shadow-lg transition-all duration-300 text-left"
              >
                {/* Card Image with Tag Overlay */}
                <div
                  className="relative aspect-16/10 bg-slate-100 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                  title="Click to view high-resolution photo"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Backdrop for Tag */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-70 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="font-mono text-[10px] tracking-wider text-slate-800 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-[2px] shadow-xs font-normal border border-slate-200/80">
                      {item.category}
                    </span>
                  </div>

                  {/* Zoom Indicator on Hover */}
                  <div className="absolute bottom-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono text-[10px] text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-[2px] flex items-center gap-1 font-normal">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                      View
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-[#0B192C] text-base leading-snug group-hover:text-amber-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-700 font-normal leading-relaxed">
                      {item.specification}
                    </p>
                    <p className="text-[11px] text-slate-500 font-normal leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Engineering Parameters Strip */}
                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    {item.keyMetrics.map((metric, mIdx) => (
                      <div key={mIdx} className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-normal">{metric.label}</span>
                        <span className="text-slate-800 font-normal font-mono">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom Standard Banner */}
                <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-600 font-mono font-normal truncate">
                  {item.standard}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: Detailed Materials Matrix Table with Photos */}
        {activeView === 'table' && (
          <div className="overflow-hidden border border-slate-200 rounded-[2px] shadow-xs bg-white">
            <div className="px-6 py-4 bg-[#07162A] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#102A43]">
              <div>
                <h3 className="font-sans text-sm font-semibold text-white tracking-wider">
                  Civil & Structural Materials Schedule
                </h3>
                <p className="font-sans text-xs text-slate-400 font-normal">
                  Engineering data verified against {sourceBrochure}.
                </p>
              </div>
              <span className="font-mono text-xs text-amber-400 font-normal bg-[#0B192C] px-3 py-1 rounded-[2px] border border-amber-400/30 tracking-wider self-start sm:self-auto">
                WIND STAND: 200–280 KPH
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse font-sans">
                <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-700 uppercase">
                  <tr>
                    <th className="px-4 py-3 font-normal tracking-wider w-24">Photo</th>
                    <th className="px-5 py-3 font-normal tracking-wider w-1/4">Component</th>
                    <th className="px-5 py-3 font-normal tracking-wider w-1/3">Material Specification</th>
                    <th className="px-5 py-3 font-normal tracking-wider">Standard / Treatment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {POULTRY_MATERIALS_SPECS.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3">
                        <div
                          className="w-16 h-12 rounded-[2px] overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer"
                          onClick={() => setSelectedImage(item)}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      </td>
                      <td className="px-5 py-3 font-normal text-slate-900 font-mono">
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-amber-600 block uppercase">{item.category}</span>
                          <span className="font-semibold text-slate-800">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 font-normal text-slate-800">
                        {item.specification}
                      </td>
                      <td className="px-5 py-3 font-normal text-slate-600">
                        {item.standard}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bottom Highlights Strip */}
        <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-[2px] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Typhoon-Rated & Biosecure Construction</p>
              <p className="text-slate-500 font-normal">All steel components are fabricated under ISO-compliant welding protocols with SA2.5 surface blast standard.</p>
            </div>
          </div>
          <div className="font-mono text-[11px] text-slate-600 shrink-0 font-normal">
            Brochure Source: <span className="text-slate-900">{sourceBrochure}</span>
          </div>
        </div>
      </div>

      {/* High-Resolution Image Preview Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-[2px] overflow-hidden max-w-3xl w-full shadow-2xl border border-slate-700 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-16/10 bg-black">
              <img
                src={selectedImage.image}
                alt={selectedImage.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs uppercase text-amber-600">{selectedImage.category}</span>
                <span className="font-mono text-xs text-slate-500">{selectedImage.standard}</span>
              </div>
              <h3 className="text-xl font-bold text-[#0B192C]">{selectedImage.name}</h3>
              <p className="text-sm text-slate-700 font-normal">{selectedImage.description}</p>
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">
                {selectedImage.keyMetrics.map((metric, idx) => (
                  <div key={idx} className="bg-slate-50 p-2.5 rounded-[2px]">
                    <div className="text-[10px] text-slate-500 uppercase">{metric.label}</div>
                    <div className="text-xs font-mono font-medium text-slate-900">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

