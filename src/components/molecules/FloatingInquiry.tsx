import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowRight } from 'lucide-react';

export interface FloatingInquiryProps {
  inquiryCount: number;
}

export const FloatingInquiry: React.FC<FloatingInquiryProps> = ({ inquiryCount }) => {
  const navigate = useNavigate();
  const [justUpdated, setJustUpdated] = useState(false);
  const prevCountRef = useRef(inquiryCount);

  // Trigger bounce & toast feedback whenever inquiry count changes
  useEffect(() => {
    if (inquiryCount > prevCountRef.current) {
      setJustUpdated(true);
      const timer = setTimeout(() => setJustUpdated(false), 2400);
      prevCountRef.current = inquiryCount;
      return () => clearTimeout(timer);
    }
    prevCountRef.current = inquiryCount;
  }, [inquiryCount]);

  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 72;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
    } else {
      navigate('/#contact');
    }
  };

  return (
    <AnimatePresence>
      {inquiryCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 380, damping: 24 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
        >
          {/* ── Feedback Notification Bubble (Pops when items are added) ── */}
          <AnimatePresence>
            {justUpdated && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.85 }}
                animate={{ opacity: 1, y: -8, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="mb-2 px-3 py-1.5 rounded-[3px] bg-[#07162A] text-amber-400 border border-amber-400/60 shadow-xl text-xs font-mono font-bold flex items-center gap-1.5 pointer-events-none whitespace-nowrap"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>+1 Added to Inquiry List</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Floating Action Pill ── */}
          <motion.button
            type="button"
            onClick={handleClick}
            animate={justUpdated ? { scale: [1, 1.15, 0.95, 1.05, 1] } : { scale: 1 }}
            transition={{ duration: 0.45 }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="relative flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-[#0B192C] text-white border-2 border-[#F3A812] shadow-2xl shadow-amber-500/25 hover:border-amber-300 hover:shadow-amber-500/40 transition-colors cursor-pointer group"
            aria-label={`View ${inquiryCount} items in inquiry list`}
          >
            {/* Pulsing glow ring on item addition */}
            {justUpdated && (
              <span className="absolute -inset-1 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />
            )}

            {/* Icon Pill */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F3A812] text-slate-950 flex items-center justify-center shrink-0 shadow-md group-hover:bg-amber-300 transition-colors">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5 fill-slate-950/20" />
            </div>

            {/* Desktop Label & Subtitle */}
            <div className="flex flex-col text-left leading-tight pr-1">
              <span className="font-sans text-xs uppercase tracking-wider font-extrabold text-slate-100 group-hover:text-white">
                Inquiry List
              </span>
              <span className="font-mono text-[10px] text-amber-400 font-semibold">
                {inquiryCount} {inquiryCount === 1 ? 'specification' : 'specifications'}
              </span>
            </div>

            {/* Count Badge */}
            <motion.span
              key={inquiryCount}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              className="px-2 py-0.5 rounded-full bg-[#F3A812] text-slate-950 font-mono text-xs font-black tabular-nums shadow-sm shrink-0"
            >
              {inquiryCount}
            </motion.span>

            <ArrowRight className="w-3.5 h-3.5 text-amber-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
