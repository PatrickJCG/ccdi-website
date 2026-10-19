import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wind,
  Layers,
  Droplets,
  Cpu,
  Building2,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  RotateCcw,
  FileText,
  Check,
  Send,
  Info,
} from 'lucide-react';
import type { Product } from '../../data/mockProducts';

export interface FarmRetrofitConfiguratorProps {
  inquiryItems?: Product[];
  onToggleInquiry?: (product: Product) => void;
  onOpenAuditModal?: () => void;
}

export type OperationType = 'broiler' | 'layer' | 'breeder';
export type CurrentHousing = 'open-sided' | 'older-tunnel' | 'conventional-metal';

interface DimensionPreset {
  label: string;
  sublabel: string;
  length: number;
  width: number;
  eave: number;
}

const DIMENSION_PRESETS: DimensionPreset[] = [
  { label: '100m × 12m', sublabel: '1,200 m²', length: 100, width: 12, eave: 2.6 },
  { label: '120m × 14m', sublabel: '1,680 m²', length: 120, width: 14, eave: 2.8 },
  { label: '130m × 15m', sublabel: '1,950 m²', length: 130, width: 15, eave: 2.8 },
  { label: '150m × 16m', sublabel: '2,400 m²', length: 150, width: 16, eave: 3.0 },
];

interface UpgradeCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  items: string[];
}

const UPGRADE_CATEGORIES: UpgradeCategory[] = [
  {
    id: 'cages',
    title: 'Cages & Housing Systems',
    subtitle: 'Battery cages, layer structures, and manure handling',
    icon: Layers,
    items: [
      'A-Frame Layer Cages',
      'H-Frame Automated Battery Cages',
      'Brooder / Pullet Rearing Cages',
      'Automated Manure Belt System',
      'Egg Collection Belts & Elevators',
    ],
  },
  {
    id: 'fans',
    title: 'Fans & Ventilation',
    subtitle: 'Exhaust cone fans, cooling pads, and air inlets',
    icon: Wind,
    items: [
      '50" High-Efficiency Cone Exhaust Fans',
      '54" Heavy-Duty Cone Exhaust Fans',
      'Evaporative Cooling Wet Pad Walls (150mm)',
      'Circulation / Stir Fans',
      'Tunnel Curtains & Winch System',
    ],
  },
  {
    id: 'accessories',
    title: 'Feeding & Drinking Accessories',
    subtitle: 'Automated lines, silos, augers, and water dosing',
    icon: Droplets,
    items: [
      'Nipple Drinking Lines & Pressure Regulators',
      'Automatic Pan Feeding Lines',
      'External Feed Silo & Auger Conveyor',
      'Medication Dosing Pump / Medicators',
      'High-Pressure Cooling Misting Lines',
    ],
  },
  {
    id: 'support',
    title: 'Support Systems & Automation',
    subtitle: 'Climate computers, standby power, and LED lighting',
    icon: Cpu,
    items: [
      'Smart Microprocessor Climate Controller',
      'Emergency Auto Curtain Drop System',
      'Dimmable LED Poultry Barn Lighting',
      'Motor Control Panels & Breakers',
      'Backup Generator & Auto Transfer Switch (ATS)',
    ],
  },
  {
    id: 'others',
    title: 'Structure, Insulation & Others',
    subtitle: 'Sandwich panels, steel trusses, and biosecurity',
    icon: Building2,
    items: [
      'Insulated Ceiling / Roof Sandwich Panels',
      'Insulated Wall Panels',
      'Steel Truss & Post Reinforcement',
      'Biosecurity Vehicle Disinfection Gate',
      'Rodent & Bird Proofing Wire Netting',
    ],
  },
];

export const FarmRetrofitConfigurator: React.FC<FarmRetrofitConfiguratorProps> = () => {
  // ── 1. CURRENT FARM SPECS ──────────────────────────────────────────────────
  const [operationType, setOperationType] = useState<OperationType>('broiler');
  const [currentHousing, setCurrentHousing] = useState<CurrentHousing>('open-sided');
  const [houseCount, setHouseCount] = useState<number>(2);
  const [length, setLength] = useState<number>(120);
  const [width, setWidth] = useState<number>(14);
  const [eaveHeight, setEaveHeight] = useState<number>(2.8);
  const [currentCapacity, setCurrentCapacity] = useState<string>('20,000 birds');
  const [location, setLocation] = useState<string>('');
  const [powerSource, setPowerSource] = useState<string>('3-Phase Commercial Grid');

  // ── 2. UPGRADES WANTED ─────────────────────────────────────────────────────
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'fans',
    'accessories',
    'support',
  ]);
  const [selectedItems, setSelectedItems] = useState<string[]>([
    '50" High-Efficiency Cone Exhaust Fans',
    'Evaporative Cooling Wet Pad Walls (150mm)',
    'Nipple Drinking Lines & Pressure Regulators',
    'Automatic Pan Feeding Lines',
    'Smart Microprocessor Climate Controller',
  ]);

  // ── 3. CLIENT DETAILED DESCRIPTION (REQUIRED) ──────────────────────────────
  const [description, setDescription] = useState<string>('');

  // ── 4. CONTACT DETAILS ─────────────────────────────────────────────────────
  const [contactName, setContactName] = useState<string>('');
  const [farmName, setFarmName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [preferredContact, setPreferredContact] = useState<string>('Phone Call');
  const [timeline, setTimeline] = useState<string>('Within 1 to 2 Months');

  // ── SUBMISSION STATE ───────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Quick Preset handler
  const handleApplyPreset = (p: DimensionPreset) => {
    setLength(p.length);
    setWidth(p.width);
    setEaveHeight(p.eave);
  };

  // Toggle category
  const toggleCategory = (catId: string) => {
    if (selectedCategories.includes(catId)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== catId));
    } else {
      setSelectedCategories([...selectedCategories, catId]);
      // Also automatically select the first 2 items of this category for ease of use
      const cat = UPGRADE_CATEGORIES.find((c) => c.id === catId);
      if (cat) {
        const newItems = Array.from(new Set([...selectedItems, ...cat.items.slice(0, 2)]));
        setSelectedItems(newItems);
      }
    }
  };

  // Toggle specific sub-item
  const toggleItem = (item: string, parentCatId: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
      if (!selectedCategories.includes(parentCatId)) {
        setSelectedCategories([...selectedCategories, parentCatId]);
      }
    }
  };

  // Calculations for reference
  const areaPerHouse = length * width;
  const totalFarmArea = areaPerHouse * houseCount;

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!contactName.trim()) {
      setErrorMessage('Please enter your full name so our engineering team knows who to address.');
      return;
    }

    if (!phone.trim()) {
      setErrorMessage('Please provide a mobile phone number so our team can reach you.');
      return;
    }

    if (selectedCategories.length === 0) {
      setErrorMessage('Please select at least one upgrade category you need.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setDescription('');
    setContactName('');
    setFarmName('');
    setPhone('');
    setEmail('');
    setLocation('');
  };

  return (
    <div className="w-full text-left font-sans">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          /* ── SUBMISSION CONFIRMATION SCREEN ── */
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="bg-white border border-slate-200 rounded-[2px] p-6 sm:p-10 shadow-sm space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                  Assessment Request Received
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Thank you, {contactName}!
                </h3>
                <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Our poultry retrofit engineering team has received your existing farm specifications and upgrade requirements. We will review your house dimensions and prepare a preliminary proposal within 24 business hours.
                </p>
              </div>
            </div>

            {/* Summary Review Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-[2px] p-5 space-y-4 text-xs">
              <h4 className="font-bold text-slate-800 text-sm border-b border-slate-200 pb-2">
                Summary of Your Request
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-slate-500 block">Poultry Operation:</span>
                  <span className="font-semibold text-slate-800 capitalize">
                    {operationType}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Existing Houses:</span>
                  <span className="font-semibold text-slate-800">
                    {houseCount} house{houseCount > 1 ? 's' : ''} ({length}m × {width}m)
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Total Floor Area:</span>
                  <span className="font-semibold text-slate-800 font-mono">
                    {totalFarmArea.toLocaleString()} m²
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Farm Location:</span>
                  <span className="font-semibold text-slate-800">
                    {location || 'Not specified'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 block mb-1">Upgrades Requested:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCategories.map((catId) => {
                    const cat = UPGRADE_CATEGORIES.find((c) => c.id === catId);
                    return (
                      <span
                        key={catId}
                        className="bg-white border border-slate-200 text-slate-800 px-2.5 py-1 rounded-[2px] font-medium"
                      >
                        {cat?.title}
                      </span>
                    );
                  })}
                </div>
              </div>

              {selectedItems.length > 0 && (
                <div>
                  <span className="text-slate-500 block mb-1">Specific Equipment Selected:</span>
                  <p className="text-slate-700 leading-relaxed font-mono text-[11px]">
                    {selectedItems.join(' • ')}
                  </p>
                </div>
              )}

              {description && (
                <div>
                  <span className="text-slate-500 block mb-1">Your Stated Requirements:</span>
                  <p className="text-slate-700 bg-white p-3 rounded-[2px] border border-slate-200 italic">
                    "{description}"
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200 text-slate-600">
                <div>
                  <span className="block text-slate-400">Contact Number:</span>
                  <span className="font-semibold text-slate-800">{phone}</span>
                </div>
                <div>
                  <span className="block text-slate-400">Email Address:</span>
                  <span className="font-semibold text-slate-800">{email || 'Not provided'}</span>
                </div>
                <div>
                  <span className="block text-slate-400">Target Timeline:</span>
                  <span className="font-semibold text-slate-800">{timeline}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 bg-[#0B192C] hover:bg-slate-800 text-white px-5 py-2.5 rounded-[2px] text-xs font-semibold cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Submit Another Assessment</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* ── MAIN ASSESSMENT FORM ── */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* ── SECTION 1: EXISTING FARM SPECS ── */}
            <div className="bg-white border border-slate-200 rounded-[2px] p-5 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center font-mono">
                    1
                  </span>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Current Farm Specifications
                  </h3>
                </div>
                <span className="text-xs text-slate-500 hidden sm:inline-block">
                  Tell us about your existing setup
                </span>
              </div>

              {/* Poultry Operation Type & Housing Type */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Operation Type */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Poultry Operation Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'broiler', label: 'Broilers', sub: 'Meat production' },
                      { id: 'layer', label: 'Egg Layers', sub: 'Table eggs' },
                      { id: 'breeder', label: 'Breeders', sub: 'Parent stock' },
                    ].map((op) => (
                      <button
                        key={op.id}
                        type="button"
                        onClick={() => setOperationType(op.id as OperationType)}
                        className={`p-2.5 rounded-[2px] text-left border transition-all cursor-pointer ${
                          operationType === op.id
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="block text-xs font-bold">{op.label}</span>
                        <span
                          className={`block text-[10px] ${
                            operationType === op.id ? 'text-slate-300' : 'text-slate-500'
                          }`}
                        >
                          {op.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Housing Style */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Current House Construction Style
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'open-sided', label: 'Open-Sided', sub: 'Curtain walls' },
                      { id: 'older-tunnel', label: 'Older Tunnel', sub: 'Aging fans/pads' },
                      { id: 'conventional-metal', label: 'Steel Shed', sub: 'Open truss structure' },
                    ].map((house) => (
                      <button
                        key={house.id}
                        type="button"
                        onClick={() => setCurrentHousing(house.id as CurrentHousing)}
                        className={`p-2.5 rounded-[2px] text-left border transition-all cursor-pointer ${
                          currentHousing === house.id
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="block text-xs font-bold">{house.label}</span>
                        <span
                          className={`block text-[10px] ${
                            currentHousing === house.id ? 'text-slate-300' : 'text-slate-500'
                          }`}
                        >
                          {house.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Number of Houses & Quick Dimension Presets */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-semibold text-slate-700">
                    Building Dimensions (Length × Width × Height)
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-500">Quick presets:</span>
                    {DIMENSION_PRESETS.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => handleApplyPreset(p)}
                        className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-[2px] border border-slate-200 cursor-pointer"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Number of Houses</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={houseCount}
                      onChange={(e) => setHouseCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-[2px] px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">House Length (m)</label>
                    <input
                      type="number"
                      min={20}
                      max={250}
                      value={length}
                      onChange={(e) => setLength(Math.max(10, parseInt(e.target.value) || 10))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-[2px] px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">House Width (m)</label>
                    <input
                      type="number"
                      min={6}
                      max={30}
                      value={width}
                      onChange={(e) => setWidth(Math.max(6, parseInt(e.target.value) || 6))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-[2px] px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Eave Height (m)</label>
                    <input
                      type="number"
                      step={0.1}
                      min={2.0}
                      max={5.0}
                      value={eaveHeight}
                      onChange={(e) => setEaveHeight(parseFloat(e.target.value) || 2.8)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-[2px] px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-[2px] flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
                  <div className="flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-slate-500" />
                    <span>Calculated footprint:</span>
                    <span className="font-semibold text-slate-900 font-mono">
                      {areaPerHouse.toLocaleString()} m² per house
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-semibold text-slate-900 font-mono">
                      {totalFarmArea.toLocaleString()} m² total farm area
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Across {houseCount} building{houseCount > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Current Capacity & Farm Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Bird Capacity / Flock Size
                  </label>
                  <input
                    type="text"
                    value={currentCapacity}
                    onChange={(e) => setCurrentCapacity(e.target.value)}
                    placeholder="e.g. 20,000 broilers per house"
                    className="w-full bg-slate-50 border border-slate-200 rounded-[2px] px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Farm Location (Province / Municipality)
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. San Jose, Batangas"
                      className="w-full bg-slate-50 border border-slate-200 rounded-[2px] pl-8 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Existing Electric Power Source
                  </label>
                  <select
                    value={powerSource}
                    onChange={(e) => setPowerSource(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-[2px] px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900 cursor-pointer"
                  >
                    <option value="3-Phase Commercial Grid">3-Phase Commercial Grid (440V / 220V)</option>
                    <option value="Single-Phase 220V">Single-Phase 220V Grid</option>
                    <option value="Generator Only (Off-Grid)">Generator Only (Off-Grid)</option>
                    <option value="Solar + Generator Hybrid">Solar + Generator Hybrid</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ── SECTION 2: WHAT DOES THE CLIENT WANT TO UPGRADE ── */}
            <div className="bg-white border border-slate-200 rounded-[2px] p-5 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center font-mono">
                    2
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      What Systems Do You Want to Upgrade?
                    </h3>
                    <p className="text-xs text-slate-500">
                      Select all categories and specific components you need for your modernization
                    </p>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
                  {selectedCategories.length} categories selected
                </span>
              </div>

              {/* Upgrade Categories Cards */}
              <div className="space-y-3">
                {UPGRADE_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isCatSelected = selectedCategories.includes(cat.id);

                  return (
                    <div
                      key={cat.id}
                      className={`border rounded-[2px] p-4 transition-all ${
                        isCatSelected
                          ? 'border-slate-900 bg-slate-50/70 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      {/* Category Header Row */}
                      <div className="flex items-start justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => toggleCategory(cat.id)}
                          className="flex items-start gap-3 text-left cursor-pointer flex-1"
                        >
                          <div
                            className={`w-9 h-9 rounded-[2px] flex items-center justify-center shrink-0 transition-colors ${
                              isCatSelected
                                ? 'bg-slate-900 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">
                                {cat.title}
                              </span>
                              {isCatSelected && (
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-1.5 py-0.5 rounded-[2px]">
                                  Selected
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              {cat.subtitle}
                            </p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleCategory(cat.id)}
                          className={`w-5 h-5 rounded-[2px] border flex items-center justify-center cursor-pointer transition-colors ${
                            isCatSelected
                              ? 'bg-slate-900 border-slate-900 text-white'
                              : 'border-slate-300 bg-white hover:border-slate-400'
                          }`}
                        >
                          {isCatSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      </div>

                      {/* Sub-Items Clickable Chips */}
                      <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-wrap gap-1.5">
                        {cat.items.map((item) => {
                          const isItemSelected = selectedItems.includes(item);
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => toggleItem(item, cat.id)}
                              className={`px-2.5 py-1 rounded-[2px] text-[11px] font-medium transition-all cursor-pointer border ${
                                isItemSelected
                                  ? 'bg-[#0B192C] text-white border-[#0B192C]'
                                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                              }`}
                            >
                              {isItemSelected ? '✓ ' : '+ '}
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── SECTION 3: TEXT FIELD FOR CLIENT DESCRIPTION (REQUIRED REQ) ── */}
            <div className="bg-white border border-slate-200 rounded-[2px] p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center font-mono">
                  3
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-600" />
                    Describe What You Need & Current Farm Issues
                  </h3>
                  <p className="text-xs text-slate-500">
                    Provide details on your farm challenges, goals, or integrator requirements
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Detailed Project Description & Specific Needs
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe your specific upgrade goals. For example:
• Current farm issues (e.g., heat stress in summer, high mortality, outdated climate controller, wet manure)
• Target integrator technical standards (e.g., San Miguel, Bounty, CP, Universal Robina requirements)
• Specific equipment brands or sizes you prefer (e.g., 50-inch cone fans, 150mm pads, H-frame layer cages)
• Any structural questions about reusing your concrete slabs or existing steel posts..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-[2px] p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 leading-relaxed font-sans"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                  <span>Be as detailed as possible to help our engineers prepare an accurate scope.</span>
                  <span>{description.length} characters</span>
                </div>
              </div>
            </div>

            {/* ── SECTION 4: CONTACT & TIMELINE DETAILS ── */}
            <div className="bg-white border border-slate-200 rounded-[2px] p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center font-mono">
                  4
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Contact Information & Project Timeline
                  </h3>
                  <p className="text-xs text-slate-500">
                    Where should our engineering team send the assessment proposal?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Juan dela Cruz"
                    className="w-full bg-slate-50 border border-slate-200 rounded-[2px] px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Farm / Business Name
                  </label>
                  <input
                    type="text"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    placeholder="e.g. JDC Poultry Farm"
                    className="w-full bg-slate-50 border border-slate-200 rounded-[2px] px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0917 123 4567"
                      className="w-full bg-slate-50 border border-slate-200 rounded-[2px] pl-8 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="juan@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-[2px] pl-8 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Way to Contact You
                  </label>
                  <select
                    value={preferredContact}
                    onChange={(e) => setPreferredContact(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-[2px] px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900 cursor-pointer"
                  >
                    <option value="Phone Call">Phone Call</option>
                    <option value="Viber Message">Viber Message</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Email">Email</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Estimated Project Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-[2px] px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900 cursor-pointer"
                  >
                    <option value="Immediate (Flock break within 30 days)">
                      Immediate (Flock break within 30 days)
                    </option>
                    <option value="Within 1 to 2 Months">Within 1 to 2 Months</option>
                    <option value="Next 3 to 6 Months">Next 3 to 6 Months</option>
                    <option value="Planning / Budgeting for Next Year">
                      Planning / Budgeting for Next Year
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* ERROR MESSAGE IF ANY */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-[2px]">
                {errorMessage}
              </div>
            )}

            {/* ── SUBMISSION ACTION BAR ── */}
            <div className="bg-slate-900 text-white rounded-[2px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="block text-xs font-bold text-white">
                  Ready to upgrade your poultry farm?
                </span>
                <span className="block text-[11px] text-slate-400 mt-0.5">
                  Our poultry engineers will review your building specs and get in touch within 24 hours.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-[2px] text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm shrink-0 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Specs...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Upgrade Assessment</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
};
