# Adit Hardiansyah Surachman — Personal Portfolio 🚀

Welcome to the source code of my personal portfolio! I am an Information Technology graduate, Cybersecurity & Software Developer passionate about building high-converting, scalable, secure, and visually engaging web applications.

Live Demo: [https://wilhelm-art.github.io/portofolio-adit/](https://wilhelm-art.github.io/portofolio-adit/)

## 🌟 Key Highlights

- **Redesigned "Starfall" Premium Theme:** A state-of-the-art developer landing page featuring a performant, GPU-accelerated WebGL Aurora shader background (`Three.js`).
- **Dynamic Light/Dark Modes:** Carefully tuned themes with custom glassmorphism contrasts, cool ambient undertones, and elevated readability.
- **Responsive Horizontal Slider:** Smooth side-scrolling project cards optimized for desktop and mobile touch gestures.
- **Bilingual Support:** Dynamic language toggle (English/Indonesian) built into the core layout context.
- **Verified Credentials:** Interactive certifications showcase featuring direct links to Google Cybersecurity and National Professional (BNSP) Certifications.

## 🛠️ Tech Stack

- **Core & Routing:** React 19 + Vite + React Router v7
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (Vanilla CSS variables)
- **Background Shader:** Three.js (WebGL Custom Shader Material)
- **Animations:** Motion (Framer Motion v12)
- **Icons:** Lucide React

## 📂 Project Structure

```
portfolio/
├── public/                 # Static assets (images, logos)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Core UI blocks
│   │   ├── About.tsx       # About Me section
│   │   ├── Contact.tsx     # Contact details & Form
│   │   ├── CyberCanvas.tsx # WebGL Aurora shader canvas
│   │   ├── Hero.tsx        # Hero landing screen
│   │   ├── Navbar.tsx      # Navigation header & Language/Theme toggle
│   │   ├── Projects.tsx    # Horizontal scrolling projects
│   │   ├── Skills.tsx      # Skills radar & certifications
│   │   └── Timeline.tsx    # Experience & education timeline
│   ├── lib/                # Shared utilities & constants
│   │   ├── animations.ts   # Framer motion variants
│   │   ├── constants.ts    # Content, projects, & contact data
│   │   └── LanguageContext.tsx # Context for bilingual support
│   ├── App.tsx             # Main Application root
│   ├── index.css           # Tailwind v4 configuration & core design system
│   └── main.tsx            # Main Entry point
└── index.html              # HTML shell & font imports
```

## 💻 Local Setup

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Wilhelm-art/portofolio-adit.git
   cd portofolio-adit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Verify TypeScript & build:**
   ```bash
   npm run lint   # Runs tsc --noEmit
   npm run build  # Builds production assets using Vite
   ```

## 🚀 Deployment

This portfolio is configured for quick deployments to GitHub Pages using the `gh-pages` package:

```bash
npm run deploy
```
