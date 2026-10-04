import React, { useState } from 'react';
import { PortfolioTheme, SkillDetail } from '../types/portfolio';
import { SKILL_CATEGORIES, DESIGN_SKILLS, SKILL_DETAILS } from '../data/portfolioData';

interface CapabilitiesSectionProps {
  theme: PortfolioTheme;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ theme }) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);

  const isRust = theme === 'rust';
  const isObsidian = theme === 'obsidian';

  const textPrimary = isRust ? 'text-[#d9480f]' : isObsidian ? 'text-sky-400' : 'text-[#0040da]';
  const hoverSkillBorder = isRust ? 'hover:border-[#d9480f] hover:text-[#d9480f]' : isObsidian ? 'hover:border-sky-400 hover:text-sky-300' : 'hover:border-[#0040da] hover:text-[#0040da]';

  const handleSkillClick = (skillName: string) => {
    if (SKILL_DETAILS[skillName]) {
      setSelectedSkill(SKILL_DETAILS[skillName]);
    } else {
      setSelectedSkill({
        name: skillName,
        category: 'Applied Capability',
        proficiency: 'Production Ready',
        projects: ['Operational Infrastructure & Automation'],
        context: `Actively utilized for production grade data pipelines, script automation, and full-stack software interfaces.`
      });
    }
  };

  return (
    <section className="w-full py-12 lg:py-16 border-b transition-colors bg-neutral-100/60 dark:bg-neutral-900/40" id="capabilities">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3 border-b border-neutral-300 dark:border-neutral-700/80 pb-4">
          <div>
            <span className={`font-mono text-xs uppercase font-bold tracking-widest ${textPrimary}`}>
              [SEC_04 // CAPABILITY_MATRIX]
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
              Tools I Work With
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            EVALUATED BY PRODUCTION UTILITY &amp; CODE QUALITY
          </p>
        </div>

        {/* 6 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="bg-white dark:bg-neutral-900 p-6 rounded border border-neutral-300 dark:border-neutral-700 shadow-2xs"
            >
              <div className={`flex items-center gap-2 mb-4 ${textPrimary}`}>
                <span className="material-symbols-outlined text-[20px]">{category.icon}</span>
                <h3 className="font-mono text-xs uppercase font-bold text-neutral-900 dark:text-white tracking-wider">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillClick(skill)}
                    className={`px-3 py-1.5 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono text-xs border border-neutral-300 dark:border-neutral-700 rounded transition-all cursor-pointer ${hoverSkillBorder}`}
                    title={`Click to inspect ${skill} proficiency`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Supplementary Creative & Design Row */}
        <div className="mt-6 bg-white dark:bg-neutral-900 p-6 rounded border border-neutral-300 dark:border-neutral-700 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold text-neutral-900 dark:text-white mb-1">
              <span className={`material-symbols-outlined text-[18px] ${textPrimary}`}>palette</span>
              <span>Design, Media &amp; Visual Communication</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Applied experience crafting campus editorial collateral, product mockups, and corporate technical presentations.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            {DESIGN_SKILLS.map((skill) => (
              <button
                key={skill}
                onClick={() => handleSkillClick(skill)}
                className={`px-3 py-1 bg-neutral-50 dark:bg-neutral-800 font-mono text-xs text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 rounded transition-colors cursor-pointer ${hoverSkillBorder}`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Detail Modal */}
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs animate-fadeIn">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg max-w-md w-full p-6 shadow-2xl relative font-mono text-xs">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-4">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase">{selectedSkill.category}</span>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">{selectedSkill.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="p-1 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] p-2 bg-neutral-100 dark:bg-neutral-800 rounded">
                  <span className="text-neutral-500">Proficiency:</span>
                  <span className={`font-bold ${textPrimary}`}>{selectedSkill.proficiency}</span>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block mb-1">Applied Experience Context:</span>
                  <p className="text-neutral-700 dark:text-neutral-300 font-sans text-xs leading-relaxed">
                    {selectedSkill.context}
                  </p>
                </div>

                {selectedSkill.projects && selectedSkill.projects.length > 0 && (
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block mb-1">Demonstrated in:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedSkill.projects.map((proj) => (
                        <span key={proj} className="px-2 py-0.5 bg-neutral-200 dark:bg-neutral-800 rounded text-[10px] text-neutral-800 dark:text-neutral-200">
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSkill.sampleCode && (
                  <div className="p-2.5 bg-[#141518] text-neutral-200 rounded text-[10px] overflow-x-auto border border-neutral-700">
                    <pre>{selectedSkill.sampleCode}</pre>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-4 py-1.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded font-semibold text-xs cursor-pointer"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
