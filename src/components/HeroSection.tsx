import React, { useState } from 'react';
import { PortfolioTheme, TelemetryNode } from '../types/portfolio';
import { TelemetryDiagram } from './TelemetryDiagram';

interface HeroSectionProps {
  theme: PortfolioTheme;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ theme, onOpenResume }) => {
  const [inspectedNode, setInspectedNode] = useState<TelemetryNode | null>(null);

  const isRust = theme === 'rust';
  const isObsidian = theme === 'obsidian';

  const textPrimary = isRust ? 'text-[#d9480f]' : isObsidian ? 'text-sky-400' : 'text-[#0040da]';
  const btnExplore = isRust
    ? 'bg-[#1b1d21] text-white hover:bg-[#d9480f]'
    : isObsidian
    ? 'bg-sky-600 text-white hover:bg-sky-500'
    : 'bg-[#1c1b1b] text-white hover:bg-[#0040da]';

  return (
    <section className="w-full border-b transition-colors relative overflow-hidden pt-6 pb-12 lg:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typographic Stance & Clear Signals */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4">
            {/* Availability Tag & Eyebrow Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded font-mono text-[11px] font-semibold tracking-wider uppercase shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isRust ? 'bg-[#d9480f]' : 'bg-[#0040da]'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isRust ? 'bg-[#d9480f]' : 'bg-[#0040da]'}`}></span>
                </span>
                <span className={textPrimary}>Open to Entry-Level Opportunities</span>
              </span>
              <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest pl-1">
                [SYS_ID: ARUL_DEV_2024]
              </span>
            </div>

            {/* Eyebrow Monospace Banner */}
            <p className={`font-mono text-xs uppercase font-bold tracking-wider ${textPrimary}`}>
              // ENGINEERING DATA. BUILDING SOLUTIONS.
            </p>

            {/* Core Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] text-neutral-900 dark:text-white max-w-2xl">
              Turning Data Into Decisions.{' '}
              <span className="text-neutral-600 dark:text-neutral-400 font-semibold block sm:inline">
                Building Software Into Solutions.
              </span>
            </h1>

            {/* Supporting Editorial Abstract */}
            <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 max-w-xl leading-relaxed">
              I'm <strong className="text-neutral-900 dark:text-white font-bold">Arul</strong>, an early-career Data Engineer and Full-Stack Developer with hands-on industrial operations roots. I engineer robust ETL workflows, model multi-tier data warehouses, and build performant software to resolve concrete operational friction.
            </p>

            {/* Engineering Credential Telemetry Strip */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center gap-2.5 px-3 py-2 bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-300 dark:border-neutral-700 rounded">
                <span className={`material-symbols-outlined text-[18px] shrink-0 ${textPrimary}`}>
                  pin_drop
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Location Base</p>
                  <p className="font-mono text-xs text-neutral-900 dark:text-neutral-200 font-medium truncate">Tamil Nadu, India</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2 bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-300 dark:border-neutral-700 rounded">
                <span className={`material-symbols-outlined text-[18px] shrink-0 ${textPrimary}`}>
                  school
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Academic Milestone</p>
                  <p className="font-mono text-xs text-neutral-900 dark:text-neutral-200 font-medium truncate">B.Tech CSE — Graduating 2026</p>
                </div>
              </div>
            </div>

            {/* CTA Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#projects"
                className={`inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs uppercase tracking-wider rounded font-semibold shadow-xs hover:shadow-md transition-all duration-200 ${btnExplore}`}
              >
                <span>Explore My Work</span>
                <span className="material-symbols-outlined text-[16px]">south_east</span>
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-white text-neutral-900 dark:text-white font-mono text-xs uppercase tracking-wider rounded font-medium transition-colors shadow-2xs cursor-pointer"
              >
                <span className={`material-symbols-outlined text-[16px] ${textPrimary}`}>
                  download_for_offline
                </span>
                <span>Download Resume</span>
              </button>

              <a
                href="#about"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <span>Read Background</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* Right Column: Precision Systems Blueprint Architecture Diagram */}
          <div className="lg:col-span-5 w-full">
            <TelemetryDiagram
              theme={theme}
              onSelectNode={(node) => setInspectedNode(node)}
            />

            {/* Node Info Callout Banner */}
            {inspectedNode && (
              <div className="mt-3 p-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded text-xs shadow-sm flex items-start justify-between gap-3 animate-fadeIn">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-mono font-bold ${textPrimary}`}>[{inspectedNode.label}]</span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">{inspectedNode.sublabel}</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
                    {inspectedNode.details}
                  </p>
                </div>
                <button
                  onClick={() => setInspectedNode(null)}
                  className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-0.5"
                  aria-label="Close telemetry callout"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
