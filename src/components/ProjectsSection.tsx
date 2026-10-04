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
    { label: 'All (10)', value: 'all' },
    { label: 'Data Engineering', value: 'engineering' },
    { label: 'Data Analytics', value: 'analytics' },
    { label: 'Full-Stack Development', value: 'fullstack' },
    { label: 'Automation', value: 'automation' },
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

  const featured01 = filteredProjects.find((p) => p.id === '01');
  const featured02 = filteredProjects.find((p) => p.id === '02');
  const gridProjects = filteredProjects.filter((p) => p.id !== '01' && p.id !== '02');

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
              10 projects exploring high-throughput pipelines, analytical engines, operational automation, and full-stack software.
            </p>
          </div>
          <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
            INDEX: 10 ARCHITECTED_BUILDS
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

        {/* PROJECT LISTING */}
        <div className="space-y-8">
          {/* FEATURED PROJECT 01: Enterprise Telemetry & ETL Pipeline */}
          {featured01 && (
            <article className={`bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded p-6 lg:p-8 transition-all ${hoverBorder} shadow-2xs`}>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-bold ${textPrimary}`}>
                    01 // DATA_ENGINEERING
                  </span>
                  <span className="h-3 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
                  <span className={`font-mono text-[11px] px-2 py-0.5 rounded uppercase font-semibold border ${
                    isLight
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                      : 'bg-sky-950/80 text-sky-300 border-sky-700'
                  }`}>
                    Featured Pipeline
                  </span>
                </div>
                <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                  STATUS: DEPLOYED_CONTAINER
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                      {featured01.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                      {featured01.description}
                    </p>

                    {/* Technical Specification Breakdown */}
                    <div className="space-y-3 bg-neutral-100/70 dark:bg-neutral-800/60 p-4 rounded border border-neutral-200 dark:border-neutral-700 mb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">Problem</p>
                          <p className="text-xs text-neutral-900 dark:text-neutral-200 font-medium mt-0.5">{featured01.problem}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">Architecture</p>
                          <p className="text-xs text-neutral-900 dark:text-neutral-200 font-medium mt-0.5">{featured01.architecture}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">Key Metric</p>
                          <p className={`font-mono text-xs font-bold mt-0.5 ${textPrimary}`}>{featured01.metric}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Badges & Action Links */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex flex-wrap gap-2">
                      {featured01.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-mono text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 font-mono text-xs font-semibold">
                      <a
                        href={featured01.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 hover:text-[#0040da] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">code</span>
                        <span>GitHub Repo</span>
                      </a>
                      <span className="text-neutral-400">/</span>
                      {featured01.demoUrl && featured01.demoUrl.startsWith('http') ? (
                        <a
                          href={featured01.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center gap-1.5 hover:underline cursor-pointer ${textPrimary}`}
                        >
                          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                          <span>Live Demo ↗</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => setSelectedProject(featured01)}
                          className={`inline-flex items-center gap-1.5 hover:underline cursor-pointer ${textPrimary}`}
                        >
                          <span className="material-symbols-outlined text-[16px]">settings_suggest</span>
                          <span>Interactive Sandbox</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dark Monolith Terminal Code/Schema Snippet */}
                <div className="lg:col-span-5 bg-[#16171a] rounded p-4 text-[#f4f2ec] font-mono text-xs border border-neutral-700/80 overflow-x-auto shadow-inner">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-700 text-neutral-400 text-[11px]">
                    <span>pipeline_job.py</span>
                    <span className={textPrimary}>SPARK-SESSION [ACTIVE]</span>
                  </div>
                  <pre className="leading-5 text-neutral-200 font-mono text-[11px]">
                    <span className={isLight ? "text-indigo-300" : "text-sky-300"}>from</span> pyspark.sql <span className={isLight ? "text-indigo-300" : "text-sky-300"}>import</span> SparkSession{'\n'}
                    <span className={isLight ? "text-indigo-300" : "text-sky-300"}>from</span> pyspark.sql.functions <span className={isLight ? "text-indigo-300" : "text-sky-300"}>import</span> col, from_json{'\n\n'}
                    spark = SparkSession.builder \{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;.appName(<span className={isLight ? "text-emerald-300" : "text-amber-300"}>"TelemetryIngestPipeline"</span>) \{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;.getOrCreate(){'\n\n'}
                    raw_df = spark.readStream \{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;.format(<span className={isLight ? "text-emerald-300" : "text-amber-300"}>"kafka"</span>) \{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;.option(<span className={isLight ? "text-emerald-300" : "text-amber-300"}>"subscribe"</span>, <span className={isLight ? "text-emerald-300" : "text-amber-300"}>"sensors.telemetry.v1"</span>) \{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;.load(){'\n\n'}
                    clean_df = raw_df \{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;.select(from_json(col(<span className={isLight ? "text-emerald-300" : "text-amber-300"}>"value"</span>).cast(<span className={isLight ? "text-emerald-300" : "text-amber-300"}>"string"</span>), schema).alias(<span className={isLight ? "text-emerald-300" : "text-amber-300"}>"payload"</span>)) \{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;.filter(col(<span className={isLight ? "text-emerald-300" : "text-amber-300"}>"payload.sensor_val"</span>).isNotNull()){'\n\n'}
                    clean_df.writeStream \{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;.partitionBy(<span className={isLight ? "text-emerald-300" : "text-amber-300"}>"batch_date"</span>, <span className={isLight ? "text-emerald-300" : "text-amber-300"}>"node_id"</span>) \{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;.format(<span className={isLight ? "text-emerald-300" : "text-amber-300"}>"parquet"</span>) \{'\n'}
                    &nbsp;&nbsp;&nbsp;&nbsp;.start(<span className={isLight ? "text-emerald-300" : "text-amber-300"}>"/lake/partitioned_telemetry/"</span>)
                  </pre>
                </div>
              </div>
            </article>
          )}

          {/* FEATURED PROJECT 02: Production Operations & Inventory Analytics Engine */}
          {featured02 && (
            <article className={`bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded p-6 lg:p-8 transition-all ${hoverBorder} shadow-2xs`}>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-bold ${textPrimary}`}>
                    02 // DATA_ANALYTICS
                  </span>
                  <span className="h-3 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
                  <span className="font-mono text-[11px] bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 px-2 py-0.5 rounded uppercase font-semibold">
                    Operational Intelligence
                  </span>
                </div>
                <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                  STATUS: PRODUCTION_DASHBOARD
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                      {featured02.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                      {featured02.description}
                    </p>

                    {/* Technical Specification Breakdown */}
                    <div className="space-y-3 bg-neutral-100/70 dark:bg-neutral-800/60 p-4 rounded border border-neutral-200 dark:border-neutral-700 mb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">Problem</p>
                          <p className="text-xs text-neutral-900 dark:text-neutral-200 font-medium mt-0.5">{featured02.problem}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">Solution</p>
                          <p className="text-xs text-neutral-900 dark:text-neutral-200 font-medium mt-0.5">{featured02.architecture}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">Key Metric</p>
                          <p className={`font-mono text-xs font-bold mt-0.5 ${textPrimary}`}>{featured02.metric}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Badges & Action Links */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex flex-wrap gap-2">
                      {featured02.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-mono text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 font-mono text-xs font-semibold">
                      <a
                        href={featured02.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 hover:text-[#0040da] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">code</span>
                        <span>GitHub Repo</span>
                      </a>
                      <span className="text-neutral-400">/</span>
                      <button
                        onClick={() => setSelectedProject(featured02)}
                        className={`inline-flex items-center gap-1.5 hover:underline cursor-pointer ${textPrimary}`}
                      >
                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                        <span>Interactive Sandbox</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Visual Metric & SQL Benchmark Panel */}
                <div className="lg:col-span-5 bg-neutral-100/90 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded p-4 sm:p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-neutral-900 dark:text-white uppercase font-bold">
                      OPS_EFFICIENCY_TELEMETRY
                    </span>
                    <span className={`font-mono text-xs font-bold ${textPrimary}`}>
                      LIVE_RUN
                    </span>
                  </div>

                  {/* Mini Sparkline Chart Component */}
                  <div className="bg-white dark:bg-neutral-900 p-3 rounded border border-neutral-300 dark:border-neutral-700">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <div className="text-[10px] font-mono text-neutral-500 uppercase">Inventory Discrepancy Index</div>
                        <div className="font-mono text-2xl font-bold text-neutral-900 dark:text-white">
                          0.42% <span className="text-xs text-emerald-600 font-normal">(-2.8% audit delta)</span>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] text-neutral-500">BATCH: SHIFT_C</span>
                    </div>
                    <svg className="w-full h-12 stroke-[#0040da] fill-[#0040da]/10 dark:stroke-sky-400 dark:fill-sky-400/10" viewBox="0 0 280 60">
                      <path d="M0,45 Q35,50 70,30 T140,25 T210,15 T280,8 L280,60 L0,60 Z" strokeWidth="2"></path>
                    </svg>
                  </div>

                  {/* SQL Query Snippet View */}
                  <div className="bg-[#16171a] p-3 rounded text-[#f4f2ec] text-[11px] font-mono border border-neutral-700">
                    <span className="text-amber-300">SELECT</span> shift_id, SUM(scrap_qty) / SUM(output_qty) * 100 <span className="text-amber-300">AS</span> scrap_rate
                    <br /><span className="text-amber-300">FROM</span> ops_daily_logs
                    <br /><span className="text-amber-300">GROUP BY</span> shift_id <span className="text-amber-300">ORDER BY</span> scrap_rate <span className="text-amber-300">DESC</span>;
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* DENSE ARCHITECTURAL GRID (PROJECTS 03 - 10) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {gridProjects.map((project) => (
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
                      <span>{project.number} // {project.categoryTag}</span>
                      {project.isPriority && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-sky-950 dark:text-sky-300 border border-indigo-200 dark:border-sky-800 uppercase">
                          TOP PRIORITY
                        </span>
                      )}
                    </span>
                    <span className={`font-semibold ${textPrimary}`}>[{project.badge}]</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-[#0040da] transition-colors">
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
                      className="text-neutral-700 dark:text-neutral-300 hover:text-[#0040da] flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">info</span>
                      <span>Deep Dive</span>
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
                        <span>Sandbox</span>
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
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
