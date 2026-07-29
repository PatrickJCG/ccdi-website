import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, RotateCcw, ChevronLeft, ChevronRight, CheckSquare, Square, SlidersHorizontal, Sparkles } from 'lucide-react';
import { MOCK_PRODUCTS, BUSINESS_UNITS } from '../../data/mockProducts';
import type { Product, BusinessUnit } from '../../data/mockProducts';
import { ProductCard } from '../molecules';
import { Button } from '../atoms';

export interface FullSolutionsCatalogProps {
  inquiryItems?: Product[];
  onToggleInquiry?: (product: Product) => void;
}

export const FullSolutionsCatalog: React.FC<FullSolutionsCatalogProps> = ({
  inquiryItems = [],
  onToggleInquiry,
}) => {
  // State for search, active categories, active subcategories, and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBUs, setSelectedBUs] = useState<BusinessUnit[]>([]);
  const [selectedSubCats, setSelectedSubCats] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Available sub-categories derived from MOCK_PRODUCTS
  const allSubCategories = useMemo(() => {
    const set = new Set<string>();
    MOCK_PRODUCTS.forEach((p) => {
      if (p.subCategory && p.subCategory !== 'All') {
        set.add(p.subCategory);
      }
    });
    return Array.from(set);
  }, []);

  // Filter handlers
  const handleBUCheckbox = (bu: BusinessUnit) => {
    setCurrentPage(1);
    setSelectedBUs((prev) =>
      prev.includes(bu) ? prev.filter((b) => b !== bu) : [...prev, bu]
    );
  };

  const handleSubCatCheckbox = (subCat: string) => {
    setCurrentPage(1);
    setSelectedSubCats((prev) =>
      prev.includes(subCat) ? prev.filter((s) => s !== subCat) : [...prev, subCat]
    );
  };

  const handleResetFilters = () => {
    setSelectedBUs([]);
    setSelectedSubCats([]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Filtered Products Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // 1. Business Unit Filter
      if (selectedBUs.length > 0 && !selectedBUs.includes(product.businessUnit)) {
        return false;
      }
      // 2. Sub-Category Filter
      if (selectedSubCats.length > 0 && !selectedSubCats.includes(product.subCategory)) {
        return false;
      }
      // 3. Predictive Live Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = product.title.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchSub = product.subCategory.toLowerCase().includes(q);
        const matchBU = product.businessUnit.toLowerCase().includes(q);
        const matchSpecies = product.speciesTags.some((tag) => tag.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchSub && !matchBU && !matchSpecies) {
          return false;
        }
      }
      return true;
    });
  }, [selectedBUs, selectedSubCats, searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const catalogHeader = document.getElementById('catalog-content');
    if (catalogHeader) {
      catalogHeader.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* ── 1. CATALOG HEADER HERO BANNER ──────────────────────────── */}
      <section
        className="relative text-white py-16 sm:py-24 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #102A43 0%, #07162A 60%, #040D18 100%)',
        }}
      >
        {/* Glows & Mesh Accent */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Subtle branded grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,158,11,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span className="text-amber-400/80 font-bold">&gt;</span>
            <span className="text-amber-400 font-semibold">Solutions</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/12 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Turnkey Agro-Industrial Catalog</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white drop-shadow-md">
              Our Full <span className="text-amber-400">Solutions Catalog</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Explore our complete suite of agro-industrial solutions across Poultry Facilities, Hatcheries, Feedmills, and Solar Energy Integration.
            </p>
          </div>
        </div>

        {/* Bottom Gold Accent Stripe */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />
      </section>

      {/* ── 2. DYNAMIC 2-COLUMN CATALOG INTERFACE ─────────────────────── */}
      <div id="catalog-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* ── LEFT SIDEBAR: FILTERS ────────────────────────────────── */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border-2 border-slate-200/90 shadow-xl shadow-slate-200/80 sticky top-24 overflow-hidden space-y-0">
              
              {/* Filter Header Banner */}
              <div className="bg-gradient-to-r from-ccdi-navy via-[#102A43] to-[#1E3E66] p-4 sm:p-5 flex items-center justify-between border-b border-white/10 shadow-md">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/30">
                    <SlidersHorizontal className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-white font-extrabold text-base font-heading leading-snug">
                      Filter Solutions
                    </h2>
                    <p className="text-[11px] text-slate-300 font-medium">Refine by capability</p>
                  </div>
                </div>

                {(selectedBUs.length > 0 || selectedSubCats.length > 0 || searchQuery) && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-slate-950 hover:text-black font-extrabold flex items-center gap-1 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition-all shadow-sm cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              <div className="p-5 space-y-6">
                {/* Active Filter Indicator Badge */}
                {(selectedBUs.length > 0 || selectedSubCats.length > 0) && (
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-bold">
                    <span>Active Filters:</span>
                    <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                      {selectedBUs.length + selectedSubCats.length} Selected
                    </span>
                  </div>
                )}

                {/* Filter Section 1: Main Category (Business Unit) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 font-heading flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                      Core Category
                    </h3>
                    <span className="text-[10px] text-slate-400 font-medium">Select multiple</span>
                  </div>

                  <div className="space-y-2">
                    {BUSINESS_UNITS.map((bu) => {
                      const isChecked = selectedBUs.includes(bu);
                      const count = MOCK_PRODUCTS.filter((p) => p.businessUnit === bu).length;
                      return (
                        <button
                          key={bu}
                          onClick={() => handleBUCheckbox(bu)}
                          className={[
                            'w-full flex items-center justify-between p-3 rounded-xl text-left text-sm transition-all duration-200 border cursor-pointer',
                            isChecked
                              ? 'bg-ccdi-navy text-white font-bold border-ccdi-navy shadow-md shadow-ccdi-navy/20 scale-[1.01]'
                              : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300 font-semibold',
                          ].join(' ')}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={isChecked ? 'text-amber-400' : 'text-slate-400'}>
                              {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                            </div>
                            <span className="text-xs sm:text-sm">{bu}</span>
                          </div>
                          <span className={[
                            'text-xs px-2.5 py-0.5 rounded-full font-bold transition-colors',
                            isChecked
                              ? 'bg-amber-400 text-slate-950 font-black'
                              : 'bg-white text-slate-600 border border-slate-200',
                          ].join(' ')}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Filter Section 2: Sub-Categories */}
                <div className="space-y-3 border-t border-slate-100 pt-5">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 font-heading flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-ccdi-navy inline-block" />
                    Specialized Sub-Category
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                    {allSubCategories.map((subCat) => {
                      const isChecked = selectedSubCats.includes(subCat);
                      return (
                        <button
                          key={subCat}
                          onClick={() => handleSubCatCheckbox(subCat)}
                          className={[
                            'w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all duration-200 border cursor-pointer',
                            isChecked
                              ? 'bg-amber-400/20 text-slate-950 font-extrabold border-amber-400 shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-medium',
                          ].join(' ')}
                        >
                          <div className="flex items-center gap-2">
                            <div className={isChecked ? 'text-amber-600' : 'text-slate-400'}>
                              {isChecked ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                            </div>
                            <span className="truncate">{subCat}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Filter Info Footer */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
                  <p className="font-bold text-ccdi-navy flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Need Custom Engineering?
                  </p>
                  <p className="text-slate-500 text-[11px]">Contact our engineering specialists for custom turnkey specifications.</p>
                </div>
              </div>

            </div>
          </aside>

          {/* ── RIGHT MAIN CONTENT: SEARCH + GRID + PAGINATION ────────── */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Predictive Live Search Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Predictive search (e.g., Broiler, Solar, Hatchery, Silo)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-ccdi-navy focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <span>
                  Showing <strong className="text-slate-900 font-bold">{paginatedProducts.length}</strong> of{' '}
                  <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> solutions
                </span>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => {
                  const isAdded = inquiryItems.some((item) => item.id === product.id);
                  return (
                    <ProductCard
                      key={product.id}
                      dark={false}
                      product={product}
                      isAddedToInquiry={isAdded}
                      onToggleInquiry={(p) => onToggleInquiry?.(p)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No matching solutions found</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Try adjusting your category filters or search query to explore CCDI's agro-industrial product offerings.
                </p>
                <Button variant="outline" size="sm" onClick={handleResetFilters}>
                  Reset All Filters
                </Button>
              </div>
            )}

            {/* ── PAGINATION COMPONENT ───────────────────────────────── */}
            {totalPages > 1 && (
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={[
                    'flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                    currentPage === 1
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-ccdi-navy',
                  ].join(' ')}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={[
                        'w-9 h-9 rounded-xl text-xs font-bold transition-all',
                        currentPage === pageNum
                          ? 'bg-ccdi-navy text-ccdi-gold shadow-md'
                          : 'text-slate-600 hover:bg-slate-100',
                      ].join(' ')}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={[
                    'flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                    currentPage === totalPages
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-ccdi-navy',
                  ].join(' ')}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};
