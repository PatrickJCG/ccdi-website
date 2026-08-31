import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  MOCK_PRODUCTS,
  BUSINESS_UNITS,
  BU_META,
} from '../../data/mockProducts';
import type { Product, BusinessUnit } from '../../data/mockProducts';
import { ProductCard } from '../molecules';
import { ScannableMetricsTable } from '../molecules';
import {
  Search,
  X,
  RotateCcw,
  SearchX,
  Sparkles,
  SlidersHorizontal,
  Bird,
  Egg,
  Factory,
  Sun,
} from 'lucide-react';
import { EndToEndHeader } from './EndToEndHeader';
import { useExternalFilter, BU_MAP } from '../../hooks/useExternalFilter';

const renderCategoryIcon = (iconName: string, className = "w-4 h-4") => {
  switch (iconName) {
    case 'Bird':
      return <Bird className={className} />;
    case 'Egg':
      return <Egg className={className} />;
    case 'Factory':
      return <Factory className={className} />;
    case 'Sun':
      return <Sun className={className} />;
    default:
      return <Bird className={className} />;
  }
};

// ─── Main Component ────────────────────────────────────────────────────────
export interface ProductCatalogProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  inquiryItems,
  onToggleInquiry,
}) => {
  const [searchParams] = useSearchParams();

  // Multi-category selection state & search query & status filter
  const [selectedBUs, setSelectedBUs] = useState<BusinessUnit[]>([...BUSINESS_UNITS]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSubCat, setActiveSubCat] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'softlaunch'>('all');
  const sectionRef = useRef<HTMLDivElement>(null);

  // Toggle single BU selection in multi-select state
  const handleBUToggle = useCallback((bu: BusinessUnit) => {
    setSelectedBUs(prev => {
      // If all BUs are currently selected, clicking one isolates that specific BU
      if (prev.length === BUSINESS_UNITS.length) {
        return [bu];
      }
      if (prev.includes(bu)) {
        if (prev.length === 1) return [...BUSINESS_UNITS]; // Restores ALL BUs if toggled off
        return prev.filter(b => b !== bu);
      } else {
        const updated = [...prev, bu];
        if (updated.length === BUSINESS_UNITS.length) return [...BUSINESS_UNITS];
        return updated;
      }
    });
    setActiveSubCat('All');
  }, []);

  // Listen for search parameters in URL (e.g. ?bu=Poultry Farm Equipment, ?bu=Hatchery, etc.)
  useEffect(() => {
    const rawParam = searchParams.get('bu') || searchParams.get('category') || searchParams.get('function') || searchParams.get('species');
    if (rawParam) {
      const decoded = decodeURIComponent(rawParam);
      const matchedBU = BU_MAP[rawParam] || BU_MAP[decoded];
      if (matchedBU) {
        setSelectedBUs([matchedBU]);
        setActiveSubCat('All');
        const timer = setTimeout(() => {
          const target = document.getElementById('products');
          if (target) {
            const offset = 80;
            const y = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [searchParams]);

  // Listen for external filter events (from home page quick links)
  useExternalFilter((bu) => {
    setSelectedBUs([bu]);
    setActiveSubCat('All');
    const target = document.getElementById('products');
    if (target) {
      const offset = 80;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const orb1Y = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  // Products matching selected Business Units
  const matchingBUProducts = useMemo(() => {
    if (selectedBUs.length === 0) return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => selectedBUs.includes(p.businessUnit));
  }, [selectedBUs]);

  // Sub-categories across all currently selected Business Units
  const subCats = useMemo(() => {
    const set = new Set<string>();
    matchingBUProducts.forEach(p => {
      if (p.subCategory && p.subCategory !== 'All') {
        set.add(p.subCategory);
      }
    });
    return Array.from(set);
  }, [matchingBUProducts]);

  // Filtered products considering search query + sub-category selection + status filter
  const filtered = useMemo(() => {
    return matchingBUProducts.filter(p => {
      const matchesSubCat = activeSubCat === 'All' || p.subCategory === activeSubCat;
      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'softlaunch'
            ? !!p.isSoftLaunch
            : !p.isSoftLaunch;

      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesSubCat && matchesStatus;

      const matchesSearch =
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.businessUnit.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q) ||
        (p.softLaunchBadge && p.softLaunchBadge.toLowerCase().includes(q)) ||
        (p.speciesTags && p.speciesTags.some(t => t.toLowerCase().includes(q))) ||
        (p.buildingSpecs?.buildingType && p.buildingSpecs.buildingType.toLowerCase().includes(q));

      return matchesSubCat && matchesStatus && matchesSearch;
    });
  }, [matchingBUProducts, activeSubCat, statusFilter, searchQuery]);

  // Count soft launched items in current matching BUs
  const softLaunchCount = useMemo(() => {
    return matchingBUProducts.filter(p => p.isSoftLaunch).length;
  }, [matchingBUProducts]);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative bg-slate-50 text-slate-900 border-b border-slate-200/80 bg-grid-pattern"
    >
      {/* ── Ambient Background Depth ────────────────────── */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full pointer-events-none -z-10"
        aria-hidden
      >
        <div className="w-full h-full rounded-full bg-amber-400/10 blur-3xl" />
      </motion.div>
      <motion.div
        style={{ y: orb2Y }}
        className="absolute -bottom-40 -right-40 w-[640px] h-[640px] rounded-full pointer-events-none -z-10"
        aria-hidden
      >
        <div className="w-full h-full rounded-full bg-ccdi-navy/5 blur-3xl" />
      </motion.div>

      {/* ── Main Content Container ───────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-6">

        {/* ── End-To-End Execution Header Design ──────────────────────── */}
        <div className="mb-2">
          <EndToEndHeader
            tag="Solutions Catalog & Execution"
            title="End-To-End Turnkey Agro-Industrial Catalog"
            subtitle="Click on any execution step below (1–8) to expand full technical phase specifications and explore our specialized catalog solutions."
            lightMode={true}
          />
        </div>

        {/* ── 2-COLUMN SIDEBAR & CATALOG GRID LAYOUT ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start relative">

          {/* ── LEFT SIDEBAR FILTERS (Floating Sticky Desktop Controls) ─────────────── */}
          <aside className="lg:col-span-1 lg:sticky lg:top-24 self-start z-30 transition-all duration-300">
            <div className="bg-white rounded-2xl border-2 border-slate-200/90 shadow-2xl shadow-slate-300/60 overflow-hidden max-h-[calc(100vh-120px)] flex flex-col">
              
              {/* Floating Sidebar Header */}
              <div className="bg-gradient-to-r from-ccdi-navy via-[#102A43] to-[#1E3E66] p-4 flex items-center justify-between border-b border-white/10 shadow-md text-white shrink-0">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/30">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-white font-extrabold text-sm font-heading leading-snug">
                      Floating Filters
                    </h2>
                    <p className="text-[10px] text-slate-300 font-medium">Refine by scope</p>
                  </div>
                </div>

                {(selectedBUs.length < BUSINESS_UNITS.length || searchQuery || activeSubCat !== 'All' || statusFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSelectedBUs([...BUSINESS_UNITS]);
                      setSearchQuery('');
                      setActiveSubCat('All');
                      setStatusFilter('all');
                    }}
                    className="text-[11px] text-slate-950 hover:text-black font-extrabold flex items-center gap-1 bg-amber-400 hover:bg-amber-300 px-2.5 py-1 rounded-lg transition-all shadow-sm cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              <div className="p-4 space-y-5 overflow-y-auto">
                
                {/* 1. Search Box */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 font-heading block">
                    Search Keyword
                  </label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setActiveSubCat('All');
                      }}
                      placeholder="Search equipment..."
                      className="w-full pl-8 pr-7 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:bg-white transition-all font-semibold"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Core Category Filters (Business Units) */}
                <div className="space-y-2.5 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-800 font-heading flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                      Core Category
                    </h3>
                    <button
                      onClick={() => {
                        if (selectedBUs.length === BUSINESS_UNITS.length) {
                          setSelectedBUs([BUSINESS_UNITS[0]]);
                        } else {
                          setSelectedBUs([...BUSINESS_UNITS]);
                        }
                        setActiveSubCat('All');
                      }}
                      className="text-[10px] font-bold text-amber-700 hover:text-amber-900 underline cursor-pointer"
                    >
                      {selectedBUs.length === BUSINESS_UNITS.length ? 'Clear' : 'Select All'}
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {BUSINESS_UNITS.map((bu) => {
                      const isChecked = selectedBUs.includes(bu);
                      const count = MOCK_PRODUCTS.filter((p) => p.businessUnit === bu).length;
                      return (
                        <button
                          key={bu}
                          onClick={() => handleBUToggle(bu)}
                          className={[
                            'w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all duration-200 border cursor-pointer',
                            isChecked
                              ? 'bg-ccdi-navy text-white font-bold border-ccdi-navy shadow-md shadow-ccdi-navy/20'
                              : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300 font-semibold',
                          ].join(' ')}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="shrink-0 p-1 rounded-md bg-amber-400/10 text-amber-500">{renderCategoryIcon(BU_META[bu].icon, "w-4 h-4")}</span>
                            <span className="truncate max-w-[130px]">{bu}</span>
                          </div>
                          <span
                            className={[
                              'text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0',
                              isChecked ? 'bg-amber-400 text-slate-950 font-black' : 'bg-white text-slate-600 border border-slate-200',
                            ].join(' ')}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Availability Status Filter */}
                <div className="space-y-2.5 pt-3 border-t border-slate-200">
                  <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-800 font-heading flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    Availability Status
                  </h3>

                  <div className="flex flex-col gap-1.5">
                    {[
                      { id: 'all', label: 'All Solutions', count: MOCK_PRODUCTS.length },
                      { id: 'active', label: 'Ready & In-Stock', count: MOCK_PRODUCTS.filter(p => !p.isSoftLaunch).length },
                      { id: 'softlaunch', label: '⚡ Listing Soon', count: softLaunchCount },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setStatusFilter(tab.id as 'all' | 'active' | 'softlaunch')}
                        className={[
                          'w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold transition-all border text-left cursor-pointer',
                          statusFilter === tab.id
                            ? tab.id === 'softlaunch'
                              ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                              : 'bg-amber-400 text-slate-950 border-amber-400 font-black shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100',
                        ].join(' ')}
                      >
                        <span>{tab.label}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                          statusFilter === tab.id ? 'bg-black/20 text-white' : 'bg-white text-slate-600 border border-slate-200'
                        }`}>
                          {tab.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Sub-Category Filter */}
                {subCats.length > 0 && (
                  <div className="space-y-2.5 pt-3 border-t border-slate-200">
                    <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-800 font-heading">
                      Sub-Category
                    </h3>

                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setActiveSubCat('All')}
                        className={[
                          'px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border',
                          activeSubCat === 'All'
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100',
                        ].join(' ')}
                      >
                        All
                      </button>
                      {subCats.map(sc => (
                        <button
                          key={sc}
                          onClick={() => setActiveSubCat(sc)}
                          className={[
                            'px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border',
                            activeSubCat === sc
                              ? 'bg-amber-400 text-slate-950 border-amber-400 font-black shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100',
                          ].join(' ')}
                        >
                          {sc}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </aside>

          {/* ── RIGHT MAIN COLUMN: CATEGORY SECTIONS & CARDS ─────────────── */}
          <main className="lg:col-span-3 space-y-8">
            
            {/* Compact Unified Category & Filter Status Bar */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedBUs.join('-')}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:px-4 rounded-xl bg-white border border-slate-200/90 shadow-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-1.5 h-6 rounded-full bg-amber-500 shrink-0" />
                  <p className="text-xs text-slate-700 leading-snug truncate">
                    {selectedBUs.length === 1 ? (
                      <>
                        <span className="text-slate-900 font-extrabold">{selectedBUs[0]}</span> — {BU_META[selectedBUs[0]].description}
                      </>
                    ) : (
                      <>
                        <span className="text-slate-900 font-extrabold">Turnkey Engineering Catalog</span> — Showing <span className="font-extrabold text-amber-600">{filtered.length}</span> of {matchingBUProducts.length} solutions across {selectedBUs.length} categories
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <button
                    onClick={() => setStatusFilter(statusFilter === 'softlaunch' ? 'all' : 'softlaunch')}
                    className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold px-2.5 py-1 rounded-full transition-all duration-200 uppercase tracking-wider cursor-pointer ${
                      statusFilter === 'softlaunch'
                        ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-400'
                        : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Listing Soon ({softLaunchCount})
                  </button>
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                    {matchingBUProducts.length} Total
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

        {/* ── Product Catalog Grid Grouped by Category (Prioritized Standard Products First) ────────────────── */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${selectedBUs.join('-')}-${activeSubCat}-${statusFilter}-${searchQuery}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-14"
            >
              {BUSINESS_UNITS.filter(bu => selectedBUs.includes(bu)).map(bu => {
                const buProducts = filtered.filter(p => p.businessUnit === bu);
                if (buProducts.length === 0) return null;

                const standardProducts = buProducts.filter(p => !p.isSoftLaunch);
                const softLaunchProducts = buProducts.filter(p => p.isSoftLaunch);
                const meta = BU_META[bu];

                return (
                  <section key={bu} className="space-y-4 sm:space-y-6 bg-white/60 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm">
                    {/* Category Group Header — Concise on small devices */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-200/90">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-amber-100 border border-amber-200 shadow-xs text-amber-600 shrink-0">
                          {renderCategoryIcon(meta.icon, "w-5 h-5 sm:w-6 sm:h-6")}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-xl font-black font-heading text-slate-900 flex items-center gap-2">
                            {bu}
                          </h3>
                          <p className="hidden sm:block text-xs text-slate-600 font-medium line-clamp-1 max-w-xl">
                            {meta.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                          {standardProducts.length} Ready & In-Stock
                        </span>
                        {softLaunchProducts.length > 0 && (
                          <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            {softLaunchProducts.length} Listing Soon
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 1. PRIORITY STANDARD PRODUCTS GRID */}
                    {standardProducts.length > 0 && (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {standardProducts.map((product, idx) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: idx * 0.04 }}
                          >
                            <ProductCard
                              product={product}
                              dark={false}
                              isAddedToInquiry={inquiryItems.some(item => item.id === product.id)}
                              onToggleInquiry={onToggleInquiry}
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* 2. SOFT LAUNCH / LISTING SOON SUB-SECTION DIVIDER & GRID */}
                    {softLaunchProducts.length > 0 && (
                      <div className="pt-4 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="h-px flex-1 bg-purple-200" />
                          <span className="px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-900 text-xs font-extrabold flex items-center gap-1.5 uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            Listing Soon — Upcoming Additions in {bu} ({softLaunchProducts.length})
                          </span>
                          <div className="h-px flex-1 bg-purple-200" />
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {softLaunchProducts.map((product, idx) => (
                            <motion.div
                              key={product.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35, delay: idx * 0.04 }}
                            >
                              <ProductCard
                                product={product}
                                dark={false}
                                isAddedToInquiry={inquiryItems.some(item => item.id === product.id)}
                                onToggleInquiry={onToggleInquiry}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 px-6 bg-white rounded-2xl border border-slate-200 max-w-lg mx-auto shadow-sm"
            >
              <SearchX className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Matching Solutions Found</h3>
              <p className="text-slate-600 text-sm mb-6">
                No solutions found matching your current search query or sub-category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveSubCat('All');
                  setStatusFilter('all');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition-colors shadow-md shadow-amber-500/20"
              >
                <RotateCcw className="w-4 h-4" />
                Clear Filters & Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>

        {/* ── Performance Metrics Table ───────────────────────────────── */}
        <div className="mt-20 pt-12 border-t border-slate-200/80">
          <h2 className="sr-only">Performance Benchmarks</h2>
          <ScannableMetricsTable />
        </div>

      </div>
    </section>
  );
};
