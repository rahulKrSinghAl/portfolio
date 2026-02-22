import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * Themed Logo Component
 * Renders the RS logo with theme-aware colors
 */
export default function Logo({ size = 56, showGlow = false }) {
  const theme = useTheme();

  // Generate unique gradient ID to avoid conflicts
  const gradientId = `logo-gradient-${Math.random().toString(36).substr(2, 9)}`;

  // Main logo uses gradient - same colors in both light and dark mode
  const gradientStart = theme.palette.primary.main; // Cyan
  const gradientEnd = theme.palette.primary.light; // Lighter cyan

  // Accent square color - always uses theme primary
  const accentColor = theme.palette.primary.main;

  // Calculate glow size - handle responsive sizes
  const getGlowSize = () => {
    if (typeof size === 'object') {
      // If responsive size object, use md value or fallback
      return (size.md || size.sm || size.xs || 56) * 0.15;
    }
    return size * 0.15;
  };

  // Optional glow effect
  const glowFilter = showGlow
    ? `drop-shadow(0 0 ${getGlowSize()}px ${theme.custom.glow.primaryGlow(0.4)})`
    : 'none';

  // Calculate accent glow size
  const getAccentGlowSize = () => {
    if (typeof size === 'object') {
      return (size.md || size.sm || size.xs || 56) * 0.08;
    }
    return size * 0.08;
  };

  return (
    <Box
      component="svg"
      viewBox="0 0 1024 1024"
      sx={{
        width: size,
        height: size,
        filter: glowFilter,
        transition: 'all 0.3s ease',
      }}
    >
      <defs>
        {/* Gradient definition for main logo */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradientStart} />
          <stop offset="100%" stopColor={gradientEnd} />
        </linearGradient>
      </defs>

      <g transform="translate(0,1024) scale(0.1,-0.1)">
        {/* Main RS logo shapes with gradient */}
        <path
          fill={`url(#${gradientId})`}
          d="M3360 5533 l0 -1747 268 274 267 273 5 1201 5 1201 920 3 919 2 -124
-128 c-69 -70 -172 -175 -229 -234 l-104 -108 -538 0 -539 -1 2 -516 3 -517
315 -193 c173 -106 380 -232 460 -281 l144 -87 746 -5 745 -5 -3 -65 c-7 -127
-67 -237 -164 -303 -103 -69 -68 -67 -1005 -67 l-843 0 -2 263 -3 262 -545
-542 -545 -543 1480 3 1480 2 74 23 c289 89 478 252 576 496 60 148 65 200 65
672 l0 424 -995 0 -994 0 -226 137 -225 138 0 92 0 93 368 0 367 0 473 473
472 472 0 293 0 292 -1535 0 -1535 0 0 -1747z"
        />

        {/* Accent square - theme primary color with glow */}
        <path
          fill={accentColor}
          d="M6590 6965 l0 -305 305 0 305 0 0 305 0 305 -305 0 -305 0 0 -305z"
          style={{
            filter: `drop-shadow(0 0 ${getAccentGlowSize()}px ${theme.custom.glow.primaryGlow(0.8)})`,
          }}
        />

        <path
          fill={`url(#${gradientId})`}
          d="M6105 6138 c-72 -73 -186 -190 -255 -260 l-125 -128 733 0 732 0 0
260 0 260 -478 0 -477 0 -130 -132z"
        />
      </g>
    </Box>
  );
}
