import { Box, Container, Typography, Card, CardContent, Stack } from '@mui/material';
import { BusinessCenter } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { useTheme, keyframes } from '@mui/system';
import { experience } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

// ---------------------------------------------------------------------------
// Framer-motion wrappers
// ---------------------------------------------------------------------------

const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);

// ---------------------------------------------------------------------------
// Keyframes
// ---------------------------------------------------------------------------

const pulseGlow = (glowColor) => keyframes`
  0%   { box-shadow: 0 0 4px 1px ${glowColor}; }
  50%  { box-shadow: 0 0 12px 4px ${glowColor}; }
  100% { box-shadow: 0 0 4px 1px ${glowColor}; }
`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Converts a period string like "03/2023 - Present" into
 * "MISSION // 03.2023 - PRESENT".
 */
function formatMissionTimestamp(period) {
  const formatted = period
    .replace(/\//g, '.')
    .toUpperCase();
  return `MISSION // ${formatted}`;
}

// ---------------------------------------------------------------------------
// Styles factory
// ---------------------------------------------------------------------------

function getStyles(theme) {
  const { glow, typography, animations, glassEffect, spacing } = theme.custom;

  return {
    section: {
      py: { xs: spacing.xxl, md: spacing.section },
      position: 'relative',
    },

    /* ---- Header ---- */
    headerStack: {
      mb: spacing.xxl,
    },
    headerIcon: {
      color: 'primary.main',
      fontSize: 40,
      filter: `drop-shadow(0 0 6px ${glow.primaryGlow(0.4)})`,
    },
    heading: {
      fontWeight: typography.weights.bold,
      background: theme.palette.gradient?.primary || theme.palette.primary.main,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: typography.spacing.extraLoose,
    },
    headingSub: {
      fontWeight: typography.weights.medium,
      color: 'text.secondary',
      letterSpacing: typography.spacing.loose,
    },

    /* ---- Timeline spine ---- */
    timelineWrapper: {
      position: 'relative',
      pl: { xs: 4, sm: 6 },
    },
    timelineLine: {
      position: 'absolute',
      left: { xs: 11, sm: 15 },
      top: 0,
      width: 2,
      background: `linear-gradient(180deg, ${glow.primaryGlow(0.6)} 0%, ${glow.primaryGlow(0.15)} 100%)`,
      boxShadow: `0 0 8px ${glow.primaryGlow(0.3)}, 0 0 20px ${glow.primaryGlow(0.1)}`,
      transformOrigin: 'top',
    },

    /* ---- Timeline dot (checkpoint node) ---- */
    timelineDot: {
      position: 'absolute',
      left: { xs: -28, sm: -36 },
      top: 28,
      width: 12,
      height: 12,
      borderRadius: '50%',
      bgcolor: 'primary.main',
      border: '2px solid',
      borderColor: 'background.default',
      zIndex: 2,
      cursor: 'pointer',
      transition: `box-shadow ${animations.duration.normal}s ${animations.easing.default}`,
      '&:hover': {
        animation: `${pulseGlow(glow.primaryGlow(0.6))} 1.4s ease-in-out infinite`,
      },
    },

    /* ---- Connector line (dot -> card) ---- */
    connectorLine: {
      position: 'absolute',
      left: { xs: -16, sm: -24 },
      top: 33,
      width: { xs: 16, sm: 24 },
      height: 2,
      background: `linear-gradient(90deg, ${glow.primaryGlow(0.5)}, ${glow.primaryGlow(0.1)})`,
    },

    /* ---- Card ---- */
    card: {
      position: 'relative',
      border: '1px solid',
      borderColor: theme.palette.glass.border,
      borderRadius: '6px',
      background: theme.palette.glass.background,
      backdropFilter: glassEffect.blur,
      WebkitBackdropFilter: glassEffect.blur,
      boxShadow: theme.palette.glass.shadow,
      transition: `transform ${animations.duration.normal}s ${animations.easing.default},
                   border-color ${animations.duration.normal}s ${animations.easing.default},
                   box-shadow ${animations.duration.normal}s ${animations.easing.default}`,
      '&:hover': {
        transform: 'translateY(-2px)',
        borderColor: glow.primaryGlow(0.25),
        boxShadow: `0 12px 40px ${glow.primaryGlow(0.2)}, 0 0 24px ${glow.primaryGlow(0.08)}`,
      },
    },
    cardContent: {
      p: { xs: spacing.md, md: spacing.lg },
    },

    /* ---- Card inner elements ---- */
    jobTitle: {
      fontWeight: typography.weights.bold,
      mb: 0.5,
      color: 'text.primary',
    },
    companyName: {
      fontWeight: typography.weights.semiBold,
      color: 'primary.main',
      letterSpacing: typography.spacing.relaxed,
    },
    missionTimestamp: {
      fontFamily: typography.fonts.mono,
      fontSize: '0.75rem',
      fontWeight: typography.weights.medium,
      color: 'primary.main',
      letterSpacing: typography.spacing.relaxed,
      textTransform: 'uppercase',
      mt: 1,
      mb: 0.5,
    },
    jobType: {
      fontStyle: 'italic',
      color: 'text.secondary',
      mb: spacing.sm,
    },

    /* ---- Achievement bullets ---- */
    bulletMarker: {
      width: 6,
      height: 6,
      mt: '9px',
      flexShrink: 0,
      bgcolor: 'primary.main',
      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    },
    bulletText: {
      color: 'text.secondary',
    },
  };
}

// ---------------------------------------------------------------------------
// SpaceExperience component
// ---------------------------------------------------------------------------

export default function SpaceExperience() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { ref: timelineRef, inView: timelineInView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  // -- Animation variants --------------------------------------------------

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.25,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 40,
      scale: prefersReducedMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : theme.custom.animations.duration.slow,
        ease: theme.custom.animations.easing.easeOut,
      },
    },
  };

  const bulletVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -12 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.08,
        duration: prefersReducedMotion ? 0 : theme.custom.animations.duration.normal,
      },
    }),
  };

  return (
    <Box component="section" id="experience" sx={styles.section}>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* ---- Section header ---- */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={styles.headerStack}
        >
          <BusinessCenter sx={styles.headerIcon} />
          <Box>
            <Typography variant="h2" sx={styles.heading}>
              FLIGHT LOG
            </Typography>
            <Typography variant="h6" sx={styles.headingSub}>
              Trajectory
            </Typography>
          </Box>
        </Stack>

        {/* ---- Timeline ---- */}
        <Box ref={timelineRef} sx={styles.timelineWrapper}>
          {/* Animated vertical glow line */}
          <MotionBox
            initial={{ height: 0 }}
            animate={timelineInView ? { height: '100%' } : { height: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 1.5,
              ease: theme.custom.animations.easing.easeOut,
            }}
            sx={styles.timelineLine}
          />

          {/* Staggered cards container */}
          <Box
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <Stack spacing={5}>
              {experience.map((job, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  {/* Checkpoint node (dot) */}
                  <Box sx={styles.timelineDot} />

                  {/* Horizontal connector */}
                  <Box sx={styles.connectorLine} />

                  {/* Experience card */}
                  <Tilt
                    tiltMaxAngleX={2}
                    tiltMaxAngleY={2}
                    tiltReverse
                    glareEnable={false}
                  >
                    <MotionCard
                      variants={cardVariants}
                      elevation={0}
                      sx={styles.card}
                    >
                      <CardContent sx={styles.cardContent}>
                        {/* Title + Company */}
                        <Typography variant="h5" sx={styles.jobTitle}>
                          {job.title}
                        </Typography>
                        <Typography variant="h6" sx={styles.companyName}>
                          {job.company}
                        </Typography>

                        {/* Mission timestamp */}
                        <Typography sx={styles.missionTimestamp}>
                          {formatMissionTimestamp(job.period)}
                        </Typography>

                        {/* Job type */}
                        <Typography variant="body2" sx={styles.jobType}>
                          {job.type}
                        </Typography>

                        {/* Achievement bullets */}
                        <Stack spacing={1.5}>
                          {job.achievements.map((achievement, idx) => (
                            <MotionBox
                              key={idx}
                              variants={bulletVariants}
                              custom={idx}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                            >
                              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                <Box sx={styles.bulletMarker} />
                                <Typography variant="body1" sx={styles.bulletText}>
                                  {achievement}
                                </Typography>
                              </Stack>
                            </MotionBox>
                          ))}
                        </Stack>
                      </CardContent>
                    </MotionCard>
                  </Tilt>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
