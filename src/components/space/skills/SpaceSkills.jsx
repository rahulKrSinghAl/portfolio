import { Box, Container, Typography, Chip, Stack, Paper, Grid } from '@mui/material';
import { Code, Language, Construction } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { useTheme, keyframes } from '@mui/system';
import { FaReact, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiNextdotjs, SiRedux, SiMui, SiJavascript, SiTypescript } from 'react-icons/si';
import { skills, languages } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

// ---------------------------------------------------------------------------
// Motion wrappers
// ---------------------------------------------------------------------------

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);
const MotionChip = motion.create(Chip);

// ---------------------------------------------------------------------------
// Skill icon map
// ---------------------------------------------------------------------------

const skillIcons = {
  React: FaReact,
  'Next.js': SiNextdotjs,
  Redux: SiRedux,
  MUI: SiMui,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
};

// ---------------------------------------------------------------------------
// Scanning beam keyframe
// ---------------------------------------------------------------------------

const scanBeam = keyframes`
  0% {
    left: -8%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    left: 108%;
    opacity: 0;
  }
`;

// Glass panel base styles moved to component body to access theme

// ---------------------------------------------------------------------------
// Corner bracket decoration component
// ---------------------------------------------------------------------------

function CornerBrackets({ color, prefersReducedMotion }) {
  const corners = [
    {
      position: { top: 0, left: 0 },
      border: { borderTop: '2px solid', borderLeft: '2px solid' },
      radius: '4px 0 0 0',
      initial: { opacity: 0, x: -20, y: -20 },
      dotPosition: { top: 6, left: 6 },
    },
    {
      position: { top: 0, right: 0 },
      border: { borderTop: '2px solid', borderRight: '2px solid' },
      radius: '0 4px 0 0',
      initial: { opacity: 0, x: 20, y: -20 },
      dotPosition: null,
    },
    {
      position: { bottom: 0, left: 0 },
      border: { borderBottom: '2px solid', borderLeft: '2px solid' },
      radius: '0 0 0 4px',
      initial: { opacity: 0, x: -20, y: 20 },
      dotPosition: null,
    },
    {
      position: { bottom: 0, right: 0 },
      border: { borderBottom: '2px solid', borderRight: '2px solid' },
      radius: '0 0 4px 0',
      initial: { opacity: 0, x: 20, y: 20 },
      dotPosition: { bottom: 6, right: 6 },
    },
  ];

  return (
    <>
      {corners.map((corner, i) => (
        <MotionBox
          key={i}
          initial={corner.initial}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          sx={{
            position: 'absolute',
            ...corner.position,
            width: '50px',
            height: '50px',
            ...corner.border,
            borderColor: color,
            opacity: 0.25,
            borderRadius: corner.radius,
            pointerEvents: 'none',
            ...(corner.dotPosition
              ? {
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    ...corner.dotPosition,
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    bgcolor: color,
                    opacity: 0.6,
                  },
                }
              : {}),
          }}
        />
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// SpaceSkills component
// ---------------------------------------------------------------------------

export default function SpaceSkills() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  const { ref: languageBarsRef, inView: languageBarsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Theme-aware colors
  const cyanMain = theme.palette.primary.main;
  const amberMain = theme.palette.secondary.main;
  const isDark = theme.palette.mode === 'dark';

  // Glow helpers
  const primaryGlow = theme.custom.glow.primaryGlow;
  const secondaryGlow = theme.custom.glow.secondaryGlow;
  const glass = theme.palette.glass;

  // Glass panel base styles
  const glassPanel = {
    p: { xs: 3, md: 4 },
    height: '100%',
    border: `1px solid ${glass.border}`,
    borderRadius: '6px',
    background: glass.background,
    backdropFilter: theme.custom.glassEffect.blur,
    WebkitBackdropFilter: theme.custom.glassEffect.blur,
    boxShadow: glass.shadow,
    transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
  };

  // -------------------------------------------------------------------------
  // Animation variants
  // -------------------------------------------------------------------------

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.35,
        ease: 'easeOut',
      },
    },
  };

  const panelVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
        ease: 'easeOut',
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: 'easeOut',
      },
    },
  };

  // -------------------------------------------------------------------------
  // Chip styles
  // -------------------------------------------------------------------------

  const chipPrimary = {
    py: 2.5,
    px: 1,
    borderRadius: '4px',
    fontWeight: theme.custom.typography.weights.medium,
    letterSpacing: theme.custom.typography.spacing.relaxed,
    cursor: 'default',
    bgcolor: isDark ? primaryGlow(0.1) : primaryGlow(0.08),
    color: cyanMain,
    border: '2px solid',
    borderColor: cyanMain,
    '& .MuiChip-icon': {
      color: 'inherit',
    },
    '&:hover': {
      bgcolor: cyanMain,
      color: theme.palette.mode === 'dark' ? theme.palette.background.default : '#ffffff',
    },
    transition: `background-color 0.2s ease, color 0.2s ease`,
  };

  const chipSecondary = {
    py: 2.5,
    px: 1,
    borderRadius: '4px',
    fontWeight: theme.custom.typography.weights.medium,
    letterSpacing: theme.custom.typography.spacing.relaxed,
    cursor: 'default',
    bgcolor: isDark ? secondaryGlow(0.1) : secondaryGlow(0.15),
    color: amberMain,
    border: '2px solid',
    borderColor: amberMain,
    '& .MuiChip-icon': {
      color: 'inherit',
    },
    '&:hover': {
      bgcolor: amberMain,
      color: theme.palette.mode === 'dark' ? theme.palette.background.default : '#ffffff',
    },
    transition: `background-color 0.2s ease, color 0.2s ease`,
  };

  // -------------------------------------------------------------------------
  // Progress bar styles
  // -------------------------------------------------------------------------

  const barTrack = {
    width: '100%',
    height: 10,
    bgcolor: isDark ? theme.palette.background.paper : theme.palette.action.hover,
    border: '1px solid',
    borderColor: isDark ? primaryGlow(0.1) : theme.palette.divider,
    borderRadius: '4px',
    overflow: 'hidden',
    position: 'relative',
  };

  const barFill = {
    height: '100%',
    background: `linear-gradient(90deg, ${cyanMain}, ${amberMain})`,
    borderRadius: '4px',
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      width: '12px',
      height: '100%',
      background: `radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 40%, transparent 70%)`,
      filter: 'blur(1px)',
      animation: prefersReducedMotion
        ? 'none'
        : `${scanBeam} 2.5s ease-in-out infinite`,
    },
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <Box
      id="skills"
      sx={{
        py: { xs: 8, md: 15 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner bracket decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      >
        <CornerBrackets
          color={cyanMain}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* Section header */}
        <MotionBox
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ mb: 8 }}
          >
            <Construction sx={{ fontSize: 40, color: cyanMain }} />
            <Typography
              variant="h2"
              sx={{
                fontWeight: theme.custom.typography.weights.bold,
                fontFamily: theme.custom.typography.fonts.primary,
                letterSpacing: theme.custom.typography.spacing.extraLoose,
              }}
            >
              SYSTEMS
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: theme.custom.typography.weights.bold,
                color: 'text.secondary',
              }}
            >
              Capabilities
            </Typography>
          </Stack>
        </MotionBox>

        {/* Grid layout */}
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Grid container spacing={3}>
            {/* ---- CORE SYSTEMS (Frontend) ---- */}
            <Grid size={{ xs: 12, md: 7 }} sx={{ display: 'flex' }}>
              <Tilt
                tiltMaxAngleX={3}
                tiltMaxAngleY={3}
                style={{ width: '100%', height: '100%' }}
              >
                <MotionPaper
                  variants={panelVariants}
                  elevation={0}
                  sx={{
                    ...glassPanel,
                    '&:hover': {
                      borderColor: cyanMain,
                      boxShadow: `0 8px 32px ${primaryGlow(0.2)}`,
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: theme.custom.typography.weights.semiBold,
                      mb: 3,
                      letterSpacing: theme.custom.typography.spacing.relaxed,
                    }}
                  >
                    <Code
                      sx={{
                        mr: 1,
                        verticalAlign: 'middle',
                        color: cyanMain,
                      }}
                    />
                    CORE SYSTEMS
                  </Typography>
                  <Box
                    component={motion.div}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.5}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      {skills.frontend.map((skill, index) => {
                        const IconComponent = skillIcons[skill];
                        return (
                          <MotionChip
                            key={index}
                            icon={
                              IconComponent ? (
                                <IconComponent size={18} />
                              ) : undefined
                            }
                            label={skill}
                            variants={chipVariants}
                            whileHover={
                              prefersReducedMotion
                                ? {}
                                : {
                                    scale: 1.05,
                                    transition: { duration: 0.2 },
                                  }
                            }
                            sx={chipPrimary}
                          />
                        );
                      })}
                    </Stack>
                  </Box>
                </MotionPaper>
              </Tilt>
            </Grid>

            {/* ---- PROGRAMMING LANGUAGES ---- */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex' }}>
              <Tilt
                tiltMaxAngleX={3}
                tiltMaxAngleY={3}
                style={{ width: '100%', height: '100%' }}
              >
                <MotionPaper
                  variants={panelVariants}
                  elevation={0}
                  sx={{
                    ...glassPanel,
                    '&:hover': {
                      borderColor: amberMain,
                      boxShadow: `0 8px 32px ${secondaryGlow(0.2)}`,
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: theme.custom.typography.weights.semiBold,
                      mb: 3,
                      letterSpacing: theme.custom.typography.spacing.relaxed,
                    }}
                  >
                    PROGRAMMING LANGUAGES
                  </Typography>
                  <Box
                    component={motion.div}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.5}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      {skills.languages.map((lang, index) => {
                        const IconComponent = skillIcons[lang];
                        return (
                          <MotionChip
                            key={index}
                            icon={
                              IconComponent ? (
                                <IconComponent size={18} />
                              ) : undefined
                            }
                            label={lang}
                            variants={chipVariants}
                            whileHover={
                              prefersReducedMotion
                                ? {}
                                : {
                                    scale: 1.05,
                                    transition: { duration: 0.2 },
                                  }
                            }
                            sx={chipSecondary}
                          />
                        );
                      })}
                    </Stack>
                  </Box>
                </MotionPaper>
              </Tilt>
            </Grid>

            {/* ---- COMMUNICATION PROTOCOLS (Spoken Languages) ---- */}
            <Grid size={{ xs: 12 }} sx={{ display: 'flex' }}>
              <Tilt
                tiltMaxAngleX={2}
                tiltMaxAngleY={2}
                style={{ width: '100%' }}
              >
                <MotionPaper
                  variants={panelVariants}
                  elevation={0}
                  sx={{
                    ...glassPanel,
                    '&:hover': {
                      borderColor: cyanMain,
                      boxShadow: `0 8px 32px ${primaryGlow(0.15)}`,
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    sx={{ mb: 3 }}
                  >
                    <Language sx={{ fontSize: 32, color: cyanMain }} />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: theme.custom.typography.weights.semiBold,
                        letterSpacing: theme.custom.typography.spacing.relaxed,
                      }}
                    >
                      COMMUNICATION PROTOCOLS
                    </Typography>
                  </Stack>

                  <Stack spacing={3} ref={languageBarsRef}>
                    {languages.map((lang, index) => (
                      <Box key={index}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ mb: 1 }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight:
                                theme.custom.typography.weights.medium,
                              letterSpacing:
                                theme.custom.typography.spacing.relaxed,
                            }}
                          >
                            {lang.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              fontFamily:
                                theme.custom.typography.fonts.mono,
                              fontSize: '0.75rem',
                              letterSpacing: '0.05em',
                            }}
                          >
                            {lang.level} // {lang.proficiency}%
                          </Typography>
                        </Stack>
                        <Box sx={barTrack}>
                          <MotionBox
                            initial={{ width: 0 }}
                            animate={
                              languageBarsInView
                                ? { width: `${lang.proficiency}%` }
                                : { width: 0 }
                            }
                            transition={{
                              duration: prefersReducedMotion ? 0 : 1.2,
                              delay: prefersReducedMotion
                                ? 0
                                : index * 0.2,
                              ease: 'easeOut',
                            }}
                            sx={barFill}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </MotionPaper>
              </Tilt>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
