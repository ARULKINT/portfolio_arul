# API Documentation & Interface Contracts

| Document Version | 1.0.0 |
| :--- | :--- |
| **System Context** | Client-Side Interfaces, Props, & Backend Endpoint Specifications |

---

## 1. Overview

This document specifies the internal TypeScript prop interfaces, component data contracts, and external API specifications (such as Google Gemini integration and simulated HTTP dispatch endpoints) used within the application.

---

## 2. Core Domain Data Contracts (`src/types/portfolio.ts`)

### `Project` Interface
Represents an engineering dossier item displayed in `ProjectsSection.tsx` and `ProjectModal.tsx`.

```typescript
export interface Project {
  id: string;                                // Unique identifier (e.g. 'manufacturing-scrap-dw')
  number: string;                            // Display index (e.g. '01')
  categoryTag: string;                       // Domain label (e.g. 'DATA_ENGINEERING')
  filterCategory: 'engineering' | 'analytics' | 'fullstack' | 'automation' | 'applications';
  badge: string;                             // Status pill text (e.g. 'Featured Pipeline')
  status: string;                            // Deployment status text
  title: string;                             // Project headline
  description: string;                       // Short summary
  problem: string;                           // Detailed problem description
  architecture: string;                      // Architectural solution text
  metric: string;                            // Key performance indicator text
  tags: string[];                            // Tech stack badges (e.g. ['PySpark', 'Airflow', 'PostgreSQL'])
  githubUrl: string;                         // Source code repository URL
  demoUrl?: string;                          // Live application link
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
```

### `TelemetryNode` Interface
Represents a node in the interactive pipeline DAG graph (`TelemetryDiagram.tsx`).

```typescript
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
```

---

## 3. Component Prop Contracts

### `SqlSandbox` Component Props
```typescript
interface SqlSandboxProps {
  theme: 'cobalt' | 'rust' | 'obsidian';
  initialQuery?: string;
}
```

### `Header` Component Props
```typescript
interface HeaderProps {
  currentTheme: PortfolioTheme;
  onThemeChange: (theme: PortfolioTheme) => void;
  onOpenResume: () => void;
}
```

---

## 4. Recruiter Terminal Dispatch Contract (`ContactSection.tsx`)

When submitting the recruiter contact form, the client packages the payload into the following format:

### Request Payload
```json
{
  "senderName": "Sarah Jenkins",
  "senderEmail": "s.jenkins@enterprise.com",
  "senderMessage": "We are seeking a Lead Data Engineer for our platform team...",
  "timestamp": "2026-10-04T22:30:00.000Z",
  "timezone": "Asia/Kolkata (IST)"
}
```

### Response Receipt (`200 OK`)
```json
{
  "status": 200,
  "acknowledgment": "200_DISPATCH_ACK",
  "logs": [
    "[SYS_INIT] Establishing secure TLS 1.3 socket...",
    "[AUTH_VERIFIED] Payload encrypted for Arul (Node: India-South).",
    "[ROUTING] Packaging transmission parameters...",
    "[200_DISPATCH_ACK] Transmission successfully delivered!",
    "[LOG] Arul will review your opportunity inquiry promptly."
  ]
}
```

---

## 5. External API Integrations (Google Gemini API)

The repository includes `@google/genai` dependency configured in `package.json` for server-side AI prompt generation.

* **SDK Library**: `@google/genai`
* **Environment Variable**: `GEMINI_API_KEY`
* **Sample Initialization**:
  ```typescript
  import { GoogleGenAI } from '@google/genai';

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  ```
