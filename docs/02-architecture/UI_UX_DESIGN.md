# UI/UX Design & Component Specifications

| Document Version | 1.0.0 |
| :--- | :--- |
| **Design Style** | High-Density Editorial & Technical Console Aesthetic |
| **Typography Stack** | Inter (Sans) & JetBrains Mono (Monospace) |

---

## 1. Design System Principles

1. **Information Density & Clarity**: Present technical credentials, metric cards, and architecture diagrams with high visual efficiency—avoiding unnecessary whitespace while preserving scannability.
2. **Contextual Themes**: Provide 3 curated color palettes suited for different reading environments and reviewer preferences (`Cobalt`, `Rust`, `Obsidian`).
3. **Interactive Grounding**: Replace static bullet points with live interactive components (executable SQL runner, DAG node graph, simulated terminal dispatch).

---

## 2. Color Palettes & Theme Tokens

### Theme 1: `Cobalt` (Default Engineering View)
* **Background**: `#fcf9f8` (Clean warm slate)
* **Primary Accent**: `#0040da` (Cobalt blue)
* **Secondary Text**: `#1c1b1b` (Off-black)
* **Pill/Badge**: Soft blue tints (`bg-blue-50`, `text-blue-700`)

### Theme 2: `Rust` (Industrial Editorial View)
* **Background**: `#f4f2ec` (Warm paper)
* **Primary Accent**: `#d9480f` (Terracotta rust)
* **Secondary Text**: `#141517` (Deep charcoal)
* **Pill/Badge**: Warm terra cotta tints (`bg-orange-50`, `text-orange-800`)

### Theme 3: `Obsidian` (Developer Terminal Dark View)
* **Background**: `#0f1013` (Obsidian dark background)
* **Card Container**: `#141518` (Dark slate card)
* **Primary Accent**: `#315cf5` / `#d9480f` (Vibrant electric blue / rust highlights)
* **Text**: `#f4f2ec` (Light high-contrast monospace & sans text)

---

## 3. Core Component Layouts

### Header (`Header.tsx`)
* **Layout**: Fixed top sticky bar with `backdrop-blur-md`.
* **Left**: Brand initials & Candidate Title (`Arul // Portfolio`).
* **Center**: Section navigation links (`#foundations`, `#projects`, `#capabilities`, `#experience`, `#academics`, `#leadership`, `#contact`).
* **Right**: Theme Selector button (`Cobalt`, `Rust`, `Obsidian`) + Quick "Resume Dossier" action trigger.

### Project Dossier Modal (`ProjectModal.tsx`)
* **Layout**: Full-screen semi-transparent backdrop overlay with centered max-w-4xl scrollable card.
* **Sections**:
  1. Header with project title, badge status, category tag, and close button.
  2. Overview narrative & problem statement.
  3. Key architectural decisions bullet list.
  4. Embedded code snippet container with copy trigger.
  5. Metric highlight panel.
  6. Interactive feature widget (`SqlSandbox` or `TelemetryDiagram`).

### Print-Optimized Resume Modal (`ResumeModal.tsx`)
* **Web View**: Darkened backdrop with clean A4 page aspect-ratio card.
* **Print View (`@media print`)**: Hides background modals, navigation headers, theme selectors, and forces 100% black-and-white print styling for clean PDF export.

---

## 4. Typography Hierarchy

```
H1 Hero Headline:        3xl to 5xl / ExtraBold / Leading Tight
H2 Section Title:        2xl to 3xl / Bold / Monospace or Sans
H3 Component Subhead:    lg to xl / SemiBold
Body Text:               sm to base (14px - 16px) / Inter / Leading Relaxed
Terminal / Code Snippet: xs to sm (12px - 14px) / JetBrains Mono
Badges & Tags:           xs (10px - 12px) / Upper Case / Monospace / Bold
```
