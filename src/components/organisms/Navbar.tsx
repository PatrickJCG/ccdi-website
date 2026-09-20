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
    desc: 'Broiler, Breeder & Layer climate housing, feeding automation & prefab kits',
    subCategories: [
      { name: 'Broiler', path: '/solutions/poultry/broiler' },
      { name: 'Broiler Breeder', path: '/solutions/poultry/broiler-breeder' },
      { name: 'Layer', path: '/solutions/poultry/layer' },
    ],
  },
  {
    name: 'Hatchery Solutions',
    shortName: 'Hatchery',
    path: '/solutions/hatchery',
    desc: 'Cleanroom incubation, single-stage setters, egg transfer & vaccination',
  },
  {
    name: 'Feedmill Systems',
    shortName: 'Feedmill',
    path: '/solutions/feedmill',
    desc: 'Grain storage silos, pelleting towers & precision batching automation',
  },
  {
    name: 'Solar Systems',
    shortName: 'Solar Systems',
    path: '/solutions/solar',
    desc: 'Agro-industrial rooftop PV, ground mounts & hybrid microgrids',
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

  const handleNavClick = (e: React.MouseEvent, path: string, hash: string = '') => {
    e.preventDefault();
    setIsOpen(false);
    setSolutionsDropdownOpen(false);

    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);

      if (element) {
        const offset = 72;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const offsetPosition = elementRect - bodyRect - offset;
        window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
      } else {
        const destPath = path || '/';
        navigate(destPath + hash);
      }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="h-8 sm:h-9 md:h-10 w-auto object-contain"
              />
            </a>

            {/* ── Desktop Nav: Plus Jakarta Sans, Sharp Corners, Gold Focus ── */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
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
                        onClick={(e) => handleNavClick(e, '/solutions')}
                        className={`px-3 py-1.5 rounded-[2px] font-sans text-xs tracking-wider transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
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

                      {/* Desktop Solutions Dropdown — Single Column */}
                      <AnimatePresence>
                        {solutionsDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.13, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute left-0 mt-1.5 w-64 bg-white border border-slate-200 shadow-xl rounded-[2px] z-50 overflow-hidden"
                          >
                            {/* Header */}
                            <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                Our Solutions
                              </span>
                            </div>

                            {/* Single-column list */}
                            <div className="py-1.5">
                              {SOLUTION_CATEGORIES.map((cat) => (
                                <div key={cat.path}>
                                  {/* Primary category row */}
                                  <a
                                    href={cat.path}
                                    onClick={(e) => handleNavClick(e, cat.path)}
                                    className="group flex items-center justify-between px-4 py-2.5 text-slate-800 hover:bg-slate-50 hover:text-amber-700 transition-colors duration-100"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <span className="w-1 h-1 rounded-full shrink-0 transition-colors bg-slate-300 group-hover:bg-amber-400" />
                                      <span className="font-sans text-[12px] font-semibold leading-none whitespace-nowrap">
                                        {cat.name}
                                      </span>
                                    </div>
                                  </a>

                                  {/* Sub-category bullet list */}
                                  {cat.subCategories && (
                                    <div className="pb-1">
                                      {cat.subCategories.map((sub) => (
                                        <a
                                          key={sub.path}
                                          href={sub.path}
                                          onClick={(e) => handleNavClick(e, sub.path)}
                                          className="flex items-center gap-2.5 pl-[30px] pr-4 py-1.5 text-[11px] font-medium font-sans text-slate-800 hover:text-amber-700 hover:bg-slate-50 transition-colors duration-100 whitespace-nowrap"
                                        >
                                          <span className="text-[8px] shrink-0 text-slate-400">
                                            ●
                                          </span>
                                          {sub.name}
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* Footer CTA */}
                            <div className="border-t border-slate-100">
                              <a
                                href="/solutions"
                                onClick={(e) => handleNavClick(e, '/solutions')}
                                className="flex items-center justify-between px-4 py-2.5 text-[11px] font-bold text-amber-600 hover:text-amber-800 hover:bg-amber-50 transition-colors group whitespace-nowrap"
                              >
                                <span className="flex items-center gap-2">
                                  <Layers className="w-3 h-3 shrink-0" />
                                  <span>View All Solutions</span>
                                </span>
                                <ArrowRight className="w-3 h-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
                              </a>
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
                    className={`px-3 py-1.5 rounded-[2px] font-sans text-xs tracking-wider transition-all duration-150 ${
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
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '', '#contact')}
                className="px-4 py-2 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shadow-xs"
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
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={(e) => handleNavClick(e, '/solutions')}
                            className={`flex-1 text-left px-3 py-2.5 rounded-[2px] font-sans text-xs tracking-wider transition-colors ${
                              active
                                ? 'bg-amber-400 text-slate-950 font-bold'
                                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 font-semibold'
                            }`}
                          >
                            {link.name}
                          </button>
                          <button
                            type="button"
                            onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                            className="p-2 text-slate-500 hover:text-slate-800"
                            aria-label="Toggle solutions list"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                mobileSolutionsOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>

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
                                      {cat.subCategories.map((sub) => (
                                        <a
                                          key={sub.path}
                                          href={sub.path}
                                          onClick={(e) => handleNavClick(e, sub.path)}
                                          className={`block px-2.5 py-1 rounded-[2px] text-[11px] font-sans transition-colors ${
                                            location.pathname === sub.path
                                              ? 'bg-amber-400 text-slate-950 font-bold'
                                              : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-medium'
                                          }`}
                                        >
                                          ↳ {sub.name}
                                        </a>
                                      ))}
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
