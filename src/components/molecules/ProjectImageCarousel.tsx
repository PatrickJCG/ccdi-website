import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';

export interface CarouselImageItem {
  url: string;
  caption?: string;
}

export interface ProjectImageCarouselProps {
  images: (CarouselImageItem | string)[];
  alt: string;
  aspectClassName?: string;
  imageClassName?: string;
  className?: string;
  showThumbnails?: boolean;
  showCaption?: boolean;
  hideDots?: boolean;
  autoPlayInterval?: number;
  fallbackUrl?: string;
  children?: React.ReactNode;
}

export const ProjectImageCarousel: React.FC<ProjectImageCarouselProps> = ({
  images,
  alt,
  aspectClassName = 'h-52 sm:h-56',
  imageClassName = 'object-cover object-center',
  className = '',
  showThumbnails = false,
  showCaption = false,
  hideDots = false,
  autoPlayInterval = 4500,
  fallbackUrl = '/images/capabilities/poultry-facility.jpg',
  children,
}) => {
  const normalizedImages = useMemo<CarouselImageItem[]>(() => {
    const items = (images || [])
      .map((item) => (typeof item === 'string' ? { url: item } : item))
      .filter((item) => Boolean(item && item.url));
    return items.length > 0 ? items : [{ url: fallbackUrl }];
  }, [images, fallbackUrl]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const thumbStripRef = useRef<HTMLDivElement>(null);

  // Reset index when image list changes (e.g., navigating between articles)
  const firstUrl = normalizedImages[0]?.url;
  useEffect(() => {
    setCurrentIndex(0);
  }, [firstUrl, normalizedImages.length]);

  const safeIndex = currentIndex < normalizedImages.length ? currentIndex : 0;
  const currentImage = normalizedImages[safeIndex] || normalizedImages[0];
  const hasMultiple = normalizedImages.length > 1;

  // Auto-advance when multiple images exist and not hovered
  useEffect(() => {
    if (!hasMultiple || isHovered || autoPlayInterval <= 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % normalizedImages.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [hasMultiple, isHovered, autoPlayInterval, normalizedImages.length]);

  // Keep active thumbnail visible in strip when showThumbnails is enabled
  useEffect(() => {
    if (!showThumbnails || !thumbStripRef.current) return;
    const activeBtn = thumbStripRef.current.children[safeIndex] as HTMLElement | undefined;
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [safeIndex, showThumbnails]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % normalizedImages.length);
  };

  const handleSelect = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(idx);
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!img.src.endsWith(fallbackUrl)) {
      img.src = fallbackUrl;
    }
  };

  // Compact dot indicators (cap visible dots to keep dense galleries tidy)
  const maxDots = 7;

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Carousel Stage */}
      <div className={`relative w-full overflow-hidden bg-[#040D18] ${aspectClassName}`}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage.url}
            src={currentImage.url}
            onError={handleImgError}
            alt={currentImage.caption || alt}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={`absolute inset-0 w-full h-full ${imageClassName}`}
          />
        </AnimatePresence>

        {/* Optional overlay children (scrims, status/category badges, location bars) */}
        {children}

        {/* Photo Counter Pill + Controls when 2+ images */}
        {hasMultiple && (
          <>
            {/* Top-left / Bottom-right Photo Counter */}
            <div
              className={`absolute z-20 pointer-events-none flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#040D18]/80 border border-white/15 text-[10px] font-mono font-bold text-slate-100 backdrop-blur-xs shadow-sm ${
                showThumbnails ? 'top-3 right-3' : 'bottom-2.5 right-3'
              }`}
            >
              <Images className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="tabular-nums">
                {safeIndex + 1} / {normalizedImages.length}
              </span>
            </div>

            {/* Prev / Next Chevron Buttons */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label={`Previous image for ${alt}`}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-[2px] bg-[#07162A]/85 hover:bg-[#F3A812] text-white hover:text-slate-950 border border-white/20 hover:border-[#F3A812] flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer ${
                showThumbnails
                  ? 'w-9 h-9 opacity-90 hover:opacity-100'
                  : 'w-7 h-7 opacity-85 sm:opacity-0 sm:group-hover:opacity-100'
              }`}
            >
              <ChevronLeft className={showThumbnails ? 'w-5 h-5' : 'w-4 h-4'} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label={`Next image for ${alt}`}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-[2px] bg-[#07162A]/85 hover:bg-[#F3A812] text-white hover:text-slate-950 border border-white/20 hover:border-[#F3A812] flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer ${
                showThumbnails
                  ? 'w-9 h-9 opacity-90 hover:opacity-100'
                  : 'w-7 h-7 opacity-85 sm:opacity-0 sm:group-hover:opacity-100'
              }`}
            >
              <ChevronRight className={showThumbnails ? 'w-5 h-5' : 'w-4 h-4'} />
            </button>

            {/* Indicator Dots (hidden when thumbnails are shown below stage or hideDots is set) */}
            {!showThumbnails && !hideDots && normalizedImages.length <= maxDots && (
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-black/55 px-1.5 py-1 rounded-[2px] border border-white/10 backdrop-blur-xs">
                {normalizedImages.map((img, idx) => (
                  <button
                    key={img.url + idx}
                    type="button"
                    onClick={(e) => handleSelect(e, idx)}
                    aria-label={`View image ${idx + 1} of ${normalizedImages.length}`}
                    className={`h-1.5 rounded-[1px] transition-all duration-200 cursor-pointer ${
                      idx === safeIndex ? 'w-4 bg-[#F3A812]' : 'w-1.5 bg-white/45 hover:bg-white/85'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Caption Bar (for ArticleView) */}
      {showCaption && currentImage.caption && (
        <div className="px-4 py-3 bg-white border-x border-b border-slate-200 flex items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">
            {currentImage.caption}
          </p>
          {hasMultiple && (
            <span className="shrink-0 font-mono text-[11px] font-bold text-amber-600 tabular-nums">
              Photo {safeIndex + 1} of {normalizedImages.length}
            </span>
          )}
        </div>
      )}

      {/* Thumbnail Strip (for ArticleView) */}
      {showThumbnails && hasMultiple && (
        <div
          ref={thumbStripRef}
          className="mt-3 flex items-center gap-2 overflow-x-auto pb-1.5 [scrollbar-width:thin]"
          role="listbox"
          aria-label={`${alt} gallery thumbnails`}
        >
          {normalizedImages.map((img, idx) => {
            const isActive = idx === safeIndex;
            return (
              <button
                key={img.url + idx}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={(e) => handleSelect(e, idx)}
                title={img.caption || `Photo ${idx + 1}`}
                className={`relative shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-[2px] overflow-hidden border-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#F3A812] ring-1 ring-[#F3A812] opacity-100'
                    : 'border-slate-200 opacity-65 hover:opacity-100 hover:border-slate-400'
                }`}
              >
                <img
                  src={img.url}
                  onError={handleImgError}
                  alt={img.caption || `${alt} photo ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
