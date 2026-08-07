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
  Check,
  RotateCcw,
  SearchX,
  ChevronRight,
  Info,
} from 'lucide-react';
import { EndToEndHeader } from './EndToEndHeader';
import { useExternalFilter, BU_MAP } from '../../hooks/useExternalFilter';

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

  // Multi-category selection state & search query
  const [selectedBUs, setSelectedBUs] = useState<BusinessUnit[]>(['Poultry Farm Equipment']);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSubCat, setActiveSubCat] = useState<string>('All');
  const sectionRef = useRef<HTMLDivElement>(null);

  // Toggle single BU selection in multi-select state
  const handleBUToggle = useCallback((bu: BusinessUnit) => {
    setSelectedBUs(prev => {
      if (prev.includes(bu)) {
        // Keep at least one selected if toggled off
        if (prev.length === 1) return prev;
        return prev.filter(b => b !== bu);
      } else {
        return [...prev, bu];
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

  // Filtered products considering search query + sub-category selection
  const filtered = useMemo(() => {
    return matchingBUProducts.filter(p => {
      const matchesSubCat = activeSubCat === 'All' || p.subCategory === activeSubCat;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesSubCat;

      const matchesSearch =
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.businessUnit.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q) ||
        (p.speciesTags && p.speciesTags.some(t => t.toLowerCase().includes(q))) ||
        (p.buildingSpecs?.buildingType && p.buildingSpecs.buildingType.toLowerCase().includes(q));

      return matchesSubCat && matchesSearch;
    });
  }, [matchingBUProducts, activeSubCat, searchQuery]);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200/80 bg-grid-pattern"
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-8">

        {/* ── End-To-End Execution Header Design ──────────────────────── */}
        <div className="mb-6">
          <EndToEndHeader
            tag="Solutions Catalog & Execution"
            title="End-To-End Turnkey Agro-Industrial Catalog"
            subtitle="Click on any execution step below (1–8) to expand full technical phase specifications and explore our specialized catalog solutions."
            lightMode={true}
          />
        </div>

        {/* ── Data Source Legend Notice ────────────────────────── */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:px-6 sm:py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs shadow-sm">
          <div className="flex items-center gap-3 text-slate-700">
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-sm">Sample Catalog Data Notice</p>
              <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                Items tagged <span className="text-blue-700 font-bold">Sample Data</span> are illustrative sample entries for Hatchery, Feedmill, and Solar demonstration.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
              <Info className="w-3.5 h-3.5 text-blue-600" /> Sample Data (15 Entries)
            </span>
          </div>
        </div>

        {/* ── Interactive Search & Filter Action Bar ──────────────────────── */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveSubCat('All');
              }}
              placeholder="Search solutions by keyword, model, or technical parameters..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:bg-white transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Multi-Select Quick Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setSelectedBUs([...BUSINESS_UNITS]);
                setActiveSubCat('All');
              }}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              Select All Categories
            </button>
            {(selectedBUs.length < BUSINESS_UNITS.length || searchQuery || activeSubCat !== 'All') && (
              <button
                onClick={() => {
                  setSelectedBUs(['Poultry Farm Equipment']);
                  setSearchQuery('');
                  setActiveSubCat('All');
                }}
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* ── Business Unit Photo Cards (Multi-Selectable) ────────────────────────── */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {BUSINESS_UNITS.map(bu => {
              const meta = BU_META[bu];
              const count = MOCK_PRODUCTS.filter(p => p.businessUnit === bu).length;
              const isSelected = selectedBUs.includes(bu);
              return (
                <motion.button
                  key={bu}
                  onClick={() => handleBUToggle(bu)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={[
                    'relative overflow-hidden rounded-2xl text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2',
                    isSelected
                      ? 'ring-2 ring-amber-400 border-amber-400 shadow-xl shadow-amber-500/20'
                      : 'ring-1 ring-slate-200 hover:ring-slate-300 shadow-sm opacity-90 hover:opacity-100',
                  ].join(' ')}
                  style={{ minHeight: '140px' }}
                >
                  {/* Photo background */}
                  <img
                    src={`${meta.coverImage.replace(/w=800/, 'w=400')}&q=70`}
                    alt={bu}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                    style={{ transform: isSelected ? 'scale(1.04)' : undefined }}
                  />

                  {/* Dark Overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: isSelected
                        ? 'linear-gradient(160deg, rgba(15,23,42,0.40) 0%, rgba(15,23,42,0.78) 100%)'
                        : 'linear-gradient(160deg, rgba(15,23,42,0.60) 0%, rgba(15,23,42,0.88) 100%)',
                    }}
                  />

                  {/* Active Gold Tint */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-amber-500/10 pointer-events-none" />
                  )}

                  {/* Card Content */}
                  <div className="relative z-10 p-4 flex flex-col justify-between h-full" style={{ minHeight: '140px' }}>
                    {/* Top Row: Selected Badge & Indicator */}
                    <div className="flex items-start justify-between">
                      {isSelected ? (
                        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 shadow-md">
                          SELECTED
                        </span>
                      ) : (
                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/40 text-white/80 border border-white/20">
                          {count} ITEMS
                        </span>
                      )}

                      {/* Top Right Checkmark / Chevron */}
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <span className="text-white/40 text-sm">›</span>
                      )}
                    </div>

                    {/* Bottom Row: Category Name & Count */}
                    <div className="mt-auto">
                      <p className="text-white font-extrabold text-sm sm:text-base leading-tight font-heading mb-0.5 drop-shadow-md">
                        {bu}
                      </p>
                      <p className={`text-[11px] font-semibold ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                        {count} solutions
                      </p>
                    </div>
                  </div>

                  {/* Active bottom border accent */}
                  {isSelected && (
                    <motion.div
                      layoutId="buPhotoAccent"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Active Category Description Bar (with Gold Accent Bar) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBUs.join('-')}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-1.5 h-8 rounded-full bg-amber-500 shrink-0" />
                {selectedBUs.length === 1 ? (
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <span className="text-slate-900 font-extrabold">{selectedBUs[0]} — </span>
                    {BU_META[selectedBUs[0]].description}
                  </p>
                ) : (
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <span className="text-slate-900 font-extrabold">Multi-Category Selection — </span>
                    Displaying agro-industrial solutions across <span className="font-extrabold text-amber-700">{selectedBUs.join(', ')}</span>.
                  </p>
                )}
              </div>
              <span className="shrink-0 text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-3.5 py-1.5 rounded-full whitespace-nowrap self-end sm:self-auto">
                {matchingBUProducts.length} solutions
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Sub-Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5 items-center">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mr-1">
              FILTER SUB-CATEGORY:
            </span>
            <button
              onClick={() => setActiveSubCat('All')}
              className={[
                'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer',
                activeSubCat === 'All'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/20 scale-[1.03]'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100',
              ].join(' ')}
            >
              All
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                activeSubCat === 'All' ? 'bg-slate-950 text-amber-400' : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                {matchingBUProducts.length}
              </span>
            </button>
            {subCats.map(sc => {
              const scCount = matchingBUProducts.filter(p => p.subCategory === sc).length;
              const isActiveSC = activeSubCat === sc;
              return (
                <button
                  key={sc}
                  onClick={() => setActiveSubCat(sc)}
                  className={[
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer',
                    isActiveSC
                      ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/20 scale-[1.03]'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100',
                  ].join(' ')}
                >
                  {sc}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    isActiveSC ? 'bg-slate-950 text-amber-400' : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {scCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Results Status Bar ──────────────────────────────────────────── */}
        <div className="flex items-center justify-between pt-2 text-xs text-slate-600 border-t border-slate-200/80">
          <span>
            Showing <span className="text-amber-600 font-extrabold">{filtered.length}</span> of{' '}
            <span className="text-slate-800 font-bold">{matchingBUProducts.length}</span> solutions
            {searchQuery && <> matching "<span className="font-bold text-slate-900">{searchQuery}</span>"</>}
          </span>
          <span className="hidden sm:flex items-center gap-1 text-slate-500">
            <ChevronRight className="w-3.5 h-3.5" />
            Scroll to explore catalog
          </span>
        </div>

        {/* ── Product Catalog Grid ─────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${selectedBUs.join('-')}-${activeSubCat}-${searchQuery}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard
                    product={product}
                    dark={false}
                    isAddedToInquiry={inquiryItems.some(item => item.id === product.id)}
                    onToggleInquiry={onToggleInquiry}
                  />
                </motion.div>
              ))}
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
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition-colors shadow-md shadow-amber-500/20"
              >
                <RotateCcw className="w-4 h-4" />
                Clear Filters & Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Performance Metrics Table ───────────────────────────────── */}
        <div className="mt-20 pt-12 border-t border-slate-200/80">
          <h2 className="sr-only">Performance Benchmarks</h2>
          <ScannableMetricsTable />
        </div>

      </div>
    </section>
  );
};
