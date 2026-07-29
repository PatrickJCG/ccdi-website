import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { SectionHeader, Button } from '../atoms';
import { ProductCard } from '../molecules';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import type { Product } from '../../data/mockProducts';

export interface SolutionsPreviewProps {
  inquiryItems?: Product[];
  onToggleInquiry?: (product: Product) => void;
}

const PARALLAX_BG_IMAGE = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80';

export const SolutionsPreview: React.FC<SolutionsPreviewProps> = ({
  inquiryItems = [],
  onToggleInquiry,
}) => {
  const navigate = useNavigate();

  // Exactly 6 featured solutions sliced from the main data array
  const featuredSolutions = MOCK_PRODUCTS.slice(0, 6);

  return (
    <section
      id="solutions-preview"
      className="relative py-16 sm:py-20 overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200/80 bg-grid-pattern"
    >
      {/* ── Ambient Orbs for Visual Depth ────────────────────── */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-ccdi-navy/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ccdi-navy/10 border border-ccdi-navy/20 text-ccdi-navy text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4 text-amber-500" />
            <span>Integrated Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900 leading-tight">
            Featured Agro-Industrial{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-500">
              Solutions
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Explore CCDI's core solutions engineered across climate-controlled poultry facilities, hatcheries, industrial feedmills, and solar power integration.
          </p>
        </motion.div>

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
