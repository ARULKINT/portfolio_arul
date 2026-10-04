export type PortfolioTheme = 'cobalt' | 'rust' | 'obsidian';

export interface Project {
  id: string;
  number: string;
  categoryTag: string; // e.g., 'DATA_ENGINEERING', 'DATA_ANALYTICS', 'FULL_STACK', 'AUTOMATION', 'SOFTWARE_APPS'
  filterCategory: 'engineering' | 'analytics' | 'fullstack' | 'automation' | 'applications';
  badge: string; // e.g. 'Featured Pipeline', 'Operational Intelligence', 'AIRFLOW_JOB'
  status: string; // e.g. 'STATUS: DEPLOYED_CONTAINER'
  title: string;
  description: string;
  problem: string;
  architecture: string;
  metric: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  codeSnippet?: {
    filename: string;
    runtime: string;
    code: string;
  };
  metricsPanel?: {
    title: string;
    statusLabel: string;
    submetricLabel: string;
    value: string;
    subvalue: string;
    badge: string;
    sqlQuery: string;
  };
  deepDive?: {
    overview: string;
    keyDecisions: string[];
    schemaDiagram?: string;
    interactiveType: 'spark-stream' | 'sql-runner' | 'airflow-dag' | 'api-request' | 'gps-telemetry';
  };
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface SkillDetail {
  name: string;
  category: string;
  proficiency: 'Production Ready' | 'Advanced' | 'Competent';
  projects: string[];
  context: string;
  sampleCode?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  bullets: string[];
  competencies: string[];
  shiftMetrics: { label: string; value: string }[];
}

export interface AcademicItem {
  degreeType: string;
  status: 'In Progress' | 'Completed';
  title: string;
  institution: string;
  description: string;
  coursework: string[];
  period: string;
}

export interface LeadershipItem {
  title: string;
  icon: string;
  summary: string;
  domain: string;
  highlightTag?: string;
  fullNarrative?: string;
}

export interface TelemetryNode {
  id: string;
  label: string;
  sublabel: string;
  status: 'active' | 'synced' | 'streaming';
  throughput: string;
  latency: string;
  details: string;
  type: 'source' | 'processing' | 'storage' | 'consumer';
}
