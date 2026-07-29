import React, { useEffect } from 'react';
import { FullSolutionsCatalog } from '../components/organisms/FullSolutionsCatalog';
import { ContactSection } from '../components/organisms/ContactSection';
import type { Product } from '../data/mockProducts';

export interface SolutionsPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  inquiryItems,
  onToggleInquiry,
  onRemoveInquiryItem,
}) => {
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0 });
    }
  }, []);

  return (
    <>
      {/* PAGE 2: FULL SOLUTIONS CATALOG (<FullSolutionsCatalog />) */}
      <FullSolutionsCatalog
        inquiryItems={inquiryItems}
        onToggleInquiry={onToggleInquiry}
      />
      {/* SHARED CONTACT & INQUIRY FORM */}
      <ContactSection
        inquiryItems={inquiryItems}
        onRemoveInquiryItem={onRemoveInquiryItem}
      />
    </>
  );
};
