import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const RevealOnScroll = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  const initial = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 0, ...directionOffset[direction] };

  const animate = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: 'easeOut',
      }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
