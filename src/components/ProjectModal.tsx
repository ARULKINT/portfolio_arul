import React, { useState } from 'react';
import { Project, PortfolioTheme } from '../types/portfolio';
import { SqlSandbox } from './SqlSandbox';

interface ProjectModalProps {
  project: Project;
  theme: PortfolioTheme;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, theme, onClose }) => {
  const [activeTab, setActiveTab] = useState<'readme' | 'interactive' | 'code' | 'architecture'>('readme');
  const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const isLight = theme === 'light';
  const textPrimary = isLight ? 'text-indigo-600 font-bold' : 'text-sky-400';
  const activeTabClass = isLight ? 'border-indigo-600 text-indigo-600 font-bold' : 'border-sky-400 text-sky-400';

  const docsFolderUrl = project.docsUrl || `${project.githubUrl}/tree/main/docs`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/90">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className={`font-mono text-sm font-bold shrink-0 ${textPrimary}`}>
              {project.number} // {project.categoryTag}
            </span>
            <span className="h-4 w-[1px] bg-neutral-300 dark:bg-neutral-700 shrink-0"></span>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white truncate">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onClose}
              className="p-1 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {project.demoCredentials && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700/80 rounded font-mono text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">key</span>
                <span>Live App Demo Credentials:</span>
              </span>
              <span>ID: <strong className="text-amber-950 dark:text-amber-100 font-bold">{project.demoCredentials.id}</strong> | Password: <strong className="text-amber-950 dark:text-amber-100 font-bold">{project.demoCredentials.pass}</strong></span>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-4 border-b border-neutral-200 dark:border-neutral-800 font-mono text-xs">
            <button
              onClick={() => setActiveTab('readme')}
              className={`pb-2 font-semibold uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'readme' ? activeTabClass : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span>README &amp; Docs</span>
            </button>
            <button
              onClick={() => setActiveTab('interactive')}
              className={`pb-2 font-semibold uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'interactive' ? activeTabClass : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              <span>Interactive Sandbox</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`pb-2 font-semibold uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'code' ? activeTabClass : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">code</span>
              <span>Source Blueprint</span>
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`pb-2 font-semibold uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'architecture' ? activeTabClass : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">schema</span>
              <span>System Specs</span>
            </button>
          </div>

          {/* Tab 0: README & Docs Viewer */}
          {activeTab === 'readme' && (
            <div className="space-y-5">
              {/* Primary GitHub Docs Redirect Banner */}
              <div className="p-4 bg-indigo-50/80 dark:bg-sky-950/40 border border-indigo-200 dark:border-sky-800/80 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-600 dark:bg-sky-500 text-white rounded-md shrink-0">
                    <span className="material-symbols-outlined text-[24px]">folder_open</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                      Repository SDLC Documentation Folder (/docs)
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300">
                      View full SDLC artifacts, architecture diagrams, SRS requirements &amp; technical specs.
                    </p>
                  </div>
                </div>
                <a
                  href={docsFolderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white font-mono text-xs font-bold rounded flex items-center gap-2 transition-colors shrink-0 shadow-xs cursor-pointer"
                >
                  <span>Open Repo /docs Folder</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </a>
              </div>

              {/* Styled README Container */}
              <div className="bg-neutral-900 text-neutral-100 rounded-lg border border-neutral-800 overflow-hidden shadow-lg font-mono text-xs">
                {/* README Header Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-950 border-b border-neutral-800 text-neutral-400">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="material-symbols-outlined text-[18px] text-sky-400 shrink-0">description</span>
                    <span className="font-bold text-neutral-200 shrink-0">README.md</span>
                    <span className="text-[11px] text-neutral-500 truncate">// {project.githubUrl.replace('https://github.com/', '')}</span>
                  </div>
                  <a
                    href={`${project.githubUrl}#readme`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-sky-400 hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>View raw on GitHub</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                  </a>
                </div>

                {/* README Content Body */}
                <div className="p-5 sm:p-6 space-y-5 text-neutral-200 font-sans leading-relaxed">
                  <div className="border-b border-neutral-800 pb-4">
                    <h1 className="text-lg sm:text-xl font-bold text-white font-mono mb-2">
                      # {project.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-400">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-2 font-mono text-xs">
                    <h2 className="text-xs sm:text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                      <span>## 🎯 Executive Overview &amp; Problem Statement</span>
                    </h2>
                    <div className="p-3.5 bg-neutral-950/80 rounded border border-neutral-800 text-neutral-300 leading-relaxed font-sans text-xs">
                      {project.problem}
                    </div>
                  </div>

                  <div className="space-y-2 font-mono text-xs">
                    <h2 className="text-xs sm:text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                      <span>## 🏗️ System Architecture &amp; Tech Stack</span>
                    </h2>
                    <div className="p-3.5 bg-neutral-950/80 rounded border border-neutral-800 text-neutral-300 leading-relaxed font-sans text-xs space-y-2">
                      <p><strong className="text-white font-mono">Architecture:</strong> {project.architecture}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[11px]">
                        {project.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-neutral-800 text-sky-300 rounded border border-neutral-700">
                            `{t}`
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {project.deepDive?.overview && (
                    <div className="space-y-2 font-mono text-xs">
                      <h2 className="text-xs sm:text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                        <span>## 💡 Key Architectural Implementation</span>
                      </h2>
                      <div className="p-3.5 bg-neutral-950/80 rounded border border-neutral-800 text-neutral-300 leading-relaxed font-sans text-xs space-y-2">
                        <p>{project.deepDive.overview}</p>
                        {project.deepDive.keyDecisions && project.deepDive.keyDecisions.length > 0 && (
                          <ul className="list-disc pl-5 space-y-1 text-neutral-400 pt-1">
                            {project.deepDive.keyDecisions.map((dec, idx) => (
                              <li key={idx}>{dec}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 font-mono text-xs">
                    <h2 className="text-xs sm:text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                      <span>## 📊 Target Impact &amp; Results</span>
                    </h2>
                    <div className="p-3 bg-neutral-950/80 rounded border border-neutral-800 font-mono text-xs text-emerald-400 flex items-center justify-between">
                      <span>Primary Metric Result:</span>
                      <strong className="text-sm text-white font-bold">{project.metric}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 1: Interactive Sandbox */}
          {activeTab === 'interactive' && (
            <div className="space-y-4">
              {project.deepDive?.interactiveType === 'sql-runner' ? (
                <div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2 font-mono">
                    // Live PostgreSQL Query Execution against replicated manufacturing logs:
                  </p>
                  <SqlSandbox theme={theme} initialQuery={project.metricsPanel?.sqlQuery} />
                </div>
              ) : project.deepDive?.interactiveType === 'spark-stream' ? (
                <div className="bg-[#141518] p-5 rounded border border-neutral-700 font-mono text-xs text-[#f4f2ec] space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-700 pb-2">
                    <span className="text-neutral-300 font-bold">PySpark Micro-Batch Ingestion Simulator</span>
                    <span className="text-emerald-400">ACTIVE [3,200 evt/s]</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
                    <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
                      <span className="text-neutral-500 block">Partition Key</span>
                      <span className="text-white font-bold">date=2024-Q2/h=14</span>
                    </div>
                    <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
                      <span className="text-neutral-500 block">Watermark Delay</span>
                      <span className="text-white font-bold">10 minutes max</span>
                    </div>
                    <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
                      <span className="text-neutral-500 block">Corrupt Packets</span>
                      <span className="text-emerald-400 font-bold">0 dropped (DLQ)</span>
                    </div>
                    <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
                      <span className="text-neutral-500 block">Compression</span>
                      <span className="text-white font-bold">Snappy / Parquet</span>
                    </div>
                  </div>
                  <div className="bg-black/50 p-3 rounded text-[11px] leading-5 text-neutral-300">
                    <span className="text-neutral-500">// Batch execution log:</span>
                    <br />2026-10-04 08:32:01 INFO StreamExecution: Committed batch 1498 (4,120 rows) in 48ms
                    <br />2026-10-04 08:32:02 INFO MicroBatchExecution: Parquet slice written to /lake/partitioned_telemetry/
                    <br />2026-10-04 08:32:03 INFO IngestionCoordinator: Schema invariant checks: 100% PASS
                  </div>
                </div>
              ) : project.deepDive?.interactiveType === 'airflow-dag' ? (
                <div className="bg-[#141518] p-5 rounded border border-neutral-700 font-mono text-xs text-[#f4f2ec] space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-700 pb-2">
                    <span className="text-neutral-300 font-bold">Airflow DAG: ops_warehouse_staging_daily</span>
                    <span className="text-emerald-400">STATE: SUCCESS</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-2 py-2">
                    <div className="p-2 bg-emerald-950/70 border border-emerald-600 rounded text-center flex-1 w-full">
                      <span className="block text-[10px] text-emerald-300 font-bold">TASK 01</span>
                      <span className="text-xs text-white">extract_erp_cdc</span>
                    </div>
                    <span className="text-neutral-500 font-bold">→</span>
                    <div className="p-2 bg-emerald-950/70 border border-emerald-600 rounded text-center flex-1 w-full">
                      <span className="block text-[10px] text-emerald-300 font-bold">TASK 02</span>
                      <span className="text-xs text-white">validate_invariants</span>
                    </div>
                    <span className="text-neutral-500 font-bold">→</span>
                    <div className="p-2 bg-emerald-950/70 border border-emerald-600 rounded text-center flex-1 w-full">
                      <span className="block text-[10px] text-emerald-300 font-bold">TASK 03</span>
                      <span className="text-xs text-white">scd2_dimension_upsert</span>
                    </div>
                  </div>
                </div>
              ) : project.deepDive?.interactiveType === 'api-request' ? (
                <div className="bg-[#141518] p-5 rounded border border-neutral-700 font-mono text-xs text-[#f4f2ec] space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-700 pb-2">
                    <span className="text-neutral-300 font-bold">REST API Endpoint Inspector</span>
                    <button
                      onClick={() => {
                        setApiStatus('loading');
                        setTimeout(() => setApiStatus('success'), 400);
                      }}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold cursor-pointer"
                    >
                      {apiStatus === 'loading' ? 'Testing Endpoint...' : 'Send Test GET Request'}
                    </button>
                  </div>
                  <div className="bg-black/60 p-2.5 rounded text-sky-300 text-[11px]">
                    GET /api/v1/telemetry/shifts/summary?range=7d&amp;station=ALL HTTP/1.1
                    <br />Authorization: Bearer jwt_operational_token_v2
                  </div>
                  {apiStatus === 'success' && (
                    <div className="bg-neutral-900 p-3 rounded text-[11px] text-emerald-300 border border-emerald-800 leading-5 animate-fadeIn">
                      <span className="text-neutral-400">// Response 200 OK (Cache-Hit: true, Duration: 8.2ms):</span>
                      <br />&#123;
                      <br />&nbsp;&nbsp;"status": "success",
                      <br />&nbsp;&nbsp;"shift_throughput_avg": 2673,
                      <br />&nbsp;&nbsp;"discrepancy_variance": "0.42%",
                      <br />&nbsp;&nbsp;"active_nodes": 12
                      <br />&#125;
                    </div>
                  )}
                </div>
              ) : (
                /* GPS Telemetry Dashboard view for project 10 */
                <div className="bg-[#141518] p-5 rounded border border-neutral-700 font-mono text-xs text-[#f4f2ec] space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-700 pb-2">
                    <span className="text-neutral-300 font-bold">Fleet Telemetry Coordinate Grid</span>
                    <span className="text-emerald-400">4 Active Convoys Synced</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 bg-neutral-900 border border-neutral-800 rounded">
                      <div className="flex justify-between items-center text-white font-bold">
                        <span>CONVOY-TN-04</span>
                        <span className="text-emerald-400">IN TRANSIT</span>
                      </div>
                      <p className="text-neutral-400 mt-1">Chennai Hub → Bangalore Plant</p>
                      <p className="text-neutral-500 text-[10px]">Lat: 12.9716° N, Lon: 77.5946° E · Speed: 62 km/h</p>
                    </div>
                    <div className="p-2.5 bg-neutral-900 border border-neutral-800 rounded">
                      <div className="flex justify-between items-center text-white font-bold">
                        <span>CONVOY-TN-09</span>
                        <span className="text-sky-400">UNLOADING</span>
                      </div>
                      <p className="text-neutral-400 mt-1">Pondicherry Depot → Chennai Port</p>
                      <p className="text-neutral-500 text-[10px]">Lat: 13.0827° N, Lon: 80.2707° E · Status: Bay Docked</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Source Blueprint / Code Snippet */}
          {activeTab === 'code' && (
            <div className="bg-[#16171a] p-4 rounded text-neutral-100 font-mono text-xs border border-neutral-700 shadow-inner overflow-x-auto">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-700 text-neutral-400 text-[11px]">
                <span>{project.codeSnippet?.filename || 'system_pipeline.py'}</span>
                <span className={textPrimary}>{project.codeSnippet?.runtime || 'PRODUCTION_RUN'}</span>
              </div>
              <pre className="leading-5 text-neutral-200">
                {project.codeSnippet?.code || `# Implementation details for ${project.title}
# Core Architecture: ${project.architecture}
# Primary Metric Target: ${project.metric}

def execute_pipeline():
    print("Initiating automated pipeline execution...")
    # Schema validation and transformation
    return {"status": "SUCCESS", "metric": "${project.metric}"}`}
              </pre>
            </div>
          )}

          {/* Tab 3: System Specifications & Decisions */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded border border-neutral-200 dark:border-neutral-700">
                <h4 className="font-bold text-sm text-neutral-900 dark:text-white mb-2">
                  Architectural Summary
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {project.deepDive?.overview}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-800 dark:text-neutral-200 font-mono mb-2">
                  Engineering Decisions &amp; Trade-offs
                </h4>
                <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
                  {project.deepDive?.keyDecisions.map((decision, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className={`material-symbols-outlined text-[16px] shrink-0 mt-0.5 ${textPrimary}`}>
                        check_circle
                      </span>
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-xs rounded border border-neutral-300 dark:border-neutral-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 hover:text-[#0040da] font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">code</span>
              <span>Inspect GitHub</span>
            </a>

            <span className="text-neutral-300 dark:text-neutral-700">|</span>

            <a
              href={docsFolderUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-sky-400 hover:underline font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">folder</span>
              <span>Browse /docs Folder ↗</span>
            </a>

            {project.demoUrl && project.demoUrl.startsWith('http') && (
              <>
                <span className="text-neutral-300 dark:text-neutral-700">|</span>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold transition-colors shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  <span>Launch Live App ↗</span>
                </a>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded font-mono text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
