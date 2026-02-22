import { Box } from '@mui/material';

export default function JapaneseBackground() {
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

      {/* Japanese Art Fixed Background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/japanese-art.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: (theme) => theme.palette.mode === 'dark' ? 0.2 : 0.3,
          pointerEvents: 'none',
          zIndex: 0,
          filter: (theme) =>
            theme.palette.mode === 'dark'
              ? 'brightness(87) contrast(6) saturate(1.6)'
              : 'grayscale(70%) brightness(1.1)',
          mixBlendMode: (theme) =>
            theme.palette.mode === 'dark' ? 'screen' : 'multiply',
        }}
      />

      {/* Minimal Seigaiha Wave Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.04,
          backgroundImage: (theme) => {
            const color = encodeURIComponent(theme.palette.primary.main);
            return `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='${color}' stroke-width='1'%3E%3Cpath d='M25,50 Q12.5,62.5 0,50'/%3E%3Cpath d='M50,50 Q37.5,62.5 25,50'/%3E%3Cpath d='M75,50 Q62.5,62.5 50,50'/%3E%3Cpath d='M100,50 Q87.5,62.5 75,50'/%3E%3C/g%3E%3C/svg%3E")`;
          },
          backgroundSize: '100px 100px',
          zIndex: 0,
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
