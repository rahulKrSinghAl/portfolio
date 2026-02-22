import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

const scanlineScroll = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
`;

const particleFloat = keyframes`
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
  25% { transform: translateY(-20px) translateX(5px); opacity: 0.6; }
  50% { transform: translateY(-10px) translateX(-3px); opacity: 0.4; }
  75% { transform: translateY(-30px) translateX(8px); opacity: 0.5; }
`;

const neonParticles = [
  { top: '8%', left: '5%', color: '#FF2D6B', size: 3, delay: 0, duration: 8 },
  { top: '15%', right: '12%', color: '#00F0FF', size: 2, delay: 1.2, duration: 6 },
  { top: '32%', left: '18%', color: '#B026FF', size: 2.5, delay: 0.5, duration: 10 },
  { top: '45%', right: '8%', color: '#FF2D6B', size: 2, delay: 2, duration: 7 },
  { top: '58%', left: '8%', color: '#00F0FF', size: 3, delay: 1, duration: 9 },
  { top: '72%', right: '22%', color: '#B026FF', size: 2, delay: 0.8, duration: 6.5 },
  { top: '85%', left: '30%', color: '#FF2D6B', size: 2.5, delay: 1.5, duration: 8 },
  { top: '20%', left: '45%', color: '#00F0FF', size: 2, delay: 2.5, duration: 11 },
  { top: '65%', right: '35%', color: '#B026FF', size: 1.5, delay: 0.3, duration: 7.5 },
  { top: '90%', right: '10%', color: '#00F0FF', size: 2, delay: 1.8, duration: 9 },
];

export default function CyberpunkBackground() {
  return (
    <>
      {/* Layer 1: Deep black base */}
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

      {/* Layer 2: City grid lines (perspective) */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: (theme) => (theme.palette.mode === 'dark' ? 0.04 : 0.03),
          backgroundImage: (theme) => {
            const lineColor = theme.palette.mode === 'dark'
              ? 'rgba(0, 240, 255, 0.4)'
              : 'rgba(176, 38, 255, 0.2)';
            return `linear-gradient(${lineColor} 1px, transparent 1px), linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`;
          },
          backgroundSize: '80px 80px',
          zIndex: 1,
          pointerEvents: 'none',
          perspective: '500px',
          perspectiveOrigin: '50% 50%',
        }}
      />

      {/* Layer 3: Floating neon particle dots */}
      {neonParticles.map((p, i) => (
        <Box
          key={`particle-${i}`}
          sx={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            right: p.right,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            bgcolor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            opacity: (theme) => (theme.palette.mode === 'dark' ? 0.4 : 0.15),
            animation: `${particleFloat} ${p.duration}s ease-in-out ${p.delay}s infinite`,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Layer 4: Scanline overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: (theme) => {
            const lineColor = theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.015)'
              : 'rgba(0, 0, 0, 0.01)';
            return `repeating-linear-gradient(0deg, transparent, transparent 2px, ${lineColor} 2px, ${lineColor} 4px)`;
          },
          animation: `${scanlineScroll} 0.1s linear infinite`,
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
