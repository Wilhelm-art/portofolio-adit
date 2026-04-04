import { useState, useEffect } from 'react';
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

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll shadow effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section highlighting via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Reliable scroll — uses <button>, no href, works on all browsers including iOS Safari
  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-navy-900/80 backdrop-blur-md py-4 shadow-lg border-b border-white/5'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="text-2xl font-bold tracking-tighter flex items-center gap-1 group bg-transparent border-none outline-none cursor-pointer"
          aria-label="Go to top"
        >
          <span className="text-white group-hover:text-cyan-400 transition-colors">Adit</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-6 bg-cyan-accent inline-block"
          />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 cursor-pointer relative group bg-transparent border-none outline-none',
                  activeSection === id
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:text-cyan-400'
                )}
              >
                {label}
                <span className={cn(
                  'absolute -bottom-1 left-0 h-0.5 bg-cyan-accent transition-all duration-300',
                  activeSection === id ? 'w-full' : 'w-0 group-hover:w-full'
                )} />
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

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-900 border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col py-4 px-6 gap-1">
              {navLinks.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={cn(
                    'text-left w-full py-3 text-lg font-medium transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer',
                    activeSection === id
                      ? 'text-cyan-400 font-semibold'
                      : 'text-slate-300 hover:text-cyan-400'
                  )}
                >
                  {label}
                </button>
              ))}

              <div className="mt-4 pt-4 border-t border-white/10">
                <a
                  href="https://drive.google.com/file/d/1hYE9VO-6FSNTNs8u2o9DthaKgkWcW497/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-electric-blue text-center text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  View CV
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
