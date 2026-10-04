# Incident Response & Disaster Recovery (DR) Plan

| Document Version | 1.0.0 |
| :--- | :--- |
| **System Classification** | Tier 1 Public Candidate Showcase |
| **Recovery Point Objective (RPO)** | 0 Hours (Git-Backed Immutable Codebase) |
| **Recovery Time Objective (RTO)** | < 15 Minutes |

---

## 1. Incident Severity Triage & Response Matrix

| Severity Tier | Incident Example | Notification Channel | SLA Response |
| :--- | :--- | :--- | :--- |
| **SEV-1 (Critical)** | Portfolio completely unreachable (DNS failure, CDN outage). | Direct SMS / Phone Alert to Maintainer | < 15 Minutes |
| **SEV-2 (Major)** | Interactive feature failure (SQL runner frozen, resume download broken). | Email / Slack Notification | < 2 Hours |
| **SEV-3 (Minor)** | Minor visual layout shift, non-critical typo. | GitHub Issue | Next Business Day |

---

## 2. Disaster Recovery Scenarios & Playbooks

### Playbook 1: Primary Hosting CDN Outage (e.g. Vercel Outage)
1. **Detection**: Uptime monitor triggers HTTP `503 Service Unavailable` alert.
2. **Action**: Switch DNS CNAME record at Domain Registrar to secondary backup host (GitHub Pages or Netlify static fallback).
3. **Command**:
   ```bash
   # Build local dist and push to secondary gh-pages branch
   npm run build
   npx gh-pages -d dist
   ```
4. **Verification**: Confirm 200 OK HTTP response from backup edge URL.

### Playbook 2: Corrupted Commit or Broken Release
1. **Detection**: User reports white screen or unhandled exception after new release deployment.
2. **Action**: Revert `main` branch to last known good git commit hash.
3. **Execution**:
   ```bash
   git revert HEAD
   git push origin main
   ```
4. Deployment host automatically triggers clean rebuild.

---

## 3. Post-Mortem Incident Template

```markdown
# Incident Post-Mortem Report

**Date of Incident**: YYYY-MM-DD
**Incident Title**: [Short description]
**Severity**: SEV-1 / SEV-2
**Lead Investigator**: Arul

## Executive Summary
Brief summary of what happened, duration, and root cause.

## Timeline of Events
- **HH:MM UTC**: Incident detected by uptime monitor.
- **HH:MM UTC**: Triage initiated.
- **HH:MM UTC**: Mitigation applied (DNS switch / git revert).
- **HH:MM UTC**: Service restored to 100%.

## Root Cause Analysis (5 Whys)
1. Why did the site fail?
2. Why did that occur?
...

## Preventative Action Items
- [ ] Add pre-deployment automated e2e visual test step to CI pipeline.
- [ ] Implement fallback static page redirect.
```
