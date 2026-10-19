import React from 'react';

export interface BenchmarkStatItem {
  value: string;
  label: string;
  sublabel?: string;
}

export interface BenchmarkStatStripProps {
  eyebrow?: string;
  items: BenchmarkStatItem[];
  theme?: 'light' | 'dark';
  className?: string;
}

export const BenchmarkStatStrip: React.FC<BenchmarkStatStripProps> = ({
  eyebrow,
  items,
  theme = 'light',
  className = '',
}) => {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
