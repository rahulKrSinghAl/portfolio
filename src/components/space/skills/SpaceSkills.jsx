import { Box, Container, Typography, Stack, Chip } from '@mui/material';
import { Construction } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme, keyframes } from '@mui/system';
import { FaReact, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiNextdotjs, SiRedux, SiMui, SiJavascript, SiTypescript } from 'react-icons/si';
import { skills, languages } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

const MotionBox = motion.create(Box);

/* ------------------------------------------------------------------ */
/*  Skill icon map                                                     */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Keyframes                                                          */
/* ------------------------------------------------------------------ */

const radarSweep = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const blipPulse = keyframes`
  0%, 80%  { opacity: 0.5; transform: scale(1); }
  90%      { opacity: 1; transform: scale(1.4); }
  100%     { opacity: 0.5; transform: scale(1); }
`;

/* ------------------------------------------------------------------ */
/*  Radar skill positions — spread across the radar face               */
/* ------------------------------------------------------------------ */

const skillPositions = [
  { angle: 30, radius: 0.75 },
  { angle: 85, radius: 0.55 },
  { angle: 140, radius: 0.8 },
  { angle: 210, radius: 0.6 },
  { angle: 270, radius: 0.7 },
  { angle: 330, radius: 0.5 },
];

/* ------------------------------------------------------------------ */
/*  Radar Display                                                      */
/* ------------------------------------------------------------------ */

function RadarDisplay({ skills: frontendSkills, primaryColor, secondaryColor, isDark, glow, reducedMotion, mono, typography }) {
  const radarSize = 320;
  const center = radarSize / 2;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: radarSize,
        aspectRatio: '1',
        mx: 'auto',
      }}
    >
      {/* SVG radar rings + crosshair */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${radarSize} ${radarSize}`}
        fill="none"
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* Concentric rings */}
        {[0.25, 0.5, 0.75, 1].map((r) => (
          <circle
            key={r}
            cx={center}
            cy={center}
            r={center * r - 4}
            stroke={primaryColor}
            strokeWidth="0.5"
            opacity={isDark ? 0.12 : 0.15}
          />
        ))}
        {/* Crosshair lines */}
        <line x1={center} y1={4} x2={center} y2={radarSize - 4} stroke={primaryColor} strokeWidth="0.5" opacity="0.08" />
        <line x1={4} y1={center} x2={radarSize - 4} y2={center} stroke={primaryColor} strokeWidth="0.5" opacity="0.08" />
        {/* Diagonal crosshairs */}
        <line x1={center - center * 0.7} y1={center - center * 0.7} x2={center + center * 0.7} y2={center + center * 0.7} stroke={primaryColor} strokeWidth="0.3" opacity="0.05" />
        <line x1={center + center * 0.7} y1={center - center * 0.7} x2={center - center * 0.7} y2={center + center * 0.7} stroke={primaryColor} strokeWidth="0.3" opacity="0.05" />
      </svg>

      {/* Animated rotating sweep line */}
      {!reducedMotion && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            animation: `${radarSweep} 4s linear infinite`,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '50%',
              height: 2,
              transformOrigin: '0 50%',
              background: `linear-gradient(90deg, ${primaryColor}, transparent)`,
              opacity: 0.3,
            }}
          />
          {/* Sweep cone/gradient */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '50%',
              height: '50%',
              transformOrigin: '0 0',
              background: `conic-gradient(from 0deg, ${glow.primaryGlow(0.08)}, transparent 30deg)`,
              borderRadius: '0 100% 0 0',
            }}
          />
        </Box>
      )}

      {/* Skill blips positioned on radar */}
      {frontendSkills.map((skill, i) => {
        const pos = skillPositions[i] || { angle: i * 60, radius: 0.6 };
        const rad = (pos.angle * Math.PI) / 180;
        const x = center + (center - 20) * pos.radius * Math.cos(rad);
        const y = center + (center - 20) * pos.radius * Math.sin(rad);
        const IconComponent = skillIcons[skill];

        return (
          <Box
            key={skill}
            sx={{
              position: 'absolute',
              left: x,
              top: y,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
              zIndex: 2,
            }}
          >
            {/* Blip dot */}
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: primaryColor,
                boxShadow: isDark ? `0 0 8px ${primaryColor}, 0 0 16px ${glow.primaryGlow(0.3)}` : `0 0 4px ${primaryColor}`,
                animation: reducedMotion
                  ? 'none'
                  : `${blipPulse} 4s ease-in-out ${i * 0.6}s infinite`,
              }}
            />
            {/* Label */}
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              sx={{
                bgcolor: glow.primaryGlow(0.08),
                border: `1px solid ${glow.primaryGlow(0.15)}`,
                borderRadius: '3px',
                px: 0.8,
                py: 0.3,
                backdropFilter: 'blur(8px)',
              }}
            >
              {IconComponent && (
                <Box sx={{ display: 'flex', color: primaryColor, fontSize: 12 }}>
                  <IconComponent size={12} />
                </Box>
              )}
              <Typography
                sx={{
                  fontFamily: mono,
                  fontSize: '0.55rem',
                  fontWeight: typography.weights.semiBold,
                  color: 'text.primary',
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                }}
              >
                {skill}
              </Typography>
            </Stack>
          </Box>
        );
      })}

      {/* Center dot */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 6,
          height: 6,
          borderRadius: '50%',
          bgcolor: primaryColor,
          boxShadow: `0 0 12px ${primaryColor}`,
          zIndex: 3,
        }}
      />
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/*  Vertical Gauge Meter                                               */
/* ------------------------------------------------------------------ */

function VerticalGauge({ label, icon: IconComponent, color, fillPercent, inView, delay, reducedMotion, mono, typography, glow, isDark }) {
  return (
    <Stack alignItems="center" spacing={1} sx={{ width: 70 }}>
      <Typography
        sx={{
          fontFamily: mono,
          fontSize: '0.55rem',
          fontWeight: typography.weights.bold,
          color,
          letterSpacing: '0.08em',
          textAlign: 'center',
        }}
      >
        {label}
      </Typography>
      {/* Gauge tube */}
      <Box
        sx={{
          width: 40,
          height: 160,
          borderRadius: '4px',
          border: `1px solid ${isDark ? glow.primaryGlow(0.12) : 'rgba(0,0,0,0.1)'}`,
          bgcolor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.04)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Graduation marks */}
        {[0.2, 0.4, 0.6, 0.8].map((pos) => (
          <Box
            key={pos}
            sx={{
              position: 'absolute',
              bottom: `${pos * 100}%`,
              left: 0,
              right: 0,
              height: '1px',
              bgcolor: isDark ? glow.primaryGlow(0.08) : 'rgba(0,0,0,0.06)',
            }}
          />
        ))}
        {/* Fill */}
        <MotionBox
          initial={{ height: 0 }}
          animate={inView ? { height: `${fillPercent}%` } : { height: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 1.2,
            delay: reducedMotion ? 0 : delay,
            ease: 'easeOut',
          }}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: `linear-gradient(to top, ${color}, ${color}88)`,
            borderRadius: '0 0 3px 3px',
            boxShadow: isDark ? `0 0 12px ${color}44` : 'none',
          }}
        />
      </Box>
      {/* Icon below */}
      {IconComponent && (
        <Box sx={{ color, display: 'flex' }}>
          <IconComponent size={18} />
        </Box>
      )}
    </Stack>
  );
}

/* ------------------------------------------------------------------ */
/*  Signal Strength Bars                                               */
/* ------------------------------------------------------------------ */

function SignalBars({ name, level, proficiency, color, inView, delay, reducedMotion, mono, typography, isDark, glow }) {
  const totalBars = 5;
  const filledBars = Math.round((proficiency / 100) * totalBars);

  return (
    <Box sx={{ mb: 2.5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: 1 }}>
        <Typography
          sx={{
            fontWeight: typography.weights.medium,
            fontSize: '0.9rem',
            letterSpacing: typography.spacing.relaxed,
            color: 'text.primary',
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontFamily: mono,
            fontSize: '0.65rem',
            color: 'text.secondary',
            letterSpacing: '0.05em',
          }}
        >
          {level} // {proficiency}%
        </Typography>
      </Stack>
      {/* Signal bars */}
      <Stack direction="row" spacing={0.5} alignItems="flex-end">
        {Array.from({ length: totalBars }).map((_, i) => {
          const barHeight = 8 + i * 6;
          const isFilled = i < filledBars;
          return (
            <MotionBox
              key={i}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={
                inView
                  ? { opacity: 1, scaleY: 1 }
                  : { opacity: 0, scaleY: 0 }
              }
              transition={{
                duration: reducedMotion ? 0 : 0.3,
                delay: reducedMotion ? 0 : delay + i * 0.08,
                ease: 'easeOut',
              }}
              sx={{
                width: 16,
                height: barHeight,
                borderRadius: '2px',
                bgcolor: isFilled
                  ? color
                  : isDark ? glow.primaryGlow(0.06) : 'rgba(0,0,0,0.06)',
                boxShadow: isFilled && isDark ? `0 0 6px ${color}66` : 'none',
                transformOrigin: 'bottom',
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/*  SpaceSkills main component                                         */
/* ------------------------------------------------------------------ */

export default function SpaceSkills() {
  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  const { ref: gaugeRef, inView: gaugeInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const cyanMain = theme.palette.primary.main;
  const amberMain = theme.palette.secondary.main;
  const isDark = theme.palette.mode === 'dark';
  const glow = theme.custom.glow;
  const glass = theme.palette.glass;
  const { typography, animations, glassEffect, spacing } = theme.custom;
  const mono = typography.fonts.mono;

  const glassPanel = {
    background: glass.background,
    border: `1px solid ${glass.border}`,
    backdropFilter: glassEffect.blur,
    WebkitBackdropFilter: glassEffect.blur,
    borderRadius: '6px',
    boxShadow: glass.shadow,
  };

  /* ---- Animation variants ---- */
  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.7, ease: 'easeOut' },
    },
  };

  return (
    <Box
      id="skills"
      sx={{
        py: { xs: 8, md: spacing.section },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* Section header */}
        <MotionBox
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ mb: { xs: 5, md: 8 } }}
          >
            <Construction sx={{ fontSize: 40, color: cyanMain }} />
            <Typography
              variant="h2"
              sx={{
                fontWeight: typography.weights.bold,
                fontFamily: typography.fonts.primary,
                letterSpacing: typography.spacing.extraLoose,
              }}
            >
              SYSTEMS
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: typography.weights.bold,
                color: 'text.secondary',
              }}
            >
              Capabilities
            </Typography>
          </Stack>
        </MotionBox>

        {/* ============================================================ */}
        {/* Main layout: Radar (55%) | Gauge Panel (45%)                 */}
        {/* ============================================================ */}
        <Box
          ref={gaugeRef}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            alignItems: 'stretch',
          }}
        >
          {/* RADAR DISPLAY */}
          <MotionBox
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            sx={{
              flex: { md: '0 0 55%' },
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
                mb: 2,
                textAlign: 'center',
              }}
            >
              // CORE SYSTEMS RADAR
            </Typography>
            <Box
              sx={{
                ...glassPanel,
                p: { xs: 2, md: 3 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RadarDisplay
                skills={skills.frontend}
                primaryColor={cyanMain}
                secondaryColor={amberMain}
                isDark={isDark}
                glow={glow}
                reducedMotion={prefersReducedMotion}
                mono={mono}
                typography={typography}
              />
            </Box>
          </MotionBox>

          {/* GAUGE PANEL */}
          <MotionBox
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            {/* PROGRAMMING LANGUAGES — Vertical gauge meters */}
            <Box>
              <Typography
                sx={{
                  fontFamily: mono,
                  fontSize: '0.65rem',
                  fontWeight: typography.weights.bold,
                  letterSpacing: typography.spacing.superLoose,
                  color: 'secondary.main',
                  opacity: 0.7,
                  mb: 2,
                }}
              >
                // PROGRAMMING LANGUAGES
              </Typography>
              <Box sx={{ ...glassPanel, p: { xs: 3, md: 4 } }}>
                <Stack direction="row" spacing={3} justifyContent="center">
                  {skills.languages.map((lang, i) => {
                    const IconComp = skillIcons[lang];
                    return (
                      <VerticalGauge
                        key={lang}
                        label={lang}
                        icon={IconComp}
                        color={amberMain}
                        fillPercent={85 + i * 5}
                        inView={gaugeInView}
                        delay={i * 0.3}
                        reducedMotion={prefersReducedMotion}
                        mono={mono}
                        typography={typography}
                        glow={glow}
                        isDark={isDark}
                      />
                    );
                  })}
                </Stack>
              </Box>
            </Box>

            {/* COMMUNICATION PROTOCOLS — Signal strength bars */}
            <Box>
              <Typography
                sx={{
                  fontFamily: mono,
                  fontSize: '0.65rem',
                  fontWeight: typography.weights.bold,
                  letterSpacing: typography.spacing.superLoose,
                  color: 'primary.main',
                  opacity: 0.7,
                  mb: 2,
                }}
              >
                // COMMUNICATION PROTOCOLS
              </Typography>
              <Box sx={{ ...glassPanel, p: { xs: 3, md: 4 } }}>
                {languages.map((lang, i) => (
                  <SignalBars
                    key={lang.name}
                    {...lang}
                    color={cyanMain}
                    inView={gaugeInView}
                    delay={0.5 + i * 0.2}
                    reducedMotion={prefersReducedMotion}
                    mono={mono}
                    typography={typography}
                    isDark={isDark}
                    glow={glow}
                  />
                ))}
              </Box>
            </Box>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}
