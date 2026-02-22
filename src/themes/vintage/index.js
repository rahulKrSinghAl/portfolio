import colors from './colors';
import typography from './typography';
import { spacing, glassEffect, animations } from './tokens';
import { Background, DecorativeElements, SectionDivider } from './components';

const vintageTheme = {
  id: 'vintage',
  name: 'Vintage Explorer',
  description: 'An aged-parchment, cartography aesthetic — leather-bound journals, wax seals, and expedition maps.',
  icon: '🧭',

  colors,
  typographyConfig: typography,
  tokens: { spacing, glassEffect, animations },

  content: {
    nav: [
      { id: 'about', label: 'About', sub: 'CH. I' },
      { id: 'experience', label: 'Experience', sub: 'CH. II' },
      { id: 'skills', label: 'Skills', sub: 'CH. III' },
      { id: 'projects', label: 'Projects', sub: 'CH. IV' },
      { id: 'themes', label: 'Themes', sub: 'CH. V' },
      { id: 'contact', label: 'Contact', sub: 'CH. VI' },
    ],
    hero: {
      superTitle: 'FIELD JOURNAL',
      subtitle: 'FRONTEND CARTOGRAPHER // REACT EXPEDITION LEAD',
      typingSequences: [
        'Charting Scalable React Territories', 2000,
        'Leading Frontend Expeditions', 2000,
        'Mapping Production-Grade Interfaces', 2000,
        'Discovering High-Performance Patterns', 2000,
      ],
      ctaPrimary: 'Send Dispatch',
      ctaSecondary: 'View Expeditions',
    },
    about: {
      label: 'Chronicle',
      heading: 'EXPLORER\'S PASSPORT',
      headingSub: 'Field Dossier',
      experiencePrimary: 'YEARS',
      experienceSub: 'Expeditions',
    },
    experience: {
      heading: 'EXPEDITIONS',
      headingSub: 'Route Map',
    },
    skills: {
      heading: 'CARTOGRAPHY',
      headingSub: 'Specimen Cabinet',
      frontendTitle: 'Collected Specimens',
      languagesTitle: 'Ink Reserves',
      spokenTitle: 'Filed Catalogs',
    },
    projects: {
      heading: 'DISCOVERIES',
      headingSub: 'Field Reports',
    },
    contact: {
      heading: 'DISPATCH',
      headingSub: 'Correspondence Office',
      title: 'Send Correspondence',
      educationTitle: 'Academic Credentials',
      achievementsTitle: 'Honors & Medals',
    },
    logo: {
      text: 'RS',
      subtext: 'EXPL.',
    },
  },

  palette(mode) {
    return {
      mode,
      primary: {
        main: mode === 'dark' ? colors.sepia.main : colors.sepia.dark,
        light: colors.sepia.light,
        dark: colors.sepia.deepDark,
      },
      secondary: {
        main: mode === 'dark' ? colors.inkRed.main : colors.inkRed.dark,
        light: colors.inkRed.light,
        dark: colors.inkRed.deepDark,
      },
      background: {
        default: mode === 'dark' ? colors.leather.base : colors.parchment.base,
        paper: mode === 'dark' ? colors.leather.card : colors.parchment.card,
      },
      text: {
        primary: mode === 'dark' ? colors.ink.darkPrimary : colors.ink.lightPrimary,
        secondary: mode === 'dark' ? colors.ink.darkSecondary : colors.ink.lightSecondary,
      },
      divider: mode === 'dark' ? 'rgba(196, 163, 90, 0.1)' : 'rgba(92, 68, 9, 0.1)',
      glass: mode === 'dark' ? glassEffect.dark : glassEffect.light,
      gradient: {
        primary: `linear-gradient(135deg, ${colors.sepia.main} 0%, ${colors.inkRed.main} 50%, ${colors.inkRed.dark} 100%)`,
        secondary: `linear-gradient(90deg, ${colors.sepia.main}, ${colors.inkRed.main})`,
      },
    };
  },

  glowColors(mode) {
    const primary = mode === 'dark' ? colors.sepia.main : colors.sepia.dark;
    const secondary = mode === 'dark' ? colors.inkRed.main : colors.inkRed.dark;
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
          html: {
            overflowX: 'hidden',
            scrollbarColor: mode === 'dark'
              ? 'rgba(196, 163, 90, 0.2) #1A1209'
              : 'rgba(92, 68, 9, 0.2) #FAF6EE',
          },
          body: {
            overflowX: 'hidden',
          },
          '*::-webkit-scrollbar': {
            width: '8px',
          },
          '*::-webkit-scrollbar-track': {
            background: mode === 'dark' ? '#1A1209' : '#FAF6EE',
          },
          '*::-webkit-scrollbar-thumb': {
            background: mode === 'dark' ? 'rgba(196, 163, 90, 0.25)' : 'rgba(92, 68, 9, 0.2)',
            borderRadius: '4px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: mode === 'dark' ? 'rgba(196, 163, 90, 0.4)' : 'rgba(92, 68, 9, 0.4)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: typography.weights.semiBold,
            fontSize: '0.95rem',
            fontFamily: typography.fonts.secondary,
            padding: '10px 28px',
            letterSpacing: typography.spacing.relaxed,
            borderRadius: '2px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: '2px',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: typography.weights.medium,
            fontFamily: typography.fonts.secondary,
            borderRadius: '2px',
            letterSpacing: typography.spacing.normal,
          },
        },
      },
    };
  },

  decorativeComponents: { Background, DecorativeElements, SectionDivider },
};

export default vintageTheme;
