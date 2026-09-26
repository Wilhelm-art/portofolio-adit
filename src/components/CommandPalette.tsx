import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  FileText, 
  Github, 
  Mail, 
  MessageSquare, 
  Code2, 
  ShieldCheck, 
  GraduationCap,
  Layers,
  ArrowRight
} from 'lucide-react';
import { projects } from '../data';

export function CommandPalette() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const isEnglish = location.pathname.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomToggle = () => {
      setIsOpen((prev) => !prev);
      setQuery('');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-command-palette', handleCustomToggle);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-command-palette', handleCustomToggle);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('adithardiansyah091@gmail.com');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      handleClose();
    }, 1200);
  };

  const handleNavigate = (path: string) => {
    handleClose();
    if (path.startsWith('#')) {
      if (location.pathname === '/' || location.pathname === '/en' || location.pathname === '/en/') {
        const el = document.querySelector(path);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(`${basePath}/${path}`);
      }
    } else {
      navigate(path);
    }
  };

  // Filter projects by title, stack, or category
  const filteredProjects = projects.filter(
    (p) => 
      p.title.toLowerCase().includes(query.toLowerCase()) || 
      p.stack.some(s => s.toLowerCase().includes(query.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-xl bg-[var(--color-canvas-900)] border border-white/20 rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
          <input 
            type="text"
            autoFocus
            aria-label="Cari proyek, keahlian, aksi cepat"
            data-testid="command-palette-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isEnglish ? "Type to search projects, actions, skills..." : "Cari proyek, keahlian, aksi cepat..."}
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-[var(--color-stone-muted)] focus:outline-none font-mono"
          />
          {query && (
            <button 
              type="button" 
              onClick={() => setQuery('')}
              className="text-[var(--color-stone-muted)] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-[var(--color-stone-muted)] bg-white/5 border border-white/10 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          
          {/* Quick Actions */}
          <div>
            <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[var(--color-accent)] font-semibold">
              {isEnglish ? "Quick Actions" : "Aksi Cepat"}
            </div>
            <div className="space-y-1 mt-1">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono text-left hover:bg-white/5 text-[var(--color-paper-50)] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[var(--color-stone-muted)] group-hover:text-[var(--color-accent)]" />
                  <span>{isEnglish ? "Copy Email Address" : "Salin Alamat Email"} (adithardiansyah091@gmail.com)</span>
                </div>
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[var(--color-stone-muted)]" />}
              </button>

              <button
                type="button"
                onClick={() => handleNavigate(`${basePath}/resume`)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono text-left hover:bg-white/5 text-[var(--color-paper-50)] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-[var(--color-stone-muted)] group-hover:text-[var(--color-accent)]" />
                  <span>{isEnglish ? "View & Download Resume PDF" : "Lihat & Unduh Resume PDF"}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--color-stone-muted)]" />
              </button>

              <a
                href="https://github.com/Wilhelm-art"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono text-left hover:bg-white/5 text-[var(--color-paper-50)] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-[var(--color-stone-muted)] group-hover:text-[var(--color-accent)]" />
                  <span>{isEnglish ? "Open GitHub Profile" : "Buka Profil GitHub"}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--color-stone-muted)]" />
              </a>

              <a
                href="https://wa.me/6285659832513"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono text-left hover:bg-white/5 text-[var(--color-paper-50)] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-[var(--color-stone-muted)] group-hover:text-[var(--color-accent)]" />
                  <span>{isEnglish ? "Direct WhatsApp Chat" : "Kirim WhatsApp Langsung"}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--color-stone-muted)]" />
              </a>
            </div>
          </div>

          {/* Navigation Sections */}
          <div>
            <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[var(--color-accent)] font-semibold">
              {isEnglish ? "Page Navigation" : "Navigasi Halaman"}
            </div>
            <div className="grid grid-cols-2 gap-1 mt-1">
              <button
                type="button"
                onClick={() => handleNavigate('#work')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono text-left hover:bg-white/5 text-[var(--color-paper-50)] transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-[var(--color-stone-muted)]" />
                <span>Work Gallery</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('#what-i-can-do')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono text-left hover:bg-white/5 text-[var(--color-paper-50)] transition-colors"
              >
                <Code2 className="w-3.5 h-3.5 text-[var(--color-stone-muted)]" />
                <span>What I Can Do</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('#about')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono text-left hover:bg-white/5 text-[var(--color-paper-50)] transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[var(--color-stone-muted)]" />
                <span>About Me</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('#awards')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono text-left hover:bg-white/5 text-[var(--color-paper-50)] transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-stone-muted)]" />
                <span>Awards &amp; Certs</span>
              </button>
            </div>
          </div>

          {/* Projects List */}
          <div>
            <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[var(--color-accent)] font-semibold flex items-center justify-between">
              <span>{isEnglish ? "Projects" : "Proyek Rekayasa"}</span>
              <span className="text-[var(--color-stone-muted)] font-normal">{filteredProjects.length} items</span>
            </div>
            <div className="space-y-1 mt-1">
              {filteredProjects.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleNavigate(`${basePath}/projects/${p.id}`)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-white/5 transition-colors group"
                >
                  <div>
                    <div className="text-xs font-bold font-display text-white group-hover:text-[var(--color-accent)] transition-colors">
                      {p.title}
                    </div>
                    <div className="text-[11px] text-[var(--color-stone-muted)] truncate max-w-sm sm:max-w-md">
                      {p.tagline}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-0.5 text-[9px] font-mono text-[var(--color-stone-subtle)] bg-white/5 rounded">
                      {p.category || 'tech'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--color-stone-muted)] group-hover:text-white transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[var(--color-stone-muted)]">
          <span>Navigate with mouse or keyboard</span>
          <div className="flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 bg-white/10 text-white rounded text-[10px]">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-1.5 py-0.5 bg-white/10 text-white rounded text-[10px]">K</kbd>
            <span>anytime</span>
          </div>
        </div>

      </div>
    </div>
  );
}
