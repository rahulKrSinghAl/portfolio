import { Box, Container, Typography, Button, Stack, IconButton, Chip } from '@mui/material';
import { Email, LinkedIn, Phone, KeyboardArrowDown } from '@mui/icons-material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Tilt from 'react-parallax-tilt';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { personalInfo } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { Logo } from '../../shared';

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);
const MotionStack = motion.create(Stack);

/* ------------------------------------------------------------------ */
/*  Keyframe animations                                                */
/* ------------------------------------------------------------------ */

const pulseGlow = keyframes`
  0%, 100% { opacity: 1; box-shadow: 0 0 4px #22c55e; }
  50%      { opacity: 0.4; box-shadow: 0 0 8px #22c55e, 0 0 16px #22c55e; }
`;

const bounceDown = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(10px); }
`;

const energyLine = keyframes`
  0%   { left: -100%; }
  100% { left: 100%; }
`;

const orbitalSpin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SpaceHero() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const mono = theme.custom.typography.fonts.mono;
  const glow = theme.custom.glow;
  const animations = theme.custom.animations;
  const spacing = theme.custom.spacing;
  const glassEffect = theme.custom.glassEffect;

  /* ---- Framer variants ---- */

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.18,
        delayChildren: prefersReducedMotion ? 0 : 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.9,
        ease: animations.easing.smooth,
      },
    },
  };

  /* ---- Shared style helpers ---- */

  const hudBracketBase = {
    content: '""',
    position: 'absolute',
    width: { xs: '24px', md: '40px' },
    height: { xs: '24px', md: '40px' },
    borderColor: glow.primaryGlow(0.15),
    pointerEvents: 'none',
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
        pt: spacing.xxl,
      }}
    >
      {/* ============================================================ */}
      {/*  HUD Corner Brackets                                         */}
      {/* ============================================================ */}
      {/* Top-left */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 16, md: 32 },
          left: { xs: 16, md: 32 },
          ...hudBracketBase,
          '&::before': {
            ...hudBracketBase,
            top: 0,
            left: 0,
            borderTop: '2px solid',
            borderLeft: '2px solid',
            borderColor: 'inherit',
          },
        }}
      />
      {/* Top-right */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 16, md: 32 },
          right: { xs: 16, md: 32 },
          ...hudBracketBase,
          '&::before': {
            ...hudBracketBase,
            top: 0,
            right: 0,
            borderTop: '2px solid',
            borderRight: '2px solid',
            borderColor: 'inherit',
          },
        }}
      />
      {/* Bottom-left */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 16, md: 32 },
          left: { xs: 16, md: 32 },
          ...hudBracketBase,
          '&::before': {
            ...hudBracketBase,
            bottom: 0,
            left: 0,
            borderBottom: '2px solid',
            borderLeft: '2px solid',
            borderColor: 'inherit',
          },
        }}
      />
      {/* Bottom-right */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 16, md: 32 },
          right: { xs: 16, md: 32 },
          ...hudBracketBase,
          '&::before': {
            ...hudBracketBase,
            bottom: 0,
            right: 0,
            borderBottom: '2px solid',
            borderRight: '2px solid',
            borderColor: 'inherit',
          },
        }}
      />

      {/* ============================================================ */}
      {/*  Orbital decorative rings                                     */}
      {/* ============================================================ */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: { xs: '500px', md: '750px' },
          height: { xs: '500px', md: '750px' },
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {/* Outer ring */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            border: `1px solid ${glow.primaryGlow(0.06)}`,
            borderRadius: '50%',
            animation: prefersReducedMotion ? 'none' : `${orbitalSpin} 90s linear infinite`,
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '50%',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: glow.primaryGlow(0.3),
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 12px ${glow.primaryGlow(0.4)}`,
            },
          }}
        />
        {/* Inner ring */}
        <Box
          sx={{
            position: 'absolute',
            inset: '15%',
            border: `1px solid ${glow.secondaryGlow(0.05)}`,
            borderRadius: '50%',
            animation: prefersReducedMotion ? 'none' : `${orbitalSpin} 60s linear infinite reverse`,
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: glow.secondaryGlow(0.35),
              transform: 'translate(-50%, 50%)',
              boxShadow: `0 0 10px ${glow.secondaryGlow(0.4)}`,
            },
          }}
        />
      </Box>

      {/* ============================================================ */}
      {/*  Parallax wrapper                                             */}
      {/* ============================================================ */}
      <MotionBox
        style={{
          y: prefersReducedMotion ? 0 : y,
          opacity: prefersReducedMotion ? 1 : opacity,
        }}
        sx={{ width: '100%', position: 'relative', zIndex: 1 }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', overflow: 'hidden' }}>
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            sx={{ maxWidth: '960px', mx: 'auto', textAlign: 'center' }}
          >
            {/* ---- Logo ---- */}
            <MotionBox
              variants={itemVariants}
              sx={{
                mb: spacing.lg,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Logo size={{ xs: 120, sm: 160, md: 200 }} showGlow={true} />
            </MotionBox>

            {/* ---- Subtitle ---- */}
            <MotionTypography
              variant="body2"
              variants={itemVariants}
              sx={{
                fontFamily: mono,
                color: 'primary.main',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' },
                fontWeight: theme.custom.typography.weights.medium,
                mb: spacing.sm,
              }}
            >
              FRONTEND SYSTEMS ARCHITECT // REACT SPECIALIST
            </MotionTypography>

            {/* ---- Name ---- */}
            <MotionBox variants={itemVariants}>
              <Typography
                variant="h1"
                sx={{
                  pb: spacing.sm,
                  fontSize: { xs: '2.5rem', sm: '4rem', md: '5.5rem' },
                  fontWeight: theme.custom.typography.weights.extraBold,
                  fontFamily: theme.typography.h1.fontFamily,
                  background: theme.palette.gradient.primary,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                  letterSpacing: theme.custom.typography.spacing.loose,
                  textShadow: `0 0 80px ${glow.primaryGlow(0.3)}`,
                }}
              >
                {personalInfo.name}
              </Typography>
            </MotionBox>

            {/* ---- Mission Status Badge ---- */}
            <MotionBox variants={itemVariants} sx={{ mb: spacing.md }}>
              <Chip
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: '#22c55e',
                        animation: prefersReducedMotion
                          ? 'none'
                          : `${pulseGlow} 2s ease-in-out infinite`,
                      }}
                    />
                    <Typography
                      component="span"
                      sx={{
                        fontFamily: mono,
                        fontSize: '0.7rem',
                        letterSpacing: '0.12em',
                        fontWeight: theme.custom.typography.weights.semiBold,
                        color: 'text.primary',
                      }}
                    >
                      STATUS: ACTIVE
                    </Typography>
                  </Stack>
                }
                variant="outlined"
                sx={{
                  borderRadius: '9999px',
                  borderColor: glow.primaryGlow(0.2),
                  bgcolor: glow.primaryGlow(0.04),
                  height: 32,
                  px: 1,
                  backdropFilter: glassEffect.blur,
                }}
              />
            </MotionBox>

            {/* ---- Type Animation ---- */}
            <MotionBox variants={itemVariants}>
              <Box
                sx={{
                  minHeight: { xs: '60px', md: '72px' },
                  mb: spacing.xl,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: mono,
                    color: 'text.secondary',
                    fontWeight: theme.custom.typography.weights.regular,
                    fontSize: { xs: '0.95rem', sm: '1.15rem', md: '1.35rem' },
                    letterSpacing: '0.03em',
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      color: theme.palette.primary.main,
                      mr: 1,
                      fontWeight: theme.custom.typography.weights.bold,
                    }}
                  >
                    &gt;
                  </Box>
                  <TypeAnimation
                    sequence={[
                      'Architecting Scalable React Systems',
                      2000,
                      'Leading Frontend Mission Teams',
                      2000,
                      'Designing Production-Grade UI',
                      2000,
                      'Deploying High-Performance Solutions',
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    cursor
                  />
                </Typography>
              </Box>
            </MotionBox>

            {/* ---- CTA Buttons ---- */}
            <MotionStack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              variants={itemVariants}
              sx={{
                mb: spacing.xl,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Primary CTA */}
              <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.04}>
                <Button
                  variant="contained"
                  size="large"
                  href="#contact"
                  sx={{
                    px: spacing.xl,
                    py: 1.5,
                    fontSize: '0.95rem',
                    fontFamily: mono,
                    fontWeight: theme.custom.typography.weights.semiBold,
                    letterSpacing: '0.1em',
                    borderRadius: '4px',
                    background: theme.palette.gradient.primary,
                    boxShadow: `0 8px 32px ${glow.primaryGlow(0.35)}`,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                      transition: 'none',
                    },
                    '&:hover::before': {
                      animation: `${energyLine} ${animations.duration.slow}s ease forwards`,
                    },
                    '&:hover': {
                      boxShadow: `0 12px 48px ${glow.primaryGlow(0.55)}`,
                    },
                  }}
                >
                  INITIATE CONTACT
                </Button>
              </Tilt>

              {/* Secondary CTA */}
              <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.04}>
                <Button
                  variant="outlined"
                  size="large"
                  href="#experience"
                  sx={{
                    px: spacing.xl,
                    py: 1.5,
                    fontSize: '0.95rem',
                    fontFamily: mono,
                    fontWeight: theme.custom.typography.weights.semiBold,
                    letterSpacing: '0.1em',
                    borderRadius: '4px',
                    borderWidth: 2,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    backdropFilter: glassEffect.blur,
                    transition: `box-shadow ${animations.duration.normal}s ${animations.easing.default}`,
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: 'primary.light',
                      boxShadow: `0 0 24px ${glow.primaryGlow(0.25)}, inset 0 0 24px ${glow.primaryGlow(0.06)}`,
                    },
                  }}
                >
                  VIEW TRANSMISSION LOG
                </Button>
              </Tilt>
            </MotionStack>

            {/* ---- Social Icons ---- */}
            <MotionStack
              direction="row"
              spacing={2}
              variants={itemVariants}
              sx={{ justifyContent: 'center', mb: spacing.lg }}
            >
              {[
                { icon: <Email />, href: `mailto:${personalInfo.email}`, label: 'Email' },
                {
                  icon: <LinkedIn />,
                  href: personalInfo.linkedin,
                  target: '_blank',
                  label: 'LinkedIn',
                },
                { icon: <Phone />, href: `tel:${personalInfo.phone}`, label: 'Phone' },
              ].map((item) => (
                <Tilt key={item.label} tiltMaxAngleX={12} tiltMaxAngleY={12} scale={1.1}>
                  <IconButton
                    href={item.href}
                    target={item.target}
                    aria-label={item.label}
                    sx={{
                      color: 'text.secondary',
                      border: '1px solid',
                      borderColor: glow.primaryGlow(0.15),
                      borderRadius: '4px',
                      backdropFilter: glassEffect.blur,
                      transition: `box-shadow ${animations.duration.normal}s ${animations.easing.default}, color ${animations.duration.normal}s ${animations.easing.default}`,
                      '&:hover': {
                        color: 'primary.main',
                        boxShadow: `0 0 20px ${glow.primaryGlow(0.3)}, 0 0 40px ${glow.primaryGlow(0.1)}`,
                      },
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Tilt>
              ))}
            </MotionStack>
          </MotionBox>
        </Container>
      </MotionBox>

      {/* ============================================================ */}
      {/*  Scroll indicator                                             */}
      {/* ============================================================ */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 24, md: 40 },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: mono,
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            color: 'text.secondary',
            opacity: 0.5,
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </Typography>
        <KeyboardArrowDown
          sx={{
            fontSize: '1.5rem',
            color: 'primary.main',
            opacity: 0.6,
            animation: prefersReducedMotion ? 'none' : `${bounceDown} 2s ease-in-out infinite`,
          }}
        />
      </Box>
    </Box>
  );
}
