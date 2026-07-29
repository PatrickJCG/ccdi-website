import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sun, Factory, Layers, Play, Pause } from 'lucide-react';

export interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
}

// Local CCDI Video in public directory
const VIDEO_SRC = '/ccdi vid.mp4';
const POSTER = 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2000&q=80';

const HIGHLIGHTS = [
  { icon: ShieldCheck, label: 'Poultry', sub: 'Bio-Secure Housing' },
  { icon: Layers,      label: 'Hatcheries', sub: 'Incubation Systems' },
  { icon: Factory,     label: 'Feedmills', sub: 'Automated Batching' },
  { icon: Sun,         label: 'Solar Energy', sub: 'Clean PV Integration' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  headline    = 'Integrated Solutions for Agribusiness Industry',
  subheadline = 'From turnkey poultry and hatchery facilities to advanced feedmills and clean solar energy integration, CCDI delivers end-to-end agro-industrial solutions built for operational excellence.',
}) => {
  const navigate   = useNavigate();
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); } else { v.play(); }
    setPlaying(p => !p);
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-[94vh] lg:min-h-screen flex items-center overflow-hidden bg-[#07162a] text-white"
    >
      {/* ── BACKGROUND VIDEO ─────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={POSTER}
          className="w-full h-full object-cover"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          <img src={POSTER} alt="CCDI Agribusiness" className="w-full h-full object-cover" />
        </video>

        {/* Dynamic Dark Gradient & Radial Overlays for Enhanced Contrast & Legibility */}
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162a]/95 via-[#07162a]/80 to-[#07162a]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07162a] via-transparent to-[#07162a]/60" />
      </div>

      {/* ── SUBTLE BRANDED GRID PATTERN ─────────────────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(rgba(245,158,11,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-7">

          {/* Eyebrow tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-400/15 border border-amber-400/35 text-amber-300 text-xs font-semibold tracking-wider backdrop-blur-md shadow-lg shadow-black/20"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            Philippine-Based Agro-Industrial Engineering
          </motion.div>

          {/* Headline with High Contrast Drop Shadow */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading leading-[1.08] tracking-tight text-white drop-shadow-lg"
          >
            {headline.includes('Agribusiness') ? (
              <>
                Integrated Solutions<br />
                for{' '}
                <span className="text-amber-400 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
                  Agribusiness
                </span>{' '}
                Industry
              </>
            ) : (
              headline
            )}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl drop-shadow-sm font-normal"
          >
            {subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3.5 pt-1"
          >
            <button
              onClick={() => navigate('/solutions')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-xl shadow-amber-500/25 hover:shadow-amber-400/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 whitespace-nowrap"
            >
              Explore Our Solutions
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else navigate('/#contact');
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white border border-white/30 hover:border-amber-400/80 bg-white/10 hover:bg-white/20 backdrop-blur-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 whitespace-nowrap shadow-lg shadow-black/20"
            >
              Request Consultation
            </button>
          </motion.div>

          {/* Highlights Grid with Glassmorphism Carding — 4 Core Solution Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/15"
          >
            {HIGHLIGHTS.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                onClick={() => navigate('/solutions')}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-md hover:bg-white/12 hover:border-amber-400/50 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-400/20 group-hover:bg-amber-400/30 flex items-center justify-center shrink-0 border border-amber-400/30 transition-colors">
                  <Icon className="w-[18px] h-[18px] text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] text-amber-300/90 uppercase tracking-wider font-bold leading-none">{label}</p>
                  <p className="text-xs sm:text-sm font-extrabold text-white leading-tight mt-1">{sub}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Video Play/Pause control */}
      <button
        onClick={toggleVideo}
        aria-label={playing ? 'Pause background video' : 'Play background video'}
        className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/70 border border-white/20 text-white/80 hover:text-white hover:bg-slate-900 text-xs font-semibold backdrop-blur-md transition-all shadow-lg"
      >
        {playing
          ? <><Pause className="w-3.5 h-3.5 text-amber-400" /> Pause Video</>
          : <><Play className="w-3.5 h-3.5 ml-px text-amber-400" /> Play Video</>}
      </button>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#07162a] to-transparent z-[2]" />
    </section>
  );
};
