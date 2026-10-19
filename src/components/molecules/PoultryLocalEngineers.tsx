import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Wrench, Zap, ShieldCheck } from 'lucide-react';

export type PoultrySolutionType = 'broiler' | 'layer' | 'breeder';

export interface LocalEngineerDiscipline {
  role: string;
  description: string;
  compactDescription?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface PoultryLocalEngineersProps {
  solutionType?: PoultrySolutionType;
  solutionName?: string;
  columns?: 2 | 4;
  compact?: boolean;
  className?: string;
  parallaxProps?: Record<string, string | number>;
}

const DISCIPLINE_MAP: Record<PoultrySolutionType, LocalEngineerDiscipline[]> = {
  broiler: [
    {
      role: 'Civil Engineering',
      description: 'Topographical land survey, elevation planning, and civil layout design.',
      compactDescription: 'Topographical land survey & civil layout design.',
      icon: HardHat,
    },
    {
      role: 'Mechanical Engineering',
      description: 'Installation of tunnel ventilation fans, feeding augers, and cooling pads.',
      compactDescription: 'Tunnel ventilation fans, feed augers & cooling pads.',
      icon: Wrench,
    },
    {
      role: 'Electrical Engineering',
      description: 'Installation of 3-phase wiring, climate control panels, and sensor systems.',
      compactDescription: '3-phase wiring, climate panels & sensor systems.',
      icon: Zap,
    },
    {
      role: 'Quality Assurance',
      description: 'Airspeed validation, smoke tightness testing, and pre-flock commissioning.',
      compactDescription: 'Airspeed validation & pre-flock commissioning.',
      icon: ShieldCheck,
    },
  ],
  layer: [
    {
      role: 'Civil Engineering',
      description: 'Topographical land survey, vertical clearance planning, and slab layout design.',
      compactDescription: 'Topographical survey & vertical clearance planning.',
      icon: HardHat,
    },
    {
      role: 'Mechanical Engineering',
      description: 'Installation of multi-tier cages, egg collection elevators, and manure belts.',
      compactDescription: 'Multi-tier cages, egg elevators & manure belts.',
      icon: Wrench,
    },
    {
      role: 'Electrical Engineering',
      description: 'Installation of photoperiod lighting lines, motor panels, and PLC controls.',
      compactDescription: 'Photoperiod lighting lines, motor panels & PLC.',
      icon: Zap,
    },
    {
      role: 'Quality Assurance',
      description: 'Vertical cage alignment audits, egg conveyor testing, and commissioning sign-off.',
      compactDescription: 'Cage alignment audits & conveyor commissioning.',
      icon: ShieldCheck,
    },
  ],
  breeder: [
    {
      role: 'Civil Engineering',
      description: 'Topographical land survey, slatted deck planning, and site layout design.',
      compactDescription: 'Topographical land survey & slatted deck planning.',
      icon: HardHat,
    },
    {
      role: 'Mechanical Engineering',
      description: 'Installation of separate-sex feedlines, community nests, and egg conveyors.',
      compactDescription: 'Separate-sex feedlines & automated community nests.',
      icon: Wrench,
    },
    {
      role: 'Electrical Engineering',
      description: 'Installation of dual-zone climate panels, sensor arrays, and backup genset ATS.',
      compactDescription: 'Dual-zone climate panels, sensor arrays & genset ATS.',
      icon: Zap,
    },
    {
      role: 'Quality Assurance',
      description: 'Nest alignment checks, drinker pressure testing, and biosecurity sign-off.',
      compactDescription: 'Nest alignment checks & drinker pressure testing.',
      icon: ShieldCheck,
    },
  ],
};

const DEFAULT_DISCIPLINES: LocalEngineerDiscipline[] = [
  {
    role: 'Civil Engineering',
    description: 'Topographical land survey, site layout planning, and foundation design.',
    compactDescription: 'Topographical land survey & foundation design.',
    icon: HardHat,
  },
  {
    role: 'Mechanical Engineering',
    description: 'Turnkey installation of ventilation systems, feedlines, and equipment.',
    compactDescription: 'Turnkey installation of ventilation & feedlines.',
    icon: Wrench,
  },
  {
    role: 'Electrical Engineering',
    description: 'Complete installation of 3-phase wiring, control panels, and automation.',
    compactDescription: '3-phase wiring, control panels & automation.',
    icon: Zap,
  },
  {
    role: 'Quality Assurance',
    description: 'Pre-commissioning system audits, airflow testing, and handover sign-off.',
    compactDescription: 'Pre-commissioning system audits & handover sign-off.',
    icon: ShieldCheck,
  },
];

const CHEVRON_CLIP = 'polygon(0% 0%, calc(100% - 18px) 0%, 100% 50%, calc(100% - 18px) 100%, 0% 100%)';
const CHEVRON_CLIP_COMPACT = 'polygon(0% 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 0% 100%)';

// United process-ribbon geometry (compact mode)
const ARROW = 16; // px depth of the chevron point / notch
const RIBBON_CLIP_FIRST = `polygon(0% 0%, calc(100% - ${ARROW}px) 0%, 100% 50%, calc(100% - ${ARROW}px) 100%, 0% 100%)`;
const RIBBON_CLIP = `polygon(0% 0%, calc(100% - ${ARROW}px) 0%, 100% 50%, calc(100% - ${ARROW}px) 100%, 0% 100%, ${ARROW}px 50%)`;

// Site palette: navy family stepping lighter, ending on the brand amber accent
const RIBBON_COLORS = [
  { bg: 'linear-gradient(135deg, #0B192C 0%, #10223B 100%)', num: 'text-amber-400', desc: 'text-slate-300' },
  { bg: 'linear-gradient(135deg, #13294A 0%, #183257 100%)', num: 'text-amber-400', desc: 'text-slate-300' },
  { bg: 'linear-gradient(135deg, #1D3A63 0%, #234571 100%)', num: 'text-amber-400', desc: 'text-slate-200' },
  { bg: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)', num: 'text-[#0B192C]/60', desc: 'text-[#0B192C]/75' },
];

const ProcessRibbon: React.FC<{ disciplines: LocalEngineerDiscipline[] }> = ({ disciplines }) => (
  <div className="grid grid-cols-2 gap-1 sm:flex sm:gap-0 items-stretch">
    {disciplines.map((item, idx) => {
      const Icon = item.icon;
      const palette = RIBBON_COLORS[idx % RIBBON_COLORS.length];
      const isFirst = idx === 0;
      const isLight = idx === RIBBON_COLORS.length - 1;
      return (
        <motion.div
          key={item.role}
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
          style={{
            zIndex: 40 - idx,
            filter: 'drop-shadow(2px 2px 4px rgba(11, 25, 44, 0.18))',
          }}
          className={`group relative flex-1 min-w-0 cursor-default ${isFirst ? '' : 'sm:-ml-[12px]'}`}
          title={item.description}
        >
          <div
            style={{ clipPath: isFirst ? RIBBON_CLIP_FIRST : RIBBON_CLIP, background: palette.bg }}
            className={`h-full min-h-[92px] flex flex-col justify-between py-2.5 transition-all duration-300 group-hover:brightness-110 ${
              isFirst ? 'pl-3 pr-6' : 'pl-[26px] pr-6'
            }`}
          >
            <div className="flex items-center justify-between gap-1">
              <span className={`font-mono text-[11px] font-black tracking-wider ${palette.num}`}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  isLight ? 'text-[#0B192C]' : 'text-white'
                }`}
              />
            </div>
            <div className="mt-1.5">
              <h4
                className={`font-sans text-[10.5px] font-extrabold uppercase tracking-wide leading-tight min-h-[2.5em] ${
                  isLight ? 'text-[#0B192C]' : 'text-white'
                }`}
              >
                {(() => {
                  const [first, ...rest] = item.role.split(' ');
                  return (
                    <>
                      <span className="block">{first}</span>
                      <span className="block">{rest.join(' ')}</span>
                    </>
                  );
                })()}
              </h4>
              <p className={`font-sans text-[9.5px] leading-snug mt-0.5 line-clamp-2 ${palette.desc}`}>
                {item.compactDescription || item.description}
              </p>
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
);

export const PoultryLocalEngineers: React.FC<PoultryLocalEngineersProps> = ({
  solutionType = 'broiler',
  columns = 4,
  compact = false,
  className = '',
  parallaxProps = {},
}) => {
  const disciplines = DISCIPLINE_MAP[solutionType] || DEFAULT_DISCIPLINES;
  const gridColsClass =
    columns === 4
      ? compact
        ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 sm:grid-cols-2';

  const clipStyle = compact ? CHEVRON_CLIP_COMPACT : CHEVRON_CLIP;

  if (compact) {
    return (
      <div className={`w-full text-left ${className}`} {...parallaxProps}>
        <ProcessRibbon disciplines={disciplines} />
      </div>
    );
  }

  return (
    <div className={`w-full text-left ${className}`} {...parallaxProps}>
      {/* Chevron Arrow Shapes with Horizontal Icon & Text */}
      <div className={`grid ${gridColsClass} ${compact ? 'gap-2 sm:gap-2.5' : 'gap-3 sm:gap-3.5'} items-stretch relative`}>
        {disciplines.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.role}
              initial={{ x: compact ? -25 : -65, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: compact ? 0.4 : 0.55,
                delay: idx * (compact ? 0.08 : 0.15),
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                zIndex: 40 - idx * 10,
                filter: compact
                  ? 'drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.06))'
                  : 'drop-shadow(1px 2px 5px rgba(0, 0, 0, 0.08))',
              }}
              className="group relative cursor-default"
              title={item.description}
            >
              {/* Outer Border Layer clipped to Arrow Shape */}
              <div
                style={{ clipPath: clipStyle }}
                className={`${compact ? 'p-[1px]' : 'p-[1.5px]'} bg-slate-200 group-hover:bg-amber-400 transition-colors duration-300 h-full`}
              >
                {/* Inner Body Layer clipped to Arrow Shape */}
                <div
                  style={{ clipPath: clipStyle }}
                  className="bg-white group-hover:bg-amber-50/40 transition-colors duration-300 h-full flex items-center"
                >
                  {/* Horizontally Aligned Icon and Text */}
                  <div
                    className={`flex items-center ${
                      compact
                        ? 'gap-2 pl-2.5 sm:pl-3 pr-4 sm:pr-4.5 py-2 w-full min-h-[48px] sm:min-h-[52px]'
                        : 'gap-3.5 pl-4 sm:pl-5 pr-8 sm:pr-9 py-3.5 w-full min-h-[72px] sm:min-h-[78px]'
                    }`}
                  >
                    <Icon
                      className={`${
                        compact
                          ? 'w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-500 shrink-0 group-hover:scale-105 group-hover:text-amber-600 transition-all duration-300'
                          : 'w-7 h-7 sm:w-8 sm:h-8 text-amber-500 shrink-0 group-hover:scale-105 group-hover:text-amber-600 transition-all duration-300'
                      }`}
                    />
                    <div className="min-w-0 flex flex-col justify-center text-left">
                      <h4
                        className={`font-sans ${
                          compact
                            ? 'text-[10px] sm:text-[11px] font-extrabold text-[#0B192C] uppercase tracking-wider leading-tight group-hover:text-amber-700 transition-colors'
                            : 'text-xs sm:text-[13px] font-extrabold text-[#0B192C] uppercase tracking-wider leading-tight group-hover:text-amber-700 transition-colors'
                        }`}
                      >
                        {item.role}
                      </h4>
                      <p
                        className={`font-sans ${
                          compact
                            ? 'text-[9px] sm:text-[9.5px] text-slate-500 leading-tight line-clamp-2 mt-0.5 font-normal'
                            : 'text-[10px] sm:text-[11px] text-slate-600 leading-tight line-clamp-2 mt-1 font-normal'
                        }`}
                      >
                        {compact ? item.compactDescription || item.description : item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
