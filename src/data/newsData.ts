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
 * - Option A (Recommended): Place your photo in the `public/images/news/` folder
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

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: NewsCategory;
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
  'Events & Exhibitions',
  'Technology & Equipment',
  'Technical Services',
  'Project Milestone',
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

export const NEWS_PAGE_HEADER_IMAGE = '/images/news/bulacan-single-stage-setter.png';
export const NEWS_HEADER_FALLBACK_IMAGE = '/images/capabilities/poultry-facility.jpg';

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'single-stage-hatchery-bulacan-project',
    title: 'Single-Stage Hatchery | CCDI Finished Project in Bulacan',
    date: 'August 13, 2026',
    category: 'Project Milestone',
    summary: 'CCDI proudly announces the successful completion and turnover of a commercial single-stage hatchery facility in Bulacan, featuring an advanced incubation system with an egg-setting capacity of 322,560 eggs per week.',
    imageUrl: '/images/news/bulacan-single-stage-setter.png',
    readTime: '3 min read',
    featured: true,
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
