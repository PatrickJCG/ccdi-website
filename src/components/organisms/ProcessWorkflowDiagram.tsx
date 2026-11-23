import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export interface WorkflowStepItem {
  step: string;
  title: string;
  name?: string;
  lines?: string[];
  phrases?: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export interface ProcessWorkflowDiagramProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps: WorkflowStepItem[];
  embedded?: boolean;
  className?: string;
}

export const ProcessWorkflowDiagram: React.FC<ProcessWorkflowDiagramProps> = ({
  id = 'process-flow',
  eyebrow,
  title,
  subtitle,
  steps,
  embedded = false,
  className = '',
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, amount: 0.2 });
  const reducedMotion = Boolean(useReducedMotion());

  const [autoIndex, setAutoIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isInView || reducedMotion || hoveredIndex !== null || steps.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % steps.length);
    }, 2400);

    return () => clearInterval(timer);
  }, [isInView, reducedMotion, hoveredIndex, steps.length]);

  if (steps.length === 0) {
    return null;
  }

  const activeIndex = hoveredIndex ?? (reducedMotion ? -1 : autoIndex);

  const progressRatio =
    steps.length <= 1
      ? 1
      : hoveredIndex !== null
        ? hoveredIndex / (steps.length - 1)
        : reducedMotion
          ? 1
          : autoIndex / (steps.length - 1);

  const railInsetPercent = 50 / steps.length;

  const getStepState = (idx: number) => {
    const isActive = activeIndex === idx;
    const isPassed = activeIndex >= 0 && idx < activeIndex;
    const isAllLit = activeIndex === -1;
    return { isActive, isPassed, isAllLit };
  };

  const content = (
    <>
      {/* Header */}
      {(eyebrow || title || subtitle) && (
        <div className="max-w-3xl space-y-2">
          {eyebrow && (
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest block">
              {eyebrow}
            </span>
          )}
          {title && (
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div ref={timelineRef} className="relative">
        {/* ── Desktop & Tablet Horizontal Animated Timeline (md / 768px+) ── */}
        <div className="hidden md:block relative">
          {/* Continuous rail passing through exact mathematical centers of first & last circular nodes */}
          {steps.length > 1 && (
            <div
              aria-hidden="true"
              className="absolute top-[54px] lg:top-[56px] xl:top-[60px] -translate-y-1/2 h-[2px] overflow-hidden pointer-events-none"
              style={{
                left: `${railInsetPercent}%`,
                right: `${railInsetPercent}%`,
              }}
            >
              {/* Base track */}
              <motion.div
                initial={reducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: isInView || reducedMotion ? 1 : 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 origin-left bg-[#1E3E66]/80"
              />

              {/* Active progress fill */}
              <motion.div
                initial={reducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: isInView || reducedMotion ? progressRatio : 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 origin-left bg-gradient-to-r from-amber-500/60 via-amber-400 to-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.45)]"
              />

              {/* Subtle ambient sweep */}
              {isInView && !reducedMotion && (
                <motion.div
                  aria-hidden="true"
                  initial={{ left: '-20%' }}
                  animate={{ left: '120%' }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    repeatDelay: 1.4,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-amber-200/80 to-transparent"
                />
              )}
            </div>
          )}

          <ol
            className="relative grid gap-x-0"
            style={{
              gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
            }}
          >
            {steps.map((item, idx) => {
              const IconComponent = item.icon;
              const { isActive, isPassed, isAllLit } = getStepState(idx);

              return (
                <motion.li
                  key={item.step}
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={
                    isInView || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                  }
                  transition={{
                    duration: 0.45,
                    delay: reducedMotion ? 0 : idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="min-w-0"
                >
                  <button
                    type="button"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(idx)}
                    onBlur={() => setHoveredIndex(null)}
                    onClick={() => setAutoIndex(idx)}
                    aria-current={isActive ? 'step' : undefined}
                    className="w-full flex flex-col items-center text-center px-2 lg:px-3 xl:px-4 group focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-4 rounded-[2px] cursor-pointer"
                  >
                    {/* Fixed-height top label keeps rail vertically locked to node centers */}
                    <div className="h-5 mb-3 flex items-center justify-center">
                      <span
                        className={`font-mono text-[10px] lg:text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${
                          isActive
                            ? 'text-amber-400'
                            : isPassed || isAllLit
                              ? 'text-amber-400/80'
                              : 'text-slate-400 group-hover:text-amber-300'
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    {/* Circular Icon Node */}
                    <div className="relative flex items-center justify-center">
                      {isActive && !reducedMotion && (
                        <motion.span
                          aria-hidden="true"
                          initial={{ opacity: 0.55, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.45 }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: 'easeOut',
                          }}
                          className="absolute inset-0 rounded-full border border-amber-400/70 pointer-events-none"
                        />
                      )}
                      <div
                        className={`relative z-10 w-11 h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? 'bg-[#0F243D] border border-amber-400 text-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.28)] scale-[1.06]'
                            : isPassed || isAllLit
                              ? 'bg-[#0B192C] border border-amber-400/50 text-amber-400/90 group-hover:border-amber-400 group-hover:text-amber-300'
                              : 'bg-[#0B192C] border border-[#1E3E66] text-slate-300 group-hover:border-amber-400/70 group-hover:text-amber-300'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 lg:w-[18px] lg:h-[18px] xl:w-5 xl:h-5" />
                      </div>
                    </div>

                    {/* Hairline stem */}
                    <span
                      aria-hidden="true"
                      className={`w-px h-4 lg:h-5 my-2.5 bg-gradient-to-b to-transparent transition-colors duration-300 ${
                        isActive
                          ? 'from-amber-400/80'
                          : isPassed || isAllLit
                            ? 'from-amber-400/35'
                            : 'from-[#1E3E66] group-hover:from-amber-400/50'
                      }`}
                    />

                    {/* Step Title / Operations */}
                    <div className="w-full">
                      {item.lines && item.lines.length > 0 ? (
                        <span
                          className={`text-xs lg:text-[13px] xl:text-sm font-semibold leading-snug tracking-tight flex flex-col items-center transition-colors duration-300 ${
                            isActive
                              ? 'text-white'
                              : isPassed || isAllLit
                                ? 'text-slate-100'
                                : 'text-slate-300 group-hover:text-white'
                          }`}
                        >
                          {item.lines.map((line, lIdx) => (
                            <span key={lIdx} className="block whitespace-nowrap">
                              {line}
                            </span>
                          ))}
                        </span>
                      ) : item.name ? (
                        <span
                          className={`block text-xs lg:text-[13px] xl:text-sm font-semibold leading-snug tracking-tight transition-colors duration-300 ${
                            isActive
                              ? 'text-white'
                              : isPassed || isAllLit
                                ? 'text-slate-100'
                                : 'text-slate-300 group-hover:text-white'
                          }`}
                        >
                          {item.name.replace(/ & /g, '\u00A0&\u00A0')}
                        </span>
                      ) : null}

                      {item.phrases && item.phrases.length > 0 && (
                        <ul className="inline-flex flex-col items-start mx-auto space-y-1.5 text-left">
                          {item.phrases.map((phrase) => (
                            <li
                              key={phrase}
                              className={`flex items-center gap-2 text-xs lg:text-[13px] xl:text-sm font-medium leading-snug transition-colors duration-300 ${
                                isActive
                                  ? 'text-white'
                                  : isPassed || isAllLit
                                    ? 'text-slate-200'
                                    : 'text-slate-300 group-hover:text-white'
                              }`}
                            >
                              <span
                                className={`w-1 h-1 rounded-full shrink-0 transition-colors duration-300 ${
                                  isActive
                                    ? 'bg-amber-400'
                                    : isPassed || isAllLit
                                      ? 'bg-amber-400/75'
                                      : 'bg-slate-500 group-hover:bg-amber-400/75'
                                }`}
                              />
                              <span className="whitespace-nowrap">{phrase}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* ── Mobile Vertical Animated Timeline (< md / 768px) ── */}
        <div className="md:hidden relative">
          {steps.length > 1 && (
            <div
              aria-hidden="true"
              className="absolute left-[22px] -translate-x-1/2 top-[22px] bottom-[22px] w-[2px] overflow-hidden pointer-events-none"
            >
              {/* Base track */}
              <motion.div
                initial={reducedMotion ? false : { scaleY: 0 }}
                animate={{ scaleY: isInView || reducedMotion ? 1 : 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 origin-top bg-[#1E3E66]/80"
              />

              {/* Active progress fill */}
              <motion.div
                initial={reducedMotion ? false : { scaleY: 0 }}
                animate={{ scaleY: isInView || reducedMotion ? progressRatio : 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 origin-top bg-gradient-to-b from-amber-500/60 via-amber-400 to-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.45)]"
              />

              {/* Subtle ambient sweep */}
              {isInView && !reducedMotion && (
                <motion.div
                  aria-hidden="true"
                  initial={{ top: '-20%' }}
                  animate={{ top: '120%' }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    repeatDelay: 1.4,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-amber-200/80 to-transparent"
                />
              )}
            </div>
          )}

          <ol className="relative space-y-6">
            {steps.map((item, idx) => {
              const IconComponent = item.icon;
              const { isActive, isPassed, isAllLit } = getStepState(idx);
              const singleTitle = item.name || item.lines?.join(' ');

              return (
                <motion.li
                  key={item.step}
                  initial={reducedMotion ? false : { opacity: 0, x: -10 }}
                  animate={
                    isInView || reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: reducedMotion ? 0 : idx * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(idx)}
                    onBlur={() => setHoveredIndex(null)}
                    onClick={() => setAutoIndex(idx)}
                    aria-current={isActive ? 'step' : undefined}
                    className="w-full flex items-start gap-4 sm:gap-5 text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-4 rounded-[2px]"
                  >
                    {/* Circular Node */}
                    <div className="relative shrink-0">
                      {isActive && !reducedMotion && (
                        <motion.span
                          aria-hidden="true"
                          initial={{ opacity: 0.55, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.4 }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: 'easeOut',
                          }}
                          className="absolute inset-0 rounded-full border border-amber-400/70 pointer-events-none"
                        />
                      )}
                      <div
                        className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? 'bg-[#0F243D] border border-amber-400 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.28)]'
                            : isPassed || isAllLit
                              ? 'bg-[#0B192C] border border-amber-400/50 text-amber-400/90'
                              : 'bg-[#0B192C] border border-[#1E3E66] text-slate-300 group-hover:border-amber-400/70'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Label & Operations */}
                    <div className="flex-1 min-w-0 pt-0.5 space-y-1">
                      <span
                        className={`block font-mono text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${
                          isActive
                            ? 'text-amber-400'
                            : isPassed || isAllLit
                              ? 'text-amber-400/80'
                              : 'text-slate-400'
                        }`}
                      >
                        {item.title}
                      </span>

                      {item.phrases && item.phrases.length > 0 ? (
                        <div
                          className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm sm:text-[15px] font-medium leading-snug transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-slate-200'
                          }`}
                        >
                          {item.phrases.map((phrase, pIdx) => (
                            <React.Fragment key={phrase}>
                              {pIdx > 0 && (
                                <span
                                  aria-hidden="true"
                                  className="w-1 h-1 rounded-full bg-amber-400/60"
                                />
                              )}
                              <span>{phrase}</span>
                            </React.Fragment>
                          ))}
                        </div>
                      ) : singleTitle ? (
                        <p
                          className={`text-sm sm:text-[15px] font-semibold leading-snug transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-slate-200'
                          }`}
                        >
                          {singleTitle}
                        </p>
                      ) : null}
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );

  if (embedded) {
    return (
      <div
        id={id}
        className={`relative pt-10 sm:pt-12 border-t border-[#1E3E66]/60 font-sans text-left space-y-10 sm:space-y-12 ${className}`}
      >
        {content}
      </div>
    );
  }

  return (
    <section
      id={id}
      className={`relative py-16 sm:py-20 lg:py-24 bg-[#07162A] text-white overflow-hidden border-b border-[#102A43] font-sans text-left ${className}`}
    >
      {/* Subtle minimal architectural dot texture */}
      <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[540px] h-72 bg-amber-500/[0.06] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-14">
        {content}
      </div>
    </section>
  );
};
