import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { keyframes } from '@mui/system';

const MotionBox = motion.create(Box);

const currentFlow = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(300%); }
`;

const neonFlicker = keyframes`
  0%, 100% { opacity: 0.6; }
  5% { opacity: 0.2; }
  10% { opacity: 0.7; }
  15% { opacity: 0.4; }
  20%, 80% { opacity: 0.6; }
  85% { opacity: 0.3; }
  90% { opacity: 0.7; }
`;

const glitchShift = keyframes`
  0%, 90%, 100% { transform: translateX(0); opacity: 0.4; }
  92% { transform: translateX(-3px); opacity: 0.6; }
  94% { transform: translateX(2px); opacity: 0.2; }
  96% { transform: translateX(-1px); opacity: 0.5; }
  98% { transform: translateX(3px); opacity: 0.3; }
`;

export default function SectionDivider({ variant = 'circuit' }) {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const dividers = {
    // Circuit: PCB trace with flowing dot
    circuit: (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          width: '100%',
        }}
      >
        <Box sx={{
          flex: 1,
          maxWidth: '200px',
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${secondaryColor}40)`,
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: -1,
            width: '20px',
            height: '4px',
            background: secondaryColor,
            boxShadow: `0 0 10px ${secondaryColor}`,
            borderRadius: '2px',
            animation: `${currentFlow} 3s linear infinite`,
          },
        }} />
        {/* Chip socket node */}
        <Box sx={{
          width: 12,
          height: 12,
          border: `2px solid ${primaryColor}`,
          borderRadius: '2px',
          bgcolor: `${primaryColor}20`,
          boxShadow: `0 0 8px ${primaryColor}40`,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 4,
            height: 4,
            borderRadius: '50%',
            bgcolor: primaryColor,
            boxShadow: `0 0 4px ${primaryColor}`,
          },
        }} />
        <Box sx={{
          flex: 1,
          maxWidth: '200px',
          height: '2px',
          background: `linear-gradient(90deg, ${secondaryColor}40, transparent)`,
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: -1,
            width: '20px',
            height: '4px',
            background: secondaryColor,
            boxShadow: `0 0 10px ${secondaryColor}`,
            borderRadius: '2px',
            animation: `${currentFlow} 3s linear 1.5s infinite`,
          },
        }} />
      </Box>
    ),

    // Neon: glowing line with pulse
    neon: (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          width: '100%',
        }}
      >
        <Box sx={{
          flex: 1,
          maxWidth: '180px',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${primaryColor}60)`,
        }} />
        <Box sx={{
          width: '80px',
          height: '3px',
          background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
          borderRadius: '2px',
          boxShadow: `0 0 12px ${primaryColor}60, 0 0 4px ${secondaryColor}40`,
          animation: `${neonFlicker} 4s ease-in-out infinite`,
        }} />
        <Box sx={{
          flex: 1,
          maxWidth: '180px',
          height: '1px',
          background: `linear-gradient(90deg, ${secondaryColor}60, transparent)`,
        }} />
      </Box>
    ),

    // Glitch: flickering bars
    glitch: (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 0.5,
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <MotionBox
            key={i}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            sx={{
              width: i === 2 ? '100px' : i % 2 === 0 ? '40px' : '60px',
              height: i === 2 ? '3px' : '2px',
              background: i === 2
                ? `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`
                : i % 2 === 0 ? primaryColor : secondaryColor,
              opacity: i === 2 ? 0.6 : 0.3,
              borderRadius: '1px',
              animation: `${glitchShift} ${3 + i * 0.5}s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </Box>
    ),
  };

  return (
    <Box
      sx={{
        width: '100%',
        py: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {dividers[variant] || dividers.circuit}
    </Box>
  );
}
