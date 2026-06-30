import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import Reveal from './Reveal.jsx';
import ScrambleText from './ScrambleText.jsx';

const THINGS = [
  { n: '01', t: 'Personal & portfolio sites', d: 'A site that actually feels like you — fast, animated, memorable.' },
  { n: '02', t: 'Small business websites', d: 'Clean, trustworthy pages that turn visitors into customers.' },
  { n: '03', t: 'App prototypes', d: 'Clickable, real-feeling mobile or web app MVPs to test your idea.' },
  { n: '04', t: 'Custom tools', d: 'Little internal tools and automations that save you hours.' },
  { n: '05', t: 'UI concepts', d: 'Polished interface design and interactive Figma/Framer mockups.' },
  { n: '06', t: 'Creative experiments', d: 'WebGL, shaders, motion — when you want something nobody else has.' },
];

export default function Build() {
  const reduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skew = useSpring(useTransform(velocity, [-2500, 0, 2500], [2.5, 0, -2.5]),
    { stiffness: 250, damping: 40 });

  const go = (e) => {
    e.preventDefault();
    const el = document.querySelector('#contact');
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 });
    else el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="build" className="section build">
      <div className="section__head section__head--row">
        <div>
          <Reveal as="span" className="section__eyebrow">
            <ScrambleText text="// open for work" trigger="view" />
          </Reveal>
          <Reveal as="h2" className="section__title" delay={0.05}>
            Things I can <span className="grad">help you build</span>
          </Reveal>
        </div>
        <Reveal as="p" className="section__note" delay={0.1}>
          Have an idea? I take on a small number of freelance projects and
          collaborations — let’s make it real.
        </Reveal>
      </div>

      <motion.div className="build__list" style={reduced ? undefined : { skewY: skew }}>
        {THINGS.map((it, i) => (
          <Reveal className="build__row" key={it.n} delay={(i % 2) * 0.06} data-hover>
            <span className="build__n">{it.n}</span>
            <h3 className="build__t">{it.t}</h3>
            <p className="build__d">{it.d}</p>
            <span className="build__arrow">↗</span>
          </Reveal>
        ))}
      </motion.div>

      <Reveal className="build__cta" delay={0.1}>
        <span>Not sure what you need? That’s fine too.</span>
        <a href="#contact" className="btn btn--primary" onClick={go} data-hover><span>Let’s talk it through</span></a>
      </Reveal>
    </section>
  );
}
