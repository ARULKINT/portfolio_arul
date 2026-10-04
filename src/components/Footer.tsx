import React from 'react';
import { PortfolioTheme } from '../types/portfolio';

interface FooterProps {
  theme: PortfolioTheme;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const isRust = theme === 'rust';
  const textPrimary = isRust ? 'text-[#d9480f]' : 'text-[#0040da]';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-neutral-100/80 dark:bg-neutral-900 border-t border-neutral-300 dark:border-neutral-800 transition-colors">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase font-bold text-neutral-900 dark:text-white">
              Arul S.
            </span>
            <span className="text-neutral-400 font-mono text-xs">//</span>
            <span className={`font-mono text-xs font-semibold ${textPrimary}`}>
              v4.1.0-prod [sys:ready]
            </span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            © 2026 Arul. Architected for resilient scale, computational clarity, and engineering rigor.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-neutral-600 dark:text-neutral-400">
          <a
            href="https://github.com/arul-dev"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">terminal</span>
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">work</span>
            <span>LinkedIn</span>
          </a>
          <a
            href="https://leetcode.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">code</span>
            <span>LeetCode</span>
          </a>
          <a
            href="#contact"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">mail</span>
            <span>Contact</span>
          </a>
          <button
            onClick={scrollToTop}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer pl-2 border-l border-neutral-300 dark:border-neutral-700"
            title="Scroll to top of page"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
