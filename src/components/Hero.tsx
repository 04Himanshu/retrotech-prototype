import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { ArrowDown, ArrowUpRight, ShieldCheck, Sparkles, Compass, Layers, Zap } from 'lucide-react';
import { HeroNeuralBackground, type NeuralFormation } from './HeroNeuralBackground';

interface HeroProps {
  onCursorChange?: (variant: 'default' | 'hover' | 'project' | 'drag', text?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onCursorChange }) => {
  const [formation, setFormation] = useState<NeuralFormation>('sphere');

  const headlineLines = [
    { text: "ENGINEERING DIGITAL", isItalic: false },
    { text: "EXCELLENCE & SMART AI", isItalic: true },
    { text: "FOR ENTERPRISES.", isItalic: false },
  ];

  return (
    <section className="relative min-h-screen pt-24 md:pt-28 pb-8 md:pb-10 flex flex-col justify-between overflow-hidden bg-[#FFFFFF]">
      {/* Interactive 3D WebGL Quantum Neural Canvas Background */}
      <HeroNeuralBackground
        formation={formation}
        onFormationChange={setFormation}
        onCursorChange={onCursorChange}
      />

      {/* Main Hero Container: Perfectly Centered Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex-1 flex flex-col justify-center items-center my-auto">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-5 md:space-y-6">

          {/* Category / Agency Tagline - Symmetrically Centered */}
          <div className="flex items-center justify-center gap-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 28 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1.5px] bg-[#353788]"
            />
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] md:text-xs uppercase font-bold tracking-[0.25em] text-[#737373]"
            >
              RetroTech Digital &bull; 360° IT, Software &amp; Marketing Solutions
            </motion.span>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 28 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1.5px] bg-[#353788]"
            />
          </div>

          {/* Oversized High-Impact Typography Reveal - Centered */}
          <div className="space-y-1 sm:space-y-2 text-center w-full">
            {headlineLines.map((line, idx) => (
              <div key={idx} className="overflow-hidden">
                <motion.h1
                  initial={{ y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.0,
                    delay: 0.25 + idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.85rem] font-extrabold tracking-tightest leading-[0.96] text-[#171717] ${
                    line.isItalic ? 'font-serif italic font-normal tracking-normal text-[#353788]' : ''
                  }`}
                >
                  {line.text}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Narrative Value Proposition - Centered */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-[#737373] font-normal leading-relaxed max-w-2xl mx-auto text-center"
          >
            We translate enterprise ambition into bespoke digital flagships, high-velocity mobile applications, custom CRM architectures, and high-yield performance marketing systems.
          </motion.p>

          {/* Action Buttons - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <MagneticButton>
              <a
                href="#work"
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#171717] hover:bg-[#353788] text-white text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                onMouseEnter={() => onCursorChange?.('hover')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                <span>Explore Selected Work</span>
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </div>
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 px-6 py-4 rounded-full border border-[#E8E8E8] hover:border-[#171717] bg-white text-[#171717] text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-xs"
                onMouseEnter={() => onCursorChange?.('hover')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                <span>Request Consultation</span>
              </a>
            </MagneticButton>
          </motion.div>

          {/* Enterprise Trust Badges Bar - Centered */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="pt-6 border-t border-[#E8E8E8] flex flex-wrap items-center justify-center gap-4 sm:gap-6 mx-auto"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#353788]" />
              <span className="text-xs font-semibold text-[#171717]">Google &amp; Meta Certified</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#D4D4D4]" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#171717]">4.9★</span>
              <span className="text-xs text-[#737373]">Verified Rating</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#D4D4D4]" />
            <div className="text-xs text-[#737373]">Gurugram &bull; Serving Global Markets</div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Bottom Scroll Indicator & 3D WebGL Neural Controller */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737373] relative z-20"
      >
        {/* Availability status */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-[#171717]">Accepting Select Projects for Q2/Q3</span>
        </div>

        {/* 3D WebGL Quantum Neural Matrix Formation Controls */}
        <div className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-xl border border-[#E8E8E8] shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-1.5 pr-2 border-r border-[#E8E8E8]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#353788] hidden md:inline">
              3D Neural Core
            </span>
          </div>

          <div className="flex items-center gap-1">
            {(
              [
                { id: 'sphere', label: 'Sphere', icon: Compass },
                { id: 'matrix', label: 'Lattice', icon: Layers },
                { id: 'stream', label: 'Helix', icon: Zap },
                { id: 'field', label: 'Field', icon: Sparkles },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const isActive = formation === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setFormation(item.id)}
                  onMouseEnter={() => onCursorChange?.('hover')}
                  onMouseLeave={() => onCursorChange?.('default')}
                  title={`Morph 3D background into ${item.label} matrix`}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-semibold transition-all flex items-center gap-1 cursor-pointer ${isActive
                      ? 'bg-[#353788] text-white shadow-xs'
                      : 'text-[#737373] hover:text-[#171717] hover:bg-black/5'
                    }`}
                >
                  <Icon className="w-2.5 h-2.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scroll Down */}
        <a
          href="#services"
          className="flex items-center gap-2 hover:text-[#171717] transition-colors group cursor-pointer"
          onMouseEnter={() => onCursorChange?.('hover')}
          onMouseLeave={() => onCursorChange?.('default')}
        >
          <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Scroll Down</span>
          <div className="w-7 h-7 rounded-full border border-[#E8E8E8] group-hover:border-[#171717] flex items-center justify-center transition-colors">
            <ArrowDown className="w-3 h-3 text-[#171717] group-hover:translate-y-0.5 transition-transform" />
          </div>
        </a>
      </motion.div>
    </section>
  );
};
