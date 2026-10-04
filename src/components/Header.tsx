import React, { useState, useEffect } from 'react';
import { PortfolioTheme } from '../types/portfolio';

interface HeaderProps {
  currentTheme: PortfolioTheme;
  onThemeChange: (theme: PortfolioTheme) => void;
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTheme, onThemeChange, onOpenResume }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('selected-work');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['about', 'projects', 'capabilities', 'experience', 'academics', 'leadership', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Selected Work', href: '#projects', id: 'projects' },
    { label: 'Capabilities', href: '#capabilities', id: 'capabilities' },
    { label: 'Background', href: '#experience', id: 'experience' },
    { label: 'Connect', href: '#contact', id: 'contact' },
  ];

  const getThemeClasses = () => {
    if (currentTheme === 'light') {
      return {
        headerBg: scrolled ? 'bg-white/95 border-neutral-300' : 'bg-white border-neutral-200',
        textPrimary: 'text-[#0040da]',
        activeBorder: 'border-[#0040da] text-[#0040da]',
        btnPrimary: 'bg-neutral-900 text-white hover:bg-sky-600 border-transparent',
        pillBg: 'bg-neutral-100 border-neutral-300 text-neutral-800',
      };
    }
    // Default obsidian (dark mode)
    return {
      headerBg: scrolled ? 'bg-[#121316]/95 border-[#2a2c32]' : 'bg-[#121316] border-[#2a2c32]',
      textPrimary: 'text-sky-400',
      activeBorder: 'border-sky-400 text-sky-400',
      btnPrimary: 'bg-[#1f2229] text-white hover:bg-sky-600 border-[#373b47]',
      pillBg: 'bg-[#181a20] border-[#2a2c32] text-[#9ca3af]',
    };
  };

  const themeStyle = getThemeClasses();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-200 ${themeStyle.headerBg}`}>
      <div className="h-16 max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark Brand */}
        <div className="flex items-center gap-3 min-w-0">
          <a href="#" className="flex items-center gap-1.5 text-inherit transition-colors shrink-0 group">
            <span className={`font-mono text-xs font-bold tracking-wider uppercase ${themeStyle.textPrimary}`}>
              [ENG_SYS]
            </span>
            <span className="text-lg font-bold tracking-tight">
              Arul <span className="opacity-40 font-normal">/</span> Portfolio
            </span>
          </a>

          {/* Availability Status Badge */}
          <div className={`hidden xl:flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono tracking-wider border shadow-2xs ${themeStyle.pillBg}`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentTheme === 'light' ? 'bg-indigo-600' : 'bg-emerald-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${currentTheme === 'light' ? 'bg-indigo-600' : 'bg-emerald-400'}`}></span>
            </span>
            <span className="uppercase text-[11px] font-medium">Available for Full-time Roles</span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`py-1 text-sm font-medium transition-colors ${
                  isActive
                    ? `font-semibold border-b-2 ${themeStyle.activeBorder}`
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Theme Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Interactive Theme Switcher (Dark vs Light) */}
          <div className="hidden sm:flex items-center p-0.5 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono">
            <button
              onClick={() => onThemeChange('obsidian')}
              title="Switch to Dark theme (Default)"
              className={`px-2.5 py-0.5 rounded transition-all cursor-pointer ${
                currentTheme === 'obsidian'
                  ? 'bg-neutral-900 text-sky-400 font-bold shadow-2xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              🌙 Dark
            </button>
            <button
              onClick={() => onThemeChange('light')}
              title="Switch to Light theme (High contrast)"
              className={`px-2.5 py-0.5 rounded transition-all cursor-pointer ${
                currentTheme === 'light'
                  ? 'bg-white text-neutral-900 font-bold shadow-2xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              ☀️ Light
            </button>
          </div>

          {/* Download Resume Action */}
          <button
            onClick={onOpenResume}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider rounded transition-all duration-150 border cursor-pointer ${themeStyle.btnPrimary}`}
          >
            <span className="material-symbols-outlined text-[16px]">description</span>
            <span className="hidden sm:inline">Download Resume</span>
            <span className="sm:hidden">Resume</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/98 dark:bg-neutral-900/98 px-4 py-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-500">
            <span>THEME SETTING</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onThemeChange('obsidian')}
                className={`px-2.5 py-0.5 rounded text-xs cursor-pointer ${currentTheme === 'obsidian' ? 'bg-sky-600 text-white font-bold' : 'bg-neutral-100 dark:bg-neutral-800'}`}
              >
                🌙 Dark
              </button>
              <button
                onClick={() => onThemeChange('light')}
                className={`px-2.5 py-0.5 rounded text-xs cursor-pointer ${currentTheme === 'light' ? 'bg-neutral-900 text-white font-bold' : 'bg-neutral-100 dark:bg-neutral-800'}`}
              >
                ☀️ Light
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? `${currentTheme === 'light' ? 'bg-indigo-50 text-indigo-700' : 'bg-sky-950/80 text-sky-300'} font-semibold`
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className={`w-full py-2.5 px-4 font-mono text-xs uppercase tracking-wider rounded text-center flex items-center justify-center gap-2 ${themeStyle.btnPrimary}`}
            >
              <span className="material-symbols-outlined text-[16px]">description</span>
              <span>View &amp; Download Printable Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
