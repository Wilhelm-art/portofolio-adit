import { TextEffect } from './ui/text-effect';
import { InView } from './ui/in-view';
import { Marquee } from './ui/marquee';
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
          <InView
            className="flex-1 flex flex-col items-start w-full"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
            }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-medium tracking-tighter text-[#284A60] leading-[1.1] mb-8 geist-font">
              <TextEffect per="word" preset="fade-in-up">
                {language === 'id' ? 'Pengembang' : 'Software'}
              </TextEffect>
              <TextEffect 
                per="word" 
                preset="blur" 
                delay={0.2}
                className="text-[#AB8B65]"
              >
                {language === 'id' ? 'Keamanan.' : 'Security.'}
              </TextEffect>
            </h1>

            <TextEffect
              per="line"
              preset="blur"
              delay={0.4}
              className="text-lg sm:text-xl text-[#5D5F5E] mb-12 max-w-xl leading-relaxed inter-font"
            >
              {t('hero.subtitle')}
            </TextEffect>

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
                  className="text-[#4A6453] hover:text-[#284A60] transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href={CONTACT_DATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4A6453] hover:text-[#284A60] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={CONTACT_DATA.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4A6453] hover:text-[#284A60] transition-colors"
                  aria-label="Discord"
                >
                  <MessageSquare size={20} />
                </a>
              </div>
            </div>
          </InView>

          <InView
            className="flex-1 flex justify-center lg:justify-end w-full relative z-10"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: 'easeOut', delay: 0.2 } }
            }}
          >
            <div className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-72 md:h-[26rem]">
              <div className="w-full h-full bg-[#FAF9F6] border-4 border-[#284A60] overflow-hidden shadow-2xl">
                <img
                  src="/profile.jpg"
                  alt="Adit Hardiansyah Surachman"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-700 ease-in-out"
                />
              </div>
            </div>
          </InView>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-b border-[#5D5F5E]/20 bg-[#FAF9F6]/80 backdrop-blur-sm z-0">
        <Marquee speed={40} className="mt-0 sm:mt-0 py-2">
          <span className="mx-8 text-xl md:text-3xl font-display font-medium text-[#284A60]/30 uppercase tracking-widest">Web Development</span>
          <span className="mx-8 text-xl md:text-3xl font-display font-medium text-[#AB8B65]/30 uppercase tracking-widest">•</span>
          <span className="mx-8 text-xl md:text-3xl font-display font-medium text-[#284A60]/30 uppercase tracking-widest">Cybersecurity</span>
          <span className="mx-8 text-xl md:text-3xl font-display font-medium text-[#AB8B65]/30 uppercase tracking-widest">•</span>
          <span className="mx-8 text-xl md:text-3xl font-display font-medium text-[#284A60]/30 uppercase tracking-widest">Penetration Testing</span>
          <span className="mx-8 text-xl md:text-3xl font-display font-medium text-[#AB8B65]/30 uppercase tracking-widest">•</span>
          <span className="mx-8 text-xl md:text-3xl font-display font-medium text-[#284A60]/30 uppercase tracking-widest">React & Next.js</span>
          <span className="mx-8 text-xl md:text-3xl font-display font-medium text-[#AB8B65]/30 uppercase tracking-widest">•</span>
          <span className="mx-8 text-xl md:text-3xl font-display font-medium text-[#284A60]/30 uppercase tracking-widest">Information Security</span>
          <span className="mx-8 text-xl md:text-3xl font-display font-medium text-[#AB8B65]/30 uppercase tracking-widest">•</span>
        </Marquee>
      </div>
    </section>
  );
}
