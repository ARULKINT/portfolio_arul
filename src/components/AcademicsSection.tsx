import React from 'react';
import { PortfolioTheme } from '../types/portfolio';
import { ACADEMICS } from '../data/portfolioData';

interface AcademicsSectionProps {
  theme: PortfolioTheme;
}

export const AcademicsSection: React.FC<AcademicsSectionProps> = ({ theme }) => {
  const isLight = theme === 'light';

  const textPrimary = isLight ? 'text-indigo-600 font-bold' : 'text-sky-400';
  const hoverBorder = isLight ? 'hover:border-indigo-600' : 'hover:border-sky-500';

  return (
    <section className="w-full py-12 lg:py-16 border-b transition-colors bg-neutral-100/60 dark:bg-neutral-900/40" id="academics">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3 border-b border-neutral-300 dark:border-neutral-700/80 pb-4">
          <div>
            <span className={`font-mono text-xs uppercase font-bold tracking-widest ${textPrimary}`}>
              [SEC_06 // ACADEMIC_DISCIPLINE]
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
              Academic Foundation
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            RIGOROUS TECHNICAL GROUNDING
          </p>
        </div>

        {/* Refined Two-Card Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACADEMICS.map((entry, idx) => (
            <div
              key={idx}
              className={`bg-white dark:bg-neutral-900 p-6 lg:p-8 rounded-lg border border-neutral-300 dark:border-neutral-700 flex flex-col justify-between transition-colors shadow-2xs ${hoverBorder}`}
            >
              <div>
                <div className="flex items-center justify-between text-neutral-500 font-mono text-xs mb-2">
                  <span className={`font-bold ${idx === 0 ? textPrimary : ''}`}>{entry.degreeType}</span>
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[11px] uppercase font-semibold border ${entry.status === 'In Progress'
                        ? isLight
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                          : 'bg-sky-950/80 text-sky-300 border-sky-700'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                      }`}
                  >
                    {entry.status}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-1">
                  {entry.title}
                </h3>
                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
                  {entry.institution}
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  {entry.description}
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {entry.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-2 py-0.5 bg-neutral-50 dark:bg-neutral-800 font-mono text-[11px] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 rounded"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white">
                    {entry.period}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
