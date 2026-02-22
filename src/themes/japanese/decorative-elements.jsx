import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const MotionBox = motion.create(Box);

const ShurikenSvg = ({ size = 40, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 42.072 42.072"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill={color}
      d="M41.594,16.129H30.725c-0.552,0-0.984,0.458-1.148,0.986c-0.42,1.35-1.68,2.329-3.166,2.329
      c-1.832,0-3.315-1.484-3.315-3.315c0-1.019,0.46-1.931,1.185-2.539c0.422-0.355,0.713-0.945,0.541-1.47L21.344,1.418
      c-0.171-0.525-0.447-0.525-0.618,0l-3.445,10.603c-0.171,0.525,0.089,1.179,0.454,1.593c0.512,0.58,0.824,1.34,0.824,2.175
      c0,1.831-1.484,3.315-3.315,3.315c-1.367,0-2.529-0.83-3.033-2.012c-0.216-0.508-0.696-0.964-1.249-0.964H0.478
      c-0.553,0.001-0.638,0.264-0.191,0.589l9.294,6.752c0.447,0.324,1.134,0.267,1.632,0.027c0.429-0.207,0.909-0.324,1.418-0.324
      c1.831,0,3.315,1.484,3.315,3.314c0,1.831-1.484,3.315-3.315,3.315c-0.185,0-0.366-0.019-0.541-0.052
      c-0.295-0.055-0.663,0.287-0.833,0.812l-3.235,9.956c-0.171,0.525,0.053,0.688,0.5,0.363l8.909-6.473
      c0.447-0.324,0.569-0.94,0.423-1.435c-0.086-0.292-0.133-0.601-0.133-0.92c0-1.831,1.484-3.315,3.315-3.315
      s3.315,1.484,3.315,3.315c0,0.319-0.047,0.628-0.133,0.92c-0.146,0.494-0.024,1.11,0.423,1.435l8.909,6.473
      c0.446,0.324,0.671,0.162,0.5-0.363l-3.209-9.875c-0.171-0.525-0.485-0.902-0.709-0.871c-0.132,0.02-0.267,0.03-0.405,0.03
      c-1.831,0-3.314-1.484-3.314-3.315c0-1.83,1.483-3.314,3.314-3.314c0.447,0,0.87,0.092,1.258,0.256
      c0.508,0.215,1.211,0.256,1.658-0.069l9.143-6.642C42.233,16.392,42.146,16.129,41.594,16.129z M21.034,25.204
      c-1.598,0-2.893-1.295-2.893-2.894c0-1.598,1.295-2.893,2.893-2.893s2.893,1.295,2.893,2.893
      C23.927,23.909,22.632,25.204,21.034,25.204z"
    />
  </svg>
);

const shurikenPositions = [
  { top: '10%', right: '5%', size: 260, duration: 30, delay: 0, opRange: [0.12, 0.2, 0.12] },
  { top: '5%', left: '2%', size: 70, duration: 12, delay: 0.5, opRange: [0.3, 0.5, 0.3] },
  { top: '55%', right: '2%', size: 55, duration: 14, delay: 1.5, opRange: [0.3, 0.5, 0.3] },
  { top: '80%', left: '10%', size: 48, duration: 16, delay: 2, opRange: [0.25, 0.45, 0.25] },
  { top: '30%', left: '18%', size: 28, duration: 10, delay: 3, opRange: [0.35, 0.55, 0.35] },
  { top: '68%', left: '48%', size: 22, duration: 12, delay: 1, opRange: [0.3, 0.5, 0.3] },
];

export default function DecorativeElements({ type = 'corners', color = 'primary' }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const theme = useTheme();
  const resolvedColor = color === 'secondary'
    ? theme.palette.secondary.main
    : theme.palette.primary.main;

  const cornerBrackets = (
    <>
      {/* Top Left */}
      <MotionBox
        initial={{ opacity: 0, x: -20, y: -20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '60px',
          height: '60px',
          borderTop: '3px solid',
          borderLeft: '3px solid',
          borderColor: `${color}.main`,
          opacity: 0.3,
        }}
      />

      {/* Top Right */}
      <MotionBox
        initial={{ opacity: 0, x: 20, y: -20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '60px',
          height: '60px',
          borderTop: '3px solid',
          borderRight: '3px solid',
          borderColor: `${color}.main`,
          opacity: 0.3,
        }}
      />

      {/* Bottom Left */}
      <MotionBox
        initial={{ opacity: 0, x: -20, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '60px',
          height: '60px',
          borderBottom: '3px solid',
          borderLeft: '3px solid',
          borderColor: `${color}.main`,
          opacity: 0.3,
        }}
      />

      {/* Bottom Right */}
      <MotionBox
        initial={{ opacity: 0, x: 20, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '60px',
          height: '60px',
          borderBottom: '3px solid',
          borderRight: '3px solid',
          borderColor: `${color}.main`,
          opacity: 0.3,
        }}
      />
    </>
  );

  const floatingShuriken = (
    <>
      {shurikenPositions.map((pos, i) => (
        <MotionBox
          key={i}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, -10 - i * 3, 0],
                  rotate: [0, 360],
                  opacity: pos.opRange,
                }
          }
          transition={{
            duration: pos.duration,
            delay: pos.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          sx={{
            position: 'absolute',
            top: pos.top,
            left: pos.left,
            right: pos.right,
            opacity: pos.opRange[0],
            pointerEvents: 'none',
          }}
        >
          <ShurikenSvg size={pos.size} color={resolvedColor} />
        </MotionBox>
      ))}
    </>
  );

  const verticalAccent = (
    <MotionBox
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
      sx={{
        position: 'absolute',
        left: 0,
        top: '10%',
        width: '4px',
        height: '80%',
        background: `linear-gradient(180deg, transparent, ${resolvedColor}, transparent)`,
      }}
    />
  );

  const types = {
    corners: cornerBrackets,
    floating: floatingShuriken,
    accent: verticalAccent,
  };

  return <>{types[type] || cornerBrackets}</>;
}
