# Contributing Guidelines

Thank you for your interest in contributing to **Arul // Technical Editorial & Engineering Portfolio**.

This document outlines the coding standards, branching workflow, commit message conventions, and Pull Request (PR) process required for all contributions.

---

## 🌲 Branching Strategy (Git Flow Lite)

We adhere to a streamlined Git Flow model:

* `main`: Production-ready release branch. Only merged via PR.
* `develop`: Integration branch for upcoming features.
* `feature/<feature-name>`: Topic branches for new capabilities (e.g., `feature/sql-runner-export`).
* `fix/<bug-description>`: Patch branches for resolving issue reports (e.g., `fix/theme-flicker`).

---

## 🛠️ Code Conventions & Syntax Rules

### 1. TypeScript & React Standards
* **Strict Typing**: Avoid `any`. Always create explicit interfaces in `src/types/portfolio.ts` or local file interfaces.
* **Functional Components**: Use `React.FC<Props>` signature for functional components.
* **Immutability**: Maintain immutability in React state setters.
* **Component Extraction**: Keep components focused. If a file exceeds 300 lines, consider extracting child components into subfiles.

### 2. Styling Standards (TailwindCSS v4)
* Utilize theme-aware color mapping (`theme === 'rust'`, `theme === 'obsidian'`, `theme === 'cobalt'`).
* Ensure text contrast ratios meet WCAG AA standards in all 3 themes.
* Use explicit spacing utilities over arbitrary inline pixel values where possible.

### 3. File Naming Conventions
* **Components**: PascalCase (e.g., `SqlSandbox.tsx`, `TelemetryDiagram.tsx`).
* **Types / Data**: camelCase (e.g., `portfolio.ts`, `portfolioData.ts`).
* **Documentation**: UPPERCASE_SNAKE_CASE (e.g., `DEVELOPER_SETUP.md`).

---

## 🧪 Local Linting & Pre-flight Checks

Before submitting a Pull Request, run the following verification steps locally:

```bash
# 1. Typecheck the entire codebase without producing output
npm run lint

# 2. Test production build execution
npm run build

# 3. Preview local build bundle
npm run preview
```

---

## 📝 Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) standard:

```
<type>(<scope>): <short summary>

[optional body]
```

### Allowed Types:
* `feat`: A new user-facing feature.
* `fix`: A bug fix.
* `docs`: Documentation updates only.
* `style`: Formatting, CSS updates, micro-interaction tweaks.
* `refactor`: Code change that neither fixes a bug nor adds a feature.
* `test`: Adding or updating test cases.
* `chore`: Build script updates, dependency bumps.

### Example:
```bash
git commit -m "feat(sandbox): add execution latency timer and CSV export preset"
```

---

## 📥 Pull Request (PR) Checklist

When creating a PR:

1. Target the `develop` branch (or `main` for hotfixes).
2. Ensure PR title follows Conventional Commits.
3. Verify that `npm run lint` passes with 0 type errors.
4. Verify all 3 themes (`cobalt`, `rust`, `obsidian`) render cleanly without visual layout shifts.
5. Link relevant issue tickets or milestone cards.
