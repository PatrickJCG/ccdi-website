import React, { useState } from 'react';

export interface PrefabricatedMaterialsSectionProps {
  id?: string;
  sourceBrochure?: string;
}

export interface MaterialSpecItem {
  id: string;
  badge: string;
  category: string;
  name: string;
  bullets: string[];
  image: string;
  application: string;
}

export const POULTRY_MATERIALS_SPECS: MaterialSpecItem[] = [
  {
    id: 'main-structure',
    badge: 'MAIN STRUCTURE',
    category: 'Primary Framing',
    name: 'Main Structure',
    bullets: [
      'Q355B Welding and hot rolling H steel',
      'Shot blasting (SA2.5)',
      'Antirusting paint (Grey)',
    ],
    image: '/images/materials/main-structure.jpg',
    application: 'Rigid portal frame columns and rafters',
  },
  {
    id: 'secondary-structure',
    badge: 'SECONDARY STRUCTURE',
    category: 'Lateral Stability',
    name: 'Secondary Structure',
    bullets: [
      'Wind Stand: 200-280kph',
      'Q235B round steel/circular tube/angle iron (including ceiling joist)',
    ],
    image: '/images/materials/secondary-structure.jpg',
    application: 'Diagonal bracings, tie rods & ceiling joists',
  },
  {
    id: 'roof-purlin',
    badge: 'ROOF PURLIN',
    category: 'Roof Framing',
    name: 'Roof Purlin',
    bullets: [
      'Galvanized cold-rolled steel',
      'C-purlins',
    ],
    image: '/images/materials/c-purlins.jpg',
    application: 'High-tensile roof cladding support',
  },
  {
    id: 'wall-purlin',
    badge: 'WALL PURLIN',
    category: 'Wall Framing',
    name: 'Wall Purlin',
    bullets: [
      'Galvanized cold-rolled steel',
      'C-purlins',
    ],
    image: '/images/materials/c-purlins.jpg',
    application: 'High-tensile wall panel cladding support',
  },
  {
    id: 'roof-sheet',
    badge: 'ROOF SHEET',
    category: 'External Roof',
    name: 'Roof Sheet',
    bullets: [
      'V840 color single steel sheet',
      'T= 0.4mm, 0.5mm, 0.6mm',
    ],
    image: '/images/materials/color-steel-sheets.png',
    application: 'High-ribbed weather-resistant roof envelope',
  },
  {
    id: 'ceiling-sheet',
    badge: 'CEILING SHEET',
    category: 'Interior Ceiling',
    name: 'Ceiling Sheet',
    bullets: [
      'V900 color single steel sheet',
      'T= 0.37mm',
    ],
    image: '/images/materials/color-steel-sheets.png',
    application: 'Washable interior ceiling liner',
  },
  {
    id: 'ceiling-insulation',
    badge: 'CEILING INSULATION',
    category: 'Thermal Barrier',
    name: 'Ceiling Insulation',
    bullets: [
      'Fiberglass roll',
      'W=1.15m, T= 100mm, D=16kg/m³',
      'Polyethylene Sheet',
    ],
    image: '/images/materials/fiberglass-insulation.png',
    application: 'Overhead radiant heat deflection & vapor seal',
  },
  {
    id: 'wall-panel',
    badge: 'WALL PANEL',
    category: 'Insulated Envelope',
    name: 'Wall Panel',
    bullets: [
      'PPGI V1000 PU sandwich panel',
      'T=0.4mm+50mm+0.4mm, D=40 ±2kg/m³',
    ],
    image: '/images/materials/pu-wall-panel.png',
    application: 'Airtight thermal sandwich wall insulation',
  },
];

// Backward-compatible export for any consumers
export const POULTRY_MATERIALS_SCHEDULE = POULTRY_MATERIALS_SPECS.map(item => ({
  component: item.badge,
  specification: item.bullets[0],
  standard: item.bullets.slice(1).join(' • ') || item.application,
}));

export const PrefabricatedMaterialsSection: React.FC<PrefabricatedMaterialsSectionProps> = ({
  id = 'materials-specifications',
  sourceBrochure = 'CCDI Poultry Operations engineering brochure',
}) => {
  const [activeView, setActiveView] = useState<'cards' | 'table'>('cards');
  const [selectedImage, setSelectedImage] = useState<MaterialSpecItem | null>(null);
  const [activeInsulationSubItem, setActiveInsulationSubItem] = useState<'both' | 'fiberglass' | 'polyethylene'>('both');
  const [modalInsulationTab, setModalInsulationTab] = useState<'both' | 'fiberglass' | 'polyethylene'>('both');

  return (
    <section id={id} className="relative py-20 sm:py-24 bg-[#E6F0F5] border-b border-slate-300/70 overflow-hidden text-left font-sans">
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
              Certified technical specifications for primary frames, secondary bracing, cladding profiles, and thermal insulation rolls engineered for high typhoon wind loads.
            </p>
          </div>

          {/* View Mode Switcher & CCDI Logo */}
          <div className="flex items-center gap-5 sm:gap-6 self-start md:self-end shrink-0">
            <div className="inline-flex items-center p-1 bg-white/80 rounded-[2px] border border-slate-300/80 text-xs shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveView('cards')}
                className={`px-3 py-1 rounded-[2px] transition-colors font-medium flex items-center gap-1.5 cursor-pointer ${
                  activeView === 'cards'
                    ? 'bg-[#0B192C] text-white shadow-xs'
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
                className={`px-3 py-1 rounded-[2px] transition-colors font-medium flex items-center gap-1.5 cursor-pointer ${
                  activeView === 'table'
                    ? 'bg-[#0B192C] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Schedule Table
              </button>
            </div>

            <img
              src="/images/branding/CCDI logo.svg"
              alt="CCDI"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain shrink-0"
            />
          </div>
        </div>

        {/* VIEW 1: Clean Structured Cards Grid (Uniform Height, Non-Redundant, Perfectly Aligned) */}
        {activeView === 'cards' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {POULTRY_MATERIALS_SPECS.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col bg-white border border-slate-200/90 rounded-[2px] overflow-hidden hover:border-amber-400 hover:shadow-lg transition-all duration-300 text-left h-full"
              >
                {/* Standard Uniform Image Container: Fixed h-48 sm:h-52 on ALL 8 cards */}
                <div
                  className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950 shrink-0 cursor-pointer select-none"
                  onClick={() => {
                    setSelectedImage(item);
                    setModalInsulationTab('both');
                  }}
                  title="Click to view full photo & specifications"
                >
                  {/* Category Chip (Top Left on every card) */}
                  <div className="absolute top-2.5 left-2.5 z-20">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-800 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-[2px] shadow-xs font-semibold border border-slate-200/80">
                      {item.category}
                    </span>
                  </div>

                  {/* Zoom Indicator on Hover (Bottom Right on every card) */}
                  <div className="absolute bottom-2.5 right-2.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono text-[10px] text-white bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded-[2px] flex items-center gap-1 font-normal">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                      View
                    </span>
                  </div>

                  {/* CASE 1: CEILING INSULATION (Fiberglass Roll + Polyethylene Sheet on Warehouse Floor) */}
                  {item.id === 'ceiling-insulation' ? (
                    <div className="relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden">
                      {/* Generated High-Resolution Pre-Engineered Steel Warehouse Floor Backdrop */}
                      <img
                        src="/images/materials/warehouse-backdrop.jpg"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover brightness-[0.88] contrast-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/10 to-black/30 pointer-events-none" />

                      {/* Floor Contact Ground Shadows */}
                      <div className="absolute bottom-1.5 left-3 w-32 h-2.5 bg-black/60 blur-xs rounded-full pointer-events-none" />
                      <div className="absolute bottom-2.5 right-2 w-40 h-3 bg-black/60 blur-xs rounded-full pointer-events-none" />

                      {/* Dual Component Toggle Pills (Top Right) */}
                      <div
                        className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-xs p-0.5 rounded-[2px] border border-white/20 text-[9px] font-mono"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => setActiveInsulationSubItem('both')}
                          className={`px-1.5 py-0.5 rounded-[2px] transition-colors cursor-pointer ${
                            activeInsulationSubItem === 'both' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          Dual
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveInsulationSubItem('fiberglass')}
                          className={`px-1.5 py-0.5 rounded-[2px] transition-colors cursor-pointer ${
                            activeInsulationSubItem === 'fiberglass' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          Roll
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveInsulationSubItem('polyethylene')}
                          className={`px-1.5 py-0.5 rounded-[2px] transition-colors cursor-pointer ${
                            activeInsulationSubItem === 'polyethylene' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          Sheet
                        </button>
                      </div>

                      {/* Original Untouched PNGs firmly staged on concrete floor */}
                      {activeInsulationSubItem === 'both' && (
                        <div className="relative z-10 w-full h-full flex items-end justify-center p-2.5 pb-2">
                          {/* Ceiling Insulation 1: Fiberglass Roll (resting on floor) */}
                          <img
                            src="/images/materials/fiberglass-insulation.png"
                            alt="Fiberglass Insulation Roll"
                            className="absolute bottom-2.5 right-1 w-[68%] max-h-[70%] object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Ceiling Insulation 2: Polyethylene Sheet (resting in front on floor) */}
                          <img
                            src="/images/materials/polyethylene-sheet.png"
                            alt="Polyethylene Sheet Vapor Barrier"
                            className="absolute bottom-1.5 left-1 w-[55%] max-h-[56%] object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Architectural Polyethylene Label Badge */}
                          <span className="absolute bottom-2 left-2 z-10 font-mono text-[9px] uppercase tracking-wider text-slate-800 bg-white/95 px-1.5 py-0.5 rounded-[2px] shadow-xs font-semibold border border-slate-300">
                            Polyethylene Sheet
                          </span>
                        </div>
                      )}

                      {activeInsulationSubItem === 'fiberglass' && (
                        <div className="relative z-10 w-full h-full flex items-end justify-center pb-2 px-3">
                          <img
                            src="/images/materials/fiberglass-insulation.png"
                            alt="Fiberglass Roll"
                            className="w-[85%] max-h-[78%] object-contain drop-shadow-[0_16px_22px_rgba(0,0,0,0.75)] group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute bottom-2 left-2.5 z-10 font-mono text-[9px] uppercase tracking-wider text-amber-950 bg-amber-200/95 px-1.5 py-0.5 rounded-[2px] shadow-xs font-semibold border border-amber-400">
                            1. Fiberglass Roll (100mm)
                          </span>
                        </div>
                      )}

                      {activeInsulationSubItem === 'polyethylene' && (
                        <div className="relative z-10 w-full h-full flex items-end justify-center pb-2 px-3">
                          <img
                            src="/images/materials/polyethylene-sheet.png"
                            alt="Polyethylene Sheet"
                            className="w-[82%] max-h-[78%] object-contain drop-shadow-[0_16px_22px_rgba(0,0,0,0.75)] group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute bottom-2 left-2.5 z-10 font-mono text-[9px] uppercase tracking-wider text-slate-800 bg-white/95 px-1.5 py-0.5 rounded-[2px] shadow-xs font-semibold border border-slate-300">
                            2. Polyethylene Vapor Barrier
                          </span>
                        </div>
                      )}
                    </div>
                  ) : item.id === 'wall-panel' ? (
                    /* CASE 2: WALL PANEL (PU Sandwich Panel standing upright on Warehouse Floor) */
                    <div className="relative w-full h-full bg-slate-950 flex items-end justify-center overflow-hidden">
                      {/* Generated High-Resolution Pre-Engineered Steel Warehouse Floor Backdrop */}
                      <img
                        src="/images/materials/warehouse-backdrop.jpg"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover brightness-[0.88] contrast-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/10 to-black/30 pointer-events-none" />

                      {/* Floor Contact Ground Shadow for standing panel */}
                      <div className="absolute bottom-1 w-28 h-3 bg-black/75 blur-xs rounded-full pointer-events-none" />

                      {/* Original Untouched PNG strictly constrained within standard container */}
                      <div className="relative z-10 w-full h-full flex items-end justify-center pb-2">
                        <img
                          src="/images/materials/pu-wall-panel.png"
                          alt={item.badge}
                          className="h-[88%] w-auto max-w-[80%] object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-2 right-2.5 z-10 font-mono text-[9px] uppercase tracking-wider text-slate-800 bg-white/95 px-1.5 py-0.5 rounded-[2px] shadow-xs font-semibold border border-slate-300">
                          50mm PU Core
                        </span>
                      </div>
                    </div>
                  ) : item.id === 'roof-sheet' || item.id === 'ceiling-sheet' ? (
                    /* CASE 3: ROOF & CEILING SHEETS (4 Color Profiles on Generated Pre-Engineered Steel Warehouse Backdrop) */
                    <div className="relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden">
                      {/* Generated High-Resolution Pre-Engineered Steel Warehouse Floor Backdrop */}
                      <img
                        src="/images/materials/sheets-backdrop.jpg"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover brightness-[0.88] contrast-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/10 to-black/30 pointer-events-none" />

                      {/* Floor Contact Ground Shadow for the steel sheets stack */}
                      <div className="absolute bottom-2.5 inset-x-6 h-3 bg-black/65 blur-xs rounded-full pointer-events-none" />

                      {/* Original Untouched PNG: 4 Color Trapezoidal Corrugated Sheets */}
                      <div className="relative z-10 w-full h-full flex items-center justify-center p-2.5">
                        <img
                          src="/images/materials/color-steel-sheets.png"
                          alt={item.badge}
                          className="w-[94%] h-auto max-h-[85%] object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.75)] group-hover:scale-105 transition-transform duration-500"
                        />
                        {item.id === 'roof-sheet' ? (
                          <span className="absolute bottom-2 left-2.5 z-10 font-mono text-[9px] uppercase tracking-wider text-slate-800 bg-white/95 px-1.5 py-0.5 rounded-[2px] shadow-xs font-semibold border border-slate-300">
                            V840 • 4-Color Profile
                          </span>
                        ) : (
                          <span className="absolute bottom-2 left-2.5 z-10 font-mono text-[9px] uppercase tracking-wider text-slate-800 bg-white/95 px-1.5 py-0.5 rounded-[2px] shadow-xs font-semibold border border-slate-300">
                            V900 • Ceiling Profile
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* CASE 4: STANDARD WAREHOUSE PHOTOGRAPHS (Main Structure, Secondary, Roof Purlin, Wall Purlin) */
                    <div className="relative w-full h-full bg-slate-950">
                      <img
                        src={item.image}
                        alt={item.badge}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
                    </div>
                  )}
                </div>

                {/* Card Body: Structured Navy Badge + Bullet Points List */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                  {/* Iconic Dark Navy Badge with Angled Gold Accent Tab */}
                  <div className="inline-flex items-stretch self-start shadow-2xs shrink-0 h-6">
                    <span className="bg-[#0B192C] text-white text-xs font-bold font-mono px-3 py-1 tracking-wider uppercase flex items-center">
                      {item.badge}
                    </span>
                    <span className="w-2.5 bg-amber-400 [clip-path:polygon(0_0,100%_0,40%_100%,0_100%)]" />
                  </div>

                  {/* Clean Technical Bullet Points (Zero Redundancy, exact min-h-[96px] for horizontal alignment) */}
                  <ul className="space-y-2 text-xs sm:text-[13px] text-slate-800 font-sans flex-1 min-h-[96px] pt-1">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span className="leading-relaxed font-normal">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Subtle Application Strip (Aligned horizontally across all cards) */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500 shrink-0">
                    <span className="truncate">{item.application}</span>
                    <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
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
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse font-sans">
                <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-700 uppercase">
                  <tr>
                    <th className="px-4 py-3 font-normal tracking-wider w-24">Photo</th>
                    <th className="px-5 py-3 font-normal tracking-wider w-1/4">Component</th>
                    <th className="px-5 py-3 font-normal tracking-wider">Engineering Specifications</th>
                    <th className="px-5 py-3 font-normal tracking-wider w-1/4">Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {POULTRY_MATERIALS_SPECS.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3">
                        <div
                          className="w-16 h-12 rounded-[2px] overflow-hidden bg-slate-900 border border-slate-200 cursor-pointer relative shrink-0"
                          onClick={() => {
                            setSelectedImage(item);
                            setModalInsulationTab('both');
                          }}
                        >
                          {item.id === 'ceiling-insulation' ? (
                            <div className="relative w-full h-full">
                              <img
                                src="/images/materials/warehouse-backdrop.jpg"
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
                              />
                              <img
                                src="/images/materials/fiberglass-insulation.png"
                                alt="Fiberglass"
                                className="absolute bottom-1 right-1 w-[65%] max-h-[70%] object-contain"
                              />
                              <img
                                src="/images/materials/polyethylene-sheet.png"
                                alt="Polyethylene"
                                className="absolute bottom-0.5 left-1 w-[55%] max-h-[60%] object-contain"
                              />
                            </div>
                          ) : item.id === 'wall-panel' ? (
                            <div className="relative w-full h-full">
                              <img
                                src="/images/materials/warehouse-backdrop.jpg"
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
                              />
                              <img
                                src="/images/materials/pu-wall-panel.png"
                                alt="Wall Panel"
                                className="absolute bottom-0 inset-x-0 mx-auto h-[88%] w-auto object-contain"
                              />
                            </div>
                          ) : item.id === 'roof-sheet' || item.id === 'ceiling-sheet' ? (
                            <div className="relative w-full h-full">
                              <img
                                src="/images/materials/sheets-backdrop.jpg"
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
                              />
                              <img
                                src="/images/materials/color-steel-sheets.png"
                                alt="Color Steel Sheets"
                                className="absolute inset-0 m-auto w-[90%] h-auto object-contain"
                              />
                            </div>
                          ) : (
                            <img
                              src={item.image}
                              alt={item.badge}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="space-y-1">
                          <div className="inline-flex items-stretch self-start shadow-2xs">
                            <span className="bg-[#0B192C] text-white text-[11px] font-bold font-mono px-2 py-0.5 tracking-wider uppercase">
                              {item.badge}
                            </span>
                            <span className="w-2 bg-amber-400 [clip-path:polygon(0_0,100%_0,40%_100%,0_100%)]" />
                          </div>
                          <span className="text-[10px] text-slate-500 block font-mono">{item.category}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-slate-800">
                        <ul className="space-y-1 text-xs">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-5 py-3 text-slate-600 font-mono text-[11px]">
                        {item.application}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bottom Highlights Strip */}
        <div className="p-4 sm:p-5 bg-white border border-slate-200/90 rounded-[2px] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs shadow-2xs">
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
            className="bg-white rounded-[2px] overflow-hidden max-w-2xl w-full shadow-2xl border border-slate-700 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Display Area */}
            <div className="relative aspect-16/10 bg-slate-950 flex items-center justify-center overflow-hidden">
              {selectedImage.id === 'ceiling-insulation' ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Warehouse Backdrop */}
                  <img
                    src="/images/materials/warehouse-backdrop.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.9] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/10 to-black/30 pointer-events-none" />

                  {/* Modal Insulation Switcher */}
                  <div className="absolute top-3 left-4 z-20 flex items-center gap-1.5 bg-black/70 backdrop-blur-xs p-1 rounded-[2px] border border-white/20 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setModalInsulationTab('both')}
                      className={`px-2 py-0.5 rounded-[2px] transition-colors cursor-pointer ${
                        modalInsulationTab === 'both' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Dual View
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalInsulationTab('fiberglass')}
                      className={`px-2 py-0.5 rounded-[2px] transition-colors cursor-pointer ${
                        modalInsulationTab === 'fiberglass' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      1. Fiberglass Roll
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalInsulationTab('polyethylene')}
                      className={`px-2 py-0.5 rounded-[2px] transition-colors cursor-pointer ${
                        modalInsulationTab === 'polyethylene' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      2. Polyethylene Sheet
                    </button>
                  </div>

                  {modalInsulationTab === 'both' && (
                    <div className="relative z-10 w-full h-full flex items-end justify-center p-6">
                      <div className="absolute bottom-4 left-6 w-44 h-4 bg-black/60 blur-xs rounded-full pointer-events-none" />
                      <div className="absolute bottom-5 right-6 w-52 h-4 bg-black/60 blur-xs rounded-full pointer-events-none" />
                      <img
                        src="/images/materials/fiberglass-insulation.png"
                        alt="Fiberglass Roll"
                        className="absolute bottom-5 right-4 w-[68%] max-h-[72%] object-contain drop-shadow-2xl"
                      />
                      <img
                        src="/images/materials/polyethylene-sheet.png"
                        alt="Polyethylene Sheet"
                        className="absolute bottom-3 left-4 w-[56%] max-h-[60%] object-contain drop-shadow-2xl"
                      />
                      <span className="absolute bottom-4 left-6 font-mono text-xs uppercase tracking-wider text-slate-800 bg-white/95 px-2 py-0.5 rounded-[2px] shadow-sm font-semibold border border-slate-300">
                        Polyethylene Sheet
                      </span>
                    </div>
                  )}

                  {modalInsulationTab === 'fiberglass' && (
                    <div className="relative z-10 w-full h-full flex items-end justify-center p-6">
                      <div className="absolute bottom-4 w-72 h-5 bg-black/70 blur-xs rounded-full pointer-events-none" />
                      <img
                        src="/images/materials/fiberglass-insulation.png"
                        alt="Fiberglass Roll"
                        className="w-[80%] max-h-[80%] object-contain drop-shadow-2xl pb-2"
                      />
                      <span className="absolute bottom-4 left-6 font-mono text-xs uppercase tracking-wider text-amber-950 bg-amber-200/95 px-2.5 py-1 rounded-[2px] shadow-sm font-semibold border border-amber-400">
                        Ceiling Insulation 1: Fiberglass Roll (W=1.15m, T=100mm, D=16kg/m³)
                      </span>
                    </div>
                  )}

                  {modalInsulationTab === 'polyethylene' && (
                    <div className="relative z-10 w-full h-full flex items-end justify-center p-6">
                      <div className="absolute bottom-4 w-72 h-5 bg-black/70 blur-xs rounded-full pointer-events-none" />
                      <img
                        src="/images/materials/polyethylene-sheet.png"
                        alt="Polyethylene Sheet"
                        className="w-[80%] max-h-[80%] object-contain drop-shadow-2xl pb-2"
                      />
                      <span className="absolute bottom-4 left-6 font-mono text-xs uppercase tracking-wider text-slate-800 bg-white/95 px-2.5 py-1 rounded-[2px] shadow-sm font-semibold border border-slate-300">
                        Ceiling Insulation 2: Polyethylene Vapor Barrier Sheet
                      </span>
                    </div>
                  )}
                </div>
              ) : selectedImage.id === 'wall-panel' ? (
                <div className="relative w-full h-full flex items-end justify-center">
                  <img
                    src="/images/materials/warehouse-backdrop.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.9] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/10 to-black/30 pointer-events-none" />
                  <div className="absolute bottom-2 w-36 h-4 bg-black/75 blur-xs rounded-full pointer-events-none" />
                  <img
                    src="/images/materials/pu-wall-panel.png"
                    alt={selectedImage.badge}
                    className="h-[88%] w-auto max-w-[80%] object-contain drop-shadow-2xl relative z-10 pb-2"
                  />
                  <span className="absolute bottom-4 right-6 z-20 font-mono text-xs uppercase tracking-wider text-slate-800 bg-white/95 px-2 py-0.5 rounded-[2px] shadow-sm font-semibold border border-slate-300">
                    PPGI V1000 PU Panel
                  </span>
                </div>
              ) : selectedImage.id === 'roof-sheet' || selectedImage.id === 'ceiling-sheet' ? (
                <div className="relative w-full h-full flex items-center justify-center p-6">
                  <img
                    src="/images/materials/sheets-backdrop.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.9] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/10 to-black/30 pointer-events-none" />
                  <div className="absolute bottom-5 inset-x-12 h-4 bg-black/70 blur-xs rounded-full pointer-events-none" />
                  <img
                    src="/images/materials/color-steel-sheets.png"
                    alt={selectedImage.badge}
                    className="w-[90%] h-auto max-h-[84%] object-contain drop-shadow-2xl relative z-10"
                  />
                  <span className="absolute bottom-4 left-6 z-20 font-mono text-xs uppercase tracking-wider text-slate-800 bg-white/95 px-2.5 py-1 rounded-[2px] shadow-sm font-semibold border border-slate-300">
                    {selectedImage.id === 'roof-sheet' ? 'V840 4-Color Single Steel Sheet Profiles' : 'V900 Color Single Steel Ceiling Liner'}
                  </span>
                </div>
              ) : (
                <img
                  src={selectedImage.image}
                  alt={selectedImage.badge}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer z-30"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Content Info */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-stretch self-start shadow-2xs">
                  <span className="bg-[#0B192C] text-white text-xs font-bold font-mono px-3 py-1 tracking-wider uppercase">
                    {selectedImage.badge}
                  </span>
                  <span className="w-2.5 bg-amber-400 [clip-path:polygon(0_0,100%_0,40%_100%,0_100%)]" />
                </div>
                <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">
                  Category: {selectedImage.category}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-500">Engineering Specifications:</p>
                <ul className="space-y-2 text-sm text-slate-800 font-sans">
                  {selectedImage.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      <span className="leading-relaxed font-normal">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Application: <span className="text-slate-800 font-sans">{selectedImage.application}</span></span>
                <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-[2px] border border-amber-200">Wind Stand: 200–280 kph</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


