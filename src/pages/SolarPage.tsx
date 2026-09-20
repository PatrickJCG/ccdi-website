import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, PhoneCall } from 'lucide-react';
import type { Product } from '../data/mockProducts';
import { ContactSection } from '../components/organisms/ContactSection';
import { CoreProductionSystemsShowcase } from '../components/organisms/CoreProductionSystemsShowcase';
import { CategoryEndToEndApproach } from '../components/organisms/CategoryEndToEndApproach';
import { CategoryAccessoriesCatalog } from '../components/organisms/CategoryAccessoriesCatalog';
import { SOLAR_SYSTEMS } from '../data/coreProductionSystems';

export interface SolarPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

export const SolarPage: React.FC<SolarPageProps> = ({
  inquiryItems,
  onToggleInquiry,
  onRemoveInquiryItem,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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
      {/* ── HERO BANNER ────────────────────────────────────────── */}
      <section className="relative bg-[#07162A] text-white pt-10 pb-20 sm:pb-24 border-b border-[#102A43] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Architectural Accent 2 - Top Left Anchored (Fades in downwards on view) */}
        <motion.div
          initial={{ opacity: 0, y: -45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-12 -left-16 sm:-top-8 sm:left-0 w-80 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <img
            src="/images/accents/accent2.png"
            alt=""
            className="w-full h-auto object-contain opacity-30"
          />
        </motion.div>

        {/* Architectural Dynamic Accent Graphic - Bottom Right Anchored (Fades in upwards on view) */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-16 -right-16 sm:-right-8 sm:bottom-0 w-80 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <img
            src="/images/accents/dark-accent-graphic.png"
            alt=""
            className="w-full h-auto object-contain opacity-30"
          />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
            <a href="/" className="hover:text-amber-400 transition-colors">HOME</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <a href="/solutions" className="hover:text-amber-400 transition-colors">OUR SOLUTIONS</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-amber-400 font-bold">SOLAR SYSTEMS</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-white leading-[1.2]">
                Agro-Industrial Solar Systems & Microgrid Integration
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                Lower operational power costs by 40% to 60% across poultry buildings, hatcheries, and feedmills. Turnkey commercial rooftop solar PV arrays, hybrid energy storage, and net metering integration.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="px-6 py-3.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-extrabold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  Request Solar Consultation
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#0B192C] border-2 border-amber-400/40 rounded-[2px] p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="border-b border-[#1E3E66] pb-4">
                  <span className="font-mono text-xs text-amber-400 uppercase tracking-widest block mb-1 font-bold">
                    ENERGY SAVINGS BENCHMARK
                  </span>
                  <div className="text-3xl font-black text-white font-mono">
                    40% – 60% Reduction
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Optimized for 24/7 ventilation, feed conveying, and hatchery incubation loads.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#07162A] p-3.5 rounded-[2px] border border-[#1E3E66]">
                    <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                      WARRANTY RATING
                    </span>
                    <span className="text-xl font-black text-white font-mono mt-1 block">
                      25 Years
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Tier-1 linear performance
                    </span>
                  </div>

                  <div className="bg-[#07162A] p-3.5 rounded-[2px] border border-[#1E3E66]">
                    <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                      TYPHOON CLAMPING
                    </span>
                    <span className="text-xl font-black text-white font-mono mt-1 block">
                      280 kph
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Certified wind rating
                    </span>
                  </div>

                  <div className="bg-[#07162A] p-3.5 rounded-[2px] border border-[#1E3E66]">
                    <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                      PAYBACK HORIZON
                    </span>
                    <span className="text-xl font-black text-white font-mono mt-1 block">
                      3.5–5 <span className="text-xs text-slate-400">Yrs</span>
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Accelerated ROI
                    </span>
                  </div>

                  <div className="bg-[#07162A] p-3.5 rounded-[2px] border border-[#1E3E66]">
                    <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                      GRID INTEGRATION
                    </span>
                    <span className="text-sm font-black text-white mt-1 block">
                      Net Metering
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      DU compliant interconnection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CORE SOLAR & MICROGRID SYSTEMS (PICTURES & CAROUSEL) ──────────── */}
      <CoreProductionSystemsShowcase
        id="core-solar-systems"
        systems={SOLAR_SYSTEMS}
        eyebrow="CLEAN ENERGY & AGRO-MICROGRIDS"
        sectionTitle="6 Core Commercial Solar & Microgrid Systems"
        description="Turnkey commercial rooftop PV arrays, hybrid LiFePO4 battery energy storage systems, utility net-metering switchgear, and real-time cloud SCADA telemetry engineered to cut operational agribusiness power costs by 40% to 60%. Inspect equipment photography and specifications below."
        totalCountBadge="06 FULLY INTEGRATED SYSTEMS"
        defaultViewMode="carousel"
        accentTheme="amber"
      />

      {/* ── 3. SOLAR ACCESSORIES & EQUIPMENT INQUIRY CATALOG ── */}
      <CategoryAccessoriesCatalog
        businessUnit="Solar Systems"
        eyebrow="COMMERCIAL SOLAR & ACCESSORIES INQUIRY"
        title="Solar Equipment & Microgrid Catalog"
        subtitle="Select agro-industrial PV panels, BESS battery banks, dual-axis agrivoltaic trackers, and net-metering switchgear for your project inquiry."
        inquiryItems={inquiryItems}
        onToggleInquiry={onToggleInquiry}
        accentTheme="amber"
      />

      {/* ── 4. END-TO-END TURNKEY APPROACH ── */}
      <CategoryEndToEndApproach category="solar" />

      {/* ── CONTACT SECTION ────────────────────────────────────── */}
      <ContactSection
        inquiryItems={inquiryItems}
        onRemoveInquiryItem={onRemoveInquiryItem}
      />
    </div>
  );
};
