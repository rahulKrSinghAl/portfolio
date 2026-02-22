import { useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Grid,
} from '@mui/material';
import { People, Folder, RocketLaunch } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useTheme } from '@mui/material/styles';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { projects } from '../../../data';

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  }),
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isActive(period) {
  return period.toLowerCase().includes('present');
}

function formatPeriodLabel(period) {
  if (isActive(period)) return 'ACTIVE';
  return period;
}

// ---------------------------------------------------------------------------
// Styles factory
// ---------------------------------------------------------------------------

function useStyles(theme) {
  const isDark = theme.palette.mode === 'dark';
  const { glow, typography, animations, glassEffect } = theme.custom;
  const glass = theme.palette.glass;

  return useMemo(
    () => ({
      section: {
        py: { xs: 10, md: 14 },
        position: 'relative',
      },

      headerContainer: {
        mb: { xs: 6, md: 8 },
        textAlign: 'center',
      },

      heading: {
        fontFamily: typography.fonts.primary,
        fontWeight: typography.weights.extraBold,
        fontSize: { xs: '2.2rem', md: '3rem' },
        letterSpacing: typography.spacing.extraLoose,
        background: theme.palette.gradient.primary,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 1,
      },

      subHeading: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        fontFamily: typography.fonts.mono,
        fontSize: '0.85rem',
        color: 'text.secondary',
        letterSpacing: typography.spacing.loose,
        opacity: 0.7,
      },

      folderIcon: {
        fontSize: '1rem',
        color: 'primary.main',
      },

      card: {
        position: 'relative',
        background: glass.background,
        border: `1px solid ${glass.border}`,
        backdropFilter: glassEffect.blur,
        WebkitBackdropFilter: glassEffect.blur,
        borderRadius: '6px',
        overflow: 'hidden',
        transition: `box-shadow ${animations.duration.normal}s ${animations.easing.default},
                     border-color ${animations.duration.normal}s ${animations.easing.default}`,
        '&:hover': {
          borderColor: isDark
            ? glow.primaryGlow(0.2)
            : theme.palette.action.selected,
          boxShadow: isDark
            ? `0 0 30px ${glow.primaryGlow(0.12)}, 0 8px 32px rgba(0, 0, 0, 0.4)`
            : `0 8px 32px ${theme.palette.action.hover}`,
        },
        '&:hover .accent-line': {
          transform: 'scaleX(1)',
        },
      },

      accentLine: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: theme.palette.gradient.primary,
        transformOrigin: 'left center',
        transform: 'scaleX(0.3)',
        transition: `transform ${animations.duration.normal}s ${animations.easing.default}`,
      },

      cardContent: {
        p: { xs: 2.5, md: 3 },
        '&:last-child': { pb: { xs: 2.5, md: 3 } },
      },

      projectTitle: {
        fontFamily: typography.fonts.primary,
        fontWeight: typography.weights.bold,
        fontSize: { xs: '1.25rem', md: '1.4rem' },
        letterSpacing: typography.spacing.relaxed,
        color: 'text.primary',
        mb: 1.5,
      },

      metadataRow: {
        mb: 2,
        flexWrap: 'wrap',
        gap: 1,
      },

      crewChip: {
        fontFamily: typography.fonts.mono,
        fontSize: '0.72rem',
        fontWeight: typography.weights.semiBold,
        letterSpacing: '0.05em',
        height: 26,
        backgroundColor: isDark
          ? glow.secondaryGlow(0.15)
          : glow.secondaryGlow(0.12),
        color: 'secondary.main',
        border: 'none',
        '& .MuiChip-icon': {
          color: 'secondary.main',
          fontSize: '0.85rem',
        },
      },

      roleChip: {
        fontFamily: typography.fonts.mono,
        fontSize: '0.72rem',
        fontWeight: typography.weights.semiBold,
        letterSpacing: '0.05em',
        height: 26,
        backgroundColor: isDark
          ? glow.primaryGlow(0.12)
          : glow.primaryGlow(0.1),
        color: 'primary.main',
        border: 'none',
      },

      periodChip: {
        fontFamily: typography.fonts.mono,
        fontSize: '0.7rem',
        fontWeight: typography.weights.medium,
        letterSpacing: '0.04em',
        height: 26,
        color: 'text.secondary',
        borderColor: isDark
          ? glow.primaryGlow(0.15)
          : theme.palette.divider,
      },

      description: {
        fontFamily: typography.fonts.primary,
        fontSize: '0.9rem',
        lineHeight: 1.75,
        color: 'text.secondary',
        mb: 2.5,
      },

      missionHeader: {
        fontFamily: typography.fonts.mono,
        fontWeight: typography.weights.semiBold,
        fontSize: '0.72rem',
        letterSpacing: typography.spacing.superLoose,
        textTransform: 'uppercase',
        color: 'primary.main',
        mb: 1.5,
        opacity: 0.85,
      },

      achievementItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.2,
        mb: 1,
      },

      diamondMarker: {
        width: 6,
        height: 6,
        backgroundColor: 'primary.main',
        transform: 'rotate(45deg)',
        flexShrink: 0,
        mt: '7px',
        opacity: 0.8,
      },

      achievementText: {
        fontFamily: typography.fonts.primary,
        fontSize: '0.85rem',
        lineHeight: 1.7,
        color: 'text.secondary',
      },

      statusBadge: (active) => ({
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.6,
        mt: 2,
        px: 1.2,
        py: 0.3,
        borderRadius: '3px',
        fontFamily: typography.fonts.mono,
        fontSize: '0.65rem',
        fontWeight: typography.weights.semiBold,
        letterSpacing: typography.spacing.superLoose,
        ...(active
          ? {
              backgroundColor: isDark
                ? glow.primaryGlow(0.1)
                : glow.primaryGlow(0.08),
              color: 'primary.main',
              border: `1px solid ${isDark ? glow.primaryGlow(0.2) : theme.palette.primary.light}`,
            }
          : {
              backgroundColor: theme.palette.action.disabledBackground,
              color: 'text.disabled',
              border: `1px solid ${theme.palette.divider}`,
            }),
      }),

      statusDot: (active) => ({
        width: 5,
        height: 5,
        borderRadius: '50%',
        backgroundColor: active
          ? 'primary.main'
          : 'text.disabled',
        ...(active
          ? {
              boxShadow: isDark
                ? `0 0 6px ${glow.primaryGlow(0.5)}`
                : `0 0 4px ${theme.palette.primary.light}`,
            }
          : {}),
      }),
    }),
    [theme.palette.mode, typography, animations, glow, glass, glassEffect, isDark, theme.palette.primary.main, theme.palette.gradient],
  );
}

// ---------------------------------------------------------------------------
// ProjectCard sub-component
// ---------------------------------------------------------------------------

function ProjectCard({ project, index, styles, prefersReducedMotion }) {
  const active = isActive(project.period);

  const tiltProps = prefersReducedMotion
    ? { tiltEnable: false }
    : {
        tiltMaxAngleX: 4,
        tiltMaxAngleY: 4,
        scale: 1.01,
        transitionSpeed: 400,
        glareEnable: false,
      };

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Box
        component={motion.div}
        custom={index}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Tilt {...tiltProps} style={{ height: '100%' }}>
          <Card elevation={0} sx={styles.card}>
            {/* Top accent gradient line */}
            <Box className="accent-line" sx={styles.accentLine} />

            <CardContent sx={styles.cardContent}>
              {/* Project title */}
              <Typography sx={styles.projectTitle}>
                {project.title}
              </Typography>

              {/* Metadata readouts */}
              <Stack direction="row" sx={styles.metadataRow}>
                <Chip
                  icon={<People />}
                  label={`CREW: ${project.teamSize}`}
                  size="small"
                  sx={styles.crewChip}
                />
                <Chip
                  label={project.role}
                  size="small"
                  sx={styles.roleChip}
                />
                <Chip
                  label={project.period}
                  size="small"
                  variant="outlined"
                  sx={styles.periodChip}
                />
              </Stack>

              {/* Description */}
              <Typography sx={styles.description}>
                {project.description}
              </Typography>

              {/* Mission objectives */}
              <Typography sx={styles.missionHeader}>
                Mission Objectives
              </Typography>

              <Box>
                {project.achievements.map((achievement, aIdx) => (
                  <Box key={aIdx} sx={styles.achievementItem}>
                    <Box sx={styles.diamondMarker} />
                    <Typography sx={styles.achievementText}>
                      {achievement}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Status indicator */}
              <Box sx={styles.statusBadge(active)}>
                <Box sx={styles.statusDot(active)} />
                {formatPeriodLabel(project.period)}
              </Box>
            </CardContent>
          </Card>
        </Tilt>
      </Box>
    </Grid>
  );
}

// ---------------------------------------------------------------------------
// SpaceProjects main component
// ---------------------------------------------------------------------------

export default function SpaceProjects() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const styles = useStyles(theme);

  return (
    <Box component="section" id="projects" sx={styles.section}>
      <Container maxWidth="lg">
        {/* Section header */}
        <Box
          component={motion.div}
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          sx={styles.headerContainer}
        >
          <Typography variant="h2" sx={styles.heading}>
            LAUNCH BAY
          </Typography>
          <Box sx={styles.subHeading}>
            <Folder sx={styles.folderIcon} />
            Deployments
          </Box>
        </Box>

        {/* Project cards grid */}
        <Grid
          container
          spacing={3}
          component={motion.div}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              styles={styles}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
