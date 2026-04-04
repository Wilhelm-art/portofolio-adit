import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

const navLinks = [
  { label: 'Home',       id: 'home'       },
  { label: 'About',      id: 'about'      },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact',    id: 'contact'    },
];

const NAVBAR_HEIGHT = 80; // px — must match scroll-padding-top in CSS

export default function Navbar() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setMobileMenu]   = useState(false);
  const [activeSection, setActiveSection]   = useState('home');

  // ─── Scroll shadow ───────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ─── Active section (IntersectionObserver) ───────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      {
        threshold: 0.25,
        // Shrink the top viewport so sections are marked active only BELOW the navbar
        rootMargin: `-${NAVBAR_HEIGHT}px 0px 0px 0px`,
      }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ─── Core scroll function ─────────────────────────────────────────────────
  // STRATEGY: close menu first, then defer scroll by 150 ms.
  // This lets Framer Motion's exit animation start and the layout settle
  // before we calculate the target position — critical on iOS Safari.
  const scrollToSection = useCallback((id: string) => {
    // 1. Close the mobile drawer immediately
    setMobileMenu(false);

    // 2. Wait for drawer exit animation + layout reflow, THEN scroll
    setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;

      // Use window.scrollTo with a manual offset rather than scrollIntoView,
      // because scrollIntoView({ behavior: 'smooth' }) is unreliable on iOS Safari
      // when triggered immediately after a layout change.
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }, 150); // 150 ms > typical 100 ms Framer Motion exit
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[9999] transition-all duration-300',
        isScrolled
          ? 'bg-navy-900/90 backdrop-blur-md py-4 shadow-lg border-b border-white/5'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* ── Logo ── */}
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="text-2xl font-bold tracking-tighter flex items-center gap-1 group bg-transparent border-none outline-none cursor-pointer"
          aria-label="Scroll to top"
        >
          <span className="text-white group-hover:text-cyan-400 transition-colors">Adit</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-6 bg-cyan-accent inline-block"
          />
        </button>

        {/* ── Desktop Nav ── */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 cursor-pointer relative group bg-transparent border-none outline-none',
                  activeSection === id
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:text-cyan-400'
                )}
              >
                {label}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-0.5 bg-cyan-accent transition-all duration-300',
                    activeSection === id ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </button>
            ))}
          </nav>

          <div className="pl-8 border-l border-white/10">
            <a
              href="https://drive.google.com/file/d/1hYE9VO-6FSNTNs8u2o9DthaKgkWcW497/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-sm font-medium rounded-full hover:bg-electric-blue hover:text-white transition-all transform hover:scale-105"
            >
              View CV
            </a>
          </div>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          type="button"
          className="md:hidden text-slate-300 hover:text-white p-2 -mr-2"
          onClick={() => setMobileMenu((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-navy-900/95 backdrop-blur-md border-b border-white/10"
            // Prevent any stray touch events from leaking through to page
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col py-2 px-6">
              {navLinks.map(({ label, id }) => (
                <button
                  key={id}
                  type="button"
                  // onClick handles desktop + Android
                  onClick={() => scrollToSection(id)}
                  // onTouchEnd for iOS Safari — fires before onClick, slightly earlier
                  onTouchEnd={(e) => {
                    e.preventDefault(); // prevent ghost click
                    scrollToSection(id);
                  }}
                  className={cn(
                    'text-left w-full py-4 text-lg font-medium transition-colors duration-150',
                    'bg-transparent border-none outline-none cursor-pointer select-none',
                    'border-b border-white/5 last:border-b-0',
                    activeSection === id
                      ? 'text-cyan-400 font-semibold'
                      : 'text-slate-300 active:text-cyan-400'
                  )}
                >
                  {label}
                </button>
              ))}

              <div className="py-4">
                <a
                  href="https://drive.google.com/file/d/1hYE9VO-6FSNTNs8u2o9DthaKgkWcW497/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-electric-blue text-center text-white font-semibold rounded-xl hover:bg-blue-600 active:bg-blue-700 transition-colors"
                >
                  View CV
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
