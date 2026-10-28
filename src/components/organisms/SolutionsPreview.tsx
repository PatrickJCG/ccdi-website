import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  CheckCircle2,
  ArrowRight,
  Clock,
  Check,
  Hammer,
  Layers,
} from 'lucide-react';
import type { Product } from '../../data/mockProducts';

export interface ProjectShowcaseItem {
  id: string;
  title: string;
  clientType: string;
  location: string;
  status: 'completed' | 'ongoing';
  statusLabel: string;
  category: 'Poultry Farm Equipment' | 'Hatchery' | 'Feedmill' | 'Solar Systems';
  categoryLabel: string;
  imageUrl: string;
  capacityMetric: {
    label: string;
    value: string;
  };
  highlights: string[];
  timeline: string;
  caseStudyHref: string;
}

const FLAGSHIP_PROJECTS: ProjectShowcaseItem[] = [
  {
    id: 'bulacan-hatchery',
    title: 'Commercial Single-Stage Hatchery Complex',
    clientType: 'Commercial Poultry Integrator',
    location: 'San Ildefonso, Bulacan',
    status: 'completed',
    statusLabel: 'Completed & Turned Over',
    category: 'Hatchery',
    categoryLabel: 'Hatchery & Incubation',
    imageUrl: '/images/news/bulacan-single-stage-setter.png',
    capacityMetric: {
      label: 'Egg-Setting Output',
      value: '322,560 Eggs / Week',
    },
    highlights: [
      'Single-Stage Setters & Hatchers (Model EIFTPC-40320)',
      'Unidirectional positive pressure cleanroom AHU airflow',
      'All-in all-out biosecurity sanitation corridor design',
    ],
    timeline: 'Commissioned August 2026',
    caseStudyHref: '/news',
  },
  {
    id: 'pampanga-broiler',
    title: '120k High-Density Climate-Controlled Broiler Farm',
    clientType: 'Contract Meat Bird Producer',
    location: 'Magalang, Pampanga',
    status: 'completed',
    statusLabel: 'Completed & Operational',
    category: 'Poultry Farm Equipment',
    categoryLabel: 'Broiler Housing',
    imageUrl: '/images/broiler/feeding-drinking-system.jpg',
    capacityMetric: {
      label: 'Flock Capacity',
      value: '120,000 Birds (3 Houses)',
    },
    highlights: [
      'Elevated slatted floor layout with high-volume sub-floor clearance',
      'High-velocity 2.5–3.2 m/s tunnel ventilation & 150mm evaporative pads',
      'Automated flex-auger bulk silo feed lines & 360° closed nipple waterers',
    ],
    timeline: 'Turned Over 2026',
    caseStudyHref: '/solutions/poultry/broiler',
  },
  {
    id: 'tarlac-breeder',
    title: 'Parent Stock Poultry Breeding & Nesting Facility',
    clientType: 'Parent Stock Multiplier',
    location: 'Concepcion, Tarlac',
    status: 'ongoing',
    statusLabel: 'Ongoing Build (85% Complete)',
    category: 'Poultry Farm Equipment',
    categoryLabel: 'Poultry Breeding',
    imageUrl: '/images/breeder/american-type-interior.jpg',
    capacityMetric: {
      label: 'Breeder Stock',
      value: '40,000 Parent Hens',
    },
    highlights: [
      'American (1/3 slat) design with sidewall automated community nests',
      'Sex-separate male & female feeding delivery tracks with exclusion grills',
      'Continuous variable-speed gentle egg collection & staging conveyor',
    ],
    timeline: 'Target Commissioning Q4 2026',
    caseStudyHref: '/solutions/poultry/broiler-breeder',
  },
  {
    id: 'batangas-layer',
    title: '150k Commercial Multi-Tier Layer Battery Complex',
    clientType: 'Commercial Table Egg Producer',
    location: 'San Jose, Batangas',
    status: 'ongoing',
    statusLabel: 'Phase 2 Equipment Installation',
    category: 'Poultry Farm Equipment',
    categoryLabel: 'Commercial Layer',
    imageUrl: '/images/layer/h-frame-layer.jpg',
    capacityMetric: {
      label: 'Layer Capacity',
      value: '150,000 Table Egg Birds',
    },
    highlights: [
      'Hot-dip galvanized vertical H-frame cages (SA2.5 industrial standard)',
      'Multi-tier soft-touch egg elevator lifts & specialized cross-conveyors',
      'In-barn PP manure belts with perforated air-drying ventilation ducts',
    ],
    timeline: 'Phase 2 Active On-Site',
    caseStudyHref: '/solutions/poultry/layer',
  },
  {
    id: 'nueva-ecija-feedmill',
    title: '30 TPH Automated Feedmill Plant & Bulk Silo Farm',
    clientType: 'Regional Feed & Grain Conglomerate',
    location: 'Cabanatuan, Nueva Ecija',
    status: 'completed',
    statusLabel: 'Completed & Commissioned',
    category: 'Feedmill',
    categoryLabel: 'Feedmill Systems',
    imageUrl: '/images/capabilities/feedmill-facility.jpg',
    capacityMetric: {
      label: 'Milling Output',
      value: '30 Metric Tons / Hour',
    },
    highlights: [
      'Z600 corrugated galvanized bulk grain storage silos (5,000 MT total)',
      'Multi-cell gravimetric micro-batching with SCADA recipe automation',
      'Twin-shaft fluidized zero-gravity mixer & heavy ring-die pellet mill',
    ],
    timeline: 'Commissioned 2026',
    caseStudyHref: '/solutions/feedmill',
  },
  {
    id: 'clark-solar',
    title: '1.2 MWp Commercial Agro-Rooftop Solar Microgrid',
    clientType: 'Agro-Industrial Food Processing Complex',
    location: 'Clark Freeport Agro-Hub, Pampanga',
    status: 'ongoing',
    statusLabel: 'Interconnect & Grid Sync',
    category: 'Solar Systems',
    categoryLabel: 'Solar Integration',
    imageUrl: '/images/hero/solar-hero.jpg',
    capacityMetric: {
      label: 'Installed PV Power',
      value: '1,200 kWp (1.2 MWp)',
    },
    highlights: [
      '280 kph typhoon-certified standing seam roof clamps & AL6005 rails',
      'Utility-grade 3-phase commercial string inverters with ERC Net Metering',
      'Zero-export fast fuel saver sync with standby diesel generator sets',
    ],
    timeline: 'Energization Q4 2026',
    caseStudyHref: '/solutions/solar',
  },
];

export interface SolutionsPreviewProps {
  inquiryItems?: Product[];
  onToggleInquiry?: (product: Product) => void;
}

export const SolutionsPreview: React.FC<SolutionsPreviewProps> = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'ongoing'>('all');

  const filteredProjects = useMemo(() => {
    if (statusFilter === 'all') return FLAGSHIP_PROJECTS;
    return FLAGSHIP_PROJECTS.filter((item) => item.status === statusFilter);
  }, [statusFilter]);

  const completedCount = FLAGSHIP_PROJECTS.filter((p) => p.status === 'completed').length;
  const ongoingCount = FLAGSHIP_PROJECTS.filter((p) => p.status === 'ongoing').length;

  return (
    <div id="solutions-preview" className="text-left font-sans">
      {/* ── SUCCESSFUL / ONGOING PROJECTS SHOWCASE (DARK INDUSTRIAL THEME) ── */}
      <section className="relative py-24 sm:py-32 bg-[#040D18] text-white border-b border-[#102A43] overflow-hidden">
        {/* Subtle Ambient Industrial Backdrop Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Architectural Accent 2 - Top Left Anchored */}
        <motion.div
          initial={{ opacity: 0, y: -45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-12 -left-16 sm:-top-8 sm:left-0 w-72 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <img
            src="/images/accents/accent2.png"
            alt=""
            className="w-full h-auto object-contain opacity-30"
          />
        </motion.div>

        {/* Architectural Dynamic Accent Graphic - Bottom Right Anchored */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-16 -right-16 sm:-right-8 sm:bottom-0 w-72 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <img
            src="/images/accents/dark-accent-graphic.png"
            alt=""
            className="w-full h-auto object-contain opacity-30"
          />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Header & Filter Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#102A43] pb-7">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[#F3A812] font-bold">
                  FLAGSHIP SHOWCASE
                </span>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-[11px] text-slate-400 font-semibold tracking-wider uppercase">
                  PHILIPPINE AGRIBUSINESS INFRASTRUCTURE
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Successful & Ongoing Projects
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                A verified track record of high-performance turnkey engineering across the Philippines — inspect completed facility handovers and active on-site construction below.
              </p>
            </div>

            {/* Status Filter Toggle Pills */}
            <div className="flex items-center gap-1.5 bg-[#07162A] p-1.5 rounded-[2px] border border-[#1E3E66] shrink-0 self-start md:self-auto shadow-inner">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3.5 py-1.5 rounded-[2px] font-mono text-xs font-bold transition-all uppercase cursor-pointer flex items-center gap-1.5 ${statusFilter === 'all'
                  ? 'bg-[#F3A812] text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Projects ({FLAGSHIP_PROJECTS.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('completed')}
                className={`px-3.5 py-1.5 rounded-[2px] font-mono text-xs font-bold transition-all uppercase cursor-pointer flex items-center gap-1.5 ${statusFilter === 'completed'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Completed ({completedCount})</span>
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('ongoing')}
                className={`px-3.5 py-1.5 rounded-[2px] font-mono text-xs font-bold transition-all uppercase cursor-pointer flex items-center gap-1.5 ${statusFilter === 'ongoing'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Hammer className="w-3.5 h-3.5 text-amber-900" />
                <span>Ongoing ({ongoingCount})</span>
              </button>
            </div>
          </div>

          {/* 6-Item High-Contrast Project Card Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="group relative flex flex-col justify-between bg-[#07162A] border border-[#1E3E66] hover:border-[#F3A812] rounded-[2px] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/15"
                  >
                    {/* ── CARD MEDIA HEADER ── */}
                    <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-[#040D18] shrink-0">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center brightness-[0.92] contrast-[1.08] transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Dual Contrast Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07162A] via-[#07162A]/40 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Status Badge (Top-Left) */}


                      {/* Discipline Badge (Top-Right) */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-2 py-0.5 rounded-[2px] bg-black/60 border border-white/20 text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider backdrop-blur-xs">
                          {project.categoryLabel}
                        </span>
                      </div>

                      {/* Geographic Location Bar (Bottom of Media) */}
                      <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center gap-1.5 text-xs font-mono text-slate-200 drop-shadow-md">
                        <MapPin className="w-3.5 h-3.5 text-[#F3A812] shrink-0" />
                        <span className="font-semibold tracking-wide truncate">
                          {project.location}
                        </span>
                      </div>
                    </div>

                    {/* ── CARD BODY ── */}
                    <div className="relative p-5 sm:p-6 flex flex-col justify-between flex-grow space-y-4 bg-[#07162A] overflow-hidden">
                      {/* Dark Accent Graphic placed where indicated */}
                      <img
                        src="/images/accents/dark-accent-graphic.png"
                        alt=""
                        className="absolute -right-3 top-2 w-32 h-auto object-contain object-right pointer-events-none select-none opacity-30 z-0"
                        aria-hidden="true"
                      />

                      <div className="relative z-10 space-y-2.5">
                        <h3 className="font-sans text-lg sm:text-xl font-extrabold text-white tracking-tight group-hover:text-[#F3A812] transition-colors leading-snug">
                          {project.title}
                        </h3>

                        {/* Capacity / Output Benchmark Pill */}

                      </div>

                      {/* Key Engineering Scope Highlights */}
                      <div className="relative z-10 space-y-2 border-t border-[#102A43] pt-3">
                        <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest block">
                          ENGINEERING DELIVERABLES
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {project.highlights.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 leading-relaxed">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#F3A812] shrink-0 mt-0.5" />
                              <span className="text-[11px] sm:text-xs">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Footer Milestone & Action */}
                      <div className="relative z-10 border-t border-[#102A43] pt-3.5 flex flex-col gap-3">
                        <div className="flex flex-col gap-1 text-[11px] font-mono">


                          <span className="text-slate-400 flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-[#F3A812]" />{project.statusLabel}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            navigate(project.caseStudyHref);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full py-2.5 px-3 rounded-[2px] bg-[#000] hover:bg-[#F3A812] text-white hover:text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-[#1E3E66] hover:border-[#F3A812] flex items-center justify-between cursor-pointer group/btn"
                        >
                          <span>Explore Project Scope</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* ── ACTION BAR ── */}
          <div className="border-t border-[#102A43] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs font-mono text-slate-400">
              BULACAN • PAMPANGA • TARLAC • BATANGAS • NUEVA ECIJA • CENTRAL LUZON
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/contact');
                  }
                }}
                className="px-5 py-3 rounded-[2px] font-sans text-xs uppercase tracking-wider font-extrabold bg-[#F3A812] text-slate-950 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/15 cursor-pointer"
              >
                Inquire for Your Facility →
              </button>

              <button
                type="button"
                onClick={() => {
                  navigate('/news');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold border border-[#1E3E66] text-white hover:border-[#F3A812] transition-colors bg-[#07162A] cursor-pointer"
              >
                View News & Project Updates
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
