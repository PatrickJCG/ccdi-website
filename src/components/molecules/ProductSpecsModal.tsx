import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ShieldCheck, Wrench, Layers, Building2, Wind, Plus, Check, Info, Sparkles } from "lucide-react";
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
          <div className={`h-1.5 ${product.isSoftLaunch ? 'bg-gradient-to-r from-purple-500 via-indigo-500 to-amber-400' : 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400'}`} />

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
                
                {product.isSoftLaunch ? (
                  <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black uppercase tracking-wider ml-auto shadow flex items-center gap-1.5 border border-purple-400/30">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    {product.softLaunchBadge || 'Listing Soon'}
                  </span>
                ) : product.isSample ? (
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

              {!product.isSoftLaunch && (
                <p className="text-sm text-slate-300 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* Soft Launch Alert Box & CCDI Brand Card */}
            {product.isSoftLaunch && (
              <div className="space-y-4">
                {/* CCDI Uniform Brand Layout Graphic */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#07162A] via-[#0D2644] to-[#122D4F] border border-amber-400/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
                  <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

                  {/* Subtle Silhouette Watermark of CCDI Logo */}
                  <div className="absolute inset-0 flex items-center justify-end pr-6 pointer-events-none overflow-hidden">
                    <img
                      src="/ccdi-logo.png"
                      alt=""
                      aria-hidden="true"
                      className="w-72 max-w-none opacity-10 brightness-200 contrast-125 scale-125"
                    />
                  </div>
                  <div className="flex items-center gap-3.5 relative z-10">
                    <div className="bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-white/20 shrink-0">
                      <img src="/ccdi-logo.png" alt="CCDI Logo" className="h-10 w-auto object-contain" />
                    </div>
                    <div>
                      <p className="text-xs font-black tracking-[0.2em] text-white uppercase">Clarkbase Construction Dev't Inc.</p>
                      <p className="text-[11px] font-extrabold text-amber-400 uppercase tracking-widest mt-0.5">Turnkey Agro-Industrial Portfolio</p>
                    </div>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-purple-600/30 border border-purple-400/40 text-purple-200 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow relative z-10">
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                    Listing Soon
                  </span>
                </div>

                {/* Soft Launch Notice */}
                <div className="bg-gradient-to-r from-purple-950/80 via-indigo-950/80 to-slate-900 border border-purple-500/40 rounded-2xl p-5 shadow-xl space-y-3">
                  <div className="flex items-center justify-between gap-3 border-b border-purple-500/20 pb-3">
                    <div className="flex items-center gap-2 text-purple-300 font-extrabold text-xs uppercase tracking-widest">
                      <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span>Listing Soon — Commercial Inquiry Status</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-400/20 border border-amber-400/30 px-3 py-0.5 rounded-full">
                      {product.estimatedAvailability || 'Taking Pre-Orders'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {product.softLaunchNotice ||
                      'This product is ready for commercial order and project design inquiries. Official datasheets and detailed engineering blueprints are currently on hold pending final release.'}
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-purple-300 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Commercial quotes & early access reservations are currently ACTIVE for this item.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Building Specs Box (If Available and Not Soft Launched) */}
            {!product.isSoftLaunch && buildingSpecs && (
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

            {/* Materials Breakdown (If Available and Not Soft Launched) */}
            {!product.isSoftLaunch && materials && (
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

            {/* Metrics summary (Hidden for Soft Launched Products) */}
            {!product.isSoftLaunch && (
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
            )}

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
                      : product.isSoftLaunch
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/30"
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30",
                  ].join(" ")}
                >
                  {isAddedToInquiry ? (
                    <><Check className="w-4 h-4" /> Added to Inquiry</>
                  ) : product.isSoftLaunch ? (
                    <><Plus className="w-4 h-4" /> Inquire for Details</>
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
