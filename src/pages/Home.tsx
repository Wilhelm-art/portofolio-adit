import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Download, 
  MessageSquare, 
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
  Smartphone
} from 'lucide-react';
import { projects } from '../data';

export function Home() {
  const { t } = useTranslation();
  const location = useLocation();
  const isEnglish = location.pathname.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';

  // 3D Deck active card index
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  
  // Contact modal state
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const featuredDeck = projects.slice(0, 5);
  const activeProject = featuredDeck[activeCardIdx] || featuredDeck[0];

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
        <title>Adit Hardiansyah Surachman | Software Engineer & Network Security</title>
        <meta name="description" content={t('hero.subheadline')} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Amati, Tiru, Modifikasi: Outline Typography + Portrait)   */}
        {/* ========================================================================= */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-white/[0.08] overflow-hidden">
          
          {/* Subtle ambient glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--color-accent)]/8 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Background Big Outline Typography */}
          <div 
            aria-hidden="true" 
            className="absolute top-6 left-1/2 -translate-x-1/2 w-full select-none pointer-events-none flex justify-center text-center opacity-30 md:opacity-40 -z-10 whitespace-nowrap"
          >
            <span className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tight uppercase text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]">
              ADIT HARDIANSYAH
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 pt-6 lg:pt-0">
              
              <div className="flex items-center gap-2 mb-5">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-medium bg-[var(--color-accent-muted)] px-3 py-1 rounded-full border border-[var(--color-accent-border)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                  {t('hero.role')}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-6xl font-bold font-display tracking-tight text-[var(--color-paper-50)] leading-[1.08] mb-5">
                {t('hero.headline')}
              </h1>

              <p className="text-base sm:text-lg text-[var(--color-stone-muted)] leading-relaxed max-w-xl mb-8">
                {t('hero.subheadline')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#work-gallery"
                  className="bg-[var(--color-paper-50)] text-[var(--color-canvas-950)] hover:bg-white active:scale-[0.98] px-6 py-3 text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2 rounded-full transition-all shadow-md"
                >
                  <span>{t('hero.cta_projects')}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  to={`${basePath}/resume`}
                  className="border border-white/15 hover:border-white/30 text-[var(--color-paper-50)] hover:bg-[var(--color-canvas-850)] active:scale-[0.98] px-5 py-3 text-xs font-mono uppercase tracking-wider font-medium flex items-center gap-2 rounded-full transition-all"
                >
                  <Download className="w-4 h-4 text-[var(--color-accent)]" />
                  <span>{t('hero.cta_download')}</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)] px-4 py-3 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4 text-[var(--color-accent)]" />
                  <span>{t('hero.cta_contact')}</span>
                </button>
              </div>

              {/* Micro specs */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-xs font-mono text-[var(--color-stone-muted)]">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                  STMIK Mardira Indonesia (IPK 3.62)
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                  Google Cybersecurity & BNSP
                </span>
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                  Bandung, Indonesia
                </span>
              </div>
            </div>

            {/* Right: Centerpiece Portrait Cutout Frame */}
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <div className="relative group w-full max-w-sm sm:max-w-md">
                
                {/* Back decorative glowing ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[var(--color-accent)]/20 via-transparent to-white/10 blur-xl group-hover:blur-2xl transition-all duration-500 -z-10" />

                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-[var(--color-canvas-850)] to-[var(--color-canvas-950)] shadow-2xl p-2.5">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[var(--color-canvas-900)]">
                    <img 
                      src="/assets/profile.jpg" 
                      alt="Adit Hardiansyah Surachman" 
                      loading="eager"
                      fetchPriority="high"
                      width="400"
                      height="500"
                      className="w-full h-full object-cover object-top filter contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    
                    {/* Dark gradient overlay bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-canvas-950)] via-[var(--color-canvas-950)]/70 to-transparent p-5 flex flex-col justify-end">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-display font-semibold text-base text-[var(--color-paper-50)]">
                            Adit Hardiansyah
                          </p>
                          <p className="font-mono text-xs text-[var(--color-accent)]">
                            Software Engineer & Security
                          </p>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-white/10 backdrop-blur-md border border-white/15 font-mono text-[10px] text-[var(--color-paper-50)] uppercase">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating scroll indicator */}
                <div className="hidden lg:flex absolute -right-12 bottom-6 rotate-90 origin-bottom-left items-center gap-2 text-[10px] font-mono tracking-widest text-[var(--color-stone-muted)] uppercase select-none">
                  <span>SCROLL DOWN</span>
                  <div className="w-8 h-[1px] bg-white/20" />
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. WORK GALLERY (3D Stack / Fanned Interactive Project Deck)               */}
        {/* ========================================================================= */}
        <section id="work-gallery" className="py-20 border-b border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] block mb-2 font-medium">
                SELECTED WORK
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--color-paper-50)]">
                Work Gallery
              </h2>
              <p className="text-sm text-[var(--color-stone-muted)] mt-2">
                {isEnglish 
                  ? "A curated collection of production systems, digital platforms, and technical tools I've built." 
                  : "Koleksi sistem produksi nyata, storefront digital, dan perkakas teknis yang saya bangun."}
              </p>
            </div>

            <Link
              to={`${basePath}/projects`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono uppercase tracking-wider text-[var(--color-paper-50)] transition-all active:scale-[0.98] shrink-0"
            >
              <span>{isEnglish ? "View All Projects" : "Lihat Semua Proyek"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Interactive 3D Deck Showcase */}
          <div className="relative bg-[var(--color-canvas-900)] border border-white/[0.08] rounded-2xl p-6 sm:p-10 shadow-xl overflow-hidden">
            
            {/* Overlapping Fanned Card Stack */}
            <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center my-4">
              {featuredDeck.map((project, idx) => {
                const offset = idx - activeCardIdx;
                const isSelected = idx === activeCardIdx;
                
                // 3D positioning styles
                let transformStyle = '';
                let zIndex = 10;
                let opacity = 0.5;

                if (isSelected) {
                  transformStyle = 'translateX(0) scale(1) rotate(0deg)';
                  zIndex = 30;
                  opacity = 1;
                } else if (offset === -1 || (offset > 0 && offset === featuredDeck.length - 1)) {
                  transformStyle = 'translateX(-120px) scale(0.85) rotate(-6deg)';
                  zIndex = 20;
                  opacity = 0.65;
                } else if (offset === 1 || (offset < 0 && Math.abs(offset) === featuredDeck.length - 1)) {
                  transformStyle = 'translateX(120px) scale(0.85) rotate(6deg)';
                  zIndex = 20;
                  opacity = 0.65;
                } else if (offset < -1) {
                  transformStyle = 'translateX(-220px) scale(0.7) rotate(-12deg)';
                  zIndex = 10;
                  opacity = 0.35;
                } else {
                  transformStyle = 'translateX(220px) scale(0.7) rotate(12deg)';
                  zIndex = 10;
                  opacity = 0.35;
                }

                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setActiveCardIdx(idx)}
                    style={{
                      transform: transformStyle,
                      zIndex,
                      opacity
                    }}
                    className={`absolute w-64 sm:w-80 md:w-96 aspect-[16/10] rounded-xl overflow-hidden border transition-all duration-500 ease-out cursor-pointer shadow-2xl focus:outline-none ${
                      isSelected 
                        ? 'border-[var(--color-accent)] ring-4 ring-[var(--color-accent)]/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]' 
                        : 'border-white/15 hover:border-white/30'
                    }`}
                  >
                    <img 
                      src={project.screenshot} 
                      alt={project.title}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                      <span className="font-mono text-xs font-semibold text-white truncate">
                        {project.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Deck Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-2 mb-8">
              <button
                type="button"
                onClick={() => setActiveCardIdx((prev) => (prev > 0 ? prev - 1 : featuredDeck.length - 1))}
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
                onClick={() => setActiveCardIdx((prev) => (prev < featuredDeck.length - 1 ? prev + 1 : 0))}
                aria-label="Next Project"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 flex items-center justify-center text-white transition-all active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Active Project Highlight Details */}
            <div className="border-t border-white/[0.08] pt-8 max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[var(--color-accent)] font-semibold bg-[var(--color-accent)]/10 px-2.5 py-1 rounded border border-[var(--color-accent)]/20">
                    PROJECT 0{activeCardIdx + 1}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-[var(--color-paper-50)]">
                    {activeProject.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-2">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--color-paper-50)] text-[var(--color-canvas-950)] text-xs font-mono font-semibold hover:bg-white transition-all active:scale-[0.98]"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {activeProject.repoUrl && (
                    <a
                      href={activeProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-mono transition-all active:scale-[0.98]"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                  <Link
                    to={`${basePath}/projects/${activeProject.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/15 hover:border-[var(--color-accent)] text-[var(--color-accent)] text-xs font-mono transition-all active:scale-[0.98]"
                  >
                    <span>{t('projects.view_details')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[var(--color-stone-muted)] leading-relaxed mb-5">
                {activeProject.tagline}
              </p>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {activeProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono text-[var(--color-paper-100)] bg-[var(--color-canvas-800)] border border-white/[0.08] rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Impact / Solution Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--color-canvas-850)]/70 p-4 rounded-xl border border-white/[0.06]">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-paper-50)] block mb-1 font-semibold">
                    {t('projects.problem')}
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--color-stone-muted)] leading-relaxed">
                    {activeProject.problem}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent)] block mb-1 font-semibold">
                    {t('projects.impact')}
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--color-paper-100)] leading-relaxed">
                    {activeProject.impact}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. WHAT I CAN DO (Capabilities, Tech Grid & Domain Pillars)                */}
        {/* ========================================================================= */}
        <section id="capabilities" className="py-20 border-b border-white/[0.08]">
          <div className="mb-14">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] block mb-2 font-medium">
              MY CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--color-paper-50)]">
              What I Can Do
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-stone-muted)] max-w-2xl mt-2 leading-relaxed">
              {isEnglish
                ? "I combine full-stack engineering, system design, and verified network security practices to build reliable, high-performance digital solutions."
                : "Saya memadukan rekayasa perangkat lunak full-stack, desain sistem terdistribusi, dan audit keamanan jaringan untuk membangun solusi digital yang tangguh dan teruji."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Tech Stack Icon Grid */}
            <div className="lg:col-span-5 grid grid-cols-3 sm:grid-cols-4 gap-3">
              {techIcons.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.name}
                    className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[var(--color-canvas-900)] border border-white/[0.08] hover:border-[var(--color-accent)] hover:bg-[var(--color-canvas-850)] hover:scale-105 transition-all group cursor-default shadow-sm"
                  >
                    <IconComponent className="w-6 h-6 text-[var(--color-stone-muted)] group-hover:text-[var(--color-accent)] transition-colors mb-2" />
                    <span className="font-mono text-[10px] text-center text-[var(--color-stone-muted)] group-hover:text-[var(--color-paper-50)] transition-colors leading-tight">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Right: 2 Domain Pillars */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Pillar 01 */}
              <div className="border border-white/[0.08] bg-[var(--color-canvas-900)] p-6 sm:p-8 rounded-2xl hover:border-white/20 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-bold text-[var(--color-accent)]">
                    01
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-[11px] text-[var(--color-stone-muted)] uppercase">
                    Software & Systems
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-[var(--color-paper-50)] mb-3">
                  Full-Stack Web & Mobile Engineering
                </h3>
                <p className="text-sm text-[var(--color-stone-muted)] leading-relaxed mb-5">
                  Membangun aplikasi web dan mobile siap produksi dengan arsitektur bersih, pemodelan basis data yang kokoh, performa SEO teknis, serta UI modern yang intuitif dan taktil.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Next.js 16', 'React Native / Expo', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker', 'RESTful API', 'Stateless Architecture'].map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 text-xs font-mono text-[var(--color-paper-100)] bg-[var(--color-canvas-800)] border border-white/[0.06] rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pillar 02 */}
              <div className="border border-white/[0.08] bg-[var(--color-canvas-900)] p-6 sm:p-8 rounded-2xl hover:border-white/20 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-bold text-[var(--color-accent)]">
                    02
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-[11px] text-[var(--color-stone-muted)] uppercase">
                    Security & Infrastructure
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-[var(--color-paper-50)] mb-3">
                  Network Security & Systems Audit
                </h3>
                <p className="text-sm text-[var(--color-stone-muted)] leading-relaxed mb-5">
                  Menerapkan metodologi keamanan berbasis bukti untuk memitigasi celah kerentanan, memperkuat HTTP security headers (HSTS, CSP), manajemen hak akses, dan audit kepatuhan teknis.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Google Cybersecurity', 'Sertifikasi BNSP', 'Threat Modeling', 'CSP & HSTS Hardening', 'Vulnerability Assessment', 'Input Sanitization'].map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 text-xs font-mono text-[var(--color-paper-100)] bg-[var(--color-canvas-800)] border border-white/[0.06] rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. ABOUT & INTERACTIVE TRAITS SECTION                                      */}
        {/* ========================================================================= */}
        <section id="about" className="py-20 border-b border-white/[0.08]">
          <div className="mb-14">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] block mb-2 font-medium">
              ABOUT ME
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--color-paper-50)]">
              Problem Solver. Systems Engineer.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Bio & Credential Card */}
            <div className="lg:col-span-8 border border-white/[0.08] bg-[var(--color-canvas-900)] p-6 sm:p-8 rounded-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-white/[0.08] mb-6">
                <img 
                  src="/assets/profile.jpg" 
                  alt="Adit Hardiansyah" 
                  className="w-16 h-16 rounded-full object-cover object-top border-2 border-[var(--color-accent)] shadow-md"
                />
                <div>
                  <h3 className="text-xl font-bold font-display text-[var(--color-paper-50)]">
                    Adit Hardiansyah Surachman
                  </h3>
                  <p className="font-mono text-xs text-[var(--color-accent)] mt-0.5">
                    S1 Teknik Informatika • STMIK Mardira Indonesia (IPK 3.62 / 4.00)
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[var(--color-stone-muted)] leading-relaxed mb-6">
                Saya adalah lulusan Teknik Informatika dengan fokus ganda pada **rekayasa perangkat lunak modern** dan **keamanan sistem informasi**. Berpengalaman merancang dan meluncurkan sistem nyata mulai dari marketplace gadget dengan KYC admin, platform bisnis UMKM mobile di Cimahi, hingga sistem kas transparansi publik masjid.
              </p>

              {/* Status Trackers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08]">
                <div className="p-3 rounded-lg bg-[var(--color-canvas-850)] border border-white/[0.06]">
                  <span className="font-mono text-[10px] text-[var(--color-stone-muted)] uppercase block mb-1">Currently Building</span>
                  <span className="font-mono text-xs text-[var(--color-paper-50)] font-semibold">GadgetVault & Meracik Ide</span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-canvas-850)] border border-white/[0.06]">
                  <span className="font-mono text-[10px] text-[var(--color-stone-muted)] uppercase block mb-1">Exploring</span>
                  <span className="font-mono text-xs text-[var(--color-paper-50)] font-semibold">Threat Modeling & Hardening</span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-canvas-850)] border border-white/[0.06]">
                  <span className="font-mono text-[10px] text-[var(--color-stone-muted)] uppercase block mb-1">Learning</span>
                  <span className="font-mono text-xs text-[var(--color-paper-50)] font-semibold">Distributed Architecture</span>
                </div>
              </div>
            </div>

            {/* Right: Floating Tactile Trait Cards */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3.5">
              {[
                { title: 'Problem Solver', desc: 'Fokus pada solusi praktis nyata yang memberi dampak.', rotate: 'rotate-1' },
                { title: 'Security-First', desc: 'Memastikan integritas kode, validasi input, dan protokol aman.', rotate: '-rotate-1' },
                { title: 'Detail-Oriented', desc: 'Sensitivitas tinggi pada kerapian kode dan estetika UI.', rotate: 'rotate-2' },
                { title: 'Continuous Learner', desc: 'Selalu beradaptasi dengan stack modern dan standar industri.', rotate: '-rotate-2' },
              ].map((trait) => (
                <div
                  key={trait.title}
                  className={`p-4 rounded-xl bg-[var(--color-canvas-900)] border border-white/[0.08] hover:border-[var(--color-accent)] hover:scale-[1.02] transition-all cursor-default shadow-md ${trait.rotate}`}
                >
                  <span className="font-mono text-[10px] uppercase text-[var(--color-accent)] font-semibold block mb-1">
                    TRAIT
                  </span>
                  <h4 className="font-display font-bold text-sm text-[var(--color-paper-50)] mb-1">
                    {trait.title}
                  </h4>
                  <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                    {trait.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. AWARDS, ACHIEVEMENTS & CERTIFICATIONS                                  */}
        {/* ========================================================================= */}
        <section id="awards" className="py-20 border-b border-white/[0.08]">
          <div className="mb-14">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] block mb-2 font-medium">
              RECOGNITION
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--color-paper-50)]">
              Awards & Certifications
            </h2>
            <p className="text-sm text-[var(--color-stone-muted)] mt-2">
              Bukti kualifikasi akademik dan sertifikasi resmi berstandar nasional dan global.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="border border-white/[0.08] bg-[var(--color-canvas-900)] p-6 rounded-2xl hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--color-canvas-800)] border border-white/10 flex items-center justify-center text-[var(--color-accent)] mb-4">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent)] font-semibold block mb-1">
                  AKADEMIK
                </span>
                <h3 className="text-lg font-bold font-display text-[var(--color-paper-50)] mb-2">
                  Lulusan Terbaik (IPK 3.62 / 4.00)
                </h3>
                <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                  Menyelesaikan jenjang Sarjana Teknik Informatika di STMIK Mardira Indonesia dengan predikat kelulusan sangat memuaskan (Dean's List caliber).
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] font-mono text-[11px] text-[var(--color-stone-subtle)]">
                2021 – 2025 • Bandung
              </div>
            </div>

            <div className="border border-white/[0.08] bg-[var(--color-canvas-900)] p-6 rounded-2xl hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--color-canvas-800)] border border-white/10 flex items-center justify-center text-[var(--color-accent)] mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent)] font-semibold block mb-1">
                  GLOBAL CERTIFICATION
                </span>
                <h3 className="text-lg font-bold font-display text-[var(--color-paper-50)] mb-2">
                  Google Cybersecurity Professional
                </h3>
                <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                  Sertifikasi resmi dalam identifikasi kerentanan sistem, pengoperasian SIEM, mitigasi ancaman siber, dan penulisan skrip otomasi deteksi.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] font-mono text-[11px] text-[var(--color-stone-subtle)]">
                Google Career Certificates
              </div>
            </div>

            <div className="border border-white/[0.08] bg-[var(--color-canvas-900)] p-6 rounded-2xl hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--color-canvas-800)] border border-white/10 flex items-center justify-center text-[var(--color-accent)] mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent)] font-semibold block mb-1">
                  STANDAR NASIONAL
                </span>
                <h3 className="text-lg font-bold font-display text-[var(--color-paper-50)] mb-2">
                  Sertifikasi Profesi BNSP
                </h3>
                <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                  Badan Nasional Sertifikasi Profesi (BNSP) Republik Indonesia bidang Teknisi Komputer dan Infrastruktur Jaringan Kerja.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] font-mono text-[11px] text-[var(--color-stone-subtle)]">
                BNSP RI
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. CONTACT SECTION & MODAL TRIGGER ("LET'S WORK TOGETHER")                */}
        {/* ========================================================================= */}
        <section id="contact" className="py-20 md:py-28">
          <div className="border border-white/[0.08] bg-[var(--color-canvas-900)] rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-accent)]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold block mb-3">
                  GET IN TOUCH
                </span>
                <h2 className="text-4xl sm:text-6xl font-bold font-display tracking-tight text-[var(--color-paper-50)] mb-5">
                  Let's Work Together
                </h2>
                <p className="text-base sm:text-lg text-[var(--color-stone-muted)] leading-relaxed max-w-xl mb-8">
                  {isEnglish
                    ? "Looking for the next problem worth solving. I'm open to opportunities where I can contribute to software engineering, web development, and secure IT infrastructure."
                    : "Terbuka untuk peluang kerja full-time, kontrak rekayasa software, pengembangan sistem web/mobile, dan audit keamanan sistem."}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(true)}
                    className="bg-[var(--color-paper-50)] text-[var(--color-canvas-950)] hover:bg-white active:scale-[0.98] px-6 py-3 text-xs font-mono uppercase tracking-wider font-semibold rounded-full flex items-center gap-2 shadow-lg transition-all"
                  >
                    <span>Send Me A Message</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <Link
                    to={`${basePath}/resume`}
                    className="border border-white/20 hover:border-white/40 text-[var(--color-paper-50)] px-6 py-3 text-xs font-mono uppercase tracking-wider rounded-full transition-all active:scale-[0.98]"
                  >
                    Download Resume
                  </Link>
                </div>
              </div>

              {/* Quick Contact Direct Cards */}
              <div className="lg:col-span-5 space-y-3.5">
                
                {/* 01 Email */}
                <div className="p-4 rounded-xl bg-[var(--color-canvas-850)] border border-white/[0.08] flex items-center justify-between group hover:border-[var(--color-accent)] transition-all">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[var(--color-accent)]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[var(--color-stone-muted)] uppercase block">01 EMAIL</span>
                      <span className="font-mono text-xs font-semibold text-[var(--color-paper-50)]">adithardiansyah091@gmail.com</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded hover:bg-white/10 text-[var(--color-stone-muted)] hover:text-white transition-all"
                    aria-label="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* 02 GitHub */}
                <a
                  href="https://github.com/Wilhelm-art"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[var(--color-canvas-850)] border border-white/[0.08] flex items-center justify-between group hover:border-[var(--color-accent)] transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[var(--color-accent)]">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[var(--color-stone-muted)] uppercase block">02 GITHUB</span>
                      <span className="font-mono text-xs font-semibold text-[var(--color-paper-50)]">github.com/Wilhelm-art</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[var(--color-stone-muted)] group-hover:text-white transition-colors" />
                </a>

                {/* 03 WhatsApp */}
                <a
                  href="https://wa.me/6285659832513"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[var(--color-canvas-850)] border border-white/[0.08] flex items-center justify-between group hover:border-[var(--color-accent)] transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[var(--color-accent)]">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[var(--color-stone-muted)] uppercase block">03 WHATSAPP</span>
                      <span className="font-mono text-xs font-semibold text-[var(--color-paper-50)]">+62 856-5983-2513</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[var(--color-stone-muted)] group-hover:text-white transition-colors" />
                </a>

              </div>

            </div>

          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* 7. INTERACTIVE CONTACT MODAL (Pop-up dialog)                               */}
      {/* ========================================================================= */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[var(--color-canvas-900)] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
            
            <button
              type="button"
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[var(--color-stone-muted)] hover:text-white transition-all"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-wider block mb-1">
              KOMUNIKASI LANGSUNG
            </span>
            <h3 className="text-2xl font-bold font-display text-[var(--color-paper-50)] mb-2">
              Send Me a Message
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-stone-muted)] mb-6">
              Isi pesan di bawah untuk menghubungi Adit Hardiansyah secara langsung.
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
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--color-canvas-850)] border border-white/10 text-sm text-[var(--color-paper-50)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
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
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--color-canvas-850)] border border-white/10 text-sm text-[var(--color-paper-50)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
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
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--color-canvas-850)] border border-white/10 text-sm text-[var(--color-paper-50)] focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-none"
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
                  className="px-6 py-2.5 rounded-full bg-[var(--color-paper-50)] text-[var(--color-canvas-950)] hover:bg-white text-xs font-mono uppercase tracking-wider font-semibold transition-all active:scale-[0.98] flex items-center gap-2"
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
