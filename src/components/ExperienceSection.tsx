import React, { useState } from 'react';
import { PortfolioTheme } from '../types/portfolio';
import { EXPERIENCE } from '../data/portfolioData';

interface ExperienceSectionProps {
  theme: PortfolioTheme;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ theme }) => {
  const [showShiftDetails, setShowShiftDetails] = useState<boolean>(false);

  const isLight = theme === 'light';

  const textPrimary = isLight ? 'text-indigo-600 font-bold' : 'text-sky-400';
  const borderPrimary = isLight ? 'border-indigo-600' : 'border-sky-500';
  const bgTimelineDot = isLight ? 'bg-indigo-600' : 'bg-sky-500';

  return (
    <section className="w-full py-12 lg:py-16 border-b transition-colors" id="experience">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3 border-b border-neutral-300 dark:border-neutral-700/80 pb-4">
          <div>
            <span className={`font-mono text-xs uppercase font-bold tracking-widest ${textPrimary}`}>
              [SEC_05 // INDUSTRIAL_EXPERIENCE]
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
              Professional Experience
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            REAL-WORLD PRODUCTION TIMELINE
          </p>
        </div>

        {/* Authentic Vertical Timeline Card */}
        <div className={`relative border-l-2 ${borderPrimary}/40 ml-4 md:ml-8 pl-6 md:pl-10 py-2 space-y-12`}>
          {/* Timeline Marker Dot */}
          <div className="relative group">
            <div className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full ${bgTimelineDot} border-4 border-white dark:border-neutral-900 shadow-xs`}></div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 p-6 lg:p-8 rounded-lg shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                    {EXPERIENCE.role}
                  </h3>
                  <p className={`font-medium text-sm sm:text-base ${textPrimary}`}>
                    {EXPERIENCE.company} • {EXPERIENCE.location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-neutral-400">calendar_today</span>
                  <span className="font-mono text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2.5 py-1 rounded">
                    {EXPERIENCE.period}
                  </span>
                </div>
              </div>

              {/* Narrative Responsibilities */}
              <ul className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
                {EXPERIENCE.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className={`material-symbols-outlined text-[18px] shrink-0 mt-0.5 ${textPrimary}`}>
                      check_circle
                    </span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Key Competencies Strip */}
              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                    Key Competencies Applied:
                  </span>
                  {EXPERIENCE.competencies.map((comp) => (
                    <span
                      key={comp}
                      className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono text-[11px] rounded border border-neutral-200 dark:border-neutral-700"
                    >
                      {comp}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setShowShiftDetails(!showShiftDetails)}
                  className={`font-mono text-xs font-semibold flex items-center gap-1 hover:underline cursor-pointer ${textPrimary}`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {showShiftDetails ? 'expand_less' : 'analytics'}
                  </span>
                  <span>{showShiftDetails ? 'Hide Shop Metrics' : 'Inspect Production Telemetry'}</span>
                </button>
              </div>

              {/* Expandable Shift Metrics Drawer */}
              {showShiftDetails && (
                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fadeIn">
                  {EXPERIENCE.shiftMetrics.map((metric, mIdx) => (
                    <div key={mIdx} className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded border border-neutral-200 dark:border-neutral-700 font-mono text-xs">
                      <span className="text-[10px] text-neutral-500 uppercase block mb-1">{metric.label}</span>
                      <span className="text-sm font-bold text-neutral-900 dark:text-white">{metric.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
