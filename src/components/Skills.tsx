import { motion } from 'motion/react';
import { CERTIFICATIONS_DATA, getSkillsData } from '../lib/constants';
import {
  ShieldCheck,
  Code2,
  Award,
  ArrowUpRight,
  Wrench,
  Languages,
  ClipboardCheck,
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const icons: Record<string, React.ElementType> = {
  'Programming & Frameworks': Code2,
  'Pemrograman & Framework': Code2,
  'Information Technology': Code2,
  'Teknologi Informasi': Code2,
  'Security & Networking': ShieldCheck,
  'Keamanan & Jaringan': ShieldCheck,
  'Cybersecurity & Networking': ShieldCheck,
  'Keamanan Siber & Jaringan': ShieldCheck,
  'Systems & Tools': Wrench,
  'Sistem & Alat': Wrench,
  'Administration & Office': ClipboardCheck,
  'Administrasi & Perkantoran': ClipboardCheck,
  Languages: Languages,
  Bahasa: Languages,
};

export default function Skills() {
  const { t, language } = useLanguage();
  const skillsData = getSkillsData(language);

  return (
    <section id="skills" className="py-12 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tighter text-zinc-950 dark:text-zinc-50 leading-[1.1] geist-font mb-6">
            {t('skills.title')}
          </h2>
          <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400 font-light inter-font">
            {language === 'id' ? 'Daftar alat dan teknologi.' : 'Tools and technologies I use.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category) => {
            const Icon = icons[category.category as keyof typeof icons] || Code2;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="surface-card p-8 md:p-10 flex flex-col justify-between group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div>
                  <div className="mb-6 text-zinc-400 dark:text-zinc-500">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium text-zinc-950 dark:text-zinc-50 geist-font mb-6 tracking-tight">
                    {category.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 text-xs font-medium inter-font"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="surface-card p-8 md:p-10 flex flex-col group md:col-span-2 lg:col-span-1 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div>
              <div className="mb-6 text-zinc-400 dark:text-zinc-500">
                <Award size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-zinc-950 dark:text-zinc-50 geist-font mb-8 tracking-tight">
                {language === 'id' ? 'Sertifikasi' : 'Certifications'}
              </h3>
            </div>

            <div className="flex flex-col gap-4 mt-auto">
              {CERTIFICATIONS_DATA.map((cert) => (
                <a
                  key={cert.title}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group/link"
                >
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover/link:text-zinc-950 dark:group-hover/link:text-zinc-50 transition-colors inter-font">
                    {cert.title}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-zinc-400 group-hover/link:text-zinc-950 dark:group-hover/link:text-zinc-50 transition-colors shrink-0"
                  />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
