import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { PageLayout } from './components/organisms/PageLayout';
import { HomePage } from './pages/HomePage';
import { SolutionsPage } from './pages/SolutionsPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { NewsPage } from './pages/NewsPage';
import type { Product } from './data/mockProducts';

export function App() {
  const [inquiryItems, setInquiryItems] = useState<Product[]>([]);

  const handleToggleInquiry = (product: Product) => {
    setInquiryItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      return exists
        ? prev.filter(item => item.id !== product.id)
        : [...prev, product];
    });
  };

  const handleRemoveInquiryItem = (productId: string) => {
    setInquiryItems(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* ── Home page (/): all sections except the full catalog ── */}
        <Route
          path="/"
          element={
            <PageLayout inquiryCount={inquiryItems.length}>
              <HomePage
                inquiryItems={inquiryItems}
                onToggleInquiry={handleToggleInquiry}
                onRemoveInquiryItem={handleRemoveInquiryItem}
              />
            </PageLayout>
          }
        />

        {/* ── Solutions page (/solutions & /products per ccdi.toon): full catalog ── */}
        <Route
          path="/solutions"
          element={
            <PageLayout inquiryCount={inquiryItems.length}>
              <SolutionsPage
                inquiryItems={inquiryItems}
                onToggleInquiry={handleToggleInquiry}
                onRemoveInquiryItem={handleRemoveInquiryItem}
              />
            </PageLayout>
          }
        />
        <Route
          path="/products"
          element={
            <PageLayout inquiryCount={inquiryItems.length}>
              <ProductsPage
                inquiryItems={inquiryItems}
                onToggleInquiry={handleToggleInquiry}
                onRemoveInquiryItem={handleRemoveInquiryItem}
              />
            </PageLayout>
          }
        />

        {/* ── Projects page (/projects & /projects/:projectId per ccdi.toon) ── */}
        <Route
          path="/projects"
          element={
            <PageLayout inquiryCount={inquiryItems.length}>
              <ProjectsPage
                inquiryItems={inquiryItems}
                onToggleInquiry={handleToggleInquiry}
                onRemoveInquiryItem={handleRemoveInquiryItem}
              />
            </PageLayout>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <PageLayout inquiryCount={inquiryItems.length}>
              <ProjectsPage
                inquiryItems={inquiryItems}
                onToggleInquiry={handleToggleInquiry}
                onRemoveInquiryItem={handleRemoveInquiryItem}
              />
            </PageLayout>
          }
        />
        <Route
          path="/news"
          element={
            <PageLayout inquiryCount={inquiryItems.length}>
              <NewsPage
                inquiryItems={inquiryItems}
                onToggleInquiry={handleToggleInquiry}
                onRemoveInquiryItem={handleRemoveInquiryItem}
              />
            </PageLayout>
          }
        />
        <Route
          path="/news/:articleId"
          element={
            <PageLayout inquiryCount={inquiryItems.length}>
              <NewsPage
                inquiryItems={inquiryItems}
                onToggleInquiry={handleToggleInquiry}
                onRemoveInquiryItem={handleRemoveInquiryItem}
              />
            </PageLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
