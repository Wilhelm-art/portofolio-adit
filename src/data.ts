import { Project } from './types';

export const projects: Project[] = [
  {
    id: 'gadget-vault',
    title: 'GadgetVault',
    tagline: 'Premium marketplace for flagship gadgets',
    problem: 'Buying and selling high-end gadgets locally lacked a secure, verified platform with a premium feel.',
    solution: 'Built a full-stack marketplace with OTP-verified registration, admin KYC dashboard, and hardened security headers (HSTS, CSP).',
    stack: ['Next.js 16', 'Prisma', 'PostgreSQL', 'NextAuth v5', 'Zustand', 'Zod', 'Tailwind CSS'],
    impact: 'Created a secure, trustworthy environment for high-value transactions with a 3D tactile UI.',
    liveUrl: 'https://gadget-vault-silk.vercel.app',
    screenshot: '/projects/gadget-vault.webp'
  },
  {
    id: 'surabi-cikal-cisangkan',
    title: 'Surabi Cikal Cisangkan',
    tagline: 'Digital storefront for a traditional culinary business',
    problem: 'A local traditional food stall (UMKM) had zero online presence, relying entirely on walk-in customers.',
    solution: 'Developed a fast, mobile-first landing page featuring a digital menu, integrated Google reviews, location mapping, and one-tap WhatsApp ordering.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    impact: 'Successfully transitioned an offline-only business to the digital space, streamlining customer orders directly to WhatsApp.',
    liveUrl: 'https://surabi-cikal-cisangkan.vercel.app',
    screenshot: '/projects/surabi.webp'
  },
  {
    id: 'sistem-kas-masjid',
    title: 'Sistem Kas Masjid AT-Tijaniyah',
    tagline: 'Financial transparency & management system',
    problem: 'The mosque needed a transparent way to manage cash flow and report it to the congregation.',
    solution: 'Engineered a comprehensive system with public live cash-flow reports, live prayer-time widget, and a secure admin panel for ledger and donation tracking.',
    stack: ['Laravel 10', 'Alpine.js', 'MySQL', 'Docker'],
    impact: 'Brought full financial transparency to the community and streamlined administrative workflows.',
    liveUrl: 'https://sistem-kas-masjid.vercel.app',
    screenshot: '/projects/masjid.webp'
  },
  {
    id: 'komik-zynqtoon',
    title: 'Komik Zynqtoon',
    tagline: 'Comic and webtoon reading platform',
    problem: 'Users needed a fast, responsive platform to read comics across devices.',
    solution: 'Developed a modern, SSR-optimized web application to deliver high-quality images and a seamless reading experience.',
    stack: ['Next.js', 'React', 'Tailwind CSS'],
    impact: 'Provided a smooth, app-like reading experience on the web.',
    liveUrl: 'https://komik-zynqtoon.vercel.app',
    screenshot: '/projects/komik.webp'
  },
  {
    id: 'savetok',
    title: 'SaveTok',
    tagline: 'No-watermark video downloader',
    problem: 'Users wanted a fast, ad-free way to download videos without watermarks.',
    solution: 'Built a stateless, multilingual (ID/EN/ES) downloading utility with Schema.org JSON-LD for SEO.',
    stack: ['React', 'Vite', 'Express.js', 'Tailwind CSS'],
    impact: 'Achieved high organic discoverability through technical SEO implementation while maintaining a fast, stateless architecture.',
    liveUrl: 'https://savetok.web.id',
    screenshot: '/projects/savetok.webp'
  }
];
