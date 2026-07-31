import React, { createContext, useContext, useState, useCallback } from "react";
import type { Product } from "../data/mockProducts";

interface InquiryContextValue {
  inquiryItems: Product[];
  inquiryCount: number;
  toggleInquiry: (product: Product) => void;
  removeInquiryItem: (productId: string) => void;
  clearInquiry: () => void;
  isInInquiry: (productId: string) => boolean;
}

const InquiryContext = createContext<InquiryContextValue | null>(null);

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

  return (
    <InquiryContext.Provider
      value={{ inquiryItems, inquiryCount: inquiryItems.length, toggleInquiry, removeInquiryItem, clearInquiry, isInInquiry }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = (): InquiryContextValue => {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiry must be used inside <InquiryProvider>");
  return ctx;
};
