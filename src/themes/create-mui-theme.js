import { createTheme } from '@mui/material/styles';

/**
 * Shared factory that turns any aesthetic theme + mode into a full MUI theme.
 *
 * @param {import('./theme-contract').AestheticTheme} aestheticTheme
 * @param {'dark'|'light'} mode
 * @returns {import('@mui/material/styles').Theme}
 */
export default function createMuiTheme(aestheticTheme, mode) {
  const { typographyConfig: typo, tokens } = aestheticTheme;
  const palette = aestheticTheme.palette(mode);
  const glow = aestheticTheme.glowColors(mode);

  return createTheme({
    palette,
    typography: {
      fontFamily: `${typo.fonts.primary}, ${typo.fonts.fallback}`,
      h1: {
        fontFamily: typo.fonts.primary,
        fontSize: '4.5rem',
        fontWeight: typo.weights.extraBold,
        letterSpacing: typo.spacing.loose,
        lineHeight: 1.1,
      },
      h2: {
        fontFamily: typo.fonts.primary,
        fontSize: '3rem',
        fontWeight: typo.weights.bold,
        letterSpacing: typo.spacing.loose,
        lineHeight: 1.2,
      },
      h3: {
        fontFamily: typo.fonts.primary,
        fontSize: '2.25rem',
        fontWeight: typo.weights.bold,
        letterSpacing: typo.spacing.loose,
        lineHeight: 1.3,
      },
      h4: {
        fontFamily: typo.fonts.primary,
        fontSize: '1.75rem',
        fontWeight: typo.weights.semiBold,
        letterSpacing: typo.spacing.loose,
        lineHeight: 1.4,
      },
      h5: {
        fontFamily: typo.fonts.primary,
        fontSize: '1.25rem',
        fontWeight: typo.weights.semiBold,
        letterSpacing: typo.spacing.relaxed,
        lineHeight: 1.5,
      },
      h6: {
        fontFamily: typo.fonts.primary,
        fontSize: '1.125rem',
        fontWeight: typo.weights.medium,
        letterSpacing: typo.spacing.relaxed,
        lineHeight: 1.6,
      },
      body1: {
        fontFamily: typo.fonts.primary,
        fontSize: '1rem',
        fontWeight: typo.weights.regular,
        lineHeight: 1.9,
        letterSpacing: typo.spacing.loose,
      },
      body2: {
        fontFamily: typo.fonts.primary,
        fontSize: '0.875rem',
        fontWeight: typo.weights.regular,
        lineHeight: 1.8,
        letterSpacing: typo.spacing.relaxed,
      },
      button: {
        fontFamily: typo.fonts.primary,
        fontWeight: typo.weights.semiBold,
        letterSpacing: typo.spacing.superLoose,
      },
    },
    shape: { borderRadius: 0 },
    spacing: 8,
    shadows:
      mode === 'dark'
        ? [
            'none',
            '0 2px 8px rgba(0,0,0,0.4)',
            '0 4px 16px rgba(0,0,0,0.5)',
            '0 8px 24px rgba(0,0,0,0.6)',
            '0 12px 32px rgba(0,0,0,0.7)',
            ...Array(20).fill('0 16px 48px rgba(0,0,0,0.8)'),
          ]
        : [
            'none',
            '0 2px 8px rgba(0,0,0,0.08)',
            '0 4px 16px rgba(0,0,0,0.12)',
            '0 8px 24px rgba(0,0,0,0.16)',
            '0 12px 32px rgba(0,0,0,0.2)',
            ...Array(20).fill('0 16px 48px rgba(0,0,0,0.24)'),
          ],
    components: aestheticTheme.muiOverrides(mode),
    custom: {
      colors: aestheticTheme.colors,
      typography: typo,
      spacing: tokens.spacing,
      glassEffect: tokens.glassEffect,
      animations: tokens.animations,
      glow,
    },
  });
}
