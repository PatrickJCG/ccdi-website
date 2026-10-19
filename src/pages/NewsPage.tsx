import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronLeft,
  ExternalLink,
  Phone,
  Mail,
  Globe,
  User,
  BookOpen,
  RotateCcw,
  X,
} from 'lucide-react';
import {
  NEWS_ARTICLES,
  NEWS_CATEGORIES,
  CCDI_CONTACT_INFO,
  NEWS_PAGE_HEADER_IMAGES,
  NEWS_HEADER_FALLBACK_IMAGE,
  type HeaderBackgroundImage,
  type NewsArticle,
} from '../data/newsData';
import type { Product } from '../data/mockProducts';

export interface NewsPageProps {
  inquiryItems?: Product[];
  onToggleInquiry?: (product: Product) => void;
  onRemoveInquiryItem?: (productId: string) => void;
}

/* ──────────────────────────────────────────────────────────────────────────
 * Shared helpers
 * ────────────────────────────────────────────────────────────────────────── */

/** Swaps a broken image for the fallback so the layout never shows an empty box. */
const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  if (!img.src.endsWith(NEWS_HEADER_FALLBACK_IMAGE)) {
    img.src = NEWS_HEADER_FALLBACK_IMAGE;
  }
};

const CategoryChip: React.FC<{ label: string; dark?: boolean }> = ({ label, dark = false }) => (
  <span
    className={`inline-block font-mono text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-[2px] border ${
      dark
        ? 'bg-[#07162A]/90 text-amber-400 border-amber-400/40 backdrop-blur-sm'
        : 'bg-amber-50 text-amber-700 border-amber-200'
    }`}
  >
    {label}
  </span>
);

/**
 * Image-backed hero with multi-layer high-contrast protective gradient and
 * optional rotating background carousel for multiple images.
 */
interface ImageHeroProps {
  images: (string | HeaderBackgroundImage)[] | string;
  children: React.ReactNode;
}

const ImageHero: React.FC<ImageHeroProps> = ({ images, children }) => {
  const imageList = useMemo<HeaderBackgroundImage[]>(() => {
    if (typeof images === 'string') {
      return [{ url: images }];
    }
    return images.map((item) => (typeof item === 'string' ? { url: item } : item));
  }, [images]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance if there are multiple images
  useEffect(() => {
    if (imageList.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageList.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [imageList.length, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  };

  const currentImage = imageList[currentIndex] || imageList[0];

  return (
    <section
      className="relative bg-[#07162A] text-white border-b border-[#102A43] overflow-hidden min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex flex-col justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Background Photo Layer: anchored on the right side for crystal-clear visibility ── */}
      <div className="absolute top-0 bottom-0 right-0 w-full md:w-[62%] lg:w-[58%] xl:w-[54%] z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage.url}
            src={currentImage.url}
            onError={handleImgError}
            alt={currentImage.caption || ''}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ objectPosition: currentImage.objectPosition || 'center 25%' }}
            className="w-full h-full object-cover brightness-100 contrast-[1.02]"
          />
        </AnimatePresence>

        {/* Smooth horizontal gradient on the image: dissolves the left boundary of the image into #07162A */}
        <div className="hidden md:block absolute inset-y-0 left-0 w-36 sm:w-56 md:w-72 lg:w-96 bg-gradient-to-r from-[#07162A] via-[#07162A]/75 to-transparent z-10 pointer-events-none" />
      </div>

      {/* ── Directional gradient transitions across hero ── */}
      {/* Mobile: vertical fade from solid top to photo bottom */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#07162A] via-[#07162A]/85 via-55% to-[#07162A]/30 pointer-events-none z-[1]" />
      
      {/* Desktop/Tablet: smooth left-to-right fade from solid #07162A background into the right-side picture */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#07162A] via-[#07162A] via-35% md:via-42% lg:via-46% to-transparent pointer-events-none z-[1]" />

      {/* Subtle top & bottom edge blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07162A]/50 via-transparent to-[#07162A]/70 pointer-events-none z-[2]" />

      {/* ── Architectural Accent 2 - Top Left Corner (visible above background) ── */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-6 -left-10 sm:-top-4 sm:left-0 w-80 sm:w-96 lg:w-[480px] pointer-events-none select-none z-[3]"
        aria-hidden="true"
      >
        <img
          src="/images/accents/accent2.png"
          alt=""
          className="w-full h-auto object-contain opacity-35 drop-shadow-sm"
        />
      </motion.div>

      {/* ── Architectural Dynamic Accent Graphic - Bottom Left Anchored ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-16 -left-16 sm:-left-8 sm:bottom-0 w-72 sm:w-96 lg:w-[440px] pointer-events-none select-none z-[3]"
        aria-hidden="true"
      >
        <img
          src="/images/accents/dark-accent-graphic.png"
          alt=""
          className="w-full h-auto object-contain opacity-25"
        />
      </motion.div>

      {/* ── Content Container ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20 w-full">
        {children}

        {/* ── Slide Navigation Controls (shown when there are 2+ background images) ── */}
        {imageList.length > 1 && (
          <div className="pt-6 sm:pt-8 flex flex-wrap items-center justify-end gap-4">
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-1.5">
                {imageList.map((img, idx) => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    title={img.caption || `Slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex
                        ? 'w-6 bg-amber-400'
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1 pl-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous background image"
                  className="w-7 h-7 rounded-[2px] bg-[#07162A]/90 hover:bg-amber-400 hover:text-slate-950 text-white border border-[#1E3E66] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next background image"
                  className="w-7 h-7 rounded-[2px] bg-[#07162A]/90 hover:bg-amber-400 hover:text-slate-950 text-white border border-[#1E3E66] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const Breadcrumb: React.FC<{ items: { label: string; to?: string }[] }> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-200 mb-8">
    {items.map((item, idx) => (
      <React.Fragment key={item.label}>
        {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
        {item.to ? (
          <Link to={item.to} className="text-slate-200 hover:text-amber-400 transition-colors uppercase font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            {item.label}
          </Link>
        ) : (
          <span className="text-amber-400 font-bold uppercase truncate max-w-[220px] sm:max-w-xs drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            {item.label}
          </span>
        )}
      </React.Fragment>
    ))}
  </nav>
);

/** Uniform article card used in the grid and the related section. */
const ArticleCard: React.FC<{ article: NewsArticle; index?: number }> = ({ article, index = 0 }) => (
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
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
        <img
          src={article.imageUrl}
          onError={handleImgError}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover object-[center_top] group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-3 left-3">
          <CategoryChip label={article.category} dark />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-500 mb-3">
          <Calendar className="w-3.5 h-3.5 text-amber-600" />
          {article.date}
        </span>

        <h3 className="text-lg font-bold text-[#0B192C] leading-snug tracking-tight line-clamp-2 group-hover:text-amber-600 transition-colors mb-2">
          {article.title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">{article.summary}</p>

        <span className="mt-auto pt-4 border-t border-slate-100 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider font-bold text-amber-600 group-hover:text-amber-700">
          Read Article
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  </motion.article>
);

/** Dark CTA band reused at the bottom of both views. */
const ContactBand: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative bg-[#07162A] text-white border-t border-[#102A43] overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
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
      {/* ── HERO: article image as background with rich contrast scrim ── */}
      <ImageHero images={article.imageUrl}>
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'News & Updates', to: '/news' }, { label: article.category }]} />

        <div className="max-w-3xl space-y-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <CategoryChip label={article.category} dark />
            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {article.readTime}
            </span>
          </div>

          {/* Guaranteed pure white, high-contrast headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black !text-white text-white tracking-tight leading-[1.15] drop-shadow-[0_3px_14px_rgba(0,0,0,0.95)]">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-[2px] bg-[#0B192C] border border-[#1E3E66] flex items-center justify-center text-amber-400 font-mono font-bold shadow-md">
              {article.author.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{article.author.name}</p>
              <p className="text-xs font-mono text-slate-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{article.author.role}</p>
            </div>
          </div>
        </div>
      </ImageHero>

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

            {/* Feature image (full, un-darkened) */}
            <figure className="rounded-[2px] overflow-hidden border border-slate-200 shadow-sm bg-slate-200">
              <img
                src={article.imageUrl}
                onError={handleImgError}
                alt={article.title}
                className="w-full aspect-[16/9] object-cover"
              />
            </figure>

            {/* Key highlights */}
            {article.keyHighlights?.length > 0 && (
              <div className="bg-white border border-slate-200 border-l-4 border-l-amber-500 rounded-[2px] p-6 sm:p-8 shadow-sm">
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
            )}

            {/* Body paragraphs */}
            <div className="space-y-6">
              {article.content.map((p, idx) => (
                <p key={idx} className="text-slate-700 text-base sm:text-lg leading-[1.8]">
                  {p}
                </p>
              ))}
            </div>

            {/* Project Photo Gallery (if available) */}
            {article.galleryImages && article.galleryImages.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold">
                    Project Installation Gallery ({article.galleryImages.length} Photos)
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {article.galleryImages.map((img, i) => (
                    <figure
                      key={i}
                      className="rounded-[2px] overflow-hidden border border-slate-200 bg-white shadow-xs group"
                    >
                      <div className="overflow-hidden bg-slate-900 aspect-[4/3]">
                        <img
                          src={img.url}
                          alt={img.caption || article.title}
                          onError={handleImgError}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {img.caption && (
                        <figcaption className="p-3 text-xs text-slate-700 bg-slate-50 border-t border-slate-100 font-medium">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}

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
              <div className="bg-white border border-slate-200 rounded-[2px] shadow-sm">
                <h2 className="px-6 py-4 border-b border-slate-200 font-mono text-xs uppercase tracking-widest text-slate-500 font-bold">
                  Article Details
                </h2>
                <dl className="divide-y divide-slate-100 text-sm">
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

              <div className="bg-[#07162A] text-white border border-[#102A43] rounded-[2px] p-6 space-y-4">
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
          </aside>
        </div>
      </section>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="bg-white border-t border-slate-200 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
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
      {/* ── 1. HERO with rotating background carousel and maximum text contrast ── */}
      <ImageHero images={NEWS_PAGE_HEADER_IMAGES}>
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'News & Updates' }]} />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
          <div className="max-w-2xl xl:max-w-3xl space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              CCDI / PRESS & PROJECT INSIGHTS
            </p>

            {/* Guaranteed pure white, high-contrast headline */}
            <h1 className="text-4xl sm:text-6xl font-black !text-white text-white tracking-tight leading-[1.06] drop-shadow-[0_4px_16px_rgba(0,0,0,0.98)]">
              Company News &{' '}
              <span className="text-[#F3A812] block mt-1 drop-shadow-[0_4px_16px_rgba(0,0,0,0.98)]">
                Project Updates.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Stay updated on our latest farm developments, turnkey engineering projects, and company milestones across the Philippines.
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
      </ImageHero>

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
                  className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-[2px] text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                    active
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

      <div className="bg-slate-50 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
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
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden bg-slate-200">
                  <img
                    src={featured.imageUrl}
                    onError={handleImgError}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover object-[center_top] sm:object-[center_12%] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <CategoryChip label={featured.category} />
                    <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      {featured.date}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight leading-tight group-hover:text-amber-600 transition-colors mb-4">
                    {featured.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed line-clamp-4 mb-8">{featured.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-2 self-start px-5 py-3 rounded-[2px] bg-amber-400 group-hover:bg-amber-300 text-slate-950 font-sans text-xs uppercase tracking-wider font-extrabold transition-colors">
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
              <div className="text-center py-20 px-6 bg-white border border-slate-200 rounded-[2px] max-w-lg mx-auto space-y-4">
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
