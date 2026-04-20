import { Github, Linkedin, Mail, MessageSquare } from 'lucide-react';
import { CONTACT_DATA } from '../lib/constants';

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-navy-900 py-12 border-t border-slate-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            Designed & Built by <span className="text-slate-800 dark:text-white font-medium">Adit</span> &copy; {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-medium text-green-600 dark:text-green-400">Open to work</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={CONTACT_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white dark:bg-white/5 shadow-sm dark:shadow-none flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-white hover:bg-electric-blue transition-all"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href={CONTACT_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white dark:bg-white/5 shadow-sm dark:shadow-none flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-white hover:bg-electric-blue transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={CONTACT_DATA.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white dark:bg-white/5 shadow-sm dark:shadow-none flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-white hover:bg-electric-blue transition-all"
            aria-label="Discord"
          >
            <MessageSquare size={20} />
          </a>
          <a
            href={`mailto:${CONTACT_DATA.email}`}
            className="w-10 h-10 rounded-full bg-white dark:bg-white/5 shadow-sm dark:shadow-none flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-white hover:bg-electric-blue transition-all"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
