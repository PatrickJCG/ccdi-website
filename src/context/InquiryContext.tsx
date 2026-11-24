import React, { useState, useCallback, useMemo } from "react";
import type { Product } from "../data/mockProducts";
import { InquiryContext, type InquiryContextValue } from "./useInquiry";

export const InquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inquiryItems, setInquiryItems] = useState<Product[]>([]);

  const toggleInquiry = useCallback((product: Product) => {
    setInquiryItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      return exists ? prev.filter(item => item.id !== product.id) : [...prev, product];
    });
  }, []);

  const removeInquiryItem = useCallback((productId: string) => {
    setInquiryItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const clearInquiry = useCallback(() => {
    setInquiryItems([]);
  }, []);

  const isInInquiry = useCallback(
    (productId: string) => inquiryItems.some(item => item.id === productId),
    [inquiryItems],
  );

  // Memoize the context value so consumers only re-render when data actually changes
  const value = useMemo<InquiryContextValue>(
    () => ({
      inquiryItems,
      inquiryCount: inquiryItems.length,
      toggleInquiry,
      removeInquiryItem,
      clearInquiry,
      isInInquiry,
    }),
    [inquiryItems, toggleInquiry, removeInquiryItem, clearInquiry, isInInquiry],
  );

  return (
    <InquiryContext.Provider value={value}>
      {children}
    </InquiryContext.Provider>
  );
};
