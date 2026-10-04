# Product Requirement Document (PRD) & Software Requirements Specification (SRS)

| Document Version | 1.0.0 |
| :--- | :--- |
| **Project Name** | Arul // Technical Editorial & Engineering Portfolio |
| **Status** | Approved & Deployed |
| **Target Release** | Version 1.0.0 |

---

## 1. Product Overview

The **Arul Portfolio Application** is a single-page React 19 application designed to highlight engineering projects, data pipelines, academic background, and technical capabilities in an editorial, high-density dashboard format.

---

## 2. User Personas & Use Cases

### Personas
1. **Engineering Manager (Tech Evaluator)**: Wants to view real code snippets, architecture diagrams, SQL query logic, and system trade-offs.
2. **Technical Recruiter (Speed Skimmer)**: Wants quick access to role availability, core skills breakdown, contact links, and downloadable PDF resume.
3. **Data Platform Lead (Domain Expert)**: Wants to interact with live telemetry diagrams, inspect pipeline throughput rates, and audit data warehouse schema designs.

---

## 3. Functional Requirements (FR)

### FR-1: Navigation & Header
* **FR-1.1**: The application MUST feature a sticky navigation header displaying brand title, active section anchors, theme selection dropdown, and a quick-action "Resume Dossier" button.
* **FR-1.2**: Header MUST update theme state globally across all visual components without triggering full page re-renders.

### FR-2: Theme Engine
* **FR-2.1**: Application MUST support 3 distinct theme modes:
  * `cobalt` (Default slate/blue palette)
  * `rust` (Terra cotta editorial palette)
  * `obsidian` (High-contrast dark mode terminal palette)
* **FR-2.2**: Changing theme MUST dynamically toggle document root classes (`dark`) and body background colors (`#0f1013`, `#f4f2ec`, `#fcf9f8`).

### FR-3: Hero & Foundations Sections
* **FR-3.1**: Hero section MUST display candidate headline, active role availability badges, quick CTAs, and key metrics.
* **FR-3.2**: Foundations section MUST present core engineering pillars (Data Engineering, Analytics, Full-Stack) with instant project category filtering triggers.

### FR-4: Project Showcase & Modal System
* **FR-4.1**: Projects section MUST display cards filtered by category (`all`, `engineering`, `analytics`, `fullstack`, `automation`, `applications`).
* **FR-4.2**: Clicking a project card MUST open a detailed modal (`ProjectModal.tsx`) showing problem statement, architecture narrative, metric panel, code snippet, and deep-dive interactive widget.

### FR-5: SQL Sandbox Console (`SqlSandbox.tsx`)
* **FR-5.1**: Provide an interactive code textarea pre-populated with SQL queries.
* **FR-5.2**: Include preset query buttons for "Scrap Rate by Shift", "Inventory Shrinkage Audit", and "Machine Downtime Bottlenecks".
* **FR-5.3**: Clicking "Execute Query" MUST trigger simulated query latency (3-5ms) and render a structured results table with row counts and execution timing.

### FR-6: Pipeline Telemetry Diagram (`TelemetryDiagram.tsx`)
* **FR-6.1**: Render a visual DAG node graph representing real-time telemetry (Source -> Processing -> Storage -> Consumer).
* **FR-6.2**: Provide clickable nodes allowing users to inspect throughput, P95 latency, and node status.

### FR-7: Recruiter Dispatch Terminal (`ContactSection.tsx`)
* **FR-7.1**: Render a simulated terminal form accepting Recruiter Name, Corporate Email, and Role Description.
* **FR-7.2**: On submit, animate step-by-step TLS encryption logs before displaying delivery acknowledgement.
* **FR-7.3**: Provide a live India Standard Time (IST) ticking clock (`UTC +5:30`).
* **FR-7.4**: Provide copy-to-clipboard functionality for contact email address.

### FR-8: Resume Dossier (`ResumeModal.tsx`)
* **FR-8.1**: Render a full-page formatted resume modal.
* **FR-8.2**: Support browser `window.print()` functionality formatted for single/double page clean paper export.

---

## 4. Non-Functional Requirements (NFR)

### NFR-1: Performance & Responsiveness
* **NFR-1.1 Load Latency**: Initial page load time MUST be under 1.0 second on 4G networks.
* **NFR-1.2 Frame Rate**: Smooth 60 FPS scrolling and modal transitions using CSS transitions and Motion 12.
* **NFR-1.3 Bundle Size**: Production JavaScript build bundle size MUST NOT exceed 250 KB compressed.

### NFR-2: Accessibility (a11y)
* **NFR-2.1 Contrast**: Minimum WCAG 2.1 AA color contrast ratio (4.5:1 for normal text) across all 3 themes.
* **NFR-2.2 Keyboard Navigation**: All interactive elements (buttons, inputs, modal closers) MUST be keyboard navigable with visible focus states.

### NFR-3: Cross-Browser & Device Compatibility
* **NFR-3.1 Browsers**: Fully supported on Chrome, Firefox, Edge, Safari (latest 2 versions).
* **NFR-3.2 Devices**: Responsive layouts tailored for Mobile (< 640px), Tablet (640px - 1024px), and Desktop (> 1024px).

---

## 5. System Dependencies & Integration

* **React 19.0.1** (UI Component Runtime)
* **Vite 8.3.0** (Bundler & Dev Server)
* **TailwindCSS v4.3.3** (Utility Engine)
* **Google Material Symbols** (Typography Icons)
* **`@google/genai` v2.4.0** (Gemini AI API integration client library)
