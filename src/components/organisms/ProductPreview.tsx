import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import type { Product } from '../../data/mockProducts';
import { SectionHeader } from '../atoms';
import { ProductCard } from '../molecules';

// ─── Config ───────────────────────────────────────────────────────────────────
/** Number of cards to show in the preview grid. */
const PREVIEW_LIMIT = 6;

/** Pick up to 2 products from each BU for a balanced showcase. */
function getSortedPreviewProducts(): Product[] {
  const buOrder = ['Poultry Farm Equipment', 'Hatchery', 'Feedmill', 'Solar Systems'] as const;
  const picks: Product[] = [];
  for (const bu of buOrder) {
    const group = MOCK_PRODUCTS.filter(p => p.businessUnit === bu).slice(0, 2);
    picks.push(...group);
  }
  return picks.slice(0, PREVIEW_LIMIT);
}

// ─── Props ────────────────────────────────────────────────────────────────────
export interface ProductPreviewProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export const ProductPreview: React.FC<ProductPreviewProps> = ({
  inquiryItems,
  onToggleInquiry,
}) => {
  const previewProducts = getSortedPreviewProducts().slice(0, PREVIEW_LIMIT);
  const totalCount = MOCK_PRODUCTS.length;
  const navigate = useNavigate();

  return (
    <section
      className="relative overflow-hidden border-b border-industrial_blue-700/40"
      style={{
        background:
          'linear-gradient(160deg, #0A192F 0%, #102A43 35%, #18344D 65%, #0D1B2A 85%, #06121E 100%)',
      }}
    >
      {/* ── Background decorations ─────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(110deg, transparent 0%, rgba(36,59,83,0.30) 35%, rgba(245,158,11,0.10) 55%, transparent 80%)',
        }}
        aria-hidden
      />
      {/* Subtle dot-grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            'linear-gradient(to right, rgba(217,226,236,0.06) 1px, transparent 1px)',
            'linear-gradient(to bottom, rgba(217,226,236,0.06) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />
      {/* Glow orbs */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(36,59,83,0.60) 0%, rgba(16,42,67,0.30) 45%, transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(245,158,11,0.25) 0%, rgba(180,83,9,0.12) 45%, transparent 70%)',
        }}
        aria-hidden
      />

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* Section Header */}
        <SectionHeader
          tag="Integrated Capabilities"
          title="Our Solutions Portfolio"
          description="Turnkey engineering, civil construction, automated processing equipment, and solar PV energy systems for modern agribusiness operations."
          className="mb-10
            [&_.section-tag]:bg-blue-900/30
            [&_.section-tag]:text-blue-100
            [&_.section-tag]:border-blue-400/50
            [&_.section-tag]:backdrop-blur-sm
            [&_h2]:text-white
            [&_h2]:drop-shadow-lg
            [&_p]:text-slate-200
            [&_span]:bg-gradient-to-r
            [&_span]:from-blue-400
            [&_span]:to-amber-400"
        />

        {/* ── Product grid ─────────────────────────────────────── */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <AnimatePresence mode="popLayout">
            {previewProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.18 } }}
                transition={{
                  duration: 0.48,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
              >
                <ProductCard
                  product={product}
                  dark
                  isAddedToInquiry={inquiryItems.some(item => item.id === product.id)}
                  onToggleInquiry={onToggleInquiry}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── View All CTA ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Divider lines flanking the CTA */}
          <div className="hidden sm:block h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/30" />

          <div className="text-center space-y-3">
            <p className="text-slate-300 text-sm">
              Showing <span className="font-bold text-amber-300">{PREVIEW_LIMIT}</span> of{' '}
              <span className="font-bold text-slate-200">{totalCount}</span> products
            </p>
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-base text-white
                bg-amber-600 hover:bg-amber-700
                shadow-lg shadow-amber-600/30 hover:shadow-amber-500/40
                hover:-translate-y-0.5 active:scale-95
                transition-all duration-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              <Sparkles className="w-4 h-4" />
              <span>View All Solutions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          <div className="hidden sm:block h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/30" />
        </motion.div>

      </div>
    </section>
  );
};
