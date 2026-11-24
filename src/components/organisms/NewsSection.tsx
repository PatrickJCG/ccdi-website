import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NEWS_ARTICLES } from '../../data/newsData';
import { NewsCard } from '../molecules';
import { SectionAccents } from '../atoms/ArchitecturalAccents';

export const NewsSection: React.FC = () => {
  const navigate = useNavigate();
  const displayedArticles = NEWS_ARTICLES;

  return (
    <section id="news" className="relative py-24 sm:py-32 bg-[#07162A] text-white border-b border-[#102A43] text-left font-sans overflow-hidden">
      <SectionAccents />

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

        {/* News Articles Grid */}
        <div className={`border-t border-[#102A43] pt-12 grid gap-8 ${displayedArticles.length === 2 ? 'md:grid-cols-2 max-w-5xl' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {displayedArticles.slice(0, 6).map((article) => (
            <NewsCard key={article.id} article={article} dark />
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
