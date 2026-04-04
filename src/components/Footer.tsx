import { Github, Linkedin, Mail, MessageSquare } from 'lucide-react';
import { CONTACT_DATA } from '../lib/constants';

export default function Footer() {
  return (
    <footer className="bg-navy-900 py-12 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-slate-400 text-sm">
            Designed & Built by <span className="text-white font-medium">Adit</span> &copy; {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-green-400">Open to work</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={CONTACT_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-electric-blue hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href={CONTACT_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-electric-blue hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={CONTACT_DATA.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-electric-blue hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all"
            aria-label="Discord"
          >
            <MessageSquare size={20} />
          </a>
          <a
            href={`mailto:${CONTACT_DATA.email}`}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-electric-blue hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
