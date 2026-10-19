import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Package,
  Wrench,
  Search,
  X,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import type { Product } from '../data/mockProducts';
import { PoultrySubNav } from '../components/molecules/PoultrySubNav';
import { ContactSection } from '../components/organisms/ContactSection';
import { ProductCard } from '../components/molecules/ProductCard';
import { BROILER_CATALOG_PRODUCTS } from '../data/broilerCatalogProducts';
import { LAYER_CATALOG_PRODUCTS } from '../data/layerCatalogProducts';
import { POULTRY_BREEDER_ACCESSORIES } from '../data/poultryBreederAccessories';

export interface AccessoriesPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

// ── Segment definitions ──────────────────────────────────────────────────────
const SEGMENTS = [
  {
    id: 'all' as const,
    label: 'All Products',
    shortLabel: 'All',
    description: 'View the complete range of poultry farm accessories & spare parts.',
    icon: Package,
  },
  {
    id: 'broiler' as const,
    label: 'Broiler Equipment',
    shortLabel: 'Broiler',
    description:
      'Cage systems, feeding pans, nipple drinkers, climate controllers, fans, and prefab structures for broiler operations.',
    icon: Wrench,
  },
  {
    id: 'breeder' as const,
    label: 'Broiler Breeder Equipment',
    shortLabel: 'Breeder',
    description:
      'Breeder-specific pan & chain feeders, nipple drinking lines, anti-skid slat floors, nesting systems, and EI-6000 controllers.',
    icon: Wrench,
  },
  {
    id: 'layer' as const,
    label: 'Commercial Layer Equipment',
    shortLabel: 'Layer',
    description:
      'Traveling hopper & chain cages, belt egg collectors, buffers, PVC shielders, and cage maintenance hardware.',
    icon: Wrench,
  },
];

type SegmentId = 'all' | 'broiler' | 'breeder' | 'layer';

// Tag all products with their segment label for filtering
const ALL_ACCESSORIES = [
  ...BROILER_CATALOG_PRODUCTS.map((p) => ({ ...p, _segment: 'broiler' as SegmentId })),
  ...POULTRY_BREEDER_ACCESSORIES.map((p) => ({ ...p, _segment: 'breeder' as SegmentId })),
  ...LAYER_CATALOG_PRODUCTS.map((p) => ({ ...p, _segment: 'layer' as SegmentId })),
];

export const AccessoriesPage: React.FC<AccessoriesPageProps> = ({
  inquiryItems,
  onToggleInquiry,
  onRemoveInquiryItem,
}) => {
  const [activeSegment, setActiveSegment] = useState<SegmentId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubCat, setActiveSubCat] = useState<string>('All');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Reset sub-category and search when segment changes
  useEffect(() => {
    setActiveSubCat('All');
    setSearchQuery('');
  }, [activeSegment]);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const offset = 72;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      window.scrollTo({ top: elementRect - bodyRect - offset, behavior: 'smooth' });
    }
  };

  // Products for the active segment
  const segmentProducts = useMemo(() => {
    if (activeSegment === 'all') return ALL_ACCESSORIES;
    return ALL_ACCESSORIES.filter((p) => p._segment === activeSegment);
  }, [activeSegment]);

  // Dynamic sub-categories
  const subCategories = useMemo(() => {
    const set = new Set<string>();
    segmentProducts.forEach((p) => {
      if (p.subCategory && p.subCategory !== 'All') set.add(p.subCategory);
    });
    return ['All', ...Array.from(set)];
  }, [segmentProducts]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return segmentProducts.filter((product) => {
      const matchesSubCat = activeSubCat === 'All' || product.subCategory === activeSubCat;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesSubCat;
      const matchesSearch =
        product.title.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        (product.subCategory ?? '').toLowerCase().includes(q) ||
        (product.badge ?? '').toLowerCase().includes(q) ||
        (product.speciesTags?.some((t) => t.toLowerCase().includes(q)) ?? false) ||
        (product.buildingSpecs?.features?.some((f) => f.toLowerCase().includes(q)) ?? false);
      return matchesSubCat && matchesSearch;
    });
  }, [segmentProducts, activeSubCat, searchQuery]);

  const addedCount = useMemo(() => {
    const ids = new Set(ALL_ACCESSORIES.map((p) => p.id));
    return inquiryItems.filter((item) => ids.has(item.id)).length;
  }, [inquiryItems]);

  const currentSegmentMeta = SEGMENTS.find((s) => s.id === activeSegment)!;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ── Poultry Sub-Nav */}
      <PoultrySubNav activeTab="accessories" />

      {/* ── Breadcrumb */}
      <div className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs font-mono text-slate-500 flex-wrap">
          <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/solutions" className="hover:text-amber-600 transition-colors">Solutions</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/solutions/poultry" className="hover:text-amber-600 transition-colors">Poultry</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-amber-600 font-bold">Accessories &amp; Spare Parts</span>
        </div>
      </div>

      {/* ── Hero Section */}
      <section className="relative bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-80 sm:w-[420px] h-auto object-contain object-right-top pointer-events-none select-none opacity-20"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/images/branding/ccdi-logo.png"
                alt="CCDI"
                className="h-8 sm:h-9 w-auto object-contain"
              />
              <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
                Poultry Farm &middot; Complete Catalog
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Accessories &amp;{' '}
              <span className="text-amber-600">Spare Parts</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal mb-8 max-w-2xl">
              Browse and add CCDI's complete inventory of poultry farm accessories and spare parts —
              from broiler cage systems, feeding pans, and climate controllers to layer belt egg collectors,
              breeder nesting modules, and slatted floor panels.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={scrollToContact}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-[2px] transition-colors shadow-sm cursor-pointer"
              >
                Send Inquiry
                <ChevronRight className="w-4 h-4" />
              </button>
              {addedCount > 0 && (
                <span className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-300 text-amber-800 font-mono text-xs rounded-[2px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {addedCount} item{addedCount !== 1 ? 's' : ''} in inquiry
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Segment Selector */}
      <section className="bg-slate-100 border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {SEGMENTS.map((seg) => {
              const Icon = seg.icon;
              const active = activeSegment === seg.id;
              return (
                <button
                  key={seg.id}
                  type="button"
                  onClick={() => setActiveSegment(seg.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-[2px] font-sans text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                    active
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-white border border-slate-300 text-slate-700 hover:text-slate-900 hover:border-amber-500 hover:bg-amber-50/50'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-slate-950' : 'text-slate-500'}`}
                  />
                  <span>{seg.shortLabel}</span>
                </button>
              );
            })}
          </div>
          <p className="text-slate-600 text-xs font-normal leading-relaxed max-w-2xl">
            {currentSegmentMeta.description}
          </p>
        </div>
      </section>

      {/* ── Catalog Section */}
      <section id="accessories-catalog" className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Controls row */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">

            {/* Sub-category filter */}
            <div className="flex flex-wrap gap-2">
              {subCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveSubCat(cat)}
                  className={`px-3 py-1.5 rounded-[2px] font-mono text-[11px] font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                    activeSubCat === cat
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'bg-white border border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search + reset */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search accessories..."
                  className="w-56 sm:w-64 pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-[2px] font-sans text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              {(searchQuery || activeSubCat !== 'All') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveSubCat('All');
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 rounded-[2px] font-mono text-[11px] text-slate-600 hover:text-amber-700 hover:border-amber-400 hover:bg-amber-50/50 transition-all cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-slate-500">
              Showing{' '}
              <span className="text-amber-600 font-bold">{filteredProducts.length}</span>
              {' '}of{' '}
              <span className="text-slate-900 font-semibold">{segmentProducts.length}</span>{' '}
              {activeSegment === 'all' ? 'total' : currentSegmentMeta.shortLabel.toLowerCase()} products
            </span>
            {addedCount > 0 && (
              <button
                type="button"
                onClick={scrollToContact}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-300 text-amber-800 font-mono text-[11px] rounded-[2px] hover:bg-amber-100 transition-colors cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-3 h-3" />
                {addedCount} in inquiry &middot; Review
              </button>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product, idx) => {
                const isAdded = inquiryItems.some((item) => item.id === product.id);
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.4) }}
                  >
                    <ProductCard
                      product={product}
                      dark={false}
                      isAddedToInquiry={isAdded}
                      onToggleInquiry={onToggleInquiry}
                    />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-slate-200 rounded-[2px] p-8">
              <Package className="w-12 h-12 text-slate-300 mb-4" />
              <p className="text-slate-800 font-semibold text-sm mb-1">No products match your filters</p>
              <p className="text-slate-500 text-xs mb-4">Try adjusting the category or search term</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveSubCat('All');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-[2px] text-xs text-slate-700 hover:text-amber-700 hover:border-amber-400 hover:bg-amber-50/50 transition-all cursor-pointer font-mono shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Banner */}
      <section className="bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 block mb-2 font-bold">
              CUSTOM QUOTATION
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
              Need a specific spare part or accessory?
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              Our engineering team can source, specify, and supply individual components, replacement
              parts, or bulk accessory packages tailored to your existing farm setup.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              type="button"
              onClick={scrollToContact}
              className="flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-[2px] transition-colors shadow-sm cursor-pointer"
            >
              Send Inquiry
              <ChevronRight className="w-4 h-4" />
            </button>
            <Link
              to="/solutions/poultry"
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-950 font-semibold text-sm rounded-[2px] transition-colors shadow-xs"
            >
              Back to Poultry Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* ── Contact Section */}
      <ContactSection
        inquiryItems={inquiryItems}
        onRemoveInquiryItem={onRemoveInquiryItem}
      />
    </div>
  );
};
