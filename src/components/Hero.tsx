import { motion } from 'motion/react';
import { Download, Github, Linkedin, MessageSquare } from 'lucide-react';
import { CONTACT_DATA } from '../lib/constants';
import { useLanguage } from '../lib/LanguageContext';

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[90svh] flex items-center justify-center pt-24 pb-12 sm:pb-0"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          <motion.div
            className="flex-1 flex flex-col items-start w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-medium tracking-tighter text-zinc-950 dark:text-zinc-50 leading-[1.1] mb-8 geist-font">
              {language === 'id' ? 'Pengembang' : 'Software'}
              <br />
              <span className="text-zinc-400 dark:text-zinc-500">
                {language === 'id' ? 'Keamanan.' : 'Security.'}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-xl leading-relaxed inter-font">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap items-center gap-8">
              <a
                href="https://drive.google.com/file/d/1gnTbq-vJhQnL2z-wkXwxheaXb1D6rH40/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="primary-button px-8 py-4 rounded-none font-medium text-sm flex items-center justify-center gap-3 font-display uppercase tracking-widest"
              >
                <span>{t('common.downloadCV')}</span>
                <Download size={16} />
              </a>

              <div className="flex items-center gap-6">
                <a
                  href={CONTACT_DATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href={CONTACT_DATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={CONTACT_DATA.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  aria-label="Discord"
                >
                  <MessageSquare size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 flex justify-center lg:justify-end w-full relative z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="relative w-64 h-[22rem] sm:w-80 sm:h-[28rem] md:w-[28rem] md:h-[34rem]">
              <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden shadow-2xl">
                <img
                  src="/profile.jpg"
                  alt="Adit Hardiansyah Surachman"
                  className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 hover:scale-100"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
