import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShoppingBag, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface NavbarProps {
  inquiryCount: number;
}

const NAV_LINKS = [
  { name: 'Home',           path: '/',          hash: '' },
  { name: 'About Us',       path: '/',          hash: '#about' },
  { name: 'Our Solutions',  path: '/solutions', hash: '' },
  { name: 'News & Updates', path: '/news',      hash: '' },
  { name: 'Contact',        path: '',           hash: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ inquiryCount }) => {
  const [isOpen, setIsOpen]               = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate  = useNavigate();
  const location  = useLocation();

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking — scroll-position based
  useEffect(() => {
    if (location.pathname === '/solutions' || location.pathname === '/products') {
      setActiveSection('solutions'); return;
    }
    if (location.pathname === '/news' || location.pathname.startsWith('/news')) {
      setActiveSection('news'); return;
    }
    if (location.pathname !== '/') { setActiveSection(''); return; }

    // Section IDs that correspond to hash nav links
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

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent, path: string, hash: string = '') => {
    e.preventDefault();
    setIsOpen(false);

    // 1. If targeting a hash section (#about, #contact)
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

    // 2. If targeting a page route (/, /solutions, /news)
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
    if (link.path === '/solutions') return activeSection === 'solutions';
    if (link.path === '/news') return activeSection === 'news';
    if (link.path === '/' && !link.hash) return activeSection === 'home';
    if (link.hash) return activeSection === link.hash.replace('#', '');
    return false;
  };

  return (
    <>
      {/* ── STICKY MAIN HEADER ──────────────────────────────────── */}
      <header
        className={[
          'sticky top-0 z-50 transition-all duration-300 ease-in-out border-b border-amber-400/20 shadow-[0_4px_32px_-4px_rgba(0,0,0,0.6)]',
          scrolled ? 'bg-[#07162a]/95 backdrop-blur-md' : 'bg-[#07162a]',
        ].join(' ')}
      >
        {/* Gold top accent */}
        <div className="h-[3px] bg-gradient-to-r from-[#07162a] via-amber-400 to-[#07162a]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[64px]">

            {/* ── Logo ──────────────────────────────────────────── */}
            <a
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              className="flex items-center gap-3 shrink-0 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
              aria-label="CCDI Home"
            >
              <div className="bg-white rounded-lg p-1.5 shadow-md transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/ccdi-logo.png"
                  alt="Clarkbase Construction Dev't Inc."
                  draggable={false}
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div className="hidden xl:block">
                <p className="text-[11px] font-black tracking-widest text-white uppercase leading-none">
                  Clarkbase Construction
                </p>
                <p className="text-[9px] font-semibold text-amber-400 tracking-widest uppercase mt-0.5">
                  Dev't Inc. · Agro-Industrial EPC
                </p>
              </div>
            </a>

            {/* ── Desktop Nav ─────────────────────────────────── */}
            <nav className="hidden lg:flex items-center bg-white/5 rounded-full px-1.5 py-1.5 border border-white/10 gap-0.5" aria-label="Main navigation">
              {NAV_LINKS.map(link => {
                const active = isLinkActive(link);

                const cls = [
                  'relative px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 whitespace-nowrap outline-none cursor-pointer',
                  active
                    ? 'text-slate-950 bg-amber-400 font-bold'
                    : 'text-white/80 hover:text-white hover:bg-white/10',
                ].join(' ');

                return (
                  <a
                    key={link.name}
                    href={link.path + link.hash}
                    onClick={(e) => handleNavClick(e, link.path, link.hash)}
                    className={cls}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* ── Desktop Right CTAs ───────────────────────────── */}
            <div className="hidden lg:flex items-center gap-3">
              {inquiryCount > 0 && (
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={(e) => handleNavClick(e, '', '#contact')}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/15 transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-white/90">{inquiryCount} Inquiry Item{inquiryCount > 1 ? 's' : ''}</span>
                </motion.button>
              )}

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '', '#contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-[13px] text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-500/20 hover:shadow-amber-400/30 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>Request Consultation</span>
              </a>
            </div>

            {/* ── Mobile Burger + Badge ────────────────────────── */}
            <div className="lg:hidden flex items-center gap-2.5">
              {inquiryCount > 0 && (
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black shadow">
                  {inquiryCount}
                </span>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-lg bg-white/8 border border-white/15 text-white hover:bg-white/15 transition-all"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
              aria-hidden
            />

            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[70px] inset-x-3 bg-[#07162a] border border-amber-400/20 rounded-2xl shadow-2xl z-50 lg:hidden overflow-hidden"
            >
              {/* Accent */}
              <div className="h-[2px] bg-gradient-to-r from-[#07162a] via-amber-400 to-[#07162a]" />

              <div className="p-4 space-y-1.5">
                {NAV_LINKS.map(link => {
                  const active = isLinkActive(link);
                  const cls = [
                    'flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer',
                    active
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-white/80 hover:bg-white/8 hover:text-white',
                  ].join(' ');

                  const arrow = <ChevronRight className={['w-4 h-4', active ? 'text-slate-950/70' : 'text-white/30'].join(' ')} />;

                  return (
                    <a
                      key={link.name}
                      href={link.path + link.hash}
                      onClick={(e) => handleNavClick(e, link.path, link.hash)}
                      className={cls}
                    >
                      <span>{link.name}</span>{arrow}
                    </a>
                  );
                })}
              </div>

              <div className="px-4 pb-5 pt-2 border-t border-white/8 space-y-3">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '', '#contact')}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md transition-all"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>Request Consultation</span>
                </a>
                <p className="text-center text-[10px] text-white/30 font-medium tracking-widest uppercase">
                  Clarkbase Construction Dev't Inc. · Est. 2019
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
