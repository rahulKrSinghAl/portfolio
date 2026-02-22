import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, IconButton, Slide, Container, Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { getHeaderStyles } from './header.styles';

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
              <Box
                component="img"
                src="/logo-badge.svg"
                alt="RKS Logo"
                sx={styles.logoImage}
              />
              <Box sx={styles.logoTextContainer}>
                <Box sx={styles.logoText}>
                  RKS
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

            {/* Theme Toggle */}
            <IconButton
              onClick={toggleTheme}
              color="inherit"
              sx={styles.themeToggle}
            >
              {darkMode ? <Brightness7 fontSize="small" /> : <Brightness4 fontSize="small" />}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}
