import React from 'react';
import { Link } from 'react-router-dom';
import type { NewsArticle } from '../../data/mockProducts';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '../atoms';

export interface NewsCardProps {
  article: NewsArticle;
  delay?: number;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, delay = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6, scale: 1.015 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-industrial_blue-300 transition-shadow duration-300 flex flex-col h-full group"
    >
      {/* Image & Category Tag */}
      <Link to={`/news/${article.id}`} className="relative h-48 overflow-hidden bg-slate-100 block">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="speciesBlue">
            {article.category}
          </Badge>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-2">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-industrial_blue-500 shrink-0" />
            {article.date}
          </span>
          {article.readTime && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                {article.readTime}
              </span>
            </>
          )}
        </div>

        <Link to={`/news/${article.id}`} className="block group-hover:text-industrial_blue-500 transition-colors">
          <h3 className="text-xl font-extrabold text-slate-900 font-heading mb-3 line-clamp-2">
            {article.title}
          </h3>
        </Link>

        <p className="text-sm text-slate-600 leading-relaxed flex-grow mb-6 line-clamp-3">
          {article.summary}
        </p>

        <Link
          to={`/news/${article.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-industrial_blue-500 group-hover:text-industrial_blue-700 transition-colors mt-auto"
        >
          <span>Read Full Article</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
        </Link>
      </div>
    </motion.article>
  );
};

