import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ShieldCheck, Wrench, Layers, Building2, Wind, Plus, Check, Info } from "lucide-react";
import type { Product } from "../../data/mockProducts";

export interface ProductSpecsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isAddedToInquiry: boolean;
  onToggleInquiry: (product: Product) => void;
}

export const ProductSpecsModal: React.FC<ProductSpecsModalProps> = ({
  product,
  isOpen,
  onClose,
  isAddedToInquiry,
  onToggleInquiry,
}) => {
  if (!isOpen || !product) return null;

  const { buildingSpecs, materials } = product;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#091A2C] border border-amber-400/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-white"
        >
          {/* Header Bar Accent */}
          <div className="h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-6">

            {/* Title & Header */}
            <div className="space-y-3 border-b border-white/10 pb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
                  {product.businessUnit}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                  {product.subCategory}
                </span>
                
                {product.isSample ? (
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ml-auto">
                    <Info className="w-4 h-4 text-blue-400" />
                    Sample Demonstration Data
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider ml-auto shadow">
                    {product.badge}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-heading leading-tight text-white">
                {product.title}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Building Specs Box (If Available) */}
            {buildingSpecs && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>Building Parameters & Capacity Specifications</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {buildingSpecs.buildingType && (
                    <div className="bg-black/30 p-3.5 rounded-xl border border-white/5 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Building Type</p>
                      <p className="text-sm font-extrabold text-white">{buildingSpecs.buildingType}</p>
                    </div>
                  )}
                  {buildingSpecs.dimensions && (
                    <div className="bg-black/30 p-3.5 rounded-xl border border-white/5 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dimensions (L x W x H)</p>
                      <p className="text-sm font-extrabold text-amber-300">{buildingSpecs.dimensions}</p>
                    </div>
                  )}
                  {buildingSpecs.birdCapacity && (
                    <div className="bg-black/30 p-3.5 rounded-xl border border-white/5 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bird Capacity Target</p>
                      <p className="text-sm font-extrabold text-amber-400">{buildingSpecs.birdCapacity}</p>
                    </div>
                  )}
                </div>

                {buildingSpecs.features && buildingSpecs.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                    {buildingSpecs.features.map((feat, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        {feat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Materials Breakdown (If Available) */}
            {materials && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm uppercase tracking-wider">
                    <Wrench className="w-4 h-4" />
                    <span>Pre-Fabricated House Materials & Specifications</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-white/10 px-2.5 py-1 rounded-full uppercase">
                    ISO & PCAB Grade
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {materials.mainStructure && (
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-2">
                      <div className="flex items-center gap-1.5 text-amber-300 font-extrabold uppercase text-[11px]">
                        <Layers className="w-3.5 h-3.5 text-amber-400" />
                        <span>Main Structure</span>
                      </div>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside">
                        {materials.mainStructure.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}

                  {materials.secondaryStructure && (
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-2">
                      <div className="flex items-center gap-1.5 text-amber-300 font-extrabold uppercase text-[11px]">
                        <Wind className="w-3.5 h-3.5 text-amber-400" />
                        <span>Secondary Structure</span>
                      </div>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside">
                        {materials.secondaryStructure.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}

                  {materials.roofPurlin && (
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-2">
                      <p className="text-amber-300 font-extrabold uppercase text-[11px]">Roof Purlin</p>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside">
                        {materials.roofPurlin.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}

                  {materials.wallPurlin && (
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-2">
                      <p className="text-amber-300 font-extrabold uppercase text-[11px]">Wall Purlin</p>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside">
                        {materials.wallPurlin.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}

                  {materials.roofSheet && (
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-2">
                      <p className="text-amber-300 font-extrabold uppercase text-[11px]">Roof Sheet</p>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside">
                        {materials.roofSheet.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}

                  {materials.ceilingSheet && (
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-2">
                      <p className="text-amber-300 font-extrabold uppercase text-[11px]">Ceiling Sheet</p>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside">
                        {materials.ceilingSheet.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}

                  {materials.ceilingInsulation && (
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-2">
                      <p className="text-amber-300 font-extrabold uppercase text-[11px]">Ceiling Insulation</p>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside">
                        {materials.ceilingInsulation.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}

                  {materials.wallPanel && (
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-2">
                      <p className="text-amber-300 font-extrabold uppercase text-[11px]">Wall Panel</p>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside">
                        {materials.wallPanel.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Metrics summary */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-black/30 p-3 text-center rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">{product.metrics.spec1Label}</p>
                <p className="text-sm font-extrabold text-amber-300 mt-0.5">{product.metrics.spec1Value}</p>
              </div>
              <div className="bg-black/30 p-3 text-center rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">{product.metrics.spec2Label}</p>
                <p className="text-sm font-extrabold text-amber-300 mt-0.5">{product.metrics.spec2Value}</p>
              </div>
              <div className="bg-black/30 p-3 text-center rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">{product.metrics.spec3Label}</p>
                <p className="text-sm font-extrabold text-amber-300 mt-0.5">{product.metrics.spec3Value}</p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                CCDI Turnkey Engineering Standard · ISO 9001 & PCAB Compliant
              </p>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onToggleInquiry(product)}
                  className={[
                    "flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg",
                    isAddedToInquiry
                      ? "bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-amber-400/20"
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30",
                  ].join(" ")}
                >
                  {isAddedToInquiry ? (
                    <><Check className="w-4 h-4" /> Added to Inquiry</>
                  ) : (
                    <><Plus className="w-4 h-4" /> Add to Proposal Request</>
                  )}
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
