import React from 'react';
import { Plus, Check } from 'lucide-react';
import type { Product } from '../../data/mockProducts';

export interface AddToInquiryButtonProps {
  product: Product;
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  className?: string;
  variant?: 'light' | 'dark' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const AddToInquiryButton: React.FC<AddToInquiryButtonProps> = ({
  product,
  inquiryItems,
  onToggleInquiry,
  className = '',
  variant = 'amber',
  size = 'md',
  label = 'Add to Inquiry',
}) => {
  const isAdded = inquiryItems.some((item) => item.id === product.id);
  const basePadding = size === 'sm' ? 'py-2 px-3 text-[11px]' : 'py-2.5 px-4 text-xs';

  if (variant === 'dark') {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleInquiry(product);
        }}
        className={`rounded-[2px] font-sans uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${basePadding} ${
          isAdded
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-inner'
            : 'bg-[#0B192C] hover:bg-[#102A43] text-amber-400 border border-amber-400/50 hover:border-amber-400 shadow-sm'
        } ${className}`}
      >
        {isAdded ? (
          <>
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Added to Inquiry</span>
          </>
        ) : (
          <>
            <Plus className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{label}</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggleInquiry(product);
      }}
      className={`rounded-[2px] font-sans uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border shadow-xs ${basePadding} ${
        isAdded
          ? 'bg-[#0B192C] text-emerald-400 border-emerald-500/80 shadow-inner font-extrabold'
          : 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-400 font-extrabold shadow-sm'
      } ${className}`}
    >
      {isAdded ? (
        <>
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Added to Inquiry</span>
        </>
      ) : (
        <>
          <Plus className="w-4 h-4 shrink-0" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

