import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShieldCheck, ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import { Badge, Button } from '../atoms';

export interface FullHeroSlide {
  id: string;
  tag: string;
  title: string;
  highlightText: string;
  description: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  imageUrl: string;
  badgeText: string;
}

export const FULL_HERO_SLIDES: FullHeroSlide[] = [
  {
    id: 'slide-1',
    tag: 'Integrated Agribusiness Solutions',
    title: 'Modern Engineering Designs for',
    highlightText: 'Turnkey Agribusiness Facilities',
    description: 'Clarkbase Construction Dev\'t Inc. (CCDI) delivers end-to-end solutions from poultry and hatchery facilities to feedmills and clean solar energy integration.',
    ctaPrimary: 'Explore Solutions',
    ctaPrimaryHref: '/solutions',
    ctaSecondary: 'Request Consultation',
    ctaSecondaryHref: '#contact',
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=2000&q=80',
    badgeText: 'Established 2019 • Philippines'
  },
  {
    id: 'slide-2',
    tag: 'Climate-Controlled Housing',
    title: 'Turnkey Poultry Facilities for',
    highlightText: 'Broiler, Breeder & Layer Operations',
    description: 'High-performance climate-controlled housing engineered for biosecurity, animal welfare, and optimal feed conversion efficiency.',
    ctaPrimary: 'View Poultry Solutions',
    ctaPrimaryHref: '/solutions?bu=Poultry%20Farm%20Equipment',
    ctaSecondary: 'Request Proposal',
    ctaSecondaryHref: '#contact',
    imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2000&q=80',
    badgeText: 'Bio-Secure Construction'
  },
  {
    id: 'slide-3',
    tag: 'Industrial Feedmill Systems',
    title: 'Automated Processing &',
    highlightText: 'Bulk Handling Infrastructure',
    description: 'Computerized batching, grinding, mixing, and hygienic bulk handling plants built for maximum operational uptime and longevity.',
    ctaPrimary: 'View Feedmill Systems',
    ctaPrimaryHref: '/solutions?bu=Feedmill',
    ctaSecondary: 'Our Strengths',
    ctaSecondaryHref: '#about',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=2000&q=80',
    badgeText: 'Turnkey Facility Engineering'
  },
  {
    id: 'slide-4',
    tag: 'Clean Energy Infrastructure',
    title: 'Industrial Solar PV Integration for',
    highlightText: 'Sustainable Cost Efficiency',
    description: 'Industrial rooftop and ground-mounted solar PV systems designed to slash electricity costs and ensure uninterrupted farm operations.',
    ctaPrimary: 'Solar PV Solutions',
    ctaPrimaryHref: '/solutions?bu=Solar%20Systems',
    ctaSecondary: 'Contact Us',
    ctaSecondaryHref: '#contact',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=2000&q=80',
    badgeText: 'Clean Solar Microgrids'
  }
];

export const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const navigate = useNavigate();

  const SLIDE_DURATION = 5500; // 5.5 seconds per slide
  const MIN_SWIPE_DISTANCE = 50;

  useEffect(() => {
    if (isPaused) return;

    setProgress(0);
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(currentProgress);
    }, 50);

    const slideTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % FULL_HERO_SLIDES.length);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimer);
    };
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % FULL_HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + FULL_HERO_SLIDES.length) % FULL_HERO_SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const handleCtaClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href.startsWith('/')) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('#')) {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const offset = window.innerWidth < 640 ? 70 : 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const offsetPosition = elementRect - bodyRect - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      } else {
        navigate('/' + href);
      }
    }
  };

  const slide = FULL_HERO_SLIDES[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[560px] sm:min-h-[620px] h-auto sm:h-[75vh] lg:h-[780px] overflow-hidden bg-slate-950 text-white select-none"
    >
      {/* Slide Auto-Progress Bar (Top) */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800/80 z-30 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-industrial_blue-500 via-agro_green-500 to-construction_gold-500"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.05 }}
        />
      </div>

      {/* Background Image Carousel with Framer Motion crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Deep Industrial Navy Scrim overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-slate-950/50" />

          {/* Decorative Glowing Orbs */}
          <div className="absolute top-1/4 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-industrial_blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/3 w-64 sm:w-80 h-64 sm:h-80 bg-agro_green-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-56 sm:w-72 h-56 sm:h-72 bg-construction_gold-500/15 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Content Container over 100% Full Width Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center py-12 sm:py-16 pb-20 sm:pb-24">
        <div className="max-w-3xl space-y-4 sm:space-y-6 pt-4 sm:pt-6">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Top Tag & Certification Badge */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Badge
                  variant="sectionTag"
                  icon={<ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-300" />}
                  className="!bg-slate-900/80 !text-blue-200 !border-blue-500/40 backdrop-blur-md shadow-lg text-xs"
                >
                  {slide.tag}
                </Badge>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold backdrop-blur-md shadow-sm">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{slide.badgeText}</span>
                </div>
              </div>

              {/* Headline Title */}
              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-heading drop-shadow-md">
                {slide.title}{' '}
                <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-200 bg-clip-text text-transparent underline decoration-amber-400/60 underline-offset-4 sm:underline-offset-8 decoration-2 sm:decoration-4">
                  {slide.highlightText}
                </span>
              </h1>

              {/* Subtitle Description */}
              <p className="text-sm sm:text-lg lg:text-xl text-slate-200/95 max-w-2xl font-normal leading-relaxed drop-shadow">
                {slide.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-3">
                <Button
                  variant="primary"
                  size="md"
                  href={slide.ctaPrimaryHref}
                  onClick={(e) => handleCtaClick(e, slide.ctaPrimaryHref)}
                  icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />}
                  className="group shadow-xl shadow-amber-600/30 !bg-amber-600 hover:!bg-amber-700 sm:!w-auto justify-center font-bold"
                >
                  {slide.ctaPrimary}
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  href={slide.ctaSecondaryHref}
                  onClick={(e) => handleCtaClick(e, slide.ctaSecondaryHref)}
                  className="!bg-slate-900/70 hover:!bg-slate-900/90 !text-white !border-slate-700/80 backdrop-blur-md shadow-lg hover:!border-amber-400/60 sm:!w-auto justify-center"
                >
                  {slide.ctaSecondary}
                </Button>
              </div>

              {/* Feature Highlights Bar */}
              <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Turnkey Facility Delivery</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Biosecure Engineering</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>ISO 9001 Certified</span>
                </span>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* Floating Left & Right Navigation Chevrons (Desktop & Tablet) */}
      <button
        onClick={handlePrev}
        className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/70 hover:bg-amber-600 text-white backdrop-blur-md border border-slate-700/80 hover:border-amber-400 shadow-xl items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/70 hover:bg-amber-600 text-white backdrop-blur-md border border-slate-700/80 hover:border-amber-400 shadow-xl items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Floating Bar: Centered Interactive Slide Controls */}
      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-20 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          
          {/* Centered Desktop Slide Title Tabs */}
          <div className="pointer-events-auto hidden sm:flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-full border border-slate-800/90 shadow-xl">
            {FULL_HERO_SLIDES.map((s, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setProgress(0);
                    setCurrentIndex(idx);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-industrial_blue-700 text-white shadow-md shadow-industrial_blue-700/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-amber-400 animate-pulse' : 'bg-slate-500'}`} />
                  <span>0{idx + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Centered Mobile Dot Indicators & Swipe Hint */}
          <div className="pointer-events-auto sm:hidden flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800/90 shadow-lg">
            <button
              onClick={handlePrev}
              className="text-slate-400 hover:text-white p-1"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {FULL_HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setProgress(0);
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-6 bg-amber-400' : 'w-2 bg-slate-600'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}

            <button
              onClick={handleNext}
              className="text-slate-400 hover:text-white p-1"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
