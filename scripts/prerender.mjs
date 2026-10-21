import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_HTML_PATH = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(BASE_HTML_PATH)) {
  console.error('[prerender] dist/index.html not found! Run vite build first.');
  process.exit(1);
}

let baseHtml = fs.readFileSync(BASE_HTML_PATH, 'utf8');

// Inline CSS into HTML to eliminate 100% of render-blocking stylesheets
const cssMatch = baseHtml.match(/<link\s+rel=["']stylesheet["']\s+crossorigin\s+href=["'](\/assets\/[^"']+\.css)["']\s*\/?>/i);
if (cssMatch) {
  const cssRelativePath = cssMatch[1].replace(/^\//, '');
  const cssDiskPath = path.join(DIST_DIR, cssRelativePath);
  if (fs.existsSync(cssDiskPath)) {
    const cssContent = fs.readFileSync(cssDiskPath, 'utf8');
    baseHtml = baseHtml.replace(cssMatch[0], `<style id="inline-app-css">${cssContent}</style>`);
    fs.writeFileSync(BASE_HTML_PATH, baseHtml, 'utf8');
    console.log(`[prerender] Inlined ${cssRelativePath} (${(cssContent.length / 1024).toFixed(1)} KB) directly into HTML!`);
  }
}

// Generate clean route HTMLs for subpaths (empty root so router loads cleanly)
const routes = [
  {
    path: 'resume',
    title: 'Dokumen Resume & CV Asli | Adit Hardiansyah Surachman',
    description: 'Unduh dan pratinjau CV asli resmi Adit Hardiansyah Surachman (ID & EN) format ATS Harvard terverifikasi.',
    canonical: 'https://www.portfolio-adit.web.id/resume'
  },
  {
    path: 'projects',
    title: 'Koleksi Karya & Rekayasa Sistem | Adit Hardiansyah Surachman',
    description: 'Portofolio sistem web, mobile apps, arsitektur offline-first, dan keamanan jaringan karya Adit Hardiansyah Surachman.',
    canonical: 'https://www.portfolio-adit.web.id/projects'
  },
  {
    path: 'about',
    title: 'Tentang Saya & Riwayat Rekayasa | Adit Hardiansyah Surachman',
    description: 'Profil teknis, latar belakang pendidikan S1 Teknik Informatika (IPK 3.62), Google Cybersecurity, dan kejuruan mesin industri.',
    canonical: 'https://www.portfolio-adit.web.id/about'
  },
  {
    path: 'contact',
    title: 'Hubungi & Kolaborasi Teknis | Adit Hardiansyah Surachman',
    description: 'Terhubung langsung via Email, WhatsApp, atau GitHub dengan Adit Hardiansyah Surachman.',
    canonical: 'https://www.portfolio-adit.web.id/contact'
  },
  {
    path: 'en',
    title: 'Adit Hardiansyah Surachman | Software Engineer & Network Security',
    description: 'Official portfolio of Adit Hardiansyah Surachman. Bachelor of Computer Science (GPA 3.62), Google Cybersecurity & BNSP certified.',
    canonical: 'https://www.portfolio-adit.web.id/en'
  }
];

function generateHtml(route) {
  let html = baseHtml;
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
  html = html.replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="description" content="${route.description}" />`);
  html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i, `<link rel="canonical" href="${route.canonical}" />`);
  html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:title" content="${route.title}" />`);
  html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:description" content="${route.description}" />`);
  return html;
}

for (const route of routes) {
  const content = generateHtml(route);
  const cleanHtmlPath = path.join(DIST_DIR, `${route.path}.html`);
  fs.writeFileSync(cleanHtmlPath, content, 'utf8');

  const routeDir = path.join(DIST_DIR, route.path);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  fs.writeFileSync(path.join(routeDir, 'index.html'), content, 'utf8');
}

// Pre-populate #root in dist/index.html with static hero shell for instant 0.3s FCP/LCP
const SNAPSHOT_PATH = path.join(__dirname, 'hero-snapshot.html');
if (fs.existsSync(SNAPSHOT_PATH)) {
  const [navHtml, heroHtml] = fs.readFileSync(SNAPSHOT_PATH, 'utf8').split('\n');
  if (navHtml && heroHtml) {
    const heroRoot = `<div class="min-h-screen flex flex-col bg-[var(--color-canvas-950)] text-[var(--color-paper-50)] selection:bg-[var(--color-accent)]/30 selection:text-white relative overflow-x-hidden"><a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[var(--color-paper-50)] text-[var(--color-canvas-950)] font-semibold px-4 py-2 text-xs font-mono uppercase tracking-wider rounded shadow-lg">Skip to main content</a>${navHtml}<main id="main-content" class="flex-grow pt-0">${heroHtml}</main></div>`;
    const homeHtml = baseHtml.replace('<div id="root"></div>', `<div id="root">${heroRoot}</div>`);
    fs.writeFileSync(BASE_HTML_PATH, homeHtml, 'utf8');
    console.log('[prerender] Pre-populated homepage #root with static hero shell!');
  }
}

console.log('[prerender] Prerendering finished successfully without CSS bloat!');
