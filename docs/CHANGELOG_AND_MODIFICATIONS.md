# Master Changelog & Modifications Log

> **Arul G — Portfolio Software Repository**  
> Comprehensive audit of features added, UI design changes, project catalog updates, resume integration fixes, contact section mail dispatch, and removed components.

---

## 🚀 1. Added Features & System Enhancements

### 🎨 Motion v12 & Dynamic UI Landing Page (Section 01)
- **Hero Section Overhaul** ([`HeroSection.tsx`](file:///c:/drive%20g/portfolio/arul_portfolio-3/src/components/HeroSection.tsx)):
  - Integrated `motion/react` (Motion v12) for smooth entry animations, floating status badges, ambient gradient glow spheres, and interactive buttons.
  - Added dynamic role pill rotation (Data Engineer, Data Analyst, Full-Stack Developer).
  - Added primary CTAs: `Explore Projects (11)` smooth scroll trigger and `View Full Dossier`.
  - Added quick stats ribbon (11 Projects, 19 SDLC Specs, 17 Months Industry Experience, B.Tech CSE Completed).

### 📁 Resume Upload & Preview Pipeline (`/resume`)
- **Automated Copy Prebuild Workflow**:
  - Implemented automated Node.js prebuild script in [`package.json`](file:///c:/drive%20g/portfolio/arul_portfolio-3/package.json): `node -e "const fs=require('fs'); fs.mkdirSync('public/resume',{recursive:true}); if(fs.existsSync('resume')){ fs.readdirSync('resume').forEach(f=>fs.copyFileSync('resume/'+f, 'public/resume/'+f)); }"`
  - Any PDF uploaded to the root `resume/` directory is automatically synced into `public/resume/` at build time.
- **Dynamic Preview Modal**:
  - Added instant modal preview and direct download capabilities in [`HeroSection.tsx`](file:///c:/drive%20g/portfolio/arul_portfolio-3/src/components/HeroSection.tsx) supporting PDF viewing without leaving the application.

### 💼 Section 03 Revamped Projects Grid (`ProjectsSection.tsx`)
- **2-Column Modern Grid**:
  - Converted Section 03 from vertical accordion bars into a clean, modern 2-column responsive card layout.
  - Filter category tabs (`ALL`, `ENGINEERING`, `ANALYTICS`, `FULLSTACK`, `APPLICATIONS`).
  - Added priority badges (`PRIORITY_01`), live URL indicators, tech stack tags, and click-to-open modal triggers across every project container.

### 📬 Section 08 Direct Mailto Transmission (`ContactSection.tsx`)
- **Native Mail Client Integration**:
  - Replaced frontend mock console timer simulation with native `mailto:aruldme004@gmail.com` launch.
  - Submitting the recruiter ingestion form formats sender name, corporate email, and role context into pre-filled URL parameters and triggers the user's default email client (Gmail, Outlook, Apple Mail).
  - Updated terminal output logs and success message confirming email client trigger.

---

## 🔄 2. Updated Configurations & Data Fixes

### 📂 Repository & Docs Folder Deep-Links
- **Explicit `/docs` Folder Linking**:
  - Updated [`ProjectModal.tsx`](file:///c:/drive%20g/portfolio/arul_portfolio-3/src/components/ProjectModal.tsx) to feature a prominent `Open Repo /docs Folder` redirect button at the top of the `README & Docs` tab.
  - Corrected **Rowdesk (Project 05)** docs URL to `https://github.com/ARULKINT/rowdesk/tree/master/docs` (branch set to `master` as requested).
  - Verified and formatted GitHub repo URLs, live demo URLs, and docs URLs across all 11 projects in [`portfolioData.ts`](file:///c:/drive%20g/portfolio/arul_portfolio-3/src/data/portfolioData.ts).

### 🎓 Academic Status Update
- Updated B.Tech CSE degree status from *In Progress* to **Completed** (Rajiv Gandhi College of Engineering and Technology, Pondicherry University, 2023–2026, Result: 7.8/10).

---

## 🗑️ 3. Removed Components & Deprecations

- **Web Dossier Overlay**: Removed Web Dossier modal overlay and simplified navigation to direct section scrolling and tab switching.
- **Redundant Theme Modes**: Removed extra theme toggles to enforce a clean Obsidian Dark mode default with high-contrast Light mode option.
- **Top Metric Cards in Project Modal**: Streamlined [`ProjectModal.tsx`](file:///c:/drive%20g/portfolio/arul_portfolio-3/src/components/ProjectModal.tsx) header to remove space-consuming metric boxes so the modal opens directly to the full project README and documentation view.

---

## 🔢 4. Complete Renumbered Projects List (01 - 11)

1. **01 // CommercePulse — E-commerce Data Architecture** (DATA_ENGINEERING)
2. **02 // Weather Data Engineering Pipeline** (DATA_ENGINEERING)
3. **03 // Uber Data Engineering Pipeline** (DATA_ENGINEERING)
4. **04 // Lead Acquisition & Employee Performance Analysis** (DATA_ANALYTICS)
5. **05 // Rowdesk — Internal Workflow & CRM Platform** (FULL_STACK)
6. **06 // Forge & Flint — Software Solutions Initiative** (SOFTWARE_APPS)
7. **07 // Textile Retail CRM Prototype** (FULL_STACK)
8. **08 // Pandian Hotel & Room Stay Booking App** (SOFTWARE_APPS)
9. **09 // Personal Portfolio & SDLC Architecture Platform** (FULL_STACK)
10. **10 // Hello Mobiles CRM & Repair Shop System** (FULL_STACK)
11. **11 // Multi-Tenant Business Management Platform** (FULL_STACK)
