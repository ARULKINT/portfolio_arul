import React, { useState, useEffect } from 'react';
import { PortfolioTheme, TelemetryNode } from '../types/portfolio';
import { TELEMETRY_NODES } from '../data/portfolioData';

interface TelemetryDiagramProps {
  theme: PortfolioTheme;
  onSelectNode?: (node: TelemetryNode) => void;
}

export const TelemetryDiagram: React.FC<TelemetryDiagramProps> = ({ theme, onSelectNode }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('engine_core');
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [packetCount, setPacketCount] = useState<number>(482910);
  const [latency, setLatency] = useState<number>(128);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  // Live simulation ticker for batch metrics
  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setPacketCount((prev) => prev + Math.floor(Math.random() * 45 * speedMultiplier));
      setLatency(115 + Math.floor(Math.sin(Date.now() / 2000) * 18));
    }, 400);

    return () => clearInterval(interval);
  }, [isStreaming, speedMultiplier]);

  const selectedNode = TELEMETRY_NODES.find((n) => n.id === selectedNodeId) || TELEMETRY_NODES[2];

  const handleNodeClick = (node: TelemetryNode) => {
    setSelectedNodeId(node.id);
    if (onSelectNode) {
      onSelectNode(node);
    }
  };

  const isLight = theme === 'light';
  const primaryStroke = isLight ? '#4F46E5' : '#38BDF8';
  const glowStop1 = isLight ? '#4F46E5' : '#38BDF8';
  const glowStop2 = isLight ? '#818CF8' : '#60A5FA';

  return (
    <div className="relative bg-[#16171a] rounded border border-neutral-700/80 shadow-2xl text-[#f4f2ec] font-mono text-xs overflow-hidden">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between border-b border-neutral-700/70 px-4 py-3 bg-[#111215]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90"></span>
          </div>
          <span className="ml-1 text-[11px] text-neutral-400 tracking-wider font-semibold">
            telemetry_flow.arch.v2
          </span>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            title={isStreaming ? 'Pause streaming simulation' : 'Resume streaming simulation'}
            className="px-2 py-0.5 rounded text-[10px] uppercase font-bold border transition-colors flex items-center gap-1 bg-black/40 border-neutral-600 hover:border-white text-neutral-300"
          >
            <span className="material-symbols-outlined text-[13px]">
              {isStreaming ? 'pause' : 'play_arrow'}
            </span>
            <span>{isStreaming ? 'LIVE' : 'PAUSED'}</span>
          </button>

          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              isStreaming
                ? isLight
                  ? 'text-indigo-700 bg-indigo-50 border-indigo-300'
                  : 'text-[#dde1ff] bg-[#315cf5]/20 border-[#315cf5]/40'
                : 'text-neutral-400 bg-neutral-800 border-neutral-700'
            }`}
          >
            {isStreaming ? 'STATUS: RUNNING' : 'STATUS: IDLE'}
          </span>
        </div>
      </div>

      {/* Interactive SVG Diagram Canvas */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center bg-[#0d0e11] p-2 overflow-hidden select-none">
        <svg className="w-full h-full" viewBox="0 0 540 380" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" />
            </pattern>
            <linearGradient id="stream-flow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={glowStop1} stopOpacity="0.9" />
              <stop offset="100%" stopColor={glowStop2} stopOpacity="0.85" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Technical Grid */}
          <rect width="540" height="380" fill="url(#grid-pattern)" />

          {/* Connecting Flow Paths */}
          {/* Source A -> Engine Core */}
          <path
            d="M 110 80 C 160 80, 160 190, 210 190"
            stroke={primaryStroke}
            strokeWidth="2"
            strokeDasharray={isStreaming ? "4 4" : "none"}
            className={isStreaming ? "opacity-80" : "opacity-40"}
          />
          {/* Source B -> Engine Core */}
          <path
            d="M 110 300 C 160 300, 160 190, 210 190"
            stroke={primaryStroke}
            strokeWidth="2"
            strokeDasharray={isStreaming ? "4 4" : "none"}
            className={isStreaming ? "opacity-80" : "opacity-40"}
          />
          {/* Engine Core -> Storage Warehouse */}
          <path
            d="M 310 190 L 370 190"
            stroke="url(#stream-flow-gradient)"
            strokeWidth="3.5"
            className="opacity-95"
            filter="url(#glow)"
          />
          {/* Storage -> Analytics & Serving Endpoints */}
          <path
            d="M 450 190 C 470 190, 470 100, 480 100"
            stroke={isLight ? '#818CF8' : '#b8c4ff'}
            strokeWidth="1.8"
            strokeDasharray={isStreaming ? '3 3' : 'none'}
            className="opacity-80"
          />
          <path
            d="M 450 190 C 470 190, 470 280, 480 280"
            stroke={isLight ? '#818CF8' : '#b8c4ff'}
            strokeWidth="1.8"
            strokeDasharray={isStreaming ? '3 3' : 'none'}
            className="opacity-80"
          />

          {/* Animated Particles Along the Paths when streaming */}
          {isStreaming && (
            <>
              {/* Particle 1: Source A to Engine */}
              <circle cx="160" cy="135" r="3" fill="#67e8f9">
                <animate attributeName="opacity" dur="1.4s" repeatCount="indefinite" values="0.2;1;0.2" />
              </circle>
              {/* Particle 2: Source B to Engine */}
              <circle cx="160" cy="245" r="3" fill={primaryStroke}>
                <animate attributeName="opacity" dur="1.8s" repeatCount="indefinite" values="0.3;1;0.3" />
              </circle>
              {/* Particle 3: Core to Storage */}
              <circle cx="340" cy="190" r="4" fill={isLight ? '#4F46E5' : '#60a5fa'}>
                <animate attributeName="cx" dur="1.2s" repeatCount="indefinite" values="310;370" />
              </circle>
              {/* Particle 4: Storage to Analytics */}
              <circle cx="465" cy="140" r="2.5" fill="#a7f3d0">
                <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="0.2;1;0.2" />
              </circle>
            </>
          )}

          {/* NODE 1: SOURCE_A Telemetry Logs */}
          <g
            transform="translate(20, 50)"
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => handleNodeClick(TELEMETRY_NODES[0])}
          >
            <rect
              width="90"
              height="60"
              rx="4"
              fill={selectedNodeId === 'source_a' ? '#272b36' : '#1a1c22'}
              stroke={selectedNodeId === 'source_a' ? primaryStroke : 'rgba(255,255,255,0.2)'}
              strokeWidth={selectedNodeId === 'source_a' ? 2 : 1}
            />
            <text x="45" y="24" textAnchor="middle" fill="#9ca3af" fontSize="9" fontWeight="600">
              SOURCE_A
            </text>
            <text x="45" y="42" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="500">
              Telemetry Logs
            </text>
            <circle cx="12" cy="14" r="3" fill="#22c55e" />
          </g>

          {/* NODE 2: SOURCE_B Relational Inventory DB */}
          <g
            transform="translate(20, 270)"
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => handleNodeClick(TELEMETRY_NODES[1])}
          >
            <rect
              width="90"
              height="60"
              rx="4"
              fill={selectedNodeId === 'source_b' ? '#272b36' : '#1a1c22'}
              stroke={selectedNodeId === 'source_b' ? primaryStroke : 'rgba(255,255,255,0.2)'}
              strokeWidth={selectedNodeId === 'source_b' ? 2 : 1}
            />
            <text x="45" y="24" textAnchor="middle" fill="#9ca3af" fontSize="9" fontWeight="600">
              SOURCE_B
            </text>
            <text x="45" y="42" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="500">
              Ops DB / ERP
            </text>
            <circle cx="12" cy="14" r="3" fill="#3b82f6" />
          </g>

          {/* NODE 3: ENGINE_CORE Kafka + Spark */}
          <g
            transform="translate(210, 145)"
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => handleNodeClick(TELEMETRY_NODES[2])}
          >
            <rect
              width="100"
              height="90"
              rx="6"
              fill={selectedNodeId === 'engine_core' ? '#1f2538' : '#161922'}
              stroke={primaryStroke}
              strokeWidth={selectedNodeId === 'engine_core' ? 2.5 : 1.5}
            />
            <text x="50" y="26" textAnchor="middle" fill={isLight ? '#818CF8' : '#93c5fd'} fontSize="9" fontWeight="700">
              ENGINE_CORE
            </text>
            <text x="50" y="46" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">
              Kafka + Spark
            </text>
            <text x="50" y="64" textAnchor="middle" fill="#9ca3af" fontSize="9">
              ETL Transformations
            </text>
            <rect x="15" y="73" width="70" height="3" rx="1.5" fill={primaryStroke} opacity="0.8" />
          </g>

          {/* NODE 4: STORAGE PostgreSQL */}
          <g
            transform="translate(370, 155)"
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => handleNodeClick(TELEMETRY_NODES[3])}
          >
            <rect
              width="80"
              height="70"
              rx="4"
              fill={selectedNodeId === 'storage' ? '#272b36' : '#1a1c22'}
              stroke={selectedNodeId === 'storage' ? primaryStroke : 'rgba(255,255,255,0.2)'}
              strokeWidth={selectedNodeId === 'storage' ? 2 : 1}
            />
            <text x="40" y="25" textAnchor="middle" fill="#9ca3af" fontSize="9" fontWeight="600">
              STORAGE
            </text>
            <text x="40" y="45" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="600">
              PostgreSQL
            </text>
            <text x="40" y="60" textAnchor="middle" fill={isLight ? '#a5b4fc' : '#60a5fa'} fontSize="8">
              Star Schema
            </text>
          </g>

          {/* NODE 5: CONSUMER Power BI */}
          <g
            transform="translate(480, 75)"
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => handleNodeClick(TELEMETRY_NODES[4])}
          >
            <rect
              width="50"
              height="50"
              rx="3"
              fill={selectedNodeId === 'analytics' ? '#272b36' : '#14161b'}
              stroke={selectedNodeId === 'analytics' ? primaryStroke : 'rgba(255,255,255,0.15)'}
              strokeWidth={selectedNodeId === 'analytics' ? 2 : 1}
            />
            <text x="25" y="24" textAnchor="middle" fill={isLight ? '#a5b4fc' : '#b8c4ff'} fontSize="8" fontWeight="600">
              ANALYTICS
            </text>
            <text x="25" y="38" textAnchor="middle" fill="#ffffff" fontSize="8">
              Power BI
            </text>
          </g>

          {/* NODE 6: SERVING REST APIs */}
          <g
            transform="translate(480, 255)"
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => handleNodeClick(TELEMETRY_NODES[5])}
          >
            <rect
              width="50"
              height="50"
              rx="3"
              fill={selectedNodeId === 'serving' ? '#272b36' : '#14161b'}
              stroke={selectedNodeId === 'serving' ? primaryStroke : 'rgba(255,255,255,0.15)'}
              strokeWidth={selectedNodeId === 'serving' ? 2 : 1}
            />
            <text x="25" y="24" textAnchor="middle" fill={isLight ? '#a5b4fc' : '#b8c4ff'} fontSize="8" fontWeight="600">
              SERVING
            </text>
            <text x="25" y="38" textAnchor="middle" fill="#ffffff" fontSize="8">
              REST APIs
            </text>
          </g>
        </svg>

        {/* Floating Instruction Overlay */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs px-2 py-1 rounded text-[10px] text-neutral-400 border border-white/10 hidden sm:block">
          Click any node to inspect telemetry
        </div>
      </div>

      {/* Selected Node Inspector Drawer */}
      <div className="px-4 py-2.5 bg-[#121316] border-t border-neutral-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
          <span className="font-bold text-white text-[11px]">{selectedNode.label}</span>
          <span className="text-neutral-500">/</span>
          <span className="text-neutral-300 text-[11px] truncate max-w-[240px] sm:max-w-xs">
            {selectedNode.sublabel} ({selectedNode.throughput})
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-neutral-400">
          <span>Latency: <strong className="text-emerald-400">{selectedNode.latency}</strong></span>
          <span className="text-neutral-600">|</span>
          <button
            onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 5 : 1))}
            className="hover:text-white underline cursor-pointer"
            title="Toggle batch speed multiplier"
          >
            Rate: {speedMultiplier}x
          </button>
        </div>
      </div>

      {/* Terminal Telemetry Log Footer */}
      <div className="px-4 py-2.5 border-t border-neutral-800 bg-[#0e0f12] flex flex-wrap items-center justify-between text-[11px] text-neutral-400 gap-2">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isStreaming ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-500'}`}></span>
          <span>Batch latency: &lt;{latency}ms</span>
          <span className="text-neutral-600 mx-1">·</span>
          <span>Total Packets: {packetCount.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Partition: date=2024-Q2</span>
          <span>Integrity: 99.98%</span>
        </div>
      </div>
    </div>
  );
};
