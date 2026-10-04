# Detailed Test Cases & Execution Specifications

| Document Version | 1.0.0 |
| :--- | :--- |
| **Suite Category** | Manual & Automated Test Specifications |

---

## 1. Test Suite: Theme Engine & Global Styling (`TC-THEME-001` - `003`)

### `TC-THEME-001`: Theme Switcher Execution (`Cobalt` -> `Rust`)
* **Preconditions**: Application loaded in default `Cobalt` theme.
* **Test Steps**:
  1. Click theme dropdown in header.
  2. Select `Rust` theme option.
* **Expected Outcome**:
  * Body background color changes instantly to `#f4f2ec`.
  * Accent text color changes to terra cotta (`#d9480f`).
  * CSS class `.dark` is removed from `<html>` element.

### `TC-THEME-002`: Theme Switcher Execution (`Rust` -> `Obsidian`)
* **Test Steps**:
  1. Select `Obsidian` theme from header selector.
* **Expected Outcome**:
  * Body background changes to `#0f1013`.
  * HTML element receives `.dark` class.
  * Card backgrounds switch to dark contrast slate (`#141518`).

---

## 2. Test Suite: Interactive SQL Execution Console (`TC-SQL-001` - `003`)

### `TC-SQL-001`: Preset Query Execution ("Scrap Rate by Shift")
* **Preconditions**: Project Modal open with `SqlSandbox` rendered.
* **Test Steps**:
  1. Click preset button `Scrap Rate by Shift`.
  2. Click `Execute Query` button.
* **Expected Outcome**:
  * Textarea populates with `SELECT shift_id, SUM(scrap_qty)...`.
  * Button shows temporary loading state (`Executing...` with hourglass icon).
  * Within 10ms, results table renders 3 rows (`SHIFT_C`, `SHIFT_B`, `SHIFT_A`).
  * Latency badge displays query timing (e.g. `4.8ms`).

### `TC-SQL-002`: Custom SQL Execution Fallback
* **Test Steps**:
  1. Clear text area and enter custom query: `SELECT * FROM custom_telemetry;`.
  2. Click `Execute Query`.
* **Expected Outcome**:
  * Executing indicator triggers.
  * Results table returns realistic generated rows (`BATCH_THROUGHPUT_P95`, `LINE_BALANCE_EFFICIENCY`).

---

## 3. Test Suite: Pipeline Telemetry Visualizer (`TC-TEL-001`)

### `TC-TEL-001`: Telemetry Node Selection & Inspector Render
* **Preconditions**: `TelemetryDiagram` component rendered.
* **Test Steps**:
  1. Click on `PySpark Streaming Engine` node card.
* **Expected Outcome**:
  * Selected node card highlights with active accent border.
  * Metric inspector panel updates throughput rate (e.g., `42.4k msgs/sec`) and P95 latency (e.g., `12.4ms`).

---

## 4. Test Suite: Recruiter Dispatch Terminal (`TC-REC-001` - `002`)

### `TC-REC-001`: Valid Form Dispatch Transmission
* **Preconditions**: Scrolled to Contact Section.
* **Test Steps**:
  1. Fill Recruiter Name: `Sarah Jenkins`.
  2. Fill Email: `s.jenkins@enterprise.com`.
  3. Fill Message: `We have an opening for a Data Platform Lead...`.
  4. Click `Dispatch Transmission`.
* **Expected Outcome**:
  * Form switches to active terminal execution mode (`[SYS_INIT] Establishing secure TLS 1.3 socket...`).
  * After 900ms, success receipt box displays: `Thank you, Sarah Jenkins. Your inquiry has been logged...`.

### `TC-REC-002`: Email Copy to Clipboard
* **Test Steps**:
  1. Click `Email Contact` button card (`arul.engineer.dev@placeholder.com`).
* **Expected Outcome**:
  * Email string copied to system clipboard.
  * Button displays green check icon with text `✓ Copied to clipboard!`.
  * Reverts back to standard state after 2.5 seconds.
