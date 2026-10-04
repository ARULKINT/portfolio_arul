import React, { useState } from 'react';
import { PortfolioTheme } from '../types/portfolio';

interface ResumeModalProps {
  theme: PortfolioTheme;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ theme, onClose }) => {
  const [copied, setCopied] = useState(false);

  const isRust = theme === 'rust';
  const textPrimary = isRust ? 'text-[#d9480f]' : 'text-[#0040da]';
  const btnDownload = isRust ? 'bg-[#d9480f] hover:bg-[#b42902]' : 'bg-[#0040da] hover:bg-[#0036bc]';

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `ARUL S. - DATA ENGINEER & FULL-STACK DEVELOPER
Location: Tamil Nadu, India | Email: arul.engineer.dev@placeholder.com
LinkedIn: linkedin.com/in/arul-engineer | GitHub: github.com/arul-dev

SUMMARY:
Early-career Data Engineer and Full-Stack Developer with hands-on industrial operations roots. Proven track record designing high-throughput ETL pipelines, relational data warehouses (star schema), real-time operational analytics, and resilient web applications.

EDUCATION:
- B.Tech in Computer Science and Engineering (2023 - 2026, Pondicherry University)
- Diploma in Mechanical Engineering (2018 - 2021, Annai Velankanni Polytechnic)

TECHNICAL SKILLS:
- Languages: Python, SQL (PostgreSQL, MySQL, ANSI), JavaScript (ES6+), C++
- Data Engineering: Apache Spark, PySpark, Airflow, Hadoop, Hive, Kafka, ETL/ELT
- Data Analytics: Pandas, NumPy, Power BI, Excel Modeling, Time-Series Forecasting
- Full-Stack & Platforms: Node.js, Express, React, Next.js, Docker, Linux, Git

PROFESSIONAL EXPERIENCE:
Junior Engineer Trainee | Asara Pvt Ltd (Bangalore, India | Jan 2022 - May 2023)
- Supported operational inventory management and daily departmental reporting across shifts.
- Maintained physical-to-digital inventory variance audits before ERP batch closing.
- Monitored live shop floor activities, preventing unplanned line stoppages.

FEATURED PROJECTS:
1. Enterprise Telemetry & ETL Pipeline: Automated PySpark Kafka ingestion, date/node partitioning, 78% faster analytical queries.
2. Production Operations Analytics Engine: SQL staging warehouse & Power BI dashboard driving 14.2% scrap reduction.
3. Distributed Data Warehouse Schema: Airflow DAGs orchestrating SCD Type 2 dimension updates and fact transactions.
4. Cross-Platform Operations Management Portal: Full-stack Next.js/PostgreSQL application with role-based audit signoffs.

LEADERSHIP & ATHLETICS:
- College Student President (Represented student council & led campus initiatives)
- Class Representative (Primary academic faculty liaison)
- Competitive Kabaddi Athlete (Regional tournaments, tactical coordination under pressure)`;

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/90 print:hidden">
          <div className="flex items-center gap-2">
            <span className={`material-symbols-outlined text-[20px] ${textPrimary}`}>description</span>
            <span className="font-mono text-xs font-bold uppercase text-neutral-800 dark:text-neutral-200">
              Curriculum Vitae // Arul S. (2026 Production Edition)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-2.5 py-1 text-xs font-mono rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">content_copy</span>
              <span>{copied ? 'Copied!' : 'Copy Plaintext'}</span>
            </button>
            <button
              onClick={handlePrint}
              className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-white rounded transition-colors flex items-center gap-1 cursor-pointer ${btnDownload}`}
            >
              <span className="material-symbols-outlined text-[15px]">print</span>
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>

        {/* Formatted Printable Resume Paper Body */}
        <div className="p-8 overflow-y-auto font-sans text-neutral-900 dark:text-neutral-100 space-y-6 text-sm leading-relaxed bg-white dark:bg-neutral-950">
          {/* Header Lockup */}
          <div className="border-b pb-4 border-neutral-300 dark:border-neutral-800">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">ARUL S.</h1>
                <p className={`font-mono text-xs font-bold tracking-wider mt-0.5 ${textPrimary}`}>
                  DATA ENGINEER &amp; FULL-STACK DEVELOPER
                </p>
              </div>
              <div className="text-right text-xs font-mono text-neutral-600 dark:text-neutral-400 space-y-0.5">
                <p>Tamil Nadu, India</p>
                <p>arul.engineer.dev@placeholder.com</p>
                <p>github.com/arul-dev · linkedin.com/in/arul-engineer</p>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1 border-b border-neutral-200 dark:border-neutral-800 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed pt-1">
              Early-career Data Engineer and Full-Stack Developer with hands-on industrial operations roots. Experienced in designing resilient ETL streaming pipelines with PySpark and Kafka, architecting multi-tier relational data warehouses, engineering operational web applications in React and Node.js, and executing physical-to-digital inventory variance audits.
            </p>
          </div>

          {/* Technical Capabilities */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 border-b border-neutral-200 dark:border-neutral-800 pb-1">
              Technical Capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <strong className="font-semibold text-neutral-900 dark:text-white">Programming:</strong> Python, SQL (PostgreSQL, ANSI), JavaScript (ES6+), C++
              </div>
              <div>
                <strong className="font-semibold text-neutral-900 dark:text-white">Data Engineering:</strong> Apache Spark, PySpark, Airflow, Hadoop, Hive, ETL/ELT
              </div>
              <div>
                <strong className="font-semibold text-neutral-900 dark:text-white">Analytics &amp; BI:</strong> Pandas, NumPy, Power BI, Advanced Excel Modeling
              </div>
              <div>
                <strong className="font-semibold text-neutral-900 dark:text-white">Full-Stack &amp; DevOps:</strong> Node.js, React, Next.js, Docker, Linux, REST APIs
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 border-b border-neutral-200 dark:border-neutral-800 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Junior Engineer Trainee</h3>
                  <span className="font-mono text-xs text-neutral-500">Jan 2022 – May 2023</span>
                </div>
                <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Asara Pvt Ltd • Bangalore, India
                </p>
                <ul className="list-disc list-inside text-xs text-neutral-700 dark:text-neutral-300 space-y-1">
                  <li>Supported physical-to-digital inventory variance audits across manufacturing shifts before ERP batch closing.</li>
                  <li>Coordinated live reporting between production lines, quality assurance, and outbound dispatch logistics.</li>
                  <li>Maintained shift dispatch checklists, ensuring proactive tool and buffer stock availability.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Engineering Projects */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 border-b border-neutral-200 dark:border-neutral-800 pb-1">
              Featured Engineering Work
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold">
                  <span>Enterprise Telemetry &amp; ETL Pipeline (PySpark, Kafka, PostgreSQL, Docker)</span>
                  <span className="font-mono text-[11px] text-emerald-600">78% Faster Query Scans</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                  Engineered streaming log ingest pipeline parsing semi-structured IoT packets, validating constraints, and staging partitioned Parquet files.
                </p>
              </div>

              <div>
                <div className="flex justify-between font-bold">
                  <span>Production Operations &amp; Inventory Analytics Engine (Python, SQL, Power BI)</span>
                  <span className="font-mono text-[11px] text-emerald-600">14.2% Scrap Reduction</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                  Designed relational staging schema and executive dashboards monitoring scrap variance and inventory shrinkage across 3 manufacturing shifts.
                </p>
              </div>

              <div>
                <div className="flex justify-between font-bold">
                  <span>Cross-Platform Operations Management Portal (Next.js, Node.js, PostgreSQL)</span>
                  <span className="font-mono text-[11px] text-emerald-600">100% Paperless Audits</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                  Full-stack portal handling shift dispatch authorizations, cryptographic role-based signoffs, and audit history.
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 border-b border-neutral-200 dark:border-neutral-800 pb-1">
              Education
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">B.Tech in Computer Science and Engineering</p>
                  <p className="text-neutral-600 dark:text-neutral-400">Rajiv Gandhi College of Engineering and Technology (Pondicherry University)</p>
                </div>
                <span className="font-mono text-xs text-neutral-500">2023 – 2026</span>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">Diploma in Mechanical Engineering</p>
                  <p className="text-neutral-600 dark:text-neutral-400">Annai Velankanni Polytechnic College</p>
                </div>
                <span className="font-mono text-xs text-neutral-500">2018 – 2021</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
