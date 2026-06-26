import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { getOtherProjects, getFeaturedProject } from '../lib/constants';
import { useLanguage } from '../lib/LanguageContext';

export default function Projects() {
  const { language } = useLanguage();
  const featured = getFeaturedProject(language);
  const others = getOtherProjects(language);
  const allProjects = [featured, ...others];

  return (
    <section id="projects" className="py-12 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="mb-20">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tighter text-zinc-950 dark:text-zinc-50 leading-[1.1] geist-font">
            {language === 'id' ? 'Karya' : 'Work'}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-400 font-light inter-font">
            {language === 'id'
              ? 'Pilihan proyek yang mendemonstrasikan eksplorasi teknis dan fokus keamanan.'
              : 'Selected projects demonstrating technical exploration and security focus.'}
          </p>
        </div>

        <div className="flex flex-col gap-24 sm:gap-32">
          {allProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col lg:flex-row gap-8 lg:gap-16 group"
            >
              {/* Project Info */}
              <div className="w-full lg:w-1/3 flex flex-col justify-between order-2 lg:order-1 pt-4">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-medium text-zinc-950 dark:text-zinc-50 tracking-tight geist-font mb-4">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed inter-font mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-300 text-xs font-medium tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-zinc-950 dark:text-zinc-50 font-medium font-display tracking-wide uppercase text-sm hover:text-zinc-500 transition-colors"
                  >
                    {language === 'id' ? 'Kode Sumber' : 'Source Code'}
                    <ArrowUpRight size={16} />
                  </a>
                  {project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 font-medium font-display tracking-wide uppercase text-sm transition-colors"
                    >
                      {language === 'id' ? 'Lihat Demo' : 'View Demo'}
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Image */}
              <div className="w-full lg:w-2/3 order-1 lg:order-2">
                <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden shadow-2xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top grayscale-[30%] group-hover:grayscale-0 scale-[1.02] group-hover:scale-100 transition-all duration-700 ease-out"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
