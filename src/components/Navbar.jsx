import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ScrambleText from './ScrambleText.jsx';

const LINKS = [
  ['Work', '#projects'],
  ['Skills', '#skills'],
  ['Build', '#build'],
  ['About', '#about'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -40 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      className="nav"
      data-scrolled={scrolled}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#hero" className="nav__brand" onClick={(e) => go(e, '#hero')} data-hover>
        <span className="nav__brand-mark" />
        <span className="nav__brand-name">don<em>.dev</em></span>
      </a>

      <nav className={`nav__links ${open ? 'is-open' : ''}`}>
        {LINKS.map(([label, href]) => (
          <a key={href} href={href} onClick={(e) => go(e, href)} data-hover>
            <ScrambleText text={label} trigger="hover" />
          </a>
        ))}
        <a href="#contact" className="nav__cta" onClick={(e) => go(e, '#contact')} data-hover>
          Work With Me
        </a>
      </nav>

      <button
        className={`nav__burger ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span /><span />
      </button>
    </motion.header>
  );
}
