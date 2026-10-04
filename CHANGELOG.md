# Changelog

All notable changes to the **Arul // Technical Editorial & Engineering Portfolio** codebase will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-04

### Added
* **Interactive SQL Execution Console (`SqlSandbox.tsx`)**: Real-time PostgreSQL 16 execution runner with preset data engineering queries, syntax highlighting, and query latency measurements.
* **Pipeline Telemetry Diagram (`TelemetryDiagram.tsx`)**: Live visual node graph detailing data ingestion, processing, storage, and consumer layers with real-time throughput metrics.
* **Triple Theme State Engine (`App.tsx`, `Header.tsx`)**: Dynamic theme context supporting `cobalt`, `rust`, and `obsidian` visual aesthetics across all sections.
* **Recruiter Dispatch Terminal (`ContactSection.tsx`)**: Simulated TLS 1.3 encrypted contact transmission terminal with live IST timekeeping and clipboard email integration.
* **Printable Interactive Resume Modal (`ResumeModal.tsx`)**: Dedicated full-screen print-formatted dossier with browser-native PDF export styling.
* **Comprehensive SDLC Documentation Suite (`docs/`)**: Full 6-phase engineering documentation spanning Planning, Architecture, Engineering, QA, Deployment, and User Guides.
* **Gemini AI Integration Base (`@google/genai`)**: Integration foundation for server-side generative AI queries.

### Changed
* Upgraded application styling to TailwindCSS v4 with `@tailwindcss/vite` integration.
* Rearchitected `portfolioData.ts` to include granular deep-dive metadata, metric panels, and SQL query definitions.
* Standardized font stack to Inter / JetBrains Mono for technical clarity.

### Fixed
* Resolved dark mode root background state synchronization during theme toggles.
* Fixed mobile layout responsive wrapping on high-density metric panels.
