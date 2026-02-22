import React, { useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
} from '@mui/material';
import {
  Email,
  LinkedIn,
  Phone,
  LocationOn,
  EmojiEvents,
  School,
  ContactMail,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { motion } from 'framer-motion';
import { personalInfo, education, achievements } from '../../../data';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

const MotionBox = motion.create(Box);

/* ------------------------------------------------------------------ */
/*  Keyframes                                                          */
/* ------------------------------------------------------------------ */

const signalExpand = keyframes`
  0%   { transform: scale(0.3); opacity: 0.6; }
  100% { transform: scale(2.5); opacity: 0; }
`;

const scanPulse = keyframes`
  0%   { left: -10%; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { left: 110%; opacity: 0; }
`;

/* ------------------------------------------------------------------ */
/*  Signal Transmitter — Glowing orb with expanding rings              */
/* ------------------------------------------------------------------ */

const orbPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px currentColor, 0 0 40px currentColor, inset 0 0 15px currentColor; }
  50%      { box-shadow: 0 0 30px currentColor, 0 0 60px currentColor, 0 0 90px currentColor, inset 0 0 20px currentColor; }
`;

function SignalTransmitter({ color, secondaryColor, reducedMotion, isDark, glow }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: 180, md: 220 },
        height: { xs: 180, md: 220 },
        mx: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Expanding signal wave rings */}
      {!reducedMotion && [0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: 70,
            height: 70,
            borderRadius: '50%',
            border: `1.5px solid ${isDark ? secondaryColor : color}`,
            opacity: 0,
            animation: `${signalExpand} 3s ease-out ${i * 1}s infinite`,
          }}
        />
      ))}

      {/* Static concentric rings */}
      {[0.9, 0.7, 0.5].map((scale, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: `${scale * 100}%`,
            height: `${scale * 100}%`,
            borderRadius: '50%',
            border: `1px solid ${isDark ? glow.primaryGlow(0.08 + i * 0.03) : glow.primaryGlow(0.06)}`,
          }}
        />
      ))}

      {/* Central glowing orb */}
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color} 0%, ${glow.primaryGlow(0.6)} 50%, transparent 100%)`,
          color: glow.primaryGlow(0.4),
          animation: reducedMotion ? 'none' : `${orbPulse} 3s ease-in-out infinite`,
          position: 'relative',
          zIndex: 2,
        }}
      />

      {/* Cross-lines through center */}
      <Box sx={{ position: 'absolute', width: '80%', height: '1px', bgcolor: color, opacity: 0.06 }} />
      <Box sx={{ position: 'absolute', width: '1px', height: '80%', bgcolor: color, opacity: 0.06 }} />
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/*  Frequency Card                                                     */
/* ------------------------------------------------------------------ */

function FrequencyCard({ icon, label, value, color, glow, isDark, mono, typography, glassPanel }) {
  return (
    <Box
      sx={{
        ...glassPanel,
        p: 2.5,
        width: { xs: '100%', sm: 220 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
        transition: 'border-color 0.3s, box-shadow 0.3s',
        '&:hover': {
          borderColor: isDark ? glow.primaryGlow(0.2) : color,
          boxShadow: isDark ? `0 0 20px ${glow.primaryGlow(0.1)}` : `0 4px 16px rgba(0,0,0,0.08)`,
        },
      }}
    >
      {/* Small dial SVG */}
      <Box sx={{ position: 'relative', width: 44, height: 44 }}>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="20" stroke={color} strokeWidth="1" opacity="0.2" />
          <circle cx="22" cy="22" r="14" stroke={color} strokeWidth="0.5" opacity="0.1" />
          {/* Dial needle */}
          <line x1="22" y1="22" x2="22" y2="8" stroke={color} strokeWidth="1.5" opacity="0.5" />
          <circle cx="22" cy="22" r="3" fill={color} opacity="0.4" />
        </svg>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color,
          }}
        >
          {React.cloneElement(icon, { sx: { fontSize: 16, color: 'inherit' } })}
        </Box>
      </Box>

      <Typography
        sx={{
          fontFamily: mono,
          fontSize: '0.6rem',
          fontWeight: typography.weights.bold,
          color: 'text.secondary',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: '0.82rem',
          color: 'text.primary',
          textAlign: 'center',
          wordBreak: 'break-word',
          maxWidth: 200,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/*  Signal Line Divider                                                */
/* ------------------------------------------------------------------ */

function SignalLineDivider({ color, reducedMotion }) {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: 2, my: 5, overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '5%',
          width: '90%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${color} 20%, ${color} 80%, transparent)`,
          opacity: 0.15,
          borderRadius: 1,
        }}
      />
      {!reducedMotion && (
        <Box
          sx={{
            position: 'absolute',
            top: -2,
            width: 60,
            height: 6,
            borderRadius: 3,
            background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
            boxShadow: `0 0 12px 4px ${color}66`,
            animation: `${scanPulse} 3.5s linear infinite`,
          }}
        />
      )}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/*  SpaceContact                                                       */
/* ------------------------------------------------------------------ */

export default function SpaceContact() {
  const theme = useTheme();
  const reducedMotion = usePrefersReducedMotion();
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;
  const isDark = theme.palette.mode === 'dark';
  const glass = theme.palette.glass;
  const glow = theme.custom.glow;
  const { typography, glassEffect, animations } = theme.custom;
  const mono = typography.fonts.mono;

  const glassPanel = {
    background: glass.background,
    border: `1px solid ${glass.border}`,
    backdropFilter: glassEffect.blur,
    WebkitBackdropFilter: glassEffect.blur,
    borderRadius: '6px',
    boxShadow: glass.shadow,
  };

  const motionProps = useMemo(
    () =>
      reducedMotion
        ? {}
        : {
            initial: 'hidden',
            whileInView: 'visible',
            viewport: { once: true, amount: 0.15 },
          },
    [reducedMotion],
  );

  const fadeUp = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0 : 0.6, ease: 'easeOut' },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.12,
        delayChildren: reducedMotion ? 0 : 0.2,
      },
    },
  };

  const channels = [
    { icon: <Email />, label: 'EMAIL', value: personalInfo.email },
    { icon: <Phone />, label: 'PHONE', value: personalInfo.phone },
    { icon: <LocationOn />, label: 'LOCATION', value: personalInfo.location },
    { icon: <LinkedIn />, label: 'LINKEDIN', value: 'LinkedIn Profile' },
  ];

  const socialActions = [
    { icon: <Email />, label: 'Send Email', href: `mailto:${personalInfo.email}` },
    { icon: <LinkedIn />, label: 'LinkedIn', href: personalInfo.linkedin },
    { icon: <Phone />, label: 'Call', href: `tel:${personalInfo.phone}` },
  ];

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg">
        {/* ============================================================ */}
        {/* Section Header                                               */}
        {/* ============================================================ */}
        <MotionBox variants={fadeUp} {...motionProps} sx={{ textAlign: 'center', mb: 4 }}>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 1 }}>
            <ContactMail
              sx={{
                fontSize: 32,
                color: primaryColor,
                filter: `drop-shadow(0 0 8px ${primaryColor})`,
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontFamily: mono,
                fontWeight: 800,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                background: theme.palette.gradient.primary,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.8rem', md: '2.4rem' },
              }}
            >
              COMMS ARRAY
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontFamily: mono,
              color: 'text.secondary',
              letterSpacing: '0.12em',
              fontSize: '0.9rem',
              opacity: 0.7,
            }}
          >
            Deep Space Communication Hub
          </Typography>
        </MotionBox>

        {/* ============================================================ */}
        {/* DISH ILLUSTRATION — Centered                                 */}
        {/* ============================================================ */}
        <MotionBox variants={fadeUp} {...motionProps} sx={{ mb: 4 }}>
          <SignalTransmitter
            color={primaryColor}
            secondaryColor={secondaryColor}
            reducedMotion={reducedMotion}
            isDark={isDark}
            glow={glow}
          />
        </MotionBox>

        {/* Social action buttons below dish */}
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 5 }}>
          {socialActions.map((action) => (
            <IconButton
              key={action.label}
              component="a"
              href={action.href}
              target={action.label === 'LinkedIn' ? '_blank' : undefined}
              rel={action.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
              aria-label={action.label}
              sx={{
                width: 48,
                height: 48,
                backgroundColor: 'primary.main',
                color: isDark ? theme.palette.background.default : '#ffffff',
                borderRadius: '12px',
                transition: 'box-shadow 0.3s, transform 0.3s, background-color 0.3s',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  boxShadow: `0 0 20px ${primaryColor}, 0 0 40px ${glow.primaryGlow(0.25)}`,
                  transform: 'translateY(-2px) scale(1.06)',
                },
              }}
            >
              {action.icon}
            </IconButton>
          ))}
        </Stack>

        {/* ============================================================ */}
        {/* FREQUENCY CHANNELS — Horizontal cards                        */}
        {/* ============================================================ */}
        <MotionBox variants={stagger} {...motionProps}>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            gap={2.5}
            sx={{ mb: 2 }}
          >
            {channels.map((ch) => (
              <MotionBox key={ch.label} variants={fadeUp}>
                <FrequencyCard
                  icon={ch.icon}
                  label={ch.label}
                  value={ch.value}
                  color={primaryColor}
                  glow={glow}
                  isDark={isDark}
                  mono={mono}
                  typography={typography}
                  glassPanel={glassPanel}
                />
              </MotionBox>
            ))}
          </Stack>
        </MotionBox>

        {/* Signal line divider */}
        <SignalLineDivider color={primaryColor} reducedMotion={reducedMotion} />

        {/* ============================================================ */}
        {/* TRANSMISSION LOG — Single column terminal style              */}
        {/* ============================================================ */}
        <MotionBox variants={fadeUp} {...motionProps}>
          <Box sx={{ ...glassPanel, p: { xs: 3, md: 4 } }}>
            <Typography
              sx={{
                fontFamily: mono,
                fontWeight: typography.weights.bold,
                fontSize: '0.75rem',
                letterSpacing: typography.spacing.superLoose,
                textTransform: 'uppercase',
                color: 'primary.main',
                mb: 3,
                opacity: 0.7,
              }}
            >
              {'>'} RECEIVED TRANSMISSIONS
            </Typography>

            {/* Education entry — full-width single row */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 3 }}
              alignItems={{ sm: 'center' }}
              sx={{
                py: 2,
                px: 2,
                borderRadius: '4px',
                bgcolor: isDark ? glow.primaryGlow(0.03) : 'rgba(0,0,0,0.02)',
                border: `1px solid ${isDark ? glow.primaryGlow(0.06) : theme.palette.divider}`,
                mb: 2,
              }}
            >
              <School sx={{ fontSize: 22, color: primaryColor, opacity: 0.7, flexShrink: 0 }} />
              <Typography
                sx={{
                  fontWeight: typography.weights.bold,
                  fontSize: '0.9rem',
                  color: 'text.primary',
                  whiteSpace: { sm: 'nowrap' },
                }}
              >
                {education.degree}
              </Typography>
              <Typography
                sx={{
                  fontFamily: mono,
                  fontSize: '0.8rem',
                  color: primaryColor,
                  whiteSpace: { sm: 'nowrap' },
                }}
              >
                {education.institution}{education.location ? `, ${education.location}` : ''}
              </Typography>
              <Typography
                sx={{
                  fontFamily: mono,
                  fontSize: '0.7rem',
                  color: 'text.secondary',
                  letterSpacing: '0.08em',
                  whiteSpace: { sm: 'nowrap' },
                  ml: { sm: 'auto' },
                }}
              >
                {education.period}
              </Typography>
            </Stack>

            {/* Achievement entries — full-width single row each */}
            {achievements.map((item, idx) => (
              <Stack
                key={idx}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 3 }}
                alignItems={{ sm: 'center' }}
                sx={{
                  py: 2,
                  px: 2,
                  borderRadius: '4px',
                  bgcolor: isDark ? glow.primaryGlow(0.03) : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${isDark ? glow.primaryGlow(0.06) : theme.palette.divider}`,
                  mb: idx < achievements.length - 1 ? 2 : 0,
                }}
              >
                <EmojiEvents sx={{ fontSize: 22, color: secondaryColor, opacity: 0.7, flexShrink: 0 }} />
                <Typography
                  sx={{
                    fontWeight: typography.weights.bold,
                    fontSize: '0.9rem',
                    color: 'text.primary',
                    whiteSpace: { sm: 'nowrap' },
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.82rem',
                    color: 'text.secondary',
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </Typography>
              </Stack>
            ))}
          </Box>
        </MotionBox>

        {/* Footer */}
        <MotionBox variants={fadeUp} {...motionProps} sx={{ textAlign: 'center', mt: 8 }}>
          <Typography
            sx={{
              color: 'text.secondary',
              fontFamily: mono,
              letterSpacing: '0.1em',
              fontSize: '0.72rem',
              opacity: 0.5,
            }}
          >
            &copy; {new Date().getFullYear()} {personalInfo.name}. All transmissions secured.
          </Typography>
        </MotionBox>
      </Container>
    </Box>
  );
}
