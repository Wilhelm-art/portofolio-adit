export const getHeroData = (lang: 'en' | 'id') => {
  return {
    name: 'Adit',
    titles: lang === 'id' 
      ? ['Lulusan IT', 'Penggiat Keamanan Siber', 'Pengembang Web', 'Terbuka untuk Bekerja'] 
      : ['IT Graduate', 'Cybersecurity Enthusiast', 'Web Developer', 'Open to Work'],
  };
};

export const getAboutData = (lang: 'en' | 'id') => {
  return {
    stats: [
      { label: lang === 'id' ? 'IPK' : 'GPA', value: 3.61, suffix: '' },
      { label: lang === 'id' ? 'Tahun Studi' : 'Years of Study', value: 4, suffix: '+' },
      { label: lang === 'id' ? 'Publikasi Skripsi' : 'Published Thesis', value: 1, suffix: '' },
    ],
  };
};

export const getSkillsData = (lang: 'en' | 'id') => {
  return [
    {
      category: lang === 'id' ? 'Teknologi Informasi' : 'Information Technology',
      skills: ['PHP', 'Python', 'Next.js', 'React', 'Laravel', 'TypeScript', 'Tailwind CSS', 'SQL', 'Linux', 'SDLC'],
    },
    {
      category: lang === 'id' ? 'Keamanan Siber & Jaringan' : 'Cybersecurity & Networking',
      skills: lang === 'id'
        ? ['Keamanan Jaringan', 'Analisis Ancaman', 'Manajemen Risiko', 'LAN/WAN', 'Pengujian & Troubleshooting Sistem']
        : ['Network Security', 'Threat Analysis', 'Risk Management', 'LAN/WAN', 'System Testing & Troubleshooting'],
    },
    {
      category: lang === 'id' ? 'Administrasi & Perkantoran' : 'Administration & Office',
      skills: lang === 'id'
        ? ['Microsoft Office (Word, Excel, PowerPoint)', 'Google Workspace', 'Pengelolaan Dokumen & Arsip', 'Surat-Menyurat Dinas', 'Rekap Data']
        : ['Microsoft Office (Word, Excel, PowerPoint)', 'Google Workspace', 'Document & Archive Management', 'Official Correspondence', 'Data Recap'],
    },
    {
      category: lang === 'id' ? 'Bahasa' : 'Languages',
      skills: lang === 'id'
        ? ['Bahasa Indonesia (Native)', 'Bahasa Inggris (Aktif)']
        : ['Indonesian (Native)', 'English (Active)'],
    },
  ];
};

export const CERTIFICATIONS_DATA = [
  {
    title: 'Google Cybersecurity Certificate (2026) — Coursera',
    url: 'https://drive.google.com/file/d/1HOwxuX834gxiyAHmYR59sBcSmdvgTZpZ/view?usp=sharing',
  },
  {
    title: 'Sertifikat Kompetensi Kerja Nasional (BNSP) — Teknik Pemesinan (2021)',
    url: 'https://drive.google.com/file/d/1OPbuB9XTssClEjfKDS-APmF7KQJ46t5v/view?usp=sharing',
  },
];

export const getFeaturedProject = (lang: 'en' | 'id') => {
  return {
    id: 'sikeuamas',
    title: lang === 'id' ? 'Sistem Informasi Pengelolaan Keuangan Masjid Berbasis Web (Skripsi)' : 'Web-Based Mosque Financial Management System (Thesis)',
    description: lang === 'id' 
      ? 'Merancang dan mengembangkan aplikasi manajemen keuangan berbasis web untuk Masjid At-Tijaniyah menggunakan metode akuntansi cash basis untuk memodernisasi dan mengelola dana umat secara transparan.'
      : 'Designed and developed a web-based financial management application for Masjid At-Tijaniyah using the cash basis accounting method to modernize and transparently manage community funds.',
    tags: lang === 'id' ? ['Pengembangan Web', 'Cash Basis', 'Desain Sistem'] : ['Web Development', 'Cash Basis Accounting', 'System Design'],
    features: lang === 'id' ? [
      'Buku besar pemasukan & pengeluaran',
      'Pelacakan donasi & zakat',
      'Laporan keuangan otomatis (PDF)',
      'Dasbor admin dengan grafik',
      'Akses berbasis peran',
      'UI responsif untuk mobile'
    ] : [
      'Income & expense ledger',
      'Donation & zakat tracking',
      'Auto-generated PDF financial reports',
      'Admin dashboard with charts',
      'Role-based access (Admin / Treasurer / Viewer)',
      'Responsive and mobile-friendly UI',
    ],
    github: 'https://github.com/Wilhelm-art/sistem-kas-masjid',
    demo: '#',
    image: '/sikeumas.png',
  };
};

export const getOtherProjects = (lang: 'en' | 'id') => {
  return [
    {
      id: 'gadget-vault',
      title: 'GadgetVault',
      description: lang === 'id'
        ? 'Platform e-commerce premium untuk jual-beli dan sewa gadget flagship. Dirancang dengan Next.js 16, Prisma ORM, PostgreSQL, dan NextAuth.js v5 dengan fitur keamanan tingkat tinggi dan validasi OTP.'
        : 'A premium e-commerce platform for buying, selling, and renting flagship gadgets. Built with Next.js 16, Prisma ORM, PostgreSQL, and NextAuth.js v5, featuring strict security and OTP verification.',
      tags: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth', 'Tailwind v4'],
      github: 'https://github.com/Wilhelm-art/gadget-vault',
      demo: 'https://gadget-vault-silk.vercel.app/',
      image: '/gadget-vault.png',
    },
    {
      id: 'budget-calc',
      title: lang === 'id' ? 'Aplikasi Kalkulasi Anggaran Berbasis Web (Magang)' : 'Web-Based Budget Calculation Application (Internship)',
      description: lang === 'id' 
        ? 'Dikembangkan saat magang di Dinas Perdagangan dan Perindustrian Kota Bandung untuk mendigitalisasi proses laporan keuangan tahunan secara manual.'
        : 'Developed during my internship at Dinas Perdagangan dan Perindustrian Kota Bandung to digitize manual financial reporting processes, ensuring data integrity and audit readiness.',
      tags: lang === 'id' ? ['Analisis Sistem', 'Aplikasi Web', 'Manajemen Data'] : ['System Analysis', 'Web Application', 'Data Management'],
      github: 'https://github.com/Wilhelm-art',
      demo: '#',
      image: '/budget.png',
    },
    {
      id: 'komik-zynqtoon',
      title: 'Komik Zynqtoon',
      description: lang === 'id'
        ? 'Platform baca komik berbasis web yang dirancang dengan UI modern untuk memberikan pengalaman membaca yang lancar dan interaktif.'
        : 'A web-based comic reading platform designed with a modern UI to provide a seamless and engaging reading experience for users. Built with modern web technologies.',
      tags: ['Web Development', 'Next.js', 'UI/UX'],
      github: 'https://github.com/Wilhelm-art/komik-zynqtoon',
      demo: 'https://komik-zynqtoon.vercel.app/',
      image: '/zynqtoon.png',
    },
    {
      id: 'surabi-cikal',
      title: 'Surabi Cikal Cisangkan',
      description: lang === 'id'
        ? 'Website landing page profesional untuk bisnis kuliner Surabi Cikal Cisangkan, dirancang dengan antarmuka yang responsif, katalog menu, dan info kontak yang terintegrasi.'
        : 'A professional landing page for the Surabi Cikal Cisangkan culinary business, featuring a responsive interface, interactive menu catalog, and integrated contact information.',
      tags: ['Web Development', 'Landing Page', 'UI/UX'],
      github: 'https://github.com/Wilhelm-art/surabi-cikal',
      demo: 'https://surabi-cikal-cisangkan.vercel.app/',
      image: '/surabi.png',
    },
    {
      id: 'logsentinel',
      title: 'LogSentinel',
      description: lang === 'id'
        ? 'Platform analisis log bertenaga AI dengan infrastruktur backend tangguh dan antarmuka frontend yang responsif untuk mengunggah dan menganalisis data log sistem.'
        : 'An AI-powered log analysis platform with a robust backend infrastructure and responsive frontend interface for uploading and analyzing system log data.',
      tags: ['Next.js', 'AI Integration', 'Full-stack'],
      github: 'https://github.com/Wilhelm-art/logsentinel',
      demo: 'https://logsentinel-five.vercel.app/',
      image: '/logsentinel.png',
    },
  ];
};

export const getExperienceData = (lang: 'en' | 'id') => {
  return [
    {
      id: 1,
      type: 'certification',
      title: lang === 'id' ? 'Google Cybersecurity Certificate' : 'Google Cybersecurity Certificate',
      organization: 'Coursera',
      period: '2026',
      details: lang === 'id' 
        ? 'Sertifikasi profesional mencakup kerangka keamanan, analisis ancaman, respons insiden, keamanan jaringan, dan hands-on lab Linux/Python.' 
        : 'Comprehensive professional certificate covering security frameworks, threat analysis, incident response, network hardening, and Linux/Python hands-on labs.',
    },
    {
      id: 2,
      type: 'experience',
      title: lang === 'id' ? 'Lead Developer' : 'Lead Developer',
      organization: 'Masjid AT-Tijaniyah',
      period: lang === 'id' ? 'Mar 2025 – Agu 2025' : 'Mar 2025 – Aug 2025',
      details: lang === 'id' 
        ? 'Merancang dan mengembangkan sistem manajemen keuangan berbasis web secara mandiri untuk memodernisasi pembukuan manual, mengimplementasikan model akuntansi cash basis, serta mengelola siklus pengembangan end-to-end.' 
        : 'Independently designed and developed a web-based financial management system to modernize manual bookkeeping, implemented cash-basis accounting model, and managed the end-to-end development cycle.',
    },
    {
      id: 3,
      type: 'experience',
      title: lang === 'id' ? 'Staf IT / Administrasi (Magang)' : 'IT / Administrative Staff (Intern)',
      organization: 'Dinas Perdagangan dan Perindustrian Kota Bandung',
      period: lang === 'id' ? 'Okt 2024 – Jan 2025' : 'Oct 2024 – Jan 2025',
      details: lang === 'id' 
        ? 'Mengembangkan aplikasi perhitungan anggaran berbasis web untuk mendigitalisasi proses manual, meningkatkan efisiensi pelaporan keuangan tahunan, serta memberikan dukungan teknis IT departemen.' 
        : 'Developed a web-based budget calculation app to digitalize manual processes, increasing efficiency of annual financial reports, and provided IT technical support.',
    },
    {
      id: 4,
      type: 'education',
      title: 'S1 Teknik Informatika',
      organization: 'STMIK Mardira Indonesia',
      period: lang === 'id' ? 'Jul 2021 – Okt 2025' : 'Jul 2021 – Oct 2025',
      details: lang === 'id' 
        ? 'Lulus S1 Teknik Informatika dengan IPK 3.61 / 4.00, mempublikasikan skripsi tentang sistem manajemen kas masjid.' 
        : 'Graduated S1 Information Technology with a 3.61 / 4.00 GPA, publishing a thesis on a web-based mosque cash system.',
    },
    {
      id: 5,
      type: 'certification',
      title: lang === 'id' ? 'Sertifikat Kompetensi Kerja Nasional (BNSP) — Teknik Pemesinan' : 'National Professional Certification (BNSP) — Machining',
      organization: 'Badan Nasional Sertifikasi Profesi (BNSP)',
      period: '2021',
      details: lang === 'id' 
        ? 'Sertifikasi kompetensi keahlian nasional di bidang Teknik Pemesinan.' 
        : 'National certification of professional competency in Machining.',
    },
    {
      id: 6,
      type: 'education',
      title: lang === 'id' ? 'Teknik Pemesinan' : 'Mechanical Engineering (Machining)',
      organization: 'SMK Mahardhika Batujajar',
      period: 'Jul 2018 – Jun 2021',
      details: lang === 'id' ? 'Lulus dengan nilai kelulusan 81.79 / 100.' : 'Graduated with a final score of 81.79 / 100.',
    },
    {
      id: 7,
      type: 'experience',
      title: lang === 'id' ? 'Operator Produksi (Magang)' : 'Production Operator (Intern)',
      organization: 'PT. Bahagia Sejahtera Metalindo',
      period: lang === 'id' ? 'Agu 2020 – Sep 2020' : 'Aug 2020 – Sep 2020',
      details: lang === 'id' 
        ? 'Menjalankan proses produksi sesuai spesifikasi teknis presisi tinggi dengan kepatuhan penuh terhadap standar K3 dan SOP industri.' 
        : 'Executed production processes in accordance with high-precision technical specifications with full compliance with K3 standards and industrial SOPs.',
    },
  ];
};

export const CONTACT_DATA = {
  email: 'adithardiansyah091@gmail.com',
  phone: '+62 856-5983-2513',
  location: 'Bandung, Indonesia',
  linkedin: 'https://www.linkedin.com/in/adit-hardiansyah-surachman-b9aab1315/',
  github: 'https://github.com/Wilhelm-art',
  discord: 'https://discord.com/users/willhelmm',
  whatsappMessage: "Hi Adit, I found your portfolio and I'd like to connect!",
};
