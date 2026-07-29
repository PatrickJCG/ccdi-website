import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_STATS } from '../../data/mockProducts';
import { CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../atoms';
import { StatCard } from '../molecules';

// ─── Stat sublabels — one per MOCK_STATS entry ────────────────────────────
const STAT_SUBLABELS = [
  'Established in 2019',
  'Turnkey Projects Across the Philippines',
  'ISO & Engineering Certified Standards',
  'Sustainable Agro-Industrial Impact',
];

export const CompanySection: React.FC = () => (
  <section
    id="company"
    className="relative py-24 bg-white border-b border-slate-200/60 overflow-hidden bg-grid-pattern"
  >
    {/* ── Ambient orbs ────────────────────────────────────────── */}
    <div className="absolute top-10 left-10 w-96 h-96 bg-industrial_blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse-glow" />
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-agro_green-500/10 rounded-full blur-3xl -z-10 pointer-events-none animate-float-slow" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-12 gap-12 items-center">

        {/* ── Left: header + company description ─────────────────── */}
        <div className="lg:col-span-6 space-y-6">
          <SectionHeader
            align="left"
            tag="Our Company"
            title="Clarkbase Construction Dev't Inc. (CCDI)"
            description="An integrated agro-industrial solutions provider bringing modern engineering designs to Philippine agribusiness."
          />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="space-y-4 text-slate-600 text-base leading-relaxed"
          >
            <p>
              Founded in <strong>2019</strong>, Clarkbase Construction Dev’t Inc. (CCDI) was established to empower the Philippine agribusiness sector with modern, high-performance engineering designs and integrated construction services.
            </p>
            <p>
              We deliver end-to-end solutions spanning commercial poultry facilities (broiler, breeder, layer), hatcheries, automated feedmill systems, and clean solar energy integration.
            </p>
            <p>
              By combining international material standards, direct global supplier relationships, and experienced technical teams, CCDI builds durable infrastructure designed for high yield, biosecurity, and cost efficiency.
            </p>

            {/* Key highlights */}
            <ul className="pt-2 space-y-2">
              {[
                'Turnkey facility design, civil construction, and equipment installation',
                'Integrated solar PV systems for operational cost reduction',
                'Uncompromising reliability through direct tier-one supplier partnerships',
              ].map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-agro_green-500 mt-0.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Right: stats grid ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-6 grid grid-cols-2 gap-6"
        >
          {MOCK_STATS.map((stat, idx) => (
            <StatCard
              key={idx}
              value={stat.value}
              label={stat.label}
              sublabel={STAT_SUBLABELS[idx]}
            />
          ))}
        </motion.div>

      </div>
    </div>
  </section>
);
