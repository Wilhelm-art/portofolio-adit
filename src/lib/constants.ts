export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const HERO_DATA = {
  name: 'Adit',
  titles: ['IT Graduate', 'Cybersecurity Enthusiast', 'Web Developer', 'Open to Work'],
  subtitle: 'An Information Technology graduate with a strong interest in cybersecurity, threat analysis, and network infrastructure. Equipped with sharp system analysis skills and a technical vocational background that instilled a strong discipline for SOPs and safety.',
};

export const ABOUT_DATA = {
  bio: "Hello! I am Adit Hardiansyah Surachman, a Bachelor of Information Technology graduate with a 3.62 GPA. I have a profound passion for securing digital environments and building efficient systems. Supported by my vocational background in Mechanical Engineering, I have developed a highly analytical mindset, strict adherence to Standard Operating Procedures (SOP), and a strong attention to detail in technical documentation. I am ready to contribute to securing and managing the reliability of corporate digital information systems.",
  stats: [
    { label: 'GPA', value: 3.62, suffix: '' },
    { label: 'Years of Study', value: 4, suffix: '+' },
    { label: 'Published Thesis', value: 1, suffix: '' },
  ],
};

export const SKILLS_DATA = [
  {
    category: 'Security',
    skills: ['Network Security', 'Threat Analysis', 'Risk Management', 'System Testing & Troubleshooting'],
  },
  {
    category: 'Programming',
    skills: ['PHP', 'Python', 'Java', 'SQL'],
  },
  {
    category: 'Infrastructure',
    skills: ['LAN/WAN', 'Linux', 'SDLC'],
  },
  {
    category: 'Certification',
    skills: ['Google Cybersecurity Certificate (2025) — Coursera'],
  },
];

export const FEATURED_PROJECT = {
  id: 'sikeuamas',
  title: 'SiKeuMas — Web-Based Mosque Financial Management System',
  badge: '🏆 Thesis Project',
  description: 'Designed and developed a web-based financial management application for Masjid At-Tijaniyah using the cash basis accounting method to modernize and transparently manage community funds.',
  tags: ['Web Development', 'Cash Basis Accounting', 'PHP', 'MySQL', 'Laravel', 'Bootstrap'],
  features: [
    'Income & expense ledger',
    'Donation & zakat tracking',
    'Auto-generated PDF financial reports',
    'Admin dashboard with charts',
    'Role-based access (Admin / Treasurer / Viewer)',
    'Responsive and mobile-friendly UI',
  ],
  github: '#',
  demo: '/projects/sikeuamas',
  image: 'https://picsum.photos/seed/sikeuamas/800/450',
};

export const OTHER_PROJECTS = [
  {
    id: 'budget-calc',
    title: 'Web-Based Budget Calculation Application',
    description: 'Developed during my internship at Dinas Perdagangan dan Perindustrian Kota Bandung to digitize manual financial reporting processes, ensuring data integrity and audit readiness.',
    tags: ['System Analysis', 'Web Application', 'Data Management'],
    github: '#',
    demo: '#',
    image: 'https://picsum.photos/seed/budget/600/400',
  },
];

export const EXPERIENCE_DATA = [
  {
    id: 1,
    type: 'experience',
    title: 'IT / Administrative Staff (Intern)',
    organization: 'Dinas Perdagangan dan Perindustrian Kota Bandung',
    period: 'Oct 2024 – Jan 2025',
    details: 'Digitized manual processes by developing a web-based budget calculation app to improve the efficiency and accuracy of annual financial reporting.',
  },
  {
    id: 2,
    type: 'experience',
    title: 'Production Operator (Intern)',
    organization: 'PT. Bahagia Sejahtera Metalindo',
    period: 'Aug 2020 – Sep 2020',
    details: 'Gained hands-on industrial experience as a production operator during vocational internship.',
  },
  {
    id: 3,
    type: 'education',
    title: 'Bachelor of Information Technology (S1 Teknik Informatika)',
    organization: 'STMIK Mardira Indonesia',
    period: 'Jul 2021 – Sep 2025',
    details: 'GPA: 3.62 / 4.00',
  },
  {
    id: 4,
    type: 'education',
    title: 'Mechanical Engineering (Teknik Pemesinan)',
    organization: 'SMK Mahardhika Batujajar',
    period: 'Jul 2018 – Jun 2021',
    details: 'Score: 81.79',
  },
  {
    id: 5,
    type: 'certification',
    title: 'Google Cybersecurity Certificate',
    organization: 'Coursera',
    period: '2025',
    details: 'Comprehensive professional certificate covering security frameworks, threat analysis, incident response, and network hardening.',
  },
];

export const CONTACT_DATA = {
  email: 'adit@email.com',
  phone: '+62 856-5983-2513',
  location: 'Bandung, Indonesia',
  linkedin: 'https://linkedin.com/in/placeholder',
  github: 'https://github.com/Wilhelm-art',
  whatsappMessage: "Hi Adit, I found your portfolio and I'd like to connect!",
};
