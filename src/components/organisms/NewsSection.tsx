import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MOCK_NEWS } from '../../data/mockProducts';
import { NewsCard } from '../molecules';

export const NewsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="news" className="relative py-24 sm:py-32 bg-[#07162A] text-white border-b border-[#102A43] text-left font-sans overflow-hidden">
      {/* Architectural Accent 2 - Top Left Anchored (Fades in downwards on view) */}
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

      {/* Architectural Dynamic Accent Graphic - Bottom Right Anchored (Fades in upwards on view) */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
            CCDI / PRESS & PROJECT INSIGHTS
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Latest agro-industrial infrastructure updates.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Stay informed on CCDI's latest facility developments, engineering breakthroughs, and agro-industrial project milestones across the Philippines.
          </p>
        </div>

        {/* 3 News Articles Grid (Sharp 2px Corners, Dark Navy Cards) */}
        <div className="border-t border-[#102A43] pt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_NEWS.slice(0, 3).map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>

        {/* View All Updates CTA */}
        <div className="border-t border-[#102A43] pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-xs text-slate-400">
            TECHNICAL BRIEFS • PROJECT LAUNCHES • INDUSTRY ANALYSIS
          </p>

          <button
            type="button"
            onClick={() => navigate('/news')}
            className="px-6 py-3 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors"
          >
            View All Press & Projects →
          </button>
        </div>

      </div>
    </section>
  );
};
