import React, { useEffect } from 'react';
import type { Product } from '../data/mockProducts';
import { CategoryAfterSalesTemplate } from '../components/organisms/CategoryAfterSalesTemplate';
import { AFTER_SALES_DATA } from '../data/afterSalesData';

export interface HatcheryAfterSalesPageProps {
  inquiryItems: Product[];
  onToggleInquiry: (product: Product) => void;
  onRemoveInquiryItem: (productId: string) => void;
}

export const HatcheryAfterSalesPage: React.FC<HatcheryAfterSalesPageProps> = ({
  inquiryItems,
  onToggleInquiry,
  onRemoveInquiryItem,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <CategoryAfterSalesTemplate
      data={AFTER_SALES_DATA.hatchery}
      inquiryItems={inquiryItems}
      onToggleInquiry={onToggleInquiry}
      onRemoveInquiryItem={onRemoveInquiryItem}
    />
  );
};
