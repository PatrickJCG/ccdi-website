import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, ArrowUpRight } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

const SOLUTION_LINKS = [
  { label: 'The Poultry Solution', href: '/solutions/poultry', isPrimary: true },
  { label: 'Broiler Housing', href: '/solutions/poultry/broiler', isSub: true },
  { label: 'Broiler Breeder', href: '/solutions/poultry/broiler-breeder', isSub: true },
  { label: 'Commercial Layer', href: '/solutions/poultry/layer', isSub: true },
  { label: 'Hatchery Solutions', href: '/solutions/hatchery', isPrimary: true },
  { label: 'Feedmill Systems', href: '/solutions/feedmill', isPrimary: true },
  { label: 'Solar Systems', href: '/solutions/solar', isPrimary: true },
];

const COMPANY_LINKS = [
  { label: 'About CCDI',      href: '/#about' },
  { label: 'Our Solutions',   href: '/solutions' },
  { label: 'Careers',         href: '/careers' },
  { label: 'News & Updates', href: '/news' },
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block group" aria-label="Clarkbase Construction Development Inc. Home">
              <div className="bg-white rounded-[2px] px-3.5 py-2 inline-flex items-center justify-center border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                <img
                  src="/images/branding/ccdi-landscape-logo.svg"
                  alt="Clarkbase Construction Development Inc."
                  className="h-8 sm:h-9 w-auto object-contain"
                  draggable={false}
                />
              </div>
            </Link>

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              A premier Philippine-based agro-industrial solutions provider delivering turnkey
              engineering for poultry, hatchery, feedmill, and solar energy projects.
            </p>
          </div>

          {/* Our Solutions */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-mono text-xs font-bold text-[#0B192C] uppercase tracking-widest">Our Solutions</h3>
            <ul className="space-y-2 text-sm">
              {SOLUTION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`transition-colors duration-200 block ${
                      link.isSub
                        ? 'text-xs text-slate-500 hover:text-amber-600 pl-2.5 border-l border-slate-200'
                        : 'text-slate-700 font-semibold hover:text-amber-600 text-sm'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-mono text-xs font-bold text-[#0B192C] uppercase tracking-widest">Company</h3>
            <ul className="space-y-2.5 text-sm">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-slate-600 hover:text-amber-600 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-mono text-xs font-bold text-[#0B192C] uppercase tracking-widest">Contact</h3>

            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1.5 text-xs text-slate-600 leading-relaxed">
                  <div>
                    <p className="font-semibold text-slate-900">Clark Freeport Zone HQ</p>
                    <p>Office Center 05J Berthaphil Clark Center, Pampanga</p>
                  </div>
                  <div className="pt-1.5 border-t border-slate-200">
                    <p className="font-semibold text-slate-900">Angeles City Office</p>
                    <p>Blk. 22 Lot 6 Fil-Am Friendship Hi-way, Cut-cut</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                <div className="text-xs space-y-0.5">
                  <a href="tel:+639257588458" className="text-slate-900 hover:text-amber-600 transition-colors block font-semibold">
                    +63 925 7588 458
                  </a>
                  <span className="text-slate-500">(045) 499 8508</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                <a
                  href="mailto:inquiries@ccdi-asia.com"
                  className="text-xs text-slate-900 hover:text-amber-600 transition-colors font-semibold"
                >
                  inquiries@ccdi-asia.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-amber-600 shrink-0" />
                <a
                  href="https://www.ccdi-asia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                >
                  www.ccdi-asia.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {CURRENT_YEAR}{' '}
            <span className="text-slate-800 font-semibold">
              Clarkbase Construction Dev't Inc. (CCDI)
            </span>
            . All rights reserved. · Pampanga, Philippines
          </p>
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
