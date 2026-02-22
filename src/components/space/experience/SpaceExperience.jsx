import { Box, Container, Typography, Card, CardContent, Stack } from '@mui/material';
import { BusinessCenter } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme, keyframes } from '@mui/system';
import { experience } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

/* ------------------------------------------------------------------ */
/*  Keyframes                                                          */
/* ------------------------------------------------------------------ */

const pathDraw = keyframes`
  0%   { stroke-dashoffset: 2000; }
  100% { stroke-dashoffset: 0; }
`;

const craftMove = keyframes`
  0%   { offset-distance: 0%; }
  100% { offset-distance: 100%; }
`;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatMissionTimestamp(period) {
  return `MISSION // ${period.replace(/\//g, '.').toUpperCase()}`;
}

/* ------------------------------------------------------------------ */
/*  Horizontal Flight Path (SVG)                                       */
/* ------------------------------------------------------------------ */

function FlightPath({ count, color, reducedMotion, isDark, glow }) {
  // Generates a sinusoidal path across the width
  const width = 1200;
  const height = 400;
  const midY = height / 2;
  const amplitude = 120;
  const segWidth = width / (count - 1 || 1);

  // Create smooth sinusoidal curve
  let pathD = `M 0 ${midY}`;
  for (let i = 0; i < count; i++) {
    const x = i * segWidth;
    const nextX = Math.min((i + 1) * segWidth, width);
    const controlX = (x + nextX) / 2;
    const y = midY + (i % 2 === 0 ? -amplitude : amplitude);
    const nextY = midY + ((i + 1) % 2 === 0 ? -amplitude : amplitude);
    if (i === 0) {
      pathD += ` C ${controlX} ${y}, ${controlX} ${y}, ${nextX} ${midY + ((i + 1) % 2 === 0 ? -amplitude : amplitude)}`;
    } else {
      pathD += ` S ${controlX} ${nextY}, ${nextX} ${nextY}`;
    }
  }

  // Node positions (at each experience point)
  const nodes = experience.map((_, i) => {
    const x = i * segWidth;
    const y = midY + (i % 2 === 0 ? -amplitude : amplitude);
    return { x, y };
  });

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: { xs: 'none', md: 'block' },
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* Flight path line */}
        <path
          d={pathD}
          stroke={color}
          strokeWidth="2"
          fill="none"
          opacity={isDark ? 0.2 : 0.15}
          strokeDasharray="2000"
          style={{
            animation: reducedMotion ? 'none' : `${pathDraw} 2s ease-out forwards`,
          }}
        />

        {/* Orbital station nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            <circle
              cx={node.x}
              cy={node.y}
              r="16"
              stroke={color}
              strokeWidth="1.5"
              fill="none"
              opacity="0.3"
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="5"
              fill={color}
              opacity="0.6"
            />
            {/* Outer ring */}
            <circle
              cx={node.x}
              cy={node.y}
              r="24"
              stroke={color}
              strokeWidth="0.5"
              fill="none"
              opacity="0.1"
              strokeDasharray="4 4"
            />
          </g>
        ))}
      </svg>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile Orbital Rail                                                */
/* ------------------------------------------------------------------ */

function MobileOrbitalRail({ color, isDark, glow }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 16,
        top: 0,
        bottom: 0,
        width: 2,
        display: { xs: 'block', md: 'none' },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(180deg, ${color}, ${isDark ? glow.primaryGlow(0.1) : 'transparent'})`,
          opacity: 0.2,
        }}
      />
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/*  SpaceExperience                                                    */
/* ------------------------------------------------------------------ */

export default function SpaceExperience() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { glow, typography, animations, glassEffect, spacing } = theme.custom;
  const isDark = theme.palette.mode === 'dark';
  const glass = theme.palette.glass;
  const mono = typography.fonts.mono;

  const { ref: pathRef, inView: pathInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  /* ---- Animation variants ---- */
  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40, scale: prefersReducedMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : animations.duration.slow,
        ease: animations.easing.easeOut,
      },
    },
  };

  const stagger = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.25 },
    },
  };

  const glassPanel = {
    background: glass.background,
    border: `1px solid ${glass.border}`,
    backdropFilter: glassEffect.blur,
    WebkitBackdropFilter: glassEffect.blur,
    borderRadius: '6px',
    boxShadow: glass.shadow,
  };

  return (
    <Box component="section" id="experience" sx={{ py: { xs: spacing.xxl, md: spacing.section }, position: 'relative' }}>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* ---- Section header ---- */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ mb: spacing.xxl }}
        >
          <BusinessCenter
            sx={{
              color: 'primary.main',
              fontSize: 40,
              filter: `drop-shadow(0 0 6px ${glow.primaryGlow(0.4)})`,
            }}
          />
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: typography.weights.bold,
                background: theme.palette.gradient?.primary || theme.palette.primary.main,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: typography.spacing.extraLoose,
              }}
            >
              FLIGHT LOG
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: typography.weights.medium,
                color: 'text.secondary',
                letterSpacing: typography.spacing.loose,
              }}
            >
              Orbital Trajectory
            </Typography>
          </Box>
        </Stack>

        {/* ============================================================ */}
        {/* Orbital Trajectory Map                                       */}
        {/* ============================================================ */}
        <Box ref={pathRef} sx={{ position: 'relative' }}>
          {/* SVG flight path (desktop) */}
          <FlightPath
            count={experience.length}
            color={theme.palette.primary.main}
            reducedMotion={prefersReducedMotion}
            isDark={isDark}
            glow={glow}
          />

          {/* Mobile orbital rail */}
          <MobileOrbitalRail color={theme.palette.primary.main} isDark={isDark} glow={glow} />

          {/* Experience cards — horizontal on desktop, vertical on mobile */}
          <Box
            component={motion.div}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Desktop: horizontal row with alternating top/bottom */}
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ xs: 4, md: 3 }}
              alignItems={{ md: 'stretch' }}
              sx={{
                // Mobile: left padding for rail
                pl: { xs: 5, md: 0 },
                // Desktop: min-height to accommodate the sinusoidal layout
                minHeight: { md: 500 },
                position: 'relative',
              }}
            >
              {experience.map((job, index) => {
                const isAbove = index % 2 === 0;

                return (
                  <Box
                    key={index}
                    sx={{
                      flex: { md: 1 },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: { md: isAbove ? 'flex-start' : 'flex-end' },
                      position: 'relative',
                    }}
                  >
                    {/* Mobile: orbital node on the rail */}
                    <Box
                      sx={{
                        display: { xs: 'block', md: 'none' },
                        position: 'absolute',
                        left: -37,
                        top: 20,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        border: '2px solid',
                        borderColor: 'background.default',
                        zIndex: 2,
                        boxShadow: isDark ? `0 0 8px ${glow.primaryGlow(0.4)}` : 'none',
                      }}
                    />

                    {/* Desktop: date label along path */}
                    <Typography
                      sx={{
                        display: { xs: 'none', md: 'block' },
                        fontFamily: mono,
                        fontSize: '0.6rem',
                        color: 'primary.main',
                        letterSpacing: '0.1em',
                        opacity: 0.5,
                        textAlign: 'center',
                        mb: isAbove ? 1 : 0,
                        mt: isAbove ? 0 : 1,
                        order: isAbove ? 0 : 2,
                      }}
                    >
                      {job.period.replace(/\//g, '.')}
                    </Typography>

                    {/* Card */}
                    <MotionCard
                      variants={cardVariants}
                      elevation={0}
                      sx={{
                        ...glassPanel,
                        transition: `border-color ${animations.duration.normal}s, box-shadow ${animations.duration.normal}s`,
                        '&:hover': {
                          borderColor: glow.primaryGlow(0.25),
                          boxShadow: `0 8px 32px ${glow.primaryGlow(0.15)}, 0 0 20px ${glow.primaryGlow(0.06)}`,
                        },
                        order: 1,
                      }}
                    >
                      <CardContent sx={{ p: { xs: spacing.md, md: spacing.md }, '&:last-child': { pb: { xs: spacing.md, md: spacing.md } } }}>
                        {/* Title + Company */}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: typography.weights.bold,
                            mb: 0.5,
                            color: 'text.primary',
                            fontSize: { xs: '1rem', md: '1.05rem' },
                          }}
                        >
                          {job.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: typography.weights.semiBold,
                            color: 'primary.main',
                            letterSpacing: typography.spacing.relaxed,
                            fontSize: '0.9rem',
                          }}
                        >
                          {job.company}
                        </Typography>

                        {/* Mission timestamp — mobile only (desktop shows along path) */}
                        <Typography
                          sx={{
                            display: { xs: 'block', md: 'none' },
                            fontFamily: mono,
                            fontSize: '0.7rem',
                            fontWeight: typography.weights.medium,
                            color: 'primary.main',
                            letterSpacing: typography.spacing.relaxed,
                            textTransform: 'uppercase',
                            mt: 1,
                            mb: 0.5,
                          }}
                        >
                          {formatMissionTimestamp(job.period)}
                        </Typography>

                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', mb: 1.5, fontSize: '0.8rem' }}>
                          {job.type}
                        </Typography>

                        {/* Achievement bullets */}
                        <Stack spacing={1}>
                          {job.achievements.map((achievement, idx) => (
                            <Stack key={idx} direction="row" spacing={1} alignItems="flex-start">
                              <Box
                                sx={{
                                  width: 5,
                                  height: 5,
                                  mt: '8px',
                                  flexShrink: 0,
                                  bgcolor: 'primary.main',
                                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                                }}
                              />
                              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem', lineHeight: 1.7 }}>
                                {achievement}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </CardContent>
                    </MotionCard>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
