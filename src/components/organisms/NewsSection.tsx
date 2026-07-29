import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_NEWS } from '../../data/mockProducts';
import { SectionHeader, Button } from '../atoms';
import { NewsCard } from '../molecules';
import { ArrowRight } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="news" className="relative py-16 sm:py-20 bg-white border-b border-slate-200/60 overflow-hidden bg-grid-pattern">
      {/* Ambient glow animations */}
      <div className="absolute top-10 right-20 w-80 h-80 bg-industrial_blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none animate-float-reverse" aria-hidden />
      <div className="absolute bottom-10 left-20 w-80 h-80 bg-agro_green-500/10  rounded-full blur-3xl -z-10 pointer-events-none animate-pulse-glow" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <SectionHeader
          tag="Projects & News"
          title="Latest Projects, Infrastructure & Industry Updates"
          description="Stay informed on CCDI's latest facility developments, engineering breakthroughs, and agro-industrial project milestones."
          className="mb-10 sm:mb-12"
        />

        {/* 3 News Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_NEWS.slice(0, 3).map((article, idx) => (
            <NewsCard key={article.id} article={article} delay={idx * 0.1} />
          ))}
        </div>

        {/* View All Updates CTA */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <Button
            variant="ghost"
            href="/news"
            onClick={(e) => {
              e.preventDefault();
              navigate('/news');
            }}
            icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />}
            className="group !text-industrial_blue-900 hover:!bg-industrial_blue-50 border border-industrial_blue-300/60 hover:border-industrial_blue-500 font-bold"
          >
            View All Updates
          </Button>
        </div>

      </div>
    </section>
  );
};

