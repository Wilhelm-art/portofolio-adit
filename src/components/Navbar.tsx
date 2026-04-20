import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../lib/LanguageContext';
import { useTheme } from '../lib/ThemeContext';

const navKeys = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
const NAVBAR_HEIGHT = 80;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      {
        threshold: 0.25,
        rootMargin: `-${NAVBAR_HEIGHT}px 0px 0px 0px`,
      }
    );
    navKeys.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setMobileMenu(false);
    setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }, 150);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[9999] transition-all duration-300',
        isScrolled
          ? 'bg-white/90 dark:bg-navy-900/90 backdrop-blur-md py-4 shadow-lg border-b border-slate-200 dark:border-white/5'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-12 flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="text-2xl font-bold tracking-tighter flex items-center gap-1 group bg-transparent border-none outline-none cursor-pointer"
          aria-label="Scroll to top"
        >
          <span className="text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">Adit</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-6 bg-cyan-accent inline-block"
          />
        </button>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <nav className="flex items-center gap-6 lg:gap-8">
            {navKeys.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 cursor-pointer relative group bg-transparent border-none outline-none',
                  activeSection === id
                    ? 'text-cyan-500 dark:text-cyan-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400'
                )}
              >
                {t(`nav.${id}`)}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-0.5 bg-cyan-accent transition-all duration-300',
                    activeSection === id ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-white/10">
            <button
              onClick={toggleLanguage}
              className="p-2 flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
              aria-label="Toggle Language"
            >
              <Languages size={18} />
              <span className="text-xs font-bold uppercase">{language}</span>
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="https://drive.google.com/file/d/1MH7uaqvyoAH9m9-N6185lMznZVtxhR04/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-5 py-2 bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-sm font-medium rounded-full hover:bg-electric-blue hover:text-white transition-all transform hover:scale-105"
            >
              {t('common.viewCV')}
            </a>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            type="button"
            className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-white p-2 -mr-2"
            onClick={() => setMobileMenu((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-navy-900/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col py-2 px-6">
              {navKeys.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    scrollToSection(id);
                  }}
                  className={cn(
                    'text-left w-full py-4 text-lg font-medium transition-colors duration-150',
                    'bg-transparent border-none outline-none cursor-pointer select-none',
                    'border-b border-slate-100 dark:border-white/5 last:border-b-0',
                    activeSection === id
                      ? 'text-cyan-500 dark:text-cyan-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 active:text-cyan-500 dark:active:text-cyan-400'
                  )}
                >
                  {t(`nav.${id}`)}
                </button>
              ))}

              <div className="py-4 flex flex-col gap-4">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-white/5 rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                >
                  <Languages size={20} />
                  <span>{language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}</span>
                </button>

                <a
                  href="https://drive.google.com/file/d/1MH7uaqvyoAH9m9-N6185lMznZVtxhR04/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-electric-blue text-center text-white font-semibold rounded-xl hover:bg-blue-600 active:bg-blue-700 transition-colors"
                >
                  {t('common.viewCV')}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
