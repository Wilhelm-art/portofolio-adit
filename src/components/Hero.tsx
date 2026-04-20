import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download, Github, Linkedin, MessageSquare } from 'lucide-react';
import { CONTACT_DATA, getHeroData } from '../lib/constants';
import { fadeInUp, blobAnimation } from '../lib/animations';
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
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 pb-12 sm:pb-0">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={blobAnimation}
          animate="animate"
          className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-electric-blue/20 blur-[100px] rounded-full mix-blend-screen"
        />
        <motion.div
          variants={blobAnimation}
          animate="animate"
          className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-accent/20 blur-[100px] rounded-full mix-blend-screen"
          style={{ animationDelay: '-4s' }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-4 sm:pt-0">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16">
          
          <motion.div 
            className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start w-full"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-slate-900 dark:text-white leading-tight">
              {language === 'id' ? 'Halo, Saya' : "Hi, I'm"} <span className="text-gradient block sm:inline mt-2 sm:mt-0">{heroData.name}</span>
            </motion.h1>
            
            <motion.div variants={fadeInUp} className="h-10 sm:h-12 md:h-16 mb-6">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-medium text-slate-600 dark:text-slate-300">
                {currentText}
                <span className="inline-block w-1 h-6 sm:h-8 md:h-10 ml-1 bg-cyan-accent animate-pulse align-middle" />
              </h2>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl text-justify sm:text-center lg:text-left mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="w-full sm:w-auto group relative px-8 py-3 sm:py-4 bg-electric-blue text-white font-medium rounded-xl sm:rounded-lg overflow-hidden flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
              >
                <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-[250ms] ease-out group-hover:w-full" />
                <span className="relative">{t('common.viewWork')}</span>
                <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="https://drive.google.com/file/d/1MH7uaqvyoAH9m9-N6185lMznZVtxhR04/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto group px-8 py-3 sm:py-4 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white font-medium rounded-xl sm:rounded-lg flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
              >
                <span>{t('common.downloadCV')}</span>
                <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-6 mt-10 sm:mt-12">
              <motion.a whileHover={{ y: -3, scale: 1.1 }} href={CONTACT_DATA.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-2" aria-label="GitHub">
                <Github size={24} />
              </motion.a>
              <motion.a whileHover={{ y: -3, scale: 1.1 }} href={CONTACT_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors p-2" aria-label="LinkedIn">
                <Linkedin size={24} />
              </motion.a>
              <motion.a whileHover={{ y: -3, scale: 1.1 }} href={CONTACT_DATA.discord} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors p-2" aria-label="Discord">
                <MessageSquare size={24} />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex-1 flex justify-center lg:justify-end w-full mb-8 lg:mb-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-electric-blue/50 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full border border-cyan-accent/30 animate-[spin_15s_linear_infinite_reverse]" />
              
              <div className="absolute inset-4 rounded-full bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-white/10 overflow-hidden flex items-center justify-center glass-card">
                <img src="/profile.jpg" alt="Adit Hardiansyah Surachman" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
