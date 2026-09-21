import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, Download, MessageSquare, ShieldCheck, Award, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { projects } from '../data';

export function Home() {
  const { t } = useTranslation();
  const location = useLocation();
  const isEnglish = location.pathname.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';

  // Select 3 standout projects for homepage showcase
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>Adit Hardiansyah Surachman | Software Engineer & Network Security</title>
        <meta name="description" content={t('hero.subheadline')} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Technical Hero Section */}
        <section className="py-16 md:py-24 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Main Narrative Column */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="lg:col-span-8 flex flex-col justify-center"
            >
              <div className="flex items-center gap-2.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] font-medium">
                  {t('hero.role')}
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight text-[var(--color-paper-50)] leading-[1.08] mb-6">
                {t('hero.headline')}
              </h1>

              <p className="text-base sm:text-lg text-[var(--color-stone-muted)] leading-relaxed max-w-2xl mb-8">
                {t('hero.subheadline')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={`${basePath}/projects`}
                  className="bg-[var(--color-accent)] text-slate-950 hover:bg-[var(--color-accent-hover)] active:scale-[0.98] px-6 py-3 text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-2 rounded transition-all shadow-sm"
                >
                  <span>{t('hero.cta_projects')}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  to={`${basePath}/resume`}
                  className="border border-white/20 hover:border-white/40 text-[var(--color-paper-50)] hover:bg-[var(--color-canvas-850)] active:scale-[0.98] px-6 py-3 text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2 rounded transition-all"
                >
                  <Download className="w-4 h-4 text-[var(--color-accent)]" />
                  <span>{t('hero.cta_download')}</span>
                </Link>

                <a
                  href="https://wa.me/6285659832513"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)] px-4 py-3 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors ml-auto sm:ml-0 active:scale-[0.98]"
                  aria-label="Direct message on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4 text-[var(--color-accent)]" />
                  <span>{t('hero.cta_contact')}</span>
                </a>
              </div>
            </motion.div>

            {/* Profile Frame Column */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-4 flex flex-col"
            >
              <div className="border border-white/10 bg-[var(--color-canvas-900)] p-3 rounded-lg shadow-xl shadow-black/20">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-canvas-850)] rounded">
                  <img 
                    src="/assets/profile.jpg" 
                    alt="Adit Hardiansyah Surachman" 
                    className="w-full h-full object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-canvas-950)] via-[var(--color-canvas-950)]/70 to-transparent p-4">
                    <p className="font-mono text-sm font-bold text-[var(--color-paper-50)]">
                      Adit Hardiansyah Surachman
                    </p>
                    <p className="font-mono text-xs text-[var(--color-accent)] mt-0.5">
                      IPK 3.62 / 4.00 • S1 Teknik Informatika
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-stone-muted)] mt-0.5">
                      STMIK Mardira Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Verified Credentials Bar */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="flex items-start gap-4 p-4 rounded-lg bg-[var(--color-canvas-900)]/60 border border-white/5">
              <div className="w-10 h-10 rounded bg-[var(--color-canvas-800)] border border-white/10 flex items-center justify-center text-[var(--color-accent)] shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono text-sm font-bold text-[var(--color-paper-50)]">
                  IPK 3.62 / 4.00
                </div>
                <div className="text-xs text-[var(--color-stone-muted)] mt-0.5">
                  S1 Teknik Informatika, STMIK Mardira Indonesia (2021–2025)
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-[var(--color-canvas-900)]/60 border border-white/5">
              <div className="w-10 h-10 rounded bg-[var(--color-canvas-800)] border border-white/10 flex items-center justify-center text-[var(--color-accent)] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono text-sm font-bold text-[var(--color-paper-50)]">
                  Google Cybersecurity
                </div>
                <div className="text-xs text-[var(--color-stone-muted)] mt-0.5">
                  Sertifikasi Profesional resmi identifikasi ancaman, SIEM & audit keamanan
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-[var(--color-canvas-900)]/60 border border-white/5">
              <div className="w-10 h-10 rounded bg-[var(--color-canvas-800)] border border-white/10 flex items-center justify-center text-[var(--color-accent)] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono text-sm font-bold text-[var(--color-paper-50)]">
                  Sertifikasi BNSP
                </div>
                <div className="text-xs text-[var(--color-stone-muted)] mt-0.5">
                  Standar Kompetensi Kerja Nasional Indonesia bidang Teknisi Komputer
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-20 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] block mb-2 font-medium">
                {t('projects.featured')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-[var(--color-paper-50)]">
                {t('projects.title')}
              </h2>
            </div>
            <Link
              to={`${basePath}/projects`}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--color-stone-muted)] hover:text-[var(--color-accent)] transition-colors group"
            >
              <span>{isEnglish ? "View All Projects" : "Lihat Semua Proyek"}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-10">
            {featuredProjects.map((project, idx) => (
              <article 
                key={project.id}
                className="border border-white/10 bg-[var(--color-canvas-900)] hover:border-[var(--color-accent)]/50 transition-all rounded-lg overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center">
                  
                  {/* Left Column: Visual Project Preview */}
                  <div className="lg:col-span-5">
                    <Link 
                      to={`${basePath}/projects/${project.id}`}
                      className="block relative aspect-[16/10] overflow-hidden rounded bg-[var(--color-canvas-850)] border border-white/10 group"
                    >
                      <img 
                        src={project.screenshot} 
                        alt={project.title}
                        className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-canvas-950)]/60 via-transparent to-transparent opacity-60 group-hover:opacity-10 transition-opacity" />
                    </Link>
                  </div>

                  {/* Right Column: Project Details & Action */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-[var(--color-stone-subtle)]">
                          0{idx + 1} / FEATURED
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.slice(0, 3).map((tech) => (
                            <span 
                              key={tech}
                              className="px-2 py-0.5 text-[10px] font-mono text-[var(--color-stone-muted)] bg-[var(--color-canvas-800)] border border-white/5 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold font-display text-[var(--color-paper-50)] mb-2">
                        <Link 
                          to={`${basePath}/projects/${project.id}`}
                          className="hover:text-[var(--color-accent)] transition-colors"
                        >
                          {project.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-[var(--color-stone-muted)] leading-relaxed">
                        {project.tagline}
                      </p>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm text-[var(--color-stone-muted)] border-t border-white/10 pt-4">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-paper-50)] block mb-0.5 font-medium">
                          {t('projects.problem')}
                        </span>
                        <p className="line-clamp-2 leading-relaxed">{project.problem}</p>
                      </div>
                      <div className="bg-[var(--color-canvas-850)] p-3 rounded border-l-2 border-[var(--color-accent)]">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent)] block mb-0.5 font-medium">
                          {t('projects.impact')}
                        </span>
                        <p className="line-clamp-2 leading-relaxed text-[var(--color-paper-100)]">{project.impact}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Link
                        to={`${basePath}/projects/${project.id}`}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold border border-white/20 hover:border-white/40 text-[var(--color-paper-50)] rounded transition-all active:scale-[0.98]"
                      >
                        <span>{t('projects.view_details')}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] rounded transition-all active:scale-[0.98]"
                        >
                          <span>{t('projects.view_live')}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                  </div>

                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
