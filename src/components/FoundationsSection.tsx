import React, { useState } from 'react';
import { PortfolioTheme } from '../types/portfolio';

interface FoundationsSectionProps {
  theme: PortfolioTheme;
  onFilterToCategory?: (category: 'engineering' | 'analytics' | 'fullstack') => void;
}

export const FoundationsSection: React.FC<FoundationsSectionProps> = ({ theme, onFilterToCategory }) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const isRust = theme === 'rust';
  const isObsidian = theme === 'obsidian';

  const textPrimary = isRust ? 'text-[#d9480f]' : isObsidian ? 'text-sky-400' : 'text-[#0040da]';
  const hoverBorder = isRust ? 'hover:border-[#d9480f]' : isObsidian ? 'hover:border-sky-500' : 'hover:border-[#0040da]';
  const activeBg = isRust ? 'bg-[#ffdad2]/20' : isObsidian ? 'bg-sky-950/30' : 'bg-[#dde1ff]/30';

  const capabilities = [
    {
      index: '01',
      tag: 'PIPELINES',
      title: 'Data Engineering',
      filterKey: 'engineering' as const,
      description: 'Designing reliable extraction, transformation, and load (ETL) workflows. Automated log ingestion, high-throughput batching, data cleansing, schema structuring, and pipeline orchestration.',
      skills: ['PySpark', 'PostgreSQL', 'Airflow', 'Hadoop'],
      highlight: 'Specialized in schema validation, partition key strategy, and resilient dead-letter queue routing.'
    },
    {
      index: '02',
      tag: 'ANALYTICS',
      title: 'Data Analytics',
      filterKey: 'analytics' as const,
      description: 'Extracting actionable intelligence through multi-table relational SQL queries, time-series aggregations, Pandas data wrangling, and structured visual dashboards that answer critical operational questions.',
      skills: ['Complex SQL', 'Pandas', 'Power BI', 'Excel Modeling'],
      highlight: 'Experienced in physical-to-digital inventory variance reconciliation and shop-floor scrap rate tracking.'
    },
    {
      index: '03',
      tag: 'SYSTEMS',
      title: 'Full-Stack Development',
      filterKey: 'fullstack' as const,
      description: 'Building end-to-end web applications with modular server-side APIs, database integration, responsive user interfaces, and decoupled microservices structured for durability and clarity.',
      skills: ['Node.js', 'React / Next.js', 'REST APIs', 'Docker'],
      highlight: 'Engineered cross-platform factory portal with role-based sign-offs and zero-downtime containerized deploys.'
    }
  ];

  return (
    <section className="w-full py-12 lg:py-16 border-b transition-colors bg-neutral-100/60 dark:bg-neutral-900/40" id="about">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Index & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3 border-b border-neutral-300 dark:border-neutral-700/80 pb-4">
          <div>
            <span className={`font-mono text-xs uppercase font-bold tracking-widest ${textPrimary}`}>
              [SEC_02 // FOUNDATIONS]
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
              An Engineer With a Practical Perspective.
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">
            OPERATIONAL ROOTS × COMPUTATIONAL SCALE
          </p>
        </div>

        {/* Narrative Text & Core Objective Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
          <div className="lg:col-span-8 space-y-4">
            <p className="text-base sm:text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed">
              My engineering trajectory balances concrete shop-floor industrial experience with rigorous Computer Science disciplines. Having directly managed physical inventory, dispatched batch workflows, and tracked real-world manufacturing metrics at Asara Pvt Ltd, I recognize that software and data architecture do not exist in a vacuum—they exist to eliminate systemic bottlenecks.
            </p>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              I approach technical problems with an operational first-principle mindset: verifying ingestion reliability, validating transactional integrity, optimizing query latency, and delivering clean, intuitive client surfaces that stakeholders can actually rely on under pressure.
            </p>
          </div>

          <div className="lg:col-span-4 bg-white dark:bg-neutral-900 p-5 rounded border border-neutral-300 dark:border-neutral-700 shadow-2xs">
            <div className={`font-mono text-xs uppercase font-bold mb-2 ${textPrimary}`}>
              // CORE OBJECTIVE
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Targeting Entry-Level Data Engineering and Full-Stack Software roles where architectural discipline, rapid adaptability, and hands-on pipeline implementation drive tangible business outcomes.
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between font-mono text-xs text-neutral-900 dark:text-white">
              <span className="text-neutral-500 uppercase tracking-wider">READY STATE</span>
              <span className={`font-bold ${textPrimary}`}>PRODUCTION_ACTIVE</span>
            </div>
          </div>
        </div>

        {/* 3 Distinct Core Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap, index) => {
            const isSelected = activeCard === index;
            return (
              <div
                key={cap.index}
                onClick={() => setActiveCard(isSelected ? null : index)}
                className={`bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 p-6 rounded transition-all duration-200 flex flex-col justify-between cursor-pointer ${hoverBorder} ${
                  isSelected ? `ring-2 ring-offset-1 ${isRust ? 'ring-[#d9480f]' : 'ring-[#0040da]'} ${activeBg}` : 'shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-neutral-900 dark:text-white">
                      {cap.index}
                    </span>
                    <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-[11px] font-semibold uppercase rounded border border-neutral-200 dark:border-neutral-700">
                      {cap.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                    {cap.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    {cap.description}
                  </p>

                  {/* Expandable Highlight Insight */}
                  {isSelected && (
                    <div className="mb-4 p-3 bg-neutral-100 dark:bg-neutral-800/80 rounded text-xs border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 animate-fadeIn">
                      <p className="font-semibold mb-1">Key Operational Focus:</p>
                      <p>{cap.highlight}</p>
                    </div>
                  )}
                </div>

                <div>
                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 font-mono text-xs flex flex-wrap gap-1.5 mb-3">
                    {cap.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-neutral-50 dark:bg-neutral-800/60 px-2 py-0.5 rounded text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 text-[11px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {onFilterToCategory && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onFilterToCategory(cap.filterKey);
                        const projectsSection = document.getElementById('projects');
                        if (projectsSection) {
                          projectsSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className={`text-xs font-mono font-semibold flex items-center gap-1 hover:underline ${textPrimary}`}
                    >
                      <span>View {cap.title} projects</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
