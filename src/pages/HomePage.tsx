import React from 'react';
import { HeroSection } from '../components/organisms/HeroSection';
import { AboutUs } from '../components/organisms/AboutUs';
import { SolutionsPreview } from '../components/organisms/SolutionsPreview';
import { WhyChooseUs } from '../components/organisms/WhyChooseUs';
import { NewsSection } from '../components/organisms/NewsSection';
import { ContactSection } from '../components/organisms/ContactSection';
import type { Product } from '../data/mockProducts';

export interface HomePageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  inquiryItems,
  onToggleInquiry,
  onRemoveInquiryItem,
}) => {
  return (
    <>
      {/* 1. HERO SECTION (<HeroSection />) */}
      <HeroSection />

      {/* 2. INTEGRATED CAPABILITIES (<SolutionsPreview /> 6-Item Grid + CTA) */}
      <SolutionsPreview inquiryItems={inquiryItems} onToggleInquiry={onToggleInquiry} />

      {/* 3. ABOUT US & CORE VALUES (<AboutUs /> Mission, Vision, Stats & 5 Core Values) */}
      <AboutUs />

      {/* 4. WHY CHOOSE CCDI (<WhyChooseUs /> 4 Pillars of Strength) */}
      <WhyChooseUs />

      {/* 5. NEWS & UPDATES PREVIEW (<NewsSection /> Latest Projects & Articles Grid) */}
      <NewsSection />

      {/* 6. CONTACT & CONSULTATION (<ContactSection /> Shared Contact & Dynamic Form) */}
      <ContactSection inquiryItems={inquiryItems} onRemoveInquiryItem={onRemoveInquiryItem} />
    </>
  );
};
