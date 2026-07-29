import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, TrendingUp, Building2, Cpu, ChevronDown, Award, HeartHandshake, Zap, Users, Leaf } from 'lucide-react';
import { SectionHeader } from '../atoms';

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
    icon: <HeartHandshake className="w-5 h-5 text-amber-500" />,
    summary: 'Unwavering transparency, honesty, and accountability.',
    details: 'We conduct every project with uncompromised ethics, transparent pricing, and dependable commitments. For CCDI, trust is the cornerstone of every client partnership and vendor relationship.',
  },
  {
    id: 'excellence',
    title: 'Strive for Excellence',
    icon: <Award className="w-5 h-5 text-amber-500" />,
    summary: 'Rigorous quality benchmarks across all builds.',
    details: 'We hold our design standards, construction craftsmanship, and equipment installations to strict international benchmarks. Settling for "good enough" is never an option.',
  },
  {
    id: 'innovation',
    title: 'Power for Innovation',
    icon: <Zap className="w-5 h-5 text-amber-500" />,
    summary: 'Smart automation and clean energy integration.',
    details: 'We actively introduce state-of-the-art agricultural technology, automation systems, and renewable energy models to elevate traditional farming into high-tech industrial assets.',
  },
  {
    id: 'customer',
    title: 'Customer Focus',
    icon: <Users className="w-5 h-5 text-amber-500" />,
    summary: 'Tailoring solutions to unique operational goals.',
    details: 'Every agricultural facility presents unique environmental and operational challenges. We listen closely, tailor our engineering plans to client goals, and provide ongoing technical support.',
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    icon: <Leaf className="w-5 h-5 text-amber-500" />,
    summary: 'Eco-efficient infrastructure protecting natural resources.',
    details: 'We are deeply committed to protecting natural resources. Through energy-efficient building envelopes, low-emissions feedmill designs, and solar energy integration, we help build a greener future.',
  },
];

export const WhyChooseUs: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string>('integrity');

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="values" className="relative py-16 sm:py-20 bg-gray-50 border-b border-slate-200/60 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-ccdi-navy/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-ccdi-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Geometric Angled Branding Accent Line */}
      <div className="absolute top-16 right-0 w-96 h-3 bg-gradient-to-l from-ccdi-navy via-ccdi-gold to-transparent transform -rotate-6 opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            tag="Why Choose CCDI?"
            title="Built on Engineering Integrity & Proven Performance"
            description="We combine international material standards, direct supply chains, and specialized engineering knowledge to deliver agro-industrial infrastructure projects on time, within budget, and built to last."
          />
        </motion.div>

        {/* ── 4 PILLARS OF STRENGTH (Responsive Grid) ─────────────────── */}
        <div className="space-y-6">
          <h3 className="text-xl font-extrabold text-slate-900 font-heading flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-ccdi-gold inline-block" />
            <span>Our 4 Core Operational Strengths</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Reliability */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-xl hover:border-ccdi-navy transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-ccdi-navy text-ccdi-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-heading group-hover:text-ccdi-navy transition-colors">
                1. Uncompromising Reliability
              </h4>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                Trusted Global Suppliers & Certified Materials
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                We source strictly from certified, world-class manufacturing partners to ensure structural integrity, biosecurity compliance, and long-term durability in all climate conditions.
              </p>
            </motion.div>

            {/* Pillar 2: Cost Efficiency */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-xl hover:border-amber-500 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-heading group-hover:text-amber-600 transition-colors">
                2. Strategic Cost Efficiency
              </h4>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                Optimized CapEx & OpEx Engineering
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Through value engineering and modular planning, we minimize upfront capital costs while maximizing lifetime thermal, energy, and operational efficiency.
              </p>
            </motion.div>

            {/* Pillar 3: Direct Sourcing */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-xl hover:border-ccdi-navy transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-ccdi-navy text-ccdi-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-heading group-hover:text-ccdi-navy transition-colors">
                3. Direct Global Sourcing
              </h4>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                Tier-One Manufacturer Relationships
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                By bypassing middle-layer distribution channels, CCDI secures direct tier-one pricing and factory warranties on heavy equipment, environmental controls, and components.
              </p>
            </motion.div>

            {/* Pillar 4: People Competency */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-xl hover:border-amber-500 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-heading group-hover:text-amber-600 transition-colors">
                4. People & Technical Competency
              </h4>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                Multi-Disciplinary Engineering Experts
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our multi-disciplinary team brings deep field expertise across civil engineering, mechanical systems, agricultural technology, and renewable solar energy integration.
              </p>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};
