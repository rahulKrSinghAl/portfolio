import colors from './colors';
import typography from './typography';
import { spacing, glassEffect, animations } from './tokens';
import { Background, DecorativeElements, SectionDivider } from './components';

const spaceTheme = {
  id: 'space',
  name: 'Space',
  description: 'A calm, futuristic aesthetic inspired by mission control systems and deep space exploration.',
  icon: '\u2604',

  colors,
  typographyConfig: typography,
  tokens: { spacing, glassEffect, animations },

  content: {
    nav: [
      { id: 'about', label: 'About', sub: 'DSIR-001' },
      { id: 'experience', label: 'Experience', sub: 'FLGT-LOG' },
      { id: 'skills', label: 'Skills', sub: 'SYS-CAP' },
      { id: 'projects', label: 'Projects', sub: 'LNCH-BAY' },
      { id: 'themes', label: 'Themes', sub: 'CFG-VIS' },
      { id: 'contact', label: 'Contact', sub: 'TX-HUB' },
    ],
    hero: {
      superTitle: 'MISSION CONTROL',
      subtitle: 'FRONTEND SYSTEMS ARCHITECT // REACT SPECIALIST',
      typingSequences: [
        'Architecting Scalable React Systems', 2000,
        'Leading Frontend Mission Teams', 2000,
        'Designing Production-Grade UI', 2000,
        'Deploying High-Performance Solutions', 2000,
      ],
      ctaPrimary: 'Initiate Contact',
      ctaSecondary: 'View Transmission Log',
    },
    about: {
      label: 'Mission Profile',
      heading: 'DOSSIER',
      headingSub: 'Operative Profile',
      experiencePrimary: 'YEARS',
      experienceSub: 'Mission Duration',
    },
    experience: {
      heading: 'FLIGHT LOG',
      headingSub: 'Trajectory',
    },
    skills: {
      heading: 'SYSTEMS',
      headingSub: 'Capabilities',
      frontendTitle: 'Core Systems',
      languagesTitle: 'Programming Languages',
      spokenTitle: 'Communication Protocols',
    },
    projects: {
      heading: 'LAUNCH BAY',
      headingSub: 'Deployments',
    },
    contact: {
      heading: 'COMMS',
      headingSub: 'Transmission Hub',
      title: 'Initiate Transmission',
      educationTitle: 'Training Protocol',
      achievementsTitle: 'Commendations',
    },
    logo: {
      text: 'RKS',
      subtext: 'CMDR',
    },
  },

  palette(mode) {
    return {
      mode,
      primary: {
        main: mode === 'dark' ? colors.cyan.main : colors.cyan.muted,
        light: colors.cyan.light,
        dark: colors.cyan.dark,
      },
      secondary: {
        main: mode === 'dark' ? colors.amber.main : colors.amber.muted,
        light: colors.amber.light,
        dark: colors.amber.dark,
      },
      background: {
        default: mode === 'dark' ? colors.black.pure : colors.white.soft,
        paper: mode === 'dark' ? colors.black.card : colors.white.pure,
      },
      text: {
        primary: mode === 'dark' ? colors.gray.light : colors.gray.darker,
        secondary: mode === 'dark' ? colors.gray.medium : colors.gray.dark,
      },
      divider: mode === 'dark' ? 'rgba(0, 212, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      glass: mode === 'dark' ? glassEffect.dark : glassEffect.light,
      gradient: {
        primary: `linear-gradient(135deg, ${colors.cyan.main} 0%, ${colors.nebula.blue} 50%, ${colors.nebula.purple} 100%)`,
        secondary: `linear-gradient(90deg, ${colors.cyan.main}, ${colors.amber.main})`,
      },
    };
  },

  glowColors(mode) {
    const primary = mode === 'dark' ? colors.cyan.main : colors.cyan.muted;
    const secondary = mode === 'dark' ? colors.amber.main : colors.amber.muted;
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
            backgroundColor: mode === 'dark' ? colors.black.pure : colors.white.soft,
            scrollbarColor: mode === 'dark'
              ? 'rgba(0, 212, 255, 0.2) #030712'
              : 'rgba(0, 0, 0, 0.2) #F1F5F9',
          },
          body: {
            overflowX: 'hidden',
          },
          '*::-webkit-scrollbar': {
            width: '8px',
          },
          '*::-webkit-scrollbar-track': {
            background: mode === 'dark' ? '#030712' : '#F1F5F9',
          },
          '*::-webkit-scrollbar-thumb': {
            background: mode === 'dark' ? 'rgba(0, 212, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: mode === 'dark' ? 'rgba(0, 212, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'uppercase',
            fontWeight: typography.weights.semiBold,
            fontSize: '0.9rem',
            padding: '10px 24px',
            letterSpacing: typography.spacing.relaxed,
            borderRadius: '4px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: '6px',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: typography.weights.medium,
            borderRadius: '4px',
            letterSpacing: typography.spacing.relaxed,
          },
        },
      },
    };
  },

  decorativeComponents: { Background, DecorativeElements, SectionDivider },
};

export default spaceTheme;
