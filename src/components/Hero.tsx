import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download, Github, Linkedin, MessageSquare, ShieldCheck } from 'lucide-react';
import { CONTACT_DATA, getHeroData } from '../lib/constants';
import { fadeInUp } from '../lib/animations';
import { useLanguage } from '../lib/LanguageContext';
import CyberCanvas from './CyberCanvas';

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
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-12 sm:pb-0">
      {/* 3D Cyber Mesh Background */}
      <CyberCanvas />

      {/* Grid overlay for tech look */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_60%,rgba(255,255,255,0.7)_100%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_60%,#02040a_100%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-4 sm:pt-0">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16">
          
          <motion.div 
            className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start w-full glass-cyber-card p-6 sm:p-8 md:p-10 rounded-3xl shadow-cyber-glow border-glow-pulse"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, staggerChildren: 0.15 } }
            }}
          >
            <motion.div 
              variants={fadeInUp} 
              className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-accent/10 border border-cyan-accent/30 rounded-full mb-4 text-cyan-600 dark:text-cyan-400 font-medium text-xs tracking-wider uppercase animate-cyber-pulse"
            >
              <ShieldCheck size={14} className="animate-spin-slow" />
              <span>Cybersecurity & Software Developer</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-slate-900 dark:text-white leading-tight">
              {language === 'id' ? 'Halo, Saya' : "Hi, I'm"}{' '}
              <span className="text-gradient block sm:inline mt-1 sm:mt-0 font-display text-cyber-glow font-extrabold">
                {heroData.name}
              </span>
            </motion.h1>
            
            <motion.div variants={fadeInUp} className="h-10 sm:h-12 md:h-14 mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-200">
                {currentText}
                <span className="inline-block w-1.5 h-6 sm:h-8 ml-1 bg-cyan-accent animate-pulse align-middle" />
              </h2>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-slate-600 dark:text-slate-350 mb-8 max-w-2xl text-justify sm:text-center lg:text-left mx-auto lg:mx-0 leading-relaxed font-sans">
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="w-full sm:w-auto group relative px-8 py-3.5 bg-electric-blue text-white font-medium rounded-xl overflow-hidden flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(59,130,246,0.3)] hover:shadow-cyan-accent/25 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-[250ms] ease-out group-hover:w-full" />
                <span className="relative font-display">{t('common.viewWork')}</span>
                <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="https://drive.google.com/file/d/1gnTbq-vJhQnL2z-wkXwxheaXb1D6rH40/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto group px-8 py-3.5 bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all transform hover:-translate-y-0.5"
              >
                <span className="font-display">{t('common.downloadCV')}</span>
                <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-6 mt-10">
              <motion.a whileHover={{ y: -3, scale: 1.15 }} href={CONTACT_DATA.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-cyan-400 transition-colors p-2" aria-label="GitHub">
                <Github size={24} />
              </motion.a>
              <motion.a whileHover={{ y: -3, scale: 1.15 }} href={CONTACT_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors p-2" aria-label="LinkedIn">
                <Linkedin size={24} />
              </motion.a>
              <motion.a whileHover={{ y: -3, scale: 1.15 }} href={CONTACT_DATA.discord} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-cyan-400 transition-colors p-2" aria-label="Discord">
                <MessageSquare size={24} />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex-1 flex justify-center lg:justify-end w-full mb-8 lg:mb-0 relative z-10"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto group">
              {/* Outer tech circles */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-accent/50 animate-[spin_30s_linear_infinite] group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-2 rounded-full border border-electric-blue/30 animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-accent/20 to-electric-blue/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Profile Image Container */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-4 rounded-full bg-slate-100 dark:bg-navy-900 border-2 border-slate-200 dark:border-white/10 overflow-hidden flex items-center justify-center shadow-2xl"
              >
                <img 
                  src="/profile.jpg" 
                  alt="Adit Hardiansyah Surachman" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out" 
                />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
