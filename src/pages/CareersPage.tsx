import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  X,
} from 'lucide-react';

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
}


const DISCIPLINES = [
  {
    code: '01',
    name: 'CIVIL',
    focus: 'Structural & Farm Envelopes',
    desc: 'Heavy foundation engineering, insulated sandwich panel envelopes, steel truss erection, and biosecure floor drainage.',
  },
  {
    code: '02',
    name: 'MECHANICAL',
    focus: 'Feedmills & Climate Automation',
    desc: 'High-throughput pelleting towers, automated micro-ingredient dosing, bucket elevators, corrugated grain silos, and precision ventilation systems.',
  },
  {
    code: '03',
    name: 'ELECTRICAL',
    focus: 'Microgrids & Solar Arrays',
    desc: 'Rooftop solar arrays, 3-phase generator synchronization inverters, energy monitoring telemetry, and industrial grid integration.',
  },
];

const JOB_POSITIONS: JobPosition[] = [
  {
    id: 'civil-project-engineer',
    title: 'Senior Agro-Industrial Civil Project Engineer',
    department: 'Civil & Structural',
    location: 'Clark Freeport Zone HQ / Project Sites',
    type: 'Full-Time',
    experience: '5+ Years Experience',
    description:
      'Lead structural execution and civil construction for large-scale pre-fabricated broiler housing, layer facilities, and turnkey agro-industrial complexes.',
    responsibilities: [
      'Manage on-site civil and structural engineering teams across Central Luzon projects.',
      'Supervise foundation pouring, steel truss erection, and insulated panel envelope installation.',
      'Coordinate directly with client project managers and international structural suppliers.',
      'Ensure strict biosecurity zone separation and structural adherence to national building codes.',
    ],
    qualifications: [
      'Licensed Civil Engineer (BS Civil Engineering).',
      'Minimum 5 years in industrial steel structure erection or large-scale agricultural projects.',
      'Strong proficiency with AutoCAD, structural blueprints, and site surveying.',
    ],
  },
  {
    id: 'solar-pv-engineer',
    title: 'Solar PV Microgrid Electrical Systems Specialist',
    department: 'Electrical & Solar PV',
    location: 'Clark Freeport Zone / Regional Deployments',
    type: 'Full-Time',
    experience: '3+ Years Experience',
    description:
      'Design, synchronize, and commission industrial rooftop solar PV arrays and backup diesel/hybrid microgrid infrastructure for agricultural operations.',
    responsibilities: [
      'Perform solar PV system sizing, string design, and inverter specification for farm roofs.',
      'Supervise AC/DC wiring, breaker panel integration, and grid-tie compliance.',
      'Configure real-time energy telemetry and remote battery/solar power monitoring.',
      'Liaise with local electric cooperatives for net-metering and interconnect approvals.',
    ],
    qualifications: [
      'Registered Electrical Engineer (REE) or Master Electrician.',
      'Demonstrated experience with utility or commercial C&I solar PV installations (100kW+).',
      'Working knowledge of PVsyst, solar irradiance modeling, and telemetry sensors.',
    ],
  },
  {
    id: 'mechanical-feedmill-specialist',
    title: 'Automated Feedmill Mechanical Systems Specialist',
    department: 'Mechanical & Feedmills',
    location: 'Central Luzon / North Luzon Project Sites',
    type: 'Full-Time',
    experience: '4+ Years Experience',
    description:
      'Direct the mechanical assembly, alignment, and commissioning of automated batching, hammer mills, pelleting lines, and grain storage silos.',
    responsibilities: [
      'Supervise mechanical installation of bucket elevators, drag conveyors, and mixer assemblies.',
      'Conduct pneumatic pressure testing, vibration balancing, and gearbox alignment.',
      'Oversee trial batching runs and calibrate load cell dosing systems to ±0.1% accuracy.',
      'Train client operational technicians on preventative mechanical maintenance.',
    ],
    qualifications: [
      'Licensed Mechanical Engineer (BS Mechanical Engineering).',
      'Direct background in bulk material handling, grain storage silos, or feed processing plants.',
      'Solid command of mechanical torque specs, pneumatic circuits, and welding standards.',
    ],
  },
  {
    id: 'hvac-climate-technician',
    title: 'Poultry Climate Automation & HVAC Field Specialist',
    department: 'Automation & HVAC',
    location: 'Tarlac / Pampanga / Batangas Deployments',
    type: 'Full-Time',
    experience: '2+ Years Experience',
    description:
      'Calibrate environmental climate controllers, tunnel ventilation fans, static pressure sensors, and evaporative cooling pads in high-density houses.',
    responsibilities: [
      'Install and commission centralized microclimate controllers and variable frequency drives (VFDs).',
      'Balance tunnel ventilation airflow, static pressure thresholds, and emergency winch drops.',
      'Troubleshoot climate telemetry, temperature sensor loops, and automated alarm systems.',
      'Provide rapid response technical support during flock brooding and transfer cycles.',
    ],
    qualifications: [
      'Vocational diploma or BS in Electrical/Electronics/Refrigeration & Air Conditioning.',
      'Hands-on experience with modern poultry climate computers (Fancom, Skov, Munters, Rotem).',
      'Willingness to travel to project sites across Central & Northern Luzon.',
    ],
  },
  {
    id: 'cad-bim-drafter',
    title: 'Agro-Industrial CAD & BIM Architectural Drafter',
    department: 'Civil & Structural',
    location: 'Clark Freeport Zone HQ',
    type: 'Full-Time',
    experience: '2+ Years Experience',
    description:
      'Draft precision architectural, structural, and MEP fabrication blueprints for turnkey broiler facilities, hatcheries, and feedmills.',
    responsibilities: [
      'Generate detailed 2D CAD architectural plans, sections, and structural detail sheets.',
      'Develop 3D BIM models identifying MEP clashes between ventilation ducts and structural trusses.',
      'Prepare as-built drawings and bill of materials (BOM) for procurement teams.',
      'Standardize drawing title blocks and revision records across all project units.',
    ],
    qualifications: [
      'Degree or diploma in Architecture, Civil Engineering, or Drafting Technology.',
      'Expert proficiency in AutoCAD and Revit/SketchUp.',
      'Prior exposure to industrial warehouse or pre-engineered building (PEB) detailing.',
    ],
  },
  {
    id: 'biosecurity-safety-officer',
    title: 'Project Safety & Biosecurity Compliance Officer',
    department: 'Safety & Compliance',
    location: 'Active Construction Sites',
    type: 'Full-Time',
    experience: '3+ Years Experience',
    description:
      'Enforce construction site safety protocols while ensuring strict agro-industrial pathogen defense and environmental zoning requirements.',
    responsibilities: [
      'Conduct daily site safety toolboxes and enforce DOLE occupational safety standards.',
      'Implement bio-exclusion checkpoints (vehicle disinfection dips, boot washes, quarantine zones).',
      'Monitor environmental waste disposal and stormwater discharge during construction.',
      'Maintain comprehensive site incident logs and submit weekly compliance audits.',
    ],
    qualifications: [
      'Certified DOLE Safety Officer 2 (SO2) or Safety Officer 3 (SO3).',
      'Background in agricultural biosecurity, food facility engineering, or industrial construction.',
      'Firm leadership and proactive communication skills.',
    ],
  },
  {
    id: 'technical-sales-manager',
    title: 'Agro-Industrial Technical Sales Manager',
    department: 'Sales & Business Development',
    location: 'Clark Freeport Zone HQ / Regional Client Deployments',
    type: 'Full-Time',
    experience: '4+ Years Experience',
    description:
      'Drive enterprise sales and technical project proposals for turnkey broiler houses, commercial layer battery cages, automated feedmills, and solar microgrids across commercial poultry integrators and farm operators in the Philippines.',
    responsibilities: [
      'Identify, prospect, and close turnkey EPC contracts with livestock integrators, commercial broiler growers, and egg producers.',
      'Collaborate with civil, mechanical, and electrical engineering teams to generate detailed project bids, CapEx estimates, and ROI payback models.',
      'Conduct technical presentations on modern climate-controlled housing, automated feeding/drinking automation, and biosecurity ROI to farm owners and executives.',
      'Maintain strong relationships with regional poultry associations, feed manufacturers, and agricultural cooperative leaders.',
    ],
    qualifications: [
      'Bachelor’s Degree in Agriculture, Animal Science, Agribusiness, BS Civil/Mechanical Engineering, or related discipline.',
      'Minimum 4 years demonstrated success in B2B technical sales within agricultural machinery, livestock equipment, or construction EPC sectors.',
      'Exceptional negotiation, client presentation, and commercial contract closing skills with established poultry grower networks.',
    ],
  },
  {
    id: 'b2b-marketing-specialist',
    title: 'B2B Agro-Industrial Marketing & Brand Specialist',
    department: 'Sales & Marketing',
    location: 'Clark Freeport Zone HQ / Hybrid',
    type: 'Full-Time',
    experience: '3+ Years Experience',
    description:
      'Lead multi-channel B2B marketing initiatives, industry trade exhibitions, technical case studies, and digital marketing to position CCDI as the premier turnkey agricultural infrastructure partner across the Philippines.',
    responsibilities: [
      'Plan and execute B2B marketing campaigns targeting agricultural investors, commercial integrators, and industrial livestock operators.',
      'Coordinate CCDI exhibitions and trade presence at major industry events such as the Philippine Poultry Show, Agrilink, and livestock summits.',
      'Develop impactful project case studies, client testimonial videos, technical brochures, and construction milestone content.',
      'Manage digital presence, corporate website messaging, and targeted industry outreach to generate qualified commercial construction inquiries.',
    ],
    qualifications: [
      'Bachelor’s Degree in Marketing, Communications, Agribusiness, or related field.',
      '3+ years of B2B marketing experience within industrial construction, agricultural engineering, or heavy equipment sectors.',
      'Strong capabilities in technical content creation, graphic design, social media marketing, and event coordination.',
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
    linkedinResume: '',
    coverNote: '',
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
            alt="CCDI Engineering Team"
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

          {/* Architectural Accent 2 - Top Left Anchored (Fades in downwards on view) */}
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

          {/* Architectural Dynamic Accent Graphic - Aligned with diagonal divider (Fades in upwards on view) */}
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
            CCDI CAREERS / MULTIDISCIPLINARY TALENT
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.06] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
              Shape the Future of{' '}
              <span className="text-[#F3A812] block mt-1">
                Philippine Agro-Industry.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-100 max-w-2xl leading-relaxed font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              Clarkbase Construction Dev't Inc. (CCDI) delivers high-performance turnkey infrastructure — from bio-secure broiler complexes and cleanroom hatcheries to precision feedmills and industrial solar microgrids. Join our engineering team at Clark Freeport Zone.
            </p>
          </div>

          {/* Frosted Dark Talent Benchmarks Panel */}
          <div className="pt-8 mt-8">
            <div className="bg-[#07162A]/90 backdrop-blur-md border border-[#1E3E66] p-5 sm:p-6 rounded-[2px] shadow-xl grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl">
              <div className="border-l-2 border-[#F3A812] pl-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums">
                  06
                </div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#F3A812] font-bold">
                  Active Openings
                </p>
                <p className="text-xs text-slate-300">Immediate deployment</p>
              </div>

              <div className="border-l-2 border-[#F3A812] pl-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums">
                  CLARK
                </div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#F3A812] font-bold">
                  HQ & Logistics Hub
                </p>
                <p className="text-xs text-slate-300">Clark Freeport Zone</p>
              </div>

              <div className="border-l-2 border-[#F3A812] pl-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums">
                  TURNKEY
                </div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#F3A812] font-bold">
                  Full-Scope EPC
                </p>
                <p className="text-xs text-slate-300">Design to commissioning</p>
              </div>

              <div className="border-l-2 border-[#F3A812] pl-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums">
                  100%
                </div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#F3A812] font-bold">
                  Biosecurity Defense
                </p>
                <p className="text-xs text-slate-300">Rigorous safety standards</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. WHY BUILD AT CCDI (CRISP LIGHT ARCHITECTURAL SECTION - BREAKS MONOLITHIC BACKGROUND) ── */}
      <section className="relative py-24 bg-slate-50 text-slate-900 border-y border-slate-200 overflow-hidden">
        {/* Architectural Top-Right Corner Accent */}
        <img
          src="/images/accents/card-corner-accent.png"
          alt=""
          className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-top pointer-events-none select-none z-0 opacity-25"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-3 max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block">
              WHY CHOOSE A CAREER AT CCDI
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B192C] tracking-tight leading-tight">
              An engineering culture built for monumental impact.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              We operate at the critical intersection of modern agriculture, heavy civil construction, mechanical automation, and commercial renewable energy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 p-7 rounded-[2px] shadow-sm hover:border-[#0B192C] hover:shadow-md transition-all space-y-3">
              <span className="font-mono text-xs font-bold text-amber-600 tracking-wider">01 / NATIONAL IMPACT</span>
              <h3 className="text-lg font-black text-[#0B192C] tracking-tight">
                National Food Security Infrastructure
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your projects directly modernize the country's livestock, poultry, and feed production capacity with pathogen-resistant bio-secure engineering.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-7 rounded-[2px] shadow-sm hover:border-[#0B192C] hover:shadow-md transition-all space-y-3">
              <span className="font-mono text-xs font-bold text-amber-600 tracking-wider">02 / TECHNOLOGY</span>
              <h3 className="text-lg font-black text-[#0B192C] tracking-tight">
                Global Automation & Solar Microgrids
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deploy state-of-the-art European climate microcomputers, automated batching robotics, pneumatic conveying, and rooftop solar microgrids.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-7 rounded-[2px] shadow-sm hover:border-[#0B192C] hover:shadow-md transition-all space-y-3">
              <span className="font-mono text-xs font-bold text-amber-600 tracking-wider">03 / PROJECT MASTERY</span>
              <h3 className="text-lg font-black text-[#0B192C] tracking-tight">
                Full-Lifecycle Project Ownership
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Witness your designs move from structural blueprinting and foundation excavation to live flock transfer and batching plant commissioning.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-7 rounded-[2px] shadow-sm hover:border-[#0B192C] hover:shadow-md transition-all space-y-3">
              <span className="font-mono text-xs font-bold text-amber-600 tracking-wider">04 / CAREER GROWTH</span>
              <h3 className="text-lg font-black text-[#0B192C] tracking-tight">
                Competitive CapEx Incentives
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enjoy competitive compensation, site allowances, project delivery bonuses, and direct career progression paths within an expanding firm.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. CORE ENGINEERING DISCIPLINES (ARCHITECTURAL SPOTLIGHT) ── */}
      <section className="py-20 border-b border-[#102A43] bg-[#07162A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[#102A43] pb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#F3A812] font-bold block mb-1">
                ENGINEERING DIVISIONS
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Multidisciplinary Specializations
              </h2>
            </div>
            <p className="font-mono text-xs text-slate-400">
              CROSS-FUNCTIONAL TEAMS DEPLOYED NATIONWIDE
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DISCIPLINES.map((d) => (
              <div
                key={d.code}
                className="bg-[#0B192C] border border-[#1E3E66] p-6 rounded-[2px] space-y-3 hover:border-[#F3A812] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#F3A812]">{d.code}</span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{d.name}</h3>
                <p className="text-xs font-mono text-amber-300 font-medium">{d.focus}</p>
                <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-[#102A43]">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. OPEN POSITIONS DIRECTORY (LITE THEME) ── */}
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
                OPEN OPPORTUNITIES
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0B192C] tracking-tight">
                Explore Available Positions
              </h2>
            </div>
            <p className="font-mono text-xs text-slate-500">
              SHOWING <span className="text-amber-600 font-bold tabular-nums">{JOB_POSITIONS.length}</span> OPENINGS
            </p>
          </div>

          {/* Jobs Listing: Crisp White Cards */}
          <div className="space-y-5">
            {JOB_POSITIONS.map((job) => (
              <article
                key={job.id}
                className="bg-white border border-slate-200 hover:border-[#0B192C] transition-all p-6 sm:p-8 rounded-[2px] space-y-6 shadow-sm hover:shadow-md text-left"
              >
                {/* Header: Title, Department, Meta */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-[2px] bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                        {job.department}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-[2px] bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                        {job.type}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                        {job.experience}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-[#0B192C] tracking-tight">
                      {job.title}
                    </h3>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
                    <div className="font-mono text-xs text-slate-600 flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-[2px] border border-slate-200">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{job.location}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleApplyClick(job)}
                      className="px-6 py-2.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-extrabold bg-[#0B192C] hover:bg-[#1E3E66] text-white transition-colors shrink-0 shadow-sm"
                    >
                      Apply for Role →
                    </button>
                  </div>
                </div>

                {/* Job Details: Description & Two Column Grid */}
                <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
                  {job.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2 bg-slate-50 p-4 rounded-[2px] border border-slate-200">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-amber-700 font-bold">
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-600 font-bold font-mono">›</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 bg-slate-50 p-4 rounded-[2px] border border-slate-200">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-amber-700 font-bold">
                      Candidate Qualifications
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {job.qualifications.map((qual, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-600 font-bold font-mono">›</span>
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* General Inquiries Box (Lite Theme) */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1">
              <h3 className="text-lg font-black text-[#0B192C]">
                Don't see your specific engineering specialization?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                We are constantly onboarding licensed structural engineers, project managers, and HVAC technicians. Send your CV directly to our HR team at Clark Freeport Zone.
              </p>
            </div>
            <a
              href="mailto:careers@clarkbase.com"
              className="px-6 py-3 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold bg-[#0B192C] hover:bg-[#1E3E66] text-white border border-[#0B192C] transition-colors shrink-0 text-center shadow-sm"
            >
              Email CV to careers@clarkbase.com
            </a>
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
              className="relative w-full max-w-2xl bg-[#07162A] border-2 border-[#F3A812]/60 rounded-[2px] p-6 sm:p-8 z-10 space-y-6 text-left shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-[#102A43] pb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#F3A812] font-bold">
                    JOB APPLICATION / {selectedJob.department}
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">
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
                  <p className="text-sm text-slate-200 max-w-md mx-auto">
                    Thank you, <span className="text-white font-bold">{formData.fullName}</span>. Your engineering application has been routed directly to the CCDI Technical Recruitment board at Clark Freeport Zone.
                  </p>
                  <p className="text-xs text-slate-400">
                    A recruitment specialist will contact you at {formData.email} within 2–3 business days.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mt-4 px-6 py-2.5 rounded-[2px] bg-[#F3A812] text-slate-950 font-bold text-xs uppercase tracking-wider"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
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
                        placeholder="Engr. Juan Dela Cruz"
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] uppercase tracking-wider text-slate-300 font-semibold block">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+63 917 123 4567"
                        className="w-full px-3 py-2 rounded-[2px] bg-[#0B192C] border border-[#102A43] text-white focus:outline-none focus:border-[#F3A812]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[10px] uppercase tracking-wider text-slate-300 font-semibold block">
                        LinkedIn / Portfolio URL *
                      </label>
                      <input
                        type="url"
                        required
                        value={formData.linkedinResume}
                        onChange={(e) => setFormData({ ...formData, linkedinResume: e.target.value })}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-3 py-2 rounded-[2px] bg-[#0B192C] border border-[#102A43] text-white focus:outline-none focus:border-[#F3A812]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-slate-300 font-semibold block">
                      Summary of Relevant Engineering Experience
                    </label>
                    <textarea
                      rows={4}
                      value={formData.coverNote}
                      onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                      placeholder="Highlight key agro-industrial, civil, electrical, or mechanical projects you have managed..."
                      className="w-full px-3 py-2 rounded-[2px] bg-[#0B192C] border border-[#102A43] text-white focus:outline-none focus:border-[#F3A812] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#102A43]">
                    <span className="font-mono text-[10px] text-slate-400">
                      * All fields handled confidentially by CCDI HR.
                    </span>
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
