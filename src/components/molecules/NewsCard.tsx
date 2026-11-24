import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, MapPin } from 'lucide-react';
import type { NewsArticle } from '../../data/newsData';
import { ProjectImageCarousel } from './ProjectImageCarousel';
import { DarkAccentGraphic } from '../atoms/ArchitecturalAccents';

export interface NewsCardProps {
  article: NewsArticle;
  delay?: number;
  dark?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, dark = true }) => {
  const carouselImages =
    article.galleryImages && article.galleryImages.length > 0
      ? article.galleryImages
      : [article.imageUrl];

  const isFinished = article.projectStatus === 'Finished Project';

  return (
    <article
      className={[
        'group relative flex flex-col justify-between rounded-[2px] overflow-hidden transition-all duration-300 h-full text-left font-sans',
        dark
          ? 'bg-[#07162A] border border-[#1E3E66] hover:border-[#F3A812] hover:shadow-2xl hover:shadow-amber-500/15'
          : 'bg-white border border-slate-200 hover:border-[#0B192C] text-slate-900 shadow-sm hover:shadow-lg',
      ].join(' ')}
    >
      {/* ── CARD MEDIA HEADER (CAROUSEL) ── */}
      <Link
        to={`/news/${article.id}`}
        className={`relative w-full overflow-hidden block shrink-0 ${dark ? 'bg-[#040D18]' : 'bg-slate-100'}`}
      >
        <ProjectImageCarousel
          images={carouselImages}
          alt={article.title}
          aspectClassName="h-52 sm:h-56"
          imageClassName="object-cover object-center brightness-[0.92] contrast-[1.08] transition-transform duration-700 group-hover:scale-105"
          hideDots
        >
          {dark && (
            <>
              {/* Dual Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07162A] via-[#07162A]/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />
            </>
          )}

          {/* Top-Left Status / Category Overlay */}
          {(article.projectStatus || article.category !== 'Project Milestone') && (
            <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center gap-1.5 pointer-events-none">
              {article.projectStatus && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-[#07162A]/80 border border-white/15 backdrop-blur-sm text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-100">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${isFinished ? 'bg-slate-300' : 'bg-amber-400'
                      }`}
                  />
                  {article.projectStatus}
                </span>
              )}
              {article.category !== 'Project Milestone' && (
                <span className="px-2.5 py-0.5 rounded-[2px] bg-[#07162A]/80 border border-white/15 backdrop-blur-sm text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-200">
                  {article.category}
                </span>
              )}
            </div>
          )}

          {/* Date & Read Time Strip (Bottom-Left of Media, leaving room for photo counter) */}
          <div className="absolute bottom-2.5 left-3 right-24 z-10 flex items-center gap-2 text-xs font-mono text-slate-200 drop-shadow-md pointer-events-none">
            <Calendar className="w-3.5 h-3.5 text-[#F3A812] shrink-0" />
            <span className="font-semibold tracking-wide truncate">
              {article.date}
            </span>
            {article.readTime && (
              <>
                <span className="text-slate-400">•</span>
                <span className="text-amber-400 font-bold shrink-0">{article.readTime}</span>
              </>
            )}
          </div>
        </ProjectImageCarousel>
      </Link>

      {/* ── CARD BODY ── */}
      <div
        className={`relative p-5 sm:p-6 flex flex-col justify-between flex-grow space-y-4 overflow-hidden ${dark ? 'bg-[#07162A]' : 'bg-white'
          }`}
      >
        {dark && (
          <DarkAccentGraphic className="absolute -right-3 top-2 w-32 h-auto object-contain object-right opacity-20 z-0" />
        )}

        <div className="relative z-10 space-y-2.5">
          {article.location && (
            <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{article.location}</span>
            </div>
          )}

          <Link to={`/news/${article.id}`}>
            <h3
              className={`font-sans text-lg sm:text-xl font-extrabold tracking-tight transition-colors leading-snug line-clamp-2 ${dark
                  ? 'text-white group-hover:text-[#F3A812]'
                  : 'text-[#0B192C] group-hover:text-amber-600'
                }`}
            >
              {article.title}
            </h3>
          </Link>
          <p
            className={`text-xs sm:text-sm leading-relaxed font-normal line-clamp-3 ${dark ? 'text-slate-300' : 'text-slate-600'
              }`}
          >
            {article.summary}
          </p>
        </div>

        {/* ── FOOTER ACTION ── */}
        <div
          className={`relative z-10 border-t pt-3.5 mt-auto ${dark ? 'border-[#102A43]' : 'border-slate-100'
            }`}
        >
          <Link
            to={`/news/${article.id}`}
            className={
              dark
                ? 'w-full py-2.5 px-3 rounded-[2px] bg-[#000] hover:bg-[#F3A812] text-white hover:text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-[#1E3E66] hover:border-[#F3A812] flex items-center justify-between cursor-pointer group/btn'
                : 'font-mono text-xs uppercase tracking-wider font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1.5 transition-colors'
            }
          >
            <span>Read Full Article</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};
