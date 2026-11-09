import React, { useEffect } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Wrench,
  SlidersHorizontal,
  Settings2,
  Headphones,
} from 'lucide-react';
import type { Product } from '../../data/mockProducts';
import { SolutionHeroBanner } from '../../components/molecules/SolutionHeroBanner';
import { SolutionSubNav } from '../../components/molecules/SolutionSubNav';
import { SolutionEquipmentCard } from '../../components/molecules/SolutionEquipmentCard';
import { BenchmarkStatStrip, type BenchmarkStatItem } from '../../components/molecules/BenchmarkStatStrip';
import { FeedProcessingWorkflow } from '../../components/organisms/FeedProcessingWorkflow';
import { AfterSalesSection } from '../../components/organisms/AfterSalesSection';
import { ContactSection } from '../../components/organisms/ContactSection';
import { FEEDMILL_PRODUCTS_MAP } from '../../data/feedmillProducts';
import { FEEDMILL_ACCESSORIES_AND_PARTS } from '../../data/feedmillAccessories';
import { CategoryAccessoriesCatalog } from '../../components/organisms/CategoryAccessoriesCatalog';
import { AFTER_SALES_DATA } from '../../data/afterSalesData';

export interface FeedmillPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

interface FeedmillProductCardProps {
  productId: string;
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
}

const FeedmillProductCard: React.FC<FeedmillProductCardProps> = React.memo(({
  productId,
  inquiryItems,
  onToggleInquiry,
}) => {
  const product = FEEDMILL_PRODUCTS_MAP[productId];
  if (!product) return null;

  return (
    <SolutionEquipmentCard
      product={product}
      inquiryItems={inquiryItems}
      onToggleInquiry={onToggleInquiry}
    />
  );
});
FeedmillProductCard.displayName = 'FeedmillProductCard';

const FEEDMILL_BENCHMARK_ITEMS: BenchmarkStatItem[] = [
  { value: '2–25 t/h', label: 'PELLET MILL SERIES' },
  { value: '3.5–55 t/h', label: 'SELECTED HAMMER MILL RANGES' },
  { value: '40–60 sec', label: 'REPRESENTATIVE MIXING CYCLE' },
  { value: 'TURNKEY', label: 'INTEGRATION AVAILABLE', highlight: true },
];

const OperationalBenchmarks: React.FC = React.memo(() => (
  <BenchmarkStatStrip variant="hero-card" items={FEEDMILL_BENCHMARK_ITEMS} />
));
OperationalBenchmarks.displayName = 'OperationalBenchmarks';

export const FeedmillPage: React.FC<FeedmillPageProps> = ({
  inquiryItems,
  onToggleInquiry,
  onRemoveInquiryItem,
}) => {
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const offset = 72;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      window.scrollTo({ top: elementRect - bodyRect - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans text-left min-h-screen">
      
      {/* ── 1. HERO BANNER WITH OPERATIONAL BENCHMARKS (ID="overview") ── */}
      <div id="overview">
        <SolutionHeroBanner
          breadcrumbs={[
            { label: 'HOME', path: '/' },
            { label: 'OUR SOLUTIONS', path: '/solutions' },
            { label: 'FEEDMILL SOLUTIONS' },
          ]}
          title="Feedmill Machinery and Equipment"
          subtitle="CCDI brings together raw material receiving and pre-cleaning, grinding, precision mixing, conditioning and pelleting, and automated packing in one coordinated operation."
          backgroundImage="/images/capabilities/feedmill-facility.jpg"
          imageAlt="Feedmill Machinery and Equipment"
          ctaText="Connect with our team today."
          onCtaClick={scrollToContact}
          bottomContent={<OperationalBenchmarks />}
        />
      </div>

      {/* ── 2. STICKY SUB-NAV BAR (IN-PAGE HYPERLINKS) ─────────────── */}
      <SolutionSubNav category="feedmill" />

      {/* ── 3. SECTION 2: PROCESS FLOW (ID="process-flow") ──────────── */}
      <FeedProcessingWorkflow onCtaClick={scrollToContact} />

      {/* ── 5. CATEGORY 1: CORE PROCESS EQUIPMENT (ID="core-process") ─ */}
      <section id="core-process" className="relative py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              CORE PROCESS EQUIPMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Core Process Equipment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            <FeedmillProductCard productId="fm-hhfsp-hammer" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
            <FeedmillProductCard productId="fm-hhshj-mixer" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
            <FeedmillProductCard productId="fm-hhzlh-pellet" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
          </div>
        </div>
      </section>

      {/* ── 6. CATEGORY 2: PELLETING & POST-PELLET PROCESSING (ID="pelleting-processing") ── */}
      <section id="pelleting-processing" className="relative py-16 sm:py-24 bg-slate-50 border-b border-slate-200 overflow-hidden">
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              PELLETING &amp; POST-PELLET PROCESSING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Pelleting &amp; Post-Pellet Processing
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Conditioning, pelleting, cooling, crumbling and screening are engineered together to stabilize product quality and line capacity.
            </p>
          </div>

          {/* Quality Objectives & Maintainability Callout Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-slate-200 rounded-[2px] p-6 sm:p-8 shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#0B192C] font-bold">
                  QUALITY OBJECTIVES
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Stable pellet durability</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Controlled moisture and temperature</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Lower fines and consistent size</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Wrench className="w-5 h-5 text-amber-600" />
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#0B192C] font-bold">
                  MAINTAINABILITY
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Easy access to wear parts</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Easy inspection and maintenance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Spare parts and consumables support</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <FeedmillProductCard productId="fm-conditioner-series" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
            <FeedmillProductCard productId="fm-poultry-pellet-mill" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
            <FeedmillProductCard productId="fm-hhkly-cooler" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
            <FeedmillProductCard productId="fm-hhslg-crumbler" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
            <FeedmillProductCard productId="fm-hhfjh-sifter" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
            <FeedmillProductCard productId="fm-hhdhj-mixers" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
          </div>
        </div>
      </section>

      {/* ── 7. CATEGORY 3: CLEANING, GRINDING & PACKING (ID="cleaning-grinding-packing") ── */}
      <section id="cleaning-grinding-packing" className="relative py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              CLEANING, GRINDING &amp; PACKING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Cleaning, Grinding &amp; Packing
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Effective pre-cleaning removes unwanted material before grinding and stable packing systems support accurate dispatch and traceability.
            </p>
          </div>

          {/* Cleaning Options & Packing Options Callout Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 border border-slate-200 rounded-[2px] p-6 sm:p-8 shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <SlidersHorizontal className="w-5 h-5 text-amber-600" />
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#0B192C] font-bold">
                  CLEANING OPTIONS
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Vibrating sifter</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Wheat cleaner</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Drum pre-cleaner</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Powder pre-cleaner</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Double-drum pre-cleaner</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <SlidersHorizontal className="w-5 h-5 text-amber-600" />
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#0B192C] font-bold">
                  PACKING OPTIONS
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Valve or open-mouth bagging</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Belt-fed weighing</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Double-hopper high-speed weighing</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Bulk and ton-scale systems</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Conveying and pallet interface</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <FeedmillProductCard productId="fm-hhfsp66-hammer" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
            <FeedmillProductCard productId="fm-hhfsp138-hammer" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
            <FeedmillProductCard productId="fm-cleaning-series" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
            <FeedmillProductCard productId="fm-double-hopper-scale" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
            <FeedmillProductCard productId="fm-belt-packing-scale" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
            <FeedmillProductCard productId="fm-bulk-ton-packing" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
          </div>
        </div>
      </section>

      {/* ── 8. CATEGORY 4: AQUA FEED, PET FOOD & STORAGE (ID="aqua-pet-storage") ── */}
      <section id="aqua-pet-storage" className="relative py-16 sm:py-24 bg-slate-50 border-b border-slate-200 overflow-hidden">
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              AQUA FEED, PET FOOD &amp; STORAGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Aqua Feed, Pet Food &amp; Storage
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Extrusion, fine grinding, drying and storage systems can be configured as a complete production platform for aquatic feed and pet food applications.
            </p>
          </div>

          {/* Engineered for Feed Production & Technical Support Callout Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-slate-200 rounded-[2px] p-6 sm:p-8 shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Settings2 className="w-5 h-5 text-amber-600" />
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#0B192C] font-bold">
                  ENGINEERED FOR FEED PRODUCTION
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Species and feed formulation</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Pellet size and density</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Moisture and drying requirements</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Required line capacity</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Headphones className="w-5 h-5 text-amber-600" />
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#0B192C] font-bold">
                  TECHNICAL SUPPORT
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Installation and commissioning</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Operator and maintenance training</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Spare and wear parts</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Troubleshooting and system upgrades</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <FeedmillProductCard productId="fm-pet-food-extruder" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
            <FeedmillProductCard productId="fm-aqua-extruders" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
            <FeedmillProductCard productId="fm-swfl-pulverizer" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
            <FeedmillProductCard productId="fm-circulation-dryer" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
            <FeedmillProductCard productId="fm-silo-storage" inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />
          </div>
        </div>
      </section>

      {/* ── 9. FEEDMILL AUXILIARIES & SPARE PARTS INQUIRY CATALOG ── */}
      <div id="accessories-inquiry">
        <CategoryAccessoriesCatalog
          businessUnit="Feedmill"
          customProducts={FEEDMILL_ACCESSORIES_AND_PARTS}
          eyebrow="FEEDMILL MACHINERY, AUXILIARIES & SPARE PARTS INQUIRY"
          title="Feedmill Auxiliaries & Spare Parts Catalog"
          subtitle="Select precision ring dies, roller shells, hammer blades, sieve screens, elevator buckets, filter bags, and OEM wear components to configure your feedmill inquiry."
          inquiryItems={inquiryItems}
          onToggleInquiry={onToggleInquiry}
          accentTheme="amber"
        />
      </div>

      {/* ── 10. AFTER-SALES SERVICES & LIFECYCLE SUPPORT (ID="after-sales") ── */}
      <AfterSalesSection
        data={AFTER_SALES_DATA.feedmill}
        onCtaClick={scrollToContact}
        catalogLink={{
          label: 'Browse Auxiliaries & Spares Catalog',
          href: '#accessories-inquiry',
        }}
      />

      {/* ── 11. CONTACT & INQUIRY SECTION (ID="contact") ────────────── */}
      <div id="contact">
        <ContactSection
          inquiryItems={inquiryItems}
          onRemoveInquiryItem={onRemoveInquiryItem}
        />
      </div>

    </div>
  );
};
