import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Linkedin, MessageSquare } from 'lucide-react';
import { NAV_LINKS, CONTACT_DATA } from '../lib/constants';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-navy-900/80 backdrop-blur-md py-4 shadow-lg border-b border-white/5' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="text-2xl font-bold tracking-tighter flex items-center gap-1 group">
          <span className="text-white group-hover:text-electric-blue transition-colors">Adit</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-6 bg-cyan-accent inline-block"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white hover:text-electric-blue transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric-blue transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-4 pl-8 border-l border-white/10">
            <a href={CONTACT_DATA.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={CONTACT_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={CONTACT_DATA.discord} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-400 transition-colors" aria-label="Discord">
              <MessageSquare size={18} />
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-900 border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col py-4 px-6 gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-300 hover:text-electric-blue transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/10">
                <a href={CONTACT_DATA.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href={CONTACT_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href={CONTACT_DATA.discord} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-400 transition-colors" aria-label="Discord">
                  <MessageSquare size={20} />
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
