# Rahul Singh — Portfolio

A personal portfolio website built with React and Vite, featuring multiple switchable aesthetic themes (Japanese & Space), smooth animations, and a dark/light mode toggle.

## Live Sections

- **Hero** — Animated introduction with typing effect
- **About** — Summary, strengths, and education
- **Experience** — Professional timeline across 4+ years
- **Skills** — Frontend tech stack (React, Next.js, TypeScript, Redux, MUI, etc.)
- **Projects** — Highlighted work (Quasar Markets, HekaBio)
- **Contact** — Get in touch form and links

## Tech Stack

| Category       | Tools                                                  |
| -------------- | ------------------------------------------------------ |
| Framework      | React 19, Vite 7                                       |
| UI Library     | Material UI (MUI) 7, Emotion                           |
| Animations     | Framer Motion, React Spring, Lenis (smooth scroll)     |
| Particles      | tsparticles                                            |
| Other          | React Type Animation, React Parallax Tilt, React Icons |

## Features

- **Dual Aesthetic Themes** — Switch between a Japanese-inspired theme and a Space-inspired theme via the built-in theme gallery
- **Dark / Light Mode** — Toggle color mode with persistence via localStorage
- **Smooth Scrolling** — Powered by Lenis for buttery scroll experience
- **Scroll Animations** — Reveal-on-scroll effects and section indicators
- **Responsive Design** — Fully responsive across devices

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/rahulKrSinghAl/portfolio.git
cd portfolio
npm install
```

### Development

```bash
npm run dev
```

Opens the dev server at `http://localhost:5173`.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── japanese/        # Japanese theme components (Header, Hero, About, etc.)
│   ├── space/           # Space theme components
│   ├── theme-gallery/   # Theme switcher UI
│   └── theme-decorative-bridge.jsx
├── context/             # AestheticThemeContext (theme + dark mode state)
├── themes/
│   ├── japanese/        # Colors, typography, tokens, decorative elements
│   └── space/           # Colors, typography, tokens, decorative elements
├── data.js              # Portfolio content (experience, projects, skills)
├── App.jsx              # Root layout with theme routing
└── main.jsx             # Entry point
```

## Contact

- **Email:** rahulkrsingh321998@gmail.com
- **LinkedIn:** [Rahul Singh](https://in.linkedin.com/in/rahul-kumar-singh-15209722a)
- **Location:** Agra, Uttar Pradesh, India
