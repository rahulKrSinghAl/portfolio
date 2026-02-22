import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export default function SectionDivider({ variant = 'wave' }) {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const dividers = {
    wave: (
      <Box
        sx={{
          width: '100%',
          height: '2px',
          background: `linear-gradient(90deg, transparent 0%, ${primaryColor} 50%, transparent 100%)`,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100px',
            height: '100px',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,10 Q25,0 50,10 T100,10' fill='none' stroke='${encodeURIComponent(primaryColor)}' stroke-width='2'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
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
        <Box sx={{ width: '40%', height: '1px', bgcolor: 'primary.main', opacity: 0.3 }} />
        <Box
          sx={{
            width: 8,
            height: 8,
            border: '2px solid',
            borderColor: 'primary.main',
            transform: 'rotate(45deg)',
          }}
        />
        <Box sx={{ width: '40%', height: '1px', bgcolor: 'primary.main', opacity: 0.3 }} />
      </Box>
    ),

    accent: (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
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
              width: i === 1 ? '150px' : '50px',
              height: '3px',
              bgcolor: 'primary.main',
              background: i === 1 ? `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` : undefined,
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
      {dividers[variant] || dividers.wave}
    </Box>
  );
}
