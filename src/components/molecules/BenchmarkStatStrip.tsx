import React from 'react';

export interface BenchmarkStatItem {
  value: string;
  label: string;
  sublabel?: string;
  highlight?: boolean;
}

export interface BenchmarkStatStripProps {
  eyebrow?: string;
  items: BenchmarkStatItem[];
  theme?: 'light' | 'dark';
  variant?: 'standard' | 'hero-card';
  className?: string;
}

export const BenchmarkStatStrip: React.FC<BenchmarkStatStripProps> = ({
  eyebrow,
  items,
  theme = 'light',
  variant = 'standard',
  className = '',
}) => {
  if (variant === 'hero-card') {
    return (
      <div
        className={`max-w-3xl bg-[#0B192C]/90 border border-[#1E3E66] rounded-[2px] py-3.5 px-4 sm:py-4 sm:px-5 backdrop-blur-xs shadow-xl ${className}`}
      >
        <div
          className={`grid grid-cols-2 ${
            items.length === 4
              ? 'sm:grid-cols-4'
              : items.length === 3
              ? 'sm:grid-cols-3'
              : 'sm:grid-cols-2'
          } gap-3.5 sm:gap-4 lg:gap-5`}
        >
          {items.map(({ value, label, sublabel, highlight }, idx) => (
            <div
              key={label || idx}
              className="border-l-2 border-amber-400 pl-2.5 sm:pl-3 flex flex-col justify-center min-w-0"
            >
              <span
                className={`text-xl sm:text-2xl font-extrabold ${
                  highlight ? 'text-amber-400' : 'text-white'
                } font-sans tracking-tight leading-none`}
              >
                {value}
              </span>
              <span className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-wider text-slate-300 font-bold mt-1 leading-snug">
                {label}
              </span>
              {sublabel && (
                <span className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                  {sublabel}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const isDark = theme === 'dark';

  const getValueSizeClass = (val: string) => {
    if (val.length >= 9) {
      return 'text-2xl sm:text-[28px] lg:text-[26px] xl:text-[28px]';
    }
    if (val.length >= 6) {
      return 'text-3xl sm:text-[34px] lg:text-[30px] xl:text-[34px]';
    }
    return 'text-3xl sm:text-4xl lg:text-[34px] xl:text-4xl';
  };

  return (
    <div className={className}>
      {eyebrow && (
        <div className="mb-6">
          <span
            className={`font-mono text-[10px] uppercase tracking-widest font-bold ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {eyebrow}
          </span>
        </div>
      )}

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          items.length === 2
            ? 'lg:grid-cols-2 max-w-3xl'
            : items.length === 3
            ? 'lg:grid-cols-3'
            : 'lg:grid-cols-4'
        } gap-6 sm:gap-8`}
      >
        {items.map(({ value, label, sublabel }, idx) => (
          <div
            key={label || idx}
            className="border-l-2 border-amber-500 pl-4 sm:pl-5 flex flex-col justify-start text-left min-w-0"
          >
            {/* Hero Value: Harmonious typography centered in uniform height container */}
            <div className="h-10 sm:h-11 flex items-center mb-2.5">
              <div
                className={`font-extrabold font-sans tracking-tight leading-none truncate max-w-full ${getValueSizeClass(
                  value
                )} ${isDark ? 'text-amber-400' : 'text-amber-600'}`}
                title={value}
              >
                {value}
              </div>
            </div>
            {/* Primary Label: Uppercase bold text */}
            <p
              className={`font-sans text-xs font-bold uppercase tracking-wider mb-1 break-words ${
                isDark ? 'text-white' : 'text-[#0B192C]'
              }`}
            >
              {label}
            </p>
            {/* Context Sublabel: Muted regular text */}
            {sublabel && (
              <p
                className={`text-xs leading-normal font-sans break-words ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {sublabel}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
