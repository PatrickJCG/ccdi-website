import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Headphones, Layers } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface CategorySubNavTab {
  id: string;
  label: string;
  path: string;
  icon?: LucideIcon;
}

export interface CategorySubNavProps {
  categoryName: string;
  basePath: string;
  activeTab?: 'systems' | 'after-sales' | 'calculator' | string;
  systemLabel?: string;
  afterSalesLabel?: string;
  systemIcon?: LucideIcon;
  afterSalesIcon?: LucideIcon;
  accentColor?: 'amber' | 'sky';
  extraTabs?: CategorySubNavTab[];
}

export const CategorySubNav: React.FC<CategorySubNavProps> = ({
  categoryName,
  basePath,
  activeTab,
  systemLabel = 'Systems & Solutions',
  afterSalesLabel = 'After-Sales Services',
  systemIcon: SystemIcon = Layers,
  afterSalesIcon: AfterSalesIcon = Headphones,
  accentColor = 'amber',
  extraTabs = [],
}) => {
  const location = useLocation();

  const isAfterSales = activeTab === 'after-sales' || location.pathname.endsWith('/after-sales');
  const isExtraTabActive = (tab: CategorySubNavTab) =>
    activeTab === tab.id || location.pathname === tab.path || location.pathname.startsWith(tab.path);
  const isSystems =
    activeTab === 'systems' ||
    (!isAfterSales && !extraTabs.some((t) => isExtraTabActive(t)) && (location.pathname === basePath || location.pathname === `${basePath}/`));

  const afterSalesPath = `${basePath}/after-sales`;

  const pulseColor = accentColor === 'sky' ? 'bg-sky-400' : 'bg-amber-400';
  const textAccent = accentColor === 'sky' ? 'text-sky-400' : 'text-amber-400';
  const activeBg = accentColor === 'sky' ? 'bg-sky-400 text-slate-950' : 'bg-amber-400 text-slate-950';

  return (
    <div className="sticky top-16 sm:top-[72px] z-30 bg-[#07162A]/95 backdrop-blur-md border-b border-[#102A43] shadow-md py-2 sm:py-2.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Left: Sector Identifier & Sub-Nav Tabs */}
        <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto no-scrollbar py-0.5">
          <div className="hidden lg:flex items-center gap-2.5 shrink-0 pr-3 border-r border-slate-700/60">
            <img
              src="/images/branding/ccdi-logo.png"
              alt="CCDI"
              className="h-5 sm:h-6 w-auto object-contain"
            />
            <span className={`w-2 h-2 rounded-full ${pulseColor} animate-pulse`} />
            <span className={`font-mono text-xs font-bold ${textAccent} uppercase tracking-widest`}>
              {categoryName}
            </span>
          </div>

          <nav className="flex items-center gap-1.5 sm:gap-2 shrink-0" aria-label={`${categoryName} Navigation`}>
            {/* Tab 1: Systems */}
            <Link
              to={basePath}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] font-sans text-xs tracking-wider transition-all duration-150 cursor-pointer ${
                isSystems
                  ? `${activeBg} font-bold shadow-xs`
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70 font-semibold'
              }`}
            >
              <SystemIcon className={`w-3.5 h-3.5 shrink-0 ${isSystems ? 'text-slate-950' : 'text-slate-400'}`} />
              <span>{systemLabel}</span>
            </Link>

            {/* Extra Custom Tabs (e.g., Solar Price Calculator) */}
            {extraTabs.map((tab) => {
              const TabIcon = tab.icon || Layers;
              const isActive = isExtraTabActive(tab);
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] font-sans text-xs tracking-wider transition-all duration-150 cursor-pointer ${
                    isActive
                      ? `${activeBg} font-bold shadow-xs`
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70 font-semibold'
                  }`}
                >
                  <TabIcon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </Link>
              );
            })}

            {/* Tab: After-Sales Services */}
            <Link
              to={afterSalesPath}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] font-sans text-xs tracking-wider transition-all duration-150 cursor-pointer ${
                isAfterSales
                  ? `${activeBg} font-bold shadow-xs`
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70 font-semibold'
              }`}
            >
              <AfterSalesIcon className={`w-3.5 h-3.5 shrink-0 ${isAfterSales ? 'text-slate-950' : 'text-slate-400'}`} />
              <span>{afterSalesLabel}</span>
            </Link>
          </nav>
        </div>

      </div>
    </div>
  );
};
