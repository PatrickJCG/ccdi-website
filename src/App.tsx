import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { InquiryProvider } from './context/InquiryContext';
import { useInquiry } from './context/InquiryContext';
import { PageLayout } from './components/organisms/PageLayout';
import { ScrollToTop } from './components/utils/ScrollToTop';

// ─── Lazy-loaded pages (each gets its own JS chunk) ───────────────────────────
const HomePage       = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const SolutionsPage  = lazy(() => import('./pages/SolutionsPage').then(m => ({ default: m.SolutionsPage })));
const ProductsPage   = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const ProjectsPage   = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const NewsPage       = lazy(() => import('./pages/NewsPage').then(m => ({ default: m.NewsPage })));

// ─── Lightweight page loading fallback ───────────────────────────────────────
const PageSkeleton = () => (
  <div className="min-h-screen bg-[#06121E] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-[3px] border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Loading…</p>
    </div>
  </div>
);

// ─── Inner router (has access to InquiryContext) ──────────────────────────────
function AppRoutes() {
  const { inquiryItems, inquiryCount, toggleInquiry, removeInquiryItem } = useInquiry();

  return (
    <Routes>
      <Route path="/" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <HomePage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/solutions" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <SolutionsPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/products" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <ProductsPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/projects" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <ProjectsPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/projects/:projectId" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <ProjectsPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/news" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <NewsPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/news/:articleId" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <NewsPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />
    </Routes>
  );
}

// ─── Root app component ───────────────────────────────────────────────────────
export function App() {
  return (
    <InquiryProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </InquiryProvider>
  );
}

export default App;
