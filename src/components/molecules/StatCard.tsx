import React from 'react';
import { AnimatedCounter } from './AnimatedCounter';

export interface StatCardProps {
  value: string;
  label: string;
  sublabel?: string;
  theme?: 'light' | 'dark';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  sublabel,
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`border-l-2 border-amber-500 pl-5 flex flex-col justify-start text-left ${className}`}
    >
      {/* Hero Stat Value: Monumental font-extrabold typography */}
      <div
        className={`text-4xl sm:text-5xl font-extrabold font-sans tracking-tight leading-none mb-3 ${
          isDark ? 'text-amber-400' : 'text-amber-600'
        }`}
      >
        <AnimatedCounter value={value} duration={2.0} />
      </div>

      {/* Primary Label: Uppercase bold text */}
      <p
        className={`font-sans text-xs font-bold uppercase tracking-wider mb-1 ${
          isDark ? 'text-white' : 'text-[#0B192C]'
        }`}
      >
        {label}
      </p>

      {/* Context Sublabel: Muted regular text */}
      {sublabel && (
        <p
          className={`text-xs leading-normal font-sans ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {sublabel}
        </p>
      )}
    </div>
  );
};
