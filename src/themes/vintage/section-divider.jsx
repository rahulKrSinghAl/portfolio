import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { keyframes } from '@mui/system';

const MotionBox = motion.create(Box);

const ropeSwing = keyframes`
  0%, 100% { transform: scaleX(1); }
  50% { transform: scaleX(1.02); }
`;

export default function SectionDivider({ variant = 'flourish' }) {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const dividers = {
    // Flourish: ❧ centered fleuron ornament with lines
    flourish: (
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
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${primaryColor}66)`,
        }} />
        <Box sx={{
          fontSize: '1.2rem',
          color: primaryColor,
          opacity: 0.6,
          lineHeight: 1,
          fontFamily: 'serif',
        }}>
          ❧
        </Box>
        <Box sx={{
          flex: 1,
          maxWidth: '200px',
          height: '1px',
          background: `linear-gradient(90deg, ${primaryColor}66, transparent)`,
        }} />
      </Box>
    ),

    // Compass: crosshair circle divider
    compass: (
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
          maxWidth: '180px',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${primaryColor}44)`,
        }} />
        <Box sx={{
          position: 'relative',
          width: 24,
          height: 24,
          border: `1px solid ${primaryColor}`,
          borderRadius: '50%',
          opacity: 0.4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: -6,
            right: -6,
            height: '1px',
            bgcolor: primaryColor,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            left: '50%',
            top: -6,
            bottom: -6,
            width: '1px',
            bgcolor: primaryColor,
          },
        }} />
        <Box sx={{
          flex: 1,
          maxWidth: '180px',
          height: '1px',
          background: `linear-gradient(90deg, ${primaryColor}44, transparent)`,
        }} />
      </Box>
    ),

    // Rope: 3 animated rope-like bars
    rope: (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        {[0, 1, 2].map((i) => (
          <MotionBox
            key={i}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            sx={{
              width: i === 1 ? '160px' : '50px',
              height: i === 1 ? '3px' : '2px',
              background: i === 1
                ? `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`
                : primaryColor,
              opacity: i === 1 ? 0.5 : 0.25,
              borderRadius: '2px',
              animation: `${ropeSwing} 4s ease-in-out ${i * 0.3}s infinite`,
              position: 'relative',
              ...(i === 1 && {
                '&::before': {
                  content: '"\\25C6"', // ◆
                  position: 'absolute',
                  top: '50%',
                  left: -8,
                  transform: 'translateY(-50%)',
                  fontSize: '6px',
                  color: primaryColor,
                  opacity: 0.6,
                },
                '&::after': {
                  content: '"\\25C6"',
                  position: 'absolute',
                  top: '50%',
                  right: -8,
                  transform: 'translateY(-50%)',
                  fontSize: '6px',
                  color: secondaryColor,
                  opacity: 0.6,
                },
              }),
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
      {dividers[variant] || dividers.flourish}
    </Box>
  );
}
