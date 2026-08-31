import React, { useMemo } from 'react';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '../molecules';
import { SectionHeader } from '../atoms';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import type { Product } from '../../data/mockProducts';
import { EndToEndHeader } from './EndToEndHeader';

export interface SolutionsPreviewProps {
  inquiryItems?: Product[];
  onToggleInquiry?: (product: Product) => void;
}

export const SolutionsPreview: React.FC<SolutionsPreviewProps> = ({
  inquiryItems = [],
  onToggleInquiry,
}) => {
  const navigate = useNavigate();

  // Dynamically select products marked as isFeatured (launched flagship products), falling back to non-soft-launch items
  const featuredSolutions = useMemo(() => {
    const featured = MOCK_PRODUCTS.filter((p) => p.isFeatured);
    if (featured.length >= 6) return featured.slice(0, 6);
    const activeProducts = MOCK_PRODUCTS.filter((p) => !p.isSoftLaunch);
    const combined = [...featured, ...activeProducts.filter((p) => !featured.some((f) => f.id === p.id))];
    return combined.slice(0, 6);
  }, []);

  return (
    <section
      id="solutions-preview"
      className="relative py-16 sm:py-24 overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200/80 bg-grid-pattern"
    >
      {/* ── Ambient Orbs for Visual Depth ────────────────────── */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-ccdi-navy/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        
        {/* ── 1. SECTION TITLE FOR PRODUCTS (BEFORE END-TO-END EXECUTION) ── */}
        <SectionHeader
          tag="Our Products & Integrated Solutions"
          title="Turnkey Agro-Industrial Products & Facility Engineering"
          description="From pre-fabricated broiler housing and cleanroom hatcheries to automated feedmills and solar microgrids — explore CCDI's complete portfolio of engineering systems."
          align="center"
        />

        {/* ── 2. END-TO-END EXECUTION HEADER & STEP WIDGET ── */}
        <EndToEndHeader
          tag="End-To-End Execution"
          title="End-To-End Solution Capabilities"
          subtitle="Click on any execution step below to expand full phase details and explore our featured agro-industrial solutions."
          lightMode={true}
        />

        {/* ── 3. FEATURED PRODUCTS CATALOG GRID HEADER ── */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest block mb-1">
              Catalog Showcase
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-900">
              Featured Flagship Systems & Pre-Fab Models
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-200/80 px-3.5 py-1.5 rounded-full w-fit border border-slate-300/50">
            6 Featured Flagship Solutions
          </span>
        </div>

        {/* 6-Item Responsive Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredSolutions.map((product, idx) => {
            const isAdded = inquiryItems.some((item) => item.id === product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <ProductCard
                  dark={false}
                  product={product}
                  isAddedToInquiry={isAdded}
                  onToggleInquiry={(p) => onToggleInquiry?.(p)}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Centered CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center space-y-4 pt-4"
        >
          <button
            onClick={() => navigate('/solutions')}
            className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-black text-base text-white bg-ccdi-navy hover:bg-[#1E3E66] shadow-xl shadow-ccdi-navy/20 hover:shadow-ccdi-navy/30 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap select-none cursor-pointer border-0"
          >
            <span className="whitespace-nowrap font-black">View Full Product Catalog</span>
            <ArrowRight className="w-5 h-5 shrink-0 text-amber-400" />
          </button>

          <p className="text-xs text-slate-500 font-medium text-center max-w-lg">
            Browse all categories: Poultry Facilities, Hatchery Construction, Feedmill Systems, and Solar Energy Integration
          </p>
        </motion.div>
      </div>
    </section>
  );
};
