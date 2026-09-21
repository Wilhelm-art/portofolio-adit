import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(245,242,235,0.08)] bg-[var(--color-canvas-950)] mt-24 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Editorial Metadata */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[var(--color-stone-muted)]">
          <span>Adit Hardiansyah Surachman</span>
          <span className="hidden sm:inline text-[rgba(245,242,235,0.2)]">/</span>
          <span>Bandung, Jawa Barat, Indonesia</span>
          <span className="hidden sm:inline text-[rgba(245,242,235,0.2)]">/</span>
          <span className="text-[var(--color-terracotta)] font-medium">Tersedia untuk Pekerjaan</span>
        </div>

        {/* Verified Channels */}
        <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-wider">
          <a 
            href="https://github.com/Wilhelm-art" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)] transition-colors flex items-center gap-1.5"
            aria-label="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a 
            href="https://linkedin.com/in/adit-hardiansyah-surachman-b9aab1315/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)] transition-colors flex items-center gap-1.5"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <a 
            href="mailto:adithardiansyah091@gmail.com" 
            className="text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)] transition-colors flex items-center gap-1.5"
            aria-label="Send an Email"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
          <span className="text-[var(--color-stone-subtle)] text-[11px] ml-2 hidden sm:inline">
            &copy; {currentYear}
          </span>
        </div>

      </div>
    </footer>
  );
}
