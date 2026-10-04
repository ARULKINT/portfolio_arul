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

  const textPrimary = isLight ? 'text-indigo-600 font-bold' : 'text-sky-400';
  const hoverBorder = isLight
    ? 'hover:border-indigo-500 hover:shadow-indigo-500/10'
    : 'hover:border-sky-400 hover:shadow-sky-400/10';
  const filterActiveBg = isLight ? 'bg-indigo-600 text-white' : 'bg-sky-500 text-white';

  const counts = {
    all: PROJECTS.length,
    engineering: PROJECTS.filter((p) => p.filterCategory === 'engineering').length,
    analytics: PROJECTS.filter((p) => p.filterCategory === 'analytics').length,
    fullstack: PROJECTS.filter((p) => p.filterCategory === 'fullstack').length,
    applications: PROJECTS.filter((p) => p.filterCategory === 'applications').length
  };

  const filterOptions = [
    { label: `All (${counts.all})`, value: 'all' },
    { label: `Data Engineering (${counts.engineering})`, value: 'engineering' },
    { label: `Data Analytics (${counts.analytics})`, value: 'analytics' },
    { label: `Full-Stack Development (${counts.fullstack})`, value: 'fullstack' },
    { label: `Software Applications (${counts.applications})`, value: 'applications' }
  ];

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = activeFilter === 'all' || project.filterCategory === activeFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.architecture.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full py-12 lg:py-16 border-b border-neutral-200 dark:border-neutral-800 transition-colors" id="projects">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`font-mono text-xs uppercase font-bold tracking-widest ${textPrimary}`}>
                [SEC_03 // ENGINEERING REPOSITORY]
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                11 VERIFIED BUILDS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Selected Engineering Work &amp; Project Systems
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1 max-w-3xl leading-relaxed">
              Click any project container to view its full README specs, architecture decisions, and live interactive sandboxes.
            </p>
          </div>
          <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400 shrink-0">
            SHOWING: <strong className="text-neutral-900 dark:text-white font-bold">{filteredProjects.length}</strong> / {PROJECTS.length} REPOSITORIES
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Segmented Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {filterOptions.map((opt) => {
              const isActive = activeFilter === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setActiveFilter(opt.value)}
                  className={`px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                    isActive
                      ? `${filterActiveBg} font-bold shadow-xs`
                      : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined text-[18px] absolute left-3 top-2.5 text-neutral-400">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, tech, or title..."
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-md pl-9 pr-8 py-2 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-indigo-500 dark:focus:border-sky-400 font-mono transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* PROJECT LISTING GRID (2-Column Responsive Layout) */}
        {filteredProjects.length === 0 ? (
          <div className="py-12 text-center bg-neutral-50 dark:bg-neutral-900/40 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <span className="material-symbols-outlined text-4xl text-neutral-400 mb-2">folder_off</span>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-mono">No matching projects found for your query.</p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-mono text-indigo-600 dark:text-sky-400 hover:underline font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer ${hoverBorder} shadow-xs hover:shadow-md group relative overflow-hidden`}
              >
                <div className="space-y-4">
                  {/* Top Bar: Number, Category, Badges */}
                  <div className="flex items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800/80 pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-mono text-sm font-bold ${textPrimary}`}>
                        {project.number}
                      </span>
                      <span className="text-neutral-300 dark:text-neutral-700">//</span>
                      <span className="font-mono text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        {project.categoryTag}
                      </span>
                      {project.isPriority && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-sky-950 dark:text-sky-300 border border-indigo-200 dark:border-sky-800 uppercase tracking-wider">
                          TOP PRIORITY
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 font-medium">
                      {project.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-sky-400 transition-colors flex items-center justify-between gap-2">
                      <span>{project.title}</span>
                      <span className="material-symbols-outlined text-[20px] text-neutral-400 group-hover:text-indigo-600 dark:group-hover:text-sky-400 transition-transform group-hover:translate-x-1 shrink-0">
                        arrow_forward
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Problem & Architecture Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
                    <div className="p-2.5 bg-neutral-50 dark:bg-neutral-800/60 rounded border border-neutral-200/80 dark:border-neutral-800">
                      <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase block font-bold">🎯 Problem</span>
                      <span className="text-[11px] text-neutral-800 dark:text-neutral-200 line-clamp-2 mt-0.5 font-sans leading-tight">
                        {project.problem}
                      </span>
                    </div>
                    <div className="p-2.5 bg-neutral-50 dark:bg-neutral-800/60 rounded border border-neutral-200/80 dark:border-neutral-800">
                      <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase block font-bold">⚙️ Architecture</span>
                      <span className="text-[11px] text-neutral-800 dark:text-neutral-200 line-clamp-2 mt-0.5 font-sans leading-tight">
                        {project.architecture}
                      </span>
                    </div>
                  </div>

                  {/* Demo Credentials Pill (if present) */}
                  {project.demoCredentials && (
                    <div className="px-3 py-1.5 bg-amber-50/90 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700/80 rounded font-mono text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5 text-[11px]">
                        <span className="material-symbols-outlined text-[15px]">key</span>
                        <span>Demo Access:</span>
                      </span>
                      <span className="text-[11px]">ID: <strong className="text-amber-950 dark:text-amber-100 font-bold">{project.demoCredentials.id}</strong> | Pass: <strong className="text-amber-950 dark:text-amber-100 font-bold">{project.demoCredentials.pass}</strong></span>
                    </div>
                  )}
                </div>

                {/* Bottom Section: Tags & Action Bar */}
                <div className="space-y-4 pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 font-mono text-[11px] text-neutral-700 dark:text-neutral-300 rounded border border-neutral-200 dark:border-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between font-mono text-xs pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="px-3 py-1.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded text-[11px] font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span className="material-symbols-outlined text-[15px]">menu_book</span>
                      <span>README &amp; Docs ↗</span>
                    </button>

                    <div className="flex items-center gap-3">
                      {project.demoUrl && project.demoUrl.startsWith('http') && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold flex items-center gap-1 text-[11px]"
                        >
                          <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                          <span>Live App ↗</span>
                        </a>
                      )}
                      <span className={`text-[11px] font-semibold ${textPrimary} flex items-center gap-1`}>
                        <span className="material-symbols-outlined text-[15px]">terminal</span>
                        <span>Sandbox</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

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
