# Developer Setup & Onboarding Guide

| Document Version | 1.0.0 |
| :--- | :--- |
| **Target Audience** | Software Engineers, Data Engineers, Maintainers |
| **Supported OS** | macOS, Linux, Windows 10/11 (PowerShell/WSL2) |

---

## 1. Prerequisites & Environment Requirements

Before setting up the project locally, verify that your development machine has the following tools installed:

| Tool | Recommended Version | Minimum Version | Verification Command |
| :--- | :--- | :--- | :--- |
| **Node.js** | `v20.x.x` (LTS) | `v18.0.0` | `node -v` |
| **npm** | `v10.x.x` | `v9.0.0` | `npm -v` |
| **Git** | `v2.40+` | `v2.20.0` | `git --version` |

---

## 2. Step-by-Step Local Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/ARULKINT/portfolio_arul.git
cd arul_portfolio-3
```

### Step 2: Install Node Dependencies
Install all required production and development dependencies specified in `package.json`:
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a local `.env` file from the provided `.env.example` template:
```bash
cp .env.example .env
```

Edit `.env` to supply optional credentials if extending Gemini AI capabilities:
```env
# GEMINI_API_KEY: Required for Gemini AI API calls.
GEMINI_API_KEY="your_gemini_api_key_here"

# APP_URL: Base host URL for serverless preview
APP_URL="http://localhost:3000"
```

### Step 4: Launch the Local Development Server
Start Vite's local dev server with Hot Module Replacement (HMR):
```bash
npm run dev
```

Output:
```
  VITE v8.3.0  ready in 240 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://0.0.0.0:3000/
```

Open `http://localhost:3000` in your web browser.

---

## 3. NPM Script Commands Reference

| Script Command | Action / Behavior |
| :--- | :--- |
| `npm run dev` | Launches local Vite development server on port 3000. |
| `npm run lint` | Runs TypeScript compiler (`tsc --noEmit`) to verify 0 type errors. |
| `npm run build` | Compiles production assets into `dist/` directory using Vite. |
| `npm run preview` | Starts local HTTP server to preview compiled production build in `dist/`. |
| `npm run clean` | Cleans build artifacts (`rm -rf dist server.js`). |

---

## 4. IDE Recommendations & Extensions

For the best developer experience, we recommend using **VS Code** or **Antigravity IDE** with the following extensions:

1. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) - Provides autocomplete for Tailwind utility classes.
2. **TypeScript and JavaScript Language Features** (Built-in) - Enables real-time typechecking.
3. **ESLint** (`dbaeumer.vscode-eslint`) - Highlights syntax and style errors.
4. **Prettier - Code formatter** (`esbenp.prettier-vscode`) - Ensures consistent formatting.

---

## 5. Troubleshooting Common Onboarding Issues

### Issue 1: `npm run dev` Port Conflict
* **Symptom**: Error `Port 3000 is already in use`.
* **Solution**: Kill the process running on port 3000 or pass a custom port flag:
  ```bash
  npx vite --port=3001
  ```

### Issue 2: TypeScript Compilation Warnings (`npm run lint`)
* **Symptom**: `error TS2307: Cannot find module '@/components/...'`.
* **Solution**: Ensure `tsconfig.json` contains proper path mappings:
  ```json
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
  ```
