import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, PhoneCall } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface SolutionHeroBannerProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: React.ReactNode;
  backgroundImage: string;
  imageAlt?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  children?: React.ReactNode;
}

export const SolutionHeroBanner: React.FC<SolutionHeroBannerProps> = ({
  breadcrumbs,
  title,
  subtitle,
  backgroundImage,
  imageAlt = 'CCDI Solution Infrastructure',
  ctaText,
  onCtaClick,
  children,
}) => {
  return (
    <section className="relative bg-[#07162A] text-white pt-10 pb-20 sm:pb-24 border-b border-[#102A43] overflow-hidden">
      {/* Background Hero Image with Dual-Zone Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={backgroundImage}
          alt={imageAlt}
          className="w-full h-full object-cover object-center opacity-85 sm:opacity-95 lg:opacity-100 brightness-[1.02] contrast-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162A] via-[#07162A]/90 to-[#07162A]/60 md:from-[#07162A] md:from-20% md:via-[#07162A]/95 md:via-48% md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07162A]/85 via-transparent to-transparent" />
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-6">
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
          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-white leading-[1.2]">
            {title}
          </h1>

          {subtitle && (
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-3xl">
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
    </section>
  );
};

