import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

const twinkle = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

const twinkleSlow = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

const drift = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
`;

const pulseNebula = keyframes`
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
`;

const rotateField = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Generate starfield box-shadow strings
function generateStars(count, maxX, maxY, minSize = 1, maxSize = 2, color = '255, 255, 255') {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    const size = minSize + Math.random() * (maxSize - minSize);
    const opacity = 0.5 + Math.random() * 0.5;
    stars.push(`${x}px ${y}px ${size}px rgba(${color}, ${opacity})`);
  }
  return stars.join(', ');
}

// Colored accent stars (cyan & blue tinted)
// Note: This function will be called with theme colors at component initialization
function generateColoredStars(count, maxX, maxY, minSize = 1, maxSize = 3, colorValues = []) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    const size = minSize + Math.random() * (maxSize - minSize);
    const opacity = 0.4 + Math.random() * 0.6;
    const color = colorValues[Math.floor(Math.random() * colorValues.length)] || '255, 255, 255';
    stars.push(`${x}px ${y}px ${size}px rgba(${color}, ${opacity})`);
  }
  return stars.join(', ');
}

// Pre-generate star layers
// These use white stars - will be visible in both light and dark modes
const starsSmall = generateStars(350, 2000, 2000, 0.5, 1.2);
const starsMedium = generateStars(150, 2000, 2000, 1, 2);
const starsLarge = generateStars(60, 2000, 2000, 1.5, 3);

// Colored stars will use theme colors
// Using RGB values that match theme palette: cyan (0, 212, 255), indigo (99, 102, 241), blue (59, 130, 246), purple (167, 139, 250), amber (245, 158, 11)
const coloredStarColors = [
  '0, 212, 255',    // cyan - primary
  '99, 102, 241',   // indigo
  '59, 130, 246',   // blue
  '167, 139, 250',  // purple
  '245, 158, 11',   // amber - secondary
];
const starsColored = generateColoredStars(40, 2000, 2000, 1.5, 3.5, coloredStarColors);

export default function SpaceBackground() {
  return (
    <>
      {/* Deep space base gradient - adapts to theme mode */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? `linear-gradient(180deg,
                  ${theme.palette.background.default} 0%,
                  rgba(6, 11, 24, 1) 25%,
                  rgba(10, 14, 26, 1) 50%,
                  rgba(5, 13, 30, 1) 75%,
                  ${theme.palette.background.paper} 100%)`
              : `linear-gradient(180deg,
                  rgba(224, 242, 254, 1) 0%,
                  rgba(186, 230, 253, 1) 25%,
                  rgba(125, 211, 252, 1) 50%,
                  rgba(56, 189, 248, 1) 75%,
                  rgba(14, 165, 233, 1) 100%)`,
          zIndex: 0,
        }}
      />

      {/* Space theme SVG background */}
      <Box
        component="img"
        src="/space-bg.svg"
        alt=""
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: (theme) => (theme.palette.mode === 'dark' ? 0.35 : 0.25),
          pointerEvents: 'none',
          zIndex: 2,
          filter: (theme) =>
            theme.palette.mode === 'dark'
              ? 'invert(1) hue-rotate(190deg) saturate(1.8) brightness(1.1) contrast(1.2)'
              : 'hue-rotate(10deg) saturate(1.2) brightness(0.95)',
        }}
      />

      {/* Small stars - far field (drifting) */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '2000px',
          height: '2000px',
          boxShadow: starsSmall,
          zIndex: 1,
          animation: `${drift} 200s linear infinite`,
        }}
      />

      {/* Medium stars - mid field (twinkling) */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '2000px',
          height: '2000px',
          boxShadow: starsMedium,
          zIndex: 1,
          animation: `${twinkle} 4s ease-in-out infinite`,
        }}
      />

      {/* Large stars - near field (slow twinkle) */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '2000px',
          height: '2000px',
          boxShadow: starsLarge,
          zIndex: 1,
          animation: `${twinkleSlow} 6s ease-in-out infinite 1s`,
        }}
      />

      {/* Colored accent stars */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '2000px',
          height: '2000px',
          boxShadow: starsColored,
          zIndex: 1,
          animation: `${twinkle} 5s ease-in-out infinite 2s`,
        }}
      />

      {/* Nebula - top right (indigo/purple) */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '80vw',
          height: '80vh',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? `radial-gradient(ellipse at center,
                  rgba(99, 102, 241, 0.22) 0%,
                  rgba(59, 130, 246, 0.12) 30%,
                  rgba(99, 102, 241, 0.04) 60%,
                  transparent 75%)`
              : `radial-gradient(ellipse at center,
                  rgba(99, 102, 241, 0.12) 0%,
                  rgba(59, 130, 246, 0.06) 30%,
                  rgba(99, 102, 241, 0.02) 60%,
                  transparent 75%)`,
          filter: 'blur(50px)',
          zIndex: 0,
          animation: `${pulseNebula} 15s ease-in-out infinite`,
          pointerEvents: 'none',
        }}
      />

      {/* Nebula - bottom left (cyan/teal) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '70vw',
          height: '70vh',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? `radial-gradient(ellipse at center,
                  ${theme.custom.glow.primaryGlow(0.18)} 0%,
                  rgba(20, 184, 166, 0.08) 35%,
                  ${theme.custom.glow.primaryGlow(0.03)} 60%,
                  transparent 75%)`
              : `radial-gradient(ellipse at center,
                  ${theme.custom.glow.primaryGlow(0.10)} 0%,
                  rgba(20, 184, 166, 0.05) 35%,
                  ${theme.custom.glow.primaryGlow(0.02)} 60%,
                  transparent 75%)`,
          filter: 'blur(60px)',
          zIndex: 0,
          animation: `${pulseNebula} 20s ease-in-out infinite 5s`,
          pointerEvents: 'none',
        }}
      />

      {/* Nebula - center (subtle warm) */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: '50vw',
          height: '50vh',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? `radial-gradient(ellipse at center,
                  rgba(167, 139, 250, 0.08) 0%,
                  ${theme.custom.glow.secondaryGlow(0.03)} 40%,
                  transparent 70%)`
              : `radial-gradient(ellipse at center,
                  rgba(167, 139, 250, 0.05) 0%,
                  ${theme.custom.glow.secondaryGlow(0.02)} 40%,
                  transparent 70%)`,
          filter: 'blur(80px)',
          zIndex: 0,
          animation: `${pulseNebula} 25s ease-in-out infinite 10s`,
          pointerEvents: 'none',
        }}
      />

      {/* Grid overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: (theme) => (theme.palette.mode === 'dark' ? 0.04 : 0.03),
          backgroundImage: (theme) =>
            theme.palette.mode === 'dark'
              ? `linear-gradient(${theme.custom.glow.primaryGlow(0.5)} 1px, transparent 1px), linear-gradient(90deg, ${theme.custom.glow.primaryGlow(0.5)} 1px, transparent 1px)`
              : 'linear-gradient(rgba(0, 150, 200, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 150, 200, 0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Orbital ring decoration - slow rotating */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '140vw',
          height: '140vw',
          transform: 'translate(-50%, -50%)',
          border: (theme) =>
            theme.palette.mode === 'dark'
              ? `1px solid ${theme.custom.glow.primaryGlow(0.04)}`
              : '1px solid rgba(0, 150, 200, 0.06)',
          borderRadius: '50%',
          zIndex: 0,
          animation: `${rotateField} 180s linear infinite`,
          pointerEvents: 'none',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: (theme) =>
              theme.palette.mode === 'dark' ? theme.custom.glow.primaryGlow(0.5) : 'rgba(0, 150, 200, 0.6)',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? `0 0 8px ${theme.custom.glow.primaryGlow(0.6)}`
                : '0 0 6px rgba(0, 150, 200, 0.5)',
            transform: 'translate(-50%, -50%)',
          },
        }}
      />

      {/* Second orbital ring */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '90vw',
          height: '90vw',
          transform: 'translate(-50%, -50%)',
          border: (theme) =>
            theme.palette.mode === 'dark'
              ? `1px solid ${theme.custom.glow.secondaryGlow(0.03)}`
              : `1px solid ${theme.custom.glow.secondaryGlow(0.05)}`,
          borderRadius: '50%',
          zIndex: 0,
          animation: `${rotateField} 120s linear infinite reverse`,
          pointerEvents: 'none',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: (theme) =>
              theme.palette.mode === 'dark' ? theme.custom.glow.secondaryGlow(0.4) : theme.custom.glow.secondaryGlow(0.5),
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? `0 0 6px ${theme.custom.glow.secondaryGlow(0.5)}`
                : `0 0 5px ${theme.custom.glow.secondaryGlow(0.4)}`,
            transform: 'translate(-50%, 50%)',
          },
        }}
      />

      {/* Horizon glow line */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? `linear-gradient(90deg,
                  transparent 0%,
                  ${theme.custom.glow.primaryGlow(0.2)} 25%,
                  ${theme.custom.glow.primaryGlow(0.5)} 50%,
                  ${theme.custom.glow.primaryGlow(0.2)} 75%,
                  transparent 100%)`
              : 'linear-gradient(90deg, transparent 0%, rgba(0, 150, 200, 0.15) 25%, rgba(0, 150, 200, 0.3) 50%, rgba(0, 150, 200, 0.15) 75%, transparent 100%)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? `0 0 30px ${theme.custom.glow.primaryGlow(0.15)}, 0 0 60px ${theme.custom.glow.primaryGlow(0.08)}`
              : '0 0 20px rgba(0, 150, 200, 0.1), 0 0 40px rgba(0, 150, 200, 0.05)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
