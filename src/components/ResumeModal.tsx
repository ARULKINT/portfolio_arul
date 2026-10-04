import React from 'react';
import { PortfolioTheme } from '../types/portfolio';

interface ResumeModalProps {
  theme: PortfolioTheme;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ theme, onClose }) => {
  const isLight = theme === 'light';
  const textPrimary = isLight ? 'text-[#0040da]' : 'text-sky-400';

  // Primary uploaded resume path in public/resume/
  const uploadedDocxPath = './resume/Arul_Resume_Data_Analyst_Data_Engineer-1.docx';
  const uploadedPdfPath = './resume/resume.pdf';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/90 print:hidden gap-3">
          <div className="flex items-center gap-3">
            <span className={`material-symbols-outlined text-[22px] ${textPrimary}`}>description</span>
            <span className="font-mono text-xs font-bold uppercase text-neutral-800 dark:text-neutral-200">
              Uploaded Resume Document // Arul G.
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            {/* Direct Download Buttons */}
            <a
              href={uploadedDocxPath}
              download
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold uppercase text-[11px] tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Download latest DOCX file from resume/ folder"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download DOCX 📥</span>
            </a>

            <a
              href={uploadedPdfPath}
              download
              className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded font-bold uppercase text-[11px] tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Download latest PDF file from resume/ folder"
            >
              <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
              <span>Download PDF 📥</span>
            </a>

            <button
              onClick={onClose}
              className="p-1 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer ml-2"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>
        </div>

        {/* Uploaded File Preview Panel */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-neutral-100 dark:bg-neutral-950 flex-1">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg border border-neutral-300 dark:border-neutral-700 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-4xl text-sky-500">
                  description
                </span>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    Arul G. — Latest Resume Upload
                  </h3>
                  <p className="text-xs font-mono text-neutral-500">
                    Location: /resume/Arul_Resume_Data_Analyst_Data_Engineer-1.docx
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={uploadedDocxPath}
                  download
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Download File</span>
                </a>
              </div>
            </div>

            {/* Document Preview & Instructions */}
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-2 font-mono">
              <p className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-emerald-500">check_circle</span>
                <span>Automatic Resume Synchronization Enabled</span>
              </p>
              <p>
                Any updated resume document (PDF or DOCX) uploaded to <code className="bg-neutral-200 dark:bg-neutral-700 px-1 py-0.5 rounded text-sky-600 dark:text-sky-300">c:\drive g\portfolio\arul_portfolio-3\resume\</code> will automatically sync and serve here upon deployment.
              </p>
            </div>

            {/* Embedded Document Frame Viewer */}
            <div className="w-full h-[500px] bg-neutral-200 dark:bg-neutral-800 rounded border border-neutral-300 dark:border-neutral-700 overflow-hidden flex flex-col items-center justify-center relative p-2 text-center">
              <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent('https://ARULKINT.github.io/portfolio_arul/resume/Arul_Resume_Data_Analyst_Data_Engineer-1.docx')}`}
                className="w-full h-full rounded border-0"
                title="Uploaded Resume Document Preview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
