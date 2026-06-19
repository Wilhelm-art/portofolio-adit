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
    
    // Read the Web3Forms access key from the environment
    const accessKey = (import.meta as any).env.VITE_WEB3FORMS_ACCESS_KEY;
    
    if (accessKey) {
      // Direct email submission using Web3Forms API
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            from_name: 'Portfolio Contact Form',
          }),
        });
        
        const result = await response.json();
        if (response.status === 200) {
          setSubmitStatus('success');
          reset();
        } else {
          console.error('Web3Forms Error:', result);
          setSubmitStatus('error');
        }
      } catch (error) {
        console.error('Submission Error:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } else {
      // Fallback: Direct redirect to Gmail Web Composer in a new tab
      try {
        const emailRecipient = CONTACT_DATA.email;
        const subject = encodeURIComponent(data.subject);
        const body = encodeURIComponent(
          `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
        );
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailRecipient}&su=${subject}&body=${body}`;
        window.open(gmailUrl, '_blank');
        setSubmitStatus('success');
        reset();
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-accent/2 blur-[180px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              {t('contact.title').split(' ')[0]} <span className="text-gradient font-extrabold font-display">{t('contact.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4 font-sans text-base sm:text-lg">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Info Cards Side */}
            <motion.div variants={slideInLeft} className="w-full lg:w-1/3 space-y-5">
              
              {/* Email Block */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="minimal-card p-6 rounded-2xl flex items-start gap-4 group"
              >
                <div className="p-3 bg-cyan-accent/10 text-cyan-500 rounded-xl group-hover:bg-cyan-accent group-hover:text-white transition-colors shrink-0 duration-300">
                  <Mail size={24} />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-slate-800 dark:text-white font-bold font-display mb-1 text-base">{t('contact.emailMe')}</h3>
                  <a href={`mailto:${CONTACT_DATA.email}`} className="text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors text-sm sm:text-base truncate block font-sans">
                    {CONTACT_DATA.email}
                  </a>
                </div>
              </motion.div>

              {/* Phone Block */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="minimal-card p-6 rounded-2xl flex items-start gap-4 group"
              >
                <div className="p-3 bg-cyan-accent/10 text-cyan-500 rounded-xl group-hover:bg-cyan-accent group-hover:text-white transition-colors shrink-0 duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-slate-800 dark:text-white font-bold font-display mb-1 text-base">WhatsApp</h3>
                  <a 
                    href={`https://wa.me/${CONTACT_DATA.phone.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors text-sm sm:text-base font-sans font-medium"
                  >
                    {CONTACT_DATA.phone}
                  </a>
                </div>
              </motion.div>

              {/* Location Block */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="minimal-card p-6 rounded-2xl flex items-start gap-4 group"
              >
                <div className="p-3 bg-cyan-accent/10 text-cyan-500 rounded-xl group-hover:bg-cyan-accent group-hover:text-white transition-colors shrink-0 duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-slate-800 dark:text-white font-bold font-display mb-1 text-base">{t('contact.location')}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-sans">{CONTACT_DATA.location}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form Side */}
            <motion.div variants={slideInRight} className="w-full lg:w-2/3 mt-4 lg:mt-0">
              <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="minimal-card p-6 sm:p-8 rounded-3xl space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-display">{t('contact.name')}</label>
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      className="w-full bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 rounded-xl px-4.5 py-3.5 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent/50 dark:focus:ring-cyan-accent/30 transition-all font-sans shadow-sm"
                    />
                    {errors.name && <p className="text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-display">{t('contact.email')}</label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className="w-full bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 rounded-xl px-4.5 py-3.5 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent/50 dark:focus:ring-cyan-accent/30 transition-all font-sans shadow-sm"
                    />
                    {errors.email && <p className="text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-display">Subject</label>
                  <input
                    {...register('subject')}
                    type="text"
                    id="subject"
                    className="w-full bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 rounded-xl px-4.5 py-3.5 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent/50 dark:focus:ring-cyan-accent/30 transition-all font-sans shadow-sm"
                  />
                  {errors.subject && <p className="text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-display">{t('contact.message')}</label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={5}
                    className="w-full bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 rounded-2xl px-4.5 py-3.5 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent/50 dark:focus:ring-cyan-accent/30 transition-all font-sans resize-none shadow-sm"
                  ></textarea>
                  {errors.message && <p className="text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-electric-blue text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:bg-opacity-95 font-display transform active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="tracking-wide">{t('contact.send')}</span>
                      <Send size={16} className="group-hover:translate-x-1 duration-300" />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-2xl flex items-center gap-3 text-green-600 dark:text-green-400 text-sm font-semibold">
                    <CheckCircle size={20} className="shrink-0" />
                    <p>{t('contact.success')}</p>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-semibold">
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
