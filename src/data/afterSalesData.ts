export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServicePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  tag: string;
}

export interface MaintenanceChecklistCategory {
  category: string;
  interval: 'Monthly' | 'Quarterly' | 'Flock Turnover / Bi-Annual' | 'Bi-Annual' | 'Annual';
  items: string[];
}

export interface SlaTier {
  severity: string;
  level: string;
  responseTime: string;
  scope: string;
  action: string;
}

export interface AfterSalesFaq {
  q: string;
  a: string;
}

export interface CategoryAfterSalesInfo {
  slug: 'poultry' | 'hatchery' | 'feedmill' | 'solar';
  categoryName: string;
  badge: string;
  title: string;
  subtitle: string;
  accentColor: 'amber' | 'sky';
  kpis: Array<{
    label: string;
    value: string;
    subtext: string;
  }>;
  pillars: ServicePillar[];
  checklist: MaintenanceChecklistCategory[];
  slaTiers: SlaTier[];
  sparePartsHub: string[];
  faqs: AfterSalesFaq[];
}

export const AFTER_SALES_DATA: Record<string, CategoryAfterSalesInfo> = {
  poultry: {
    slug: 'poultry',
    categoryName: 'Poultry Solutions',
    badge: 'POULTRY LIFECYCLE ASSURANCE',
    title: 'Poultry Farm After-Sales Services & Maintenance',
    subtitle:
      'Dedicated engineering support, scheduled preventive maintenance, rapid-response repairs, and genuine OEM spare parts dispatch for Broiler, Broiler Breeder, and Commercial Layer operations across the Philippines.',
    accentColor: 'amber',
    kpis: [
      { label: 'Emergency Hotline', value: '24/7', subtext: 'Continuous technical triage' },
      { label: 'Critical Dispatch', value: '< 24h', subtext: 'Field technician mobilization' },
      { label: 'OEM Parts Inventory', value: '100%', subtext: 'Central warehouse in Pampanga' },
      { label: 'Structural Guarantee', value: '10 Yrs', subtext: 'Pre-fab steel integrity warranty' },
    ],
    pillars: [
      {
        id: 'pmc',
        title: 'Regular Farm Checkups & Maintenance',
        subtitle: 'Inspections Before Every Flock and Every Quarter',
        description:
          'We inspect and tune your farm equipment before every batch of birds. Our technicians check your fans, test cooling pads, inspect feeding lines, and clean water pipes so your flock grows without equipment interruptions.',
        deliverables: [
          'Test fan speeds, air pressure, and emergency curtain drop safety',
          'Clean and descale cooling pads and test water pumps',
          'Inspect automatic feeding lines, drive motors, and auger belts',
          'Flush and sanitize nipple drinking lines and check water pressure',
        ],
        tag: 'PREVENTIVE',
      },
      {
        id: 'emergency',
        title: 'Fast On-Site Emergency Repairs',
        subtitle: 'Quick Response When Equipment Breaks Down',
        description:
          'When fans, feeders, or electrical systems break down in hot weather, every hour matters. Our on-call technicians troubleshoot over the phone right away and dispatch to your farm with replacement parts.',
        deliverables: [
          'Immediate phone support and troubleshooting within 30 minutes',
          'Same-day or next-day technician visits across Luzon',
          'Emergency fan motor swaps and temporary backup setups',
          'Climate controller repairs, resets, and backup settings',
        ],
        tag: 'EMERGENCY REPAIR',
      },
      {
        id: 'parts',
        title: 'Original Spare Parts in Stock',
        subtitle: 'Fast Pickup or Delivery from Pampanga',
        description:
          'No waiting for slow overseas shipments. We keep complete replacement parts ready in our Clark and Angeles warehouses for fast delivery to your farm.',
        deliverables: [
          'Fan motors, blades, belts, and heavy-duty pulleys',
          'Cooling pads, water filters, and PVC distribution pipes',
          'Nipple drinkers, drip cups, pressure regulators, and medicators',
          'Curtain winches, steel cables, pulleys, and drop curtain kits',
        ],
        tag: 'SPARE PARTS',
      },
      {
        id: 'retrofits',
        title: 'Farm Modernization & Retrofits',
        subtitle: 'Upgrade Older Houses with Newer Technology',
        description:
          'Improve older sheds with automated equipment. We help you install newer climate controllers, energy-saving fan motors, automated layer cages, and solar power systems.',
        deliverables: [
          'Install modern smart climate controllers for automated cooling',
          'Upgrade layer cages with automated egg and manure belts',
          'Replace old lights with dimmable poultry LED systems',
          'Connect solar panels and backup generators to cut power bills',
        ],
        tag: 'UPGRADES & RETROFITS',
      },
    ],
    checklist: [
      {
        category: 'Tunnel Ventilation & Negative Pressure',
        interval: 'Monthly',
        items: [
          'Inspect cone fan belt tension, pulley alignment, and bearing play',
          'Check shutter blade counterweight movement and clean dust encrustation',
          'Verify static pressure differential (15–35 Pa) using digital manometer',
          'Test emergency winch-drop fail-safe curtain upon simulated power outage',
        ],
      },
      {
        category: 'Evaporative Cooling System',
        interval: 'Flock Turnover / Bi-Annual',
        items: [
          'Flush cooling pad distribution pipes and clean water filter mesh',
          'Check cellulose pad panels for mineral scale and algae; apply organic descaler',
          'Test water pump flow rate and verify even wetting without dry streaks',
          'Inspect water tank float valve and overflow plumbing seals',
        ],
      },
      {
        category: 'Automated Feed & Water Distribution',
        interval: 'Flock Turnover / Bi-Annual',
        items: [
          'Verify feed auger drive motor amp draw and gearbox oil level',
          'Inspect feed pan sensor paddles for sensitivity and shutoff calibration',
          'Flush water lines with chlorine dioxide or organic descaling agent',
          'Check water meter pulse output and test pressure regulator diaphragm',
        ],
      },
      {
        category: 'Environmental Controls & Biosecurity',
        interval: 'Quarterly',
        items: [
          'Calibrate temperature sensors (dry bulb), relative humidity, and static pressure sensors against certified instruments',
          'Test heater ignition, gas valve solenoids, and emergency high/low temperature alarms',
          'Inspect door weather-stripping, eaves sealant, and rodent-proof wire mesh',
          'Review electronic flock logs and FCR ventilation curves with farm manager',
        ],
      },
    ],
    slaTiers: [
      {
        severity: 'Tier 1: Emergency System Down',
        level: 'Critical',
        responseTime: '2–4 Hours Triage / < 24h On-Site',
        scope: 'Total ventilation shutdown, controller freeze, catastrophic water line rupture, or electrical fire hazard.',
        action: 'Immediate remote engineering diagnosis + priority dispatch of emergency replacement unit from Pampanga depot.',
      },
      {
        severity: 'Tier 2: Priority Component Fault',
        level: 'Elevated',
        responseTime: '12–24 Hours',
        scope: 'Single exhaust fan failure, feed line auger jam, partial cooling pad dry spot, or egg elevator misalignment.',
        action: 'Component replacement dispatched via regional express freight + remote calibration guidance or technician visit.',
      },
      {
        severity: 'Tier 3: Routine PMC & Calibration',
        level: 'Scheduled',
        responseTime: 'Planned Pre-Flock Window',
        scope: 'Turnover multi-point inspection, preventive lubrication, water descaling, and sensor recertification.',
        action: 'Scheduled on-site maintenance conducted during the 10–14 day vacant house window between bird batches.',
      },
    ],
    sparePartsHub: [
      'Over 2,500 SKU inventory stocked at Clark Freeport Zone & Angeles City logistics depot',
      'Direct factory warranty replacement processing for Tier-1 OEM poultry equipment',
      'Custom spare parts emergency kits available for on-farm stockpiling (belts, fuses, sensors, solenoids)',
      'Nationwide courier logistics with same-day cargo dispatch to Clark, Manila, Batangas, and Cebu hubs',
    ],
    faqs: [
      {
        q: 'How frequently should a tunnel-ventilated poultry house undergo formal maintenance?',
        a: 'We strongly recommend a thorough multi-point service during every flock turnaround window (every 35–45 days for broilers) and a comprehensive mechanical overhaul every 6 to 12 months. Regular maintenance preserves bird growth rates, avoids mid-flock fan trips, and extends motor lifespan.',
      },
      {
        q: 'What is included in a CCDI Annual Maintenance Agreement (AMA)?',
        a: 'An AMA includes scheduled pre-flock inspections, priority access to emergency technicians, discounted OEM spare parts pricing, bi-annual sensor recalibration, and complete ventilation curve optimization reports.',
      },
      {
        q: 'Do you service poultry houses and equipment not originally built by CCDI?',
        a: 'Yes. Our engineering team frequently performs brownfield audits and maintenance on third-party poultry houses, upgrading faulty equipment with reliable OEM parts and modern climate controllers.',
      },
      {
        q: 'How do I request emergency after-sales support for my poultry farm?',
        a: 'Farm owners can call our direct emergency engineering hotline at +63 925 7588 458 or submit a service request through the form below. For critical ventilation issues, emergency triage begins immediately.',
      },
    ],
  },

  hatchery: {
    slug: 'hatchery',
    categoryName: 'Hatchery Solutions',
    badge: 'INCUBATION LIFECYCLE ASSURANCE',
    title: 'Commercial Hatchery After-Sales & Incubation Support',
    subtitle:
      'Certified mechanical servicing, NIST-traceable sensor calibration, cleanroom HVAC air balancer testing, and spare parts supply for single-stage and multi-stage commercial hatchery facilities.',
    accentColor: 'sky',
    kpis: [
      { label: 'Hatchery Hotline', value: '24/7', subtext: 'Incubation emergency triage' },
      { label: 'Sensor Calibration', value: '±0.05°C', subtext: 'NIST-traceable precision' },
      { label: 'OEM Parts Hub', value: '100%', subtext: 'Stocked in Pampanga depot' },
      { label: 'HVAC Air Balancing', value: 'ISO 8', subtext: 'Cleanroom differential pressure' },
    ],
    pillars: [
      {
        id: 'incubation-cal',
        title: 'Setter & Hatcher Precision Calibration',
        subtitle: 'Temperature, RH%, and CO2 Diagnostics',
        description:
          'Even a 0.2°C temperature drift across the incubation hall can severely reduce hatchability and chick vitality. CCDI performs high-precision multi-point thermal and humidity calibration using laboratory-certified diagnostic probes.',
        deliverables: [
          'NIST-traceable temperature and wet-bulb sensor validation inside setters & hatchers',
          'Turning mechanism angle inspection (45° forward/backward) and hydraulic pressure testing',
          'Damper actuator positioning checks and airflow uniformity velocity testing',
          'Carbon dioxide (CO2) sensor zero-drift calibration and exhaust purge testing',
        ],
        tag: 'CALIBRATION',
      },
      {
        id: 'cleanroom-hvac',
        title: 'Cleanroom HVAC & Air Balancer Testing',
        subtitle: 'Positive Pressure & Biosecurity Verification',
        description:
          'Hatcheries depend on strict positive air pressure hierarchies to prevent contaminated exhaust from entering clean incubation rooms. We balance air handling units, replace HEPA/EU filters, and certify differential pressure cascades.',
        deliverables: [
          'Differential pressure (Magnehelic gauge) testing across egg hall, setter, and dispatch',
          'HEPA and EU4/EU7 pre-filter replacement and cleanroom plenum sanitization',
          'Chilled water coil and steam humidifier descaling and valve actuator inspection',
          'Fresh air intake volume balancing based on CFM requirements per 1,000 eggs',
        ],
        tag: 'HVAC & BIOSECURITY',
      },
      {
        id: 'automation-mechanisms',
        title: 'Egg Transfer & Vaccination Machine Servicing',
        subtitle: 'Candling, Transfer & In-Ovo Automation',
        description:
          'We service automated egg candling conveyors, vacuum transfer heads, chick counting carousels, spray vaccination cabinets, and waste macerator vacuum transport systems to guarantee zero transfer cracking and smooth operational flow.',
        deliverables: [
          'Vacuum cup replacement and pneumatic line leak detection on transfer machines',
          'Candling optical sensor array recalibration and cracked egg detector tuning',
          'Chick sizing carousel belt tensioning and rotary bearing lubrication',
          'Waste vacuum pump seal replacement and cyclone separator cleaning',
        ],
        tag: 'AUTOMATION',
      },
      {
        id: 'spare-parts-backup',
        title: 'Critical Incubator Parts & Power Failsafes',
        subtitle: 'Preventing Catastrophic Incubation Loss',
        description:
          'Incubation failure is not an option. CCDI stocks crucial setter fan motors, heating elements, turning solenoid valves, micro-switches, and automatic generator transfer switch (ATS) sync controllers.',
        deliverables: [
          'High-temperature setter axial fan motors and balanced stainless impeller blades',
          'Incoloy heating elements, solenoid water valves, and ultrasonic misting nozzles',
          'Main incubator PLC motherboard exchange units and display modules',
          'Dual-power ATS inspection and automatic alarm dialer testing',
        ],
        tag: 'CRITICAL PARTS',
      },
    ],
    checklist: [
      {
        category: 'Setter & Hatcher Incubation Rooms',
        interval: 'Monthly',
        items: [
          'Verify setter turning frequency and test hydraulic / pneumatic cylinder seals',
          'Inspect heating element resistance and verify zero short-to-ground current',
          'Check cooling water solenoid valve shutoff and inspect for pipe scale buildup',
          'Test independent high-limit safety thermostat cutoffs at 39.5°C',
        ],
      },
      {
        category: 'HVAC & Differential Air Pressure',
        interval: 'Quarterly',
        items: [
          'Inspect static pressure differentials across clean-to-dirty room boundaries',
          'Inspect AHU supply fan belt tension and grease sealed ball bearings',
          'Replace air handling pre-filters and inspect bag/HEPA filter pressure drops',
          'Clean evaporator condensate drip pans and verify disinfectant dosing',
        ],
      },
      {
        category: 'Automated Candling & Transfer Systems',
        interval: 'Flock Turnover / Bi-Annual',
        items: [
          'Inspect silicone vacuum suction cups for tears, wear, or loss of elasticity',
          'Check vacuum booster pump pressure and test pneumatic safety interlocks',
          'Calibrate chick counting light sensors and spray vaccination nozzle patterns',
          'Inspect chick crate washer spray jets, detergent pumps, and water heaters',
        ],
      },
      {
        category: 'Electrical, Backup Generators & Alarms',
        interval: 'Annual',
        items: [
          'Simulate total mains blackout to verify ATS transition within 10 seconds',
          'Test automated telemetric SMS/alarm dialer for high-temperature and power failure alerts',
          'Perform thermal imaging (FLIR) scan of main electrical switchgear and motor starters',
          'Review hatchability logs, fertile egg hatch rates, and cull chick percentages',
        ],
      },
    ],
    slaTiers: [
      {
        severity: 'Tier 1: Active Incubation Alarm',
        level: 'Critical',
        responseTime: '< 1 Hour Triage / Immediate Mobilization',
        scope: 'Setter/hatcher cooling failure, main turning jam, total HVAC shutdown, or PLC communication loss with live eggs inside.',
        action: 'Immediate direct consultation with senior incubation engineer + urgent dispatch of replacement parts or technician.',
      },
      {
        severity: 'Tier 2: Transfer / Automation Fault',
        level: 'Elevated',
        responseTime: '12–24 Hours',
        scope: 'Vacuum transfer machine fault, crate washer heater trip, or candling sensor drift.',
        action: 'Remote troubleshooting or on-site repair coordinated with planned transfer schedules.',
      },
      {
        severity: 'Tier 3: Annual Calibration & HVAC Balance',
        level: 'Scheduled',
        responseTime: 'Scheduled Window',
        scope: 'NIST-traceable sensor recertification, HVAC air balancing, and preventive overhaul.',
        action: 'Executed according to planned maintenance calendar without disrupting incubation cycles.',
      },
    ],
    sparePartsHub: [
      'Complete incubator control boards, temperature probes, and RTD PT100 sensors in stock',
      'High-temperature setter fan motors and stainless impellers ready for dispatch',
      'Silicone transfer suction cups, pneumatic hoses, solenoid valves, and vacuum switches',
      'Central Pampanga logistics base provides express courier delivery to provincial hatcheries',
    ],
    faqs: [
      {
        q: 'How often should incubator temperature sensors be calibrated?',
        a: 'We recommend NIST-traceable calibration at least twice a year. A temperature deviation of just 0.1°C can alter chick hatch timing and negatively impact navel healing and chick quality.',
      },
      {
        q: 'Can CCDI support multi-brand hatcheries (e.g. Petersime, Jamesway, Pas Reform)?',
        a: 'Yes. Our HVAC engineers, automation technicians, and air-balancing specialists provide comprehensive facility maintenance, AHU servicing, and auxiliary equipment repair across leading global incubator brands.',
      },
      {
        q: 'What precautions does CCDI take regarding hatchery biosecurity during service visits?',
        a: 'Our field technicians follow strict biosecurity protocols: a mandatory 72-hour poultry downtime rule, sanitized protective apparel, sterilized diagnostic instruments, and strict adherence to one-way sanitary traffic flows.',
      },
      {
        q: 'What is the contact procedure for an emergency incubation failure?',
        a: 'Call our 24/7 technical hotline at +63 925 7588 458 immediately. Our incubation automation specialists will guide your on-site engineering team through manual overrides while parts are mobilized.',
      },
    ],
  },

  feedmill: {
    slug: 'feedmill',
    categoryName: 'Feedmill Systems',
    badge: 'MILLING LIFECYCLE ASSURANCE',
    title: 'Feedmill Operations After-Sales & Mechanical Servicing',
    subtitle:
      'Heavy machinery maintenance, dynamic rotor balancing, pellet die reconditioning, batching scale calibration, and rapid OEM spare parts dispatch for commercial and on-farm feedmills.',
    accentColor: 'amber',
    kpis: [
      { label: 'Emergency Support', value: '24/7', subtext: 'Motor & PLC triage' },
      { label: 'Scale Accuracy', value: 'Class III', subtext: 'OIML certified calibration' },
      { label: 'Stocked Parts', value: '100%', subtext: 'Dies, hammers & screens' },
      { label: 'Plant Availability', value: '98.5%', subtext: 'Target operational uptime' },
    ],
    pillars: [
      {
        id: 'grinding-pelleting',
        title: 'Hammer Mill & Pelleting Press Reconditioning',
        subtitle: 'Precision Mechanical Overhaul',
        description:
          'High-wear milling components directly dictate feed throughput and particle uniformity. CCDI provides rotor dynamic balancing, tungsten-carbide hammer replacement, pellet mill ring die resurfacing, and roller shell dynamic clearance alignment.',
        deliverables: [
          'Hammer mill rotor dynamic balancing to eliminate high-frequency motor vibration',
          'Tungsten carbide tipped hammer replacement and perforation screen checks',
          'Pellet mill ring die inspection, bore polishing, and roller shell replacement',
          'Conditioner steam jacket descaling, paddle pitch adjustment, and steam trap overhaul',
        ],
        tag: 'HEAVY MECHANICAL',
      },
      {
        id: 'batching-scales',
        title: 'PLC Automation & Batching Scale Calibration',
        subtitle: 'Recipe Precision & Zero Waste',
        description:
          'Micro-ingredient and macro-dosing precision is critical for nutritional compliance and cost control. We test load cells, certify batching scales against calibrated test weights, and update automated batching software.',
        deliverables: [
          'OIML-compliant static and dynamic calibration using certified standard weights',
          'Mixer Coefficient of Variation (CV < 5%) homogeneity tracer testing',
          'Pneumatic slide gate seal inspection, solenoid valve timing, and positioner tuning',
          'SCADA automation troubleshooting, formula recipe database backup, and PLC servicing',
        ],
        tag: 'AUTOMATION & SCALES',
      },
      {
        id: 'conveying-silos',
        title: 'Conveying, Elevators & Silo Storage Maintenance',
        subtitle: 'Grain Handling & Anti-Spark Safety',
        description:
          'Bucket elevators, drag chain conveyors, and screw augers require continuous tensioning and alignment to prevent hazardous dust explosions and grain jamming. We service elevators, test anti-rub sensors, and inspect silo aeration fans.',
        deliverables: [
          'Bucket elevator belt tracking, tensioning, and mechanical splice inspections',
          'Bearing temperature sensor and belt alignment rub-block safety switch certification',
          'Grain silo aeration blower maintenance and multi-point temperature cable testing',
          'Dust collection pulse-jet baghouse filter replacement and explosion vent inspection',
        ],
        tag: 'CONVEYING & SILOS',
      },
      {
        id: 'feedmill-parts',
        title: 'OEM Heavy Wear Parts & Rapid Replacement',
        subtitle: 'Pampanga Warehouse Supply',
        description:
          'We stock high-wear feedmill consumables in Central Luzon: chrome alloy pellet dies, roller shells, hammer sets, screen sheets, pillow block bearings, elevator buckets, and heavy-duty gearboxes.',
        deliverables: [
          'Alloy steel & stainless steel ring dies for 2.0mm to 4.5mm pellet specifications',
          'Pre-assembled hammer sets matched by weight to preserve rotor balance',
          'Oil-resistant elevator belting, nylon buckets, and hardened chain links',
          'Severe-duty IP55 explosion-proof motors and heavy helical gear reducers',
        ],
        tag: 'HEAVY SPARES',
      },
    ],
    checklist: [
      {
        category: 'Grinding & Size Reduction',
        interval: 'Monthly',
        items: [
          'Inspect hammer mill hammers for corner wear; rotate or replace in balanced sets',
          'Examine screen plates for tears or enlargement; check clamping frame tightness',
          'Test permanent magnet separator at grain inlet and remove accumulated tramp metal',
          'Monitor rotor bearing operating temperature and grease with high-temp grease',
        ],
      },
      {
        category: 'Batching & Mixing Homogeneity',
        interval: 'Quarterly',
        items: [
          'Verify main mixer discharge door pneumatic seal for zero powder leakage',
          'Calibrate main batching hopper and micro-dosing hopper load cells with test weights',
          'Inspect mixer paddle tip clearance (3–5 mm) and adjust worn paddle faces',
          'Run manganese / salt tracer test to verify mixing Coefficient of Variation (CV < 5%)',
        ],
      },
      {
        category: 'Pelleting, Conditioning & Cooling',
        interval: 'Monthly',
        items: [
          'Check pellet mill roller-to-die clearance (0.1–0.3 mm) and verify lubrication feed',
          'Inspect steam pressure reducing valve and verify steam quality (98%+ dry steam)',
          'Check counterflow cooler rotary airlock seal and verify discharge level sensors',
          'Inspect crumbler roll fluting sharpness, spring safety release, and gap adjustment',
        ],
      },
      {
        category: 'Conveying, Silos & Plant Safety',
        interval: 'Annual',
        items: [
          'Check bucket elevator belt alignment, splice integrity, and rub block trip switches',
          'Inspect pulse-jet baghouse filter bags, solenoid valves, and reverse-air differential pressure',
          'Verify silo grain temperature monitoring cable readouts against manual thermistor probes',
          'Perform electrical megger insulation test on heavy 75kW–160kW main drive motors',
        ],
      },
    ],
    slaTiers: [
      {
        severity: 'Tier 1: Catastrophic Mill Stoppage',
        level: 'Critical',
        responseTime: '2–4 Hours Triage / < 24h Mobilization',
        scope: 'Main pellet mill jam, hammer mill rotor bearing seizure, batching scale PLC failure, or main elevator belt break.',
        action: 'Emergency dispatch of senior millwright / electrical engineer + immediate shipment of critical replacement parts.',
      },
      {
        severity: 'Tier 2: Component Wear & Calibration',
        level: 'Elevated',
        responseTime: '24–48 Hours',
        scope: 'Pellet die replacement, screen changeout, steam trap failure, or mixer door seal leak.',
        action: 'Scheduled component shipment and technical installation assistance.',
      },
      {
        severity: 'Tier 3: Annual Overhaul & Balancing',
        level: 'Scheduled',
        responseTime: 'Planned Shutdown Window',
        scope: 'Dynamic rotor re-balancing, complete gearbox oil analysis, baghouse re-bagging, and scale OIML certification.',
        action: 'Comprehensive plant shutdown servicing executed during scheduled maintenance holidays.',
      },
    ],
    sparePartsHub: [
      'Comprehensive inventory of ring dies, roller shells, and bearings for 5 TPH to 60+ TPH mills',
      'Precision weight-matched hammer sets to prevent catastrophic rotor vibration',
      'High-wear elevator buckets, food-grade belting, and bucket bolts in stock',
      'Fast regional delivery via truck freight from our Pampanga engineering depot',
    ],
    faqs: [
      {
        q: 'How frequently should hammer mill hammers and screens be rotated or replaced?',
        a: 'Depending on grain hardness and production tonnage, hammers should be rotated (4-way reversal) every 100–150 operating hours and replaced when all four corners are rounded. Screens should be inspected weekly for perforations or wire thinning.',
      },
      {
        q: 'Why is dynamic balancing of the hammer mill rotor essential?',
        a: 'At 3,000 RPM, an unbalance of even 20 grams creates severe centrifugal forces that destroy bearings, fatigue housing welds, and risk catastrophic structural rotor failure. CCDI uses portable digital balancing analyzers on site.',
      },
      {
        q: 'Do you provide scale calibration certificates for feedmill regulatory audits (BAI / FDA)?',
        a: 'Yes. Our scale calibration services include formal calibration reports utilizing certified standard test weights, recognized for Bureau of Animal Industry (BAI) and Good Manufacturing Practice (GMP) compliance.',
      },
      {
        q: 'Can CCDI rebuild or recondition existing pellet mill dies and roller shells?',
        a: 'Yes. We offer ring die reconditioning, bore reaming, and roller shell rebuilding to maximize wear life and ensure consistent pellet durability index (PDI).',
      },
    ],
  },

  solar: {
    slug: 'solar',
    categoryName: 'Solar Systems',
    badge: 'SOLAR LIFECYCLE ASSURANCE',
    title: 'Agro-Solar Power Systems After-Sales, O&M & Grid Sync Support',
    subtitle:
      'Professional Operations & Maintenance (O&M), thermal imaging scans, automated Zero-Export tuning, inverter servicing, and panel cleaning for agricultural rooftop and ground-mounted solar microgrids.',
    accentColor: 'amber',
    kpis: [
      { label: 'Monitoring SLA', value: '24/7', subtext: 'Cloud portal telemetry' },
      { label: 'Thermal Scans', value: 'FLIR', subtext: 'Infrared hotspot detection' },
      { label: 'Inverter Spares', value: 'Tier-1', subtext: 'Stocked replacement units' },
      { label: 'Performance PR', value: '> 82%', subtext: 'Target plant performance ratio' },
    ],
    pillars: [
      {
        id: 'om-cleaning',
        title: 'Comprehensive PV Cleaning & Thermal Scans',
        subtitle: 'Soiling Removal & Hotspot Detection',
        description:
          'Agricultural environments—especially near poultry houses and feedmills—generate significant dust, feathers, and organic particulate that settle on solar panels, degrading yields by up to 25%. We provide specialized module washing and drone/handheld FLIR thermal imaging scans.',
        deliverables: [
          'Deionized, low-pressure soft brush module washing to eliminate dust & ammonia deposits',
          'High-resolution FLIR infrared thermal imaging scans to pinpoint micro-cracks and bypass diode hotspots',
          'Rooftop mounting clamp torque checks and weather-seal gasket waterproofing inspection',
          'String VOC (Open Circuit Voltage) and ISC (Short Circuit Current) electrical performance testing',
        ],
        tag: 'CLEANING & THERMAL',
      },
      {
        id: 'inverter-servicing',
        title: 'Inverter Servicing & Firmware Upgrades',
        subtitle: 'String & Central Inverter Maintenance',
        description:
          'Solar inverters operate under intense tropical heat and require periodic heat sink cleaning, cooling fan maintenance, DC switch testing, and grid code firmware updates to ensure maximum MPPT tracking efficiency.',
        deliverables: [
          'Inverter internal heatsink vacuum cleaning and cooling fan speed testing',
          'DC disconnector, surge protection device (SPD), and fuse contact resistance testing',
          'Manufacturer-certified firmware upgrades for updated grid-connection parameters',
          'Rapid inverter warranty exchange service from our Clark/Pampanga depot',
        ],
        tag: 'INVERTER CARE',
      },
      {
        id: 'genset-sync',
        title: 'Zero-Export & Generator Fuel-Saver Tuning',
        subtitle: 'Seamless Hybrid Microgrid Coordination',
        description:
          'When the utility grid goes down, your solar array must run harmoniously with backup diesel generators without sending reverse power into the genset alternator. We calibrate Zero-Export controllers and fuel-saver controllers.',
        deliverables: [
          'Current transformer (CT) calibration and rapid response zero-export testing',
          'Diesel generator reverse power protection trip testing (< 2% threshold)',
          'Dynamic ramp-rate tuning to maintain stable voltage and frequency during motor startup',
          'Net-metering bi-directional meter testing and distribution utility compliance audits',
        ],
        tag: 'GENSET & ZERO-EXPORT',
      },
      {
        id: 'performance-audits',
        title: 'Plant Performance Ratio (PR) & SCADA Audits',
        subtitle: 'Yield Optimization & Financial Return',
        description:
          'We monitor your solar system telemetry 24/7. When a string drops in output or an inverter experiences a grid trip, our cloud analytics flag the issue immediately, ensuring your plant delivers its projected Return on Investment.',
        deliverables: [
          'Monthly generation vs. irradiance performance ratio (PR) benchmarking reports',
          'String-level underperformance detection and shading analysis',
          'Grounding resistance testing (< 5 ohms) and lightning arrestor inspection',
          'Annual carbon offset and kilowatt-hour financial savings certification',
        ],
        tag: 'PERFORMANCE & SCADA',
      },
    ],
    checklist: [
      {
        category: 'Solar Modules & Rooftop Arrays',
        interval: 'Quarterly',
        items: [
          'Wash PV module surface using non-abrasive deionized water and soft brushes',
          'Inspect glass surfaces for micro-cracks, snail trails, or delamination',
          'Verify mounting clamp bolt torque (12–15 Nm) on structural roof purlins',
          'Inspect DC string cabling for UV degradation, sagging, or rodent damage',
        ],
      },
      {
        category: 'Inverters & Balance of System (BOS)',
        interval: 'Bi-Annual',
        items: [
          'Inspect inverter cooling fans, air inlet filters, and heat sink fins',
          'Perform FLIR thermal imaging scan on DC combiner boxes and AC disconnect terminals',
          'Test Type II AC/DC surge protection devices (SPDs) and inspect status indicator flags',
          'Measure string open-circuit voltage (Voc) and verify balance across parallel strings',
        ],
      },
      {
        category: 'Zero-Export & Generator Synchronization',
        interval: 'Bi-Annual',
        items: [
          'Simulate utility grid outage to test automatic transfer and solar-genset hybrid throttling',
          'Verify that zero-export controller restricts inverter generation during low-load farm conditions',
          'Calibrate primary CT ratios and verify meter communication via Modbus/RS485',
          'Inspect generator reverse-power protection relay functionality',
        ],
      },
      {
        category: 'Grounding, Lightning Protection & SCADA',
        interval: 'Annual',
        items: [
          'Measure system earth grounding resistance with fall-of-potential tester (must be < 5 ohms)',
          'Inspect lightning air terminals and down conductors for corrosion and continuity',
          'Calibrate solar irradiance pyranometer and ambient / module temperature sensors',
          'Review complete annual energy yield against PVsyst financial feasibility benchmarks',
        ],
      },
    ],
    slaTiers: [
      {
        severity: 'Tier 1: Total Array / Inverter Trip',
        level: 'Critical',
        responseTime: '2–4 Hours Triage / < 24h On-Site',
        scope: 'Total solar generation loss, main inverter fault code, or hazardous DC arc-fault detection.',
        action: 'Immediate remote telemetry interrogation + emergency technician dispatch for on-site diagnostic or warranty swap.',
      },
      {
        severity: 'Tier 2: Single String / Zero-Export Drift',
        level: 'Elevated',
        responseTime: '24–48 Hours',
        scope: 'Individual PV string blown fuse, generator sync communication lag, or monitoring gateway offline.',
        action: 'Remote troubleshooting or technician dispatched with replacement fuses, CTs, or communication cards.',
      },
      {
        severity: 'Tier 3: Routine O&M, Washing & Scans',
        level: 'Scheduled',
        responseTime: 'Scheduled Window',
        scope: 'Quarterly panel washing, FLIR infrared scans, structural torque audits, and PR reports.',
        action: 'Executed according to planned O&M calendar coordinated with farm biosecurity schedules.',
      },
    ],
    sparePartsHub: [
      'Tier-1 string inverters and rapid-replacement warranty spare units in Pampanga warehouse',
      'High-efficiency monocrystalline solar panels matching original electrical characteristics',
      'DC fuses (15A/20A/30A 1000V/1500V), MC4 connectors, and DC isolator switches in stock',
      'Zero-Export smart meters, current transformers (CTs), and RS485 communication gateways',
    ],
    faqs: [
      {
        q: 'How frequently should solar panels be cleaned on a poultry farm or feedmill?',
        a: 'Because poultry house exhaust fans emit airborne dust, feathers, and organic compounds, rooftop panels situated near fan cones should be cleaned every 60 to 90 days. Regular washing prevents permanent hotspot damage and recovers 15% to 25% of lost energy generation.',
      },
      {
        q: 'What happens if a solar inverter fails under warranty?',
        a: 'As an authorized Tier-1 engineering partner, CCDI carries replacement inverters in our Pampanga logistics hub. In the event of a warranty failure, we can deploy an immediate swap unit to restore solar production without waiting weeks for overseas manufacturer RMA processing.',
      },
      {
        q: 'Can solar power damage my backup diesel generator during sudden load drops?',
        a: 'Only if the system lacks proper Zero-Export and Generator Fuel-Saver controls. CCDI installs rapid-response dynamic throttling controllers that limit solar generation so the generator maintains a healthy minimum load (typically 30%), completely preventing reverse power flow.',
      },
      {
        q: 'Does CCDI provide certified O&M contracts for existing agricultural solar installations?',
        a: 'Yes. We provide full Operations & Maintenance (O&M) contracts for existing commercial and agricultural solar systems across the Philippines, including scheduled thermal scanning, panel washing, electrical testing, and performance monitoring.',
      },
    ],
  },
};
