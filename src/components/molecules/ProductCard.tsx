import React, { memo, useState } from 'react';
import type { Product } from '../../data/mockProducts';
import { Check, Plus, FileText, Info, Sparkles } from 'lucide-react';
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
          'rounded-2xl overflow-hidden flex flex-col h-full group relative border-b-4',
          product.isSoftLaunch
            ? 'border-b-indigo-500 hover:border-b-purple-400'
            : 'border-b-amber-400 hover:border-b-amber-300',
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
              : product.isSoftLaunch
                ? 'bg-gradient-to-r from-purple-500 to-amber-400'
                : 'bg-ccdi-navy/30 group-hover:bg-amber-400',
          ].join(' ')}
        />

        {/* Image / Uniform Soft Launch Brand Card */}
        {product.isSoftLaunch ? (
          <div className="relative h-24 sm:h-28 overflow-hidden bg-gradient-to-br from-[#07162A] via-[#0B2038] to-[#122E4D] border-b border-amber-400/20 flex flex-col items-center justify-center p-2 group-hover:scale-105 transition-transform duration-500 ease-out select-none">
            {/* Subtle grid pattern background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

            {/* Subtle Silhouette Watermark of CCDI Logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <img
                src="/ccdi-logo.png"
                alt=""
                aria-hidden="true"
                className="w-40 max-w-none opacity-10 brightness-200 contrast-125 scale-110 transition-transform duration-700 group-hover:scale-125 group-hover:opacity-15"
              />
            </div>

            {/* Ambient glow Orbs */}
            <div className="absolute w-20 h-20 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute w-20 h-20 bg-purple-500/15 rounded-full blur-xl pointer-events-none" />

            {/* CCDI Brand Logo Container */}
            <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-lg p-1.5 shadow-md border border-white/30 flex items-center justify-center mb-1 group-hover:border-amber-400/60 transition-colors">
              <img
                src="/ccdi-logo.png"
                alt="CCDI Logo"
                draggable={false}
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </div>

            {/* CCDI Text Label */}
            <div className="relative z-10 text-center space-y-0">
              <p className="text-[9px] font-black tracking-[0.2em] text-white uppercase leading-none">
                Clarkbase
              </p>
              <p className="text-[7.5px] font-extrabold text-amber-400 tracking-wider uppercase leading-none">
                Construction Dev't Inc.
              </p>
            </div>

            {/* BU pill — bottom left */}
            <div className="absolute bottom-1.5 left-2 flex flex-wrap gap-1 items-center z-20">
              <span className="inline-flex items-center gap-1 text-[8.5px] font-bold px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-sm border border-white/15 text-white">
                {product.businessUnit}
              </span>
            </div>

            {/* Badge pill — top right */}
            <div className="absolute top-1.5 right-2 flex flex-wrap items-center gap-1 justify-end z-20">
              <span className="text-[8.5px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 text-white uppercase tracking-wide shadow flex items-center gap-1 border border-white/25">
                <Sparkles className="w-2.5 h-2.5 text-amber-300 animate-pulse" />
                {product.softLaunchBadge || 'Listing Soon'}
              </span>
            </div>
          </div>
        ) : (
          <div className={`relative h-32 sm:h-36 overflow-hidden ${dark ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <img
              src={product.imageUrl}
              alt={product.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

            {/* BU pill — bottom left */}
            <div className="absolute bottom-2 left-2.5 flex flex-wrap gap-1 items-center">
              <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-sm border border-white/15 text-white">
                {product.businessUnit}
              </span>
            </div>

            {/* Badge pill — top right */}
            <div className="absolute top-2 right-2.5 flex flex-wrap items-center gap-1 justify-end">
              {product.isSample && (
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-800/90 text-slate-300 uppercase tracking-wide shadow flex items-center gap-1 border border-slate-600">
                  <Info className="w-2.5 h-2.5 text-blue-400" />
                  Sample Data
                </span>
              )}
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-400/90 text-slate-950 uppercase tracking-wide shadow">
                {product.badge}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-3 sm:p-3.5 flex flex-col flex-grow">

          {/* Sub-category tag + Sample Label */}
          <div className="flex items-center justify-between gap-2 mb-1 min-w-0">
            <p className={`text-[10px] font-bold uppercase tracking-wider truncate ${dark ? 'text-amber-400/80' : 'text-amber-600'}`}>
              {product.subCategory}
            </p>
            {!product.isSoftLaunch && product.isSample && (
              <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-200/80 dark:bg-slate-800 px-2 py-0.5 rounded shrink-0">
                Sample Data
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className={[
            'text-[13.5px] sm:text-[14px] font-bold tracking-tight font-heading mb-1.5 leading-snug',
            dark ? 'text-white' : 'text-slate-900',
          ].join(' ')}>
            {product.title}
          </h3>

          {/* Soft Launch Compact Callout Box (Maximized space, no text cut-off) */}
          {product.isSoftLaunch ? (
            <div className={`my-2 p-2 sm:p-2.5 rounded-xl border flex items-center gap-2 ${
              dark
                ? 'bg-purple-950/40 border-purple-500/30 text-purple-200'
                : 'bg-purple-50/90 border-purple-200 text-purple-950'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-purple-500 shrink-0 animate-pulse" />
              <div className="min-w-0 flex-1">
                <p className="text-[10.5px] font-extrabold leading-tight">
                  Technical Specs & Details on Hold
                </p>
                <p className="text-[9.5px] font-medium opacity-80 leading-tight mt-0.5">
                  Available for early project inquiries
                </p>
              </div>
            </div>
          ) : (
            <p className={`text-xs leading-relaxed mb-4 flex-grow line-clamp-3 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              {product.description}
            </p>
          )}

          {/* Specs / Metrics Grid — Hidden on small viewing devices (< sm) to keep mobile cards concise (hides Building Type, Dimensions) */}
          {!product.isSoftLaunch ? (
            <div className={`hidden sm:grid grid-cols-3 gap-px mb-4 rounded-xl overflow-hidden border ${dark ? 'border-white/8' : 'border-slate-100'}`}>
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
          ) : null}

          {/* CTA Buttons — Specs Modal Trigger + Add to Inquiry */}
          <div className="grid grid-cols-2 gap-2 mt-auto pt-2 border-t border-slate-100 dark:border-white/10">
            <button
              onClick={() => setIsSpecsModalOpen(true)}
              className={[
                'w-full min-w-0 flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-[0.98]',
                product.isSoftLaunch
                  ? dark
                    ? 'bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-500/30'
                    : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200'
                  : dark
                    ? 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200',
              ].join(' ')}
            >
              <FileText className={`w-3.5 h-3.5 shrink-0 ${product.isSoftLaunch ? 'text-purple-500' : 'text-amber-500'}`} />
              <span className="truncate">{product.isSoftLaunch ? 'Listing Soon' : 'View Specs'}</span>
            </button>

            <button
              onClick={() => onToggleInquiry(product)}
              className={[
                'w-full min-w-0 flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-[0.98]',
                isAddedToInquiry
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25 hover:bg-amber-300'
                  : product.isSoftLaunch
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white shadow-md shadow-purple-900/30'
                    : dark
                      ? 'bg-[#254B7C] hover:bg-[#1E3E66] text-white border border-blue-300/20 shadow-sm hover:shadow-md'
                      : 'bg-[#1E3E66] hover:bg-[#254B7C] text-white shadow-sm hover:shadow-md',
              ].join(' ')}
            >
              {isAddedToInquiry ? (
                <>
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Inquire</span>
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
