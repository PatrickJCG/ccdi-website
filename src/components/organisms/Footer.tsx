import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, ArrowUpRight } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

const POULTRY_LINKS = [
  { label: 'The Poultry Solution', href: '/solutions/poultry' },
  { label: 'Broiler Housing', href: '/solutions/poultry/broiler' },
  { label: 'Broiler Breeder', href: '/solutions/poultry/broiler-breeder' },
  { label: 'Commercial Layer', href: '/solutions/poultry/layer' },
  { label: 'Accessories & Spare Parts', href: '/solutions/poultry/accessories' },
  { label: 'Farm Retrofitting', href: '/solutions/poultry/retrofitting' },
  { label: 'Poultry After-Sales', href: '/solutions/poultry/after-sales' },
];

const HATCHERY_LINKS = [
  { label: 'Hatchery Solutions', href: '/solutions/hatchery' },
  { label: 'Hatchery After-Sales', href: '/solutions/hatchery/after-sales' },
];

const FEEDMILL_LINKS = [
  { label: 'Feedmill Systems', href: '/solutions/feedmill' },
  { label: 'Feedmill After-Sales', href: '/solutions/feedmill/after-sales' },
];

const SOLAR_LINKS = [
  { label: 'Solar Systems', href: '/solutions/solar' },
  { label: 'Solar Price Calculator', href: '/solutions/solar/calculator' },
  { label: 'Solar After-Sales', href: '/solutions/solar/after-sales' },
];

const COMPANY_LINKS = [
  { label: 'About CCDI',      href: '/#about' },
  { label: 'Our Solutions',   href: '/solutions' },
  { label: 'Careers',         href: '/careers' },
  { label: 'News & Updates', href: '/news' },
  { label: 'FAQ',             href: '/#faq' },
  { label: 'Contact Us',      href: '/#contact' },
];

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 text-left font-sans">

      {/* ── Top CTA Banner (Light Theme, Slate-50 Background, Amber Accent, Sharp 2px Corners) ── */}
      <div className="relative bg-slate-50 border-b border-slate-200 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-mono text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">
              Ready to Start Your Agro-Industrial Project?
            </p>
            <p className="text-lg sm:text-xl font-extrabold text-[#0B192C] leading-tight">
              Partner with CCDI — Philippines' Premier Agro-Industrial Engineering Firm
            </p>
          </div>
          <button
            onClick={() => {
              navigate('/solutions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[2px] font-bold text-xs uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shrink-0 whitespace-nowrap cursor-pointer border-0 shadow-xs"
          >
            Explore Our Solutions <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Main Footer Body (Light Theme) ── */}
      <div className="relative w-full overflow-hidden">
        {/* Architectural Top-Right Corner Accent */}
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          
          {/* Brand Header & Hotline Row */}
          <div className="pb-10 mb-10 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl space-y-3">
              <Link to="/" className="inline-block group" aria-label="Clarkbase Construction Development Inc. Home">
                <img
                  src="/images/branding/ccdi-landscape-logo.svg"
                  alt="Clarkbase Construction Development Inc."
                  className="h-12 sm:h-14 md:h-16 w-auto max-w-[300px] sm:max-w-[340px] object-contain block transition-transform duration-200 group-hover:scale-[1.01]"
                  draggable={false}
                />
              </Link>
              <p className="text-sm text-slate-600 leading-relaxed">
                A premier Philippine-based agro-industrial solutions provider delivering turnkey
                engineering for poultry, hatchery, feedmill, and solar energy projects.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <a
                href="tel:+639257588458"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[2px] bg-slate-50 hover:bg-amber-50 text-slate-800 hover:text-amber-700 border border-slate-200 hover:border-amber-300 transition-colors font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>+63 925 7588 458</span>
              </a>
              <a
                href="mailto:inquiries@ccdi-asia.com"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[2px] bg-slate-50 hover:bg-amber-50 text-slate-800 hover:text-amber-700 border border-slate-200 hover:border-amber-300 transition-colors font-semibold"
              >
                <Mail className="w-3.5 h-3.5 text-amber-600" />
                <span>inquiries@ccdi-asia.com</span>
              </a>
            </div>
          </div>

          {/* 6 Category Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-200">

            {/* Column 1: Poultry Solution */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold text-[#0B192C] uppercase tracking-widest">
                The Poultry Solution
              </h3>
              <ul className="space-y-2 text-sm">
                {POULTRY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-slate-600 hover:text-amber-600 transition-colors duration-200 block text-xs sm:text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Hatchery Solutions */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold text-[#0B192C] uppercase tracking-widest">
                Hatchery Solutions
              </h3>
              <ul className="space-y-2 text-sm">
                {HATCHERY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-slate-600 hover:text-amber-600 transition-colors duration-200 block text-xs sm:text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Feedmill Systems */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold text-[#0B192C] uppercase tracking-widest">
                Feedmill Systems
              </h3>
              <ul className="space-y-2 text-sm">
                {FEEDMILL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-slate-600 hover:text-amber-600 transition-colors duration-200 block text-xs sm:text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Solar Systems */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold text-[#0B192C] uppercase tracking-widest">
                Solar Systems
              </h3>
              <ul className="space-y-2 text-sm">
                {SOLAR_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-slate-600 hover:text-amber-600 transition-colors duration-200 block text-xs sm:text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Company */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold text-[#0B192C] uppercase tracking-widest">
                Company
              </h3>
              <ul className="space-y-2 text-sm">
                {COMPANY_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-slate-600 hover:text-amber-600 transition-colors duration-200 block text-xs sm:text-sm"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 6: Contact */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold text-[#0B192C] uppercase tracking-widest">
                Contact
              </h3>

              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1.5 leading-relaxed">
                    <div>
                      <p className="font-semibold text-slate-900">Clark Freeport Zone HQ</p>
                      <p className="text-slate-500">Office Center 05J Berthaphil Clark Center, Pampanga</p>
                    </div>
                    <div className="pt-1.5 border-t border-slate-200">
                      <p className="font-semibold text-slate-900">Angeles City Office</p>
                      <p className="text-slate-500">Blk. 22 Lot 6 Fil-Am Friendship Hi-way, Cut-cut</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <div className="space-y-0.5">
                    <a href="tel:+639257588458" className="text-slate-900 hover:text-amber-600 transition-colors block font-semibold">
                      +63 925 7588 458
                    </a>
                    <span className="text-slate-500 text-[11px]">(045) 499 8508</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                  <a
                    href="mailto:inquiries@ccdi-asia.com"
                    className="text-slate-900 hover:text-amber-600 transition-colors font-semibold truncate block"
                    title="inquiries@ccdi-asia.com"
                  >
                    inquiries@ccdi-asia.com
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <ExternalLink className="w-4 h-4 text-amber-600 shrink-0" />
                  <a
                    href="https://www.ccdi-asia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                  >
                    www.ccdi-asia.com
                  </a>
                </div>
              </div>
            </div>

          </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <img
              src="/images/branding/ccdi-logo.svg"
              alt="CCDI"
              className="h-6 w-auto object-contain opacity-75 hover:opacity-100 transition-opacity"
            />
            <p>
              © {CURRENT_YEAR}{' '}
              <span className="text-slate-800 font-semibold">
                Clarkbase Construction Dev't Inc. (CCDI)
              </span>
              . All rights reserved. · Pampanga, Philippines
            </p>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </div>

  </footer>
);
};
