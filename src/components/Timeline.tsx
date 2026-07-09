import { getExperienceData } from '../lib/constants';
import { useLanguage } from '../lib/LanguageContext';
import { InView } from './ui/in-view';
import { TextEffect } from './ui/text-effect';

export default function Timeline() {
  const { t, language } = useLanguage();
  const experienceData = getExperienceData(language);

  return (
    <section id="experience" className="py-12 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="max-w-5xl">
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
            }}
            viewOptions={{ once: true, margin: '-100px' }}
            className="mb-16"
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tighter text-[#284A60] leading-[1.1] geist-font mb-6">
              <TextEffect per="word" preset="fade-in-up">
                {t('experience.title')}
              </TextEffect>
            </h2>
            <TextEffect per="line" preset="blur" delay={0.2} className="max-w-xl text-lg text-[#5D5F5E] font-light inter-font">
              {language === 'id'
                ? 'Perjalanan akademik dan profesional saya sejauh ini.'
                : 'My academic and professional journey so far.'}
            </TextEffect>
          </InView>

          <div className="flex flex-col gap-12 sm:gap-20">
            {experienceData.map((item) => (
              <InView
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
                }}
                viewOptions={{ once: true, margin: '-100px' }}
                className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-16 border-t border-[#5D5F5E]/20 pt-8"
              >
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-widest text-[#AB8B65] mb-2 inter-font">
                    {item.period}
                  </h3>
                  <h4 className="text-xl font-medium text-[#4A6453] font-display">
                    {item.organization}
                  </h4>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-medium text-[#284A60] mb-4 tracking-tight geist-font">
                    {item.title}
                  </h3>
                  <p className="text-[#5D5F5E] leading-relaxed text-base sm:text-lg font-light inter-font">
                    {item.details}
                  </p>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
