import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { InquiryProvider, useInquiry } from './context/InquiryContext';
import { PageLayout } from './components/organisms/PageLayout';
import { ScrollToTop } from './components/utils/ScrollToTop';

// ─── Lazy-loaded pages (each gets its own JS chunk) ───────────────────────────
// Core / Main Pages
const HomePage                  = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const SolutionsPage             = lazy(() => import('./pages/SolutionsPage').then(m => ({ default: m.SolutionsPage })));
const ProductsPage              = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const ProjectsPage              = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const NewsPage                  = lazy(() => import('./pages/NewsPage').then(m => ({ default: m.NewsPage })));
const CareersPage               = lazy(() => import('./pages/CareersPage').then(m => ({ default: m.CareersPage })));
const NotFoundPage              = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// 1. Poultry Solutions (src/pages/poultry/)
const PoultryOverviewPage       = lazy(() => import('./pages/poultry/PoultryOverviewPage').then(m => ({ default: m.PoultryOverviewPage })));
const BroilerPage               = lazy(() => import('./pages/poultry/BroilerPage').then(m => ({ default: m.BroilerPage })));
const PoultryBreedingPage       = lazy(() => import('./pages/poultry/PoultryBreedingPage').then(m => ({ default: m.PoultryBreedingPage })));
const LayerPage                 = lazy(() => import('./pages/poultry/LayerPage').then(m => ({ default: m.LayerPage })));
const RetrofittingPage          = lazy(() => import('./pages/poultry/RetrofittingPage').then(m => ({ default: m.RetrofittingPage })));
const AccessoriesPage           = lazy(() => import('./pages/poultry/AccessoriesPage').then(m => ({ default: m.AccessoriesPage })));
const PoultryAfterSalesPage     = lazy(() => import('./pages/poultry/PoultryAfterSalesPage').then(m => ({ default: m.PoultryAfterSalesPage })));

// 2. Hatchery Solutions (src/pages/hatchery/)
const HatcheryPage              = lazy(() => import('./pages/hatchery/HatcheryPage').then(m => ({ default: m.HatcheryPage })));

// 3. Feedmill Solutions (src/pages/feedmill/)
const FeedmillPage              = lazy(() => import('./pages/feedmill/FeedmillPage').then(m => ({ default: m.FeedmillPage })));
const FeedmillAccessoriesPage   = lazy(() => import('./pages/feedmill/FeedmillAccessoriesPage').then(m => ({ default: m.FeedmillAccessoriesPage })));

// 4. Solar Solutions (src/pages/solar/)
const SolarPage                 = lazy(() => import('./pages/solar/SolarPage').then(m => ({ default: m.SolarPage })));
const SolarCalculatorPage       = lazy(() => import('./pages/solar/SolarCalculatorPage').then(m => ({ default: m.SolarCalculatorPage })));

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

      {/* ── The Poultry Solution (Overview & 3 Sub-Categories) ── */}
      <Route path="/solutions/poultry" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <PoultryOverviewPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/solutions/poultry/broiler" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <BroilerPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/solutions/poultry/broiler-breeder" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <PoultryBreedingPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/solutions/poultry/layer" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <LayerPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/solutions/poultry/retrofitting" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <RetrofittingPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/solutions/poultry/accessories" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <AccessoriesPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/solutions/poultry/after-sales" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <PoultryAfterSalesPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      {/* Legacy / Alias Route for Poultry Breeding */}
      <Route path="/solutions/poultry-breeding" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <PoultryBreedingPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/solutions/hatchery" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <HatcheryPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/solutions/hatchery/incubation" element={<Navigate to="/solutions/hatchery#incubation" replace />} />
      <Route path="/solutions/hatchery/egg-handling" element={<Navigate to="/solutions/hatchery#egg-handling" replace />} />
      <Route path="/solutions/hatchery/chick-handling" element={<Navigate to="/solutions/hatchery#chick-handling" replace />} />
      <Route path="/solutions/hatchery/hvac" element={<Navigate to="/solutions/hatchery#hvac" replace />} />
      <Route path="/solutions/hatchery/management" element={<Navigate to="/solutions/hatchery#management" replace />} />
      <Route path="/solutions/hatchery/waste-disposal" element={<Navigate to="/solutions/hatchery#waste-disposal" replace />} />
      <Route path="/solutions/hatchery/after-sales" element={<Navigate to="/solutions/hatchery#after-sales" replace />} />

      <Route path="/solutions/feedmill" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <FeedmillPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/solutions/feedmill/accessories" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <FeedmillAccessoriesPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/solutions/feedmill/after-sales" element={<Navigate to="/solutions/feedmill#after-sales" replace />} />

      <Route path="/solutions/solar" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <SolarPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/solutions/solar/calculator" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <SolarCalculatorPage
              inquiryItems={inquiryItems}
              onToggleInquiry={toggleInquiry}
              onRemoveInquiryItem={removeInquiryItem}
            />
          </Suspense>
        </PageLayout>
      } />

      <Route path="/solutions/solar/after-sales" element={<Navigate to="/solutions/solar#after-sales" replace />} />

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

      <Route path="/careers" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <CareersPage />
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

      {/* ── 404 Page Not Found ── */}
      <Route path="*" element={
        <PageLayout inquiryCount={inquiryCount}>
          <Suspense fallback={<PageSkeleton />}>
            <NotFoundPage />
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
