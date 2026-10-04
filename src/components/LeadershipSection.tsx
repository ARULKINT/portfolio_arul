import React, { useState } from 'react';
import { PortfolioTheme, LeadershipItem } from '../types/portfolio';
import { LEADERSHIP } from '../data/portfolioData';

interface LeadershipSectionProps {
  theme: PortfolioTheme;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({ theme }) => {
  const [selectedLeader, setSelectedLeader] = useState<LeadershipItem | null>(null);

  const isLight = theme === 'light';

  const textPrimary = isLight ? 'text-indigo-600 font-bold' : 'text-sky-400';
  const hoverBorder = isLight ? 'hover:border-indigo-600' : 'hover:border-sky-500';
  const iconBg = isLight
    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
    : 'bg-sky-950 text-sky-400 border-sky-800';

  return (
    <section className="w-full py-12 lg:py-16 border-b transition-colors" id="leadership">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3 border-b border-neutral-300 dark:border-neutral-700/80 pb-4">
          <div>
            <span className={`font-mono text-xs uppercase font-bold tracking-widest ${textPrimary}`}>
              [SEC_07 // LEADERSHIP_&_IMPACT]
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
              Beyond the Code
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            OWNERSHIP, COMMUNITY &amp; EXECUTION
          </p>
        </div>

        {/* 5 Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEADERSHIP.map((item, idx) => {
            const isWide = idx === 4; // Kabaddi Athlete spans 2 columns
            return (
              <div
                key={idx}
                onClick={() => setSelectedLeader(item)}
                className={`bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 p-6 rounded transition-all duration-200 flex flex-col justify-between cursor-pointer shadow-2xs ${hoverBorder} ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded flex items-center justify-center mb-4 border ${iconBg}`}>
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between font-mono text-[11px]">
                  <span className={`uppercase font-bold ${textPrimary}`}>{item.domain}</span>
                  {item.highlightTag && (
                    <span className="text-neutral-500 font-semibold">{item.highlightTag}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Leadership Modal */}
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs animate-fadeIn">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg max-w-md w-full p-6 shadow-2xl relative font-sans">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded flex items-center justify-center border ${iconBg}`}>
                    <span className="material-symbols-outlined text-[18px]">{selectedLeader.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">{selectedLeader.title}</h3>
                    <span className="font-mono text-[10px] text-neutral-500 uppercase">{selectedLeader.domain}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLeader(null)}
                  className="p-1 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="space-y-3 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <p>{selectedLeader.summary}</p>
                {selectedLeader.fullNarrative && (
                  <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
                    <p className="font-semibold text-neutral-900 dark:text-white mb-1 font-mono text-[11px]">
                      // Concrete Execution Detail:
                    </p>
                    <p>{selectedLeader.fullNarrative}</p>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                <button
                  onClick={() => setSelectedLeader(null)}
                  className="px-4 py-1.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded font-mono text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
