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
import { keyframes } from '@mui/system';
import { personalInfo } from '../../../data';
import { useAestheticTheme } from '../../../context/AestheticThemeContext';
import { themeList } from '../../../themes';
import { Logo } from '../../shared';

const MotionBox = motion.create(Box);

const SCROLL_THRESHOLD = 10;

const NAV_SECTIONS = [
  { id: 'about', label: 'About', sub: 'NRL-01' },
  { id: 'experience', label: 'Experience', sub: 'RNT-02' },
  { id: 'skills', label: 'Skills', sub: 'STK-03' },
  { id: 'projects', label: 'Projects', sub: 'DPL-04' },
  { id: 'themes', label: 'Themes', sub: 'CFG-05' },
  { id: 'contact', label: 'Contact', sub: 'UPL-06' },
];

const neonFlicker = keyframes`
  0%, 100% { opacity: 1; }
  5% { opacity: 0.4; }
  10% { opacity: 1; }
  15% { opacity: 0.7; }
  20%, 80% { opacity: 1; }
  85% { opacity: 0.5; }
  90% { opacity: 1; }
`;

const glitchText = keyframes`
  0%, 90%, 100% { transform: translate(0); }
  92% { transform: translate(-2px, 1px); }
  94% { transform: translate(2px, -1px); }
  96% { transform: translate(-1px, -1px); }
  98% { transform: translate(1px, 1px); }
`;

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

export default function CyberpunkHeader({ darkMode, toggleTheme }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { themeId, setThemeId } = useAestheticTheme();
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeMenuAnchor, setThemeMenuAnchor] = useState(null);
  const { glow, typography } = theme.custom;
  const isDark = theme.palette.mode === 'dark';

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
    ? `rgba(10, 10, 15, ${bgOpacity})`
    : `rgba(240, 240, 245, ${bgOpacity})`;

  const controlButtonSx = {
    color: 'primary.main',
    border: '1px solid',
    borderColor: glow.primaryGlow(0.2),
    borderRadius: '2px',
    width: 36,
    height: 36,
    transition: 'all 0.15s ease',
    '&:hover': {
      borderColor: 'primary.main',
      bgcolor: glow.primaryGlow(0.1),
      boxShadow: `0 0 12px ${glow.primaryGlow(0.3)}`,
    },
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          elevation={0}
          sx={{
            bgcolor: bgColor,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid',
            borderColor: glow.primaryGlow(scrolled ? 0.15 : 0.06),
            transition: 'all 0.3s ease',
            boxShadow: scrolled
              ? isDark
                ? `0 4px 24px rgba(0,0,0,0.5), 0 1px 0 ${glow.primaryGlow(0.1)}`
                : `0 4px 24px rgba(26,26,46,0.08)`
              : 'none',
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
                  transition: 'transform 0.15s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    '& .glitch-name': {
                      animation: `${glitchText} 0.4s ease-in-out`,
                    },
                  },
                }}
              >
                <Logo size={40} showGlow />

                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Typography
                    className="glitch-name"
                    sx={{
                      fontFamily: typography.fonts.primary,
                      fontWeight: typography.weights.bold,
                      fontSize: '0.85rem',
                      background: theme.palette.gradient?.primary || 'inherit',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: typography.spacing.relaxed,
                      lineHeight: 1.2,
                    }}
                  >
                    {personalInfo.name}
                  </Typography>
                  <Typography sx={{
                    fontFamily: typography.fonts.label,
                    fontSize: '0.5rem',
                    color: 'secondary.main',
                    letterSpacing: typography.spacing.superLoose,
                    opacity: 0.7,
                  }}>
                    SYSTEM://ONLINE
                  </Typography>
                </Box>
              </Box>

              {/* Center: Desktop nav — neon tube underline */}
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
                          flexDirection: 'column',
                          alignItems: 'center',
                          px: 1.5,
                          py: 0.8,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          '&:hover': {
                            bgcolor: glow.primaryGlow(0.06),
                            '& .nav-label': {
                              color: 'primary.main',
                              textShadow: `0 0 8px ${glow.primaryGlow(0.4)}`,
                            },
                          },
                        }}
                      >
                        {/* Neon tube underline active indicator */}
                        {isActive && (
                          <MotionBox
                            layoutId="cyberpunkNeonLine"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: '10%',
                              right: '10%',
                              height: 2,
                              bgcolor: 'primary.main',
                              boxShadow: `0 0 8px ${glow.primaryGlow(0.6)}, 0 0 16px ${glow.primaryGlow(0.3)}`,
                              borderRadius: '1px',
                              animation: `${neonFlicker} 4s ease-in-out infinite`,
                            }}
                          />
                        )}

                        {/* Sub code */}
                        <Typography sx={{
                          fontFamily: typography.fonts.label,
                          fontSize: '0.45rem',
                          color: isActive ? 'secondary.main' : 'text.secondary',
                          transition: 'color 0.15s ease',
                          letterSpacing: typography.spacing.loose,
                          opacity: isActive ? 0.8 : 0.5,
                        }}>
                          {section.sub}
                        </Typography>

                        {/* Label */}
                        <Typography
                          className="nav-label"
                          sx={{
                            fontFamily: typography.fonts.secondary,
                            fontSize: '0.78rem',
                            color: isActive ? 'primary.main' : 'text.primary',
                            fontWeight: isActive ? typography.weights.semiBold : typography.weights.regular,
                            letterSpacing: typography.spacing.normal,
                            transition: 'all 0.15s ease',
                            textShadow: isActive ? `0 0 8px ${glow.primaryGlow(0.3)}` : 'none',
                          }}
                        >
                          {section.label}
                        </Typography>
                      </Box>
                    );
                  })}
                </Stack>
              )}

              {/* Right: Controls */}
              <Stack direction="row" spacing={1} alignItems="center">
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
                          ? 'rgba(10, 10, 15, 0.95)'
                          : 'rgba(240, 240, 245, 0.95)',
                        border: `1px solid ${glow.primaryGlow(0.15)}`,
                        borderRadius: '4px',
                        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 1px ${glow.primaryGlow(0.2)}`,
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
                        boxShadow: `0 0 4px ${glow.primaryGlow(0.3)}`,
                        transition: 'all 0.15s ease',
                      }} />
                    ))}
                  </Box>
                )}
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      <Toolbar sx={{ minHeight: { xs: 56, md: 64 } }} />

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            bgcolor: isDark ? '#0A0A0F' : '#F0F0F5',
            borderLeft: '1px solid',
            borderColor: glow.primaryGlow(0.15),
            boxShadow: `inset 1px 0 0 ${glow.primaryGlow(0.1)}`,
          },
        }}
      >
        <Box sx={{
          pt: 3, pb: 2, px: 2, textAlign: 'center',
          borderBottom: '1px solid', borderColor: glow.primaryGlow(0.1),
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
            <Logo size={36} showGlow />
          </Box>
          <Typography sx={{
            fontFamily: typography.fonts.primary,
            fontWeight: typography.weights.bold,
            fontSize: '1rem',
            background: theme.palette.gradient?.primary,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {personalInfo.name}
          </Typography>
          <Typography sx={{
            fontFamily: typography.fonts.label,
            fontSize: '0.55rem',
            color: 'secondary.main',
            letterSpacing: typography.spacing.loose,
            mt: 0.5,
            opacity: 0.7,
          }}>
            SYSTEM://ONLINE
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
                    position: 'absolute', left: 0, top: 0, bottom: 0, width: 2,
                    bgcolor: 'primary.main',
                    boxShadow: `0 0 6px ${glow.primaryGlow(0.5)}`,
                  }} />
                )}
                <Typography sx={{
                  fontFamily: typography.fonts.label,
                  fontSize: '0.6rem',
                  color: isActive ? 'secondary.main' : 'text.secondary',
                  minWidth: 40,
                  letterSpacing: typography.spacing.normal,
                }}>
                  {section.sub}
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
