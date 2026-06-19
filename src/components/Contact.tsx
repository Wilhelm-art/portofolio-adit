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
    
    const accessKey = (import.meta as any).env.VITE_WEB3FORMS_ACCESS_KEY;
    
    if (accessKey) {
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
    <section id="contact" className="py-20 sm:py-24 relative bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4 text-slate-900 dark:text-white tracking-tight geist-font">
              {t('contact.title').split(' ')[0]} <span className="gradient-text font-extrabold tracking-tight">{t('contact.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-slate-650 dark:text-slate-400 max-w-2xl mx-auto px-4 font-light inter-font text-base sm:text-lg">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Info Cards Side */}
            <motion.div variants={slideInLeft} className="w-full lg:w-1/3 space-y-5">
              
              {/* Email Block */}
              <motion.div 
                whileHover={{ y: -3 }}
                className="glass-card p-6 rounded-2xl flex items-start gap-4 group"
              >
                <div className="p-3 bg-slate-900/5 dark:bg-white/5 text-slate-900 dark:text-white rounded-xl border border-slate-900/10 dark:border-white/10 group-hover:scale-105 transition-transform shrink-0 duration-300">
                  <Mail size={22} className="text-cyan-accent" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-slate-900 dark:text-white font-medium mb-1 text-sm geist-font">{t('contact.emailMe')}</h3>
                  <a href={`mailto:${CONTACT_DATA.email}`} className="text-slate-600 dark:text-slate-400 hover:text-cyan-accent transition-colors text-xs sm:text-sm truncate block font-sans">
                    {CONTACT_DATA.email}
                  </a>
                </div>
              </motion.div>

              {/* Phone Block */}
              <motion.div 
                whileHover={{ y: -3 }}
                className="glass-card p-6 rounded-2xl flex items-start gap-4 group"
              >
                <div className="p-3 bg-slate-900/5 dark:bg-white/5 text-slate-900 dark:text-white rounded-xl border border-slate-900/10 dark:border-white/10 group-hover:scale-105 transition-transform shrink-0 duration-300">
                  <Phone size={22} className="text-cyan-accent" />
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-medium mb-1 text-sm geist-font">WhatsApp</h3>
                  <a 
                    href={`https://wa.me/${CONTACT_DATA.phone.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-600 dark:text-slate-400 hover:text-cyan-accent transition-colors text-xs sm:text-sm font-sans"
                  >
                    {CONTACT_DATA.phone}
                  </a>
                </div>
              </motion.div>

              {/* Location Block */}
              <motion.div 
                whileHover={{ y: -3 }}
                className="glass-card p-6 rounded-2xl flex items-start gap-4 group"
              >
                <div className="p-3 bg-slate-900/5 dark:bg-white/5 text-slate-900 dark:text-white rounded-xl border border-slate-900/10 dark:border-white/10 group-hover:scale-105 transition-transform shrink-0 duration-300">
                  <MapPin size={22} className="text-cyan-accent" />
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-medium mb-1 text-sm geist-font">{t('contact.location')}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-sans">
                    {CONTACT_DATA.location}
                  </p>
                </div>
              </motion.div>

            </motion.div>

            {/* Contact Form Side */}
            <motion.div 
              variants={slideInRight} 
              className="w-full lg:w-2/3"
            >
              <div className="glass-card p-6 sm:p-10 rounded-2xl relative overflow-hidden">
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-semibold text-slate-700 dark:text-slate-350 uppercase tracking-wider font-display">{t('contact.name')}</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        {...register('name')}
                        className={`w-full px-4 py-3 bg-slate-900/5 dark:bg-zinc-950/40 border rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none transition-colors font-sans ${
                          errors.name 
                            ? 'border-red-500/50 focus:border-red-500' 
                            : 'border-slate-900/10 dark:border-white/10 focus:border-slate-900/30 dark:focus:border-white/20'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 flex items-center gap-1 font-sans">
                          <AlertCircle size={12} /> {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-semibold text-slate-700 dark:text-slate-350 uppercase tracking-wider font-display">{t('contact.email')}</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...register('email')}
                        className={`w-full px-4 py-3 bg-slate-900/5 dark:bg-zinc-950/40 border rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none transition-colors font-sans ${
                          errors.email 
                            ? 'border-red-500/50 focus:border-red-500' 
                            : 'border-slate-900/10 dark:border-white/10 focus:border-slate-900/30 dark:focus:border-white/20'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 flex items-center gap-1 font-sans">
                          <AlertCircle size={12} /> {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-semibold text-slate-700 dark:text-slate-350 uppercase tracking-wider font-display">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="Project details"
                      {...register('subject')}
                      className={`w-full px-4 py-3 bg-slate-900/5 dark:bg-zinc-950/40 border rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none transition-colors font-sans ${
                        errors.subject 
                          ? 'border-red-500/50 focus:border-red-500' 
                          : 'border-slate-900/10 dark:border-white/10 focus:border-slate-900/30 dark:focus:border-white/20'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-xs text-red-500 flex items-center gap-1 font-sans">
                        <AlertCircle size={12} /> {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold text-slate-700 dark:text-slate-350 uppercase tracking-wider font-display">{t('contact.message')}</label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Let's build something together..."
                      {...register('message')}
                      className={`w-full px-4 py-3 bg-slate-900/5 dark:bg-zinc-950/40 border rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none transition-colors font-sans resize-none ${
                        errors.message 
                          ? 'border-red-500/50 focus:border-red-500' 
                          : 'border-slate-900/10 dark:border-white/10 focus:border-slate-900/30 dark:focus:border-white/20'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 flex items-center gap-1 font-sans">
                        <AlertCircle size={12} /> {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full primary-button py-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity font-display"
                  >
                    {isSubmitting ? (
                      t('contact.sending')
                    ) : (
                      <>
                        <span>{t('contact.send')}</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                  
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-150/15 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-600 dark:text-green-400 text-sm font-sans">
                      <CheckCircle size={20} className="shrink-0" />
                      <span>{t('contact.success')}</span>
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-150/15 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-sans">
                      <AlertCircle size={20} className="shrink-0" />
                      <span>{t('contact.error')}</span>
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
