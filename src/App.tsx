import React, { useState, useEffect } from 'react';
import { PortfolioTheme } from './types/portfolio';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FoundationsSection } from './components/FoundationsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { AcademicsSection } from './components/AcademicsSection';
import { LeadershipSection } from './components/LeadershipSection';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState<PortfolioTheme>('cobalt');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [projectsFilter, setProjectsFilter] = useState<string>('all');

  // Sync dark class on document for obsidian theme
  useEffect(() => {
    if (theme === 'obsidian') {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0f1013';
      document.body.style.color = '#f4f2ec';
    } else {
      document.documentElement.classList.remove('dark');
      if (theme === 'rust') {
        document.body.style.backgroundColor = '#f4f2ec';
        document.body.style.color = '#141517';
      } else {
        document.body.style.backgroundColor = '#fcf9f8';
        document.body.style.color = '#1c1b1b';
      }
    }
  }, [theme]);

  const handleFilterToCategory = (category: 'engineering' | 'analytics' | 'fullstack') => {
    setProjectsFilter(category);
  };

  const getThemeWrapperClass = () => {
    if (theme === 'obsidian') {
      return 'bg-[#0f1013] text-[#f4f2ec]';
    }
    if (theme === 'rust') {
      return 'bg-[#f4f2ec] text-[#141517]';
    }
    return 'bg-[#fcf9f8] text-[#1c1b1b]';
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${getThemeWrapperClass()}`}>
      {/* Fixed Header */}
      <Header
        currentTheme={theme}
        onThemeChange={(newTheme) => setTheme(newTheme)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1 w-full pt-16">
        <HeroSection
          theme={theme}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <FoundationsSection
          theme={theme}
          onFilterToCategory={handleFilterToCategory}
        />

        <ProjectsSection
          theme={theme}
          initialFilter={projectsFilter}
        />

        <CapabilitiesSection
          theme={theme}
        />

        <ExperienceSection
          theme={theme}
        />

        <AcademicsSection
          theme={theme}
        />

        <LeadershipSection
          theme={theme}
        />

        <ContactSection
          theme={theme}
        />
      </main>

      {/* Footer */}
      <Footer theme={theme} />

      {/* Printable / Interactive Resume Modal */}
      {isResumeOpen && (
        <ResumeModal
          theme={theme}
          onClose={() => setIsResumeOpen(false)}
        />
      )}
    </div>
  );
}
