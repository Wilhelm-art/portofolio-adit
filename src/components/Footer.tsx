import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="h-auto md:h-16 py-8 md:py-0 px-4 md:px-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between z-10 bg-base-900 mt-20">
      <div className="text-[10px] text-slate-500 flex flex-col sm:flex-row gap-2 sm:gap-6 uppercase tracking-[0.2em] mb-4 md:mb-0 text-center sm:text-left">
        <span>Bandung, Indonesia</span>
        <span>Available for Work</span>
        <span className="hidden sm:inline">&copy; {new Date().getFullYear()}</span>
      </div>
      <div className="flex gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <a href="https://linkedin.com/in/adithardiansyah" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
          <Linkedin className="h-3 w-3" /> LinkedIn
        </a>
        <a href="https://github.com/adithardiansyah" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
          <Github className="h-3 w-3" /> GitHub
        </a>
        <a href="mailto:adithardiansyah091@gmail.com" className="hover:text-white transition-colors flex items-center gap-1">
          <Mail className="h-3 w-3" /> Email
        </a>
      </div>
    </footer>
  );
}
