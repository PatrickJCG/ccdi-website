import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowDownRight, Layers } from 'lucide-react';

export interface HeroDesignOption {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  optionNumber?: string;
  badge?: string;
  metrics?: { label: string; value: string }[];
  targetSectionId: string;
  slideIndex: number;
}

export interface DesignOptionsHeroCarouselProps {
  options: HeroDesignOption[];
  onSelectOption: (option: HeroDesignOption) => void;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  categoryLabel?: string;
}

export const DesignOptionsHeroCarousel: React.FC<DesignOptionsHeroCarouselProps> = ({
  options,
  onSelectOption,
  activeIndex: controlledIndex,
  onActiveIndexChange,
  categoryLabel = 'HOUSING DESIGN FORMATS',
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;

  const updateIndex = (newIndex: number) => {
    if (controlledIndex === undefined) {
      setInternalIndex(newIndex);
    }
    onActiveIndexChange?.(newIndex);
  };

  const handlePrev = () => {
    const nextIdx = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
    updateIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % options.length;
    updateIndex(nextIdx);
  };

  const current = options[currentIndex] ?? options[0];

  return (
    <div className="relative bg-[#0B192C]/95 backdrop-blur-md border-2 border-amber-400/40 hover:border-amber-400/70 rounded-xl p-5 sm:p-6 shadow-2xl transition-all">
      {/* Top Header Row with Category & Slide Nav */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#1E3E66] gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-mono text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-widest">
            {categoryLabel}
          </span>
        </div>

        {/* Slide Counter & Arrows */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-slate-400 mr-1">
            <span className="text-white font-bold">{currentIndex + 1}</span> / {options.length}
          </span>

          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous design option"
            className="w-7 h-7 rounded-[4px] bg-[#07162A] hover:bg-amber-400 hover:text-slate-950 text-white border border-[#1E3E66] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next design option"
            className="w-7 h-7 rounded-[4px] bg-[#07162A] hover:bg-amber-400 hover:text-slate-950 text-white border border-[#1E3E66] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Content with cross-fade animation */}
      <div className="pt-4 space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-4"
          >
            {/* Picture Container */}
            <div className="relative h-44 sm:h-48 w-full rounded-lg overflow-hidden bg-slate-950 border border-white/10 group">
              <img
                src={current.imageUrl}
                alt={current.title}
                className="w-full h-full object-cover brightness-[0.98] transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Scrim for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/70 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Title & Caption */}
            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                {current.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-2">
                {current.caption}
              </p>
            </div>

            {/* Optional Key Metrics Strip */}
            {current.metrics && current.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                {current.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="bg-[#07162A] p-2 sm:p-2.5 rounded-[4px] border border-[#1E3E66]"
                  >
                    <span className="font-mono text-[9px] text-amber-400 font-bold uppercase tracking-wider block">
                      {m.label}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-white font-mono block mt-0.5 truncate">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Button: Directs to details on the next section */}
            <button
              type="button"
              onClick={() => onSelectOption(current)}
              className="w-full py-3 px-4 rounded-[4px] bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-150 flex items-center justify-between shadow-lg cursor-pointer group mt-2"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-slate-950" />
                <span>Explore Design Details</span>
              </span>
              <ArrowDownRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Quick Option Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {options.map((opt, idx) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => updateIndex(idx)}
              title={opt.title}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? 'w-6 bg-amber-400' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
