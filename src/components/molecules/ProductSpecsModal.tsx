import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, Wrench, Layers, Building2, Wind, Plus, Check, X, Play, Images } from "lucide-react";
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
  // Hook must be called unconditionally — before any early returns
  const [modalMediaTab, setModalMediaTab] = useState<'image' | 'video'>('image');

  // Sync media tab when the product or open state changes
  useEffect(() => {
    if (isOpen && product) {
      setModalMediaTab(product.videoUrl ? 'video' : 'image');
    }
  }, [isOpen, product]);

  if (!isOpen || !product || typeof document === "undefined") return null;

  const { buildingSpecs, materials } = product;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 z-0"
        />

        {/* Modal Window: Sharp 2px Corners, Navy Primary & Gold Accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-[#07162A] border border-[#102A43] rounded-[2px] overflow-hidden z-10 my-auto text-white text-left"
        >
          {/* Header Bar Accent */}
          <div className="h-1 bg-amber-400" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close specifications modal"
            className="absolute top-4 right-4 w-8 h-8 rounded-[2px] bg-[#102A43] hover:bg-[#1E3E66] border border-[#1E3E66] hover:border-amber-400/70 text-slate-300 hover:text-white transition-all flex items-center justify-center z-20 cursor-pointer shadow-sm group"
          >
            <X className="w-4 h-4 transition-transform group-hover:scale-110" />
          </button>

          <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-6">

            {/* Title & Header */}
            <div className="space-y-3 border-b border-[#102A43] pb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-amber-400/15 border border-amber-400/40 text-amber-300">
                  {product.businessUnit}
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-[#102A43] text-slate-300 border border-[#1E3E66]">
                  {product.subCategory}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white">
                {product.title}
              </h2>

              {!product.isSoftLaunch && (
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {product.description}
                </p>
              )}
            </div>

            {/* Architectural & Equipment Multimedia Preview (Image / Video) */}
            {(product.imageUrl || product.videoUrl) && (
              <div className="space-y-2">
                {product.videoUrl && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-[#040D18] p-1 rounded-[2px] border border-[#102A43]">
                      <button
                        type="button"
                        onClick={() => setModalMediaTab('image')}
                        className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded-[2px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                          modalMediaTab === 'image'
                            ? 'bg-amber-400 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Images className="w-3.5 h-3.5" />
                        <span>3D Model Schematic</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalMediaTab('video')}
                        className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded-[2px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                          modalMediaTab === 'video'
                            ? 'bg-amber-400 text-slate-950 shadow-sm'
                            : 'text-amber-400 hover:text-white'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Facility Video Tour</span>
                      </button>
                    </div>

                    <span className="hidden sm:inline font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                      {modalMediaTab === 'video' ? 'ACTIVE MULTIMEDIA SPEC' : '3D CAD RENDER'}
                    </span>
                  </div>
                )}

                <div className="relative w-full h-64 sm:h-80 rounded-[2px] overflow-hidden bg-[#040D18] border border-[#102A43]">
                  {product.videoUrl && modalMediaTab === 'video' ? (
                    <video
                      src={product.videoUrl}
                      controls
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-contain bg-black"
                    />
                  ) : product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className={`w-full h-full ${
                        product.imageUrl.includes('3d') || product.imageUrl.includes('logo')
                          ? 'object-contain p-8 bg-gradient-to-b from-[#0B1E36] to-[#040D18]'
                          : 'object-cover brightness-[0.95]'
                      }`}
                    />
                  ) : null}

                  {/* Bottom Bar Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-[#040D18] via-[#040D18]/80 to-transparent flex items-center justify-between text-[11px] font-mono pointer-events-none">
                    <span className="text-amber-400 font-bold uppercase tracking-wider">
                      {product.subCategory} • {modalMediaTab === 'video' ? 'FACILITY VIDEO TOUR' : 'TECHNICAL SPECIFICATION'}
                    </span>
                    <span className="text-slate-400">
                      CCDI CERTIFIED ARCHITECTURE
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Soft Launch Alert Box & CCDI Brand Card */}
            {product.isSoftLaunch && (
              <div className="space-y-4">
                <div className="relative rounded-[2px] overflow-hidden bg-[#0B192C] border border-amber-400/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="bg-white rounded-[2px] px-3 py-1.5 flex items-center justify-center shrink-0">
                      <img
                        src="/images/branding/ccdi-logo.png"
                        alt="CCDI Logo"
                        className="h-8 w-auto object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">
                        CLARKBASE AGRO-INDUSTRIAL PIPELINE
                      </p>
                      <h4 className="text-lg font-bold text-white leading-tight mt-0.5">
                        {product.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 font-normal">
                        Engineering documentation in active review. Inquire for early project specs.
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 shrink-0">
                    <button
                      onClick={() => onToggleInquiry(product)}
                      className={`px-5 py-2 rounded-[2px] font-sans text-xs font-bold uppercase tracking-wider transition-colors ${
                        isAddedToInquiry
                          ? "bg-amber-400 text-slate-950 hover:bg-amber-300"
                          : "bg-amber-400 text-slate-950 hover:bg-amber-300"
                      }`}
                    >
                      {isAddedToInquiry ? "Included in Inquiry" : "Inquire for Details"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Key Engineering Metrics */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">
                Primary Operational Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#0B192C] p-3.5 rounded-[2px] border border-[#102A43] text-left">
                  <span className="font-mono text-[10px] text-slate-400 uppercase">{product.metrics.spec1Label}</span>
                  <p className="text-xl font-extrabold font-mono text-amber-400 tabular-nums mt-1">{product.metrics.spec1Value}</p>
                </div>
                <div className="bg-[#0B192C] p-3.5 rounded-[2px] border border-[#102A43] text-left">
                  <span className="font-mono text-[10px] text-slate-400 uppercase">{product.metrics.spec2Label}</span>
                  <p className="text-xl font-extrabold font-mono text-white tabular-nums mt-1">{product.metrics.spec2Value}</p>
                </div>
                <div className="bg-[#0B192C] p-3.5 rounded-[2px] border border-[#102A43] text-left">
                  <span className="font-mono text-[10px] text-slate-400 uppercase">{product.metrics.spec3Label}</span>
                  <p className="text-xl font-extrabold font-mono text-white tabular-nums mt-1">{product.metrics.spec3Value}</p>
                </div>
              </div>
            </div>

            {/* Building Specs Box */}
            {!product.isSoftLaunch && buildingSpecs && (
              <div className="bg-[#0B192C] border border-[#102A43] rounded-[2px] p-5 space-y-4 text-left">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
                  <Building2 className="w-4 h-4" />
                  <span>Building Parameters & Capacity Specifications</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {buildingSpecs.buildingType && (
                    <div className="bg-[#07162A] p-3 rounded-[2px] border border-[#102A43] space-y-1">
                      <p className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">Building Type</p>
                      <p className="text-xs font-bold text-white">{buildingSpecs.buildingType}</p>
                    </div>
                  )}
                  {buildingSpecs.dimensions && (
                    <div className="bg-[#07162A] p-3 rounded-[2px] border border-[#102A43] space-y-1">
                      <p className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">Dimensions</p>
                      <p className="text-xs font-mono font-bold text-amber-400">{buildingSpecs.dimensions}</p>
                    </div>
                  )}
                  {buildingSpecs.birdCapacity && (
                    <div className="bg-[#07162A] p-3 rounded-[2px] border border-[#102A43] space-y-1">
                      <p className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">Target Capacity</p>
                      <p className="text-xs font-mono font-bold text-amber-400">{buildingSpecs.birdCapacity}</p>
                    </div>
                  )}
                </div>

                {buildingSpecs.features && buildingSpecs.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[#102A43]">
                    {buildingSpecs.features.map((feat, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-[#07162A] border border-[#102A43] text-slate-300 text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {feat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Materials Breakdown */}
            {!product.isSoftLaunch && materials && (
              <div className="bg-[#0B192C] border border-[#102A43] rounded-[2px] p-5 space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <Wrench className="w-4 h-4" />
                    <span>Structural Material Specifications</span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-slate-400 bg-[#07162A] px-2 py-0.5 rounded-[2px] uppercase border border-[#102A43]">
                    ISO & PCAB Grade
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {materials.mainStructure && (
                    <div className="bg-[#07162A] p-4 rounded-[2px] border border-[#102A43] space-y-2">
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase font-mono text-[11px]">
                        <Layers className="w-3.5 h-3.5 text-amber-400" />
                        <span>Main Structure</span>
                      </div>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside">
                        {materials.mainStructure.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}

                  {materials.secondaryStructure && (
                    <div className="bg-[#07162A] p-4 rounded-[2px] border border-[#102A43] space-y-2">
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase font-mono text-[11px]">
                        <Wind className="w-3.5 h-3.5 text-amber-400" />
                        <span>Secondary Structure</span>
                      </div>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside">
                        {materials.secondaryStructure.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#102A43]">
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                CCDI Turnkey Engineering Standard · ISO 9001 & PCAB Compliant
              </p>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onToggleInquiry(product)}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-[2px] font-sans text-xs uppercase tracking-wider font-bold transition-colors ${
                    isAddedToInquiry
                      ? "bg-amber-400 text-slate-950 hover:bg-amber-300"
                      : "bg-amber-400 hover:bg-amber-300 text-slate-950"
                  }`}
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
    </AnimatePresence>,
    document.body
  );
};
