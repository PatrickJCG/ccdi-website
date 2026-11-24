import { createContext, useContext } from "react";
import type { Product } from "../data/mockProducts";

export interface InquiryContextValue {
  inquiryItems: Product[];
  inquiryCount: number;
  toggleInquiry: (product: Product) => void;
  removeInquiryItem: (productId: string) => void;
  clearInquiry: () => void;
  isInInquiry: (productId: string) => boolean;
}

export const InquiryContext = createContext<InquiryContextValue | null>(null);

export const useInquiry = (): InquiryContextValue => {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiry must be used inside <InquiryProvider>");
  return ctx;
};
