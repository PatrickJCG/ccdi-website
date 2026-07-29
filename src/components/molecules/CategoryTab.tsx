import React from 'react';
import { motion } from 'framer-motion';
import { Grid, Bird, ShieldCheck, FlaskConical, Sparkles, Boxes } from 'lucide-react';

export interface CategoryTabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  layoutId?: string;
  count?: number;
}

export const CategoryTab: React.FC<CategoryTabProps> = ({
  label,
  isActive,
  onClick,
  layoutId = "activeCatalogTab",
  count
}) => {
  const getCategoryIcon = (category: string) => {
    const norm = category.toLowerCase();
    if (norm.includes('poultry'))     return <Bird         className="w-4 h-4 text-amber-400" />;
    if (norm.includes('hatchery'))    return <ShieldCheck  className="w-4 h-4 text-blue-300" />;
    if (norm.includes('feedmill'))    return <Boxes        className="w-4 h-4 text-blue-300" />;
    if (norm.includes('solar'))       return <Sparkles     className="w-4 h-4 text-amber-400" />;
    if (norm.includes('facility') || norm.includes('design'))  return <ShieldCheck className="w-4 h-4 text-amber-400" />;
    if (norm.includes('civil') || norm.includes('structural')) return <Boxes       className="w-4 h-4 text-blue-300" />;
    if (norm.includes('equipment') || norm.includes('automation')) return <Sparkles  className="w-4 h-4 text-amber-400" />;
    if (norm.includes('renewable'))   return <FlaskConical className="w-4 h-4 text-amber-400" />;
    return <Grid className="w-4 h-4" />;
  };

  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
      className={[
        'relative px-3.5 py-2 min-h-[40px] sm:min-h-[44px] rounded-full text-xs sm:text-sm font-semibold',
        'transition-all duration-200 flex items-center gap-2 touch-manipulation',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        isActive
          ? 'text-white shadow-md'
          : [
              'text-slate-300 hover:text-white',
              'bg-white/8 hover:bg-white/14',
              'border border-white/12 hover:border-amber-400/50',
              'backdrop-blur-sm',
            ].join(' '),
      ].join(' ')}
    >
      {/* Active pill background */}
      {isActive && (
        <motion.div
          layoutId={layoutId}
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #102A43 0%, #243B53 60%, #334E68 100%)',
            boxShadow: '0 0 20px -4px rgba(16,42,67,0.7), 0 4px 12px -2px rgba(16,42,67,0.4)',
          }}
          transition={{ type: "spring", stiffness: 450, damping: 35 }}
        />
      )}

      <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
        {getCategoryIcon(label)}
        <span>{label}</span>
        {count !== undefined && (
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
            isActive ? 'bg-white/25 text-white' : 'bg-white/10 text-slate-300'
          }`}>
            {count}
          </span>
        )}
      </span>
    </button>
  );
};
