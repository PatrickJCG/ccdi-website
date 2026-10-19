import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Clock,
  DollarSign,
  TrendingUp,
  FileCheck2,
} from 'lucide-react';
import type { Product } from '../data/mockProducts';
import { PoultrySubNav } from '../components/molecules/PoultrySubNav';
import { FarmRetrofitConfigurator } from '../components/organisms/FarmRetrofitConfigurator';
import { ContactSection } from '../components/organisms/ContactSection';

export interface RetrofittingPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

export const RetrofittingPage: React.FC<RetrofittingPageProps> = ({
  inquiryItems,
  onToggleInquiry,
  onRemoveInquiryItem,
}) => {
  const configuratorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Farm Retrofitting & Upgrades | CCDI Poultry Solutions';
  }, []);

  const scrollToConfigurator = () => {
    if (configuratorRef.current) {
      configuratorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-slate-900 font-sans text-left min-h-screen">
      
      {/* ── 1. HERO BANNER (CLEAN & SIMPLE) ─────────────────────────── */}
      <section className="relative bg-[#07162A] text-white pt-10 pb-16 sm:pb-20 border-b border-[#102A43] overflow-hidden">
        {/* Background photo on right with smooth gradient fade */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/images/broiler/climate-system.jpg"
            alt="CCDI Retrofitting & Modernization"
            className="w-full h-full object-cover object-right opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07162A] via-[#07162A]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07162A] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-slate-400 mb-6 font-mono"
          >
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link to="/solutions/poultry" className="hover:text-white transition-colors">
              Poultry Solution
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-200">Retrofitting & Upgrades</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Farm Retrofitting & Upgrades
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
                Turn your existing farm sheds into modern, climate-controlled tunnel houses at about half the cost of building new. Keep your concrete floor, steel frames, and roads while getting new fans, cooling pads, and automated feeders in just 3 to 4 weeks.
              </p>

              {/* 3 Clean Stat Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#0B192C]/80 border border-slate-700/80 p-3 rounded-md">
                  <span className="block text-[11px] text-slate-400">Cost Savings</span>
                  <span className="text-xl sm:text-2xl font-bold text-white font-mono">
                    40% to 50%
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Cheaper than Building New</span>
                </div>

                <div className="bg-[#0B192C]/80 border border-slate-700/80 p-3 rounded-md">
                  <span className="block text-[11px] text-slate-400">Upgrade Time</span>
                  <span className="text-xl sm:text-2xl font-bold text-white font-mono">
                    3 to 4 Weeks
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Done During Flock Break</span>
                </div>

                <div className="bg-[#0B192C]/80 border border-slate-700/80 p-3 rounded-md">
                  <span className="block text-[11px] text-slate-400">Bird Capacity</span>
                  <span className="text-xl sm:text-2xl font-bold text-white font-mono">
                    Up to 180%
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">More Birds in Same House</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={scrollToConfigurator}
                  className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-3 rounded-md font-sans text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                >
                  Submit Upgrade Specs
                </button>

                <a
                  href="#retrofit-audit-form"
                  className="inline-flex items-center justify-center gap-2 bg-[#102A43] hover:bg-[#1E3E66] text-white px-5 py-3 rounded-md font-sans text-xs font-semibold uppercase tracking-wider transition-colors border border-slate-700 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-slate-300" />
                  Book Free Farm Visit
                </a>
              </div>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-4">
              <div className="bg-[#0B192C]/90 border border-slate-700/80 p-6 rounded-md shadow-xl">
                <div className="w-9 h-9 rounded-md bg-slate-800 text-slate-200 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Meets Integrator Standards
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Upgrade your older houses so they meet the technical requirements of major contract integrators like San Miguel, Bounty, CP, and Universal Robina.
                </p>
                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Reuses your concrete floor and farm roads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>No need for new land permits or zoning papers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Backed by local engineering and fast spare parts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CONTEXTUAL STICKY SUB-NAV ──────────────────────────── */}
      <PoultrySubNav activeTab="retrofitting" />

      {/* ── 3. INTERACTIVE RETROFIT ASSESSMENT FORM (LIGHT THEME) ───── */}
      <section ref={configuratorRef} className="py-14 sm:py-16 bg-slate-100 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Farm Upgrade Assessment Form
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Submit your existing farm dimensions and select what you want to modernize (cages, fans, accessories, support systems, or other improvements). Our engineering team will review your specs and prepare a customized plan.
            </p>
          </div>

          <FarmRetrofitConfigurator
            inquiryItems={inquiryItems}
            onToggleInquiry={onToggleInquiry}
          />
        </div>
      </section>

      {/* ── 4. WHY UPGRADE INSTEAD OF BUILDING NEW? ───────────────── */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Upgrade Instead of Building New?
            </h2>
            <p className="text-sm text-slate-600 mt-1.5">
              Your existing farm already has massive value in its land, concrete slabs, water lines, electric connections, and access roads.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-md">
              <div className="w-9 h-9 rounded-md bg-slate-200 text-slate-800 flex items-center justify-center mb-3">
                <DollarSign className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                Save 40% to 50% on Costs
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                By keeping your existing concrete floor and building frame, you can spend your budget directly on equipment that grows birds faster.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-md">
              <div className="w-9 h-9 rounded-md bg-slate-200 text-slate-800 flex items-center justify-center mb-3">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                Ready in 3 to 4 Weeks
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A brand new farm takes 7 to 10 months to build. We install our upgrade kits during your regular 3-week flock break so you don't miss a growing cycle.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-md">
              <div className="w-9 h-9 rounded-md bg-slate-200 text-slate-800 flex items-center justify-center mb-3">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                Healthier Birds & Better Growth
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cool wind and wet pads keep birds comfortable in hot weather. Birds eat better, gain weight faster, and fewer birds die from summer heat.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-md">
              <div className="w-9 h-9 rounded-md bg-slate-200 text-slate-800 flex items-center justify-center mb-3">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                No New Permits Needed
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Because the building is already there, you avoid waiting months for new government environmental papers, zoning approvals, and land conversions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FOUR WAYS TO UPGRADE YOUR FARM ─────────────────────── */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              4 Ways to Upgrade Your Farm
            </h2>
            <p className="text-sm text-slate-600 mt-1.5">
              Choose the package that fits your current building type and your farming goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pathway 1 */}
            <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs">
              <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                <img
                  src="/images/broiler/climate-system.jpg"
                  alt="Open to Closed Tunnel Conversion"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2.5">
                <h3 className="text-base font-bold text-slate-900">
                  1. Open Curtain House to Closed Tunnel House
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Add insulated wall panels, a sealed ceiling, exhaust fans, and cooling wet pads to your open-sided house. Protects birds from typhoons, summer heat, and wild birds that bring disease.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>Airflow: <strong className="text-slate-900 font-semibold">Cool wind speed</strong></span>
                  <span>Capacity: <strong className="text-slate-900 font-semibold">+65% more broilers</strong></span>
                </div>
              </div>
            </div>

            {/* Pathway 2 */}
            <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs">
              <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                <img
                  src="/images/broiler/ventilation-fans.jpg"
                  alt="Upgrade Older Tunnel Houses"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2.5">
                <h3 className="text-base font-bold text-slate-900">
                  2. Upgrade Older Tunnel Houses
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For tunnel houses with worn-out equipment. We replace slow belt-drive fans with fast, energy-saving direct cone fans, install clean cooling pads, seal air leaks, and add automatic temperature controllers.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>Electricity: <strong className="text-slate-900 font-semibold">Saves ~22% power</strong></span>
                  <span>Temperature: <strong className="text-slate-900 font-semibold">Even cooling everywhere</strong></span>
                </div>
              </div>
            </div>

            {/* Pathway 3 */}
            <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs">
              <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                <img
                  src="/images/layer/feeding-system.jpg"
                  alt="Automatic Cages for Egg Layer Farms"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2.5">
                <h3 className="text-base font-bold text-slate-900">
                  3. Automatic Cages for Egg Layer Farms
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Switch from manual feeding carts and open manure pits to 3-to-4 tier vertical cages with automated egg collection and manure removal belts. Fits up to 3 times more hens in the same barn.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>Hens per House: <strong className="text-slate-900 font-semibold">Up to 3x more</strong></span>
                  <span>Labor: <strong className="text-slate-900 font-semibold">60% less manual work</strong></span>
                </div>
              </div>
            </div>

            {/* Pathway 4 */}
            <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs">
              <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                <img
                  src="/images/broiler/broiler-hero.jpg"
                  alt="Rooftop Solar Power"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2.5">
                <h3 className="text-base font-bold text-slate-900">
                  4. Rooftop Solar Power for Cooling Fans
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Put solar panels on your shed roof. When the sun is hottest and your exhaust fans are running at full speed, solar electricity powers them directly to slash your power bills.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>Daytime Power Bill: <strong className="text-slate-900 font-semibold">Cuts up to 65%</strong></span>
                  <span>Blackouts: <strong className="text-slate-900 font-semibold">Auto generator backup</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. 5-STEP EASY TIMELINE ───────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How We Do It in 5 Easy Steps
            </h2>
            <p className="text-sm text-slate-600 mt-1.5">
              A clear plan timed to finish during your regular flock break so your farm never misses a cycle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Free Farm Visit',
                desc: 'Our engineers visit your farm, check your building frame, and measure the house.',
                duration: 'Days 1–3',
              },
              {
                step: '02',
                title: 'House Sizing & Plan',
                desc: 'We calculate how many fans and cooling pads your building needs to stay cool.',
                duration: 'Days 4–7',
              },
              {
                step: '03',
                title: 'Equipment Prep',
                desc: 'We prepare wall panels, fans, and feeders at our Pampanga warehouse for fast delivery.',
                duration: 'Days 8–14',
              },
              {
                step: '04',
                title: 'Installation',
                desc: 'Our team installs the equipment inside your house during your scheduled flock break.',
                duration: 'Days 15–28',
              },
              {
                step: '05',
                title: 'Airflow Testing',
                desc: 'We test the fans with smoke to ensure even cool air everywhere and train your team.',
                duration: 'Days 29–30',
              },
            ].map((st) => (
              <div
                key={st.step}
                className="bg-slate-50 border border-slate-200 p-4 rounded-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-lg font-bold text-slate-900">
                      {st.step}
                    </span>
                    <span className="text-[10px] text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded font-medium">
                      {st.duration}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">{st.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CONTACT & INQUIRY SECTION ──────────────────────────── */}
      <ContactSection
        inquiryItems={inquiryItems}
        onRemoveInquiryItem={onRemoveInquiryItem}
      />

    </div>
  );
};
