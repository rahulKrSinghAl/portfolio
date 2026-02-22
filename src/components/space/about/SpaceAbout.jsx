import { useEffect, useState } from 'react';
import { Box, Container, Typography, Stack, Chip } from '@mui/material';
import { Person } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { personalInfo, strengths } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

const MotionBox = motion.create(Box);

/* ------------------------------------------------------------------ */
/*  Keyframes                                                          */
/* ------------------------------------------------------------------ */

const travelDot = keyframes`
  0%   { left: 0%; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { left: 100%; opacity: 0; }
`;

const ringRotate = keyframes`
  0%   { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function DockingConnector({ color, reducedMotion }) {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: 20, my: 2 }}>
      {/* Base line */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '5%',
          width: '90%',
          height: 1,
          bgcolor: color,
          opacity: 0.15,
        }}
      />
      {/* Connector nodes at ends */}
      {['5%', '95%'].map((pos) => (
        <Box
          key={pos}
          sx={{
            position: 'absolute',
            top: '50%',
            left: pos,
            transform: 'translate(-50%, -50%)',
            width: 6,
            height: 6,
            borderRadius: '50%',
            border: `1px solid ${color}`,
            opacity: 0.3,
          }}
        />
      ))}
      {/* Traveling dot */}
      {!reducedMotion && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 4,
            height: 4,
            borderRadius: '50%',
            bgcolor: color,
            boxShadow: `0 0 8px ${color}`,
            animation: `${travelDot} 4s linear infinite`,
          }}
        />
      )}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/*  SpaceAbout                                                         */
/* ------------------------------------------------------------------ */

export default function SpaceAbout() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDark = theme.palette.mode === 'dark';
  const { glow, animations, typography, glassEffect, spacing } = theme.custom;
  const glass = theme.palette.glass;
  const mono = typography.fonts.mono;

  /* ---- Counter animation ---- */
  const yearsOfExperience = 4;
  const [count, setCount] = useState(0);
  const { ref: counterRef, inView: counterInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (counterInView && !prefersReducedMotion) {
      let start = 0;
      const duration = 2000;
      const increment = yearsOfExperience / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= yearsOfExperience) {
          setCount(yearsOfExperience);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    } else if (counterInView) {
      setCount(yearsOfExperience);
    }
  }, [counterInView, prefersReducedMotion]);

  /* ---- Animation variants ---- */
  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.7, ease: animations.easing.smooth },
    },
  };

  const stagger = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 },
    },
  };

  /* ---- Shared glass panel ---- */
  const glassPanel = {
    background: glass.background,
    border: `1px solid ${glass.border}`,
    backdropFilter: glassEffect.blur,
    WebkitBackdropFilter: glassEffect.blur,
    borderRadius: '6px',
    boxShadow: glass.shadow,
  };

  const connectorColor = isDark ? theme.palette.primary.main : theme.palette.primary.dark;

  /* ---- Identity data ---- */
  const identityFields = [
    { label: 'CALLSIGN', value: personalInfo.name },
    { label: 'DESIGNATION', value: personalInfo.title },
    { label: 'SECTOR', value: personalInfo.location },
  ];

  return (
    <Box component="section" id="about" sx={{ position: 'relative', py: spacing.section, overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* Section Header */}
        <MotionBox
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          sx={{ mb: 5 }}
        >
          <Chip
            icon={<Person sx={{ fontSize: 16, color: 'primary.main' }} />}
            label="Mission Profile"
            size="small"
            sx={{
              fontFamily: mono,
              fontSize: '0.75rem',
              fontWeight: typography.weights.medium,
              letterSpacing: typography.spacing.superLoose,
              textTransform: 'uppercase',
              color: 'primary.main',
              background: isDark ? glow.primaryGlow(0.06) : theme.palette.action.hover,
              border: `1px solid ${isDark ? glow.primaryGlow(0.12) : theme.palette.divider}`,
              borderRadius: '4px',
              mb: 2,
              '& .MuiChip-icon': { color: 'primary.main' },
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: typography.weights.extraBold,
              letterSpacing: typography.spacing.loose,
              background: theme.palette.gradient.primary,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 0.5,
            }}
          >
            DOSSIER
          </Typography>
          <Typography
            sx={{
              fontFamily: mono,
              fontSize: '0.85rem',
              color: 'text.secondary',
              letterSpacing: typography.spacing.extraLoose,
              opacity: 0.6,
            }}
          >
            Operative Profile
          </Typography>
        </MotionBox>

        {/* ============================================================ */}
        {/* IDENTITY BAR — Full-width horizontal strip                   */}
        {/* ============================================================ */}
        <MotionBox
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <Box
            sx={{
              ...glassPanel,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { sm: 'center' },
              overflow: 'hidden',
            }}
          >
            {identityFields.map((field, i) => (
              <Box
                key={field.label}
                sx={{
                  flex: 1,
                  px: { xs: 2.5, md: 3 },
                  py: { xs: 2, md: 2.5 },
                  borderRight: {
                    xs: 'none',
                    sm: i < identityFields.length - 1
                      ? `1px solid ${isDark ? glow.primaryGlow(0.1) : theme.palette.divider}`
                      : 'none',
                  },
                  borderBottom: {
                    xs: i < identityFields.length - 1
                      ? `1px solid ${isDark ? glow.primaryGlow(0.1) : theme.palette.divider}`
                      : 'none',
                    sm: 'none',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: mono,
                    fontSize: '0.6rem',
                    fontWeight: typography.weights.bold,
                    letterSpacing: typography.spacing.superLoose,
                    color: 'primary.main',
                    opacity: 0.6,
                    mb: 0.5,
                  }}
                >
                  {field.label}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: typography.fonts.primary,
                    fontSize: '0.95rem',
                    fontWeight: typography.weights.medium,
                    color: 'text.primary',
                    letterSpacing: typography.spacing.relaxed,
                  }}
                >
                  {field.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </MotionBox>

        {/* Docking connector line */}
        <DockingConnector color={connectorColor} reducedMotion={prefersReducedMotion} />

        {/* ============================================================ */}
        {/* HUB ROW — Bio | Airlock Counter | Strengths                  */}
        {/* ============================================================ */}
        <MotionBox
          ref={counterRef}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            alignItems: 'stretch',
          }}
        >
          {/* BIO MODULE */}
          <MotionBox variants={fadeUp} sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontFamily: mono,
                fontSize: '0.65rem',
                fontWeight: typography.weights.bold,
                letterSpacing: typography.spacing.superLoose,
                color: 'primary.main',
                opacity: 0.5,
                mb: 1.5,
              }}
            >
              // BIO MODULE
            </Typography>
            <Box sx={{ ...glassPanel, p: { xs: 3, md: 4 }, height: 'calc(100% - 32px)' }}>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.9,
                  letterSpacing: typography.spacing.relaxed,
                }}
              >
                {personalInfo.summary}
              </Typography>
            </Box>
          </MotionBox>

          {/* CENTER AIRLOCK — Circular experience counter */}
          <MotionBox
            variants={fadeUp}
            sx={{
              flex: '0 0 auto',
              width: { xs: '100%', md: 200 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: mono,
                fontSize: '0.65rem',
                fontWeight: typography.weights.bold,
                letterSpacing: typography.spacing.superLoose,
                color: 'primary.main',
                opacity: 0.5,
                mb: 1.5,
                textAlign: 'center',
              }}
            >
              // AIRLOCK
            </Typography>
            <Box
              sx={{
                ...glassPanel,
                flex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                minHeight: { xs: 180, md: 0 },
              }}
            >
              {/* Rotating SVG ring */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 140,
                  height: 140,
                  animation: prefersReducedMotion
                    ? 'none'
                    : `${ringRotate} 12s linear infinite`,
                  pointerEvents: 'none',
                }}
              >
                <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                  <circle
                    cx="70"
                    cy="70"
                    r="65"
                    stroke={isDark ? glow.primaryGlow(0.15) : theme.palette.divider}
                    strokeWidth="1"
                    strokeDasharray="8 6"
                  />
                  {/* Accent dot on ring */}
                  <circle cx="70" cy="5" r="3" fill={theme.palette.secondary.main} opacity="0.7" />
                </svg>
              </Box>
              {/* Static inner ring */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 110,
                  height: 110,
                  borderRadius: '50%',
                  border: `1px solid ${isDark ? glow.primaryGlow(0.08) : theme.palette.divider}`,
                }}
              />
              {/* Counter content */}
              <Stack alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                  sx={{
                    fontSize: { xs: '3.5rem', md: '4rem' },
                    fontWeight: typography.weights.black,
                    lineHeight: 1,
                    background: theme.palette.gradient.secondary,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {count}+
                </Typography>
                <Typography
                  sx={{
                    fontFamily: mono,
                    fontSize: '0.75rem',
                    fontWeight: typography.weights.bold,
                    color: 'primary.main',
                    letterSpacing: typography.spacing.superLoose,
                    mt: 0.5,
                  }}
                >
                  YEARS
                </Typography>
                <Typography
                  sx={{
                    fontFamily: mono,
                    fontSize: '0.6rem',
                    color: 'text.secondary',
                    letterSpacing: typography.spacing.extraLoose,
                    opacity: 0.5,
                  }}
                >
                  Mission Duration
                </Typography>
              </Stack>
            </Box>
          </MotionBox>

          {/* STRENGTHS MODULE */}
          <MotionBox variants={fadeUp} sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontFamily: mono,
                fontSize: '0.65rem',
                fontWeight: typography.weights.bold,
                letterSpacing: typography.spacing.superLoose,
                color: 'primary.main',
                opacity: 0.5,
                mb: 1.5,
              }}
            >
              // CORE PROTOCOLS
            </Typography>
            <Box sx={{ ...glassPanel, p: { xs: 3, md: 4 }, height: 'calc(100% - 32px)' }}>
              <Stack spacing={3}>
                {strengths.map((s, i) => (
                  <Box key={i}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          opacity: 0.6,
                          boxShadow: isDark ? `0 0 8px ${glow.primaryGlow(0.4)}` : 'none',
                        }}
                      />
                      <Typography
                        sx={{
                          fontWeight: typography.weights.semiBold,
                          fontSize: '0.95rem',
                          letterSpacing: typography.spacing.relaxed,
                          color: 'text.primary',
                        }}
                      >
                        {s.title}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.85rem',
                        lineHeight: 1.8,
                        letterSpacing: typography.spacing.relaxed,
                        pl: 2.5,
                      }}
                    >
                      {s.description}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </MotionBox>
        </MotionBox>

        {/* Docking connector line */}
        <DockingConnector color={connectorColor} reducedMotion={prefersReducedMotion} />

        {/* ============================================================ */}
        {/* STATION STATUS BAR — Bottom strip with small stats           */}
        {/* ============================================================ */}
        <MotionBox
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <Box
            sx={{
              ...glassPanel,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-around',
              alignItems: 'center',
              py: 2,
              px: 3,
              gap: { xs: 1.5, sm: 0 },
            }}
          >
            {[
              { label: 'PROJECTS', value: '2 ACTIVE' },
              { label: 'STACK', value: 'REACT / NEXT.JS' },
              { label: 'CLEARANCE', value: 'LEAD LEVEL' },
            ].map((stat) => (
              <Stack key={stat.label} direction="row" spacing={1} alignItems="baseline">
                <Typography
                  sx={{
                    fontFamily: mono,
                    fontSize: '0.6rem',
                    fontWeight: typography.weights.bold,
                    color: 'primary.main',
                    letterSpacing: typography.spacing.superLoose,
                    opacity: 0.6,
                  }}
                >
                  {stat.label}:
                </Typography>
                <Typography
                  sx={{
                    fontFamily: mono,
                    fontSize: '0.7rem',
                    fontWeight: typography.weights.medium,
                    color: 'text.secondary',
                    letterSpacing: typography.spacing.relaxed,
                  }}
                >
                  {stat.value}
                </Typography>
              </Stack>
            ))}
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
