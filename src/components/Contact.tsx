import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CONTACT_DATA } from '../lib/constants';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '../lib/animations';
import { useLanguage } from '../lib/LanguageContext';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 relative transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              {t('contact.title').split(' ')[0]} <span className="text-gradient">{t('contact.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-2 sm:px-0">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-5xl mx-auto">
            <motion.div variants={slideInLeft} className="w-full lg:w-1/3 space-y-4 sm:space-y-6">
              <div className="glass-card p-5 sm:p-6 rounded-2xl flex items-start gap-4 group hover:border-electric-blue/30 transition-colors shadow-sm dark:shadow-xl border border-slate-200 dark:border-white/10">
                <div className="p-3 bg-electric-blue/10 text-electric-blue rounded-xl group-hover:bg-electric-blue group-hover:text-white transition-colors shrink-0">
                  <Mail size={24} />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-slate-800 dark:text-white font-medium mb-1">{t('contact.emailMe')}</h3>
                  <a href={`mailto:${CONTACT_DATA.email}`} className="text-slate-600 dark:text-slate-400 hover:text-electric-blue transition-colors text-sm sm:text-base truncate block">
                    {CONTACT_DATA.email}
                  </a>
                </div>
              </div>

              <div className="glass-card p-5 sm:p-6 rounded-2xl flex items-start gap-4 group hover:border-electric-blue/30 transition-colors shadow-sm dark:shadow-xl border border-slate-200 dark:border-white/10">
                <div className="p-3 bg-electric-blue/10 text-electric-blue rounded-xl group-hover:bg-electric-blue group-hover:text-white transition-colors shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-slate-800 dark:text-white font-medium mb-1">WhatsApp</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">{CONTACT_DATA.phone}</p>
                </div>
              </div>

              <div className="glass-card p-5 sm:p-6 rounded-2xl flex items-start gap-4 group hover:border-electric-blue/30 transition-colors shadow-sm dark:shadow-xl border border-slate-200 dark:border-white/10">
                <div className="p-3 bg-electric-blue/10 text-electric-blue rounded-xl group-hover:bg-electric-blue group-hover:text-white transition-colors shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-slate-800 dark:text-white font-medium mb-1">{t('contact.location')}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">{CONTACT_DATA.location}</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={slideInRight} className="w-full lg:w-2/3 mt-4 lg:mt-0">
              <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-6 sm:p-8 rounded-2xl space-y-5 sm:space-y-6 shadow-sm dark:shadow-xl border border-slate-200 dark:border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('contact.name')}</label>
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      className="w-full bg-white dark:bg-navy-900/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors shadow-sm dark:shadow-none"
                    />
                    {errors.name && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('contact.email')}</label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className="w-full bg-white dark:bg-navy-900/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors shadow-sm dark:shadow-none"
                    />
                    {errors.email && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                  <input
                    {...register('subject')}
                    type="text"
                    id="subject"
                    className="w-full bg-white dark:bg-navy-900/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors shadow-sm dark:shadow-none"
                  />
                  {errors.subject && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('contact.message')}</label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={5}
                    className="w-full bg-white dark:bg-navy-900/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors resize-none shadow-sm dark:shadow-none"
                  ></textarea>
                  {errors.message && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 sm:py-4 bg-electric-blue text-white font-medium rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {t('contact.send')}
                      <Send size={18} />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl flex items-center gap-3 text-green-600 dark:text-green-400 text-sm sm:text-base">
                    <CheckCircle size={20} className="shrink-0" />
                    <p>{t('contact.success')}</p>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm sm:text-base">
                    <AlertCircle size={20} className="shrink-0" />
                    <p>{t('contact.error')}</p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
