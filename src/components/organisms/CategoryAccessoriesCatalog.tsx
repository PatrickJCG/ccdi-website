import React, { useState, useMemo } from 'react';
import { Search, X, RotateCcw, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import type { Product, BusinessUnit } from '../../data/mockProducts';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { ProductCard } from '../molecules/ProductCard';

export interface CategoryAccessoriesCatalogProps {
  businessUnit: BusinessUnit;
  eyebrow?: string;
  title: string;
  subtitle: string;
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  accentTheme?: 'amber' | 'sky' | 'gold';
  customProducts?: Product[];
}

export const CategoryAccessoriesCatalog: React.FC<CategoryAccessoriesCatalogProps> = ({
  businessUnit,
  eyebrow = 'EQUIPMENT & ACCESSORIES INQUIRY',
  title,
  subtitle,
  inquiryItems,
  onToggleInquiry,
  accentTheme = 'amber',
  customProducts,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubCat, setActiveSubCat] = useState<string>('All');

  // Products belonging to this Business Unit or custom product set
  const categoryProducts = useMemo(() => {
    if (customProducts && customProducts.length > 0) {
      return customProducts;
    }
    return MOCK_PRODUCTS.filter((p) => p.businessUnit === businessUnit);
  }, [businessUnit, customProducts]);

  // Dynamic Sub-categories for this specific category
  const subCategories = useMemo(() => {
    const set = new Set<string>();
    categoryProducts.forEach((p) => {
      if (p.subCategory && p.subCategory !== 'All') {
        set.add(p.subCategory);
      }
    });
    return ['All', ...Array.from(set)];
  }, [categoryProducts]);

  // Filtered products based on search & sub-category
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      const matchesSubCat = activeSubCat === 'All' || product.subCategory === activeSubCat;

      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesSubCat;

      const matchesSearch =
        product.title.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.subCategory.toLowerCase().includes(q) ||
        product.badge.toLowerCase().includes(q) ||
        (product.speciesTags && product.speciesTags.some((t) => t.toLowerCase().includes(q))) ||
        (product.buildingSpecs?.features &&
          product.buildingSpecs.features.some((f) => f.toLowerCase().includes(q)));

      return matchesSubCat && matchesSearch;
    });
  }, [categoryProducts, activeSubCat, searchQuery]);

  // Count how many items from this specific catalog list are currently added to inquiry
  const addedCountForThisCategory = useMemo(() => {
    const ids = new Set(categoryProducts.map((p) => p.id));
    return inquiryItems.filter((item) => ids.has(item.id)).length;
  }, [inquiryItems, categoryProducts]);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const offset = 72;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      window.scrollTo({ top: elementRect - bodyRect - offset, behavior: 'smooth' });
    }
  };

  const eyebrowColor =
    accentTheme === 'sky'
      ? 'text-sky-600'
      : accentTheme === 'gold'
      ? 'text-amber-700'
      : 'text-amber-600';

  return (
    <section className="relative py-20 sm:py-24 bg-white border-b border-slate-200 overflow-hidden font-sans text-left">
      {/* Architectural Top-Right Corner Accent */}
      <img
        src="/images/accents/card-corner-accent.png"
        alt=""
        className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200">
          <div className="max-w-2xl space-y-2">
            <span className={`font-sans text-xs uppercase tracking-widest font-bold block ${eyebrowColor}`}>
              {eyebrow}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              {title}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Quick Inquiry Status Banner */}
          <div className="flex items-center gap-3 shrink-0">
            {addedCountForThisCategory > 0 ? (
              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[2px] bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{addedCountForThisCategory} {addedCountForThisCategory === 1 ? 'Item' : 'Items'} in Inquiry</span>
              </button>
            ) : (
              <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-[2px] border border-slate-200">
                {categoryProducts.length} Accessories & Systems Available
              </div>
            )}
          </div>
        </div>

        {/* ── Search & Sub-Category Filter Controls (Similar to Full Catalog) ── */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-[2px] border border-slate-200 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* 1. Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search systems, accessories, model specs..."
                className="w-full pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-[2px] text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Reset Button if filtered */}
            {(searchQuery || activeSubCat !== 'All') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveSubCat('All');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] text-xs font-semibold text-slate-600 hover:text-slate-950 bg-white border border-slate-300 hover:bg-slate-100 transition-colors shrink-0 self-start md:self-auto cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* 2. Sub-Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
              <SlidersHorizontal className="w-3 h-3 text-slate-400" />
              Filter by:
            </span>
            {subCategories.map((subCat) => {
              const count =
                subCat === 'All'
                  ? categoryProducts.length
                  : categoryProducts.filter((p) => p.subCategory === subCat).length;
              const isActive = activeSubCat === subCat;

              return (
                <button
                  key={subCat}
                  type="button"
                  onClick={() => setActiveSubCat(subCat)}
                  className={`px-3 py-1.5 rounded-[2px] text-xs font-bold transition-colors cursor-pointer border flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#0B192C] text-white border-[#0B192C] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                >
                  <span>{subCat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-normal ${
                      isActive ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Products & Accessories Grid ── */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isAdded = inquiryItems.some((item) => item.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  dark={false}
                  isAddedToInquiry={isAdded}
                  onToggleInquiry={onToggleInquiry}
                />
              );
            })}
          </div>
        ) : (
          /* Empty Search Results State */
          <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-[2px] space-y-3">
            <p className="text-sm font-bold text-slate-700">
              No equipment or accessories match your filter criteria.
            </p>
            <p className="text-xs text-slate-500">
              Try searching with different terms or reset your filters to see all available systems.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveSubCat('All');
              }}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-[2px] bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition-colors shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Show All {categoryProducts.length} Items</span>
            </button>
          </div>
        )}

        {/* Bottom Helper Bar */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-[2px] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>
            Need customized dimensions, specialized voltage ratings, or turnkey civil integration for your site?
          </p>
          <button
            type="button"
            onClick={scrollToContact}
            className="text-amber-700 hover:text-amber-900 font-bold underline whitespace-nowrap cursor-pointer"
          >
            Submit Inquiry for Custom Specs →
          </button>
        </div>

      </div>
    </section>
  );
};
