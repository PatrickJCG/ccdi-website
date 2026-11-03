import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Layers,
  Egg,
  Scan,
  Activity,
  Wind,
  LayoutDashboard,
  Trash2,
  Headphones,
} from 'lucide-react';

export interface HatcherySubNavProps {
  activeTab?:
    | 'overview'
    | 'incubation'
    | 'egg-handling'
    | 'chick-handling'
    | 'hvac'
    | 'management'
    | 'waste-disposal'
    | 'after-sales';
}

const HATCHERY_TABS = [
  {
    id: 'overview',
    label: 'Overview',
    path: '/solutions/hatchery',
    icon: Layers,
  },
  {
    id: 'incubation',
    label: 'Incubation',
    path: '/solutions/hatchery/incubation',
    icon: Egg,
  },
  {
    id: 'egg-handling',
    label: 'Egg Handling & AI Candling',
    path: '/solutions/hatchery/egg-handling',
    icon: Scan,
  },
  {
    id: 'chick-handling',
    label: 'Chick Handling',
    path: '/solutions/hatchery/chick-handling',
    icon: Activity,
  },
  {
    id: 'hvac',
    label: 'Hatchery HVAC',
    path: '/solutions/hatchery/hvac',
    icon: Wind,
  },
  {
    id: 'management',
    label: 'Intelligent Management',
    path: '/solutions/hatchery/management',
    icon: LayoutDashboard,
  },
  {
    id: 'waste-disposal',
    label: 'Waste Disposal',
    path: '/solutions/hatchery/waste-disposal',
    icon: Trash2,
  },
  {
    id: 'after-sales',
    label: 'After-Sales Services',
    path: '/solutions/hatchery/after-sales',
    icon: Headphones,
  },
];

export const HatcherySubNav: React.FC<HatcherySubNavProps> = ({ activeTab }) => {
  const location = useLocation();

  const getIsActive = (tabId: string, tabPath: string) => {
    if (activeTab) return activeTab === tabId;
    if (tabPath === '/solutions/hatchery') {
      return location.pathname === '/solutions/hatchery';
    }
    return location.pathname.startsWith(tabPath);
  };

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
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">
              Hatchery Solution
            </span>
          </div>

          <nav className="flex items-center gap-1.5 sm:gap-2 shrink-0" aria-label="Hatchery Solutions Navigation">
            {HATCHERY_TABS.map((tab) => {
              const active = getIsActive(tab.id, tab.path);
              const Icon = tab.icon;

              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-[2px] font-sans text-xs tracking-wider transition-all duration-150 cursor-pointer ${
                    active
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70 font-semibold'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

      </div>
    </div>
  );
};

