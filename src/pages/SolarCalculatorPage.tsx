import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Battery,
  Zap,
  CheckCircle2,
  X,
  ChevronRight,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  Home,
  Building2,
} from 'lucide-react';
import type { Product } from '../data/mockProducts';
import { CategorySubNav } from '../components/molecules/CategorySubNav';

export interface SolarCalculatorPageProps {
  inquiryItems?: Product[];
  onToggleInquiry?: (product: Product) => void;
  onRemoveInquiryItem?: (productId: string) => void;
}

type ClientType = 'commercial' | 'residential';
type ConnectionType = 'on-grid' | 'hybrid' | 'off-grid';

const RESIDENTIAL_PRESETS = [
  { label: '₱8,000', value: 8000, desc: 'Small Home / Townhouse' },
  { label: '₱18,000', value: 18000, desc: 'Family Home (2–3 Aircons)' },
  { label: '₱35,000', value: 35000, desc: 'Large House / Villa' },
  { label: '₱60,000', value: 60000, desc: 'Luxury Estate' },
];

const COMMERCIAL_PRESETS = [
  { label: '₱35,000', value: 35000, desc: 'Single Poultry Barn' },
  { label: '₱75,000', value: 75000, desc: 'Multi-Barn Complex' },
  { label: '₱180,000', value: 180000, desc: 'Layer Farm / Hatchery' },
  { label: '₱450,000', value: 450000, desc: 'Feedmill / Cold Storage' },
];

export const SolarCalculatorPage: React.FC<SolarCalculatorPageProps> = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // ── USER INPUTS ─────────────────────────────────────────────────────────────
  const [clientType, setClientType] = useState<ClientType>('commercial');
  const [monthlyBill, setMonthlyBill] = useState<number>(75000);
  const [connectionType, setConnectionType] = useState<ConnectionType>('hybrid');
  const [electricityRate, setElectricityRate] = useState<number>(12.0); // ₱/kWh

  // Optional manual adjustments
  const [customPanelCount, setCustomPanelCount] = useState<number | null>(null);
  const [customBatteryCount, setCustomBatteryCount] = useState<number | null>(null);

  // Proposal modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    fullName: '',
    companyOrHome: '',
    phone: '',
    email: '',
    location: '',
  });

  const activePresets = clientType === 'residential' ? RESIDENTIAL_PRESETS : COMMERCIAL_PRESETS;

  // ── SIZING CALCULATIONS (SIMPLE & ACCURATE) ──────────────────────────────────
  const results = useMemo(() => {
    // 1. Monthly consumption in kWh
    const monthlyKwh = Math.max(100, monthlyBill / electricityRate);
    const dailyKwh = monthlyKwh / 30;

    // 2. Target offset
    // Grid-tied: ~70% offset (daytime use)
    // Hybrid: ~85% offset (daytime + evening battery use)
    // Off-grid: 100% offset (runs 24/7 on solar + battery)
    let offsetFactor = 0.70;
    if (connectionType === 'hybrid') offsetFactor = 0.85;
    if (connectionType === 'off-grid') offsetFactor = 1.0;

    // 3. Recommended Solar System Size (kWp)
    // Average 4.3 peak sun hours in PH with 80% real-world system efficiency
    const recommendedKwp = (dailyKwh * offsetFactor) / (4.3 * 0.80);

    // 4. Panel Count (High-efficiency 550W panels)
    const autoPanels = Math.max(4, Math.ceil((recommendedKwp * 1000) / 550));
    const panels = customPanelCount ?? autoPanels;
    const systemSizeKwp = (panels * 550) / 1000;

    // Roof space (~3.0 sq. meters per panel including spacing)
    const roofSpaceSqM = Math.round(panels * 3.0);

    // 5. Battery Units (5 kWh modular storage units)
    let autoBatteries = 0;
    if (connectionType === 'hybrid') {
      // Sized to provide ~4 hours of critical ventilation/lighting/refrigeration backup
      autoBatteries = Math.max(1, Math.round((dailyKwh * 0.25) / 5));
    } else if (connectionType === 'off-grid') {
      // Sized for full night loads + buffer
      autoBatteries = Math.max(2, Math.round((dailyKwh * 0.60) / 5));
    }
    const batteries = customBatteryCount ?? autoBatteries;
    const batteryCapacityKwh = batteries * 5.12;

    // 6. Savings
    const dailyGenKwh = systemSizeKwp * 4.3 * 0.80;
    const monthlyGenKwh = dailyGenKwh * 30;
    const monthlySavings = Math.min(monthlyBill * 0.90, monthlyGenKwh * electricityRate);
    const newBill = Math.max(0, monthlyBill - monthlySavings);
    const annualSavings = monthlySavings * 12;

    // 7. Turnkey Estimated Price Range (PHP)
    // Includes panels, inverter, mounting rails, wiring, installation, permits
    let costPerKwpMin = 43000;
    let costPerKwpMax = 48000;
    let batteryCostPerUnitMin = 0;
    let batteryCostPerUnitMax = 0;

    if (connectionType === 'on-grid') {
      costPerKwpMin = 43000;
      costPerKwpMax = 48000;
    } else if (connectionType === 'hybrid') {
      costPerKwpMin = 49000;
      costPerKwpMax = 54000;
      batteryCostPerUnitMin = 115000; // per 5kWh modular unit
      batteryCostPerUnitMax = 135000;
    } else if (connectionType === 'off-grid') {
      costPerKwpMin = 56000;
      costPerKwpMax = 62000;
      batteryCostPerUnitMin = 120000;
      batteryCostPerUnitMax = 140000;
    }

    const priceMin = Math.round((systemSizeKwp * costPerKwpMin + batteries * batteryCostPerUnitMin) / 10000) * 10000;
    const priceMax = Math.round((systemSizeKwp * costPerKwpMax + batteries * batteryCostPerUnitMax) / 10000) * 10000;
    const avgPrice = (priceMin + priceMax) / 2;
    const paybackYears = annualSavings > 0 ? (avgPrice / annualSavings) : 0;

    const isCustomized = customPanelCount !== null || customBatteryCount !== null;

    return {
      systemSizeKwp,
      panels,
      autoPanels,
      batteries,
      autoBatteries,
      batteryCapacityKwh,
      roofSpaceSqM,
      monthlySavings,
      newBill,
      priceMin,
      priceMax,
      paybackYears,
      isCustomized,
    };
  }, [monthlyBill, connectionType, electricityRate, customPanelCount, customBatteryCount]);

  const formatPeso = (val: number) => '₱' + Math.round(val).toLocaleString('en-PH');

  const handleReset = () => {
    setCustomPanelCount(null);
    setCustomBatteryCount(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans text-left min-h-screen">
      
      {/* ── Sub-Nav ── */}
      <CategorySubNav
        categoryName="Solar Systems"
        basePath="/solutions/solar"
        activeTab="calculator"
        systemLabel="Solar Power Systems"
        accentColor="amber"
        systemIcon={Sun}
        extraTabs={[
          {
            id: 'calculator',
            label: 'Price Calculator',
            path: '/solutions/solar/calculator',
            icon: Zap,
          },
        ]}
      />

      {/* ── HEADER (CLEAN & DIRECT) ── */}
      <section className="bg-[#07162A] text-white pt-10 pb-12 border-b border-[#102A43]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <a href="/" className="hover:text-amber-400 transition-colors">HOME</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <a href="/solutions/solar" className="hover:text-amber-400 transition-colors">SOLAR SYSTEMS</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-amber-400 font-bold">ESTIMATED PRICE CALCULATOR</span>
          </nav>

          <div className="max-w-2xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Solar Price & Savings Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Find out how many solar panels you need, what it costs, and how much you can save every month for commercial facilities and residential homes.
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN CALCULATOR SECTION (CLEAN 2-COLUMN LAYOUT) ── */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ── LEFT COLUMN: SIMPLE INPUTS (7 COLS) ── */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* CLIENT SECTOR SELECTOR (RESIDENTIAL VS COMMERCIAL) */}
              <div className="bg-white border border-slate-200 p-2 rounded-[2px] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-700 px-2">
                  Select Project Type:
                </span>
                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setClientType('residential');
                      setMonthlyBill(18000);
                      setCustomPanelCount(null);
                      setCustomBatteryCount(null);
                    }}
                    className={`px-4 py-2 rounded-[2px] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      clientType === 'residential'
                        ? 'bg-[#0B192C] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Home className="w-4 h-4 text-amber-400" />
                    <span>Residential Home</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setClientType('commercial');
                      setMonthlyBill(75000);
                      setCustomPanelCount(null);
                      setCustomBatteryCount(null);
                    }}
                    className={`px-4 py-2 rounded-[2px] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      clientType === 'commercial'
                        ? 'bg-[#0B192C] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <span>Commercial & Farm</span>
                  </button>
                </div>
              </div>

              {/* STEP 1: ELECTRIC BILL */}
              <div className="bg-white border border-slate-200 p-6 rounded-[2px] shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-amber-600 uppercase tracking-wider block">
                      STEP 1
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      Your Monthly Electric Bill
                    </h2>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <span>Rate:</span>
                    <input
                      type="number"
                      min={8}
                      max={20}
                      step={0.5}
                      value={electricityRate}
                      onChange={(e) => setElectricityRate(Number(e.target.value) || 12)}
                      className="w-14 px-1.5 py-0.5 text-center font-mono text-xs border border-slate-300 rounded bg-slate-50 text-slate-800"
                    />
                    <span>₱/kWh</span>
                  </div>
                </div>

                {/* Display Current Bill & Quick Slider */}
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-600">
                      {clientType === 'residential' ? 'Average home electric bill:' : 'Average monthly facility bill:'}
                    </span>
                    <span className="text-3xl font-semibold text-[#0B192C] font-mono">
                      {formatPeso(monthlyBill)}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={clientType === 'residential' ? 4000 : 15000}
                    max={clientType === 'residential' ? 120000 : 600000}
                    step={clientType === 'residential' ? 1000 : 5000}
                    value={monthlyBill}
                    onChange={(e) => {
                      setMonthlyBill(Number(e.target.value));
                      setCustomPanelCount(null);
                      setCustomBatteryCount(null);
                    }}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />

                  {/* Quick Select Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {activePresets.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => {
                          setMonthlyBill(preset.value);
                          setCustomPanelCount(null);
                          setCustomBatteryCount(null);
                        }}
                        className={`p-2.5 rounded-[2px] border text-center transition-all ${
                          monthlyBill === preset.value
                            ? 'bg-[#0B192C] text-white border-[#0B192C] font-bold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-mono text-xs font-bold">{preset.label}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 truncate">{preset.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* STEP 2: SOLAR SETUP TYPE */}
              <div className="bg-white border border-slate-200 p-6 rounded-[2px] shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <span className="font-mono text-xs font-bold text-amber-600 uppercase tracking-wider block">
                    STEP 2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Choose Your Solar Connection
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* Grid-Tied */}
                  <label
                    onClick={() => {
                      setConnectionType('on-grid');
                      setCustomBatteryCount(null);
                    }}
                    className={`block p-4 rounded-[2px] border cursor-pointer transition-all ${
                      connectionType === 'on-grid'
                        ? 'bg-amber-50/50 border-amber-500 ring-1 ring-amber-500'
                        : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="connType"
                        checked={connectionType === 'on-grid'}
                        onChange={() => {}}
                        className="mt-1 text-amber-500 focus:ring-amber-500"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">
                            Grid-Tied (Standard Solar)
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-200 text-slate-700 rounded font-semibold">
                            Lowest Cost
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {clientType === 'residential'
                            ? 'Drastically reduces daytime aircon and appliance bills. Uses electric power seamlessly at night.'
                            : 'Saves money during daytime operations. Uses regular utility power at night. No batteries needed.'}
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Hybrid */}
                  <label
                    onClick={() => {
                      setConnectionType('hybrid');
                      setCustomBatteryCount(null);
                    }}
                    className={`block p-4 rounded-[2px] border cursor-pointer transition-all ${
                      connectionType === 'hybrid'
                        ? 'bg-amber-50/50 border-amber-500 ring-1 ring-amber-500'
                        : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="connType"
                        checked={connectionType === 'hybrid'}
                        onChange={() => {}}
                        className="mt-1 text-amber-500 focus:ring-amber-500"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">
                            Hybrid (Solar + Battery Backup)
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500 text-slate-950 rounded font-bold">
                            {clientType === 'residential' ? '24/7 Home Comfort' : 'Most Popular for Farms'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {clientType === 'residential'
                            ? 'Lowers electric bills AND keeps lights, refrigerators, Wi-Fi, and bedrooms running during power outages.'
                            : 'Saves on electricity AND automatically keeps ventilation fans and farm controllers running during brownouts.'}
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Off-Grid */}
                  <label
                    onClick={() => {
                      setConnectionType('off-grid');
                      setCustomBatteryCount(null);
                    }}
                    className={`block p-4 rounded-[2px] border cursor-pointer transition-all ${
                      connectionType === 'off-grid'
                        ? 'bg-amber-50/50 border-amber-500 ring-1 ring-amber-500'
                        : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="connType"
                        checked={connectionType === 'off-grid'}
                        onChange={() => {}}
                        className="mt-1 text-amber-500 focus:ring-amber-500"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">
                            Off-Grid (Standalone Autonomous)
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-200 text-slate-700 rounded font-semibold">
                            No Power Lines
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {clientType === 'residential'
                            ? '100% self-sufficient solar power with heavy battery bank for remote vacation homes, mountain estates, or island properties.'
                            : 'For remote agricultural land with no electric cooperative connection. Runs 24/7 on solar panels and batteries.'}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* STEP 3: OPTIONAL FINE-TUNING (PANELS & BATTERIES) */}
              <div className="bg-white border border-slate-200 p-6 rounded-[2px] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-amber-600 uppercase tracking-wider block">
                      STEP 3 (OPTIONAL)
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      Adjust Panels & Batteries
                    </h2>
                  </div>
                  {results.isCustomized && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs text-amber-700 hover:text-amber-800 font-bold underline flex items-center gap-1 font-mono"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Reset to Auto
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Panels Adjuster */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-[2px] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Sun className="w-4 h-4 text-amber-500" />
                        Solar Panels
                      </span>
                      <span className="font-mono text-xs text-slate-500">
                        {results.systemSizeKwp.toFixed(1)} kW
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-white border border-slate-300 p-1.5 rounded-[2px]">
                      <button
                        type="button"
                        onClick={() => setCustomPanelCount(Math.max(4, results.panels - 2))}
                        className="w-8 h-8 rounded bg-slate-100 hover:bg-slate-200 font-bold font-mono text-slate-800 flex items-center justify-center cursor-pointer"
                      >
                        –
                      </button>
                      <span className="font-mono font-medium text-base text-slate-900">
                        {results.panels} <span className="text-xs font-normal text-slate-500">panels</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setCustomPanelCount(results.panels + 2)}
                        className="w-8 h-8 rounded bg-slate-100 hover:bg-slate-200 font-bold font-mono text-slate-800 flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Battery Adjuster */}
                  <div className={`p-4 rounded-[2px] border space-y-2 ${
                    connectionType === 'on-grid' ? 'bg-slate-100 border-slate-200 opacity-60' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Battery className="w-4 h-4 text-sky-600" />
                        Backup Batteries
                      </span>
                      <span className="font-mono text-xs text-slate-500">
                        {connectionType === 'on-grid' ? 'None' : `${results.batteryCapacityKwh.toFixed(0)} kWh`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-white border border-slate-300 p-1.5 rounded-[2px]">
                      <button
                        type="button"
                        disabled={connectionType === 'on-grid'}
                        onClick={() => setCustomBatteryCount(Math.max(0, results.batteries - 1))}
                        className="w-8 h-8 rounded bg-slate-100 hover:bg-slate-200 font-bold font-mono text-slate-800 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                      >
                        –
                      </button>
                      <span className="font-mono font-medium text-base text-slate-900">
                        {connectionType === 'on-grid' ? 0 : results.batteries} <span className="text-xs font-normal text-slate-500">units</span>
                      </span>
                      <button
                        type="button"
                        disabled={connectionType === 'on-grid'}
                        onClick={() => setCustomBatteryCount(results.batteries + 1)}
                        className="w-8 h-8 rounded bg-slate-100 hover:bg-slate-200 font-bold font-mono text-slate-800 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN: CLEAN RESULTS & ESTIMATE (5 COLS) ── */}
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              
              <div className="bg-[#07162A] text-white border border-[#1E3E66] p-6 sm:p-7 rounded-[2px] shadow-lg space-y-6">
                
                {/* Header */}
                <div className="border-b border-[#1E3E66] pb-3 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                    ESTIMATED COST & SAVINGS
                  </span>
                  <span className="text-xs font-mono uppercase bg-slate-800 px-2.5 py-0.5 rounded text-slate-300">
                    {clientType === 'residential' ? 'Residential' : 'Commercial'} • {connectionType === 'on-grid' ? 'Grid-Tied' : connectionType === 'hybrid' ? 'Hybrid' : 'Off-Grid'}
                  </span>
                </div>

                {/* Big Estimated Price */}
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 block font-sans">
                    Estimated Complete Turnkey Price:
                  </span>
                  <div className="text-2xl sm:text-3xl font-medium text-white font-mono tracking-tight">
                    <span className="text-amber-400">{formatPeso(results.priceMin)}</span>
                    <span className="text-slate-500 mx-2 text-xl font-normal">–</span>
                    <span className="text-amber-400">{formatPeso(results.priceMax)}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pt-1 leading-snug">
                    Includes solar panels, inverter, battery (if hybrid), typhoon-rated mounting, wiring, permits, and professional installation.
                  </p>
                </div>

                {/* Monthly Savings Highlight */}
                <div className="bg-[#0B192C] border border-[#1E3E66] p-4 rounded-[2px] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300">Estimated Monthly Savings:</span>
                    <span className="text-lg font-medium font-mono text-emerald-400">
                      {formatPeso(results.monthlySavings)} / mo
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-[#1E3E66]">
                    <span>New Reduced Electric Bill:</span>
                    <span className="font-mono font-medium text-white">
                      ~{formatPeso(results.newBill)} / mo
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-[#1E3E66]">
                    <span>Estimated Payback Time:</span>
                    <span className="font-mono font-medium text-amber-400">
                      ~{results.paybackYears.toFixed(1)} Years
                    </span>
                  </div>
                </div>

                {/* System Specs List */}
                <div className="space-y-2 text-xs font-mono text-slate-300 border-t border-[#1E3E66] pt-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">System Capacity:</span>
                    <span className="font-medium text-white">{results.systemSizeKwp.toFixed(1)} kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Solar Panels:</span>
                    <span className="font-medium text-white">{results.panels} Panels (550W Tier-1)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Backup Storage:</span>
                    <span className="font-medium text-white">
                      {connectionType === 'on-grid' ? 'None (Grid-Tied)' : `${results.batteries} Units (${results.batteryCapacityKwh.toFixed(0)} kWh)`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Roof Area Required:</span>
                    <span className="font-medium text-white">~{results.roofSpaceSqM} sq. meters</span>
                  </div>
                </div>

                {/* Primary CTA Button */}
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setIsModalOpen(true);
                  }}
                  className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black font-sans text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Free Quotation & Site Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-[11px] text-slate-400 text-center font-mono pt-1">
                  Need advice? Call our solar team: <a href="tel:09190669352" className="text-amber-400 font-bold hover:underline">0919-0669352</a>
                </div>

              </div>

              {/* Simple Guarantees */}
              <div className="bg-white border border-slate-200 p-4 rounded-[2px] text-xs space-y-2 text-slate-600">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>CCDI Solar Quality Guarantee</span>
                </div>
                <ul className="space-y-1.5 pl-6 list-disc text-slate-600 text-[11px]">
                  <li>25-year solar panel performance warranty</li>
                  <li>Typhoon-tested aluminum roof mounting (up to 280 kph)</li>
                  <li>Full Net-Metering assistance with Meralco or regional electric cooperatives</li>
                </ul>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── SIMPLE FAQ / HELP SECTION ── */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 text-center">
            Frequently Asked Questions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="space-y-1.5 p-4 bg-slate-50 rounded border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm">How much can I save?</h4>
              <p className="leading-relaxed">
                Homeowners and businesses typically cut their daytime electric bill by 50% to 80%, recovering the entire system investment within 3 to 5 years.
              </p>
            </div>

            <div className="space-y-1.5 p-4 bg-slate-50 rounded border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm">What happens during a brownout?</h4>
              <p className="leading-relaxed">
                With a Hybrid system, the batteries kick in within milliseconds to keep home refrigerators, lights, aircons, and farm ventilation running safely.
              </p>
            </div>

            <div className="space-y-1.5 p-4 bg-slate-50 rounded border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm">How long does installation take?</h4>
              <p className="leading-relaxed">
                Residential installations usually take 1 to 3 days. Commercial farm projects take 2 to 4 weeks with minimal disruption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROPOSAL REQUEST MODAL (CLEAN & SIMPLE) ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 z-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-lg bg-[#07162A] border-2 border-amber-400/80 rounded-[2px] p-6 sm:p-7 z-10 space-y-5 text-left shadow-2xl text-white max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-[#1E3E66] pb-3">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
                    FREE QUOTATION & SITE VISIT
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    Request Solar Proposal
                  </h3>
                  <p className="font-mono text-xs text-slate-300 mt-0.5">
                    {clientType === 'residential' ? 'Residential Home' : 'Commercial / Farm'} • {results.systemSizeKwp.toFixed(1)} kW System • {connectionType === 'on-grid' ? 'Grid-Tied' : connectionType === 'hybrid' ? 'Hybrid' : 'Off-Grid'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded bg-[#102A43] hover:bg-[#1E3E66] text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    Request Received!
                  </h4>
                  <p className="text-xs text-slate-200 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{contactForm.fullName}</strong>. Our solar engineering team from Clark Freeport Zone will contact you within 24 hours to arrange your site assessment.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-[2px] cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                  
                  {/* Quick Summary Box */}
                  <div className="p-3 bg-[#0B192C] border border-[#1E3E66] rounded-[2px] space-y-1 font-mono text-[11px] text-slate-300">
                    <div className="flex justify-between text-amber-400 font-medium">
                      <span>Estimated Price:</span>
                      <span>{formatPeso(results.priceMin)} – {formatPeso(results.priceMax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Bill Savings:</span>
                      <span className="text-emerald-400 font-medium">{formatPeso(results.monthlySavings)} / mo</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.fullName}
                      onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })}
                      placeholder="Juan Dela Cruz"
                      className="w-full px-3 py-2 rounded-[2px] bg-[#0B192C] border border-[#1E3E66] text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold block">
                      {clientType === 'residential' ? 'Property / Subdivision Name' : 'Farm / Company Name'}
                    </label>
                    <input
                      type="text"
                      value={contactForm.companyOrHome}
                      onChange={(e) => setContactForm({ ...contactForm, companyOrHome: e.target.value })}
                      placeholder={clientType === 'residential' ? 'e.g. Angeles City Residence' : 'e.g. San Jose Poultry Farm'}
                      className="w-full px-3 py-2 rounded-[2px] bg-[#0B192C] border border-[#1E3E66] text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold block">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="0919 123 4567"
                        className="w-full px-3 py-2 rounded-[2px] bg-[#0B192C] border border-[#1E3E66] text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold block">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="juan@example.com"
                        className="w-full px-3 py-2 rounded-[2px] bg-[#0B192C] border border-[#1E3E66] text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold block">Location / Province *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.location}
                      onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                      placeholder="e.g. Pampanga / Tarlac / Bulacan / Metro Manila / Batangas"
                      className="w-full px-3 py-2 rounded-[2px] bg-[#0B192C] border border-[#1E3E66] text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#1E3E66]">
                    <span className="text-[10px] text-slate-400">
                      * Free assessment with zero obligation.
                    </span>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-extrabold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors cursor-pointer"
                    >
                      Submit Request →
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
