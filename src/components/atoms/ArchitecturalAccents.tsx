import React from 'react';
import { motion } from 'framer-motion';

export interface AccentProps {
  className?: string;
}

export const CornerAccent: React.FC<AccentProps> = ({
  className = 'absolute top-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto z-0 opacity-25',
}) => (
  <img
    src="/images/accents/card-corner-accent.png"
    alt=""
    loading="lazy"
    decoding="async"
    className={`object-contain object-right-top pointer-events-none select-none ${className}`}
    aria-hidden="true"
  />
);

export const DarkAccentGraphic: React.FC<AccentProps> = ({
  className = 'absolute bottom-0 right-0 w-72 sm:w-96 lg:w-[480px] h-auto object-contain object-right-bottom z-0 opacity-20',
}) => (
  <img
    src="/images/accents/dark-accent-graphic.png"
    alt=""
    loading="lazy"
    decoding="async"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  />
);

export interface SectionAccentsProps {
  topLeftClassName?: string;
  bottomRightClassName?: string;
  imageOpacityClassName?: string;
  offsetY?: number;
}

export const SectionAccents: React.FC<SectionAccentsProps> = ({
  topLeftClassName = 'absolute -top-12 -left-16 sm:-top-8 sm:left-0 w-72 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0',
  bottomRightClassName = 'absolute -bottom-16 -right-16 sm:-right-8 sm:bottom-0 w-72 sm:w-96 lg:w-[480px] pointer-events-none select-none z-0',
  imageOpacityClassName = 'opacity-30',
  offsetY = 45,
}) => (
  <>
    <motion.div
      initial={{ opacity: 0, y: -offsetY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      className={topLeftClassName}
      aria-hidden="true"
    >
      <img
        src="/images/accents/accent2.png"
        alt=""
        loading="lazy"
        decoding="async"
        className={`w-full h-auto object-contain ${imageOpacityClassName}`}
      />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: offsetY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      className={bottomRightClassName}
      aria-hidden="true"
    >
      <img
        src="/images/accents/dark-accent-graphic.png"
        alt=""
        loading="lazy"
        decoding="async"
        className={`w-full h-auto object-contain ${imageOpacityClassName}`}
      />
    </motion.div>
  </>
);
