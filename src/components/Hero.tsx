import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download, Github, Linkedin, MessageSquare, ShieldCheck } from 'lucide-react';
import { CONTACT_DATA, getHeroData } from '../lib/constants';
import { fadeInUp } from '../lib/animations';
import { useLanguage } from '../lib/LanguageContext';

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { t, language } = useLanguage();
  
  const heroData = getHeroData(language);

  useEffect(() => {
    const title = heroData.titles[titleIndex];
    if (!title) return;
    
    const typeSpeed = isDeleting ? 40 : 80;
    const delay = isDeleting && currentText === '' ? 500 : !isDeleting && currentText === title ? 2000 : typeSpeed;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === title) {
        setIsDeleting(true);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % heroData.titles.length);
      } else {
        setCurrentText(title.substring(0, currentText.length + (isDeleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, titleIndex, heroData.titles]);

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-12 sm:pb-0 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 pt-4 sm:pt-0">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16">
          
          <motion.div 
            className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start w-full bg-transparent p-0"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, staggerChildren: 0.15 } }
            }}
          >
            <motion.div 
              variants={fadeInUp} 
              className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-full mb-6 text-slate-600 dark:text-zinc-300 font-medium text-xs tracking-wider uppercase geist-font"
            >
              <ShieldCheck size={14} className="text-cyan-accent" />
              <span>Cybersecurity & Software Developer</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-light mb-4 text-slate-900 dark:text-white leading-tight tracking-tight geist-font">
              {language === 'id' ? 'Halo, Saya' : "Hi, I'm"}{' '}
              <span className="gradient-text block sm:inline mt-1 sm:mt-0 font-extrabold tracking-tight">
                {heroData.name}
              </span>
            </motion.h1>
            
            <motion.div variants={fadeInUp} className="h-10 sm:h-12 md:h-14 mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-slate-700 dark:text-slate-200 geist-font">
                {currentText}
                <span className="inline-block w-1 h-6 sm:h-8 ml-1 bg-cyan-accent animate-pulse align-middle" />
              </h2>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl text-center lg:text-left mx-auto lg:mx-0 leading-relaxed font-light inter-font">
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="w-full sm:w-auto primary-button px-8 py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:scale-102 transition-transform duration-300 font-display"
              >
                <span>{t('common.viewWork')}</span>
                <ArrowRight size={18} />
              </a>
              
              <a
                href="https://drive.google.com/file/d/1gnTbq-vJhQnL2z-wkXwxheaXb1D6rH40/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto glass-button px-8 py-3.5 rounded-xl font-medium text-sm text-slate-800 dark:text-white flex items-center justify-center gap-2 hover:scale-102 transition-transform duration-300 font-display"
              >
                <span>{t('common.downloadCV')}</span>
                <Download size={18} />
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-6 mt-10">
              <motion.a whileHover={{ y: -3, scale: 1.1 }} href={CONTACT_DATA.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors p-2" aria-label="GitHub">
                <Github size={22} />
              </motion.a>
              <motion.a whileHover={{ y: -3, scale: 1.1 }} href={CONTACT_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors p-2" aria-label="LinkedIn">
                <Linkedin size={22} />
              </motion.a>
              <motion.a whileHover={{ y: -3, scale: 1.1 }} href={CONTACT_DATA.discord} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors p-2" aria-label="Discord">
                <MessageSquare size={22} />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex-1 flex justify-center lg:justify-end w-full mb-8 lg:mb-0 relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto group">
              {/* Premium minimalist frame outline */}
              <div className="absolute -inset-2 rounded-3xl border border-slate-900/5 dark:border-white/5 transition-all duration-500 group-hover:scale-[1.02] pointer-events-none" />
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-accent/5 to-electric-blue/5 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
              
              {/* Profile Image Container */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-3xl bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 overflow-hidden flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500"
              >
                <img 
                  src="/profile.jpg" 
                  alt="Adit Hardiansyah Surachman" 
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-out" 
                />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
