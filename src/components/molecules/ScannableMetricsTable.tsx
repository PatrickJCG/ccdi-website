import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { MOCK_COMPARISON_DATA, type ComparisonRow } from '../../data/mockProducts';
import { FlaskConical, TrendingUp, Heart, Scale, Award, Bird, Egg, Factory, Sun } from 'lucide-react';

const renderRowIcon = (iconName: string) => {
  switch (iconName) {
    case 'Bird':
      return <Bird className="w-4 h-4 text-amber-400" />;
    case 'Egg':
      return <Egg className="w-4 h-4 text-blue-300" />;
    case 'Factory':
      return <Factory className="w-4 h-4 text-amber-300" />;
    case 'Sun':
      return <Sun className="w-4 h-4 text-amber-400" />;
    default:
      return <Bird className="w-4 h-4 text-amber-400" />;
  }
};

// ── Helper: render a metric cell with the right pill class ────────────────

const MetricCell: React.FC<{ data: ComparisonRow['fcrImprovement'] | ComparisonRow['avgDailyGain'] | ComparisonRow['gutHealthScore'] | ComparisonRow['doseRate'] }> = ({ data }) => {
  const pillClass =
    data.tier === 'best' ? 'metric-pill-best' :
    data.tier === 'std'  ? 'metric-pill-std'  :
    'metric-pill-info';

  return (
    <td className="metrics-table-cell">
      <span className={pillClass}>{data.value}</span>
    </td>
  );
};

// ── Column header definitions ─────────────────────────────────────────────

const COLUMNS = [
  { key: 'fcrImprovement', label: 'Capacity / Output',  sublabel: 'design spec', icon: <TrendingUp className="w-3.5 h-3.5" /> },
  { key: 'avgDailyGain',   label: 'Performance Benchmark', sublabel: 'efficiency', icon: <TrendingUp className="w-3.5 h-3.5" /> },
  { key: 'gutHealthScore', label: 'Operational Uptime', sublabel: 'reliability', icon: <Heart className="w-3.5 h-3.5" /> },
  { key: 'doseRate',       label: 'Build Duration',     sublabel: 'turnkey spec', icon: <Scale className="w-3.5 h-3.5" /> },
  { key: 'certifications', label: 'Standards',          sublabel: 'certifications', icon: <Award className="w-3.5 h-3.5" /> },
] as const;

// ── Row animation variants ────────────────────────────────────────────────

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

// ── Main Component ────────────────────────────────────────────────────────

export const ScannableMetricsTable: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Section intro */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-industrial_blue-500/30 border border-industrial_blue-400/50 text-blue-200 text-xs font-bold uppercase tracking-widest">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Facility Benchmarks</span>
          </div>
          <p className="text-sm text-slate-400 italic">
            Project Specs · ISO-verified standards · Sector Performance
          </p>
        </div>
        <div className="sm:hidden text-xs text-blue-200/80 font-medium flex items-center gap-1">
          <span>← Swipe table →</span>
        </div>
      </div>

      {/* Scrollable table wrapper */}
      <div className="metrics-table-wrapper">
        <table className="metrics-table" role="table" aria-label="Facility performance benchmarks table">
          <thead>
            <tr>
              {/* Sticky species column header */}
              <th className="col-sticky" scope="col" style={{ textAlign: 'left' }}>
                Sector / Facility
              </th>
              {COLUMNS.map((col) => (
                <th key={col.key} scope="col">
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex items-center gap-1.5 justify-center">
                      {col.icon}
                      <span>{col.label}</span>
                    </div>
                    <span style={{ opacity: 0.6, fontSize: '0.65rem', fontWeight: 400, textTransform: 'none', letterSpacing: '0' }}>
                      {col.sublabel}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_COMPARISON_DATA.map((row, idx) => (
              <motion.tr
                key={row.species}
                custom={idx}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                {/* Sticky species name cell */}
                <td className="col-sticky" style={{ textAlign: 'left' }}>
                  <div className="flex items-center gap-2.5">
                    <span className="p-1.5 rounded-lg bg-white/10 shrink-0 flex items-center justify-center">
                      {renderRowIcon(row.icon)}
                    </span>
                    <div>
                      <div className="font-bold text-slate-100 text-sm">{row.species}</div>
                    </div>
                  </div>
                </td>

                <MetricCell data={row.fcrImprovement} />
                <MetricCell data={row.avgDailyGain} />
                <MetricCell data={row.gutHealthScore} />
                <MetricCell data={row.doseRate} />

                <td>
                  <span className="text-xs text-slate-300 font-medium leading-snug">
                    {row.certifications}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-slate-400 italic leading-relaxed">
        * Performance benchmarks and build durations are based on standard CCDI engineering specifications and site conditions. Individual project parameters may vary depending on client location and custom facility design.
      </p>
    </motion.div>
  );
};
