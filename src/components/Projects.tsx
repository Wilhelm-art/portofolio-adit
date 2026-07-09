import { ArrowUpRight } from 'lucide-react';
import { getOtherProjects, getFeaturedProject } from '../lib/constants';
import { useLanguage } from '../lib/LanguageContext';
import { InView } from './ui/in-view';
import { TextEffect } from './ui/text-effect';

export default function Projects() {
  const { language } = useLanguage();
  const featured = getFeaturedProject(language);
  const others = getOtherProjects(language);
  const allProjects = [featured, ...others];

  return (
    <section id="projects" className="py-12 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="mb-20">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tighter text-[#284A60] leading-[1.1] geist-font">
            <TextEffect per="word" preset="fade-in-up">
              {language === 'id' ? 'Karya' : 'Work'}
            </TextEffect>
          </h2>
          <TextEffect per="line" preset="blur" delay={0.2} className="mt-6 max-w-xl text-lg text-[#5D5F5E] font-light inter-font">
            {language === 'id'
              ? 'Pilihan proyek yang mendemonstrasikan eksplorasi teknis dan fokus keamanan.'
              : 'Selected projects demonstrating technical exploration and security focus.'}
          </TextEffect>
        </div>

        <div className="flex flex-col gap-24 sm:gap-32">
          {allProjects.map((project) => (
            <InView
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
              }}
              viewOptions={{ once: true, margin: '-100px' }}
              className="flex flex-col lg:flex-row gap-8 lg:gap-16 group"
            >
              {/* Project Info */}
              <div className="w-full lg:w-1/3 flex flex-col justify-between order-2 lg:order-1 pt-4">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-medium text-[#284A60] tracking-tight geist-font mb-4">
                    {project.title}
                  </h3>
                  <p className="text-[#5D5F5E] text-base leading-relaxed inter-font mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#284A60]/5 text-[#284A60] border border-[#284A60]/10 text-xs font-medium tracking-wide"
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
                    className="flex items-center gap-2 text-[#284A60] font-medium font-display tracking-wide uppercase text-sm hover:text-[#AB8B65] transition-colors"
                  >
                    {language === 'id' ? 'Kode Sumber' : 'Source Code'}
                    <ArrowUpRight size={16} />
                  </a>
                  {project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#5D5F5E] hover:text-[#AB8B65] font-medium font-display tracking-wide uppercase text-sm transition-colors"
                    >
                      {language === 'id' ? 'Lihat Demo' : 'View Demo'}
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Image */}
              <div className="w-full lg:w-2/3 order-1 lg:order-2">
                <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full bg-[#FAF9F6] border-4 border-[#5D5F5E]/10 overflow-hidden shadow-2xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-700 ease-out"
                  />
                </div>
              </div>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
