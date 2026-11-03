import React, { useState } from 'react';
import { Image as ImageIcon, Maximize2, X } from 'lucide-react';

export interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  label?: string;
  badge?: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'wide' | 'tall' | 'banner' | 'auto';
  theme?: 'dark' | 'light';
  objectFit?: 'contain' | 'cover';
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt,
  label,
  badge,
  className = '',
  aspectRatio = 'video',
  theme = 'dark',
  objectFit = 'contain',
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const aspectClass = {
    video: 'aspect-video',
    square: 'aspect-square',
    wide: 'aspect-[16/7]',
    tall: 'aspect-[3/4]',
    banner: 'aspect-[21/9]',
    auto: 'h-full',
  }[aspectRatio];

  if (src && src.trim() !== '') {
    return (
      <>
        <div
          onClick={() => setIsLightboxOpen(true)}
          className={`relative overflow-hidden rounded-[2px] bg-white border border-slate-200 hover:border-amber-400/80 ${
            objectFit === 'cover' ? 'p-0' : 'p-3 sm:p-4'
          } flex items-center justify-center transition-all duration-300 group/img cursor-pointer shadow-xs hover:shadow-md ${aspectClass} ${className}`}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`w-full h-full ${
              objectFit === 'cover' ? 'object-cover' : 'object-contain'
            } transition-transform duration-500 group-hover/img:scale-105`}
          />

          {/* Architectural Top-Right Corner Accent */}
          <img
            src="/images/accents/card-corner-accent.png"
            alt=""
            className="absolute top-0 right-0 w-20 sm:w-28 h-auto object-contain object-right-top pointer-events-none select-none z-10 drop-shadow-xs opacity-75"
            aria-hidden="true"
          />

          {/* Optional Top-Left Capability Badge */}
          {badge && (
            <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-[2px] bg-[#040D18]/90 text-amber-400 border border-amber-400/50 shadow-sm backdrop-blur-xs">
                {badge}
              </span>
            </div>
          )}

          {/* Fullscreen Lightbox Trigger Pill */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="absolute bottom-2.5 right-2.5 z-20 p-1.5 rounded-[2px] bg-[#07162A]/85 hover:bg-amber-400 hover:text-slate-950 text-white border border-[#1E3E66] opacity-0 group-hover/img:opacity-100 transition-all duration-200 shadow-md cursor-pointer"
            title="Inspect Full Resolution Image"
            aria-label={`Inspect ${alt}`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Fullscreen Lightbox Modal */}
        {isLightboxOpen && (
          <div
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-[#040D18]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-white border-2 border-amber-400/60 rounded-[2px] p-4 sm:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                <div>
                  <span className="font-mono text-[10px] text-amber-600 font-bold uppercase tracking-widest block">
                    HATCHERY SYSTEM SPECIFICATION
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-[#0B192C] tracking-tight">
                    {label || alt}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 rounded-[2px] bg-[#0B192C] text-white hover:bg-amber-400 hover:text-slate-950 transition-colors cursor-pointer"
                  aria-label="Close preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-[75vh] flex items-center justify-center overflow-hidden bg-white">
                <img
                  src={src}
                  alt={alt}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  const isDark = theme === 'dark';

  return (
    <div
      className={`relative w-full ${aspectClass} rounded-[2px] border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all duration-200 select-none ${
        isDark
          ? 'bg-[#0B192C]/80 border-[#1E3E66] text-slate-400 hover:border-amber-400/60'
          : 'bg-slate-100 border-slate-300 text-slate-500 hover:border-amber-500/60'
      } ${className}`}
    >
      <div className="flex flex-col items-center justify-center text-center gap-2 max-w-[90%]">
        <div
          className={`w-10 h-10 rounded-[2px] flex items-center justify-center ${
            isDark ? 'bg-[#07162A] text-amber-400' : 'bg-white text-amber-600 shadow-xs'
          }`}
        >
          <ImageIcon className="w-5 h-5 opacity-80" />
        </div>
        <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider line-clamp-2">
          {label || alt}
        </span>
        <span
          className={`font-mono text-[9px] uppercase px-1.5 py-0.5 rounded-[2px] tracking-widest ${
            isDark ? 'bg-[#07162A] text-slate-400' : 'bg-white text-slate-500'
          }`}
        >
          Image Placeholder
        </span>
      </div>
    </div>
  );
};
