import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  Award, 
  GraduationCap, 
  Github, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Mail, 
  Check, 
  Copy, 
  X, 
  Send,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Database,
  Lock,
  Smartphone,
  ArrowUp,
  CheckCircle2,
  Quote,
  Coffee
} from 'lucide-react';
import { projects } from '../data';

export function Home() {
  const { t } = useTranslation();
  const location = useLocation();
  const isEnglish = location.pathname.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';

  // 3D Deck active card index
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  
  // Interactive Trait Card Stack
  const [traitIndex, setTraitIndex] = useState(0);
  
  // Contact modal state
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  // Scroll to top visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredDeck = projects.slice(0, 5);
  const activeProject = featuredDeck[activeCardIdx] || featuredDeck[0];

  const handlePrevCard = useCallback(() => {
    setActiveCardIdx((prev) => (prev > 0 ? prev - 1 : featuredDeck.length - 1));
  }, [featuredDeck.length]);

  const handleNextCard = useCallback(() => {
    setActiveCardIdx((prev) => (prev < featuredDeck.length - 1 ? prev + 1 : 0));
  }, [featuredDeck.length]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('adithardiansyah091@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendModalMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(`[Portfolio Inquiry] Pesan dari ${modalName || 'Pengunjung'}`);
    const mailBody = encodeURIComponent(`Nama: ${modalName}\nEmail: ${modalEmail}\n\nPesan:\n${modalMessage}`);
    window.location.href = `mailto:adithardiansyah091@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    setIsContactModalOpen(false);
  };

  // Trait list for fanned stack
  const traits = [
    { title: 'Problem Solver', desc: isEnglish ? 'Focused on practical systems that create tangible impact.' : 'Fokus pada solusi praktis nyata yang memberi dampak.', rotate: '-rotate-6' },
    { title: 'Security-First', desc: isEnglish ? 'Strict input validation, CSP/HSTS hardening, and defense in depth.' : 'Validasi input ketat, CSP/HSTS hardening, dan integritas kode.', rotate: 'rotate-6' },
    { title: 'Detail-Oriented', desc: isEnglish ? 'High sensitivity to typography, clean code, and UI precision.' : 'Sensitivitas tinggi pada kerapian kode dan estetika UI.', rotate: '-rotate-3' },
    { title: 'Continuous Learner', desc: isEnglish ? 'Swiftly adapting to modern tooling, cloud primitives, and standards.' : 'Cepat beradaptasi dengan stack modern dan standar industri.', rotate: 'rotate-3' },
  ];

  const handleShuffleTrait = () => {
    setTraitIndex((prev) => (prev + 1) % traits.length);
  };

  // Tech icons for capabilities
  const techIcons = [
    { name: 'TypeScript', icon: Code2 },
    { name: 'Next.js 16', icon: Layers },
    { name: 'React 19', icon: Code2 },
    { name: 'React Native', icon: Smartphone },
    { name: 'Tailwind CSS', icon: Layers },
    { name: 'PostgreSQL', icon: Database },
    { name: 'Prisma ORM', icon: Database },
    { name: 'Laravel 10', icon: Code2 },
    { name: 'Python', icon: Terminal },
    { name: 'Docker', icon: Cpu },
    { name: 'Network Security', icon: Lock },
    { name: 'Linux / Shell', icon: Terminal },
  ];

  return (
    <>
      <Helmet>
        <title>Adit Hardiansyah Surachman | Software Engineer &amp; Network Security</title>
        <meta name="description" content={t('hero.subheadline')} />
      </Helmet>

      {/* Undulating Organic Contour Lines in Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <svg 
          viewBox="0 0 1440 5000" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="none" 
          className="w-full h-full"
        >
          <g opacity="0.35">
            <path d="M-100 200 C 200 100, 500 300, 800 200 C 1100 100, 1300 280, 1540 180" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
            <path d="M0 350 C 300 250, 600 400, 900 320 C 1200 240, 1400 380, 1440 300" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
            <path d="M-80 500 C 240 420, 540 580, 840 500 C 1140 420, 1360 560, 1500 480" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
          </g>
          <g opacity="0.3">
            <path d="M0 1100 C 320 1020, 620 1180, 920 1100 C 1220 1020, 1420 1160, 1440 1080" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
            <path d="M-100 1350 C 260 1280, 560 1420, 860 1360 C 1160 1300, 1380 1440, 1540 1380" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
          </g>
          <g opacity="0.25">
            <path d="M0 2200 C 300 2140, 600 2260, 900 2200 C 1200 2140, 1400 2280, 1440 2220" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
            <path d="M-80 2500 C 240 2440, 540 2560, 840 2500 C 1140 2440, 1360 2580, 1500 2520" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
          </g>
        </svg>
      </div>

      <div className="relative z-10 w-full overflow-x-hidden">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Immersive 3D Depth: Outline Marquee + Cutout Portrait)   */}
        {/* ========================================================================= */}
        <section 
          id="hero" 
          className="relative w-full h-screen min-h-[640px] max-h-[1050px] flex items-center justify-center overflow-hidden select-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/8 rounded-full blur-[140px] pointer-events-none -z-10" />

          {/* Concentric Geometric Circles Behind Portrait */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10">
            <div className="w-[300px] sm:w-[380px] md:w-[460px] h-[300px] sm:h-[380px] md:h-[460px] rounded-full border border-white/[0.06] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="w-[500px] sm:w-[620px] md:w-[760px] h-[500px] sm:h-[620px] md:h-[760px] rounded-full border border-white/[0.04] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="w-[740px] sm:w-[900px] md:w-[1100px] h-[740px] sm:h-[900px] md:h-[1100px] rounded-full border border-white/[0.025] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Background Infinite Moving Outline Text Marquee */}
          <div 
            aria-hidden="true" 
            className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden pointer-events-none z-0"
          >
            <div className="animate-marquee flex items-center">
              <span className="text-stroke-outline text-7xl sm:text-9xl md:text-[14vw] font-black tracking-tight uppercase whitespace-nowrap px-4 font-display">
                ADIT HARDIANSYAH &bull;
              </span>
              <span className="text-stroke-outline text-7xl sm:text-9xl md:text-[14vw] font-black tracking-tight uppercase whitespace-nowrap px-4 font-display">
                ADIT HARDIANSYAH &bull;
              </span>
              <span className="text-stroke-outline text-7xl sm:text-9xl md:text-[14vw] font-black tracking-tight uppercase whitespace-nowrap px-4 font-display">
                ADIT HARDIANSYAH &bull;
              </span>
              <span className="text-stroke-outline text-7xl sm:text-9xl md:text-[14vw] font-black tracking-tight uppercase whitespace-nowrap px-4 font-display">
                ADIT HARDIANSYAH &bull;
              </span>
            </div>
          </div>

          {/* Studio Backlight Glow behind Head & Shoulders */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[380px] sm:w-[500px] h-[320px] sm:h-[420px] bg-gradient-to-t from-[var(--color-accent)]/18 via-white/5 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

          {/* Foreground Portrait Cutout Rising from Bottom with Smooth Edge Fade */}
          <div 
            className="absolute inset-x-0 bottom-0 flex justify-center items-end pointer-events-none z-10 overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to bottom, black 0%, black 82%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 82%, transparent 100%)'
            }}
          >
            <img 
              src="/assets/profile-cutout.png" 
              alt="Adit Hardiansyah Surachman" 
              loading="eager"
              fetchPriority="high"
              width="480"
              height="640"
              className="w-auto h-[62vh] sm:h-[72vh] md:h-[78vh] max-h-[760px] object-contain object-bottom filter contrast-[1.03] drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            />
          </div>

          {/* Floating Subtle Role Badge at Bottom Center */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-auto">
            <span className="px-4 py-1.5 rounded-full bg-[var(--color-canvas-900)]/80 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-widest text-[var(--color-paper-50)] uppercase shadow-lg flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              SOFTWARE ENGINEER &amp; NETWORK SECURITY
            </span>
          </div>

          {/* Vertical Scroll Down Indicator on Right */}
          <div className="hidden lg:flex absolute right-8 bottom-10 z-20 flex-col items-center gap-3 pointer-events-none select-none">
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/30 to-[var(--color-accent)] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-stone-muted)] [writing-mode:vertical-rl]">
              SCROLL DOWN
            </span>
          </div>
        </section>

        {/* Content Container for Sections Below Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32 py-16 sm:py-24">

          {/* ========================================================================= */}
          {/* 2. WORK GALLERY (3D Interactive Carousel Album Deck)                      */}
          {/* ========================================================================= */}
          <section id="work" className="scroll-mt-28">
            
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] block mb-2 font-medium">
                  SELECTED WORK
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--color-paper-50)]">
                  Work Gallery
                </h2>
                <p className="text-sm sm:text-base text-[var(--color-stone-muted)] mt-2 max-w-xl">
                  {isEnglish 
                    ? "A collection of systems, digital platforms, and technical work I've built." 
                    : "Koleksi sistem produksi, storefront digital, dan platform teknis yang saya bangun."}
                </p>
              </div>

              <Link
                to={`${basePath}/projects`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-semibold uppercase tracking-wider hover:bg-white/90 active:scale-95 transition-all shadow-md shrink-0"
              >
                <span>{isEnglish ? "View More Projects" : "Lihat Semua Proyek"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 3D Album Carousel */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 flex items-center justify-center my-6 overflow-hidden">
              {featuredDeck.map((project, idx) => {
                const offset = idx - activeCardIdx;
                const isSelected = idx === activeCardIdx;
                
                // Calculate position offsets
                let translateX = 0;
                let scale = 0.6;
                let zIndex = 10;
                let opacity = 0.25;

                if (isSelected) {
                  translateX = 0;
                  scale = 1;
                  zIndex = 30;
                  opacity = 1;
                } else if (offset === -1 || (offset > 0 && offset === featuredDeck.length - 1)) {
                  translateX = -210;
                  scale = 0.75;
                  zIndex = 20;
                  opacity = 0.8;
                } else if (offset === 1 || (offset < 0 && Math.abs(offset) === featuredDeck.length - 1)) {
                  translateX = 210;
                  scale = 0.75;
                  zIndex = 20;
                  opacity = 0.8;
                } else if (offset < -1) {
                  translateX = -360;
                  scale = 0.55;
                  zIndex = 10;
                  opacity = 0.3;
                } else {
                  translateX = 360;
                  scale = 0.55;
                  zIndex = 10;
                  opacity = 0.3;
                }

                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setActiveCardIdx(idx)}
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale})`,
                      zIndex,
                      opacity
                    }}
                    className={`absolute w-72 sm:w-96 md:w-[440px] aspect-[16/10] rounded-2xl overflow-hidden border transition-all duration-500 ease-out cursor-pointer shadow-2xl focus:outline-none ${
                      isSelected 
                        ? 'border-[var(--color-accent)] ring-4 ring-[var(--color-accent)]/20 shadow-[0_20px_60px_rgba(0,0,0,0.85)]' 
                        : 'border-white/10 hover:border-white/25'
                    }`}
                  >
                    <img 
                      src={project.screenshot} 
                      alt={project.title}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                      <span className="font-mono text-xs font-semibold text-white truncate">
                        {project.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Deck Controls (Arrows & Pagination Dots) */}
            <div className="flex items-center justify-center gap-4 mt-4 mb-8">
              <button
                type="button"
                onClick={handlePrevCard}
                aria-label="Previous Project"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 flex items-center justify-center text-white transition-all active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-1.5">
                {featuredDeck.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => setActiveCardIdx(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIdx === activeCardIdx 
                        ? 'w-6 bg-[var(--color-accent)]' 
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextCard}
                aria-label="Next Project"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 flex items-center justify-center text-white transition-all active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Active Project Highlight Details (Centered like reference) */}
            <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[var(--color-paper-50)]">
                {activeProject.title}
              </h3>
              
              <p className="text-sm sm:text-base text-[var(--color-stone-muted)] leading-relaxed">
                {activeProject.solution || activeProject.tagline}
              </p>

              {/* Stack Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {activeProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono text-[var(--color-paper-100)] bg-[var(--color-canvas-850)] border border-white/[0.08] rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Link */}
              <div className="pt-2 flex items-center justify-center gap-4">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--color-paper-50)] hover:text-[var(--color-accent)] font-semibold transition-colors"
                  >
                    <span>View Project &rarr;</span>
                  </a>
                )}
                {activeProject.repoUrl && (
                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-[var(--color-stone-muted)] hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
                <Link
                  to={`${basePath}/projects/${activeProject.id}`}
                  className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-[var(--color-stone-muted)] hover:text-white transition-colors"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </section>

          {/* ========================================================================= */}
          {/* 3. WHAT I CAN DO (Capabilities: Tech Icon Grid + 2 Bento Cards)          */}
          {/* ========================================================================= */}
          <section id="what-i-can-do" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Left Column: Title + Description + 4-Column Tech Icon Grid */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] block mb-2 font-medium">
                    MY CAPABILITIES
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--color-paper-50)]">
                    What I Can Do
                  </h2>
                  <p className="text-sm sm:text-base text-[var(--color-stone-muted)] mt-3 leading-relaxed">
                    {isEnglish
                      ? "I combine full-stack engineering, system design, and verified network security practices to build reliable, high-performance digital solutions."
                      : "Saya memadukan rekayasa perangkat lunak full-stack, desain sistem, dan audit keamanan jaringan untuk membangun solusi digital yang tangguh dan teruji."}
                  </p>
                </div>

                {/* 4-Column Icon Grid */}
                <div className="grid grid-cols-4 gap-2.5 sm:gap-3 pt-2">
                  {techIcons.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.name}
                        className="flex flex-col items-center justify-center p-3 rounded-xl bg-[var(--color-canvas-900)] border border-white/[0.08] hover:border-[var(--color-accent)] hover:bg-[var(--color-canvas-850)] hover:scale-105 transition-all group cursor-default shadow-sm"
                      >
                        <IconComponent className="w-5 h-5 text-[var(--color-stone-muted)] group-hover:text-[var(--color-accent)] transition-colors mb-1.5" />
                        <span className="font-mono text-[9px] text-center text-[var(--color-stone-muted)] group-hover:text-[var(--color-paper-50)] transition-colors leading-tight">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: 2 Bento Cards (01 & 02) */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Bento Card 01 */}
                <div className="border border-white/[0.08] bg-[var(--color-canvas-900)] p-6 sm:p-7 rounded-2xl hover:border-white/20 transition-all flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-3xl font-bold text-white">01</span>
                      <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-[var(--color-stone-muted)] uppercase">
                        SOFTWARE &amp; SYSTEMS
                      </span>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-[var(--color-canvas-800)] border border-white/10 flex items-center justify-center text-[var(--color-accent)] mb-4">
                      <Code2 className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-display text-[var(--color-paper-50)] mb-2">
                      Full-Stack Web &amp; Mobile
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--color-stone-muted)] leading-relaxed mb-6">
                      Membangun aplikasi web dan mobile siap produksi dengan arsitektur bersih, pemodelan basis data kokoh, serta UI taktil responsif.
                    </p>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                    {['Next.js 16', 'React Native', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker', 'REST API'].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] font-mono text-[var(--color-paper-100)] bg-[var(--color-canvas-800)] border border-white/[0.06] rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bento Card 02 */}
                <div className="border border-white/[0.08] bg-[var(--color-canvas-900)] p-6 sm:p-7 rounded-2xl hover:border-white/20 transition-all flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-3xl font-bold text-white">02</span>
                      <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-[var(--color-stone-muted)] uppercase">
                        SECURITY &amp; INFRA
                      </span>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-[var(--color-canvas-800)] border border-white/10 flex items-center justify-center text-[var(--color-accent)] mb-4">
                      <ShieldCheck className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-display text-[var(--color-paper-50)] mb-2">
                      Network Security &amp; Audit
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--color-stone-muted)] leading-relaxed mb-6">
                      Menerapkan metodologi keamanan berbasis bukti untuk memitigasi celah kerentanan, memperkuat HTTP security headers (HSTS, CSP), dan audit sistem.
                    </p>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                    {['Google Cyber', 'BNSP RI', 'Threat Modeling', 'CSP & HSTS', 'Vulnerability Scan', 'Hardening'].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] font-mono text-[var(--color-paper-100)] bg-[var(--color-canvas-800)] border border-white/[0.06] rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. ABOUT SECTION (Avatar + Name + Stats + Fanned Trait Cards)             */}
          {/* ========================================================================= */}
          <section id="about" className="scroll-mt-28">
            <div className="mb-10">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] block mb-2 font-medium">
                ABOUT ME
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--color-paper-50)]">
                Problem Solver. Systems Engineer.
              </h2>
            </div>

            <div className="border border-white/[0.08] bg-[var(--color-canvas-900)] p-6 sm:p-10 rounded-3xl shadow-xl space-y-8">
              
              {/* Profile Top Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-white/[0.08]">
                <img 
                  src="/assets/profile-cutout.png" 
                  alt="Adit Hardiansyah" 
                  className="w-20 h-20 rounded-full object-cover object-top bg-[var(--color-canvas-800)] border-2 border-[var(--color-accent)] shadow-lg shrink-0"
                />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-[var(--color-paper-50)]">
                      ADIT HARDIANSYAH SURACHMAN
                    </h3>
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                  </div>

                  {/* Stats Row */}
                  <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-[var(--color-stone-muted)]">
                    <div>
                      <span className="text-[10px] uppercase block text-[var(--color-stone-subtle)]">PROJECTS</span>
                      <span className="font-bold text-white text-sm">6+ Systems</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase block text-[var(--color-stone-subtle)]">CERTIFICATES</span>
                      <span className="font-bold text-white text-sm">Google &amp; BNSP</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase block text-[var(--color-stone-subtle)]">GRADUATED</span>
                      <span className="font-bold text-white text-sm">STMIK Mardira (IPK 3.62)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Narrative */}
              <div className="space-y-4 max-w-3xl">
                <p className="text-sm sm:text-base text-[var(--color-stone-muted)] leading-relaxed">
                  {isEnglish
                    ? "I'm an Informatics Engineering graduate focused on software engineering and information security. Experienced in designing and deploying production systems—from a gadget marketplace with KYC admin verification, an offline-first MSME business engine, to public mosque transparency cash systems."
                    : "Saya adalah lulusan Teknik Informatika dengan fokus ganda pada rekayasa perangkat lunak modern dan keamanan sistem informasi. Berpengalaman merancang dan meluncurkan sistem nyata mulai dari marketplace gadget dengan KYC admin, platform bisnis UMKM mobile di Cimahi, hingga sistem kas transparansi publik masjid."}
                </p>
                <p className="text-xs sm:text-sm text-[var(--color-stone-subtle)] font-mono">
                  {isEnglish ? "Want to know more about my experience?" : "Ingin mengetahui riwayat lengkap saya?"}{' '}
                  <Link to={`${basePath}/resume`} className="text-[var(--color-accent)] hover:underline font-semibold">
                    {isEnglish ? "Download my resume." : "Unduh dokumen resume."}
                  </Link>
                </p>
              </div>

              {/* Bottom Row: CURRENTLY Strip + Fanned Interactive TRAIT Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-white/[0.08] items-center">
                
                {/* Left: CURRENTLY strip */}
                <div className="lg:col-span-7 space-y-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold block">
                    CURRENTLY
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-[var(--color-canvas-850)] border border-white/[0.06]">
                      <span className="font-mono text-[10px] text-[var(--color-stone-muted)] uppercase block mb-1">Building</span>
                      <span className="font-mono text-xs text-white font-semibold block">GadgetVault &amp; Meracik Ide</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[var(--color-canvas-850)] border border-white/[0.06]">
                      <span className="font-mono text-[10px] text-[var(--color-stone-muted)] uppercase block mb-1">Exploring</span>
                      <span className="font-mono text-xs text-white font-semibold block">Threat Modeling</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[var(--color-canvas-850)] border border-white/[0.06]">
                      <span className="font-mono text-[10px] text-[var(--color-stone-muted)] uppercase block mb-1">Learning</span>
                      <span className="font-mono text-xs text-white font-semibold block">Distributed Architecture</span>
                    </div>
                  </div>
                </div>

                {/* Right: Interactive Fanned TRAIT Card Deck */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                  <div 
                    onClick={handleShuffleTrait}
                    className="relative w-64 h-36 cursor-pointer select-none group"
                    title="Click to shuffle trait"
                  >
                    {traits.map((trait, tIdx) => {
                      const isActiveTrait = tIdx === traitIndex;
                      const nextTrait = (traitIndex + 1) % traits.length;
                      const isNext = tIdx === nextTrait;

                      let cardStyle = 'translate-x-6 translate-y-3 rotate-6 opacity-40 z-10';
                      if (isActiveTrait) {
                        cardStyle = 'translate-x-0 translate-y-0 rotate-0 opacity-100 z-30 shadow-2xl border-[var(--color-accent)]/50';
                      } else if (isNext) {
                        cardStyle = 'translate-x-3 translate-y-1.5 rotate-3 opacity-70 z-20';
                      }

                      return (
                        <div
                          key={trait.title}
                          className={`absolute inset-0 p-4 rounded-2xl bg-[var(--color-canvas-850)] border border-white/15 transition-all duration-300 flex flex-col justify-between group-hover:scale-105 ${cardStyle}`}
                        >
                          <div>
                            <span className="font-mono text-[10px] uppercase text-[var(--color-accent)] font-semibold block mb-1">
                              TRAIT
                            </span>
                            <h4 className="font-display font-bold text-base text-white">
                              {trait.title}
                            </h4>
                          </div>
                          <p className="text-[11px] text-[var(--color-stone-muted)] leading-snug">
                            {trait.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* 5. AWARDS AND ACHIEVEMENTS                                                */}
          {/* ========================================================================= */}
          <section id="awards" className="scroll-mt-28">
            <div className="mb-10">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] block mb-2 font-medium">
                RECOGNITION
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--color-paper-50)]">
                Awards and Achievements
              </h2>
              <p className="text-sm text-[var(--color-stone-muted)] mt-2">
                A collection of academic and professional recognitions that reflect my dedication to excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Academic Showcase Card */}
              <div className="lg:col-span-5 rounded-3xl border border-white/[0.08] bg-[var(--color-canvas-900)] p-8 text-center flex flex-col items-center justify-center space-y-4 shadow-xl">
                <div className="w-20 h-20 rounded-2xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)]">
                  <GraduationCap className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-display text-white">
                    IPK 3.62 / 4.00
                  </h3>
                  <p className="font-mono text-xs text-[var(--color-accent)] mt-1 uppercase tracking-wider">
                    LULUSAN TERBAIK &bull; S1 TEKNIK INFORMATIKA
                  </p>
                </div>
                <p className="text-xs text-[var(--color-stone-muted)] max-w-xs leading-relaxed">
                  Menyelesaikan jenjang Sarjana Teknik Informatika di STMIK Mardira Indonesia dengan predikat kelulusan sangat memuaskan.
                </p>
              </div>

              {/* Right Column: Stack of Award Items */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* 01 Dean's Lister / Academic */}
                <a 
                  href="https://mardira.ac.id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-[var(--color-canvas-900)] border border-white/[0.08] hover:border-[var(--color-accent)] transition-all flex items-center justify-between group shadow-sm block"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-[var(--color-accent)] shrink-0 group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-display text-white group-hover:text-[var(--color-accent)] transition-colors">
                        Lulusan Terbaik (IPK 3.62 / 4.00)
                      </h4>
                      <p className="text-xs text-[var(--color-stone-muted)]">
                        STMIK Mardira Indonesia &bull; 2021 &ndash; 2025 (Cum Laude)
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--color-stone-muted)] group-hover:text-white transition-colors shrink-0" />
                </a>

                {/* 02 Google Cybersecurity */}
                <a 
                  href="https://www.coursera.org/account/accomplishments/professional-cert" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-[var(--color-canvas-900)] border border-white/[0.08] hover:border-[var(--color-accent)] transition-all flex items-center justify-between group shadow-sm block"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-[var(--color-accent)] shrink-0 group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-display text-white group-hover:text-[var(--color-accent)] transition-colors">
                        Google Cybersecurity Professional
                      </h4>
                      <p className="text-xs text-[var(--color-stone-muted)]">
                        Google Career Certificates &bull; Threat Intelligence &amp; SIEM (Lihat Verifikasi)
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--color-stone-muted)] group-hover:text-white transition-colors shrink-0" />
                </a>

                {/* 03 BNSP RI */}
                <a 
                  href="https://bnsp.go.id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-[var(--color-canvas-900)] border border-white/[0.08] hover:border-[var(--color-accent)] transition-all flex items-center justify-between group shadow-sm block"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-[var(--color-accent)] shrink-0 group-hover:scale-105 transition-transform">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-display text-white group-hover:text-[var(--color-accent)] transition-colors">
                        Sertifikasi Profesi BNSP RI
                      </h4>
                      <p className="text-xs text-[var(--color-stone-muted)]">
                        Badan Nasional Sertifikasi Profesi &bull; Teknisi Jaringan Komputer
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--color-stone-muted)] group-hover:text-white transition-colors shrink-0" />
                </a>

              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* 5b. REAL-WORLD IMPACT & COMMUNITY FEEDBACK (Social Proof)                 */}
          {/* ========================================================================= */}
          <section id="endorsements" className="scroll-mt-28">
            <div className="mb-10">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] block mb-2 font-medium">
                SOCIAL PROOF &amp; IMPACT
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--color-paper-50)]">
                Real-World Impact
              </h2>
              <p className="text-sm text-[var(--color-stone-muted)] mt-2">
                Bagaimana sistem dan perkakas yang saya bangun memberikan dampak nyata bagi pengguna, organisasi, dan bisnis lokal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Testimonial 1: Surabi Cikal */}
              <div className="p-6 rounded-3xl bg-[var(--color-canvas-900)] border border-white/[0.08] flex flex-col justify-between shadow-xl">
                <div>
                  <Quote className="w-6 h-6 text-[var(--color-accent)] mb-4 opacity-75" />
                  <p className="text-xs sm:text-sm text-[var(--color-paper-100)] leading-relaxed italic mb-6">
                    &ldquo;Storefront digital dan sistem pemesanan langsung ke WhatsApp memudahkan pelanggan langganan melihat varian menu dan peta lokasi tanpa perlu tanya manual berulang kali.&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-white block">Surabi Cikal Cisangkan</span>
                    <span className="font-mono text-[10px] text-[var(--color-stone-muted)]">UMKM Kuliner &bull; Cimahi</span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded">
                    Live Storefront
                  </span>
                </div>
              </div>

              {/* Testimonial 2: Sistem Kas Masjid */}
              <div className="p-6 rounded-3xl bg-[var(--color-canvas-900)] border border-white/[0.08] flex flex-col justify-between shadow-xl">
                <div>
                  <Quote className="w-6 h-6 text-[var(--color-accent)] mb-4 opacity-75" />
                  <p className="text-xs sm:text-sm text-[var(--color-paper-100)] leading-relaxed italic mb-6">
                    &ldquo;Sistem kas transparansi publik dan jadwal sholat terintegrasi menghadirkan keterbukaan penuh atas amanah infak jamaah serta mempermudah rekapitulasi bendahara.&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-white block">DKM AT-Tijaniyah</span>
                    <span className="font-mono text-[10px] text-[var(--color-stone-muted)]">Manajemen Kas Publik</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                    Transparan
                  </span>
                </div>
              </div>

              {/* Testimonial 3: Meracik Ide & GadgetVault */}
              <div className="p-6 rounded-3xl bg-[var(--color-canvas-900)] border border-white/[0.08] flex flex-col justify-between shadow-xl">
                <div>
                  <Quote className="w-6 h-6 text-[var(--color-accent)] mb-4 opacity-75" />
                  <p className="text-xs sm:text-sm text-[var(--color-paper-100)] leading-relaxed italic mb-6">
                    &ldquo;Desain arsitektur offline-first pada Meracik Ide menyelesaikan masalah ketidakpastian HPP dan multi-tier komisi platform bagi wirausaha daerah dengan akurasi tinggi.&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-white block">Evaluasi Rekayasa Sistem</span>
                    <span className="font-mono text-[10px] text-[var(--color-stone-muted)]">Produksi Mobile &amp; Web</span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded">
                    Engineered
                  </span>
                </div>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* 6. CONTACT SECTION ("LET'S WORK TOGETHER" Large Editorial Layout)         */}
          {/* ========================================================================= */}
          <section id="contact" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Massive Title + Description + Download Resume */}
              <div className="lg:col-span-7 space-y-6">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold block">
                  GET IN TOUCH
                </span>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white uppercase leading-[1.02]">
                  LET&apos;S WORK<br />TOGETHER
                </h2>
                <div className="space-y-2 max-w-xl">
                  <p className="text-base sm:text-lg font-medium text-white">
                    Looking for the next problem worth solving.
                  </p>
                  <p className="text-sm sm:text-base text-[var(--color-stone-muted)] leading-relaxed">
                    {isEnglish
                      ? "I'm open to opportunities where I can contribute to software engineering, web development, IT operations, and secure digital workflows."
                      : "Terbuka untuk peluang kerja full-time, kontrak rekayasa software, pengembangan sistem web/mobile, dan audit keamanan sistem."}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="/resume/Adit_Hardiansyah_Resume.pdf"
                    download="Adit_Hardiansyah_Resume.pdf"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-semibold uppercase tracking-wider hover:bg-white/90 active:scale-95 transition-all shadow-lg"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>DOWNLOAD RESUME (PDF)</span>
                  </a>
                  <Link
                    to={`${basePath}/resume`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:border-white/40 text-white font-mono text-xs font-medium uppercase tracking-wider hover:bg-white/5 transition-all"
                  >
                    <span>Detail Resume &rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Stacked Contact Cards + "Send Me a Message" Button */}
              <div className="lg:col-span-5 space-y-3.5">
                
                {/* 01 Email Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-canvas-900)] border border-white/[0.08] flex items-center justify-between group hover:border-[var(--color-accent)] transition-all shadow-sm">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[var(--color-accent)] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[var(--color-stone-muted)] uppercase block">EMAIL</span>
                      <span className="font-mono text-xs sm:text-sm font-semibold text-white">adithardiansyah091@gmail.com</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="p-2 rounded-lg hover:bg-white/10 text-[var(--color-stone-muted)] hover:text-white transition-all"
                      aria-label="Copy Email"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <span className="font-mono text-[10px] text-[var(--color-stone-faint)]">01</span>
                  </div>
                </div>

                {/* 02 GitHub Card */}
                <a
                  href="https://github.com/Wilhelm-art"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 sm:p-5 rounded-2xl bg-[var(--color-canvas-900)] border border-white/[0.08] flex items-center justify-between group hover:border-[var(--color-accent)] transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[var(--color-accent)] shrink-0">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[var(--color-stone-muted)] uppercase block">GITHUB</span>
                      <span className="font-mono text-xs sm:text-sm font-semibold text-white">github.com/Wilhelm-art</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-[var(--color-stone-muted)] group-hover:text-white transition-colors" />
                    <span className="font-mono text-[10px] text-[var(--color-stone-faint)]">02</span>
                  </div>
                </a>

                {/* 03 WhatsApp Card */}
                <a
                  href="https://wa.me/6285659832513"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 sm:p-5 rounded-2xl bg-[var(--color-canvas-900)] border border-white/[0.08] flex items-center justify-between group hover:border-[var(--color-accent)] transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[var(--color-accent)] shrink-0">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[var(--color-stone-muted)] uppercase block">WHATSAPP</span>
                      <span className="font-mono text-xs sm:text-sm font-semibold text-white">+62 856-5983-2513</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-[var(--color-stone-muted)] group-hover:text-white transition-colors" />
                    <span className="font-mono text-[10px] text-[var(--color-stone-faint)]">03</span>
                  </div>
                </a>

                {/* Send Me a Message Pill Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="w-full py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] shadow-md flex items-center justify-center gap-2 mt-2"
                >
                  <span>SEND ME A MESSAGE &rarr;</span>
                </button>

              </div>

            </div>
          </section>

        </div>

      </div>

      {/* Floating Coffee / Quick Connect Badge (matching reference) */}
      <a
        href="https://wa.me/6285659832513?text=Halo%20Adit,%20saya%20tertarik%20dengan%20portfolio%20Anda"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct Connect & Coffee"
        className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[var(--color-canvas-900)]/90 backdrop-blur-md border border-white/15 hover:border-[var(--color-accent)] text-white shadow-2xl active:scale-95 transition-all group font-mono text-xs"
      >
        <span className="text-sm">☕</span>
        <span className="text-[11px] font-semibold text-[var(--color-paper-100)] group-hover:text-white">
          {isEnglish ? "Connect & Coffee" : "Ngobrol Santai"}
        </span>
      </a>

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[var(--color-canvas-900)]/90 backdrop-blur-md border border-white/20 hover:border-[var(--color-accent)] text-white hover:text-[var(--color-accent)] flex items-center justify-center shadow-2xl active:scale-95 transition-all"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* ========================================================================= */}
      {/* 7. INTERACTIVE CONTACT MODAL (Pop-up dialog)                               */}
      {/* ========================================================================= */}
      {isContactModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsContactModalOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Send a message"
        >
          <div className="relative w-full max-w-lg bg-[var(--color-canvas-900)] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl animate-slideUp">
            
            <button
              type="button"
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[var(--color-stone-muted)] hover:text-white transition-all"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider block mb-1">
              {isEnglish ? "DIRECT MESSAGE" : "KOMUNIKASI LANGSUNG"}
            </span>
            <h3 className="text-2xl font-bold font-display text-white mb-2">
              Send Me a Message
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-stone-muted)] mb-6">
              {isEnglish
                ? "Fill in your details below to reach out to Adit Hardiansyah directly."
                : "Isi pesan di bawah untuk menghubungi Adit Hardiansyah secara langsung."}
            </p>

            <form onSubmit={handleSendModalMessage} className="space-y-4">
              <div>
                <label htmlFor="modal-name" className="block text-xs font-mono text-[var(--color-stone-muted)] uppercase mb-1">
                  Full Name
                </label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  value={modalName}
                  onChange={(e) => setModalName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-canvas-850)] border border-white/10 text-sm text-white focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="modal-email" className="block text-xs font-mono text-[var(--color-stone-muted)] uppercase mb-1">
                  Email Address
                </label>
                <input
                  id="modal-email"
                  type="email"
                  required
                  value={modalEmail}
                  onChange={(e) => setModalEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-canvas-850)] border border-white/10 text-sm text-white focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="modal-message" className="block text-xs font-mono text-[var(--color-stone-muted)] uppercase mb-1">
                  Your Message
                </label>
                <textarea
                  id="modal-message"
                  required
                  rows={4}
                  value={modalMessage}
                  onChange={(e) => setModalMessage(e.target.value)}
                  placeholder="Tell me about your project, idea, or inquiry..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-canvas-850)] border border-white/10 text-sm text-white focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="px-4 py-2 text-xs font-mono uppercase text-[var(--color-stone-muted)] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-white text-black hover:bg-white/90 text-xs font-mono uppercase tracking-wider font-semibold transition-all active:scale-95 flex items-center gap-2 shadow-lg"
                >
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}
