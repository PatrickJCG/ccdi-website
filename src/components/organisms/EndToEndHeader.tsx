import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

import { TURNKEY_STEPS } from './TurnkeyApproach';

export interface EndToEndHeaderProps {
  title?: string;
  subtitle?: string;
  tag?: string;
  onStepSelect?: (stepNumber: number) => void;
  selectedStepNumber?: number;
  lightMode?: boolean;
}

export const EndToEndHeader: React.FC<EndToEndHeaderProps> = ({
  title = 'OUR END-TO-END TURNKEY APPROACH',
  subtitle = 'Click on any phase below to expand detailed execution specifications and view matching catalog solutions.',
  tag = 'End-To-End Execution',
  onStepSelect,
  selectedStepNumber,
  lightMode = false,
}) => {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(
    selectedStepNumber ? selectedStepNumber - 1 : 0
  );
  // Initially hide details panel by default as requested by user
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const currentStep = TURNKEY_STEPS[activeStepIdx] || TURNKEY_STEPS[0];

  const handleStepClick = (idx: number) => {
    if (activeStepIdx === idx) {
      // Toggle expansion if clicking active step
      setIsExpanded((prev) => !prev);
    } else {
      setActiveStepIdx(idx);
      setIsExpanded(true);
    }
    onStepSelect?.(TURNKEY_STEPS[idx].stepNumber);
  };

  return (
    <div className="w-full space-y-4 sm:space-y-5">
      {/* Header Titles — Compact sizing when in light/embedded mode */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md ${
          lightMode 
            ? 'bg-ccdi-navy/10 border border-ccdi-navy/20 text-ccdi-navy' 
            : 'bg-amber-400/15 border border-amber-400/30 text-amber-300'
        }`}>
          <span>{tag}</span>
        </div>

        <h2 className={`font-extrabold font-heading tracking-tight ${
          lightMode ? 'text-xl sm:text-2xl text-slate-800' : 'text-2xl sm:text-4xl text-white'
        }`}>
          {title}
        </h2>

        <div className="w-20 h-1 mx-auto bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full shadow-sm" />

        {subtitle && (
          <p className={`text-xs sm:text-sm leading-relaxed max-w-xl mx-auto pt-0.5 ${
            lightMode ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Horizontal Stepper Progress Track — Centered horizontally */}
      <div className="relative max-w-5xl mx-auto px-2 sm:px-4 py-2">
        <div className="relative">
          {/* Background Track Line - Layered behind badges, centered vertically through number badges */}
          <div className="absolute top-[16px] sm:top-[18px] left-6 right-6 h-[3px] bg-slate-700/60 -translate-y-1/2 z-0 rounded-full" />

          {/* Active Progress Fill Line */}
          <div
            className="absolute top-[16px] sm:top-[18px] left-6 h-[3px] bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 -translate-y-1/2 z-0 transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"
            style={{
              width: `${(activeStepIdx / (TURNKEY_STEPS.length - 1)) * 96}%`,
            }}
          />

          {/* 8 Stepper Buttons with Horizontally & Vertically Centered Chevron Arrows */}
          <div className="relative z-10 flex items-start justify-between gap-1 overflow-x-auto pb-1 scrollbar-none">
            {TURNKEY_STEPS.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              const isCompleted = idx < activeStepIdx;

              return (
                <React.Fragment key={step.stepNumber}>
                  <button
                    onClick={() => handleStepClick(idx)}
                    className="group flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none flex-1 min-w-[60px] max-w-[100px]"
                  >
                    {/* Number Badge Container - Non-arrow rounded-xl box layered over line */}
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-black text-xs font-heading transition-all duration-300 relative z-10 ${
                        isActive
                          ? 'bg-amber-400 text-slate-950 scale-110 shadow-lg shadow-amber-400/40 ring-4 ring-amber-400/20'
                          : isCompleted
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : lightMode
                          ? 'bg-slate-200 border border-slate-300 text-slate-700 group-hover:border-amber-500 group-hover:text-amber-600'
                          : 'bg-slate-900 border border-slate-700 text-slate-400 group-hover:border-amber-400/60 group-hover:text-amber-300'
                      }`}
                    >
                      {step.stepNumber}
                    </div>

                    {/* Title Label */}
                    <span
                      className={`text-[10px] sm:text-[11px] font-bold tracking-tight text-center leading-tight line-clamp-2 min-h-[24px] flex items-center justify-center transition-colors px-0.5 ${
                        isActive
                          ? lightMode ? 'text-amber-700 font-extrabold' : 'text-amber-300 font-extrabold'
                          : lightMode ? 'text-slate-600 group-hover:text-slate-900' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>

                  {/* Directional Process Arrow — Centered vertically right on number badge center & track line */}
                  {idx < TURNKEY_STEPS.length - 1 && (
                    <div className="h-8 sm:h-9 flex items-center justify-center z-10 shrink-0 px-0.5 sm:px-1">
                      <ChevronRight
                        strokeWidth={3}
                        className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                          idx < activeStepIdx
                            ? 'text-amber-500 font-black drop-shadow-[0_0_6px_rgba(245,158,11,0.6)] scale-110'
                            : lightMode
                            ? 'text-slate-400'
                            : 'text-slate-500'
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Expand / Collapse Indicator Bar */}
        <div className="flex justify-center mt-1.5">
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
              lightMode
                ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                : 'bg-slate-900/90 border-slate-700 text-amber-300 hover:bg-slate-800'
            }`}
          >
            <span>{isExpanded ? 'Hide Details' : `View Step ${currentStep.stepNumber} Details`}</span>
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Expandable Step Details Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key={currentStep.stepNumber}
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="max-w-4xl mx-auto overflow-hidden"
          >
            <div className={`rounded-xl p-3 sm:p-3.5 border shadow-md ${
              lightMode
                ? 'bg-white border-slate-200 text-slate-900'
                : 'bg-slate-900/95 border-amber-400/40 text-white backdrop-blur-md'
            }`}>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                {/* Image Section - Ultra Compact */}
                <div className="relative rounded-lg overflow-hidden border border-amber-400/40 shadow-xs w-full sm:w-40 h-24 sm:h-26 shrink-0">
                  <img
                    src={currentStep.image}
                    alt={currentStep.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-slate-950/90 backdrop-blur-md px-2 py-0.5 rounded border border-amber-400/40 text-amber-300 shadow-xs">
                    <div className="w-4 h-4 rounded bg-amber-400 text-slate-950 flex items-center justify-center font-black text-[10px] font-heading">
                      {currentStep.stepNumber}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">Phase 0{currentStep.stepNumber}</span>
                  </div>
                </div>

                {/* Details Content - Ultra Compact */}
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-xs font-bold text-xs">
                      {currentStep.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className={`text-sm sm:text-base font-black font-heading tracking-tight leading-none ${
                        lightMode ? 'text-slate-900' : 'text-white'
                      }`}>
                        {currentStep.title}
                      </h3>
                    </div>
                  </div>

                  <p className={`text-xs leading-normal font-normal line-clamp-2 ${
                    lightMode ? 'text-slate-700 font-medium' : 'text-slate-200 font-medium'
                  }`}>
                    {currentStep.description}
                  </p>

                  {/* Feature Badges */}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {currentStep.highlights.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border ${
                          lightMode
                            ? 'bg-amber-100/90 border-amber-300 text-amber-950'
                            : 'bg-slate-800 border-amber-400/40 text-amber-300 shadow-xs'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
