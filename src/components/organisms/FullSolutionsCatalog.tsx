import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

import { MOCK_PRODUCTS, BUSINESS_UNITS } from '../../data/mockProducts';
import type { Product, BusinessUnit } from '../../data/mockProducts';
import { ProductCard } from '../molecules';
import { EndToEndHeader } from './EndToEndHeader';

export interface FullSolutionsCatalogProps {
  inquiryItems?: Product[];
  onToggleInquiry?: (product: Product) => void;
}

export const FullSolutionsCatalog: React.FC<FullSolutionsCatalogProps> = ({
  inquiryItems = [],
  onToggleInquiry,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBUs, setSelectedBUs] = useState<BusinessUnit[]>([]);
  const [selectedSubCats, setSelectedSubCats] = useState<string[]>([]);
  const [onlySoftLaunch, setOnlySoftLaunch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const allSubCategories = useMemo(() => {
    const set = new Set<string>();
    MOCK_PRODUCTS.forEach((p) => {
      if (p.subCategory && p.subCategory !== 'All') {
        set.add(p.subCategory);
      }
    });
    return Array.from(set);
  }, []);

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
    setOnlySoftLaunch(false);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    const list = MOCK_PRODUCTS.filter((product) => {
      if (selectedBUs.length > 0 && !selectedBUs.includes(product.businessUnit)) {
        return false;
      }
      if (selectedSubCats.length > 0 && !selectedSubCats.includes(product.subCategory)) {
        return false;
      }
      if (onlySoftLaunch && !product.isSoftLaunch) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = product.title.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchSub = product.subCategory.toLowerCase().includes(q);
        const matchBU = product.businessUnit.toLowerCase().includes(q);
        const matchSpecies = product.speciesTags.some((tag) => tag.toLowerCase().includes(q));
        const matchSoftLaunch = product.softLaunchBadge?.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchSub && !matchBU && !matchSpecies && !matchSoftLaunch) {
          return false;
        }
      }
      return true;
    });

    return [...list].sort((a, b) => {
      if (!a.isSoftLaunch && b.isSoftLaunch) return -1;
      if (a.isSoftLaunch && !b.isSoftLaunch) return 1;
      return 0;
    });
  }, [selectedBUs, selectedSubCats, onlySoftLaunch, searchQuery]);

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
    <div className="bg-[#07162A] text-slate-100 min-h-screen pb-20 text-left font-sans">
      
      {/* ── 1. CATALOG HEADER (NAVY PRIMARY, GOLD ACCENT, 2PX CORNERS) ── */}
      <section className="bg-[#07162A] text-white pt-28 pb-16 border-b border-[#102A43]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-amber-400 transition-colors">HOME</Link>
            <span className="text-[#1E3E66]">/</span>
            <span className="text-amber-400 font-bold">SOLUTIONS CATALOG</span>
          </nav>

          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Full Agro-Industrial Solutions Catalog
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Explore our complete suite of agro-industrial solutions across Poultry Facilities, Hatcheries, Feedmills, and Solar Energy Integration.
            </p>
          </div>

          {/* Interactive End-To-End Header */}
          <div className="pt-6 border-t border-[#102A43]">
            <EndToEndHeader
              tag="EXECUTION FRAMEWORK"
              title="Turnkey Engineering Delivery"
              subtitle="Select any execution phase below to filter solutions by engineering scope."
              lightMode={false}
              onStepSelect={(stepNum) => {
                const stepBUMap: Record<number, BusinessUnit> = {
                  1: 'Poultry Farm Equipment',
                  2: 'Poultry Farm Equipment',
                  3: 'Hatchery',
                  4: 'Poultry Farm Equipment',
                  5: 'Feedmill',
                  6: 'Poultry Farm Equipment',
                  7: 'Hatchery',
                  8: 'Solar Systems',
                };
                const targetBU = stepBUMap[stepNum];
                if (targetBU) {
                  setSelectedBUs([targetBU]);
                  setCurrentPage(1);
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* ── 2. CATALOG INTERFACE ── */}
      <div id="catalog-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* ── LEFT SIDEBAR: NAVY & GOLD FLAT FILTERS ── */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-[#0B192C] rounded-[2px] p-4 border border-[#102A43] space-y-6 sticky top-24">
              
              {/* Filter Header */}
              <div className="flex items-baseline justify-between border-b border-[#102A43] pb-3">
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
                    FILTER CRITERIA
                  </h2>
                  <p className="font-mono text-[10px] text-slate-400 mt-0.5">
                    {filteredProducts.length} SYSTEMS MATCHED
                  </p>
                </div>

                {(selectedBUs.length > 0 || selectedSubCats.length > 0 || onlySoftLaunch || searchQuery) && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="font-mono text-[11px] uppercase tracking-wider text-amber-400 hover:text-amber-300 underline underline-offset-4"
                  >
                    [RESET]
                  </button>
                )}
              </div>

              {/* Core Category (Business Unit) */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 block mb-2">
                  PRIMARY SECTOR
                </span>

                <div className="space-y-1.5">
                  {BUSINESS_UNITS.map((bu) => {
                    const isChecked = selectedBUs.includes(bu);
                    const count = MOCK_PRODUCTS.filter((p) => p.businessUnit === bu).length;
                    return (
                      <button
                        key={bu}
                        type="button"
                        onClick={() => handleBUCheckbox(bu)}
                        className={`w-full flex items-center justify-between p-2 rounded-[2px] font-sans text-xs transition-colors text-left border ${
                          isChecked
                            ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                            : 'bg-[#07162A] text-slate-300 border-[#102A43] hover:border-amber-400/40 hover:text-white'
                        }`}
                      >
                        <span className="truncate pr-2">{bu}</span>
                        <span className="tabular-nums font-mono text-[10px] shrink-0 font-bold">
                          [{count}]
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sub-Categories */}
              <div className="space-y-2 border-t border-[#102A43] pt-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 block mb-2">
                  SYSTEM SUB-CATEGORY
                </span>

                <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                  {allSubCategories.map((subCat) => {
                    const isChecked = selectedSubCats.includes(subCat);
                    return (
                      <button
                        key={subCat}
                        type="button"
                        onClick={() => handleSubCatCheckbox(subCat)}
                        className={`w-full flex items-center justify-between p-2 rounded-[2px] font-sans text-[11px] transition-colors text-left border ${
                          isChecked
                            ? 'bg-amber-400/15 border-amber-400 text-amber-300 font-bold'
                            : 'bg-[#07162A] text-slate-300 border-[#102A43] hover:border-slate-600'
                        }`}
                      >
                        <span className="truncate">{subCat}</span>
                        <span className="font-mono text-[10px] text-amber-400">{isChecked ? '[x]' : '[ ]'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="border-t border-[#102A43] pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setOnlySoftLaunch((prev) => !prev);
                    setCurrentPage(1);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-[2px] font-sans text-xs transition-colors border ${
                    onlySoftLaunch
                      ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                      : 'bg-[#07162A] text-slate-300 border-[#102A43] hover:border-amber-400/40'
                  }`}
                >
                  <span>PIPELINE ONLY</span>
                  <span className="tabular-nums font-mono">[4]</span>
                </button>
              </div>

            </div>
          </aside>

          {/* ── RIGHT MAIN CONTENT: SEARCH + GRID + PAGINATION ── */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Search Input (Navy Primary, Gold Accent, 2px Corners) */}
            <div className="bg-[#0B192C] p-4 rounded-[2px] border border-[#102A43] flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full flex-1">
                <Search className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search solutions by model, spec, or keyword (e.g. Broiler, Silo, Solar)..."
                  className="w-full pl-9 pr-8 py-2 rounded-[2px] bg-[#07162A] border border-[#102A43] text-white text-xs font-sans placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-400 hover:text-white"
                  >
                    [x]
                  </button>
                )}
              </div>

              {/* Status Indicator */}
              <div className="shrink-0 font-mono text-xs text-slate-400">
                DISPLAYING: <span className="text-amber-400 font-bold tabular-nums">{filteredProducts.length}</span> RESULTS
              </div>
            </div>

            {/* Products Grid: Dark Navy Cards */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => {
                  const isAdded = inquiryItems.some((item) => item.id === product.id);
                  return (
                    <ProductCard
                      key={product.id}
                      dark={true}
                      product={product}
                      isAddedToInquiry={isAdded}
                      onToggleInquiry={(p) => onToggleInquiry?.(p)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="py-16 text-center border border-dashed border-[#102A43] rounded-[2px] space-y-3 font-sans">
                <p className="text-sm font-bold text-white">
                  NO SPECIFICATIONS MATCH QUERY
                </p>
                <p className="text-xs text-slate-400">
                  Try adjusting filters or clearing keywords.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs uppercase tracking-wider font-bold rounded-[2px]"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination: Strict Right-Aligned / Tabular / Gold Focus */}
            {totalPages > 1 && (
              <div className="border-t border-[#102A43] pt-6 flex items-center justify-between font-mono text-xs">
                <span className="text-slate-400">
                  PAGE <span className="font-bold text-amber-400 tabular-nums">{currentPage}</span> OF <span className="tabular-nums">{totalPages}</span>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-[2px] border border-[#102A43] text-slate-300 disabled:opacity-30 hover:bg-[#102A43]"
                  >
                    PREV
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-[2px] tabular-nums font-bold transition-colors ${
                        page === currentPage
                          ? 'bg-amber-400 text-slate-950'
                          : 'border border-[#102A43] text-slate-300 hover:bg-[#102A43]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-[2px] border border-[#102A43] text-slate-300 disabled:opacity-30 hover:bg-[#102A43]"
                  >
                    NEXT
                  </button>
                </div>
              </div>
            )}

          </main>

        </div>
      </div>
    </div>
  );
};
