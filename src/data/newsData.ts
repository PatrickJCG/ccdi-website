/**
 * ============================================================================
 * CCDI NEWS & UPDATES - CONTENT DIRECTORY
 * ============================================================================
 * 
 * TO ADD A NEW ENTRY:
 * 1. Copy the "TEMPLATE ENTRY" below.
 * 2. Paste it at the top of the `NEWS_ARTICLES` array.
 * 3. Fill in your title, date, category, summary, content, and image.
 * 
 * HOW TO ADD IMAGES:
 * - Option A (Recommended): Place your photo or project folder in `public/images/news/`
 *   and set `imageUrl: '/images/news/your-image-filename.jpg'`.
 * - Option B: Use an existing site image (e.g. `'/images/broiler/climate-system.jpg'`).
 * - Option C: Use any online web URL (e.g. `'https://images.unsplash.com/...'`).
 * 
 * TO EDIT AN ENTRY:
 * - Simply update the text, bullet points, or imageUrl in any article below.
 * 
 * TO DELETE AN ENTRY:
 * - Delete or comment out the article object in the `NEWS_ARTICLES` array.
 * 
 * TEMPLATE ENTRY (Copy & Paste this to add a new article):
 * ----------------------------------------------------------------------------
 * {
 *   id: 'unique-article-slug',
 *   title: 'Article Headline Here',
 *   date: 'Month DD, YYYY',
 *   category: 'Events & Exhibitions', // Options: 'Events & Exhibitions' | 'Technology & Equipment' | 'Technical Services' | 'Project Milestone' | 'Partnerships & EPC' | 'After-Sales & Supply'
 *   projectStatus: 'Finished Project', // Optional: 'Finished Project' | 'Ongoing Project'
 *   location: 'City / Province, Philippines', // Optional project location
 *   summary: 'A short 1-2 sentence preview that appears on the news card.',
 *   imageUrl: '/images/news/your-image-name.jpg',
 *   readTime: '3 min read',
 *   featured: false, // Set to true to highlight this article as the hero spotlight
 *   author: {
 *     name: 'CCDI Engineering Team',
 *     role: 'Technical & Construction Services',
 *   },
 *   keyHighlights: [
 *     'Key takeaway or feature bullet point 1',
 *     'Key takeaway or feature bullet point 2',
 *   ],
 *   tags: ['Tag 1', 'Tag 2'],
 *   content: [
 *     'First paragraph of the full article...',
 *     'Second paragraph of the article...',
 *   ],
 *   externalLink: 'https://www.facebook.com/ccdi.asia', // Optional reference or Facebook link
 * },
 * ----------------------------------------------------------------------------
 */

export type NewsCategory =
  | 'Events & Exhibitions'
  | 'Technology & Equipment'
  | 'Technical Services'
  | 'Project Milestone'
  | 'Partnerships & EPC'
  | 'After-Sales & Supply'
  | (string & {});

export type ProjectStatus = 'Finished Project' | 'Ongoing Project';

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: NewsCategory;
  projectStatus?: ProjectStatus;
  location?: string;
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
  externalLink?: string;
  galleryImages?: {
    url: string;
    caption?: string;
  }[];
}

export const NEWS_CATEGORIES = [
  'All',
  'Project Milestone',
  'Events & Exhibitions',
  'Technology & Equipment',
  'Technical Services',
  'Partnerships & EPC',
  'After-Sales & Supply',
] as const;

export const CCDI_CONTACT_INFO = {
  phones: ['+63 918 068 5971', '+63 998 863 2981'],
  email: 'inquiries@ccdi-asia.com',
  facebook: 'facebook.com/ccdi.asia',
  facebookUrl: 'https://www.facebook.com/ccdi.asia',
};

export interface HeaderBackgroundImage {
  url: string;
  caption?: string;
  objectPosition?: string;
}

/**
 * Background images for the header (hero) carousel of the News & Updates page.
 * Add, reorder, or edit image paths and captions below.
 */
export const NEWS_PAGE_HEADER_IMAGES: HeaderBackgroundImage[] = [
  {
    url: '/images/news/finished-multi-tier-broiler-cage-iloilo/01-multi-tier-cage-system.webp',
    caption: 'Finished Project: Multi-Tier Broiler Cage System in Iloilo',
    objectPosition: 'center center',
  },
  {
    url: '/images/news/finished-ycp-farm-solar-project/01-solar-array-front-poultry-houses.webp',
    caption: 'Finished Project: YCP Farm Ground-Mounted Solar PV System',
    objectPosition: 'center center',
  },
  {
    url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/01-interior-steel-structure-slab.webp',
    caption: 'Ongoing Project: Broiler Auto-Harvest Facility in Jala-Jala, Rizal',
    objectPosition: 'center center',
  },
  {
    url: '/images/news/ongoing-layer-with-solar-gerona-tarlac/01-steel-columns-foundation-gerona-tarlac.webp',
    caption: 'Ongoing Project: Layer House with Solar Integration in Gerona, Tarlac',
    objectPosition: 'center center',
  },
  {
    url: '/images/news/bulacan-single-stage-setter.png',
    caption: 'Single-Stage Setter Hatchery Project in Bulacan (322,560 eggs/week)',
    objectPosition: 'center 35%',
  },
  {
    url: '/images/news/agrilink-team-beige.jpg',
    caption: 'CCDI & Tai Chi Newtech Team at Agrilink 2026 Exhibition',
    objectPosition: 'center 25%',
  },
  {
    url: '/images/news/agrilink-booth-2.jpg',
    caption: 'CCDI Executive & Engineering Representatives',
    objectPosition: 'center 20%',
  },
  {
    url: '/images/news/livestock-philippines-2026.jpg',
    caption: 'CCDI & EI Farming at Livestock Philippines Expo 2026',
    objectPosition: 'center 25%',
  },
];

export const NEWS_PAGE_HEADER_IMAGE = '/images/news/finished-multi-tier-broiler-cage-iloilo/01-multi-tier-cage-system.webp';
export const NEWS_HEADER_FALLBACK_IMAGE = '/images/capabilities/poultry-facility.jpg';

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'multi-tier-broiler-cage-project-iloilo',
    title: 'Multi-Tier Broiler Cage Project | CCDI Finished Project in Iloilo',
    date: 'November 2026',
    category: 'Project Milestone',
    projectStatus: 'Finished Project',
    location: 'Iloilo, Philippines',
    summary:
      'CCDI successfully completed and turned over a commercial multi-tier broiler cage facility in Iloilo equipped with automated feeding, nipple drinking, manure belt removal, tunnel ventilation, and smart climate controls.',
    imageUrl: '/images/news/finished-multi-tier-broiler-cage-iloilo/01-multi-tier-cage-system.webp',
    readTime: '4 min read',
    featured: true,
    author: {
      name: 'CCDI Project Engineering Team',
      role: 'Turnkey Poultry & Equipment Solutions',
    },
    keyHighlights: [
      'Completed commercial multi-tier broiler cage housing installation in Iloilo, Philippines.',
      'Equipped with automated feeding troughs, water pressure regulators, and 360° nipple drinkers with drip cups.',
      'Integrated polypropylene manure belt system with vertical cleaning controls and inclined cross-conveyor discharge.',
      'Full tunnel ventilation exhaust fan bank, insulated evaporative cooling pad baffle doors, heating units, and EI-6000PLUS climate controller.',
    ],
    tags: [
      'CCDI',
      'Iloilo',
      'Finished Project',
      'Multi-Tier Broiler Cage',
      'Tunnel Ventilation',
      'Automated Feeding',
      'Climate Control',
      'Poultry Solutions',
    ],
    content: [
      'Clarkbase Construction Dev\'t Inc. (CCDI) proudly shares the completion of our Multi-Tier Broiler Cage Project in Iloilo—engineered to maximize bird capacity per house footprint while maintaining superior flock uniformity, hygiene, and biosecurity.',
      'Inside the insulated housing structure, multiple vertical tiers of hot-dip galvanized cages integrate automated feed distribution troughs, zoned water pressure regulators, and accessible nipple drinking lines fitted with yellow catch cups over perforated manure belts.',
      'At the discharge end, automated vertical manure cleaning belts feed directly onto an enclosed stainless-steel cross-conveyor for hygienic waste removal, operated through dedicated localized safety panels and interlocks.',
      'Environmental stability is driven by a high-capacity bank of heavy-duty tunnel exhaust fans, insulated sidewall baffle inlets, integrated gas heating systems, and a centralized EI-6000PLUS climate controller room for continuous temperature, humidity, and airflow management.',
    ],
    galleryImages: [
      {
        url: '/images/news/finished-multi-tier-broiler-cage-iloilo/01-multi-tier-cage-system.webp',
        caption: 'Multi-tier broiler cage structure with automated water pressure regulators and feed lines',
      },
      {
        url: '/images/news/finished-multi-tier-broiler-cage-iloilo/02-cage-aisle-feeders-drinkers.webp',
        caption: 'Full-length broiler cage aisle showing continuous feed troughs and LED aisle lighting',
      },
      {
        url: '/images/news/finished-multi-tier-broiler-cage-iloilo/03-interior-slatted-floor-nipple-drinkers.webp',
        caption: 'Interior cage compartment featuring perforated flooring and dual-cup nipple drinker lines',
      },
      {
        url: '/images/news/finished-multi-tier-broiler-cage-iloilo/04-tunnel-ventilation-exhaust-fans.webp',
        caption: 'High-volume dual-tier tunnel ventilation exhaust fan wall',
      },
      {
        url: '/images/news/finished-multi-tier-broiler-cage-iloilo/05-climate-controller-control-room.webp',
        caption: 'Centralized electrical control cabinet and EI-6000PLUS smart climate controller',
      },
      {
        url: '/images/news/finished-multi-tier-broiler-cage-iloilo/06-heating-system-sidewall-inlets.webp',
        caption: 'Industrial gas heating unit mounted along the insulated poultry house corridor',
      },
      {
        url: '/images/news/finished-multi-tier-broiler-cage-iloilo/07-insulated-cooling-pad-baffle-doors.webp',
        caption: 'Automated cable-actuated sidewall air inlet and cooling baffle doors',
      },
      {
        url: '/images/news/finished-multi-tier-broiler-cage-iloilo/08-air-intake-corridor-trolleys.webp',
        caption: 'Insulated air-intake plenum corridor with stainless utility trolleys',
      },
      {
        url: '/images/news/finished-multi-tier-broiler-cage-iloilo/09-manure-belt-discharge-system.webp',
        caption: 'Multi-tier polypropylene manure belt discharge ends and drop-chute bays',
      },
      {
        url: '/images/news/finished-multi-tier-broiler-cage-iloilo/10-vertical-manure-cleaning-controls.webp',
        caption: 'Vertical manure cleaning control station and safety operating guidelines',
      },
      {
        url: '/images/news/finished-multi-tier-broiler-cage-iloilo/11-cross-conveyor-manure-removal.webp',
        caption: 'Automated inclined cross-conveyor belt and power cabinet for manure removal',
      },
    ],
    externalLink: 'https://www.facebook.com/ccdi.asia',
  },
  {
    id: 'ycp-farm-solar-project-finished',
    title: 'YCP Farm Solar Power Installation | CCDI Finished Project',
    date: 'October 2026',
    category: 'Project Milestone',
    projectStatus: 'Finished Project',
    location: 'YCP Farm, Philippines',
    summary:
      'CCDI completed the ground-mounted commercial solar PV installation at YCP Farm, delivering clean, reliable daytime power directly to tunnel-ventilated poultry houses to reduce farm operating expenses.',
    imageUrl: '/images/news/finished-ycp-farm-solar-project/01-solar-array-front-poultry-houses.webp',
    readTime: '3 min read',
    featured: false,
    author: {
      name: 'CCDI Solar & Energy Engineering',
      role: 'Agro-Industrial Solar Integration',
    },
    keyHighlights: [
      'Completed ground-mounted solar PV farm array supplying YCP Farm poultry operations.',
      'Engineered with reinforced concrete pier footings and heavy-duty galvanized steel racking.',
      'Positioned adjacent to tunnel-ventilated poultry houses to directly offset daytime fan and cooling loads.',
      'Designed for high wind resilience, minimal maintenance, and long-term OPEX reduction.',
    ],
    tags: [
      'CCDI',
      'YCP Farm',
      'Finished Project',
      'Solar Power Systems',
      'Agro-Industrial Solar',
      'Ground-Mount PV',
      'Clean Energy',
    ],
    content: [
      'CCDI has successfully completed the commercial ground-mounted solar power project at YCP Farm, strengthening energy resilience and lowering electricity overhead for continuous poultry production.',
      'Because tunnel-ventilated poultry houses experience peak electrical demand during sunny daytime hours when exhaust fans and evaporative cooling pumps operate at full capacity, solar generation aligns naturally with farm load curves.',
      'From concrete foundation trenching and structural steel mounting frames to full photovoltaic module installation and grid integration, CCDI executed the project end-to-end with typhoon-ready structural stability.',
      'Interested in reducing power expenses for your poultry, hatchery, or feedmill complex? Contact our engineering team for a customized farm solar load assessment.',
    ],
    galleryImages: [
      {
        url: '/images/news/finished-ycp-farm-solar-project/01-solar-array-front-poultry-houses.webp',
        caption: 'Dual ground-mounted solar PV rows positioned directly in front of tunnel-ventilated poultry houses',
      },
      {
        url: '/images/news/finished-ycp-farm-solar-project/02-solar-pv-rows-exhaust-fans.webp',
        caption: 'Clean solar array supplying daytime electricity to high-volume poultry exhaust systems',
      },
      {
        url: '/images/news/finished-ycp-farm-solar-project/03-ground-mount-solar-installation.webp',
        caption: 'Completed photovoltaic array mounted on elevated reinforced concrete footings',
      },
      {
        url: '/images/news/finished-ycp-farm-solar-project/04-wide-solar-field-overview.webp',
        caption: 'Wide view of the ground-mounted solar field adjacent to multiple poultry buildings',
      },
      {
        url: '/images/news/finished-ycp-farm-solar-project/05-solar-panels-and-farm-complex.webp',
        caption: 'YCP Farm solar field overlooking the multi-house agro-industrial complex',
      },
      {
        url: '/images/news/finished-ycp-farm-solar-project/06-concrete-pedestal-mounting-system.webp',
        caption: 'Concrete foundation beams and galvanized steel framing during array assembly',
      },
      {
        url: '/images/news/finished-ycp-farm-solar-project/07-full-array-panoramic-view.webp',
        caption: 'Finished PV rows oriented for maximum solar irradiance across the farm site',
      },
      {
        url: '/images/news/finished-ycp-farm-solar-project/08-civil-foundation-and-racking-works.webp',
        caption: 'On-site structural racking installation across reinforced concrete foundation rows',
      },
    ],
    externalLink: 'https://www.facebook.com/ccdi.asia',
  },
  {
    id: 'ongoing-broiler-auto-harvest-jala-jala-rizal',
    title: 'Broiler Auto-Harvest Facility | CCDI Ongoing Project in Jala-Jala, Rizal',
    date: 'November 2026',
    category: 'Project Milestone',
    projectStatus: 'Ongoing Project',
    location: 'Jala-Jala, Rizal',
    summary:
      'Active turnkey construction is underway in Jala-Jala, Rizal for a modern broiler auto-harvest facility, progressing through structural steel erection, insulated PU wall paneling, slab curing, and harvest rail alignment.',
    imageUrl: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/01-interior-steel-structure-slab.webp',
    readTime: '4 min read',
    featured: false,
    author: {
      name: 'CCDI Construction & Civil Team',
      role: 'Turnkey Farm Construction',
    },
    keyHighlights: [
      'Active construction of commercial broiler auto-harvest poultry houses in Jala-Jala, Rizal.',
      'Pre-engineered wide-span structural steel portal framing with diagonal wind cross-bracing.',
      'Seamless insulated wall panels, insulated service doors, and heavy-duty concrete floor slabs.',
      'Floor-mounted longitudinal steel rail channels prepared for automated broiler harvesting equipment.',
    ],
    tags: [
      'CCDI',
      'Jala-Jala Rizal',
      'Ongoing Project',
      'Broiler Auto-Harvest',
      'Turnkey Construction',
      'Insulated Housing',
      'Steel Structure',
    ],
    content: [
      'Construction is actively progressing on our ongoing Broiler Auto-Harvest Facility project in Jala-Jala, Rizal—combining rugged structural engineering with modern mechanized bird-handling infrastructure.',
      'Civil works including site grading, excavation, concrete footing pedestals, perimeter stem walls, and reinforced floor slabs are advancing steadily alongside structural steel portal frame erection and roof purlin installation.',
      'Enclosed bays already showcase insulated sandwich wall cladding, precision sidewall ventilation openings, and insulated access doors designed for strict thermal control and biosecurity.',
      'Inside the completed concrete bays, our field crew is aligning longitudinal base rails that will support the automated broiler harvest conveyor and housing equipment in the upcoming mechanical fit-out phase.',
    ],
    galleryImages: [
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/01-interior-steel-structure-slab.webp',
        caption: 'Interior view of wide-span steel trusses, insulated sidewalls, and finished concrete slab',
      },
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/02-auto-harvest-base-rail-installation.webp',
        caption: 'Alignment of longitudinal steel base rails for the broiler auto-harvest system',
      },
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/03-full-span-poultry-house-interior.webp',
        caption: 'Clear-span structural interior with ongoing floor preparation and rail staging',
      },
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/04-exterior-insulated-wall-cladding.webp',
        caption: 'Exterior concrete curb foundation and insulated sandwich panel wall installation',
      },
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/05-portal-frame-front-elevation.webp',
        caption: 'Front portal frame steel columns and galvanized girt framing at end-bay entrance',
      },
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/06-interior-floor-preparation.webp',
        caption: 'Full-length concrete floor slab curing and interior finishing works',
      },
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/07-insulated-wall-panels-roofing.webp',
        caption: 'Roof decking, steel purlins, and continuous insulated sidewall enclosure',
      },
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/08-sidewall-ventilation-openings.webp',
        caption: 'Framing of sidewall cooling pad and ventilation openings along the concrete wall curb',
      },
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/09-insulated-service-door-installation.webp',
        caption: 'Installed biosecure insulated PU service door along the building perimeter',
      },
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/10-sidewall-cross-bracing-drainage.webp',
        caption: 'Exterior steel columns, diagonal cross-bracing rods, and concrete pedestal footings',
      },
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/11-side-access-door-foundation.webp',
        caption: 'Exterior perimeter trenching alongside insulated wall panels and door frame',
      },
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/12-column-pedestal-civil-works.webp',
        caption: 'Reinforced concrete column pedestals and anchor bolt connections under construction',
      },
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/13-roof-purlin-extension-excavation.webp',
        caption: 'Heavy equipment earthworks for adjacent house bay extension and steel roof framing',
      },
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/14-rebar-slab-and-trenching.webp',
        caption: 'Rebar mesh reinforcement for concrete slab extension and utility trench excavation',
      },
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/15-end-bay-earthworks-grading.webp',
        caption: 'Sub-grade leveling and heavy breaker excavation for connecting house foundation',
      },
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/16-wall-panel-staging-interior.webp',
        caption: 'Pre-fabricated insulated wall panel stacks staged inside the completed bay',
      },
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/17-site-materials-and-equipment.webp',
        caption: 'Galvanized structural framing materials and PU panels staged on site',
      },
      {
        url: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/18-exterior-site-progress.webp',
        caption: 'Side elevation progress showing structural steel framing and site earthworks',
      },
    ],
    externalLink: 'https://www.facebook.com/ccdi.asia',
  },
  {
    id: 'ongoing-layer-with-solar-gerona-tarlac',
    title: 'Commercial Layer Facility with Solar Integration | CCDI Ongoing Project in Gerona, Tarlac',
    date: 'November 2026',
    category: 'Project Milestone',
    projectStatus: 'Ongoing Project',
    location: 'Gerona, Tarlac',
    summary:
      'Early civil and structural steel foundation works are actively underway in Gerona, Tarlac for an integrated commercial layer farm designed with solar power integration from day one.',
    imageUrl: '/images/news/ongoing-layer-with-solar-gerona-tarlac/01-steel-columns-foundation-gerona-tarlac.webp',
    readTime: '3 min read',
    featured: false,
    author: {
      name: 'CCDI Engineering & Solar Team',
      role: 'Integrated Layer & Energy Solutions',
    },
    keyHighlights: [
      'Ongoing turnkey construction of a commercial layer complex with solar integration in Gerona, Tarlac.',
      'Completed perimeter retaining walls, concrete footing pedestals, and compacted gravel sub-base.',
      'Primary structural steel I-beam columns erected along the full building footprint.',
      'Engineered to support high-density layer housing alongside clean rooftop/ground solar power.',
    ],
    tags: [
      'CCDI',
      'Gerona Tarlac',
      'Ongoing Project',
      'Layer Farm',
      'Solar Integration',
      'Steel Erection',
      'Civil Works',
    ],
    content: [
      'CCDI is excited to share early construction milestones from our ongoing Layer with Solar project in Gerona, Tarlac—an integrated agribusiness complex built to combine commercial egg production with clean solar energy.',
      'Civil engineering teams have completed site leveling, perimeter concrete masonry stem walls, compacted gravel sub-base preparation, and reinforced concrete column pedestals across the entire building length.',
      'Heavy-duty painted steel I-beam columns are now erected and anchored along both perimeter lines, establishing the main structural frame ahead of roof truss installation, insulated enclosure paneling, and layer cage & solar system integration.',
    ],
    galleryImages: [
      {
        url: '/images/news/ongoing-layer-with-solar-gerona-tarlac/01-steel-columns-foundation-gerona-tarlac.webp',
        caption: 'Erected primary steel columns, concrete pedestals, and compacted gravel bed in Gerona, Tarlac',
      },
      {
        url: '/images/news/ongoing-layer-with-solar-gerona-tarlac/02-perimeter-footing-column-erection.webp',
        caption: 'Full-length foundation stem wall and aligned structural steel framing progress',
      },
    ],
    externalLink: 'https://www.facebook.com/ccdi.asia',
  },
  {
    id: 'single-stage-hatchery-bulacan-project',
    title: 'Single-Stage Hatchery | CCDI Finished Project in Bulacan',
    date: 'August 13, 2026',
    category: 'Project Milestone',
    projectStatus: 'Finished Project',
    location: 'San Ildefonso, Bulacan',
    summary: 'CCDI proudly announces the successful completion and turnover of a commercial single-stage hatchery facility in Bulacan, featuring an advanced incubation system with an egg-setting capacity of 322,560 eggs per week.',
    imageUrl: '/images/news/bulacan-single-stage-setter.png',
    readTime: '3 min read',
    featured: false,
    author: {
      name: 'CCDI Project Engineering Team',
      role: 'Hatchery & Incubation Solutions',
    },
    keyHighlights: [
      'Successfully completed commercial single-stage incubation facility located in Bulacan, Philippines.',
      'Advanced incubation system with an egg-setting capacity of 322,560 eggs per week.',
      'Equipped with Single-Stage Setters (Model EIFTPC-40320 | 40,320 eggs per unit) and Hatchers (Model EICTPC-40320 | 40,320 eggs per unit).',
      'Designed to support all-in all-out biosecurity, high hatchability rates, and consistent chick vitality.',
    ],
    tags: [
      'CCDI',
      'Bulacan',
      'Finished Project',
      'Single-Stage Hatchery',
      'Incubation Systems',
      'Poultry Production',
      'Hatchery Solutions',
      'Agribusiness',
    ],
    content: [
      "We're proud to share our successfully completed hatchery project in Bulacan, featuring an advanced incubation system with an egg-setting capacity of 322,560 eggs per week. The facility is designed to support efficient operations and consistent chick production.",
      "The newly commissioned installation features high-efficiency Single-Stage Setters (Model EIFTPC-40320) and matching Hatchers (Model EICTPC-40320), each engineered for 40,320 eggs per unit. The single-stage methodology enables precise developmental stage temperature and humidity profiling, ensuring optimum hatchability and superior day-old chick (DOC) health.",
      'By implementing all-in, all-out batch management, the facility allows comprehensive cleaning and disinfection between cycles, significantly mitigating bacterial cross-contamination risks and adhering to modern biosecurity protocols.',
      'Looking for reliable hatchery and incubation solutions in the Philippines? Get in touch with our team today at +63 919 088 3054 or email inquiries@ccdi-asia.com.',
    ],
    galleryImages: [
      {
        url: '/images/news/bulacan-single-stage-setter.png',
        caption: 'Single-Stage Setter Hall (Model EIFTPC-40320 | 40,320 eggs per unit) in Bulacan',
      },
      {
        url: '/images/news/bulacan-hatcher.jpg',
        caption: 'Commercial Hatchers (Model EICTPC-40320 | 40,320 eggs per unit) with stainless trolleys',
      },
    ],
    externalLink: 'https://www.facebook.com/ccdi.asia',
  },
  {
    id: 'agrilink-2026-integrated-farm-solar',
    title: 'CCDI Showcases Integrated Farm & Solar Solutions at Agrilink 2026',
    date: 'October 8–10, 2026',
    category: 'Events & Exhibitions',
    summary: 'Clarkbase Construction Dev\'t Inc. (CCDI), together with partner Tai Chi Newtech Inc., exhibited at Agrilink, Foodlink, and Aqualink 2026 at the World Trade Center Metro Manila, welcoming farm owners and agribusiness investors.',
    imageUrl: '/images/news/agrilink-team-beige.jpg',
    readTime: '4 min read',
    featured: false,
    author: {
      name: 'CCDI Corporate Communications',
      role: 'Events & Trade Exhibitions',
    },
    keyHighlights: [
      'Exhibited in partnership with Tai Chi Newtech Inc. at World Trade Center Metro Manila (Booths D84–D88, Hall D Tent).',
      'Showcased commercial poultry equipment, hatchery systems, feed mill solutions, and solar power systems.',
      'Conducted high-volume consultations for full-scale turnkey farm developments and energy upgrades across the Philippines.',
    ],
    tags: ['Agrilink 2026', 'Trade Exhibition', 'Solar Solutions', 'Turnkey Farms', 'Tai Chi Newtech', 'World Trade Center'],
    content: [
      'Clarkbase Construction Dev\'t Inc. (CCDI), together with partner Tai Chi Newtech Inc., exhibited at Agrilink, Foodlink, and Aqualink 2026 at the World Trade Center Metro Manila (Booths D84–D88, Hall D Tent).',
      'Over the three-day exhibition, the CCDI team welcomed farm owners, integrators, and agribusiness investors, showcasing commercial poultry equipment, hatchery systems, feed mill solutions, and solar power systems for full-scale farm developments.',
      'By bringing together structural farm engineering, automated poultry housing, and clean solar microgrids under one turnkey banner, CCDI presented clients with a proven path toward reduced operational costs, enhanced biosecurity, and resilient food production.',
    ],
    galleryImages: [
      {
        url: '/images/news/agrilink-team-beige.jpg',
        caption: 'CCDI & Tai Chi Newtech Team at Agrilink 2026, World Trade Center Metro Manila',
      },
      {
        url: '/images/news/agrilink-2026-booth.jpg',
        caption: 'Agrilink 2026 Exhibition Booths D84–D88 showcasing turnkey agribusiness solutions',
      },
      {
        url: '/images/news/agrilink-booth-2.jpg',
        caption: 'CCDI Executive & Engineering Representatives welcoming agribusiness clients',
      },
    ],
    externalLink: 'https://www.facebook.com/ccdi.asia',
  },
  {
    id: 'livestock-philippines-expo-2026',
    title: 'Day 1 at the Livestock Philippines Expo 2026',
    date: 'June 24–26, 2026',
    category: 'Events & Exhibitions',
    summary: 'Together with EI Farming, Clarkbase Construction Dev\'t Inc. (CCDI) participated in the Livestock Philippines Expo 2026 at the World Trade Center Metro Manila (Hall A – Booth C8), welcoming farm owners, integrators, and industry partners.',
    imageUrl: '/images/news/livestock-philippines-2026.jpg',
    readTime: '3 min read',
    featured: false,
    author: {
      name: 'CCDI Corporate Communications',
      role: 'Events & Trade Exhibitions',
    },
    keyHighlights: [
      'Exhibited in partnership with EI Farming at World Trade Center Metro Manila (Hall A – Booth C8).',
      'Welcomed clients and agribusiness investors on Day 1 of the premier livestock and poultry expo.',
      'Showcased turnkey agro-industrial construction, modern broiler housing, and equipment solutions.',
    ],
    tags: ['Livestock Philippines 2026', 'EI Farming', 'World Trade Center', 'Trade Exhibition', 'Poultry Solutions', 'Agribusiness'],
    content: [
      'Day 1 at the Livestock Philippines Expo 2026! Together with EI Farming, Clarkbase Construction Dev\'t Inc. (CCDI) would like to thank everyone who visited us on our first day at the World Trade Center Metro Manila (Hall A – Booth C8).',
      'The premier trade event brought together key stakeholders from the livestock, poultry, and aquaculture sectors, exploring modern facility designs, biosecurity standards, and high-efficiency farming technologies.',
      'CCDI showcased integrated solutions for agribusiness development—ranging from pre-engineered poultry structures and automated climate controllers to full turnkey hatchery, feedmill, and solar energy installations across the country.',
    ],
    externalLink: 'https://www.facebook.com/ccdi.asia',
  },
];

// Alias for backwards compatibility
export const DEFAULT_NEWS_ARTICLES = NEWS_ARTICLES;
