import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  LayoutGrid,
  DraftingCompass,
  HardHat,
  Wrench,
  ClipboardCheck,
  GraduationCap,
  Headphones,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export interface TurnkeyStep {
  stepNumber: number;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  highlights: string[];
}

export const TURNKEY_STEPS: TurnkeyStep[] = [
  {
    stepNumber: 1,
    title: 'Site Selection',
    description:
      'In choosing the right location, we guide you in identifying important factors such as biosecurity, topography, water availability, and long-term expansion and sustainability.',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
    icon: <MapPin className="w-5 h-5" />,
    highlights: ['Biosecurity', 'Topography', 'Water Availability', 'Sustainability'],
  },
  {
    stepNumber: 2,
    title: 'Strategic Layout Planning',
    description:
      'Our team develops a systematic design and arrangement of poultry farm components to enhance biosecurity, operational efficiency, bird comfort, environmental control, and future expansion.',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80',
    icon: <LayoutGrid className="w-5 h-5" />,
    highlights: ['Systematic Layout', 'Bird Comfort', 'Environmental Control', 'Operational Efficiency'],
  },
  {
    stepNumber: 3,
    title: 'Architectural Engineering Designs',
    description:
      'Our expertise lies in developing integrated designs that strategically combines architectural, structural, mechanical, installation, and utility designs tailored to the chosen poultry production system.',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
    icon: <DraftingCompass className="w-5 h-5" />,
    highlights: ['Structural & Mechanical', 'Utility Integration', 'Custom Tailored System'],
  },
  {
    stepNumber: 4,
    title: 'Civil Work and Prefab Installation',
    description:
      'We handle construction of foundations and structures using a combination of conventional civil works and factory-manufactured, pre-engineered components for speed, quality, and cost efficiency.',
    image:
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=600&q=80',
    icon: <HardHat className="w-5 h-5" />,
    highlights: ['Solid Foundations', 'Pre-engineered Components', 'Speed & Quality'],
  },
  {
    stepNumber: 5,
    title: 'Equipment Installation',
    description:
      'We precisely install equipment and commissioning of mechanical, electrical, and automated systems according to approved designs, manufacturer specifications, and industry standards to uphold biosecurity and animal welfare',
    image:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    icon: <Wrench className="w-5 h-5" />,
    highlights: ['Automated Systems', 'Animal Welfare Standards', 'Precision Assembly'],
  },
  {
    stepNumber: 6,
    title: 'Commissioning',
    description:
      'Our team follows a comprehensive testing and validation to ensure all equipment and systems are fully integrated, performing, compliant, and ready before full-scale operation begins.',
    image:
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    icon: <ClipboardCheck className="w-5 h-5" />,
    highlights: ['System Validation', 'Compliance Check', 'Full Integration Test'],
  },
  {
    stepNumber: 7,
    title: 'Personnel Training',
    description:
      'We provide training programs to equip your farm staff with the right knowledge, practical skills, procedures, and standards needed to efficiently and safely operate various production systems.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    icon: <GraduationCap className="w-5 h-5" />,
    highlights: ['Hands-on Guidance', 'Safety Protocols', 'Operational Mastery'],
  },
  {
    stepNumber: 8,
    title: 'After-Sales Service and Technical Support',
    description:
      'At CCDI, our commitment continuous as we offer an ongoing technical support, advisory services, performance monitoring, maintenance assistance, and spare parts support even after project completion.',
    image:
      'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=600&q=80',
    icon: <Headphones className="w-5 h-5" />,
    highlights: ['Performance Monitoring', 'Maintenance Assistance', 'Spare Parts Support'],
  },
];


export const TurnkeyApproach: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToStep = (index: number) => {
    setActiveStep(index);
    if (scrollContainerRef.current) {
      const cardWidth = 340; // width of each card + gap
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeStep - 1);
    scrollToStep(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(TURNKEY_STEPS.length - 1, activeStep + 1);
    scrollToStep(nextIdx);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = 340;
      const index = Math.round(scrollLeft / cardWidth);
      if (index >= 0 && index < TURNKEY_STEPS.length && index !== activeStep) {
        setActiveStep(index);
      }
    }
  };

  return (
    <div id="turnkey-approach" className="scroll-mt-28 space-y-8 max-w-7xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          <span>End-To-End Execution</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
          OUR END-TO-END TURNKEY APPROACH
        </h2>
        <div className="w-32 h-1.5 mx-auto bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full shadow-sm" />
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto pt-1">
          From initial site assessment to continuous post-project technical support, our 8-step methodology guarantees biosecure, efficient, and reliable farm construction.
        </p>
      </div>

      {/* Horizontal Stepper Progress Track */}
      <div className="hidden lg:block relative max-w-6xl mx-auto px-6 py-6">
        <div className="relative">
          {/* Background Track Line - Positioned BEHIND badges, centered vertically through the middle of the badges */}
          <div className="absolute top-[20px] left-6 right-6 h-[3px] bg-slate-800 -translate-y-1/2 z-0" />
          
          {/* Active Progress Fill Line */}
          <div
            className="absolute top-[20px] left-6 h-[3px] bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 -translate-y-1/2 z-0 transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"
            style={{
              width: `${(activeStep / (TURNKEY_STEPS.length - 1)) * 96}%`,
            }}
          />

          <div className="relative z-10 flex items-start justify-between">
            {TURNKEY_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const isCompleted = idx < activeStep;

              return (
                <button
                  key={step.stepNumber}
                  onClick={() => scrollToStep(idx)}
                  className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none flex-1 max-w-[110px]"
                >
                  {/* Number Container (Clean rounded-xl box, non-arrow) */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm font-heading transition-all duration-300 relative z-10 ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 scale-110 shadow-lg shadow-amber-400/40 ring-4 ring-amber-400/20'
                        : isCompleted
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-900 border border-slate-700 text-slate-400 group-hover:border-amber-400/60 group-hover:text-amber-300'
                    }`}
                  >
                    {step.stepNumber}
                  </div>

                  {/* Non-truncated Title Label */}
                  <span
                    className={`text-[11px] font-bold tracking-tight text-center leading-tight line-clamp-2 min-h-[28px] flex items-center justify-center transition-colors px-1 ${
                      isActive ? 'text-amber-300 font-extrabold' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Horizontal Carousel & Controls Header */}
      <div className="flex items-center justify-between max-w-7xl mx-auto px-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
          <span>Step {activeStep + 1} of {TURNKEY_STEPS.length}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">{TURNKEY_STEPS[activeStep].title}</span>
        </div>

        {/* Carousel Prev/Next Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={activeStep === 0}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400 hover:text-amber-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            aria-label="Previous step"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={activeStep === TURNKEY_STEPS.length - 1}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400 hover:text-amber-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            aria-label="Next step"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Cards Slider */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex items-stretch gap-5 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-amber-400/30 scrollbar-track-slate-900"
      >
        {TURNKEY_STEPS.map((step, idx) => {
          const isActive = activeStep === idx;

          return (
            <motion.div
              key={step.stepNumber}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              className={`w-[300px] sm:w-[340px] shrink-0 snap-start flex flex-col bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-lg ${
                isActive
                  ? 'border-amber-400 ring-2 ring-amber-400/30 shadow-amber-400/10'
                  : 'border-slate-200 hover:border-amber-400/50'
              }`}
            >
              {/* Card Image Header with Step Number Overlay */}
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden shrink-0">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Number Badge (Non-arrow rounded box badge) */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-400/40 text-amber-300 shadow-md">
                  <div className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs font-heading shadow-xs">
                    {step.stepNumber}
                  </div>
                  <span className="text-xs font-extrabold tracking-wider uppercase text-amber-300">Phase 0{step.stepNumber}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-ccdi-navy text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
                      {step.icon}
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 font-heading tracking-tight leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Highlights Tags */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                  {step.highlights.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200"
                    >
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
