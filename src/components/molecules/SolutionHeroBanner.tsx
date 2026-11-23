import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, PhoneCall } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface HeroBackgroundImage {
  url: string;
  caption?: string;
  objectPosition?: string;
}

export interface SolutionHeroBannerProps {
  breadcrumbs: BreadcrumbItem[];
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  headerMeta?: React.ReactNode;
  backgroundImage?: string;
  backgroundImages?: (string | HeroBackgroundImage)[];
  fallbackImage?: string;
  imageAlt?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  children?: React.ReactNode;
  bottomContent?: React.ReactNode;
}

export const SolutionHeroBanner: React.FC<SolutionHeroBannerProps> = ({
  breadcrumbs,
  title,
  subtitle,
  headerMeta,
  backgroundImage,
  backgroundImages,
  fallbackImage,
  imageAlt = 'CCDI Solution Infrastructure',
  ctaText,
  onCtaClick,
  children,
  bottomContent,
}) => {
  const imageList = useMemo<HeroBackgroundImage[]>(() => {
    if (backgroundImages && backgroundImages.length > 0) {
      return backgroundImages.map((item) => (typeof item === 'string' ? { url: item } : item));
    }
    if (backgroundImage) {
      return [{ url: backgroundImage }];
    }
    return [];
  }, [backgroundImage, backgroundImages]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
  }, [backgroundImage, backgroundImages]);

  useEffect(() => {
    if (imageList.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageList.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [imageList.length, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!fallbackImage) return;
    const img = e.currentTarget;
    if (!img.src.endsWith(fallbackImage)) {
      img.src = fallbackImage;
    }
  };

  const currentImage = imageList[currentIndex] || imageList[0];

  return (
    <section
      onMouseEnter={() => imageList.length > 1 && setIsPaused(true)}
      onMouseLeave={() => imageList.length > 1 && setIsPaused(false)}
      className="relative bg-[#07162A] text-white min-h-[340px] sm:min-h-[370px] lg:min-h-[400px] py-12 sm:py-16 flex flex-col justify-center border-b border-[#102A43] overflow-hidden"
    >
      {/* Background Hero Image with Dual-Zone Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {imageList.length > 1 && currentImage ? (
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage.url}
              src={currentImage.url}
              onError={handleImgError}
              alt={currentImage.caption || imageAlt}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={currentImage.objectPosition ? { objectPosition: currentImage.objectPosition } : undefined}
              className="w-full h-full object-cover object-center opacity-100 brightness-[1.05] contrast-[1.05]"
            />
          </AnimatePresence>
        ) : currentImage ? (
          <img
            src={currentImage.url}
            onError={handleImgError}
            alt={currentImage.caption || imageAlt}
            style={currentImage.objectPosition ? { objectPosition: currentImage.objectPosition } : undefined}
            className="w-full h-full object-cover object-center opacity-100 brightness-[1.05] contrast-[1.05]"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162A]/80 via-[#07162A]/45 via-50% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07162A]/60 via-transparent to-[#07162A]/20" />
      </div>

      {/* Unified Poultry/Solution Amber Radial Grid & Ambient Glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Architectural Accent 2 - Top Left Anchored */}
      <motion.div
        initial={{ opacity: 0, y: -45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-12 -left-16 sm:-top-8 sm:left-0 w-80 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <img
          src="/images/accents/accent2.png"
          alt=""
          className="w-full h-auto object-contain opacity-30"
        />
      </motion.div>

      {/* Architectural Dynamic Accent Graphic - Bottom Right Anchored */}
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-16 -right-16 sm:-right-8 sm:bottom-0 w-80 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <img
          src="/images/accents/dark-accent-graphic.png"
          alt=""
          className="w-full h-auto object-contain opacity-30"
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <div className="space-y-6">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                  {crumb.path && !isLast ? (
                    <Link to={crumb.path} className="hover:text-amber-400 transition-colors uppercase">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? 'text-amber-400 font-bold uppercase' : 'uppercase'}>
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          <div className="max-w-4xl space-y-5">
            {headerMeta}

            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-white leading-[1.2] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              {title}
            </h1>

            {subtitle && (
              <p className="text-slate-100 text-base sm:text-lg leading-relaxed max-w-3xl sm:min-h-[3.5rem] flex items-center drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                {subtitle}
              </p>
            )}

            {(ctaText || children) && (
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {ctaText && onCtaClick && (
                  <button
                    type="button"
                    onClick={onCtaClick}
                    className="px-6 py-3.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-extrabold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    {ctaText}
                  </button>
                )}
                {children}
              </div>
            )}
          </div>
        </div>

        {bottomContent && (
          <div className="pt-2">
            {bottomContent}
          </div>
        )}

        {imageList.length > 1 && (
          <div className="pt-2 flex flex-wrap items-center justify-end gap-4">
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-1.5">
                {imageList.map((img, idx) => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    title={img.caption || `Slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex
                        ? 'w-6 bg-amber-400'
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1 pl-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous background image"
                  className="w-7 h-7 rounded-[2px] bg-[#07162A]/90 hover:bg-amber-400 hover:text-slate-950 text-white border border-[#1E3E66] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next background image"
                  className="w-7 h-7 rounded-[2px] bg-[#07162A]/90 hover:bg-amber-400 hover:text-slate-950 text-white border border-[#1E3E66] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

