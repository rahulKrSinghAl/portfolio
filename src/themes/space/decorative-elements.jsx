import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { keyframes } from '@mui/system';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const MotionBox = motion.create(Box);

const pulseBeacon = keyframes`
  0%, 100% { opacity: 0.3; box-shadow: 0 0 4px currentColor; }
  50% { opacity: 1; box-shadow: 0 0 16px currentColor, 0 0 32px currentColor; }
`;

const orbitSpin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const scanLine = keyframes`
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% { transform: translateY(100vh); opacity: 0; }
`;

const beaconPositions = [
  { top: '8%', right: '6%', size: 4, delay: 0, duration: 3 },
  { top: '22%', left: '3%', size: 3, delay: 1, duration: 4 },
  { top: '55%', right: '4%', size: 5, delay: 0.5, duration: 3.5 },
  { top: '78%', left: '8%', size: 3, delay: 2, duration: 4.5 },
  { top: '40%', left: '15%', size: 2, delay: 1.5, duration: 5 },
  { top: '65%', right: '15%', size: 2, delay: 0.8, duration: 3.8 },
];

const orbitalPaths = [
  { top: '15%', right: '8%', width: 300, height: 300, duration: 60, opacity: 0.06 },
  { top: '50%', left: '5%', width: 200, height: 200, duration: 45, opacity: 0.04 },
  { bottom: '10%', right: '12%', width: 150, height: 150, duration: 35, opacity: 0.05 },
];

export default function DecorativeElements({ type = 'corners', color = 'primary' }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const theme = useTheme();
  const resolvedColor = color === 'secondary'
    ? theme.palette.secondary.main
    : theme.palette.primary.main;

  const cornerBrackets = (
    <>
      {/* Top Left - HUD bracket */}
      <MotionBox
        initial={{ opacity: 0, x: -20, y: -20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50px',
          height: '50px',
          borderTop: '2px solid',
          borderLeft: '2px solid',
          borderColor: resolvedColor,
          opacity: 0.25,
          borderRadius: '4px 0 0 0',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 6,
            left: 6,
            width: 4,
            height: 4,
            borderRadius: '50%',
            bgcolor: resolvedColor,
            opacity: 0.6,
          },
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
          width: '50px',
          height: '50px',
          borderTop: '2px solid',
          borderRight: '2px solid',
          borderColor: resolvedColor,
          opacity: 0.25,
          borderRadius: '0 4px 0 0',
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
          width: '50px',
          height: '50px',
          borderBottom: '2px solid',
          borderLeft: '2px solid',
          borderColor: resolvedColor,
          opacity: 0.25,
          borderRadius: '0 0 0 4px',
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
          width: '50px',
          height: '50px',
          borderBottom: '2px solid',
          borderRight: '2px solid',
          borderColor: resolvedColor,
          opacity: 0.25,
          borderRadius: '0 0 4px 0',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 6,
            right: 6,
            width: 4,
            height: 4,
            borderRadius: '50%',
            bgcolor: resolvedColor,
            opacity: 0.6,
          },
        }}
      />
    </>
  );

  const floatingBeacons = (
    <>
      {/* Pulsing beacon dots */}
      {beaconPositions.map((pos, i) => (
        <Box
          key={`beacon-${i}`}
          sx={{
            position: 'absolute',
            top: pos.top,
            left: pos.left,
            right: pos.right,
            width: pos.size,
            height: pos.size,
            borderRadius: '50%',
            bgcolor: resolvedColor,
            color: resolvedColor,
            animation: prefersReducedMotion
              ? 'none'
              : `${pulseBeacon} ${pos.duration}s ease-in-out ${pos.delay}s infinite`,
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Orbital path rings */}
      {orbitalPaths.map((orbit, i) => (
        <Box
          key={`orbit-${i}`}
          sx={{
            position: 'absolute',
            top: orbit.top,
            left: orbit.left,
            right: orbit.right,
            bottom: orbit.bottom,
            width: orbit.width,
            height: orbit.height,
            border: '1px solid',
            borderColor: resolvedColor,
            borderRadius: '50%',
            opacity: orbit.opacity,
            animation: prefersReducedMotion
              ? 'none'
              : `${orbitSpin} ${orbit.duration}s linear infinite`,
            pointerEvents: 'none',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: -3,
              left: '50%',
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: resolvedColor,
              opacity: 0.8,
            },
          }}
        />
      ))}

      {/* Vertical scan line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '1px',
          height: '100%',
          overflow: 'hidden',
          opacity: 0.08,
          pointerEvents: 'none',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '150px',
            background: `linear-gradient(180deg, transparent, ${resolvedColor}, transparent)`,
            animation: prefersReducedMotion
              ? 'none'
              : `${scanLine} 8s linear infinite`,
          },
        }}
      />
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
        width: '2px',
        height: '80%',
        background: `linear-gradient(180deg, transparent, ${resolvedColor}, transparent)`,
        opacity: 0.3,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: -3,
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: resolvedColor,
          opacity: 0.6,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: -3,
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: resolvedColor,
          opacity: 0.6,
        },
      }}
    />
  );

  const types = {
    corners: cornerBrackets,
    floating: floatingBeacons,
    accent: verticalAccent,
  };

  return <>{types[type] || cornerBrackets}</>;
}
