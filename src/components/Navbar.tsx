import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Theme toggle state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (next === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
      try {
        localStorage.setItem('theme', next);
      } catch (_) {}
      return next;
    });
  };

  const isEnglish = location.pathname.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';
  const isHome = location.pathname === '/' || location.pathname === '/en' || location.pathname === '/en/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: isEnglish ? 'WORK' : 'KARYA', href: isHome ? '#work' : `${basePath}/#work` },
    { name: isEnglish ? 'WHAT I CAN DO' : 'KEAHLIAN', href: isHome ? '#what-i-can-do' : `${basePath}/#what-i-can-do` },
    { name: isEnglish ? 'ABOUT' : 'TENTANG', href: isHome ? '#about' : `${basePath}/#about` },
    { name: isEnglish ? 'AWARDS' : 'PENGHARGAAN', href: isHome ? '#awards' : `${basePath}/#awards` },
    { name: 'RESUME', href: `${basePath}/resume` },
  ];

  const handleLanguageSwitch = async (targetLang: 'id' | 'en') => {
    const { default: i18n } = await import('../i18n');
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

  return (
    <header className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl transition-all duration-300">
      <nav 
        className={`w-full rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between border ${
          scrolled
            ? 'bg-[var(--color-canvas-900)]/90 backdrop-blur-xl border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
            : 'bg-[var(--color-canvas-900)]/75 backdrop-blur-lg border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
        }`}
      >
        {/* Brand Monogram "A" Logo */}
        <Link 
          to={`${basePath}/`} 
          className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-full"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-white/15 via-white/8 to-white/2 border border-white/20 flex items-center justify-center shadow-inner group-hover:border-[var(--color-accent)] group-hover:scale-105 transition-all">
            <span className="font-serif italic text-base sm:text-lg font-bold text-[var(--color-paper-50)] group-hover:text-[var(--color-accent)] transition-colors select-none">
              A
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--color-accent)] ring-2 ring-[var(--color-canvas-950)]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold tracking-tight text-[var(--color-paper-50)] group-hover:text-[var(--color-accent)] transition-colors">
              ADIT
            </span>
            <span className="hidden sm:block text-[9px] font-mono tracking-widest text-[var(--color-stone-muted)] uppercase">
              ENGINEER
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((link) => {
            const isAnchor = link.href.includes('#');
            if (isAnchor) {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)] transition-colors py-1 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--color-accent)] group-hover:w-full transition-all duration-200" />
                </a>
              );
            }
            return (
              <Link
                key={link.name}
                to={link.href}
                className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)] transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--color-accent)] group-hover:w-full transition-all duration-200" />
              </Link>
            );
          })}
        </div>

        {/* Right Actions: Search + Lang + Hire Me CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Search / Command Palette Pill */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-palette'))}
            aria-label="Search ⌘K"
            title="Search projects & actions (Ctrl+K)"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[var(--color-stone-muted)] hover:text-white text-xs font-mono transition-all"
          >
            <SearchIcon className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            <span className="hidden sm:inline text-[10px] uppercase font-semibold">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 bg-black/40 border border-white/10 rounded text-[9px] text-[var(--color-paper-100)]" aria-hidden="true">
              ⌘K
            </kbd>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center border border-white/10 rounded-full p-0.5 bg-black/20" role="group" aria-label="Language selection">
            <button
              type="button"
              onClick={() => handleLanguageSwitch('id')}
              aria-label="ID - Bahasa Indonesia"
              className={`px-2 sm:px-2.5 py-1 text-[10px] font-mono uppercase font-semibold rounded-full transition-all ${
                !isEnglish 
                  ? 'bg-white/15 text-white shadow-sm' 
                  : 'text-[var(--color-stone-muted)] hover:text-white'
              }`}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => handleLanguageSwitch('en')}
              aria-label="EN - English"
              className={`px-2 sm:px-2.5 py-1 text-[10px] font-mono uppercase font-semibold rounded-full transition-all ${
                isEnglish 
                  ? 'bg-white/15 text-white shadow-sm' 
                  : 'text-[var(--color-stone-muted)] hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Theme Toggle Button (Sun / Moon) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
            className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 flex items-center justify-center text-[var(--color-stone-muted)] hover:text-white transition-all active:scale-95"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-4 h-4 text-amber-400 animate-fadeIn" />
            ) : (
              <MoonIcon className="w-4 h-4 text-blue-500 animate-fadeIn" />
            )}
          </button>

          {/* Hire Me CTA Button */}
          {isHome ? (
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black text-[var(--color-paper-50)] text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm"
            >
              {isEnglish ? 'Hire Me' : 'Hire Me'}
            </a>
          ) : (
            <Link
              to={`${basePath}/#contact`}
              className="inline-flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black text-[var(--color-paper-50)] text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm"
            >
              {isEnglish ? 'Hire Me' : 'Hire Me'}
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            className="md:hidden w-8 h-8 flex items-center justify-center text-white border border-white/10 rounded-full bg-white/5 active:scale-95 transition-all ml-0.5"
          >
            {isOpen ? <CloseIcon className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Panel */}
      {isOpen && (
        <div className="md:hidden mt-2 rounded-2xl bg-[var(--color-canvas-900)]/95 backdrop-blur-xl border border-white/15 p-4 shadow-2xl space-y-2 animate-slideUp">
          {navLinks.map((link) => {
            const isAnchor = link.href.includes('#');
            if (isAnchor) {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-[var(--color-stone-muted)] hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.name}
                </a>
              );
            }
            return (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-[var(--color-stone-muted)] hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
