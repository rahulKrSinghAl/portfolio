import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { keyframes } from '@mui/system';

const MotionBox = motion.create(Box);

const signalPulse = keyframes`
  0% { transform: scaleX(0); opacity: 0; }
  50% { transform: scaleX(1); opacity: 1; }
  100% { transform: scaleX(0); opacity: 0; }
`;

const beamScan = keyframes`
  0% { left: 0%; }
  100% { left: 100%; }
`;

export default function SectionDivider({ variant = 'signal' }) {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const dividers = {
    signal: (
      <Box
        sx={{
          width: '100%',
          height: '2px',
          position: 'relative',
          background: `linear-gradient(90deg, transparent 0%, ${primaryColor}33 20%, ${primaryColor} 50%, ${primaryColor}33 80%, transparent 100%)`,
          '&::before': {
            content: '""',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: primaryColor,
            boxShadow: `0 0 12px ${primaryColor}, 0 0 24px ${primaryColor}66`,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 24,
            height: 24,
            border: `1px solid ${primaryColor}`,
            borderRadius: '50%',
            opacity: 0.3,
          },
        }}
      />
    ),

    geometric: (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ width: '35%', height: '1px', background: `linear-gradient(90deg, transparent, ${primaryColor}66)` }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: primaryColor,
              boxShadow: `0 0 8px ${primaryColor}`,
            }}
          />
          <Box
            sx={{
              width: 10,
              height: 10,
              border: '1.5px solid',
              borderColor: secondaryColor,
              borderRadius: '2px',
              transform: 'rotate(45deg)',
            }}
          />
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: primaryColor,
              boxShadow: `0 0 8px ${primaryColor}`,
            }}
          />
        </Box>
        <Box sx={{ width: '35%', height: '1px', background: `linear-gradient(90deg, ${primaryColor}66, transparent)` }} />
      </Box>
    ),

    accent: (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          position: 'relative',
        }}
      >
        {[...Array(3)].map((_, i) => (
          <MotionBox
            key={i}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            sx={{
              width: i === 1 ? '200px' : '60px',
              height: i === 1 ? '2px' : '1px',
              background: i === 1
                ? `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`
                : primaryColor,
              opacity: i === 1 ? 1 : 0.4,
              borderRadius: '1px',
              position: 'relative',
              ...(i === 1 && {
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -2,
                  left: 0,
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: primaryColor,
                  boxShadow: `0 0 8px ${primaryColor}`,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: -2,
                  right: 0,
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: secondaryColor,
                  boxShadow: `0 0 8px ${secondaryColor}`,
                },
              }),
            }}
          />
        ))}
      </Box>
    ),

    wave: (
      <Box
        sx={{
          width: '100%',
          height: '2px',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, transparent, ${primaryColor}22, transparent)`,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: -1,
            width: 40,
            height: 4,
            borderRadius: '2px',
            background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
            boxShadow: `0 0 16px ${primaryColor}`,
            animation: `${beamScan} 4s linear infinite`,
          },
        }}
      />
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
      {dividers[variant] || dividers.signal}
    </Box>
  );
}
