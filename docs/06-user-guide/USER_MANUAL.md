# User Manual & Navigation Guide

| Document Version | 1.0.0 |
| :--- | :--- |
| **Audience** | Technical Recruiters, Engineering Managers, General Visitors |

---

## 1. Welcome to Arul's Technical Portfolio

This interactive portfolio is designed to showcase engineering capabilities, real-world data pipeline projects, academic background, and technical leadership in a high-density, interactive format.

---

## 2. Navigating the Portfolio Sections

### 2.1 Header Navigation & Theme Switcher
At the top of the screen, you will find the fixed navigation header:
* **Brand Logo**: Click `Arul // Technical Editorial` to scroll back to top.
* **Section Links**: Click any anchor (`Foundations`, `Projects`, `Capabilities`, `Experience`, `Academics`, `Leadership`, `Contact`) to smoothly jump to that section.
* **Theme Picker**: Click the theme button (`Cobalt`, `Rust`, or `Obsidian`) to customize the visual aesthetic.
* **Resume Dossier Button**: Click `Resume Dossier` to open the full interactive and printable resume overlay.

---

## 3. How to Use Interactive Widgets

### 3.1 Exploring Project Dossier Modals
1. Scroll to the **Projects Section**.
2. Click on any project card (e.g., *Manufacturing Scrap Rate Optimization*).
3. The modal overlay will open detailing:
   * System Architecture narrative.
   * Highlighted SQL Snippet.
   * Real-time metrics panel.
   * Interactive widgets.

### 3.2 Executing Queries in the SQL Sandbox (`SqlSandbox.tsx`)
1. Inside a project modal or capability section, locate the **SQL Execution Console**.
2. Click any preset button at the top right (e.g., `Scrap Rate by Shift` or `Inventory Shrinkage Audit`).
3. View or edit the SQL query in the dark editor box.
4. Click **Execute Query**.
5. Observe the query execution latency (e.g., `4.8ms`) and inspect the returned data rows in the structured output table.

### 3.3 Interacting with Pipeline Telemetry (`TelemetryDiagram.tsx`)
1. Locate the **Pipeline Telemetry Diagram**.
2. Click on any node card in the flow (e.g., `PySpark Streaming Engine` or `PostgreSQL DW`).
3. View real-time status badges (`ACTIVE`, `STREAMING`, `SYNCED`), message throughput (e.g. `42.4k msgs/sec`), and P95 processing latency.

### 3.4 Submitting an Inquiry via Recruiter Terminal (`ContactSection.tsx`)
1. Scroll to the bottom **Contact & Inquiries Section**.
2. Enter your Name, Corporate Email, and Opportunity Context into the form fields.
3. Click **Dispatch Transmission**.
4. Watch the terminal logs simulate TLS socket encryption and payload routing before displaying your confirmation receipt.
5. Use the **Copy Email** button to quickly copy Arul's email address (`arul.engineer.dev@placeholder.com`) to your clipboard.

---

## 4. Printing & Exporting PDF Resume

1. Click the **Resume Dossier** button in the header.
2. In the modal, click the **Print / Save as PDF** button at the top right.
3. Your browser's print dialog will open with print-optimized CSS rules (hiding navigation headers and dark overlays for a clean white PDF output).
