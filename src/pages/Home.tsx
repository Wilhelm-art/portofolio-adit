import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Download, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function Home() {
  const { t } = useTranslation();
  const location = useLocation();
  const isEnglish = location.pathname.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';

  return (
    <>
      <Helmet>
        <title>Adit Hardiansyah Surachman | Portfolio</title>
        <meta name="description" content={t('hero.headline')} />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-center min-h-[calc(100vh-5rem)]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-7 flex flex-col justify-center md:pr-12 md:border-r border-white/10"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-[1px] bg-accent-red"></span>
            <span className="text-accent-red text-xs font-bold uppercase tracking-widest">IT Specialist / Network Security</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-display leading-[0.95] mb-8">
            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Secure</span> Systems.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-lg mb-10">
            {t('hero.headline')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link 
              to={`${basePath}/resume`}
              className="bg-accent-red hover:bg-[#F43F5E] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2 group transition-all rounded-sm"
            >
              <Download className="w-4 h-4" />
              {t('hero.cta_download')}
            </Link>
            <a href="https://wa.me/6285659832513" // Updated with correct WhatsApp number
                          target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:border-white/40 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all rounded-sm"
            >
              <MessageCircle className="w-4 h-4 mr-2 inline" />
              {t('hero.cta_whatsapp')}
            </a>
          </div>
          
          <div className="mt-16 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            <div>
              <div className="text-2xl font-bold mb-1">GPA 3.61</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">STMIK Mardira</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">BNSP</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">Certified Technical</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">Google</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">Cybersecurity</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-5 flex flex-col justify-center md:pl-12"
        >
          <div className="relative w-72 h-72 md:w-full md:max-w-md md:aspect-square rounded-full overflow-hidden border border-white/10 shadow-2xl mx-auto grayscale hover:grayscale-0 transition-all duration-500">
            {/* The user mentioned a photo with a solid red background. We use a placeholder image for now, and they will replace it. */}
            <div className="absolute inset-0 bg-accent-red/10 flex items-center justify-center text-accent-red font-display text-lg">
              <img 
                              src="/assets/profile.jpg" 
                              alt="Adit Hardiansyah Surachman" 
                className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
