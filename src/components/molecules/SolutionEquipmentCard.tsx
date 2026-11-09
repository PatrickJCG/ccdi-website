import React from 'react';
import type { Product } from '../../data/mockProducts';
import { AddToInquiryButton } from '../atoms/AddToInquiryButton';
import { ImagePlaceholder } from '../atoms/ImagePlaceholder';

export interface SolutionEquipmentCardProps {
  product?: Product;
  title?: string;
  badge?: string;
  description?: string;
  imageUrl?: string;
  inquiryItems?: Product[];
  onToggleInquiry?: (product: Product) => void;
  className?: string;
}

export const SolutionEquipmentCard: React.FC<SolutionEquipmentCardProps> = React.memo(({
  product,
  title,
  badge,
  description,
  imageUrl,
  inquiryItems = [],
  onToggleInquiry,
  className = '',
}) => {
  const displayTitle = title || product?.title || '';
  const displayImage = imageUrl || product?.imageUrl || '';
  const displayBadge = badge !== undefined
    ? badge
    : product?.badge || (product?.description && product.description.includes(' | ')
      ? product.description.split(' | ')[0]
      : '');
  const displayDesc = description !== undefined
    ? description
    : product?.description
      ? (product.description.includes(' | ')
          ? product.description.split(' | ').slice(1).join(' | ')
          : product.description)
      : '';

  return (
    <div
      className={`flex flex-col justify-between bg-white border border-slate-200 hover:border-amber-400/80 rounded-[2px] p-5 sm:p-6 space-y-5 transition-all duration-200 shadow-xs hover:shadow-md group ${className}`}
    >
      <div className="space-y-3.5">
        <div className="space-y-1">
          <h4 className="text-lg sm:text-xl font-normal text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
            {displayTitle}
          </h4>
          {displayBadge && (
            <div className="pt-2 border-t border-slate-100">
              <p className="font-mono text-xs sm:text-sm font-bold text-amber-600 tracking-wide uppercase">
                {displayBadge}
              </p>
            </div>
          )}
        </div>

        <ImagePlaceholder
          src={displayImage}
          alt={displayTitle}
          label={displayTitle}
          aspectRatio="video"
          theme="light"
        />

        {displayDesc && displayDesc.trim() !== '' && (
          <p className="text-sm text-slate-700 leading-relaxed font-normal pt-1">
            {displayDesc}
          </p>
        )}
      </div>

      {product && onToggleInquiry && (
        <div className="pt-4 border-t border-slate-100 mt-auto">
          <AddToInquiryButton
            product={product}
            inquiryItems={inquiryItems}
            onToggleInquiry={onToggleInquiry}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
});

SolutionEquipmentCard.displayName = 'SolutionEquipmentCard';
