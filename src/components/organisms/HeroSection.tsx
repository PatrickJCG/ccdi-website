import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { BusinessUnit } from '../../data/mockProducts';
import { DarkAccentGraphic, SectionAccents } from '../atoms/ArchitecturalAccents';

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
  imagePosition?: string;
  videoUrl?: string;
}

const CAROUSEL_SLIDES: HeroCarouselSlide[] = [
  {
    id: 'slide-overview',
    tabLabel: 'OVERVIEW',
    kicker: 'CLARKBASE CONSTRUCTION DEV\'T INC.',
    titleWhite: 'Integrated Solutions for',
    titleGold: 'Agribusiness Industry',
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
    kicker: 'CCDI / POULTRY SOLUTIONS',
    titleWhite: 'Poultry Housing and',
    titleGold: 'Climate Control Systems',
    subheadline:
      'Turnkey housing and equipment for broilers, breeders, and commercial layers, with climate control, ventilation, feeding, and drinking systems to support reliable farm operations.',
    ctaPrimary: {
      label: 'Explore Poultry Solutions →',
      href: '/solutions/poultry',
    },
    ctaSecondary: {
      label: 'Request Consultation',
      href: '#contact',
    },
    imageUrl: '/images/broiler/broiler-hero.jpg',
  },
  {
    id: 'slide-hatchery',
    tabLabel: 'HATCHERY',
    kicker: 'CCDI / HATCHERY SOLUTIONS',
    titleWhite: 'Integrated Hatchery Systems and',
    titleGold: 'Incubation Solutions',
    subheadline:
      'Integrated hatchery systems combine incubation equipment, egg handling, airflow control, and supporting systems for coordinated hatchery operations.',
    ctaPrimary: {
      label: 'Explore Hatchery Systems →',
      href: '/solutions/hatchery',
    },
    ctaSecondary: {
      label: 'Request Consultation',
      href: '#contact',
    },
    imageUrl: '/images/hatchery/hatchery-hero.jpg',
  },
  {
    id: 'slide-feedmill',
    tabLabel: 'FEEDMILL',
    kicker: 'CCDI / FEEDMILL SOLUTIONS',
    titleWhite: 'Feedmill Systems and',
    titleGold: 'Grain Storage',
    subheadline:
      'Integrated feedmill systems from raw material receiving and cleaning to grinding, mixing, pelleting, packing, and finished feed storage.',
    ctaPrimary: {
      label: 'Explore Feedmill Solutions →',
      href: '/solutions/feedmill',
    },
    ctaSecondary: {
      label: 'Request Consultation',
      href: '#contact',
    },
    imageUrl: '/images/capabilities/feedmill-facility.jpg',
  },
  {
    id: 'slide-solar',
    tabLabel: 'SOLAR POWER SYSTEMS',
    kicker: 'CCDI / SOLAR ENERGY SOLUTIONS',
    titleWhite: 'Solar Power and',
    titleGold: 'Storage',
    subheadline:
      'Solar power systems for residential, agricultural, commercial, and industrial properties, with rooftop or ground-mounted panels, energy storage, and backup options.',
    ctaPrimary: {
      label: 'Explore Solar Solutions →',
      href: '/solutions/solar',
    },
    ctaSecondary: {
      label: 'Request Consultation',
      href: '#contact',
    },
    imageUrl: '/images/news/finished-ycp-farm-solar-project/01-solar-array-front-poultry-houses.webp',
  },
  {
    id: 'slide-updates',
    tabLabel: 'UPDATES',
    kicker: 'CCDI / INDUSTRY EXHIBITIONS & UPDATES',
    titleWhite: 'CCDI Showcases Solutions at',
    titleGold: 'AgriLink 2026 World Trade Center',
    subheadline:
      'Visit Clarkbase Construction Development Inc. (CCDI) and Tai Chi at AgriLink, FoodLink & AquaLink 2026 this October 8–10 at World Trade Center Manila.',
    ctaPrimary: {
      label: 'Explore Event Highlights →',
      href: '/news',
    },
    ctaSecondary: {
      label: 'Browse All News & Insights',
      href: '/news',
    },
    imageUrl: '/images/hero/agrilink-updates.jpg',
  },
  {
    id: 'slide-careers',
    tabLabel: 'CAREERS',
    kicker: 'CCDI / CAREERS AND TEAM',
    titleWhite: 'Explore Careers at',
    titleGold: 'CCDI',
    subheadline:
      'Join the team working on poultry, feedmill, and solar projects across the Philippines.',
    ctaPrimary: {
      label: 'VIEW OPEN ROLES',
      href: '/careers',
    },
    ctaSecondary: {
      label: 'Learn About Our Team & Culture',
      href: '/careers#overview',
    },
    imageUrl: '/images/hero/careers-hero-tab.webp',
    imagePosition: 'object-[center_35%]',
  },
];

interface CapabilitySlide {
  label: string;
  imageUrl: string;
  href?: string;
}

interface CapabilityCardData {
  code: string;
  label: string;
  title: string;
  spec: string;
  bu: BusinessUnit;
  href: string;
  description: string;
  slides: CapabilitySlide[];
}

const CAPABILITIES: CapabilityCardData[] = [
  {
    code: '01',
    label: 'POULTRY',
    title: 'Poultry Solutions',
    spec: 'Bio-Secure Climate Housing',
    bu: 'Poultry Farm Equipment',
    href: '/solutions/poultry',
    description:
      'Climate-controlled housing and automated feeding, drinking, and ventilation systems for broilers, breeders, and layers.',
    slides: [
      {
        label: 'Broiler',
        imageUrl: '/images/broiler/feeding-drinking-system.jpg',
        href: '/solutions/poultry/broiler',
      },
      {
        label: 'Broiler Breeder',
        imageUrl: '/images/breeder/american-type-interior.jpg',
        href: '/solutions/poultry/broiler-breeder',
      },
      {
        label: 'Layer',
        imageUrl: '/images/layer/h-frame-layer.jpg',
        href: '/solutions/poultry/layer',
      },
    ],
  },
  {
    code: '02',
    label: 'HATCHERY',
    title: 'Hatchery Solutions',
    spec: 'Integrated Hatchery Solution',
    bu: 'Hatchery',
    href: '/solutions/hatchery',
    description:
      'Coordinated incubation, egg handling, HVAC, and digital monitoring from egg receiving to chick dispatch.',
    slides: [
      {
        label: 'Incubation',
        imageUrl: '/images/news/bulacan-single-stage-setter.png',
        href: '/solutions/hatchery#incubation',
      },
      {
        label: 'Egg Handling & AI Candling',
        imageUrl: '/images/hatchery/egg-handling-hero.jpg',
        href: '/solutions/hatchery#egg-handling',
      },
      {
        label: 'Chick Handling',
        imageUrl: '/images/news/bulacan-hatcher.jpg',
        href: '/solutions/hatchery#chick-handling',
      },
      {
        label: 'Hatchery HVAC',
        imageUrl: '/images/hatchery/Embryo Heat Recovery System.jpg',
        href: '/solutions/hatchery#hvac',
      },
      {
        label: 'Intelligent Management',
        imageUrl: '/images/capabilities/hatchery-facility.jpg',
        href: '/solutions/hatchery#management',
      },
      {
        label: 'Waste Disposal',
        imageUrl: '/images/hatchery/Water Disposal System.png',
        href: '/solutions/hatchery#waste-disposal',
      },
    ],
  },
  {
    code: '03',
    label: 'FEEDMILL',
    title: 'Feedmill Solutions',
    spec: 'Automated Micro-Batching & Silos',
    bu: 'Feedmill',
    href: '/solutions/feedmill',
    description:
      'Turnkey feed plants with computerized micro-dosing, pelleting towers, corrugated silos, and pneumatic conveying.',
    slides: [
      {
        label: 'Computerized Dosing Towers',
        imageUrl: '/images/capabilities/feedmill-facility.jpg',
      },
      {
        label: 'Heavy Corrugated Silos',
        imageUrl: '/images/capabilities/feedmill-facility.jpg',
      },
      {
        label: 'Pneumatic Grain Conveying',
        imageUrl: '/images/feedmill/silo-storage-systems.png',
      },
    ],
  },
  {
    code: '04',
    label: 'SOLAR POWER SYSTEMS',
    title: 'Solar Solutions',
    spec: 'Industrial Rooftop Microgrid',
    bu: 'Solar Systems',
    href: '/solutions/solar',
    description:
      'Commercial rooftop and ground-mounted solar microgrids with battery storage engineered to cut energy costs.',
    slides: [
      {
        label: 'High-Wind Rooftop Arrays',
        imageUrl: '/images/hero/solar-hero.jpg',
      },
      {
        label: 'Generator Sync Inverters',
        imageUrl: '/images/hero/solar-power-systems-hero.jpg',
      },
      {
        label: 'Up to 35% OPEX Reduction',
        imageUrl: '/images/capabilities/solar-facility.jpg',
      },
    ],
  },
];

const CapabilityCard: React.FC<{ cap: CapabilityCardData }> = ({ cap }) => {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slides = cap.slides;
  const currentSlide = slides[slideIndex] || slides[0];

  // Auto-advance carousel every 5s when not hovered
  useEffect(() => {
    if (isHovered || slides.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, slides.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handleCardClick = () => {
    navigate(cap.href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="group relative bg-[#08192E] border border-[#173558] hover:border-[#F3A812]/80 rounded-[2px] overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between text-left hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40"
    >
      {/* Image Carousel Container with Controlled Contrast Scrim */}
      <div className="relative w-full h-44 sm:h-48 lg:h-44 xl:h-48 overflow-hidden bg-[#040D18]">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide.imageUrl}
            src={currentSlide.imageUrl}
            alt={currentSlide.label}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.92] contrast-[1.08] group-hover:scale-105 transition-transform duration-500"
          />
        </AnimatePresence>

        {/* Dual Gradient Scrim for Legibility & Polish */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08192E] via-[#08192E]/25 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent pointer-events-none" />

        {/* Carousel Slide Identifier Badge (Smaller, subtle dark slate) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 z-20 pointer-events-none flex">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentSlide.label}
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 2 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center max-w-full px-1.5 py-0.5 rounded-[2px] bg-[#040D18]/75 border border-white/15 text-slate-200/90 font-mono text-[9px] font-medium tracking-wider uppercase backdrop-blur-sm truncate"
            >
              {currentSlide.label}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Carousel Arrow Controls (Visible on hover) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label={`Previous ${cap.title} image`}
          className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-slate-950/75 hover:bg-[#F3A812] text-white hover:text-slate-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 border border-white/20 hover:border-[#F3A812] shadow-md cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label={`Next ${cap.title} image`}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-slate-950/75 hover:bg-[#F3A812] text-white hover:text-slate-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 border border-white/20 hover:border-[#F3A812] shadow-md cursor-pointer"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Slide Indicator Dots on Image */}
        <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1 bg-[#040D18]/55 px-1.5 py-1 rounded-[2px] border border-white/10 backdrop-blur-sm">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSlideIndex(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1 rounded-[1px] transition-all duration-300 cursor-pointer ${i === slideIndex
                ? 'w-3.5 bg-[#F3A812]'
                : 'w-1 bg-white/40 hover:bg-white/75'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Card Body */}
      <div className="relative p-5 sm:p-6 lg:p-5 xl:p-6 flex flex-col flex-grow justify-between gap-5 bg-[#08192E] overflow-hidden">
        <DarkAccentGraphic className="absolute -right-3 top-2 w-24 sm:w-28 h-auto object-contain object-right opacity-[0.12] z-0" />

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-sans text-xl sm:text-[21px] lg:text-lg xl:text-[21px] font-extrabold text-white leading-snug tracking-tight group-hover:text-[#F3A812] transition-colors">
              {cap.title}
            </h3>
            {/* Subordinate CCDI Crest Badge */}
            <img
              src="/images/branding/ccdi-logo.svg"
              alt=""
              aria-hidden="true"
              className="w-6 h-6 sm:w-7 sm:h-7 object-contain shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity select-none pointer-events-none"
            />
          </div>

          <p className="text-[13px] sm:text-sm text-slate-300/90 leading-relaxed font-normal line-clamp-3">
            {cap.description}
          </p>
        </div>

        {/* Direct Catalog Action */}
        <div className="relative z-10 mt-auto pt-4 border-t border-[#153152] flex items-center justify-between font-mono text-[11px] tracking-wider text-[#F3A812] font-bold">
          <span>EXPLORE PRODUCTS</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </div>
  );
};

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

  // prevSlide available for carousel controls if needed
  const _prevSlide = useCallback(() => {
    setProgress(0);
    setCurrentSlideIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  }, []);
  void _prevSlide;

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

      {/* ── ZONE A: UPPER HERO STAGE ── */}
      <div
        className="relative overflow-hidden min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] xl:min-h-[680px] flex flex-col"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Visual Layer Strictly Scoped to Upper Hero */}
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
              {activeSlide.videoUrl ? (
                <video
                  key={activeSlide.videoUrl}
                  src={activeSlide.videoUrl}
                  poster={activeSlide.imageUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover object-center brightness-[0.88] contrast-[1.06]"
                />
              ) : (
                <img
                  src={activeSlide.imageUrl}
                  alt={activeSlide.titleWhite}
                  className={`w-full h-full object-cover ${activeSlide.imagePosition ?? 'object-center'} brightness-[0.92] contrast-[1.06]`}
                />
              )}

              {/* Mobile/Tablet Extra Readability Tint */}
              <div className="absolute inset-0 bg-[#040D18]/30 lg:hidden pointer-events-none" />

              {/* Balanced Contrast Scrims for Readability & Background Visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#040D18]/85 via-[#061529]/55 via-50% to-[#040D18]/15 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040D18] via-[#040D18]/25 via-25% to-transparent pointer-events-none" />

              {/* Subtle Architectural Diagonal Gold Slash Line */}
              <div
                className="hidden lg:block absolute right-[30%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F3A812]/40 via-[#F3A812]/15 to-transparent pointer-events-none -skew-x-[26deg]"
                aria-hidden="true"
              />
            </motion.div>
          </AnimatePresence>

          <SectionAccents
            topLeftClassName="hidden sm:block absolute -top-12 -left-16 sm:-top-8 sm:left-0 w-80 sm:w-96 lg:w-[500px] pointer-events-none select-none z-0"
            bottomRightClassName="hidden sm:block absolute -right-12 -bottom-16 md:right-0 md:bottom-0 w-80 sm:w-96 lg:w-[520px] xl:w-[620px] pointer-events-none select-none z-0"
            imageOpacityClassName="opacity-15"
          />

          {/* Dedicated Top Gradient Scrim Behind Tab Bar */}
          <div className="absolute inset-x-0 top-0 h-28 sm:h-32 bg-gradient-to-b from-[#040D18]/65 via-[#040D18]/20 to-transparent pointer-events-none" />

          {/* Dedicated Bottom Fade Strip into Solid Capabilities Band */}
          <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-[#040D18] to-transparent pointer-events-none" />
        </div>

        {/* Main Carousel Content */}
        <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-24 lg:pb-28 w-full text-left">
          {/* Single-Row Horizontally Scrollable Tab Bar on Mobile */}
          <div className="flex flex-nowrap items-center gap-5 sm:gap-6 md:gap-8 mb-8 sm:mb-10 lg:mb-12 border-b border-white/20 overflow-x-auto no-scrollbar">
            {CAROUSEL_SLIDES.map((slide, idx) => {
              const isActive = currentSlideIndex === idx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`relative shrink-0 whitespace-nowrap pt-1 pb-3.5 text-xs font-mono tracking-wider transition-all uppercase cursor-pointer ${isActive
                    ? 'text-[#F3A812] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
                    : 'text-white/85 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
                    }`}
                >
                  <span>{slide.tabLabel}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeHeroTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F3A812]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Dynamic Slide Body */}
          <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[340px] sm:min-h-[380px] lg:min-h-[420px]">
            <div className="lg:col-span-8 xl:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Clean Kicker / Eyebrow */}
                  <div className="font-mono text-xs uppercase tracking-widest text-[#F3A812] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] mb-3.5">
                    {activeSlide.kicker}
                  </div>

                  {/* Headline */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight text-white leading-[1.2] font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] mb-5">
                    <span>{activeSlide.titleWhite}</span>
                    {activeSlide.titleGold && (
                      <span className="block text-[#F3A812] mt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                        {activeSlide.titleGold}
                      </span>
                    )}
                  </h1>

                  {/* Core Description */}
                  <p className="text-sm sm:text-base text-slate-100 max-w-xl leading-relaxed font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] mb-8">
                    {activeSlide.subheadline}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3.5">
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
                      className="px-6 py-3.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold border border-white/35 text-white hover:border-[#F3A812] hover:text-[#F3A812] transition-colors bg-[#040D18]/80 backdrop-blur-sm shadow-md cursor-pointer"
                    >
                      {activeSlide.ctaSecondary.label}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side: Balanced Hero CCDI Crest Logo */}
            <div className="hidden lg:flex lg:col-span-4 xl:col-span-4 items-center justify-center xl:justify-end">
              <img
                src="/images/branding/ccdi-logo.svg"
                alt="CCDI"
                className="w-auto h-48 lg:h-56 xl:h-64 object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.9)] pointer-events-none select-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── ZONE B: CORE CAPABILITIES & PRODUCTS BAND (SOLID DARK-NAVY) ── */}
      <div className="relative z-10 bg-[#040D18] border-t border-[#102A43]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#F3A812] font-bold block mb-2">
                OUR SOLUTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Core Capabilities & Products
              </h2>
            </div>
            <p className="text-[11px] sm:text-xs font-mono text-slate-400 tracking-wider uppercase">
              SELECT A SOLUTION TO VIEW PRODUCTS & SPECS →
            </p>
          </div>

          {/* 4-Card Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
            {CAPABILITIES.map((cap) => (
              <CapabilityCard key={cap.code} cap={cap} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
