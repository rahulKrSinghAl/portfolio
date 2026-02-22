import { Box } from '@mui/material';

export default function SpaceBackground() {
  return (
    <>
      {/* Base Background Color */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'background.default',
          zIndex: 0,
        }}
      />

      {/* Space Elements Background */}
      <Box
        component="img"
        src="/space-elements.png"
        alt=""
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          opacity: (theme) => (theme.palette.mode === 'dark' ? 0.05 : 0.08),
          pointerEvents: 'none',
          zIndex: 1,
          filter: (theme) =>
            theme.palette.mode === 'dark'
              ? 'invert(1) sepia(1) saturate(2) hue-rotate(160deg) brightness(0.6)'
              : 'sepia(1) saturate(1.5) hue-rotate(160deg) brightness(0.5)',
          mixBlendMode: (theme) =>
            theme.palette.mode === 'dark' ? 'screen' : 'multiply',
        }}
      />

      {/* Subtle Grid */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.02,
          backgroundImage: (theme) => {
            const glow = theme.custom.glow.primaryGlow(0.3);
            return `linear-gradient(${glow} 1px, transparent 1px), linear-gradient(90deg, ${glow} 1px, transparent 1px)`;
          },
          backgroundSize: '80px 80px',
          zIndex: 0,
        }}
      />
    </>
  );
}
