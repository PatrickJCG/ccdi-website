import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  X,
  CheckCircle2,
  Gift,
  Mail,
  Phone,
  Building2,
  FileText,
  Briefcase,
  GraduationCap,
  User,
} from 'lucide-react';
import { BenchmarkStatStrip } from '../components/molecules/BenchmarkStatStrip';

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  department?: string;
  image: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-2',
    name: 'Engr. Christian Reyes',
    designation: 'Head of Civil & Structural Engineering',
    department: 'Civil & Structural Design',
    image: '',
  },
  {
    id: 'tm-3',
    name: 'Engr. Ronald Mendoza',
    designation: 'Senior Poultry Housing & Climate Systems Engineer',
    department: 'Poultry Production Systems',
    image: '',
  },
  {
    id: 'tm-4',
    name: 'Dr. Arvin Santos',
    designation: 'Hatchery Automation & Biosecurity Specialist',
    department: 'Hatchery Solutions',
    image: '',
  },
  {
    id: 'tm-5',
    name: 'Engr. Mark De Leon',
    designation: 'Feedmill Systems & Milling Equipment Lead',
    department: 'Feedmill Solutions',
    image: '',
  },
  {
    id: 'tm-6',
    name: 'Engr. Rafael Bautista',
    designation: 'Renewable Energy & Solar Systems Lead',
    department: 'Solar Power Systems',
    image: '',
  },
  {
    id: 'tm-7',
    name: 'Dennis Villanueva',
    designation: 'Technical Services & Spare Parts Operations Lead',
    department: 'After-Sales & Field Services',
    image: '',
  },
  {
    id: 'tm-8',
    name: 'Ma. Elena Dizon',
    designation: 'Project Delivery & Client Success Manager',
    department: 'Project Management',
    image: '',
  },
];

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  posterImage: string;
  badge?: string;
}

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white border border-slate-200 hover:border-amber-400 rounded-[2px] p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
      <div className="space-y-4">
        {/* Profile Photo / Avatar placeholder */}
        <div className="relative aspect-square w-full overflow-hidden rounded-[2px] bg-slate-100 border border-slate-200 group-hover:border-amber-400/80 transition-colors flex items-center justify-center">
          {member.image && !imageError ? (
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4 text-center select-none">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-200/80 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 group-hover:border-amber-400/60 group-hover:text-amber-500 transition-colors shadow-inner">
                <User className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.5]" />
              </div>
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-3 font-semibold">
                Photo Placeholder
              </span>
            </div>
          )}

          {/* Architectural Top-Right Corner Accent */}
          <img
            src="/images/accents/card-corner-accent.png"
            alt=""
            className="absolute top-0 right-0 w-16 sm:w-20 h-auto object-contain object-right-top pointer-events-none select-none z-10 opacity-70"
            aria-hidden="true"
          />

          {member.department && (
            <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
              <span className="font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-[2px] bg-[#07162A]/90 text-amber-400 border border-amber-400/40 backdrop-blur-xs shadow-xs">
                {member.department}
              </span>
            </div>
          )}
        </div>

        {/* Member Name & Role / Job Title */}
        <div className="space-y-1.5 pt-1 text-left">
          <h3 className="text-lg font-black text-[#0B192C] tracking-tight group-hover:text-amber-600 transition-colors">
            {member.name}
          </h3>
          <p className="font-mono text-xs text-amber-600 font-bold uppercase tracking-wider leading-snug">
            {member.designation}
          </p>
        </div>
      </div>
    </div>
  );
};

const JOB_POSITIONS: JobPosition[] = [
  {
    id: 'sales-trainee-north-luzon',
    title: 'Sales Trainee',
    department: 'Sales & Commercial Development',
    location: 'North Luzon (Field-Based)',
    type: 'Full-Time • Field-Based',
    experience: 'Entry-Level / Fresh Graduates Welcome',
    badge: 'Urgent Hiring',
    posterImage: '/images/careers/sales-trainee-north-luzon.png',
    description:
      'Kickstart your career in modern agricultural infrastructure. Undergo comprehensive commercial training and mentorship while conducting fieldwork across North Luzon to identify farm development opportunities.',
    responsibilities: [
      'Undergo hands-on commercial and technical training covering poultry housing, hatcheries, feedmills, and solar systems.',
      'Conduct regular fieldwork and client visits across assigned agricultural territories in North Luzon.',
      'Assist senior sales leads in prospecting farm owners, livestock integrators, and agricultural cooperatives.',
      'Prepare sales presentations, project quotations, and client meeting follow-ups.',
      'Coordinate closely with CCDI technical and engineering teams to address customer inquiries.',
    ],
    qualifications: [
      'Graduate of BS in Marketing, Engineering, Agriculture, Business Courses, or Doctor of Veterinary Medicine (DVM).',
      'Excellent communication, presentation, and relationship-building skills.',
      'Resilient, coachable, and highly motivated to learn and achieve regional performance targets.',
      'Willing to conduct active fieldwork and travel to assigned provincial project areas.',
      'Must possess a valid driver’s license (at least Non-Professional).',
    ],
    benefits: [
      'Competitive base salary with attractive commission incentives',
      'Comprehensive Insurance Plan and HMO health coverage',
      'Paid time off: 10 vacation leaves, 10 sick leaves, and 1 birthday leave',
      'Clear structured opportunities for rapid career advancement',
      'Hands-on technical mentorship in modern agricultural engineering',
    ],
  },
  {
    id: 'sales-rep-north-luzon-visayas',
    title: 'Sales Representative',
    department: 'Sales & Commercial Development',
    location: 'North Luzon & Visayas (Hybrid)',
    type: 'Full-Time • Hybrid',
    experience: '2+ Years Sales Experience Preferred',
    badge: 'High Priority',
    posterImage: '/images/careers/sales-rep-north-luzon-visayas.png',
    description:
      'Drive high-value commercial sales and turnkey EPC project partnerships across North Luzon and Visayas. Build long-term relationships with farm owners, livestock integrators, and industry partners.',
    responsibilities: [
      'Identify, qualify, and develop new turnkey project opportunities across poultry, feedmill, and solar sectors.',
      'Build and nurture strong commercial relationships with farm owners, integrators, and industry partners.',
      'Conduct regular on-site client visits, technical presentations, and project follow-ups.',
      'Coordinate seamlessly with Engineering, Technical, and Marketing teams to craft tailored project proposals.',
      'Achieve regional sales targets and maintain accurate, up-to-date sales pipeline reports.',
    ],
    qualifications: [
      'Graduate of Agriculture, Engineering, Business, Marketing, or a related bachelor’s degree.',
      'At least 2 years of technical, project-based, agricultural, construction, or equipment sales experience preferred.',
      'Prior background in poultry, livestock, solar, industrial construction, or EPC contracts is an advantage.',
      'Strong communication, negotiation, and high-impact presentation skills.',
      'Willing to travel and conduct regular fieldwork across North Luzon and the Visayas region.',
      'Must possess a valid driver’s license (at least Non-Professional).',
    ],
    benefits: [
      'Competitive base salary with performance-driven commission incentives',
      'Comprehensive Insurance Plan and HMO health coverage',
      'Paid time off: 10 vacation leaves, 10 sick leaves, and 1 birthday leave',
      'Clear roadmap for career growth and professional development',
      'Supportive and collaborative team culture with full engineering backing',
    ],
  },
  {
    id: 'sales-rep-mindanao',
    title: 'Sales Representative',
    department: 'Sales & Commercial Development',
    location: 'Mindanao (Field-Based)',
    type: 'Full-Time • Field-Based',
    experience: 'Agri / Equipment / Solar Advantage',
    badge: 'Regional Expansion',
    posterImage: '/images/careers/sales-rep-mindanao.png',
    description:
      'Lead CCDI’s strategic expansion across the Mindanao agricultural corridor. Partner with commercial growers, poultry integrators, and feedmill operators to deliver world-class turnkey farm infrastructure.',
    responsibilities: [
      'Spearhead business development and lead generation with farm owners and livestock integrators across Mindanao.',
      'Conduct on-site farm assessments, client presentations, and technical consultations.',
      'Collaborate with the central engineering hub to formulate project specifications and investment payback analyses.',
      'Establish lasting commercial relationships with provincial agricultural leaders and cooperatives.',
      'Achieve regional sales targets and maintain real-time reporting on market intelligence and project pipelines.',
    ],
    qualifications: [
      'Graduate of Agriculture, Engineering, Business, Marketing, or a related course.',
      'Direct sales experience in poultry, livestock, construction, solar power, or industrial equipment is an advantage.',
      'Strong communication, client relationship, and negotiation capabilities.',
      'Willingness to travel regularly across Mindanao to conduct farm site visits.',
      'Must possess a valid driver’s license.',
    ],
    benefits: [
      'Competitive salary package and comprehensive employee benefits',
      'Generous paid time off: 10 vacation leaves, 10 sick leaves, and 1 birthday leave',
      'Supportive and collaborative workplace culture',
      'Exciting career growth and professional development opportunities',
      'Stable employment with a dynamic and rapidly growing industry leader',
    ],
  },
  {
    id: 'sales-marketing-coordinator',
    title: 'Sales and Marketing Coordinator',
    department: 'Sales & Marketing',
    location: 'Clark Freeport Zone, Pampanga (HQ)',
    type: 'Full-Time • Office-Based',
    experience: 'With Relevant CRM & Sales Support Experience',
    badge: 'HQ Office',
    posterImage: '/images/careers/sales-marketing-coordinator.png',
    description:
      'Manage central sales operations, CRM pipelines, executive support, and marketing campaigns from our headquarters at Clark Freeport Zone. The ideal candidate excels in data management and cross-functional coordination.',
    responsibilities: [
      'Manage CRM records, incoming sales leads, client follow-ups, and commercial performance reports.',
      'Support corporate marketing campaigns, promotional initiatives, and customer engagement events.',
      'Provide executive support, including calendar management, meeting coordination, correspondence, and document preparation.',
      'Organize, clean, consolidate, and analyze raw sales and marketing data using Microsoft Excel; prepare accurate trackers, reports, and management summaries.',
    ],
    qualifications: [
      'Bachelor’s degree in Business Administration, Marketing, Communications, or a related field.',
      'Proven relevant experience in sales coordination, CRM management, marketing, or executive support.',
      'Must be highly organized, discreet, trustworthy, and demonstrate strong professional integrity.',
      'Intermediate to advanced proficiency in Microsoft Excel, including complex formulas, PivotTables, data filtering, validation, and large datasets.',
    ],
    benefits: [
      'Competitive salary and comprehensive employee benefits',
      'Paid time off: 10 vacation leaves, 10 sick leaves, and 1 birthday leave',
      'Supportive, collaborative, and professional workplace culture',
      'Career growth and executive development pathways',
      'Stable employment with a dynamic and growing organization in Clark Freeport Zone',
    ],
  },
];

export const CareersPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experienceSummary: '',
    hasPhotoAndCV: false,
  });

  const handleApplyClick = (job: JobPosition) => {
    setSelectedJob(job);
    setSubmitted(false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="text-slate-100 min-h-screen text-left font-sans bg-[#040D18]">
      
      {/* ── 1. HERO SECTION (ATMOSPHERIC TEAM PHOTOGRAPHY + BROCHURE TWO-TONE TYPOGRAPHY) ── */}
      <section className="relative pt-32 pb-24 border-b border-[#102A43] overflow-hidden bg-[#040D18]">
        {/* Background Team Image Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/hero/careers-team.jpg"
            alt="CCDI Team"
            className="w-full h-full object-cover object-center brightness-[0.85] contrast-[1.12]"
          />
          {/* Dual-zone dark navy overlay for maximum text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#040D18] via-[#040D18]/95 via-45% to-[#07162A]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040D18] via-[#040D18]/40 to-[#040D18]/80" />

          {/* Diagonal Architectural Line */}
          <div
            className="hidden lg:block absolute right-[32%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F3A812]/90 via-[#F3A812]/40 to-transparent pointer-events-none -skew-x-[26deg]"
            aria-hidden="true"
          />

          {/* Architectural Accent 2 - Top Left Anchored */}
          <motion.div
            initial={{ opacity: 0, y: -45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden sm:block absolute -top-12 -left-16 sm:-top-8 sm:left-0 w-80 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0"
            aria-hidden="true"
          >
            <img
              src="/images/accents/accent2.png"
              alt=""
              className="w-full h-auto object-contain opacity-30"
            />
          </motion.div>

          {/* Architectural Dynamic Accent Graphic */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden sm:block absolute -right-12 -bottom-12 md:right-4 md:bottom-0 lg:right-8 lg:bottom-2 w-80 sm:w-96 lg:w-[520px] pointer-events-none select-none z-0"
            aria-hidden="true"
          >
            <img
              src="/images/accents/dark-accent-graphic.png"
              alt=""
              className="w-full h-auto object-contain opacity-30"
            />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="font-mono text-xs uppercase tracking-widest text-[#F3A812] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            CCDI CAREERS / MEET OUR TEAM
          </div>

          {/* Headline + Paragraph on Left, Balanced with Logo on Right */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
            <div className="space-y-4 max-w-2xl xl:max-w-3xl">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.06] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                Meet the People Behind CCDI
              </h1>
              <p className="text-base sm:text-lg text-slate-100 max-w-2xl leading-relaxed font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                From engineering and construction to project delivery and technical support, our team works together on poultry, hatchery, feedmill, and solar projects across the Philippines. Get to know the people behind our work and explore opportunities to join CCDI.
              </p>
            </div>

            {/* Balanced CCDI Crest Logo on Right */}
            <div className="shrink-0 self-start lg:self-center hidden sm:flex items-center justify-center lg:pr-8 xl:pr-14">
              <img
                src="/images/branding/CCDI logo.svg"
                alt="Clarkbase Construction Development Inc."
                className="h-28 sm:h-36 md:h-44 lg:h-52 w-auto object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)] filter transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Frosted Dark Talent Benchmarks Panel */}
          <div className="pt-8 mt-8">
            <div className="bg-[#07162A]/90 backdrop-blur-md border border-[#1E3E66] p-6 sm:p-8 rounded-[2px] shadow-xl max-w-5xl w-full">
              <BenchmarkStatStrip
                eyebrow="TEAM & CAPABILITIES"
                items={[
                  { value: '50+', label: 'ENGINEERS & SPECIALISTS', sublabel: 'Multidisciplinary experts' },
                  { value: 'CLARK', label: 'HQ & LOGISTICS HUB', sublabel: 'Clark Freeport Zone' },
                  { value: 'NATIONWIDE', label: 'REGIONAL FOOTPRINT', sublabel: 'Luzon, Visayas & Mindanao' },
                  { value: '100%', label: 'IN-HOUSE DELIVERY', sublabel: 'Turnkey project execution' },
                ]}
                theme="dark"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. TEAM SHOWCASE (RESPONSIVE GRID) ───────────────────────── */}
      <section id="team" className="relative py-20 sm:py-28 bg-slate-50 text-slate-900 border-b border-slate-200 overflow-hidden">
        {/* Architectural Top-Right Corner Accent */}
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="space-y-2 max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
                CCDI TEAM SHOWCASE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight">
                Our Specialists & Project Leaders
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Dedicated professionals driving engineering excellence, biosecurity innovation, and turnkey execution for modern agribusiness projects.
              </p>
            </div>
            <p className="font-mono text-xs text-slate-500 shrink-0">
              SHOWING <span className="text-amber-600 font-bold tabular-nums">{TEAM_MEMBERS.length}</span> KEY TEAM LEADERS
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. OPEN POSITIONS DIRECTORY (LITE THEME) ── */}
      <section id="positions" className="relative py-24 bg-slate-50 text-slate-900 border-t border-slate-200 overflow-hidden">
        {/* Architectural Top-Right Corner Accent */}
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block mb-1">
                CURRENT JOB POSTINGS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0B192C] tracking-tight">
                We're Hiring: Join Our Growing Team
              </h2>
            </div>
            <p className="font-mono text-xs text-slate-500">
              SHOWING <span className="text-amber-600 font-bold tabular-nums">{JOB_POSITIONS.length}</span> ACTIVE OPENINGS
            </p>
          </div>

          {/* Quick Notice Banner on CV & Photo */}
          <div className="bg-amber-50/80 border border-amber-300/80 rounded-[2px] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div>
              <p className="font-bold text-slate-900 text-sm">
                Official Application Requirements
              </p>
              <p className="text-slate-700 mt-0.5">
                Interested candidates must submit an <strong className="text-slate-900">updated CV</strong> and <strong className="text-amber-700">latest photo</strong> to <a href="mailto:recruitment@ccdi-asia.com" className="font-mono font-bold text-amber-700 underline hover:text-amber-800">recruitment@ccdi-asia.com</a>.
              </p>
            </div>
            <div className="font-mono text-[11px] text-slate-600 shrink-0 bg-white px-3 py-1.5 border border-amber-200 rounded-[2px]">
              Direct Inquiries: <span className="font-semibold text-slate-800">0919-0669352 | 0925-761-9101</span>
            </div>
          </div>

          {/* Jobs Listing: Crisp Cards with Poster Thumbnail & Comprehensive Info */}
          <div className="space-y-8">
            {JOB_POSITIONS.map((job) => (
              <article
                key={job.id}
                className="bg-white border border-slate-200 hover:border-[#0B192C] transition-all rounded-[2px] shadow-sm hover:shadow-md text-left overflow-hidden"
              >
                {/* Main Card Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Header: Title, Department, Meta */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-slate-100 pb-5">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {job.badge && (
                          <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-[2px] bg-amber-500 text-slate-950 font-normal">
                            {job.badge}
                          </span>
                        )}
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-[2px] bg-slate-100 text-slate-700 border border-slate-200 font-normal">
                          {job.department}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-[2px] bg-sky-50 text-sky-800 border border-sky-200 font-normal">
                          {job.type}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-normal">
                          {job.experience}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight">
                        {job.title}
                      </h3>

                      <div className="font-mono text-xs text-slate-600 flex items-center gap-1.5 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="font-semibold text-slate-800">{job.location}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
                      <button
                        type="button"
                        onClick={() => handleApplyClick(job)}
                        className="px-6 py-2.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-extrabold bg-[#0B192C] hover:bg-[#1E3E66] text-white transition-colors shadow-sm cursor-pointer"
                      >
                        Apply for Role →
                      </button>
                    </div>
                  </div>

                  {/* Job Overview Description */}
                  <p className="text-sm text-slate-700 leading-relaxed max-w-4xl font-normal">
                    {job.description}
                  </p>

                  {/* 3-Column Detailed Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    
                    {/* Responsibilities */}
                    <div className="space-y-3 bg-slate-50 p-5 rounded-[2px] border border-slate-200">
                      <div className="flex items-center gap-2 text-slate-900 border-b border-slate-200 pb-2">
                        <Briefcase className="w-4 h-4 text-amber-600" />
                        <h4 className="font-mono text-xs uppercase tracking-wider font-black">
                          Key Responsibilities
                        </h4>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {job.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-600 font-bold font-mono shrink-0">›</span>
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Qualifications */}
                    <div className="space-y-3 bg-slate-50 p-5 rounded-[2px] border border-slate-200">
                      <div className="flex items-center gap-2 text-slate-900 border-b border-slate-200 pb-2">
                        <GraduationCap className="w-4 h-4 text-amber-600" />
                        <h4 className="font-mono text-xs uppercase tracking-wider font-black">
                          Job Qualifications
                        </h4>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {job.qualifications.map((qual, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-medium text-slate-700">{qual}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What We Offer */}
                    <div className="space-y-3 bg-amber-50/60 p-5 rounded-[2px] border border-amber-200/90">
                      <div className="flex items-center gap-2 text-[#0B192C] border-b border-amber-200 pb-2">
                        <Gift className="w-4 h-4 text-amber-600" />
                        <h4 className="font-mono text-xs uppercase tracking-wider font-black text-amber-900">
                          What We Offer
                        </h4>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {job.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-600 font-bold font-mono shrink-0">✓</span>
                            <span className="leading-relaxed font-medium">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Submission Reminder Strip */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500 font-mono">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-amber-600" />
                      <span>Send updated CV and latest photo to: <strong className="text-slate-800">recruitment@ccdi-asia.com</strong></span>
                    </div>
                    <a
                      href={`mailto:recruitment@ccdi-asia.com?subject=Job Application - ${encodeURIComponent(job.title)} (${encodeURIComponent(job.location)})`}
                      className="text-amber-700 hover:text-amber-800 font-bold hover:underline"
                    >
                      Quick Apply via Email →
                    </a>
                  </div>

                </div>
              </article>
            ))}
          </div>

          {/* General Inquiries & Contact Office Box (Lite Theme) */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-[2px] flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-sm">
            <div className="space-y-2 max-w-2xl">
              <div className="font-mono text-[10px] uppercase tracking-wider text-amber-600 font-bold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>CCDI HEADQUARTERS & RECRUITMENT DESK</span>
              </div>
              <h3 className="text-xl font-black text-[#0B192C]">
                Ready to take the next step in your career?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Send your updated CV and latest photo to our recruitment office, or reach out directly to our HR team for application inquiries.
              </p>
              <div className="pt-2 text-xs text-slate-500 space-y-1 font-mono">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  Office Center 05K Berthaphil Clark Center, Clark Freeport Zone, Pampanga, Philippines
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  0919-0669352 | 0925-761-9101 | 0920-986-8070
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href="mailto:recruitment@ccdi-asia.com?subject=Career%20Application%20-%20CCDI"
                className="px-6 py-3.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-extrabold bg-[#0B192C] hover:bg-[#1E3E66] text-white border border-[#0B192C] transition-colors text-center shadow-sm flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Email recruitment@ccdi-asia.com</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. APPLICATION MODAL ── */}
      <AnimatePresence>
        {isModalOpen && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 z-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-2xl bg-[#07162A] border-2 border-[#F3A812]/60 rounded-[2px] p-6 sm:p-8 z-10 space-y-6 text-left shadow-2xl max-h-[92vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-[#102A43] pb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#F3A812] font-bold">
                    JOB APPLICATION / {selectedJob.department}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {selectedJob.title}
                  </h3>
                  <p className="font-mono text-xs text-slate-300 mt-0.5">
                    {selectedJob.location} • {selectedJob.type}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close application modal"
                  className="w-8 h-8 rounded-[2px] bg-[#102A43] hover:bg-[#1E3E66] border border-[#1E3E66] hover:border-[#F3A812]/70 text-slate-300 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-sm group shrink-0"
                >
                  <X className="w-4 h-4 transition-transform group-hover:scale-110" />
                </button>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 font-sans">
                  <span className="font-mono text-2xl text-[#F3A812] font-bold block">
                    ✓ APPLICATION TRANSMITTED
                  </span>
                  <p className="text-sm text-slate-200 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-bold">{formData.fullName}</span>. Your application for <strong className="text-[#F3A812]">{selectedJob.title}</strong> has been logged.
                  </p>
                  <div className="p-4 bg-[#0B192C] border border-[#1E3E66] rounded-[2px] max-w-md mx-auto text-xs text-slate-300 space-y-2">
                    <p className="font-semibold text-white">Next Step for Faster Processing:</p>
                    <p>
                      Please send your <strong>updated CV</strong> and <strong>latest photo</strong> directly to:
                    </p>
                    <p className="font-mono text-[#F3A812] font-bold text-sm">
                      recruitment@ccdi-asia.com
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Include "{selectedJob.title} - {formData.fullName}" in your email subject line.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2.5 rounded-[2px] bg-[#F3A812] text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                  
                  {/* Poster requirement callout */}
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-[2px] text-slate-300 text-[11px] space-y-1">
                    <p className="font-bold text-[#F3A812] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      Required by CCDI Recruitment:
                    </p>
                    <p className="text-slate-300">
                      Applicants are required to provide an <strong>updated CV</strong> and <strong>latest photo</strong>. You can fill out this form and email your files directly to <span className="text-white font-mono font-semibold">recruitment@ccdi-asia.com</span>.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] uppercase tracking-wider text-slate-300 font-semibold block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Juan Dela Cruz"
                        className="w-full px-3 py-2 rounded-[2px] bg-[#0B192C] border border-[#102A43] text-white focus:outline-none focus:border-[#F3A812]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[10px] uppercase tracking-wider text-slate-300 font-semibold block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="juan.delacruz@example.com"
                        className="w-full px-3 py-2 rounded-[2px] bg-[#0B192C] border border-[#102A43] text-white focus:outline-none focus:border-[#F3A812]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-slate-300 font-semibold block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0919 123 4567"
                      className="w-full px-3 py-2 rounded-[2px] bg-[#0B192C] border border-[#102A43] text-white focus:outline-none focus:border-[#F3A812]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-slate-300 font-semibold block">
                      Background / Relevant Experience Summary
                    </label>
                    <textarea
                      rows={3}
                      value={formData.experienceSummary}
                      onChange={(e) => setFormData({ ...formData, experienceSummary: e.target.value })}
                      placeholder="Mention your course/degree, driver's license status, agricultural or sales background, and current location..."
                      className="w-full px-3 py-2 rounded-[2px] bg-[#0B192C] border border-[#102A43] text-white focus:outline-none focus:border-[#F3A812] resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="photoCvReady"
                      checked={formData.hasPhotoAndCV}
                      onChange={(e) => setFormData({ ...formData, hasPhotoAndCV: e.target.checked })}
                      className="mt-0.5 rounded text-amber-500 focus:ring-amber-500"
                    />
                    <label htmlFor="photoCvReady" className="text-[11px] text-slate-300">
                      I have my updated CV and latest photo ready to email to <span className="text-[#F3A812] font-mono">recruitment@ccdi-asia.com</span>.
                    </label>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#102A43]">
                    <a
                      href={`mailto:recruitment@ccdi-asia.com?subject=Job Application - ${encodeURIComponent(selectedJob.title)}&body=Hello CCDI Recruitment Team,%0D%0A%0D%0AI would like to apply for the position of ${encodeURIComponent(selectedJob.title)} (${encodeURIComponent(selectedJob.location)}).%0D%0A%0D%0APlease find attached my updated CV and latest photo.%0D%0A%0D%0AName: ${encodeURIComponent(formData.fullName)}%0D%0APhone: ${encodeURIComponent(formData.phone)}`}
                      className="text-[#F3A812] hover:underline font-mono text-[11px] flex items-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Or click here to open your email client</span>
                    </a>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-extrabold bg-[#F3A812] hover:bg-amber-300 text-slate-950 transition-colors shadow-sm"
                    >
                      Submit Application →
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>



    </div>
  );
};
