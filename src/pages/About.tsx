import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Code2, Database, ShieldCheck, FileText, Server, Globe } from 'lucide-react';

export function About() {
  const { t } = useTranslation();
  const location = useLocation();
  const isEnglish = location.pathname.startsWith('/en');

  const skills = [
    { category: 'Web/Software', icon: Code2, items: ['PHP', 'Python', 'Next.js', 'React', 'Laravel', 'TypeScript', 'Tailwind CSS', 'SQL'] },
    { category: 'Networking & Security', icon: ShieldCheck, items: ['Network Security', 'Threat Analysis', 'Risk Management', 'LAN/WAN', 'System Testing', 'Linux'] },
    { category: 'Administrasi', icon: FileText, items: ['Microsoft Office', 'Google Workspace', 'Pengelolaan Dokumen', 'Surat-menyurat Dinas'] },
    { category: 'Languages', icon: Globe, items: ['Bahasa Indonesia (Native)', 'English (Active)'] },
  ];

  const experience = [
    {
      role: 'Lead Developer',
      company: 'Masjid AT-Tijaniyah',
      date: isEnglish ? 'Mar - Aug 2025' : 'Mar - Agt 2025'
    },
    {
      role: 'Staf IT/Administrasi',
      company: 'Dinas Perdagangan dan Perindustrian Kota Bandung',
      date: isEnglish ? 'Oct 2024 - Jan 2025' : 'Okt 2024 - Jan 2025'
    },
    {
      role: 'Operator Produksi',
      company: 'PT. Bahagia Sejahtera Metalindo',
      date: isEnglish ? 'Aug - Sep 2020' : 'Agt - Sep 2020'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('about.title')} | Adit Hardiansyah Surachman</title>
        <meta name="description" content={t('about.summary')} />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold font-display mb-8">{t('about.title')}<span className="text-accent-red">.</span></h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-16">
            {t('about.summary')}
          </p>

          <div className="space-y-16">
            <section>
              <h2 className="text-2xl font-bold font-display mb-6 border-b border-white/10 pb-2">{t('about.experience')}</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
                {experience.map((exp, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-base-900 text-gray-400 group-hover:text-accent-red group-hover:border-accent-red transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                      <Server className="w-5 h-5" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-base-800 p-6 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex flex-col mb-1">
                        <h3 className="font-bold text-lg text-white">{exp.role}</h3>
                        <span className="text-accent-red font-mono text-sm">{exp.date}</span>
                      </div>
                      <div className="text-gray-400">{exp.company}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display mb-6 border-b border-white/10 pb-2">{t('about.education')} & {t('about.certifications')}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-base-800 p-6 rounded-lg border border-white/5">
                  <h3 className="font-bold text-lg text-white mb-4">{t('about.education')}</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium">STMIK Mardira Indonesia</div>
                      <div className="text-sm text-gray-400">S1 Teknik Informatika (GPA: 3.61/4.00)</div>
                      <div className="text-xs text-accent-red font-mono mt-1">2021 - 2025</div>
                    </div>
                    <div>
                      <div className="font-medium">SMK Mahardhika Batujajar</div>
                      <div className="text-sm text-gray-400">Teknik Pemesinan</div>
                    </div>
                  </div>
                </div>
                <div className="bg-base-800 p-6 rounded-lg border border-white/5">
                  <h3 className="font-bold text-lg text-white mb-4">{t('about.certifications')}</h3>
                  <ul className="space-y-4">
                    <li>
                      <a href="https://drive.google.com/file/d/1HOwxuX834gxiyAHmYR59sBcSmdvgTZpZ/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="block group">
                        <div className="font-medium group-hover:text-accent-red transition-colors">Google Cybersecurity Certificate</div>
                        <div className="text-xs text-gray-500 font-mono mt-1">2026</div>
                      </a>
                    </li>
                    <li>
                      <a href="https://drive.google.com/file/d/1OPbuB9XTssClEjfKDS-APmF7KQJ46t5v/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="block group">
                        <div className="font-medium group-hover:text-accent-red transition-colors">BNSP Teknik Pemesinan</div>
                        <div className="text-xs text-gray-500 font-mono mt-1">2021</div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display mb-6 border-b border-white/10 pb-2">{t('about.skills')}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {skills.map((skillGroup, index) => {
                  const Icon = skillGroup.icon;
                  return (
                    <div key={index} className="bg-base-800 p-6 rounded-lg border border-white/5">
                      <div className="flex items-center mb-4 text-gray-300">
                        <Icon className="w-5 h-5 mr-2 text-accent-red" />
                        <h3 className="font-bold">{skillGroup.category}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((item, i) => (
                          <span key={i} className="px-3 py-1 bg-base-900 border border-white/10 rounded-full text-sm text-gray-300">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </>
  );
}
