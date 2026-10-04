import React, { useState } from 'react';
import { PortfolioTheme } from '../types/portfolio';

interface SqlSandboxProps {
  theme: PortfolioTheme;
  initialQuery?: string;
}

interface QueryResult {
  columns: string[];
  rows: Record<string, string | number>[];
  executionTimeMs: number;
}

export const SqlSandbox: React.FC<SqlSandboxProps> = ({ theme, initialQuery }) => {
  const defaultQuery = initialQuery || `SELECT shift_id, 
       SUM(scrap_qty) AS total_scrap, 
       SUM(output_qty) AS total_output, 
       ROUND((SUM(scrap_qty)::numeric / NULLIF(SUM(output_qty), 0)) * 100, 2) AS scrap_rate_pct
FROM ops_daily_logs 
WHERE batch_date >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY shift_id 
ORDER BY scrap_rate_pct DESC;`;

  const [query, setQuery] = useState<string>(defaultQuery);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [result, setResult] = useState<QueryResult | null>({
    columns: ['shift_id', 'total_scrap', 'total_output', 'scrap_rate_pct'],
    rows: [
      { shift_id: 'SHIFT_C (Night)', total_scrap: 142, total_output: 2450, scrap_rate_pct: 5.79 },
      { shift_id: 'SHIFT_B (Evening)', total_scrap: 89, total_output: 2680, scrap_rate_pct: 3.32 },
      { shift_id: 'SHIFT_A (Morning)', total_scrap: 64, total_output: 2890, scrap_rate_pct: 2.21 }
    ],
    executionTimeMs: 4.8
  });

  const isRust = theme === 'rust';
  const textPrimary = isRust ? 'text-[#d9480f]' : 'text-[#0040da]';
  const btnRun = isRust ? 'bg-[#d9480f] hover:bg-[#b42902]' : 'bg-[#0040da] hover:bg-[#0036bc]';

  const presets = [
    {
      label: 'Scrap Rate by Shift',
      sql: `SELECT shift_id, 
       SUM(scrap_qty) AS total_scrap, 
       SUM(output_qty) AS total_output, 
       ROUND((SUM(scrap_qty)::numeric / NULLIF(SUM(output_qty), 0)) * 100, 2) AS scrap_rate_pct
FROM ops_daily_logs 
WHERE batch_date >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY shift_id 
ORDER BY scrap_rate_pct DESC;`,
      result: {
        columns: ['shift_id', 'total_scrap', 'total_output', 'scrap_rate_pct'],
        rows: [
          { shift_id: 'SHIFT_C (Night)', total_scrap: 142, total_output: 2450, scrap_rate_pct: 5.79 },
          { shift_id: 'SHIFT_B (Evening)', total_scrap: 89, total_output: 2680, scrap_rate_pct: 3.32 },
          { shift_id: 'SHIFT_A (Morning)', total_scrap: 64, total_output: 2890, scrap_rate_pct: 2.21 }
        ],
        executionTimeMs: 4.8
      }
    },
    {
      label: 'Inventory Shrinkage Audit',
      sql: `SELECT bay_id, 
       part_sku, 
       physical_count, 
       digital_erp_count, 
       (physical_count - digital_erp_count) AS variance_delta
FROM warehouse_cycle_audits
WHERE ABS(physical_count - digital_erp_count) > 0
ORDER BY ABS(variance_delta) DESC
LIMIT 4;`,
      result: {
        columns: ['bay_id', 'part_sku', 'physical_count', 'digital_erp_count', 'variance_delta'],
        rows: [
          { bay_id: 'BAY-12-NORTH', part_sku: 'BEARING-6204-ZZ', physical_count: 480, digital_erp_count: 495, variance_delta: -15 },
          { bay_id: 'BAY-04-EAST', part_sku: 'SEAL-NBR-45X65', physical_count: 125, digital_erp_count: 132, variance_delta: -7 },
          { bay_id: 'BAY-08-SOUTH', part_sku: 'SHAFT-CNC-25MM', physical_count: 62, digital_erp_count: 60, variance_delta: 2 }
        ],
        executionTimeMs: 3.6
      }
    },
    {
      label: 'Machine Downtime Bottlenecks',
      sql: `SELECT station_code, 
       downtime_cause, 
       SUM(downtime_minutes) AS total_lost_mins, 
       COUNT(*) AS incident_occurrences
FROM line_stoppage_telemetry
GROUP BY station_code, downtime_cause
ORDER BY total_lost_mins DESC
LIMIT 3;`,
      result: {
        columns: ['station_code', 'downtime_cause', 'total_lost_mins', 'incident_occurrences'],
        rows: [
          { station_code: 'CNC-MILL-02', downtime_cause: 'Toolhead Calibration Drift', total_lost_mins: 84, incident_occurrences: 4 },
          { station_code: 'CONVEYOR-B', downtime_cause: 'Optical Sensor Misalignment', total_lost_mins: 42, incident_occurrences: 6 },
          { station_code: 'PRESS-HYD-01', downtime_cause: 'Hydraulic Seal Inspection', total_lost_mins: 35, incident_occurrences: 1 }
        ],
        executionTimeMs: 5.2
      }
    }
  ];

  const handleRunQuery = () => {
    setIsRunning(true);
    setTimeout(() => {
      // Find matching preset or generate realistic output
      const matched = presets.find((p) => p.sql.trim() === query.trim());
      if (matched) {
        setResult(matched.result);
      } else {
        setResult({
          columns: ['metric_key', 'recorded_val', 'status_flag', 'timestamp'],
          rows: [
            { metric_key: 'BATCH_THROUGHPUT_P95', recorded_val: 1840, status_flag: 'OPTIMAL', timestamp: '2026-10-04 08:30:12' },
            { metric_key: 'LINE_BALANCE_EFFICIENCY', recorded_val: 94.2, status_flag: 'OPTIMAL', timestamp: '2026-10-04 08:30:12' },
            { metric_key: 'BUFFER_STOCKOUT_RISK', recorded_val: 0.12, status_flag: 'NORMAL', timestamp: '2026-10-04 08:30:12' }
          ],
          executionTimeMs: Number((Math.random() * 4 + 2.5).toFixed(1))
        });
      }
      setIsRunning(false);
    }, 350);
  };

  return (
    <div className="bg-[#141518] rounded border border-neutral-700 text-[#f4f2ec] overflow-hidden font-mono text-xs shadow-xl">
      {/* Console Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-neutral-700/80 px-4 py-2.5 bg-[#0e0f12]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-semibold text-neutral-300">SQL Execution Console // PostgreSQL 16</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-neutral-500">PRESETS:</span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(preset.sql);
                setResult(preset.result);
              }}
              className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 hover:text-white transition-colors cursor-pointer text-[10px]"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Controls */}
      <div className="p-3 bg-[#111215] border-b border-neutral-700/80">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={5}
          spellCheck={false}
          className="w-full bg-[#18191f] text-neutral-200 border border-neutral-700/80 rounded p-2.5 font-mono text-xs focus:outline-none focus:border-sky-500 leading-5"
          placeholder="Enter SQL Query here..."
        />
        <div className="flex items-center justify-between mt-2">
          <div className="text-[11px] text-neutral-400">
            Target: <code className="text-sky-300">ops_production_dw (read_only)</code>
          </div>
          <button
            onClick={handleRunQuery}
            disabled={isRunning}
            className={`px-4 py-1.5 rounded text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${btnRun} disabled:opacity-50`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isRunning ? 'hourglass_top' : 'play_arrow'}
            </span>
            <span>{isRunning ? 'Executing...' : 'Execute Query'}</span>
          </button>
        </div>
      </div>

      {/* Results View */}
      {result && (
        <div className="p-3 bg-[#0d0e11]">
          <div className="flex items-center justify-between text-[11px] text-neutral-400 pb-2 mb-2 border-b border-neutral-800">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">✓ 200 OK</span>
              <span>·</span>
              <span>{result.rows.length} rows returned</span>
            </span>
            <span className="text-neutral-500">Query Latency: <strong className="text-neutral-300">{result.executionTimeMs}ms</strong></span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="border-b border-neutral-700 text-neutral-400 bg-neutral-900/60">
                  {result.columns.map((col) => (
                    <th key={col} className="p-2 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80">
                {result.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-neutral-800/40 text-neutral-200">
                    {result.columns.map((col) => (
                      <td key={col} className="p-2">
                        {String(row[col])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
