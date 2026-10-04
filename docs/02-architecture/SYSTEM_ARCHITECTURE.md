# System Architecture Document (SAD)

| Document Version | 1.0.0 |
| :--- | :--- |
| **System Name** | Arul // Technical Editorial & Engineering Portfolio |
| **Architecture Pattern** | Single-Page Application (SPA) with Modular Component Hierarchy |
| **Primary Stack** | React 19, TypeScript, Vite 8, TailwindCSS v4 |

---

## 1. High-Level Architecture Overview

The system is constructed as a modern, decoupled client-side Single-Page Application (SPA) optimized for high render speeds, zero layout shift, and interactive data visualization.

```mermaid
graph TD
    User([Browser Client / User]) -->|HTTP / HTTPS| WebApp[Vite React Application]
    
    subgraph Client Application Boundary (Browser)
        WebApp --> Header[Header & Theme Manager]
        WebApp --> RouterState[Filter & Modal State]
        
        subgraph UI Sections
            Hero[HeroSection]
            Foundations[FoundationsSection]
            Projects[ProjectsSection]
            Capabilities[CapabilitiesSection]
            Experience[ExperienceSection]
            Academics[AcademicsSection]
            Leadership[LeadershipSection]
            Contact[ContactSection]
        end
        
        subgraph Interactive Engine Widgets
            SqlSandbox[SqlSandbox PostgreSQL Console]
            Telemetry[TelemetryDiagram DAG Visualizer]
            ResumeModal[ResumeModal Dossier]
            ProjectModal[ProjectModal Deep-Dive]
        end
        
        subgraph Data Layer
            PortfolioData[(portfolioData.ts)]
        end
        
        Projects --> PortfolioData
        Projects --> ProjectModal
        ProjectModal --> SqlSandbox
        ProjectModal --> Telemetry
        Contact --> LiveClock[IST Timekeeper]
    end
    
    subgraph External Services
        GeminiAPI[Google Gemini API]
    end
    
    WebApp -.->|Optional Server-Side Call| GeminiAPI
```

---

## 2. Component Hierarchy & Architectural Layers

```
src/
├── App.tsx                     <-- Global State Coordinator (Theme, Modal Flags, Category Filters)
├── index.css                   <-- Core Design System Tokens & Font Families
├── components/
│   ├── Header.tsx              <-- Sticky Navigation, Theme Picker, Resume Trigger
│   ├── HeroSection.tsx         <-- Hero Dossier Headline & Metrics
│   ├── FoundationsSection.tsx  <-- Primary Engineering Domains (Data Eng, Analytics, Fullstack)
│   ├── ProjectsSection.tsx     <-- Portfolio Grid & Category Filtering Controls
│   ├── CapabilitiesSection.tsx <-- Skills Inventory, Proficiency Matrix, Sample Code Snippets
│   ├── ExperienceSection.tsx   <-- Career History & Shift Metrics
│   ├── AcademicsSection.tsx    <-- Degree & Coursework Breakdown
│   ├── LeadershipSection.tsx   <-- Technical Mentorship & Domain Leadership
│   ├── ContactSection.tsx      <-- Recruiter Terminal, Dispatch Form, IST Clock
│   ├── SqlSandbox.tsx          <-- PostgreSQL Query Execution Simulator
│   ├── TelemetryDiagram.tsx    <-- Data Pipeline DAG Node Visualizer
│   ├── ProjectModal.tsx        <-- Deep-Dive Dossier Overlay
│   ├── ResumeModal.tsx         <-- Interactive & Print Resume Overlay
│   └── Footer.tsx              <-- Legal Notices & System Status Footer
├── data/
│   └── portfolioData.ts        <-- Central Immutable Data Provider
└── types/
    └── portfolio.ts            <-- Domain Model Interfaces
```

---

## 3. Core Technical Subsystems

### 3.1 Theme Management Subsystem
* **Theme Options**: `'cobalt'` | `'rust'` | `'obsidian'`
* **Mechanism**: Handled via React state in `App.tsx` and propagated via props down to section components.
* **DOM Sync**: Toggles CSS class `.dark` on `document.documentElement` and sets `document.body.style.backgroundColor` dynamically.

### 3.2 SQL Sandbox Execution Engine (`SqlSandbox.tsx`)
* **Purpose**: Simulates executing SQL queries against an operational PostgreSQL data warehouse.
* **Mechanism**: Parses query input against pre-calculated result sets (`Scrap Rate by Shift`, `Inventory Shrinkage Audit`, `Machine Downtime Bottlenecks`). Falls back to realistic telemetry query outputs with measured latency timings (3.0ms - 6.0ms).

### 3.3 Pipeline Telemetry Visualizer (`TelemetryDiagram.tsx`)
* **Purpose**: Visualizes an operational data pipeline flow.
* **Node Types**:
  1. `source`: Industrial IoT Sensors & Line PLC Telemetry
  2. `processing`: PySpark Streaming Engine & Airflow DAGs
  3. `storage`: PostgreSQL Operational Data Store & S3 Parquet Lakehouse
  4. `consumer`: Analytics Dashboard & Scrap Anomaly Alerting
* **State**: Active selected node triggers detailed metric inspector (throughput, P95 latency, operational status).

### 3.4 Recruiter Dispatch Terminal (`ContactSection.tsx`)
* **Purpose**: Provides a low-friction recruiter transmission intake form.
* **State Machine**:
  1. `IDLE`: Input form accepting Name, Corporate Email, Role Context.
  2. `SUBMITTING`: Simulated TLS 1.3 socket establishment and payload encryption logs.
  3. `DISPATCHED`: Success receipt acknowledgment.
* **Utility Integration**: Ticking IST clock (`toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })`) and single-click email copy to clipboard (`navigator.clipboard.writeText`).

---

## 4. Design Trade-Offs & Rationale

| Architecture Decision | Option Selected | Trade-Off Rationale |
| :--- | :--- | :--- |
| **State Storage** | React State in `App.tsx` | Avoids unnecessary external state management overhead (Redux/Zustand) for a single-page portfolio application. |
| **Styling** | TailwindCSS v4 | Provides rapid utility styling, custom theme support, zero runtime CSS-in-JS performance penalty, and small bundle size. |
| **Data Layer** | Static TypeScript File (`portfolioData.ts`) | Guarantees instant 0ms load time, offline availability, zero backend database maintenance cost, and deterministic rendering. |
