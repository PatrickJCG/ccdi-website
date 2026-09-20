import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductCard } from '../molecules';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import type { Product } from '../../data/mockProducts';

export interface SolutionsPreviewProps {
  inquiryItems?: Product[];
  onToggleInquiry?: (product: Product) => void;
}

export const SolutionsPreview: React.FC<SolutionsPreviewProps> = ({
  inquiryItems = [],
  onToggleInquiry,
}) => {
  const navigate = useNavigate();

  const featuredSolutions = useMemo(() => {
    const featured = MOCK_PRODUCTS.filter((p) => p.isFeatured);
    if (featured.length >= 6) return featured.slice(0, 6);
    const activeProducts = MOCK_PRODUCTS.filter((p) => !p.isSoftLaunch);
    const combined = [...featured, ...activeProducts.filter((p) => !featured.some((f) => f.id === p.id))];
    return combined.slice(0, 6);
  }, []);

  return (
    <div id="solutions-preview" className="text-left font-sans">
      {/* ── FLAGSHIP SHOWCASE (DARK THEME WITH HIGH-CONTRAST GOLD ACCENTS) ── */}
      <section className="relative py-24 sm:py-32 bg-[#040D18] text-white border-b border-[#102A43] overflow-hidden">
        {/* Subtle Ambient Industrial Backdrop Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Architectural Accent 2 - Top Left Anchored (Fades in downwards on view) */}
        <motion.div
          initial={{ opacity: 0, y: -45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-12 -left-16 sm:-top-8 sm:left-0 w-72 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <img
            src="/images/accents/accent2.png"
            alt=""
            className="w-full h-auto object-contain opacity-30"
          />
        </motion.div>

        {/* Architectural Dynamic Accent Graphic - Bottom Right Anchored (Fades in upwards on view) */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-16 -right-16 sm:-right-8 sm:bottom-0 w-72 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <img
            src="/images/accents/dark-accent-graphic.png"
            alt=""
            className="w-full h-auto object-contain opacity-30"
          />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Flagship Showcase Header */}
          <div className="border-b border-[#102A43] pb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F3A812] font-bold block mb-1">
              FLAGSHIP SHOWCASE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Featured Flagship Systems
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Engineered turnkey installations delivering high-density automated production across the Philippine agribusiness sector.
            </p>
          </div>

          {/* 6-Item High-Contrast Dark Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSolutions.map((product) => {
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

          {/* Action Bar */}
          <div className="border-t border-[#102A43] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs font-mono text-slate-400">
              POULTRY HOUSING • HATCHERIES • AUTOMATED FEEDMILLS • INDUSTRIAL SOLAR
            </p>

            <button
              type="button"
              onClick={() => navigate('/solutions')}
              className="px-6 py-3 rounded-[2px] font-sans text-xs uppercase tracking-wider font-extrabold bg-[#F3A812] text-slate-950 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/10 cursor-pointer"
            >
              Open Full Solutions Catalog →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
