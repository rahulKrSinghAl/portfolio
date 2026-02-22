import { Box, useTheme, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { keyframes } from '@mui/system';

const MotionBox = motion.create(Box);

const electricCurrent = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 20px; }
`;

const neonDotPulse = keyframes`
  0%, 100% { box-shadow: 0 0 4px currentColor; }
  50% { box-shadow: 0 0 10px currentColor, 0 0 4px currentColor; }
`;

const sections = [
  { id: 'hero', label: 'INIT' },
  { id: 'about', label: 'NRL-01' },
  { id: 'experience', label: 'RNT-02' },
  { id: 'skills', label: 'STK-03' },
  { id: 'projects', label: 'DPL-04' },
  { id: 'themes', label: 'CFG-05' },
  { id: 'contact', label: 'UPL-06' },
];

export default function CyberpunkSectionIndicator() {
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState('hero');
  const { glow, typography } = theme.custom;
  const isDark = theme.palette.mode === 'dark';
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

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

    window.addEventListener('scroll', handleScroll, { passive: true });
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
        right: 28,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
      }}
    >
      {/* Wire connector top */}
      <Box sx={{
        width: 1,
        height: 12,
        background: `linear-gradient(180deg, transparent, ${glow.secondaryGlow(0.2)})`,
      }} />

      {/* Vertical LED strip */}
      <Box sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Wire line behind dots */}
        <Box sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 0,
          bottom: 0,
          width: 1,
          bgcolor: glow.secondaryGlow(0.1),
          backgroundImage: `repeating-linear-gradient(180deg, ${secondaryColor}20 0px, ${secondaryColor}20 3px, transparent 3px, transparent 6px)`,
          animation: `${electricCurrent} 1s linear infinite`,
          zIndex: 0,
        }} />

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
                py: 1,
                position: 'relative',
                zIndex: 1,
                transition: 'all 0.15s ease',
              }}
              onClick={() => scrollToSection(section.id)}
            >
              {/* Glowing label tooltip (active only) */}
              {isActive && (
                <MotionBox
                  layoutId="cyberpunkLabel"
                  sx={{
                    px: 1,
                    py: 0.3,
                    bgcolor: isDark ? 'rgba(10, 10, 15, 0.95)' : 'rgba(240, 240, 245, 0.95)',
                    border: '1px solid',
                    borderColor: glow.primaryGlow(0.3),
                    borderRadius: '2px',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    boxShadow: `0 0 8px ${glow.primaryGlow(0.15)}`,
                  }}
                >
                  <Typography sx={{
                    fontFamily: typography.fonts.label,
                    fontSize: '0.5rem',
                    color: 'primary.main',
                    letterSpacing: '0.08em',
                    textShadow: `0 0 4px ${glow.primaryGlow(0.3)}`,
                  }}>
                    {section.label}
                  </Typography>
                </MotionBox>
              )}

              {/* Neon dot indicator */}
              <Box sx={{
                position: 'relative',
                width: 12,
                height: 12,
              }}>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '1.5px solid',
                    borderColor: isActive ? primaryColor : glow.primaryGlow(0.15),
                    bgcolor: isActive ? glow.primaryGlow(0.2) : 'transparent',
                    transition: 'all 0.15s ease',
                    color: primaryColor,
                    animation: isActive ? `${neonDotPulse} 2s ease-in-out infinite` : 'none',
                    '&:hover': {
                      borderColor: primaryColor,
                      transform: 'scale(1.3)',
                      boxShadow: `0 0 8px ${glow.primaryGlow(0.3)}`,
                    },
                  }}
                />
                {isActive && (
                  <MotionBox
                    layoutId="cyberpunkDot"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      bgcolor: primaryColor,
                      boxShadow: `0 0 6px ${primaryColor}`,
                    }}
                  />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Wire connector bottom */}
      <Box sx={{
        width: 1,
        height: 16,
        background: `linear-gradient(180deg, ${glow.secondaryGlow(0.2)}, transparent)`,
      }} />
    </Box>
  );
}
