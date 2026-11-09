import React from 'react';
import { motion } from 'framer-motion';

export interface WorkflowAccentColor {
  border: string;
  dot: string;
  bullet: string;
  badgeBg: string;
  text: string;
}

export const WORKFLOW_COLOR_PRIMARY: WorkflowAccentColor = {
  border: 'border-[#f59e0b]',
  dot: 'bg-[#f59e0b]',
  bullet: 'bg-amber-400',
  badgeBg: 'bg-[#f59e0b]/15',
  text: 'text-[#fbbf24]',
};

export const WORKFLOW_COLOR_SECONDARY: WorkflowAccentColor = {
  border: 'border-[#0ea5e9]',
  dot: 'bg-[#0ea5e9]',
  bullet: 'bg-sky-400',
  badgeBg: 'bg-[#0ea5e9]/15',
  text: 'text-[#38bdf8]',
};

export interface WorkflowStepItem {
  step: string;
  title: string;
  name?: string;
  lines?: string[];
  phrases?: string[];
  icon: React.ComponentType<{ className?: string }>;
  accentColor?: WorkflowAccentColor;
}

export interface ProcessWorkflowDiagramProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps: WorkflowStepItem[];
  className?: string;
}

export const ProcessWorkflowDiagram: React.FC<ProcessWorkflowDiagramProps> = ({
  id = 'process-flow',
  eyebrow,
  title,
  subtitle,
  steps,
  className = '',
}) => {
  return (
    <section
      id={id}
      className={`relative py-16 sm:py-20 bg-[#07162A] text-white overflow-hidden border-b border-[#102A43] font-sans text-left ${className}`}
    >
      {/* Schematic canvas dot grid background matching pipeline architecture diagram */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#94a3b8_1.25px,transparent_1.25px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
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

        {/* Architecture Flow Diagram: Stays cleanly horizontal from lg (1024px) and above */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-0 relative">
          {steps.map((item, idx) => {
            const IconComponent = item.icon;
            const isLast = idx === steps.length - 1;
            const color =
              item.accentColor ||
              (idx % 2 === 0 ? WORKFLOW_COLOR_SECONDARY : WORKFLOW_COLOR_PRIMARY);

            return (
              <React.Fragment key={item.step}>
                {/* Node Card with sharp architectural corners */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`relative w-full lg:flex-1 bg-[#0B192C]/90 backdrop-blur-md rounded-[2px] border-2 ${color.border} p-3 sm:p-3.5 lg:p-2 xl:p-3 2xl:p-4 flex items-center gap-2.5 lg:gap-1.5 xl:gap-2.5 2xl:gap-3 shadow-xl transition-transform duration-200 hover:-translate-y-0.5`}
                >
                  {/* Left connector port dot (desktop / 1024px+) */}
                  {idx > 0 && (
                    <span
                      className={`hidden lg:block absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 xl:w-3 xl:h-3 rounded-full ${color.dot} border-2 border-[#07162A] z-10`}
                    />
                  )}

                  {/* Icon Container with sharp corners */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-7.5 lg:h-7.5 xl:w-9 2xl:w-11 rounded-[2px] flex items-center justify-center shrink-0 ${color.badgeBg} ${color.text}`}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-3.5 lg:h-3.5 xl:w-4.5 2xl:w-5" />
                  </div>

                  {/* Node Content */}
                  <div className="flex flex-col justify-center min-w-0">
                    <span
                      className={`font-mono text-[9px] sm:text-[10px] lg:text-[8.5px] xl:text-[10px] 2xl:text-[11px] font-bold tracking-wider ${color.text} uppercase`}
                    >
                      {item.title}
                    </span>

                    {/* Step name: structured lines or single line */}
                    {item.lines && item.lines.length > 0 ? (
                      <span className="mt-0.5 text-[11px] sm:text-xs lg:text-[10px] xl:text-xs 2xl:text-sm font-bold text-slate-100 leading-tight flex flex-col">
                        {item.lines.map((line, lIdx) => (
                          <span key={lIdx} className="whitespace-nowrap">
                            {line}
                          </span>
                        ))}
                      </span>
                    ) : item.name ? (
                      <span className="mt-0.5 text-[11px] sm:text-xs lg:text-[10px] xl:text-xs 2xl:text-sm font-bold text-slate-100 leading-tight">
                        {item.name.replace(/ & /g, '\u00A0&\u00A0')}
                      </span>
                    ) : null}

                    {/* Step phrases list with rounded bullets */}
                    {item.phrases && item.phrases.length > 0 && (
                      <ul className="mt-1 space-y-0.5 xl:space-y-1 text-[11px] sm:text-xs xl:text-sm font-semibold text-slate-100">
                        {item.phrases.map((phrase) => (
                          <li key={phrase} className="flex items-center gap-1.5 xl:gap-2 leading-snug">
                            <span className={`w-1.5 h-1.5 rounded-full ${color.bullet} shrink-0`} />
                            <span className="truncate">{phrase}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Right connector port dot (desktop / 1024px+) */}
                  {!isLast && (
                    <span
                      className={`hidden lg:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 xl:w-3 xl:h-3 rounded-full ${color.dot} border-2 border-[#07162A] z-10`}
                    />
                  )}
                </motion.div>

                {/* Connector Line between Nodes */}
                {!isLast && (
                  <>
                    {/* Horizontal connector on desktop (1024px+) with larger arrow and space before next step */}
                    <div className="hidden lg:flex items-center justify-between shrink-0 w-3 lg:w-4 xl:w-6 2xl:w-8 relative px-0.5 pointer-events-none">
                      <div className="flex-1 border-t-2 border-dashed border-slate-400/80 mr-1 xl:mr-1.5" />
                      <svg
                        className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-amber-400 fill-current shrink-0 filter drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]"
                        viewBox="0 0 12 12"
                      >
                        <path d="M1 1.5L10.5 6L1 10.5V1.5Z" />
                      </svg>
                    </div>

                    {/* Vertical connector on mobile / tablet (< 1024px) */}
                    <div className="flex lg:hidden flex-col items-center justify-center py-2 pointer-events-none">
                      <div className="h-5 border-l-2 border-dashed border-slate-400/80 mb-1" />
                      <svg
                        className="w-3.5 h-3.5 text-amber-400 fill-current mb-0.5 filter drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]"
                        viewBox="0 0 12 12"
                      >
                        <path d="M1.5 1L6 10.5L10.5 1H1.5Z" />
                      </svg>
                    </div>
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

