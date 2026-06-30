import { useRef } from 'react';
import Reveal from './Reveal.jsx';
import ScrambleText from './ScrambleText.jsx';

const INNER = [
  { label: 'React', c: '#ffd23f' },
  { label: 'JavaScript', c: '#ff8a3d' },
  { label: 'Three.js', c: '#ff5147' },
  { label: 'Python', c: '#ffb13d' },
  { label: 'Swift', c: '#ffd23f' },
  { label: 'GLSL', c: '#ff8a3d' },
];
const OUTER = [
  { label: 'TypeScript', c: '#ff5147' },
  { label: 'Node.js', c: '#ffb13d' },
  { label: 'GSAP', c: '#ffd23f' },
  { label: 'Blender', c: '#ff8a3d' },
  { label: 'Figma', c: '#ff5147' },
  { label: 'C++', c: '#ffb13d' },
  { label: 'WebGL', c: '#ffd23f' },
  { label: 'Virtual Machines', c: '#ff8a3d' },
];

const CLUSTERS = [
  ['Frontend & Motion', ['React', 'Framer Motion', 'GSAP', 'Tailwind']],
  ['3D & Graphics', ['Three.js', 'GLSL Shaders', 'Blender', 'WebGL']],
  ['Backend & Infra', ['Node.js', 'Python', 'PostgreSQL', 'Virtual Machines', 'Linux']],
  ['Languages', ['JavaScript', 'TypeScript', 'Swift', 'C++']],
];

function Ring({ items, radius, duration, reverse }) {
  return (
    <div
      className="orbit"
      style={{ '--d': `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
    >
      <div className="orbit__path" style={{ width: radius * 2, height: radius * 2 }} />
      {items.map((it, i) => {
        const a = (360 / items.length) * i;
        return (
          <div key={it.label} className="orbit__item" style={{ '--a': `${a}deg`, '--r': `${radius}px` }}>
            <div
              className="orbit__counter"
              style={{ '--d': `${duration}s`, animationDirection: reverse ? 'normal' : 'reverse' }}
            >
              <div className="chip" data-hover>
                <span className="chip__dot" style={{ background: it.c, boxShadow: `0 0 10px ${it.c}` }} />
                {it.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Skills() {
  const stageRef = useRef(null);

  const onMove = (e) => {
    const r = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    stageRef.current.style.transform = `rotateX(${-y * 16}deg) rotateY(${x * 16}deg)`;
  };
  const onLeave = () => { if (stageRef.current) stageRef.current.style.transform = ''; };

  return (
    <section id="skills" className="section skills">
      <div className="section__head">
        <Reveal as="span" className="section__eyebrow">
          <ScrambleText text="// the toolbox" trigger="view" />
        </Reveal>
        <Reveal as="h2" className="section__title" delay={0.05}>
          A universe of <span className="grad">tools I orbit</span>
        </Reveal>
      </div>

      <div className="skills__layout">
        <div className="skills__orbit" onMouseMove={onMove} onMouseLeave={onLeave}>
          <div className="skills__stage" ref={stageRef}>
            <div className="skills__core">
              <span>&lt;/&gt;</span>
            </div>
            <Ring items={INNER} radius={120} duration={26} />
            <Ring items={OUTER} radius={205} duration={40} reverse />
          </div>
        </div>

        <div className="skills__clusters">
          {CLUSTERS.map(([title, items], i) => (
            <Reveal className="cluster" key={title} delay={i * 0.07}>
              <h3 className="cluster__title">{title}</h3>
              <div className="cluster__items">
                {items.map((it) => <span className="cluster__pill" key={it} data-hover>{it}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
