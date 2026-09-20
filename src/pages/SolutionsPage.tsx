import React from 'react';
import { ProductCatalog } from '../components/organisms/ProductCatalog';
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
  return (
    <>
      <ProductCatalog
        inquiryItems={inquiryItems}
        onToggleInquiry={onToggleInquiry}
      />
      <ContactSection
        inquiryItems={inquiryItems}
        onRemoveInquiryItem={onRemoveInquiryItem}
      />
    </>
  );
};
