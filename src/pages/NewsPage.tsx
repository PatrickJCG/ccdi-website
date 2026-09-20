import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Tag,
  User,
  ArrowRight,
  BookOpen,
  RotateCcw,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';
import { MOCK_NEWS } from '../data/mockProducts';
import type { Product } from '../data/mockProducts';

export interface NewsPageProps {
  inquiryItems?: Product[];
  onToggleInquiry?: (product: Product) => void;
  onRemoveInquiryItem?: (productId: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = () => {
  const { articleId } = useParams<{ articleId?: string }>();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedLink, setCopiedLink] = useState(false);

  // Active article state derived from URL parameter
  const activeArticle = articleId
    ? MOCK_NEWS.find((a) => a.id === articleId)
    : null;

  // Scroll to top on page or article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [articleId]);

  const categories = ['All', 'Research', 'Expansion', 'Compliance', 'Sustainability', 'Events'];

  // Filtered articles
  const filteredArticles = MOCK_NEWS.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All' || article.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.tags.some((t) => t.toLowerCase().includes(query)) ||
      article.author.name.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const featuredArticle = MOCK_NEWS.find((a) => a.featured) || MOCK_NEWS[0];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSelectArticle = (id: string) => {
    navigate(`/news/${id}`);
  };

  const handleBackToCatalog = () => {
    navigate('/news');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans text-left">
      <AnimatePresence mode="wait">
        {/* ───────────────────────────────────────────────────────────── */}
        {/* VIEW 1: FULL EXPANDED ARTICLE READER VIEW                     */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeArticle ? (
          <motion.article
            key="article-reader"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pb-24"
          >
            {/* Dark Industrial Hero Banner */}
            <div className="relative bg-[#07162A] text-white overflow-hidden pt-10 pb-20 sm:pb-24 border-b border-[#102A43]">
              {/* Background Accents & Tech Matrix */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Architectural Accent 2 - Top Left Anchored */}
              <motion.div
                initial={{ opacity: 0, y: -45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-12 -left-16 sm:-top-8 sm:left-0 w-80 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0"
                aria-hidden="true"
              >
                <img
                  src="/images/accents/accent2.png"
                  alt=""
                  className="w-full h-auto object-contain opacity-30"
                />
              </motion.div>

              {/* Architectural Dynamic Graphic - Bottom Right Anchored */}
              <motion.div
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-16 -right-16 sm:-right-8 sm:bottom-0 w-80 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0"
                aria-hidden="true"
              >
                <img
                  src="/images/accents/dark-accent-graphic.png"
                  alt=""
                  className="w-full h-auto object-contain opacity-30"
                />
              </motion.div>

              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Breadcrumbs */}
                <nav className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-6">
                  <Link to="/" className="hover:text-amber-400 transition-colors">HOME</Link>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <Link to="/news" className="hover:text-amber-400 transition-colors">NEWS & UPDATES</Link>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-amber-400 font-bold uppercase truncate max-w-xs">{activeArticle.category}</span>
                </nav>

                {/* Back to news button */}
                <button
                  type="button"
                  onClick={handleBackToCatalog}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-[#0B192C] hover:bg-[#1E3E66] text-amber-400 hover:text-amber-300 text-xs font-mono font-bold uppercase tracking-wider border border-[#1E3E66] hover:border-amber-400/60 transition-all mb-8 shadow-sm cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to News Directory</span>
                </button>

                {/* Meta info tags */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-[2px] bg-[#0B192C] text-amber-400 border border-amber-400/40 shadow-sm">
                    {activeArticle.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeArticle.date}</span>
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeArticle.readTime}</span>
                  </span>
                </div>

                {/* Article Title */}
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2] mb-6">
                  {activeArticle.title}
                </h1>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#102A43]">
                  <div className="w-10 h-10 rounded-[2px] bg-[#0B192C] border border-[#1E3E66] flex items-center justify-center text-amber-400 font-mono font-bold text-sm shadow-sm">
                    {activeArticle.author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>{activeArticle.author.name}</span>
                    </div>
                    <div className="text-xs font-mono text-slate-400">{activeArticle.author.role}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Article Content Container */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 space-y-10">
              {/* Featured Banner Image */}
              <div className="rounded-[2px] overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 aspect-[16/9] sm:aspect-[21/9]">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Key Takeaways Callout Card */}
              {activeArticle.keyHighlights && activeArticle.keyHighlights.length > 0 && (
                <div className="p-6 sm:p-8 rounded-[2px] bg-[#07162A] text-white border-2 border-[#1E3E66] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Key Engineering Highlights</span>
                    </div>
                    <ul className="space-y-3">
                      {activeArticle.keyHighlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-200 text-sm sm:text-base leading-relaxed">
                          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="flex-1">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Multi-Paragraph Article Content */}
              <div className="bg-white p-6 sm:p-10 rounded-[2px] border border-slate-200 shadow-sm space-y-6">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx} className="text-slate-700 leading-relaxed text-base sm:text-lg font-normal">
                    {paragraph}
                  </p>
                ))}

                {/* Tags Strip & Share */}
                <div className="pt-8 mt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-400" />
                    {activeArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-[2px] font-mono bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 hover:border-amber-400 hover:text-amber-600 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Share button */}
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-[2px] bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-mono font-bold uppercase tracking-wider transition-colors border border-slate-200 cursor-pointer shadow-sm"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Link Copied</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-slate-500" />
                        <span>Share Article</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Technical Specialist Callout CTA */}
              <div className="p-8 rounded-[2px] bg-[#07162A] text-white border border-[#102A43] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#F3A812] font-bold block">
                    PROJECT INQUIRY & CONSULTATION
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Planning a Turnkey Livestock or Energy Facility?
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
                    CCDI's multidisciplinary engineering teams provide site assessments, civil blueprinting, and complete equipment commissioning nationwide.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/#contact')}
                  className="px-6 py-3 rounded-[2px] font-sans text-xs uppercase tracking-wider font-extrabold bg-[#F3A812] hover:bg-amber-300 text-slate-950 transition-colors shrink-0 shadow-md cursor-pointer flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Engineering Team</span>
                </button>
              </div>

              {/* Related Articles */}
              <div className="space-y-6 pt-4">
                <div className="border-b border-slate-200 pb-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold block mb-1">
                    RELATED INSIGHTS
                  </span>
                  <h3 className="text-2xl font-black text-[#0B192C] tracking-tight">
                    More Turnkey Updates & Technical Reports
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {MOCK_NEWS.filter((a) => a.id !== activeArticle.id)
                    .slice(0, 2)
                    .map((related) => (
                      <div
                        key={related.id}
                        onClick={() => handleSelectArticle(related.id)}
                        className="cursor-pointer bg-white rounded-[2px] border border-slate-200 p-6 hover:shadow-lg hover:border-[#0B192C] transition-all duration-300 group flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-800 border border-slate-200">
                              {related.category}
                            </span>
                            <span className="font-mono text-xs text-slate-400">{related.date}</span>
                          </div>

                          <h4 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                            {related.title}
                          </h4>

                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {related.summary}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-amber-600 pt-4 border-t border-slate-100 mt-4">
                          <span>Read Report</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.article>
        ) : (
          /* ───────────────────────────────────────────────────────────── */
          /* VIEW 2: NEWS CATALOG & INDEX VIEW                            */
          /* ───────────────────────────────────────────────────────────── */
          <motion.div
            key="news-index"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-24"
          >
            {/* ── 1. HERO BANNER ────────────────────────────────────────── */}
            <section className="relative bg-[#07162A] text-white pt-10 pb-20 sm:pb-24 border-b border-[#102A43] overflow-hidden">
              {/* Background Accents & Tech Matrix */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Architectural Accent 2 - Top Left Anchored */}
              <motion.div
                initial={{ opacity: 0, y: -45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-12 -left-16 sm:-top-8 sm:left-0 w-80 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0"
                aria-hidden="true"
              >
                <img
                  src="/images/accents/accent2.png"
                  alt=""
                  className="w-full h-auto object-contain opacity-30"
                />
              </motion.div>

              {/* Architectural Dynamic Accent Graphic - Bottom Right Anchored */}
              <motion.div
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-16 -right-16 sm:-right-8 sm:bottom-0 w-80 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0"
                aria-hidden="true"
              >
                <img
                  src="/images/accents/dark-accent-graphic.png"
                  alt=""
                  className="w-full h-auto object-contain opacity-30"
                />
              </motion.div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Link to="/" className="hover:text-amber-400 transition-colors">HOME</Link>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-amber-400 font-bold">NEWS & UPDATES</span>
                </nav>

                <div className="max-w-3xl space-y-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#F3A812] font-bold block">
                    CCDI / PRESS & PROJECT INSIGHTS
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    Agro-Industrial News & Updates
                  </h1>
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                    Explore our latest project handshakes, facility handovers, engineering innovations, and renewable energy milestones across the Philippines.
                  </p>
                </div>

                {/* Industrial Technical Search Bar */}
                <div className="pt-2 max-w-xl">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search news by topic, project, or keyword..."
                      className="w-full pl-10 pr-16 py-3 rounded-[2px] bg-[#0B192C] border border-[#1E3E66] text-white placeholder-slate-400 focus:outline-none focus:border-[#F3A812] focus:ring-1 focus:ring-[#F3A812] text-xs font-sans transition-all shadow-md"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400 hover:text-amber-400 uppercase tracking-wider cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* ── 2. MAIN CATALOG DIRECTORY ─────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
              
              {/* Category Filter Tabs (CCDI Lite Theme) */}
              <div className="flex items-center flex-wrap gap-2" role="tablist">
                {categories.map((cat) => {
                  const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold transition-all border cursor-pointer ${
                        isActive
                          ? 'bg-[#0B192C] text-white border-[#0B192C] shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:text-slate-950'
                      }`}
                    >
                      {cat === 'All' ? 'All Articles' : cat}
                    </button>
                  );
                })}
              </div>

              {/* Featured Article Spotlight Card (only if no active search query) */}
              {!searchQuery && selectedCategory === 'All' && featuredArticle && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-amber-600">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Featured Spotlight</span>
                  </div>

                  <div
                    onClick={() => handleSelectArticle(featuredArticle.id)}
                    className="cursor-pointer bg-white rounded-[2px] border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#0B192C] transition-all duration-300 grid lg:grid-cols-12 group"
                  >
                    <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[340px] bg-slate-900 overflow-hidden">
                      <img
                        src={featuredArticle.imageUrl}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-[2px] bg-[#07162A]/90 text-amber-400 border border-amber-400/40">
                          {featuredArticle.category}
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-600" />
                            {featuredArticle.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5 text-amber-600 font-bold">
                            <Clock className="w-3.5 h-3.5" />
                            {featuredArticle.readTime}
                          </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-black text-[#0B192C] group-hover:text-amber-600 transition-colors leading-snug">
                          {featuredArticle.title}
                        </h2>

                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-4">
                          {featuredArticle.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 font-mono text-xs text-slate-600">
                          <User className="w-3.5 h-3.5 text-amber-600" />
                          <span>{featuredArticle.author.name}</span>
                        </div>

                        <span className="font-mono text-xs uppercase tracking-wider font-bold text-amber-600 group-hover:text-amber-700 inline-flex items-center gap-1.5 transition-colors">
                          <span>Read Story</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Articles Grid */}
              <div className="space-y-6">
                <div className="flex items-center justify-between font-mono text-xs text-slate-500 border-b border-slate-200 pb-3">
                  <span>
                    SHOWING <strong className="text-amber-600 font-bold">{filteredArticles.length}</strong> ARTICLES
                    {selectedCategory !== 'All' && ` IN "${selectedCategory.toUpperCase()}"`}
                    {searchQuery && ` MATCHING "${searchQuery.toUpperCase()}"`}
                  </span>
                </div>

                {filteredArticles.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article, idx) => (
                      <motion.article
                        key={article.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.04 }}
                        onClick={() => handleSelectArticle(article.id)}
                        className="cursor-pointer bg-white rounded-[2px] border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#0B192C] transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div>
                          <div className="relative h-48 overflow-hidden bg-slate-900 border-b border-slate-100">
                            <img
                              src={article.imageUrl}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2.5 left-2.5">
                              <span className="font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-[2px] bg-[#07162A]/90 text-amber-400 border border-amber-400/40">
                                {article.category}
                              </span>
                            </div>
                          </div>

                          <div className="p-5 sm:p-6 space-y-3">
                            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                                {article.date}
                              </span>
                              <span>•</span>
                              <span className="text-amber-600 font-bold">{article.readTime}</span>
                            </div>

                            <h3 className="text-base sm:text-lg font-bold text-[#0B192C] group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                              {article.title}
                            </h3>

                            <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                              {article.summary}
                            </p>
                          </div>
                        </div>

                        <div className="p-5 sm:p-6 pt-0 mt-auto border-t border-slate-100 flex items-center justify-between">
                          <span className="font-mono text-[11px] text-slate-500 truncate max-w-[140px]">
                            {article.author.name}
                          </span>
                          <span className="font-mono text-xs uppercase tracking-wider font-bold text-amber-600 group-hover:text-amber-700 inline-flex items-center gap-1 transition-colors">
                            <span>Read Article</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                ) : (
                  /* Zero Filter Results State */
                  <div className="text-center py-16 px-4 bg-white rounded-[2px] border border-slate-200 max-w-md mx-auto space-y-4">
                    <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-[#0B192C]">No Articles Found</h3>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                        No articles match your current search query or category filter. Try clearing filters or using different keywords.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-[2px] bg-[#0B192C] hover:bg-[#1E3E66] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span>Reset Filters</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
