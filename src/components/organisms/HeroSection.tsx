import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { BusinessUnit } from '../../data/mockProducts';

interface HeroCarouselSlide {
  id: string;
  tabLabel: string;
  kicker: string;
  titleWhite: string;
  titleGold?: string;
  subheadline: string;
  ctaPrimary: {
    label: string;
    href: string;
  };
  ctaSecondary: {
    label: string;
    href: string;
  };
  imageUrl: string;
  videoUrl?: string;
}

const CAROUSEL_SLIDES: HeroCarouselSlide[] = [
  {
    id: 'slide-overview',
    tabLabel: 'OVERVIEW',
    kicker: 'CLARKBASE CONSTRUCTION DEV\'T INC.',
    titleWhite: 'INTEGRATED SOLUTIONS FOR',
    titleGold: 'AGRIBUSINESS INDUSTRY',
    subheadline:
      'From turnkey bio-secure poultry and hatchery complexes to high-tonnage feedmills and clean solar energy integration, CCDI delivers end-to-end agro-industrial infrastructure built for superior operational yields.',
    ctaPrimary: {
      label: 'Explore Solutions Catalog →',
      href: '/solutions',
    },
    ctaSecondary: {
      label: 'Request Consultation',
      href: '#contact',
    },
    imageUrl: '/images/capabilities/poultry-facility.jpg',
    videoUrl: '/videos/ccdi-vid.mp4',
  },
  {
    id: 'slide-poultry',
    tabLabel: 'POULTRY',
    kicker: 'CCDI / POULTRY FARM EQUIPMENT & HOUSING',
    titleWhite: 'BIO-SECURE CLIMATE HOUSING &',
    titleGold: 'PRECISION POULTRY SYSTEMS',
    subheadline:
      'Turnkey climate-controlled broiler, breeder, and commercial layer facilities engineered for pathogen defense, high bird density, automated tunnel ventilation, and optimal Feed Conversion Ratios.',
    ctaPrimary: {
      label: 'Explore Poultry Solutions →',
      href: '/solutions/poultry',
    },
    ctaSecondary: {
      label: 'Request Consultation',
      href: '#contact',
    },
    imageUrl: '/images/capabilities/poultry-facility.jpg',
  },
  {
    id: 'slide-hatchery',
    tabLabel: 'HATCHERY',
    kicker: 'CCDI / HATCHERY CONSTRUCTION & INCUBATION',
    titleWhite: 'CLEANROOM HATCHERIES &',
    titleGold: 'SINGLE-STAGE INCUBATION',
    subheadline:
      'Sterile, thermally optimized incubation plants with zoned cleanroom airflow, automated egg transfer, high-capacity setters, and strict biosecurity containment.',
    ctaPrimary: {
      label: 'Explore Hatchery Systems →',
      href: '/solutions?bu=Hatchery',
    },
    ctaSecondary: {
      label: 'Request Consultation',
      href: '#contact',
    },
    imageUrl: '/images/capabilities/hatchery-facility.jpg',
  },
  {
    id: 'slide-feedmill',
    tabLabel: 'FEEDMILL',
    kicker: 'CCDI / FEEDMILL SYSTEMS & SILOS',
    titleWhite: 'AUTOMATED FEEDMILL PLANTS &',
    titleGold: 'BULK GRAIN SILO COMPLEXES',
    subheadline:
      'Industrial feed processing infrastructure engineered with computerized micro-dosing, high-throughput pelleting towers, heavy galvanized corrugated silos, and pneumatic conveying.',
    ctaPrimary: {
      label: 'Explore Feedmill Solutions →',
      href: '/solutions?bu=Feedmill',
    },
    ctaSecondary: {
      label: 'Request Consultation',
      href: '#contact',
    },
    imageUrl: '/images/capabilities/feedmill-facility.jpg',
  },
  {
    id: 'slide-solar',
    tabLabel: 'SOLAR PV',
    kicker: 'CCDI / SOLAR ENERGY INTEGRATION',
    titleWhite: 'COMMERCIAL SOLAR MICROGRIDS FOR',
    titleGold: 'AGRO-INDUSTRIAL ENTERPRISES',
    subheadline:
      'Heavy-duty rooftop and ground-mounted photovoltaic systems engineered to slash daytime electricity overhead, synchronized with generator backups for uninterrupted power.',
    ctaPrimary: {
      label: 'Explore Solar Solutions →',
      href: '/solutions?bu=Solar%20Systems',
    },
    ctaSecondary: {
      label: 'Request Consultation',
      href: '#contact',
    },
    imageUrl: '/images/capabilities/solar-facility.jpg',
  },
  {
    id: 'slide-updates',
    tabLabel: 'UPDATES',
    kicker: 'CCDI / COMMISSIONED PROJECTS & UPDATES',
    titleWhite: 'COMMISSIONED: 500K-CAPACITY',
    titleGold: 'BROILER COMPLEX IN CENTRAL LUZON',
    subheadline:
      'CCDI successfully hands over a 10-house climate-controlled poultry complex equipped with automated feeding, tunnel ventilation, and biosecure building envelopes—15 days ahead of schedule.',
    ctaPrimary: {
      label: 'Read Project Case Study →',
      href: '/news/news-1',
    },
    ctaSecondary: {
      label: 'Browse All News & Insights',
      href: '/news',
    },
    imageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'slide-careers',
    tabLabel: 'CAREERS',
    kicker: 'CCDI / CAREERS & ENGINEERING TEAM',
    titleWhite: 'SHAPE FUTURE-READY',
    titleGold: 'AGRO-INDUSTRIAL INFRASTRUCTURE',
    subheadline:
      'Join our multidisciplinary engineering team delivering high-performance poultry facilities, feedmills, and solar microgrids across the Philippines. We are actively hiring licensed engineers and project specialists.',
    ctaPrimary: {
      label: 'View Open Engineering Roles (4) →',
      href: '/careers',
    },
    ctaSecondary: {
      label: 'Learn About Our Team & Culture',
      href: '/careers#overview',
    },
    imageUrl: '/images/hero/careers-team.jpg',
  },
];

interface CapabilityCardData {
  code: string;
  label: string;
  spec: string;
  bu: BusinessUnit;
  imageUrl: string;
  keyFeatures: string[];
}

const CAPABILITIES: CapabilityCardData[] = [
  {
    code: '01',
    label: 'POULTRY',
    spec: 'Bio-Secure Climate Housing',
    bu: 'Poultry Farm Equipment',
    imageUrl: '/images/capabilities/poultry-facility.jpg',
    keyFeatures: ['Automated Tunnel Ventilation', 'Evaporative Cooling Pads', 'Automatic Feeding Lines'],
  },
  {
    code: '02',
    label: 'HATCHERY',
    spec: 'Cleanroom Single-Stage Incubation',
    bu: 'Hatchery',
    imageUrl: '/images/capabilities/hatchery-facility.jpg',
    keyFeatures: ['Zoned Biosecurity Airflow', 'Automated Egg Handling', 'Precision Microclimate Control'],
  },
  {
    code: '03',
    label: 'FEEDMILL',
    spec: 'Automated Micro-Batching & Silos',
    bu: 'Feedmill',
    imageUrl: '/images/capabilities/feedmill-facility.jpg',
    keyFeatures: ['Computerized Dosing Towers', 'Heavy Corrugated Silos', 'Pneumatic Grain Conveying'],
  },
  {
    code: '04',
    label: 'SOLAR PV',
    spec: 'Industrial Rooftop Microgrid',
    bu: 'Solar Systems',
    imageUrl: '/images/capabilities/solar-facility.jpg',
    keyFeatures: ['High-Wind Rooftop Arrays', 'Generator Sync Inverters', 'Up to 35% OPEX Reduction'],
  },
];

const SLIDE_DURATION = 6500;

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeSlide = CAROUSEL_SLIDES[currentSlideIndex];

  const nextSlide = useCallback(() => {
    setProgress(0);
    setCurrentSlideIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setProgress(0);
    setCurrentSlideIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setProgress(0);
    setCurrentSlideIndex(index);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    setProgress(0);
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(currentProgress);
    }, 40);

    const slideTimer = setTimeout(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimer);
    };
  }, [currentSlideIndex, isPaused, nextSlide]);

  const handleCta = useCallback((href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/' + href);
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [navigate]);

  return (
    <section
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full bg-[#040D18] text-white border-b border-[#102A43] overflow-hidden font-sans select-none"
    >
      {/* ── 1. CAROUSEL AUTO-PROGRESS BAR ── */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#102A43] z-30 overflow-hidden">
        <motion.div
          className="h-full bg-[#F3A812]"
          style={{ width: `${progress}%` }}
          transition={{ ease: 'linear', duration: 0.04 }}
        />
      </div>

      {/* ── 2. BACKGROUND VISUAL LAYER WITH HIGH-CONTRAST DUAL-ZONE SCRIM ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full"
          >
            {/* Background facility photography or video with high visual opacity & clarity */}
            {activeSlide.videoUrl ? (
              <video
                key={activeSlide.videoUrl}
                src={activeSlide.videoUrl}
                poster={activeSlide.imageUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover object-center brightness-[0.85] contrast-[1.08]"
              />
            ) : (
              <img
                src={activeSlide.imageUrl}
                alt={activeSlide.titleWhite}
                className="w-full h-full object-cover object-center brightness-[1.0] contrast-[1.05]"
              />
            )}

            {/* LIGHTER PROTECTIVE SCRIM: Preserves text legibility on left while keeping facility photography clearly visible across the entire frame */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#040D18]/80 via-[#07162A]/50 via-50% to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040D18]/70 via-transparent to-[#040D18]/30" />

            {/* Architectural diagonal gold slash line */}
            <div
              className="hidden lg:block absolute right-[30%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F3A812]/70 via-[#F3A812]/30 to-transparent pointer-events-none -skew-x-[26deg]"
              aria-hidden="true"
            />
          </motion.div>
        </AnimatePresence>

        {/* Architectural Accent 2 - Top Left Anchored (Fades in downwards on view) */}
        <motion.div
          initial={{ opacity: 0, y: -45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="hidden sm:block absolute -top-12 -left-16 sm:-top-8 sm:left-0 w-80 sm:w-96 lg:w-[500px] pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <img
            src="/images/accents/accent2.png"
            alt=""
            className="w-full h-auto object-contain opacity-30"
          />
        </motion.div>

        {/* ── Architectural Louver / Chevron Accent Graphic (Fades in upwards on view) ── */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="hidden sm:block absolute -right-12 -bottom-16 md:right-0 md:bottom-0 w-80 sm:w-96 lg:w-[520px] xl:w-[620px] pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <img
            src="/images/accents/dark-accent-graphic.png"
            alt=""
            className="w-full h-auto object-contain opacity-30"
          />
        </motion.div>
      </div>

      {/* ── 3. MAIN CAROUSEL CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-9 sm:pt-14 pb-16 sm:pb-20 w-full text-left">
        
        {/* Minimalist Tab Navigation Bar (Transparent, Non-Distracting) */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-5 md:gap-7 mb-7 sm:mb-9 border-b border-white/15 pb-3">
          {CAROUSEL_SLIDES.map((slide, idx) => {
            const isActive = currentSlideIndex === idx;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`relative py-1 text-xs font-mono tracking-wider transition-all uppercase cursor-pointer ${
                  isActive
                    ? 'text-[#F3A812] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
                    : 'text-white/60 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
                }`}
              >
                <span>{slide.tabLabel}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeHeroTabIndicator"
                    className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-[#F3A812]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Slide Body with Drop-Shadows and High Contrast */}
        <div className="max-w-4xl min-h-[286px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Clean Kicker / Eyebrow (High contrast gold with subtle drop shadow) */}
              <div className="font-mono text-xs uppercase tracking-widest text-[#F3A812] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] mb-3.5">
                {activeSlide.kicker}
              </div>

              {/* Refined Headline with Balanced Proportions & Line-Height */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black tracking-tight text-white leading-[1.25] font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] mb-5 sm:mb-6">
                <span>{activeSlide.titleWhite}</span>
                {activeSlide.titleGold && (
                  <span className="block text-[#F3A812] mt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                    {activeSlide.titleGold}
                  </span>
                )}
              </h1>

              {/* Core Description with Clean High-Contrast Text */}
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-[1.75] font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] mb-7 sm:mb-8">
                {activeSlide.subheadline}
              </p>

              {/* High-Contrast Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1.5">
                <button
                  type="button"
                  onClick={() => handleCta(activeSlide.ctaPrimary.href)}
                  className="px-6 py-3.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-extrabold bg-[#F3A812] text-slate-950 hover:bg-amber-300 transition-colors shadow-lg hover:shadow-amber-500/20 cursor-pointer"
                >
                  {activeSlide.ctaPrimary.label}
                </button>

                <button
                  type="button"
                  onClick={() => handleCta(activeSlide.ctaSecondary.href)}
                  className="px-6 py-3.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold border-2 border-[#1E3E66] text-white hover:border-[#F3A812] transition-colors bg-[#07162A]/90 shadow-md cursor-pointer"
                >
                  {activeSlide.ctaSecondary.label}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Prev/Next & Slide Counter Controls */}
        <div className="pt-7 sm:pt-9 flex items-center justify-between border-t border-[#102A43] mt-9 sm:mt-11">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-10 h-10 rounded-[2px] bg-[#07162A] border border-[#1E3E66] hover:border-[#F3A812] text-slate-200 hover:text-[#F3A812] flex items-center justify-center transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-10 h-10 rounded-[2px] bg-[#07162A] border border-[#1E3E66] hover:border-[#F3A812] text-slate-200 hover:text-[#F3A812] flex items-center justify-center transition-colors shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs text-slate-300 ml-2 font-medium">
              SLIDE <strong className="text-[#F3A812] font-bold">0{currentSlideIndex + 1}</strong> / 0{CAROUSEL_SLIDES.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#07162A]/80 px-2.5 py-1.5 rounded-[2px] border border-[#102A43]">
            {CAROUSEL_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-[1px] transition-all duration-300 ${
                  currentSlideIndex === i ? 'w-8 bg-[#F3A812]' : 'w-2.5 bg-slate-600 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── 4. CORE CAPABILITIES (WITH HIGH-CONTRAST BROCHURE STYLING) ── */}
        <div className="pt-11 mt-9 border-t border-[#102A43]">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-7">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#F3A812] font-bold block mb-1">
                ENGINEERING PILLARS
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white drop-shadow-sm">
                Core Capabilities & Product Solutions
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-300 font-medium">
              SELECT ANY PILLAR TO VIEW PRODUCTS & SPECS →
            </p>
          </div>

          {/* 4-Item Grid with High-Contrast Typography & Visual Clarity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAPABILITIES.map((cap) => {
              const isPoultry = cap.bu === 'Poultry Farm Equipment';
              const poultrySubLinks = [
                { label: 'Broiler', href: '/solutions/poultry/broiler' },
                { label: 'Broiler Breeder', href: '/solutions/poultry/broiler-breeder' },
                { label: 'Layer', href: '/solutions/poultry/layer' },
              ];

              return (
                <div
                  key={cap.label}
                  onClick={() => {
                    navigate(isPoultry ? '/solutions/poultry' : `/solutions?bu=${encodeURIComponent(cap.bu)}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group relative bg-[#07162A] border border-[#1E3E66] hover:border-[#F3A812] rounded-[2px] overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between text-left hover:shadow-xl hover:shadow-amber-500/15"
                >
                  {/* Image Container with Controlled Contrast Scrim */}
                  <div className="relative w-full h-44 overflow-hidden bg-[#040D18]">
                    <img
                      src={cap.imageUrl}
                      alt={cap.label}
                      loading="lazy"
                      className="w-full h-full object-cover object-center brightness-[0.92] contrast-[1.08] group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07162A] via-[#07162A]/40 to-transparent" />

                    {/* Architectural Top-Right Corner Accent */}
                    <img
                      src="/images/accents/card-corner-accent.png"
                      alt=""
                      className="absolute top-0 right-0 w-28 sm:w-32 h-auto object-contain object-right-top pointer-events-none select-none z-10 drop-shadow-sm"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex flex-col flex-grow justify-between space-y-3 bg-[#07162A]">
                    <div>
                      <h3 className="font-sans text-base font-extrabold text-white tracking-tight group-hover:text-[#F3A812] transition-colors">
                        {cap.bu}
                      </h3>
                    </div>

                    {/* Micro Deliverables (Non-Poultry) */}
                    {!isPoultry && (
                      <div className="space-y-1 pt-2 border-t border-[#102A43] text-xs font-mono text-slate-300 font-medium">
                        {cap.keyFeatures.map((feat) => (
                          <div key={feat} className="truncate">
                            • {feat}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Poultry Sub-Category Links */}
                    {isPoultry && (
                      <div
                        className="pt-2 border-t border-[#102A43] flex flex-col gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {poultrySubLinks.map((sub) => (
                          <button
                            key={sub.href}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(sub.href);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 hover:text-amber-400 transition-colors text-left cursor-pointer py-0.5"
                          >
                            <span className="text-[10px] text-amber-400">▶</span>
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Direct Catalog Action */}
                    <div className="pt-2 flex items-center justify-between font-mono text-xs text-[#F3A812] font-bold group-hover:translate-x-0.5 transition-transform">
                      <span>EXPLORE PRODUCTS</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
