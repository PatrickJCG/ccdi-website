import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  ArrowRight,
  AlertTriangle,
  Layers,
  Factory,
  Sun,
  Egg,
  Briefcase,
  Newspaper,
  ChevronRight,
} from 'lucide-react';

const QUICK_LINKS = [
  {
    title: 'The Poultry Solution',
    category: 'BROILER • BREEDER • LAYER',
    path: '/solutions/poultry',
    icon: <Layers className="w-5 h-5 text-amber-400" />,
    desc: 'Climate-controlled broiler houses, parent stock breeding, and vertical layer cages.',
  },
  {
    title: 'Automated Feedmills',
    category: 'PROCESSING TOWERS',
    path: '/solutions/feedmill',
    icon: <Factory className="w-5 h-5 text-amber-400" />,
    desc: 'High-throughput pelleting towers, bucket elevators, and bulk grain storage silos.',
  },
  {
    title: 'Commercial Hatcheries',
    category: 'INCUBATION ENVELOPES',
    path: '/solutions/hatchery',
    icon: <Egg className="w-5 h-5 text-amber-400" />,
    desc: 'Turnkey setter and hatcher halls with biosecure cleanroom HVAC airflow.',
  },
  {
    title: 'Solar PV Microgrids',
    category: 'RENEWABLE ENERGY',
    path: '/solutions/solar',
    icon: <Sun className="w-5 h-5 text-amber-400" />,
    desc: 'Commercial rooftop solar arrays and hybrid generator synchronization.',
  },
  {
    title: 'Careers & Engineering',
    category: 'JOIN THE TEAM',
    path: '/careers',
    icon: <Briefcase className="w-5 h-5 text-amber-400" />,
    desc: 'Explore open opportunities in Civil, Mechanical, Electrical, and Sales.',
  },
  {
    title: 'News & Updates',
    category: 'PRESS & INSIGHTS',
    path: '/news',
    icon: <Newspaper className="w-5 h-5 text-amber-400" />,
    desc: 'Latest facility handovers, engineering milestones, and technical briefs.',
  },
];

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#07162A] text-white font-sans text-left overflow-hidden">
      
      {/* ── HERO BANNER ────────────────────────────────────────── */}
      <section className="relative pt-12 pb-20 sm:pb-28 border-b border-[#102A43] overflow-hidden">
        {/* Background Accents & Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Architectural Accent 2 - Top Left Anchored */}
        <motion.div
          initial={{ opacity: 0, y: -45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-12 -left-16 sm:-top-8 sm:left-0 w-80 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0"
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
          className="absolute -bottom-16 -right-16 sm:-right-8 sm:bottom-0 w-80 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <img
            src="/images/accents/dark-accent-graphic.png"
            alt=""
            className="w-full h-auto object-contain opacity-30"
          />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link to="/" className="hover:text-amber-400 transition-colors">HOME</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-amber-400 font-bold">ERROR 404</span>
          </nav>

          <div className="max-w-3xl space-y-6">
            {/* Status Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>STATUS 404 / RESOURCE NOT FOUND</span>
            </div>

            {/* Giant Monospace 404 Watermark */}
            <div className="space-y-2">
              <span className="font-mono text-7xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-slate-600 block select-none leading-none">
                404
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Infrastructure Route Not Located
              </h1>
            </div>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
              The requested blueprint or specification URL does not exist or has been relocated within our agro-industrial directory. Please verify the web address or navigate using the core engineering divisions below.
            </p>

            {/* Call to Action Navigation */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[2px] font-sans text-xs uppercase tracking-wider font-extrabold bg-[#F3A812] hover:bg-amber-300 text-slate-950 transition-colors shadow-md"
              >
                <Home className="w-4 h-4" />
                <span>Return to Homepage</span>
              </Link>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[2px] font-mono text-xs uppercase tracking-wider font-bold bg-[#0B192C] hover:bg-[#1E3E66] text-white border border-[#1E3E66] hover:border-amber-400/60 transition-colors shadow-sm cursor-pointer"
              >
                <span>← Previous Page</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK NAVIGATION DIRECTORY ───────────────────────────── */}
      <section className="relative py-16 sm:py-24 bg-[#040D18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="border-b border-[#102A43] pb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#F3A812] font-bold block mb-1">
                DIRECTORY DISCOVERY
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Core Agro-Industrial Solutions
              </h2>
            </div>
            <p className="font-mono text-xs text-slate-400">
              EXPLORE ACTIVE INFRASTRUCTURE DIVISIONS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="bg-[#0B192C] border border-[#1E3E66] hover:border-[#F3A812] p-6 rounded-[2px] space-y-4 transition-all duration-200 group flex flex-col justify-between shadow-sm hover:shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-[2px] bg-[#07162A] border border-[#1E3E66] flex items-center justify-center group-hover:border-amber-400/60 transition-colors">
                      {link.icon}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#F3A812] font-bold">
                      {link.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors tracking-tight">
                    {link.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {link.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#102A43] flex items-center justify-between font-mono text-xs uppercase tracking-wider font-bold text-amber-400 group-hover:text-amber-300">
                  <span>Access Division</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
