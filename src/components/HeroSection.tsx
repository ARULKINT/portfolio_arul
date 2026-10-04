import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { PortfolioTheme, TelemetryNode } from '../types/portfolio';
import { TelemetryDiagram } from './TelemetryDiagram';
import { 
  Sparkles, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  ArrowDownRight, 
  Download, 
  ExternalLink,
  ChevronRight,
  Database,
  Layers,
  Cpu
} from 'lucide-react';

interface HeroSectionProps {
  theme: PortfolioTheme;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ theme, onOpenResume }) => {
  const [inspectedNode, setInspectedNode] = useState<TelemetryNode | null>(null);

  const isLight = theme === 'light';

  const textPrimary = isLight ? 'text-indigo-600' : 'text-sky-400';
  const textGradient = isLight
    ? 'bg-gradient-to-r from-neutral-900 via-indigo-900 to-indigo-600 bg-clip-text text-transparent'
    : 'bg-gradient-to-r from-white via-sky-200 to-indigo-300 bg-clip-text text-transparent';

  const btnExplore = isLight
    ? 'bg-neutral-900 text-white hover:bg-indigo-600 shadow-indigo-500/20'
    : 'bg-sky-500 text-white hover:bg-sky-400 shadow-sky-500/20';

  // Motion variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section className="w-full border-b border-neutral-200 dark:border-neutral-800 transition-colors relative overflow-hidden pt-8 pb-16 lg:py-20" id="hero">
      {/* Background Animated Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: isLight ? [0.15, 0.3, 0.15] : [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl ${
            isLight ? 'bg-indigo-300' : 'bg-sky-600'
          }`}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: isLight ? [0.1, 0.25, 0.1] : [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute -bottom-24 -right-24 w-[30rem] h-[30rem] rounded-full blur-3xl ${
            isLight ? 'bg-sky-300' : 'bg-indigo-600'
          }`}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typographic Stance & Clear Signals */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start space-y-6"
          >
            {/* Availability Pill & System Badge */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-full font-mono text-[11px] font-bold tracking-wider uppercase shadow-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className={textPrimary}>Open for Entry-Level Data &amp; Software Roles</span>
              </div>
              <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest font-semibold">
                // ARUL G. PORTFOLIO
              </span>
            </motion.div>

            {/* Core Headline */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12]">
                <span className={textGradient}>Engineering Data Pipelines.</span>
                <br />
                <span className="text-neutral-700 dark:text-neutral-300 font-bold block mt-1 text-2xl sm:text-3xl lg:text-4xl">
                  Building Scalable Software Systems.
                </span>
              </h1>
            </motion.div>

            {/* Editorial Executive Abstract */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
              I am a <strong className="text-neutral-900 dark:text-white font-bold">Computer Science Graduate (2026)</strong> &amp; <strong className="text-neutral-900 dark:text-white font-bold">former Junior Engineer Trainee</strong>. I build high-throughput ETL data workflows (PySpark, Airflow, PostgreSQL), design analytical data warehouses, and develop full-stack React/Next.js web applications.
            </motion.p>

            {/* Engineering Highlights Grid */}
            <motion.div variants={itemVariants} className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xs">
                <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-[10px] font-mono uppercase font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500 dark:text-sky-400" />
                  <span>Location</span>
                </div>
                <p className="font-mono text-xs text-neutral-900 dark:text-white font-bold mt-1 truncate">Tamil Nadu, IN</p>
              </div>

              <div className="p-3 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xs">
                <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-[10px] font-mono uppercase font-semibold">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-500 dark:text-sky-400" />
                  <span>Degree</span>
                </div>
                <p className="font-mono text-xs text-neutral-900 dark:text-white font-bold mt-1 truncate">B.Tech CSE '26</p>
              </div>

              <div className="p-3 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xs">
                <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-[10px] font-mono uppercase font-semibold">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-500 dark:text-sky-400" />
                  <span>Industrial</span>
                </div>
                <p className="font-mono text-xs text-neutral-900 dark:text-white font-bold mt-1 truncate">17 Mo. Trainee</p>
              </div>

              <div className="p-3 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xs">
                <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-[10px] font-mono uppercase font-semibold">
                  <Code2 className="w-3.5 h-3.5 text-indigo-500 dark:text-sky-400" />
                  <span>Builds</span>
                </div>
                <p className="font-mono text-xs text-neutral-900 dark:text-white font-bold mt-1 truncate">11 Repos + 19 SDLC</p>
              </div>
            </motion.div>

            {/* Action CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-4">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className={`inline-flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-wider rounded-lg font-bold shadow-md transition-all cursor-pointer ${btnExplore}`}
              >
                <span>Explore 11 Engineering Projects</span>
                <ArrowDownRight className="w-4 h-4" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-white text-neutral-900 dark:text-white font-mono text-xs uppercase tracking-wider rounded-lg font-semibold transition-colors shadow-2xs cursor-pointer"
              >
                <Download className={`w-4 h-4 ${textPrimary}`} />
                <span>Resume &amp; Preview</span>
              </motion.button>

              <motion.a
                whileHover={{ x: 3 }}
                href="#experience"
                className="inline-flex items-center gap-1.5 px-3 py-3 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                <span>Experience &amp; Skills</span>
                <ChevronRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive System Telemetry Blueprint Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 w-full"
          >
            <div className="relative">
              {/* Outer Glow Outline */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-xl blur-sm opacity-30 dark:opacity-40 pointer-events-none"></div>

              <div className="relative">
                <TelemetryDiagram
                  theme={theme}
                  onSelectNode={(node) => setInspectedNode(node)}
                />
              </div>
            </div>

            {/* Node Info Popover Banner */}
            <AnimatePresence>
              {inspectedNode && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-3 p-3.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs shadow-lg flex items-start justify-between gap-3 font-mono"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-bold ${textPrimary}`}>[{inspectedNode.label}]</span>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">{inspectedNode.sublabel}</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 text-xs leading-relaxed font-sans">
                      {inspectedNode.details}
                    </p>
                  </div>
                  <button
                    onClick={() => setInspectedNode(null)}
                    className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-0.5"
                    aria-label="Close telemetry callout"
                  >
                    ✕
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
