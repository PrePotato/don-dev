import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from './Reveal.jsx';
import ScrambleText from './ScrambleText.jsx';

gsap.registerPlugin(ScrollTrigger);

const FACTS = [
  ['Focus', 'iOS Apps · Web · Realtime'],
  ['Stack', 'Swift · React · Node · Python'],
  ['Infra', 'Virtual Machines · Linux'],
  ['Status', 'Open to freelance'],
];

export default function About() {
  const wordsRef = useRef(null);

  // GSAP scroll-scrubbed word highlight — cinematic line reveal.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !wordsRef.current) return;
    const words = wordsRef.current.querySelectorAll('span');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: wordsRef.current,
            start: 'top 78%',
            end: 'bottom 55%',
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const statement =
    'I’m a computer-science student obsessed with the space where engineering meets design. I build software that feels alive — and I love teaming up with people who want to ship something memorable.';

  return (
    <section id="about" className="section about">
      <div className="section__head">
        <Reveal as="span" className="section__eyebrow">
          <ScrambleText text="// the person behind the pixels" trigger="view" />
        </Reveal>
      </div>

      <p className="about__statement" ref={wordsRef}>
        {statement.split(' ').map((w, i) => (
          <span key={i}>{w}&nbsp;</span>
        ))}
      </p>

      <div className="about__facts">
        {FACTS.map(([k, v], i) => (
          <Reveal className="about__fact" key={k} delay={i * 0.08}>
            <span className="about__fact-k">{k}</span>
            <span className="about__fact-v">{v}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
