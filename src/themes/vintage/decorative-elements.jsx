import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { keyframes } from '@mui/system';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const MotionBox = motion.create(Box);

const floatDrift = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.15; }
  50% { transform: translateY(-8px) rotate(5deg); opacity: 0.25; }
`;

const inkDrip = keyframes`
  0%, 100% { opacity: 0.1; transform: scaleY(1); }
  50% { opacity: 0.2; transform: scaleY(1.05); }
`;

// Floating element positions
const floatingElements = [
  { top: '6%', right: '8%', size: 16, type: 'compass', delay: 0, duration: 8 },
  { top: '25%', left: '4%', size: 10, type: 'marker', delay: 1.5, duration: 6 },
  { top: '50%', right: '5%', size: 12, type: 'dot', delay: 0.8, duration: 7 },
  { top: '72%', left: '7%', size: 8, type: 'dot', delay: 2, duration: 9 },
  { top: '38%', left: '12%', size: 14, type: 'compass', delay: 1, duration: 10 },
  { top: '85%', right: '12%', size: 6, type: 'marker', delay: 0.5, duration: 5.5 },
];

// Mini compass rose SVG
function MiniCompass({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="0.3" opacity="0.3" />
      <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="0.3" opacity="0.3" />
      <polygon points="12,3 13.5,11 12,9 10.5,11" fill={color} opacity="0.5" />
    </svg>
  );
}

// Map pin marker SVG
function MapMarker({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 20" fill="none">
      <path d="M8 0C3.6 0 0 3.6 0 8c0 5.4 8 12 8 12s8-6.6 8-12C16 3.6 12.4 0 8 0z" fill={color} opacity="0.3" />
      <circle cx="8" cy="8" r="3" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}

export default function DecorativeElements({ type = 'corners', color = 'primary' }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const theme = useTheme();
  const resolvedColor = color === 'secondary'
    ? theme.palette.secondary.main
    : theme.palette.primary.main;

  // Ornate corner brackets with + ornaments
  const cornerBrackets = (
    <>
      {/* Top Left */}
      <MotionBox
        initial={{ opacity: 0, x: -15, y: -15 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50px',
          height: '50px',
          borderTop: '2px solid',
          borderLeft: '2px solid',
          borderColor: resolvedColor,
          opacity: 0.2,
          '&::after': {
            content: '"+"',
            position: 'absolute',
            top: 4,
            left: 4,
            fontSize: '10px',
            color: resolvedColor,
            opacity: 0.6,
            fontFamily: 'serif',
          },
        }}
      />
      {/* Top Right */}
      <MotionBox
        initial={{ opacity: 0, x: 15, y: -15 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50px',
          height: '50px',
          borderTop: '2px solid',
          borderRight: '2px solid',
          borderColor: resolvedColor,
          opacity: 0.2,
          '&::after': {
            content: '"+"',
            position: 'absolute',
            top: 4,
            right: 4,
            fontSize: '10px',
            color: resolvedColor,
            opacity: 0.6,
            fontFamily: 'serif',
          },
        }}
      />
      {/* Bottom Left */}
      <MotionBox
        initial={{ opacity: 0, x: -15, y: 15 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '50px',
          height: '50px',
          borderBottom: '2px solid',
          borderLeft: '2px solid',
          borderColor: resolvedColor,
          opacity: 0.2,
        }}
      />
      {/* Bottom Right */}
      <MotionBox
        initial={{ opacity: 0, x: 15, y: 15 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '50px',
          height: '50px',
          borderBottom: '2px solid',
          borderRight: '2px solid',
          borderColor: resolvedColor,
          opacity: 0.2,
          '&::after': {
            content: '"+"',
            position: 'absolute',
            bottom: 4,
            right: 4,
            fontSize: '10px',
            color: resolvedColor,
            opacity: 0.6,
            fontFamily: 'serif',
          },
        }}
      />
    </>
  );

  // Floating compass roses, map markers, ink dots
  const floatingItems = (
    <>
      {floatingElements.map((el, i) => (
        <Box
          key={`float-${i}`}
          sx={{
            position: 'absolute',
            top: el.top,
            left: el.left,
            right: el.right,
            pointerEvents: 'none',
            animation: prefersReducedMotion
              ? 'none'
              : `${floatDrift} ${el.duration}s ease-in-out ${el.delay}s infinite`,
            opacity: 0.15,
          }}
        >
          {el.type === 'compass' && <MiniCompass size={el.size} color={resolvedColor} />}
          {el.type === 'marker' && <MapMarker size={el.size} color={resolvedColor} />}
          {el.type === 'dot' && (
            <Box
              sx={{
                width: el.size / 2,
                height: el.size / 2,
                borderRadius: '50%',
                bgcolor: resolvedColor,
                opacity: 0.4,
              }}
            />
          )}
        </Box>
      ))}

      {/* Ink drip accent */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '3%',
          width: 3,
          height: 40,
          background: `linear-gradient(180deg, ${resolvedColor}, transparent)`,
          opacity: 0.1,
          animation: prefersReducedMotion ? 'none' : `${inkDrip} 6s ease-in-out infinite`,
          pointerEvents: 'none',
        }}
      />
    </>
  );

  // Vertical ink accent line
  const verticalAccent = (
    <MotionBox
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion ? 0 : 1 }}
      sx={{
        position: 'absolute',
        left: 0,
        top: '10%',
        width: '2px',
        height: '80%',
        background: `linear-gradient(180deg, transparent, ${resolvedColor}, transparent)`,
        opacity: 0.2,
        '&::before': {
          content: '"\\2767"', // ❧ fleuron
          position: 'absolute',
          top: -12,
          left: -6,
          fontSize: '14px',
          color: resolvedColor,
          opacity: 0.4,
        },
        '&::after': {
          content: '"\\2767"',
          position: 'absolute',
          bottom: -12,
          left: -6,
          fontSize: '14px',
          color: resolvedColor,
          opacity: 0.4,
          transform: 'rotate(180deg)',
        },
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
