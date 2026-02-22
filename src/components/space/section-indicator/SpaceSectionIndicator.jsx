import { Box, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { keyframes } from '@mui/system';

const MotionBox = motion.create(Box);

const beaconPulse = keyframes`
  0%, 100% { box-shadow: 0 0 4px currentColor; }
  50% { box-shadow: 0 0 12px currentColor, 0 0 20px currentColor; }
`;

export default function SpaceSectionIndicator() {
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'HRO' },
    { id: 'about', label: 'DSR' },
    { id: 'experience', label: 'FLT' },
    { id: 'skills', label: 'SYS' },
    { id: 'projects', label: 'LCH' },
    { id: 'themes', label: 'CFG' },
    { id: 'contact', label: 'COM' },
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 32,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      {/* Vertical connector line */}
      <Box
        sx={{
          position: 'absolute',
          right: 5,
          top: 6,
          bottom: 6,
          width: '1px',
          background: `linear-gradient(180deg, transparent, ${theme.custom.glow.primaryGlow(0.15)}, transparent)`,
          zIndex: -1,
        }}
      />

      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <Box
            key={section.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 1.5,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={() => scrollToSection(section.id)}
          >
            {/* Code label */}
            <Box
              sx={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(10px)',
                transition: 'all 0.3s ease',
                fontSize: '0.6rem',
                fontWeight: 600,
                fontFamily: theme.custom.typography.fonts.mono,
                color: 'primary.main',
                bgcolor: theme.custom.glow.primaryGlow(0.1),
                px: 1,
                py: 0.3,
                borderRadius: '3px',
                border: '1px solid',
                borderColor: theme.custom.glow.primaryGlow(0.3),
                letterSpacing: '0.1em',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {section.label}
            </Box>

            {/* Beacon dot */}
            <Box
              sx={{
                position: 'relative',
                width: 10,
                height: 10,
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '1.5px solid',
                  borderColor: isActive ? 'primary.main' : theme.custom.glow.primaryGlow(0.2),
                  transition: 'all 0.3s ease',
                  bgcolor: isActive ? 'transparent' : 'transparent',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'scale(1.3)',
                  },
                }}
              />
              {isActive && (
                <MotionBox
                  layoutId="spaceActiveDot"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'primary.main',
                    animation: `${beaconPulse} 2s ease-in-out infinite`,
                  }}
                />
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
