import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'sectionTag' | 'productBadge' | 'speciesGreen' | 'speciesBlue' | 'certBadge' | 'metricTag';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'sectionTag',
  className = '',
  icon
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 font-semibold transition-all duration-200';

  const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
    // Section label pills — industrial blue
    sectionTag:   'text-xs uppercase tracking-widest bg-industrial_blue-50 text-industrial_blue-900 px-3.5 py-1 rounded-full border border-industrial_blue-200/90 shadow-sm font-bold',
    // Product card header badge — white glassmorphism
    productBadge: 'text-xs bg-white/95 backdrop-blur-md text-industrial_blue-900 px-3 py-1 rounded-full border border-industrial_blue-200/80 shadow-sm font-bold',
    // Facility tag — industrial blue
    speciesGreen: 'text-xs bg-industrial_blue-50 text-industrial_blue-800 px-2.5 py-1 rounded-md border border-industrial_blue-200/80 font-medium',
    // Species tag — slate
    speciesBlue:  'text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200/90 font-medium',
    // Certification badge — construction gold
    certBadge:    'text-xs bg-construction_gold-50 text-construction_gold-900 px-3 py-1 rounded-full border border-construction_gold-300/80 shadow-sm font-bold tracking-wide',
    // Metric tag — industrial blue monospace
    metricTag:    'text-xs bg-industrial_blue-50 text-industrial_blue-800 px-2.5 py-1 rounded-md border border-industrial_blue-200/80 font-mono font-bold',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {icon}
      <span>{children}</span>
    </span>
  );
};
