import colors from './colors';
import typography from './typography';
import { spacing, glassEffect, animations } from './tokens';
import { Background, DecorativeElements, SectionDivider } from './components';

const cyberpunkTheme = {
  id: 'cyberpunk',
  name: 'Cyberpunk Neon',
  description: 'A dark-city, holographic-UI, neon-lit aesthetic — glitch effects, scanlines, and electric glow.',
  icon: '⚡',

  colors,
  typographyConfig: typography,
  tokens: { spacing, glassEffect, animations },

  content: {
    nav: [
      { id: 'about', label: 'About', sub: 'NRL-01' },
      { id: 'experience', label: 'Experience', sub: 'RNT-02' },
      { id: 'skills', label: 'Skills', sub: 'STK-03' },
      { id: 'projects', label: 'Projects', sub: 'DPL-04' },
      { id: 'themes', label: 'Themes', sub: 'CFG-05' },
      { id: 'contact', label: 'Contact', sub: 'UPL-06' },
    ],
    hero: {
      superTitle: 'SYSTEM://ONLINE',
      subtitle: 'FRONTEND ARCHITECT // REACT SPECIALIST',
      typingSequences: [
        '> Compiling scalable React systems...', 2000,
        '> Deploying production interfaces...', 2000,
        '> Optimizing runtime performance...', 2000,
        '> Leading frontend operations...', 2000,
      ],
      ctaPrimary: 'Initialize Uplink',
      ctaSecondary: 'Access Runtime Log',
    },
    about: {
      label: 'Neural Link',
      heading: 'PROFILE_DATA',
      headingSub: 'Identity Matrix',
      experiencePrimary: 'YRS',
      experienceSub: 'Runtime',
    },
    experience: {
      heading: 'RUNTIME_LOG',
      headingSub: 'Execution History',
    },
    skills: {
      heading: 'TECH_STACK',
      headingSub: 'Loaded Modules',
      frontendTitle: 'Core Modules',
      languagesTitle: 'Language Runtimes',
      spokenTitle: 'Protocol Interfaces',
    },
    projects: {
      heading: 'DEPLOYMENTS',
      headingSub: 'Active Instances',
    },
    contact: {
      heading: 'UPLINK',
      headingSub: 'Connection Ports',
      title: 'Open Channel',
      educationTitle: 'Certification Data',
      achievementsTitle: 'Achievement Unlocked',
    },
    logo: {
      text: 'RS',
      subtext: 'v4.0',
    },
  },

  palette(mode) {
    return {
      mode,
      primary: {
        main: mode === 'dark' ? colors.neonPink.main : colors.neonPink.dark,
        light: colors.neonPink.light,
        dark: colors.neonPink.deepDark,
      },
      secondary: {
        main: mode === 'dark' ? colors.electricCyan.main : colors.electricCyan.dark,
        light: colors.electricCyan.light,
        dark: colors.electricCyan.deepDark,
      },
      background: {
        default: mode === 'dark' ? colors.deepBlack.base : colors.softDark.base,
        paper: mode === 'dark' ? colors.deepBlack.card : colors.softDark.card,
      },
      text: {
        primary: mode === 'dark' ? colors.chrome.darkPrimary : colors.chrome.lightPrimary,
        secondary: mode === 'dark' ? colors.chrome.darkSecondary : colors.chrome.lightSecondary,
      },
      divider: mode === 'dark' ? 'rgba(0, 240, 255, 0.08)' : 'rgba(176, 38, 255, 0.08)',
      glass: mode === 'dark' ? glassEffect.dark : glassEffect.light,
      gradient: {
        primary: `linear-gradient(135deg, ${colors.neonPink.main} 0%, ${colors.neonPurple.main} 50%, ${colors.electricCyan.main} 100%)`,
        secondary: `linear-gradient(90deg, ${colors.neonPink.main}, ${colors.electricCyan.main})`,
      },
    };
  },

  glowColors(mode) {
    const primary = mode === 'dark' ? colors.neonPink.main : colors.neonPink.dark;
    const secondary = mode === 'dark' ? colors.electricCyan.main : colors.electricCyan.dark;
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
              ? 'rgba(255, 45, 107, 0.2) #0A0A0F'
              : 'rgba(176, 38, 255, 0.2) #F0F0F5',
          },
          body: {
            overflowX: 'hidden',
          },
          '*::-webkit-scrollbar': {
            width: '8px',
          },
          '*::-webkit-scrollbar-track': {
            background: mode === 'dark' ? '#0A0A0F' : '#F0F0F5',
          },
          '*::-webkit-scrollbar-thumb': {
            background: mode === 'dark' ? 'rgba(255, 45, 107, 0.25)' : 'rgba(176, 38, 255, 0.2)',
            borderRadius: '4px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: mode === 'dark' ? 'rgba(255, 45, 107, 0.4)' : 'rgba(176, 38, 255, 0.4)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'uppercase',
            fontWeight: typography.weights.semiBold,
            fontSize: '0.85rem',
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
            borderRadius: '4px',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: typography.weights.medium,
            fontFamily: typography.fonts.label,
            borderRadius: '2px',
            letterSpacing: typography.spacing.normal,
          },
        },
      },
    };
  },

  decorativeComponents: { Background, DecorativeElements, SectionDivider },
};

export default cyberpunkTheme;
