import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Search,
  X,
  HelpCircle,
  Phone,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sun,
  Factory,
  Layers,
} from 'lucide-react';

export interface FaqItem {
  id: string;
  category: 'all' | 'turnkey' | 'poultry' | 'feedmill-hatchery' | 'solar' | 'warranty';
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
}

const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: HelpCircle },
  { id: 'turnkey', label: 'Turnkey EPC & Build', icon: Building2 },
  { id: 'poultry', label: 'Poultry Housing', icon: Layers },
  { id: 'feedmill-hatchery', label: 'Feedmill & Hatchery', icon: Factory },
  { id: 'solar', label: 'Solar PV & Energy', icon: Sun },
  { id: 'warranty', label: 'Warranties & Logistics', icon: ShieldCheck },
] as const;

type CategoryId = typeof FAQ_CATEGORIES[number]['id'];

const FAQ_DATA: FaqItem[] = [
  {
    id: 'turnkey-services',
    category: 'turnkey',
    categoryLabel: 'Turnkey EPC',
    question: 'What turnkey services does CCDI provide for agro-industrial projects?',
    answer:
      'CCDI provides true end-to-end engineering, procurement, and construction (EPC) management. We handle topographical site assessment, architectural and civil foundation engineering, fabrication of heavy-duty pre-engineered steel framing, insulated sandwich panel cladding, MEP (mechanical, electrical, plumbing) installations, climate automation, backup power synchronization, testing, and operational commissioning.',
    highlights: [
      'Single-point contractor responsibility from raw land to commercial operation',
      'Structural, civil, mechanical, and electrical engineering under one roof',
      'Complete equipment sourcing with direct factory OEM partnerships',
    ],
  },
  {
    id: 'turnkey-regions',
    category: 'turnkey',
    categoryLabel: 'Turnkey EPC',
    question: 'What regions across the Philippines does CCDI serve?',
    answer:
      'We construct and commission facilities nationwide across Luzon, Visayas, and Mindanao. Our central engineering hub and logistics depot are situated in Pampanga (Clark Freeport Zone & Angeles City), giving us rapid access to northern and southern project corridors. We have active and turnover installations in Bulacan, Tarlac, Pangasinan, Batangas, Quezon, Iloilo, Cebu, Davao, and Bukidnon.',
    highlights: [
      'Headquarters and logistics depot in Pampanga for rapid mobilization',
      'Proven execution in typhonic and coastal Philippine microclimates',
      'Dedicated field engineering teams dispatched nationwide',
    ],
  },
  {
    id: 'turnkey-timeline',
    category: 'turnkey',
    categoryLabel: 'Turnkey EPC',
    question: 'What is the typical project timeline from engineering design to facility turnover?',
    answer:
      'Timelines depend on project scale and site readiness. A standard multi-tier closed tunnel-ventilated broiler or layer house is typically built and commissioned within 90 to 150 calendar days from foundation readiness. Larger multi-building complexes, commercial feedmills, or industrial hatcheries generally range from 6 to 12 months.',
    highlights: [
      'Modular pre-engineered components reduce on-site construction time by 30%',
      'Milestone-driven gantt scheduling with weekly progress reporting',
      'Early equipment procurement prevents shipping delays',
    ],
  },
  {
    id: 'poultry-tunnel-vs-open',
    category: 'poultry',
    categoryLabel: 'Poultry Housing',
    question: 'Why are closed tunnel-ventilated houses superior to traditional open-sided coops in the Philippines?',
    answer:
      'The tropical Philippine climate presents high ambient temperatures and humidity that subject modern poultry genetics to severe heat stress. CCDI’s closed tunnel-ventilated houses maintain controlled negative pressure with evaporative cooling pads, high-velocity fiberglass exhaust fans, and automated winching curtains. This keeps effective house temperatures at 24°C–28°C year-round, cutting mortality to under 2.5%, dramatically improving Feed Conversion Ratios (FCR), and creating an airtight bio-secure barrier against Avian Influenza.',
    highlights: [
      'Consistent 24°C–28°C microclimate regardless of outside heat or heavy monsoon rains',
      'Substantial reduction in bird mortality and medication expenses',
      'High-grade biosecurity barrier preventing wild bird and vector contamination',
    ],
  },
  {
    id: 'poultry-retrofit',
    category: 'poultry',
    categoryLabel: 'Poultry Housing',
    question: 'Can CCDI retrofit existing open-sided chicken houses into modern closed tunnel systems?',
    answer:
      'Yes. In addition to greenfield construction, CCDI specializes in brownfield retrofits. Our structural team inspects existing concrete foundations and trusses, reinforces necessary load-bearing members, installs airtight insulated sandwich panel ceilings and sidewalls, and mounts high-efficiency exhaust fans, evaporative cooling pads, and digital climate controllers.',
    highlights: [
      'Cost-effective path to modernize aging farms without rebuilding from scratch',
      'Preserves viable structural frames while updating climate envelope & equipment',
      'Phased retrofitting allows partial farm operation during upgrades',
    ],
  },
  {
    id: 'poultry-equipment-systems',
    category: 'poultry',
    categoryLabel: 'Poultry Housing',
    question: 'What cage and automated feeding equipment are available for Broilers, Breeders, and Layers?',
    answer:
      'We supply Tier-1 automated poultry production systems tailored to every bird type. For Broilers: floor feeding pans, anti-spill nipple drinkers, and high-density harvesting cage systems. For Breeders: specialized male/female pan & chain feeders, automatic nesting boxes with egg return belts, and heavy-duty plastic slat flooring. For Commercial Layers: A-frame and H-frame cage batteries with automatic traveling hopper feeding, manure removal belts, and multi-tier egg collection elevators.',
    highlights: [
      'Fully automated feeding, drinking, egg collection, and manure removal',
      'Hot-dip galvanized steel framing and virgin PP plastic parts for 15+ year lifespan',
      'Integrated EI-6000 and Rotem-compatible multi-stage climate control units',
    ],
  },
  {
    id: 'feedmill-capacity',
    category: 'feedmill-hatchery',
    categoryLabel: 'Feedmill Systems',
    question: 'What feedmill capacities and configurations can CCDI engineer and construct?',
    answer:
      'We engineer feed processing plants ranging from 5 TPH (tons per hour) modular on-farm feedmills up to 60+ TPH industrial commercial complexes. Turnkey packages include raw material intake pits, grain storage silos with temperature monitoring, hammer mills, micro-ingredient precision batching scales, twin-shaft paddle mixers, pelleting presses, counterflow coolers, and automated packing carousels.',
    highlights: [
      'Tailored for poultry mash, broiler pellets, layer crumbles, and aquafeed',
      'Automated batching PLC consoles for recipe precision and zero ingredient waste',
      'Integrated dust collection and explosion-proof electrical compliance',
    ],
  },
  {
    id: 'hatchery-biosecurity',
    category: 'feedmill-hatchery',
    categoryLabel: 'Hatchery Solutions',
    question: 'How do CCDI hatchery layouts guarantee biosecurity and chick vigor?',
    answer:
      'Our hatchery designs enforce a strict one-way linear biosecurity flow (egg intake → fumigation → setter hall → transfer room → hatcher hall → chick processing → holding room → dispatch). This physical zoning ensures clean and dirty processes never cross paths. We install cleanroom HVAC air handling units with positive differential pressure and antibacterial sandwich panels.',
    highlights: [
      'Strict one-way traffic flow eliminates cross-contamination risks',
      'Positive-pressure climate handling with HEPA / EU filtration',
      'Compatible with single-stage and multi-stage incubation systems',
    ],
  },
  {
    id: 'solar-energy-savings',
    category: 'solar',
    categoryLabel: 'Solar PV Systems',
    question: 'How much energy overhead can agro-solar installations offset for farm operators?',
    answer:
      'Agricultural solar PV systems typically reduce daytime utility electricity expenses by 35% to 55%. For tunnel-ventilated poultry farms and feedmills, peak solar power generation directly mirrors peak daytime energy demand—precisely when all cooling fans, water pumps, or milling motors operate at maximum load under the midday sun.',
    highlights: [
      'Direct daytime peak offsetting with high Return on Investment (typically 3–4 years)',
      'Optimized rooftop mounting on insulated sandwich panel roofs without penetration leaks',
      'Net-metering and Zero-Export compliance options approved by local electric coops',
    ],
  },
  {
    id: 'solar-generator-sync',
    category: 'solar',
    categoryLabel: 'Solar PV Systems',
    question: 'Can the solar PV system synchronize with our backup diesel generators during power outages?',
    answer:
      'Yes. CCDI installs intelligent Zero-Export and Generator Fuel-Saver controllers. During utility grid blackouts, the controller dynamically modulates solar inverter output to match instantaneous farm demand alongside the diesel generator. This prevents reverse power flow into the genset while cutting costly diesel fuel consumption by up to 40%.',
    highlights: [
      'Seamless generator-solar hybrid operation without manual switching',
      'Protects generator alternators against reverse-power damage',
      'Drastically reduces diesel fuel consumption during frequent provincial brownouts',
    ],
  },
  {
    id: 'warranty-coverage',
    category: 'warranty',
    categoryLabel: 'Warranties & Support',
    question: 'What warranties and after-sales support cover CCDI buildings and equipment?',
    answer:
      'All structural steel framing and pre-engineered components are backed by comprehensive structural warranties designed to exceed Philippine National Structural Code (NSCP) standards. Climate control equipment, motors, ventilation fans, controllers, and solar inverters carry direct Tier-1 OEM factory warranties and our local technical warranty support.',
    highlights: [
      'Direct OEM warranty backing on all mechanical & electrical gear',
      'Emergency technical support and on-call field technicians',
      'Preventive maintenance schedules and operator training included upon handover',
    ],
  },
  {
    id: 'warranty-spare-parts',
    category: 'warranty',
    categoryLabel: 'Warranties & Support',
    question: 'Where are spare parts stocked, and how fast can replacements be dispatched?',
    answer:
      'CCDI maintains an extensive inventory of critical spare parts at our central logistics warehouse in Pampanga. Stocked components include fan motors, pulleys, drive belts, winch actuators, cooling pad cellulose paper, nipple drinker assemblies, feeding pans, sensors, and controller circuit boards, ready for rapid same-day or next-day courier dispatch.',
    highlights: [
      'Central warehouse in Pampanga stocked with high-wear consumables',
      'Direct OEM replacements ensuring exact fit and manufacturer compatibility',
      'Fast regional freight dispatch to Luzon, Visayas, and Mindanao',
    ],
  },
  {
    id: 'inquiry-quotation-process',
    category: 'turnkey',
    categoryLabel: 'Turnkey EPC',
    question: 'How do I request a site inspection, feasibility assessment, or project quotation?',
    answer:
      'You can easily submit an inquiry through our website by adding equipment to your Inquiry List using the "+ INQUIRE" button or filling out the consultation form below. You can also contact our engineering hotline at +63 925 7588 458 or email inquiries@ccdi-asia.com. Our engineering team will review your land dimensions and production goals to provide preliminary layouts and an itemized Bill of Quantities (BOQ).',
    highlights: [
      'Free initial consultation and preliminary capacity estimation',
      'Itemized Bill of Quantities with transparent equipment and civil breakdowns',
      'Site feasibility visits conducted by licensed agricultural and civil engineers',
    ],
  },
];

export const FaqSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(['turnkey-services', 'poultry-tunnel-vs-open', 'solar-energy-savings'])
  );

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenItems(new Set(filteredFaqs.map((f) => f.id)));
  };

  const collapseAll = () => {
    setOpenItems(new Set());
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesSearch =
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        (item.highlights && item.highlights.some((h) => h.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

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
    <section
      id="faq"
      className="relative py-24 sm:py-32 bg-[#E6F0F5] text-slate-900 border-b border-slate-300/70 text-left font-sans overflow-hidden"
    >
      {/* Architectural Top-Right Corner Accent */}
      <img
        src="/images/accents/card-corner-accent.png"
        alt=""
        className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ── 1. SECTION HEADER ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold">
              CCDI / KNOWLEDGE BASE &amp; ADVISORY
            </p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B192C] leading-tight">
              Frequently asked questions about our engineering &amp; farm solutions.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Find transparent answers on turnkey poultry farm construction, climate-controlled
              housing, feedmill &amp; hatchery engineering, solar PV integration, and local warranty
              support across the Philippines.
            </p>
          </div>

          {/* Quick Stats or Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={expandAll}
              className="px-3.5 py-2 rounded-[2px] border border-slate-300 bg-white font-mono text-xs font-semibold text-slate-700 hover:text-slate-900 hover:border-slate-400 transition-colors shadow-xs cursor-pointer"
            >
              Expand All
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-3.5 py-2 rounded-[2px] border border-slate-300 bg-white font-mono text-xs font-semibold text-slate-700 hover:text-slate-900 hover:border-slate-400 transition-colors shadow-xs cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* ── 2. FILTER & SEARCH CONTROLS ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {FAQ_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-[2px] font-sans text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#0B192C] text-white shadow-sm'
                      : 'bg-white border border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`}
                  />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Instant Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or keywords..."
              className="w-full pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-[2px] font-sans text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Results Count indicator if filtering */}
        {(selectedCategory !== 'all' || searchQuery) && (
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>
              Showing <strong className="text-amber-600">{filteredFaqs.length}</strong> of{' '}
              {FAQ_DATA.length} questions
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-amber-600 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ── 3. ACCORDION LIST ── */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openItems.has(faq.id);
              return (
                <div
                  key={faq.id}
                  className={`bg-white border rounded-[2px] transition-all duration-200 shadow-xs overflow-hidden ${
                    isOpen
                      ? 'border-amber-400/80 shadow-md ring-1 ring-amber-400/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-start sm:items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-600 border border-slate-200 shrink-0 self-start group-hover:border-amber-300 group-hover:text-amber-700 transition-colors">
                        {faq.categoryLabel}
                      </span>
                      <span
                        className={`text-sm sm:text-base font-bold transition-colors leading-snug ${
                          isOpen
                            ? 'text-amber-600'
                            : 'text-[#0B192C] group-hover:text-amber-600'
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-[2px] flex items-center justify-center shrink-0 border transition-all duration-200 mt-0.5 sm:mt-0 ${
                        isOpen
                          ? 'bg-amber-400 border-amber-400 text-slate-950 rotate-180'
                          : 'bg-slate-50 border-slate-200 text-slate-500 group-hover:border-slate-300'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 text-slate-600 text-sm leading-relaxed space-y-4">
                          <p>{faq.answer}</p>
                          {faq.highlights && faq.highlights.length > 0 && (
                            <div className="bg-slate-50 border border-slate-200/80 rounded-[2px] p-3.5 space-y-2">
                              <span className="font-mono text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
                                Key Technical Takeaways:
                              </span>
                              <ul className="space-y-1.5">
                                {faq.highlights.map((h, i) => (
                                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                                    <span>{h}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center bg-white border border-slate-200 rounded-[2px] space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-800">
                No matching questions found for "{searchQuery}".
              </p>
              <p className="text-xs text-slate-500">
                Try a different keyword or category, or submit your question directly to our engineering team.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[2px] bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

        {/* ── 4. STILL HAVE QUESTIONS? CALL-TO-ACTION CARD ── */}
        <div className="relative bg-gradient-to-r from-[#0B192C] via-[#0E233E] to-[#0B192C] text-white rounded-[2px] p-6 sm:p-10 border border-[#1E3E66] shadow-xl overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5" />
                CAN'T FIND WHAT YOU'RE LOOKING FOR?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Speak directly with a CCDI agricultural engineer.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Whether you need a preliminary site layout, equipment compatibility advice, or an itemized
                Bill of Quantities for poultry, feedmill, or solar setups, our engineering team is here to assist.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={scrollToContact}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-[2px] transition-all shadow-md hover:shadow-amber-400/20 cursor-pointer"
              >
                Request Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:+639257588458"
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-[#07162A] hover:bg-[#0F2848] border border-slate-600 hover:border-amber-400/50 text-slate-200 hover:text-white font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                +63 925 7588 458
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
