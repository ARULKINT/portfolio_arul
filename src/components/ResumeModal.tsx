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
    const resumeText = `ARUL G. - DATA ENGINEER · DATA ANALYST · FULL-STACK DEVELOPER
Location: India | Email: aruldme004@gmail.com
LinkedIn: linkedin.com/in/arul-eng | GitHub: github.com/ARULKINT

SUMMARY:
Computer Science Engineering graduate focused on data engineering, analytics, and full-stack software development. Built data workflows, analytics solutions, and business applications, emphasizing practical implementation, data quality, and maintainable systems. Uses AI-assisted tools (Claude Code, Gemini API) to accelerate development while reviewing and validating results.

EDUCATION:
- B.Tech in Computer Science Engineering (Lateral Entry) | Rajiv Gandhi College of Engineering & Technology, Pondicherry University (2023–2026) — Result: 7.8/10 GPA
- Diploma in Mechanical Engineering | Annai Velankanni Polytechnic College, Panruti (2018–2021) — Result: 78%

PROFESSIONAL EXPERIENCE:
Junior Engineer Trainee | Asara Pvt Ltd (Bangalore, India | Jan 2022 – May 2023)
- Worked in an industrial operations environment, supporting physical inventory management and daily operational reporting.
- Coordinated seamlessly with production, dispatch, and quality teams across rotating work shifts.

TECHNICAL SKILLS:
- Strong: Python, SQL, PostgreSQL
- Working / Learning: PySpark, Apache Spark, Apache Airflow, FastAPI
- Learning: dbt, Apache Kafka
- Additional Tools: C++, MySQL, MongoDB, Linux, Pandas, Hadoop, Hive, JavaScript, TypeScript, Node.js, React, Next.js, Prisma, Docker, Git, GitHub, Power BI, DAX, HTML, CSS, Figma

FEATURED PROJECTS:
1. Weather Data Engineering Pipeline: API-based PySpark ingestion collecting weather observations across 7 Indian cities into PostgreSQL via JDBC in Docker. (github.com/ARULKINT/weather_data_eng)
2. CommercePulse — E-commerce Data Architecture: End-to-end e-commerce pipeline processing order ingestion, data quality checks, and star schema transformations with Airflow.
3. Rowdesk CRM: Deployed workflow platform with Next.js, Prisma, Neon PostgreSQL, Zod validation, and Google Drive OAuth. (crm-fx2.vercel.app | github.com/ARULKINT/rowdesk)
4. Lead Acquisition Funnel Analytics: Analytics examining 360 Google Maps scraped leads and 2,192 call records using Power BI & DAX.
5. Hello Mobiles CRM: FastAPI & PostgreSQL CRM MVP for mobile repair workflows, billing, and customer records. (hello-mobiles-crm.vercel.app | github.com/ARULKINT/hello-mobiles-crm)
6. Forge & Flint: Founder. Web solutions initiative for business billing, inventory, and digital tools. (forgeandflint.in)

LEADERSHIP & ACTIVITIES:
- College Student President (Led student body council & major campus initiatives)
- Class Representative (Primary academic liaison for cohort)
- Design Team Leadership (Visual branding & college event coordination)
- Competitive Kabaddi Player (Regional tournaments, high-pressure execution)`;

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
              Curriculum Vitae // Arul G. (2026 Profile Edition)
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
              className="p-1 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
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
                <h1 className="text-2xl font-bold tracking-tight">ARUL G.</h1>
                <p className={`font-mono text-xs font-bold tracking-wider mt-0.5 ${textPrimary}`}>
                  DATA ENGINEER · DATA ANALYST · FULL-STACK DEVELOPER
                </p>
              </div>
              <div className="text-right text-xs font-mono text-neutral-600 dark:text-neutral-400 space-y-0.5">
                <p>India</p>
                <p>aruldme004@gmail.com</p>
                <p>github.com/ARULKINT · linkedin.com/in/arul-eng</p>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1 border-b border-neutral-200 dark:border-neutral-800 pb-1">
              About &amp; Summary
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed pt-1">
              Computer Science Engineering graduate focused on data engineering, analytics, and full-stack software development. Experienced in building data workflows, analytics solutions, and business applications, emphasizing practical implementation, data quality, and maintainable systems. Leverages AI-assisted tools (Claude Code, Gemini API) to accelerate execution while conducting direct code review and validation.
            </p>
          </div>

          {/* Technical Capabilities */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 border-b border-neutral-200 dark:border-neutral-800 pb-1">
              Technical Skills &amp; Stack
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <strong className="font-semibold text-neutral-900 dark:text-white">Strong:</strong> Python, SQL, PostgreSQL
              </div>
              <div>
                <strong className="font-semibold text-neutral-900 dark:text-white">Working / Learning:</strong> PySpark, Apache Spark, Apache Airflow, FastAPI
              </div>
              <div>
                <strong className="font-semibold text-neutral-900 dark:text-white">Learning:</strong> dbt, Apache Kafka, Cloud Data Platforms
              </div>
              <div>
                <strong className="font-semibold text-neutral-900 dark:text-white">Full-Stack &amp; Tools:</strong> JavaScript, TypeScript, React, Next.js, Node.js, Express, Docker, Git, Power BI, DAX
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 border-b border-neutral-200 dark:border-neutral-800 pb-1">
              Industry Experience
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
                  <li>Worked in an industrial operations environment supporting physical inventory management and daily operational reporting.</li>
                  <li>Coordinated seamlessly between production personnel, logistics dispatch, and quality assurance teams across rotating work shifts.</li>
                  <li>Monitored daily operations activities to prevent unplanned line delays and track stock counts.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Featured Engineering Work */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 border-b border-neutral-200 dark:border-neutral-800 pb-1">
              Featured Projects
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold">
                  <span>Weather Data Engineering Pipeline (Python, PySpark, PostgreSQL, OpenWeather API, Docker)</span>
                  <span className="font-mono text-[11px] text-emerald-600">7 Cities Streamed</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                  API-based pipeline collecting weather observations for Indian cities and persisting records into PostgreSQL via JDBC inside Docker.
                </p>
              </div>

              <div>
                <div className="flex justify-between font-bold">
                  <span>Rowdesk — CRM Platform (Next.js, Prisma, Neon PostgreSQL, Zod, Vitest)</span>
                  <span className="font-mono text-[11px] text-emerald-600">Live Deployed</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                  Workflow application with structured follow-ups, Zod input validation, Google Drive OAuth integration, and deployed on Vercel.
                </p>
              </div>

              <div>
                <div className="flex justify-between font-bold">
                  <span>CommercePulse — E-commerce Architecture (PySpark, PostgreSQL, Airflow, Power BI)</span>
                  <span className="font-mono text-[11px] text-emerald-600">Star Schema ETL</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                  Documented end-to-end data engineering platform processing order ingestion, validation checks, and Airflow orchestration.
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
                  <p className="font-bold">B.Tech in Computer Science and Engineering (Lateral Entry)</p>
                  <p className="text-neutral-600 dark:text-neutral-400">Rajiv Gandhi College of Engineering and Technology (Pondicherry University)</p>
                </div>
                <div className="text-right font-mono text-xs text-neutral-500">
                  <p>2023 – 2026</p>
                  <p className="text-emerald-600 font-bold">7.8 / 10 GPA</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">Diploma in Mechanical Engineering</p>
                  <p className="text-neutral-600 dark:text-neutral-400">Annai Velankanni Polytechnic College, Panruti</p>
                </div>
                <div className="text-right font-mono text-xs text-neutral-500">
                  <p>2018 – 2021</p>
                  <p className="text-emerald-600 font-bold">78%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
