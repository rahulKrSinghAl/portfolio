import { Box, useTheme, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { keyframes } from '@mui/system';

const MotionBox = motion.create(Box);

const ropeSwing = keyframes`
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(2deg); }
`;

const sections = [
  { id: 'hero', label: 'Cover' },
  { id: 'about', label: 'Ch. I' },
  { id: 'experience', label: 'Ch. II' },
  { id: 'skills', label: 'Ch. III' },
  { id: 'projects', label: 'Ch. IV' },
  { id: 'themes', label: 'Ch. V' },
  { id: 'contact', label: 'Ch. VI' },
];

export default function VintageSectionIndicator() {
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollDirection, setScrollDirection] = useState('down');
  const { glow, typography } = theme.custom;
  const isDark = theme.palette.mode === 'dark';
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollDirection(currentY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentY;

      const scrollPosition = currentY + window.innerHeight / 2;
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

  // Compass needle rotation based on scroll direction
  const needleRotation = scrollDirection === 'down' ? 180 : 0;

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
      {/* Mini compass at top */}
      <Box sx={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        border: '1px solid',
        borderColor: glow.primaryGlow(0.3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 1,
        position: 'relative',
      }}>
        {/* Compass needle */}
        <Box sx={{
          width: 2,
          height: 12,
          position: 'relative',
          transform: `rotate(${needleRotation}deg)`,
          transition: 'transform 0.5s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50%',
            bgcolor: secondaryColor,
            opacity: 0.8,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '50%',
            bgcolor: primaryColor,
            opacity: 0.5,
          },
        }} />
      </Box>

      {/* Frayed top end */}
      <Box sx={{
        width: 3,
        height: 8,
        background: `linear-gradient(180deg, transparent, ${glow.primaryGlow(0.15)})`,
      }} />

      {/* Vertical rope */}
      <Box sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Rope line behind knots */}
        <Box sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 0,
          bottom: 0,
          width: 2,
          bgcolor: glow.primaryGlow(0.12),
          backgroundImage: `repeating-linear-gradient(180deg, ${glow.primaryGlow(0.15)} 0px, ${glow.primaryGlow(0.15)} 4px, ${glow.primaryGlow(0.08)} 4px, ${glow.primaryGlow(0.08)} 8px)`,
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
                transition: 'all 0.3s ease',
              }}
              onClick={() => scrollToSection(section.id)}
            >
              {/* Hanging tag label (active only) */}
              {isActive && (
                <MotionBox
                  layoutId="vintageTag"
                  sx={{
                    px: 1,
                    py: 0.3,
                    bgcolor: isDark ? 'rgba(44, 31, 14, 0.9)' : 'rgba(245, 230, 200, 0.95)',
                    border: '1px solid',
                    borderColor: glow.primaryGlow(0.3),
                    borderRadius: '2px',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    animation: `${ropeSwing} 3s ease-in-out infinite`,
                    transformOrigin: 'top center',
                    position: 'relative',
                    // String attaching tag to rope
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: -4,
                      right: -6,
                      width: 6,
                      height: 4,
                      borderTop: `1px solid ${glow.primaryGlow(0.2)}`,
                    },
                  }}
                >
                  <Typography sx={{
                    fontFamily: typography.fonts.label,
                    fontSize: '0.5rem',
                    color: 'primary.main',
                    letterSpacing: '0.08em',
                  }}>
                    {section.label}
                  </Typography>
                </MotionBox>
              )}

              {/* Sailor knot dot */}
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
                    borderColor: isActive ? primaryColor : glow.primaryGlow(0.2),
                    bgcolor: isActive ? glow.primaryGlow(0.15) : 'transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: primaryColor,
                      transform: 'scale(1.3)',
                    },
                  }}
                />
                {isActive && (
                  <MotionBox
                    layoutId="vintageKnot"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      bgcolor: primaryColor,
                    }}
                  />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Frayed bottom end */}
      <Box sx={{
        width: 3,
        height: 12,
        background: `linear-gradient(180deg, ${glow.primaryGlow(0.15)}, transparent)`,
        mt: 0,
      }} />
    </Box>
  );
}
