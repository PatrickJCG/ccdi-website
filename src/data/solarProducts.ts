import type { Product } from './mockProducts';

export interface SolarEquipmentCard {
  id: string;
  title: string;
  badge: string;
  description: string;
}

export interface SolarTabConfig {
  id: string;
  tabLabel: string;
  categoryTitle: string;
  categorySubhead: string;
  categoryBadges?: string;
  equipment: SolarEquipmentCard[];
}

export const SOLAR_TAB_1_ON_GRID: SolarTabConfig = {
  id: 'on-grid',
  tabLabel: 'On-Grid Solar Inverters',
  categoryTitle: 'ON-GRID SOLAR',
  categorySubhead: 'The Right System for Every Power Need.',
  categoryBadges: 'Load-Based | Site-Suited | Monitored | Scalable',
  equipment: [
    {
      id: 'sl-r1-mini',
      title: 'R1 Mini',
      badge: '1.6–3.3 kW | 1-phase | 1 MPPT',
      description: 'Compact residential inverter with flexible input range and high-power module compatibility.',
    },
    {
      id: 'sl-r1-macro',
      title: 'R1 Macro',
      badge: '3.68–6 kW | 1-phase | 2 MPPT',
      description: 'Two-MPPT platform for homes and small facilities with varied roof orientations.',
    },
    {
      id: 'sl-r3-note',
      title: 'R3 Note',
      badge: '6–12 kW | 3-phase | 2 MPPT',
      description: 'Three-phase solution for larger residences, farms and light commercial loads.',
    },
    {
      id: 'sl-r3-pre',
      title: 'R3 Pre',
      badge: '15–25 kW | 3-phase',
      description: 'Commercial-class inverter for distributed generation and straightforward O&M.',
    },
    {
      id: 'sl-r3-navo',
      title: 'R3 Navo',
      badge: '30–50 kW | 3-phase | 3/4 MPPT',
      description: 'Up to 98.8% efficiency, 1100 V DC input and optional AFCI/PID functions.',
    },
    {
      id: 'sl-r3-max',
      title: 'R3 Max',
      badge: '100–125 kW | 3-phase',
      description: 'High-capacity platform with IP66 protection, string monitoring and remote upgrades.',
    },
  ],
};

export const SOLAR_TAB_2_HYBRID: {
  id: string;
  tabLabel: string;
  categoryTitle: string;
  categorySubhead: string;
  valueCallouts: {
    title: string;
    bullets: string[];
  }[];
  hybridInverters: SolarEquipmentCard[];
  modularBatterySubhead: string;
  modularBatteries: SolarEquipmentCard[];
} = {
  id: 'hybrid-storage',
  tabLabel: 'Hybrid Energy Storage & Modular Batteries',
  categoryTitle: 'HYBRID ENERGY STORAGE',
  categorySubhead: 'Use More Solar. Keep Your Power Running.',
  valueCallouts: [
    {
      title: 'POWER RELIABILITY',
      bullets: [
        'Backup for essential equipment',
        'Automatic power switching',
        'Generator-ready option',
      ],
    },
    {
      title: 'ENERGY OPTIMIZATION',
      bullets: [
        'Maximize solar energy use',
        'Store energy for later use',
        'Remote system monitoring',
      ],
    },
  ],
  hybridInverters: [
    {
      id: 'sl-n1-hv',
      title: 'N1 HV',
      badge: '3–6 kW | 1-phase | high voltage',
      description: 'Efficient residential hybrid platform with backup capability.',
    },
    {
      id: 'sl-n1-lv',
      title: 'N1 LV',
      badge: '4–8 kW | 1-phase | low voltage',
      description: '150% PV oversizing support, generator compatibility and UPS-level transfer.',
    },
    {
      id: 'sl-n3-plus',
      title: 'N3 Plus',
      badge: '15–30 kW | 3-phase',
      description: 'Commercial hybrid inverter for larger loads and three-phase backup systems.',
    },
  ],
  modularBatterySubhead: 'MODULAR BATTERY OPTIONS',
  modularBatteries: [
    {
      id: 'sl-turbo-h4',
      title: 'Turbo H4',
      badge: '5–30 kWh',
      description: 'Stackable high-voltage LFP battery for large residential applications.',
    },
    {
      id: 'sl-turbo-h5',
      title: 'Turbo H5',
      badge: '30–60 kWh',
      description: 'Expandable high-voltage LFP storage with up to 50 A continuous charge/discharge.',
    },
    {
      id: 'sl-turbo-l2',
      title: 'Turbo L2',
      badge: '5.1 / 10.2 / 14.3 kWh',
      description: 'Low-voltage battery choices for flexible residential storage design.',
    },
  ],
};

export const SOLAR_TAB_3_BESS: {
  id: string;
  tabLabel: string;
  categoryTitle: string;
  categorySubhead: string;
  bessSystems: SolarEquipmentCard[];
  featureCallouts: {
    title: string;
    bullets: string[];
  }[];
  systemBuildingBlocksHeader: string;
  systemBuildingBlocks: SolarEquipmentCard[];
} = {
  id: 'commercial-bess',
  tabLabel: 'Commercial & Industrial BESS',
  categoryTitle: 'COMMERCIAL & INDUSTRIAL BESS',
  categorySubhead: 'Energy Storage for Facility Operations.',
  bessSystems: [
    {
      id: 'sl-rena1000',
      title: 'RENA1000',
      badge: '50 kW / 104.4 kWh',
      description: 'Outdoor all-in-one small C&I ESS with microgrid control and emergency backup capability.',
    },
    {
      id: 'sl-rena5000',
      title: 'RENA5000',
      badge: '125 kW / 261 kWh',
      description: 'Integrated C&I BESS platform for solar-plus-storage, peak management and critical-load support.',
    },
  ],
  featureCallouts: [
    {
      title: 'BUSINESS VALUE',
      bullets: [
        'Peak demand management',
        'Increased solar energy use',
        'Reduced generator use',
      ],
    },
    {
      title: 'RESILIENCE',
      bullets: [
        'Backup for essential loads',
        'Microgrid-ready',
        'Coordinated power sources',
      ],
    },
    {
      title: 'OPERATIONS',
      bullets: [
        'Remote system monitoring',
        'System alerts and performance tracking',
        'Planned maintenance support',
      ],
    },
  ],
  systemBuildingBlocksHeader: 'SYSTEM BUILDING BLOCKS',
  systemBuildingBlocks: [
    {
      id: 'sl-pvs-125k',
      title: 'PVS-125K',
      badge: '125 kW PV controller',
      description: 'Coordinates solar generation within the energy system.',
    },
    {
      id: 'sl-sts-175',
      title: 'STS-175',
      badge: 'Static transfer system',
      description: 'Supports fast source transfer for continuity strategies.',
    },
    {
      id: 'sl-microgrid-control',
      title: 'Microgrid control',
      badge: 'PV + BESS + grid + genset',
      description: 'Supervisory controls align generation, storage and facility demand.',
    },
  ],
};

export const SOLAR_TAB_4_PV_EV: SolarTabConfig = {
  id: 'pv-ev-charging',
  tabLabel: 'Solar PV Modules & EV Charging Solutions',
  categoryTitle: 'SOLAR PV & EV CHARGING SOLUTIONS',
  categorySubhead: 'Advanced technologies for cleaner energy and mobility.',
  equipment: [
    {
      id: 'sl-gcl-bifacial',
      title: 'GCL BIFACIAL DUAL-GLASS PV MODULE',
      badge: 'NT12R/66GDF • 605–620 W • up to 23.0% module efficiency • 0 to +5 W power tolerance',
      description: '',
    },
    {
      id: 'sl-smart-ev-charger',
      title: 'SMART AC EV CHARGER',
      badge: '7 kW / 11 kW / 22 kW',
      description: 'Wallbox options for residential, workplace and fleet charging.',
    },
  ],
};

// All Solar Products mapped as mock Product objects for Inquiry cart integration
export const ALL_SOLAR_EQUIPMENT_PRODUCTS: Product[] = [
  ...SOLAR_TAB_1_ON_GRID.equipment.map((e) => ({
    id: e.id,
    title: e.title,
    badge: e.badge,
    businessUnit: 'Solar Systems' as const,
    subCategory: 'On-Grid Inverters',
    category: 'Solar Power Systems',
    functionCategory: 'Renewable Energy Integration',
    speciesTags: ['On-Grid', 'Solar Inverter'],
    description: e.description,
    imageUrl: '/images/capabilities/solar-facility.jpg',
    metrics: {
      spec1Label: 'Rating / Specs',
      spec1Value: e.badge,
      spec2Label: 'Application',
      spec2Value: 'On-Grid Solar',
      spec3Label: 'Series',
      spec3Value: e.title,
    },
  })),
  ...SOLAR_TAB_2_HYBRID.hybridInverters.map((e) => ({
    id: e.id,
    title: e.title,
    badge: e.badge,
    businessUnit: 'Solar Systems' as const,
    subCategory: 'Hybrid Energy Storage',
    category: 'Solar Power Systems',
    functionCategory: 'Renewable Energy Integration',
    speciesTags: ['Hybrid Inverter', 'Battery Storage'],
    description: e.description,
    imageUrl: '/images/capabilities/solar-facility.jpg',
    metrics: {
      spec1Label: 'Rating / Specs',
      spec1Value: e.badge,
      spec2Label: 'Application',
      spec2Value: 'Hybrid Inverter',
      spec3Label: 'Series',
      spec3Value: e.title,
    },
  })),
  ...SOLAR_TAB_2_HYBRID.modularBatteries.map((e) => ({
    id: e.id,
    title: e.title,
    badge: e.badge,
    businessUnit: 'Solar Systems' as const,
    subCategory: 'Modular Batteries',
    category: 'Solar Power Systems',
    functionCategory: 'Renewable Energy Integration',
    speciesTags: ['LFP Battery', 'Energy Storage'],
    description: e.description,
    imageUrl: '/images/capabilities/solar-facility.jpg',
    metrics: {
      spec1Label: 'Capacity',
      spec1Value: e.badge,
      spec2Label: 'Application',
      spec2Value: 'Modular Storage',
      spec3Label: 'Series',
      spec3Value: e.title,
    },
  })),
  ...SOLAR_TAB_3_BESS.bessSystems.map((e) => ({
    id: e.id,
    title: e.title,
    badge: e.badge,
    businessUnit: 'Solar Systems' as const,
    subCategory: 'C&I BESS',
    category: 'Solar Power Systems',
    functionCategory: 'Renewable Energy Integration',
    speciesTags: ['BESS', 'Commercial Storage'],
    description: e.description,
    imageUrl: '/images/capabilities/solar-facility.jpg',
    metrics: {
      spec1Label: 'Power / Capacity',
      spec1Value: e.badge,
      spec2Label: 'Application',
      spec2Value: 'C&I BESS',
      spec3Label: 'Series',
      spec3Value: e.title,
    },
  })),
  ...SOLAR_TAB_3_BESS.systemBuildingBlocks.map((e) => ({
    id: e.id,
    title: e.title,
    badge: e.badge,
    businessUnit: 'Solar Systems' as const,
    subCategory: 'System Building Blocks',
    category: 'Solar Power Systems',
    functionCategory: 'Renewable Energy Integration',
    speciesTags: ['Microgrid', 'Control System'],
    description: e.description,
    imageUrl: '/images/capabilities/solar-facility.jpg',
    metrics: {
      spec1Label: 'Specs',
      spec1Value: e.badge,
      spec2Label: 'Application',
      spec2Value: 'System Building Block',
      spec3Label: 'Series',
      spec3Value: e.title,
    },
  })),
  ...SOLAR_TAB_4_PV_EV.equipment.map((e) => ({
    id: e.id,
    title: e.title,
    badge: e.badge,
    businessUnit: 'Solar Systems' as const,
    subCategory: 'PV & EV Charging',
    category: 'Solar Power Systems',
    functionCategory: 'Renewable Energy Integration',
    speciesTags: ['Solar PV', 'EV Charger'],
    description: e.description,
    imageUrl: '/images/capabilities/solar-facility.jpg',
    metrics: {
      spec1Label: 'Specs',
      spec1Value: e.badge,
      spec2Label: 'Application',
      spec2Value: 'Solar & EV',
      spec3Label: 'Series',
      spec3Value: e.title,
    },
  })),
];

export const SOLAR_PRODUCTS_MAP = ALL_SOLAR_EQUIPMENT_PRODUCTS.reduce<Record<string, Product>>((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

