# don.dev — Immersive Developer Portfolio

A cinematic, interactive personal portfolio for a computer-science student who
builds apps, websites and custom software — with a subtle "available for
freelance" thread woven throughout (≈80% portfolio / 20% soft service pitch).

Built with a real, modern stack:

- **React 18 + Vite** — fast dev server, optimized production build
- **Three.js** (hand-written scene + custom GLSL shaders) — the live background
- **GSAP + ScrollTrigger** — scroll-scrubbed timeline animations
- **Framer Motion** — UI motion, staggered reveals, 3D card tilt
- **Lenis** — buttery momentum smooth-scroll

## ✨ What's inside

- **Cinematic loader** with a counting intro, then a blurred fade into the site.
- **Fullscreen WebGL hero** — a noise-distorted, fresnel-lit icosahedron, a neon
  wireframe shell, ~2,600 additive particles and floating accent geometry. The
  whole scene is **mouse-reactive** (parallax + tilt) and **scroll-reactive**
  (the camera dollies, the blob morphs and rotates as you scroll).
- **Mouse-follow neon glow cursor** + custom dot that reacts to hover targets.
- **About** — a GSAP scroll-scrubbed line that lights up word-by-word.
- **Projects** — real work shown as immersive cards with animated SVG previews,
  3D tilt, glare and hover reveals: **Lüge** (a real-time multiplayer card game —
  Next.js · Socket.IO · Postgres), an **auto-detailing iOS app** (Swift), and an
  **emergency-alert iOS app** (Swift · Firebase push to many devices).
- **Skills** — a 3D **orbiting tech system**: two counter-rotating rings of
  glassy tech chips around a pulsing core, plus categorized skill clusters.
- **Things I can build** — the lightweight, personal freelance section.
- **Contact** — email (with copy-to-clipboard), GitHub, LinkedIn.
- Fully **responsive**, with a `prefers-reduced-motion` path that freezes the
  heavy motion and restores the native cursor.

## 🏆 Inspired by Awwwards "Sites of the Year 2024"

Four signature techniques pulled from the reference video's award-winning sites:

- **Multi-layer parallax cards** — each project preview is foreground / mid /
  background layers that shift at different rates on cursor move, for real depth
  (Illusion, kpr).
- **Text-scramble decode** — nav links and section eyebrows resolve from random
  glyphs into the word (kpr's menu).
- **Rotating freelance badge** — a circular "Available for freelance" spinner in
  the hero (Chong Yun Yu's rotating-text motif) that doubles as a contact CTA.
- **Scroll-velocity skew** — the projects grid and build list squash/skew with
  scroll speed and settle when you stop (Synchronized Digital Studios' "rubber").

## ▶️ Run it

```bash
cd "C:/Games/dev-portfolio"
npm install      # already done
npm run dev      # http://localhost:4321
```

Production build:

```bash
npm run build    # outputs to dist/
npm run preview  # serve the build
```

## 🗂 Structure

```
dev-portfolio/
├─ index.html
├─ vite.config.js
└─ src/
   ├─ main.jsx · App.jsx
   ├─ webgl/scene.js          # Three.js scene + custom shaders
   ├─ hooks/useSmoothScroll.js# Lenis ⇄ GSAP ScrollTrigger
   ├─ styles/index.css        # design tokens + all styling
   └─ components/             # Hero, Projects, Skills, Build, Contact, …
```

## 🎨 Make it yours

- **Name / handle:** `index.html` (title), `Navbar.jsx`, `Footer.jsx`,
  `Hero.jsx`, `Contact.jsx`.
- **Projects:** edit the `PROJECTS` array in `components/Projects.jsx` (each maps
  to an animated preview in `ProjectPreviews.jsx`).
- **Skills:** the `INNER` / `OUTER` / `CLUSTERS` arrays in `components/Skills.jsx`.
- **Contact details:** `components/Contact.jsx` (currently placeholders —
  `jadoh2003@gmail.com`, GitHub `@PrePotato`, LinkedIn).
- **Colors / vibe:** warm palette in the CSS variables at the top of
  `styles/index.css` (`--yellow`, `--orange`, `--red`, `--amber`, `--grad`,
  `--bg`) and the matching shader/particle colors in `webgl/scene.js`.

---

Designed & built from scratch — Three.js · GSAP · Framer Motion · React.
