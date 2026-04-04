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
  titles: ['IT Graduate', 'Full-Stack Developer', 'Problem Solver', 'Open to Work'],
  subtitle: 'Building smart digital solutions that matter.',
};

export const ABOUT_DATA = {
  bio: "I'm Adit, a fresh IT graduate passionate about building scalable, user-centered web applications. My academic journey culminated in a thesis on mosque financial management systems — combining civic tech with modern web development. I'm now actively seeking opportunities where I can contribute, grow, and ship great products.",
  stats: [
    { label: 'Projects', value: 10, suffix: '+' },
    { label: 'Years of Study', value: 4, suffix: '' },
    { label: 'Published Thesis', value: 1, suffix: '' },
  ],
};

export const SKILLS_DATA = [
  {
    category: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'Laravel', 'PHP', 'REST API'],
  },
  {
    category: 'Database',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Figma', 'VS Code', 'Postman', 'Vercel'],
  },
];

export const FEATURED_PROJECT = {
  id: 'sikeuamas',
  title: 'SiKeuMas — Web-Based Mosque Financial Management System',
  badge: '🏆 Thesis Project',
  description: 'A comprehensive web application designed to digitize and streamline mosque financial administration — including income/expense tracking, donation management, zakat & infaq recording, financial report generation (PDF), and a transparency dashboard for mosque communities. Built with Laravel, MySQL, and Bootstrap.',
  tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'FPDF', 'Chart.js'],
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
    id: 'ecommerce',
    title: 'E-commerce Web App',
    description: 'A full-stack e-commerce platform with cart functionality, user authentication, and payment integration.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: '#',
    demo: '#',
    image: 'https://picsum.photos/seed/ecommerce/600/400',
  },
  {
    id: 'grade-management',
    title: 'Student Grade Management System',
    description: 'An academic portal for teachers to manage student grades and generate report cards.',
    tags: ['Laravel', 'PHP', 'MySQL'],
    github: '#',
    demo: '#',
    image: 'https://picsum.photos/seed/grades/600/400',
  },
  {
    id: 'event-booking',
    title: 'Campus Event Booking App',
    description: 'A platform for university students to discover and book campus events with ticketing.',
    tags: ['Next.js', 'React', 'PostgreSQL', 'Tailwind'],
    github: '#',
    demo: '#',
    image: 'https://picsum.photos/seed/events/600/400',
  },
  {
    id: 'iot-dashboard',
    title: 'IoT Room Monitoring Dashboard',
    description: 'Real-time dashboard displaying temperature and humidity data from IoT sensors.',
    tags: ['React', 'MQTT', 'Node.js', 'Chart.js'],
    github: '#',
    demo: '#',
    image: 'https://picsum.photos/seed/iot/600/400',
  },
];

export const EXPERIENCE_DATA = [
  {
    id: 1,
    type: 'education',
    title: 'S1 Information Technology',
    organization: 'University of Technology',
    period: '2020–2024',
    details: 'GPA: 3.85/4.00',
  },
  {
    id: 2,
    type: 'experience',
    title: 'Web Developer Intern',
    organization: 'Tech Solutions Inc.',
    period: 'Jun 2023 - Dec 2023',
    details: 'Developed and maintained client websites using React and Node.js. Collaborated with the design team to implement responsive UI.',
  },
  {
    id: 3,
    type: 'education',
    title: 'Thesis: Sistem Informasi Keuangan Masjid Berbasis Web',
    organization: 'University of Technology',
    period: '2024',
    details: 'Grade: A. Developed a comprehensive financial management system for mosques.',
  },
  {
    id: 4,
    type: 'certification',
    title: 'Front-End Web Developer Expert',
    organization: 'Dicoding',
    period: '2023',
    details: 'Completed advanced frontend development coursework including PWA, accessibility, and testing.',
  },
];

export const CONTACT_DATA = {
  email: 'adit@email.com',
  phone: '+62 856-5983-2513',
  location: 'Bandung, Indonesia',
  linkedin: 'https://linkedin.com/in/placeholder',
  github: 'https://github.com/placeholder',
  whatsappMessage: "Hi Adit, I found your portfolio and I'd like to connect!",
};
