import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download, Github, Linkedin, MessageSquare } from 'lucide-react';
import { HERO_DATA, CONTACT_DATA } from '../lib/constants';
import { fadeInUp, blobAnimation } from '../lib/animations';

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const title = HERO_DATA.titles[titleIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const delay = isDeleting && currentText === '' ? 500 : !isDeleting && currentText === title ? 2000 : typeSpeed;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === title) {
        setIsDeleting(true);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % HERO_DATA.titles.length);
      } else {
        setCurrentText(title.substring(0, currentText.length + (isDeleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, titleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={blobAnimation}
          animate="animate"
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue/20 blur-[100px] rounded-full mix-blend-screen"
        />
        <motion.div
          variants={blobAnimation}
          animate="animate"
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-accent/20 blur-[100px] rounded-full mix-blend-screen"
          style={{ animationDelay: '-4s' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              Hi, I'm <span className="text-gradient">{HERO_DATA.name}</span>
            </motion.h1>
            
            <motion.div variants={fadeInUp} className="h-12 md:h-16 mb-6">
              <h2 className="text-2xl md:text-4xl font-medium text-slate-300">
                {currentText}
                <span className="inline-block w-1 h-8 md:h-10 ml-1 bg-cyan-accent animate-pulse align-middle" />
              </h2>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0">
              {HERO_DATA.subtitle}
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-electric-blue text-white font-medium rounded-lg overflow-hidden flex items-center gap-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
              >
                <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-[250ms] ease-out group-hover:w-full" />
                <span className="relative">View My Work</span>
                <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="https://drive.google.com/file/d/1hYE9VO-6FSNTNs8u2o9DthaKgkWcW497/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-lg flex items-center gap-2 hover:bg-white/10 transition-all"
              >
                <span>View Full CV</span>
                <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
              </a>
            </motion.div>

            {/* Social Links under Hero */}
            <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-6 mt-10">
              <a href={CONTACT_DATA.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                <Github size={24} />
              </a>
              <a href={CONTACT_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
              <a href={CONTACT_DATA.discord} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-400 transition-colors" aria-label="Discord">
                <MessageSquare size={24} />
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Image Placeholder */}
          <motion.div 
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Glowing ring */}
              <div className="absolute inset-0 rounded-full border-2 border-electric-blue/50 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full border border-cyan-accent/30 animate-[spin_15s_linear_infinite_reverse]" />
              
              {/* Avatar */}
              <div className="absolute inset-4 rounded-full bg-navy-900 border border-white/10 overflow-hidden flex items-center justify-center glass-card">
                <img src="/profile.jpg" alt="Adit Hardiansyah Surachman" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
