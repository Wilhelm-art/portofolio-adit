import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Search, Sun, Moon } from 'lucide-react';

export function Navbar() {
  const { t, i18n } = useTranslation();
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
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
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
            aria-label="Search ⌘K (Cari proyek dan aksi)"
            title="Search projects & actions (Ctrl+K)"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[var(--color-stone-muted)] hover:text-white text-xs font-mono transition-all"
          >
            <Search className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            <span className="hidden sm:inline text-[10px] uppercase font-semibold">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 bg-black/40 border border-white/10 rounded text-[9px] text-[var(--color-paper-100)]">
              ⌘K
            </kbd>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center border border-white/10 rounded-full p-0.5 bg-black/20" role="group" aria-label="Language selection">
            <button
              type="button"
              onClick={() => handleLanguageSwitch('id')}
              aria-label="Bahasa Indonesia (ID)"
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
              aria-label="English (EN)"
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
              <Sun className="w-4 h-4 text-amber-400 animate-fadeIn" />
            ) : (
              <Moon className="w-4 h-4 text-blue-500 animate-fadeIn" />
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
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
