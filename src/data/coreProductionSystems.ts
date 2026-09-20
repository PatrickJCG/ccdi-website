export interface SystemImage {
  url: string;
  title: string;
  caption?: string;
  isVideo?: boolean;
}

export interface ProductionSystem {
  id: string;
  systemNumber: string; // e.g. "SYSTEM 01"
  num: string;          // e.g. "01"
  name: string;
  tagline: string;
  description: string;
  primaryImage: string;
  galleryImages: SystemImage[];
  specCategoryLabel: string; // e.g. "AVAILABLE CONFIGURATIONS"
  specTags: string[];
  keyMetrics: {
    label: string;
    value: string;
  }[];
  accentColor: 'amber' | 'sky' | 'rose' | 'cyan' | 'emerald' | 'indigo';
}

export interface ProductionSectorCategory {
  id: string;
  sectorName: string;
  sectorShortName: string;
  tagline: string;
  title: string;
  description: string;
  accentBadge: string;
  systems: ProductionSystem[];
}

// ─── 1. POULTRY BREEDING OPERATIONS: 6 CORE PRODUCTION SYSTEMS ─────────────────
export const POULTRY_BREEDER_SYSTEMS: ProductionSystem[] = [
  {
    id: 'pb-nesting',
    systemNumber: 'SYSTEM 01',
    num: '01',
    name: 'Nesting System',
    tagline: 'Automated Community Egg Collection',
    description: 'An egg-laying system for clean, efficient, and reliable egg collection, with configurations from manual to fully automated group community nests with variable speed collection belts.',
    primaryImage: '/images/breeder/american-type-interior.jpg',
    galleryImages: [
      {
        url: '/images/breeder/american-type-interior.jpg',
        title: 'Sidewall Nests & Slatted Floor Layout',
        caption: 'Lateral group nest boxes along the sidewalls in an American Type breeder house',
      },
      {
        url: '/images/breeder/american-type-3d.png',
        title: 'American Type 3D Architecture (1/3 Slat)',
        caption: '1/3 elevated slat ratio along sidewalls with central open mating arena',
      },
      {
        url: '/images/breeder/euro-style-3d.png',
        title: 'European Type 3D Architecture (2/3 Slat)',
        caption: 'Central automated group nesting row with 2/3 slatted deck and end mating areas',
      },
      {
        url: '/images/breeder/euro-style-interior.png',
        title: 'European Style Central Community Nesting',
        caption: 'Automated central group community nest line with continuous collection belts',
      },
      {
        url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=80',
        title: 'Community Group Nests',
        caption: 'High-density community nest boxes with perforated comfort mats',
      },
      {
        url: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80',
        title: 'Automated Conveyor Table',
        caption: 'Continuous variable-speed egg belt delivering to central staging',
      },
      {
        url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80',
        title: 'Slatted Floor Integration',
        caption: 'Heavy-duty polypropylene slatted flooring for hygienic footpad health',
      },
    ],
    specCategoryLabel: 'AVAILABLE CONFIGURATIONS:',
    specTags: [
      'Conventional Nests',
      'Single Automatic Nests',
      'Group Automatic Nests',
      'Gentle Egg Conveyor Belts',
      'Variable-Speed Packing Tables',
    ],
    keyMetrics: [
      { label: 'Collection Efficiency', value: '>99.2%' },
      { label: 'Floor Egg Reduction', value: '<0.8%' },
    ],
    accentColor: 'amber',
  },
  {
    id: 'pb-climate',
    systemNumber: 'SYSTEM 02',
    num: '02',
    name: 'Controlled Climate System',
    tagline: 'Precision Tunnel Ventilation & Static Balance',
    description: 'An integrated climate regulation system that ensures stable internal housing conditions with precise static pressure balance, variable-speed cone exhaust fans, and evaporative cooling pads.',
    primaryImage: '/images/breeder/american-type-3d.png',
    galleryImages: [
      {
        url: '/images/breeder/american-type-3d.png',
        title: 'Gable End Tunnel Exhaust Bank',
        caption: '18 high-velocity cone fans engineered for static-balanced negative pressure',
      },
      {
        url: '/images/breeder/american-type-interior.jpg',
        title: 'Overhead Jet Circulation Fans',
        caption: 'Ceiling circulation fan network preventing thermal stratification inside the barn',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        title: 'High-Velocity Exhaust Fans',
        caption: 'F50 butterfly cone fans engineered for 44,000+ CFM output',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        title: 'Evaporative Cooling Pads',
        caption: 'Cellulose wet pad walls providing 5–8°C ambient temperature drops',
      },
      {
        url: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1200&q=80',
        title: 'Microclimate Inlets & Baffles',
        caption: 'Automated ceiling actuators with static pressure balancing',
      },
    ],
    specCategoryLabel: 'CONTROLLERS & FANS (CE CERTIFIED):',
    specTags: [
      'EI-6000PLUS Controller',
      'EI-1000C Unit',
      'F50 Butterfly Cone Fans',
      'EI-50 Louvered Fans',
      '50" Inverter Fan',
      '55" Direct-Drive EC',
    ],
    keyMetrics: [
      { label: 'Static Pressure Tol.', value: '±2 Pa' },
      { label: 'Air Speed Range', value: '2.5–3.2 m/s' },
    ],
    accentColor: 'sky',
  },
  {
    id: 'pb-heating',
    systemNumber: 'SYSTEM 03',
    num: '03',
    name: 'Heating System',
    tagline: 'Infrared Brooding & Space Temperature Control',
    description: 'A controlled heat distribution system to maintain optimal temperatures for bird comfort, growth, and survival during brooding cycles with infrared radiant brooders and space heaters.',
    primaryImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        title: 'Infrared Gas Brooders',
        caption: 'DAMLY radiant brooders directing direct thermal floor coverage',
      },
      {
        url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
        title: 'Forced-Air Space Heaters',
        caption: 'High-BTU industrial space heaters for rapid whole-house brooding',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        title: 'Electronic Ignition & Safety Valving',
        caption: 'Integrated dual flame sensors with emergency auto gas cut-off',
      },
    ],
    specCategoryLabel: 'HEATING EQUIPMENT:',
    specTags: [
      'DAMLY Gas Heaters',
      'Catalytic Brooders',
      'Forced Air Space Heaters',
      'Propane / LPG Compatible',
      'Automatic Thermostat Link',
    ],
    keyMetrics: [
      { label: 'Thermal Efficiency', value: '98.5%' },
      { label: 'Brooding Capacity', value: '1,500 Birds/Unit' },
    ],
    accentColor: 'rose',
  },
  {
    id: 'pb-feeding',
    systemNumber: 'SYSTEM 04',
    num: '04',
    name: 'Feeding System',
    tagline: 'Uniform Metered Feed Delivery & Male Exclusion',
    description: 'Automated or semi-automated system that stores, meters, and uniformly distributes feed using controlled outdoor silos, flex augers, and breeder pan/chain networks with male exclusion grills.',
    primaryImage: '/images/breeder/american-type-interior.jpg',
    galleryImages: [
      {
        url: '/videos/poultry-breeding-american.mp4',
        title: '3D Facility Video Tour',
        caption: 'Animated 3D flight tour through American Type house showing suspended pan lines and silo feed auger',
        isVideo: true,
      },
      {
        url: '/images/breeder/american-type-interior.jpg',
        title: 'Suspended Breeder Pan Lines',
        caption: 'Suspended automated pan feeding network ensuring rapid flock access and zero feed bridging',
      },
      {
        url: '/images/breeder/american-type-3d.png',
        title: 'Complete House Feeder & Silo Run',
        caption: 'Bulk outdoor silo feeding multiple longitudinal tracks through the poultry house',
      },
      {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        title: 'Galvanized Feed Silos & Augers',
        caption: 'Heavy zinc-coated outdoor bulk silos with high-speed core augers',
      },
      {
        url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80',
        title: 'Female Breeder Pan Feeders',
        caption: 'Anti-spill breeder pans with adjustable male exclusion grills',
      },
      {
        url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=80',
        title: 'High-Speed Chain Feeder Loop',
        caption: 'Uniform flock nutrition distribution at 36 meters/min travel speed',
      },
    ],
    specCategoryLabel: 'BREEDER SPECIFIC FEATURES:',
    specTags: [
      'Female Pan/Chain Feeder',
      'Male Exclusion Grills',
      'Outdoor Feed Silos & Augers',
      'Weighing Hopper Loadcells',
      'Tensioner & Drive Units',
    ],
    keyMetrics: [
      { label: 'Feed Travel Speed', value: '36 m/min' },
      { label: 'Dosing Uniformity', value: '±1.2%' },
    ],
    accentColor: 'amber',
  },
  {
    id: 'pb-drinking',
    systemNumber: 'SYSTEM 05',
    num: '05',
    name: 'Drinking System',
    tagline: '360° Closed Nipple Network & Auto-Flushing',
    description: 'Automated water delivery system ensuring clean supply, uniform access, and regulated flow via integrated networks, anti-roost shock lines, drip cups, and pressure regulator stations.',
    primaryImage: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1200&q=80',
        title: '360° Stainless Steel Nipple Lines',
        caption: 'Precision trigger pins delivering clean water on multi-angle contact',
      },
      {
        url: 'https://images.unsplash.com/photo-1558441719-aa3445544f50?auto=format&fit=crop&w=1200&q=80',
        title: 'Water Pressure Regulators',
        caption: 'Sight-tube pressure management stations for balanced end-line flow',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        title: 'Automated Flush Valves',
        caption: 'Periodic biofilm flushing to ensure supreme water biosecurity',
      },
    ],
    specCategoryLabel: 'WATER NETWORK FEATURES:',
    specTags: [
      '360° Nipple Drinkers',
      'Drip Cups & Pressure Regulators',
      'Auto-Flush Solenoids',
      'Anti-Roost Shock Wire',
      'Sediment Cartridge Filters',
    ],
    keyMetrics: [
      { label: 'Flow Rate Range', value: '45–90 ml/min' },
      { label: 'Litter Dryness Index', value: '>95%' },
    ],
    accentColor: 'cyan',
  },
  {
    id: 'pb-medication',
    systemNumber: 'SYSTEM 06',
    num: '06',
    name: 'Medication System',
    tagline: 'Precision Proportional Dosing & Vaccine Manifold',
    description: 'A system for delivering medications, vaccines, and nutritional supplements through water for accurate dosing and uniform flock treatment using non-electric water-powered proportional pumps.',
    primaryImage: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1200&q=80',
        title: 'Dosatron Proportional Pump',
        caption: 'Hydraulic dosing injector operating accurately without external electricity',
      },
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        title: 'Dual-Filter Water Manifold',
        caption: 'Three-valve bypass assembly allowing continuous barn supply during service',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        title: 'Pulse Water Meter Telemetry',
        caption: 'Digital pulse output transmitting live consumption rates to central controller',
      },
    ],
    specCategoryLabel: 'DOSING CAPABILITIES:',
    specTags: [
      'Dosatron Dosing Pumps',
      'Water Manifold Bypass',
      'Uniform Proportional Flow',
      'Digital Flow Pulse Meters',
      'Dual 130-Micron Mesh Filters',
    ],
    keyMetrics: [
      { label: 'Dosing Accuracy', value: '±0.5%' },
      { label: 'Operating Ratio', value: '0.2% – 2.0%' },
    ],
    accentColor: 'emerald',
  },
];

// ─── 2. HATCHERY SOLUTIONS: 6 CORE PRODUCTION SYSTEMS ─────────────────────────
export const HATCHERY_SYSTEMS: ProductionSystem[] = [
  {
    id: 'ha-setter',
    systemNumber: 'SYSTEM 01',
    num: '01',
    name: 'Single-Stage Setter & Incubation',
    tagline: 'Tight Embryo Microclimate & Synchronized Development',
    description: 'Precision environmental incubation chambers engineered for all-in/all-out single-stage batches. Features automated CO2-driven damper controls, pulse-width modulation heaters, and pneumatic turning frames.',
    primaryImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
        title: 'Modular Setter Cabinets',
        caption: 'Aneroid-sealed modular polyurethane panels with hygienic easy-clean radiused corners',
      },
      {
        url: 'https://images.unsplash.com/photo-1579165466791-78818925567b?auto=format&fit=crop&w=1200&q=80',
        title: 'Pneumatic Egg Turning System',
        caption: 'Precision 45° bi-directional turning mechanism maintaining optimal yolk positioning',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        title: 'Embryo Temperature Sensor Bar',
        caption: 'Infrared eggshell temperature telemetry regulating cabinet cooling dynamically',
      },
    ],
    specCategoryLabel: 'SETTER ARCHITECTURE & SPECS:',
    specTags: [
      'Single-Stage Incubation',
      'PWM Heating Elements',
      'CO2 Dynamic Venting',
      'Pneumatic 45° Turning Racks',
      '115,200 Egg Standard Hall',
    ],
    keyMetrics: [
      { label: 'Temp Precision', value: '±0.1°C' },
      { label: 'Hatchability Boost', value: '+2.8%' },
    ],
    accentColor: 'sky',
  },
  {
    id: 'ha-hvac',
    systemNumber: 'SYSTEM 02',
    num: '02',
    name: 'Cleanroom Biosecure HVAC',
    tagline: 'Positive-Pressure Cascades & Unidirectional Airflow',
    description: 'Industrial cleanroom air handling engineered to prevent pathogen ingress. Maintains strict differential pressure gradients from cleanest zones (setter halls) to dirty zones (washrooms) with HEPA filtration.',
    primaryImage: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80',
        title: 'Hygienic Air Handling Units',
        caption: 'Double-skin stainless steel AHU modules with UV-C microbial deactivation',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        title: 'Pressure Cascade Controller',
        caption: 'Differential pressure sensors locking corridors against backward cross-contamination',
      },
      {
        url: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1200&q=80',
        title: 'Direct-Expansion Chillers',
        caption: 'Redundant dual-circuit water chillers for continuous setter heat extraction',
      },
    ],
    specCategoryLabel: 'BIOSECURITY AIRFLOW FEATURES:',
    specTags: [
      'Positive Pressure Cascade',
      'MERV 14 / HEPA Filtration',
      '100% Fresh Air Modulation',
      'UV-C Germicidal Banks',
      'Vapor-Tight PU Ductwork',
    ],
    keyMetrics: [
      { label: 'Bio-Pass Rate', value: '99.2%' },
      { label: 'Air Purity Standard', value: 'ISO Class 8' },
    ],
    accentColor: 'sky',
  },
  {
    id: 'ha-candling',
    systemNumber: 'SYSTEM 03',
    num: '03',
    name: 'Machine-Vision Candling & Transfer',
    tagline: 'Automated Infertile Egg Rejection & Vacuum Transfer',
    description: 'High-speed automated candling table utilizing multispectral vision cameras to detect non-viable eggs and early dead embryos, seamlessly transferring fertile eggs into hatcher baskets with zero micro-cracks.',
    primaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        title: 'Optical Candling Scanner',
        caption: 'High-speed photometric scanning inspecting 150 eggs per stroke',
      },
      {
        url: 'https://images.unsplash.com/photo-1579165466791-78818925567b?auto=format&fit=crop&w=1200&q=80',
        title: 'Gentle Vacuum Cup Lifters',
        caption: 'Soft silicone bellows lifting eggs simultaneously with adaptive suction control',
      },
      {
        url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
        title: 'Synchronized Tray Infeeder',
        caption: 'Servo-driven transfer indexing setter trays straight to hatcher baskets',
      },
    ],
    specCategoryLabel: 'AUTOMATION & TRANSFER MATRIX:',
    specTags: [
      '60,000 Eggs/Hour Capacity',
      'Multispectral Optical Candling',
      'Automated Infertility Removal',
      'Gentle Bellows Vacuum Head',
      'Low-Crack Transport Servo',
    ],
    keyMetrics: [
      { label: 'Candling Speed', value: '60,000 /hr' },
      { label: 'Shell Breakage', value: '<0.05%' },
    ],
    accentColor: 'amber',
  },
  {
    id: 'ha-hatcher',
    systemNumber: 'SYSTEM 04',
    num: '04',
    name: 'Hatcher Optimization System',
    tagline: 'Controlled Micro-Mist Humidity & Narrow Hatch Window',
    description: 'Dedicated hatching chambers designed for the final 3 days of development. Incorporates vortex fan blade circulation, ultrasonic micro-misting, and eggshell waste management for peak chick vigor.',
    primaryImage: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80',
        title: 'Hatcher Basket Trolley Bank',
        caption: 'Perforated polymer baskets maximizing airflow over emergent chicks',
      },
      {
        url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
        title: 'High-Pressure Micro-Mist',
        caption: 'Fine atomization nozzles preventing shell drying without wetting chick down',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        title: 'Automated Hatch Monitoring',
        caption: 'Real-time bio-acoustic telemetry tracking the exact peak hatch time',
      },
    ],
    specCategoryLabel: 'HATCHER PERFORMANCE SPECS:',
    specTags: [
      'Narrow Hatch Window (±4h)',
      'Ultrasonic Humidity Atomizers',
      'Direct-Drive Vortex Fans',
      'Easy-Wash Stainless Base',
      'Fluff Filtration Mesh Bags',
    ],
    keyMetrics: [
      { label: 'Hatch Window', value: '<12 Hours' },
      { label: 'Chick Quality (Pasgar)', value: '>9.4 / 10' },
    ],
    accentColor: 'sky',
  },
  {
    id: 'ha-chickline',
    systemNumber: 'SYSTEM 05',
    num: '05',
    name: 'Day-Old Chick Processing Line',
    tagline: 'Automated Counting, Sexing Carousel & Vaccination',
    description: 'Continuous ergonomic line for day-old chick takeaway, accurate laser counting, rotary feather/vent sexing carousels, and dual subcutaneous/spray vaccination nozzles to prepare chicks for transport.',
    primaryImage: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=80',
        title: 'Rotary Chick Sexing Carousel',
        caption: 'Ergonomic dual-tier carousels designed for high-throughput chick grading',
      },
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        title: 'Automatic Box Spray Vaccinator',
        caption: 'Uniform aerosol droplet delivery protecting chicks against Coccidiosis & ND',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        title: 'High-Precision Laser Counter',
        caption: 'Multi-channel optical sensors boxing precisely 100 chicks per crate',
      },
    ],
    specCategoryLabel: 'PROCESSING EQUIPMENT SUITE:',
    specTags: [
      'Dual-Tier Sexing Carousel',
      'Optical Laser Chick Counters',
      'Coccidiosis Spray Cabinet',
      'Neck Subcutaneous Injector',
      'Crate Stacker & Destacker',
    ],
    keyMetrics: [
      { label: 'Counting Accuracy', value: '99.9%' },
      { label: 'Throughput Capacity', value: '45,000 Chicks/hr' },
    ],
    accentColor: 'amber',
  },
  {
    id: 'ha-wash',
    systemNumber: 'SYSTEM 06',
    num: '06',
    name: 'Tray Washing & Sanitation System',
    tagline: 'Continuous High-Pressure Crate Wash & Biosecurity CIP',
    description: 'Automated washing, chemical disinfection, and drying tunnels for setter trays and chick boxes, coupled with pneumatic eggshell separator augers to maintain hospital-grade hatchery biosecurity.',
    primaryImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
        title: 'Tunnel Crate Washer',
        caption: 'Recirculated 60°C wash zone with multi-directional rotary spray nozzles',
      },
      {
        url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1200&q=80',
        title: 'Chemical Sanitizing Rinse Zone',
        caption: 'Automated peracetic acid / quaternary disinfectant dosing station',
      },
      {
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        title: 'Centrifugal Shell Separator',
        caption: 'High-torque screw press dewatering eggshells and reducing waste volume by 70%',
      },
    ],
    specCategoryLabel: 'SANITATION SPECIFICATIONS:',
    specTags: [
      '1,200 Trays/Hour Wash Speed',
      'Dual High-Pressure Booster Pumps',
      'Rotary Self-Cleaning Filter',
      'Hot-Air Drying Airknives',
      'Pneumatic Shell Waste Auger',
    ],
    keyMetrics: [
      { label: 'Tray Wash Speed', value: '1,200 /hr' },
      { label: 'Bacterial Log Reduction', value: '>5-Log' },
    ],
    accentColor: 'emerald',
  },
];

// ─── 3. FEEDMILL SYSTEMS: 6 CORE PRODUCTION SYSTEMS ───────────────────────────
export const FEEDMILL_SYSTEMS: ProductionSystem[] = [
  {
    id: 'fm-storage',
    systemNumber: 'SYSTEM 01',
    num: '01',
    name: 'Grain Receiving & Silo Storage',
    tagline: '5,000 MT Aerated Corrugated Silos & Unloading',
    description: 'High-tonnage grain intake pits, scalper pre-cleaners, bucket elevators, and heavy-duty corrugated galvanized steel grain silos with integrated thermal cable monitoring and bottom aeration fans.',
    primaryImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
        title: 'Corrugated Steel Silo Farm',
        caption: 'Z600 hot-dip galvanized grain silos with wind ring reinforcement',
      },
      {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        title: 'High-Capacity Bucket Elevator',
        caption: 'Heavy rubber-belt bucket elevators rated for 150 TPH grain discharge',
      },
      {
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        title: 'Rotary Grain Drum Pre-Cleaner',
        caption: 'Dual-deck rotary screener removing straw, cobs, stones, and dust fines',
      },
    ],
    specCategoryLabel: 'SILO & INTAKE FEATURES:',
    specTags: [
      '5,000 MT Per Silo Capacity',
      'Z600 Galvanized Steel Coating',
      'Multi-Point Thermal Cables',
      'Centrifugal Floor Aerators',
      '150 TPH Bucket Elevators',
    ],
    keyMetrics: [
      { label: 'Single Silo Capacity', value: '5,000 MT' },
      { label: 'Intake Velocity', value: '150 TPH' },
    ],
    accentColor: 'amber',
  },
  {
    id: 'fm-grinding',
    systemNumber: 'SYSTEM 02',
    num: '02',
    name: 'Hammer Mill Micro-Grinding',
    tagline: 'High-Speed Particle Reduction & Dust Aspiration',
    description: 'Heavy-duty industrial hammer mills equipped with reversible tungsten carbide hammers, hydraulic quick-change screen carriages, and reverse-jet pulse dust collector filters for superior grain particle uniformity.',
    primaryImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
        title: 'Industrial Hammer Mill Rotor',
        caption: 'Precision-balanced rotor fitted with tungsten carbide tipped beaters',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        title: 'Pulse-Jet Baghouse Collector',
        caption: 'Aspiration system maintaining negative pressure and zero explosive dust leaks',
      },
      {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        title: 'Hydraulic Screen Lockout',
        caption: 'Rapid screen swap mechanism enabling quick changes from 2.0mm to 3.5mm grinds',
      },
    ],
    specCategoryLabel: 'GRINDING TECHNOLOGY SPECS:',
    specTags: [
      '110–200 kW High-Torque Motor',
      'Tungsten Carbide Beaters',
      'Hydraulic Screen Quick-Change',
      'Explosion Venting Membranes',
      'Aspiration Baghouse Filter',
    ],
    keyMetrics: [
      { label: 'Grinding Output', value: '25–40 TPH' },
      { label: 'Particle Uniformity (D50)', value: '650–800 µm' },
    ],
    accentColor: 'amber',
  },
  {
    id: 'fm-batching',
    systemNumber: 'SYSTEM 03',
    num: '03',
    name: 'Precision Gravimetric Batching',
    tagline: 'Multi-Scale Weighing & Micro-Ingredient Dosing',
    description: 'Computer-controlled multi-cell batching hoppers and dedicated stainless steel micro-ingredient carousels, ensuring exact formulation dosing of amino acids, minerals, and enzymes to within ±0.05% tolerance.',
    primaryImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        title: 'Multi-Cell Batching Hopper',
        caption: 'Hermetically sealed shear-beam loadcells eliminating vibration errors',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        title: 'Micro-Ingredient Dosing Carousel',
        caption: 'Stainless steel screw feeders dispensing vitamins and premixes with gram precision',
      },
      {
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        title: 'PLC Recipe Control Terminal',
        caption: 'Industrial SCADA control workstation tracking full traceability lot numbers',
      },
    ],
    specCategoryLabel: 'BATCHING CAPABILITIES:',
    specTags: [
      'Multi-Cell Load Scales',
      '12-Bin Micro-Ingredient Rack',
      'Frequency Variable Screw Feeds',
      'Automated Anti-Bridging Pads',
      'Full ERP Formulation Sync',
    ],
    keyMetrics: [
      { label: 'Batching Accuracy', value: '±0.05%' },
      { label: 'Micro Scale Precision', value: '±5 Grams' },
    ],
    accentColor: 'sky',
  },
  {
    id: 'fm-mixing',
    systemNumber: 'SYSTEM 04',
    num: '04',
    name: 'Twin-Shaft High-Speed Mixer',
    tagline: 'Homogeneous Ribbon Blending (CV < 5%) in 90 Seconds',
    description: 'High-homogeneity twin-shaft paddle/ribbon mixer designed for rapid, gentle, and uniform blending. Features an automated multi-nozzle liquid fat and molasses spray injection bar and full-length bomb-bay discharge doors.',
    primaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        title: 'Twin-Shaft Mixing Chamber',
        caption: 'Counter-rotating overlapping paddles generating fluidized zero-gravity mixing zones',
      },
      {
        url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1200&q=80',
        title: 'Liquid Spray Injection Bar',
        caption: 'High-pressure misting nozzles coating animal fats and choline chloride evenly',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
        title: 'Full-Length Bomb-Bay Doors',
        caption: 'Pneumatic drop bottom discharging up to 3,000 kg in under 10 seconds without residue',
      },
    ],
    specCategoryLabel: 'MIXING TECHNOLOGY MATRIX:',
    specTags: [
      'Twin-Shaft Overlapping Paddles',
      'Coefficient of Variation CV < 5%',
      'Full-Length Bomb-Bay Discharge',
      'Multi-Liquid Injection Manifold',
      'Wear-Resistant Hardox Liners',
    ],
    keyMetrics: [
      { label: 'Mixing Cycle Time', value: '90 Seconds' },
      { label: 'Batch Uniformity (CV)', value: '<3.8%' },
    ],
    accentColor: 'amber',
  },
  {
    id: 'fm-pellet',
    systemNumber: 'SYSTEM 05',
    num: '05',
    name: 'Conditioning & Ring-Die Pelleting',
    tagline: 'Multi-Pass Steam Starch Gelatinization & Pellet Press',
    description: 'Industrial pelleting tower combining long-retention steam conditioner jackets with heavy-duty gear-driven ring-die pellet mills. Yields high starch gelatinization and optimal Pellet Durability Index (PDI > 96%).',
    primaryImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        title: 'Multi-Pass Steam Conditioner',
        caption: 'Dual-jacket stainless cylinder holding mash at 85°C for 60 seconds',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
        title: 'Heavy-Duty Ring-Die Pellet Mill',
        caption: 'Forged chrome steel ring die with automated hydraulic roller clearance adjustment',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        title: 'Steam Manifold & Pressure Station',
        caption: 'Automated proportional steam valve ensuring dry saturated steam injection',
      },
    ],
    specCategoryLabel: 'PELLETING TOWER SPECIFICATIONS:',
    specTags: [
      'Stainless DDC Conditioner',
      'Forged Alloy Ring-Die (2.5–6mm)',
      'Dual Drive Transmission',
      'Auto Roller Gap Adjustment',
      'Integrated Overload Shear Pins',
    ],
    keyMetrics: [
      { label: 'Pellet Durability (PDI)', value: '>96.5%' },
      { label: 'Gelatinization Rate', value: '>75%' },
    ],
    accentColor: 'rose',
  },
  {
    id: 'fm-cooling',
    systemNumber: 'SYSTEM 06',
    num: '06',
    name: 'Counterflow Cooling & Bulk Loadout',
    tagline: 'Octagonal Cooling, Screening & Automated Packing',
    description: 'Octagonal counterflow pellet coolers bringing hot pellets to within 3°C of ambient temperature, coupled with double-deck rotary grading sifters, crumb crumblers, and high-speed automated bagging scales.',
    primaryImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        title: 'Octagonal Counterflow Cooler',
        caption: 'Countercurrent airflow extracting core pellet moisture without thermal shock cracking',
      },
      {
        url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
        title: 'Rotary Grading Screener',
        caption: 'Recycling undersized fines back to pellet press while discharging clean finished feed',
      },
      {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        title: 'Automated 50kg Bagging & Sewing',
        caption: 'High-speed loadcell packaging line bagging 600 sacks per hour with sewing arm',
      },
    ],
    specCategoryLabel: 'FINISHING & LOGISTICS FEATURES:',
    specTags: [
      'Counterflow Cooling Chamber',
      'Double-Roll Pellet Crumbler',
      'Rotary Fine Separator Screen',
      'Automated 50kg Bagging Line',
      'Overhead Bulk Truck Spouts',
    ],
    keyMetrics: [
      { label: 'Cooling Delta', value: '<+3°C vs Amb' },
      { label: 'Bagging Rate', value: '600 Bags/hr' },
    ],
    accentColor: 'emerald',
  },
];

// ─── 4. SOLAR SYSTEMS: 6 CORE PRODUCTION SYSTEMS ─────────────────────────────
export const SOLAR_SYSTEMS: ProductionSystem[] = [
  {
    id: 'sol-mounting',
    systemNumber: 'SYSTEM 01',
    num: '01',
    name: 'Typhoon-Rated Rooftop PV Array',
    tagline: '280 kph Wind-Certified Clamping on Agro Roofs',
    description: 'Tier-1 bifacial monocrystalline solar PV panels secured with industrial marine-grade aluminum rail clamping. Engineered to withstand 200–280 kph typhoon wind loads across prefabricated poultry and feedmill roofs.',
    primaryImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
        title: 'Commercial Rooftop PV Field',
        caption: 'High-efficiency 585W bifacial solar modules deployed over agricultural metal sheeting',
      },
      {
        url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1200&q=80',
        title: 'Heavy Anodized AL6005-T5 Rails',
        caption: 'Corrosion-resistant structural rails with EPDM waterproof gaskets and standing seam clamps',
      },
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        title: 'Thermal & Hail Impact Testing',
        caption: 'Certified against heavy hail impact and extreme tropical humidity degradation',
      },
    ],
    specCategoryLabel: 'PV MODULE & CLAMPING SPECS:',
    specTags: [
      'Tier-1 N-Type TOPCon Panels',
      '280 kph Typhoon Certified',
      'Marine-Grade AL6005-T5 Rails',
      'Zero Roof Puncture Clamps',
      '25-Year Linear Power Warranty',
    ],
    keyMetrics: [
      { label: 'Wind Resistance', value: '280 kph' },
      { label: 'Module Efficiency', value: '22.8%' },
    ],
    accentColor: 'amber',
  },
  {
    id: 'sol-inverter',
    systemNumber: 'SYSTEM 02',
    num: '02',
    name: 'Three-Phase Commercial Inverters',
    tagline: '98.8% Peak Efficiency & Multi-MPPT Tracking',
    description: 'High-capacity utility-grade string inverters designed for tropical agro-industrial environments. Features 9 to 12 independent MPPT channels, AFCI arc-fault circuit interrupters, and IP66 weather sealing.',
    primaryImage: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1200&q=80',
        title: 'Commercial String Inverter Bank',
        caption: '100kW - 250kW industrial inverters with smart fan-cooled heat sinks',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        title: 'Multi-MPPT Optimization Core',
        caption: 'Individual string management minimizing losses from partial barn roof shading',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        title: 'Integrated DC/AC Disconnect',
        caption: 'Type II surge protection with rapid electronic disconnect for maintenance safety',
      },
    ],
    specCategoryLabel: 'INVERTER CAPABILITIES:',
    specTags: [
      '98.8% Max Euro Efficiency',
      'Multi-MPPT String Inputs',
      'AFCI AI Arc-Fault Protection',
      'IP66 Dust & Water Ingress',
      'Built-in Anti-PID Recovery',
    ],
    keyMetrics: [
      { label: 'Max Inverter Eff.', value: '98.8%' },
      { label: 'Ingress Rating', value: 'IP66' },
    ],
    accentColor: 'amber',
  },
  {
    id: 'sol-bess',
    systemNumber: 'SYSTEM 03',
    num: '03',
    name: 'Industrial BESS Battery Storage',
    tagline: 'LiFePO4 Peak Shaving & 4-Hour Critical Barn Backup',
    description: 'Containerized Lithium Iron Phosphate (LiFePO4) Battery Energy Storage Systems. Provides automated peak demand shaving, frequency stabilization, and instantaneous millisecond emergency failover for farm ventilation.',
    primaryImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        title: 'Containerized LiFePO4 Battery Room',
        caption: 'Modular 500 kWh – 2 MWh battery racks with aerosol fire suppression',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        title: 'Liquid Cooling Thermal Unit',
        caption: 'Active liquid cooling loop keeping cell temperature differential within ±2°C',
      },
      {
        url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1200&q=80',
        title: 'Bidirectional Power Conversion PCS',
        caption: 'Four-quadrant power electronics managing high-speed charging and discharging',
      },
    ],
    specCategoryLabel: 'BESS TECHNICAL SPECIFICATIONS:',
    specTags: [
      'Safe LiFePO4 Chemistry',
      '6,000+ Cycles @ 80% DoD',
      'Liquid Cooled Battery Racks',
      '<20ms Seamless UPS Transfer',
      'Automated Aerosol Fire Stop',
    ],
    keyMetrics: [
      { label: 'Cycle Life', value: '6,000+ Cycles' },
      { label: 'Failover Speed', value: '<20 ms' },
    ],
    accentColor: 'sky',
  },
  {
    id: 'sol-grid',
    systemNumber: 'SYSTEM 04',
    num: '04',
    name: 'Utility Net Metering & Switchgear',
    tagline: 'DU-Compliant Interconnection & Export Relay',
    description: 'Medium and low-voltage switchgear engineered to comply with Philippine Distribution Code standards. Incorporates bi-directional smart revenue meters, anti-islanding protection, and synchronous grid interconnects.',
    primaryImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        title: 'Synchronous Protection Switchgear',
        caption: 'Motorized breakers with micro-processor relays coordinating with electric cooperatives',
      },
      {
        url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1200&q=80',
        title: 'Bi-Directional Net Meter Panel',
        caption: 'ERC-certified revenue grade metering capturing surplus solar export credits',
      },
      {
        url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
        title: 'Step-Up Distribution Transformer',
        caption: 'Custom transformer converting 480V solar output to 13.8kV/34.5kV distribution voltage',
      },
    ],
    specCategoryLabel: 'INTERCONNECTION COMPLIANCE:',
    specTags: [
      'PDC / ERC Net Metering Standard',
      'Certified Anti-Islanding Relay',
      'Bi-Directional Revenue Metering',
      'Motorized Air Circuit Breakers',
      'Lightning & Surge Arresters',
    ],
    keyMetrics: [
      { label: 'Regulatory Compliance', value: '100% PDC' },
      { label: 'Payback Acceleration', value: '3.5–5 Years' },
    ],
    accentColor: 'amber',
  },
  {
    id: 'sol-scada',
    systemNumber: 'SYSTEM 05',
    num: '05',
    name: 'SCADA Telemetry & Cloud Analytics',
    tagline: '24/7 String-Level Yield Analytics & Rapid Shutdown',
    description: 'Industrial SCADA monitoring platform with cloud IoT gateways and on-site weather stations. Delivers real-time string voltage analysis, irradiance tracking, soiling alerts, and remote rapid system shutdown.',
    primaryImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        title: 'Cloud SCADA Telemetry Console',
        caption: 'Live dashboard graphing kW production, savings ROI, and performance ratio (PR)',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        title: 'Solar Meteorological Station',
        caption: 'Pyranometers, ambient wind speed anemometers, and rear panel temperature sensors',
      },
      {
        url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
        title: 'Remote Emergency Rapid Shutdown',
        caption: 'One-touch emergency button reducing panel voltage to <30V in seconds for fire safety',
      },
    ],
    specCategoryLabel: 'TELEMETRY & SCADA FEATURES:',
    specTags: [
      'String-Level Analytics',
      'Pyranometer Solar Sensor',
      'Mobile iOS/Android App Alerts',
      'Automated Soiling Detection',
      'Rapid Shutdown Compliant',
    ],
    keyMetrics: [
      { label: 'Telemetry Refresh', value: '10 Seconds' },
      { label: 'System Uptime PR', value: '>84% PR' },
    ],
    accentColor: 'cyan',
  },
  {
    id: 'sol-hybrid',
    systemNumber: 'SYSTEM 06',
    num: '06',
    name: 'Hybrid Agro-Microgrid Sync',
    tagline: 'Zero-Export Fuel Saver & Diesel Genset Integration',
    description: 'Intelligent hybrid controller combining solar PV, battery storage, and standby diesel generators. Maximizes renewable penetration and prevents reverse power flow into diesel generator sets.',
    primaryImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
        title: 'Hybrid Microgrid Controller Unit',
        caption: 'Microsecond PLC adjusting inverter output to maintain generator minimum 30% loading',
      },
      {
        url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1200&q=80',
        title: 'Dual-Fuel Genset Tie-in',
        caption: 'Seamless synchronization avoiding frequency hunting during sudden cloud transit',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        title: 'Zero Reverse Power Relay',
        caption: 'Fast reverse power protection preventing generator alternator motoring',
      },
    ],
    specCategoryLabel: 'HYBRID SYNCHRONIZATION FEATURES:',
    specTags: [
      'Genset Fuel Saver Protocol',
      'Zero-Export Limiter Sensor',
      'Dynamic Frequency Droop Control',
      'Automatic Islanding Transfer',
      'Black-Start Capability',
    ],
    keyMetrics: [
      { label: 'Diesel Fuel Savings', value: '40% – 60%' },
      { label: 'Reverse Power Protect', value: '<50 ms' },
    ],
    accentColor: 'emerald',
  },
];

// ─── 5. POULTRY BROILER OPERATIONS: 6 CORE PRODUCTION SYSTEMS ─────────────────
export const POULTRY_BROILER_SYSTEMS: ProductionSystem[] = [
  {
    id: 'pbroiler-envelope',
    systemNumber: 'SYSTEM 01',
    num: '01',
    name: 'Prefabricated Broiler Housing Systems',
    tagline: 'Multi-Tier Cage · Elevated-Floor · Floor-Type',
    description: 'Pre-engineered steel structural envelopes designed for intensive commercial broiler rearing, offered in Multi-Tier Cage (80,000 @ 1.8kg), Elevated-Floor (55,000 @ 1.8kg), and Floor-Type (36,000 @ 1.8kg) configurations with typhoon wind resistance up to 280 km/h.',
    primaryImage: '/images/capabilities/poultry-facility.jpg',
    galleryImages: [
      {
        url: '/images/capabilities/poultry-facility.jpg',
        title: 'Turnkey Broiler Complex Envelope',
        caption: 'Rigid steel portal frames with insulated ceiling and perimeter sandwich panels',
      },
      {
        url: '/images/breeder/american-type-3d.png',
        title: 'Airflow & Structural Aerodynamics',
        caption: 'Negative-pressure sealed structure ensuring uniform wind tunnel velocity from inlet to exhaust',
      },
    ],
    specCategoryLabel: 'BROILER HOUSING ARCHITECTURES:',
    specTags: [
      'Multi-Tier Cage System (16m x 110m x 4m–4.2m - 80k Birds)',
      'Elevated-Floor Broiler House (18m x 156m x 2.4m - 55k Birds)',
      'Floor-Type Broiler House (16m x 138m x 2.4m - 36k Birds)',
      'Building Type: Prefabricated House',
      'Hot-Dip Galvanized C-Purlins (SA2.5)',
      '50mm PPGI V1000 PU Sandwich Panels',
    ],
    keyMetrics: [
      { label: 'Thermal Resistance', value: 'R-16 Insulated' },
      { label: 'Wind Resistance', value: '200–280 km/h' },
    ],
    accentColor: 'amber',
  },
  {
    id: 'pbroiler-climate-heating',
    systemNumber: 'SYSTEM 02',
    num: '02',
    name: 'Controlled Climate System and Heating System',
    tagline: 'Negative Pressure Tunnel Cooling & Radiant Brooding',
    description: 'An integrated climate regulation and heating suite combining 50" & 54" butterfly cone fans, 150mm cellulose evaporative cooling wet pads, automated microclimate air inlets, and infrared gas radiant brooders for precision brooding and temperature control.',
    primaryImage: '/images/capabilities/poultry-facility.jpg',
    galleryImages: [
      {
        url: '/images/capabilities/poultry-facility.jpg',
        title: 'Negative Pressure Tunnel Fan Bank',
        caption: 'Direct-drive and belt-drive butterfly cone fans pulling high-velocity cooling air across flock heads',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        title: 'Evaporative Pad Wall System',
        caption: 'Cellulose wet cooling pads with stainless steel distribution pipes and water recycling gutters',
      },
      {
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        title: 'Infrared Gas Radiant Brooders',
        caption: 'Direct thermal floor brooding ensuring optimal chick comfort and temperature stability',
      },
    ],
    specCategoryLabel: 'CLIMATE & HEATING METRICS:',
    specTags: [
      '50" & 54" Heavy Galvanized Butterfly Cone Fans',
      '150mm High-Absorbency Cellulose Wet Pads',
      'Infrared Gas Brooders & Forced-Air Heaters',
      'Motorized Wind-Inlet Air Doors with Rack Drives',
      'Minimum Ventilation Side Wall Air Inlets',
    ],
    keyMetrics: [
      { label: 'Wind-Chill Velocity', value: '2.5–3.2 m/s' },
      { label: 'Temp Delta (Pads)', value: '-5°C to -8°C' },
    ],
    accentColor: 'sky',
  },
  {
    id: 'pbroiler-feeding-drinking',
    systemNumber: 'SYSTEM 03',
    num: '03',
    name: 'Feeding System and Drinking System',
    tagline: 'High-Speed Automated Pan Feeding & 360° Closed Nipple Waterers',
    description: 'An automated flock nutrition and hydration network featuring 330mm high-impact polypropylene feeder pans with 14-spoke anti-trap grills, heavy flex-auger bulk silo feed delivery, and enclosed stainless steel 360° nipple drinking lines with drip cups.',
    primaryImage: '/images/breeder/american-type-interior.jpg',
    galleryImages: [
      {
        url: '/images/breeder/american-type-interior.jpg',
        title: 'Suspended Broiler Pan Lines',
        caption: 'Winchable feed lines that hoist completely to the ceiling during thinning, catching, and sanitation',
      },
      {
        url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=80',
        title: 'Stainless Steel Nipple Line',
        caption: 'Self-flushing water pipe network with single-arm drip cups and pressure regulator stations',
      },
      {
        url: '/images/capabilities/feedmill-facility.jpg',
        title: 'Bulk Silo Hopper Integration',
        caption: 'Outdoor corrugated galvanized silos with high-torque flex auger delivery into house boot hoppers',
      },
    ],
    specCategoryLabel: 'FEEDING & DRINKING ATTRIBUTES:',
    specTags: [
      '330mm PP Feeder Pans (14-Spoke Grills)',
      '360° Trigger Action Stainless Steel Valves',
      'Heavy-Duty Flex Auger & Galvanized Silos',
      'Single-Arm Drip Cups & Sight-Tube Regulators',
      'Central Winch Ceiling Suspension System',
    ],
    keyMetrics: [
      { label: 'Birds per Pan', value: '50–65 Birds' },
      { label: 'Nipple Flow Rate', value: '80–120 ml/min' },
    ],
    accentColor: 'amber',
  },
  {
    id: 'pbroiler-manure',
    systemNumber: 'SYSTEM 04',
    num: '04',
    name: 'Manure Removal System',
    tagline: 'Automated Multi-Tier PP Belts & Sub-Floor Clearance',
    description: 'Dedicated manure evacuation infrastructure utilizing continuous heavy-duty polypropylene (PP) manure belts for multi-tier cages or engineered sub-floor manure clearance for elevated houses, preventing ammonia accumulation and ensuring internal hygiene.',
    primaryImage: '/images/capabilities/feedmill-facility.jpg',
    galleryImages: [
      {
        url: '/images/capabilities/feedmill-facility.jpg',
        title: 'Multi-Tier PP Manure Belts',
        caption: 'Continuous 1.0mm polypropylene manure belts running under each cage tier for daily automated cleanout',
      },
      {
        url: '/images/capabilities/poultry-facility.jpg',
        title: 'Sub-Floor Slatted Clearance',
        caption: 'Raised floor structure allowing manure to drop through to a sheltered sub-floor clearing zone',
      },
    ],
    specCategoryLabel: 'MANURE MANAGEMENT SPECS:',
    specTags: [
      '1.0mm Heavy-Duty Friction-Resistant PP Belts',
      'Automated Scraper Blades & Drive Units',
      'Elevated Sub-Floor Airflow Clearing Zone',
      'Transverse Cross-Conveyor Waste Loading',
      'Zero Ammonia Accumulation in Breathing Zone',
    ],
    keyMetrics: [
      { label: 'Removal Frequency', value: 'Daily Automated' },
      { label: 'Internal Hygiene', value: 'Max Biosecurity' },
    ],
    accentColor: 'emerald',
  },
  {
    id: 'pbroiler-harvesting',
    systemNumber: 'SYSTEM 05',
    num: '05',
    name: 'Fully Automated Harvest or Manual Harvest setups',
    tagline: 'High-Throughput Bird Handling & Rapid Turnaround',
    description: 'Versatile harvesting infrastructure engineered for rapid, humane bird clearing. Features fully automated catching conveyor options or clear-span manual harvest corridors with winch-to-ceiling suspension clearance for 10–14 day flock turnaround.',
    primaryImage: '/images/breeder/american-type-3d.png',
    galleryImages: [
      {
        url: '/images/breeder/american-type-3d.png',
        title: 'Clear-Span Interior Architecture',
        caption: 'Obstacle-free ground envelope allowing mechanized harvesting crews and skid-steer manure loaders',
      },
      {
        url: '/images/capabilities/poultry-facility.jpg',
        title: 'Biosecure Washdown Perimeter',
        caption: 'Water-impermeable PU wall panel joints capable of handling 200-bar high-pressure hot chemical sanitation',
      },
    ],
    specCategoryLabel: 'HARVEST & TURNOVER SPECIFICATIONS:',
    specTags: [
      'Fully Automated Harvest Conveyor System Option',
      'Ergonomic Manual Harvest Clear Corridors',
      'Winch-To-Ceiling Suspension Clearance (>2.2m)',
      'Heavy-Duty Double-Insulated End Wall Doors',
      'Perimeter Concrete Apron & Wheel Wash Basins',
    ],
    keyMetrics: [
      { label: 'Flock Turnaround', value: '10–14 Days' },
      { label: 'Harvest Speed', value: 'High Throughput' },
    ],
    accentColor: 'emerald',
  },
  {
    id: 'pbroiler-telemetry',
    systemNumber: 'SYSTEM 06',
    num: '06',
    name: 'Intelligent Environmental Telemetry & AI Controller',
    tagline: 'Real-Time Climate Automation & Flock Monitoring',
    description: 'Centralized microclimate control computer synchronizing fan stages, pad pumps, heating brooders, and static pressure sensors with mobile cloud telemetry and emergency generator auto-failover triggers.',
    primaryImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        title: 'Digital Microclimate Controller',
        caption: 'Multi-stage climate control computer maintaining target effective temperature curves',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        title: 'IoT Sensor Telemetry Nodes',
        caption: 'Calibrated temperature, relative humidity, static pressure, and CO2 monitoring probes',
      },
    ],
    specCategoryLabel: 'AUTOMATION CAPABILITIES:',
    specTags: [
      'Multi-Stage Fan Speed Staging',
      'Electronic Differential Static Pressure Sensor',
      'Continuous Temperature & RH Tracking',
      'Flock Bird Weigher Telemetry Integration',
      'SMS & Cloud Alarm Auto-Notification',
    ],
    keyMetrics: [
      { label: 'Control Precision', value: '±0.2°C Delta' },
      { label: 'Emergency Trip Speed', value: '<1.0 sec' },
    ],
    accentColor: 'indigo',
  },
];

// ─── 6. POULTRY COMMERCIAL LAYER OPERATIONS: 6 CORE PRODUCTION SYSTEMS ─────────
export const POULTRY_LAYER_SYSTEMS: ProductionSystem[] = [
  {
    id: 'player-housing',
    systemNumber: 'SYSTEM 01',
    num: '01',
    name: 'Prefabricated Layer Cage Housing Systems',
    tagline: 'H-Frame (45k Birds) & A-Frame (30k Birds) Configurations',
    description: 'Pre-engineered industrial prefabricated poultry houses built with Q355B H-steel, V840 roof sheets, V900 ceiling sheets, 100mm fiberglass insulation, and PPGI V1000 PU wall panels, supporting H-Frame (45,000 birds) and A-Frame (30,000 birds) layouts.',
    primaryImage: '/images/capabilities/poultry-facility.jpg',
    galleryImages: [
      {
        url: '/images/capabilities/poultry-facility.jpg',
        title: 'H-Frame Vertical Battery Columns',
        caption: 'Vertically stacked cages on rigid H-shaped frame for high-density 45,000-bird setups (97m x 10m x 4.3m)',
      },
      {
        url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=80',
        title: 'A-Frame Multi-Tier Open Layout',
        caption: 'Open sloped A-frame configuration for 30,000-bird setups (133m x 13m x 3.5m) optimizing natural airflow',
      },
    ],
    specCategoryLabel: 'LAYER HOUSING ARCHITECTURES:',
    specTags: [
      'H-Frame Layer Cage (97m x 10m x 4.3m - 45k Birds)',
      'A-Frame Layer Cage (133m x 13m x 3.5m - 30k Birds)',
      '450 cm² Density per Bird (36/Cage H-Frame, 20/Cage A-Frame)',
      'Q355B Welded & Hot-Rolling H Steel (SA2.5)',
      'PPGI V1000 PU Sandwich Wall Panels',
      'V840 Roof & V900 Ceiling Steel Sheets',
    ],
    keyMetrics: [
      { label: 'H-Frame Setup', value: '45,000 Birds' },
      { label: 'A-Frame Setup', value: '30,000 Birds' },
    ],
    accentColor: 'amber',
  },
  {
    id: 'player-egg-collection',
    systemNumber: 'SYSTEM 02',
    num: '02',
    name: 'Egg Management & Specialized Conveyors',
    tagline: 'Automated Egg Collection Systems & Cross-Conveyors',
    description: 'An automated egg management network featuring continuous woven polypropylene perforated collection belts running gently along each tier, vertical soft-touch elevator lifts, and specialized cross-conveyors delivering clean eggs directly to packing rooms with zero micro-cracks.',
    primaryImage: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=80',
        title: 'Automated Longitudinal Egg Belts',
        caption: 'High-tensile woven belts preventing dust accumulation while holding eggs securely in transit',
      },
      {
        url: '/images/capabilities/hatchery-facility.jpg',
        title: 'Vertical Elevator Lift Station',
        caption: 'Soft-touch silicone collection fingers synchronizing egg delivery from all tiers onto the specialized conveyor table',
      },
    ],
    specCategoryLabel: 'EGG MANAGEMENT PERFORMANCE:',
    specTags: [
      'Automated Egg Collection Systems',
      'Specialized Egg Cross-Conveyors',
      'Multi-Tier Synchronized Elevator Lifts',
      'Soft Silicone Finger De-Escalators',
      'Optical Egg Counter & Telemetry Link',
    ],
    keyMetrics: [
      { label: 'Egg Crack Rate', value: '<0.3% Losses' },
      { label: 'Conveyor Throughput', value: '30,000 eggs/h' },
    ],
    accentColor: 'amber',
  },
  {
    id: 'player-feeding-hydration',
    systemNumber: 'SYSTEM 03',
    num: '03',
    name: 'Feeding & Hydration System',
    tagline: 'Centralized Feed Carts, Automated Systems & Regulated Drinking',
    description: 'Precision flock nourishment utilizing centralized mobile feed carts alongside automated feeding systems dispensing calibrated rations into deep galvanized V-troughs, paired with regulated closed drinking networks featuring 360° stainless steel nipples and single-arm drip cups.',
    primaryImage: '/images/breeder/american-type-interior.jpg',
    galleryImages: [
      {
        url: '/images/breeder/american-type-interior.jpg',
        title: 'Deep V-Form Galvanized Feed Troughs',
        caption: 'Wide-lipped anti-waste troughs preventing feed bill-out and spillage onto lower cage tiers',
      },
      {
        url: '/images/capabilities/feedmill-facility.jpg',
        title: 'Centralized Traveling Feed Carts',
        caption: 'Motorized mobile feed carts dispensing calibrated gram-per-bird rations in rapid timed passes',
      },
      {
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        title: 'Regulated Nipple Drinking Lines',
        caption: 'Stainless nipples with 360-degree trigger sensitivity accessible across all cage compartments',
      },
    ],
    specCategoryLabel: 'FEEDING & HYDRATION METRICS:',
    specTags: [
      'Centralized Motorized Feed Carts',
      'Automated Longitudinal Feeding Systems',
      'Deep Hot-Dip Galvanized Anti-Waste Troughs',
      'Regulated 360° Stainless Steel Nipple Lines',
      'Individual Tier Pressure Regulator Stations',
    ],
    keyMetrics: [
      { label: 'Feed Uniformity', value: '98.5% Even' },
      { label: 'Belt Dryness', value: '100% Guaranteed' },
    ],
    accentColor: 'amber',
  },
  {
    id: 'player-climate-environment',
    systemNumber: 'SYSTEM 04',
    num: '04',
    name: 'Climate & Environment System',
    tagline: 'EI-8000PLUS / EI-1000C Controllers, Advanced Fans & Dedicated Heating',
    description: 'A controlled climate system managed by environmental controllers (EI-8000PLUS and EI-1000C) synchronizing Butterfly Cone fans, Louvered Cone fans, direct-drive EC fans, evaporative cellulose wet cooling pads, and a dedicated heating system for year-round temperature stability.',
    primaryImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        title: 'EI-8000PLUS Environmental Controller',
        caption: 'Multi-stage climate automation computer synchronizing ventilation stages, wet pad pumps, and heating',
      },
      {
        url: '/images/capabilities/poultry-facility.jpg',
        title: 'Butterfly & Louvered Cone Exhaust Fans',
        caption: 'High-velocity 50" & 54" butterfly cone fans maintaining static pressure balance across the entire house',
      },
      {
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        title: 'Dedicated Supplementary Heating System',
        caption: 'Radiant brooders and forced-air heaters providing emergency and brooding warmth',
      },
    ],
    specCategoryLabel: 'CLIMATE & VENTILATION SPECS:',
    specTags: [
      'EI-8000PLUS Environmental Controller',
      'EI-1000C Automation Computer',
      'Butterfly Cone & Louvered Cone Fans',
      'Direct-Drive EC Energy-Saving Fans',
      'Dedicated Heating System Integration',
    ],
    keyMetrics: [
      { label: 'Air Speed Velocity', value: '2.5–3.2 m/s' },
      { label: 'Control Precision', value: '±0.2°C Delta' },
    ],
    accentColor: 'sky',
  },
  {
    id: 'player-manure',
    systemNumber: 'SYSTEM 05',
    num: '05',
    name: 'Manure-Belt Removal & Handling System',
    tagline: 'Continuous PP Belts & Dedicated Disposal Space',
    description: 'Continuous heavy-duty polypropylene (PP) manure-belt removal under every tier for H-frame setups, or dedicated manure disposal space beneath tiers for A-frame configurations, equipped with high-frequency drive scrapers, air drying ducts, and cross-conveyors.',
    primaryImage: '/images/capabilities/feedmill-facility.jpg',
    galleryImages: [
      {
        url: '/images/capabilities/feedmill-facility.jpg',
        title: 'Continuous PP Manure Belts',
        caption: '1.0mm friction-resistant polypropylene belts collecting hen droppings under each tier for daily cleanout',
      },
      {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        title: 'Transverse Discharge Cross-Conveyor',
        caption: 'Heavy cross-conveyor loading dried manure directly onto collection trucks outside the house',
      },
    ],
    specCategoryLabel: 'MANURE REMOVAL SPECS:',
    specTags: [
      'Continuous Heavy-Duty PP Manure Belts',
      'Dedicated Tier Manure Disposal Space',
      'Automatic Dual-Roller Belt Scrapers',
      'Integrated Warm Air Drying Ducts',
      'Transverse & Inclined Cross-Conveyors',
    ],
    keyMetrics: [
      { label: 'Manure Moisture', value: '<50% Dried' },
      { label: 'Removal Frequency', value: 'Daily Automated' },
    ],
    accentColor: 'emerald',
  },
  {
    id: 'player-medication',
    systemNumber: 'SYSTEM 06',
    num: '06',
    name: 'Health & Precision Water Medication System',
    tagline: 'Accurate Dosing of Vaccines & Supplements Through Water',
    description: 'A precision medication system for accurately dosing vaccines, vitamins, electrolytes, and supplements directly through the flock water supply, featuring water-powered proportional dosing pumps and dual-stage filtration panels.',
    primaryImage: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1200&q=80',
        title: 'Precision Water Dosing Manifold',
        caption: 'Proportional dosing pump injecting calibrated medical solutions directly into the drinking line',
      },
      {
        url: '/images/capabilities/hatchery-facility.jpg',
        title: 'Dual-Stage Water Filtration Panel',
        caption: 'Cartridge sediment filters and pressure regulation station ensuring biosecure flock hydration',
      },
    ],
    specCategoryLabel: 'HEALTH & MEDICATION SPECS:',
    specTags: [
      'Proportional Water-Powered Dosing Pumps',
      'Accurate Vaccine & Supplement Dosing',
      'Dual-Stage Sediment Cartridge Filters',
      'Digital Water Consumption Telemetry',
      'Automated Terminal Line Flushing',
    ],
    keyMetrics: [
      { label: 'Dosing Accuracy', value: '±0.5% Precision' },
      { label: 'Flow Range', value: '10–2,500 L/h' },
    ],
    accentColor: 'indigo',
  },
];

