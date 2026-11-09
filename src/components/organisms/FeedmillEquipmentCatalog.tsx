import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Wrench,
  SlidersHorizontal,
  Settings2,
  Headphones,
} from 'lucide-react';
import type { Product } from '../../data/mockProducts';
import { FEEDMILL_PRODUCTS, FEEDMILL_SECTIONS } from '../../data/feedmillProducts';
import { ImagePlaceholder } from '../atoms/ImagePlaceholder';
import { AddToInquiryButton } from '../atoms/AddToInquiryButton';

export interface FeedmillEquipmentCatalogProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
}

export const FeedmillEquipmentCatalog: React.FC<FeedmillEquipmentCatalogProps> = ({
  inquiryItems,
  onToggleInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<string>('core-process');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active section metadata
  const activeSectionInfo = useMemo(() => {
    return FEEDMILL_SECTIONS.find((s) => s.id === activeTab);
  }, [activeTab]);

  // Filter products based on active tab and search query
  const filteredProducts = useMemo(() => {
    return FEEDMILL_PRODUCTS.filter((product) => {
      // Tab matching
      let matchesTab = true;
      if (activeTab !== 'all') {
        const section = FEEDMILL_SECTIONS.find((s) => s.id === activeTab);
        matchesTab = section ? section.productIds.includes(product.id) : true;
      }

      // Search matching
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesTab;

      const matchesSearch =
        product.title.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.badge.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <section id="feedmill-catalog" className="relative py-16 sm:py-24 bg-[#0B192C] text-white border-b border-[#102A43] overflow-hidden font-sans text-left">
      {/* Decorative technical grid & ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Architectural Corner Graphic */}
      <img
        src="/images/accents/dark-accent-graphic.png"
        alt=""
        className="absolute bottom-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-bottom pointer-events-none select-none z-0 opacity-20"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header Block */}
        <div className="pb-4 border-b border-[#1E3E66]">
          <div className="space-y-2 max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold block">
              MACHINERY &amp; EQUIPMENT CATALOG
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              FEEDMILL MACHINERY AND EQUIPMENT
            </h2>
          </div>
        </div>

        {/* Filter Tabs & Search Controls */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {FEEDMILL_SECTIONS.map((section) => {
                const isActive = activeTab === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveTab(section.id)}
                    className={`px-4 py-2.5 text-xs font-bold rounded-[2px] whitespace-nowrap transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 border border-amber-300 shadow-sm'
                        : 'bg-[#07162A] text-slate-300 hover:text-white hover:bg-[#102A43] border border-[#1E3E66]'
                    }`}
                  >
                    {section.tabLabel}
                  </button>
                );
              })}
            </div>

            {/* Quick Search */}
            <div className="relative w-full lg:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search equipment..."
                className="w-full bg-[#07162A] border border-[#1E3E66] focus:border-amber-400 rounded-[2px] pl-9 pr-8 py-2 text-xs text-white placeholder-slate-400 focus:outline-none transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  title="Clear search"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>

          </div>

          {/* Section Information & Verbatim Callout Lists (Tabs 2, 3, 4) */}
          {activeSectionInfo && (
            <div className="space-y-4">
              {activeSectionInfo.subhead && (
                <div className="bg-[#07162A] border-l-2 border-amber-400 border-y border-r border-[#1E3E66] rounded-[2px] p-4 sm:p-5">
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                    {activeSectionInfo.subhead}
                  </p>
                </div>
              )}

              {/* Value Pillars for Tab 2 & Tab 4 */}
              {activeSectionInfo.valuePillars && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeSectionInfo.valuePillars.map((pillar, idx) => (
                    <div key={idx} className="bg-[#07162A] border border-[#1E3E66] rounded-[2px] p-5 space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-[#1E3E66]">
                        {pillar.title.includes('QUALITY') ? (
                          <ShieldCheck className="w-4 h-4 text-amber-400" />
                        ) : pillar.title.includes('MAINTAINABILITY') ? (
                          <Wrench className="w-4 h-4 text-amber-400" />
                        ) : pillar.title.includes('ENGINEERED') ? (
                          <Settings2 className="w-4 h-4 text-amber-400" />
                        ) : (
                          <Headphones className="w-4 h-4 text-amber-400" />
                        )}
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">
                          {pillar.title}
                        </span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                        {pillar.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Options Lists for Tab 3: Cleaning, Grinding & Packing */}
              {activeSectionInfo.optionsLists && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeSectionInfo.optionsLists.map((optList, idx) => (
                    <div key={idx} className="bg-[#07162A] border border-[#1E3E66] rounded-[2px] p-5 space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-[#1E3E66]">
                        <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">
                          {optList.title}
                        </span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                        {optList.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>

        {/* Equipment Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: (idx % 3) * 0.08 }}
                className="h-full flex flex-col justify-between bg-[#07162A] border border-[#1E3E66] hover:border-amber-400/80 rounded-[2px] p-6 space-y-5 transition-all duration-200 shadow-lg hover:shadow-amber-500/5 group"
              >
                <div className="space-y-4">
                  {/* Card Title & Subhead Badge */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                      {product.title}
                    </h3>
                    <div className="pt-2 border-t border-[#1E3E66]">
                      <p className="font-mono text-xs sm:text-sm font-bold text-amber-400 tracking-wide uppercase">
                        {product.badge}
                      </p>
                    </div>
                  </div>

                  {/* Blank Image Placeholder */}
                  <ImagePlaceholder
                    src={product.imageUrl}
                    alt={product.title}
                    label={product.title}
                    aspectRatio="video"
                    theme="dark"
                  />

                  {/* Verbatim Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pt-1">
                    {product.description}
                  </p>
                </div>

                {/* Add to Inquiry Button */}
                <div className="pt-4 border-t border-[#1E3E66] mt-auto">
                  <AddToInquiryButton
                    product={product}
                    inquiryItems={inquiryItems}
                    onToggleInquiry={onToggleInquiry}
                    className="w-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-[#07162A] border border-[#1E3E66] rounded-[2px] space-y-3">
            <p className="text-sm text-slate-400">
              No equipment found matching &quot;{searchQuery}&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveTab('core-process');
              }}
              className="px-4 py-2 text-xs font-bold bg-amber-400 text-slate-950 rounded-[2px] hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
