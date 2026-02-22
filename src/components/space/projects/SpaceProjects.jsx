import { Box, Container, Typography, Stack } from '@mui/material';
import { Folder } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { projects } from '../../../data';

const MotionBox = motion.create(Box);

/* ------------------------------------------------------------------ */
/*  Keyframes                                                          */
/* ------------------------------------------------------------------ */

const orbitSpin = (duration) => keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const beaconPulse = keyframes`
  0%, 100% { box-shadow: 0 0 4px currentColor; opacity: 1; }
  50%      { box-shadow: 0 0 12px currentColor, 0 0 24px currentColor; opacity: 0.6; }
`;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function isActive(period) {
  return period.toLowerCase().includes('present');
}

/* ------------------------------------------------------------------ */
/*  Orbit Visual — SVG satellite with rotating ring                    */
/* ------------------------------------------------------------------ */

function OrbitVisual({ index, active, primaryColor, secondaryColor, reducedMotion, isDark, glow }) {
  const designation = `SAT-${String(index + 1).padStart(2, '0')}`;
  const ringDuration = 8 + index * 4;

  return (
    <Stack alignItems="center" spacing={1.5}>
      <Box sx={{ position: 'relative', width: 120, height: 120 }}>
        {/* Rotating orbit ring */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            animation: reducedMotion ? 'none' : `${orbitSpin(ringDuration)} ${ringDuration}s linear infinite`,
          }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle
              cx="60"
              cy="60"
              r="55"
              stroke={isDark ? secondaryColor : primaryColor}
              strokeWidth="1"
              strokeDasharray="8 6"
              opacity="0.3"
            />
            {/* Satellite dot on orbit */}
            <circle
              cx="60"
              cy="5"
              r="4"
              fill={secondaryColor}
              opacity="0.8"
            />
          </svg>
        </Box>

        {/* Static inner planet */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 50,
            height: 50,
            borderRadius: '50%',
            background: isDark
              ? `radial-gradient(circle, ${glow.primaryGlow(0.2)} 0%, ${glow.primaryGlow(0.05)} 100%)`
              : `radial-gradient(circle, ${glow.primaryGlow(0.1)} 0%, ${glow.primaryGlow(0.02)} 100%)`,
            border: `1px solid ${isDark ? glow.primaryGlow(0.2) : glow.primaryGlow(0.12)}`,
          }}
        />

        {/* Planet surface ring */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 70,
            height: 20,
            borderRadius: '50%',
            border: `1px solid ${isDark ? glow.primaryGlow(0.1) : glow.primaryGlow(0.06)}`,
          }}
        />
      </Box>

      {/* Designation label */}
      <Typography
        sx={{
          fontFamily: 'monospace',
          fontSize: '0.6rem',
          fontWeight: 700,
          color: active ? secondaryColor : 'text.secondary',
          letterSpacing: '0.15em',
          opacity: 0.7,
        }}
      >
        {designation}
      </Typography>
    </Stack>
  );
}

/* ------------------------------------------------------------------ */
/*  Panoramic Project Card                                             */
/* ------------------------------------------------------------------ */

function PanoramicCard({ project, index, theme, reducedMotion }) {
  const { glow, typography, animations, glassEffect } = theme.custom;
  const glass = theme.palette.glass;
  const isDark = theme.palette.mode === 'dark';
  const mono = typography.fonts.mono;
  const active = isActive(project.period);

  const glassPanel = {
    background: glass.background,
    border: `1px solid ${glass.border}`,
    backdropFilter: glassEffect.blur,
    WebkitBackdropFilter: glassEffect.blur,
    borderRadius: '6px',
    boxShadow: glass.shadow,
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0 : 0.6,
        delay: reducedMotion ? 0 : index * 0.15,
        ease: [0.6, -0.05, 0.01, 0.99],
      }}
    >
      <Box
        sx={{
          ...glassPanel,
          overflow: 'hidden',
          transition: `border-color ${animations.duration.normal}s, box-shadow ${animations.duration.normal}s`,
          '&:hover': {
            borderColor: isDark ? glow.primaryGlow(0.2) : theme.palette.action.selected,
            boxShadow: isDark
              ? `0 0 30px ${glow.primaryGlow(0.12)}, 0 8px 32px rgba(0,0,0,0.4)`
              : `0 8px 32px ${theme.palette.action.hover}`,
          },
        }}
      >
        {/* Top accent line */}
        <Box
          sx={{
            height: 2,
            background: theme.palette.gradient.primary,
          }}
        />

        {/* Internal 3-column flex: orbit | content | metrics */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {/* ORBIT VISUAL */}
          <Box
            sx={{
              flex: { md: '0 0 160px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: { xs: 3, md: 4 },
              borderBottom: { xs: `1px solid ${glass.border}`, md: 'none' },
              borderRight: { xs: 'none', md: `1px solid ${glass.border}` },
            }}
          >
            <OrbitVisual
              index={index}
              active={active}
              primaryColor={theme.palette.primary.main}
              secondaryColor={theme.palette.secondary.main}
              reducedMotion={reducedMotion}
              isDark={isDark}
              glow={glow}
            />
          </Box>

          {/* MAIN CONTENT */}
          <Box sx={{ flex: 1, p: { xs: 3, md: 4 } }}>
            <Typography
              sx={{
                fontFamily: typography.fonts.primary,
                fontWeight: typography.weights.bold,
                fontSize: { xs: '1.2rem', md: '1.35rem' },
                letterSpacing: typography.spacing.relaxed,
                color: 'text.primary',
                mb: 1,
              }}
            >
              {project.title}
            </Typography>

            <Typography
              sx={{
                fontFamily: typography.fonts.primary,
                fontSize: '0.88rem',
                lineHeight: 1.75,
                color: 'text.secondary',
                mb: 2.5,
              }}
            >
              {project.description}
            </Typography>

            {/* Mission Objectives */}
            <Typography
              sx={{
                fontFamily: mono,
                fontWeight: typography.weights.semiBold,
                fontSize: '0.68rem',
                letterSpacing: typography.spacing.superLoose,
                textTransform: 'uppercase',
                color: 'primary.main',
                mb: 1.5,
                opacity: 0.85,
              }}
            >
              Mission Objectives
            </Typography>

            <Stack spacing={1}>
              {project.achievements.map((achievement, aIdx) => (
                <Stack key={aIdx} direction="row" spacing={1.2} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 5,
                      height: 5,
                      bgcolor: 'primary.main',
                      transform: 'rotate(45deg)',
                      flexShrink: 0,
                      mt: '7px',
                      opacity: 0.8,
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: typography.fonts.primary,
                      fontSize: '0.83rem',
                      lineHeight: 1.7,
                      color: 'text.secondary',
                    }}
                  >
                    {achievement}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          {/* METRICS SIDEBAR */}
          <Box
            sx={{
              flex: { md: '0 0 180px' },
              borderTop: { xs: `1px solid ${glass.border}`, md: 'none' },
              borderLeft: { xs: 'none', md: `1px solid ${glass.border}` },
              p: { xs: 3, md: 3 },
              display: 'flex',
              flexDirection: { xs: 'row', md: 'column' },
              flexWrap: { xs: 'wrap' },
              gap: { xs: 2, md: 2.5 },
              justifyContent: { xs: 'flex-start', md: 'center' },
            }}
          >
            {[
              { label: 'ROLE', value: project.role },
              { label: 'CREW', value: `${project.teamSize} Members` },
              { label: 'PERIOD', value: project.period },
            ].map((row) => (
              <Box key={row.label}>
                <Typography
                  sx={{
                    fontFamily: mono,
                    fontSize: '0.55rem',
                    fontWeight: typography.weights.bold,
                    letterSpacing: typography.spacing.superLoose,
                    color: 'primary.main',
                    opacity: 0.6,
                    mb: 0.3,
                  }}
                >
                  {row.label}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: mono,
                    fontSize: '0.75rem',
                    fontWeight: typography.weights.medium,
                    color: 'text.primary',
                    letterSpacing: '0.03em',
                  }}
                >
                  {row.value}
                </Typography>
              </Box>
            ))}

            {/* Status indicator */}
            <Box>
              <Typography
                sx={{
                  fontFamily: mono,
                  fontSize: '0.55rem',
                  fontWeight: typography.weights.bold,
                  letterSpacing: typography.spacing.superLoose,
                  color: 'primary.main',
                  opacity: 0.6,
                  mb: 0.5,
                }}
              >
                STATUS
              </Typography>
              <Stack direction="row" spacing={0.8} alignItems="center">
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: active ? '#22c55e' : 'text.disabled',
                    color: active ? '#22c55e' : 'text.disabled',
                    animation: active && !reducedMotion ? `${beaconPulse} 2s ease-in-out infinite` : 'none',
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: mono,
                    fontSize: '0.65rem',
                    fontWeight: typography.weights.semiBold,
                    letterSpacing: typography.spacing.superLoose,
                    color: active ? '#22c55e' : 'text.disabled',
                  }}
                >
                  {active ? 'ACTIVE' : 'COMPLETED'}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </MotionBox>
  );
}

/* ------------------------------------------------------------------ */
/*  SpaceProjects main component                                       */
/* ------------------------------------------------------------------ */

export default function SpaceProjects() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { typography } = theme.custom;

  return (
    <Box component="section" id="projects" sx={{ py: { xs: 10, md: 14 }, position: 'relative' }}>
      <Container maxWidth="lg">
        {/* Section header */}
        <MotionBox
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
          sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: typography.fonts.primary,
              fontWeight: typography.weights.extraBold,
              fontSize: { xs: '2.2rem', md: '3rem' },
              letterSpacing: typography.spacing.extraLoose,
              background: theme.palette.gradient.primary,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            SATELLITE CONSTELLATION
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Folder sx={{ fontSize: '1rem', color: 'primary.main' }} />
            <Typography
              sx={{
                fontFamily: typography.fonts.mono,
                fontSize: '0.85rem',
                color: 'text.secondary',
                letterSpacing: typography.spacing.loose,
                opacity: 0.7,
              }}
            >
              Active Deployments
            </Typography>
          </Stack>
        </MotionBox>

        {/* Panoramic project cards — full-width single column */}
        <Stack spacing={5}>
          {projects.map((project, index) => (
            <PanoramicCard
              key={project.title}
              project={project}
              index={index}
              theme={theme}
              reducedMotion={prefersReducedMotion}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
