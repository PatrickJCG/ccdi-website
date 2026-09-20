import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Maximize2,
  Images,
} from 'lucide-react';
import type { ProductionSystem, SystemImage } from '../../data/coreProductionSystems';

export interface CoreProductionSystemsShowcaseProps {
  systems: ProductionSystem[];
  eyebrow?: string;
  sectionTitle?: string;
  description?: string;
  totalCountBadge?: string;
  accentTheme?: 'amber' | 'sky' | 'emerald';
  defaultViewMode?: string;
  id?: string;
}

// ─── INDIVIDUAL PRODUCT CARD WITH EMBEDDED IMAGE CAROUSEL ──────────────────
interface ProductionSystemCardProps {
  system: ProductionSystem;
  onOpenLightbox: (img: SystemImage) => void;
  accentTheme?: 'amber' | 'sky' | 'emerald';
}

const ProductionSystemCard: React.FC<ProductionSystemCardProps> = ({
  system,
  onOpenLightbox,
  accentTheme: _accentTheme = 'amber',
}) => {
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const images: SystemImage[] = system.galleryImages && system.galleryImages.length > 0
    ? system.galleryImages
    : [{ url: system.primaryImage, title: system.name, caption: system.tagline }];

  const totalImages = images.length;
  const currentImage = images[activeImgIndex] || images[0];

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImgIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImgIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const selectImage = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex(idx);
  };

  // Optional subtle auto-rotation when user hovers over the card
  useEffect(() => {
    if (!isHovered || totalImages <= 1) return;
    const interval = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % totalImages);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered, totalImages]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-[#07162A] border border-[#1E3E66] rounded-[2px] overflow-hidden flex flex-col justify-between hover:border-amber-400/80 transition-all duration-300 group shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 text-left"
    >
      {/* ── CARD MEDIA CONTAINER: INTERACTIVE EMBEDDED CAROUSEL ──────────────── */}
      <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-[#040D18] select-none">
        {/* Animated Slide Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.url}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            {currentImage.isVideo ? (
              <video
                src={currentImage.url}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <img
                src={currentImage.url}
                alt={currentImage.title}
                loading="lazy"
                className={`w-full h-full ${
                  currentImage.url.includes('3d')
                    ? 'object-contain p-2 bg-gradient-to-b from-[#0B1E36] to-[#040D18]'
                    : 'object-cover object-center'
                } brightness-[0.92] contrast-[1.08]`}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Ambient Top & Bottom Contrast Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07162A] via-transparent to-black/40 pointer-events-none" />

        {/* Architectural Top-Right Corner Accent */}
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-32 sm:w-40 h-auto object-contain object-right-top pointer-events-none select-none z-10 drop-shadow-sm"
          aria-hidden="true"
        />

        {/* Top Controls: Multi-Photo Counter & Lightbox */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
          {totalImages > 1 && (
            <span className="font-mono text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-[#040D18]/90 text-amber-300 border border-amber-400/30 backdrop-blur-md flex items-center gap-1 shadow-md">
              <Images className="w-3 h-3 text-amber-400" />
              {activeImgIndex + 1} / {totalImages}
            </span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(currentImage);
            }}
            className="p-1.5 rounded-[2px] bg-[#040D18]/90 hover:bg-amber-400 hover:text-slate-950 text-white border border-white/20 transition-colors backdrop-blur-md cursor-pointer shadow-md"
            title="Inspect Full Resolution Photo"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* Embedded Carousel Left/Right Controls (Always visible or high visibility on hover) */}
        {totalImages > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous equipment photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[2px] bg-[#040D18]/80 hover:bg-amber-400 hover:text-slate-950 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer z-20 opacity-80 group-hover:opacity-100 backdrop-blur-sm shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next equipment photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[2px] bg-[#040D18]/80 hover:bg-amber-400 hover:text-slate-950 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer z-20 opacity-80 group-hover:opacity-100 backdrop-blur-sm shadow-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Bottom Overlay: Current Photo Equipment Title & Carousel Dots */}
        <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between gap-2 z-10">
          <div className="bg-[#040D18]/90 backdrop-blur-sm border border-[#1E3E66] px-2.5 py-1 rounded-[2px] max-w-[75%] shadow-md">
            <p className="font-sans text-[11px] font-extrabold text-white truncate leading-tight">
              {currentImage.title}
            </p>
            {currentImage.caption && (
              <p className="font-mono text-[9px] text-amber-300 truncate mt-0.5">
                {currentImage.caption}
              </p>
            )}
          </div>

          {/* Dot Indicators */}
          {totalImages > 1 && (
            <div className="flex items-center gap-1 bg-[#040D18]/90 px-2 py-1 rounded-[2px] border border-[#1E3E66] backdrop-blur-sm shadow-md">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => selectImage(idx, e)}
                  aria-label={`Jump to photo ${idx + 1}`}
                  className={`h-1.5 rounded-[1px] transition-all cursor-pointer ${
                    activeImgIndex === idx
                      ? 'w-4 bg-amber-400'
                      : 'w-1.5 bg-slate-600 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── CARD BODY: TECHNICAL SPECIFICATIONS & BENCHMARKS ──────────────── */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-[#07162A]">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors tracking-tight">
              {system.name}
            </h3>
          </div>
          <p className="font-mono text-xs font-semibold text-amber-400">
            {system.tagline}
          </p>
          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 pt-1">
            {system.description}
          </p>
        </div>

        {/* Key Metrics Chips */}
        {system.keyMetrics && system.keyMetrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1E3E66]">
            {system.keyMetrics.map((met, idx) => (
              <div
                key={idx}
                className="bg-[#0B192C] p-2.5 rounded-[2px] border border-[#1E3E66]"
              >
                <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block font-semibold">
                  {met.label}
                </span>
                <span className="text-sm font-black text-white font-mono block mt-0.5">
                  {met.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Configuration Tags */}
        <div className="space-y-2 pt-2 border-t border-[#1E3E66]">
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block font-bold">
            {system.specCategoryLabel}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {system.specTags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-[#0B192C] text-slate-300 text-[11px] font-mono border border-[#1E3E66] rounded-[2px] flex items-center gap-1"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN CORE PRODUCTION SYSTEMS SHOWCASE COMPONENT ──────────────────────
export const CoreProductionSystemsShowcase: React.FC<CoreProductionSystemsShowcaseProps> = ({
  systems,
  eyebrow = 'INTEGRATED AUTOMATION & CLIMATE',
  sectionTitle = '6 Core Breeder Production Systems',
  description = 'Every CCDI turnkey poultry facility is equipped with factory-calibrated mechanical and electrical systems to uphold animal welfare, feed conversion, and hatchability. Inspect sub-equipment pictures inside each card below.',
  totalCountBadge = '06 FULLY INTEGRATED SYSTEMS',
  accentTheme = 'amber',
  id = 'core-systems',
}) => {
  const [lightboxImage, setLightboxImage] = useState<SystemImage | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id={id}
      className="py-20 sm:py-24 bg-[#0B192C] text-white border-b border-[#102A43] relative overflow-hidden text-left"
    >
      {/* Background glow ambiance */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">

        {/* ── 1. SECTION HEADER ──────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#1E3E66] pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest font-bold block text-amber-400">
                {eyebrow}
              </span>
              <span className="text-slate-600 text-xs">•</span>
              <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                PICTURE CAROUSEL PER CARD
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {sectionTitle}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start lg:self-auto">
            <div className="font-mono text-xs text-slate-300 bg-[#07162A] px-3.5 py-1.5 rounded-[2px] border border-[#1E3E66]">
              <span className="text-amber-400 font-bold mr-1">06</span> {totalCountBadge.replace(/^\d+\s*/, '')}
            </div>
          </div>
        </div>

        {/* ── 2. 6-SYSTEM GRID (EACH CARD HAS ITS OWN EMBEDDED PICTURE CAROUSEL) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((system) => (
            <ProductionSystemCard
              key={system.id}
              system={system}
              accentTheme={accentTheme}
              onOpenLightbox={(img) => setLightboxImage(img)}
            />
          ))}
        </div>

      </div>

      {/* ── 3. FULL-RESOLUTION LIGHTBOX MODAL ─────────────────────────────────── */}
      <AnimatePresence>
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#07162A] border border-[#1E3E66] rounded-[2px] overflow-hidden shadow-2xl"
            >
              <div className="relative w-full h-[65vh] bg-black flex items-center justify-center">
                {lightboxImage.isVideo ? (
                  <video
                    src={lightboxImage.url}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={lightboxImage.url}
                    alt={lightboxImage.title}
                    className="w-full h-full object-contain"
                  />
                )}
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-4 right-4 px-3 py-1.5 bg-black/80 hover:bg-amber-400 hover:text-slate-950 text-white font-mono text-xs font-bold rounded-[2px] border border-white/20 cursor-pointer transition-colors"
                >
                  ✕ CLOSE [ESC]
                </button>
              </div>
              <div className="p-4 bg-[#0B192C] border-t border-[#1E3E66] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-white">
                    {lightboxImage.title}
                  </h4>
                  {lightboxImage.caption && (
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {lightboxImage.caption}
                    </p>
                  )}
                </div>
                <span className="font-mono text-xs text-amber-400 font-bold bg-[#07162A] px-2.5 py-1 rounded-[2px] border border-amber-400/30 shrink-0">
                  CCDI EQUIPMENT SPECIFICATION
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
