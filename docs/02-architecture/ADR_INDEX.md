# Architecture Decision Records (ADRs)

Architecture Decision Records capture key architectural and technical design decisions made throughout the lifecycle of the **Arul Portfolio Application**, including context, options evaluated, and consequences.

---

## ADR Index

| ADR ID | Title | Status | Date |
| :--- | :--- | :--- | :--- |
| [**ADR-001**](ADR-001-VITE-REACT-TAILWIND-V4-STACK.md) | Adoption of Vite 8 + React 19 + TailwindCSS v4 Stack | Accepted | 2026-09-08 |
| **ADR-002** | Client-Side In-Memory Data Storage vs External API | Accepted | 2026-09-12 |
| **ADR-003** | Custom State-Driven Theme Engine (`cobalt`, `rust`, `obsidian`) | Accepted | 2026-09-15 |
| **ADR-004** | Simulated SQL Sandbox Execution vs Live Database | Accepted | 2026-09-28 |

---

## Detailed Records

### ADR-001: Adoption of Vite 8 + React 19 + TailwindCSS v4 Stack

* **Status**: Accepted
* **Date**: 2026-09-08
* **Context**: The portfolio application requires instant page loads, fast developer feedback (HMR), strong type safety, and custom editorial design aesthetics without heavy client-side JavaScript execution overhead.

* **Options Considered**:
  1. Next.js 15 (App Router with SSR/SSG)
  2. Vite 8 + React 19 SPA (Client-Side Rendered)
  3. Static HTML/CSS + Vanilla JavaScript

* **Decision**: Adopt **Vite 8 + React 19 SPA** paired with **TailwindCSS v4**.

* **Rationale**:
  * Vite 8 provides instant cold starts and lightning-fast bundling via Esbuild and Rollup.
  * React 19 allows clean component encapsulation for complex interactive widgets (`SqlSandbox`, `TelemetryDiagram`, `ProjectModal`).
  * TailwindCSS v4 (`@tailwindcss/vite`) eliminates traditional `tailwind.config.js` bloat and provides CSS variable performance optimizations.
  * SSR complexity (Next.js server maintenance, cold boot delays on free tier hosting) is avoided for a client-heavy interactive portfolio.

* **Consequences**:
  * **Positive**: Fast builds (< 2 seconds), instant page loads (< 500ms), easy deployment to any static host (Cloud Run, Vercel, GitHub Pages).
  * **Negative**: Search Engine Crawling relies on static client rendering or pre-rendering indexing for deep meta tags.

---

### ADR-002: Client-Side In-Memory Data Storage vs External API

* **Status**: Accepted
* **Date**: 2026-09-12
* **Context**: Portfolio project information, experience records, skills, and code snippets must be served reliably without API latency or network failure risks.

* **Decision**: Maintain all portfolio content in a single typed TypeScript module (`src/data/portfolioData.ts`).

* **Rationale**:
  * Guarantees 0ms data fetch latency.
  * Ensures 100% uptime regardless of backend server availability.
  * Full type safety enforced at build time via `src/types/portfolio.ts`.

---

### ADR-003: Custom State-Driven Theme Engine (`cobalt`, `rust`, `obsidian`)

* **Status**: Accepted
* **Date**: 2026-09-15
* **Context**: Need to support multiple visual themes (`Cobalt` for modern technical look, `Rust` for warm industrial editorial feel, and `Obsidian` for dark terminal view).

* **Decision**: Implement a light-weight React state-driven theme coordinator in `App.tsx` that updates root DOM classes (`dark`) and passes theme context down as typed props.

---

### ADR-004: Simulated SQL Sandbox Execution vs Live Database

* **Status**: Accepted
* **Date**: 2026-09-28
* **Context**: Demonstrating data analytics and SQL expertise requires an interactive query execution console. Connecting to a live remote PostgreSQL server introduces security risks (SQL injection, database costs, network rate limits).

* **Decision**: Implement an in-memory SQL execution simulator (`SqlSandbox.tsx`) with preset query handlers and dynamic telemetry fallbacks.

* **Rationale**:
  * Safe execution with 0 security risks.
  * Consistent sub-5ms query response times.
  * Zero remote database infrastructure costs.
