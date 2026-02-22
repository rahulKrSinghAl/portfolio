import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

const twinkle1 = keyframes`
  0%, 100% { opacity: 0.2; }
  50%      { opacity: 0.9; }
`;

const twinkle2 = keyframes`
  0%, 100% { opacity: 0.15; }
  40%      { opacity: 0.8; }
  70%      { opacity: 0.3; }
`;

const twinkle3 = keyframes`
  0%, 100% { opacity: 0.3; }
  30%      { opacity: 1; }
  60%      { opacity: 0.4; }
`;

function generateStars(count, maxX, maxY, seed = 0) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = (i * 7919 + 1031 + seed * 3571) % maxX;
    const y = (i * 6271 + 2053 + seed * 4409) % maxY;
    const size = i % 4 === 0 ? 1.5 : i % 7 === 0 ? 2 : 1;
    const brightness = 0.25 + (i % 5) * 0.12;
    stars.push(`${x}px ${y}px 0 ${size > 1 ? size - 1 : 0}px rgba(255,255,255,${brightness})`);
  }
  return stars.join(', ');
}

const STARS_STATIC = generateStars(200, 2000, 5000, 0);
const STARS_TWINKLE_A = generateStars(50, 2000, 5000, 1);
const STARS_TWINKLE_B = generateStars(50, 2000, 5000, 2);
const STARS_TWINKLE_C = generateStars(25, 2000, 5000, 3);

const starLayer = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '1px',
  height: '1px',
  zIndex: 0,
  pointerEvents: 'none',
};

export default function SpaceBackground() {
  return (
    <>
      {/* Base background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'background.default',
          zIndex: 0,
        }}
      />

      {/* Static stars */}
      <Box
        sx={{
          ...starLayer,
          boxShadow: STARS_STATIC,
          display: (theme) => (theme.palette.mode === 'dark' ? 'block' : 'none'),
        }}
      />

      {/* Twinkle group A */}
      <Box
        sx={{
          ...starLayer,
          boxShadow: STARS_TWINKLE_A,
          animation: (theme) =>
            theme.palette.mode === 'dark' ? `${twinkle1} 3s ease-in-out infinite` : 'none',
          display: (theme) => (theme.palette.mode === 'dark' ? 'block' : 'none'),
        }}
      />

      {/* Twinkle group B */}
      <Box
        sx={{
          ...starLayer,
          boxShadow: STARS_TWINKLE_B,
          animation: (theme) =>
            theme.palette.mode === 'dark' ? `${twinkle2} 5s ease-in-out 1.5s infinite` : 'none',
          display: (theme) => (theme.palette.mode === 'dark' ? 'block' : 'none'),
        }}
      />

      {/* Twinkle group C */}
      <Box
        sx={{
          ...starLayer,
          boxShadow: STARS_TWINKLE_C,
          animation: (theme) =>
            theme.palette.mode === 'dark' ? `${twinkle3} 4s ease-in-out 0.8s infinite` : 'none',
          display: (theme) => (theme.palette.mode === 'dark' ? 'block' : 'none'),
        }}
      />
    </>
  );
}
