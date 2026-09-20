import React, { memo, useState } from 'react';
import { Play } from 'lucide-react';
import type { Product, BusinessUnit } from '../../data/mockProducts';
import { ProductSpecsModal } from './ProductSpecsModal';

export interface ProductCardProps {
  product: Product;
  dark?: boolean;
  isAddedToInquiry: boolean;
  onToggleInquiry: (product: Product) => void;
  className?: string;
}

const getShortBu = (bu: BusinessUnit): string => {
  switch (bu) {
    case 'Poultry Farm Equipment':
      return 'POULTRY';
    case 'Hatchery':
      return 'HATCHERY';
    case 'Feedmill':
      return 'FEEDMILL';
    case 'Solar Systems':
      return 'SOLAR PV';
    default:
      return 'EQUIPMENT';
  }
};

const ProductCardInner: React.FC<ProductCardProps> = ({
  product,
  dark = false,
  isAddedToInquiry,
  onToggleInquiry,
  className = '',
}) => {
  const [isSpecsModalOpen, setIsSpecsModalOpen] = useState(false);
  const [mediaMode, setMediaMode] = useState<'image' | 'video'>('image');

  return (
    <>
      <article
        onClick={() => setIsSpecsModalOpen(true)}
        className={[
          'rounded-[2px] p-4 flex flex-col h-full text-left transition-all duration-300 border font-sans group cursor-pointer',
          dark
            ? 'bg-[#0B192C] border-[#1E3E66] text-slate-100 hover:border-[#F3A812] hover:shadow-xl hover:shadow-amber-500/10'
            : 'bg-white border-slate-200 text-slate-900 hover:border-[#0B192C] hover:shadow-md',
          className,
        ].join(' ')}
      >
        {/* ── 1. MEDIA CONTAINER (IMAGE / VIDEO SWITCHER, INDUSTRIAL DEPTH) ── */}
        <div className="relative w-full h-44 sm:h-48 rounded-[2px] overflow-hidden bg-[#07162A] border border-[#102A43] mb-3 group/media">
          {product.videoUrl && mediaMode === 'video' ? (
            <div className="w-full h-full bg-black relative">
              <video
                src={product.videoUrl}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            </div>
          ) : product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              loading="lazy"
              decoding="async"
              className={`w-full h-full ${
                product.imageUrl.includes('3d') || product.imageUrl.includes('logo')
                  ? 'object-contain p-6 bg-gradient-to-b from-[#0B1E36] to-[#040D18]'
                  : 'object-cover'
              } brightness-[0.92] contrast-[1.08] group-hover:scale-105 transition-all duration-500`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-xs uppercase tracking-widest text-slate-500">
              [NO SPECIFICATION RECORD]
            </div>
          )}

          {/* Scrim gradient overlay for badge contrast (only in image mode) */}
          {mediaMode === 'image' && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#040D18]/70 via-transparent to-black/30 pointer-events-none" />
          )}

          {/* Architectural Top-Right Corner Accent */}
          {mediaMode === 'image' && (
            <img
              src="/images/accents/card-corner-accent.png"
              alt=""
              className="absolute top-0 right-0 w-24 sm:w-32 h-auto object-contain object-right-top pointer-events-none select-none z-10 drop-shadow-sm"
              aria-hidden="true"
            />
          )}

          {/* Clean Unified Capability & Status Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2 z-10 pointer-events-none">
            <span className="font-mono text-[10px] uppercase tracking-wider font-normal px-2.5 py-1 rounded-[2px] bg-[#040D18]/90 text-[#F3A812] border border-[#F3A812]/50 shadow-md backdrop-blur-sm">
              {getShortBu(product.businessUnit)}
            </span>
            {product.isSoftLaunch && (
              <span className="font-mono text-[9px] uppercase tracking-wider font-normal px-2 py-0.5 rounded-[2px] bg-[#07162A]/90 text-amber-400 border border-amber-400/50 shadow-md backdrop-blur-sm">
                PIPELINE
              </span>
            )}
          </div>

          {/* Video / Photo Switcher Pills (Top-Right) */}
          {product.videoUrl && (
            <div className="absolute top-3 right-3 z-20 flex items-center gap-0.5 bg-[#040D18]/90 p-0.5 rounded-[2px] border border-amber-400/40 backdrop-blur-md shadow-md">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMediaMode('image');
                }}
                className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-[2px] transition-colors cursor-pointer ${
                  mediaMode === 'image'
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="View Architectural 3D Rendering"
              >
                Photo
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMediaMode('video');
                }}
                className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-[2px] transition-colors cursor-pointer flex items-center gap-1 ${
                  mediaMode === 'video'
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-amber-400 hover:text-white'
                }`}
                title="Watch 3D Facility Video Tour"
              >
                <Play className="w-2.5 h-2.5 fill-current" />
                Video
              </button>
            </div>
          )}

          {/* Quick Play Trigger Bar (Image Mode Hover Overlay) */}
          {product.videoUrl && mediaMode === 'image' && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMediaMode('video');
              }}
              className="absolute bottom-2.5 right-2.5 z-10 px-2.5 py-1 rounded-[2px] bg-[#040D18]/90 hover:bg-amber-400 hover:text-slate-950 text-amber-300 border border-amber-400/40 text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-sm cursor-pointer transition-all opacity-90 group-hover/media:opacity-100"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Watch Facility Tour</span>
            </button>
          )}
        </div>

        {/* ── 2. CARD HEADER: CLEAR INFORMATION HIERARCHY ── */}
        <div className={`pb-2.5 border-b space-y-1 mb-3 ${dark ? 'border-[#102A43]' : 'border-slate-100'}`}>
          {/* Eyebrow: Subcategory */}
          <div className="flex items-center gap-2">
            <span className={`font-mono text-[11px] uppercase tracking-wider font-bold truncate ${
              dark ? 'text-[#F3A812]' : 'text-amber-700'
            }`}>
              {product.subCategory}
            </span>
          </div>

          {/* Product Title (Primary Visual Weight — Refined, Clean Headline) */}
          <h3 className={`text-[15px] sm:text-base font-bold tracking-tight leading-snug transition-colors ${
            dark
              ? 'text-white group-hover:text-[#F3A812]'
              : 'text-[#0B192C] group-hover:text-amber-700'
          }`}>
            {product.title}
          </h3>
        </div>

        {/* ── 3. STRUCTURED TECHNICAL SPECIFICATIONS STRIP (THREE ROWS) ── */}
        {!product.isSoftLaunch && product.metrics && (
          <div className={`divide-y mb-3 rounded-[2px] border font-mono text-xs ${
            dark ? 'bg-[#07162A] border-[#102A43] divide-[#102A43]' : 'bg-slate-50 border-slate-200 divide-slate-200'
          }`}>
            <div className="flex items-center justify-between gap-2 px-3 py-1.5 sm:py-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold truncate">
                {product.metrics.spec2Label || 'Dimensions'}
              </span>
              <span className={`text-xs font-normal tabular-nums shrink-0 text-right ${
                dark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                {product.metrics.spec2Value || 'Standard Spec'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 px-3 py-1.5 sm:py-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold truncate">
                {product.metrics.spec3Label || 'Capacity'}
              </span>
              <span className={`text-xs font-normal tabular-nums shrink-0 text-right ${
                dark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                {product.metrics.spec3Value || 'Turnkey EPC'}
              </span>
            </div>
            {product.metrics.spec1Value && (
              <div className="flex items-center justify-between gap-2 px-3 py-1.5 sm:py-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold truncate">
                  {product.metrics.spec1Label || 'Specification'}
                </span>
                <span className={`text-xs font-normal tabular-nums shrink-0 text-right ${
                  dark ? 'text-slate-100' : 'text-slate-900'
                }`}>
                  {product.metrics.spec1Value}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── 4. ACTION FOOTER ── */}
        <div className={`pt-2.5 border-t grid grid-cols-2 gap-2 mt-auto ${
          dark ? 'border-[#102A43]' : 'border-slate-200'
        }`}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsSpecsModalOpen(true);
            }}
            className={`w-full py-2 px-2 rounded-[2px] font-sans text-[11px] uppercase tracking-wide font-bold transition-all duration-200 flex items-center justify-center gap-1 border shadow-xs cursor-pointer whitespace-nowrap ${
              dark
                ? 'bg-[#07162A] text-slate-200 border-[#1E3E66] hover:border-[#F3A812] hover:text-[#F3A812] hover:bg-[#102A43]'
                : 'bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-500 hover:bg-slate-100 hover:text-slate-950'
            }`}
          >
            <span>More Details</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleInquiry(product);
            }}
            className={[
              'w-full py-2 px-2 rounded-[2px] font-sans text-[11px] uppercase tracking-wide font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap flex items-center justify-center gap-1',
              isAddedToInquiry
                ? 'bg-[#040D18] text-[#F3A812] border border-[#F3A812] font-black shadow-inner'
                : 'bg-[#F3A812] text-slate-950 hover:bg-amber-300 border border-amber-400 font-extrabold shadow-xs',
            ].join(' ')}
          >
            {isAddedToInquiry ? '✓ INCLUDED' : '+ INQUIRE'}
          </button>
        </div>
      </article>

      {/* Technical Blueprint Modal */}
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

export const ProductCard = memo(ProductCardInner);
