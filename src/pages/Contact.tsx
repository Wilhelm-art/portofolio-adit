import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Mail, MessageCircle, MapPin, Send } from 'lucide-react';

export function Contact() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Mock API call since we don't have the serverless function yet
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What technologies does Adit work with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Adit specializes in React, Next.js, TypeScript, Tailwind CSS, Laravel, and Python, alongside strong network security capabilities."
        }
      },
      {
        "@type": "Question",
        "name": "Is Adit available for full-time roles or internships?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Adit is currently seeking opportunities in IT, administration, network engineering, and full-stack development."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{t('contact.title')} | Adit Hardiansyah Surachman</title>
        <meta name="description" content="Get in touch with Adit Hardiansyah Surachman for work opportunities." />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">{t('contact.title')}<span className="text-accent-red">.</span></h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              I'm always open to discussing product design work, software engineering roles, or network security opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-2xl font-bold font-display mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <a 
                  href="mailto:adithardiansyah091@gmail.com" 
                  className="flex items-center p-4 bg-base-800 rounded-lg border border-white/5 hover:border-white/20 transition-colors group"
                >
                  <div className="w-12 h-12 bg-base-900 rounded-full flex items-center justify-center text-gray-400 group-hover:text-accent-red transition-colors shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-white mb-1">Email</h3>
                    <p className="text-gray-400">adithardiansyah091@gmail.com</p>
                  </div>
                </a>

                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-base-800 rounded-lg border border-white/5 hover:border-white/20 transition-colors group"
                >
                  <div className="w-12 h-12 bg-base-900 rounded-full flex items-center justify-center text-gray-400 group-hover:text-accent-red transition-colors shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-white mb-1">WhatsApp</h3>
                    <p className="text-gray-400">+62 812-3456-7890</p>
                  </div>
                </a>

                <div className="flex items-center p-4 bg-base-800 rounded-lg border border-white/5">
                  <div className="w-12 h-12 bg-base-900 rounded-full flex items-center justify-center text-gray-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-white mb-1">Location</h3>
                    <p className="text-gray-400">Bandung, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-base-800 p-8 rounded-xl border border-white/5">
              <h2 className="text-2xl font-bold font-display mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">{t('contact.name')}</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 bg-base-900 border border-white/10 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent text-white placeholder-gray-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">{t('contact.email')}</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 bg-base-900 border border-white/10 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent text-white placeholder-gray-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">{t('contact.message')}</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-base-900 border border-white/10 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent text-white placeholder-gray-500 transition-all resize-none"
                    placeholder="How can I help you?"
                  ></textarea>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                    Failed to send message. Please try again or email me directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-accent-red hover:bg-accent-red/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-900 focus:ring-accent-red transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {t('contact.send')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
