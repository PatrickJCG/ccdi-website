import React from 'react';
import { Link } from 'react-router-dom';
import type { NewsArticle } from '../../data/mockProducts';

export interface NewsCardProps {
  article: NewsArticle;
  delay?: number;
  dark?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, dark = false }) => {
  return (
    <article
      className={[
        'rounded-[2px] border overflow-hidden transition-colors flex flex-col h-full group text-left font-sans',
        dark
          ? 'bg-[#0B192C] border-[#102A43] hover:border-amber-400/50 text-white'
          : 'bg-white border-slate-200 hover:border-[#0B192C] text-slate-900',
      ].join(' ')}
    >
      {/* Image & Category Tag */}
      <Link
        to={`/news/${article.id}`}
        className={`relative h-48 overflow-hidden block border-b ${dark ? 'bg-[#07162A] border-[#102A43]' : 'bg-slate-100 border-slate-200'}`}
      >
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out grayscale-[15%] contrast-[1.05]"
        />
        <div className="absolute top-2 left-2">
          <span className="font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-[2px] bg-[#07162A]/90 text-amber-400 border border-amber-400/40">
            {article.category}
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow space-y-3">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-slate-500">
          <span>{article.date}</span>
          {article.readTime && (
            <>
              <span>•</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{article.readTime}</span>
            </>
          )}
        </div>

        <Link
          to={`/news/${article.id}`}
          className={`block transition-colors ${dark ? 'group-hover:text-amber-400 text-white' : 'group-hover:text-amber-600 text-[#0B192C]'}`}
        >
          <h3 className="text-lg font-bold tracking-tight leading-snug line-clamp-2">
            {article.title}
          </h3>
        </Link>

        <p className={`text-xs leading-relaxed flex-grow line-clamp-3 font-normal ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
          {article.summary}
        </p>

        <div className={`pt-3 border-t mt-auto ${dark ? 'border-[#102A43]' : 'border-slate-100'}`}>
          <Link
            to={`/news/${article.id}`}
            className="font-mono text-xs uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Read Article</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};
