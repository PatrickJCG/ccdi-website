/**
 * Hatchery Solutions Image Catalog
 * 
 * Maps the product card images from public/images/hatchery/ to each hatchery solution component.
 */

export const HATCHERY_IMAGES = {
  // ── 1. FACILITY BLUEPRINT LAYOUT ───────────────────────────────────────────
  blueprint: '/images/hatchery/facility-blueprint-layout.png',

  // ── 2. INCUBATION SYSTEM ───────────────────────────────────────────────────
  incubation: {
    singleStageIncubation: '/images/hatchery/Single-stage Large Box Type Incubation.png',
    singleStageHatcher: '/images/hatchery/Single-stage Large Box Type Hatcher.png',
    airCirculationHatcher: '/images/hatchery/Air Circulation Hatcher.png',
    tunnelIncubator: '/images/hatchery/Multi-stage Tunnel Incubator.png',
    honorIncubator: '/images/hatchery/Honor 115200 Series Incubator.png',
    honorHatcher: '/images/hatchery/Honor19200 Series Hatcher.png',
  },

  // ── 3. AUTOMATED EGG HANDLING & AI CANDLING ───────────────────────────────
  eggHandling: {
    // Egg Handling System
    systemOverview: '/images/hatchery/Egg Handling System.png',
    bigEndsUpPositioning: '',       // Included in composite diagram above
    weighingAndGrading: '',         // Included in composite diagram above
    aiIdentification: '',           // Included in composite diagram above
    autoLoadOntoTrolley: '',        // Included in composite diagram above
    eggAutomaticLoading: '',        // Included in composite diagram above

    // Egg Candling & Transferring System: Single Line Configuration
    singleLineOverview: '/images/hatchery/Egg Candling and Transferring System (Single Line).png',
    singleLineRobotTransfer: '',
    singleLineTrayWasher: '',
    singleLineTrayStacking: '',
    singleLineTrayTransfer: '',
    singleLineAiCandling: '',
    singleLineInfertileRemoval: '',

    // Egg Candling & Transferring System: Double Line Configuration
    doubleLineOverview: '/images/hatchery/Egg Candling and Transferring System (Double Line).png',
    doubleLineTrayTransfer: '',
    doubleLineRobotTransfer: '',
    doubleLineTrayWashingStacking: '',
    doubleLineAiCandling: '',
    doubleLineInfertileRemoval: '',
  },

  // ── 4. AUTOMATED CHICK HANDLING SYSTEM ────────────────────────────────────
  chickHandling: {
    // For White Feather Broiler
    broilerLineOverview: '/images/hatchery/Day-old Chick Handling System (For White Feather Broiler).png',
    broilerBasketDestacking: '',
    broilerBasketStacking: '',
    broilerImmunizationPlatform: '',
    broilerIdentificationCarousel: '',
    broilerHatcherBasketStacking: '',
    broilerBasketRollingOver: '',
    broilerSetterTrayTransfer: '',

    // For Layer
    layerLineOverview: '/images/hatchery/Day-old Chick Handling System (For Layer).png',
    layerBasketRollingOver: '',
    layerHatcherBasketDestacking: '',
    layerManualPickupBench: '',
    layerWeakChickSelection: '',
    layerHatcherBasketStacking: '',
    layerHatcherBasketWasher: '',
    layerChickShellSeparation: '',
  },

  // ── 5. HATCHERY HVAC SYSTEM ────────────────────────────────────────────────
  hvac: {
    mechanicalRoomSystem: '/images/hatchery/Mechanical Room System.png',
    airConditioningController: '/images/hatchery/Air Conditioning System.jpg',
    embryoHeatRecovery: '/images/hatchery/Embryo Heat Recovery System.jpg',
    freshAirSystem: '/images/hatchery/Fresh Air System.jpg',
    airSupplyInverter: '',
    humidifier: '',
    ecFan: '',
    humidificationValve: '',
    proportionalControlValve: '',
  },

  // ── 6. INTELLIGENT HATCHERY MANAGEMENT ─────────────────────────────────────
  management: {
    centralizedAlarmDashboard: '/images/hatchery/Centralized Admin Dashboard.png',
    intelligentManagementCenter: '/images/hatchery/Intelligent Management Center.png',
    equipmentMonitoringModule: '',
    energyManagementModule: '',
    operationMaintenanceModule: '',
    productionManagementModule: '',
    perceptionIncubation: '',
    perceptionAutomation: '',
    perceptionLogistics: '',
    perceptionHvac: '',
    perceptionAuxiliary: '',
    centralNodesDiagram: '',
  },

  // ── 7. WASTE DISPOSAL SYSTEM ───────────────────────────────────────────────
  wasteDisposal: {
    siloSystem: '/images/hatchery/Water Disposal System.png',
  },
};
