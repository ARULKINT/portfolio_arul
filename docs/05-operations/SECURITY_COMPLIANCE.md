# Security & Compliance Policy

| Document Version | 1.0.0 |
| :--- | :--- |
| **Policy Scope** | Data Privacy, API Key Management, Content Security Policy, Threat Modeling |

---

## 1. Security Architecture Principles

1. **Client-Side Isolation**: All interactive data processing (SQL sandbox, DAG node calculations) executes entirely inside the user's browser runtime environment. Zero data is persisted to remote servers.
2. **Zero Plaintext Credentials in Client Code**: API keys (e.g. `GEMINI_API_KEY`) MUST NEVER be hardcoded in committed client-side TypeScript source files.
3. **Strict Input Sanitization**: Form inputs in the recruiter terminal (`ContactSection.tsx`) and query text in the SQL console (`SqlSandbox.tsx`) are sanitized to prevent Cross-Site Scripting (XSS).

---

## 2. Threat Modeling (STRIDE Analysis)

| STRIDE Threat Category | Potential Risk | Mitigation Applied in Codebase |
| :--- | :--- | :--- |
| **Spoofing** | Unauthorized user impersonating recruiter. | Recruiter dispatch logs are simulated locally; corporate email input requires valid standard regex email syntax. |
| **Tampering** | Modifying client-side bundle JS code. | Subresource Integrity (SRI) hashes and HTTPS TLS 1.3 enforced by edge CDN hosting provider. |
| **Repudiation** | User denies sending recruiter inquiry. | Client-side dispatch logs generate unique execution timestamp receipts. |
| **Information Disclosure** | Exposing private API keys or database connection strings. | All data is static in `portfolioData.ts`. Environment variables are loaded via `.env` and injected securely at build time. |
| **Denial of Service (DoS)** | Recruiter submission form spam. | Rate-limiting applied on form submission trigger (form locks during execution animation). |
| **Elevation of Privilege** | Gaining unauthorized access to underlying server shell. | Static SPA architecture has 0 server shell endpoints or backend file system write permissions. |

---

## 3. API Key & Environment Variable Guidelines

* Never commit `.env` files to git version control. Verify `.gitignore` contains `.env`, `.env.local`, and `*.pem`.
* The template file `.env.example` provides documentation for required variable keys (`GEMINI_API_KEY`, `APP_URL`).

---

## 4. Content Security Policy (CSP) Header Specification

When deploying to production web servers (e.g. Nginx, Cloud Run, Netlify), enforce the following security headers:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://generativelanguage.googleapis.com;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
```
