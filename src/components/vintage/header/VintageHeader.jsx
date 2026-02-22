import { useState, useEffect, useCallback, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Typography,
  Drawer,
  Slide,
  Container,
  Stack,
  Menu,
  MenuItem,
} from '@mui/material';
import { Brightness4, Brightness7, Palette } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { personalInfo } from '../../../data';
import { useAestheticTheme } from '../../../context/AestheticThemeContext';
import { themeList } from '../../../themes';
import { Logo } from '../../shared';

const MotionBox = motion.create(Box);

const SCROLL_THRESHOLD = 10;

const NAV_SECTIONS = [
  { id: 'about', label: 'Chronicle', numeral: 'I' },
  { id: 'experience', label: 'Expeditions', numeral: 'II' },
  { id: 'skills', label: 'Cartography', numeral: 'III' },
  { id: 'projects', label: 'Discoveries', numeral: 'IV' },
  { id: 'themes', label: 'Aesthetics', numeral: 'V' },
  { id: 'contact', label: 'Dispatch', numeral: 'VI' },
];

// Hide-on-scroll wrapper
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

export default function VintageHeader({ darkMode, toggleTheme }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { themeId, setThemeId } = useAestheticTheme();
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeMenuAnchor, setThemeMenuAnchor] = useState(null);
  const { glow, typography, animations } = theme.custom;
  const isDark = theme.palette.mode === 'dark';

  // Track active section + scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(NAV_SECTIONS[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_SECTIONS[i].id);
          return;
        }
      }
      setActiveSection('');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setMobileOpen(false);
  }, []);

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

  const bgOpacity = scrolled ? (isDark ? 0.92 : 0.92) : (isDark ? 0.8 : 0.8);
  const bgColor = isDark
    ? `rgba(26, 18, 9, ${bgOpacity})`
    : `rgba(245, 230, 200, ${bgOpacity})`;

  const controlButtonSx = {
    color: 'primary.main',
    border: '1px solid',
    borderColor: glow.primaryGlow(0.15),
    borderRadius: '2px',
    width: 36,
    height: 36,
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: 'primary.main',
      bgcolor: glow.primaryGlow(0.08),
    },
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          elevation={0}
          sx={{
            bgcolor: bgColor,
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderBottom: '2px solid',
            borderColor: glow.primaryGlow(scrolled ? 0.15 : 0.08),
            transition: 'all 0.4s ease',
            boxShadow: scrolled
              ? isDark
                ? '0 4px 20px rgba(0,0,0,0.4)'
                : '0 4px 20px rgba(92,68,9,0.08)'
              : 'none',
            // Stitching line along bottom
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 4,
              left: 24,
              right: 24,
              height: '1px',
              backgroundImage: `repeating-linear-gradient(90deg, ${glow.primaryGlow(0.2)} 0px, ${glow.primaryGlow(0.2)} 4px, transparent 4px, transparent 10px)`,
            },
          }}
        >
          <Container maxWidth="lg">
            <Toolbar
              disableGutters
              sx={{
                minHeight: { xs: 56, md: 64 },
                justifyContent: 'space-between',
              }}
            >
              {/* Left: Logo + Name */}
              <Box
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <Logo size={40} showGlow={false} />

                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Typography sx={{
                    fontFamily: typography.fonts.primary,
                    fontWeight: typography.weights.bold,
                    fontSize: '0.95rem',
                    background: theme.palette.gradient?.primary || 'inherit',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: typography.spacing.normal,
                    lineHeight: 1.2,
                  }}>
                    {personalInfo.name}
                  </Typography>
                  <Typography sx={{
                    fontFamily: typography.fonts.label,
                    fontSize: '0.5rem',
                    color: 'text.secondary',
                    letterSpacing: typography.spacing.superLoose,
                  }}>
                    FIELD JOURNAL
                  </Typography>
                </Box>
              </Box>

              {/* Center: Desktop nav — Roman numeral chapters */}
              {!isMobile && (
                <Stack direction="row" spacing={0.5} alignItems="center">
                  {NAV_SECTIONS.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <Box
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        sx={{
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.8,
                          px: 1.5,
                          py: 0.8,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: glow.primaryGlow(0.06),
                          },
                        }}
                      >
                        {/* Ribbon bookmark active marker (bottom) */}
                        {isActive && (
                          <MotionBox
                            layoutId="vintageRibbon"
                            sx={{
                              position: 'absolute',
                              bottom: -2,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: 20,
                              height: 3,
                              bgcolor: 'secondary.main',
                              borderRadius: '2px 2px 0 0',
                            }}
                          />
                        )}

                        {/* Roman numeral */}
                        <Typography sx={{
                          fontFamily: typography.fonts.label,
                          fontSize: '0.55rem',
                          color: isActive ? 'secondary.main' : 'text.secondary',
                          transition: 'color 0.3s ease',
                          fontWeight: isActive ? typography.weights.bold : typography.weights.regular,
                        }}>
                          {section.numeral}
                        </Typography>

                        {/* Label */}
                        <Typography sx={{
                          fontFamily: typography.fonts.secondary,
                          fontSize: '0.8rem',
                          color: isActive ? 'primary.main' : 'text.primary',
                          fontWeight: isActive ? typography.weights.semiBold : typography.weights.regular,
                          letterSpacing: typography.spacing.normal,
                          transition: 'color 0.3s ease',
                        }}>
                          {section.label}
                        </Typography>
                      </Box>
                    );
                  })}
                </Stack>
              )}

              {/* Right: Theme switcher dropdown + Dark/Light toggle + Mobile menu */}
              <Stack direction="row" spacing={1} alignItems="center">
                {/* Theme switcher (Palette icon + dropdown) */}
                <IconButton
                  onClick={handleThemeMenuOpen}
                  aria-label="Select aesthetic theme"
                  sx={controlButtonSx}
                >
                  <Palette fontSize="small" />
                </IconButton>

                <Menu
                  anchorEl={themeMenuAnchor}
                  open={Boolean(themeMenuAnchor)}
                  onClose={handleThemeMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  slotProps={{
                    paper: {
                      sx: {
                        mt: 1,
                        minWidth: 160,
                        backdropFilter: 'blur(20px)',
                        backgroundColor: isDark
                          ? 'rgba(26, 18, 9, 0.95)'
                          : 'rgba(250, 246, 238, 0.95)',
                        border: `1px solid ${glow.primaryGlow(0.15)}`,
                        borderRadius: '2px',
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
                        py: 1,
                        px: 2,
                        fontSize: '0.875rem',
                        fontFamily: typography.fonts.secondary,
                        fontWeight: t.id === themeId ? typography.weights.semiBold : typography.weights.regular,
                        color: t.id === themeId ? 'primary.main' : 'text.secondary',
                        '&:hover': {
                          backgroundColor: glow.primaryGlow(0.08),
                          color: 'text.primary',
                        },
                        '&.Mui-selected': {
                          backgroundColor: glow.primaryGlow(0.1),
                          '&:hover': {
                            backgroundColor: glow.primaryGlow(0.12),
                          },
                        },
                      }}
                    >
                      <Box component="span" sx={{ mr: 1 }}>{t.icon}</Box>
                      {t.name}
                    </MenuItem>
                  ))}
                </Menu>

                {/* Dark/Light mode toggle */}
                <IconButton
                  onClick={toggleTheme}
                  aria-label="Toggle light/dark theme"
                  sx={controlButtonSx}
                >
                  {darkMode ? (
                    <Brightness7 fontSize="small" />
                  ) : (
                    <Brightness4 fontSize="small" />
                  )}
                </IconButton>

                {/* Mobile hamburger */}
                {isMobile && (
                  <Box
                    onClick={() => setMobileOpen(true)}
                    sx={{
                      width: 28,
                      height: 28,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      ml: 0.5,
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <Box key={i} sx={{
                        width: i === 1 ? 18 : 14,
                        height: 2,
                        bgcolor: 'primary.main',
                        borderRadius: 1,
                        transition: 'all 0.3s ease',
                      }} />
                    ))}
                  </Box>
                )}
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Toolbar spacer */}
      <Toolbar sx={{ minHeight: { xs: 56, md: 64 } }} />

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            bgcolor: isDark ? '#1A1209' : '#F5E6C8',
            borderLeft: '2px solid',
            borderColor: glow.primaryGlow(0.15),
          },
        }}
      >
        <Box sx={{
          pt: 3, pb: 2, px: 2, textAlign: 'center',
          borderBottom: '1px solid', borderColor: glow.primaryGlow(0.1),
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
            <Logo size={36} showGlow={false} />
          </Box>
          <Typography sx={{
            fontFamily: typography.fonts.primary,
            fontWeight: typography.weights.bold,
            fontSize: '1.1rem',
            color: 'primary.main',
          }}>
            {personalInfo.name}
          </Typography>
          <Typography sx={{
            fontFamily: typography.fonts.label,
            fontSize: '0.6rem',
            color: 'text.secondary',
            letterSpacing: typography.spacing.loose,
            mt: 0.5,
          }}>
            FIELD JOURNAL
          </Typography>
        </Box>

        <Box sx={{ flex: 1, py: 2 }}>
          {NAV_SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <Box
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  px: 2.5,
                  py: 1.5,
                  cursor: 'pointer',
                  position: 'relative',
                  bgcolor: isActive ? glow.primaryGlow(0.08) : 'transparent',
                  '&:hover': { bgcolor: glow.primaryGlow(0.05) },
                }}
              >
                {isActive && (
                  <Box sx={{
                    position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                    bgcolor: 'secondary.main',
                  }} />
                )}
                <Typography sx={{
                  fontFamily: typography.fonts.label,
                  fontSize: '0.7rem',
                  color: isActive ? 'secondary.main' : 'text.secondary',
                  minWidth: 28,
                }}>
                  {section.numeral}
                </Typography>
                <Typography sx={{
                  fontFamily: typography.fonts.secondary,
                  fontSize: '0.9rem',
                  color: isActive ? 'primary.main' : 'text.primary',
                  fontWeight: isActive ? typography.weights.semiBold : typography.weights.regular,
                }}>
                  {section.label}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Box sx={{
          p: 2, borderTop: '1px solid', borderColor: glow.primaryGlow(0.1),
          display: 'flex', justifyContent: 'center', gap: 1,
        }}>
          <IconButton onClick={handleThemeMenuOpen} sx={{ color: 'primary.main' }}>
            <Palette />
          </IconButton>
          <IconButton onClick={toggleTheme} sx={{ color: 'primary.main' }}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Drawer>
    </>
  );
}
