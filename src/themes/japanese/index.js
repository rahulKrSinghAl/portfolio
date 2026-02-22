import colors from './colors';
import typography from './typography';
import { spacing, glassEffect, animations } from './tokens';
import { Background, DecorativeElements, SectionDivider } from './components';

const japaneseTheme = {
  id: 'japanese',
  name: 'Japanese',
  description: 'A refined aesthetic inspired by Japanese art — crimson and gold with sharp geometric forms.',
  icon: '\u9053', // "michi" - the way/path

  colors,
  typographyConfig: typography,
  tokens: { spacing, glassEffect, animations },

  palette(mode) {
    return {
      mode,
      primary: {
        main: mode === 'dark' ? colors.crimson.main : colors.crimson.crimsonDark,
        light: colors.crimson.light,
        dark: colors.crimson.dark,
      },
      secondary: {
        main: mode === 'dark' ? colors.gold.main : colors.gold.goldDark,
        light: colors.gold.light,
        dark: colors.gold.dark,
      },
      background: {
        default: mode === 'dark' ? colors.black.pure : colors.white.soft,
        paper: mode === 'dark' ? colors.black.soft : colors.white.pure,
      },
      text: {
        primary: mode === 'dark' ? colors.gray.light : colors.gray.darker,
        secondary: mode === 'dark' ? colors.gray.medium : colors.gray.dark,
      },
      divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      glass: mode === 'dark' ? glassEffect.dark : glassEffect.light,
      gradient: {
        primary: `linear-gradient(135deg, ${colors.crimson.main} 0%, ${colors.gold.main} 50%, ${colors.gold.dark} 100%)`,
        secondary: `linear-gradient(90deg, ${colors.crimson.main}, ${colors.gold.main})`,
      },
    };
  },

  glowColors(mode) {
    const primary = mode === 'dark' ? colors.crimson.main : colors.crimson.crimsonDark;
    const secondary = mode === 'dark' ? colors.gold.main : colors.gold.goldDark;
    // Parse hex to rgb components
    const pR = parseInt(primary.slice(1, 3), 16);
    const pG = parseInt(primary.slice(3, 5), 16);
    const pB = parseInt(primary.slice(5, 7), 16);
    const sR = parseInt(secondary.slice(1, 3), 16);
    const sG = parseInt(secondary.slice(3, 5), 16);
    const sB = parseInt(secondary.slice(5, 7), 16);
    return {
      primaryGlow: (alpha) => `rgba(${pR}, ${pG}, ${pB}, ${alpha})`,
      secondaryGlow: (alpha) => `rgba(${sR}, ${sG}, ${sB}, ${alpha})`,
    };
  },

  muiOverrides(mode) {
    return {
      MuiCssBaseline: {
        styleOverrides: {
          body: { overflowX: 'hidden' },
          html: { overflowX: 'hidden' },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: typography.weights.medium,
            fontSize: '1rem',
            padding: '10px 24px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: typography.weights.medium,
            borderRadius: 0,
          },
        },
      },
    };
  },

  decorativeComponents: { Background, DecorativeElements, SectionDivider },
};

export default japaneseTheme;
