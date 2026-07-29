import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  X,
  Building2,
  CheckCircle2,
  Zap,
  Copy,
  Check,
  ExternalLink,
  User,
  FileText,
  Calendar,
  Layers,
  Home,
  Egg,
  Factory,
  Sun,
  HardHat,
} from 'lucide-react';
import type { Product } from '../../data/mockProducts';

export interface ContactSectionProps {
  inquiryItems: Product[];
  onRemoveInquiryItem: (productId: string) => void;
}

const SERVICE_CATEGORIES = [
  {
    id: 'Poultry',
    title: 'Poultry Facilities',
    desc: 'Broiler, Breeder & Layer climate-controlled housing',
    icon: Home,
  },
  {
    id: 'Hatchery',
    title: 'Hatchery Construction',
    desc: 'Cleanroom HVAC, automated incubation & chick lines',
    icon: Egg,
  },
  {
    id: 'Feedmill',
    title: 'Feedmill Systems',
    desc: 'Automated batching, silos & high-capacity mixers',
    icon: Factory,
  },
  {
    id: 'Solar',
    title: 'Solar PV Integration',
    desc: 'Rooftop & ground-mounted solar microgrid systems',
    icon: Sun,
  },
  {
    id: 'General',
    title: 'General EPC Construction',
    desc: 'Full-scope civil, structural & industrial engineering',
    icon: HardHat,
  },
];

const OFFICES = [
  {
    id: 'clark',
    name: 'Clark Freeport Zone HQ',
    badge: 'Main Headquarters',
    address: 'Office Center 05J Berthaphil Clark Center, Clark Freeport Zone, Pampanga, Philippines',
    phone: '+63 925 7588 458',
    landline: '(045) 499 8508',
    email: 'inquiries@ccdi-asia.com',
    hours: 'Mon – Fri: 8:00 AM – 5:00 PM PST',
    mapLink: 'https://maps.google.com/?q=Berthaphil+Clark+Center+Pampanga',
  },
  {
    id: 'angeles',
    name: 'Angeles City Branch',
    badge: 'Operations & Engineering',
    address: 'Blk 22 Lot 6 Fil-Am Friendship Hi-way, Cut-cut, Angeles City, Pampanga, Philippines',
    phone: '+63 925 7588 458',
    landline: '(045) 499 8508',
    email: 'inquiries@ccdi-asia.com',
    hours: 'Mon – Sat: 8:00 AM – 5:00 PM PST',
    mapLink: 'https://maps.google.com/?q=Fil-Am+Friendship+Highway+Angeles+City',
  },
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  inquiryItems,
  onRemoveInquiryItem,
}) => {
  const [activeOfficeTab, setActiveOfficeTab] = useState<'clark' | 'angeles'>('clark');
  const [selectedService, setSelectedService] = useState<string>('Poultry');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    timeline: '1-3 Months',
    message: '',
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in your name, email, and project details.');
      return;
    }
    setIsSubmitted(true);
  };

  const selectedOffice = OFFICES.find(o => o.id === activeOfficeTab) || OFFICES[0];

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-20 overflow-hidden text-white"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #102A43 0%, #0B192C 55%, #050C15 100%)',
      }}
    >
      {/* Top accent rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute top-1/4 -right-48 w-[480px] h-[480px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-48 w-[480px] h-[480px] bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">

        {/* ── SECTION HEADER ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-400/12 border border-amber-400/30 text-amber-400 text-[11px] font-bold uppercase tracking-widest">
            Turnkey EPC Engineering Consultations
          </span>

          <h2 className="text-3xl sm:text-5xl font-black font-heading leading-tight text-white drop-shadow-md">
            Partner With CCDI For Your{' '}
            <span className="text-amber-400">Agro-Industrial Build</span>
          </h2>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            Whether you are expanding a broiler farm, engineering a feedmill, or building a solar
            microgrid — our Pampanga-based team responds within 24 hours.
          </p>
        </motion.div>

        {/* ── MAIN GRID: 5 + 7 ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── LEFT: Contact Info Panel ──────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Office Location Card */}
            <div className="bg-white/4 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2 font-bold text-white text-base">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Office Locations</span>
              </div>

              {/* Tab switcher */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/30 rounded-xl border border-white/8">
                {OFFICES.map(o => (
                  <button
                    key={o.id}
                    onClick={() => setActiveOfficeTab(o.id as 'clark' | 'angeles')}
                    className={[
                      'py-2 px-3 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5',
                      activeOfficeTab === o.id
                        ? 'bg-amber-400 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white hover:bg-white/5',
                    ].join(' ')}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    {o.id === 'clark' ? 'Clark HQ' : 'Angeles Branch'}
                  </button>
                ))}
              </div>

              {/* Office detail */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedOffice.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                      {selectedOffice.badge}
                    </span>
                    <p className="text-sm font-bold text-white">{selectedOffice.name}</p>
                  </div>

                  <p className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed bg-black/25 p-3 rounded-xl border border-white/5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    {selectedOffice.address}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-black/25 p-3 rounded-xl border border-white/5 space-y-1">
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        Contact
                      </p>
                      <p className="font-bold text-amber-300">{selectedOffice.phone}</p>
                      <p className="text-slate-400">{selectedOffice.landline}</p>
                    </div>
                    <div className="bg-black/25 p-3 rounded-xl border border-white/5 space-y-1">
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        Hours
                      </p>
                      <p className="font-semibold text-slate-200 leading-snug">{selectedOffice.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(selectedOffice.address, 'address')}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-white/8 hover:bg-white/14 border border-white/10 text-xs font-semibold text-white transition-all flex items-center justify-center gap-1.5"
                    >
                      {copiedText === 'address'
                        ? <><Check className="w-3.5 h-3.5 text-amber-400" />Copied!</>
                        : <><Copy className="w-3.5 h-3.5" />Copy Address</>}
                    </button>
                    <a
                      href={selectedOffice.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 shadow whitespace-nowrap"
                    >
                      Open Map <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-white/4 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                Direct Communications
              </p>

              <div className="space-y-3">
                {/* Email row */}
                <div className="flex items-center justify-between bg-black/25 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/15 text-amber-400 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Email</p>
                      <a
                        href="mailto:inquiries@ccdi-asia.com"
                        className="text-xs font-bold text-white hover:text-amber-400 transition-colors"
                      >
                        inquiries@ccdi-asia.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('inquiries@ccdi-asia.com', 'email')}
                    className="p-1.5 rounded-lg bg-white/8 hover:bg-white/15 text-slate-300 transition-all"
                  >
                    {copiedText === 'email'
                      ? <Check className="w-3.5 h-3.5 text-amber-400" />
                      : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Phone row */}
                <div className="flex items-center justify-between bg-black/25 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/15 text-amber-400 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Hotline</p>
                      <a
                        href="tel:+639257588458"
                        className="text-xs font-bold text-white hover:text-amber-400 transition-colors"
                      >
                        +63 925 7588 458
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('+639257588458', 'phone')}
                    className="p-1.5 rounded-lg bg-white/8 hover:bg-white/15 text-slate-300 transition-all"
                  >
                    {copiedText === 'phone'
                      ? <Check className="w-3.5 h-3.5 text-amber-400" />
                      : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Assurance badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/8 text-center">
                {[
                  { icon: ShieldCheck, label: 'Biosecure' },
                  { icon: Zap,         label: 'Turnkey EPC' },
                  { icon: CheckCircle2, label: 'Tier-1 Source' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="space-y-1">
                    <Icon className="w-4 h-4 text-amber-400 mx-auto" />
                    <p className="text-[10px] font-semibold text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Proposal Form ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-white/4 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Accent stripe */}
              <div className="h-[3px] bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />

              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    /* Success state */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-14 space-y-6"
                    >
                      <div className="w-20 h-20 rounded-full bg-amber-400/15 border-2 border-amber-400/40 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10 text-amber-400" />
                      </div>

                      <div className="space-y-2 max-w-sm mx-auto">
                        <h3 className="text-2xl font-extrabold text-white font-heading">
                          Inquiry Submitted
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          Thank you, <strong className="text-amber-400">{formData.name}</strong>. Our
                          engineering specialist will contact you at{' '}
                          <strong className="text-white">{formData.email}</strong> within 24 hours.
                        </p>
                      </div>

                      <div className="bg-black/30 p-4 rounded-xl border border-white/8 text-xs text-slate-400 max-w-sm mx-auto text-left space-y-1">
                        <p className="font-bold text-amber-300 mb-2">Inquiry Summary</p>
                        <p>Service: {selectedService}</p>
                        <p>Location: {formData.location || 'Not specified'}</p>
                        <p>Timeline: {formData.timeline}</p>
                        {inquiryItems.length > 0 && <p>Catalog Items: {inquiryItems.length}</p>}
                      </div>

                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: '', email: '', phone: '', company: '',
                            location: '', timeline: '1-3 Months', message: '',
                          });
                        }}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all"
                      >
                        Submit Another Request
                      </button>
                    </motion.div>
                  ) : (
                    /* Proposal form */
                    <form key="form" onSubmit={handleSubmit} className="space-y-7">

                      {/* Form header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/8">
                        <div>
                          <h3 className="text-xl font-extrabold text-white font-heading">
                            Request a Project Proposal
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">
                            Select your interest area and share project specifications below.
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 border border-white/8 text-[11px] font-semibold text-slate-400 whitespace-nowrap shrink-0">
                          <Clock className="w-3 h-3 text-amber-400" />
                          24h Response SLA
                        </span>
                      </div>

                      {/* Attached inquiry items */}
                      {inquiryItems.length > 0 && (
                        <div className="bg-amber-400/8 border border-amber-400/30 rounded-xl p-4 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold">
                            <Layers className="w-4 h-4" />
                            <span>Attached Catalog Items ({inquiryItems.length})</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {inquiryItems.map(item => (
                              <span
                                key={item.id}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-amber-400/20 text-xs font-semibold text-white"
                              >
                                {item.title}
                                <button
                                  type="button"
                                  onClick={() => onRemoveInquiryItem(item.id)}
                                  className="ml-0.5 text-slate-400 hover:text-amber-400 transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Service category */}
                      <div className="space-y-3">
                        <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                          1. Service Required <span className="text-amber-400">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {SERVICE_CATEGORIES.map(cat => {
                            const selected = selectedService === cat.id;
                            const IconComponent = cat.icon;
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => setSelectedService(cat.id)}
                                className={[
                                  'p-3.5 rounded-xl text-left text-xs font-bold transition-all border flex flex-col justify-between space-y-2.5',
                                  selected
                                    ? 'bg-amber-400/15 border-amber-400 text-white shadow-lg shadow-amber-400/10'
                                    : 'bg-black/25 border-white/8 text-slate-400 hover:border-white/20 hover:text-slate-200',
                                ].join(' ')}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <div className={[
                                    'p-2 rounded-lg transition-colors',
                                    selected ? 'bg-amber-400 text-slate-950' : 'bg-white/5 text-amber-400/80',
                                  ].join(' ')}>
                                    <IconComponent className="w-4 h-4" />
                                  </div>
                                  {selected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                                </div>
                                <span className="font-bold text-white text-xs leading-tight">{cat.title}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Contact details */}
                      <div className="space-y-4">
                        <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                          2. Contact Details
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Name */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400">
                              Full Name <span className="text-amber-400">*</span>
                            </label>
                            <div className="relative">
                              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange('name')}
                                placeholder="e.g. Juan Dela Cruz"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/30 border border-white/8 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400">
                              Business Email <span className="text-amber-400">*</span>
                            </label>
                            <div className="relative">
                              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange('email')}
                                placeholder="juan@company.com"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/30 border border-white/8 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                              />
                            </div>
                          </div>

                          {/* Phone */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400">Phone</label>
                            <div className="relative">
                              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                              <input
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange('phone')}
                                placeholder="+63 917 000 0000"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/30 border border-white/8 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                              />
                            </div>
                          </div>

                          {/* Company */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400">Company</label>
                            <div className="relative">
                              <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                value={formData.company}
                                onChange={handleChange('company')}
                                placeholder="e.g. Clark Farm Dev Corp."
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/30 border border-white/8 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Project scope */}
                      <div className="space-y-4">
                        <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                          3. Project Scope
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400">Site Location</label>
                            <div className="relative">
                              <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                value={formData.location}
                                onChange={handleChange('location')}
                                placeholder="e.g. Tarlac / Bulacan"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/30 border border-white/8 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400">Target Timeline</label>
                            <div className="relative">
                              <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                              <select
                                value={formData.timeline}
                                onChange={handleChange('timeline')}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/30 border border-white/8 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all [&_option]:bg-slate-900"
                              >
                                <option value="Immediate (< 1 Month)">Immediate (&lt; 1 Month)</option>
                                <option value="1-3 Months">1 – 3 Months</option>
                                <option value="3-6 Months">3 – 6 Months</option>
                                <option value="Planning Phase">Planning Phase</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-400">
                            Project Details <span className="text-amber-400">*</span>
                          </label>
                          <div className="relative">
                            <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                            <textarea
                              required
                              rows={3}
                              value={formData.message}
                              onChange={handleChange('message')}
                              placeholder="Describe your capacity requirements, ventilation needs, bird count targets, feedmill tonnage, or solar kWp..."
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/30 border border-white/8 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Submit */}
                      <div className="space-y-3 pt-1">
                        <button
                          type="submit"
                          className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 whitespace-nowrap"
                        >
                          Submit Proposal Request
                          <Send className="w-4 h-4 shrink-0" />
                        </button>

                        <p className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400/70" />
                          Strictly confidential · No spam · NDA-compliant engineering service
                        </p>
                      </div>

                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
