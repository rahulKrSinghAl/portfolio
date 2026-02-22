import { useState, useEffect, useCallback } from 'react';
import { AppBar, Toolbar, Box, IconButton, Slide, Container, Button, Stack, useMediaQuery, useTheme, Menu, MenuItem, ListItemText } from '@mui/material';
import { Brightness4, Brightness7, Palette } from '@mui/icons-material';
import { getHeaderStyles } from './header.styles';
import { Logo } from '../../shared';
import { useAestheticTheme } from '../../../context/AestheticThemeContext';
import { themeList } from '../../../themes';

function HideOnScroll({ children }) {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setShow(true);
      } else if (currentScrollY < lastScrollY) {
        setShow(true);
      } else if (currentScrollY > lastScrollY) {
        setShow(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <Slide appear={false} direction="down" in={show}>
      {children}
    </Slide>
  );
}

export default function Header({ darkMode, toggleTheme }) {
  const theme = useTheme();
  const styles = getHeaderStyles(theme);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { themeId, setThemeId } = useAestheticTheme();
  const [themeMenuAnchor, setThemeMenuAnchor] = useState(null);

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

  const sections = [
    { id: 'about', label: 'About', jp: '私について' },
    { id: 'experience', label: 'Experience', jp: '経験' },
    { id: 'skills', label: 'Skills', jp: 'スキル' },
    { id: 'projects', label: 'Projects', jp: 'プロジェクト' },
    { id: 'themes', label: 'Themes', jp: 'テーマ' },
    { id: 'contact', label: 'Contact', jp: '連絡先' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <HideOnScroll>
      <AppBar position="fixed" elevation={0} sx={styles.appBar}>
        <Container maxWidth="xl">
          <Toolbar sx={styles.toolbar}>
            {/* Logo */}
            <Box
              sx={styles.logoContainer}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Logo size={40} showGlow={false} />
              <Box sx={styles.logoTextContainer}>
                <Box sx={styles.logoText}>
                  Rahul Singh
                </Box>
                <Box sx={styles.logoSubtext}>
                  開発者
                </Box>
              </Box>
            </Box>

            {/* Navigation Links */}
            {!isMobile && (
              <Stack direction="row" spacing={0.5}>
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    sx={styles.navButton}
                  >
                    <Box component="span" sx={{ mr: 0.5 }}>
                      {section.label}
                    </Box>
                    <Box component="span" sx={styles.navButtonJp}>
                      {section.jp}
                    </Box>
                  </Button>
                ))}
              </Stack>
            )}

            {/* Theme Controls */}
            <Stack direction="row" spacing={1}>
              {/* Aesthetic theme selector */}
              <IconButton
                onClick={handleThemeMenuOpen}
                color="inherit"
                sx={styles.themeToggle}
                aria-label="Select aesthetic theme"
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
                          ? 'rgba(18, 18, 18, 0.95)'
                          : 'rgba(255, 255, 255, 0.95)',
                      border: (theme) => `1px solid ${theme.palette.divider}`,
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
                        backgroundColor: 'action.hover',
                        color: 'text.secondary',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'action.selected',
                        '&:hover': {
                          backgroundColor: 'action.hover',
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
                color="inherit"
                sx={styles.themeToggle}
                aria-label="Toggle light/dark theme"
              >
                {darkMode ? <Brightness7 fontSize="small" /> : <Brightness4 fontSize="small" />}
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}
