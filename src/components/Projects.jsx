import { useRef } from 'react';
import {
  motion, useMotionValue, useSpring, useTransform, useScroll, useVelocity,
} from 'framer-motion';
import Reveal from './Reveal.jsx';
import ScrambleText from './ScrambleText.jsx';
import { LugePreview, NovaPreview, ScrollPreview, DetailingPreview, EmergencyPreview } from './ProjectPreviews.jsx';

const PROJECTS = [
  { id: 'luge', title: 'Lüge', type: 'Multiplayer Game', tag: 'Next.js · Socket.IO · Postgres',
    desc: 'A real-time multiplayer bluffing card game. Turn-based challenges with live game state synced across every player in the room.',
    Preview: LugePreview, accent: '#ff5147',
    live: 'https://luge-pi.vercel.app', repo: 'https://github.com/PrePotato/luge' },
  { id: 'nova', title: 'Nova', type: 'AI Receptionist', tag: 'AI Voice · Neural TTS · WebGL',
    desc: 'An AI voice receptionist that greets and talks with callers using neural text-to-speech, visualizes speech with a live WebGL orb, and generates documents right in the browser.',
    Preview: NovaPreview, accent: '#ff7043',
    live: 'https://nova-ai-receptionist.onrender.com' },
  { id: 'scroll', title: 'Scroll Story', type: 'Interactive Web', tag: 'HTML · CSS · JS',
    desc: 'A scroll-driven personal site where a full-page background video is the interface — scroll scrubs the video timeline, with a pinned hero, cross-fading chapters and a glass UI. Hand-coded, no framework.',
    Preview: ScrollPreview, accent: '#ffb13d',
    live: 'https://prepotato.github.io/don-dev-scroll/', repo: 'https://github.com/PrePotato/don-dev-scroll' },
  { id: 'detailing', title: 'Auto Detailing Manager', type: 'iOS · iPad', tag: 'SwiftUI · SwiftData · CloudKit',
    desc: 'A management app for a car-detailing business: scheduling, customers & vehicles, before/after photo coverage, on-screen-signed handover forms exported as branded PDFs, and emailable invoices — synced across iPhone & iPad via iCloud.',
    Preview: DetailingPreview, accent: '#ff8a3d', repo: 'https://github.com/PrePotato/AutoDetailManager' },
  { id: 'sentinel', title: 'Emergency Alerts', type: 'iOS App', tag: 'Swift · Firebase',
    desc: 'A native iOS app that broadcasts emergency push notifications to multiple devices at once, in real time, via Firebase Cloud Messaging.',
    Preview: EmergencyPreview, accent: '#ffd23f' },
];

function ProjectCard({ p, index }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  // Gentle, spring-smoothed parallax layers. No 3D tilt — that read as jittery.
  const sp = { stiffness: 110, damping: 24, mass: 0.6 };
  const bgX = useSpring(useTransform(mx, [-0.5, 0.5], [9, -9]), sp);
  const bgY = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), sp);
  const midX = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), sp);
  const midY = useSpring(useTransform(my, [-0.5, 0.5], [-4, 4]), sp);
  const fgX = useSpring(useTransform(mx, [-0.5, 0.5], [-13, 13]), sp);
  const fgY = useSpring(useTransform(my, [-0.5, 0.5], [-11, 11]), sp);

  const glareX = useTransform(mx, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(my, [-0.5, 0.5], ['0%', '100%']);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,.18), transparent 45%)`
  );

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <Reveal delay={(index % 3) * 0.08} className="project-cell">
      <motion.article
        ref={ref}
        className="project"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ '--accent': p.accent }}
        data-hover
      >
        <div className="project__media">
          <motion.div className="project__layer project__layer--bg" style={{ x: bgX, y: bgY, z: -40 }} />
          <motion.div className="project__layer project__layer--mid" style={{ x: midX, y: midY }}>
            <p.Preview />
          </motion.div>
          <motion.div className="project__layer project__layer--fg" style={{ x: fgX, y: fgY, z: 60 }}>
            <span className="project__chip"><i />{p.type}</span>
            <span className="project__orb" />
          </motion.div>
          <motion.div className="project__glare" style={{ background: glare }} />
          <div className="project__links">
            {p.live && (
              <a className="project__open" href={p.live} target="_blank" rel="noopener noreferrer"
                 data-hover onClick={(e) => e.stopPropagation()}>
                Live<span>↗</span>
              </a>
            )}
            {p.repo && (
              <a className="project__open" href={p.repo} target="_blank" rel="noopener noreferrer"
                 data-hover onClick={(e) => e.stopPropagation()}>
                Code<span>↗</span>
              </a>
            )}
            {!p.live && !p.repo && (
              <span className="project__open project__open--tag">{p.tag.split(' · ')[0]}</span>
            )}
          </div>
        </div>
        <div className="project__body">
          <div className="project__row">
            <h3 className="project__title">{p.title}</h3>
            <span className="project__type">{p.type}</span>
          </div>
          <p className="project__desc">{p.desc}</p>
          <span className="project__tag">{p.tag}</span>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Projects() {
  const reduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll-velocity → subtle skew ("rubber" squash from Synchronized Digital Studios).
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skew = useSpring(useTransform(velocity, [-2500, 0, 2500], [3.5, 0, -3.5]),
    { stiffness: 250, damping: 40 });

  return (
    <section id="projects" className="section projects">
      <div className="section__head section__head--row">
        <div>
          <Reveal as="span" className="section__eyebrow">
            <ScrambleText text="// selected work" trigger="view" />
          </Reveal>
          <Reveal as="h2" className="section__title" delay={0.05}>
            Things I’ve <span className="grad">designed &amp; built</span>
          </Reveal>
        </div>
        <Reveal as="p" className="section__note" delay={0.1}>
          A mix of shipped products, concepts and late-night experiments.
        </Reveal>
      </div>

      <motion.div className="projects__skew" style={reduced ? undefined : { skewY: skew }}>
        <div className="projects__grid">
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
        </div>
      </motion.div>
    </section>
  );
}
