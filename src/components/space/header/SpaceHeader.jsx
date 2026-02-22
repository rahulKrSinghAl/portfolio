import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Stack,
  Container,
  IconButton,
  Slide,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Brightness4, Brightness7, Palette } from '@mui/icons-material';

import { Logo } from '../../shared';
import { personalInfo } from '../../../data';
import { useAestheticTheme } from '../../../context/AestheticThemeContext';
import { themeList } from '../../../themes';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const NAV_SECTIONS = [
  { id: 'about', label: 'About', code: 'DSIR-001' },
  { id: 'experience', label: 'Experience', code: 'FLGT-LOG' },
  { id: 'skills', label: 'Skills', code: 'SYS-CAP' },
  { id: 'projects', label: 'Projects', code: 'LNCH-BAY' },
  { id: 'themes', label: 'Themes', code: 'CFG-VIS' },
  { id: 'contact', label: 'Contact', code: 'TX-HUB' },
];

const SCROLL_THRESHOLD = 10;
const HEADER_OFFSET = 100;

// ---------------------------------------------------------------------------
// Hide-on-scroll wrapper
// ---------------------------------------------------------------------------

function HideOnScroll({ children }) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < SCROLL_THRESHOLD) {
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        setVisible(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Slide appear={false} direction="down" in={visible}>
      {children}
    </Slide>
  );
}

// ---------------------------------------------------------------------------
// Styles factory
// ---------------------------------------------------------------------------

function useSpaceHeaderStyles(theme, scrollProgress) {
  const isDark = theme.palette.mode === 'dark';
  const { glow, typography, animations, glassEffect } = theme.custom;

  // Dynamic blur & opacity keyed to scroll depth
  const blurBase = 24;
  const blurExtra = Math.min(scrollProgress * 16, 16);
  const bgOpacity = isDark
    ? 0.7 + Math.min(scrollProgress * 0.2, 0.2)
    : 0.75 + Math.min(scrollProgress * 0.15, 0.15);

  const bgColor = isDark
    ? `rgba(3, 7, 18, ${bgOpacity})`
    : `rgba(255, 255, 255, ${bgOpacity})`;

  const borderColor = isDark
    ? glow.primaryGlow(0.1)
    : theme.palette.divider;

  return useMemo(
    () => ({
      appBar: {
        backgroundColor: bgColor,
        backdropFilter: `blur(${blurBase + blurExtra}px) saturate(150%)`,
        WebkitBackdropFilter: `blur(${blurBase + blurExtra}px) saturate(150%)`,
        borderBottom: `1px solid ${borderColor}`,
        boxShadow: 'none',
        transition: `background-color ${animations.duration.normal}s ${animations.easing.default},
                     backdrop-filter ${animations.duration.normal}s ${animations.easing.default}`,
      },

      toolbar: {
        justifyContent: 'space-between',
        py: 1,
        minHeight: { xs: 56, md: 64 },
      },

      logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        cursor: 'pointer',
        transition: `transform ${animations.duration.normal}s ${animations.easing.default}`,
        '&:hover': {
          transform: 'scale(1.04)',
        },
      },

      logoImage: {
        width: 40,
        height: 40,
        filter: isDark
          ? `drop-shadow(0 0 8px ${glow.primaryGlow(0.3)})`
          : 'none',
        transition: `filter ${animations.duration.normal}s ${animations.easing.default}`,
      },

      logoTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      },

      logoText: {
        fontWeight: typography.weights.bold,
        fontFamily: typography.fonts.primary,
        fontSize: '1.1rem',
        background: theme.palette.gradient.primary,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: typography.spacing.extraLoose,
        lineHeight: 1.1,
      },

      logoSubtext: {
        fontFamily: typography.fonts.mono,
        color: 'text.secondary',
        fontSize: '0.6rem',
        opacity: 0.55,
        letterSpacing: '0.2em',
        lineHeight: 1,
      },

      navButton: {
        color: 'text.secondary',
        fontFamily: typography.fonts.primary,
        fontWeight: typography.weights.medium,
        textTransform: 'none',
        fontSize: '0.85rem',
        px: 1.8,
        py: 0.8,
        borderRadius: '4px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        lineHeight: 1.2,
        transition: `color ${animations.duration.fast}s ${animations.easing.default}`,
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 2,
          left: '20%',
          width: '60%',
          height: '1px',
          background: isDark
            ? glow.primaryGlow(0.7)
            : theme.palette.primary.main,
          transform: 'scaleX(0)',
          transformOrigin: 'center',
          transition: `transform ${animations.duration.normal}s ${animations.easing.default},
                       box-shadow ${animations.duration.normal}s ${animations.easing.default}`,
          boxShadow: 'none',
        },
        '&:hover': {
          color: 'primary.main',
          bgcolor: 'transparent',
          '&::after': {
            transform: 'scaleX(1)',
            boxShadow: isDark
              ? `0 0 8px ${glow.primaryGlow(0.4)}`
              : 'none',
          },
        },
      },

      navButtonActive: {
        color: 'primary.main',
      },

      navCode: {
        fontFamily: typography.fonts.mono,
        fontSize: '0.55rem',
        opacity: 0.4,
        letterSpacing: '0.08em',
        lineHeight: 1,
        mt: '1px',
      },

      themeToggle: {
        color: 'text.secondary',
        border: '1px solid',
        borderColor: isDark
          ? glow.primaryGlow(0.15)
          : theme.palette.divider,
        borderRadius: '4px',
        width: 38,
        height: 38,
        transition: `all ${animations.duration.normal}s ${animations.easing.default}`,
        '&:hover': {
          borderColor: 'primary.main',
          color: 'primary.main',
          backgroundColor: isDark
            ? glow.primaryGlow(0.06)
            : theme.palette.action.hover,
          boxShadow: isDark
            ? `0 0 12px ${glow.primaryGlow(0.2)}, inset 0 0 8px ${glow.primaryGlow(0.05)}`
            : `0 0 8px ${theme.palette.action.selected}`,
        },
      },
    }),
    [
      theme.palette.mode,
      bgColor,
      blurBase,
      blurExtra,
      borderColor,
      animations,
      typography,
      glow,
      isDark,
      theme.palette.gradient.primary,
      theme.palette.primary.main,
    ],
  );
}

// ---------------------------------------------------------------------------
// useActiveSection hook
// ---------------------------------------------------------------------------

function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${HEADER_OFFSET}px 0px -40% 0px`,
        threshold: [0, 0.25, 0.5, 0.75],
      },
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [sectionIds]);

  return activeSection;
}

// ---------------------------------------------------------------------------
// useScrollProgress hook (0 to 1 over first 300px)
// ---------------------------------------------------------------------------

function useScrollProgress(maxScroll = 300) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setProgress(Math.min(window.scrollY / maxScroll, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [maxScroll]);

  return progress;
}

// ---------------------------------------------------------------------------
// SpaceHeader component
// ---------------------------------------------------------------------------

export default function SpaceHeader({ darkMode, toggleTheme }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { themeId, setThemeId } = useAestheticTheme();
  const [themeMenuAnchor, setThemeMenuAnchor] = useState(null);

  const scrollProgress = useScrollProgress();
  const sectionIds = useMemo(() => NAV_SECTIONS.map((s) => s.id), []);
  const activeSection = useActiveSection(sectionIds);

  const styles = useSpaceHeaderStyles(theme, scrollProgress);

  const handleThemeMenuOpen = useCallback((event) => {
    setThemeMenuAnchor(event.currentTarget);
  }, []);

  const handleThemeMenuClose = useCallback(() => {
    setThemeMenuAnchor(null);
  }, []);

  const handleThemeSelect = useCallback((id) => {
    setThemeId(id);
    setThemeMenuAnchor(null);
  }, [setThemeId]);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const top =
        element.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <HideOnScroll>
      <AppBar position="fixed" elevation={0} sx={styles.appBar}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={styles.toolbar}>
            {/* ---- Logo ---- */}
            <Box sx={styles.logoContainer} onClick={scrollToTop}>
              <Logo size={40} showGlow={false} />
              <Box sx={styles.logoText}>{personalInfo.name}</Box>
            </Box>

            {/* ---- Navigation ---- */}
            {!isMobile && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                {NAV_SECTIONS.map((section) => {
                  const isActive = activeSection === section.id;

                  return (
                    <Button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      disableRipple
                      sx={{
                        ...styles.navButton,
                        ...(isActive ? styles.navButtonActive : {}),
                      }}
                    >
                      {section.label}
                      <Box component="span" sx={styles.navCode}>
                        {section.code}
                      </Box>
                    </Button>
                  );
                })}
              </Stack>
            )}

            {/* ---- Theme controls ---- */}
            <Stack direction="row" spacing={1}>
              {/* Aesthetic theme selector */}
              <IconButton
                onClick={handleThemeMenuOpen}
                aria-label="Select aesthetic theme"
                sx={styles.themeToggle}
              >
                <Palette fontSize="small" />
              </IconButton>

              {/* Theme dropdown menu */}
              <Menu
                anchorEl={themeMenuAnchor}
                open={Boolean(themeMenuAnchor)}
                onClose={handleThemeMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1,
                      minWidth: 140,
                      backdropFilter: 'blur(20px)',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(3, 7, 18, 0.9)'
                          : 'rgba(255, 255, 255, 0.9)',
                      border: (theme) => `1px solid ${theme.custom.glow.primaryGlow(0.15)}`,
                    },
                  },
                }}
              >
                {themeList.map((t) => (
                  <MenuItem
                    key={t.id}
                    onClick={() => handleThemeSelect(t.id)}
                    selected={t.id === themeId}
                    sx={{
                      py: 0.8,
                      px: 2,
                      fontSize: '0.875rem',
                      fontFamily: t.typographyConfig.fonts.primary,
                      fontWeight: t.id === themeId ? t.typographyConfig.weights.semiBold : t.typographyConfig.weights.regular,
                      color: t.id === themeId ? 'text.primary' : 'text.disabled',
                      '&:hover': {
                        backgroundColor: (theme) => theme.custom.glow.primaryGlow(0.08),
                        color: 'text.secondary',
                      },
                      '&.Mui-selected': {
                        backgroundColor: (theme) => theme.custom.glow.primaryGlow(0.1),
                        '&:hover': {
                          backgroundColor: (theme) => theme.custom.glow.primaryGlow(0.12),
                        },
                      },
                    }}
                  >
                    {t.name}
                  </MenuItem>
                ))}
              </Menu>

              {/* Dark/Light mode toggle */}
              <IconButton
                onClick={toggleTheme}
                aria-label="Toggle light/dark theme"
                sx={styles.themeToggle}
              >
                {darkMode ? (
                  <Brightness7 fontSize="small" />
                ) : (
                  <Brightness4 fontSize="small" />
                )}
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}
