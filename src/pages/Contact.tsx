import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Linkedin, Github, MapPin, Send, ArrowUpRight } from 'lucide-react';

export function Contact() {
  const { t } = useTranslation();
  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleComposeEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(subject ? `[Portfolio Inquiry] ${subject}` : `[Portfolio Inquiry] Pesan dari ${senderName || 'Pengunjung'}`);
    const mailBody = encodeURIComponent(`Nama: ${senderName}\n\nPesan:\n${message}`);
    window.location.href = `mailto:adithardiansyah091@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <>
      <Helmet>
        <title>{t('contact.title')} | Adit Hardiansyah Surachman</title>
        <meta name="description" content={t('contact.subtitle')} />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Header */}
          <header className="border-b border-white/10 pb-10 mb-14">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] font-medium">
                Komunikasi Langsung
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold font-display text-[var(--color-paper-50)] mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-base sm:text-lg text-[var(--color-stone-muted)] max-w-2xl leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Direct Channel Cards Column */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="border border-white/10 bg-[var(--color-canvas-900)] p-6 rounded-lg">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] block mb-4 font-semibold">
                  Saluran Utama
                </span>
                
                <div className="space-y-6">
                  
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-stone-muted)] block mb-1">
                      {t('contact.direct_email')}
                    </span>
                    <a 
                      href="mailto:adithardiansyah091@gmail.com"
                      className="text-sm font-mono text-[var(--color-paper-50)] hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-2 active:scale-[0.98]"
                    >
                      <Mail className="w-4 h-4 text-[var(--color-accent)]" />
                      <span>adithardiansyah091@gmail.com</span>
                    </a>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-stone-muted)] block mb-1">
                      {t('contact.direct_wa')}
                    </span>
                    <a 
                      href="https://wa.me/6285659832513?text=Halo%20Adit,%20saya%20melihat%20portofolio%20Anda"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-mono text-[var(--color-paper-50)] hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-2 active:scale-[0.98]"
                    >
                      <MessageSquare className="w-4 h-4 text-[var(--color-accent)]" />
                      <span>+62 856-5983-2513</span>
                    </a>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-stone-muted)] block mb-1">
                      {t('contact.location_title')}
                    </span>
                    <div className="text-sm font-mono text-[var(--color-paper-50)] flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[var(--color-stone-muted)]" />
                      <span>Bandung, Jawa Barat, Indonesia</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Social Profiles */}
              <div className="border border-white/10 bg-[var(--color-canvas-900)] p-6 rounded-lg">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-paper-50)] block mb-4 font-semibold">
                  Jejaring Profesional
                </span>
                
                <div className="space-y-3 text-xs font-mono">
                  <a 
                    href="https://linkedin.com/in/adit-hardiansyah-surachman-b9aab1315/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-[var(--color-canvas-850)] hover:bg-[var(--color-canvas-800)] hover:border-[var(--color-accent)]/40 text-[var(--color-paper-50)] rounded border border-white/5 transition-all active:scale-[0.98]"
                  >
                    <span className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-[#38BDF8]" />
                      <span>LinkedIn Profile</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-stone-muted)]" />
                  </a>

                  <a 
                    href="https://github.com/Wilhelm-art"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-[var(--color-canvas-850)] hover:bg-[var(--color-canvas-800)] hover:border-[var(--color-accent)]/40 text-[var(--color-paper-50)] rounded border border-white/5 transition-all active:scale-[0.98]"
                  >
                    <span className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      <span>GitHub Repositories</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-stone-muted)]" />
                  </a>
                </div>
              </div>

            </div>

            {/* Functional Email Composer Form Column */}
            <div className="lg:col-span-7">
              <div className="border border-white/10 bg-[var(--color-canvas-900)] p-6 sm:p-8 rounded-lg">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] block mb-2 font-semibold">
                  Tulis Pesan Cepat
                </span>
                <h3 className="text-xl font-bold font-display text-[var(--color-paper-50)] mb-6">
                  Kirim Pesan via Aplikasi Email Anda
                </h3>

                <form onSubmit={handleComposeEmail} className="space-y-5">
                  <div>
                    <label htmlFor="senderName" className="block text-xs font-mono uppercase tracking-wider text-[var(--color-stone-muted)] mb-2 font-medium">
                      Nama Lengkap Anda
                    </label>
                    <input 
                      type="text" 
                      id="senderName" 
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-[var(--color-canvas-950)] border border-white/10 rounded px-4 py-3 text-sm text-[var(--color-paper-50)] placeholder-[var(--color-stone-subtle)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-wider text-[var(--color-stone-muted)] mb-2 font-medium">
                      Topik Pembahasan
                    </label>
                    <input 
                      type="text" 
                      id="subject" 
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Diskusi Proyek Web / Rekrutmen IT"
                      className="w-full bg-[var(--color-canvas-950)] border border-white/10 rounded px-4 py-3 text-sm text-[var(--color-paper-50)] placeholder-[var(--color-stone-subtle)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-[var(--color-stone-muted)] mb-2 font-medium">
                      Detail Pesan
                    </label>
                    <textarea 
                      id="message" 
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tuliskan gambaran proyek, pertanyaan, atau penawaran kerjasama Anda..."
                      className="w-full bg-[var(--color-canvas-950)] border border-white/10 rounded px-4 py-3 text-sm text-[var(--color-paper-50)] placeholder-[var(--color-stone-subtle)] focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[var(--color-accent)] text-slate-950 hover:bg-[var(--color-accent-hover)] py-3 px-6 rounded text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>{t('contact.send_email_button')}</span>
                  </button>
                  
                  <p className="text-[11px] font-mono text-[var(--color-stone-subtle)] text-center leading-relaxed">
                    Form ini langsung membuka draf pesan di aplikasi email Anda dengan informasi di atas terisi rapi.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </>
  );
}
