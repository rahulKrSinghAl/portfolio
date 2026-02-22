import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { keyframes } from '@mui/system';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const MotionBox = motion.create(Box);

const neonPulse = keyframes`
  0%, 100% { opacity: 0.2; filter: blur(0px); }
  50% { opacity: 0.4; filter: blur(1px); }
`;

const particleDrift = keyframes`
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
  33% { transform: translateY(-12px) translateX(4px); opacity: 0.5; }
  66% { transform: translateY(-6px) translateX(-3px); opacity: 0.25; }
`;

const floatingParticles = [
  { top: '8%', right: '6%', size: 3, color: 'pink', delay: 0, duration: 7 },
  { top: '22%', left: '5%', size: 2, color: 'cyan', delay: 1, duration: 5.5 },
  { top: '48%', right: '4%', size: 2.5, color: 'purple', delay: 0.5, duration: 8 },
  { top: '68%', left: '8%', size: 2, color: 'pink', delay: 1.5, duration: 6 },
  { top: '35%', left: '15%', size: 3, color: 'cyan', delay: 0.8, duration: 9 },
  { top: '82%', right: '10%', size: 2, color: 'purple', delay: 2, duration: 7 },
];

const colorMap = {
  pink: '#FF2D6B',
  cyan: '#00F0FF',
  purple: '#B026FF',
};

export default function DecorativeElements({ type = 'corners', color = 'primary' }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const theme = useTheme();
  const resolvedColor = color === 'secondary'
    ? theme.palette.secondary.main
    : theme.palette.primary.main;

  // Neon corner brackets with dot connectors
  const cornerBrackets = (
    <>
      {/* Top Left */}
      <MotionBox
        initial={{ opacity: 0, x: -15, y: -15 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderTop: '2px solid',
          borderLeft: '2px solid',
          borderColor: resolvedColor,
          opacity: 0.3,
          boxShadow: `0 0 8px ${resolvedColor}40`,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: -3,
            left: -3,
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: resolvedColor,
            boxShadow: `0 0 6px ${resolvedColor}`,
          },
        }}
      />
      {/* Top Right */}
      <MotionBox
        initial={{ opacity: 0, x: 15, y: -15 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40px',
          height: '40px',
          borderTop: '2px solid',
          borderRight: '2px solid',
          borderColor: resolvedColor,
          opacity: 0.3,
          boxShadow: `0 0 8px ${resolvedColor}40`,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: -3,
            right: -3,
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: resolvedColor,
            boxShadow: `0 0 6px ${resolvedColor}`,
          },
        }}
      />
      {/* Bottom Left */}
      <MotionBox
        initial={{ opacity: 0, x: -15, y: 15 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderBottom: '2px solid',
          borderLeft: '2px solid',
          borderColor: resolvedColor,
          opacity: 0.3,
          boxShadow: `0 0 8px ${resolvedColor}40`,
        }}
      />
      {/* Bottom Right */}
      <MotionBox
        initial={{ opacity: 0, x: 15, y: 15 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '40px',
          height: '40px',
          borderBottom: '2px solid',
          borderRight: '2px solid',
          borderColor: resolvedColor,
          opacity: 0.3,
          boxShadow: `0 0 8px ${resolvedColor}40`,
        }}
      />
    </>
  );

  // Floating neon particles (pink/cyan/purple dots drifting)
  const floatingItems = (
    <>
      {floatingParticles.map((p, i) => (
        <Box
          key={`float-${i}`}
          sx={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            right: p.right,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            bgcolor: colorMap[p.color],
            boxShadow: `0 0 ${p.size * 3}px ${colorMap[p.color]}`,
            animation: prefersReducedMotion
              ? 'none'
              : `${particleDrift} ${p.duration}s ease-in-out ${p.delay}s infinite`,
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );

  // Vertical neon accent strip (gradient glow bar)
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
        width: '2px',
        height: '80%',
        background: `linear-gradient(180deg, transparent, ${resolvedColor}, transparent)`,
        opacity: 0.3,
        boxShadow: `0 0 8px ${resolvedColor}40`,
        animation: prefersReducedMotion ? 'none' : `${neonPulse} 3s ease-in-out infinite`,
      }}
    />
  );

  const types = {
    corners: cornerBrackets,
    floating: floatingItems,
    accent: verticalAccent,
  };

  return <>{types[type] || cornerBrackets}</>;
}
