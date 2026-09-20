import React from 'react';

export type SolutionCategory =
  | 'poultry-breeding'
  | 'poultry'
  | 'broiler'
  | 'broiler-breeder'
  | 'layer'
  | 'hatchery'
  | 'feedmill'
  | 'solar';

export interface TurnkeyPhase {
  num: string;
  title: string;
  desc: string;
  deliverable: string;
  image: string;
}

interface CategoryConfig {
  tag: string;
  title: string;
  subtitle: string;
  phases: TurnkeyPhase[];
}

const CATEGORY_APPROACH_CONFIG: Record<SolutionCategory, CategoryConfig> = {
  'poultry': {
    tag: 'INTEGRATED POULTRY INFRASTRUCTURE',
    title: 'Turnkey Poultry Engineering & Execution',
    subtitle:
      'From master site planning and bio-secure structural erection to specialized broiler, breeder, and layer equipment commissioning, CCDI delivers single-source accountability.',
    phases: [
      {
        num: '01',
        title: 'Site Selection & Biosecurity Zoning',
        desc: 'Topographical appraisal, prevailing wind assessment, isolation buffer zones, and water availability validation for commercial poultry.',
        deliverable: 'Biosecurity & Wind Risk Assessment',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '02',
        title: 'Master Layout & Aerodynamic Engineering',
        desc: 'Optimized spacing between houses to avoid ventilation exhaust recirculation, clear bird traffic flow, and storm drainage planning.',
        deliverable: 'Master Plan & Airflow Simulation',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '03',
        title: 'Structural Steel & Insulated Envelope',
        desc: 'High-tensile Q355B H-beam steel fabrication, hot-dip galvanized purlins, and 50mm airtight PU sandwich panel cladding.',
        deliverable: 'Typhoon-Rated Prefab Structural Kit',
        image: '/images/breeder/american-type-3d.png',
      },
      {
        num: '04',
        title: 'Equipment & Climate Installation',
        desc: 'Integration of automated pan/chain feeding lines, closed nipple drinkers, tunnel cone fans, and Munters-style evaporative pads.',
        deliverable: 'Automated Microclimate & Feeding Lines',
        image: '/images/capabilities/poultry-facility.jpg',
      },
      {
        num: '05',
        title: 'Commissioning & Telemetry Calibration',
        desc: 'Smoke testing airtightness, static pressure calibration, IoT environmental alarm setup, and electrical load balancing.',
        deliverable: 'Commissioning Certificate & IoT Activation',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '06',
        title: 'Flock Placement & Lifetime Support',
        desc: 'On-site technical supervision during first brooding cycle, farm staff training, preventative maintenance, and spare parts inventory.',
        deliverable: 'O&M Manuals & 24/7 Service Hotline',
        image: '/images/breeder/american-type-interior.jpg',
      },
    ],
  },
  'broiler': {
    tag: 'HIGH-DENSITY BROILER HOUSING',
    title: 'Broiler Turnkey Execution Process',
    subtitle:
      'Engineering high-density climate-controlled broiler houses designed for optimal FCR, low mortality, and rapid 10-day flock turnaround.',
    phases: [
      {
        num: '01',
        title: 'Site Civil & Foundation Engineering',
        desc: 'Heavy reinforced slab foundations or elevated pier columns with deep drainage troughs engineered for high load-bearing soils.',
        deliverable: 'Foundation Blueprint & Concrete Core Tests',
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '02',
        title: 'Insulated Envelope & Airtight Sealing',
        desc: '50mm continuous PU sandwich wall panels, airtight ceiling insulation, and motorized tunnel inlet doors to guarantee negative pressure.',
        deliverable: 'Airtight Insulated Building Envelope',
        image: '/images/capabilities/poultry-facility.jpg',
      },
      {
        num: '03',
        title: 'Feeding & Drinking Line Rigging',
        desc: 'Suspended automated pan feeding networks, high-flow stainless steel nipple drinker pipes, and central winch hoist rigging.',
        deliverable: 'Winchable Feed & Drink Infrastructure',
        image: '/images/breeder/american-type-interior.jpg',
      },
      {
        num: '04',
        title: 'Tunnel Ventilation & Pad Wall Setup',
        desc: '50" and 54" butterfly cone exhaust fans, 150mm cellulose cooling pads, stainless gutters, and emergency generator auto-transfer.',
        deliverable: 'Negative-Pressure Tunnel Cooling',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '05',
        title: 'Microclimate Computer Tuning',
        desc: 'Multi-stage climate controller programming based on broiler age growth curves (temperature, humidity, ventilation ramps).',
        deliverable: 'Calibrated Growth Automation Profile',
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '06',
        title: 'Catching & Sanitation Turnover Handover',
        desc: 'Commissioning end-wall bird catching roll-up doors, skid-steer manure access paths, and hot-wash high pressure protocols.',
        deliverable: 'Operational Handover & Cleanout SOP',
        image: '/images/breeder/american-type-3d.png',
      },
    ],
  },
  'broiler-breeder': {
    tag: 'PARENT STOCK ENGINEERING',
    title: 'Broiler Breeder Turnkey Approach',
    subtitle:
      'Precision architectural planning for parent stock poultry breeding with American 1/3 slat or European 2/3 slat housing, community nests, and separate-sex feeding.',
    phases: [
      {
        num: '01',
        title: 'Site Selection & Biosecurity Layout',
        desc: 'Selecting high-isolation terrain, biosecurity zoning, clean/dirty separation corridors, and parent stock biosecurity shower-in facilities.',
        deliverable: 'Breeder Biosecurity Perimeter CAD',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '02',
        title: 'Breeder Slat & Scratch Floor Design',
        desc: 'Architectural drafting of 1/3 slat (lateral nest) or 2/3 slat (central community nest) layout with durable plastic slats.',
        deliverable: 'Slatted Floor & Scratch Area Blueprints',
        image: '/images/breeder/american-type-3d.png',
      },
      {
        num: '03',
        title: 'Automated Nest & Egg Conveyor Assembly',
        desc: 'Installing automatic community nest boxes, variable speed egg collection belts, and soft silicone de-escalator arms.',
        deliverable: 'Zero-Crack Automatic Egg Collection',
        image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '04',
        title: 'Separate Sex Feeding Network',
        desc: 'Specialized female breeder pan/chain loops with male exclusion grills and dedicated high-suspended male feeder lines.',
        deliverable: 'Sex-Separate Feeding Lines',
        image: '/images/breeder/american-type-interior.jpg',
      },
      {
        num: '05',
        title: 'Climate & Photoperiod Automation',
        desc: 'Tunnel ventilation synchronized with light-tight baffles and dimmable ovulation-stimulating photoperiod timers.',
        deliverable: 'Hatching Egg Climate Control System',
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '06',
        title: 'Commissioning & Hatching Egg Handover',
        desc: 'Trial runs of egg belts, climate smoke tests, feed uniformity weighing, and on-site operator certification.',
        deliverable: 'Breeder Facility Certification',
        image: '/images/capabilities/poultry-facility.jpg',
      },
    ],
  },
  'layer': {
    tag: 'COMMERCIAL EGG PRODUCTION',
    title: 'Commercial Layer Turnkey Execution',
    subtitle:
      'Engineering high-capacity multi-tier battery cage housing with automated egg collection, longitudinal manure drying belts, and traveling hoppers.',
    phases: [
      {
        num: '01',
        title: 'High-Load Foundation & Barn Clearance',
        desc: 'Deep reinforced concrete foundation slabs engineered to bear multi-tier vertical steel battery cage point loads up to 4.2m ceiling heights.',
        deliverable: 'Multi-Tier Load-Bearing Foundation',
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '02',
        title: 'Vertical Battery Cage Frame Erection',
        desc: 'Assembling hot-dip galvanized H-frame cage banks (3 to 8 tiers) with longitudinal catwalk inspection decks and sloped egg floors.',
        deliverable: '80,000+ Capacity Cage Structure',
        image: '/images/capabilities/poultry-facility.jpg',
      },
      {
        num: '03',
        title: 'Egg Collection & Vertical Elevator Lift',
        desc: 'Synchronizing woven PP egg collection belts across all tiers into multi-level vertical lift elevators leading to egg packing corridors.',
        deliverable: 'Automated 30,000 Egg/h Conveyance',
        image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '04',
        title: 'PP Manure Belt & In-Barn Air Drying Setup',
        desc: 'Installing friction-resistant polypropylene manure belts under each tier with cross-discharge conveyors and pre-drying perforated air ducts.',
        deliverable: 'Automated Odor-Free Manure Removal',
        image: '/images/capabilities/feedmill-facility.jpg',
      },
      {
        num: '05',
        title: 'Traveling Hopper & Photoperiod Lighting',
        desc: 'Commissioning traveling gantry feed dispensers for millimeter-even rations and IP67 dimmable 2700K ovulation spectrum LED tubes.',
        deliverable: 'Automated Feeding & Ovulation Lighting',
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '06',
        title: 'Packing Room Integration & Staff Training',
        desc: 'Connecting cross-conveyors to sorting, grading, and packing tables with full operational training for egg farm teams.',
        deliverable: 'Complete Turnkey Layer Commissioning',
        image: '/images/breeder/american-type-3d.png',
      },
    ],
  },
  'poultry-breeding': {
    tag: 'FULL-CYCLE EXECUTION',
    title: 'Our End-to-End Turnkey Approach',
    subtitle:
      'From site selection and civil foundations to equipment installation, personnel training, and after-sales support, CCDI manages every phase with total accountability.',
    phases: [
      {
        num: '01',
        title: 'Site Selection',
        desc: 'In choosing the right location, we guide you in identifying important factors such as biosecurity, topography, water availability, and long-term expansion and sustainability.',
        deliverable: 'Biosecurity & Terrain Appraisal',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '02',
        title: 'Strategic Layout Planning',
        desc: 'Our team develops a systematic design and arrangement of poultry farm components to enhance biosecurity, operational efficiency, bird comfort, environmental control, and future expansion.',
        deliverable: 'Master Layout & Zoning CAD',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '03',
        title: 'Architectural Engineering Designs',
        desc: 'Our expertise lies in developing integrated designs that strategically combines architectural, structural, mechanical, installation, and utility designs tailored to the chosen poultry production system.',
        deliverable: '3D CAD & Typhoon-Rated Blueprints',
        image: '/images/breeder/american-type-3d.png',
      },
      {
        num: '04',
        title: 'Civil Work and Prefab Installation',
        desc: 'We handle construction of foundations and structures using a combination of conventional civil works and factory-manufactured, pre-engineered components for speed, quality, and cost efficiency.',
        deliverable: 'Q355B Steel Framing & Foundations',
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '05',
        title: 'Equipment Installation',
        desc: 'We precisely install equipment and commissioning of mechanical, electrical, and automated systems according to approved designs, manufacturer specifications, and industry standards to uphold biosecurity and animal welfare.',
        deliverable: 'Automated Feed, Drink & Climate Lines',
        image: '/images/breeder/american-type-interior.jpg',
      },
      {
        num: '06',
        title: 'Commissioning',
        desc: 'Our team follows a comprehensive testing and validation to ensure all equipment and systems are fully integrated, performing, compliant, and ready before full-scale operation begins.',
        deliverable: 'Airflow & Static Pressure Testing',
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '07',
        title: 'Personnel Training',
        desc: 'We provide training programs to equip your farm staff with the right knowledge, practical skills, procedures, and standards needed to efficiently and safely operate various production systems.',
        deliverable: 'SOP Manuals & Controller Training',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '08',
        title: 'After-Sales Service & Support',
        desc: 'At CCDI, our commitment continuous as we offer an ongoing technical support, advisory services, performance monitoring, maintenance assistance, and spare parts support even after project completion.',
        deliverable: 'CCDI Preventive Maintenance & Spares',
        image: '/images/capabilities/poultry-facility.jpg',
      },
    ],
  },
  hatchery: {
    tag: 'FULL-CYCLE EXECUTION',
    title: 'Our End-to-End Turnkey Approach',
    subtitle:
      'From cleanroom biosecurity site zoning to single-stage setter calibration, ventilation commissioning, and staff training, CCDI delivers turnkey hatchery plants with total accountability.',
    phases: [
      {
        num: '01',
        title: 'Site Selection',
        desc: 'Comprehensive appraisal evaluating environmental isolation, biological buffer zones, water quality testing, utility supply, and prevailing wind vector analysis for optimal hatchery biosecurity.',
        deliverable: 'Biosecure Parcel & Water Purity Survey',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '02',
        title: 'Strategic Layout Planning',
        desc: 'Designing strict unidirectional airflow workflows (egg receipt → setting → candling → hatching → chick processing) preventing cross-contamination and maximizing operator ergonomics.',
        deliverable: 'Unidirectional Workflow CAD Masterplan',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '03',
        title: 'Architectural Engineering Designs',
        desc: 'Cleanroom HVAC blueprints, positive air pressure differential schedules, HEPA filtration integration, and sealed envelope thermodynamics tailored to high-density incubation.',
        deliverable: 'Cleanroom HVAC & Mechanical Schematics',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '04',
        title: 'Civil Work and Prefab Installation',
        desc: 'Constructing antibacterial seamless epoxy floors, coved sanitary wall bases, PIR insulated cleanroom sandwich panels, and vapor-tight ceiling envelopes for effortless disinfection.',
        deliverable: 'Sanitary Envelope & Epoxy Slab Fit-out',
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '05',
        title: 'Equipment Installation',
        desc: 'Precision leveling and installation of single-stage incubation setters, automated egg turning mechanisms, hatchers, candling tables, and sexing carousel conveyor lines.',
        deliverable: 'Single-Stage Setters & Automation Assembly',
        image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '06',
        title: 'Commissioning',
        desc: 'Multi-point temperature mapping (±0.1°F), relative humidity ultrasonic calibration, differential room pressure balancing, and emergency backup generator automatic failover validation.',
        deliverable: 'Microclimate Calibration & Validation Report',
        image: 'https://images.unsplash.com/photo-1565071783230-fe28b5d3c0d6?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '07',
        title: 'Personnel Training',
        desc: 'Hands-on operator training covering incubation program tuning, egg handling SOPs, clean-in-place (CIP) washdown procedures, and emergency alarm response protocols.',
        deliverable: 'Hatchery Operator SOP Certification',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '08',
        title: 'After-Sales Service & Support',
        desc: 'Ongoing technical advisory, hatchability percentage analytics review, quarterly preventative maintenance on setters, and guaranteed local stocked spare parts availability.',
        deliverable: 'Yield Optimization & Rapid Spares Support',
        image: '/images/capabilities/hatchery-facility.jpg',
      },
    ],
  },
  feedmill: {
    tag: 'FULL-CYCLE EXECUTION',
    title: 'Our End-to-End Turnkey Approach',
    subtitle:
      'From geotechnical soil testing and heavy concrete silo foundations to automated batching towers, commissioning, and preventive maintenance, CCDI manages every phase with total accountability.',
    phases: [
      {
        num: '01',
        title: 'Site Selection',
        desc: 'Geotechnical soil bearing capacity analysis for multi-thousand ton silo towers, proximity to national freight corridors, flood-line evaluation, and three-phase industrial power access.',
        deliverable: 'Geotechnical Borehole & Logistics Survey',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '02',
        title: 'Strategic Layout Planning',
        desc: 'Optimized plant flow design integrating bulk grain dump pits, corrugated grain silo parks, multi-level gravity processing tower, boiler house, and finished bagged/bulk feed logistics.',
        deliverable: 'Gravity Mill Tower & Logistics Layout',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '03',
        title: 'Architectural Engineering Designs',
        desc: 'High-strength structural steel framing engineering, seismic load calculations, explosion venting panels, dust collection schematics, and automated Motor Control Center (MCC) wiring.',
        deliverable: 'Structural Steel & Industrial MEP Blueprints',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '04',
        title: 'Civil Work and Prefab Installation',
        desc: 'Executing reinforced mass concrete foundations, deep piling for silo pedestals, and crane-assisted assembly of hot-dip galvanized structural steel processing towers.',
        deliverable: 'Deep Piled Foundations & Silo Pedestals',
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '05',
        title: 'Equipment Installation',
        desc: 'Rigging and precision mechanical alignment of high-torque hammer mills, twin-shaft micro-dosing paddle mixers, ring-die pellet presses, counter-flow coolers, and bucket elevators.',
        deliverable: 'Heavy Milling, Mixing & Pelleting Rigging',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '06',
        title: 'Commissioning',
        desc: 'Comprehensive dry-run sequence testing, batch weighing load-cell calibration (±0.1%), steam boiler conditioning balancing, and automated SCADA PLC formulation trial runs.',
        deliverable: 'Batching Calibration & Full-Load Trial Milling',
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '07',
        title: 'Personnel Training',
        desc: 'Structured training programs for plant engineers and operators covering formulation software, die wear replacement, hammer balancing, dust filtration, and safety interlocks.',
        deliverable: 'SCADA Automation & Safety Operations Manuals',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '08',
        title: 'After-Sales Service & Support',
        desc: 'Continuous engineering support including ring-die refurbishment, replacement beaters and screen meshes, predictive vibration monitoring, and scheduled plant shutdown maintenance.',
        deliverable: 'Scheduled Maintenance & Wear-Part Logistics',
        image: '/images/capabilities/feedmill-facility.jpg',
      },
    ],
  },
  solar: {
    tag: 'FULL-CYCLE EXECUTION',
    title: 'Our End-to-End Turnkey Approach',
    subtitle:
      'From solar irradiance site feasibility and net-metering grid interconnection to commercial PV installation, SCADA telemetry commissioning, and lifetime service, CCDI delivers turnkey energy solutions.',
    phases: [
      {
        num: '01',
        title: 'Site Selection',
        desc: 'Rooftop structural load-bearing inspection, 3D drone shadow profiling, solar irradiance GIS modeling, and local utility distribution grid capacity appraisal for net-metering approval.',
        deliverable: 'Solar Irradiance & Structural Roof Audit',
        image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '02',
        title: 'Strategic Layout Planning',
        desc: 'Engineering optimal PV string configurations, azimuth and tilt angles, maintenance walkway clearances, and placement of string inverters and battery energy storage containers.',
        deliverable: 'PV Array String & Equipment Placement Plan',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '03',
        title: 'Architectural Engineering Designs',
        desc: '280 kph typhoon wind-uplift structural calculations, electrical Single-Line Diagrams (SLD), protection coordination, and complete regulatory utility net-metering filing packages.',
        deliverable: 'Typhoon Structural & Electrical SLD Packages',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '04',
        title: 'Civil Work and Prefab Installation',
        desc: 'Installing non-penetrating anodized aluminum standing-seam roof clamps, galvanized cable trays, outdoor concrete equipment pads, and grounding grid networks.',
        deliverable: 'Racking Assembly & Substation Grounding Pads',
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '05',
        title: 'Equipment Installation',
        desc: 'Fastening Tier-1 N-Type TOPCon bifacial modules, mounting commercial IP66 string inverters, and integrating industrial LiFePO4 battery storage units and automatic transfer switches.',
        deliverable: 'Tier-1 PV Modules & Inverter Rigging',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '06',
        title: 'Commissioning',
        desc: 'IV-curve tracing, thermal drone imaging for cell hotspots, insulation resistance Megger testing, harmonic distortion analysis, and utility net-metering grid synchronization.',
        deliverable: 'Grid Interconnection & IV-Curve Certification',
        image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '07',
        title: 'Personnel Training',
        desc: 'Training client facility engineers on cloud SCADA dashboard monitoring, emergency DC disconnect procedures, battery safety management, and string-level fault isolation.',
        deliverable: 'SCADA Portal & High-Voltage Safety Manuals',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      },
      {
        num: '08',
        title: 'After-Sales Service & Support',
        desc: '24/7 cloud generation monitoring, annual infrared thermography audits, module cleaning maintenance schedules, performance ratio guarantees, and 25-year panel warranty support.',
        deliverable: 'Lifetime SCADA Telemetry & Warranty Management',
        image: '/images/capabilities/solar-facility.jpg',
      },
    ],
  },
};

export interface CategoryEndToEndApproachProps {
  category: SolutionCategory;
}

export const CategoryEndToEndApproach: React.FC<CategoryEndToEndApproachProps> = ({ category }) => {
  const config = CATEGORY_APPROACH_CONFIG[category];

  return (
    <section className="relative py-24 sm:py-32 bg-slate-50 text-slate-900 border-b border-slate-200 overflow-hidden font-sans">
      {/* Architectural Top-Right Corner Accent */}
      <img
        src="/images/accents/card-corner-accent.png"
        alt=""
        className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
            {config.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
            {config.title}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {config.subtitle}
          </p>
        </div>

        {/* 8-Step Process Grid with Step & Category Specific Photography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.phases.map((step) => (
            <div
              key={step.num}
              className="bg-white border border-slate-200 rounded-[2px] shadow-xs flex flex-col justify-between overflow-hidden hover:border-amber-400 hover:shadow-md transition-all duration-300 group"
            >
              {/* Category & Step Specific Image Banner */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={step.image}
                  alt={`${step.title} - Phase ${step.num}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                <span className="absolute bottom-2.5 left-3 font-mono text-[11px] font-black text-amber-400 bg-slate-950/85 backdrop-blur-xs px-2.5 py-0.5 rounded-[2px] border border-amber-400/30 shadow-xs">
                  PHASE {step.num}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-sans text-base font-bold text-slate-900 leading-snug group-hover:text-amber-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                {/* Deliverable Micro-Badge */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span className="truncate">{step.deliverable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
