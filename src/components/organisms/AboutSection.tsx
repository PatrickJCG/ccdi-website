import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_QUALITY_ITEMS } from '../../data/mockProducts';
import { 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Eye, 
  BookOpen, 
  Users, 
  Wrench, 
  Shield,
  Award,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { SectionHeader } from '../atoms';
import { QualityCard } from '../molecules';



export const AboutSection: React.FC = () => {
  const qualityIcons = [
    <Award        className="w-5 h-5 text-construction_gold-600" key="1" />,
    <CheckCircle2 className="w-5 h-5 text-industrial_blue-600"   key="2" />,
    <ShieldCheck  className="w-5 h-5 text-agro_green-600"        key="3" />,
    <Users        className="w-5 h-5 text-industrial_blue-600"   key="4" />,
    <Shield       className="w-5 h-5 text-construction_gold-600" key="5" />,
    <TrendingUp   className="w-5 h-5 text-agro_green-600"        key="6" />,
  ];

  return (
    <section className="relative py-14 sm:py-16 bg-white border-b border-slate-200/60 overflow-hidden bg-grid-pattern">
      {/* Ambient orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-industrial_blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-agro_green-500/10 rounded-full blur-3xl -z-10 pointer-events-none animate-float-slow" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-construction_gold-500/8 rounded-full blur-3xl -z-10 pointer-events-none animate-float-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14 relative z-10">

        {/* ── PART 1: ABOUT OVERVIEW ── */}
        <div id="about" className="space-y-8 scroll-mt-28">
          <SectionHeader
            tag="About CCDI"
            title="Pioneering Integrated Agro-Industrial Infrastructure"
            description="Delivering end-to-end engineering, facility construction, equipment installation, and solar energy systems since 2019."
          />

          <div className="grid md:grid-cols-4 gap-6">
            {/* Reliability */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-3 hover:border-ccdi-navy/40 hover:bg-slate-100/50 transition-all duration-300 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-ccdi-navy/10 text-ccdi-navy flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">Reliability</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Trusted global suppliers and high-quality materials ensuring biosecure, durable, and climate-resilient farm structures.
              </p>
            </motion.div>

            {/* Cost Efficiency */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-3 hover:border-ccdi-navy/40 hover:bg-slate-100/50 transition-all duration-300 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-ccdi-navy/10 text-ccdi-navy flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">Cost Efficiency</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Smartly optimized capital and operational expenditure through value engineering and energy-efficient designs.
              </p>
            </motion.div>

            {/* Direct Sourcing */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-3 hover:border-ccdi-navy/40 hover:bg-slate-100/50 transition-all duration-300 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-ccdi-navy/10 text-ccdi-navy flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">Direct Sourcing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Strong tier-one supplier relationships beyond distribution, passing savings and direct warranties to our clients.
              </p>
            </motion.div>

            {/* People Competency */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-3 hover:border-ccdi-navy/40 hover:bg-slate-100/50 transition-all duration-300 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-ccdi-navy/10 text-ccdi-navy flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">People Competency</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Skilled professionals with deep technical expertise in civil engineering, automation, and solar integration.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── PART 2: MISSION & VISION ── */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Mission */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-ccdi-navy text-ccdi-gold flex items-center justify-center shadow-xs">
                <Eye className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">Our Mission</h3>
            </div>
            <div className="relative border-l-4 border-ccdi-navy pl-4 py-2 bg-white rounded-r-xl shadow-xs">
              <p className="text-slate-800 text-sm sm:text-base font-medium leading-relaxed">
                "To strengthen the agribusiness sector while supporting progress in infrastructure and solar energy through integrated, innovative solutions that enable sustainable, cost-efficient, and high-performing farming operations."
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-ccdi-navy text-ccdi-gold flex items-center justify-center shadow-xs">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">Our Vision</h3>
            </div>
            <div className="relative border-l-4 border-ccdi-navy pl-4 py-2 bg-white rounded-r-xl shadow-xs">
              <p className="text-slate-800 text-sm sm:text-base font-medium leading-relaxed">
                "To be a competitive global leader in agro-industrial development through bold innovation, sustainable impact, and enduring excellence."
              </p>
            </div>
          </div>
        </div>

        {/* ── PART 3: CORE VALUES ── */}
        <div className="space-y-8">
          <SectionHeader
            tag="Core Values"
            title="The Pillars Driving Our Craft"
            description="The foundational principles guiding every project, partnership, and engineering standard at CCDI."
          />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Integrity */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2.5 text-brand-teal-700">
                <ShieldCheck className="w-5 h-5" />
                <h4 className="text-base font-bold font-heading text-slate-900">Integrity</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unwavering transparency, honesty, and accountability across every engineering contract and client partnership.
              </p>
            </div>

            {/* Strive for Excellence */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2.5 text-brand-teal-700">
                <Award className="w-5 h-5" />
                <h4 className="text-base font-bold font-heading text-slate-900">Strive for Excellence</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rigorous quality benchmarks in design, procurement, structural execution, and after-sales technical support.
              </p>
            </div>

            {/* Power for Innovation */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2.5 text-brand-teal-700">
                <Zap className="w-5 h-5" />
                <h4 className="text-base font-bold font-heading text-slate-900">Power for Innovation</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Embracing modern technology, smart automation, and renewable energy to advance Philippine agribusiness.
              </p>
            </div>

            {/* Customer Focus */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2.5 text-brand-teal-700">
                <Users className="w-5 h-5" />
                <h4 className="text-base font-bold font-heading text-slate-900">Customer Focus</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tailoring custom facility solutions to the unique operational goals and geographical demands of each producer.
              </p>
            </div>

            {/* Sustainability */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2.5 text-brand-teal-700">
                <Wrench className="w-5 h-5" />
                <h4 className="text-base font-bold font-heading text-slate-900">Sustainability</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Building eco-efficient infrastructure that conserves natural resources and lowers long-term carbon emissions.
              </p>
            </div>
          </div>
        </div>

        {/* ── PART 4: QUALITY & STANDARDS ── */}
        <div>
          <SectionHeader
            tag="Standards & Excellence"
            title="Certified Quality & Engineering Standards"
            description="Operating under strict testing protocols and regulatory approvals to deliver structural and operational consistency."
            className="mb-8"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_QUALITY_ITEMS.map((item, idx) => (
              <QualityCard
                key={item.id}
                title={item.title}
                description={item.description}
                icon={qualityIcons[idx % qualityIcons.length]}
                certCode={item.certCode}
                delay={idx * 0.08}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
