import React from 'react';
import { Navbar } from '../organisms/Navbar';
import { Footer } from '../organisms/Footer';
import { FloatingInquiry } from '../molecules/FloatingInquiry';

export interface PageLayoutProps {
  inquiryCount: number;
  children: React.ReactNode;
}

/** Shared wrapper used by all pages. */
export const PageLayout: React.FC<PageLayoutProps> = ({ inquiryCount, children }) => (
  <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-brand-amber-500 selection:text-white">
    <Navbar inquiryCount={inquiryCount} />
    <main>{children}</main>
    <Footer />
    <FloatingInquiry inquiryCount={inquiryCount} />
  </div>
);
