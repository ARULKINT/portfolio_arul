import React, { useState } from 'react';
import { Project, PortfolioTheme } from '../types/portfolio';
import { PROJECTS } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

interface ProjectsSectionProps {
  theme: PortfolioTheme;
  initialFilter?: string;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ theme, initialFilter = 'all' }) => {
  const [activeFilter, setActiveFilter] = useState<string>(initialFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isLight = theme === 'light';

  const textPrimary = isLight ? 'text-[#0040da]' : 'text-sky-400';
  const hoverBorder = isLight ? 'hover:border-[#0040da]' : 'hover:border-sky-500';
  const filterActiveBg = isLight ? 'bg-neutral-900 text-white' : 'bg-sky-600 text-white';

  const filterOptions = [
    { label: 'All (11)', value: 'all' },
    { label: 'Data Engineering', value: 'engineering' },
    { label: 'Data Analytics', value: 'analytics' },
    { label: 'Full-Stack Development', value: 'fullstack' },
    { label: 'Software Applications', value: 'applications' }
  ];

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = activeFilter === 'all' || project.filterCategory === activeFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });



  return (
    <section className="w-full py-12 lg:py-16 border-b transition-colors" id="projects">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-6 gap-4">
          <div>
            <span className={`font-mono text-xs uppercase font-bold tracking-widest ${textPrimary}`}>
              [SEC_03 // ENGINEERING REPOSITORY]
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
              Selected Engineering Work
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1">
              11 projects exploring high-throughput pipelines, analytical engines, operational automation, and full-stack software.
            </p>
          </div>
          <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
            INDEX: 11 ARCHITECTED_BUILDS
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-300 dark:border-neutral-700/80">
          {/* Segmented Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {filterOptions.map((opt) => {
              const isActive = activeFilter === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setActiveFilter(opt.value)}
                  className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider rounded transition-all cursor-pointer ${
                    isActive
                      ? `${filterActiveBg} font-bold shadow-2xs`
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined text-[18px] absolute left-2.5 top-2 text-neutral-400">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack or tech..."
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded pl-8 pr-3 py-1.5 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-sky-500 font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-neutral-400 hover:text-neutral-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* PROJECT LISTING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`bg-white dark:bg-neutral-900 border rounded p-6 flex flex-col justify-between transition-all cursor-pointer ${hoverBorder} shadow-2xs group relative overflow-hidden ${
                project.isPriority
                  ? 'border-indigo-500/50 dark:border-sky-500/50 shadow-xs'
                  : 'border-neutral-300 dark:border-neutral-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-neutral-500 text-xs font-mono mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className={`font-bold ${textPrimary}`}>{project.number} // {project.categoryTag}</span>
                    {project.isPriority && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-sky-950 dark:text-sky-300 border border-indigo-200 dark:border-sky-800 uppercase">
                        TOP PRIORITY
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-[11px] text-neutral-500">[{project.badge}]</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-[#0040da] dark:group-hover:text-sky-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Demo Credentials Pill if available */}
                {project.demoCredentials && (
                  <div className="mb-3 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/80 rounded font-mono text-[11px] text-amber-900 dark:text-amber-200 flex items-center justify-between">
                    <span className="font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">key</span>
                      <span>Demo Login:</span>
                    </span>
                    <span>ID: <strong className="text-amber-950 dark:text-amber-100">{project.demoCredentials.id}</strong> | Pass: <strong className="text-amber-950 dark:text-amber-100">{project.demoCredentials.pass}</strong></span>
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 font-mono text-[11px] text-neutral-600 dark:text-neutral-400 rounded border border-neutral-200 dark:border-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-800 font-mono text-xs">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="text-neutral-700 dark:text-neutral-300 hover:text-[#0040da] dark:hover:text-sky-400 flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">info</span>
                    <span>View Docs &amp; Sandbox</span>
                  </button>

                  {project.demoUrl && project.demoUrl.startsWith('http') ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`flex items-center gap-1 font-semibold hover:underline cursor-pointer ${textPrimary}`}
                    >
                      <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                      <span>Live App ↗</span>
                    </a>
                  ) : (
                    <span className={`flex items-center gap-1 font-semibold ${textPrimary}`}>
                      <span className="material-symbols-outlined text-[15px]">settings_suggest</span>
                      <span>Interactive Sandbox</span>
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Selected Project Interactive Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            theme={theme}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};
