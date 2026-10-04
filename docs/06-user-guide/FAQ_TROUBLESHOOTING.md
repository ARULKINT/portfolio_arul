# FAQ & Troubleshooting Guide

| Document Version | 1.0.0 |
| :--- | :--- |
| **Audience** | End Users, Maintainers, Recruiters |

---

## 1. Frequently Asked Questions (FAQ)

### Q1: Is Arul available for full-time job opportunities?
**A**: Yes! Arul is actively interviewing for entry-level and junior roles across **Data Engineering**, **Data Analytics**, and **Full-Stack Software Development**. Check the Contact section to dispatch an inquiry or copy email details.

### Q2: Is the SQL execution in `SqlSandbox.tsx` running against a live production database?
**A**: The SQL Sandbox runs an in-memory client-side execution simulation engine. This guarantees sub-5ms query response times, 100% uptime, zero remote server costs, and complete security against SQL injection.

### Q3: How do I export the resume as a PDF?
**A**: Open the **Resume Dossier** modal from the top navigation bar, then click the **Print / Save as PDF** button at the top right of the modal window.

### Q4: Can I run this portfolio application locally on my computer?
**A**: Absolutely. Follow the instructions in the [Developer Setup & Onboarding Guide](../03-engineering/DEVELOPER_SETUP.md).

---

## 2. Troubleshooting Common Issues

### Issue 1: Page theme looks incorrect or flickers on reload
* **Cause**: Browser cache retaining previous theme style preferences.
* **Resolution**: Hard refresh the page (`Ctrl + Shift + R` or `Cmd + Shift + R`) or click the theme switcher button in the header to re-sync theme state.

### Issue 2: PDF export includes background colors or modal borders
* **Cause**: Browser print background graphics setting turned off.
* **Resolution**: In your browser's Print Dialog window, make sure to check the box for **"Background graphics"** or select **"Save as PDF"**.

### Issue 3: Copy Email button is not copying to clipboard
* **Cause**: Browser blocking clipboard access due to unsecure HTTP origin.
* **Resolution**: Ensure the application is being accessed over `https://` or `localhost`.
