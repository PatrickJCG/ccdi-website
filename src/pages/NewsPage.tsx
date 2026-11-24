import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Phone,
  Mail,
  Globe,
  User,
  BookOpen,
  RotateCcw,
  X,
  MapPin,
} from 'lucide-react';
import {
  NEWS_ARTICLES,
  NEWS_CATEGORIES,
  CCDI_CONTACT_INFO,
  type NewsArticle,
  type ProjectStatus,
} from '../data/newsData';
import { ProjectImageCarousel } from '../components/molecules/ProjectImageCarousel';
import { CornerAccent, DarkAccentGraphic, SectionAccents } from '../components/atoms/ArchitecturalAccents';
import type { Product } from '../data/mockProducts';

export interface NewsPageProps {
  inquiryItems?: Product[];
  onToggleInquiry?: (product: Product) => void;
  onRemoveInquiryItem?: (productId: string) => void;
}

/* ──────────────────────────────────────────────────────────────────────────
 * Shared helpers
 * ────────────────────────────────────────────────────────────────────────── */

const CategoryChip: React.FC<{ label: string; dark?: boolean }> = ({ label, dark = false }) => (
  <span
    className={`inline-block font-mono text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-[2px] border ${dark
      ? 'bg-[#07162A]/80 text-slate-200 border-white/15 backdrop-blur-sm'
      : 'bg-white text-slate-600 border-slate-200'
      }`}
  >
    {label}
  </span>
);

const ProjectStatusBadge: React.FC<{ status: ProjectStatus; surface?: 'overlay' | 'light' }> = ({
  status,
  surface = 'overlay',
}) => {
  const isFinished = status === 'Finished Project';
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-[2px] border ${surface === 'overlay'
        ? 'bg-[#07162A]/80 text-slate-100 border-white/15 backdrop-blur-sm'
        : 'bg-white text-slate-700 border-slate-200'
        }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${surface === 'overlay'
          ? isFinished
            ? 'bg-slate-300'
            : 'bg-amber-400'
          : isFinished
            ? 'bg-slate-400'
            : 'bg-amber-500'
          }`}
      />
      {status}
    </span>
  );
};

/** Uniform article card used in the grid and the related section. */
const ArticleCard: React.FC<{ article: NewsArticle; index?: number }> = ({ article, index = 0 }) => {
  const carouselImages =
    article.galleryImages && article.galleryImages.length > 0
      ? article.galleryImages
      : [article.imageUrl];

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index, 8) * 0.04 }}
      className="group h-full"
    >
      <Link
        to={`/news/${article.id}`}
        id={`news-card-${article.id}`}
        className="flex flex-col h-full bg-white rounded-[2px] border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#0B192C] transition-all duration-300"
      >
        <ProjectImageCarousel
          images={carouselImages}
          alt={article.title}
          aspectClassName="aspect-[16/10]"
          imageClassName="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        >
          <CornerAccent className="absolute top-0 right-0 w-24 sm:w-28 h-auto z-10 drop-shadow-sm opacity-85" />
          {(article.projectStatus || article.category !== 'Project Milestone') && (
            <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center gap-1.5 pointer-events-none">
              {article.projectStatus && <ProjectStatusBadge status={article.projectStatus} />}
              {article.category !== 'Project Milestone' && <CategoryChip label={article.category} dark />}
            </div>
          )}
        </ProjectImageCarousel>

        <div className="relative overflow-hidden flex flex-col flex-1 p-6">
          <DarkAccentGraphic className="absolute -right-4 -bottom-4 w-32 h-auto object-contain object-right-bottom opacity-[0.09] z-0" />

          <div className="relative z-10 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-slate-500 mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              {article.date}
            </span>
            {article.location && (
              <span className="flex items-center gap-1 text-slate-600 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                {article.location}
              </span>
            )}
          </div>

          <h3 className="relative z-10 text-lg font-bold text-[#0B192C] leading-snug tracking-tight line-clamp-2 group-hover:text-amber-600 transition-colors mb-2">
            {article.title}
          </h3>

          <p className="relative z-10 text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">{article.summary}</p>

          <span className="relative z-10 mt-auto pt-4 border-t border-slate-100 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider font-bold text-amber-600 group-hover:text-amber-700">
            Read Article
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
};

/** Dark CTA band reused at the bottom of both views. */
const ContactBand: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative bg-[#07162A] text-white border-t border-[#102A43] overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <SectionAccents
        topLeftClassName="absolute -top-10 -left-14 sm:-top-6 sm:left-0 w-64 sm:w-80 lg:w-[400px] pointer-events-none select-none z-0"
        bottomRightClassName="absolute -bottom-14 -right-14 sm:-right-8 sm:bottom-0 w-64 sm:w-80 lg:w-[400px] pointer-events-none select-none z-0"
        imageOpacityClassName="opacity-25"
        offsetY={35}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#F3A812] font-bold block">
            Project Inquiry & Consultation
          </span>
          <h2 className="text-2xl sm:text-3xl font-black !text-white text-white tracking-tight leading-tight">
            Planning a turnkey farm, hatchery, feedmill, or solar project?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            For project consultations, equipment inquiries, or technical support, reach out to Clarkbase Construction
            Dev't Inc. (CCDI).
          </p>
          <button
            id="news-contact-cta"
            type="button"
            onClick={() => navigate('/#contact')}
            className="mt-3 inline-flex items-center gap-2 px-6 py-3 rounded-[2px] bg-amber-400 hover:bg-amber-300 text-slate-950 font-sans text-xs uppercase tracking-wider font-extrabold transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            Contact Our Team
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <ul className="lg:col-span-5 divide-y divide-[#1E3E66] border border-[#1E3E66] rounded-[2px] bg-[#0B192C]">
          <li className="flex items-center gap-4 p-5">
            <Phone className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-1">Phone</p>
              {CCDI_CONTACT_INFO.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block text-sm font-semibold hover:text-amber-400 transition-colors">
                  {p}
                </a>
              ))}
            </div>
          </li>
          <li className="flex items-center gap-4 p-5">
            <Mail className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-1">Email</p>
              <a href={`mailto:${CCDI_CONTACT_INFO.email}`} className="text-sm font-semibold hover:text-amber-400 transition-colors">
                {CCDI_CONTACT_INFO.email}
              </a>
            </div>
          </li>
          <li className="flex items-center gap-4 p-5">
            <Globe className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-1">Facebook</p>
              <a
                href={CCDI_CONTACT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold hover:text-amber-400 transition-colors"
              >
                {CCDI_CONTACT_INFO.facebook}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
 * Article detail view
 * ────────────────────────────────────────────────────────────────────────── */

const ArticleView: React.FC<{ article: NewsArticle }> = ({ article }) => {
  const [copied, setCopied] = useState(false);

  const related = useMemo(() => {
    const sameCategory = NEWS_ARTICLES.filter((a) => a.id !== article.id && a.category === article.category);
    const others = NEWS_ARTICLES.filter((a) => a.id !== article.id && a.category !== article.category);
    return [...sameCategory, ...others].slice(0, 3);
  }, [article]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    document.title = `${article.title} | CCDI News & Updates`;
  }, [article]);

  return (
    <motion.div key={article.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {/* ── ARTICLE HEADER (BREADCRUMBS & TITLE) ── */}
      <div className="relative overflow-hidden">
        <CornerAccent className="absolute top-0 right-0 w-64 sm:w-80 lg:w-[440px] h-auto z-0 opacity-25" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-2 space-y-5">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
            <Link to="/" className="hover:text-amber-600 transition-colors uppercase">
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <Link to="/news" className="hover:text-amber-600 transition-colors uppercase">
              NEWS &amp; UPDATES
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="text-amber-600 font-bold uppercase">
              {article.category}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {article.projectStatus && <ProjectStatusBadge status={article.projectStatus} surface="light" />}
            {article.category !== 'Project Milestone' && <CategoryChip label={article.category} />}
            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-600">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              {article.date}
            </span>
            {article.location && (
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                {article.location}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-600">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#0B192C] leading-[1.2] max-w-4xl">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 pt-1">
            <div className="w-10 h-10 rounded-[2px] bg-[#0B192C] border border-[#1E3E66] flex items-center justify-center text-amber-400 font-mono font-bold shadow-xs">
              {article.author.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-[#0B192C]">{article.author.name}</p>
              <p className="text-xs font-mono text-slate-500">{article.author.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <section className="bg-slate-50 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Main column */}
          <article className="lg:col-span-8 space-y-10">
            <Link
              to="/news"
              id="news-back-link"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-slate-600 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to all updates
            </Link>

            {/* Lead */}
            <p className="text-xl sm:text-2xl text-[#0B192C] font-semibold leading-relaxed tracking-tight">
              {article.summary}
            </p>

            {/* Feature image / Project Gallery Carousel */}
            <figure className="rounded-[2px] overflow-hidden border border-slate-200 shadow-sm bg-slate-100 p-2 sm:p-3">
              <ProjectImageCarousel
                images={article.galleryImages?.length ? article.galleryImages : [article.imageUrl]}
                alt={article.title}
                aspectClassName="aspect-[16/9]"
                imageClassName="object-cover object-center"
                showThumbnails={(article.galleryImages?.length ?? 0) > 1}
                showCaption={true}
                autoPlayInterval={5500}
              >
                <CornerAccent className="absolute top-0 right-0 w-28 sm:w-36 h-auto z-10 drop-shadow-sm opacity-80" />
              </ProjectImageCarousel>
            </figure>

            {/* Key highlights */}
            {article.keyHighlights?.length > 0 && (
              <div className="relative overflow-hidden bg-white border border-slate-200 border-l-4 border-l-amber-500 rounded-[2px] p-6 sm:p-8 shadow-sm">
                <CornerAccent className="absolute top-0 right-0 w-36 sm:w-44 h-auto z-0 opacity-[0.18]" />
                <div className="relative z-10">
                  <h2 className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold mb-5">
                    Key Highlights
                  </h2>
                  <ul className="space-y-4">
                    {article.keyHighlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700 text-base leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Body paragraphs */}
            <div className="space-y-6">
              {article.content.map((p, idx) => (
                <p key={idx} className="text-slate-700 text-base sm:text-lg leading-[1.8]">
                  {p}
                </p>
              ))}
            </div>

            {/* Tags & actions */}
            <div className="pt-8 border-t border-slate-200 space-y-6">
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-[2px] font-mono text-xs text-slate-600 bg-white border border-slate-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  id="news-share-button"
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[2px] bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  {copied ? 'Link Copied' : 'Share Article'}
                </button>

                {article.externalLink && (
                  <a
                    id="news-source-link"
                    href={article.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[2px] bg-[#0B192C] hover:bg-[#1E3E66] text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors"
                  >
                    View on Facebook
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  </a>
                )}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="relative overflow-hidden bg-white border border-slate-200 rounded-[2px] shadow-sm">
                <CornerAccent className="absolute top-0 right-0 w-32 sm:w-36 h-auto z-0 opacity-[0.18]" />
                <h2 className="relative z-10 px-6 py-4 border-b border-slate-200 font-mono text-xs uppercase tracking-widest text-slate-500 font-bold">
                  Article Details
                </h2>
                <dl className="relative z-10 divide-y divide-slate-100 text-sm">
                  <div className="flex items-start gap-3 px-6 py-4">
                    <Calendar className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-xs text-slate-500">Date</dt>
                      <dd className="font-semibold text-[#0B192C]">{article.date}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 px-6 py-4">
                    <BookOpen className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-xs text-slate-500">Category</dt>
                      <dd className="font-semibold text-[#0B192C]">{article.category}</dd>
                    </div>
                  </div>
                  {article.projectStatus && (
                    <div className="flex items-start gap-3 px-6 py-4">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <dt className="text-xs text-slate-500">Project Status</dt>
                        <dd className="font-semibold text-[#0B192C]">{article.projectStatus}</dd>
                      </div>
                    </div>
                  )}
                  {article.location && (
                    <div className="flex items-start gap-3 px-6 py-4">
                      <MapPin className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <dt className="text-xs text-slate-500">Location</dt>
                        <dd className="font-semibold text-[#0B192C]">{article.location}</dd>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3 px-6 py-4">
                    <User className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-xs text-slate-500">Written by</dt>
                      <dd className="font-semibold text-[#0B192C]">{article.author.name}</dd>
                      <dd className="text-xs text-slate-500">{article.author.role}</dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="relative overflow-hidden bg-[#07162A] text-white border border-[#102A43] rounded-[2px] p-6">
                <DarkAccentGraphic className="absolute -right-4 -bottom-4 w-36 h-auto object-contain object-right-bottom opacity-25 z-0" />
                <div className="relative z-10 space-y-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#F3A812] font-bold block">
                    Talk to CCDI
                  </span>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Have a question about this project or equipment? Our engineers can help.
                  </p>
                  <div className="space-y-2 text-sm">
                    <a href={`tel:${CCDI_CONTACT_INFO.phones[0].replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                      <Phone className="w-4 h-4 text-amber-400" />
                      {CCDI_CONTACT_INFO.phones[0]}
                    </a>
                    <a href={`mailto:${CCDI_CONTACT_INFO.email}`} className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                      <Mail className="w-4 h-4 text-amber-400" />
                      {CCDI_CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="relative overflow-hidden bg-white border-t border-slate-200 py-16 sm:py-20">
          <CornerAccent className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto z-0 opacity-20" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block mb-2">
                  Keep Reading
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight">More News & Updates</h2>
              </div>
              <Link
                to="/news"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider font-bold text-amber-600 hover:text-amber-700"
              >
                View all updates
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a, i) => (
                <ArticleCard key={a.id} article={a} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactBand />
    </motion.div>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
 * Index (listing) view
 * ────────────────────────────────────────────────────────────────────────── */

const NewsIndex: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    document.title = 'News & Updates | Clarkbase Construction Dev\'t Inc. (CCDI)';
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: NEWS_ARTICLES.length };
    NEWS_ARTICLES.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, []);

  const isFiltering = searchQuery.trim() !== '' || selectedCategory !== 'All';
  const featured = NEWS_ARTICLES.find((a) => a.featured) || NEWS_ARTICLES[0];

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return NEWS_ARTICLES.filter((a) => {
      const matchCat = selectedCategory === 'All' || a.category === selectedCategory;
      const matchQ =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [searchQuery, selectedCategory]);

  // When not filtering, the featured story is shown on its own, so exclude it from the grid.
  const gridArticles = isFiltering ? filtered : filtered.filter((a) => a.id !== featured?.id);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {/* ── 1. PAGE HEADER (BREADCRUMBS & TEXT CONTENT) ── */}
      <div className="relative overflow-hidden bg-slate-50 border-b border-slate-200">
        <CornerAccent className="absolute top-0 right-0 w-64 sm:w-80 lg:w-[440px] h-auto z-0 opacity-25" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 space-y-5">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
            <Link to="/" className="hover:text-amber-600 transition-colors uppercase">
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="text-amber-600 font-bold uppercase">
              NEWS &amp; UPDATES
            </span>
          </nav>

          <div className="max-w-4xl space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#0B192C] leading-[1.2]">
              Company News &amp; Project Updates
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl">
              Stay updated on our latest farm developments, turnkey engineering projects, and company milestones across the Philippines.
            </p>
          </div>
        </div>
      </div>

      {/* ── 2. FILTER TOOLBAR (with hidden desktop scrollbars) ── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col lg:flex-row lg:items-center gap-4 lg:justify-between">
          <div
            className="flex gap-2 overflow-x-auto pb-1 lg:pb-0 -mx-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Filter by category"
          >
            {NEWS_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;
              if (cat !== 'All' && count === 0) return null;
              return (
                <button
                  key={cat}
                  id={`news-filter-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-[2px] text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${active
                    ? 'bg-[#0B192C] text-white border-[#0B192C]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900'
                    }`}
                >
                  {cat === 'All' ? 'All' : cat}
                  <span className={`font-mono text-[10px] ${active ? 'text-amber-400' : 'text-slate-400'}`}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="news-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search updates..."
              aria-label="Search news"
              className="w-full pl-9 pr-9 py-2.5 rounded-[2px] bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-slate-50 py-14 sm:py-20">
        <CornerAccent className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto z-0 opacity-[0.18]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* ── 3. FEATURED STORY ── */}
          {!isFiltering && featured && (
            <section aria-labelledby="featured-heading" className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block mb-2">
                  Featured Story
                </span>
                <h2 id="featured-heading" className="sr-only">Featured story</h2>
              </div>

              <Link
                to={`/news/${featured.id}`}
                id="news-featured-card"
                className="group grid lg:grid-cols-12 bg-white border border-slate-200 rounded-[2px] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0B192C] transition-all duration-300"
              >
                <div className="lg:col-span-7 relative overflow-hidden bg-slate-200">
                  <ProjectImageCarousel
                    images={featured.galleryImages?.length ? featured.galleryImages : [featured.imageUrl]}
                    alt={featured.title}
                    aspectClassName="aspect-[16/10] lg:aspect-auto lg:min-h-[420px] lg:h-full"
                    className="h-full"
                    imageClassName="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  >
                    <CornerAccent className="absolute top-0 right-0 w-28 sm:w-36 h-auto z-10 drop-shadow-sm opacity-85" />
                    {featured.projectStatus && (
                      <div className="absolute top-4 left-4 z-20 pointer-events-none">
                        <ProjectStatusBadge status={featured.projectStatus} />
                      </div>
                    )}
                  </ProjectImageCarousel>
                </div>
                <div className="relative overflow-hidden lg:col-span-5 p-7 sm:p-10 flex flex-col">
                  <CornerAccent className="absolute top-0 right-0 w-44 sm:w-52 h-auto z-0 opacity-[0.18]" />
                  <div className="relative z-10 flex flex-wrap items-center gap-3 mb-5">
                    {featured.category !== 'Project Milestone' && <CategoryChip label={featured.category} />}
                    <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      {featured.date}
                    </span>
                    {featured.location && (
                      <span className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-slate-600 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        {featured.location}
                      </span>
                    )}
                  </div>
                  <h3 className="relative z-10 text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight leading-tight group-hover:text-amber-600 transition-colors mb-4">
                    {featured.title}
                  </h3>
                  <p className="relative z-10 text-slate-600 leading-relaxed line-clamp-4 mb-8">{featured.summary}</p>
                  <span className="relative z-10 mt-auto inline-flex items-center gap-2 self-start px-5 py-3 rounded-[2px] bg-amber-400 group-hover:bg-amber-300 text-slate-950 font-sans text-xs uppercase tracking-wider font-extrabold transition-colors">
                    Read Full Story
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </section>
          )}

          {/* ── 4. ARTICLE GRID ── */}
          <section aria-labelledby="all-updates-heading" className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-5">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block mb-2">
                  {isFiltering ? 'Results' : 'All Updates'}
                </span>
                <h2 id="all-updates-heading" className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight">
                  {selectedCategory === 'All' ? 'Recent News' : selectedCategory}
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-slate-500">
                  {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
                </span>
                {isFiltering && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider font-bold text-amber-600 hover:text-amber-700 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {gridArticles.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {gridArticles.map((a, i) => (
                  <ArticleCard key={a.id} article={a} index={i} />
                ))}
              </div>
            ) : (
              <div className="relative overflow-hidden text-center py-20 px-6 bg-white border border-slate-200 rounded-[2px] max-w-lg mx-auto">
                <CornerAccent className="absolute top-0 right-0 w-32 h-auto z-0 opacity-[0.18]" />
                <div className="relative z-10 space-y-4">
                  <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                  <h3 className="text-lg font-bold text-[#0B192C]">No updates found</h3>
                  <p className="text-sm text-slate-500">Try a different keyword or category.</p>
                  <button
                    type="button"
                    onClick={() => {
                      resetFilters();
                      navigate('/news');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[2px] bg-[#0B192C] hover:bg-[#1E3E66] text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    Reset filters
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      <ContactBand />
    </motion.div>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
 * Page entry
 * ────────────────────────────────────────────────────────────────────────── */

export const NewsPage: React.FC<NewsPageProps> = () => {
  const { articleId } = useParams<{ articleId?: string }>();
  const activeArticle = articleId ? NEWS_ARTICLES.find((a) => a.id === articleId) : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [articleId]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans text-left">
      {activeArticle ? <ArticleView article={activeArticle} /> : <NewsIndex />}
    </div>
  );
};
