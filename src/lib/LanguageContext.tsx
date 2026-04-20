import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

type Language = 'id' | 'en';

type Translations = Record<string, string>;

const enTranslations: Translations = {
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.skills': 'Skills',
  'nav.projects': 'Projects',
  'nav.experience': 'Experience',
  'nav.contact': 'Contact',
  'common.viewCV': 'View CV',
  'common.viewWork': 'View My Work',
  'common.downloadCV': 'Download Full CV',
  'common.viewFullCV': 'View Full CV',
  'hero.subtitle': 'An Information Technology graduate with a strong interest in cybersecurity, threat analysis, and network infrastructure. Equipped with sharp system analysis skills and a technical vocational background that instilled a strong discipline for SOPs and safety.',
  'about.title': 'About Me',
  'about.bio': 'Hello! I am Adit Hardiansyah Surachman, a Bachelor of Information Technology graduate. I have a profound passion for securing digital environments and building modern web applications. Supported by my vocational background in Mechanical Engineering, I have developed a highly analytical mindset, strict adherence to Standard Operating Procedures (SOP), and a strong attention to detail. I am ready to contribute to securing and managing the reliability of corporate digital information systems.',
  'about.gpa': 'GPA',
  'about.years': 'Years of Study',
  'about.thesis': 'Published Thesis',
  'skills.title': 'Technical Skills',
  'projects.title': 'Featured Projects',
  'projects.featured': '🏆 Thesis Project',
  'projects.viewDemo': 'View Demo',
  'projects.sourceCode': 'Source Code',
  'experience.title': 'Timeline',
  'contact.title': 'Get in Touch',
  'contact.subtitle': "Have a question or want to work together? Feel free to reach out!",
  'contact.name': 'Name',
  'contact.email': 'Email',
  'contact.message': 'Message',
  'contact.send': 'Send Message',
  'contact.sending': 'Sending...',
  'contact.success': 'Message sent successfully!',
  'contact.error': 'Failed to send message. Please try again.',
  'contact.emailMe': 'Email Me',
  'contact.location': 'Location',
  'whatsapp.chat': 'Chat on WhatsApp',
};

const idTranslations: Translations = {
  'nav.home': 'Beranda',
  'nav.about': 'Tentang',
  'nav.skills': 'Keahlian',
  'nav.projects': 'Proyek',
  'nav.experience': 'Pengalaman',
  'nav.contact': 'Kontak',
  'common.viewCV': 'Lihat CV',
  'common.viewWork': 'Lihat Karya Saya',
  'common.downloadCV': 'Unduh CV Lengkap',
  'common.viewFullCV': 'Lihat CV Lengkap',
  'hero.subtitle': 'Lulusan Teknik Informatika dengan minat kuat pada keamanan siber, analisis ancaman, dan infrastruktur jaringan. Memiliki kemampuan analisis sistem yang tajam serta latar belakang vokasi teknis yang membiasakan disiplin ketat terhadap SOP dan keselamatan kerja.',
  'about.title': 'Tentang Saya',
  'about.bio': 'Halo! Saya Adit Hardiansyah Surachman, Lulusan S1 Teknik Informatika. Saya memiliki minat mendalam dalam mengamankan lingkungan digital dan membangun aplikasi web modern. Didukung oleh latar belakang vokasi di bidang Teknik Mesin, saya mengembangkan pola pikir analitis, kepatuhan yang ketat terhadap Standar Operasional Prosedur (SOP), serta perhatian tinggi terhadap detail. Saya siap berkontribusi dalam menjaga keamanan dan keandalan sistem informasi digital perusahaan.',
  'about.gpa': 'IPK',
  'about.years': 'Tahun Studi',
  'about.thesis': 'Publikasi Skripsi',
  'skills.title': 'Keahlian Teknis',
  'projects.title': 'Proyek Unggulan',
  'projects.featured': '🏆 Proyek Skripsi',
  'projects.viewDemo': 'Lihat Demo',
  'projects.sourceCode': 'Kode Sumber',
  'experience.title': 'Linimasa',
  'contact.title': 'Hubungi Saya',
  'contact.subtitle': "Mempunyai pertanyaan atau ingin bekerja sama? Jangan ragu untuk menghubungi!",
  'contact.name': 'Nama',
  'contact.email': 'Email',
  'contact.message': 'Pesan',
  'contact.send': 'Kirim Pesan',
  'contact.sending': 'Mengirim...',
  'contact.success': 'Pesan berhasil dikirim!',
  'contact.error': 'Gagal mengirim pesan. Silakan coba lagi.',
  'contact.emailMe': 'Email Saya',
  'contact.location': 'Lokasi',
  'whatsapp.chat': 'Chat di WhatsApp',
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved === 'id' || saved === 'en') return saved;
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'id' : 'en'));
  };

  const t = (key: string): string => {
    const dict = language === 'id' ? idTranslations : enTranslations;
    return dict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
