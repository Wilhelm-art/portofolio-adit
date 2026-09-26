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
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[var(--color-canvas-950)]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Wordmark with Monogram Logo "A" */}
          <Link 
            to={`${basePath}/`} 
            className="flex items-center gap-3.5 group focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-lg"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-white/12 via-white/6 to-white/2 border border-white/15 flex items-center justify-center shadow-inner group-hover:border-[var(--color-accent)] group-hover:scale-105 transition-all">
              <span className="font-serif italic text-lg font-bold text-[var(--color-paper-50)] group-hover:text-[var(--color-accent)] transition-colors select-none">
                A
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--color-accent)] ring-2 ring-[var(--color-canvas-950)]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-[var(--color-paper-50)] group-hover:text-[var(--color-accent)] transition-colors">
                Adit Hardiansyah
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-stone-muted)]">
                Software & Security
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
                    className={`text-xs font-mono uppercase tracking-wider transition-colors py-1 relative ${
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
            <div className="flex items-center border border-white/[0.08] rounded p-0.5 bg-[var(--color-canvas-900)]" role="group" aria-label="Language selection">
              <button
                type="button"
                onClick={() => handleLanguageSwitch('id')}
                aria-label="ID - Pilih Bahasa Indonesia"
                aria-pressed={!isEnglish}
                className={`px-2.5 py-1 text-[11px] font-mono uppercase font-semibold transition-all rounded active:scale-[0.98] ${
                  !isEnglish 
                    ? 'bg-[var(--color-canvas-800)] text-[var(--color-paper-50)] shadow-sm' 
                    : 'text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)]'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch('en')}
                aria-label="EN - Switch to English"
                aria-pressed={isEnglish}
                className={`px-2.5 py-1 text-[11px] font-mono uppercase font-semibold transition-all rounded active:scale-[0.98] ${
                  isEnglish 
                    ? 'bg-[var(--color-canvas-800)] text-[var(--color-paper-50)] shadow-sm' 
                    : 'text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)]'
                }`}
              >
                EN
              </button>
            </div>

            {/* Hire Me Pill CTA */}
            <Link
              to={`${basePath}/contact`}
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.04] hover:bg-[var(--color-paper-50)] text-[var(--color-paper-50)] hover:text-[var(--color-canvas-950)] text-xs font-mono font-medium transition-all active:scale-[0.98] shadow-sm"
            >
              {isEnglish ? 'Hire Me' : 'Hubungi'}
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center border border-white/[0.08] rounded p-0.5 bg-[var(--color-canvas-900)]" role="group" aria-label="Language selection">
              <button
                type="button"
                onClick={() => handleLanguageSwitch('id')}
                aria-label="ID - Pilih Bahasa Indonesia"
                className={`min-h-[38px] px-2.5 text-xs font-mono uppercase font-semibold rounded flex items-center justify-center transition-all ${
                  !isEnglish ? 'bg-[var(--color-canvas-800)] text-[var(--color-paper-50)]' : 'text-[var(--color-stone-muted)]'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch('en')}
                aria-label="EN - Switch to English"
                className={`min-h-[38px] px-2.5 text-xs font-mono uppercase font-semibold rounded flex items-center justify-center transition-all ${
                  isEnglish ? 'bg-[var(--color-canvas-800)] text-[var(--color-paper-50)]' : 'text-[var(--color-stone-muted)]'
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={isOpen}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--color-paper-50)] border border-white/[0.08] rounded bg-[var(--color-canvas-900)] active:scale-[0.95] transition-transform"
            >
              {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[var(--color-canvas-900)] px-4 py-4 space-y-1.5 animate-in fade-in duration-200">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path, link.exact);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`min-h-[44px] flex items-center px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider rounded transition-colors active:scale-[0.98] ${
                  active
                    ? 'bg-[var(--color-canvas-800)] text-[var(--color-paper-50)] font-semibold border-l-2 border-[var(--color-accent)]'
                    : 'text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)] hover:bg-[var(--color-canvas-850)]'
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
