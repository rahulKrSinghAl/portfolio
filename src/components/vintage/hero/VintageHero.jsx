import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { personalInfo } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { Logo } from '../../shared';

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

const quillWrite = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;

const sealStamp = keyframes`
  0% { transform: scale(1.4) rotate(-15deg); opacity: 0; }
  60% { transform: scale(0.95) rotate(2deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
`;

const ribbonDangle = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(6px) rotate(1deg); }
`;

// Compass Rose SVG for left page
function CompassRose({ color, size = 140 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* Outer rings */}
      <circle cx="60" cy="60" r="55" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="60" cy="60" r="52" stroke={color} strokeWidth="0.3" opacity="0.3" />
      <circle cx="60" cy="60" r="42" stroke={color} strokeWidth="0.7" opacity="0.4" />
      <circle cx="60" cy="60" r="28" stroke={color} strokeWidth="0.5" opacity="0.35" />
      <circle cx="60" cy="60" r="8" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <circle cx="60" cy="60" r="3" fill={color} opacity="0.5" />
      {/* Cross lines */}
      <line x1="60" y1="5" x2="60" y2="115" stroke={color} strokeWidth="0.6" opacity="0.4" />
      <line x1="5" y1="60" x2="115" y2="60" stroke={color} strokeWidth="0.6" opacity="0.4" />
      <line x1="20" y1="20" x2="100" y2="100" stroke={color} strokeWidth="0.4" opacity="0.25" />
      <line x1="100" y1="20" x2="20" y2="100" stroke={color} strokeWidth="0.4" opacity="0.25" />
      {/* North pointer (prominent) */}
      <polygon points="60,6 66,50 60,38 54,50" fill={color} opacity="0.7" />
      {/* South pointer */}
      <polygon points="60,114 54,70 60,82 66,70" fill={color} opacity="0.35" />
      {/* East/West pointers */}
      <polygon points="114,60 70,54 82,60 70,66" fill={color} opacity="0.3" />
      <polygon points="6,60 50,66 38,60 50,54" fill={color} opacity="0.3" />
      {/* Degree tick marks around outer ring */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1={60 + 52 * Math.cos((deg * Math.PI) / 180)}
          y1={60 + 52 * Math.sin((deg * Math.PI) / 180)}
          x2={60 + 55 * Math.cos((deg * Math.PI) / 180)}
          y2={60 + 55 * Math.sin((deg * Math.PI) / 180)}
          stroke={color}
          strokeWidth="0.8"
          opacity="0.5"
        />
      ))}
      {/* Cardinal labels */}
      <text x="60" y="16" textAnchor="middle" fontSize="9" fill={color} fontFamily="serif" fontWeight="bold" opacity="0.8">N</text>
      <text x="60" y="112" textAnchor="middle" fontSize="9" fill={color} fontFamily="serif" opacity="0.6">S</text>
      <text x="10" y="63" textAnchor="middle" fontSize="9" fill={color} fontFamily="serif" opacity="0.6">W</text>
      <text x="110" y="63" textAnchor="middle" fontSize="9" fill={color} fontFamily="serif" opacity="0.6">E</text>
    </svg>
  );
}

export default function VintageHero() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);

  const { glow, typography, animations, spacing } = theme.custom;
  const isDark = theme.palette.mode === 'dark';
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
        delayChildren: prefersReducedMotion ? 0 : 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: animations.easing.smooth,
      },
    },
  };

  // Book open animation
  const bookVariants = {
    hidden: { rotateY: prefersReducedMotion ? 0 : -15, opacity: 0 },
    visible: {
      rotateY: 0,
      opacity: 1,
      transition: { duration: prefersReducedMotion ? 0 : 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: spacing.xl, md: spacing.xxl },
      }}
    >
      <Container maxWidth="lg">
        <MotionBox style={{ y, opacity }}>
          {/* Open journal spread */}
          <MotionBox
            variants={bookVariants}
            initial="hidden"
            animate="visible"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              border: '1px solid',
              borderColor: glow.primaryGlow(0.15),
              borderRadius: '2px',
              overflow: 'hidden',
              bgcolor: isDark ? 'rgba(44, 31, 14, 0.5)' : 'rgba(250, 246, 238, 0.7)',
              backdropFilter: 'blur(8px)',
              boxShadow: isDark
                ? '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(196,163,90,0.1)'
                : '0 20px 60px rgba(92,68,9,0.15), inset 0 1px 0 rgba(255,255,255,0.5)',
              position: 'relative',
              perspective: '1000px',
            }}
          >
            {/* Center spine binding */}
            <Box sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '4px',
              transform: 'translateX(-50%)',
              background: `linear-gradient(180deg, ${glow.primaryGlow(0.2)}, ${glow.primaryGlow(0.05)}, ${glow.primaryGlow(0.2)})`,
              zIndex: 2,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: -8,
                right: -8,
                bottom: 0,
                backgroundImage: `repeating-linear-gradient(180deg, transparent 0px, transparent 12px, ${glow.primaryGlow(0.08)} 12px, ${glow.primaryGlow(0.08)} 13px)`,
              },
            }} />

            {/* LEFT PAGE — Map + Compass + Coordinates */}
            <MotionBox
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              sx={{
                flex: 1,
                p: { xs: 3, md: 5 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: { xs: '250px', md: '450px' },
              }}
            >
              {/* Ruled lines background */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.06,
                backgroundImage: `repeating-linear-gradient(180deg, transparent 0px, transparent 28px, ${primaryColor} 28px, ${primaryColor} 29px)`,
                pointerEvents: 'none',
              }} />

              {/* Margin line */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: { xs: 32, md: 50 },
                bottom: 0,
                width: '1px',
                bgcolor: secondaryColor,
                opacity: 0.12,
              }} />

              <MotionBox variants={itemVariants}>
                <CompassRose color={primaryColor} size={140} />
              </MotionBox>

              <MotionTypography
                variants={itemVariants}
                sx={{
                  fontFamily: typography.fonts.label,
                  fontSize: '0.65rem',
                  color: 'text.secondary',
                  letterSpacing: typography.spacing.extraLoose,
                  mt: 2,
                  textAlign: 'center',
                }}
              >
                27.1751° N, 78.0421° E
              </MotionTypography>

              <MotionTypography
                variants={itemVariants}
                sx={{
                  fontFamily: typography.fonts.label,
                  fontSize: '0.55rem',
                  color: 'text.secondary',
                  letterSpacing: typography.spacing.loose,
                  mt: 1,
                  opacity: 0.6,
                }}
              >
                {personalInfo.location}
              </MotionTypography>
            </MotionBox>

            {/* RIGHT PAGE — Name + Wax Seal + Typing + CTAs */}
            <MotionBox
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              sx={{
                flex: 1,
                p: { xs: 3, md: 5 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                minHeight: { xs: 'auto', md: '450px' },
              }}
            >
              {/* FIELD JOURNAL label */}
              <MotionTypography
                variants={itemVariants}
                sx={{
                  fontFamily: typography.fonts.label,
                  fontSize: { xs: '0.65rem', md: '0.75rem' },
                  color: 'primary.main',
                  letterSpacing: typography.spacing.superLoose,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  '&::before': {
                    content: '"—"',
                    color: 'secondary.main',
                  },
                }}
              >
                FIELD JOURNAL
              </MotionTypography>

              {/* Name */}
              <MotionTypography
                variants={itemVariants}
                variant="h1"
                sx={{
                  fontFamily: typography.fonts.primary,
                  fontWeight: typography.weights.bold,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem' },
                  color: 'text.primary',
                  lineHeight: 1.1,
                  letterSpacing: typography.spacing.tight,
                  mb: 1,
                }}
              >
                {personalInfo.name}
              </MotionTypography>

              {/* Title with quill writing effect */}
              <MotionBox variants={itemVariants} sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontFamily: typography.fonts.secondary,
                    fontSize: { xs: '0.85rem', md: '1rem' },
                    color: 'text.secondary',
                    letterSpacing: typography.spacing.relaxed,
                    fontStyle: 'italic',
                  }}
                >
                  {personalInfo.title}
                </Typography>
              </MotionBox>

              {/* Typing animation — quill writing */}
              <MotionBox
                variants={itemVariants}
                sx={{
                  mb: 4,
                  minHeight: 36,
                  borderBottom: '1px solid',
                  borderColor: glow.primaryGlow(0.1),
                  pb: 1,
                }}
              >
                <TypeAnimation
                  sequence={[
                    'Charting Scalable React Territories', 2000,
                    'Leading Frontend Expeditions', 2000,
                    'Mapping Production-Grade Interfaces', 2000,
                    'Discovering High-Performance Patterns', 2000,
                  ]}
                  wrapper="span"
                  speed={40}
                  repeat={Infinity}
                  style={{
                    fontFamily: typography.fonts.secondary,
                    fontSize: '1.05rem',
                    color: theme.palette.primary.main,
                    fontStyle: 'italic',
                  }}
                />
              </MotionBox>

              {/* CTAs */}
              <MotionBox variants={itemVariants}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      const el = document.getElementById('contact');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    sx={{
                      bgcolor: 'secondary.main',
                      color: '#FAF6EE',
                      fontFamily: typography.fonts.secondary,
                      fontWeight: typography.weights.semiBold,
                      letterSpacing: typography.spacing.relaxed,
                      px: 4,
                      py: 1.2,
                      borderRadius: '2px',
                      '&:hover': {
                        bgcolor: 'secondary.dark',
                        boxShadow: `0 4px 16px ${glow.secondaryGlow(0.3)}`,
                      },
                    }}
                  >
                    Send Dispatch
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const el = document.getElementById('experience');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    sx={{
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      fontFamily: typography.fonts.secondary,
                      fontWeight: typography.weights.semiBold,
                      letterSpacing: typography.spacing.relaxed,
                      px: 4,
                      py: 1.2,
                      borderRadius: '2px',
                      '&:hover': {
                        bgcolor: glow.primaryGlow(0.08),
                        borderColor: 'primary.light',
                      },
                    }}
                  >
                    View Expeditions
                  </Button>
                </Stack>
              </MotionBox>

              {/* Logo badge */}
              <Box sx={{
                position: 'absolute',
                bottom: { xs: 'auto', md: 40 },
                right: { xs: 16, md: 40 },
                top: { xs: 16, md: 'auto' },
                animation: prefersReducedMotion ? 'none' : `${sealStamp} 0.8s ease-out 1.5s both`,
              }}>
                <Logo size={64} showGlow />
              </Box>
            </MotionBox>
          </MotionBox>

          {/* Dangling ribbon scroll indicator */}
          <MotionBox
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 4,
              animation: prefersReducedMotion ? 'none' : `${ribbonDangle} 3s ease-in-out infinite`,
            }}
          >
            <Box sx={{
              width: 2,
              height: 24,
              bgcolor: 'secondary.main',
              opacity: 0.4,
            }} />
            <KeyboardArrowDown sx={{
              color: 'secondary.main',
              opacity: 0.5,
              fontSize: 20,
            }} />
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}
