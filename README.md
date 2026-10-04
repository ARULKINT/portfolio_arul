# Arul // Technical Editorial & Engineering Portfolio

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

An interactive, high-performance portfolio application built for **Arul**, showcasing expertise across **Data Engineering**, **Data Analytics**, **Full-Stack Web Development**, and **Automated Data Pipelines**.

Featuring live SQL execution sandboxes, real-time pipeline telemetry diagrams, multi-theme customization (Cobalt, Rust, Obsidian), print-ready resume dossiers, and recruiter dispatch terminals.

---

## 🚀 Key Features

* **Interactive SQL Execution Sandbox:** Interactive PostgreSQL query simulator allowing recruiters and technical managers to execute preset data engineering queries with realistic latency outputs.
* **Pipeline Telemetry Diagram:** Real-time visual graph showing live data flow across Source, Processing, Storage, and Consumer nodes with throughput and P95 latency tracking.
* **Triple Theme System:** Built-in theme state management supporting three distinct technical aesthetics:
  * `Cobalt` (High-contrast slate/blue engineering view)
  * `Rust` (Industrial terra cotta editorial view)
  * `Obsidian` (Dark mode developer terminal view)
* **Project Deep-Dives & Modals:** Interactive modal system providing architectural breakdowns, SQL snippets, metric panels, and code samples for each engineering dossier.
* **Recruiter Dispatch Terminal:** Simulated TLS-encrypted contact console with live IST timekeeping, payload logging, and direct email copy integration.
* **Printable Interactive Resume:** Full-page modal resume designed for web viewing and browser-native PDF export.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Core** | React 19.0, TypeScript 7.0 | Component rendering, type safety, state management |
| **Build System** | Vite 8.3 | HMR, fast bundling, ESM module handling |
| **Styling** | TailwindCSS v4, Motion 12.23 | Utility-first styling, smooth layout transitions |
| **Icons & Visuals** | Google Material Symbols, Lucide React | Technical symbols, status badges, UI indicators |
| **AI Integration** | `@google/genai` SDK | Server-side Gemini API capabilities |

---

## 📁 Repository Directory Structure

```
arul_portfolio-3/
├── .env.example                # Template for environment variables (e.g. GEMINI_API_KEY)
├── index.html                  # HTML entry point with font loading
├── metadata.json               # Application metadata and capabilities
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler configurations
├── vite.config.ts              # Vite configuration & alias settings
├── src/
│   ├── App.tsx                 # Main application component & layout manager
│   ├── index.css               # Tailwind directives & core font definitions
│   ├── main.tsx                # DOM mount entry point
│   ├── components/             # Reusable UI component modules
│   │   ├── AcademicsSection.tsx
│   │   ├── CapabilitiesSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── Footer.tsx
│   │   ├── FoundationsSection.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── LeadershipSection.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ResumeModal.tsx
│   │   ├── SqlSandbox.tsx
│   │   └── TelemetryDiagram.tsx
│   ├── data/
│   │   └── portfolioData.ts    # Central data source for projects, skills, experience
│   └── types/
│       └── portfolio.ts        # TypeScript interfaces and type declarations
└── docs/                       # Complete SDLC Documentation Suite
    ├── 01-planning/            # Business Case, PRD/SRS, Project Roadmap
    ├── 02-architecture/        # System Architecture, ADRs, ERD/Schema, UI/UX
    ├── 03-engineering/         # API Docs, Developer Onboarding Guide
    ├── 04-testing/             # Test Plan, Test Cases, QA Sign-off
    ├── 05-operations/          # Deployment Runbooks, Incident DR, Security Policies
    └── 06-user-guide/          # User Manual, FAQ & Troubleshooting, Legal Docs
```

---

## 🚦 Quick Start Guide

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ARULKINT/portfolio_arul.git
   cd arul_portfolio-3
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Copy `.env.example` to `.env` and configure your API keys (optional for basic local preview):
   ```bash
   cp .env.example .env
   ```

4. Start Development Server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. Type Checking & Verification:
   ```bash
   npm run lint
   ```

6. Production Build:
   ```bash
   npm run build
   ```

---

## 📚 Complete SDLC Documentation Suite

This codebase is documented end-to-end across the 6 primary Software Development Life Cycle domains:

1. 📋 [**Planning & Business Documentation**](docs/01-planning/PRD_SRS.md)
   * [Business Case & Project Charter](docs/01-planning/BUSINESS_CASE.md)
   * [Product Requirements & SRS](docs/01-planning/PRD_SRS.md)
   * [Project Plan & Roadmap](docs/01-planning/PROJECT_PLAN_ROADMAP.md)

2. 🏗️ [**Architecture & Design Documentation**](docs/02-architecture/SYSTEM_ARCHITECTURE.md)
   * [System Architecture Document (SAD)](docs/02-architecture/SYSTEM_ARCHITECTURE.md)
   * [Architecture Decision Records (ADRs)](docs/02-architecture/ADR_INDEX.md)
   * [Database Schema & ERD](docs/02-architecture/DATABASE_SCHEMA.md)
   * [UI/UX Design Specification](docs/02-architecture/UI_UX_DESIGN.md)

3. 🔧 [**Engineering & Technical Documentation**](docs/03-engineering/DEVELOPER_SETUP.md)
   * [API Documentation](docs/03-engineering/API_DOCUMENTATION.md)
   * [Developer Setup & Onboarding Guide](docs/03-engineering/DEVELOPER_SETUP.md)
   * [Contributing Guidelines (`CONTRIBUTING.md`)](CONTRIBUTING.md)

4. 🧪 [**Quality Assurance & Testing**](docs/04-testing/TEST_PLAN.md)
   * [Test Plan & Strategy](docs/04-testing/TEST_PLAN.md)
   * [Test Specifications & Cases](docs/04-testing/TEST_CASES.md)
   * [QA Sign-off & Bug Triage](docs/04-testing/QA_SIGNOFF.md)

5. 🚀 [**Deployment, Operations & Security**](docs/05-operations/DEPLOYMENT_RUNBOOK.md)
   * [Deployment Runbook & CI/CD](docs/05-operations/DEPLOYMENT_RUNBOOK.md)
   * [Incident Response & DR Plan](docs/05-operations/INCIDENT_RESPONSE_DR.md)
   * [Security & Compliance Policy](docs/05-operations/SECURITY_COMPLIANCE.md)

6. 📖 [**User & Customer Documentation**](docs/06-user-guide/USER_MANUAL.md)
   * [Changelog (`CHANGELOG.md`)](CHANGELOG.md)
   * [User Manual & Walkthrough](docs/06-user-guide/USER_MANUAL.md)
   * [FAQ & Troubleshooting](docs/06-user-guide/FAQ_TROUBLESHOOTING.md)
   * [Legal Documents & Terms](docs/06-user-guide/LEGAL.md)

---

## 📄 License

This project is open source and available under the [MIT License](docs/06-user-guide/LEGAL.md).
