import React, { useEffect } from 'react';
import type { Product } from '../data/mockProducts';
import { CategoryAfterSalesTemplate } from '../components/organisms/CategoryAfterSalesTemplate';
import { AFTER_SALES_DATA } from '../data/afterSalesData';

export interface PoultryAfterSalesPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

export const PoultryAfterSalesPage: React.FC<PoultryAfterSalesPageProps> = ({
  inquiryItems,
  onToggleInquiry,
  onRemoveInquiryItem,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <CategoryAfterSalesTemplate
      data={AFTER_SALES_DATA.poultry}
      inquiryItems={inquiryItems}
      onToggleInquiry={onToggleInquiry}
      onRemoveInquiryItem={onRemoveInquiryItem}
    />
  );
};
