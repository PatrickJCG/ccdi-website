import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './Badge';

export interface SectionHeaderProps {
  tag: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  /** Heading level to render — defaults to h2 for proper document outline */
  level?: 2 | 3;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  title,
  description,
  align = 'center',
  className = '',
  level = 2
}) => {
  const alignClasses = align === 'center' ? 'text-center max-w-3xl mx-auto' : 'text-left max-w-2xl';
  const HeadingTag = `h${level}` as 'h2' | 'h3';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`${alignClasses} space-y-4 ${className}`}
    >
      <div>
        {/* section-tag class used by ProductCatalog for dark-mode overrides */}
        <Badge variant="sectionTag" className="section-tag">{tag}</Badge>
      </div>
      <HeadingTag className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
        {title}
        {/* Animated underline accent */}
        <span className="block mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-industrial_blue-700 via-industrial_blue-500 to-construction_gold-500 opacity-80" style={{ display: align === 'center' ? 'block' : 'block', margin: align === 'center' ? '0.5rem auto 0' : '0.5rem 0 0' }} />
      </HeadingTag>
      {description && (
        <p className="text-slate-600 text-base leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};
