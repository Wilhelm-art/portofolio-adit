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
          ? 'bg-white/40 dark:bg-[#030712]/40 backdrop-blur-md py-4 shadow-sm border-b border-slate-900/5 dark:border-white/5'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-12 flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="text-lg font-medium tracking-tight flex items-center gap-2 bg-transparent border-none outline-none cursor-pointer"
          aria-label="Scroll to top"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 flex items-center justify-center">
            <span className="geist-font text-sm font-bold text-slate-800 dark:text-white">AH</span>
          </div>
          <span className="geist-font text-slate-800 dark:text-white font-semibold">Adit</span>
        </button>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <nav className="flex items-center gap-6 lg:gap-8">
            {navKeys.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className={cn(
                  'text-sm font-light transition-colors duration-200 cursor-pointer relative group bg-transparent border-none outline-none inter-font',
                  activeSection === id
                    ? 'text-slate-900 dark:text-white font-medium'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                {t(`nav.${id}`)}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-[1px] bg-slate-900 dark:bg-white transition-all duration-350',
                    activeSection === id ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3 pl-6 border-l border-slate-900/10 dark:border-white/10">
            <button
              onClick={toggleLanguage}
              className="p-2 flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg bg-transparent border-none outline-none cursor-pointer"
              aria-label="Toggle Language"
            >
              <Languages size={16} />
              <span className="text-[10px] font-bold uppercase">{language}</span>
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg bg-transparent border-none outline-none cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a
              href="https://drive.google.com/file/d/1gnTbq-vJhQnL2z-wkXwxheaXb1D6rH40/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button px-4 py-2 rounded-lg text-slate-800 dark:text-white text-xs font-medium inter-font hover:scale-102 transition-transform"
            >
              {t('common.viewCV')}
            </a>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-transparent border-none outline-none cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button
            type="button"
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 -mr-2 bg-transparent border-none outline-none cursor-pointer"
            onClick={() => setMobileMenu((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
            className="md:hidden overflow-hidden bg-white/95 dark:bg-[#030712]/95 backdrop-blur-md border-b border-slate-900/10 dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col py-2 px-6">
              {navKeys.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className={cn(
                    'text-left w-full py-4 text-base font-light transition-colors duration-150',
                    'bg-transparent border-none outline-none cursor-pointer select-none',
                    'border-b border-slate-900/5 dark:border-white/5 last:border-b-0 inter-font',
                    activeSection === id
                      ? 'text-slate-900 dark:text-white font-medium'
                      : 'text-slate-500 dark:text-slate-400'
                  )}
                >
                  {t(`nav.${id}`)}
                </button>
              ))}

              <div className="py-4 flex flex-col gap-4">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center justify-center gap-2 py-3 bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-900/10 dark:hover:bg-white/10 transition-colors"
                >
                  <Languages size={18} />
                  <span>{language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}</span>
                </button>

                <a
                  href="https://drive.google.com/file/d/1gnTbq-vJhQnL2z-wkXwxheaXb1D6rH40/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-slate-950 dark:bg-white text-center text-white dark:text-black font-semibold rounded-xl hover:opacity-90 transition-opacity"
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
