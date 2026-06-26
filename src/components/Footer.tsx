import { Github, Linkedin, Mail, MessageSquare } from 'lucide-react';
import { CONTACT_DATA } from '../lib/constants';

export default function Footer() {
  return (
    <footer className="bg-transparent py-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-medium inter-font">
            Designed & Built by{' '}
            <span className="text-zinc-950 dark:text-zinc-50 font-semibold">Adit</span> &copy;{' '}
            {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-widest inter-font">
              Open to work
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={CONTACT_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} strokeWidth={1.5} />
          </a>
          <a
            href={CONTACT_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} strokeWidth={1.5} />
          </a>
          <a
            href={CONTACT_DATA.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
            aria-label="Discord"
          >
            <MessageSquare size={20} strokeWidth={1.5} />
          </a>
          <a
            href={`mailto:${CONTACT_DATA.email}`}
            className="text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
            aria-label="Email"
          >
            <Mail size={20} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
