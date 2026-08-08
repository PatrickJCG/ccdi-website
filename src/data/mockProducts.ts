export interface ProductMetrics {
  spec1Label: string;
  spec1Value: string;
  spec2Label: string;
  spec2Value: string;
  spec3Label: string;
  spec3Value: string;
}

export type BusinessUnit = 'Poultry Farm Equipment' | 'Hatchery' | 'Feedmill' | 'Solar Systems';

export interface StructuralMaterials {
  mainStructure?: string[];
  secondaryStructure?: string[];
  roofPurlin?: string[];
  wallPurlin?: string[];
  roofSheet?: string[];
  ceilingSheet?: string[];
  ceilingInsulation?: string[];
  wallPanel?: string[];
}

export interface BuildingSpecs {
  buildingType?: string;
  dimensions?: string;
  birdCapacity?: string;
  features?: string[];
}

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
  buildingSpecs?: BuildingSpecs;
  materials?: StructuralMaterials;
  isBrochureSpec?: boolean;
  isSample?: boolean;
  isSoftLaunch?: boolean;
  softLaunchBadge?: string;
  softLaunchNotice?: string;
  estimatedAvailability?: string;
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

  // ─── SOFT LAUNCH / LISTING SOON FEATURED PRODUCTS ──────────────────────
  {
    id: 'pf-soft-01',
    title: 'AI-Driven Microclimate Controller Pro',
    badge: 'Listing Soon',
    businessUnit: 'Poultry Farm Equipment',
    subCategory: 'Automation',
    category: 'Poultry Facilities',
    functionCategory: 'Equipment & Automation',
    speciesTags: ['Broiler', 'Breeder', 'Layer', 'AI Controller', 'IoT Telemetry'],
    description: 'Next-generation climate management unit with multi-zone humidity control, automated static pressure balance, and real-time remote cloud telemetry. Commercial sales and installation reservations are open while detailed specs are on hold.',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Status', spec1Value: 'Listing Soon', spec2Label: 'Telemetry', spec2Value: 'Cloud IoT 5G', spec3Label: 'Availability', spec3Value: 'Q3 2026 Pre-Order' },
    buildingSpecs: {
      buildingType: 'Climate Control Unit',
      dimensions: 'Custom Modular Panel',
      birdCapacity: '50,000 - 200,000 birds',
      features: ['Predictive AI Ventilation', 'Multi-Zone Sensor Array', 'Mobile App Remote Control', 'Backup Power Auto-Failover'],
    },
    isSoftLaunch: true,
    softLaunchBadge: 'Listing Soon',
    softLaunchNotice: 'This high-performance climate controller is ready for commercial order and project design inquiries. Detailed engineering datasheets, pinout diagrams, and software integration manuals are currently on hold pending final release.',
    estimatedAvailability: 'Q3 2026 / Pre-Orders Open',
  },
  {
    id: 'ha-soft-01',
    title: 'Robotic High-Speed Egg Transfer System',
    badge: 'Listing Soon',
    businessUnit: 'Hatchery',
    subCategory: 'Egg Handling',
    category: 'Hatchery Construction',
    functionCategory: 'Equipment & Automation',
    speciesTags: ['Hatchery', 'Egg Handling', 'Robotics', 'Candling'],
    description: 'Automated egg transfer and candling system with optical machine vision for rapid traying and zero-microfracture handling. Taking early project inquiries ahead of official spec release.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Throughput', spec1Value: '90,000 eggs/hr (Est.)', spec2Label: 'Vision System', spec2Value: 'AI Candling 4K', spec3Label: 'Availability', spec3Value: 'Listing Soon' },
    buildingSpecs: {
      buildingType: 'Automation System',
      dimensions: '4.5m x 2.2m x 2.1m',
      birdCapacity: 'N/A (Hatchery Module)',
      features: ['Optical AI Micro-crack Detection', 'Gentle Vacuum Grip', 'Automated Tray Washing Sync', 'High-Speed Servo Actuation'],
    },
    isSoftLaunch: true,
    softLaunchBadge: 'Listing Soon',
    softLaunchNotice: 'The Robotic Egg Transfer System is open for commercial project planning and purchase reservations. Technical manuals and electrical schematics are on hold pending final factory certification.',
    estimatedAvailability: 'Early Access Reservations Open',
  },
  {
    id: 'fm-soft-01',
    title: 'Hyper-Scale Silo & Pneumatic Tower Complex 10K',
    badge: 'Listing Soon',
    businessUnit: 'Feedmill',
    subCategory: 'Storage & Silos',
    category: 'Feedmill Systems',
    functionCategory: 'Civil & Structural Construction',
    speciesTags: ['Feedmill', 'Storage Silo', 'Bulk Grain', 'Pneumatic Conveying'],
    description: 'Ultra-high-capacity corrugated steel grain silo array equipped with automated aeration, digital grain temperature monitoring, and high-volume pneumatic conveying.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Capacity', spec1Value: '10,000 MT Bulk', spec2Label: 'Structure', spec2Value: 'Galvanized Z600', spec3Label: 'Status', spec3Value: 'Listing Soon' },
    buildingSpecs: {
      buildingType: 'Industrial Silo Complex',
      dimensions: '32m Diameter x 28m Height',
      birdCapacity: 'Feed Storage for 2M+ Birds',
      features: ['3D Grain Radar Leveling', 'Automated Aeration Recirculation', 'Explosion-Proof Dust Extraction', 'Z600 Heavy Galvanized Coating'],
    },
    isSoftLaunch: true,
    softLaunchBadge: 'Listing Soon',
    softLaunchNotice: 'Available for turnkey project proposal requests and site layout design. Structural engineering calculation packages are undergoing final PCAB/ISO audit.',
    estimatedAvailability: 'Q4 2026 Commercial Delivery',
  },
  {
    id: 'sol-soft-01',
    title: 'Agrivoltaic Dual-Axis Solar Tracker Array',
    badge: 'Listing Soon',
    businessUnit: 'Solar Systems',
    subCategory: 'Ground-Mounted',
    category: 'Solar Energy Integration',
    functionCategory: 'Renewable Energy Integration',
    speciesTags: ['Solar PV', 'Agrivoltaic', 'Dual-Axis Tracker', 'Farm Microgrid'],
    description: 'High-yield ground-mounted solar tracker optimized for agricultural land integration. Enables simultaneous livestock/crop shade management and high-efficiency power generation.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Yield Gain', spec1Value: '+28% vs Fixed', spec2Label: 'Tracking', spec2Value: 'Dual-Axis GPS', spec3Label: 'Availability', spec3Value: 'Listing Soon' },
    buildingSpecs: {
      buildingType: 'Solar Microgrid System',
      dimensions: 'Modular 250 kWp Block',
      birdCapacity: 'Integrated Farm Shade',
      features: ['Active Astronomical Tracking', 'High-Clearance Agrivoltaic Structure', 'Storm Auto-Stow Mode', 'Bifacial Solar Module Support'],
    },
    isSoftLaunch: true,
    softLaunchBadge: 'Listing Soon',
    softLaunchNotice: 'Currently in commercial soft launch. Clients can request project site feasibility and preliminary ROI calculations while final wind-load certification datasheets are on hold.',
    estimatedAvailability: 'Commercial Orders Open',
  },

  // ─── POULTRY FARM EQUIPMENT (EXACT DATA FROM BROCHURES) ───────────────────
  {
    id: 'pf-01',
    title: 'Multi-Tier Cage System',
    badge: 'Multi-Tier Cage',
    businessUnit: 'Poultry Farm Equipment',
    subCategory: 'Housing & Structure',
    category: 'Poultry Facilities',
    functionCategory: 'Civil & Structural Construction',
    speciesTags: ['Multi-Tier Cage', 'Automated Harvest', 'Manure Removal'],
    description: 'An intensive poultry housing solution that maximizes vertical space through multi-tier cages, featuring integrated feeding, drinking, ventilation, manure removal, and manual or automatic harvesting systems.',
    imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Building Type', spec1Value: 'Pre-fabricated House', spec2Label: 'Dimensions', spec2Value: '16m x 110m x 4m-4.2m', spec3Label: 'Bird Capacity', spec3Value: '80,000 @1.8kg' },
    buildingSpecs: {
      buildingType: 'Pre-fabricated House',
      dimensions: '16m x 110m x 4m-4.2m',
      birdCapacity: '80,000 @1.8kg',
      features: ['Fully Automated Harvest', 'Manual Harvest', 'Manure Removal System'],
    },
    materials: {
      mainStructure: ['Q355B Welding and hot rolling H steel', 'Shot blasting (SA2.5)', 'Antirusting paint (Grey)'],
      secondaryStructure: ['Wind Stand: 200-280kph', 'Q235B round steel/circular tube/angle iron (including ceiling joist)'],
      roofPurlin: ['Galvanized cold-rolled steel', 'C-purlins'],
      wallPurlin: ['Galvanized cold-rolled steel', 'C-purlins'],
      roofSheet: ['V840 color single steel sheet', 'T= 0.4mm, 0.5mm, 0.6mm'],
      ceilingSheet: ['V900 color single steel sheet', 'T= 0.37mm'],
      ceilingInsulation: ['Fiberglass roll (W=1.15m, T= 100mm, D=16kg/m³)', 'Polyethylene Sheet'],
      wallPanel: ['PPGI V1000 PU sandwich panel', 'T=0.4mm+50mm+0.4mm, D=40 ±2kg/m³'],
    },
    isBrochureSpec: true,
    isSample: false,
  },
  {
    id: 'pf-02',
    title: 'Elevated-Floor Broiler House',
    badge: 'Elevated Floor',
    businessUnit: 'Poultry Farm Equipment',
    subCategory: 'Housing & Structure',
    category: 'Poultry Facilities',
    functionCategory: 'Civil & Structural Construction',
    speciesTags: ['Elevated Floor', 'Airflow', 'Hygiene'],
    description: 'A broiler housing system with a raised floor design that improves bird manure management, environmental airflow, and internal hygiene.',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Building Type', spec1Value: 'Pre-fabricated House', spec2Label: 'Dimensions', spec2Value: '18m x 156m x 2.4m', spec3Label: 'Bird Capacity', spec3Value: '55,000 @1.8kg' },
    buildingSpecs: {
      buildingType: 'Pre-fabricated House',
      dimensions: '18m x 156m x 2.4m',
      birdCapacity: '55,000 @1.8kg',
      features: ['Raised Floor Design', 'Manure Management', 'Environmental Airflow & Hygiene'],
    },
    materials: {
      mainStructure: ['Q355B Welding and hot rolling H steel', 'Shot blasting (SA2.5)', 'Antirusting paint (Grey)'],
      secondaryStructure: ['Wind Stand: 200-280kph', 'Q235B round steel/circular tube/angle iron (including ceiling joist)'],
      roofPurlin: ['Galvanized cold-rolled steel', 'C-purlins'],
      wallPurlin: ['Galvanized cold-rolled steel', 'C-purlins'],
      roofSheet: ['V840 color single steel sheet', 'T= 0.4mm, 0.5mm, 0.6mm'],
      ceilingSheet: ['V900 color single steel sheet', 'T= 0.37mm'],
      ceilingInsulation: ['Fiberglass roll (W=1.15m, T= 100mm, D=16kg/m³)', 'Polyethylene Sheet'],
      wallPanel: ['PPGI V1000 PU sandwich panel', 'T=0.4mm+50mm+0.4mm, D=40 ±2kg/m³'],
    },
    isBrochureSpec: true,
    isSample: false,
  },
  {
    id: 'pf-03',
    title: 'Floor-Type Broiler House',
    badge: 'Floor Type',
    businessUnit: 'Poultry Farm Equipment',
    subCategory: 'Housing & Structure',
    category: 'Poultry Facilities',
    functionCategory: 'Civil & Structural Construction',
    speciesTags: ['Floor-Type', 'Controlled Environment', 'Ground-Level'],
    description: 'A ground-level broiler housing system where birds are raised on solid or slatted floors within a controlled environment, utilizing horizontal space structure.',
    imageUrl: 'https://images.unsplash.com/photo-1607619275068-24722480f87b?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Building Type', spec1Value: 'Pre-fabricated House', spec2Label: 'Dimensions', spec2Value: '16m x 138m x 2.4m', spec3Label: 'Bird Capacity', spec3Value: '36,000 @1.8kg' },
    buildingSpecs: {
      buildingType: 'Pre-fabricated House',
      dimensions: '16m x 138m x 2.4m',
      birdCapacity: '36,000 @1.8kg',
      features: ['Solid or Slatted Floors', 'Controlled Environment', 'Horizontal Space Structure'],
    },
    materials: {
      mainStructure: ['Q355B Welding and hot rolling H steel', 'Shot blasting (SA2.5)', 'Antirusting paint (Grey)'],
      secondaryStructure: ['Wind Stand: 200-280kph', 'Q235B round steel/circular tube/angle iron (including ceiling joist)'],
      roofPurlin: ['Galvanized cold-rolled steel', 'C-purlins'],
      wallPurlin: ['Galvanized cold-rolled steel', 'C-purlins'],
      roofSheet: ['V840 color single steel sheet', 'T= 0.4mm, 0.5mm, 0.6mm'],
      ceilingSheet: ['V900 color single steel sheet', 'T= 0.37mm'],
      ceilingInsulation: ['Fiberglass roll (W=1.15m, T= 100mm, D=16kg/m³)', 'Polyethylene Sheet'],
      wallPanel: ['PPGI V1000 PU sandwich panel', 'T=0.4mm+50mm+0.4mm, D=40 ±2kg/m³'],
    },
    isBrochureSpec: true,
    isSample: false,
  },
  {
    id: 'pf-04',
    title: 'Pre-Fabricated House Materials and Specifications',
    badge: 'Structural Kit',
    businessUnit: 'Poultry Farm Equipment',
    subCategory: 'Housing & Structure',
    category: 'Poultry Facilities',
    functionCategory: 'Civil & Structural Construction',
    speciesTags: ['Q355B H Steel', 'PU Sandwich Panel', '200-280kph Wind'],
    description: 'Pre-fabricated house materials and engineering specifications for poultry facilities. Features Q355B H steel main structure, SA2.5 shot blasting, Q235B secondary structure rated for 200-280kph wind stand, PPGI V1000 PU sandwich wall panel, V840 roof sheet, V900 ceiling sheet, and 100mm fiberglass ceiling insulation.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Main Structure', spec1Value: 'Q355B H Steel', spec2Label: 'Wind Stand', spec2Value: '200-280kph', spec3Label: 'Wall Panel', spec3Value: 'PPGI V1000 50mm' },
    materials: {
      mainStructure: ['Q355B Welding and hot rolling H steel', 'Shot blasting (SA2.5)', 'Antirusting paint (Grey)'],
      secondaryStructure: ['Wind Stand: 200-280kph', 'Q235B round steel/circular tube/angle iron (including ceiling joist)'],
      roofPurlin: ['Galvanized cold-rolled steel', 'C-purlins'],
      wallPurlin: ['Galvanized cold-rolled steel', 'C-purlins'],
      roofSheet: ['V840 color single steel sheet', 'T= 0.4mm, 0.5mm, 0.6mm'],
      ceilingSheet: ['V900 color single steel sheet', 'T= 0.37mm'],
      ceilingInsulation: ['Fiberglass roll (W=1.15m, T= 100mm, D=16kg/m³)', 'Polyethylene Sheet'],
      wallPanel: ['PPGI V1000 PU sandwich panel', 'T=0.4mm+50mm+0.4mm, D=40 ±2kg/m³'],
    },
    isBrochureSpec: true,
    isSample: false,
  },
  {
    id: 'pf-05',
    title: 'Controlled Climate System',
    badge: 'Climate Control',
    businessUnit: 'Poultry Farm Equipment',
    subCategory: 'Ventilation & Cooling',
    category: 'Poultry Facilities',
    functionCategory: 'Equipment & Automation',
    speciesTags: ['Environmental Controller', 'Cone Fans', 'EC Fans'],
    description: 'An integrated climate regulation system that ensures stable internal housing conditions.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Controllers', spec1Value: 'EI-6000PLUS / EI-1000C', spec2Label: 'Cone Fans', spec2Value: 'F50 / EI-50 Louvered', spec3Label: 'Drive Fans', spec3Value: '50/55 EC & Inverter' },
    buildingSpecs: {
      features: [
        'EI-6000PLUS Environmental Controller',
        'EI-1000C Environmental Controller',
        'F50 Butterfly Cone Fan',
        'EI-50 Louvered Cone Fan',
        '50 Inverter Fan',
        '50 Shutter Direct-drive EC Fan',
        'FRP Fans',
        '55 Direct-drive EC fans',
      ],
    },
    isBrochureSpec: true,
    isSample: false,
  },
  {
    id: 'pf-06',
    title: 'Heating System',
    badge: 'Temperature Control',
    businessUnit: 'Poultry Farm Equipment',
    subCategory: 'Automation',
    category: 'Poultry Facilities',
    functionCategory: 'Equipment & Automation',
    speciesTags: ['Damly Heaters', 'Heat Distribution', 'Controlled Temp'],
    description: 'A controlled heat distribution system to maintain optimal temperatures for bird comfort, growth, and survival.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Equipment', spec1Value: 'Damly Heaters', spec2Label: 'Function', spec2Value: 'Heat Distribution', spec3Label: 'Purpose', spec3Value: 'Comfort & Survival' },
    buildingSpecs: {
      features: ['Damly Heaters', 'Controlled Heat Distribution System', 'Optimal Temperature Regulation'],
    },
    isBrochureSpec: true,
    isSample: false,
  },
  {
    id: 'pf-07',
    title: 'Feeding System',
    badge: 'Automated Feeding',
    businessUnit: 'Poultry Farm Equipment',
    subCategory: 'Feeding & Watering',
    category: 'Poultry Facilities',
    functionCategory: 'Equipment & Automation',
    speciesTags: ['Automated Feed', 'Metering', 'Feed Distribution'],
    description: 'Automated or semi-automated system that stores, meters, and uniformly distributes feed using controlled and integrated systems.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Operation', spec1Value: 'Auto / Semi-Auto', spec2Label: 'Process', spec2Value: 'Store, Meter & Distribute', spec3Label: 'Distribution', spec3Value: 'Uniform Feed' },
    buildingSpecs: {
      features: ['Feed Storage & Metering', 'Uniform Feed Distribution', 'Controlled & Integrated Network'],
    },
    isBrochureSpec: true,
    isSample: false,
  },
  {
    id: 'pf-08',
    title: 'Drinking System',
    badge: 'Automated Water',
    businessUnit: 'Poultry Farm Equipment',
    subCategory: 'Feeding & Watering',
    category: 'Poultry Facilities',
    functionCategory: 'Equipment & Automation',
    speciesTags: ['Water Delivery', 'Uniform Access', 'Regulated Flow'],
    description: 'Automated water delivery system ensuring clean supply, uniform access, and regulated flow via integrated networks and controls.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Supply', spec1Value: 'Clean Supply', spec2Label: 'Access', spec2Value: 'Uniform Access', spec3Label: 'Control', spec3Value: 'Regulated Flow' },
    buildingSpecs: {
      features: ['Automated Water Delivery', 'Uniform Access & Clean Supply', 'Integrated Network & Flow Controls'],
    },
    isBrochureSpec: true,
    isSample: false,
  },
  {
    id: 'pf-09',
    title: 'Medication System',
    badge: 'Flock Dosing',
    businessUnit: 'Poultry Farm Equipment',
    subCategory: 'Automation',
    category: 'Poultry Facilities',
    functionCategory: 'Equipment & Automation',
    speciesTags: ['Dosatron System', 'Accurate Dosing', 'Vaccines & Supplements'],
    description: 'A system for delivering medications, vaccines, and supplements through water for accurate dosing and uniform flock treatment.',
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    metrics: { spec1Label: 'Equipment', spec1Value: 'Dosatron System', spec2Label: 'Delivery', spec2Value: 'Water Delivery', spec3Label: 'Dosing', spec3Value: 'Accurate Dosing' },
    buildingSpecs: {
      features: ['Dosatron Dosing System', 'Water Delivery Dosing', 'Medications, Vaccines & Supplements', 'Uniform Flock Treatment'],
    },
    isBrochureSpec: true,
    isSample: false,
  },

  // ─── HATCHERY (SAMPLE DEMONSTRATION DATA) ─────────────────────────────────
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
    isBrochureSpec: false,
    isSample: true,
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
    isBrochureSpec: false,
    isSample: true,
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
    isBrochureSpec: false,
    isSample: true,
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
    isBrochureSpec: false,
    isSample: true,
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
    isBrochureSpec: false,
    isSample: true,
  },

  // ─── FEEDMILL (SAMPLE DEMONSTRATION DATA) ─────────────────────────────────
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
    isBrochureSpec: false,
    isSample: true,
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
    isBrochureSpec: false,
    isSample: true,
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
    isBrochureSpec: false,
    isSample: true,
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
    isBrochureSpec: false,
    isSample: true,
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
    isBrochureSpec: false,
    isSample: true,
  },

  // ─── SOLAR SYSTEMS (SAMPLE DEMONSTRATION DATA) ────────────────────────────
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
    isBrochureSpec: false,
    isSample: true,
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
    isBrochureSpec: false,
    isSample: true,
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
    isBrochureSpec: false,
    isSample: true,
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
    isBrochureSpec: false,
    isSample: true,
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
    isBrochureSpec: false,
    isSample: true,
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
    title: 'Turnkey Design & Build Capability',
    certCode: 'Full Scope Integration',
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
