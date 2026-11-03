import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export interface SolutionPillarCardProps {
  title: string;
  tagline?: string;
  badge?: string;
  icon?: React.ComponentType<{ className?: string }>;
  image: string;
  imageFit?: 'cover' | 'contain';
  featuresLabel?: string;
  features: string[];
  path: string;
  ctaLabel?: string;
}

export const SolutionPillarCard: React.FC<SolutionPillarCardProps> = ({
  title,
  tagline,
  badge,
  icon: Icon,
  image,
  imageFit = 'cover',
  featuresLabel = 'KEY ENGINEERING ATTRIBUTES',
  features,
  path,
  ctaLabel,
}) => {
  return (
    <div className="flex flex-col justify-between bg-slate-50 border border-slate-200 hover:border-amber-400/80 rounded-[2px] overflow-hidden transition-all duration-200 hover:shadow-lg group">
      {/* Card Header Media */}
      {imageFit === 'cover' ? (
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900 shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07162A] via-[#07162A]/40 to-transparent" />

          {/* Top Right Corner Accent */}
          <img
            src="/images/accents/card-corner-accent.png"
            alt=""
            className="absolute top-0 right-0 w-24 sm:w-28 h-auto object-contain object-right-top pointer-events-none select-none z-10 drop-shadow-sm opacity-80"
            aria-hidden="true"
          />

          {/* Title in Media Overlay */}
          <div className="absolute bottom-3 left-4 right-4 z-10">
            {badge && (
              <div className="flex items-center gap-1.5 mb-1">
                {Icon && <Icon className="w-3.5 h-3.5 text-amber-400" />}
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-amber-400">
                  {badge}
                </span>
              </div>
            )}
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-amber-400 transition-colors">
              {title}
            </h3>
            {tagline && (
              <p className="text-slate-300 text-xs mt-1 font-medium line-clamp-1">
                {tagline}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="shrink-0">
          <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-white p-4 flex items-center justify-center border-b border-slate-200">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />

            {/* Top Right Corner Accent */}
            <img
              src="/images/accents/card-corner-accent.png"
              alt=""
              className="absolute top-0 right-0 w-24 sm:w-28 h-auto object-contain object-right-top pointer-events-none select-none z-10 drop-shadow-sm opacity-80"
              aria-hidden="true"
            />
          </div>

          {/* Title & Icon Banner (Matches Poultry Dark Navy Header) */}
          <div className="bg-[#07162A] px-5 py-4 border-b border-[#102A43]">
            {(badge || Icon) && (
              <div className="flex items-center gap-2 mb-1">
                {Icon && <Icon className="w-4 h-4 text-amber-400" />}
                {badge && (
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-amber-400">
                    {badge}
                  </span>
                )}
              </div>
            )}
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight group-hover:text-amber-400 transition-colors">
              {title}
            </h3>
          </div>
        </div>
      )}

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow space-y-6">
        {imageFit === 'contain' && tagline && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {tagline}
          </p>
        )}

        {/* Core Features List */}
        <div className={`space-y-2 ${imageFit === 'contain' && tagline ? 'pt-2 border-t border-slate-200/80' : ''}`}>
          <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
            {featuresLabel}
          </span>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Button */}
        <Link
          to={path}
          className="inline-flex items-center justify-between w-full px-4 py-3 rounded-[2px] bg-[#0B192C] text-white hover:bg-amber-400 hover:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-150 shadow-xs group-hover:shadow-md cursor-pointer"
        >
          <span>{ctaLabel || `Explore ${title}`}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

