import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Eye, Target, HeartHandshake, Award, Zap, Users, Leaf, ChevronDown } from 'lucide-react';



const STATS = [
  { value: '2019', label: 'Year Established', sublabel: 'Pioneering Industry Growth' },
  { value: '100%', label: 'Bio-Security Standard', sublabel: 'Strict Pathogen Defense' },
  { value: 'Turnkey', label: 'Facility Engineering', sublabel: 'End-to-End Design & Build' },
  { value: 'Direct', label: 'Global Sourcing', sublabel: 'Tier-One Factory Warranties' },
];

export interface CoreValueItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  summary: string;
  details: string;
}

const CORE_VALUES: CoreValueItem[] = [
  {
    id: 'integrity',
    title: 'Integrity',
    icon: <HeartHandshake className="w-5 h-5" />,
    summary: 'Unwavering transparency, honesty, and accountability.',
    details: 'We conduct every project with uncompromised ethics, transparent pricing, and dependable commitments. For CCDI, trust is the cornerstone of every client partnership and vendor relationship.',
  },
  {
    id: 'excellence',
    title: 'Strive for Excellence',
    icon: <Award className="w-5 h-5" />,
    summary: 'Rigorous quality benchmarks across all builds.',
    details: 'We hold our design standards, construction craftsmanship, and equipment installations to strict international benchmarks. Settling for "good enough" is never an option.',
  },
  {
    id: 'innovation',
    title: 'Power for Innovation',
    icon: <Zap className="w-5 h-5" />,
    summary: 'Smart automation and clean energy integration.',
    details: 'We actively introduce state-of-the-art agricultural technology, automation systems, and renewable energy models to elevate traditional farming into high-tech industrial assets.',
  },
  {
    id: 'customer',
    title: 'Customer Focus',
    icon: <Users className="w-5 h-5" />,
    summary: 'Tailoring solutions to unique operational goals.',
    details: 'Every agricultural facility presents unique environmental and operational challenges. We listen closely, tailor our engineering plans to client goals, and provide ongoing technical support.',
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    icon: <Leaf className="w-5 h-5" />,
    summary: 'Eco-efficient infrastructure protecting natural resources.',
    details: 'We are deeply committed to protecting natural resources. Through energy-efficient building envelopes, low-emissions feedmill designs, and solar energy integration, we help build a greener future.',
  },
];

export const AboutUs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision'>('mission');
  const [openAccordion, setOpenAccordion] = useState<string>('integrity');

  // Parallax reference container
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 sm:py-20 overflow-hidden bg-[#07162a] text-white border-b border-white/10"
    >
      {/* ── Parallax Image Background ──────────────────────────────── */}
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%] pointer-events-none z-0"
        style={{ y: bgY }}
      >
        {/* Background image layer */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2000&q=80)',
          }}
        />
        {/* Rich Dual-Gradient Overlay for Image Visibility & Text Contrast */}
        <div className="absolute inset-0 bg-[#07162a]/85 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07162a] via-transparent to-[#07162a]" />
      </motion.div>

      {/* Decorative accent elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Subtle Brand Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,158,11,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <span>About CCDI</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white leading-tight">
            Pioneering Agro-Industrial{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
              Excellence Since 2019
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed">
            Clarkbase Construction Dev't Inc. (CCDI) is a premier Philippine-based agro-industrial solutions provider. We specialize in transforming agricultural operations through integrated engineering designs, end-to-end facility construction, precision equipment installation, and sustainable solar energy systems.
          </p>
        </motion.div>

        {/* Mission/Vision Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/10 shadow-2xl shadow-black/40 max-w-4xl mx-auto space-y-5 sm:space-y-6"
        >
          <div className="flex flex-col items-center space-y-2.5 sm:space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading text-center">
              Our Strategic Purpose
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm text-center max-w-lg leading-relaxed">
              Explore our core mission and vision guiding CCDI's sustainable agro-industrial development across the Philippines.
            </p>

            {/* Toggle */}
            <div className="flex items-center p-1 sm:p-1.5 bg-black/40 rounded-2xl border border-white/10 w-full sm:w-auto gap-1">
              <button
                onClick={() => setActiveTab('mission')}
                className={[
                  'flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer',
                  activeTab === 'mission'
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25'
                    : 'text-slate-300 hover:text-white hover:bg-white/5',
                ].join(' ')}
              >
                <Target className={activeTab === 'mission' ? 'w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950' : 'w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400'} />
                <span>Our Mission</span>
              </button>
              <button
                onClick={() => setActiveTab('vision')}
                className={[
                  'flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer',
                  activeTab === 'vision'
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25'
                    : 'text-slate-300 hover:text-white hover:bg-white/5',
                ].join(' ')}
              >
                <Eye className={activeTab === 'vision' ? 'w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950' : 'w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400'} />
                <span>Our Vision</span>
              </button>
            </div>
          </div>

          {/* Content panel */}
          <div className="min-h-[130px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {activeTab === 'mission' ? (
                <motion.div
                  key="mission"
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-r from-slate-900/90 to-[#0B1E30] border-l-4 border-amber-400 border border-y border-r border-white/10 p-4 sm:p-7 rounded-xl sm:rounded-r-2xl w-full shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    <div className="flex items-center gap-2.5 sm:block shrink-0">
                      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="sm:hidden text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2.5 py-0.5 rounded-md inline-block">
                        Mission Statement
                      </span>
                    </div>

                    <div className="space-y-2 min-w-0 flex-1">
                      <span className="hidden sm:inline-block text-[11px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2.5 py-0.5 rounded-md">
                        Mission Statement
                      </span>
                      <p className="text-xs sm:text-base text-slate-100 font-medium leading-relaxed italic">
                        "To strengthen the agribusiness sector while supporting progress in infrastructure and solar energy through integrated, innovative solutions that enable sustainable, cost-efficient, and high-performing farming operations."
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="vision"
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-r from-slate-900/90 to-[#0B1E30] border-l-4 border-amber-400 border border-y border-r border-white/10 p-4 sm:p-7 rounded-xl sm:rounded-r-2xl w-full shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    <div className="flex items-center gap-2.5 sm:block shrink-0">
                      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="sm:hidden text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2.5 py-0.5 rounded-md inline-block">
                        Vision Statement
                      </span>
                    </div>

                    <div className="space-y-2 min-w-0 flex-1">
                      <span className="hidden sm:inline-block text-[11px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2.5 py-0.5 rounded-md">
                        Vision Statement
                      </span>
                      <p className="text-xs sm:text-base text-slate-100 font-medium leading-relaxed italic">
                        "To be a competitive global leader in agro-industrial development through bold innovation, sustainable impact, and enduring excellence."
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {STATS.map(({ value, label, sublabel }) => (
            <div
              key={label}
              className="bg-white/5 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/10 text-center space-y-1.5 shadow-lg hover:border-amber-400/40 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-2xl sm:text-4xl font-extrabold font-heading text-amber-400">{value}</p>
              <p className="text-xs sm:text-sm font-bold text-white font-heading">{label}</p>
              <p className="text-[11px] text-slate-400 font-medium">{sublabel}</p>
            </div>
          ))}
        </motion.div>

        {/* Core Values Accordion inside About Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl shadow-black/40 max-w-4xl mx-auto space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
            <div>
              <h3 className="text-2xl font-bold text-white font-heading">
                Our Guiding Core Values
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                The foundational principles driving every project, partnership, and engineering standard at CCDI.
              </p>
            </div>
            <span className="text-xs font-extrabold bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-full self-start sm:self-auto shrink-0 shadow-sm">
              5 Core Principles
            </span>
          </div>

          <div className="space-y-2.5">
            {CORE_VALUES.map((val) => {
              const isOpen = openAccordion === val.id;
              return (
                <div
                  key={val.id}
                  className="bg-black/30 rounded-2xl border border-white/8 shadow-xs overflow-hidden transition-all duration-300 hover:border-amber-400/30"
                >
                  <button
                    onClick={() => setOpenAccordion((prev) => (prev === val.id ? '' : val.id))}
                    className="w-full flex items-center justify-between p-4 sm:p-4.5 text-left hover:bg-white/5 transition-colors gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-400 shrink-0 shadow-xs">
                        {val.icon}
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-white font-heading">
                          {val.title}
                        </h4>
                        <p className="text-xs text-slate-300 font-medium">
                          {val.summary}
                        </p>
                      </div>
                    </div>

                    <div className={['p-1.5 rounded-full transition-transform duration-300', isOpen ? 'rotate-180 bg-amber-400 text-slate-950' : 'bg-white/10 text-slate-300'].join(' ')}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 border-t border-white/8 bg-black/20">
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium pt-3 sm:pl-12">
                            {val.details}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};


