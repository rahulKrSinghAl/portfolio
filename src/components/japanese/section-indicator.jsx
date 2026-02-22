import { Box, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export default function SectionIndicator() {
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Hero' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'themes', label: 'Themes' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <Box
      sx={{
        position: 'fixed',
        right: 40,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {sections.map((section) => (
        <Box
          key={section.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 2,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onClick={() => scrollToSection(section.id)}
        >
          {/* Label */}
          <Box
            sx={{
              opacity: activeSection === section.id ? 1 : 0,
              transform: activeSection === section.id ? 'translateX(0)' : 'translateX(10px)',
              transition: 'all 0.3s ease',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'primary.main',
              bgcolor: 'background.paper',
              px: 1.5,
              py: 0.5,
              borderRadius: 0,
              border: '1px solid',
              borderColor: 'primary.main',
              pointerEvents: 'none',
            }}
          >
            {section.label}
          </Box>

          {/* Dot */}
          <Box
            sx={{
              position: 'relative',
              width: 12,
              height: 12,
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                border: '2px solid',
                borderColor: activeSection === section.id ? 'primary.main' : 'divider',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  transform: 'scale(1.3)',
                },
              }}
            />
            {activeSection === section.id && (
              <MotionBox
                layoutId="activeDot"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 6,
                  height: 6,
                  bgcolor: 'primary.main',
                  boxShadow: `0 0 10px ${theme.custom.glow.primaryGlow(0.8)}`,
                }}
              />
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
