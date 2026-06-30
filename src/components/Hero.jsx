import { motion } from 'framer-motion';
import ScrambleText from './ScrambleText.jsx';
import AvailableBadge from './AvailableBadge.jsx';

const ease = [0.22, 1, 0.36, 1];
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 1.6 } },
};
const up = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease } },
};

function MagneticButton({ children, href, variant = 'primary', onClick }) {
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    e.currentTarget.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const reset = (e) => (e.currentTarget.style.transform = '');
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`btn btn--${variant}`}
      data-hover
    >
      <span>{children}</span>
    </a>
  );
}

export default function Hero() {
  const go = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <motion.div className="hero__inner" variants={container} initial="hidden" animate="show">
        <motion.div className="hero__status" variants={up}>
          <span className="hero__status-dot" />
          Available for freelance projects &amp; collaborations
        </motion.div>

        <motion.p className="hero__kicker" variants={up}>
          <ScrambleText text="Computer Science Student · Creative Developer" trigger="view" />
        </motion.p>

        <h1 className="hero__title">
          <motion.span className="hero__line" variants={up}>I build <em>apps</em>,</motion.span>
          <motion.span className="hero__line" variants={up}>websites &amp; <em>digital</em></motion.span>
          <motion.span className="hero__line hero__line--grad" variants={up}>ideas that move.</motion.span>
        </h1>

        <motion.p className="hero__sub" variants={up}>
          Welcome to my digital workspace — a place where code, design and motion
          collide. I turn ambitious ideas into fast, beautiful, interactive software.
        </motion.p>

        <motion.div className="hero__actions" variants={up}>
          <MagneticButton href="#projects" variant="primary" onClick={(e) => go(e, '#projects')}>
            View Projects
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost" onClick={(e) => go(e, '#contact')}>
            Work With Me
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__badge-float"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.4, duration: 0.9, ease }}
      >
        <AvailableBadge onClick={(e) => go(e, '#contact')} />
      </motion.div>

      <motion.a
        href="#about"
        className="hero__scroll"
        onClick={(e) => go(e, '#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        data-hover
      >
        <span className="hero__scroll-track"><span className="hero__scroll-thumb" /></span>
        Scroll to explore
      </motion.a>
    </section>
  );
}
