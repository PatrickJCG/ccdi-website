import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, ArrowUpRight } from 'lucide-react';

const SOLUTION_LINKS = [
  'Poultry Facilities',
  'Hatchery Construction',
  'Feedmill Systems',
  'Solar Energy Integration',
  'General EPC Construction',
];

const COMPANY_LINKS = [
  { label: 'About CCDI',      href: '/#about' },
  { label: 'Our Solutions',   href: '/solutions' },
  { label: 'News & Updates', href: '/news' },
  { label: 'Contact Us',      href: '/#contact' },
];

const CERTIFICATIONS = ['ISO 9001', 'PCAB Licensed', 'Turnkey EPC', 'Biosecure'];

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const handleSolutionClick = (cat: string) => {
    navigate(`/products?function=${encodeURIComponent(cat)}`);
  };

  return (
    <footer className="bg-[#040D18] text-slate-400 border-t border-white/5">

      {/* ── Top CTA Banner ───────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#0B192C] via-[#102A43] to-[#0B192C] border-b border-amber-400/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
              Ready to Start Your Project?
            </p>
            <p className="text-lg sm:text-xl font-extrabold text-white leading-tight">
              Partner with CCDI — Philippines' Premier Agro-Industrial EPC
            </p>
          </div>
          <button
            onClick={() => {
              navigate('/solutions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-500/20 hover:-translate-y-0.5 transition-all shrink-0 whitespace-nowrap cursor-pointer border-0"
          >
            Explore Our Solutions <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Main Footer Body ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block">
              <div className="bg-white rounded-xl p-2 shadow inline-block">
                <img
                  src="/ccdi-logo.png"
                  alt="Clarkbase Construction Dev't Inc."
                  className="h-12 w-auto object-contain"
                  draggable={false}
                />
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Clarkbase Construction Dev't Inc. (CCDI) — a Philippine-based agro-industrial
              solutions provider delivering turnkey EPC engineering for poultry, hatchery,
              feedmill, and solar energy projects.
            </p>

            {/* Cert badges */}
            <div>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">
                Engineering Standards
              </p>
              <div className="flex flex-wrap gap-2">
                {CERTIFICATIONS.map(cert => (
                  <span
                    key={cert}
                    className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-amber-400/8 border border-amber-400/20 text-amber-400"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Our Solutions */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Our Solutions</h3>
            <ul className="space-y-2.5 text-sm">
              {SOLUTION_LINKS.map(link => (
                <li key={link}>
                  <button
                    onClick={() => handleSolutionClick(link)}
                    className="text-slate-400 hover:text-amber-400 transition-colors duration-200 text-left leading-snug"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Company</h3>
            <ul className="space-y-2.5 text-sm">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-slate-400 hover:text-amber-400 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Contact</h3>

            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs text-slate-400 leading-relaxed">
                  <p className="font-semibold text-slate-300">Clark Freeport Zone, Pampanga</p>
                  <p>Office Center 05J Berthaphil Clark Center</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-xs space-y-0.5">
                  <a href="tel:+639257588458" className="text-slate-300 hover:text-amber-400 transition-colors block font-semibold">
                    +63 925 7588 458
                  </a>
                  <span className="text-slate-500">(045) 499 8508</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="mailto:inquiries@ccdi-asia.com"
                  className="text-xs text-slate-300 hover:text-amber-400 transition-colors font-semibold"
                >
                  inquiries@ccdi-asia.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="https://www.ccdi-asia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400/80 hover:text-amber-400 transition-colors"
                >
                  www.ccdi-asia.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ───────────────────────────────────────── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
          <p>
            © {year}{' '}
            <span className="text-slate-500 font-semibold">
              Clarkbase Construction Dev't Inc. (CCDI)
            </span>
            . All rights reserved. · Pampanga, Philippines
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>

    </footer>
  );
};
