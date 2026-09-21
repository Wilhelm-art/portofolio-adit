import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isEnglish = location.pathname.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';

  const navLinks = [
    { name: t('nav.home'), path: `${basePath}/`, exact: true },
    { name: t('nav.about'), path: `${basePath}/about` },
    { name: t('nav.projects'), path: `${basePath}/projects` },
    { name: t('nav.resume'), path: `${basePath}/resume` },
    { name: t('nav.contact'), path: `${basePath}/contact` },
  ];

  const handleLanguageSwitch = (targetLang: 'id' | 'en') => {
    if (targetLang === 'en' && !isEnglish) {
      i18n.changeLanguage('en');
      const newPath = `/en${location.pathname === '/' ? '' : location.pathname}`;
      navigate(newPath);
    } else if (targetLang === 'id' && isEnglish) {
      i18n.changeLanguage('id');
      const newPath = location.pathname.replace(/^\/en/, '') || '/';
      navigate(newPath);
    }
  };

  const isLinkActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path || (path === '/' && location.pathname === '');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[var(--color-canvas-950)]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Wordmark with Full Name */}
          <Link 
            to={`${basePath}/`} 
            className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-sm"
          >
            <span className="w-8 h-8 rounded bg-[var(--color-canvas-850)] border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors">
              A
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-[var(--color-paper-50)] group-hover:text-[var(--color-accent)] transition-colors">
                Adit Hardiansyah Surachman
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-stone-muted)]">
                Software & Systems
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => {
                const active = isLinkActive(link.path, link.exact);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-xs font-mono uppercase tracking-widest transition-colors py-1 relative ${
                      active
                        ? 'text-[var(--color-paper-50)] font-semibold'
                        : 'text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)]'
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--color-accent)] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center border border-white/10 rounded p-0.5 bg-[var(--color-canvas-900)]" role="group" aria-label="Language selection">
              <button
                type="button"
                onClick={() => handleLanguageSwitch('id')}
                aria-pressed={!isEnglish}
                className={`px-2.5 py-1 text-[11px] font-mono uppercase font-semibold transition-all rounded active:scale-[0.98] ${
                  !isEnglish 
                    ? 'bg-[var(--color-canvas-800)] text-[var(--color-accent)] shadow-sm' 
                    : 'text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)]'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch('en')}
                aria-pressed={isEnglish}
                className={`px-2.5 py-1 text-[11px] font-mono uppercase font-semibold transition-all rounded active:scale-[0.98] ${
                  isEnglish 
                    ? 'bg-[var(--color-canvas-800)] text-[var(--color-accent)] shadow-sm' 
                    : 'text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)]'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <div className="flex items-center border border-white/10 rounded p-0.5 bg-[var(--color-canvas-900)] mr-2">
              <button
                type="button"
                onClick={() => handleLanguageSwitch('id')}
                className={`px-2 py-0.5 text-[10px] font-mono uppercase font-semibold rounded ${
                  !isEnglish ? 'bg-[var(--color-canvas-800)] text-[var(--color-accent)]' : 'text-[var(--color-stone-muted)]'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch('en')}
                className={`px-2 py-0.5 text-[10px] font-mono uppercase font-semibold rounded ${
                  isEnglish ? 'bg-[var(--color-canvas-800)] text-[var(--color-accent)]' : 'text-[var(--color-stone-muted)]'
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isOpen}
              className="p-2 text-[var(--color-paper-50)] border border-white/10 rounded bg-[var(--color-canvas-900)] active:scale-[0.95] transition-transform"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-b border-white/10 bg-[var(--color-canvas-900)] px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path, link.exact);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-xs font-mono uppercase tracking-widest rounded transition-colors ${
                  active
                    ? 'bg-[var(--color-canvas-800)] text-[var(--color-paper-50)] font-semibold border-l-2 border-[var(--color-accent)]'
                    : 'text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
