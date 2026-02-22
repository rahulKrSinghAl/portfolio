import { Box } from '@mui/material';

// Compass rose SVG as data URI watermark
const compassRoseSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' opacity='0.03'%3E%3Cg fill='none' stroke='%23C4A35A' stroke-width='0.5'%3E%3Ccircle cx='100' cy='100' r='80'/%3E%3Ccircle cx='100' cy='100' r='60'/%3E%3Ccircle cx='100' cy='100' r='40'/%3E%3Cline x1='100' y1='10' x2='100' y2='190'/%3E%3Cline x1='10' y1='100' x2='190' y2='100'/%3E%3Cline x1='30' y1='30' x2='170' y2='170'/%3E%3Cline x1='170' y1='30' x2='30' y2='170'/%3E%3Cpolygon points='100,15 108,90 100,70 92,90' fill='%23C4A35A' opacity='0.5'/%3E%3Ctext x='100' y='8' text-anchor='middle' font-size='10' fill='%23C4A35A' opacity='0.5'%3EN%3C/text%3E%3Ctext x='100' y='198' text-anchor='middle' font-size='10' fill='%23C4A35A' opacity='0.5'%3ES%3C/text%3E%3Ctext x='5' y='104' font-size='10' fill='%23C4A35A' opacity='0.5'%3EW%3C/text%3E%3Ctext x='190' y='104' font-size='10' fill='%23C4A35A' opacity='0.5'%3EE%3C/text%3E%3C/g%3E%3C/svg%3E")`;

export default function VintageBackground() {
  return (
    <>
      {/* Layer 1: Base color */}
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

      {/* Layer 2: Parchment texture image */}
      <Box
        component="img"
        src="/vintage-parchment.svg"
        alt=""
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          opacity: (theme) => (theme.palette.mode === 'dark' ? 0.06 : 0.12),
          pointerEvents: 'none',
          zIndex: 1,
          filter: (theme) =>
            theme.palette.mode === 'dark'
              ? 'sepia(0.8) brightness(0.4) contrast(1.2)'
              : 'sepia(0.3) brightness(1.1) contrast(0.95)',
          mixBlendMode: (theme) =>
            theme.palette.mode === 'dark' ? 'screen' : 'multiply',
        }}
      />

      {/* Layer 3: Faint map grid lines */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: (theme) => (theme.palette.mode === 'dark' ? 0.03 : 0.04),
          backgroundImage: (theme) => {
            const lineColor = theme.palette.mode === 'dark'
              ? 'rgba(196, 163, 90, 0.3)'
              : 'rgba(139, 105, 20, 0.2)';
            return `linear-gradient(${lineColor} 1px, transparent 1px), linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`;
          },
          backgroundSize: '100px 100px',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Layer 4: Compass rose watermark */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          width: '400px',
          height: '400px',
          backgroundImage: compassRoseSvg,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          opacity: (theme) => (theme.palette.mode === 'dark' ? 0.4 : 0.6),
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
    </>
  );
}
