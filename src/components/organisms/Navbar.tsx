import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface NavbarProps {
  inquiryCount?: number;
}

export interface SubCategory {
  name: string;
  path: string;
}

export interface SolutionCategoryItem {
  name: string;
  shortName: string;
  path: string;
  desc: string;
  subCategories?: SubCategory[];
}

const SOLUTION_CATEGORIES: SolutionCategoryItem[] = [
  {
    name: 'Poultry Solution',
    shortName: 'Poultry Solution',
    path: '/solutions/poultry',
    desc: 'Broiler, Breeder & Layer climate housing, feeding automation & prefabricated building components',
    subCategories: [
      { name: 'Broiler', path: '/solutions/poultry/broiler' },
      { name: 'Broiler Breeder', path: '/solutions/poultry/broiler-breeder' },
      { name: 'Layer', path: '/solutions/poultry/layer' },
      { name: 'Retrofitting & Modernization', path: '/solutions/poultry/retrofitting' },
      { name: 'Accessories & Spare Parts', path: '/solutions/poultry/accessories' },
      { name: 'After-Sales Services', path: '/solutions/poultry/after-sales' },
    ],
  },
  {
    name: 'Hatchery Solutions',
    shortName: 'Hatchery',
    path: '/solutions/hatchery',
    desc: 'CCDI brings together incubation, automation, HVAC, supporting systems, and digital management into one coordinated hatchery operation.',
    subCategories: [
      { name: 'Incubation', path: '/solutions/hatchery#incubation' },
      { name: 'Egg Handling & AI Candling', path: '/solutions/hatchery#egg-handling' },
      { name: 'Chick Handling', path: '/solutions/hatchery#chick-handling' },
      { name: 'Hatchery HVAC', path: '/solutions/hatchery#hvac' },
      { name: 'Intelligent Management', path: '/solutions/hatchery#management' },
      { name: 'Waste Disposal', path: '/solutions/hatchery#waste-disposal' },
      { name: 'Accessories & Catalog', path: '/solutions/hatchery#accessories-inquiry' },
      { name: 'After-Sales Services', path: '/solutions/hatchery#after-sales' },
    ],
  },
  {
    name: 'Feedmill Solutions',
    shortName: 'Feedmill',
    path: '/solutions/feedmill',
    desc: 'CCDI brings together raw material receiving, grinding, precision mixing, conditioning, pelleting, and automated packing into one coordinated feed production operation.',
    subCategories: [
      { name: 'Process Flow', path: '/solutions/feedmill#process-flow' },
      { name: 'Core Process Equipment', path: '/solutions/feedmill#core-process' },
      { name: 'Pelleting & Post-Pellet', path: '/solutions/feedmill#pelleting-processing' },
      { name: 'Cleaning & Packing', path: '/solutions/feedmill#cleaning-grinding-packing' },
      { name: 'Aqua Feed & Storage', path: '/solutions/feedmill#aqua-pet-storage' },
      { name: 'Auxiliaries & Spare Parts', path: '/solutions/feedmill/accessories' },
      { name: 'After-Sales Services', path: '/solutions/feedmill#after-sales' },
    ],
  },
  {
    name: 'Solar Systems',
    shortName: 'Solar Systems',
    path: '/solutions/solar',
    desc: 'Commercial & residential rooftop PV, hybrid battery storage & microgrids',
    subCategories: [
      { name: 'On-Grid Solar', path: '/solutions/solar#on-grid' },
      { name: 'Hybrid Energy Storage', path: '/solutions/solar#hybrid-storage' },
      { name: 'Commercial & Industrial BESS', path: '/solutions/solar#commercial-bess' },
      { name: 'Solar PV & EV Charging', path: '/solutions/solar#pv-ev-charging' },
      { name: 'Solar Price Estimator', path: '/solutions/solar/calculator' },
      { name: 'After-Sales Services', path: '/solutions/solar#after-sales' },
    ],
  },
];

const NAV_LINKS = [
  { name: 'HOME',           path: '/',          hash: '' },
  { name: 'ABOUT US',       path: '/',          hash: '#about' },
  { name: 'OUR SOLUTIONS',  path: '/solutions', hash: '', isDropdown: true },
  { name: 'CAREERS',        path: '/careers',   hash: '' },
  { name: 'NEWS & UPDATES', path: '/news',      hash: '' },
  { name: 'CONTACT',        path: '',           hash: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ inquiryCount: _inquiryCount }) => {
  const [isOpen, setIsOpen]                           = useState(false);
  const [activeSection, setActiveSection]             = useState('home');
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate  = useNavigate();
  const location  = useLocation();

  // Active section tracking
  useEffect(() => {
    if (location.pathname.startsWith('/solutions') || location.pathname === '/products') {
      setActiveSection('solutions'); return;
    }
    if (location.pathname === '/careers') {
      setActiveSection('careers'); return;
    }
    if (location.pathname === '/news' || location.pathname.startsWith('/news')) {
      setActiveSection('news'); return;
    }
    if (location.pathname !== '/') { setActiveSection(''); return; }

    const SECTION_IDS = ['home', 'about', 'contact'];

    const getActiveSection = () => {
      const triggerY = window.scrollY + window.innerHeight * 0.4;
      let current = 'home';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= triggerY) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    getActiveSection();
    window.addEventListener('scroll', getActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', getActiveSection);
  }, [location.pathname]);

  // Body scroll lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Click outside to close desktop dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSolutionsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnterDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSolutionsDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setSolutionsDropdownOpen(false);
    }, 150);
  };

  const toggleSolutionsDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSolutionsDropdownOpen((prev) => !prev);
  };

  const handleNavClick = (e: React.MouseEvent, path: string, hash: string = '') => {
    e.preventDefault();
    setIsOpen(false);
    setSolutionsDropdownOpen(false);

    let targetPath = path;
    let targetHash = hash;

    if (path.includes('#')) {
      const parts = path.split('#');
      targetPath = parts[0];
      targetHash = '#' + parts[1];
    }

    if (targetHash) {
      const targetId = targetHash.replace('#', '');
      const isCurrentPage =
        location.pathname === targetPath ||
        (!targetPath && location.pathname === '/');

      if (isCurrentPage) {
        if (targetId === 'overview' || targetId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.history.replaceState(null, '', targetPath);
          return;
        }

        const element = document.getElementById(targetId);
        if (element) {
          const offset = 72;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const offsetPosition = elementRect - bodyRect - offset;
          window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
          window.history.replaceState(null, '', targetPath + targetHash);
          return;
        }
      }
      navigate(targetPath + targetHash);
      return;
    }

    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    }
  };

  const isLinkActive = (link: (typeof NAV_LINKS)[0]) => {
    if (link.isDropdown) return activeSection === 'solutions';
    if (link.path === '/careers') return activeSection === 'careers';
    if (link.path === '/news') return activeSection === 'news';
    if (link.path === '/' && !link.hash) return activeSection === 'home';
    if (link.hash) return activeSection === link.hash.replace('#', '');
    return false;
  };

  return (
    <>
      {/* ── STICKY MAIN HEADER (LIGHT THEME, GOLD ACCENT, SHARP 2PX CORNERS) ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 xl:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <a
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-amber-500 py-1"
              aria-label="Clarkbase Construction Development Inc. Home"
            >
              <img
                src="/images/branding/ccdi-landscape-logo.svg"
                alt="Clarkbase Construction Development Inc."
                draggable={false}
                className="h-8 sm:h-8.5 lg:h-7.5 xl:h-9 2xl:h-10 w-auto object-contain shrink-0"
              />
            </a>

            {/* ── Desktop Nav: Plus Jakarta Sans, Sharp Corners, Gold Focus ── */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link);

                if (link.isDropdown) {
                  return (
                    <div
                      key={link.name}
                      ref={dropdownRef}
                      className="relative"
                      onMouseEnter={handleMouseEnterDropdown}
                      onMouseLeave={handleMouseLeaveDropdown}
                    >
                      <button
                        type="button"
                        onClick={toggleSolutionsDropdown}
                        className={`px-2 xl:px-3 py-1.5 rounded-[2px] font-sans text-xs tracking-wider whitespace-nowrap transition-all duration-150 flex items-center gap-1 cursor-pointer shrink-0 ${
                          active
                            ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold'
                        }`}
                        aria-expanded={solutionsDropdownOpen}
                        aria-haspopup="true"
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            solutionsDropdownOpen ? 'rotate-180 text-slate-950' : 'text-slate-400'
                          }`}
                        />
                      </button>

                      {/* Desktop Solutions Dropdown — 4-Column Mega Menu */}
                      <AnimatePresence>
                        {solutionsDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                            /* Mega-menu: anchored to the header's left padding edge, full container width */
                            className="fixed left-0 right-0 mt-1.5 bg-white border-b border-slate-200 shadow-2xl z-50"
                            style={{ top: '64px' }}
                          >
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                              {/* Top bar label */}
                              <div className="py-2.5 border-b border-slate-100 flex items-center justify-between">
                                <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                  Our Solutions
                                </span>
                                <a
                                  href="/solutions"
                                  onClick={(e) => handleNavClick(e, '/solutions')}
                                  className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 hover:text-amber-800 transition-colors group"
                                >
                                  <Layers className="w-3 h-3 shrink-0" />
                                  <span>View All Solutions</span>
                                  <ArrowRight className="w-3 h-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
                                </a>
                              </div>

                              {/* 4-Column Grid */}
                              <div className="grid grid-cols-4 gap-0 py-5">
                                {SOLUTION_CATEGORIES.map((cat, idx) => (
                                  <div
                                    key={cat.path}
                                    className={`flex flex-col gap-3 px-5 ${idx < SOLUTION_CATEGORIES.length - 1 ? 'border-r border-slate-100' : ''}`}
                                  >
                                    {/* Category header */}
                                    <a
                                      href={cat.path}
                                      onClick={(e) => handleNavClick(e, cat.path)}
                                      className="group flex flex-col gap-1"
                                    >
                                      <span className="font-sans text-[11px] font-bold text-slate-900 uppercase tracking-wide group-hover:text-amber-700 transition-colors leading-tight">
                                        {cat.name}
                                      </span>
                                      <span className="text-[10px] text-slate-400 leading-snug font-sans font-normal">
                                        {cat.desc}
                                      </span>
                                    </a>

                                    {/* Divider */}
                                    <div className="w-8 h-px bg-amber-400" />

                                    {/* Sub-category links */}
                                    {cat.subCategories && (
                                      <div className="flex flex-col gap-0.5">
                                        {cat.subCategories.map((sub) => {
                                          const isSubActive = sub.path.includes('#')
                                            ? location.pathname === sub.path.split('#')[0] && location.hash === '#' + sub.path.split('#')[1]
                                            : location.pathname === sub.path && !location.hash;
                                          return (
                                            <a
                                              key={sub.path}
                                              href={sub.path}
                                              onClick={(e) => handleNavClick(e, sub.path)}
                                              className={`flex items-center gap-2 py-1.5 px-2 rounded-[2px] text-[11px] font-medium font-sans transition-colors duration-100 ${
                                                isSubActive
                                                  ? 'bg-amber-50 text-amber-700 font-semibold'
                                                  : 'text-slate-600 hover:text-amber-700 hover:bg-slate-50'
                                              }`}
                                            >
                                              <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0 group-hover:bg-amber-400" />
                                              {sub.name}
                                            </a>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <a
                    key={link.name}
                    href={link.path + link.hash}
                    onClick={(e) => handleNavClick(e, link.path, link.hash)}
                    className={`px-2 xl:px-3 py-1.5 rounded-[2px] font-sans text-xs tracking-wider whitespace-nowrap transition-all duration-150 shrink-0 ${
                      active
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* ── Desktop Right CTAs: Navy Primary & Gold Accent ── */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '', '#contact')}
                className="px-3 xl:px-4 py-1.5 xl:py-2 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shadow-xs whitespace-nowrap shrink-0 flex items-center justify-center leading-none"
              >
                Request Consultation
              </a>
            </div>

            {/* ── Mobile Menu Toggle ── */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-[2px] bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
            />

            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="fixed top-16 inset-x-0 bg-white border-b border-slate-200 shadow-xl z-50 lg:hidden p-4 space-y-3 text-left max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <div className="space-y-1">
                {NAV_LINKS.map((link) => {
                  const active = isLinkActive(link);

                  if (link.isDropdown) {
                    return (
                      <div key={link.name} className="space-y-1">
                        <button
                          type="button"
                          onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                          className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-[2px] font-sans text-xs tracking-wider transition-colors ${
                            active
                              ? 'bg-amber-400 text-slate-950 font-bold'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 font-semibold'
                          }`}
                          aria-expanded={mobileSolutionsOpen}
                        >
                          <span>{link.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobileSolutionsOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {mobileSolutionsOpen && (
                          <div className="pl-3 pr-1 py-1 space-y-1 border-l-2 border-amber-400/40 ml-3">
                            {SOLUTION_CATEGORIES.map((cat) => {
                              const isCurrent = location.pathname === cat.path;
                              return (
                                <div key={cat.path} className="space-y-1">
                                  <a
                                    href={cat.path}
                                    onClick={(e) => handleNavClick(e, cat.path)}
                                    className={`block px-3 py-1.5 rounded-[2px] text-xs transition-colors ${
                                      isCurrent
                                        ? 'bg-amber-100 text-amber-900 font-bold'
                                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-semibold'
                                    }`}
                                  >
                                    <span className="block truncate">{cat.name}</span>
                                  </a>

                                  {cat.subCategories && (
                                    <div className="pl-3 space-y-1 border-l border-amber-300/40 ml-2">
                                      {cat.subCategories.map((sub) => {
                                        const isSubActive = sub.path.includes('#')
                                          ? location.pathname === sub.path.split('#')[0] && location.hash === '#' + sub.path.split('#')[1]
                                          : location.pathname === sub.path && !location.hash;
                                        return (
                                          <a
                                            key={sub.path}
                                            href={sub.path}
                                            onClick={(e) => handleNavClick(e, sub.path)}
                                            className={`block px-2.5 py-1 rounded-[2px] text-[11px] font-sans transition-colors ${
                                              isSubActive
                                                ? 'bg-amber-400 text-slate-950 font-bold'
                                                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-medium'
                                            }`}
                                          >
                                            ↳ {sub.name}
                                          </a>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                            <a
                              href="/solutions"
                              onClick={(e) => handleNavClick(e, '/solutions')}
                              className="flex items-center gap-2 px-3 py-2 rounded-[2px] text-xs text-amber-700 hover:text-amber-900 font-bold"
                            >
                              <Layers className="w-3.5 h-3.5" />
                              View All Solutions Catalog →
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={link.name}
                      href={link.path + link.hash}
                      onClick={(e) => handleNavClick(e, link.path, link.hash)}
                      className={`block px-3 py-2.5 rounded-[2px] font-sans text-xs tracking-wider transition-colors ${
                        active
                          ? 'bg-amber-400 text-slate-950 font-bold'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 font-semibold'
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-200">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '', '#contact')}
                  className="block text-center py-2.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shadow-xs"
                >
                  Request Consultation
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
