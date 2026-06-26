import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CONTACT_DATA } from '../lib/constants';
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const accessKey = (import.meta as any).env.VITE_WEB3FORMS_ACCESS_KEY;

    if (accessKey) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
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

        if (response.status === 200) {
          setSubmitStatus('success');
          reset();
        } else {
          setSubmitStatus('error');
        }
      } catch {
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
      } catch {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-24 border-t border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:w-1/3 flex flex-col"
            >
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tighter text-zinc-950 dark:text-zinc-50 leading-[1.1] geist-font mb-6">
                {t('contact.title')}
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light inter-font mb-12 max-w-sm">
                {t('contact.subtitle')}
              </p>

              <div className="space-y-8 mt-auto">
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-widest text-zinc-500 mb-2 inter-font">
                    {t('contact.emailMe')}
                  </h3>
                  <a
                    href={`mailto:${CONTACT_DATA.email}`}
                    className="text-xl sm:text-2xl text-zinc-950 dark:text-zinc-50 font-medium hover:text-zinc-500 transition-colors tracking-tight geist-font break-all"
                  >
                    {CONTACT_DATA.email}
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-widest text-zinc-500 mb-2 inter-font">
                    WhatsApp
                  </h3>
                  <a
                    href={`https://wa.me/${CONTACT_DATA.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl sm:text-2xl text-zinc-950 dark:text-zinc-50 font-medium hover:text-zinc-500 transition-colors tracking-tight geist-font"
                  >
                    {CONTACT_DATA.phone}
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-widest text-zinc-500 mb-2 inter-font">
                    {t('contact.location')}
                  </h3>
                  <p className="text-xl sm:text-2xl text-zinc-950 dark:text-zinc-50 font-medium tracking-tight geist-font">
                    {CONTACT_DATA.location}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="lg:w-2/3"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 lg:pl-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium uppercase tracking-widest text-zinc-500 inter-font"
                    >
                      {t('contact.name')}
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      className={`w-full bg-transparent border-b-2 py-3 text-zinc-950 dark:text-zinc-50 text-lg focus:outline-none transition-colors font-sans rounded-none ${
                        errors.name
                          ? 'border-red-500'
                          : 'border-zinc-300 dark:border-zinc-700 focus:border-zinc-950 dark:focus:border-zinc-50'
                      }`}
                    />
                  </div>

                  <div className="space-y-3">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium uppercase tracking-widest text-zinc-500 inter-font"
                    >
                      {t('contact.email')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className={`w-full bg-transparent border-b-2 py-3 text-zinc-950 dark:text-zinc-50 text-lg focus:outline-none transition-colors font-sans rounded-none ${
                        errors.email
                          ? 'border-red-500'
                          : 'border-zinc-300 dark:border-zinc-700 focus:border-zinc-950 dark:focus:border-zinc-50'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium uppercase tracking-widest text-zinc-500 inter-font"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register('subject')}
                    className={`w-full bg-transparent border-b-2 py-3 text-zinc-950 dark:text-zinc-50 text-lg focus:outline-none transition-colors font-sans rounded-none ${
                      errors.subject
                        ? 'border-red-500'
                        : 'border-zinc-300 dark:border-zinc-700 focus:border-zinc-950 dark:focus:border-zinc-50'
                    }`}
                  />
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium uppercase tracking-widest text-zinc-500 inter-font"
                  >
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register('message')}
                    className={`w-full bg-transparent border-b-2 py-3 text-zinc-950 dark:text-zinc-50 text-lg focus:outline-none transition-colors font-sans rounded-none resize-none ${
                      errors.message
                        ? 'border-red-500'
                        : 'border-zinc-300 dark:border-zinc-700 focus:border-zinc-950 dark:focus:border-zinc-50'
                    }`}
                  />
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex items-center gap-4 text-zinc-950 dark:text-zinc-50 font-medium uppercase tracking-widest text-sm hover:text-zinc-500 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? t('contact.sending') : t('contact.send')}
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </button>

                  {submitStatus === 'success' && (
                    <p className="mt-6 text-green-600 dark:text-green-500 text-sm font-medium">
                      {t('contact.success')}
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="mt-6 text-red-600 dark:text-red-500 text-sm font-medium">
                      {t('contact.error')}
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
