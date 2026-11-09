import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export type SubNavCategory = 'poultry' | 'hatchery' | 'feedmill' | 'solar';

export interface SolutionSubNavTab {
  id: string;
  label: string;
  lines?: [string, string] | [string];
  path?: string;
  hash?: string;
}

export interface SolutionCategoryConfig {
  name: string;
  shortName?: string;
  basePath: string;
  tabs: SolutionSubNavTab[];
}

export const splitTabLabel = (label: string): [string, string] | [string] => {
  const words = label.trim().split(/\s+/);
  if (words.length <= 1) return [label];
  if (words.length === 2) return [words[0], words[1]];

  const ampIdx = words.indexOf('&');
  if (ampIdx !== -1 && ampIdx < words.length - 1) {
    const line1 = words.slice(0, ampIdx + 1).join(' ');
    const line2 = words.slice(ampIdx + 1).join(' ');
    return [line1, line2];
  }

  let bestDiff = Infinity;
  let bestSplit = Math.ceil(words.length / 2);
  for (let i = 1; i < words.length; i++) {
    const l1 = words.slice(0, i).join(' ').length;
    const l2 = words.slice(i).join(' ').length;
    const diff = Math.abs(l1 - l2);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestSplit = i;
    }
  }

  return [words.slice(0, bestSplit).join(' '), words.slice(bestSplit).join(' ')];
};

export const SOLUTION_CONFIGS: Record<SubNavCategory, SolutionCategoryConfig> = {
  poultry: {
    name: 'Poultry Solution',
    shortName: 'Poultry',
    basePath: '/solutions/poultry',
    tabs: [
      { id: 'broiler', label: 'Broiler Housing', lines: ['Broiler', 'Housing'], path: '/solutions/poultry/broiler' },
      { id: 'broiler-breeder', label: 'Broiler Breeder', lines: ['Broiler', 'Breeder'], path: '/solutions/poultry/broiler-breeder' },
      { id: 'layer', label: 'Commercial Layer', lines: ['Commercial', 'Layer'], path: '/solutions/poultry/layer' },
      { id: 'accessories', label: 'Accessories & Spare Parts', lines: ['Accessories &', 'Spare Parts'], path: '/solutions/poultry/accessories' },
      { id: 'after-sales', label: 'After-Sales Services', lines: ['After-Sales', 'Services'], path: '/solutions/poultry/after-sales' },
    ],
  },
  hatchery: {
    name: 'Hatchery Solution',
    shortName: 'Hatchery',
    basePath: '/solutions/hatchery',
    tabs: [
      { id: 'incubation', label: 'Incubation System', lines: ['Incubation', 'System'], hash: '#incubation' },
      { id: 'egg-handling', label: 'Egg Handling & AI Candling', lines: ['Egg Handling &', 'AI Candling'], hash: '#egg-handling' },
      { id: 'chick-handling', label: 'Chick Handling', lines: ['Chick', 'Handling'], hash: '#chick-handling' },
      { id: 'hvac', label: 'Hatchery HVAC', lines: ['Hatchery', 'HVAC'], hash: '#hvac' },
      { id: 'management', label: 'Intelligent Management', lines: ['Intelligent', 'Management'], hash: '#management' },
      { id: 'waste-disposal', label: 'Waste Disposal', lines: ['Waste', 'Disposal'], hash: '#waste-disposal' },
      { id: 'accessories-inquiry', label: 'Accessories & Spare Parts', lines: ['Accessories &', 'Spare Parts'], hash: '#accessories-inquiry' },
      { id: 'after-sales', label: 'After-Sales Services', lines: ['After-Sales', 'Services'], hash: '#after-sales' },
    ],
  },
  feedmill: {
    name: 'Feedmill Solution',
    shortName: 'Feedmill',
    basePath: '/solutions/feedmill',
    tabs: [
      { id: 'core-process', label: 'Core Process Equipment', lines: ['Core Process', 'Equipment'], hash: '#core-process' },
      { id: 'pelleting-processing', label: 'Pelleting & Post-Pellet', lines: ['Pelleting &', 'Post-Pellet'], hash: '#pelleting-processing' },
      { id: 'cleaning-grinding-packing', label: 'Cleaning & Packing', lines: ['Cleaning &', 'Packing'], hash: '#cleaning-grinding-packing' },
      { id: 'aqua-pet-storage', label: 'Aqua Feed & Storage', lines: ['Aqua Feed &', 'Storage'], hash: '#aqua-pet-storage' },
      { id: 'accessories-inquiry', label: 'Auxiliaries & Spares', lines: ['Auxiliaries &', 'Spares'], hash: '#accessories-inquiry', path: '/solutions/feedmill/accessories' },
      { id: 'after-sales', label: 'After-Sales Services', lines: ['After-Sales', 'Services'], hash: '#after-sales' },
    ],
  },
  solar: {
    name: 'Solar Solution',
    shortName: 'Solar',
    basePath: '/solutions/solar',
    tabs: [
      { id: 'on-grid', label: 'On-Grid Solar', lines: ['On-Grid', 'Solar'], hash: '#on-grid' },
      { id: 'hybrid-storage', label: 'Hybrid Energy Storage', lines: ['Hybrid Energy', 'Storage'], hash: '#hybrid-storage' },
      { id: 'commercial-bess', label: 'Commercial & Industrial BESS', lines: ['Commercial &', 'Industrial BESS'], hash: '#commercial-bess' },
      { id: 'pv-ev-charging', label: 'Solar PV & EV Charging', lines: ['Solar PV &', 'EV Charging'], hash: '#pv-ev-charging' },
      { id: 'calculator', label: 'Solar Price Estimator', lines: ['Solar Price', 'Estimator'], path: '/solutions/solar/calculator' },
      { id: 'after-sales', label: 'After-Sales Services', lines: ['After-Sales', 'Services'], hash: '#after-sales' },
    ],
  },
};

export interface SolutionSubNavProps {
  category: SubNavCategory;
  activeTab?: string;
  className?: string;
}

export const SolutionSubNav: React.FC<SolutionSubNavProps> = ({
  category,
  activeTab,
  className = '',
}) => {
  const location = useLocation();
  const config = SOLUTION_CONFIGS[category];
  const isMainPage =
    location.pathname === config.basePath ||
    location.pathname === `${config.basePath}/`;

  const hashTabs = config.tabs.filter((t) => t.hash);
  const [currentSection, setCurrentSection] = useState<string>(activeTab || '');
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeTab) {
      setCurrentSection(activeTab);
    }
  }, [activeTab]);

  // Dynamic header offset helper (header height + dynamic 1 or 2 row subnav height)
  const getScrollOffset = () => {
    const subNavEl = document.getElementById('solution-sub-nav');
    const subNavHeight = subNavEl ? subNavEl.offsetHeight : 54;
    const navHeaderHeight = 64; // Navbar is h-16 (64px) across all viewports
    return navHeaderHeight + subNavHeight;
  };

  // Track scroll position to update active tab on pages with hash sections
  useEffect(() => {
    if (!isMainPage || hashTabs.length === 0) return;

    const sectionIds = hashTabs.map((t) => t.id);

    const handleScroll = () => {
      const scrollPos = window.scrollY + getScrollOffset() + 16;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= scrollPos) {
            setCurrentSection(id);
            return;
          }
        }
      }
      setCurrentSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMainPage, hashTabs.length]);

  // Handle hash on page load if navigated from elsewhere
  useEffect(() => {
    if (!isMainPage) return;
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const offset = getScrollOffset();
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          window.scrollTo({ top: elementRect - bodyRect - offset, behavior: 'smooth' });
          setCurrentSection(targetId);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isMainPage]);

  // Ensure active tab on mobile/compact viewports is gently kept visible in scroll container
  useEffect(() => {
    if (!currentSection || !tabsContainerRef.current) return;
    const activeEl = tabsContainerRef.current.querySelector<HTMLElement>(`[data-tab-id="${currentSection}"]`);
    if (activeEl) {
      const container = tabsContainerRef.current;
      const cLeft = container.scrollLeft;
      const cRight = cLeft + container.clientWidth;
      const tLeft = activeEl.offsetLeft;
      const tRight = tLeft + activeEl.offsetWidth;

      if (tLeft < cLeft || tRight > cRight) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
      }
    }
  }, [currentSection]);

  const handleScrollToTop = (e: React.MouseEvent) => {
    if (isMainPage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', config.basePath);
      setCurrentSection('');
    }
  };

  const handleHashClick = (e: React.MouseEvent, tabId: string) => {
    if (isMainPage) {
      e.preventDefault();
      const el = document.getElementById(tabId);
      if (el) {
        const offset = getScrollOffset();
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        window.scrollTo({ top: elementRect - bodyRect - offset, behavior: 'smooth' });
        window.history.replaceState(null, '', `${config.basePath}#${tabId}`);
        setCurrentSection(tabId);
      }
    }
  };

  const isTabActive = (tab: SolutionSubNavTab) => {
    if (activeTab) {
      if (activeTab === tab.id) return true;
      if (tab.id === 'calculator' && (activeTab === 'calculator' || activeTab === 'price-estimator')) return true;
      if ((tab.id === 'accessories' || tab.id === 'accessories-inquiry') && (activeTab === 'accessories' || activeTab === 'accessories-inquiry')) return true;
      return false;
    }
    if (tab.hash) {
      if (isMainPage) {
        return currentSection === tab.id;
      }
      return location.hash === tab.hash;
    }
    if (tab.path) {
      if (tab.path === config.basePath) {
        return isMainPage && !location.hash;
      }
      return location.pathname === tab.path || location.pathname.startsWith(`${tab.path}/`);
    }
    return false;
  };

  const getTabTarget = (tab: SolutionSubNavTab) => {
    if (isMainPage && tab.hash) {
      return tab.hash;
    }
    if (tab.path) {
      return tab.path;
    }
    return `${config.basePath}${tab.hash || ''}`;
  };

  const isHighTabCount = config.tabs.length > 6;
  const navGridClasses = isHighTabCount
    ? 'grid grid-rows-2 grid-flow-col auto-cols-max sm:auto-cols-fr xl:flex xl:flex-nowrap xl:items-stretch w-full gap-1 sm:gap-1.5 text-left'
    : 'grid grid-rows-2 grid-flow-col auto-cols-max sm:auto-cols-fr lg:flex lg:flex-nowrap lg:items-stretch w-full gap-1 sm:gap-1.5 text-left';

  return (
    <div
      id="solution-sub-nav"
      className={`sticky top-16 z-30 bg-[#07162A]/95 backdrop-blur-md border-b border-[#102A43] shadow-md py-2 sm:py-2.5 transition-all duration-200 ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2.5 sm:gap-4">
        
        {/* Left: Sector Identifier & Dynamic Nav Tabs */}
        <div className="flex items-center gap-2.5 sm:gap-4 min-w-0 w-full flex-1">
          {/* Pinned Sector Identifier (Spans full height of dynamic rows) */}
          {isMainPage ? (
            <a
              href={config.basePath}
              onClick={handleScrollToTop}
              className="self-stretch flex items-center shrink-0 pr-2.5 sm:pr-3.5 border-r border-slate-700/60 group hover:opacity-90 transition-opacity cursor-pointer focus:outline-hidden gap-1.5"
              title={`${config.name} - Back to Top`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span className="font-mono text-[11px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest group-hover:text-amber-300 transition-colors whitespace-nowrap hidden sm:inline">
                {config.name}
              </span>
              <span className="font-mono text-[11px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest group-hover:text-amber-300 transition-colors whitespace-nowrap sm:hidden">
                {config.shortName || config.name}
              </span>
            </a>
          ) : (
            <Link
              to={config.basePath}
              className="self-stretch flex items-center shrink-0 pr-2.5 sm:pr-3.5 border-r border-slate-700/60 group hover:opacity-90 transition-opacity cursor-pointer focus:outline-hidden gap-1.5"
              title={`${config.name} Overview`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span className="font-mono text-[11px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest group-hover:text-amber-300 transition-colors whitespace-nowrap hidden sm:inline">
                {config.name}
              </span>
              <span className="font-mono text-[11px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest group-hover:text-amber-300 transition-colors whitespace-nowrap sm:hidden">
                {config.shortName || config.name}
              </span>
            </Link>
          )}

          {/* Dynamic Tabs Navigation: Balanced 2-Row / 1-Row Responsive Grid */}
          <div
            ref={tabsContainerRef}
            className="min-w-0 w-full flex-1 overflow-x-auto no-scrollbar py-0.5"
          >
            <nav
              className={navGridClasses}
              aria-label={`${config.name} Navigation`}
            >
              {config.tabs.map((tab) => {
                const active = isTabActive(tab);
                const isHashLink = isMainPage && !!tab.hash;
                const target = getTabTarget(tab);
                const lines = tab.lines || splitTabLabel(tab.label);
                const isMultiLine = lines.length > 1;

                const tabClassName = `group relative px-2.5 sm:px-3 py-1.5 sm:py-2 min-h-[40px] sm:min-h-[44px] rounded-[3px] font-sans transition-all duration-150 cursor-pointer text-left flex flex-col justify-center flex-1 min-w-[110px] sm:min-w-0 w-full ${
                  active
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/40 hover:bg-slate-800/80 text-slate-300 hover:text-white border border-slate-800/80 hover:border-slate-700/80 font-medium'
                }`;

                const content = (
                  <span className="flex flex-col text-left leading-[1.25] w-full min-w-0">
                    <span className="truncate text-[11px] sm:text-xs font-bold tracking-tight sm:tracking-normal">
                      {lines[0]}
                    </span>
                    {isMultiLine && lines[1] ? (
                      <span
                        className={`truncate text-[10.5px] sm:text-[11.5px] font-semibold mt-0.5 ${
                          active ? 'text-slate-950/90' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        {lines[1]}
                      </span>
                    ) : null}
                  </span>
                );

                return isHashLink ? (
                  <a
                    key={tab.id}
                    data-tab-id={tab.id}
                    href={target}
                    onClick={(e) => handleHashClick(e, tab.id)}
                    className={tabClassName}
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    key={tab.id}
                    data-tab-id={tab.id}
                    to={target}
                    className={tabClassName}
                  >
                    {content}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

      </div>
    </div>
  );
};
