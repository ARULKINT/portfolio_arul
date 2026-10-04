import React, { useState } from 'react';
import { Project, PortfolioTheme } from '../types/portfolio';
import { SqlSandbox } from './SqlSandbox';

interface ProjectModalProps {
  project: Project;
  theme: PortfolioTheme;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, theme, onClose }) => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'code' | 'architecture'>('interactive');
  const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const isRust = theme === 'rust';
  const textPrimary = isRust ? 'text-[#d9480f]' : 'text-[#0040da]';
  const activeTabClass = isRust ? 'border-[#d9480f] text-[#d9480f]' : 'border-[#0040da] text-[#0040da]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/90">
          <div className="flex items-center gap-3">
            <span className={`font-mono text-sm font-bold ${textPrimary}`}>
              {project.number} // {project.categoryTag}
            </span>
            <span className="h-4 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
            <span className="font-mono text-xs text-neutral-500 uppercase">
              {project.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Title & Headline */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              {project.title}
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-neutral-100/70 dark:bg-neutral-800/60 rounded border border-neutral-200 dark:border-neutral-700">
            <div>
              <p className="font-mono text-[10px] text-neutral-500 uppercase">Problem Solved</p>
              <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200 mt-0.5">{project.problem}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-neutral-500 uppercase">Architecture Implemented</p>
              <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200 mt-0.5">{project.architecture}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-neutral-500 uppercase">Measured Impact</p>
              <p className={`font-mono text-sm font-bold mt-0.5 ${textPrimary}`}>{project.metric}</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-4 border-b border-neutral-200 dark:border-neutral-800 font-mono text-xs">
            <button
              onClick={() => setActiveTab('interactive')}
              className={`pb-2 font-semibold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                activeTab === 'interactive' ? activeTabClass : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Live Interactive Sandbox
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`pb-2 font-semibold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                activeTab === 'code' ? activeTabClass : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Source Blueprint / Code
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`pb-2 font-semibold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                activeTab === 'architecture' ? activeTabClass : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              System Specifications
            </button>
          </div>

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
          <div className="flex items-center gap-4 font-mono text-xs">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 hover:text-[#0040da] font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">code</span>
              <span>Inspect GitHub Repository</span>
            </a>
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
