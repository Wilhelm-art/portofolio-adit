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
      { label: lang === 'id' ? 'IPK' : 'GPA', value: 3.62, suffix: '' },
      { label: lang === 'id' ? 'Tahun Studi' : 'Years of Study', value: 4, suffix: '+' },
      { label: lang === 'id' ? 'Publikasi Skripsi' : 'Published Thesis', value: 1, suffix: '' },
    ],
  };
};

export const getSkillsData = (lang: 'en' | 'id') => {
  return [
    {
      category: lang === 'id' ? 'Keamanan' : 'Security',
      skills: lang === 'id' 
        ? ['Keamanan Jaringan', 'Analisis Ancaman', 'Manajemen Risiko', 'Dasar Keamanan Siber', 'Pengujian Sistem'] 
        : ['Network Security', 'Threat Analysis', 'Risk Management', 'Cybersecurity Basics', 'System Testing & Troubleshooting'],
    },
    {
      category: lang === 'id' ? 'Pemrograman' : 'Programming',
      skills: ['React', 'Next.js', 'TypeScript', 'PHP', 'Python', 'Java', 'SQL'],
    },
    {
      category: lang === 'id' ? 'Infrastruktur' : 'Infrastructure',
      skills: ['LAN/WAN', 'Linux', 'SDLC'],
    },
  ];
};

export const CERTIFICATIONS_DATA = [
  {
    title: 'Google Cybersecurity Certificate (2025) — Coursera',
    url: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/LQ1NNIQRM3Q1',
  },
  {
    title: 'Lulus Uji Kompetensi Keahlian (UKK) Teknik Pemesinan Nasional (2021)',
    url: 'https://drive.google.com/file/d/1PvSBMgh9uuPJrmUhJKu7hf4B1iTFQf0T/view?usp=sharing',
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
    github: 'https://github.com/Wilhelm-art',
    demo: '#',
    image: 'https://picsum.photos/seed/sikeuamas/800/450',
  };
};

export const getOtherProjects = (lang: 'en' | 'id') => {
  return [
    {
      id: 'budget-calc',
      title: lang === 'id' ? 'Aplikasi Kalkulasi Anggaran Berbasis Web (Magang)' : 'Web-Based Budget Calculation Application (Internship)',
      description: lang === 'id' 
        ? 'Dikembangkan saat magang di Dinas Perdagangan dan Perindustrian Kota Bandung untuk mendigitalisasi proses laporan keuangan tahunan secara manual.'
        : 'Developed during my internship at Dinas Perdagangan dan Perindustrian Kota Bandung to digitize manual financial reporting processes, ensuring data integrity and audit readiness.',
      tags: lang === 'id' ? ['Analisis Sistem', 'Aplikasi Web', 'Manajemen Data'] : ['System Analysis', 'Web Application', 'Data Management'],
      github: 'https://github.com/Wilhelm-art',
      demo: '#',
      image: 'https://picsum.photos/seed/budget/600/400',
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
      image: 'https://picsum.photos/seed/zynqtoon/600/400',
    },
  ];
};

export const getExperienceData = (lang: 'en' | 'id') => {
  return [
    {
      id: 1,
      type: 'experience',
      title: lang === 'id' ? 'Staf IT / Administrasi (Magang)' : 'IT / Administrative Staff (Intern)',
      organization: 'Dinas Perdagangan dan Perindustrian Kota Bandung',
      period: lang === 'id' ? 'Okt 2024 – Jan 2025' : 'Oct 2024 – Jan 2025',
      details: lang === 'id' 
        ? 'Mendigitalisasi proses manual dengan mengembangkan aplikasi web kalkulasi anggaran untuk laporan keuangan tahunan.' 
        : 'Digitized manual processes by developing a web-based budget calculation app to improve the efficiency and accuracy of annual financial reporting.',
    },
    {
      id: 2,
      type: 'experience',
      title: lang === 'id' ? 'Operator Produksi (Magang)' : 'Production Operator (Intern)',
      organization: 'PT. Bahagia Sejahtera Metalindo',
      period: lang === 'id' ? 'Agu 2020 – Sep 2020' : 'Aug 2020 – Sep 2020',
      details: lang === 'id' ? 'Pengalaman industri sebagai operator produksi dalam magang sekolah vokasi.' : 'Gained hands-on industrial experience as a production operator during vocational internship.',
    },
    {
      id: 3,
      type: 'education',
      title: 'S1 Teknik Informatika',
      organization: 'STMIK Mardira Indonesia',
      period: lang === 'id' ? 'Jul 2021 – Sep 2025' : 'Jul 2021 – Sep 2025',
      details: lang === 'id' ? 'IPK: 3.62 / 4.00' : 'GPA: 3.62 / 4.00',
    },
    {
      id: 4,
      type: 'education',
      title: 'Teknik Pemesinan',
      organization: 'SMK Mahardhika Batujajar',
      period: lang === 'id' ? 'Jul 2018 – Jun 2021' : 'Jul 2018 – Jun 2021',
      details: lang === 'id' ? 'Nilai: 81.79' : 'Score: 81.79',
    },
    {
      id: 5,
      type: 'certification',
      title: 'Google Cybersecurity Certificate',
      organization: 'Coursera',
      period: '2025',
      details: lang === 'id' 
        ? 'Sertifikasi profesional mencakup kerangka keamanan, analisis ancaman, respons insiden, dan keamanan jaringan.' 
        : 'Comprehensive professional certificate covering security frameworks, threat analysis, incident response, and network hardening.',
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
