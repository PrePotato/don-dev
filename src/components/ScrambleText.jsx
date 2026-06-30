import { useRef, useState, useEffect, useCallback } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#§$%';

/**
 * Decodes its text character-by-character — random glyphs resolving into the
 * final word. Inspired by kpr's menu in the reference video.
 *   trigger="hover"  → runs on mouse enter
 *   trigger="view"   → runs once when scrolled into view
 */
export default function ScrambleText({ text, as = 'span', trigger = 'hover', className = '' }) {
  const El = as;
  const [display, setDisplay] = useState(text);
  const raf = useRef(0);
  const ref = useRef(null);

  const run = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDisplay(text); return; }
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const dur = 380 + text.length * 22;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const locked = p * text.length;
      let out = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ' || i < locked - 1) out += text[i];
        else out += CHARS[(Math.random() * CHARS.length) | 0];
      }
      setDisplay(out);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => {
    if (trigger !== 'view') return;
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { run(); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(); io.unobserve(el); } });
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [trigger, run]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <El ref={ref} className={className} onMouseEnter={trigger === 'hover' ? run : undefined}>
      {display}
    </El>
  );
}
