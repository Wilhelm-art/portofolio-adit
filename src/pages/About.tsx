import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowUpRight, GraduationCap, ShieldCheck } from 'lucide-react';

export function About() {
  const { t } = useTranslation();
  const location = useLocation();
  const isEnglish = location.pathname.startsWith('/en');

  const skills = [
    {
      category: isEnglish ? 'Full-Stack Development' : 'Pengembangan Web Full-Stack',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Laravel 10', 'PHP', 'Python', 'SQL & PostgreSQL', 'Prisma ORM']
    },
    {
      category: isEnglish ? 'Network Security & Systems' : 'Keamanan Jaringan & Sistem',
      items: ['Threat Analysis', 'SIEM & Log Monitoring', 'Network Hardening', 'LAN / WAN Configuration', 'Linux Administration', 'Docker']
    },
    {
      category: isEnglish ? 'Operational & Administrative' : 'Administrasi & Alur Kerja',
      items: ['Manajemen Dokumen Teknis', 'Google Workspace', 'SOP & Pengujian Sistem', 'Laporan Keuangan & Akuntabilitas']
    }
  ];

  const experience = [
    {
      role: 'Lead Developer',
      organization: 'Masjid AT-Tijaniyah',
      period: isEnglish ? 'Mar – Aug 2025' : 'Mar – Agt 2025',
      location: 'Cimahi / Bandung',
      description: isEnglish
        ? 'Designed and deployed an automated, transparent financial ledger with live public cash-flow dashboard and prayer time tracking widget.'
        : 'Merancang dan mengimplementasikan sistem pembukuan kas digital masjid dengan dasbor transparansi publik serta modul waktu salat otomatis.'
    },
    {
      role: isEnglish ? 'IT & Administration Staff' : 'Staf IT / Administrasi',
      organization: isEnglish ? 'Department of Trade and Industry, Bandung City' : 'Dinas Perdagangan dan Perindustrian Kota Bandung',
      period: isEnglish ? 'Oct 2024 – Jan 2025' : 'Okt 2024 – Jan 2025',
      location: 'Bandung',
      description: isEnglish
        ? 'Assisted in internal IT maintenance, hardware and network troubleshooting, and municipal official documentation processing.'
        : 'Mengelola pemeliharaan perangkat keras dan jaringan komputer kantor serta mengurus surat-menyurat dan arsip digital dinas.'
    },
    {
      role: isEnglish ? 'Production Operator' : 'Operator Produksi',
      organization: 'PT. Bahagia Sejahtera Metalindo',
      period: isEnglish ? 'Aug – Sep 2020' : 'Agt – Sep 2020',
      location: 'Bandung Barat',
      description: isEnglish
        ? 'Executed machine operations and industrial precision fabrication in accordance with strict quality assurance standards.'
        : 'Menjalankan operasional mesin pemesinan presisi dan inspeksi mutu komponen industri manufaktur.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('about.title')} | Adit Hardiansyah Surachman</title>
        <meta name="description" content={t('about.summary')} />
      </Helmet>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          
          {/* Header */}
          <header className="border-b border-white/10 pb-12 mb-14">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] font-medium">
                {isEnglish ? "Biographical Overview" : "Ringkasan Profil"}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-[var(--color-paper-50)] mb-6">
              {t('about.title')}
            </h1>
            <p className="text-lg sm:text-xl text-[var(--color-paper-100)] leading-relaxed max-w-3xl">
              {t('about.summary')}
            </p>
          </header>

          <div className="space-y-16">

            {/* Experience Section */}
            <section className="border-b border-white/10 pb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-display text-[var(--color-paper-50)]">
                  {t('about.experience')}
                </h2>
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-stone-muted)]">
                  2020 – 2025
                </span>
              </div>

              <div className="divide-y divide-white/5">
                {experience.map((item, index) => (
                  <div key={index} className="py-7 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-4">
                      <span className="font-mono text-xs text-[var(--color-accent)] block mb-1 font-medium">
                        {item.period}
                      </span>
                      <h3 className="text-lg font-bold font-display text-[var(--color-paper-50)]">
                        {item.role}
                      </h3>
                      <p className="text-xs font-mono text-[var(--color-stone-muted)] mt-1">
                        {item.organization} • {item.location}
                      </p>
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-sm text-[var(--color-stone-muted)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education & Certifications Section */}
            <section className="border-b border-white/10 pb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* Education */}
                <div>
                  <h2 className="text-2xl font-bold font-display text-[var(--color-paper-50)] mb-6 flex items-center gap-2.5">
                    <GraduationCap className="w-5 h-5 text-[var(--color-accent)]" />
                    <span>{t('about.education')}</span>
                  </h2>

                  <div className="space-y-4">
                    <div className="border border-white/10 bg-[var(--color-canvas-900)] p-6 rounded-lg">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-sm font-bold text-[var(--color-paper-50)]">
                          STMIK Mardira Indonesia
                        </span>
                        <span className="font-mono text-xs text-[var(--color-stone-muted)]">
                          2021 – 2025
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-stone-muted)] mb-3">
                        S1 Teknik Informatika • Bandung, Indonesia
                      </p>
                      <div className="inline-block px-3 py-1 text-xs font-mono bg-[var(--color-canvas-800)] text-[var(--color-accent)] border border-white/10 rounded font-semibold">
                        IPK: 3.62 / 4.00 (Sangat Memuaskan)
                      </div>
                    </div>

                    <div className="border border-white/10 bg-[var(--color-canvas-900)] p-6 rounded-lg">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-sm font-bold text-[var(--color-paper-50)]">
                          SMK Mahardhika Batujajar
                        </span>
                        <span className="font-mono text-xs text-[var(--color-stone-muted)]">
                          2017 – 2020
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-stone-muted)]">
                        Teknik Pemesinan • Bandung Barat
                      </p>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h2 className="text-2xl font-bold font-display text-[var(--color-paper-50)] mb-6 flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[var(--color-accent)]" />
                    <span>{t('about.certifications')}</span>
                  </h2>

                  <div className="space-y-4">
                    
                    <div className="border border-white/10 bg-[var(--color-canvas-900)] p-6 rounded-lg">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-sm font-bold text-[var(--color-paper-50)]">
                          Google Cybersecurity Certificate
                        </span>
                        <span className="font-mono text-xs text-[var(--color-stone-muted)]">
                          2026
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-stone-muted)] mb-4">
                        Penerbit: Google (Coursera Verified) • Keamanan Jaringan, Deteksi Ancaman, SIEM & Python.
                      </p>
                      <a
                        href="https://drive.google.com/file/d/1HOwxuX834gxiyAHmYR59sBcSmdvgTZpZ/view?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors active:scale-[0.98]"
                      >
                        <span>Verifikasi Dokumen Sertifikat</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="border border-white/10 bg-[var(--color-canvas-900)] p-6 rounded-lg">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-sm font-bold text-[var(--color-paper-50)]">
                          Sertifikasi BNSP Teknisi Komputer
                        </span>
                        <span className="font-mono text-xs text-[var(--color-stone-muted)]">
                          2025
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-stone-muted)] mb-4">
                        Badan Nasional Sertifikasi Profesi • Standar Kompetensi Nasional Indonesia.
                      </p>
                      <a
                        href="https://drive.google.com/file/d/1J_E7l4kE1z2M3N4O5P6Q7R8S9T0U1V2W/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)] transition-colors active:scale-[0.98]"
                      >
                        <span>Sertifikat Kompetensi Kerja</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* Technical Skills Section */}
            <section>
              <h2 className="text-2xl font-bold font-display text-[var(--color-paper-50)] mb-8">
                {t('about.skills')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skills.map((group, index) => (
                  <div 
                    key={index}
                    className="border border-white/10 bg-[var(--color-canvas-900)] p-6 rounded-lg"
                  >
                    <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--color-paper-50)] pb-3 mb-4 border-b border-white/5 font-semibold">
                      {group.category}
                    </h3>
                    <ul className="space-y-2">
                      {group.items.map((skill, sIdx) => (
                        <li key={sIdx} className="text-xs font-mono text-[var(--color-stone-muted)] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/60" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

          </div>

        </motion.div>
      </div>
    </>
  );
}
