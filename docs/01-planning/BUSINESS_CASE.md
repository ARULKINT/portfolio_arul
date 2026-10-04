# Business Case & Project Charter

| Document Version | 1.0.0 |
| :--- | :--- |
| **Project Title** | Arul // Technical Editorial & Engineering Portfolio |
| **Executive Sponsor** | Arul (Lead Data Engineer & Full-Stack Developer) |
| **Target Audience** | Technical Recruiters, Engineering Managers, Data Platform Leads, CTOs |
| **Date** | October 4, 2026 |

---

## 1. Executive Summary

Traditional static PDF resumes and basic web portfolios fail to effectively communicate a candidate's hands-on data engineering capabilities, system design intuition, and operational rigor. Technical decision-makers require immediate proof of competence in handling real-time data pipelines, writing performant SQL queries, and architecting scalable web applications.

The **Arul Technical Editorial & Engineering Portfolio** bridges this gap by acting as both a showcase and a live demonstration of engineering expertise. Built as a high-performance single-page web application, it embeds interactive data pipeline telemetry, live SQL query consoles, deep architectural dossiers, and a recruiter dispatch terminal.

---

## 2. Business Objectives & Value Proposition

### Key Objectives
1. **Accelerate Candidate Evaluation**: Reduce the time required for engineering managers to evaluate technical skills by 60% through interactive live code demos and architectural deep-dives.
2. **Demonstrate Operational Rigor**: Showcase end-to-end data pipeline designs (Spark streaming, PostgreSQL indexing, Airflow DAGs) in action rather than as static bullet points.
3. **High Conversion Recruiter Ingestion**: Provide a friction-free, interactive dispatch terminal for recruiters to schedule interviews or request candidate dossiers.
4. **Multi-Domain Positioning**: Position Arul effectively across 3 key candidate categories:
   * **Data Engineering** (PySpark, Kafka, Airflow, PostgreSQL, Data Lakehouse)
   * **Data Analytics & BI** (Complex SQL Window functions, scrap rate audit dashboards, operational telemetry)
   * **Full-Stack Development** (React 19, TypeScript, TailwindCSS v4, Vite, Node/Express, Gemini AI integration)

---

## 3. Return on Investment (ROI) & Success Metrics

| Metric Category | Target KPI | Measurement Method |
| :--- | :--- | :--- |
| **Engagement** | > 3 minutes average session duration | Analytics tracking on project modal opens and preset SQL query executions |
| **Recruiter Conversion** | > 15% inquiry submission rate | Submissions via Recruiter Dispatch Terminal |
| **Technical Verification** | 100% Type-Safety & Zero JS Errors | Automated CI linting and runtime log auditing |
| **Page Speed & CWV** | P90 Load Time < 800ms, LCP < 1.2s | Lighthouse Performance & Core Web Vitals audit |

---

## 4. Scope & Boundaries

### In Scope
* Full interactive UI with 3 switchable themes (`Cobalt`, `Rust`, `Obsidian`).
* Project showcase with 5 specialized filter views (Engineering, Analytics, Full-Stack, Automation, Applications).
* Embedded PostgreSQL SQL query sandbox with latency feedback.
* Dynamic pipeline telemetry diagram with node status toggling and throughput tracking.
* Resume modal with web view and print-optimized PDF styling.
* Direct recruiter dispatch terminal with simulated TLS delivery receipt.

### Out of Scope
* Live database write connectivity (currently powered by safe, deterministic client-side SQL execution engine).
* User authentication / login paywalls (publicly accessible portfolio).

---

## 5. Stakeholders & Key Roles

* **Project Owner / Developer**: Arul (Maintains codebase, designs architecture, updates dossiers).
* **Technical Reviewers**: Hiring Managers & Technical Lead Evaluators.
* **Recruiter Users**: Talent Acquisition Specialists reviewing candidate qualifications.
