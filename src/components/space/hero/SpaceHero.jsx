import { Box, Container, Typography, Button, Stack, IconButton, Chip } from '@mui/material';
import { Email, LinkedIn, Phone } from '@mui/icons-material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { personalInfo } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { Logo } from '../../shared';

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

/* ------------------------------------------------------------------ */
/*  Keyframe animations                                                */
/* ------------------------------------------------------------------ */

const pulseGlow = keyframes`
  0%, 100% { opacity: 1; box-shadow: 0 0 4px #22c55e; }
  50%      { opacity: 0.4; box-shadow: 0 0 8px #22c55e, 0 0 16px #22c55e; }
`;

const gaugeArcDash = keyframes`
  0%   { stroke-dashoffset: 600; }
  100% { stroke-dashoffset: 200; }
`;

const reticleRotate = keyframes`
  0%   { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;

/* ------------------------------------------------------------------ */
/*  SVG Decorative Components                                          */
/* ------------------------------------------------------------------ */

function ReticleOverlay({ color, reducedMotion }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Crosshair lines */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${color} 20%, ${color} 80%, transparent)`,
          opacity: 0.08,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '1px',
          background: `linear-gradient(180deg, transparent, ${color} 20%, ${color} 80%, transparent)`,
          opacity: 0.08,
        }}
      />
      {/* Rotating reticle ring */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: { xs: 280, sm: 400, md: 520 },
          height: { xs: 280, sm: 400, md: 520 },
          transform: 'translate(-50%, -50%)',
          animation: reducedMotion ? 'none' : `${reticleRotate} 60s linear infinite`,
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 520 520" fill="none">
          <circle cx="260" cy="260" r="250" stroke={color} strokeWidth="0.5" opacity="0.12" strokeDasharray="8 12" />
          <circle cx="260" cy="260" r="200" stroke={color} strokeWidth="0.3" opacity="0.08" strokeDasharray="4 16" />
        </svg>
      </Box>
    </Box>
  );
}

function GaugeArc({ color, reducedMotion }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: 300, sm: 420, md: 560 },
        height: { xs: 150, sm: 210, md: 280 },
        pointerEvents: 'none',
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 560 280" fill="none" style={{ overflow: 'visible' }}>
        <path
          d="M 30 270 A 250 250 0 0 1 530 270"
          stroke={color}
          strokeWidth="2"
          fill="none"
          opacity="0.15"
          strokeDasharray="600"
          strokeDashoffset="600"
          style={{
            animation: reducedMotion ? 'none' : `${gaugeArcDash} 2s ease-out forwards`,
            animationDelay: '0.8s',
          }}
        />
        {/* Tick marks along arc */}
        {[0, 30, 60, 90, 120, 150, 180].map((angle) => {
          const rad = ((angle) * Math.PI) / 180;
          const cx = 280 - 250 * Math.cos(rad);
          const cy = 270 - 250 * Math.sin(rad);
          return (
            <circle key={angle} cx={cx} cy={cy} r="2" fill={color} opacity="0.2" />
          );
        })}
      </svg>
    </Box>
  );
}

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
  const isDark = theme.palette.mode === 'dark';

  /* ---- Framer variants ---- */

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: animations.easing.smooth,
      },
    },
  };

  return (
    <Box
      component="section"
      sx={{
        height: '100vh',
        minHeight: 600,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* SVG Reticle overlay behind everything */}
      <ReticleOverlay color={theme.palette.primary.main} reducedMotion={prefersReducedMotion} />

      {/* Parallax wrapper */}
      <MotionBox
        style={{
          y: prefersReducedMotion ? 0 : y,
          opacity: prefersReducedMotion ? 1 : opacity,
        }}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            py: { xs: 3, md: 4 },
            pt: { xs: 10, md: 12 },
          }}
        >
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* ============================================================ */}
            {/*  TOP STATUS STRIP                                            */}
            {/* ============================================================ */}
            <MotionBox
              variants={itemVariants}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              {/* Left: Logo + orbital ring */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Logo size={{ xs: 48, sm: 56, md: 64 }} showGlow={true} />
                  {/* Orbital ring around logo */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: -8,
                      borderRadius: '50%',
                      border: `1px solid ${glow.primaryGlow(0.12)}`,
                      animation: prefersReducedMotion
                        ? 'none'
                        : `${reticleRotate} 20s linear infinite`,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: -2,
                        left: '50%',
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        opacity: 0.6,
                      },
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontFamily: mono,
                    fontSize: { xs: '0.55rem', md: '0.65rem' },
                    color: 'text.secondary',
                    letterSpacing: '0.15em',
                    opacity: 0.5,
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  SYS.PORTFOLIO // v4.0
                </Typography>
              </Stack>

              {/* Right: Status chip + coordinate readout */}
              <Stack alignItems="flex-end" spacing={0.5}>
                <Chip
                  label={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
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
                          fontSize: '0.6rem',
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
                  size="small"
                  sx={{
                    borderRadius: '4px',
                    borderColor: glow.primaryGlow(0.15),
                    bgcolor: glow.primaryGlow(0.04),
                    height: 26,
                    backdropFilter: glassEffect.blur,
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: mono,
                    fontSize: '0.55rem',
                    color: 'text.secondary',
                    letterSpacing: '0.1em',
                    opacity: 0.4,
                  }}
                >
                  27.1767° N, 78.0081° E
                </Typography>
              </Stack>
            </MotionBox>

            {/* ============================================================ */}
            {/*  CENTER VIEWPORT — Name as primary readout                   */}
            {/* ============================================================ */}
            <MotionBox
              variants={itemVariants}
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                textAlign: 'center',
                my: { xs: 2, md: 0 },
              }}
            >
              {/* Gauge arc behind name */}
              <GaugeArc color={theme.palette.primary.main} reducedMotion={prefersReducedMotion} />

              {/* Subtitle above name */}
              <MotionTypography
                variant="body2"
                variants={itemVariants}
                sx={{
                  fontFamily: mono,
                  color: 'primary.main',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' },
                  fontWeight: theme.custom.typography.weights.medium,
                  mb: 1.5,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                FRONTEND SYSTEMS ARCHITECT // REACT SPECIALIST
              </MotionTypography>

              {/* Name — massive gradient */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.8rem', sm: '4.5rem', md: '6rem' },
                  fontWeight: theme.custom.typography.weights.extraBold,
                  fontFamily: theme.typography.h1.fontFamily,
                  background: theme.palette.gradient.primary,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.05,
                  letterSpacing: theme.custom.typography.spacing.loose,
                  textShadow: `0 0 80px ${glow.primaryGlow(0.3)}`,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {personalInfo.name}
              </Typography>

              {/* HUD telemetry decorative text below name */}
              <Stack
                direction="row"
                spacing={3}
                sx={{
                  mt: 2,
                  opacity: 0.3,
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                {['SIGNAL: STRONG', 'UPTIME: 99.9%', `LAT: 27.18°N`].map((txt) => (
                  <Typography
                    key={txt}
                    sx={{
                      fontFamily: mono,
                      fontSize: '0.55rem',
                      color: 'text.secondary',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {txt}
                  </Typography>
                ))}
              </Stack>
            </MotionBox>

            {/* ============================================================ */}
            {/*  BOTTOM INSTRUMENT STRIP — 3 zones                          */}
            {/* ============================================================ */}
            <MotionBox
              variants={itemVariants}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'center', md: 'flex-end' },
                justifyContent: 'space-between',
                gap: { xs: 3, md: 0 },
                pb: { xs: 2, md: 3 },
                borderTop: `1px solid ${glow.primaryGlow(0.08)}`,
                pt: { xs: 2, md: 3 },
              }}
            >
              {/* Left zone: Social icons (vertical column) */}
              <Stack
                direction={{ xs: 'row', md: 'column' }}
                spacing={1.5}
                sx={{ order: { xs: 3, md: 1 } }}
              >
                {[
                  { icon: <Email sx={{ fontSize: 18 }} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
                  { icon: <LinkedIn sx={{ fontSize: 18 }} />, href: personalInfo.linkedin, target: '_blank', label: 'LinkedIn' },
                  { icon: <Phone sx={{ fontSize: 18 }} />, href: `tel:${personalInfo.phone}`, label: 'Phone' },
                ].map((item) => (
                  <IconButton
                    key={item.label}
                    href={item.href}
                    target={item.target}
                    aria-label={item.label}
                    size="small"
                    sx={{
                      color: 'text.secondary',
                      border: '1px solid',
                      borderColor: glow.primaryGlow(0.12),
                      borderRadius: '4px',
                      width: 36,
                      height: 36,
                      transition: `box-shadow ${animations.duration.normal}s, color ${animations.duration.normal}s`,
                      '&:hover': {
                        color: 'primary.main',
                        boxShadow: `0 0 16px ${glow.primaryGlow(0.25)}`,
                      },
                    }}
                  >
                    {item.icon}
                  </IconButton>
                ))}
              </Stack>

              {/* Center zone: TypeAnimation in data terminal strip */}
              <Box
                sx={{
                  order: { xs: 1, md: 2 },
                  flex: { md: 1 },
                  maxWidth: { md: 500 },
                  mx: { md: 4 },
                  px: { xs: 2, md: 3 },
                  py: 1.5,
                  borderRadius: '4px',
                  bgcolor: glow.primaryGlow(0.03),
                  border: `1px solid ${glow.primaryGlow(0.08)}`,
                  textAlign: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: mono,
                    color: 'text.secondary',
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                    letterSpacing: '0.03em',
                    minHeight: { xs: 24, md: 28 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      color: 'primary.main',
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

              {/* Right zone: CTA buttons (stacked vertically as commands) */}
              <Stack
                spacing={1.5}
                sx={{
                  order: { xs: 2, md: 3 },
                  alignItems: { xs: 'center', md: 'flex-end' },
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  href="#contact"
                  sx={{
                    px: 3,
                    py: 1,
                    fontSize: '0.75rem',
                    fontFamily: mono,
                    fontWeight: theme.custom.typography.weights.semiBold,
                    letterSpacing: '0.1em',
                    borderRadius: '4px',
                    background: theme.palette.gradient.primary,
                    boxShadow: `0 4px 20px ${glow.primaryGlow(0.3)}`,
                    minWidth: 180,
                    '&:hover': {
                      boxShadow: `0 8px 32px ${glow.primaryGlow(0.5)}`,
                    },
                  }}
                >
                  {'>'} INITIATE CONTACT
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  href="#experience"
                  sx={{
                    px: 3,
                    py: 1,
                    fontSize: '0.75rem',
                    fontFamily: mono,
                    fontWeight: theme.custom.typography.weights.semiBold,
                    letterSpacing: '0.1em',
                    borderRadius: '4px',
                    borderWidth: 1,
                    borderColor: glow.primaryGlow(0.2),
                    color: 'primary.main',
                    minWidth: 180,
                    '&:hover': {
                      borderWidth: 1,
                      borderColor: 'primary.light',
                      boxShadow: `0 0 16px ${glow.primaryGlow(0.2)}, inset 0 0 16px ${glow.primaryGlow(0.04)}`,
                    },
                  }}
                >
                  {'>'} VIEW FLIGHT LOG
                </Button>
              </Stack>
            </MotionBox>
          </MotionBox>
        </Container>
      </MotionBox>
    </Box>
  );
}
