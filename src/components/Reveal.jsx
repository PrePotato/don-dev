import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

/** Lightweight scroll-into-view reveal used across sections. */
export default function Reveal({ children, as = 'div', delay = 0, y = 36, className = '', ...rest }) {
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </M>
  );
}
