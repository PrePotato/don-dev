import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = reduced ? 200 : 1500;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / total, 1);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => { setGone(true); onDone?.(); }, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="loader"
          initial={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader__inner">
            <div className="loader__tag">INITIALIZING&nbsp;WORKSPACE</div>
            <div className="loader__count">
              {String(count).padStart(3, '0')}<span>%</span>
            </div>
            <div className="loader__bar">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: count / 100 }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
