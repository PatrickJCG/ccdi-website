import React, { useState, useRef, useEffect } from 'react';
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
  RotateCcw,
  SearchX,
  ChevronRight,
  LayoutGrid,
} from 'lucide-react';

// ─── Main Component ────────────────────────────────────────────────────────
export interface ProductCatalogProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  inquiryItems,
  onToggleInquiry,
}) => {
  const [activeBU, setActiveBU] = useState<BusinessUnit>('Poultry Farm Equipment');
  const [activeSubCat, setActiveSubCat] = useState<string>('All');
  const sectionRef = useRef<HTMLDivElement>(null);

  // Reset sub-category when BU changes
  const handleBUChange = (bu: BusinessUnit) => {
    setActiveBU(bu);
    setActiveSubCat('All');
  };

  // Listen for external filter events (from home page quick links)
  useEffect(() => {
    const handleFilter = (e: Event) => {
      const spec = (e as CustomEvent).detail as string;
      // Map legacy category names to BU
      const legacyMap: Record<string, BusinessUnit> = {
        'Poultry Facilities': 'Poultry Farm Equipment',
        'Hatchery Construction': 'Hatchery',
        'Feedmill Systems': 'Feedmill',
        'Solar Energy Integration': 'Solar Systems',
      };
      const bu = legacyMap[spec] ?? 'Poultry Farm Equipment';
      handleBUChange(bu);
      const target = document.getElementById('products');
      if (target) {
        const offset = 80;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };
    window.addEventListener('filter-species', handleFilter);
    window.addEventListener('filter-function', handleFilter);
    return () => {
      window.removeEventListener('filter-species', handleFilter);
      window.removeEventListener('filter-function', handleFilter);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const orb1Y = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const headerY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  const buProducts = MOCK_PRODUCTS.filter(p => p.businessUnit === activeBU);
  const subCats = BU_META[activeBU].subCategories;
  const filtered =
    activeSubCat === 'All'
      ? buProducts
      : buProducts.filter(p => p.subCategory === activeSubCat);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(170deg, #06121E 0%, #0D1E30 30%, #102A43 60%, #0A1A2D 85%, #06121E 100%)',
      }}
    >
      {/* ── Subtle grid overlay ─────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            'linear-gradient(to right, rgba(245,158,11,0.04) 1px, transparent 1px)',
            'linear-gradient(to bottom, rgba(245,158,11,0.04) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '56px 56px',
        }}
        aria-hidden
      />

      {/* ── Diagonal accent ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(110deg, transparent 0%, rgba(245,158,11,0.06) 45%, transparent 75%)',
        }}
        aria-hidden
      />

      {/* ── Glow orbs ───────────────────────────────────────────── */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,42,67,0.70) 0%, transparent 70%)' }} />
      </motion.div>
      <motion.div
        style={{ y: orb2Y }}
        className="absolute -bottom-40 -right-40 w-[640px] h-[640px] rounded-full pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(180,83,9,0.08) 50%, transparent 70%)' }} />
      </motion.div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

        {/* ── Section Header ──────────────────────────────────────── */}
        <motion.div style={{ y: headerY }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 mb-5">
            <LayoutGrid className="w-3.5 h-3.5" />
            Solutions Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading mb-4 leading-tight">
            Agro-Industrial Engineering &{' '}
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              Renewable Energy
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Integrated infrastructure solutions across four specialized business units — engineered for performance, biosecurity, and sustainability.
          </p>
        </motion.div>

        {/* ── Business Unit Tab Navigation ────────────────────────── */}
        <div className="mb-8">
          {/* BU Photo Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {BUSINESS_UNITS.map(bu => {
              const meta = BU_META[bu];
              const count = MOCK_PRODUCTS.filter(p => p.businessUnit === bu).length;
              const isActive = activeBU === bu;
              return (
                <motion.button
                  key={bu}
                  onClick={() => handleBUChange(bu)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={[
                    'relative overflow-hidden rounded-2xl text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
                    isActive
                      ? 'ring-2 ring-amber-400 shadow-2xl shadow-amber-500/30'
                      : 'ring-1 ring-white/10 hover:ring-white/25 shadow-lg shadow-black/40',
                  ].join(' ')}
                  style={{ minHeight: '140px' }}
                >
                  {/* Photo background */}
                  <img
                    src={meta.coverImage}
                    alt={bu}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                    style={{ transform: isActive ? 'scale(1.04)' : undefined }}
                  />

                  {/* Gradient overlay — always dark base */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isActive
                        ? 'linear-gradient(160deg, rgba(6,12,20,0.55) 0%, rgba(6,12,20,0.80) 100%)'
                        : 'linear-gradient(160deg, rgba(6,12,20,0.65) 0%, rgba(6,12,20,0.88) 100%)',
                    }}
                  />

                  {/* Active gold tint */}
                  {isActive && (
                    <div className="absolute inset-0 bg-amber-500/12" />
                  )}

                  {/* Content */}
                  <div className="relative z-10 p-4 flex flex-col justify-between h-full" style={{ minHeight: '140px' }}>
                    {/* Top: active badge */}
                    <div className="flex items-start justify-between">
                      <span className={[
                        'text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border',
                        isActive
                          ? 'bg-amber-500 border-amber-400 text-white'
                          : 'bg-white/10 border-white/20 text-white/70',
                      ].join(' ')}>
                        {isActive ? 'Selected' : `${count} items`}
                      </span>

                      {/* Chevron indicator */}
                      <span className={`text-lg transition-transform duration-300 ${isActive ? 'text-amber-400 scale-110' : 'text-white/40'}`}>
                        {isActive ? '✓' : '›'}
                      </span>
                    </div>

                    {/* Bottom: BU name + count */}
                    <div className="mt-auto">
                      <p className="text-white font-extrabold text-sm sm:text-base leading-tight font-heading mb-1 drop-shadow-md">
                        {bu}
                      </p>
                      <p className={`text-[11px] font-semibold ${isActive ? 'text-amber-300' : 'text-white/55'}`}>
                        {count} solutions
                      </p>
                    </div>
                  </div>

                  {/* Active bottom border glow */}
                  {isActive && (
                    <motion.div
                      layoutId="buPhotoAccent"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* BU Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBU}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col sm:flex-row sm:items-start gap-3 mb-5 px-1 py-3 border-l-2 border-amber-500/60 pl-4"
            >
              <p className="text-sm text-slate-300 leading-relaxed flex-1">
                <span className="text-amber-400 font-bold">{activeBU} — </span>
                {BU_META[activeBU].description}
              </p>
              <span className="shrink-0 text-[11px] font-bold text-amber-500/80 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                {buProducts.length} solutions
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Sub-Category Filter Pills */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`subcat-${activeBU}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap gap-2.5 items-center"
            >
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider mr-1">Filter Sub-Category:</span>
              {subCats.map(sc => {
                const scCount = sc === 'All' ? buProducts.length : buProducts.filter(p => p.subCategory === sc).length;
                const isActiveSC = activeSubCat === sc;
                return (
                  <button
                    key={sc}
                    onClick={() => setActiveSubCat(sc)}
                    className={[
                      'flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer',
                      isActiveSC
                        ? 'bg-amber-400 border-amber-300 text-slate-950 font-black shadow-lg shadow-amber-400/30 scale-[1.03]'
                        : 'bg-white/10 border-white/20 text-slate-200 hover:text-white hover:border-amber-400/50 hover:bg-white/15',
                    ].join(' ')}
                  >
                    {sc}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                      isActiveSC ? 'bg-slate-950 text-amber-400' : 'bg-white/15 text-slate-300'
                    }`}>
                      {scCount}
                    </span>
                  </button>
                );
              })}
              {activeSubCat !== 'All' && (
                <button
                  onClick={() => setActiveSubCat('All')}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30 hover:bg-amber-400 hover:text-slate-950 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Status bar ──────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
          <span>
            Showing <span className="text-amber-400 font-bold">{filtered.length}</span> of{' '}
            <span className="text-slate-300 font-bold">{buProducts.length}</span> solutions in{' '}
            <span className="text-white font-bold">{activeBU}</span>
          </span>
          <span className="hidden sm:flex items-center gap-1 text-slate-600">
            <ChevronRight className="w-3.5 h-3.5" />
            Scroll to explore
          </span>
        </div>

        {/* ── Product Grid ─────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${activeBU}-${activeSubCat}`}
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
                  transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
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
              className="text-center py-16 px-6 bg-white/5 rounded-2xl border border-white/10 max-w-lg mx-auto"
            >
              <SearchX className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Products in This Sub-Category</h3>
              <p className="text-slate-400 text-sm mb-6">
                No solutions found under <span className="text-amber-300 font-semibold">"{activeSubCat}"</span> in {activeBU}.
              </p>
              <button
                onClick={() => setActiveSubCat('All')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm transition-colors shadow-lg shadow-amber-600/30"
              >
                <RotateCcw className="w-4 h-4" />
                Show All {activeBU}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Performance Benchmarks ───────────────────────────────── */}
        <div className="mt-24 pt-12 border-t border-white/8">
          <h2 className="sr-only">Performance Benchmarks</h2>
          <ScannableMetricsTable />
        </div>

      </div>
    </section>
  );
};
