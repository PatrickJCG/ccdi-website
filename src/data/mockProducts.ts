// ─── Product / Solution Data Model ────────────────────────────────────────────

export interface ProductMetrics {
  spec1Label: string;
  spec1Value: string;
  spec2Label: string;
  spec2Value: string;
  spec3Label: string;
  spec3Value: string;
}

export type BusinessUnit = 'Poultry Farm Equipment' | 'Hatchery' | 'Feedmill' | 'Solar Systems';

export interface Product {
  id: string;
  title: string;
  badge: string;
  businessUnit: BusinessUnit;
  subCategory: string;
  category: string;          // kept for legacy filter compat
  functionCategory: string;  // kept for legacy compat
  speciesTags: string[];
  description: string;
  imageUrl: string;
  metrics: ProductMetrics;
}

export const BUSINESS_UNITS: BusinessUnit[] = [
  'Poultry Farm Equipment',
  'Hatchery',
  'Feedmill',
  'Solar Systems',
];

export const BU_META: Record<BusinessUnit, { icon: string; color: string; coverImage: string; description: string; subCategories: string[] }> = {
  'Poultry Farm Equipment': {
    icon: '🐔',
    color: 'amber',
    coverImage: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    description: 'Biosecure housing, climate control, automated feeding, and complete ventilation systems for broiler, breeder, and layer operations.',
    subCategories: ['All', 'Housing & Structure', 'Ventilation & Cooling', 'Feeding & Watering', 'Automation'],
  },
  'Hatchery': {
    icon: '🥚',
    color: 'blue',
    coverImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    description: 'Turnkey hatchery facility construction with cleanroom airflow, automated incubation, egg handling, and chick processing systems.',
    subCategories: ['All', 'Facility Construction', 'Incubation Equipment', 'Egg Handling', 'Chick Processing'],
  },
  'Feedmill': {
    icon: '🏭',
    color: 'gold',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    description: 'Industrial-grade feedmill plants with grain storage silos, pelleting towers, precision batching automation, and pneumatic conveying.',
    subCategories: ['All', 'Plant Construction', 'Storage & Silos', 'Processing Equipment', 'Automation & Control'],
  },
  'Solar Systems': {
    icon: '☀️',
    color: 'amber',
    coverImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    description: 'Rooftop and ground-mounted solar PV arrays, hybrid microgrids with battery storage, and grid-tied net metering installations.',
    subCategories: ['All', 'Rooftop Solar', 'Ground-Mounted', 'Hybrid & Battery', 'Grid-Tied & Monitoring'],
  },
};

// Legacy compat
export const MOCK_CATEGORIES = [
  'Poultry Facilities',
  'Hatchery Construction',
  'Feedmill Systems',
  'Solar Energy Integration',
];

export const MOCK_FUNCTION_CATEGORIES = [
  'Facility Design & Engineering',
  'Civil & Structural Construction',
  'Equipment & Automation',
  'Renewable Energy Integration',
];

export const MOCK_PRODUCTS: Product[] = [

  // ─── POULTRY FARM EQUIPMENT ──────────────────────────────────────────────
  {
    id: 'pf-01',
    title: 'Climate-Controlled Broiler Housing Complex',
    badge: 'Flagship Build',
    businessUnit: 'Poultry Farm Equipment',
    subCategory: 'Housing & Structure',
    category: 'Poultry Facilities',
    functionCategory: 'Civil & Structural Construction',
    speciesTags: ['Broiler', 'Biosecure', 'Insulated Panels'],
    description: 'Fully automated bio-secure broiler housing engineered with high-grade insulated sandwich panels, evaporative cooling pads, and precision tunnel ventilation for optimal FCR performance.',
    imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Capacity', spec1Value: '50,000 birds/house', spec2Label: 'Build Time', spec2Value: '90 Days', spec3Label: 'FCR Target', spec3Value: '1.45 FCR' },
  },
  {
    id: 'pf-02',
    title: 'Broiler Breeder & Automatic Nesting Facility',
    badge: 'High Hatchability',
    businessUnit: 'Poultry Farm Equipment',
    subCategory: 'Housing & Structure',
    category: 'Poultry Facilities',
    functionCategory: 'Facility Design & Engineering',
    speciesTags: ['Broiler Breeder', 'Auto Nesting', 'Egg Collection'],
    description: 'State-of-the-art breeder housing with automated slatted floors, mechanical roll-away nest boxes, micro-climate controllers, and multi-zone feed distribution systems.',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Capacity', spec1Value: '25,000 breeders', spec2Label: 'Hatchability', spec2Value: '≥88%', spec3Label: 'Build Time', spec3Value: '110 Days' },
  },
  {
    id: 'pf-03',
    title: 'Commercial Layer Battery Cage & Manure Belt Complex',
    badge: 'Peak Production',
    businessUnit: 'Poultry Farm Equipment',
    subCategory: 'Automation',
    category: 'Poultry Facilities',
    functionCategory: 'Equipment & Automation',
    speciesTags: ['Layer', 'Battery Cage', 'Manure Belt'],
    description: 'Multi-tier A-frame or H-frame layer cage systems featuring automated chain feeding, nipple drinking, mechanical egg collection belts, and daily manure belt extraction.',
    imageUrl: 'https://images.unsplash.com/photo-1607619275068-24722480f87b?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Capacity', spec1Value: '100,000 layers', spec2Label: 'Egg Peak Rate', spec2Value: '94%', spec3Label: 'Build Time', spec3Value: '120 Days' },
  },
  {
    id: 'pf-04',
    title: 'High-Capacity Tunnel Ventilation & Evaporative Cooling System',
    badge: 'Thermal Control',
    businessUnit: 'Poultry Farm Equipment',
    subCategory: 'Ventilation & Cooling',
    category: 'Poultry Facilities',
    functionCategory: 'Equipment & Automation',
    speciesTags: ['Tunnel Fans', 'Cooling Pads', 'Variable Speed'],
    description: 'Industrial-grade tunnel ventilation system with variable-speed axial fans, multi-stage evaporative cooling pads, and automated controller maintaining internal temperature at 24–26°C.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Fan Capacity', spec1Value: '45,000 m³/hr each', spec2Label: 'Temp Reduction', spec2Value: '8–12°C', spec3Label: 'Install Time', spec3Value: '30 Days' },
  },
  {
    id: 'pf-05',
    title: 'Automated Pan Feeding & Nipple Drinking System',
    badge: 'Ad Libitum Feed',
    businessUnit: 'Poultry Farm Equipment',
    subCategory: 'Feeding & Watering',
    category: 'Poultry Facilities',
    functionCategory: 'Equipment & Automation',
    speciesTags: ['Pan Feeder', 'Nipple Drinker', 'PLC Control'],
    description: 'Automated chain-drive or flex-auger pan feeding lines with adjustable pan height and integrated nipple drinking system with pressure regulators ensuring uniform water distribution.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Line Length', spec1Value: 'Up to 150m/house', spec2Label: 'Bird-to-Nipple', spec2Value: '1:10 Ratio', spec3Label: 'Install Time', spec3Value: '21 Days' },
  },
  {
    id: 'pf-06',
    title: 'Smart Poultry Farm Controller & Environmental Monitor',
    badge: 'IoT Integration',
    businessUnit: 'Poultry Farm Equipment',
    subCategory: 'Automation',
    category: 'Poultry Facilities',
    functionCategory: 'Equipment & Automation',
    speciesTags: ['Smart Controller', 'IoT', 'Remote Monitoring'],
    description: 'Centralized farm management controller integrating ventilation, heating, feeding schedules, and environmental sensors with remote mobile dashboard and real-time alert notifications.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Sensor Points', spec1Value: '12 per house', spec2Label: 'Uptime', spec2Value: '99.8%', spec3Label: 'Setup', spec3Value: '14 Days' },
  },

  // ─── HATCHERY ─────────────────────────────────────────────────────────────
  {
    id: 'ht-01',
    title: 'Bio-Secure Hatchery Facility Construction',
    badge: 'Cleanroom Grade',
    businessUnit: 'Hatchery',
    subCategory: 'Facility Construction',
    category: 'Hatchery Construction',
    functionCategory: 'Civil & Structural Construction',
    speciesTags: ['Unidirectional Airflow', 'Vapor Seal', 'Bio-Secure'],
    description: 'Full-scale hatchery complex construction with cleanroom-standard unidirectional airflow corridors, vapor-sealed wall panels, epoxy flooring, and centralized HVAC microclimate control for maximum biosecurity.',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Weekly Capacity', spec1Value: '1.2M eggs/week', spec2Label: 'Bio-Pass Rate', spec2Value: '99.2%', spec3Label: 'Build Time', spec3Value: '150 Days' },
  },
  {
    id: 'ht-02',
    title: 'Single-Stage Setter & Hatcher Automation System',
    badge: 'Smart Incubation',
    businessUnit: 'Hatchery',
    subCategory: 'Incubation Equipment',
    category: 'Hatchery Construction',
    functionCategory: 'Equipment & Automation',
    speciesTags: ['Single-Stage Setters', 'Hatchers', 'Automated Turn'],
    description: 'Turnkey installation of continuous single-stage incubation setters and hatchers with automated egg turning, precision humidity/temperature control, and CO₂ monitoring for superior hatch rates.',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Hatch Rate Gain', spec1Value: '+5% vs. Multi-Stage', spec2Label: 'Temp Accuracy', spec2Value: '±0.1°C', spec3Label: 'Install Time', spec3Value: '60 Days' },
  },
  {
    id: 'ht-03',
    title: 'Automated Egg Receiving & Transfer Line',
    badge: 'High Throughput',
    businessUnit: 'Hatchery',
    subCategory: 'Egg Handling',
    category: 'Hatchery Construction',
    functionCategory: 'Equipment & Automation',
    speciesTags: ['Egg Conveyor', 'Auto Transfer', 'Tray Loader'],
    description: 'Automated egg receiving, candling conveyor, setter tray loading, and transfer trolley system designed for continuous high-throughput hatchery operations with minimal manual handling.',
    imageUrl: 'https://images.unsplash.com/photo-1565071783230-fe28b5d3c0d6?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Throughput', spec1Value: '60,000 eggs/hr', spec2Label: 'Breakage Rate', spec2Value: '<0.1%', spec3Label: 'Install Time', spec3Value: '45 Days' },
  },
  {
    id: 'ht-04',
    title: 'Chick Separator, Counter & Vaccination Unit',
    badge: 'Day-Old Chick Line',
    businessUnit: 'Hatchery',
    subCategory: 'Chick Processing',
    category: 'Hatchery Construction',
    functionCategory: 'Equipment & Automation',
    speciesTags: ['Chick Counter', 'In-Ovo Vaccine', 'Separation'],
    description: 'Automated chick pull, sexing conveyor, electronic chick counter, spray vaccination cabinet, and box-filling station designed for high-speed, low-stress day-old chick processing.',
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Processing Speed', spec1Value: '60,000 chicks/hr', spec2Label: 'Accuracy', spec2Value: '±2 chicks/box', spec3Label: 'Install Time', spec3Value: '30 Days' },
  },
  {
    id: 'ht-05',
    title: 'Hatchery HVAC & Negative Pressure Airflow System',
    badge: 'Climate Precision',
    businessUnit: 'Hatchery',
    subCategory: 'Facility Construction',
    category: 'Hatchery Construction',
    functionCategory: 'Facility Design & Engineering',
    speciesTags: ['HVAC', 'Negative Pressure', 'Humidity Control'],
    description: 'Purpose-designed HVAC system for hatchery environments with cascade negative pressure zoning, HEPA filtration, independent room climate control, and automated damper management.',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'RH Control', spec1Value: '±2% accuracy', spec2Label: 'Air Changes', spec2Value: '60 ACH', spec3Label: 'Install Time', spec3Value: '60 Days' },
  },

  // ─── FEEDMILL ─────────────────────────────────────────────────────────────
  {
    id: 'fm-01',
    title: 'Turnkey Industrial Feedmill Processing Plant',
    badge: 'Industrial Grade',
    businessUnit: 'Feedmill',
    subCategory: 'Plant Construction',
    category: 'Feedmill Systems',
    functionCategory: 'Civil & Structural Construction',
    speciesTags: ['Feedmill', 'Grain Silos', 'Pelleting Tower'],
    description: 'Complete turnkey feedmill construction from site preparation through commissioning — including heavy reinforced concrete foundations, structural steel framing, silo pedestals, and process building fit-out.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Capacity', spec1Value: '30 Tons/Hour', spec2Label: 'Uptime', spec2Value: '99.8%', spec3Label: 'Build Time', spec3Value: '180 Days' },
  },
  {
    id: 'fm-02',
    title: 'Steel Grain Storage Silos & Receiving Pit',
    badge: 'Bulk Storage',
    businessUnit: 'Feedmill',
    subCategory: 'Storage & Silos',
    category: 'Feedmill Systems',
    functionCategory: 'Civil & Structural Construction',
    speciesTags: ['Steel Silos', 'Receiving Pit', 'Aeration'],
    description: 'Engineered flat-bottom or hopper-bottom steel grain silos with sweep auger, aeration fans, level sensors, external stairways, and truck receiving pits with capacity to store multiple grain varieties.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Silo Capacity', spec1Value: '500 – 5,000 MT', spec2Label: 'Material', spec2Value: 'Galvanized Steel', spec3Label: 'Build Time', spec3Value: '90 Days' },
  },
  {
    id: 'fm-03',
    title: 'High-Capacity Pellet Mill & Counterflow Cooler',
    badge: 'Premium Pellet Quality',
    businessUnit: 'Feedmill',
    subCategory: 'Processing Equipment',
    category: 'Feedmill Systems',
    functionCategory: 'Equipment & Automation',
    speciesTags: ['Pellet Mill', 'Counterflow Cooler', 'Die & Roll'],
    description: 'Industrial pellet mill with heavy-duty die and roll assembly, conditioner with steam injection for starch gelatinization, and counterflow cooler for optimal pellet durability and moisture reduction.',
    imageUrl: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Output', spec1Value: '10–30 TPH', spec2Label: 'PDI', spec2Value: '≥92%', spec3Label: 'Install Time', spec3Value: '60 Days' },
  },
  {
    id: 'fm-04',
    title: 'Automated Batching, Dosing & Micro-Ingredient System',
    badge: 'Precision Batching',
    businessUnit: 'Feedmill',
    subCategory: 'Automation & Control',
    category: 'Feedmill Systems',
    functionCategory: 'Equipment & Automation',
    speciesTags: ['PLC Batching', 'Micro-Dosing', 'Load Cell'],
    description: 'Computerized PLC-controlled batching system with multi-hopper weigh stations, liquid addition (oils/vitamins), micro-ingredient pre-mixer, and touchscreen HMI for formula management.',
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Weighing Accuracy', spec1Value: '±0.05%', spec2Label: 'Batch Cycle', spec2Value: '<90 seconds', spec3Label: 'Install Time', spec3Value: '45 Days' },
  },
  {
    id: 'fm-05',
    title: 'Pneumatic Conveying & Dust Collection System',
    badge: 'Clean & Efficient',
    businessUnit: 'Feedmill',
    subCategory: 'Processing Equipment',
    category: 'Feedmill Systems',
    functionCategory: 'Equipment & Automation',
    speciesTags: ['Pneumatic Conveying', 'Pulse Jet Filters', 'Dust Control'],
    description: 'High-capacity pneumatic conveying lines for grain and meal transfer, integrated with pulse-jet bag filter dust collectors and rotary valves meeting NFPA dust explosion safety standards.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Conveying Rate', spec1Value: '20–50 TPH', spec2Label: 'Filter Efficiency', spec2Value: '99.9%', spec3Label: 'Install Time', spec3Value: '30 Days' },
  },

  // ─── SOLAR SYSTEMS ────────────────────────────────────────────────────────
  {
    id: 'sl-01',
    title: 'Rooftop Solar PV System for Poultry & Agri Facilities',
    badge: 'OPEX Reduction',
    businessUnit: 'Solar Systems',
    subCategory: 'Rooftop Solar',
    category: 'Solar Energy Integration',
    functionCategory: 'Renewable Energy Integration',
    speciesTags: ['Rooftop PV', 'Monocrystalline', 'On-Grid'],
    description: 'Industrial rooftop solar PV arrays engineered for poultry house and feedmill roofs using Tier-1 monocrystalline panels, stainless mounting systems, and string inverters optimized for daytime operational loads.',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'System Size', spec1Value: '50–500 kWp', spec2Label: 'OPEX Reduction', spec2Value: '35%', spec3Label: 'Install Time', spec3Value: '30 Days' },
  },
  {
    id: 'sl-02',
    title: 'Ground-Mounted Solar PV Farm (Agrivoltaic)',
    badge: 'Dual Land Use',
    businessUnit: 'Solar Systems',
    subCategory: 'Ground-Mounted',
    category: 'Solar Energy Integration',
    functionCategory: 'Renewable Energy Integration',
    speciesTags: ['Ground Mount', 'Agrivoltaic', 'Tracker Ready'],
    description: 'Engineered ground-mounted solar arrays on galvanized steel structures with optional single-axis tracker integration for maximum energy yield, designed for agrivoltaic integration alongside farming operations.',
    imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'System Size', spec1Value: '200 kWp – 5 MWp', spec2Label: 'Yield Gain (Tracker)', spec2Value: '+25%', spec3Label: 'Install Time', spec3Value: '60 Days' },
  },
  {
    id: 'sl-03',
    title: 'Solar + BESS Hybrid Microgrid for Feedmills',
    badge: 'Zero Downtime',
    businessUnit: 'Solar Systems',
    subCategory: 'Hybrid & Battery',
    category: 'Solar Energy Integration',
    functionCategory: 'Renewable Energy Integration',
    speciesTags: ['BESS', 'Hybrid Inverter', 'Generator Sync'],
    description: 'Hybrid solar microgrid combining large-scale PV arrays with lithium battery energy storage (BESS) and automatic generator synchronization, providing uninterrupted power for critical feedmill and hatchery operations.',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Array Size', spec1Value: '500 kWp – 1.2 MWp', spec2Label: 'Battery Storage', spec2Value: '500 kWh BESS', spec3Label: 'Install Time', spec3Value: '60 Days' },
  },
  {
    id: 'sl-04',
    title: 'Grid-Tied Solar with Net Metering Registration',
    badge: 'Utility Compliant',
    businessUnit: 'Solar Systems',
    subCategory: 'Grid-Tied & Monitoring',
    category: 'Solar Energy Integration',
    functionCategory: 'Renewable Energy Integration',
    speciesTags: ['Net Metering', 'Grid-Tied', 'ERC Compliant'],
    description: 'End-to-end grid-tied solar PV installation fully compliant with Philippine ERC net metering regulations — including meralco/electric coop interconnection applications, bidirectional meter, and system commissioning.',
    imageUrl: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Export Savings', spec1Value: 'Up to ₱7.50/kWh', spec2Label: 'Payback Period', spec2Value: '3–4 Years', spec3Label: 'Install Time', spec3Value: '45 Days' },
  },
  {
    id: 'sl-05',
    title: 'Solar Monitoring, O&M & Performance Analytics Platform',
    badge: 'Smart O&M',
    businessUnit: 'Solar Systems',
    subCategory: 'Grid-Tied & Monitoring',
    category: 'Solar Energy Integration',
    functionCategory: 'Renewable Energy Integration',
    speciesTags: ['Remote Monitoring', 'SCADA', 'Preventive Maintenance'],
    description: 'Cloud-based solar PV monitoring platform with real-time yield tracking, inverter fault detection, string-level analytics, and CCDI O&M service packages ensuring maximum system uptime and performance.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Data Resolution', spec1Value: '5-minute intervals', spec2Label: 'System Availability', spec2Value: '99.5%', spec3Label: 'Setup Time', spec3Value: '7 Days' },
  },
];

// ─── Company Stats ─────────────────────────────────────────────────────────

export const MOCK_STATS = [
  { value: '2019', label: 'Founded Year' },
  { value: '100+', label: 'Turnkey Installations' },
  { value: '100%', label: 'Certified Safety & Engineering' },
  { value: '4',    label: 'Core Business Units' },
];

// ─── Quality & Certification Standards ────────────────────────────────────

export const MOCK_QUALITY_ITEMS = [
  {
    id: 'q1',
    title: 'ISO 9001 Quality Management',
    certCode: 'ISO 9001:2015',
    description: 'CCDI adheres to strict ISO 9001 standards across project management, civil design, procurement, and site construction.',
  },
  {
    id: 'q2',
    title: 'PCAB Engineering License',
    certCode: 'PCAB Certified',
    description: 'Licensed by the Philippine Contractors Accreditation Board for commercial, industrial, and agricultural infrastructure construction.',
  },
  {
    id: 'q3',
    title: 'Biosecure Farm Construction',
    certCode: 'Biosecurity Grade A',
    description: 'Building designs incorporate seamless insulation panels, sealed wall surfaces, and hygienic drainage for disease control.',
  },
  {
    id: 'q4',
    title: 'Direct Tier-1 Supplier Sourcing',
    certCode: 'Factory Warranty',
    description: 'Direct relationship with international equipment and solar PV manufacturers providing authentic warranties and factory pricing.',
  },
  {
    id: 'q5',
    title: 'Turnkey EPC Capability',
    certCode: 'Full Scope EPC',
    description: 'Single-source accountability from initial architectural design and civil engineering to equipment commissioning.',
  },
  {
    id: 'q6',
    title: 'Solar Grid Sync Certified',
    certCode: 'Net-Metering Ready',
    description: 'Solar PV installations fully compliant with utility grid sync, net-metering regulations, and electrical safety standards.',
  },
];

// ─── Scannable Metrics Data ───────────────────────────────────────────────

export interface ComparisonRow {
  species: string;
  icon: string;
  fcrImprovement: { value: string; tier: 'best' | 'std' | 'info' };
  avgDailyGain:   { value: string; tier: 'best' | 'std' | 'info' };
  gutHealthScore: { value: string; tier: 'best' | 'std' | 'info' };
  doseRate:       { value: string; tier: 'best' | 'std' | 'info' };
  certifications: string;
}

export const MOCK_COMPARISON_DATA: ComparisonRow[] = [
  {
    species: 'Poultry Farm Equipment',
    icon: '🐔',
    fcrImprovement: { value: '50k / house',  tier: 'best' },
    avgDailyGain:   { value: '1.45 FCR',     tier: 'best' },
    gutHealthScore: { value: '98.5% Uptime', tier: 'best' },
    doseRate:       { value: '90 Days Build', tier: 'std' },
    certifications: 'ISO 9001 · PCAB · Biosecure Grade A',
  },
  {
    species: 'Hatchery Construction',
    icon: '🥚',
    fcrImprovement: { value: '1.2M eggs/wk', tier: 'std' },
    avgDailyGain:   { value: '88%+ Hatch',   tier: 'std' },
    gutHealthScore: { value: '99.2% Bio-Pass', tier: 'std' },
    doseRate:       { value: '150 Days Build', tier: 'best' },
    certifications: 'ISO 9001 · PCAB · Cleanroom Standards',
  },
  {
    species: 'Feedmill Systems',
    icon: '🏭',
    fcrImprovement: { value: '30 TPH Output', tier: 'best' },
    avgDailyGain:   { value: '99.8% Uptime', tier: 'best' },
    gutHealthScore: { value: '±0.05% Accuracy', tier: 'best' },
    doseRate:       { value: '180 Days Build', tier: 'best' },
    certifications: 'ISO 9001 · Heavy Duty Industrial',
  },
  {
    species: 'Solar PV Integration',
    icon: '☀️',
    fcrImprovement: { value: '500 kWp – 5 MWp', tier: 'info' },
    avgDailyGain:   { value: '35% OPEX Cut', tier: 'info' },
    gutHealthScore: { value: '25-Yr Panel Warranty', tier: 'std' },
    doseRate:       { value: '30 Days Install', tier: 'best' },
    certifications: 'Tier-1 PV · Net-Metering Sync',
  },
];

// ─── News Articles ─────────────────────────────────────────────────────────

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  imageUrl: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  content: string[];
  keyHighlights: string[];
  tags: string[];
  featured?: boolean;
}

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'CCDI Commissioned Turnkey 500k-Capacity Broiler Complex in Central Luzon',
    date: 'July 12, 2026',
    category: 'Projects',
    summary: 'Clarkbase Construction Dev\'t Inc. (CCDI) successfully hands over a modern 10-house climate-controlled broiler complex featuring automated feeding, tunnel ventilation, and bio-secure building envelopes.',
    imageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80',
    readTime: '4 min read',
    featured: true,
    author: { name: 'Engr. Marco Santos', role: 'Project Engineering Director' },
    keyHighlights: [
      '10 climate-controlled broiler houses built with insulated sandwich panel walls.',
      'Automated tunnel ventilation system maintaining steady 24°C internal temperature.',
      'Completed 15 days ahead of schedule with zero safety incidents.',
    ],
    tags: ['Poultry Construction', 'Broiler', 'Tunnel Ventilation', 'Central Luzon'],
    content: [
      'Clarkbase Construction Dev\'t Inc. (CCDI) is proud to announce the successful completion and commissioning of a 500,000-bird capacity broiler farm complex in Central Luzon.',
      'Designed from the ground up to meet rigorous biosecurity standards, the project features 10 fully climate-controlled poultry houses equipped with automated feeding lines, closed-nipple watering systems, and evaporative cooling pads.',
    ],
  },
  {
    id: 'news-2',
    title: 'Technical Overview: Solar PV Microgrid Integration in Commercial Feedmills',
    date: 'June 28, 2026',
    category: 'Energy',
    summary: 'A technical review analyzing how combining rooftop solar PV arrays with generator synchronizing inverters reduces daytime electricity overhead by up to 35% in feed processing plants.',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    readTime: '6 min read',
    featured: false,
    author: { name: 'Engr. Elena Rostova', role: 'Head of Renewable Energy Solutions' },
    keyHighlights: [
      'Integration of 800 kWp rooftop solar array with existing 3-phase industrial power grid.',
      '35% reduction in monthly grid electricity expenditure with a 3.2-year payback period.',
    ],
    tags: ['Solar PV', 'Feedmill', 'Energy Savings', 'Renewable Energy'],
    content: [
      'High-tonnage feedmills face heavy power demands from pelleting mills, hammermills, and pneumatic conveying systems. With daytime electricity tariffs rising, integrating solar power has become an essential strategy for cost reduction.',
    ],
  },
  {
    id: 'news-3',
    title: 'CCDI Expands Direct Supplier Network for Advanced Hatchery Automation',
    date: 'May 15, 2026',
    category: 'Partnerships',
    summary: 'By strengthening direct relationships with global hatchery equipment manufacturers, CCDI secures tier-one pricing and factory warranties on automated setters, hatchers, and egg handling lines.',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    readTime: '3 min read',
    featured: false,
    author: { name: 'Aisha Al-Hassan', role: 'Procurement & Quality Officer' },
    keyHighlights: [
      'Direct tier-one sourcing partnerships with leading European and Asian machinery manufacturers.',
      'Eliminates distributor markups for Philippine agribusiness clients.',
    ],
    tags: ['Direct Sourcing', 'Hatchery Automation', 'Partnerships', 'Equipment'],
    content: [
      'Clarkbase Construction Dev\'t Inc. (CCDI) has expanded its direct procurement networks with international manufacturers of automated hatchery equipment.',
    ],
  },
];
