import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  CheckCircle2,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { ProjectImageCarousel } from '../molecules/ProjectImageCarousel';
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
  images: string[];
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
    id: 'iloilo-multi-tier-broiler',
    title: 'Multi-Tier Broiler Cage Project in Iloilo',
    clientType: 'Commercial Broiler Integrator',
    location: 'Iloilo, Philippines',
    status: 'completed',
    statusLabel: 'Finished Project • Turned Over',
    category: 'Poultry Farm Equipment',
    categoryLabel: 'Multi-Tier Broiler Cage',
    imageUrl: '/images/news/finished-multi-tier-broiler-cage-iloilo/01-multi-tier-cage-system.webp',
    images: [
      '/images/news/finished-multi-tier-broiler-cage-iloilo/01-multi-tier-cage-system.webp',
      '/images/news/finished-multi-tier-broiler-cage-iloilo/02-cage-aisle-feeders-drinkers.webp',
      '/images/news/finished-multi-tier-broiler-cage-iloilo/03-interior-slatted-floor-nipple-drinkers.webp',
      '/images/news/finished-multi-tier-broiler-cage-iloilo/04-tunnel-ventilation-exhaust-fans.webp',
      '/images/news/finished-multi-tier-broiler-cage-iloilo/05-climate-controller-control-room.webp',
      '/images/news/finished-multi-tier-broiler-cage-iloilo/06-heating-system-sidewall-inlets.webp',
      '/images/news/finished-multi-tier-broiler-cage-iloilo/07-insulated-cooling-pad-baffle-doors.webp',
      '/images/news/finished-multi-tier-broiler-cage-iloilo/08-air-intake-corridor-trolleys.webp',
      '/images/news/finished-multi-tier-broiler-cage-iloilo/09-manure-belt-discharge-system.webp',
      '/images/news/finished-multi-tier-broiler-cage-iloilo/10-vertical-manure-cleaning-controls.webp',
      '/images/news/finished-multi-tier-broiler-cage-iloilo/11-cross-conveyor-manure-removal.webp',
    ],
    capacityMetric: {
      label: 'Housing System',
      value: 'Multi-Tier Automated Cage',
    },
    highlights: [
      'Multi-tier galvanized broiler cages with automated feed troughs & nipple drinkers',
      'Perforated manure belts with vertical cleaning controls & cross-conveyor discharge',
      'Dual-tier tunnel exhaust fans, cooling baffles, heating units & EI-6000PLUS climate control',
    ],
    timeline: 'Completed & Turned Over',
    caseStudyHref: '/news/multi-tier-broiler-cage-project-iloilo',
  },
  {
    id: 'ycp-farm-solar',
    title: 'YCP Farm Commercial Solar Power Project',
    clientType: 'Commercial Poultry Operations',
    location: 'YCP Farm, Philippines',
    status: 'completed',
    statusLabel: 'Finished Project • Operational',
    category: 'Solar Systems',
    categoryLabel: 'Farm Solar Integration',
    imageUrl: '/images/news/finished-ycp-farm-solar-project/01-solar-array-front-poultry-houses.webp',
    images: [
      '/images/news/finished-ycp-farm-solar-project/01-solar-array-front-poultry-houses.webp',
      '/images/news/finished-ycp-farm-solar-project/02-solar-pv-rows-exhaust-fans.webp',
      '/images/news/finished-ycp-farm-solar-project/03-ground-mount-solar-installation.webp',
      '/images/news/finished-ycp-farm-solar-project/04-wide-solar-field-overview.webp',
      '/images/news/finished-ycp-farm-solar-project/05-solar-panels-and-farm-complex.webp',
      '/images/news/finished-ycp-farm-solar-project/06-concrete-pedestal-mounting-system.webp',
      '/images/news/finished-ycp-farm-solar-project/07-full-array-panoramic-view.webp',
      '/images/news/finished-ycp-farm-solar-project/08-civil-foundation-and-racking-works.webp',
    ],
    capacityMetric: {
      label: 'System Type',
      value: 'Ground-Mount Agro PV Array',
    },
    highlights: [
      'Ground-mounted solar PV rows aligned directly with tunnel-ventilated poultry houses',
      'Reinforced concrete pier footings and typhoon-resilient galvanized steel racking',
      'Direct daytime clean energy offset for peak exhaust fan and cooling pump loads',
    ],
    timeline: 'Completed & Operational',
    caseStudyHref: '/news/ycp-farm-solar-project-finished',
  },
  {
    id: 'bulacan-hatchery',
    title: 'Single-Stage Commercial Hatchery Complex',
    clientType: 'Commercial Poultry Integrator',
    location: 'San Ildefonso, Bulacan',
    status: 'completed',
    statusLabel: 'Finished Project • Turned Over',
    category: 'Hatchery',
    categoryLabel: 'Hatchery & Incubation',
    imageUrl: '/images/news/bulacan-single-stage-setter.png',
    images: [
      '/images/news/bulacan-single-stage-setter.png',
      '/images/news/bulacan-hatcher.jpg',
    ],
    capacityMetric: {
      label: 'Egg-Setting Output',
      value: '322,560 Eggs / Week',
    },
    highlights: [
      'Single-Stage Setters & Hatchers (Model EIFTPC-40320 / EICTPC-40320)',
      'Unidirectional positive pressure biosecure hatchery systems AHU airflow',
      'All-in all-out biosecurity sanitation corridor design',
    ],
    timeline: 'Commissioned August 2026',
    caseStudyHref: '/news/single-stage-hatchery-bulacan-project',
  },
  {
    id: 'jala-jala-broiler-auto-harvest',
    title: 'Broiler Auto-Harvest Facility',
    clientType: 'Commercial Meat Bird Producer',
    location: 'Jala-Jala, Rizal',
    status: 'ongoing',
    statusLabel: 'Ongoing Project • Active Construction',
    category: 'Poultry Farm Equipment',
    categoryLabel: 'Broiler Auto-Harvest',
    imageUrl: '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/01-interior-steel-structure-slab.webp',
    images: [
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/01-interior-steel-structure-slab.webp',
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/02-auto-harvest-base-rail-installation.webp',
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/03-full-span-poultry-house-interior.webp',
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/04-exterior-insulated-wall-cladding.webp',
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/05-portal-frame-front-elevation.webp',
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/06-interior-floor-preparation.webp',
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/07-insulated-wall-panels-roofing.webp',
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/08-sidewall-ventilation-openings.webp',
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/09-insulated-service-door-installation.webp',
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/10-sidewall-cross-bracing-drainage.webp',
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/11-side-access-door-foundation.webp',
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/12-column-pedestal-civil-works.webp',
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/13-roof-purlin-extension-excavation.webp',
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/14-rebar-slab-and-trenching.webp',
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/15-end-bay-earthworks-grading.webp',
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/16-wall-panel-staging-interior.webp',
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/17-site-materials-and-equipment.webp',
      '/images/news/ongoing-broiler-auto-harvest-jala-jala-rizal/18-exterior-site-progress.webp',
    ],
    capacityMetric: {
      label: 'System Scope',
      value: 'Auto-Harvest Broiler Houses',
    },
    highlights: [
      'Wide-span structural steel portal framing with diagonal wind cross-bracing',
      'Insulated PU sandwich wall panels, service doors & concrete floor slabs',
      'Longitudinal floor base rail installation for automated broiler harvesting',
    ],
    timeline: 'Active On-Site Construction',
    caseStudyHref: '/news/ongoing-broiler-auto-harvest-jala-jala-rizal',
  },
  {
    id: 'gerona-tarlac-layer-solar',
    title: 'Commercial Layer Facility with Integrated Solar',
    clientType: 'Commercial Table Egg Producer',
    location: 'Gerona, Tarlac',
    status: 'ongoing',
    statusLabel: 'Ongoing Project • Structural Phase',
    category: 'Poultry Farm Equipment',
    categoryLabel: 'Layer with Solar',
    imageUrl: '/images/news/ongoing-layer-with-solar-gerona-tarlac/01-steel-columns-foundation-gerona-tarlac.webp',
    images: [
      '/images/news/ongoing-layer-with-solar-gerona-tarlac/01-steel-columns-foundation-gerona-tarlac.webp',
      '/images/news/ongoing-layer-with-solar-gerona-tarlac/02-perimeter-footing-column-erection.webp',
    ],
    capacityMetric: {
      label: 'Facility Type',
      value: 'Layer Complex + Solar PV',
    },
    highlights: [
      'Perimeter masonry retaining walls, reinforced pedestals & gravel sub-base',
      'Primary structural steel I-beam column erection across full building span',
      'Integrated design combining commercial layer housing with solar power',
    ],
    timeline: 'Civil & Steel Erection Active',
    caseStudyHref: '/news/ongoing-layer-with-solar-gerona-tarlac',
  },
];

export interface SolutionsPreviewProps {
  inquiryItems?: Product[];
  onToggleInquiry?: (product: Product) => void;
}

export const SolutionsPreview: React.FC<SolutionsPreviewProps> = () => {
  const navigate = useNavigate();

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

          {/* Section Header */}
          <div className="border-b border-[#102A43] pb-7">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                CCDI Successful & Ongoing Projects
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                High-performance turnkey solutions — inspect completed facility handovers and active on-site construction below.
              </p>
            </div>
          </div>

          {/* High-Contrast Project Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {FLAGSHIP_PROJECTS.map((project) => {
              return (
                <div
                  key={project.id}
                  className="group relative flex flex-col justify-between bg-[#07162A] border border-[#1E3E66] hover:border-[#F3A812] rounded-[2px] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/15"
                >
                    {/* ── CARD MEDIA HEADER (CAROUSEL) ── */}
                    <div className="relative w-full overflow-hidden bg-[#040D18] shrink-0">
                      <ProjectImageCarousel
                        images={project.images.length > 0 ? project.images : [project.imageUrl]}
                        alt={project.title}
                        aspectClassName="h-52 sm:h-56"
                        imageClassName="object-cover object-center brightness-[0.92] contrast-[1.08] transition-transform duration-700 group-hover:scale-105"
                        hideDots
                      >
                        {/* Dual Contrast Scrim */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07162A] via-[#07162A]/40 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />

                        {/* Status Badge (Top-Left) */}
                        <div className="absolute top-3 left-3 z-20 pointer-events-none">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm ${
                              project.status === 'completed'
                                ? 'bg-emerald-500 text-slate-950'
                                : 'bg-amber-400 text-slate-950'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full bg-slate-950 ${
                                project.status === 'completed' ? '' : 'animate-pulse'
                              }`}
                            />
                            {project.status === 'completed' ? 'Finished Project' : 'Ongoing Project'}
                          </span>
                        </div>

                        {/* Discipline Badge (Top-Right) */}
                        <div className="absolute top-3 right-3 z-20 pointer-events-none">
                          <span className="px-2 py-0.5 rounded-[2px] bg-black/60 border border-white/20 text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider backdrop-blur-xs">
                            {project.categoryLabel}
                          </span>
                        </div>

                        {/* Geographic Location Bar (Bottom of Media, leaving room for photo counter) */}
                        <div className="absolute bottom-2.5 left-3 right-24 z-10 flex items-center gap-1.5 text-xs font-mono text-slate-200 drop-shadow-md pointer-events-none">
                          <MapPin className="w-3.5 h-3.5 text-[#F3A812] shrink-0" />
                          <span className="font-semibold tracking-wide truncate">
                            {project.location}
                          </span>
                        </div>
                      </ProjectImageCarousel>
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
                  </div>
                );
              })}
          </div>

          {/* ── ACTION BAR ── */}
          <div className="border-t border-[#102A43] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs font-mono text-slate-400">
              ILOILO • JALA-JALA, RIZAL • GERONA, TARLAC • BULACAN • NATIONWIDE
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
