import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  MessageSquare
} from 'lucide-react';
import { MOCK_NEWS } from '../data/mockProducts';
import type { Product } from '../data/mockProducts';
import { Badge, Button } from '../components/atoms';

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <AnimatePresence mode="wait">
        {/* ───────────────────────────────────────────────────────────── */}
        {/* VIEW 1: FULL EXPANDED ARTICLE READER VIEW                     */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeArticle ? (
          <motion.article
            key="article-reader"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pb-24"
          >
            {/* Dark Header Scrim Banner */}
            <div className="relative bg-slate-950 text-white overflow-hidden pt-12 pb-20 border-b border-teal-900/40">
              {/* Background Glows */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(94,234,212,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(94,234,212,0.06) 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
                aria-hidden
              />
              <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-brand-teal-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Back to news button */}
                <button
                  onClick={handleBackToCatalog}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-teal-200 hover:text-white text-xs font-semibold backdrop-blur-md transition-colors mb-8 focus-visible:ring-2 focus-visible:ring-teal-400"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to News & Updates</span>
                </button>

                {/* Meta info tags */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="speciesBlue">{activeArticle.category}</Badge>
                  <span className="flex items-center gap-1 text-xs text-slate-300 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-brand-teal-400" />
                    <span>{activeArticle.date}</span>
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-300 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeArticle.readTime}</span>
                  </span>
                </div>

                {/* Article Title */}
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading mb-6 drop-shadow-md">
                  {activeArticle.title}
                </h1>

                {/* Author Info pill */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-brand-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {activeArticle.author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-brand-teal-300" />
                      <span>{activeArticle.author.name}</span>
                    </div>
                    <div className="text-xs text-slate-300">{activeArticle.author.role}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Article Content Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
              {/* Featured Banner Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 mb-10 bg-slate-900 aspect-[16/9] sm:aspect-[21/9]">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Key Takeaways Callout Card */}
              {activeArticle.keyHighlights && activeArticle.keyHighlights.length > 0 && (
                <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white border border-brand-teal-500/30 shadow-xl relative">
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal-500/20 border border-brand-teal-400/40 text-brand-teal-300 text-xs font-bold uppercase tracking-wider mb-4">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Key Technical Takeaways</span>
                    </div>
                    <ul className="space-y-3">
                      {activeArticle.keyHighlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-100 text-sm sm:text-base leading-relaxed">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="flex-1">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Multi-Paragraph Article Content */}
              <div className="prose prose-slate lg:prose-lg max-w-none bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx} className="text-slate-700 leading-relaxed text-base sm:text-lg font-normal">
                    {paragraph}
                  </p>
                ))}

                {/* Tags Strip */}
                <div className="pt-8 mt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-400" />
                    {activeArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium hover:bg-teal-50 hover:text-brand-teal-700 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Share button */}
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-brand-teal-50 text-slate-700 hover:text-brand-teal-700 text-xs font-semibold transition-colors border border-slate-200"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Link Copied!</span>
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
              <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-brand-forest-900 to-slate-900 text-white border border-teal-400/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
                    Interested in Facility Design or Solar PV Integration?
                  </h3>
                  <p className="text-teal-100 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
                    Our expert engineering team provides project consultations, site assessments, and facility design advice for agribusinesses across the Philippines.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  href="/#contact"
                  onClick={() => navigate('/#contact')}
                  icon={<MessageSquare className="w-4 h-4" />}
                  className="shrink-0 shadow-lg shadow-brand-teal-600/30 !bg-brand-teal-600 hover:!bg-brand-teal-500 !text-white font-bold"
                >
                  Contact Specialist
                </Button>
              </div>

              {/* Related Articles */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-slate-900 font-heading mb-6">
                  Related Articles & Technical Reports
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {MOCK_NEWS.filter((a) => a.id !== activeArticle.id)
                    .slice(0, 2)
                    .map((related) => (
                      <div
                        key={related.id}
                        onClick={() => handleSelectArticle(related.id)}
                        className="cursor-pointer bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-brand-teal-300 transition-all duration-300 group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="speciesBlue">{related.category}</Badge>
                            <span className="text-xs text-slate-400">{related.date}</span>
                          </div>
                          <h4 className="font-bold text-slate-900 group-hover:text-brand-teal-700 transition-colors line-clamp-2 mb-2 font-heading">
                            {related.title}
                          </h4>
                          <p className="text-xs text-slate-600 line-clamp-2 mb-4">
                            {related.summary}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs font-semibold text-brand-teal-700 pt-3 border-t border-slate-100">
                          <span>Read Full Story</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            {/* Hero & Search Header */}
            <div className="relative bg-slate-950 text-white overflow-hidden py-16 sm:py-24 border-b border-teal-900/40">
              {/* Grid Background */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(94,234,212,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(94,234,212,0.06) 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
                aria-hidden
              />
              <div className="absolute top-10 left-10 w-96 h-96 bg-brand-teal-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-forest-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Project Handshakes & Infrastructure News</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-heading">
                    Clarkbase Construction Dev't Inc.{' '}
                    <span className="bg-gradient-to-r from-blue-200 via-amber-300 to-amber-400 bg-clip-text text-transparent">
                      Projects & News
                    </span>
                  </h1>

                  <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    Explore our latest project handovers, facility developments, engineering innovations, and renewable energy milestones.
                  </p>

                  {/* Interactive Search Bar */}
                  <div className="pt-4 max-w-xl mx-auto">
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search news by topic, author, or keyword..."
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition-all shadow-xl"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* Category Filter Pills */}
              <div className="flex items-center justify-center flex-wrap gap-2 mb-12" role="tablist">
                {categories.map((cat) => {
                  const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                        isActive
                          ? 'bg-brand-teal-600 text-white shadow-md shadow-brand-teal-600/30'
                          : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-brand-teal-300'
                      }`}
                    >
                      {cat === 'All' ? 'All Articles' : cat}
                    </button>
                  );
                })}
              </div>

              {/* Featured Article Spotlight Card (only if no active search query) */}
              {!searchQuery && selectedCategory === 'All' && featuredArticle && (
                <div className="mb-16">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-teal-700 mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Featured Spotlight</span>
                  </div>
                  <div
                    onClick={() => handleSelectArticle(featuredArticle.id)}
                    className="cursor-pointer bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl hover:shadow-2xl hover:border-brand-teal-300 transition-all duration-300 grid lg:grid-cols-12 group"
                  >
                    <div className="lg:col-span-7 relative min-h-[320px] bg-slate-900 overflow-hidden">
                      <img
                        src={featuredArticle.imageUrl}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="speciesBlue">{featuredArticle.category}</Badge>
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-brand-teal-600" />
                            {featuredArticle.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-500" />
                            {featuredArticle.readTime}
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-brand-teal-700 transition-colors font-heading leading-tight">
                          {featuredArticle.title}
                        </h2>

                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                          {featuredArticle.summary}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                          <User className="w-3.5 h-3.5 text-brand-teal-600" />
                          <span>{featuredArticle.author.name}</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-teal-700 group-hover:translate-x-1 transition-transform">
                          <span>Read Full Story</span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Articles Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 border-b border-slate-200 pb-3 mb-6">
                  <span>
                    Showing <strong className="text-slate-800">{filteredArticles.length}</strong> articles
                    {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </span>
                </div>

                {filteredArticles.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((article, idx) => (
                      <motion.article
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        onClick={() => handleSelectArticle(article.id)}
                        className="cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-teal-300 transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div>
                          <div className="relative h-48 overflow-hidden bg-slate-900">
                            <img
                              src={article.imageUrl}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                              <Badge variant="speciesBlue">{article.category}</Badge>
                            </div>
                          </div>

                          <div className="p-6">
                            <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-brand-teal-600" />
                                {article.date}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-amber-500" />
                                {article.readTime}
                              </span>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-teal-700 transition-colors font-heading mb-3 line-clamp-2">
                              {article.title}
                            </h3>

                            <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                              {article.summary}
                            </p>
                          </div>
                        </div>

                        <div className="p-6 pt-0 mt-auto border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs text-slate-500 font-medium">
                            By {article.author.name}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-teal-700 group-hover:translate-x-1 transition-transform">
                            <span>Read Article</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                ) : (
                  /* Zero Filter Results State */
                  <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 max-w-md mx-auto">
                    <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-800 mb-1">No Articles Found</h3>
                    <p className="text-xs text-slate-500 mb-6">
                      No updates matching your current search or category filter. Try clearing filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-teal-600 text-white font-bold text-xs hover:bg-brand-teal-700 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
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
