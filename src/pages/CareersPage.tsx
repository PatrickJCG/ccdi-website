import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Copy,
  Check,
} from 'lucide-react';
import { BenchmarkStatStrip } from '../components/molecules/BenchmarkStatStrip';
import { SolutionHeroBanner } from '../components/molecules/SolutionHeroBanner';
import { TeamShowcaseSection } from '../components/organisms/TeamShowcaseSection';
import { CornerAccent } from '../components/atoms/ArchitecturalAccents';
import { buildMailtoUrl } from '../utils/inquiryMailto';
import { RECRUITMENT_EMAIL } from '../config/legal';

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
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [formError, setFormError] = useState('');
  const [mailtoUrl, setMailtoUrl] = useState('');
  const [draftText, setDraftText] = useState('');
  const [copiedDraft, setCopiedDraft] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experienceSummary: '',
    hasPhotoAndCV: false,
  });

  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleApplyClick = (job: JobPosition) => {
    setSelectedJob(job);
    setSubmitted(false);
    setPrivacyAccepted(false);
    setFormError('');
    setCopiedDraft(false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!selectedJob) return;
    if (!privacyAccepted) {
      setFormError('Please confirm that you consent to our Applicant Privacy Notice.');
      return;
    }

    const lines = [
      `Hello CCDI Recruitment Team,`,
      '',
      `I would like to apply for the position of ${selectedJob.title} (${selectedJob.location}).`,
      '',
      `Full Name: ${formData.fullName.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Phone: ${formData.phone.trim()}`,
      formData.experienceSummary.trim()
        ? `\r\nRelevant Background:\r\n${formData.experienceSummary.trim()}`
        : '',
      '',
      'Please find attached my updated CV (recent photo optional).',
    ]
      .filter((line) => line !== undefined)
      .join('\r\n');

    const subject = `Job Application - ${selectedJob.title} - ${formData.fullName.trim()}`;
    const url = buildMailtoUrl(RECRUITMENT_EMAIL, subject, lines);
    setMailtoUrl(url);
    setDraftText(`To: ${RECRUITMENT_EMAIL}\r\nSubject: ${subject}\r\n\r\n${lines}`);
    setSubmitted(true);
    window.location.href = url;
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(draftText);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  return (
    <div className="text-slate-100 min-h-screen text-left font-sans bg-[#040D18]">
      
      {/* ── 1. HERO BANNER ────────────────────────────────────────────── */}
      <SolutionHeroBanner
        breadcrumbs={[
          { label: 'HOME', path: '/' },
          { label: 'CAREERS' },
        ]}
        title="Meet the People Behind CCDI"
        subtitle="From engineering and construction to project delivery and technical support, our team works together on poultry, hatchery, feedmill, and solar projects across the Philippines. Get to know the people behind our work and explore opportunities to join CCDI."
        backgroundImage="/images/hero/careers-team.jpg"
        imageAlt="CCDI Team"
        bottomContent={
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
        }
      />

      {/* ── 2. TEAM SHOWCASE (ORG CHART & CARDS TOGGLE) ─────────────── */}
      <TeamShowcaseSection />

      {/* ── 3. OPEN POSITIONS DIRECTORY (LITE THEME) ── */}
      <section id="positions" className="relative py-24 bg-slate-50 text-slate-900 border-t border-slate-200 overflow-hidden">
        <CornerAccent />

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

          {/* Quick Notice Banner on CV Submission */}
          <div className="bg-amber-50/80 border border-amber-300/80 rounded-[2px] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div>
              <p className="font-bold text-slate-900 text-sm">
                Official Application Requirements
              </p>
              <p className="text-slate-700 mt-0.5">
                Interested candidates should submit an <strong className="text-slate-900">updated CV</strong> (recent photo optional) to <a href="mailto:recruitment@ccdi-asia.com" className="font-mono font-bold text-amber-700 underline hover:text-amber-800">recruitment@ccdi-asia.com</a>.
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
                      <span>Send your updated CV (photo optional) to: <strong className="text-slate-800">recruitment@ccdi-asia.com</strong></span>
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
                Send your updated CV (recent photo optional) to our recruitment office, or reach out directly to our HR team for application inquiries.
              </p>
              <div className="pt-2 text-xs text-slate-500 space-y-1 font-mono">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  Office Center 05J Berthaphil Clark Center, Clark Freeport Zone, Pampanga, Philippines
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
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="career-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
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
                  <h3 id="career-modal-title" className="text-xl sm:text-2xl font-black text-white mt-1">
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
                <div className="py-10 text-center space-y-4 font-sans">
                  <span className="font-mono text-2xl text-[#F3A812] font-bold block">
                    ✓ APPLICATION EMAIL DRAFT READY
                  </span>
                  <p className="text-sm text-slate-200 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-bold">{formData.fullName}</span>. Your email client has been opened with a pre-filled application for <strong className="text-[#F3A812]">{selectedJob.title}</strong>. Please attach your updated CV and click Send.
                  </p>
                  <div className="p-4 bg-[#0B192C] border border-[#1E3E66] rounded-[2px] max-w-md mx-auto text-xs text-slate-300 space-y-2">
                    <p className="font-semibold text-white">Next Step to Complete Your Application:</p>
                    <p>
                      Attach your <strong>updated CV</strong> (recent photo optional) and send directly to:
                    </p>
                    <p className="font-mono text-[#F3A812] font-bold text-sm">
                      {RECRUITMENT_EMAIL}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Include &ldquo;{selectedJob.title} - {formData.fullName}&rdquo; in your email subject line.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
                    <a
                      href={mailtoUrl}
                      className="px-5 py-2.5 rounded-[2px] bg-[#F3A812] text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors inline-flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Open Email Client
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      className="px-5 py-2.5 rounded-[2px] bg-[#0B192C] border border-[#1E3E66] hover:border-[#F3A812] text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedDraft ? <Check className="w-3.5 h-3.5 text-[#F3A812]" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedDraft ? 'Copied Details' : 'Copy Application Details'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2.5 rounded-[2px] bg-transparent border border-[#1E3E66] text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                  
                  {/* Application requirement callout */}
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-[2px] text-slate-300 text-[11px] space-y-1">
                    <p className="font-bold text-[#F3A812] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      CCDI Recruitment Submission Guide:
                    </p>
                    <p className="text-slate-300">
                      Please prepare an <strong>updated CV</strong> (recent photo optional). Submitting this form opens a pre-filled email draft addressed to <span className="text-white font-mono font-semibold">{RECRUITMENT_EMAIL}</span> so you can attach your CV and send directly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="career-full-name" className="font-mono text-[10px] uppercase tracking-wider text-slate-300 font-semibold block">
                        Full Name *
                      </label>
                      <input
                        id="career-full-name"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Juan Dela Cruz"
                        className="w-full px-3 py-2 rounded-[2px] bg-[#0B192C] border border-[#102A43] text-white focus:outline-none focus:border-[#F3A812]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="career-email" className="font-mono text-[10px] uppercase tracking-wider text-slate-300 font-semibold block">
                        Email Address *
                      </label>
                      <input
                        id="career-email"
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
                    <label htmlFor="career-phone" className="font-mono text-[10px] uppercase tracking-wider text-slate-300 font-semibold block">
                      Phone Number *
                    </label>
                    <input
                      id="career-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0919 123 4567"
                      className="w-full px-3 py-2 rounded-[2px] bg-[#0B192C] border border-[#102A43] text-white focus:outline-none focus:border-[#F3A812]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="career-experience" className="font-mono text-[10px] uppercase tracking-wider text-slate-300 font-semibold block">
                      Background / Relevant Experience Summary
                    </label>
                    <textarea
                      id="career-experience"
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
                      I have my updated CV ready to attach and email to <span className="text-[#F3A812] font-mono">{RECRUITMENT_EMAIL}</span> (photo optional).
                    </label>
                  </div>

                  <div className="p-3 bg-[#0B192C] border border-[#102A43] rounded-[2px] space-y-2">
                    <label htmlFor="career-privacy-consent" className="flex items-start gap-2 text-[11px] text-slate-300 leading-relaxed cursor-pointer">
                      <input
                        id="career-privacy-consent"
                        type="checkbox"
                        required
                        checked={privacyAccepted}
                        onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        className="mt-0.5 rounded text-amber-500 focus:ring-amber-500 shrink-0"
                      />
                      <span>
                        <strong>Applicant Privacy Notice:</strong> I consent to CCDI processing my application details solely for recruitment evaluation under Philippine RA 10173 and the{' '}
                        <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#F3A812] hover:underline font-semibold">
                          Privacy Policy
                        </Link>
                        . *
                      </span>
                    </label>
                    {formError && (
                      <p className="text-[11px] text-red-300 bg-red-950/50 border border-red-800/60 rounded-[2px] px-2.5 py-1.5">
                        {formError}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#102A43]">
                    <a
                      href={`mailto:${RECRUITMENT_EMAIL}?subject=${encodeURIComponent(`Job Application - ${selectedJob.title}`)}&body=${encodeURIComponent(`Hello CCDI Recruitment Team,\n\nI would like to apply for the position of ${selectedJob.title} (${selectedJob.location}).\n\nPlease find attached my updated CV (recent photo optional).\n\nName: ${formData.fullName}\nPhone: ${formData.phone}`)}`}
                      className="text-[#F3A812] hover:underline font-mono text-[11px] flex items-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Or click here to open your email client</span>
                    </a>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-extrabold bg-[#F3A812] hover:bg-amber-300 text-slate-950 transition-colors shadow-sm cursor-pointer"
                    >
                      Prepare Application Email →
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
