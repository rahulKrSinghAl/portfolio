import { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
} from '@mui/material';
import { Person, Psychology, FiberManualRecord } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { useTheme } from '@mui/material/styles';
import { personalInfo, strengths } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

// ---------------------------------------------------------------------------
// Motion-wrapped MUI components
// ---------------------------------------------------------------------------

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

// ---------------------------------------------------------------------------
// HUD corner brackets (decorative)
// ---------------------------------------------------------------------------

function HudCorners({ color = 'rgba(0,212,255,0.15)', size = 20, thickness = 1 }) {
  const shared = {
    position: 'absolute',
    width: size,
    height: size,
    pointerEvents: 'none',
  };

  const borderStyle = `${thickness}px solid ${color}`;

  return (
    <>
      <Box
        sx={{
          ...shared,
          top: 0,
          left: 0,
          borderTop: borderStyle,
          borderLeft: borderStyle,
        }}
      />
      <Box
        sx={{
          ...shared,
          top: 0,
          right: 0,
          borderTop: borderStyle,
          borderRight: borderStyle,
        }}
      />
      <Box
        sx={{
          ...shared,
          bottom: 0,
          left: 0,
          borderBottom: borderStyle,
          borderLeft: borderStyle,
        }}
      />
      <Box
        sx={{
          ...shared,
          bottom: 0,
          right: 0,
          borderBottom: borderStyle,
          borderRight: borderStyle,
        }}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Data divider with centered dot
// ---------------------------------------------------------------------------

function DataDivider({ color = 'rgba(0,212,255,0.12)' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        my: 4,
        width: '100%',
      }}
    >
      <Box sx={{ flex: 1, height: '1px', background: color }} />
      <FiberManualRecord
        sx={{ fontSize: 5, mx: 2, color, opacity: 0.8 }}
      />
      <Box sx={{ flex: 1, height: '1px', background: color }} />
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Styles factory
// ---------------------------------------------------------------------------

function useAboutStyles(theme) {
  const isDark = theme.palette.mode === 'dark';
  const { glow, typography, animations, glassEffect, spacing } = theme.custom;
  const glass = theme.palette.glass;

  return useMemo(
    () => ({
      section: {
        position: 'relative',
        py: spacing.section,
        overflow: 'hidden',
      },

      // ---- Section header ----
      sectionLabel: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        fontFamily: typography.fonts.mono,
        fontSize: '0.8rem',
        fontWeight: typography.weights.medium,
        color: 'primary.main',
        letterSpacing: typography.spacing.superLoose,
        textTransform: 'uppercase',
        mb: 1.5,
      },

      sectionIcon: {
        fontSize: 16,
        color: 'primary.main',
      },

      mainHeading: {
        fontWeight: typography.weights.extraBold,
        letterSpacing: typography.spacing.loose,
        background: theme.palette.gradient.primary,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 0.5,
      },

      headingSub: {
        fontFamily: typography.fonts.mono,
        fontSize: '0.85rem',
        color: 'text.secondary',
        letterSpacing: typography.spacing.extraLoose,
        opacity: 0.6,
      },

      // ---- Identity data rows ----
      dataRow: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 2,
        py: 1,
        borderBottom: `1px solid ${isDark ? glow.primaryGlow(0.05) : theme.palette.divider}`,
      },

      dataLabel: {
        fontFamily: typography.fonts.mono,
        fontSize: '0.7rem',
        fontWeight: typography.weights.semiBold,
        color: 'primary.main',
        letterSpacing: typography.spacing.superLoose,
        textTransform: 'uppercase',
        minWidth: 130,
        flexShrink: 0,
        opacity: 0.7,
      },

      dataValue: {
        fontFamily: typography.fonts.primary,
        fontSize: '0.95rem',
        fontWeight: typography.weights.medium,
        color: 'text.primary',
        letterSpacing: typography.spacing.relaxed,
      },

      // ---- Glass panels ----
      glassPanel: {
        background: glass.background,
        border: `1px solid ${glass.border}`,
        backdropFilter: glassEffect.blur,
        WebkitBackdropFilter: glassEffect.blur,
        borderRadius: '6px',
        boxShadow: glass.shadow,
        position: 'relative',
        overflow: 'hidden',
      },

      // ---- Specialization (summary) ----
      summaryPanel: {
        p: { xs: 3, md: 4 },
      },

      summaryText: {
        color: 'text.secondary',
        lineHeight: 1.9,
        letterSpacing: typography.spacing.relaxed,
      },

      // ---- Experience counter card ----
      experienceCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 4, md: 5 },
        position: 'relative',
        textAlign: 'center',
        minHeight: 220,
      },

      experienceRing: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 160,
        height: 160,
        borderRadius: '50%',
        border: `1px solid ${isDark ? glow.primaryGlow(0.1) : theme.palette.divider}`,
        pointerEvents: 'none',
      },

      experienceRingOuter: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        height: 200,
        borderRadius: '50%',
        border: `1px solid ${isDark ? glow.primaryGlow(0.05) : theme.palette.action.disabledBackground}`,
        pointerEvents: 'none',
      },

      experienceNumber: {
        fontSize: { xs: '4rem', md: '5rem' },
        fontWeight: typography.weights.black,
        lineHeight: 1,
        background: theme.palette.gradient.secondary,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        position: 'relative',
        zIndex: 1,
      },

      experienceLabel: {
        fontFamily: typography.fonts.mono,
        fontSize: '0.85rem',
        fontWeight: typography.weights.bold,
        color: 'primary.main',
        letterSpacing: typography.spacing.superLoose,
        mt: 1,
        position: 'relative',
        zIndex: 1,
      },

      experienceSub: {
        fontFamily: typography.fonts.mono,
        fontSize: '0.7rem',
        color: 'text.secondary',
        letterSpacing: typography.spacing.extraLoose,
        opacity: 0.5,
        mt: 0.5,
        position: 'relative',
        zIndex: 1,
      },

      // ---- Strength cards ----
      strengthCard: {
        background: glass.background,
        border: `1px solid ${glass.border}`,
        backdropFilter: glassEffect.blur,
        WebkitBackdropFilter: glassEffect.blur,
        borderRadius: '6px',
        boxShadow: glass.shadow,
        backgroundImage: 'none',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: `border-color ${animations.duration.normal}s ${animations.easing.default},
                     box-shadow ${animations.duration.normal}s ${animations.easing.default}`,
        '&:hover': {
          borderColor: isDark ? glow.primaryGlow(0.2) : theme.palette.action.selected,
          boxShadow: isDark
            ? `0 8px 32px 0 rgba(0,0,0,0.5), 0 0 20px ${glow.primaryGlow(0.08)}`
            : `0 8px 32px 0 ${theme.palette.action.hover}`,
        },
      },

      strengthCardContent: {
        p: { xs: 3, md: 3.5 },
        '&:last-child': { pb: { xs: 3, md: 3.5 } },
      },

      strengthIconWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        mb: 2,
      },

      strengthIcon: {
        fontSize: 28,
        color: 'primary.main',
        filter: isDark ? `drop-shadow(0 0 6px ${glow.primaryGlow(0.3)})` : 'none',
      },

      strengthTitle: {
        fontWeight: typography.weights.semiBold,
        fontSize: '1rem',
        letterSpacing: typography.spacing.relaxed,
        color: 'text.primary',
      },

      strengthDescription: {
        color: 'text.secondary',
        fontSize: '0.875rem',
        lineHeight: 1.8,
        letterSpacing: typography.spacing.relaxed,
      },
    }),
    [
      isDark,
      glow,
      typography,
      animations,
      glassEffect,
      glass,
      spacing,
      theme.palette.gradient.primary,
      theme.palette.gradient.secondary,
    ],
  );
}

// ---------------------------------------------------------------------------
// SpaceAbout component
// ---------------------------------------------------------------------------

export default function SpaceAbout() {
  const theme = useTheme();
  const styles = useAboutStyles(theme);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDark = theme.palette.mode === 'dark';
  const { glow, animations } = theme.custom;

  // ---- Counter animation ----
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

  // ---- Animation variants ----
  const sectionHeaderVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : animations.duration.slow,
        ease: animations.easing.smooth,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : animations.duration.slow,
        ease: animations.easing.smooth,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : animations.duration.slow,
        ease: animations.easing.easeOut,
      },
    },
  };

  const scaleInVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : animations.duration.slow,
        ease: animations.easing.smooth,
      },
    },
  };

  // ---- HUD bracket color ----
  const hudColor = isDark ? glow.primaryGlow(0.15) : theme.palette.divider;
  const dividerColor = isDark ? glow.primaryGlow(0.12) : theme.palette.divider;

  // ---- Identity fields ----
  const identityFields = [
    { label: 'CALLSIGN', value: personalInfo.name },
    { label: 'DESIGNATION', value: personalInfo.title },
    { label: 'SECTOR', value: personalInfo.location },
  ];

  return (
    <Box component="section" id="about" sx={styles.section}>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* ============================================================ */}
        {/* Section Header                                               */}
        {/* ============================================================ */}
        <MotionBox
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          sx={{ mb: 6 }}
        >
          <Chip
            icon={<Person sx={styles.sectionIcon} />}
            label="Mission Profile"
            size="small"
            sx={{
              fontFamily: theme.custom.typography.fonts.mono,
              fontSize: '0.75rem',
              fontWeight: theme.custom.typography.weights.medium,
              letterSpacing: theme.custom.typography.spacing.superLoose,
              textTransform: 'uppercase',
              color: 'primary.main',
              background: isDark ? glow.primaryGlow(0.06) : theme.palette.action.hover,
              border: `1px solid ${isDark ? glow.primaryGlow(0.12) : theme.palette.divider}`,
              borderRadius: '4px',
              mb: 2,
              '& .MuiChip-icon': {
                color: 'primary.main',
              },
            }}
          />

          <Typography variant="h2" sx={styles.mainHeading}>
            DOSSIER
          </Typography>

          <Typography sx={styles.headingSub}>
            Operative Profile
          </Typography>
        </MotionBox>

        {/* ============================================================ */}
        {/* IDENTITY section                                             */}
        {/* ============================================================ */}
        <MotionBox
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          sx={{ mb: 2 }}
        >
          <Typography
            sx={{
              fontFamily: theme.custom.typography.fonts.mono,
              fontSize: '0.7rem',
              fontWeight: theme.custom.typography.weights.bold,
              letterSpacing: theme.custom.typography.spacing.superLoose,
              color: 'primary.main',
              opacity: 0.5,
              mb: 1.5,
            }}
          >
            // IDENTITY
          </Typography>

          <Box
            sx={{
              ...styles.glassPanel,
              p: { xs: 3, md: 4 },
              position: 'relative',
            }}
          >
            <HudCorners color={hudColor} size={16} thickness={1} />

            {identityFields.map((field, i) => (
              <Box key={field.label} sx={styles.dataRow}>
                <Typography sx={styles.dataLabel}>{field.label}</Typography>
                <Typography sx={styles.dataValue}>{field.value}</Typography>
              </Box>
            ))}
          </Box>
        </MotionBox>

        <DataDivider color={dividerColor} />

        {/* ============================================================ */}
        {/* SPECIALIZATION + Experience counter (side by side)           */}
        {/* ============================================================ */}
        <Grid container spacing={4} sx={{ mb: 2 }}>
          {/* -- Summary panel -- */}
          <Grid size={{ xs: 12, md: 7 }}>
            <MotionBox
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              sx={{ height: '100%' }}
            >
              <Typography
                sx={{
                  fontFamily: theme.custom.typography.fonts.mono,
                  fontSize: '0.7rem',
                  fontWeight: theme.custom.typography.weights.bold,
                  letterSpacing: theme.custom.typography.spacing.superLoose,
                  color: 'primary.main',
                  opacity: 0.5,
                  mb: 1.5,
                }}
              >
                // SPECIALIZATION
              </Typography>

              <Box
                sx={{
                  ...styles.glassPanel,
                  ...styles.summaryPanel,
                  height: 'calc(100% - 28px)',
                  position: 'relative',
                }}
              >
                <HudCorners color={hudColor} size={14} thickness={1} />
                <Typography variant="body1" sx={styles.summaryText}>
                  {personalInfo.summary}
                </Typography>
              </Box>
            </MotionBox>
          </Grid>

          {/* -- Years counter -- */}
          <Grid size={{ xs: 12, md: 5 }}>
            <MotionBox
              ref={counterRef}
              variants={scaleInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Box sx={{ height: 28 }} />
              <Tilt
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                style={{ flex: 1 }}
              >
                <Box
                  sx={{
                    ...styles.glassPanel,
                    ...styles.experienceCard,
                    height: '100%',
                  }}
                >
                  {/* Decorative rings */}
                  <Box sx={styles.experienceRingOuter} />
                  <Box sx={styles.experienceRing} />

                  <Typography sx={styles.experienceNumber}>
                    {count}+
                  </Typography>
                  <Typography sx={styles.experienceLabel}>
                    YEARS
                  </Typography>
                  <Typography sx={styles.experienceSub}>
                    Mission Duration
                  </Typography>
                </Box>
              </Tilt>
            </MotionBox>
          </Grid>
        </Grid>

        <DataDivider color={dividerColor} />

        {/* ============================================================ */}
        {/* PHILOSOPHY - Strength cards                                  */}
        {/* ============================================================ */}
        <MotionBox
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          sx={{ mb: 3 }}
        >
          <Typography
            sx={{
              fontFamily: theme.custom.typography.fonts.mono,
              fontSize: '0.7rem',
              fontWeight: theme.custom.typography.weights.bold,
              letterSpacing: theme.custom.typography.spacing.superLoose,
              color: 'primary.main',
              opacity: 0.5,
              mb: 1.5,
            }}
          >
            // PHILOSOPHY
          </Typography>
        </MotionBox>

        <Box
          component={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <Grid container spacing={3}>
            {strengths.map((strength, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index} sx={{ display: 'flex' }}>
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  style={{ width: '100%', height: '100%' }}
                >
                  <MotionCard
                    variants={cardVariants}
                    sx={styles.strengthCard}
                    elevation={0}
                  >
                    <CardContent sx={styles.strengthCardContent}>
                      <Box sx={styles.strengthIconWrapper}>
                        <Psychology sx={styles.strengthIcon} />
                        <Typography variant="h6" sx={styles.strengthTitle}>
                          {strength.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={styles.strengthDescription}>
                        {strength.description}
                      </Typography>
                    </CardContent>

                    {/* HUD corners on strength cards */}
                    <HudCorners color={hudColor} size={12} thickness={1} />
                  </MotionCard>
                </Tilt>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
