import React, { memo, useState } from 'react';
import type { Product } from '../../data/mockProducts';
import { Check, Plus, FileText, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProductSpecsModal } from './ProductSpecsModal';

export interface ProductCardProps {
  product: Product;
  dark?: boolean;
  isAddedToInquiry: boolean;
  onToggleInquiry: (product: Product) => void;
  className?: string;
}

const ProductCardInner: React.FC<ProductCardProps> = ({
  product,
  dark = false,
  isAddedToInquiry,
  onToggleInquiry,
  className = '',
}) => {
  const [isSpecsModalOpen, setIsSpecsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={[
          'rounded-2xl overflow-hidden flex flex-col h-full group relative border-b-4 border-b-amber-400 hover:border-b-amber-300',
          dark
            ? 'bg-[#0B1E30] border-x border-t border-white/10 hover:border-amber-400/40 shadow-2xl shadow-black/60 hover:shadow-amber-500/20'
            : 'bg-white border-x border-t border-slate-200/90 hover:border-ccdi-navy/40 shadow-lg shadow-slate-300/40 hover:shadow-2xl hover:shadow-slate-400/50',
          className,
          'transition-all duration-300',
        ].join(' ')}
      >
        {/* Top accent line */}
        <div
          className={[
            'absolute top-0 inset-x-0 h-[3px] transition-all duration-300 z-10',
            isAddedToInquiry
              ? 'bg-amber-400'
              : 'bg-ccdi-navy/30 group-hover:bg-amber-400',
          ].join(' ')}
        />

        {/* Image */}
        <div className={`relative h-44 overflow-hidden ${dark ? 'bg-slate-800' : 'bg-slate-100'}`}>
          <img
            src={product.imageUrl}
            alt={product.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

          {/* BU pill — bottom left */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1 items-center">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-sm border border-white/15 text-white">
              {product.businessUnit}
            </span>
          </div>

          {/* Badge pill — top right */}
          <div className="absolute top-3 right-3 flex flex-wrap items-center gap-1 justify-end">
            {product.isSample && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800/90 text-slate-300 uppercase tracking-wide shadow flex items-center gap-1 border border-slate-600">
                <Info className="w-3 h-3 text-blue-400" />
                Sample Data
              </span>
            )}
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/90 text-slate-950 uppercase tracking-wide shadow">
              {product.badge}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">

          {/* Sub-category tag + Sample Label */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <p className={`text-[10px] font-bold uppercase tracking-wider ${dark ? 'text-amber-400/80' : 'text-amber-600'}`}>
              {product.subCategory}
            </p>
            {product.isSample && (
              <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-200/80 dark:bg-slate-800 px-2 py-0.5 rounded">
                Sample Data
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className={[
            'text-[15px] font-bold tracking-tight font-heading mb-2 leading-snug',
            dark ? 'text-white' : 'text-slate-900',
          ].join(' ')}>
            {product.title}
          </h3>

          {/* Description */}
          <p className={`text-xs leading-relaxed mb-4 flex-grow line-clamp-3 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            {product.description}
          </p>

          {/* Metrics */}
          <div className={`grid grid-cols-3 gap-px mb-4 rounded-xl overflow-hidden border ${dark ? 'border-white/8' : 'border-slate-100'}`}>
            {[
              { label: product.metrics.spec1Label, value: product.metrics.spec1Value },
              { label: product.metrics.spec2Label, value: product.metrics.spec2Value },
              { label: product.metrics.spec3Label, value: product.metrics.spec3Value },
            ].map((m, idx) => (
              <div
                key={idx}
                className={[
                  'p-2 text-center min-w-0 overflow-hidden flex flex-col justify-center items-center min-h-[48px]',
                  dark ? 'bg-white/4' : 'bg-slate-50',
                  idx < 2 ? (dark ? 'border-r border-white/8' : 'border-r border-slate-100') : '',
                ].join(' ')}
              >
                <div className={`text-[10px] font-semibold mb-1 leading-tight truncate w-full ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {m.label}
                </div>
                <div className={`text-[10px] sm:text-[11px] font-extrabold leading-tight break-words w-full text-center px-0.5 ${dark ? 'text-amber-300' : 'text-[#0B192C]'}`}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons — Specs Modal Trigger + Add to Inquiry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => setIsSpecsModalOpen(true)}
              className={[
                'w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap active:scale-[0.98]',
                dark
                  ? 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200',
              ].join(' ')}
            >
              <FileText className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>View Specs</span>
            </button>

            <button
              onClick={() => onToggleInquiry(product)}
              className={[
                'w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap active:scale-[0.98]',
                isAddedToInquiry
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25 hover:bg-amber-300'
                  : dark
                    ? 'bg-[#254B7C] hover:bg-[#1E3E66] text-white border border-blue-300/20 shadow-sm hover:shadow-md'
                    : 'bg-[#1E3E66] hover:bg-[#254B7C] text-white shadow-sm hover:shadow-md',
              ].join(' ')}
            >
              {isAddedToInquiry ? (
                <>
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 shrink-0" />
                  <span>Inquire</span>
                </>
              )}
            </button>
          </div>

        </div>
      </motion.div>

      {/* Detailed Technical Specs Modal */}
      <ProductSpecsModal
        product={product}
        isOpen={isSpecsModalOpen}
        onClose={() => setIsSpecsModalOpen(false)}
        isAddedToInquiry={isAddedToInquiry}
        onToggleInquiry={onToggleInquiry}
      />
    </>
  );
};

/** Memoized to prevent re-renders when sibling inquiry items change in the grid. */
export const ProductCard = memo(ProductCardInner);
